<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserAddressesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('user_addresses')->insert([
            [
                'user_id' => 1,
                'address' => '123 Main St',
                'country_id' => 1,
                'governorate_id' => 1,
                'city_id' => 1,
                'state_id' => 1,
                'zip' => 12345,
                'latitude' => 40.7128,
                'longitude' => -74.0060,
                'status' => 'Enabled',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'address' => '456 Elm St',
                'country_id' => 1,
                'governorate_id' => 1,
                'city_id' => 1,
                'state_id' => 1,
                'zip' => 54321,
                'latitude' => 40.7128,
                'longitude' => -74.0060,
                'status' => 'Enabled',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
