<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLeadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'email' => ['required', 'email:rfc', 'max:255', 'unique:leads,email'],
        ];
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        return [
            'email.required' => 'Votre adresse email est requise.',
            'email.email'    => 'Cette adresse email ne semble pas valide.',
            'email.unique'   => 'Cette adresse email est déjà inscrite.',
        ];
    }
}
