<?php
namespace App\Repositories\Restaurant;

use App\Models\Restaurant;
use App\Models\RestaurantLocation;
use Illuminate\Database\Eloquent\Collection;

interface RestaurantRepositoryInterface
{
    public function getAllRestaurants();

    public function createRestaurant(array $data);

    public function getRestaurantById(string $id);

    public function updateRestaurant(string $id, array $data);

    public function deleteRestaurant(string $id);

    public function getRestaurantsByUserId(string $userId);

    public function updateLocation($locationId, array $data);

    public function getLocation($locationId);

    public function getCategories($restaurantId);

    public function updateStatus(string $id, string $status);

    public function getAverageRating($restaurantId);
}
