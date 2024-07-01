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

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return 'https://img.freepik.com/free-psd/cafe-table-isolated-transparent-background_191095-13805.jpg';
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
