<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        $serviceId = $this->route('service')?->id;

        return [
            'title'       => ['required', 'string', 'max:255', Rule::unique('services', 'title')->ignore($serviceId)],
            'description' => ['required', 'string'],
            'icon'        => ['required', 'string', 'max:100'],
            'link'        => ['nullable', 'string', 'max:255'],
            'order'       => ['nullable', 'integer', 'min:0'],
        ];
    }
}
