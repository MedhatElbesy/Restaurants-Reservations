<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "table_id" => $this->table_id,
            "table_availability_id" => $this->table_availability_id,
            "reservation_date" => $this->reservation_date,
            "reservation_time" => $this->reservation_time,
            "amount" => $this->amount,
            "number_of_extra_chairs" => $this->number_of_extra_chairs,
            "number_of_extra_childs_chairs" => $this->number_of_extra_childs_chairs,
        ];
    }
}
