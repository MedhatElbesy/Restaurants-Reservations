<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
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
        $users = User::all();

        if ($users->isEmpty()) {
            $this->command->info('No users found. Please seed users table first.');
            return;
        }

        DB::table('categories')->insert([
            [
                'user_id' => $users->random()->id,
                'name' => 'Appetizers',
                'slug' => Str::slug('Appetizers'),
                'cover' => 'covers/appetizers.jpg',
                'description' => 'A variety of starters to begin your meal.',
                'status' => ItemStatus::Enabled,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $users->random()->id,
                'name' => 'Main Courses',
                'slug' => Str::slug('Main Courses'),
                'cover' => 'covers/main_courses.jpg',
                'description' => 'Hearty and fulfilling main course options.',
                'status' => ItemStatus::Enabled,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $users->random()->id,
                'name' => 'Desserts',
                'slug' => Str::slug('Desserts'),
                'cover' => 'covers/desserts.jpg',
                'description' => 'Sweet treats to end your meal on a high note.',
                'status' => ItemStatus::Enabled,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $users->random()->id,
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
