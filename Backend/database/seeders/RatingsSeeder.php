<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RatingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ratings')->insert([
            [
                'restaurant_location_id' => 1,
                'user_id' => 1,
                'rate' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'user_id' => 1,
                'rate' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 2,
                'user_id' => 1,
                'rate' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 2,
                'user_id' => 1,
                'rate' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 3,
                'user_id' => 1,
                'rate' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 3,
                'user_id' => 1,
                'rate' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 4,
                'user_id' => 1,
                'rate' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 4,
                'user_id' => 1,
                'rate' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 5,
                'user_id' => 1,
                'rate' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 5,
                'user_id' => 1,
                'rate' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 6,
                'user_id' => 1,
                'rate' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 7,
                'user_id' => 1,
                'rate' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],



        ]);
    }
}
