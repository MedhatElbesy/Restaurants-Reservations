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


    public function getTableUrlAttribute()
    {
        if (!$this->cover) {
            return 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=';
        }
        if (Str::startsWith($this->cover, ['http://', 'https://'])) {
            return $this->cover;
        }
        return url('storage/' . $this->cover);
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
