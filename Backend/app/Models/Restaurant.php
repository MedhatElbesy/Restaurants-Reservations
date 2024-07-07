<?php

namespace App\Models;

use App\Notifications\ReservationCreatedNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Support\Str;

class Restaurant extends Model
{
    use HasFactory, Sluggable;

    public $guarded = ['id', 'created_at', 'updated_at'];

    public function getCoverUrlAttribute()
    {
        if (!$this->cover) {
            return 'https://static.vecteezy.com/system/resources/thumbnails/023/523/095/small_2x/3d-rendering-of-a-restaurant-building-illustration-png.png';
        }
        if (Str::startsWith($this->cover, ['http://', 'https://'])) {
            return $this->cover;
        }
        return url('storage/' . $this->cover);
    }

    public function getLogoUrlAttribute()
    {
        if (!$this->logo) {
            return 'https://e7.pngegg.com/pngimages/716/758/png-clipart-graphics-restaurant-logo-restaurant-thumbnail.png';
        }
        if (Str::startsWith($this->logo, ['http://', 'https://'])) {
            return $this->logo;
        }
        return url('storage/' . $this->logo);
    }

    public function restaurant_images() : HasMany
    {
        return $this->hasMany(RestaurantImages::class,'restaurant_id','id');
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

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }
}