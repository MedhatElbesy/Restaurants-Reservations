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
                'image' => 'image1.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'table_id' => 2,
                'image' => 'image2.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
        ];

        DB::table('table_images')->insert($images);

    }
}
