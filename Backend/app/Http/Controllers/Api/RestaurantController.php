<?php

namespace App\Http\Controllers\Api;

use App\Enums\UserStatus;
use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Restaurant\StoreRestaurantLocationRequest;
use App\Http\Requests\Restaurant\StoreRestaurantRequest;
use App\Http\Requests\Restaurant\UpdateRestaurantLocationsRequest;
use App\Http\Requests\Restaurant\UpdateRestaurantRequest;
use App\Http\Resources\RestaurantCategoryResource;
use App\Http\Resources\RestaurantResource;
use App\Http\Resources\MenuCategoryResource;
use App\Models\Category;
use App\Models\Restaurant;
use App\Models\RestaurantCategory;
use App\Models\RestaurantLocation;
use App\Traits\UploadImageTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RestaurantController extends Controller
{
    use UploadImageTrait;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $restaurants = Restaurant::select('id', 'name', 'description', 'cover', 'status')
        ->with(['locations:id,restaurant_id,address'])
        ->withCount('locations')
        ->get();

    $restaurants->each(function ($restaurant) {
        $restaurant->cover_url = $restaurant->cover_url;

        $totalRating = 0;
        $count = 0;

        foreach ($restaurant->locations as $location) {
            $avgRating = $location->averageRating();
            if ($avgRating !== null) {
                $totalRating += $avgRating;
                $count++;
            }
        }
            $restaurant->average_rating = $count > 0 ? $totalRating / $count : 0;

    });

        if ($restaurants->isNotEmpty()) {
            return ApiResponse::sendResponse(200, 'All Restaurants', $restaurants);
        }
        return ApiResponse::sendResponse(404, 'There are no restaurants');
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(StoreRestaurantRequest $request) : JsonResponse
    {
        try {
            $validatedData = $request->validated();

            DB::beginTransaction();

            $restaurant = Restaurant::create([
                'user_id' => $validatedData['user_id'],
                'title' => $validatedData['title'],
                'name' => $validatedData['name'],
                'summary' => $validatedData['summary'],
                'description' => $validatedData['description'],
                'status' => $validatedData['status'] ?? 'Active',
                'logo'=> $this->uploadImage($request, 'logo', 'restaurants_logos') ?? null,
                'cover'=> $this->uploadImage($request, 'cover', 'restaurants_covers') ?? null,
            ]);

            DB::commit();
            return ApiResponse::sendResponse(201, 'Restaurant Created Successfully', new RestaurantResource($restaurant));
        } catch (\Throwable $e) {
            DB::rollback();
            return ApiResponse::sendResponse(500, 'Failed to create restaurant', ['error' => $e->getMessage()]);
        }
    }

    public function show(string $id)
    {
        $restaurant = Restaurant::with([
            'locations.country',
            'locations.governorate',
            'locations.city',
            'locations.state',
            'locations.tables.images',
            'locations',
            'categories',
            'restaurant_images',
            'menuCategories.menuItems'
        ])->findOrFail($id);
            $restaurant->locations->each(function ($location) {
        $location->average_rating = $location->ratings->avg('rate');
    });

        $totalRating = $restaurant->locations->sum('average_rating');
        $locationCount = $restaurant->locations->count();
        $restaurant->average_rating = $locationCount > 0 ? $totalRating / $locationCount : 0;

        if ($restaurant) {
            return ApiResponse::sendResponse(200, 'Restaurant', $restaurant);
        }
        return ApiResponse::sendResponse(404, 'Can`t find this Restaurant');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRestaurantRequest $request, $id)
    {
        try {
            $validatedData = $request->validated();

            DB::beginTransaction();

            $restaurant = Restaurant::findOrFail($id);
            $validatedData['logo'] = $this->uploadImage($request, 'logo', 'restaurants_logos') ?? null;
            $validatedData['cover'] = $this->uploadImage($request, 'cover', 'restaurants_covers') ?? null;

            if (!$request->hasFile('logo')) {
                unset($validatedData['logo']);

            }
            if (!$request->hasFile('cover')) {
                unset($validatedData['cover']);

            }
            $restaurant->fill([
                'user_id' => $validatedData['user_id'],
                'title' => $validatedData['title'],
                'name' => $validatedData['name'],
                'summary' => $validatedData['summary'],
                'description' => $validatedData['description'],
                'status' => $validatedData['status'] ?? 'Active',
                'logo'=> $validatedData['logo'],
                'cover'=> $validatedData['cover'],
            ]);

            $restaurant->save();

            DB::commit();
            return ApiResponse::sendResponse(200, 'Restaurant Updated Successfully', new RestaurantResource($restaurant));
        } catch (\Throwable $e) {
            DB::rollback();
            return ApiResponse::sendResponse(500, 'Failed to update restaurant', ['error' => $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $restaurant = Restaurant::findOrFail($id);

            DB::beginTransaction();
            $restaurant->delete();

            DB::commit();
            return ApiResponse::sendResponse(200, 'Restaurant Deleted Successfully');
        } catch (\Throwable $e) {
            DB::rollback();
            return ApiResponse::sendResponse(500, 'Failed to delete restaurant', ['error' => $e->getMessage()]);
        }
    }

    public function getRestaurantsByUserId(string $user_id)
    {
        $restaurants = Restaurant::with('locations')->where('user_id', $user_id)->get();

        if ($restaurants->isEmpty()) {
            return ApiResponse::sendResponse(404, 'No restaurants found for this user.');
        }

        return ApiResponse::sendResponse(200, 'Restaurants', RestaurantResource::collection($restaurants));
    }


    public function updateLocation(UpdateRestaurantLocationsRequest $request, $locationId)
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

            return ApiResponse::sendResponse(200, 'Location Updated Successfully');
        } catch (\Throwable $e) {
            DB::rollback();
            return ApiResponse::sendResponse(500, 'Failed to update location', ['error' => $e->getMessage()]);
        }
    }


    public function getLocation($locationId)
    {
        try {
            $location = RestaurantLocation::findOrFail($locationId);
            return ApiResponse::sendResponse(200, 'Location Retrieved Successfully', $location);
        } catch (\Throwable $e) {
            return ApiResponse::sendResponse(404, 'Location not found', ['error' => $e->getMessage()]);
        }
    }

    public function getcategory($id)
    {
        try {
            $categories = RestaurantCategory::where('restaurant_id', $id)->with('category')->get();
            return ApiResponse::sendResponse(200, 'Categories Retrieved Successfully', RestaurantCategoryResource::collection($categories));
        } catch (\Throwable $e) {
            return ApiResponse::sendResponse(404, 'Categories not found', ['error' => $e->getMessage()]);
        }
    }

    public function updateStatus(Request $request, $id)
    {
        try {
            $request->validate([
                'status' => 'required|in:' . implode(',', [UserStatus::Active, UserStatus::InActive, UserStatus::Deleted])
            ]);
            $restaurant = Restaurant::findOrFail($id);
            $restaurant->status = $request->status;
            $restaurant->save();
            return ApiResponse::sendResponse(200, 'Restaurant status updated successfully', $restaurant);
        } catch (\Exception $e) {
            return ApiResponse::sendResponse(500, 'Failed to update restaurant status', null, $e->getMessage());
        }
    }

    public function getAverageRating($restaurantId)
    {
        $restaurant = Restaurant::with('locations')->findOrFail($restaurantId);
        $locations = $restaurant->locations;
        if ($locations->isEmpty()) {
            return ApiResponse::sendResponse(200, 'average_rating', 0);
        }
        $totalRating = 0;
        $count = 0;

        foreach ($locations as $location) {
            $avgRating = $location->averageRating();
            if ($avgRating !== null) {
                $totalRating += $avgRating;
                $count++;
            }
        }
        $averageRating = $count > 0 ? $totalRating / $count : 0;
            return ApiResponse::sendResponse(200, 'average_rating', $averageRating);
    }


}
