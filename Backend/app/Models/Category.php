<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;


class Category extends Model
{
    use HasFactory, Sluggable;
    public $guarded = ['id', 'created_at', 'updated_at'];

    public function getCoverUrlAttribute()
    {
        if (!$this->cover) {
            return 'https://img.freepik.com/free-psd/cafe-table-isolated-transparent-background_191095-13805.jpg';
        }
        if (Str::startsWith($this->cover, ['http://', 'https://'])) {
            return $this->cover;
        }
        return url('storage/' . $this->cover);
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function restaurants(): BelongsToMany
    {
        return $this->belongsToMany(Restaurant::class, 'restaurant_categories', 'category_id', 'restaurant_id');
    }
    public function restaurantCategories(): HasMany
    {
        return $this->hasMany(RestaurantCategory::class);
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
