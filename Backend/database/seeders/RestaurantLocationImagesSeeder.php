<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RestaurantLocationImagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('restaurant_location_images')->insert([
            [
                'restaurant_location_id' => 1,
                'image' => 'images/image1.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'image' => 'images/image2.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 2,
                'image' => 'images/image1.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 2,
                'image' => 'images/image2.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
