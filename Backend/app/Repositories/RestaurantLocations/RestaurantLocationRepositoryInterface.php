<?php

namespace App\Repositories\RestaurantLocations;

use Illuminate\Database\Eloquent\Collection;
use App\Models\RestaurantLocation;

interface RestaurantLocationRepositoryInterface
{
    public function getLocationsByRestaurant(int $restaurantId);
    public function store(array $data);
    public function show(int $locationId);
    public function update(int $locationId, array $data);
    public function destroy(int $locationId): void;
}
