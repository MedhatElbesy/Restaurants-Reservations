<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

protected $fillable = ['rate'];

    public function restaurantLocations()
    {
        return $this->belongsToMany(RestaurantLocation::class, 'restaurant_location_rating');
    }
}
