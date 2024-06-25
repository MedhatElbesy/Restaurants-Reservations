<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Enums\ItemStatus;
use Illuminate\Support\Facades\DB;

class RestaurantLocationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('restaurant_locations')->insert([
            [
                'restaurant_id' => 1,
                'address' => '123 Main St',
                'country_id' => 1,
                'governorate_id' => 1,
                'city_id' => 1,
                'state_id' => 1,
                'zip' => 12345,
                'latitude' => 40.7128,
                'longitude' => -74.0060,
                'opening_time' => '08:00:00',
                'closed_time' => '22:00:00',
                'closed_days' => json_encode(['Sunday']),
                'number_of_tables' => 20,
                'phone_number' => '123-456-7890',
                'mobile_number' => '098-765-4321',
                'status' => ItemStatus::Opened,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 2,
                'address' => '456 Elm St',
                'country_id' => 1,
                'governorate_id' => 2,
                'city_id' => 2,
                'state_id' => 2,
                'zip' => 54321,
                'latitude' => 34.0522,
                'longitude' => -118.2437,
                'opening_time' => '09:00:00',
                'closed_time' => '23:00:00',
                'closed_days' => json_encode(['Monday']),
                'number_of_tables' => 30,
                'phone_number' => '234-567-8901',
                'mobile_number' => '987-654-3210',
                'status' => ItemStatus::Opened,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 3,
                'address' => '3456 Elm St',
                'country_id' => 2,
                'governorate_id' => 2,
                'city_id' => 2,
                'state_id' => 2,
                'zip' => 34321,
                'latitude' => 34.0522,
                'longitude' => -318.2437,
                'opening_time' => '03:00:00',
                'closed_time' => '23:00:00',
                'closed_days' => json_encode(['Monday']),
                'number_of_tables' => 30,
                'phone_number' => '334-567-8901',
                'mobile_number' => '387-654-3210',
                'status' => ItemStatus::Opened,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
