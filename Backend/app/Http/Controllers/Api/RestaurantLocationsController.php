<?php

namespace App\Http\Controllers\Api;

use App\Enums\ItemStatus;
use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Restaurant\StoreRestaurantLocationRequest;
use App\Http\Requests\Restaurant\UpdateRestaurantLocationsRequest;
use App\Http\Resources\RestaurantLocationResource;
use App\Repositories\RestaurantLocations\RestaurantLocationRepositoryInterface;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Throwable;

class RestaurantLocationsController extends Controller
{
        private $repository;

    public function __construct(RestaurantLocationRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function getLocationsByRestaurant($restaurantId)
    {
        try {
            $locations = $this->repository->getLocationsByRestaurant($restaurantId);
            return ApiResponse::sendResponse(200, 'Restaurant locations', RestaurantLocationResource::collection($locations));
        } catch (Exception $e) {
            return ApiResponse::sendResponse(500, 'Failed to retrieve locations', ['error' => $e->getMessage()]);
        }
    }

    public function store(StoreRestaurantLocationRequest $request)
    {
        try {
            $validatedData = $request->validated();
            $validatedData['closed_days'] = is_array($validatedData['closed_days']) ? $validatedData['closed_days'] : explode(',', $validatedData['closed_days']);

            $restaurantLocation = $this->repository->store($validatedData);
            return ApiResponse::sendResponse(201, "Restaurant location created successfully", $restaurantLocation);
        } catch (Exception $e) {
            return ApiResponse::sendResponse(500, 'Failed to create Restaurant location', ['error' => $e->getMessage()]);
        }
    }

    public function show($locationId)
    {
        try {
            $location = $this->repository->show($locationId);
            return ApiResponse::sendResponse(200, 'Location Retrieved Successfully', $location);
        } catch (Throwable $e) {
            return ApiResponse::sendResponse(404, 'Location not found', ['error' => $e->getMessage()]);
        }
    }

    public function update(UpdateRestaurantLocationsRequest $request, $locationId)
    {
        try {
            $validatedData = $request->validated();
            $this->repository->update($locationId, $validatedData);
            return ApiResponse::sendResponse(200, 'Location Updated Successfully', $this->repository->show($locationId));
        } catch (Throwable $e) {
            return ApiResponse::sendResponse(500, 'Failed to update location', ['error' => $e->getMessage()]);
        }
    }

    public function destroy($locationId)
    {
        try {
            $this->repository->destroy($locationId);
            return ApiResponse::sendResponse(200, 'Restaurant Deleted Successfully');
        } catch (Throwable $e) {
            return ApiResponse::sendResponse(500, 'Failed to delete restaurant', ['error' => $e->getMessage()]);
        }
    }
}
