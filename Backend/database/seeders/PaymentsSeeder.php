<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class PaymentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $payments = [
            [
                'table_id' => 1,
                'user_id' => 1,
                'restaurant_location_id' => 1,
                'amount' => 50.00,
                'payment_method' => 'credit_card',
                'status' => 'success',
                'transaction_id' => 'TX123456789',
                'tax' => 5.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'table_id' => 2,
                'user_id' => 2,
                'restaurant_location_id' => 2,
                'amount' => 75.00,
                'payment_method' => 'cash',
                'status' => 'pending',
                'transaction_id' => null,
                'tax' => 7.50,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('payments')->insert($payments);
    }
}
