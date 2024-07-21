<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Reservation\StoreReservationRequest;
use App\Http\Resources\ReservationResource;
use App\Mail\PaymentSuccessMail;
use App\Models\Reservation;
use App\Models\ReservationDetail;
use App\Models\Payment;
use App\Models\Restaurant;
use App\Models\Table;
use App\Traits\UploadImageTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Srmklive\PayPal\Services\PayPal as PayPalClient;

class ReservationController extends Controller
{
    use UploadImageTrait;

    public function index(): JsonResponse
    {
        $reservations = Reservation::with(['details', 'payments'])->get();
        return ApiResponse::sendResponse(200, 'Reservations Fetched Successfully', ReservationResource::collection($reservations));
    }

    public function getReservationRestaurant($restaurant_id): JsonResponse
    {
        if (!is_numeric($restaurant_id) || $restaurant_id <= 0) {
            return ApiResponse::sendResponse(400, 'Invalid resturant ID.');
        }

        $reservations = Reservation::where('restaurant_id', '=', $restaurant_id)
            ->select('id', 'total_price', 'notes')
            ->with('details', 'payments')
            ->get();

        if ($reservations->isEmpty()) {
            return ApiResponse::sendResponse(404, 'No reservations found for this resturant.');
        }
        return ApiResponse::sendResponse(200, 'Governorates fetched successfully', $reservations);
    }

    public function store(StoreReservationRequest $request): JsonResponse
    {
        $auth_user = Auth::guard('sanctum')->user();
        $validated = $request->validated();

        DB::beginTransaction();
        try {
            // Create reservation
            $reservation = Reservation::create([
                'user_id' => $auth_user->id,
                'total_price' => $validated['total_price'],
                'notes' => $validated['notes'] ?? null,
                'terms_and_conditions' => $validated['terms_and_conditions'],
                'restaurant_id' => $validated['restaurant_id']
            ]);

            // Create reservation details
            ReservationDetail::create([
                'reservation_id' => $reservation->id,
                'table_id' => $validated['table_id'],
                'table_availability_id' => $validated['table_availability_id'],
                'reservation_date' => $validated['reservation_date'],
                'amount' => $validated['amount'],
                'number_of_extra_chairs' => $validated['number_of_extra_chairs'],
                'number_of_extra_childs_chairs' => $validated['number_of_extra_childs_chairs'],
            ]);

            // Upload transaction image if exists
            $validated['transaction_image'] = $this->uploadImage($request, 'transaction_image', 'transaction_images') ?? null;

            $payment = Payment::create([
                'reservation_id' => $reservation->id,
                'user_id' => $auth_user->id,
                'amount' => $validated['amount'],
                'gateway_id' => $validated['gateway_id'] ?? null,
                'transaction_image' => $validated['transaction_image'],
                'transaction_phone_number' => $validated['transaction_phone_number'],
                //'transaction_id' => $validated['transaction_id'] ?? null,
                'customer_name' => $validated['customer_name'],
                'customer_email' => $validated['customer_email'],
                'customer_phone' => $validated['customer_phone'] ?? null,
            ]);

            DB::commit();

            // Redirect to payment route if PayPal is chosen as the gateway
            if ($validated['gateway_id'] == 1) {
                return $this->redirectToPayPal($reservation, $payment);
            }

            return ApiResponse::sendResponse(201, 'Reservation created successfully.', new ReservationResource($reservation->load('details', 'payments')));
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Failed to create reservation: ' . $e->getMessage(), ['exception' => $e]);
            return ApiResponse::sendResponse(400, 'Failed to create reservation. Please try again later.');
        }
    }

    public function show(Reservation $reservation): JsonResponse
    {
        return response()->json(new ReservationResource($reservation->load('details', 'payments')), 200);
    }

    public function destroy(Reservation $reservation): JsonResponse
    {
        $reservation->delete();
        return response()->json(null, 204);
    }

    private function redirectToPayPal($reservation, $payment): JsonResponse
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();

        $order = [
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => route('payment.success', ['payment' => $payment->id]),
                "cancel_url" => route('payment.cancel'),
            ],
            "purchase_units" => [
                [
                    "reference_id" => $reservation->id,
                    "description" => "Reservation payment",
                    "amount" => [
                        "currency_code" => "USD",
                        "value" => $reservation->total_price
                    ]
                ]
            ]
        ];

        $response = $provider->createOrder($order);

        if (isset($response['id'])) {
            foreach ($response['links'] as $link) {
                if ($link['rel'] === 'approve') {
                    return ApiResponse::sendResponse(200, 'Reservation created successfully. Pay now', $link['href']);
                }
            }
        }
        return ApiResponse::sendResponse(400, 'Failed to create PayPal order.');
    }

    public function paymentSuccess(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();

        $response = $provider->capturePaymentOrder($request->token);

        if (isset($response['status']) && $response['status'] == 'COMPLETED') {
            // Update payment status to successful
            $payment = Payment::find($request->payment);
            if ($payment) {
                $payment->update([
                    'transaction_id' => $response['id'],
                    'status' => 'success'
                ]);
            }

            //send mail when success
            Mail::to($payment->user->email)->send(new PaymentSuccessMail($payment));



            // return ApiResponse::sendResponse(200, 'Payment successfull');
            // ApiResponse::sendResponse(200, 'Payment successfull');
            return redirect("http://localhost:5173/reservation/done");
        }
        return redirect("http://localhost:5173/server-error");
        // return ApiResponse::sendResponse(400, 'Payment failed');
    }

    public function paymentCancel(): JsonResponse
    {
        return ApiResponse::sendResponse(401, 'Payment cancelled');
    }



    public function changeStatus(Request $request, Reservation $reservation)
    {
        $request->validate([
            'status' => 'required|in:pending,success,failed,rejected,cancelled',
        ]);

        try {
            $reservation->status = $request->status;
            $payment = Payment::where('reservation_id', $reservation->id)->first();
            $payment->status = $request->status;
            $reservation->save();
            $payment->save();
            $user = $reservation->user;

            Mail::send('emails.reservation', ['user' => $user, 'status' => $reservation->status], function ($message) use ($user) {
                $message->from('noreply@example.com', config('app.name'));
                $message->to($user['email']);
                $message->subject('Reservation Confirmation');
            });

            return ApiResponse::sendResponse(200, 'Reservation status updated successfully, Check your email.');
        } catch (Exception $e) {
            return ApiResponse::sendResponse(400, 'Failed to update user status.');
        }
    }
}
