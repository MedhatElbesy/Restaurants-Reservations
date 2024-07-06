<?php

namespace App\Http\Controllers;

use Srmklive\PayPal\Services\PayPal as PayPalClient;
use Illuminate\Http\Request;
use Srmklive\PayPal\Services\ExpressCheckout;
class PayPalController extends Controller
{

    public function index()
    {
        return view('auth.paypal');
    }


    public function payment(Request $request)
    {
        $data = [];
        $data['items'] = [];

        $data['invoice_id'] = 1;
        $data['invoice_description']= "desi";
        $data['return_url'] = 'http://127.0.0.1:8000/payment/success';
        $data['cancel_url'] = 'http://127.0.0.1:8000/cancel';
        $data['total'] = 1000;

        $provider = new ExpressCheckout;
        $response = $provider->setExpressCheckout($data, true);


        return redirect($response['paypal_link']);
    }


    public function paymentCancel()
    {
        return response()->json("payment cancelled");
    }


    public function paymentSuccess(Request $request)
    {
        $provider = new ExpressCheckout;
        $response = $provider->getExpressCheckoutDetails($request->token);
        if(in_array(strtoupper($response['ACK']), ['SUCCESS', 'SUCCESSWITHWARNING'])){

            return response()->json($response);
        }
            return response()->json("fail payment",402);
    }
}
