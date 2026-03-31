<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\Post;

class CreatePostAction
{
    public function handle(array $data): Post
    {
        if (empty($data['slug'])) {
            $data['slug'] = Post::generateUniqueSlug($data['title']);
        }

        if (!empty($data['is_published']) && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        return Post::create($data);
    }
}
