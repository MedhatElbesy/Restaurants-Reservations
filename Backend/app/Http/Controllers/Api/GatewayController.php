<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Gateway;
use Illuminate\Http\JsonResponse;

class GatewayController extends Controller
{
    public function getAllGateways(): JsonResponse {
        $gateways = Gateway::select('id', 'title', 'photo', 'type')->get();

        if ($gateways->isEmpty()) {
            return ApiResponse::sendResponse(404, 'No countries found.');
        }

        return ApiResponse::sendResponse(200, 'Gateways fetched successfully', $gateways);
    }
}