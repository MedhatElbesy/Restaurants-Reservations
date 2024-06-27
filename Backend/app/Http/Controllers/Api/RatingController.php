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
    public function store(StoreRatingRequest $request)
    {
        try {
            $validated = $request->validated();
            $rating = Rating::create([
                'rate' => $validated['rate']
            ]);
            RestaurantLocationRating::create([
                'restaurant_location_id' => $validated['restaurant_location_id'],
                'rating_id' => $rating->id
            ]);
            return ApiResponse::sendResponse(201,'Rating added successfully',$rating);
        } catch (Exception $e) {
            return ApiResponse::sendResponse(500,'Failed to add rating', ['error' => $e->getMessage()]);
        }
    }


    public function update(UpdateRatingRequest $request, $id)
    {
        try {
            $validated = $request->validated();
            $rating = Rating::findOrFail($id);
            $rating->update([
                'rate' => $validated['rate']
            ]);
            return ApiResponse::sendResponse(200, 'Rating updated successfully', $rating);
        } catch (Exception $e) {
            return ApiResponse::sendResponse(500, 'Failed to update rating', $e->getMessage());
        }
    }

    public function averageRating($restaurant_location_id)
    {
        try {
            $averageRating = DB::table('restaurant_location_ratings')
                ->join('ratings', 'restaurant_location_ratings.rating_id', '=', 'ratings.id')
                ->where('restaurant_location_ratings.restaurant_location_id', $restaurant_location_id)
                ->avg('ratings.rate');
            return ApiResponse::sendResponse(200, 'Average rating', $averageRating);
        } catch (Exception $e) {
            return ApiResponse::sendResponse(500, 'Failed to calculate average rating', $e->getMessage());
        }
    }
}
