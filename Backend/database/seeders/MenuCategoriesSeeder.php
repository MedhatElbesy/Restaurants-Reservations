<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Enums\ItemStatus;
class MenuCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('menu_categories')->insert([
            [
                'restaurant_id' => 1,
                'name' => 'Appetizers',
                'slug' => Str::slug('Appetizers'),
                'description' => 'Delicious appetizers to start your meal.',
                'status' => ItemStatus::Enabled,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 1,
                'name' => 'Main Courses',
                'slug' => Str::slug('Main Courses'),
                'description' => 'Hearty and satisfying main courses.',
                'status' => ItemStatus::Enabled,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 2,
                'name' => 'Desserts',
                'slug' => Str::slug('Desserts'),
                'description' => 'Sweet treats to end your meal.',
                'status' => ItemStatus::Enabled,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 2,
                'name' => 'Beverages',
                'slug' => Str::slug('Beverages'),
                'description' => 'Refreshing drinks.',
                'status' => ItemStatus::Enabled,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
