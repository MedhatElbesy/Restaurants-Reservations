<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

        public $guarded = ['id', 'created_at', 'updated_at'];

        public function restaurantLocation()
        {
            return $this->belongsTo(RestaurantLocation::class);
        }

        public function user()
        {
            return $this->belongsTo(User::class);
        }
}
