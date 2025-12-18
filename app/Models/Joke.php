<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Joke extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'title',
        'content',
        'category',
        'api_joke_id',
        'is_from_api',
        'likes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_from_api' => 'boolean',
        'likes' => 'integer',
    ];

    /**
     * Get the user that owns the joke.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope to filter jokes by category.
     */
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Scope to filter user's own jokes.
     */
    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope to filter API jokes.
     */
    public function scopeFromApi($query)
    {
        return $query->where('is_from_api', true);
    }

    /**
     * Scope to filter user-generated jokes.
     */
    public function scopeUserGenerated($query)
    {
        return $query->where('is_from_api', false);
    }
}

