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
        $tables =
        [
            [
                'restaurant_location_id' => 1,
                'number_of_chairs' => 4,
                'max_number_of_persons' => 8,
                'description' => "A comfortable table set for small gatherings.",
                'cover' => 'https://tinyurl.com/579mmhx6',
                'price' => 120.00,
                'sale_price' => 100.00,
                'extra_number_of_chairs' => 3,
                'extra_number_of_childs_chairs' => 2,
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'number_of_chairs' => 6,
                'max_number_of_persons' => 12,
                'description' => "This spacious table set is perfect for larger groups",
                'cover' => 'https://tinyurl.com/5n7nrhkp',
                'price' => 150.00,
                'sale_price' => 130.00,
                'extra_number_of_chairs' => 4,
                'extra_number_of_childs_chairs' => 2,
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'number_of_chairs' => 6,
                'max_number_of_persons' => 4,
                'description' => "This spacious table set is perfect for larger groups",
                'cover' => 'https://tinyurl.com/2eye84mw',
                'price' => 80.00,
                'sale_price' => 60.00,
                'extra_number_of_chairs' => 1,
                'extra_number_of_cilds_chairs' => 2,
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'number_of_chairs' => 4,
                'max_number_of_persons' => 8,
                'description' => "A comfortable table set for small gatherings.",
                'cover' => 'https://tinyurl.com/344r9u35',
                'price' => 120.00,
                'sale_price' => 100.00,
                'extra_number_of_chairs' => 1,
                'extra_number_of_childs_chairs' => 1,
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'number_of_chairs' => 6,
                'max_number_of_persons' => 12,
                'description' => "This spacious table set is perfect for larger groups",
                'cover' => 'https://tinyurl.com/mphexb9b',
                'price' => 150.00,
                'sale_price' => 130.00,
                'extra_number_of_chairs' => 0,
                'extra_number_of_childs_chairs' => 2,
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'number_of_chairs' => 6,
                'max_number_of_persons' => 4,
                'description' => "This spacious table set is perfect for larger groups",
                'cover' => 'https://tinyurl.com/39ywyfed',
                'price' => 80.00,
                'sale_price' => 60.00,
                'extra_number_of_chairs' => 1,
                'extra_number_of_cilds_chairs' => 2,
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 3,
                'number_of_chairs' => 8,
                'max_number_of_persons' => 16,
                'description' => "Newly added to our collection.",
                'cover' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4VuYowKNWwiHdc7JB0THZe7G1qV2tHS9OYw&s',
                'price' => 200.00,
                'sale_price' => 180.00,
                'extra_number_of_chairs' => 2,
                'extra_number_of_childs_chairs' => 0,
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];


        DB::table('tables')->insert($tables);
    }
}