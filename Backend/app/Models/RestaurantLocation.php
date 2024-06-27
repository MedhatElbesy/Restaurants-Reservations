<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RestaurantLocation extends Model
{
    use HasFactory;
    public $guarded = ['id', 'created_at', 'updated_at'];

    protected $casts = [
        'closed_days' => 'array',
    ];


    public function country()
    {
        return $this->belongsTo(Country::class);
    }


    public function governorate()
    {
        return $this->belongsTo(Governorate::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }


    public function state()
    {
        return $this->belongsTo(State::class);
    }


    public function restaurant() : BelongsTo
    {
        return $this->belongsTo(Restaurant::class, 'restaurant_id', 'id');
    }

    public function tables() : HasMany
    {
        return $this->hasMany(Table::class, 'restaurant_location_id', 'id');
    }

    public function images() : HasMany
    {
        return $this->hasMany(RestaurantLocationImage::class, 'restaurant_location_id', 'id');
    }

    public function ratings()
    {
        return $this->belongsToMany(Rating::class, 'restaurant_location_rating');
    }

    public function comments() {
        return $this->belongsToMany(Comment::class, 'restaurant_location_comments', 'restaurant_location_id', 'comment_id');
    }
    // const OPENED = 'Opened';
    // const CLOSED = 'Closed';
    // const REPORTED = 'Reported';

}
