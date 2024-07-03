<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class UpdateUserRequest extends FormRequest
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
            'first_name'            => 'sometimes|required|string|max:255',
            'last_name'             => 'sometimes|required|string|max:255',
            'email'                 => ['sometimes', 'required', 'string', 'email', 'max:255' , Rule::unique('users')->ignore($this->user)],
            'mobile_number'         => ['nullable', 'string', 'max:20' , Rule::unique('users')->ignore($this->user)],
            'profile_image'         => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'gender'                => 'nullable|in:male,female',
            'birth_date'            => 'nullable|date',
            'role_name'            => 'sometimes|required|in:admin,user,owner',
            'status'                => 'sometimes|required|in:Active,InActive,Blocked,Deleted',
            'google_id'             => 'nullable|string',
            'facebook_id'           => 'nullable|string',
            'twitter_id'            => 'nullable|string',
        ];
    }
}