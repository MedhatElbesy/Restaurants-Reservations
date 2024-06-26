<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;


class StoreUserRequest extends FormRequest
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
     * @return array<string
     */
    public function rules(): array
    {
        return [
            'first_name'            => 'required|string|max:255',
            'last_name'             => 'required|string|max:255',
            'email'                 => ['required', 'string', 'email', 'max:255' , Rule::unique('users')->ignore($this->user)],
            'mobile_number'         => ['nullable', 'string', 'max:20' , Rule::unique('users')->ignore($this->user)],
            'password'              => ['required', 'string', Password::min(8) ,'max:20', 'confirmed'],
            'password_confirmation' => ['required', 'same:password'],
            'profile_image'         => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'gender'                => 'nullable|in:male,female',
            'birth_date'            => 'nullable|date',
            'roles_name'            => 'required|in:admin,user,owner',
            'status'                => 'required|in:Active,InActive,Blocked,Deleted',
            'google_id'             => 'nullable|string',
            'facebook_id'           => 'nullable|string',
            'twitter_id'            => 'nullable|string',
        ];
    }
}
