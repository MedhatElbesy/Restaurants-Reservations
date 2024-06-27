<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRestaurantLocationRequest;
use App\Http\Requests\UpdateRestaurantLocationsRequest;
use App\Models\Restaurant;
use App\Models\RestaurantLocation;
use App\Models\RestaurantLocationImage;
use App\Traits\UploadImageTrait;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RestaurantlocationsController extends Controller
{
    use UploadImageTrait;
    /**
     * Display a listing of the resource.
     */
    public function getLocationsByRestaurant($restaurantId)
    {
        try {
            $restaurant = Restaurant::findOrFail($restaurantId);
            $locations = $restaurant->locations;
            return ApiResponse::sendResponse(200, ' Restaurant locations',$locations);
        } catch (Exception $e) {
            return ApiResponse::sendResponse(500, 'Failed to retrieve locations', ['error' => $e->getMessage()]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRestaurantLocationRequest $request)
    {
        try {
            $validatedData = $request->validated();
            $validatedData['closed_days'] = json_encode($validatedData['closed_days']);
            $restaurantLocation = RestaurantLocation::create($validatedData);

            if ($images = $request->file('images')) {
                $uploadedImages = $this->uploadMultipleImages($images, 'product_images');

                foreach ($uploadedImages as $imageName) {
                    RestaurantLocationImage::create([
                        'restaurant_location_id' => $restaurantLocation->id,
                        'image' => $imageName,
                    ]);
                }
            }

            return ApiResponse::sendResponse(201,"Restaurant location created successfully",$restaurantLocation);
        } catch (Exception $e) {
            return ApiResponse::sendResponse(500, 'Failed to create Restaurant location', ['error' => $e->getMessage()]);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show($locationId)
    {
        try {
        $location = RestaurantLocation::with('tables.images')::findOrFail($locationId);
        return ApiResponse::sendResponse(200, 'Location Retrieved Successfully', $location);
    } catch (\Throwable $e) {
        return ApiResponse::sendResponse(404, 'Location not found', ['error' => $e->getMessage()]);
    }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRestaurantLocationsRequest $request, $locationId)
    {
        try {
        $validatedData = $request->validated();

        DB::beginTransaction();

        $location = RestaurantLocation::findOrFail($locationId);

        $location->update([
            'address' => $validatedData['address'],
            'country_id' => $validatedData['country_id'],
            'governorate_id' => $validatedData['governorate_id'],
            'city_id' => $validatedData['city_id'],
            'state_id' => $validatedData['state_id'] ?? null,
            'zip' => $validatedData['zip'] ?? null,
            'latitude' => $validatedData['latitude'] ?? null,
            'longitude' => $validatedData['longitude'] ?? null,
            'opening_time' => $validatedData['opening_time'] ?? null,
            'closed_time' => $validatedData['closed_time'] ?? null,
            'closed_days' => isset($validatedData['closed_days']) ? implode(',', $validatedData['closed_days']) : null,
            'number_of_tables' => $validatedData['number_of_tables'] ?? 0,
            'phone_number' => $validatedData['phone_number'] ?? null,
            'mobile_number' => $validatedData['mobile_number'] ?? null,
            'hot_line' => $validatedData['hot_line'] ?? null,
            'status' => $validatedData['status'] ?? 'Opened',
        ]);

        DB::commit();

        return ApiResponse::sendResponse(200, 'Location Updated Successfully',$location);
    } catch (\Throwable $e) {
        DB::rollback();
        return ApiResponse::sendResponse(500, 'Failed to update location', ['error' => $e->getMessage()]);
    }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($locationId)
    {
        try {
            $restaurant = RestaurantLocation::findOrFail($locationId);
            DB::beginTransaction();
            $restaurant->delete();
            DB::commit();
            return ApiResponse::sendResponse(200, 'Restaurant Deleted Successfully');
        } catch (\Throwable $e) {
            DB::rollback();
            return ApiResponse::sendResponse(500, 'Failed to delete restaurant', ['error' => $e->getMessage()]);
        }
    }
}
