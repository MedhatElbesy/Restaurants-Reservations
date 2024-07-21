<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Http\Controllers\Api\StateController;
use App\Models\RestaurantImages;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CountriesTableSeeder::class,
            GovernorateTableSeeder::class,
            CitiesTableSeeder::class,
            StatesTableSeeder::class,
            UserAddressesSeeder::class,
            RestaurantsSeeder::class,
            RestaurantLocationsSeeder::class,
            CategorySeeder::class,
            RestaurantCategorySeeder::class,
            RestaurantLocationImagesSeeder::class,
            MenuCategoriesSeeder::class,
            MenuItemsSeeder::class,
            TablesSeeder::class,
            TableAvailabilitiesSeeder::class,
            TableImagesSeeder::class,
            //PaymentsSeeder::class,
            UserActivationSeeder::class,
            RestaurantImagesSeeder::class,
            CommentsSeeder::class,
            GatewaySeeder::class,
            RatingsSeeder::class
        ]);

        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
