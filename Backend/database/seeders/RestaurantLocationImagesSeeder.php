<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RestaurantLocationImagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('restaurant_location_images')->insert([
            [
                'restaurant_location_id' => 1,
                'image' => 'https://elegencia-react-ejev.vercel.app/assets/img/about/about_open_hour.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'image' => 'https://images.unsplash.com/photo-1552598810-e76dd2eb05e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTg3fHxyZXN0YXVyYW50c3xlbnwwfHwwfHx8MA%3D%3D',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'image' => 'https://images.unsplash.com/photo-1579648207097-edbc62b94930?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxyZXN0YXVyYW50c3xlbnwwfHwwfHx8MA%3D%3D',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 1,
                'image' => 'https://images.unsplash.com/photo-1554538693-d854cceb26a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fHJlc3RhdXJhbnRzfGVufDB8fDB8fHww',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 2,
                'image' => 'https://images.unsplash.com/photo-1633082559031-da8af4abdcf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fHJlc3RhdXJhbnRzfGVufDB8fDB8fHww',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 2,
                'image' => 'https://images.unsplash.com/photo-1570560258879-af7f8e1447ac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHJlc3RhdXJhbnRzfGVufDB8fDB8fHww',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 3,
                'image' => 'https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHJlc3RhdXJhbnRzfGVufDB8fDB8fHww',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 3,
                'image' => 'https://images.unsplash.com/photo-1623800330578-2cd67efaec75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHJlc3RhdXJhbnRzfGVufDB8fDB8fHww',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 4,
                'image' => 'https://images.unsplash.com/photo-1574936145840-28808d77a0b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 5,
                'image' => 'https://images.unsplash.com/photo-1602232037779-30b01ac3c457?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 6,
                'image' => 'https://images.unsplash.com/photo-1528735000313-039ec3a473b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTN8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 7,
                'image' => 'https://images.unsplash.com/photo-1531973819741-e27a5ae2cc7b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA5fHxyZXN0YXVyYW50fGVufDB8fDB8fHww',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 7,
                'image' => 'https://images.unsplash.com/photo-1571168136613-46401b03904e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE4fHxyZXN0YXVyYW50fGVufDB8fDB8fHww',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 8,
                'image' => 'https://images.unsplash.com/photo-1610894803089-0c3283d8d059?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc3fHxyZXN0YXVyYW50fGVufDB8fDB8fHww',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 9,
                'image' => 'https://images.unsplash.com/photo-1565650839149-2c48a094196c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTgzfHxyZXN0YXVyYW50fGVufDB8fDB8fHww',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_location_id' => 10,
                'image' => 'https://images.unsplash.com/photo-1538333581680-29dd4752ddf2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTg5fHxyZXN0YXVyYW50fGVufDB8fDB8fHww',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
