<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class ReservationDetail extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function reservation() : BelongsTo
    {
        return $this->belongsTo(Reservation::class);
    }

    public function table() : BelongsTo
    {
        return $this->belongsTo(Table::class, 'table_id', 'id');
    }

    public function getTransactionImageUrlAttribute()
    {
        if (!$this->transaction_image) {
            return 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=';
        }
        if (Str::startsWith($this->transaction_image, ['http://', 'https://'])) {
            return $this->transaction_image;
        }
        return url('storage/' . $this->transaction_image);
    }

}
