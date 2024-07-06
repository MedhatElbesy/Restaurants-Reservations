<?php

namespace App\Http\Controllers;

use Srmklive\PayPal\Services\PayPal as PayPalClient;
use Illuminate\Http\Request;
use Srmklive\PayPal\Services\ExpressCheckout;
use Srmklive\PayPal\Facades\PayPal;
class PayPalController extends Controller
{

    public function payment(Request $request)
    {
        $provider = PayPal::setProvider();
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();

        $order = [
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => route('payment.success'),
                "cancel_url" => 'http://localhost:4200/owner/payment/paypal',
            ],
            "purchase_units" => [
                [
                    "reference_id" => 1,
                    "description" => "Reservation payment",
                    "amount" => [
                        "currency_code" => "USD",
                        "value" => 50
                        ]
                ]
            ]
        ];
        $response = $provider->createOrder($order);

        if (isset($response['id'])) {
            foreach ($response['links'] as $link) {
                if ($link['rel'] === 'approve') {
                    return ["link"=>$link['href']];
                }
            }
        }
        return redirect()->route('paypal.cancel');
    }


    public function paymentCancel()
    {
        return response()->json("payment cancelled");
    }


    public function paymentSuccess(Request $request)
    {
        $provider = PayPal::setProvider();
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();

    $response = $provider->capturePaymentOrder($request->token);
            // dd($response);
    if (isset($response['status']) && $response['status'] == 'COMPLETED') {
        return response()->json(['message' => 'Payment successful'], 200);

    }
        return response()->json(['message' => 'Payment failed'], 400);
    }
}
