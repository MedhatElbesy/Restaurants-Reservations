<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Category::create([
            'name' => 'Fast Food',
            'slug' => 'fast-food',
            'cover' => null,
            'description' => 'Fast food category description',
            'status' => 'Enabled',
        ]);

        Category::create([
            'name' => 'Fine Dining',
            'slug' => 'fine-dining',
            'cover' => null,
            'description' => 'Fine dining category description',
            'status' => 'Enabled',
        ]);
    }
}
