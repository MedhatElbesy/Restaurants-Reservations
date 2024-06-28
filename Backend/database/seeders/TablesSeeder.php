<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Enums\ItemStatus;
use Faker\Factory as Faker;

class TablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tables = [
            [
                'restaurant_location_id' => 1,
                'number_of_chairs' => 4,
                'max_number_of_persons' => 8,
                'cover' => 'path/to/your/image1.jpg',
                'price' => 120.00,
                'sale_price' => 100.00,
                'extra_number_of_chairs' => 2,
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'number_of_chairs' => 4,
                'max_number_of_persons' => 4,
                'cover' => 'https://tinyurl.com/u65zrwev',
                'price' => 80.00,
                'sale_price' => 70.00,
                'extra_number_of_chairs' => 1,
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'number_of_chairs' => 6,
                'max_number_of_persons' => 12,
                'cover' => 'https://tinyurl.com/3cay7jfy',
                'price' => 180.00,
                'sale_price' => 160.00,
                'extra_number_of_chairs' => 3,
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 2,
                'number_of_chairs' => 6,
                'max_number_of_persons' => 12,
                'cover' => 'https://tinyurl.com/3zbswr9p',
                'price' => 150.00,
                'sale_price' => 130.00,
                'extra_number_of_chairs' => 0,
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 2,
                'number_of_chairs' => 6,
                'max_number_of_persons' => 12,
                'cover' => 'path/to/your/image2.jpg',
                'price' => 150.00,
                'sale_price' => 130.00,
                'extra_number_of_chairs' => 0,
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 3,
                'number_of_chairs' => 8,
                'max_number_of_persons' => 16,
                'cover' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4VuYowKNWwiHdc7JB0THZe7G1qV2tHS9OYw&s',
                'description' => 'Newly added table',
                'price' => 200.00,
                'sale_price' => 180.00,
                'extra_number_of_chairs' => 2,
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('tables')->insert($tables);
    }
}