<?php

namespace App\Repositories;

use App\Models\City;
use App\Models\RestaurantLocation;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class CityRepository implements CityRepositoryInterface
{
    public function getAllCities(int $perPage = 15): LengthAwarePaginator
    {
        return City::select('id', 'governorate_id', 'name')
                    ->with('governorate:id,name')
                    ->paginate($perPage);
    }

    public function getCityByGovernorateId(int $governorate_id): Collection
    {
        return City::where('governorate_id', $governorate_id)
                    ->select('id', 'name')
                    ->get();
    }

    public function getCityByLocationId(int $location_id)
    {
        return RestaurantLocation::with('city')->findOrFail($location_id)->city;
    }
}
