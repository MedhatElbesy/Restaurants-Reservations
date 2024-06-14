<?php

namespace App\Http\Controllers\Api;

use App\Enums\ItemStatus;
use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Country;
use App\Models\Governorate;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function getAllCities(): JsonResponse {
        $cities = City::select('id', 'governorate_id', 'name')->with('governorate:id,name')->paginate(15);

        if ($cities->isEmpty()) {
            return ApiResponse::sendResponse(404, 'No cities found.');
        }

        return ApiResponse::sendResponse(200, 'Cities fetched successfully', $cities);

    }

    public function getCityByGovernorateId($governorate_id): JsonResponse {
        if (!is_numeric($governorate_id) || $governorate_id <= 0) {
            return ApiResponse::sendResponse(400, 'Invalid governorate ID.');
        }

        $cities = City::where('governorate_id', '=', $governorate_id)->select('id', 'name')->get();

        if ($cities->isEmpty()) {
            return ApiResponse::sendResponse(404, 'No cities found for this governorate.');
        }
        return ApiResponse::sendResponse(200, 'Cities fetched successfully', $cities);
    }
}
