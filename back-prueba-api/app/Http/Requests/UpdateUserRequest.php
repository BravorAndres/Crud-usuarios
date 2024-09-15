<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = $this->route('id');
        
        return [
            'name' => 'required|string|max:100',
            'username' => 'required|string|max:50',
            'email' => 'required|string|email|max:100|unique:users,email,' . $userId,
            'address_city' => 'required|string|max:50',
            'phone' => 'required|string|max:50',
            'website' => 'nullable|string|max:100',
            'company_name' => 'required|string|max:100',
            'company_bs' => 'required|string|max:100',
        ];
    }
}
