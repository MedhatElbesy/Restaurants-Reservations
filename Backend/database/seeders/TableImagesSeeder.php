<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
class TableImagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $images = [
            [
                'table_id' => 1,
                'image' => 'https://tinyurl.com/344r9u35',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'table_id' => 1,
                'image' => 'https://tinyurl.com/mphexb9b',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'table_id' => 1,
                'image' => 'https://tinyurl.com/y4ty8acw',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'table_id' => 1,
                'image' => 'https://tinyurl.com/39ywyfed',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'table_id' => 2,
                'image' => 'https://tinyurl.com/bdhj2z9y',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'table_id' => 2,
                'image' => 'https://tinyurl.com/2eye84mw',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'table_id' => 2,
                'image' => 'https://tinyurl.com/jb2f4fxr',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'table_id' => 3,
                'image' => 'https://tinyurl.com/5n7nrhkp',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'table_id' => 3,
                'image' => 'https://tinyurl.com/579mmhx6',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('table_images')->insert($images);

    }
}
