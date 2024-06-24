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
            'locations' => 'required|array',
            'locations.*.id' => 'required|exists:restaurant_locations,id',
            'locations.*.address' => 'required|string',
            'locations.*.country_id' => 'required|exists:countries,id',
            'locations.*.governorate_id' => 'required|exists:governorates,id',
            'locations.*.city_id' => 'required|exists:cities,id',
            'locations.*.state_id' => 'nullable|exists:states,id',
            'locations.*.zip' => 'nullable|string',
            'locations.*.latitude' => 'nullable|numeric',
            'locations.*.longitude' => 'nullable|numeric',
            'locations.*.opening_time' => 'nullable|string',
            'locations.*.closed_time' => 'nullable|string',
            'locations.*.closed_days' => 'nullable|array',
            'locations.*.closed_days.*' => 'integer',
            'locations.*.number_of_tables' => 'nullable|integer',
            'locations.*.phone_number' => 'nullable|string',
            'locations.*.mobile_number' => 'nullable|string',
            'locations.*.hot_line' => 'nullable|string',
            'locations.*.status' => 'nullable|in:Opened,Closed',
        ];
    }
}
