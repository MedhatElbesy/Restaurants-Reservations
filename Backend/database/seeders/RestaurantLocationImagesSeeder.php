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
                'image' => 'https://elegencia-react-ejev.vercel.app/assets/img/about/about_open_hour.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'image' => 'https://elegencia-react-ejev.vercel.app/assets/img/about/about_open_hour.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'image' => 'https://elegencia-react-ejev.vercel.app/assets/img/about/about_open_hour.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'image' => 'https://elegencia-react-ejev.vercel.app/assets/img/about/about_open_hour.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 2,
                'image' => 'https://elegencia-react-ejev.vercel.app/assets/img/about/about_open_hour.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 2,
                'image' => 'https://elegencia-react-ejev.vercel.app/assets/img/about/about_open_hour.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 3,
                'image' => 'https://elegencia-react-ejev.vercel.app/assets/img/about/about_open_hour.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 3,
                'image' => 'https://elegencia-react-ejev.vercel.app/assets/img/about/about_open_hour.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 4,
                'image' => 'https://elegencia-react-ejev.vercel.app/assets/img/about/about_open_hour.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 5,
                'image' => 'https://elegencia-react-ejev.vercel.app/assets/img/about/about_open_hour.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 6,
                'image' => 'https://elegencia-react-ejev.vercel.app/assets/img/about/about_open_hour.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 7,
                'image' => 'https://elegencia-react-ejev.vercel.app/assets/img/about/about_open_hour.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 7,
                'image' => 'https://elegencia-react-ejev.vercel.app/assets/img/about/about_open_hour.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 8,
                'image' => 'https://elegencia-react-ejev.vercel.app/assets/img/about/about_open_hour.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 9,
                'image' => 'https://elegencia-react-ejev.vercel.app/assets/img/about/about_open_hour.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 10,
                'image' => 'https://elegencia-react-ejev.vercel.app/assets/img/about/about_open_hour.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
