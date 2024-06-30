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

            'details' => 'required|array',
            'details.*.table_id' => 'required|exists:tables,id',
            'details.*.table_availability_id' => 'required|exists:table_availabilities,id',
            'details.*.reservation_date' => 'required|date',
            'details.*.reservation_time' => 'nullable|date_format:H:i',
            'details.*.amount' => 'required|numeric|min:0',
            'details.*.tax' => 'required|numeric|min:0',
            'details.*.number_of_extra_chairs' => 'required|integer|min:0',
            'details.*.number_of_extra_childs_chairs' => 'required|integer|min:0',

            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|in:credit_card,cash,paypal,gateway',
            'gateway_id' => 'nullable|exists:gateways,id',
            'transaction_image' => 'nullable|string|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'transaction_id' => 'nullable|string',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'nullable|string|max:20',
            'status' => 'required|in:pending,success,failed,rejected,confirmed,cancelled',
        ];
    }
}
