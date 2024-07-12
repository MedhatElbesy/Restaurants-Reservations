<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RestaurantLocationResource extends JsonResource
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
            'restaurant' => $this->restaurant->name,
            'address' => $this->address,
            'country' => $this->country,
            'governorate' => $this->governorate,
            'city' => $this->city,
            'state' => $this->state,
            'zip' => $this->zip,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'opening_time' => $this->opening_time,
            'closed_time' => $this->closed_time,
            'closed_days' => $this->closed_days,
            'number_of_tables' => $this->number_of_tables,
            'phone_number' => $this->phone_number,
            'mobile_number' => $this->mobile_number,
            'status' => $this->status,
            'images' => RestaurantLocationImageResource::collection($this->whenLoaded('images')),
            'tables' => TableResource::collection($this->whenLoaded('tables')),
            
        ];
    }
}
