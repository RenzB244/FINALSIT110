# Quick Setup Instructions

## Prerequisites
- PHP >= 8.1
- Composer
- Node.js >= 18.x
- MySQL >= 8.0 (required)

## Installation Steps

1. **Install PHP Dependencies**
   ```bash
   composer install
   ```

2. **Install Node Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configure MySQL Database**
   - Edit `.env` file
   - Set `DB_CONNECTION=mysql` (already set as default)
   - Set `DB_DATABASE=joke_app`
   - Set `DB_USERNAME=root` (or your MySQL username)
   - Set `DB_PASSWORD=` (your MySQL password, leave empty if no password)
   - Create database in MySQL:
     ```sql
     CREATE DATABASE joke_app;
     ```

5. **Run Migrations**
   ```bash
   php artisan migrate
   ```

6. **Build Assets**
   ```bash
   npm run dev
   # or for production: npm run build
   ```

7. **Start Server**
   ```bash
   php artisan serve
   ```

Visit: http://localhost:8000

## Default Routes

- `/` - Welcome page
- `/register` - User registration
- `/login` - User login
- `/dashboard` - User dashboard (protected)
- `/jokes` - List all jokes (protected)
- `/jokes/create` - Create new joke (protected)

## API Integration

The application uses JokeAPI.dev (https://v2.jokeapi.dev) for fetching jokes.

Configuration is in `config/services.php`:
```php
'joke_api' => [
    'base_url' => env('JOKE_API_BASE_URL', 'https://v2.jokeapi.dev'),
    'timeout' => env('JOKE_API_TIMEOUT', 5),
],
```

## Features

✅ User Authentication (Register, Login, Logout, Password Reset)
✅ Full CRUD for Jokes
✅ API Integration with Caching
✅ Category Filtering
✅ Like System
✅ Import Jokes from API
✅ Protected Routes
✅ Input Validation
✅ Error Handling

