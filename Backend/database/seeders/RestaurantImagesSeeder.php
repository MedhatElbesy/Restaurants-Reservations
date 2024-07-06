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
            'https://elegencia-react-ejev.vercel.app/assets/img/about/about_bg.jpg',
            'https://elegencia-react-ejev.vercel.app/assets/img/about/about_open_hour.jpg',
            'https://elegencia-react-ejev.vercel.app/assets/img/portfolio/portfolio_2.jpg',
            'https://elegencia-react-ejev.vercel.app/assets/img/portfolio/portfolio_9.jpg',
            'https://elegencia-react-ejev.vercel.app/assets/img/portfolio/portfolio_8.jpg',
            'https://elegencia-react-ejev.vercel.app/assets/img/portfolio/portfolio_2.jpg',
            'https://elegencia-react-ejev.vercel.app/assets/img/portfolio/portfolio_3.jpg',
            'https://elegencia-react-ejev.vercel.app/assets/img/portfolio/portfolio_4.jpg',
            'https://elegencia-react-ejev.vercel.app/assets/img/bestItem/bestItem1.jpg',
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
