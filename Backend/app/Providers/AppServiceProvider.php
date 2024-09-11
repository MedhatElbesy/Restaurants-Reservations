<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\CityRepositoryInterface;
use App\Repositories\CityRepository;
use App\Repositories\CommentRepositoryInterface;
use App\Repositories\CommentRepository;
use App\Repositories\Country\CountryRepositoryInterface;
use App\Repositories\Country\CountryRepository;
use App\Repositories\Restaurant\RestaurantRepositoryInterface;
use App\Repositories\Restaurant\RestaurantRepository;
use App\Repositories\Reservation\ReservationRepositoryInterface;
use App\Repositories\Governorate\GovernorateRepositoryInterface;
use App\Repositories\Governorate\GovernorateRepository;
use App\Repositories\MenuCategory\MenuCategoryRepositoryInterface;
use App\Repositories\MenuCategory\MenuCategoryRepository;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        require_once app_path('Helpers/ApiResponse.php');
        $this->app->bind(CityRepositoryInterface::class, CityRepository::class);
        $this->app->bind(CommentRepositoryInterface::class, CommentRepository::class);
        $this->app->bind(CountryRepositoryInterface::class, CountryRepository::class);
        $this->app->bind(RestaurantRepositoryInterface::class, RestaurantRepository::class);
        $this->app->bind(GovernorateRepositoryInterface::class, GovernorateRepository::class);
        $this->app->bind(MenuCategoryRepositoryInterface::class, MenuCategoryRepository::class);

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
