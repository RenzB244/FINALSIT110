<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreJokeRequest;
use App\Http\Requests\UpdateJokeRequest;
use App\Models\Joke;
use App\Services\JokeApiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class JokeController extends Controller
{
    protected $jokeApiService;

    public function __construct(JokeApiService $jokeApiService)
    {
        $this->jokeApiService = $jokeApiService;
    }

    /**
     * Display a listing of jokes.
     */
    public function index(Request $request)
    {
        $query = Joke::with('user')
            ->orderBy('created_at', 'desc');

        // Filter by category if provided
        if ($request->has('category') && $request->category) {
            $query->byCategory($request->category);
        }

        // Filter by user's own jokes
        if ($request->has('my_jokes') && $request->my_jokes) {
            $query->byUser(auth()->id());
        }

        // Filter by API or user-generated
        if ($request->has('source')) {
            if ($request->source === 'api') {
                $query->fromApi();
            } elseif ($request->source === 'user') {
                $query->userGenerated();
            }
        }

        $jokes = $query->paginate(12);

        // Fetch categories for filter
        $categories = Joke::distinct()
            ->whereNotNull('category')
            ->pluck('category')
            ->toArray();

        // Fetch random jokes from API
        $apiJokes = $this->getApiJokes();

        return Inertia::render('Jokes/Index', [
            'jokes' => $jokes,
            'categories' => $categories,
            'apiJokes' => $apiJokes,
            'filters' => $request->only(['category', 'my_jokes', 'source']),
        ]);
    }

    /**
     * Show the form for creating a new joke.
     */
    public function create()
    {
        return Inertia::render('Jokes/Create');
    }

    /**
     * Store a newly created joke in storage.
     */
    public function store(StoreJokeRequest $request)
    {
        $joke = Joke::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'content' => $request->content,
            'category' => $request->category,
            'is_from_api' => false,
        ]);

        return redirect()->route('jokes.index')
            ->with('success', 'Joke created successfully!');
    }

    /**
     * Display the specified joke.
     */
    public function show(Joke $joke)
    {
        $joke->load('user');

        return Inertia::render('Jokes/Show', [
            'joke' => $joke,
        ]);
    }

    /**
     * Show the form for editing the specified joke.
     */
    public function edit(Joke $joke)
    {
        // Ensure user can only edit their own jokes
        if ($joke->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Jokes/Edit', [
            'joke' => $joke,
        ]);
    }

    /**
     * Update the specified joke in storage.
     */
    public function update(UpdateJokeRequest $request, Joke $joke)
    {
        $joke->update([
            'title' => $request->title,
            'content' => $request->content,
            'category' => $request->category,
        ]);

        return redirect()->route('jokes.show', $joke)
            ->with('success', 'Joke updated successfully!');
    }

    /**
     * Remove the specified joke from storage.
     */
    public function destroy(Joke $joke)
    {
        // Ensure user can only delete their own jokes
        if ($joke->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $joke->delete();

        return redirect()->route('jokes.index')
            ->with('success', 'Joke deleted successfully!');
    }

    /**
     * Import a joke from the API.
     */
    public function importFromApi(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'api_joke_id' => 'required|string',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        // Check if joke already imported by this user
        $existingJoke = Joke::where('user_id', auth()->id())
            ->where('api_joke_id', $request->api_joke_id)
            ->first();

        if ($existingJoke) {
            return redirect()->back()
                ->with('error', 'You have already imported this joke.');
        }

        $joke = Joke::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'content' => $request->content,
            'category' => $request->category,
            'api_joke_id' => $request->api_joke_id,
            'is_from_api' => true,
        ]);

        return redirect()->route('jokes.index')
            ->with('success', 'Joke imported successfully!');
    }

    /**
     * Like a joke.
     */
    public function like(Joke $joke)
    {
        $joke->increment('likes');

        return response()->json([
            'success' => true,
            'likes' => $joke->fresh()->likes,
        ]);
    }

    /**
     * Get jokes from API with caching.
     */
    private function getApiJokes()
    {
        return Cache::remember('api_jokes_random', 3600, function () {
            try {
                return $this->jokeApiService->getRandomJokes(5);
            } catch (\Exception $e) {
                \Log::error('Failed to fetch API jokes: ' . $e->getMessage());
                return [];
            }
        });
    }
}

