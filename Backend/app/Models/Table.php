<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Table extends Model
{
    use HasFactory;
    public $guarded = ['id', 'created_at', 'updated_at'];


    public function getCoverUrlAttribute()
    {
        if (!$this->cover) {
            return 'https://img.freepik.com/free-psd/cafe-table-isolated-transparent-background_191095-13805.jpg';
        }
        if (Str::startsWith($this->cover, ['http://', 'https://'])) {
            return $this->cover;
        }
        return url('storage/table_cover_images/' . $this->cover);
    }

    public function restaurantLocation() : BelongsTo
    {
        return $this->belongsTo(RestaurantLocation::class);
    }

    public function availabilities() : HasMany
    {
        return $this->hasMany(TableAvailability::class);
    }

    public function images() : HasMany
    {
        return $this->hasMany(TableImage::class);
    }
    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}
