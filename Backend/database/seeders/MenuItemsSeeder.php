<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Enums\ItemStatus;
class MenuItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('menu_items')->insert([
            [
                'menu_category_id' => 1,
                'name' => 'Spring Rolls',
                'slug' => Str::slug('Spring Rolls'),
                'description' => 'Crispy spring rolls filled with vegetables.',
                'price' => '5.99',
                'sale_price' => '4.99',
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'menu_category_id' => 1,
                'name' => 'Garlic Bread',
                'slug' => Str::slug('Garlic Bread'),
                'description' => 'Toasted bread topped with garlic butter.',
                'price' => '3.99',
                'sale_price' => '2.99',
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'menu_category_id' => 2,
                'name' => 'Grilled Chicken',
                'slug' => Str::slug('Grilled Chicken'),
                'description' => 'Juicy grilled chicken breast served with sides.',
                'price' => '12.99',
                'sale_price' => '11.99',
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'menu_category_id' => 2,
                'name' => 'Pasta Alfredo',
                'slug' => Str::slug('Pasta Alfredo'),
                'description' => 'Creamy Alfredo pasta with a hint of garlic.',
                'price' => '10.99',
                'sale_price' => '9.99',
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
