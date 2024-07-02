<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Gateway;
use App\Models\GatewayDate;

class GatewaySeeder extends Seeder
{
    public function run()
    {
        // Gateways data
        $gateways = [
            [
                'title'         => 'PayPal',
                'slug'          => 'paypal',
                'description'   => 'PayPal payment gateway',
                'photo'         => "https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png",
                'type'          => 'paypal'
            ],
            [
                'title' => 'Vodafone Cash',
                'slug' => 'vodafone_cash',
                'description' => 'Vodafone Cash payment gateway',
                'photo' => "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7-l08NdkpCXRrAYLOeSKO18vm37Lsn8cSyA&s",
                'type' => 'cash'
            ],
            [
                'title' => 'Orange Cash',
                'slug' => 'orange_cash',
                'description' => 'Orange Cash payment gateway',
                'photo' => "https://play-lh.googleusercontent.com/D2quHIGqS6S7z4NQIAwpCLR0aENYn0UFEr16o4bb6jNp2dkBZA3C_zXfNHTPAUyMAA=w600-h300-pc0xffffff-pd",
                'type' => 'cash'
            ],
            [
                'title' => 'Stripe',
                'slug' => 'stripe',
                'description' => 'Stripe payment gateway',
                'photo' => "https://w7.pngwing.com/pngs/462/1000/png-transparent-stripe-payment-gateway-logo-automated-clearing-house-stripes-text-service-logo.png",
                'type' => 'credit_card'
            ],
        ];

        // Insert gateways
        foreach ($gateways as $gatewayData) {
            $gateway = Gateway::create($gatewayData);

            /*$gatewayDates = [
                'gateways_id'   => $gateway->id,
                'key'           => 'your-key-here',
                'secret_key'    => 'your-secret-key-here',
                'public_key'    => 'your-public-key-here',
                'status'        => 'Available'
            ];

            GatewayDate::create($gatewayDates);*/
        }
    }
}
