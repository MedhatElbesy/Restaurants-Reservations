<?php

namespace App\Models;

use App\Models\Scopes\EnabledStatusScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected static function booted(): void
    {
        static::addGlobalScope(new EnabledStatusScope);
    }

    protected $hidden = ['created_at', 'updated_at']; 

    public function governorate(){
        return $this->belongsTo(Governorate::class, 'governorate_id', 'id');
    }

    public function states(){
        return $this->hasMany(State::class, 'city_id', 'id');
    }


}
