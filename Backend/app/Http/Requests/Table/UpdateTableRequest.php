<?php

namespace App\Http\Requests\Table;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTableRequest extends FormRequest
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
            'restaurant_location_id' => 'nullable|integer',
            'number_of_chairs' => 'nullable|integer',
            'max_number_of_persons' => 'nullable|integer',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric',
            'sale_price' => 'nullable|numeric',
            'extra_number_of_chairs' => 'nullable|integer',
            'extra_number_of_childs_chairs' => 'nullable|integer',
            'status' => 'nullable|in:Available,Unavailable',
        ];
    }
}
