<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'reservation_id' => $this->reservation_id,
            'user_id' => $this->user_id,
            'amount' => $this->amount,
            'gateway_id' => $this->gateway_id,
            'transaction_image' => $this->transaction_image_url,
            'transaction_phone_number' => $this->transaction_phone_number,
            'transaction_id' => $this->transaction_id,
            'customer_name' => $this->customer_name,
            'customer_email' => $this->customer_email,
            'customer_phone' => $this->customer_phone,
            'status' => $this->status,
        ];
    }
}
