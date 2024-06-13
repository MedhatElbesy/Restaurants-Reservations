<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('countries')->insert([
            ['name' => 'Egypt', 'country_code' => 'EG'],
            ['name' => 'Saudi Arabia', 'country_code' => 'SA'],
            ['name' => 'United Arab Emirates', 'country_code' => 'AE'],
            ['name' => 'Jordan', 'country_code' => 'JO'],
            ['name' => 'Lebanon', 'country_code' => 'LB'],
            ['name' => 'Iraq', 'country_code' => 'IQ'],
            ['name' => 'Syria', 'country_code' => 'SY'],
            ['name' => 'Yemen', 'country_code' => 'YE'],
            ['name' => 'Oman', 'country_code' => 'OM'],
            ['name' => 'Kuwait', 'country_code' => 'KW'],
            ['name' => 'Qatar', 'country_code' => 'QA'],
            ['name' => 'Bahrain', 'country_code' => 'BH'],
        ]);
    }
}
