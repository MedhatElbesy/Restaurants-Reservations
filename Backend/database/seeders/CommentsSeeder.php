<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('comments')->insert([
            [
                'restaurant_location_id' => 1,
                'user_id' => 1,
                'comment' => " Very Good ",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'user_id' => 1,
                'comment' => " Very Good ",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 2,
                'user_id' => 1,
                'comment' => " Very Good ",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 3,
                'user_id' => 1,
                'comment' => " Very Good ",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 4,
                'user_id' => 1,
                'comment' => " Very Good ",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 5,
                'user_id' => 1,
                'comment' => " Very Good ",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 6,
                'user_id' => 1,
                'comment' => " Very Good ",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 7,
                'user_id' => 1,
                'comment' => " Very Good ",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 8,
                'user_id' => 1,
                'comment' => " Very Good ",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 9,
                'user_id' => 1,
                'comment' => " Very Good ",
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
