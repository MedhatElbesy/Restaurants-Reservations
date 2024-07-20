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
            // 'country_id' => $this->country_id,
            'country_name' => $this->country->name,
            'country_code' => $this->country->country_code,
            // 'governorate_id' => $this->governorate_id,
            'governorate_name' => $this->governorate->name,
            // 'state_id' => $this->state->id,
            'state_name' => $this->state->name,
            // 'city_id'=> $this->city->id,
            'city_name'=> $this->city->name,
            'zip' => $this->zip,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'opening_time' => $this->opening_time,
            'closed_time' => $this->closed_time,
            'closed_days' => $this->closed_days,
            'number_of_available_tables' => $this->number_of_available_tables,
            // 'number_of_tables' => $this->number_of_tables,
            'phone_number' => $this->phone_number,
            'mobile_number' => $this->mobile_number,
            'status' => $this->status,
            'images' => RestaurantLocationImageResource::collection($this->whenLoaded('images')),
            'tables' => TableResource::collection($this->whenLoaded('tables')),
            'average_rating' => $this->when(isset($this->average_rating), $this->average_rating),
            'comments_count' => $this->commentsCount(),
            

        ];
    }
}
