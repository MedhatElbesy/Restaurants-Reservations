<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class TableImage extends Model
{
    use HasFactory;
    public $guarded = ['id', 'created_at', 'updated_at'];


    public function getTableUrlAttribute()
    {
        if (!$this->image) {
            return 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=';
        }
        if (Str::startsWith($this->image, ['http://', 'https://'])) {
            return $this->image;
        }
        return url('storage/' . $this->image);
    }

    public function table() : BelongsTo
    {
        return $this->belongsTo(Table::class);
    }
}
