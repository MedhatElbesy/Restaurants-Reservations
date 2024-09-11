<?php

namespace App\Repositories\Governorate;

use App\Models\Governorate;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class GovernorateRepository implements GovernorateRepositoryInterface
{
    public function getAllGovernorates(int $perPage = 15): LengthAwarePaginator
    {
        return Governorate::select('id', 'country_id', 'name')
            ->with('country:id,name')
            ->paginate($perPage);
    }

    public function getGovernoratesByCountryId(int $countryId): Collection
    {
        return Governorate::where('country_id', $countryId)
            ->select('id', 'name')
            ->get();
    }
}
