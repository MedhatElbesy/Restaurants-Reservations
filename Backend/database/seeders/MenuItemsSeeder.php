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
                'status' => ItemStatus::Unavailable,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'menu_category_id' => 1,
                'name' => 'Caesar Salad',
                'slug' => Str::slug('Caesar Salad'),
                'description' => 'Fresh romaine lettuce with Caesar dressing.',
                'price' => '7.99',
                'sale_price' => '6.99',
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'menu_category_id' => 1,
                'name' => 'Bruschetta',
                'slug' => Str::slug('Bruschetta'),
                'description' => 'Grilled bread topped with tomatoes, garlic, and basil.',
                'price' => '6.99',
                'sale_price' => '5.99',
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'menu_category_id' => 1,
                'name' => 'Stuffed Mushrooms',
                'slug' => Str::slug('Stuffed Mushrooms'),
                'description' => 'Mushrooms stuffed with cheese and herbs.',
                'price' => '8.99',
                'sale_price' => '7.99',
                'status' => ItemStatus::Unavailable,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'menu_category_id' => 1,
                'name' => 'Mozzarella Sticks',
                'slug' => Str::slug('Mozzarella Sticks'),
                'description' => 'Fried mozzarella cheese sticks with marinara sauce.',
                'price' => '7.99',
                'sale_price' => '6.99',
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
            [
                'menu_category_id' => 2,
                'name' => 'Margherita Pizza',
                'slug' => Str::slug('Margherita Pizza'),
                'description' => 'Classic pizza with tomato, mozzarella, and basil.',
                'price' => '9.99',
                'sale_price' => '8.99',
                'status' => ItemStatus::Unavailable,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'menu_category_id' => 2,
                'name' => 'Spaghetti Carbonara',
                'slug' => Str::slug('Spaghetti Carbonara'),
                'description' => 'Spaghetti with creamy sauce, pancetta, and Parmesan.',
                'price' => '11.99',
                'sale_price' => '10.99',
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'menu_category_id' => 2,
                'name' => 'Lasagna',
                'slug' => Str::slug('Lasagna'),
                'description' => 'Layers of pasta, meat sauce, and cheese.',
                'price' => '13.99',
                'sale_price' => '12.99',
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'menu_category_id' => 2,
                'name' => 'Chicken Parmesan',
                'slug' => Str::slug('Chicken Parmesan'),
                'description' => 'Breaded chicken breast topped with marinara sauce and cheese.',
                'price' => '14.99',
                'sale_price' => '13.99',
                'status' => ItemStatus::Unavailable,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'menu_category_id' => 2,
                'name' => 'Ravioli',
                'slug' => Str::slug('Ravioli'),
                'description' => 'Stuffed pasta with ricotta cheese, served with marinara sauce.',
                'price' => '12.99',
                'sale_price' => '11.99',
                'status' => ItemStatus::Available,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}