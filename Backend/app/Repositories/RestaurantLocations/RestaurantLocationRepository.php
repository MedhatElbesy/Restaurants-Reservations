<?php

namespace App\Repositories\RestaurantLocations;

use App\Enums\ItemStatus;
use App\Models\Restaurant;
use App\Models\RestaurantLocation;
use App\Models\RestaurantLocationImage;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Exception;
use App\Traits\UploadImageTrait;

class RestaurantLocationRepository implements RestaurantLocationRepositoryInterface
{
    use UploadImageTrait;

    public function getLocationsByRestaurant(int $restaurantId)
    {
        try {
            $restaurant = Restaurant::with([
                'locations.country',
                'locations.governorate',
                'locations.state',
                'locations.city',
            ])->findOrFail($restaurantId);

            $locations = $restaurant->locations()->withCount([
                'tables as number_of_available_tables' => function ($query) {
                    $query->where('status', ItemStatus::Available);
                }
            ])->get();

            $locations->each(function ($location) {
                $location->average_rating = $location->averageRating();
                $location->comments_count = $location->commentsCount();
            });

            return $locations;
        } catch (Exception $e) {
            throw new Exception('Failed to retrieve locations: ' . $e->getMessage());
        }
    }

    public function store(array $data)
    {
        try {
            $restaurantLocation = RestaurantLocation::create($data);

            if (isset($data['images'])) {
                $uploadedImages = $this->uploadMultipleImages($data['images'], 'locations_images');

                foreach ($uploadedImages as $imageName) {
                    RestaurantLocationImage::create([
                        'restaurant_location_id' => $restaurantLocation->id,
                        'image' => $imageName,
                    ]);
                }
            }

            return $restaurantLocation;
        } catch (Exception $e) {
            throw new Exception('Failed to create Restaurant location: ' . $e->getMessage());
        }
    }

    public function show(int $locationId)
    {
        try {
            return RestaurantLocation::with([
                'country:id,name',
                'governorate:id,name',
                'city:id,name',
                'state:id,name'
            ])->findOrFail($locationId);
        } catch (Exception $e) {
            throw new Exception('Location not found: ' . $e->getMessage());
        }
    }

    public function update(int $locationId, array $data)
    {
        try {
            DB::beginTransaction();

            $location = RestaurantLocation::findOrFail($locationId);

            $location->update($data);

            if (isset($data['images'])) {
                $uploadedImages = $this->uploadMultipleImages($data['images'], 'locations_images');

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
            return $location;
        } catch (Exception $e) {
            DB::rollback();
            throw new Exception('Failed to update location: ' . $e->getMessage());
        }
    }

    public function destroy(int $locationId): void
    {
        try {
            DB::beginTransaction();

            $location = RestaurantLocation::findOrFail($locationId);

            foreach ($location->images as $image) {
                Storage::disk('public')->delete($image->image);
                $image->delete();
            }

            $location->delete();

            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            throw new Exception('Failed to delete location: ' . $e->getMessage());
        }
    }
}
