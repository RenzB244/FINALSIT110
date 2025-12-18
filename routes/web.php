<?php

use App\Http\Controllers\JokeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Joke routes - all protected by authentication
    Route::resource('jokes', JokeController::class);
    Route::post('/jokes/{joke}/like', [JokeController::class, 'like'])->name('jokes.like');
    Route::post('/jokes/import', [JokeController::class, 'importFromApi'])->name('jokes.import');
});

require __DIR__.'/auth.php';

