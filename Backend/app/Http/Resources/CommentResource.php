<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request)
    {
        return [
            'id'                     => $this->id,
            'restaurant_location_id' => $this->restaurant_location_id,
            'user_id'                => $this->user_id,
            'comment'                => $this->comment,
            'created_at'             => $this->updated_at,
            'user' => [
                'id' => $this->user->id,
                'first_name' => $this->user->first_name,
                'last_name' => $this->user->last_name,
                'rate' => optional($this->user->ratings()->where('restaurant_location_id', $this->restaurant_location_id)->first())->rate,
            ],
        ];
    }
}
