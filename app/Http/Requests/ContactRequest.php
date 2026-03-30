<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            // Honeypot : le champ doit être présent (rendu dans le HTML) et vide.
            // Un bot qui le remplit est rejeté silencieusement.
            'website' => ['present', 'max:0'],

            'name'    => ['required', 'string', 'max:150'],
            'email'   => ['required', 'email:rfc', 'max:255'],
            'company' => ['nullable', 'string', 'max:150'],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
        ];
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        return [
            'name.required'    => 'Votre nom est requis.',
            'email.required'   => 'Votre adresse email est requise.',
            'email.email'      => 'Cette adresse email ne semble pas valide.',
            'message.required' => 'Un message est requis.',
            'message.min'      => 'Votre message doit contenir au moins 10 caractères.',
        ];
    }
}
