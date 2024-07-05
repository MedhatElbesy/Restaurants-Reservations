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
            'title' => 'nullable',
            'summary' => 'nullable',
            'description' => 'nullable',
            'status' => 'nullable|in:Active,Inactive,Deleted',
            'hot_line' => 'nullable|string|unique:restaurant_locations,hot_line'
        ];
    }
}
