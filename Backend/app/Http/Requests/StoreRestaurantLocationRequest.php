<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRestaurantLocationRequest extends FormRequest
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
            'restaurant_id' => 'required|exists:restaurants,id',
            'address' => 'nullable|string|max:255',
            'country_id' => 'required|exists:countries,id',
            'governorate_id' => 'required|exists:governorates,id',
            'city_id' => 'required|exists:cities,id',
            'state_id' => 'required|exists:states,id',
            'zip' => 'nullable|integer',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'opening_time' => 'nullable|date_format:H:i',
            'closed_time' => 'nullable|date_format:H:i',
            'closed_days' => 'nullable|array',
            'number_of_tables' => 'required|integer|min:0',
            'phone_number' => 'nullable|string|unique:restaurant_locations,phone_number',
            'mobile_number' => 'nullable|string|unique:restaurant_locations,mobile_number',
            'hot_line' => 'nullable|string|unique:restaurant_locations,hot_line',
            'status' => 'required|in:Opened,Closed',
        ];
    }
}
