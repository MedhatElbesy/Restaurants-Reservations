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

    protected $fillable = [
        'address', 'country_id', 'governorate_id', 'city_id', 'state_id', 'zip', 'latitude', 'longitude', 
        'opening_time', 'closed_time', 'closed_days', 'number_of_tables', 'phone_number', 'mobile_number', 
        'hot_line', 'status'
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


}
