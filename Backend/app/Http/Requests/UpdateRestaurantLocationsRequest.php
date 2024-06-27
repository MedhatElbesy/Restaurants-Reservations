<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRestaurantLocationsRequest extends FormRequest
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
            'address' => 'sometimes|required|string',
            'country_id' => 'sometimes|required|exists:countries,id',
            'governorate_id' => 'sometimes|required|exists:governorates,id',
            'city_id' => 'sometimes|required|exists:cities,id',
            'state_id' => 'nullable|exists:states,id',
            'zip' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'opening_time' => 'nullable|string',
            'closed_time' => 'nullable|string',
            'closed_days' => 'nullable',
            'hot_line' => 'nullable|string',
            'number_of_tables' => 'nullable|integer',
            'phone_number' => 'nullable|string',
            'mobile_number' => 'nullable|string',
            'status' => 'nullable|in:Opened,Closed,Reported',
            'images' => 'nullable|array|max:2048',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }
}
