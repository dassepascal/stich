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
            'cover_image'        => ['nullable', 'image', 'max:2048', 'mimes:jpeg,png,webp'],
            'cover_image_path'   => ['nullable', 'string', 'max:255'],
            'remove_cover_image' => ['nullable', 'boolean'],
            'is_published'       => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required'   => 'Le titre est obligatoire.',
            'title.max'        => 'Le titre ne doit pas dépasser 255 caractères.',
            'content.required' => 'Le contenu est obligatoire.',
            'slug.unique'              => 'Ce slug est déjà utilisé par un autre article.',
            'cover_image.image'        => "Le fichier doit être une image.",
            'cover_image.max'          => "L'image ne doit pas dépasser 2 Mo.",
            'cover_image.mimes'        => "Formats acceptés : jpeg, png, webp.",
        ];
    }
}
