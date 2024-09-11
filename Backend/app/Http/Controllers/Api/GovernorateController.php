<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Repositories\Governorate\GovernorateRepositoryInterface;
use Illuminate\Http\JsonResponse;

class GovernorateController extends Controller
{
    protected $governorateRepository;

    public function __construct(GovernorateRepositoryInterface $governorateRepository)
    {
        $this->governorateRepository = $governorateRepository;
    }

    public function getAllGovernorates(): JsonResponse
    {
        $governorates = $this->governorateRepository->getAllGovernorates();

        if ($governorates->isEmpty()) {
            return ApiResponse::sendResponse(404, 'No governorates found.');
        }

        return ApiResponse::sendResponse(200, 'Governorates fetched successfully', $governorates);
    }

    public function getGovernoratesByCountryId($country_id): JsonResponse
    {
        if (!is_numeric($country_id) || $country_id <= 0) {
            return ApiResponse::sendResponse(400, 'Invalid country ID.');
        }

        $governorates = $this->governorateRepository->getGovernoratesByCountryId($country_id);

        if ($governorates->isEmpty()) {
            return ApiResponse::sendResponse(404, 'No governorates found for this country.');
        }

        return ApiResponse::sendResponse(200, 'Governorates fetched successfully', $governorates);
    }
}
