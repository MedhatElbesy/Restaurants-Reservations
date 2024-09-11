<?php

namespace App\Http\Requests\Restaurant;

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
            'closed_days' => 'nullable|array',
            'closed_days.*' => 'nullable|string',
            'hot_line' => 'nullable|string',
            'number_of_tables' => 'nullable|integer',
            'phone_number' => 'nullable|string',
            'mobile_number' => 'nullable|string',
            'status' => 'nullable|in:Opened,Closed,Reported',
            'images' => 'nullable|array|max:2048',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }

    
    public function prepareForUpdate(): array
    {
        $data = $this->validated();

        return [
            'address' => $data['address'],
            'country_id' => $data['country_id'],
            'governorate_id' => $data['governorate_id'],
            'city_id' => $data['city_id'],
            'state_id' => $data['state_id'] ?? null,
            'zip' => $data['zip'] ?? null,
            'latitude' => $data['latitude'] ?? null,
            'longitude' => $data['longitude'] ?? null,
            'opening_time' => $data['opening_time'] ?? null,
            'closed_time' => $data['closed_time'] ?? null,
            'closed_days' => isset($data['closed_days']) ? implode(',', $data['closed_days']) : null,
            'number_of_tables' => $data['number_of_tables'] ?? 0,
            'phone_number' => $data['phone_number'] ?? null,
            'mobile_number' => $data['mobile_number'] ?? null,
            'hot_line' => $data['hot_line'] ?? null,
            'status' => $data['status'] ?? 'Opened',
        ];
    }
}
