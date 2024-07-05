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
                'comment' => "The food here is always top-notch. Every dish we've tried has been a delightful journey of flavors and textures. The service is friendly and efficient, making each visit a pleasure.",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'user_id' => 2,
                'comment' => "This restaurant is our go-to place for special occasions. The ambiance is elegant yet cozy, perfect for a romantic dinner. The menu offers a great selection, and we always leave satisfied",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'user_id' => 1,
                'comment' => "Perfect place for a family dinner. The atmosphere is warm, and the menu has options that appeal to both adults and children. The service is prompt and friendly",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'user_id' => 2,
                'comment' => "The food here is always top-notch. Every dish we've tried has been a delightful journey of flavors and textures. The service is friendly and efficient, making each visit a pleasure.",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'user_id' => 1,
                'comment' => "This restaurant is our go-to place for special occasions. The ambiance is elegant yet cozy, perfect for a romantic dinner. The menu offers a great selection, and we always leave satisfied",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'user_id' => 1,
                'comment' => "Perfect place for a family dinner. The atmosphere is warm, and the menu has options that appeal to both adults and children. The service is prompt and friendly",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'user_id' => 2,
                'comment' => "The food here is always top-notch. Every dish we've tried has been a delightful journey of flavors and textures. The service is friendly and efficient, making each visit a pleasure.",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'user_id' => 1,
                'comment' => "This restaurant is our go-to place for special occasions. The ambiance is elegant yet cozy, perfect for a romantic dinner. The menu offers a great selection, and we always leave satisfied",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'user_id' => 2,
                'comment' => "Perfect place for a family dinner. The atmosphere is warm, and the menu has options that appeal to both adults and children. The service is prompt and friendly",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'user_id' => 2,
                'comment' => "The food here is always top-notch. Every dish we've tried has been a delightful journey of flavors and textures. The service is friendly and efficient, making each visit a pleasure.",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'user_id' => 1,
                'comment' => "This restaurant is our go-to place for special occasions. The ambiance is elegant yet cozy, perfect for a romantic dinner. The menu offers a great selection, and we always leave satisfied",
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'user_id' => 2,
                'comment' => "Perfect place for a family dinner. The atmosphere is warm, and the menu has options that appeal to both adults and children. The service is prompt and friendly",
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}