<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ResturantImages extends Model
{
    use HasFactory;
    public $guarded = ['id','restaurant_id','image'];
   public function resturantImage() : BelongsTo{
        return $this->belongsTo(Restaurant::class);
    }
}
