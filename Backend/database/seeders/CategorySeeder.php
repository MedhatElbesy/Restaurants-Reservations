<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Enums\ItemStatus;
class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('categories')->insert([
            [
                'name' => 'Appetizers',
                'slug' => Str::slug('Appetizers'),
                'cover' => 'covers/appetizers.jpg',
                'description' => 'A variety of starters to begin your meal.',
                'status' => ItemStatus::Enabled,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Main Courses',
                'slug' => Str::slug('Main Courses'),
                'cover' => 'covers/main_courses.jpg',
                'description' => 'Hearty and fulfilling main course options.',
                'status' => ItemStatus::Enabled,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Desserts',
                'slug' => Str::slug('Desserts'),
                'cover' => 'covers/desserts.jpg',
                'description' => 'Sweet treats to end your meal on a high note.',
                'status' => ItemStatus::Enabled,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Beverages',
                'slug' => Str::slug('Beverages'),
                'cover' => 'covers/beverages.jpg',
                'description' => 'Refreshing drinks to accompany your meal.',
                'status' => ItemStatus::Enabled,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
