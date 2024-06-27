<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RestaurantLocationRating extends Model
{
    use HasFactory;

    protected $fillable = [
        'restaurant_location_id',
        'rating_id',
    ];

    public function restaurantLocation()
    {
        return $this->belongsTo(RestaurantLocation::class);
    }

    public function rating()
    {
        return $this->belongsTo(Rating::class);
    }
}
