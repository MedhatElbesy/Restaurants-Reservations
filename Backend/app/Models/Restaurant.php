<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Restaurant extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'user_id',
        'logo',
        'cover',
        'name',
        'slug',
        'title',
        'summary',
        'description',
        'status',
    ];
    public $guarded = ['id', 'created_at', 'updated_at'];

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


}
