<?php

namespace App\Http\Controllers\Api;

use App\Enums\ItemStatus;
use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Country;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    public function getAllCountries(): JsonResponse {
        $countries = Country::select('id', 'name', 'country_code')->get();

        if ($countries->isEmpty()) {
            return ApiResponse::sendResponse(404, 'No countries found.');
        }

        return ApiResponse::sendResponse(200, 'Countries fetched successfully', $countries);
    }

    public function getCountryById($id): JsonResponse {
        if (!is_numeric($id) || $id < 0) {
            return ApiResponse::sendResponse(400, 'Invalid country ID.');
        }

        $country = Country::where('id', $id)->select('id', 'name', 'country_code')
            ->with(
                'governorates:id,name,country_id',
                'governorates.cities:id,name,governorate_id',
                'governorates.cities.states:id,name,city_id'
            )
            ->first();

        if (!$country){
            return ApiResponse::sendResponse(404, 'Country not found.');
        }

        return ApiResponse::sendResponse(200, 'Country fetched successfully', $country);
    }
}
