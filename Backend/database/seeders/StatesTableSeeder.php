<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $states = [
            // Cairo, Egypt
            ['city_id' => 1, 'name' => 'Nasr City'],
            ['city_id' => 1, 'name' => 'Maadi'],
            ['city_id' => 1, 'name' => 'Heliopolis'],
            ['city_id' => 1, 'name' => 'Zamalek'],

            // Giza, Egypt
            ['city_id' => 2, 'name' => '6th of October City'],
            ['city_id' => 2, 'name' => 'Sheikh Zayed City'],
            ['city_id' => 2, 'name' => 'Dokki'],
            ['city_id' => 2, 'name' => 'Agouza'],

            // Alexandria, Egypt
            ['city_id' => 3, 'name' => 'Alexandria City'],
            ['city_id' => 3, 'name' => 'Borg El Arab'],
            ['city_id' => 3, 'name' => 'Miami'],

            // Riyadh, Saudi Arabia
            ['city_id' => 4, 'name' => 'Downtown Riyadh'],
            ['city_id' => 4, 'name' => 'Al Olaya'],
            ['city_id' => 4, 'name' => 'Malaz'],
            ['city_id' => 4, 'name' => 'Al Rawdah'],

            // Mecca, Saudi Arabia
            ['city_id' => 5, 'name' => 'Mecca City'],
            ['city_id' => 5, 'name' => 'Al Aziziyah'],
            ['city_id' => 5, 'name' => 'Al Hujun'],

            // Medina, Saudi Arabia
            ['city_id' => 6, 'name' => 'Medina City'],
            ['city_id' => 6, 'name' => 'Al Manar'],
            ['city_id' => 6, 'name' => 'Al Munnawarah'],

            // Abu Dhabi, UAE
            ['city_id' => 7, 'name' => 'Abu Dhabi City'],
            ['city_id' => 7, 'name' => 'Al Ain'],
            ['city_id' => 7, 'name' => 'Khalifa City'],

            // Dubai, UAE
            ['city_id' => 8, 'name' => 'Dubai City'],
            ['city_id' => 8, 'name' => 'Sharjah'],
            ['city_id' => 8, 'name' => 'Ajman'],
            ['city_id' => 8, 'name' => 'Fujairah'],

            // Sharjah, UAE
            ['city_id' => 9, 'name' => 'Sharjah City'],
            ['city_id' => 9, 'name' => 'Al Majaz'],
            ['city_id' => 9, 'name' => 'Al Qasimia'],

            // Amman, Jordan
            ['city_id' => 10, 'name' => 'Amman City'],
            ['city_id' => 10, 'name' => 'Abdoun'],
            ['city_id' => 10, 'name' => 'Jabal Amman'],

            // Irbid, Jordan
            ['city_id' => 11, 'name' => 'Irbid City'],
            ['city_id' => 11, 'name' => 'Al Hussein'],
            ['city_id' => 11, 'name' => 'Al Yarmouk'],

            // Aqaba, Jordan
            ['city_id' => 12, 'name' => 'Aqaba City'],
            ['city_id' => 12, 'name' => 'Al Ramtha'],
            ['city_id' => 12, 'name' => 'Maan'],

            // Beirut, Lebanon
            ['city_id' => 13, 'name' => 'Beirut City'],
            ['city_id' => 13, 'name' => 'Ashrafieh'],
            ['city_id' => 13, 'name' => 'Hamra'],

            // Tripoli, Lebanon
            ['city_id' => 14, 'name' => 'Tripoli City'],
            ['city_id' => 14, 'name' => 'Al Mina'],
            ['city_id' => 14, 'name' => 'El Qalamoun'],

            // Sidon, Lebanon
            ['city_id' => 15, 'name' => 'Sidon City'],
            ['city_id' => 15, 'name' => 'Tyre'],
            ['city_id' => 15, 'name' => 'Jezzine'],

            // Baghdad, Iraq
            ['city_id' => 16, 'name' => 'Baghdad City'],
            ['city_id' => 16, 'name' => 'Al Mansour'],
            ['city_id' => 16, 'name' => 'Al Karkh'],

            // Basra, Iraq
            ['city_id' => 17, 'name' => 'Basra City'],
            ['city_id' => 17, 'name' => 'Al Zubair'],
            ['city_id' => 17, 'name' => 'Abu Al Khasib'],

            // Erbil, Iraq
            ['city_id' => 18, 'name' => 'Erbil City'],
            ['city_id' => 18, 'name' => 'Soran'],
            ['city_id' => 18, 'name' => 'Halabja'],

            // Damascus, Syria
            ['city_id' => 19, 'name' => 'Damascus City'],
            ['city_id' => 19, 'name' => 'Malki'],
            ['city_id' => 19, 'name' => 'Kafr Sousa'],

            // Aleppo, Syria
            ['city_id' => 20, 'name' => 'Aleppo City'],
            ['city_id' => 20, 'name' => 'Azaz'],
            ['city_id' => 20, 'name' => 'Jarabulus'],

            // Homs, Syria
            ['city_id' => 21, 'name' => 'Homs City'],
            ['city_id' => 21, 'name' => 'Al Waer'],
            ['city_id' => 21, 'name' => 'Tadmur'],

            // Sanaa, Yemen
            ['city_id' => 22, 'name' => 'Sanaa City'],
            ['city_id' => 22, 'name' => 'Ad Dali'],
            ['city_id' => 22, 'name' => 'Al Hudaydah'],

            // Aden, Yemen
            ['city_id' => 23, 'name' => 'Aden City'],
            ['city_id' => 23, 'name' => 'Al Mukalla'],
            ['city_id' => 23, 'name' => 'Sayoun'],

            // Taiz, Yemen
            ['city_id' => 24, 'name' => 'Taiz City'],
            ['city_id' => 24, 'name' => 'Al Hudaydah'],
            ['city_id' => 24, 'name' => 'Ibb'],

            // Muscat, Oman
            ['city_id' => 25, 'name' => 'Muscat City'],
            ['city_id' => 25, 'name' => 'Muttrah'],
            ['city_id' => 25, 'name' => 'Al Seeb'],

            // Salalah, Oman
            ['city_id' => 26, 'name' => 'Salalah City'],
            ['city_id' => 26, 'name' => 'Mirbat'],
            ['city_id' => 26, 'name' => 'Raysut'],

            // Kuwait City, Kuwait
            ['city_id' => 27, 'name' => 'Kuwait City'],
            ['city_id' => 27, 'name' => 'Al Jahra'],

            // Hawalli, Kuwait
            ['city_id' => 28, 'name' => 'Hawalli City'],
            ['city_id' => 28, 'name' => 'Salmiya'],
            ['city_id' => 28, 'name' => 'Mishref'],

            // Doha, Qatar
            ['city_id' => 29, 'name' => 'Doha City'],
            ['city_id' => 29, 'name' => 'Al Dafna'],
            ['city_id' => 29, 'name' => 'Al Sadd'],

            // Al Rayyan, Qatar
            ['city_id' => 30, 'name' => 'Al Rayyan City'],
            ['city_id' => 30, 'name' => 'Umm Salal'],

            // Manama, Bahrain
            ['city_id' => 31, 'name' => 'Manama City'],
            ['city_id' => 31, 'name' => 'Juffair'],

            // Muharraq, Bahrain
            ['city_id' => 32, 'name' => 'Muh'],
        ];
        
        DB::table('states')->insert($states);
    }
}
