<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GovernorateTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Assuming country_id is based on the order of insertion from CountriesTableSeeder
        $governorates = [
            // Egypt
            ['country_id' => 1, 'name' => 'Cairo'],
            ['country_id' => 1, 'name' => 'Giza'],
            ['country_id' => 1, 'name' => 'Alexandria'],
            // Saudi Arabia
            ['country_id' => 2, 'name' => 'Riyadh'],
            ['country_id' => 2, 'name' => 'Mecca'],
            ['country_id' => 2, 'name' => 'Medina'],
            // UAE
            ['country_id' => 3, 'name' => 'Abu Dhabi'],
            ['country_id' => 3, 'name' => 'Dubai'],
            ['country_id' => 3, 'name' => 'Sharjah'],
            // Jordan
            ['country_id' => 4, 'name' => 'Amman'],
            ['country_id' => 4, 'name' => 'Irbid'],
            ['country_id' => 4, 'name' => 'Aqaba'],
            // Lebanon
            ['country_id' => 5, 'name' => 'Beirut'],
            ['country_id' => 5, 'name' => 'Tripoli'],
            ['country_id' => 5, 'name' => 'Sidon'],
            // Iraq
            ['country_id' => 6, 'name' => 'Baghdad'],
            ['country_id' => 6, 'name' => 'Basra'],
            ['country_id' => 6, 'name' => 'Erbil'],
            // Syria
            ['country_id' => 7, 'name' => 'Damascus'],
            ['country_id' => 7, 'name' => 'Aleppo'],
            ['country_id' => 7, 'name' => 'Homs'],
            // Yemen
            ['country_id' => 8, 'name' => 'Sanaa'],
            ['country_id' => 8, 'name' => 'Aden'],
            ['country_id' => 8, 'name' => 'Taiz'],
            // Oman
            ['country_id' => 9, 'name' => 'Muscat'],
            ['country_id' => 9, 'name' => 'Salalah'],
            // Kuwait
            ['country_id' => 10, 'name' => 'Kuwait City'],
            ['country_id' => 10, 'name' => 'Hawalli'],
            // Qatar
            ['country_id' => 11, 'name' => 'Doha'],
            ['country_id' => 11, 'name' => 'Al Rayyan'],
            // Bahrain
            ['country_id' => 12, 'name' => 'Manama'],
            ['country_id' => 12, 'name' => 'Muharraq'],
        ];

        DB::table('governorates')->insert($governorates);
    }
}
