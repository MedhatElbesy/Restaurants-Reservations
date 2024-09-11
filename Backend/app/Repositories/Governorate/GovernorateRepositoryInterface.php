<?php

namespace App\Repositories\Governorate;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface GovernorateRepositoryInterface
{
    public function getAllGovernorates(int $perPage = 15): LengthAwarePaginator;

    public function getGovernoratesByCountryId(int $countryId): Collection;
}
