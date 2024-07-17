<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RestaurantImages;
use Illuminate\Support\Facades\DB;

class RestaurantImagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $imageUrls = [
            'https://images.unsplash.com/photo-1574936145840-28808d77a0b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D',
            'https://images.unsplash.com/photo-1543007631-283050bb3e8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D',
            'https://images.unsplash.com/photo-1602232037779-30b01ac3c457?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D',
            'https://images.unsplash.com/photo-1569096651661-820d0de8b4ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAzfHxyZXN0YXVyYW50fGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1531973819741-e27a5ae2cc7b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA5fHxyZXN0YXVyYW50fGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1567745219000-b99afacf5ef6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIyfHxyZXN0YXVyYW50fGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1610894803089-0c3283d8d059?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc3fHxyZXN0YXVyYW50fGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1569541372853-97033ae8983b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTUwfHxyZXN0YXVyYW50fGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjAxfHxyZXN0YXVyYW50fGVufDB8fDB8fHww',
        ];

        $restaurantIds = DB::table('restaurants')->pluck('id')->toArray();

        foreach ($restaurantIds as $restaurantId) {
            foreach ($imageUrls as $imageUrl) {
                RestaurantImages::create([
                    'restaurant_id' => $restaurantId,
                    'image' => $imageUrl,
                ]);
            }
        }
    }
}