<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Enums\ItemStatus;
class RestaurantCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('restaurant_categories')->insert([
            [
                'restaurant_id' => 1,
                'category_id' => 1,
                'status' => ItemStatus::Enabled,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'restaurant_id' => 2,
                'category_id' => 3,
                'status' => ItemStatus::Enabled,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
