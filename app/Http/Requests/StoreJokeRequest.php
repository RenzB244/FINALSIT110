<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJokeRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'content' => 'required|string|min:10|max:2000',
            'category' => 'nullable|string|max:100',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'The joke title is required.',
            'title.max' => 'The joke title must not exceed 255 characters.',
            'content.required' => 'The joke content is required.',
            'content.min' => 'The joke content must be at least 10 characters.',
            'content.max' => 'The joke content must not exceed 2000 characters.',
            'category.max' => 'The category must not exceed 100 characters.',
        ];
    }
}

