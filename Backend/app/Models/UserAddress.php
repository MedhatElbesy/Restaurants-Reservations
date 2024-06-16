<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserAddress extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at', 'deleted_at'];

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function country() : BelongsTo {
        return $this->belongsTo(Country::class, 'country_id', 'id');
    }

    public function governorate() : BelongsTo
    {
        return $this->belongsTo(Governorate::class, 'governorate_id', 'id');
    }

    public function city() : BelongsTo
    {
        return $this->belongsTo(City::class, 'city_id', 'id');
    }

    public function state() : BelongsTo {
        return $this->belongsTo(State::class, 'state_id', 'id');
    }
}
