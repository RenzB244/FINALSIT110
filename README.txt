================================================================================
JOKE APPLICATION - BACKEND SETUP INSTRUCTIONS
IT110 Final Project - Web Systems and Technologies
================================================================================

PROJECT OVERVIEW
----------------
This is a full-stack web application built with Laravel, React, and Inertia.js.
Users can upload their own jokes, view jokes from a public API, and manage
their joke collection with full CRUD operations.

TECH STACK
----------
- Backend: Laravel 10.x
- Frontend: React 18.x with Inertia.js
- Database: MySQL (default and recommended)
- Authentication: Laravel Breeze
- API Integration: JokeAPI.dev (https://v2.jokeapi.dev)

PREREQUISITES
-------------
1. PHP >= 8.1
2. Composer (PHP package manager)
3. Node.js >= 18.x and npm
4. MySQL >= 8.0 (required)
5. Git

INSTALLATION STEPS
------------------

1. INSTALL COMPOSER DEPENDENCIES
   ------------------------------
   Open terminal/command prompt in the project directory and run:
   
   composer install

2. INSTALL NPM DEPENDENCIES
   -------------------------
   npm install

3. ENVIRONMENT CONFIGURATION
   --------------------------
   Copy the .env.example file to .env:
   
   cp .env.example .env
   
   (On Windows: copy .env.example .env)
   
   Edit the .env file and configure:
   - Database connection settings (DB_DATABASE, DB_USERNAME, DB_PASSWORD)
   - APP_NAME (optional)
   - APP_URL (your local development URL)

4. GENERATE APPLICATION KEY
   -------------------------
   php artisan key:generate

5. DATABASE SETUP
   ---------------
   Create a new database in MySQL:
   
   CREATE DATABASE joke_app;
   
   Or using MySQL command line:
   mysql -u root -p
   CREATE DATABASE joke_app;
   EXIT;
   
   Run migrations:
   
   php artisan migrate

6. BUILD FRONTEND ASSETS
   ----------------------
   For development:
   npm run dev
   
   For production:
   npm run build

7. START THE DEVELOPMENT SERVER
   -----------------------------
   php artisan serve
   
   The application will be available at http://localhost:8000

FEATURES IMPLEMENTED
--------------------

AUTHENTICATION
- User registration
- User login/logout
- Password reset functionality
- Email verification (optional)
- Protected routes with middleware

CRUD OPERATIONS
- Create: Users can upload their own jokes
- Read: View all jokes, filter by category, view own jokes
- Update: Edit own jokes
- Delete: Delete own jokes
- Import jokes from public API

API INTEGRATION
- Fetches random jokes from JokeAPI.dev
- Caching for API responses (1 hour cache)
- Error handling for API failures
- Support for single and two-part jokes

DATABASE SCHEMA
---------------
- users: User accounts (Laravel default)
- jokes: User-generated and imported jokes
  - id, user_id, title, content, category
  - api_joke_id, is_from_api, likes
  - timestamps

ROUTES
------
GET  /                    - Welcome page
GET  /dashboard           - User dashboard (protected)
GET  /jokes               - List all jokes (protected)
GET  /jokes/create        - Create joke form (protected)
POST /jokes               - Store new joke (protected)
GET  /jokes/{id}          - Show joke (protected)
GET  /jokes/{id}/edit     - Edit joke form (protected)
PUT  /jokes/{id}          - Update joke (protected)
DELETE /jokes/{id}        - Delete joke (protected)
POST /jokes/import        - Import from API (protected)
POST /jokes/{id}/like     - Like a joke (protected)

AUTHENTICATION ROUTES
- /register, /login, /logout
- /forgot-password, /reset-password
- /verify-email

API SERVICE
-----------
The JokeApiService (app/Services/JokeApiService.php) handles:
- Fetching random jokes
- Fetching jokes by category
- Getting available categories
- Error handling and logging

CACHING STRATEGY
----------------
- API jokes are cached for 1 hour to reduce API calls
- Cache key: 'api_jokes_random'
- Cache key: 'joke_api_categories' (24 hours)

SECURITY FEATURES
-----------------
- Password hashing (bcrypt)
- CSRF protection
- SQL injection prevention (Eloquent ORM)
- Authorization checks (users can only edit/delete own jokes)
- Input validation on all forms

TROUBLESHOOTING
---------------

Issue: "Class not found" errors
Solution: Run `composer dump-autoload`

Issue: Database connection error
Solution: Check .env file database credentials

Issue: 500 Internal Server Error
Solution: 
- Check storage/logs/laravel.log
- Ensure storage and bootstrap/cache directories are writable
- Run: php artisan config:clear
- Run: php artisan cache:clear

Issue: Assets not loading
Solution:
- Run: npm run build
- Check vite.config.js configuration

Issue: API jokes not loading
Solution:
- Check internet connection
- Verify JokeAPI.dev is accessible
- Check storage/logs/laravel.log for API errors

DEVELOPMENT WORKFLOW
--------------------
1. Make changes to backend (PHP/Laravel)
2. Make changes to frontend (React/JSX)
3. Run `npm run dev` for hot reloading
4. Run `php artisan serve` for Laravel server
5. Test functionality

PRODUCTION DEPLOYMENT
---------------------
1. Set APP_ENV=production in .env
2. Set APP_DEBUG=false in .env
3. Run: php artisan config:cache
4. Run: php artisan route:cache
5. Run: php artisan view:cache
6. Run: npm run build
7. Ensure proper file permissions on storage and bootstrap/cache

VERSION CONTROL
--------------
Initialize Git repository:
git init
git add .
git commit -m "Initial commit - Joke Application Backend"

PROJECT STRUCTURE
-----------------
app/
  Http/
    Controllers/
      Auth/          - Authentication controllers
      JokeController.php
      ProfileController.php
    Middleware/
      HandleInertiaRequests.php
  Models/
    Joke.php
    User.php
  Services/
    JokeApiService.php
database/
  migrations/
    create_jokes_table.php
routes/
  web.php           - Main routes
  auth.php          - Authentication routes
resources/
  js/               - React components (frontend)
config/
  app.php
  database.php
  inertia.php

CONTACT & SUPPORT
-----------------
For issues or questions, refer to:
- Laravel Documentation: https://laravel.com/docs
- Inertia.js Documentation: https://inertiajs.com
- React Documentation: https://react.dev

================================================================================
END OF README
================================================================================

