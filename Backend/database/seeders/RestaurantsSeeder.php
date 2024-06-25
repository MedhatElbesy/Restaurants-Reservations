<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Enums\UserStatus;

class RestaurantsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('restaurants')->insert([
            [
                'user_id' => 1,
                'logo' => 'logos/restaurant1.png',
                'cover' => 'covers/restaurant1.jpg',
                'name' => 'The Great Restaurant',
                'slug' => str::slug('The Great Restaurant'),
                'title' => 'Best Dining Experience',
                'summary' => 'A brief summary about The Great Restaurant.',
                'description' => 'An extended description about The Great Restaurant and its offerings.',
                'hot_line' => '800-123-4567',
                'status' => UserStatus::Active,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'logo' => 'logos/restaurant2.png',
                'cover' => 'covers/restaurant2.jpg',
                'name' => 'Nrban Eats',
                'slug' => Str::slug('Nrban Eats'),
                'title' => 'Delicious Urban Cuisine',
                'summary' => 'A brief summary about Urban Eats.',
                'description' => 'An extended description about Urban Eats and its urban cuisine.',
                'hot_line' => '900-123-4567',
                'status' => UserStatus::Active,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'logo' => 'logos/restaurant3.png',
                'cover' => 'covers/restaurant3.jpg',
                'name' => 'Urban Eats',
                'slug' => Str::slug('Urban Eats'),
                'title' => '3Delicious Urban Cuisine',
                'summary' => '3A brief summary about Urban Eats.',
                'description' => '3An extended description about Urban Eats and its urban cuisine.',
                'hot_line' => '810-123-4567',
                'status' => UserStatus::InActive,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
