<?php
namespace App\Repositories\Country;

use App\Models\Country;
use App\Models\RestaurantLocation;
use Illuminate\Database\Eloquent\Collection;

class CountryRepository implements CountryRepositoryInterface
{
    public function getAllCountries(): Collection
    {
        return Country::select('id', 'name', 'country_code')->get();
    }

    public function getCountryById(int $id)
    {
        return Country::where('id', $id)
            ->select('id', 'name', 'country_code')
            ->with(
                'governorates:id,name,country_id',
                'governorates.cities:id,name,governorate_id',
                'governorates.cities.states:id,name,city_id'
            )
            ->first();
    }

    public function getCountryByLocationId(int $locationId)
    {
        $location = RestaurantLocation::findOrFail($locationId);
        return $location->country;
    }
}
