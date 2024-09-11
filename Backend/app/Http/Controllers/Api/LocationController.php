<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\RestaurantLocationResource;
use App\Models\City;
use App\Models\RestaurantLocation;
use App\Models\UserAddress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class LocationController extends Controller
{
    
    public function getLocationsByUserCity()
    {
        $user = Auth::user();
        $userAddress = UserAddress::where('user_id', $user->id)->first();

        if ($userAddress && $userAddress->city_id) {
            $locations = RestaurantLocation::with(['restaurant','images'])
                ->where('city_id', $userAddress->city_id)
                ->get();
            return ApiResponse::sendResponse(200,"Nearest",RestaurantLocationResource::collection($locations) );
        }
        return ApiResponse::sendResponse(404,"City not assigned or address not found" );
    }

}
