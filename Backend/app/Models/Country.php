<?php

namespace App\Models;

use App\Models\Scopes\EnabledStatusScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected static function booted(): void
    {
        static::addGlobalScope(new EnabledStatusScope);
    }

    protected $hidden = ['created_at', 'updated_at']; 

    public function governorates(){
        return $this->hasMany(Governorate::class, 'country_id', 'id');
    }
}
