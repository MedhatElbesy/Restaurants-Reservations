<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'mobile_number' => $this->mobile_number,
            'profile_image_url' => $this->profile_image_url,
            'gender' => $this->gender,
            'birth_date' => $this->birth_date,
            'role_name' => $this->role_name,
            'status' => $this->status,
            'email_verified_at' => $this->email_verified_at,
            'google_id' => $this->google_id,
            'facebook_id' => $this->facebook_id,
            'twitter_id' => $this->twitter_id,
            'addresses' => UserAddressResource::collection($this->whenLoaded('addresses')),
            'restaurants' => RestaurantResource::collection($this->whenLoaded('restaurants')),
        ];
    }
}
