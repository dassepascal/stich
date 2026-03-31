<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $postId = $this->route('post')?->id;

        return [
            'title'        => ['required', 'string', 'max:255'],
            'slug'         => ['nullable', 'string', 'max:255', Rule::unique('posts', 'slug')->ignore($postId)],
            'content'      => ['required', 'string'],
            'excerpt'      => ['nullable', 'string', 'max:500'],
            'cover_image'  => ['nullable', 'string', 'max:500'],
            'is_published' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required'   => 'Le titre est obligatoire.',
            'title.max'        => 'Le titre ne doit pas dépasser 255 caractères.',
            'content.required' => 'Le contenu est obligatoire.',
            'slug.unique'      => 'Ce slug est déjà utilisé par un autre article.',
        ];
    }
}
