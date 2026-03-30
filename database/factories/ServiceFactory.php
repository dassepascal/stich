<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /** @return array<string, mixed> */
    public function definition(): array
    {
        $icons = ['hub', 'bolt', 'psychology', 'auto_awesome', 'rocket_launch', 'settings_suggest'];

        return [
            'title'       => fake()->unique()->words(3, true),
            'description' => fake()->sentence(),
            'icon'        => fake()->randomElement($icons),
            'link'        => '/services/' . fake()->slug(2),
            'order'       => fake()->numberBetween(0, 100),
        ];
    }
}
