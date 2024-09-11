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
use App\Repositories\Restaurant\RestaurantRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

class RestaurantController extends Controller
{
    protected $restaurantRepository;

    public function __construct(RestaurantRepositoryInterface $restaurantRepository)
    {
        $this->restaurantRepository = $restaurantRepository;
    }

    public function index()
    {
        try {
            $restaurants = $this->restaurantRepository->getAllRestaurants();

            if ($restaurants->isNotEmpty()) {
                return ApiResponse::sendResponse(200, 'All Restaurants', $restaurants);
            }
            return ApiResponse::sendResponse(404, 'There are no restaurants');
        } catch (Throwable $e) {
            return ApiResponse::sendResponse(500, 'Failed to retrieve restaurants', ['error' => $e->getMessage()]);
        }
    }

    public function store(StoreRestaurantRequest $request)
    {
        try {
            $data = array_merge($request->validated(), [
                'logo' => $this->uploadImage($request, 'logo', 'restaurants_logos') ?? null,
                'cover' => $this->uploadImage($request, 'cover', 'restaurants_covers') ?? null,
            ]);

            $restaurant = $this->restaurantRepository->createRestaurant($data);

            return ApiResponse::sendResponse(201, 'Restaurant Created Successfully', new RestaurantResource($restaurant));
        } catch (Throwable $e) {
            return ApiResponse::sendResponse(500, 'Failed to create restaurant', ['error' => $e->getMessage()]);
        }
    }

    public function show(string $id)
    {
        try {
            $restaurant = $this->restaurantRepository->getRestaurantById($id);
            return ApiResponse::sendResponse(200, 'Restaurant', new RestaurantResource($restaurant));
        } catch (Throwable $e) {
            return ApiResponse::sendResponse(404, 'Cannot find this Restaurant', ['error' => $e->getMessage()]);
        }
    }

    public function update(UpdateRestaurantRequest $request, $id)
    {
        try {
            $data = array_merge($request->validated(), [
                'logo' => $this->uploadImage($request, 'logo', 'restaurants_logos') ?? null,
                'cover' => $this->uploadImage($request, 'cover', 'restaurants_covers') ?? null,
            ]);

            $restaurant = $this->restaurantRepository->updateRestaurant($id, $data);

            return ApiResponse::sendResponse(200, 'Restaurant Updated Successfully', new RestaurantResource($restaurant));
        } catch (Throwable $e) {
            return ApiResponse::sendResponse(500, 'Failed to update restaurant', ['error' => $e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        try {
            $this->restaurantRepository->deleteRestaurant($id);
            return ApiResponse::sendResponse(200, 'Restaurant Deleted Successfully', ['deleted_id' => $id]);
        } catch (Throwable $e) {
            return ApiResponse::sendResponse(500, 'Failed to delete restaurant', ['error' => $e->getMessage()]);
        }
    }

    public function getRestaurantsByUserId(string $user_id)
    {
        try {
            $restaurants = $this->restaurantRepository->getRestaurantsByUserId($user_id);

            if ($restaurants->isEmpty()) {
                return ApiResponse::sendResponse(404, 'No restaurants found for this user.');
            }

            return ApiResponse::sendResponse(200, 'Restaurants', RestaurantResource::collection($restaurants));
        } catch (Throwable $e) {
            return ApiResponse::sendResponse(500, 'Failed to retrieve restaurants for user', ['error' => $e->getMessage()]);
        }
    }

    public function updateLocation(UpdateRestaurantLocationsRequest $request, $locationId)
    {
        try {
            $this->restaurantRepository->updateLocation($locationId, $request->validated());
            return ApiResponse::sendResponse(200, 'Location updated successfully');
        } catch (Throwable $e) {
            return ApiResponse::sendResponse(500, 'Failed to update location', ['error' => $e->getMessage()]);
        }
    }

    public function getLocation($locationId)
    {
        try {
            $location = $this->restaurantRepository->getLocation($locationId);
            return ApiResponse::sendResponse(200, 'Location Retrieved Successfully', $location);
        } catch (Throwable $e) {
            return ApiResponse::sendResponse(404, 'Location not found', ['error' => $e->getMessage()]);
        }
    }

    public function getCategory($id)
    {
        try {
            $categories = $this->restaurantRepository->getCategories($id);
            return ApiResponse::sendResponse(200, 'Categories Retrieved Successfully', RestaurantCategoryResource::collection($categories));
        } catch (Throwable $e) {
            return ApiResponse::sendResponse(404, 'Categories not found', ['error' => $e->getMessage()]);
        }
    }

    public function updateStatus(Request $request, $id)
    {
        try {
            $request->validate([
                'status' => 'required|in:' . implode(',', [UserStatus::Active, UserStatus::InActive, UserStatus::Deleted])
            ]);
            $restaurant = $this->restaurantRepository->updateStatus($id, $request->status);
            return ApiResponse::sendResponse(200, 'Restaurant status updated successfully', $restaurant);
        } catch (Throwable $e) {
            return ApiResponse::sendResponse(500, 'Failed to update restaurant status', ['error' => $e->getMessage()]);
        }
    }

    public function getAverageRating($restaurantId)
    {
        try {
            $averageRating = $this->restaurantRepository->getAverageRating($restaurantId);
            return ApiResponse::sendResponse(200, 'average_rating', $averageRating);
        } catch (Throwable $e) {
            return ApiResponse::sendResponse(500, 'Failed to retrieve average rating', ['error' => $e->getMessage()]);
        }
    }
}
