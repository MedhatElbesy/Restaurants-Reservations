<?php

namespace App\Http\Requests\Table;

use Illuminate\Foundation\Http\FormRequest;

class StoreTableAvailabilityRequest extends FormRequest
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
            'table_id' => 'required|exists:tables,id',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'status' => 'required|in:Available,Unavailable',
        ];
    }


    public function messages()
    {
        return [
            'table_id.required' => 'The table ID is required.',
            'table_id.exists' => 'The selected table ID is invalid.',
            'start_time.required' => 'The start time is required.',
            'start_time.date_format' => 'The start time must be in the format HH:MM.',
            'end_time.required' => 'The end time is required.',
            'end_time.date_format' => 'The end time must be in the format HH:MM.',
            'end_time.after' => 'The end time must be after the start time.',
            'status.required' => 'The status is required.',
            'status.in' => 'The status must be either Available or Unavailable.',
        ];
    }
}
