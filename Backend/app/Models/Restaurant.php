<?php

namespace App\Models;

use App\Notifications\ReservationCreatedNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Restaurant extends Model
{
    use HasFactory;

    public $guarded = ['id', 'created_at', 'updated_at'];

    public function resturant_images() : HasMany
    {
        return $this->hasMany(ResturantImages::class,'restaurant_id','id');
    }
    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function images(): HasMany
    {
        return $this->hasMany(RestaurantLocationImage::class, 'restaurant_id', 'id');
    }

    public function locations () : HasMany
    {
        return $this->hasMany(RestaurantLocation::class, 'restaurant_id', 'id');
    }

    public function categories() : BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'restaurant_categories', 'restaurant_id', 'category_id');
    }

    public function menuCategories(): HasMany
    {
        return $this->hasMany(MenuCategory::class, 'restaurant_id', 'id');
    }




}
