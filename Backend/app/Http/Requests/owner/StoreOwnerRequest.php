<?php

namespace App\Http\Requests\owner;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class StoreOwnerRequest extends FormRequest
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
            'first_name'            => 'required|string|min:2|max:255',
            'last_name'             => 'required|string|min:2|max:255',
            'email'                 => ['required', 'string', 'email', 'max:255' , Rule::unique('users')->ignore($this->user)],
            'mobile_number'         => ['nullable', 'string', 'max:20' , Rule::unique('users')->ignore($this->user)],
            'password'              => ['required', 'string', Password::min(8) ,'max:20', 'confirmed'],
            'password_confirmation' => ['required', 'same:password'],
            'profile_image'         => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'gender'                => 'nullable|in:male,female',
            'birth_date'            => 'nullable|date',
            'restaurant_id'         => 'required|exists:restaurants,id',
            'google_id'             => 'nullable|string',
            'facebook_id'           => 'nullable|string',
            'twitter_id'            => 'nullable|string',

        ];
    }
}
