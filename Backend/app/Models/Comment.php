<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

        public $guarded = ['id', 'created_at', 'updated_at'];

        // public function restaurant(){
        //     return $this->belongsTo(Restaurant::class,'restaurant_id','id');
        // }
        public function restaurant()
        {
            return $this->belongsTo(Restaurant::class);
        }

        public function user()
    {
        return $this->belongsTo(User::class);
    }
}
