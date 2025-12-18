<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class JokeApiService
{
    /**
     * Base URL for the joke API
     * Using JokeAPI.dev - a free joke API
     */
    private $baseUrl;
    private $timeout;

    public function __construct()
    {
        $this->baseUrl = config('services.joke_api.base_url', 'https://v2.jokeapi.dev');
        $this->timeout = config('services.joke_api.timeout', 5);
    }

    /**
     * Fetch random jokes from the API.
     *
     * @param int $count Number of jokes to fetch
     * @return array
     */
    public function getRandomJokes(int $count = 5): array
    {
        try {
            $jokes = [];
            
            for ($i = 0; $i < $count; $i++) {
                $response = Http::timeout($this->timeout)->get($this->baseUrl . '/joke/Any', [
                    'type' => 'single',
                    'amount' => 1,
                ]);

                if ($response->successful()) {
                    $data = $response->json();
                    
                    if (isset($data['joke'])) {
                        $jokes[] = [
                            'id' => $data['id'] ?? uniqid(),
                            'joke' => $data['joke'],
                            'category' => $data['category'] ?? 'General',
                            'type' => $data['type'] ?? 'single',
                        ];
                    } elseif (isset($data['setup']) && isset($data['delivery'])) {
                        // Handle two-part jokes
                        $jokes[] = [
                            'id' => $data['id'] ?? uniqid(),
                            'joke' => $data['setup'] . ' ' . $data['delivery'],
                            'setup' => $data['setup'],
                            'delivery' => $data['delivery'],
                            'category' => $data['category'] ?? 'General',
                            'type' => $data['type'] ?? 'twopart',
                        ];
                    }
                }
                
                // Small delay to avoid rate limiting
                usleep(200000); // 0.2 seconds
            }

            return $jokes;
        } catch (\Exception $e) {
            Log::error('Joke API Service Error: ' . $e->getMessage());
            return [];
        }
    }

    /**
     * Fetch jokes by category.
     *
     * @param string $category
     * @param int $count
     * @return array
     */
    public function getJokesByCategory(string $category, int $count = 5): array
    {
        try {
            $response = Http::timeout($this->timeout)->get($this->baseUrl . '/joke/' . $category, [
                'type' => 'single',
                'amount' => $count,
            ]);

            if ($response->successful()) {
                $data = $response->json();
                
                if (isset($data['jokes'])) {
                    return array_map(function ($joke) use ($category) {
                        return [
                            'id' => $joke['id'] ?? uniqid(),
                            'joke' => $joke['joke'] ?? ($joke['setup'] . ' ' . $joke['delivery'] ?? ''),
                            'category' => $category,
                            'type' => $joke['type'] ?? 'single',
                        ];
                    }, $data['jokes']);
                }
            }

            return [];
        } catch (\Exception $e) {
            Log::error('Joke API Service Error: ' . $e->getMessage());
            return [];
        }
    }

    /**
     * Get available categories from the API.
     *
     * @return array
     */
    public function getCategories(): array
    {
        return Cache::remember('joke_api_categories', 86400, function () {
            try {
                $response = Http::timeout($this->timeout)->get($this->baseUrl . '/categories');
                
                if ($response->successful()) {
                    $data = $response->json();
                    return $data['categories'] ?? [];
                }
            } catch (\Exception $e) {
                Log::error('Joke API Categories Error: ' . $e->getMessage());
            }
            
            return ['Any', 'Programming', 'Misc', 'Dark', 'Pun', 'Spooky', 'Christmas'];
        });
    }

    /**
     * Search for jokes (if API supports it).
     *
     * @param string $query
     * @return array
     */
    public function searchJokes(string $query): array
    {
        // Note: JokeAPI.dev doesn't have a search endpoint
        // This is a placeholder for future implementation
        // You could implement client-side filtering instead
        return [];
    }
}

