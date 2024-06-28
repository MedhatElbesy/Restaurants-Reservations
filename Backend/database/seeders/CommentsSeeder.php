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
                'restaurant_id' => 1,
                'user_id' => 1,
                'comment' => " Vrey Good ",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 1,
                'user_id' => 1,
                'comment' => " Vrey Good ",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 2,
                'user_id' => 1,
                'comment' => " Vrey Good ",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 3,
                'user_id' => 1,
                'comment' => " Vrey Good ",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 4,
                'user_id' => 1,
                'comment' => " Vrey Good ",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 5,
                'user_id' => 1,
                'comment' => " Vrey Good ",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 6,
                'user_id' => 1,
                'comment' => " Vrey Good ",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 7,
                'user_id' => 1,
                'comment' => " Vrey Good ",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 8,
                'user_id' => 1,
                'comment' => " Vrey Good ",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 9,
                'user_id' => 1,
                'comment' => " Vrey Good ",
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
