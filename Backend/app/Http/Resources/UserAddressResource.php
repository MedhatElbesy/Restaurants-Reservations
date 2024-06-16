<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserAddressResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user' => $this->user->full_name,
            'address' => $this->address,
            'country' => $this->country->name,
            'governorate' => $this->governorate->name,
            'city' => $this->city->name,
            'state' =>$this->state->name,
            'zip' => $this->zip,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'status' => $this->status,
        ];
    }
}

