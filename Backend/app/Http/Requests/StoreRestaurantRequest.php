<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRestaurantRequest extends FormRequest
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
            'logo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'name' => 'required|unique:restaurants',
            'slug' => 'required|unique:restaurants',
            'title' => 'nullable',
            'summary' => 'nullable',
            'description' => 'nullable',
            'status' => 'nullable|in:Active,Inactive,Deleted',
            'locations' => 'required|array|min:1',
            'locations.*.address' => 'required',
            'locations.*.country_id' => 'required|exists:countries,id',
            'locations.*.governorate_id' => 'required|exists:governorates,id',
            'locations.*.city_id' => 'required|exists:cities,id',
            'locations.*.state_id' => 'required|exists:states,id',
            'locations.*.zip' => 'nullable|integer',
            'locations.*.latitude' => 'nullable|numeric',
            'locations.*.longitude' => 'nullable|numeric',
            'locations.*.opening_time' => 'nullable|date_format:H:i',
            'locations.*.closed_time' => 'nullable|date_format:H:i',
            'locations.*.closed_days' => 'nullable|array',
            'locations.*.number_of_tables' => 'nullable|integer',
            'locations.*.phone_number' => 'nullable|unique:restaurant_locations,phone_number',
            'locations.*.mobile_number' => 'nullable|unique:restaurant_locations,mobile_number',
            'locations.*.hot_line' => 'nullable|unique:restaurant_locations,hot_line',
            'locations.*.status' => 'nullable|in:Opened,Closed',
        ];
    }
}
