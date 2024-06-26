<?php

namespace App\Http\Requests\UserAddress;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserAddressRequest extends FormRequest
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
            'user_id'           => 'sometimes|required|exists:users,id',
            'address'           => 'nullable|string|max:255',
            'country_id'        => 'sometimes|required|exists:countries,id',
            'governorate_id'    => 'sometimes|required|exists:governorates,id',
            'city_id'           => 'sometimes|required|exists:cities,id',
            'state_id'          => 'sometimes|required|exists:states,id',
            'zip'               => 'nullable|integer|digits:5',
            'latitude'          => 'nullable|numeric',
            'longitude'         => 'nullable|numeric',
            'status'            => 'sometimes|required|in:enabled,disabled,deleted'
        ];
    }
}
