<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
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
            'user_id' => $this->user_id,
            'total_price' => $this->total_price,
            'notes' => $this->notes,
            'terms_and_conditions' => $this->terms_and_conditions,
            'details' => ReservationDetailResource::collection($this->whenLoaded('details')),
            'payments' => PaymentResource::collection($this->whenLoaded('payments')),
        ];
    }
}
