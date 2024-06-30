<?php

namespace App\Http\Controllers\Api;

use App\Events\ReservationCreated;
use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRestaurantLocationRequest;
use App\Http\Requests\UpdateRestaurantLocationsRequest;
use App\Models\Restaurant;
use App\Models\RestaurantLocation;
use App\Models\RestaurantLocationImage;
use App\Models\User;
use App\Notifications\RestaurantLocationCreated;
use App\Traits\UploadImageTrait;
use Exception;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Throwable;
use Illuminate\Support\Facades\Auth;

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
            $validatedData['closed_days'] = is_array($validatedData['closed_days']) ? $validatedData['closed_days'] : explode(',', $validatedData['closed_days']);

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
            // $user = Auth::user();
            // $user = auth()->user();
            // if ($user) {
            //     $user->notify(new RestaurantLocationCreated($restaurantLocation));
            // }
            // event(new ReservationCreated($restaurantLocation));
            Notification::send(auth()->user(), new RestaurantLocationCreated($restaurantLocation));

            // event(new ReservationCreated($restaurantLocation));
            return ApiResponse::sendResponse(201, "Restaurant location created successfully", $restaurantLocation);
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
    } catch (Throwable $e) {
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

            $closedDays = is_array($validatedData['closed_days']) ? $validatedData['closed_days'] : explode(',', $validatedData['closed_days']);
            $location->update($request->validated());

            if ($images = $request->file('images')) {
            $uploadedImages = $this->uploadMultipleImages($images, 'product_images');

            foreach ($location->images as $image) {
                Storage::disk('public')->delete($image->image);
                $image->delete();
            }
            foreach ($uploadedImages as $imageName) {
                RestaurantLocationImage::create([
                        'restaurant_location_id' => $location->id,
                        'image' => $imageName,
                    ]);
                }
            }
            DB::commit();

            return ApiResponse::sendResponse(200, 'Location Updated Successfully', $location);
        } catch (Throwable $e) {
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
            foreach ($restaurant->images as $image) {
                Storage::disk('public')->delete($image->image);
                $image->delete();
            }
            $restaurant->delete();
            DB::commit();
            return ApiResponse::sendResponse(200, 'Restaurant Deleted Successfully');
        } catch (Throwable $e) {
            DB::rollback();
            return ApiResponse::sendResponse(500, 'Failed to delete restaurant', ['error' => $e->getMessage()]);
        }
    }
}
