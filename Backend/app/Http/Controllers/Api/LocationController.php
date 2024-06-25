<?php

namespace App\Http\Controllers\Api;

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
            return response()->json(['error' => 'User address not found'], 404);
        }

        $latitude = $userAddress->latitude;
        $longitude = $userAddress->longitude;

        $haversine = "(6371 * acos(cos(radians($latitude)) * cos(radians(latitude)) * cos(radians(longitude) - radians($longitude)) + sin(radians($latitude)) * sin(radians(latitude))))";

        $nearestLocations = DB::table('restaurant_locations')
                                ->select('*')
                                ->selectRaw("$haversine AS distance")
                                ->having('distance', '<', $radius)
                                ->orderBy('distance')
                                ->get();

        return response()->json($nearestLocations);
    }
}
