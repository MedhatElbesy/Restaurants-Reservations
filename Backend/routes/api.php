<?php

use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\CountryController;
use App\Http\Controllers\Api\GovernorateController;
use App\Http\Controllers\Api\RestaurantCategoryController;
use App\Http\Controllers\Api\StateController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('countries', [CountryController::class, 'getAllCountries']);
Route::get('countries/{id}', [CountryController::class, 'getCountryById']);
Route::get('governorates', [GovernorateController::class, 'getAllGovernorates']);
Route::get('governorates/{id}', [GovernorateController::class, 'getGovernoratesByCountryId']);
Route::get('cities', [CityController::class, 'getAllCities']);
Route::get('cities/{id}', [CityController::class, 'getCityByGovernorateId']);
Route::get('states', [StateController::class, 'getAllStates']);
Route::get('states/{id}', [StateController::class, 'getStateByCityId']);

Route::post('profile', [UserController::class, 'profile']);

Route::apiResource('categories', CategoryController::class);
Route::apiResource('restaurant-categories', RestaurantCategoryController::class);
