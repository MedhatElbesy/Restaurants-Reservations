<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LocationController extends Controller
{
    public function getNearestLocations($userId, $radius = 10)
    {
        $userAddress = DB::table('user_addresses')
                        ->where('user_id', $userId)
                        ->first(['latitude', 'longitude']);

        if (!$userAddress) {
            return ApiResponse::sendResponse(204,'User address not found');
        }

        $latitude = $userAddress->latitude;
        $longitude = $userAddress->longitude;

        $haversine = "(6371 * acos(cos(radians($latitude)) * cos(radians(latitude)) * cos(radians(longitude) - radians($longitude)) + sin(radians($latitude)) * sin(radians(latitude))))";

        $nearestLocations = DB::table('restaurant_locations')
                            ->select('restaurant_locations.*', 'restaurant_location_images.image', 'restaurants.name as restaurant_name')
                            ->selectRaw("$haversine AS distance")
                            ->leftJoin('restaurants', 'restaurant_locations.restaurant_id', '=', 'restaurants.id')
                            ->leftJoin('restaurant_location_images', 'restaurant_locations.id', '=', 'restaurant_location_images.restaurant_location_id')
                            ->having('distance', '<', $radius)
                            ->orderBy('distance')
                            ->get();

        return ApiResponse::sendResponse(200,"Nearest",$nearestLocations );
    }
}
