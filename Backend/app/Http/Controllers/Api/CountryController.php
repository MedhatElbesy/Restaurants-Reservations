<?php

namespace App\Http\Controllers\Api;

use App\Enums\ItemStatus;
use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\Restaurant;
use App\Models\RestaurantLocation;
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

    public function show($location_id)
    {
        try {
            $location = RestaurantLocation::findOrFail($location_id);
            $country = $location->country;

            if (!$country) {
                return ApiResponse::sendResponse(404, 'Country not found for the given location');
            }
            return ApiResponse::sendResponse(200, 'Country fetched successfully', $country);
        } catch (\Exception $e) {
            return ApiResponse::sendResponse(500, 'Failed to retrieve country information',['error' => $e->getMessage()]);
        }
    }

}
