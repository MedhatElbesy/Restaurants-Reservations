<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategory extends FormRequest
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
            'user_id' =>'required|exists:users,id',
            'name' => 'required|unique:categories,name',
            'slug' => 'required|unique:categories,slug',
            'cover' => 'nullable|string',
            'description' => 'nullable|string',
            'status' => 'required|in:Enabled,Disabled,Deleted',
        ];
    }
}
