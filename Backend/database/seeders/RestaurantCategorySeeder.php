<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RestaurantCategory;
use App\Models\Restaurant;
use App\Models\Category;
use Illuminate\Support\Facades\DB;

class RestaurantCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $restaurants = Restaurant::all();
        $categories = Category::all();

        foreach ($restaurants as $restaurant) {
            foreach ($categories as $category) {
                RestaurantCategory::create([
                    'restaurant_id' => $restaurant->id,
                    'category_id' => $category->id,
                    'status' => 'enabled', // 'disabled', 'deleted'
                ]);
            }
        }
    }
}
