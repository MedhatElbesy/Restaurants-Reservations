<?php
namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Repositories\CityRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CityController extends Controller
{
    protected $cityRepository;

    public function __construct(CityRepositoryInterface $cityRepository)
    {
        $this->cityRepository = $cityRepository;
    }

    public function getAllCities()
    {
        $cities = $this->cityRepository->getAllCities();

        if ($cities->isEmpty()) {
            return ApiResponse::sendResponse(404, 'No cities found.');
        }

        return ApiResponse::sendResponse(200, 'Cities fetched successfully', $cities);
    }

    public function getCityByGovernorateId($governorate_id)
    {
        $validator = Validator::make(['governorate_id' => $governorate_id], [
            'governorate_id' => 'required|integer|min:1'
        ]);

        if ($validator->fails()) {
            return ApiResponse::sendResponse(400, 'Invalid governorate ID.', $validator->errors());
        }

        $cities = $this->cityRepository->getCityByGovernorateId($governorate_id);

        if ($cities->isEmpty()) {
            return ApiResponse::sendResponse(404, 'No cities found for this governorate.');
        }

        return ApiResponse::sendResponse(200, 'Cities fetched successfully', $cities);
    }

    public function show($location_id)
    {
        try {
            $city = $this->cityRepository->getCityByLocationId($location_id);

            if (!$city) {
                return ApiResponse::sendResponse(404, 'City not found for the given location');
            }

            return ApiResponse::sendResponse(200, 'City fetched successfully', $city);
        } catch (\Exception $e) {
            return ApiResponse::sendResponse(500, 'Failed to retrieve city information', ['error' => $e->getMessage()]);
        }
    }
}
