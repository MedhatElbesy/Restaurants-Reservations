<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;

class RestaurantLocation extends Model
{
    use HasFactory, Notifiable;
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
        return $this->hasMany(Rating::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function averageRating()
    {
        return $this->ratings()->avg('rate');
    }

}
