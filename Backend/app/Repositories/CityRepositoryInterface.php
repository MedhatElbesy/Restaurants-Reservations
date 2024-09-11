<?php

namespace App\Repositories;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

interface CityRepositoryInterface
{
    public function getAllCities(int $perPage = 15): LengthAwarePaginator;

    public function getCityByGovernorateId(int $governorate_id): Collection;

    public function getCityByLocationId(int $location_id);
}
