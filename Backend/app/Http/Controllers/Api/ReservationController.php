<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Reservation\StoreReservationRequest;
use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use App\Models\ReservationDetail;
use App\Models\Payment;
use App\Traits\UploadImageTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Support\Facades\Log;

class ReservationController extends Controller
{
    use UploadImageTrait;
    public function index(): JsonResponse
    {
        $reservations = Reservation::with(['details', 'payments'])->get();
        return ApiResponse::sendResponse(200, 'Reservations Fetched Successfully', ReservationResource::collection($reservations));
    }

    public function store(StoreReservationRequest $request): JsonResponse
    {
        $auth_user = Auth::guard('sanctum')->user();
        $validated = $request->validated();

        DB::beginTransaction();

        try {
            $reservation = Reservation::create([
                'user_id' => $auth_user->id,
                'total_price' => $validated['total_price'],
                'notes' => $validated['notes'] ?? null,
                'terms_and_conditions' => $validated['terms_and_conditions'],
            ]);

            ReservationDetail::create([
                'reservation_id' => $reservation->id,
                'table_id' => $validated['table_id'],
                'table_availability_id' => $validated['table_availability_id'],
                'reservation_date' => $validated['reservation_date'],
                'reservation_time' => $validated['reservation_time'],
                'amount' => $validated['amount'],
                'number_of_extra_chairs' => $validated['number_of_extra_chairs'],
                'number_of_extra_childs_chairs' => $validated['number_of_extra_childs_chairs'],
            ]);

            $validated['transaction_image'] = $this->uploadImage($request, 'transaction_image', 'transaction_images') ?? null;

            $payment = Payment::create([
                'reservation_id' => $reservation->id,
                'user_id' => $auth_user->id,
                'amount' => $validated['amount'],
                'gateway_id' => $validated['gateway_id'] || null,
                'transaction_image' => $validated['transaction_image'],
                'transaction_phone_number' => $validated['transaction_phone_number'],
                'transaction_id' => $validated['transaction_id'] ?? null,
                'customer_name' => $validated['customer_name'],
                'customer_email' => $validated['customer_email'],
                'customer_phone' => $validated['customer_phone'] ?? null,
            ]);

            DB::commit();

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

//    public function update(UpdateReservationRequest $request, Reservation $reservation): JsonResponse
//    {
//        $validated = $request->validated();
//        $reservation->update($validated);
//        return response()->json(new ReservationResource($reservation), 200);
//    }

    public function destroy(Reservation $reservation): JsonResponse
    {
        $reservation->delete();
        return response()->json(null, 204);
    }
}
