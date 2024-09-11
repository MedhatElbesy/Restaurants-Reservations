<?php
namespace App\Repositories\Restaurant;

use App\Models\Restaurant;
use App\Models\RestaurantLocation;
use App\Models\RestaurantCategory;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Throwable;

class RestaurantRepository implements RestaurantRepositoryInterface
{
    public function getAllRestaurants()
    {
        return Restaurant::select('id', 'name', 'description', 'cover', 'status')
            ->with(['locations:id,restaurant_id,address'])
            ->withCount('locations')
            ->get()
            ->each(function ($restaurant) {
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
                $restaurant->location_addresses = $restaurant->locations;
                unset($restaurant->locations);
            });
    }

    public function createRestaurant(array $data)
    {
        DB::beginTransaction();
        try {
            $restaurant = Restaurant::create([
                'user_id' => $data['user_id'],
                'title' => $data['title'],
                'name' => $data['name'],
                'summary' => $data['summary'],
                'description' => $data['description'],
                'status' => $data['status'] ?? 'Active',
                'logo' => $data['logo'] ?? null,
                'cover' => $data['cover'] ?? null,
            ]);
            DB::commit();
            return $restaurant;
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
    }

    public function getRestaurantById(string $id)
    {
        $restaurant = Restaurant::with([
            'restaurant_images',
            'locations' => function ($query) {
                $query->withCount('comments');
            },
            'locations.ratings',
            'categories'
        ])->findOrFail($id);

        $restaurant->locations->each(function ($location) {
            $location->average_rating = $location->ratings->avg('rate');
            unset($location->ratings);
        });

        $totalRating = $restaurant->locations->sum('average_rating');
        $locationCount = $restaurant->locations->count();
        $restaurant->average_rating = $locationCount > 0 ? $totalRating / $locationCount : 0;

        return $restaurant;
    }

    public function updateRestaurant(string $id, array $data)
    {
        DB::beginTransaction();
        try {
            $restaurant = Restaurant::findOrFail($id);

            if (isset($data['logo'])) {
                $data['logo'] = $data['logo'];
            } else {
                unset($data['logo']);
            }

            if (isset($data['cover'])) {
                $data['cover'] = $data['cover'];
            } else {
                unset($data['cover']);
            }

            $restaurant->fill($data);
            $restaurant->save();

            DB::commit();
            return $restaurant;
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
    }

    public function deleteRestaurant(string $id)
    {
        DB::beginTransaction();
        try {
            $restaurant = Restaurant::findOrFail($id);
            $restaurant->delete();
            DB::commit();
            return $id;
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
    }

    public function getRestaurantsByUserId(string $userId)
    {
        return Restaurant::with('locations')->where('user_id', $userId)->get();
    }

    public function updateLocation($locationId, array $data)
    {
        DB::beginTransaction();
        try {
            $location = RestaurantLocation::findOrFail($locationId);
            $location->update($data);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
    }

    public function getLocation($locationId)
    {
        return RestaurantLocation::findOrFail($locationId);
    }

    public function getCategories($restaurantId)
    {
        return RestaurantCategory::where('restaurant_id', $restaurantId)
            ->with('category')
            ->get();
    }

    public function updateStatus(string $id, string $status)
    {
        $restaurant = Restaurant::findOrFail($id);
        $restaurant->status = $status;
        $restaurant->save();
        return $restaurant;
    }

    public function getAverageRating($restaurantId)
    {
        $restaurant = Restaurant::with('locations')->findOrFail($restaurantId);
        $locations = $restaurant->locations;
        if ($locations->isEmpty()) {
            return 0;
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
        return $count > 0 ? $totalRating / $count : 0;
    }
}
