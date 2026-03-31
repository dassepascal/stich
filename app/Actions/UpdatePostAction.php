<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\Post;

class UpdatePostAction
{
    public function handle(Post $post, array $data): Post
    {
        if (empty($data['slug'])) {
            $data['slug'] = Post::generateUniqueSlug($data['title'], $post->id);
        }

        if (!empty($data['is_published']) && empty($post->published_at)) {
            $data['published_at'] = now();
        }

        $post->update($data);

        return $post;
    }
}
