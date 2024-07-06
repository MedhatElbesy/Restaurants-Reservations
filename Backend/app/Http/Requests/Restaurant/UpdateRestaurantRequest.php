<?php

namespace App\Http\Requests\Restaurant;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRestaurantRequest extends FormRequest
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
            'user_id' => 'required|exists:users,id',
            //'slug' => 'required|string|unique:restaurants,slug,' . $this->route('restaurant'), // unique rule with ignoring the current restaurant ID
            'title' => 'required|string',
            'name' => 'required|string',
            'summary' => 'nullable|string',
            'description' => 'nullable|string',
            'status' => 'nullable|in:Active,Inactive,Deleted',
            'locations' => 'nullable|array',
            'locations.*.id' => 'nullable|exists:restaurant_locations,id,restaurant_id,' . $this->route('restaurant'),
            'locations.*.address' => 'required|string',
            'locations.*.country_id' => 'required|exists:countries,id',
            'locations.*.governorate_id' => 'required|exists:governorates,id',
            'locations.*.city_id' => 'required|exists:cities,id',
            'locations.*.state_id' => 'required|exists:states,id',
            'locations.*.zip' => 'nullable|string',
            'locations.*.latitude' => 'nullable|numeric',
            'locations.*.longitude' => 'nullable|numeric',
            'locations.*.opening_time' => 'nullable|date_format:H:i',
            'locations.*.closed_time' => 'nullable|date_format:H:i',
            'locations.*.closed_days' => 'nullable|array',
            'locations.*.closed_days.*' => 'nullable|string',
            'locations.*.number_of_tables' => 'nullable|integer',
            'locations.*.phone_number' => 'nullable|string',
            'locations.*.mobile_number' => 'nullable|string',
            'locations.*.hot_line' => 'nullable|string',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ];
    }
}
