<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRatingRequest;
use App\Http\Requests\UpdateRatingRequest;
use App\Models\Rating;
use App\Models\RestaurantLocationRating;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RatingController extends Controller
{


    public function show(){
        $ratings = Rating::all();
        if(!$ratings){
            return ApiResponse::sendResponse(500, "Error",);
        }
        return ApiResponse::sendResponse(200, "All ratings", $ratings);
    }

    public function getUserRatingForRestaurant($restaurantLocationId, $userId)
    {
        $rating = Rating::where('restaurant_location_id', $restaurantLocationId)
                        ->where('user_id', $userId)
                        ->first();
        if (!$rating) {
            return ApiResponse::sendResponse(404,'Rating not found');
        }
        return ApiResponse::sendResponse(200,'Rating',$rating);
    }

    public function store(StoreRatingRequest $request)
    {
        try {
            $rating = Rating::create($request->validated());
            return ApiResponse::sendResponse(201,"created successfully",$rating);
        }catch (Exception $e) {
            return ApiResponse::sendResponse(500, 'Failed to create rating', ['error' => $e->getMessage()]);
        }
    }

    public function update(UpdateRatingRequest $request, $id)
    {
        try {
            $rating = Rating::findOrFail($id);
            $rating->update($request->validated());
            return ApiResponse::sendResponse(200, 'Rating updated successfully',$rating);
        } catch (Exception $e) {
            return ApiResponse::sendResponse(500, 'Fail to update Rating', ['error' => $e->getMessage()]);
        }
    }


    public function averageRating($restaurantLocationId)
    {
        try {
            $averageRating = Rating::where('restaurant_location_id', $restaurantLocationId)
                ->avg('rate');
            if (is_null($averageRating)) {
                return ApiResponse::sendResponse(404, 'No ratings found for this restaurant location');
            }
            return ApiResponse::sendResponse(200, 'Average rating', $averageRating);
        } catch (Exception $e) {
            return ApiResponse::sendResponse(500, 'Failed to calculate average rating', $e->getMessage());
        }
    }


    public function topRatedRestaurants($limit = 10)
    {
        try {
            $topRatedRestaurants = DB::table('ratings')
                ->select('restaurant_location_id', DB::raw('AVG(rate) as average_rating'))
                ->groupBy('restaurant_location_id')
                ->orderByDesc('average_rating')
                ->limit($limit)
                ->get();

                foreach ($topRatedRestaurants as $restaurant) {
                    $locationInfo = DB::table('restaurant_locations')
                        ->join('restaurants', 'restaurant_locations.restaurant_id', '=', 'restaurants.id')
                        ->join('restaurant_location_images', 'restaurant_locations.id', '=', 'restaurant_location_images.restaurant_location_id')
                        ->where('restaurant_locations.id', $restaurant->restaurant_location_id)
                        ->select('restaurant_locations.*', 'restaurant_location_images.image', 'restaurants.name as restaurant_name', 'restaurants.id as restaurant_id')
                        ->first();
    
                    $restaurant->location_image = $locationInfo->image ?? null;
                    $restaurant->restaurant_name = $locationInfo->restaurant_name ?? null;
                    $restaurant->restaurant_id = $locationInfo->restaurant_id ?? null;
                }    

            return ApiResponse::sendResponse(200, 'Top rated restaurants', $topRatedRestaurants);
        } catch (Exception $e) {
            return ApiResponse::sendResponse(500, 'Failed to fetch top rated restaurants', ['error' => $e->getMessage()]);
        }
    }
}
