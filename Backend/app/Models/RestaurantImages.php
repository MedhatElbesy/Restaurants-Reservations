<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class RestaurantImages extends Model
{
    use HasFactory;
    public $guarded = ['id','created_at','updated_at'];

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return 'https://static.vecteezy.com/system/resources/thumbnails/023/523/095/small_2x/3d-rendering-of-a-restaurant-building-illustration-png.png';
        }
        if (Str::startsWith($this->image, ['http://', 'https://'])) {
            return $this->image;
        }
        return url('storage/' . $this->image);
    }
   public function restaurant() : BelongsTo{
        return $this->belongsTo(Restaurant::class);
    }
}
