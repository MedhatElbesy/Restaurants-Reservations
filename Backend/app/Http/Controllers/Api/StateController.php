<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\State;
use App\Helpers\ApiResponse;

class StateController extends Controller
{
    public function getAllStates(): JsonResponse {
        $states = State::select('id', 'city_id', 'name')->with('city:id,name')->paginate(15);

        if ($states->isEmpty()) {
            return ApiResponse::sendResponse(404, 'No states found.');
        }

        return ApiResponse::sendResponse(200, 'States fetched successfully', $states);

    }

    public function getStateByCityId($city_id): JsonResponse {
        if (!is_numeric($city_id) || $city_id <= 0) {
            return ApiResponse::sendResponse(400, 'Invalid city ID.');
        }

        $states = State::where('city_id', '=', $city_id)->select('id', 'name')->get();

        if ($states->isEmpty()) {
            return ApiResponse::sendResponse(404, 'No states found for this city.');
        }
        return ApiResponse::sendResponse(200, 'States fetched successfully', $states);
    }
}
