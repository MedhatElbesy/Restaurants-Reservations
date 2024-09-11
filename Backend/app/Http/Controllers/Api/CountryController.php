<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Repositories\Country\CountryRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Exception;

class CountryController extends Controller
{
    protected $countryRepository;

    public function __construct(CountryRepositoryInterface $countryRepository)
    {
        $this->countryRepository = $countryRepository;
    }

    public function getAllCountries()
    {
        try {
            $countries = $this->countryRepository->getAllCountries();

            if ($countries->isEmpty()) {
                return ApiResponse::sendResponse(404, 'No countries found.');
            }

            return ApiResponse::sendResponse(200, 'Countries fetched successfully', $countries);
        } catch (Exception $e) {
            return ApiResponse::sendResponse(500, 'Failed to retrieve countries', ['error' => $e->getMessage()]);
        }
    }

    public function getCountryById($id)
    {
        if (!is_numeric($id) || $id < 0) {
            return ApiResponse::sendResponse(400, 'Invalid country ID.');
        }

        try {
            $country = $this->countryRepository->getCountryById($id);

            if (!$country) {
                return ApiResponse::sendResponse(404, 'Country not found.');
            }

            return ApiResponse::sendResponse(200, 'Country fetched successfully', $country);
        } catch (Exception $e) {
            return ApiResponse::sendResponse(500, 'Failed to retrieve country', ['error' => $e->getMessage()]);
        }
    }

    public function show($location_id)
    {
        try {
            $country = $this->countryRepository->getCountryByLocationId($location_id);

            if (!$country) {
                return ApiResponse::sendResponse(404, 'Country not found for the given location');
            }

            return ApiResponse::sendResponse(200, 'Country fetched successfully', $country);
        } catch (Exception $e) {
            return ApiResponse::sendResponse(500, 'Failed to retrieve country information', ['error' => $e->getMessage()]);
        }
    }
}
