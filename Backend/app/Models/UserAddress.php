<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserAddress extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at', 'deleted_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function country() : BelongsTo
    {
        return $this->belongsTo(Country::class, 'country_id', 'id');
    }

    public function governorate() : BelongsTo
    {
        return $this->belongsTo(Governorate::class, 'governorate_id', 'id');
    }
    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function state() : BelongsTo
    {
        return $this->belongsTo(State::class, 'state_id', 'id');
    }
}
