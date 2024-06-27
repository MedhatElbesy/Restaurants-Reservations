<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TableResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'restaurant_location_id' => $this->restaurant_location_id,
            'number_of_chairs' => $this->number_of_chairs,
            'max_number_of_persons' => $this->max_number_of_persons,
            'cover' => $this->cover ? url('images/table_covers/' . basename($this->cover)) : null,
            'price' => $this->price,
            'sale_price' => $this->sale_price,
            'extra_number_of_chairs' => $this->extra_number_of_chairs,
            'number_of_extra_chairs'  => $this->number_of_extra_chairs,
            'extra_number_of_childs_chairs'   => $this->extra_number_of_childs_chairs,
            'number_of_extra_childs_chairs'   => $this->number_of_extra_childs_chairs,
            'status' => $this->status,
            'images' => TableImageResource::collection($this->whenLoaded('images')),
        ];
    }
}
