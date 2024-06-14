<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Governorate;
use Illuminate\Http\JsonResponse;

class GovernorateController extends Controller
{
    public function getAllGovernorates(): JsonResponse {
        $governorates = Governorate::select('id', 'country_id', 'name')->with('country:id,name')->paginate(15);

        if ($governorates->isEmpty()) {
            return ApiResponse::sendResponse(404, 'No governorates found.');
        }

        return ApiResponse::sendResponse(200, 'Governorates fetched successfully', $governorates);
    }

    public function getGovernoratesByCountryId($country_id): JsonResponse {
        if (!is_numeric($country_id) || $country_id <= 0) {
            return ApiResponse::sendResponse(400, 'Invalid country ID.');
        }

        $governorates = Governorate::where('country_id', '=', $country_id)->select('id', 'name')->get();

        if ($governorates->isEmpty()) {
            return ApiResponse::sendResponse(404, 'No governorates found for this country.');
        }
        return ApiResponse::sendResponse(200, 'Governorates fetched successfully', $governorates);
    }
}
