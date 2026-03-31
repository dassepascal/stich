<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PostFactory extends Factory
{
    public function definition(): array
    {
        $title = $this->faker->unique()->sentence(5);

        return [
            'title'        => $title,
            'slug'         => Str::slug($title),
            'content'      => '<p>' . implode('</p><p>', $this->faker->paragraphs(4)) . '</p>',
            'excerpt'      => $this->faker->sentence(20),
            'cover_image'  => null,
            'is_published' => false,
            'published_at' => null,
        ];
    }

    public function published(): static
    {
        return $this->state([
            'is_published' => true,
            'published_at' => now(),
        ]);
    }
}
