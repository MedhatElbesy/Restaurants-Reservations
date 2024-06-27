<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

        public $guarded = ['id', 'created_at', 'updated_at'];



        public function restaurantLocations() {
        return $this->belongsToMany(RestaurantLocation::class, 'restaurant_location_comments', 'comment_id', 'restaurant_location_id');
    }
}
