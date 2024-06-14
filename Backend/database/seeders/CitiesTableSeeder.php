<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cities = [
            // Cairo, Egypt
            ['governorate_id' => 1, 'name' => 'Nasr City'],
            ['governorate_id' => 1, 'name' => 'Maadi'],
            ['governorate_id' => 1, 'name' => 'Heliopolis'],
            ['governorate_id' => 1, 'name' => 'Zamalek'],
            ['governorate_id' => 1, 'name' => 'Mohandessin'],

            // Giza, Egypt
            ['governorate_id' => 2, 'name' => '6th of October City'],
            ['governorate_id' => 2, 'name' => 'Sheikh Zayed City'],
            ['governorate_id' => 2, 'name' => 'Dokki'],
            ['governorate_id' => 2, 'name' => 'Agouza'],

            // Alexandria, Egypt
            ['governorate_id' => 3, 'name' => 'Alexandria City'],
            ['governorate_id' => 3, 'name' => 'Borg El Arab'],
            ['governorate_id' => 3, 'name' => 'Miami'],

            // Riyadh, Saudi Arabia
            ['governorate_id' => 4, 'name' => 'Downtown Riyadh'],
            ['governorate_id' => 4, 'name' => 'Al Olaya'],
            ['governorate_id' => 4, 'name' => 'Malaz'],
            ['governorate_id' => 4, 'name' => 'Al Rawdah'],

            // Mecca, Saudi Arabia
            ['governorate_id' => 5, 'name' => 'Mecca City'],
            ['governorate_id' => 5, 'name' => 'Al Aziziyah'],
            ['governorate_id' => 5, 'name' => 'Al Hujun'],

            // Medina, Saudi Arabia
            ['governorate_id' => 6, 'name' => 'Medina City'],
            ['governorate_id' => 6, 'name' => 'Al Manar'],
            ['governorate_id' => 6, 'name' => 'Al Munnawarah'],

            // Abu Dhabi, UAE
            ['governorate_id' => 7, 'name' => 'Abu Dhabi City'],
            ['governorate_id' => 7, 'name' => 'Al Ain'],
            ['governorate_id' => 7, 'name' => 'Khalifa City'],

            // Dubai, UAE
            ['governorate_id' => 8, 'name' => 'Dubai City'],
            ['governorate_id' => 8, 'name' => 'Sharjah'],
            ['governorate_id' => 8, 'name' => 'Ajman'],
            ['governorate_id' => 8, 'name' => 'Fujairah'],

            // Sharjah, UAE
            ['governorate_id' => 9, 'name' => 'Sharjah City'],
            ['governorate_id' => 9, 'name' => 'Al Majaz'],
            ['governorate_id' => 9, 'name' => 'Al Qasimia'],

            // Amman, Jordan
            ['governorate_id' => 10, 'name' => 'Amman City'],
            ['governorate_id' => 10, 'name' => 'Abdoun'],
            ['governorate_id' => 10, 'name' => 'Jabal Amman'],

            // Irbid, Jordan
            ['governorate_id' => 11, 'name' => 'Irbid City'],
            ['governorate_id' => 11, 'name' => 'Al Hussein'],
            ['governorate_id' => 11, 'name' => 'Al Yarmouk'],

            // Aqaba, Jordan
            ['governorate_id' => 12, 'name' => 'Aqaba City'],
            ['governorate_id' => 12, 'name' => 'Al Ramtha'],
            ['governorate_id' => 12, 'name' => 'Maan'],

            // Beirut, Lebanon
            ['governorate_id' => 13, 'name' => 'Beirut City'],
            ['governorate_id' => 13, 'name' => 'Ashrafieh'],
            ['governorate_id' => 13, 'name' => 'Hamra'],

            // Tripoli, Lebanon
            ['governorate_id' => 14, 'name' => 'Tripoli City'],
            ['governorate_id' => 14, 'name' => 'Al Mina'],
            ['governorate_id' => 14, 'name' => 'El Qalamoun'],

            // Sidon, Lebanon
            ['governorate_id' => 15, 'name' => 'Sidon City'],
            ['governorate_id' => 15, 'name' => 'Tyre'],
            ['governorate_id' => 15, 'name' => 'Jezzine'],

            // Baghdad, Iraq
            ['governorate_id' => 16, 'name' => 'Baghdad City'],
            ['governorate_id' => 16, 'name' => 'Al Mansour'],
            ['governorate_id' => 16, 'name' => 'Al Karkh'],

            // Basra, Iraq
            ['governorate_id' => 17, 'name' => 'Basra City'],
            ['governorate_id' => 17, 'name' => 'Al Zubair'],
            ['governorate_id' => 17, 'name' => 'Abu Al Khasib'],

            // Erbil, Iraq
            ['governorate_id' => 18, 'name' => 'Erbil City'],
            ['governorate_id' => 18, 'name' => 'Soran'],
            ['governorate_id' => 18, 'name' => 'Halabja'],

            // Damascus, Syria
            ['governorate_id' => 19, 'name' => 'Damascus City'],
            ['governorate_id' => 19, 'name' => 'Malki'],
            ['governorate_id' => 19, 'name' => 'Kafr Sousa'],

            // Aleppo, Syria
            ['governorate_id' => 20, 'name' => 'Aleppo City'],
            ['governorate_id' => 20, 'name' => 'Azaz'],
            ['governorate_id' => 20, 'name' => 'Jarabulus'],

            // Homs, Syria
            ['governorate_id' => 21, 'name' => 'Homs City'],
            ['governorate_id' => 21, 'name' => 'Al Waer'],
            ['governorate_id' => 21, 'name' => 'Tadmur'],

            // Sanaa, Yemen
            ['governorate_id' => 22, 'name' => 'Sanaa City'],
            ['governorate_id' => 22, 'name' => 'Ad Dali'],
            ['governorate_id' => 22, 'name' => 'Al Hudaydah'],

            // Aden, Yemen
            ['governorate_id' => 23, 'name' => 'Aden City'],
            ['governorate_id' => 23, 'name' => 'Al Mukalla'],
            ['governorate_id' => 23, 'name' => 'Sayoun'],

            // Taiz, Yemen
            ['governorate_id' => 24, 'name' => 'Taiz City'],
            ['governorate_id' => 24, 'name' => 'Al Hudaydah2'],
            ['governorate_id' => 24, 'name' => 'Ibb'],

            // Muscat, Oman
            ['governorate_id' => 25, 'name' => 'Muscat City'],
            ['governorate_id' => 25, 'name' => 'Muttrah'],
            ['governorate_id' => 25, 'name' => 'Al Seeb'],

            // Salalah, Oman
            ['governorate_id' => 26, 'name' => 'Salalah City'],
            ['governorate_id' => 26, 'name' => 'Mirbat'],
            ['governorate_id' => 26, 'name' => 'Raysut'],

            // Kuwait City, Kuwait
            ['governorate_id' => 27, 'name' => 'Kuwait City'],
            ['governorate_id' => 27, 'name' => 'Al Jahra'],
            ['governorate_id' => 27, 'name' => 'Mubarak Al-Kabeer'],

            // Kuwait
            ['governorate_id' => 28, 'name' => 'Hawalli'],

            // Qatar
            ['governorate_id' => 29, 'name' => 'Doha'],
            ['governorate_id' => 30, 'name' => 'Al Rayyan'],

            // Bahrain
            ['governorate_id' => 31, 'name' => 'Manama'],
            ['governorate_id' => 32, 'name' => 'Muharraq'],
        ];

        DB::table('cities')->insert($cities);

    }
}
