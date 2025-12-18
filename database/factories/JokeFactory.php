<?php

namespace Database\Factories;

use App\Models\Joke;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Joke>
 */
class JokeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Joke::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['Programming', 'Pun', 'General', 'Dark', 'Spooky', 'Christmas', 'Misc'];
        
        return [
            'user_id' => User::factory(),
            'title' => fake()->sentence(3),
            'content' => fake()->paragraph(2),
            'category' => fake()->randomElement($categories),
            'is_from_api' => false,
            'likes' => fake()->numberBetween(0, 100),
        ];
    }

    /**
     * Indicate that the joke is from the API.
     */
    public function fromApi(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_from_api' => true,
            'api_joke_id' => fake()->uuid(),
        ]);
    }
}

