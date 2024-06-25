<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Enums\ItemStatus;
use Faker\Factory as Faker;
class TableAvailabilitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $availabilities = [
            [
                'table_id' => 1,
                'start_time' => '01:00:00',
                'end_time' => '03:00:00',
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'table_id' => 1,
                'start_time' => '04:00:00',
                'end_time' => '05:00:00',
                'status' => ItemStatus::Unavailable,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'table_id' => 1,
                'start_time' => '06:00:00',
                'end_time' => '08:00:00',
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'table_id' => 1,
                'start_time' => '09:00:00',
                'end_time' => '10:00:00',
                'status' => ItemStatus::Unavailable,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'table_id' => 1,
                'start_time' => '11:00:00',
                'end_time' => '12:00:00',
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'table_id' => 2,
                'start_time' => '01:00:00',
                'end_time' => '03:00:00',
                'status' => ItemStatus::Unavailable,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'table_id' => 2,
                'start_time' => '04:00:00',
                'end_time' => '05:00:00',
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'table_id' => 2,
                'start_time' => '06:00:00',
                'end_time' => '08:00:00',
                'status' => ItemStatus::Unavailable,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'table_id' => 2,
                'start_time' => '09:00:00',
                'end_time' => '10:00:00',
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'table_id' => 2,
                'start_time' => '11:00:00',
                'end_time' => '12:00:00',
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],

        ];

        DB::table('table_availabilities')->insert($availabilities);
    }
}
