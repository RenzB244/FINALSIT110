<?php

return [
    'joke_api' => [
        'base_url' => env('JOKE_API_BASE_URL', 'https://v2.jokeapi.dev'),
        'timeout' => env('JOKE_API_TIMEOUT', 5),
    ],
];

