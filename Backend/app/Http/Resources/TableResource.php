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
            'cover' => $this->cover_url,
            'description'=>$this->description,
            'price' => $this->price,
            'sale_price' => $this->sale_price,
            'extra_number_of_chairs' => $this->extra_number_of_chairs,
            'extra_number_of_childs_chairs'   => $this->extra_number_of_childs_chairs,
            'status' => $this->status,
            'images' => TableImageResource::collection($this->whenLoaded('images')),
        ];
    }
}
