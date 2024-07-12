<?php

namespace App\Http\Requests\owner;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UpdateOwnerRequest extends FormRequest
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
            'first_name'            => 'sometimes|required|string|min:2|max:255',
            'last_name'             => 'sometimes|required|string|min:2|max:255',
            'email'                 => ['sometimes', 'required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($this->user)],
            'mobile_number'         => ['sometimes', 'nullable', 'string', 'max:20', Rule::unique('users')->ignore($this->user)],
            'password'              => ['sometimes', 'required', 'string', Password::min(8), 'max:20', 'confirmed'],
            'password_confirmation' => ['sometimes', 'required', 'same:password'],
            'profile_image'         => 'sometimes|nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'gender'                => 'sometimes|nullable|in:male,female',
            'birth_date'            => 'sometimes|nullable|date',
            'restaurant_id'         => 'sometimes|required|exists:restaurants,id',
            'google_id'             => 'sometimes|nullable|string',
            'facebook_id'           => 'sometimes|nullable|string',
            'twitter_id'            => 'sometimes|nullable|string',
        ];
    }
}
