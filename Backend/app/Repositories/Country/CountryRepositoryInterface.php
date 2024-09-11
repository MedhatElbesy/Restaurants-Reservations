<?php
namespace App\Repositories\Country;

use App\Models\Country;
use Illuminate\Database\Eloquent\Collection;

interface CountryRepositoryInterface
{
    public function getAllCountries(): Collection;

    public function getCountryById(int $id);

    public function getCountryByLocationId(int $locationId);
}
