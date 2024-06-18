<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserActivationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $activations = [
            [
                'user_id' => 1,
                'token' => 'token_for_user_1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'token' => 'token_for_user_2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('user_activations')->insert($activations);
    }
}
