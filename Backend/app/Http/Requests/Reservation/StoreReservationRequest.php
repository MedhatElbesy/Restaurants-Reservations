<?php

namespace App\Http\Requests\Reservation;

use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'total_price' => 'required|numeric|min:0',
            'notes' => 'nullable|string',
            'terms_and_conditions' => 'required|boolean',

            //'details' => 'required|array',
            'table_id' => 'required|exists:tables,id',
            'table_availability_id' => 'required|exists:table_availabilities,id',
            'reservation_date' => 'required|date',
            'reservation_time' => 'nullable|date_format:H:i',
            //'amount' => 'required|numeric|min:0',
            'number_of_extra_chairs' => 'required|integer|min:0',
            'number_of_extra_childs_chairs' => 'required|integer|min:0',

            'amount'            => 'required|numeric|min:0',
            'gateway_id'        => 'nullable|exists:gateways,id',
            'transaction_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'transaction_phone_number' => 'nullable|string|max:20',
            'transaction_id' => 'nullable|string',
            'customer_name'  => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'nullable|string|max:20',
        ];
    }
}
