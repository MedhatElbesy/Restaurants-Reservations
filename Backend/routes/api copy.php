<?php

use App\Http\Controllers\Api\Auth\ChangePasswordController;
use App\Http\Controllers\Api\Auth\ForgotPasswordController;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\LogoutController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\Auth\ResetPasswordController;
use App\Http\Controllers\Api\Auth\VerificationController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\CountryController;
use App\Http\Controllers\Api\GatewayController;
use App\Http\Controllers\Api\GovernorateController;
use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\OwnersController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\RestaurantCategoryController;
use App\Http\Controllers\Api\RestaurantController;
use App\Http\Controllers\Api\RestaurantLocationImageController;
use App\Http\Controllers\Api\RestaurantImagesController;
use App\Http\Controllers\Api\StateController;
use App\Http\Controllers\Api\UserAddressController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\MenuCategoryController;
// use App\Http\Controllers\Api\RestaurantLocationsController;
use App\Http\Controllers\Api\TableAvailabilityController;
use App\Http\Controllers\Api\MenuItemController;
use App\Http\Controllers\Api\RatingController;
use App\Http\Controllers\Api\TableController;
use App\Http\Controllers\Api\TableImageController;
use App\Http\Controllers\PayPalController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\RestaurantLocationsController;
use App\Models\Comment;
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


// Auth routes
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('register', [RegisterController::class, 'register'])->middleware('guest:sanctum');
Route::post('login', [LoginController::class, 'create_access_token'])->middleware('guest:sanctum')->name('login');
Route::delete('logout/{token?}', [LogoutController::class, 'destroy_token'])->middleware('auth:sanctum');
Route::get('verification/{token}', [VerificationController::class, 'verifyEmail']);
Route::post('forget-password', [ForgotPasswordController::class, 'sendResetToken']);
Route::post('forget-password/verify-from-sent-token/{token}', [ResetPasswordController::class, 'verifyFromSentToken']);
Route::post('reset-password', [ResetPasswordController::class, 'resetPassword']);
Route::post('change-password', [ChangePasswordController::class, 'changePassword'])->middleware('auth:sanctum');

// User profile routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('profile/{user}', [UserController::class, 'profile']);
    Route::put('profile/update/{user}', [UserController::class, 'updateProfile']);
    Route::delete('profile/delete/{user}', [UserController::class, 'deleteAccount']);
    Route::apiResource('user/{user}/addresses', UserAddressController::class)
        ->parameters(['addresses' => 'userAddress']);
});

// Country, state, and city routes
Route::prefix('countries')->group(function () {
    Route::get('/', [CountryController::class, 'getAllCountries']);
    Route::get('{location_id}', [CountryController::class, 'show']);
    Route::get('{id}', [CountryController::class, 'getCountryById']);
});
Route::prefix('governorates')->group(function () {
    Route::get('/', [GovernorateController::class, 'getAllGovernorates']);
    Route::get('{id}', [GovernorateController::class, 'getGovernoratesByCountryId']);
});
Route::prefix('cities')->group(function () {
    Route::get('/', [CityController::class, 'getAllCities']);
    Route::get('{id}', [CityController::class, 'getCityByGovernorateId']);
});
Route::prefix('states')->group(function () {
    Route::get('/', [StateController::class, 'getAllStates']);
    Route::get('{id}', [StateController::class, 'getStateByCityId']);
});

// Category routes
Route::prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
    Route::get('{category}', [CategoryController::class, 'show']);
    Route::get('restaurant/{id}', [CategoryController::class, 'showCategoryForRestaurant']);
    Route::get('name/{name}', [CategoryController::class, 'showCategoriesByName']);
    Route::middleware(['auth:sanctum', 'category.owner'])->group(function () {
        Route::post('/', [CategoryController::class, 'store']);
        Route::put('{category}', [CategoryController::class, 'update']);
        Route::delete('{category}', [CategoryController::class, 'destroy']);
    });
    Route::get('/cur-user', [CategoryController::class, 'getOwnerCategories'])->middleware('auth:sanctum');
});

// Restaurant routes
Route::apiResource('restaurants', RestaurantController::class);
Route::prefix('restaurants')->group(function () {
    Route::get('user/{user_id}', [RestaurantController::class, 'getRestaurantsByUserId']);
    Route::put('{id}/update-status', [RestaurantController::class, 'updateStatus']);
    Route::get('{id}/average-rating', [RestaurantController::class, 'getAverageRating']);
    Route::get('{id}/category', [RestaurantController::class, 'getCategory']);
});
Route::apiResource('restaurant-categories', RestaurantCategoryController::class);
Route::apiResource('restaurant-images', RestaurantImagesController::class);
Route::post('restaurant-location-images', [RestaurantLocationImageController::class, 'store']);

// Restaurant location routes
Route::prefix('restaurantslocations')->group(function () {
    Route::get('{restaurantId}', [RestaurantLocationsController::class, 'getLocationsByRestaurant']);
    Route::post('/', [RestaurantLocationsController::class, 'store'])->middleware('auth:sanctum');
    Route::put('{location_id}', [RestaurantLocationsController::class, 'update']);
    Route::delete('{location_id}', [RestaurantLocationsController::class, 'destroy']);
    Route::get('location/{location_id}', [RestaurantLocationsController::class, 'show']);
});

// Menu category and item routes
Route::apiResource('menu-categories', MenuCategoryController::class);
Route::get('restaurants/{id}/menu-categories', [MenuCategoryController::class, 'getMenuCategoryByRestaurantId']);
Route::apiResource('menu-items', MenuItemController::class);
Route::get('menucategories/{id}/menu-item', [MenuItemController::class, 'getMenuItemByMenuCategoryId']);

// Table routes
Route::apiResource('tables', TableController::class);
Route::get('get-table/{id}', [TableController::class, 'getTableByTableId']);
Route::apiResource('table-images', TableImageController::class);
Route::resource('table-availabilities', TableAvailabilityController::class);
Route::get('table-availability/{id}', [TableAvailabilityController::class, 'showByTableAvailabilities']);

// Comment and rating routes
Route::middleware('auth:sanctum')->group(function () {
    Route::resource('comments', CommentController::class)->except(['show', 'index']);
    Route::post('ratings', [RatingController::class, 'store']);
    Route::put('ratings/{id}', [RatingController::class, 'update']);
});
Route::get('comments', [CommentController::class, 'index']);
Route::get('comments/{restaurantId}', [CommentController::class, 'show']);
Route::get('ratings', [RatingController::class, 'show']);
Route::get('restaurant/{restaurantId}/user/{userId}/rating', [RatingController::class, 'getUserRatingForRestaurant']);
Route::get('restaurant-locations/{id}/average-rating', [RatingController::class, 'averageRating']);
Route::get('top-rated-restaurants/{limit?}', [RatingController::class, 'topRatedRestaurants']);

// Reservation routes
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('reservations', ReservationController::class);
    Route::get('getReservationsByRestaurantId/{restaurant_id}', [ReservationController::class, 'getReservationRestaurant']);
    Route::post('reservations/{reservation}/change-status', [ReservationController::class, 'changeStatus']);
});
Route::get('payment/cancel', [ReservationController::class, 'paymentCancel'])->name('payment.cancel');
Route::get('payment/success', [ReservationController::class, 'paymentSuccess'])->name('payment.success');




Route::get('gateways', [GatewayController::class, 'getAllGateways']);
Route::get('nearest-locations/{userId}/{radius?}', [LocationController::class, 'getNearestLocations']);
Route::get('/restaurant-locations/user-city', [LocationController::class, 'getLocationsByUserCity'])->middleware('auth:sanctum');

Route::post('reports', [ReportController::class, 'store']);
Route::get('reports', [ReportController::class, 'show']);
Route::put('reports/{reportId}/update-status', [ReportController::class, 'updateStatus']);
Route::apiResource('/users/owner', OwnersController::class);







// <?php

// use App\Http\Controllers\Api\Auth\ChangePasswordController;
// use App\Http\Controllers\Api\Auth\ForgotPasswordController;
// use App\Http\Controllers\Api\Auth\LoginController;
// use App\Http\Controllers\Api\Auth\LogoutController;
// use App\Http\Controllers\Api\Auth\RegisterController;
// use App\Http\Controllers\Api\Auth\ResetPasswordController;
// use App\Http\Controllers\Api\Auth\VerificationController;
// use App\Http\Controllers\Api\CategoryController;
// use App\Http\Controllers\Api\CityController;
// use App\Http\Controllers\Api\CommentController;
// use App\Http\Controllers\Api\CountryController;
// use App\Http\Controllers\Api\GatewayController;
// use App\Http\Controllers\Api\GovernorateController;
// use App\Http\Controllers\Api\LocationController;
// use App\Http\Controllers\Api\OwnersController;
// use App\Http\Controllers\Api\ReservationController;
// use App\Http\Controllers\Api\RestaurantCategoryController;
// use App\Http\Controllers\Api\RestaurantController;
// use App\Http\Controllers\Api\RestaurantLocationImageController;
// use App\Http\Controllers\Api\RestaurantImagesController;
// use App\Http\Controllers\Api\StateController;
// use App\Http\Controllers\Api\UserAddressController;
// use App\Http\Controllers\Api\UserController;
// use App\Http\Controllers\Api\MenuCategoryController;
// // use App\Http\Controllers\Api\RestaurantLocationsController;
// use App\Http\Controllers\Api\TableAvailabilityController;
// use App\Http\Controllers\Api\MenuItemController;
// use App\Http\Controllers\Api\RatingController;
// use App\Http\Controllers\Api\TableController;
// use App\Http\Controllers\Api\TableImageController;
// use App\Http\Controllers\PayPalController;
// use App\Http\Controllers\Api\ReportController;
// use App\Http\Controllers\Api\RestaurantLocationsController;
// use App\Models\Comment;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Route;

// /*
// |--------------------------------------------------------------------------
// | API Routes
// |--------------------------------------------------------------------------
// |
// | Here is where you can register API routes for your application. These
// | routes are loaded by the RouteServiceProvider and all of them will
// | be assigned to the "api" middleware group. Make something great!
// |
// */

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
// Route::post('register' , [RegisterController::class , 'register'])->middleware('guest:sanctum');
// Route::post('login' , [LoginController::class , 'create_access_token'])->middleware('guest:sanctum')->name('login');
// Route::get('profile/{user}', [UserController::class , 'profile'])->middleware('auth:sanctum');
// Route::put('profile/update/{user}', [UserController::class , 'updateProfile'])->middleware('auth:sanctum');
// Route::delete('profile/delete/{user}', [UserController::class , 'deleteAccount'])->middleware('auth:sanctum');
// Route::delete('logout/{token?}', [LogoutController::class, 'destroy_token'])->middleware('auth:sanctum');
// // route of verify email
// Route::get('verification/{token}', [VerificationController::class , 'verifyEmail']);

// // route of forget and rest password - use to send_token_to_reset_password and verify it then reset password
// Route::post('forget-password',[ForgotPasswordController::class,'sendResetToken']);
// Route::post('forget-password/verify-from-sent-token/{token}',[ResetPasswordController::class,'verifyFromSentToken']);
// Route::post('reset-password',[ResetPasswordController::class,'resetPassword']);

// // route of change password - (current_password, new_password, password_confirmation)
// Route::post('change-password', [ChangePasswordController::class, 'changePassword'])->middleware('auth:sanctum');

// Route::apiResource('user/{user}/addresses', UserAddressController::class)
//     ->parameters(['addresses' => 'userAddress'])
//     ->middleware('auth:sanctum');

// Route::get('countries', [CountryController::class, 'getAllCountries']);
// Route::get('countries/{location_id}', [CountryController::class, 'show']);

// Route::get('countries/{id}', [CountryController::class, 'getCountryById']);
// Route::get('governorates', [GovernorateController::class, 'getAllGovernorates']);
// Route::get('governorates/{id}', [GovernorateController::class, 'getGovernoratesByCountryId']);
// Route::get('cities', [CityController::class, 'getAllCities']);
// Route::get('cities/{id}', [CityController::class, 'getCityByGovernorateId']);
// Route::get('states', [StateController::class, 'getAllStates']);
// Route::get('states/{id}', [StateController::class, 'getStateByCityId']);

// // Categories route with conditional middleware
// Route::get('categories', [CategoryController::class, 'index']);
// Route::get('categories/{category}', [CategoryController::class, 'show']);
// Route::get('categories-restaurant/{id}', [CategoryController::class, 'showCategoryForRestaurant']);

// Route::middleware(['auth:sanctum', 'category.owner'])->group(function () {
//     Route::post('categories', [CategoryController::class, 'store']);
//     Route::put('categories/{category}', [CategoryController::class, 'update']);
//     Route::delete('categories/{category}', [CategoryController::class, 'destroy']);
// });


// Route::get('/category/cur-user', [CategoryController::class, 'getOwnerCategories'])->middleware('auth:sanctum');

// //Route::get('/category/cur-user', [CategoryController::class, 'getOwnerCategories']);

// //Route::apiResource('categories',CategoryController::class);


// Route::resource('restaurants', RestaurantController::class);
// Route::get('/restaurants/user/{user_id}', [RestaurantController::class, 'getRestaurantsByUserId']);

// Route::apiResource('restaurants', RestaurantController::class);
// Route::put('/restaurants/{id}/update-status', [RestaurantController::class, 'updateStatus']);

// Route::get('/restaurants/user/{user_id}', [RestaurantController::class, 'getRestaurantsByUserId']);

// Route::apiResource('restaurant-categories', RestaurantCategoryController::class);


// Route::post('/restaurant-location-images', [RestaurantLocationImageController::class,'store']);

// Route::apiResource('menu-categories', MenuCategoryController::class);
// Route::apiResource('menu-items', MenuItemController::class);
// Route::apiResource('tables',TableController::class);
// Route::get('/get-table/{id}', [TableController::class,'getTableByTableId']);


// Route::get('/location/{id}', [RestaurantController::class,'getLocation']);


// // Route::apiResource('restaurant-locations', RestaurantLocationsController::class);
// Route::get('/restaurantslocations/{restaurantId}', [RestaurantLocationsController::class, 'getLocationsByRestaurant']);
// Route::post('/restaurantslocations',[RestaurantLocationsController::class,'store'])->middleware('auth:sanctum');
// Route::put('/restaurantslocations/{location_id}', [RestaurantLocationsController::class,'update']);
// Route::delete('/restaurantslocations/{location_id}', [RestaurantLocationsController::class,'destroy']);
// Route::get('/locations/{location_id}', [RestaurantLocationsController::class,'show']);
// Route::get('restaurants/{id}/menu-categories', [MenuCategoryController::class, 'getMenuCategoryByRestaurantId']);
// Route::get('menucategories/{id}/menu-item', [MenuItemController::class, 'getMenuItemByMenuCategoryId']);


// Route::get('/location/{id}', [RestaurantController::class,'getLocation']);
// Route::resource('/table-availabilities',TableAvailabilityController::class);
// Route::get('/nearest-locations/{userId}/{radius?}', [LocationController::class, 'getNearestLocations']);
// Route::get('/restaurant-locations/user-city', [LocationController::class, 'getLocationsByUserCity'])->middleware('auth:sanctum');

// Route::resource('comments', CommentController::class)->except(['show', 'index'])->middleware('auth:sanctum');
// Route::get('comments', [CommentController::class, 'index']);
// Route::get('comments/{restaurantId}', [CommentController::class, 'show']);

// Route::post('/reports', [ReportController::class, 'store']);
// Route::get('/reports', [ReportController::class, 'show']);
// Route::put('/reports/{reportId}/update-status', [ReportController::class, 'updateStatus']);
// Route::post('/ratings', [RatingController::class, 'store'])->middleware('auth:sanctum');
// Route::get('/ratings', [RatingController::class, 'show']);

// Route::put('/ratings/{id}', [RatingController::class, 'update']);
// Route::get('/restaurant/{restaurantId}/user/{userId}/rating', [RatingController::class, 'getUserRatingForRestaurant']);
// Route::get('/table-availability/{id}', [TableAvailabilityController::class, 'showByTableAvailabilities']);
// Route::get('/top-rated-restaurants/{limit?}', [RatingController::class, 'topRatedRestaurants']);
// Route::get('/restaurant-locations/{id}/average-rating', [RatingController::class, 'averageRating']);
// Route::get('/restaurants/{id}/average-rating', [RestaurantController::class, 'getAverageRating']);

// //Route::put('table-images/{id}',[TableImageController::class,'update']);
// Route::apiResource('table-images',TableImageController::class);

// Route::apiResource('restaurant-images',RestaurantImagesController::class);

// Route::apiResource('reservations', ReservationController::class)->middleware('auth:sanctum');
// Route::get('getReservationsByRestaurantId/{restaurant_id}', [ReservationController::class, 'getReservationRestaurant'])->middleware('auth:sanctum');
// Route::post('reservations/{reservation}/change-status', [ReservationController::class, 'changeStatus']);
// Route::get('gateways', [GatewayController::class, 'getAllGateways']);

// Route::get('/restaurant/{id}/category',[RestaurantController::class,'getcategory']);

// Route::get('payment/cancel', [ReservationController::class, 'paymentCancel'])->name('payment.cancel');
// Route::get('payment/success', [ReservationController::class, 'paymentSuccess'])->name('payment.success');

// Route::get('/categories/name/{name}', [CategoryController::class, 'showCategoriesByName']);



// Route::apiResource('/users/owner',OwnersController::class);
