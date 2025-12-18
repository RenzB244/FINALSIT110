@echo off
echo Creating database 'joke_app'...
echo.

REM Try to find XAMPP MySQL in common locations
if exist "C:\xampp\mysql\bin\mysql.exe" (
    C:\xampp\mysql\bin\mysql.exe -u root -e "CREATE DATABASE IF NOT EXISTS joke_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
    if %errorlevel% equ 0 (
        echo.
        echo Database created successfully!
        echo.
    ) else (
        echo.
        echo Failed to create database. Trying without password...
        C:\xampp\mysql\bin\mysql.exe -u root -e "CREATE DATABASE IF NOT EXISTS joke_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>nul
    )
) else if exist "D:\xampp\mysql\bin\mysql.exe" (
    D:\xampp\mysql\bin\mysql.exe -u root -e "CREATE DATABASE IF NOT EXISTS joke_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
) else (
    echo.
    echo XAMPP MySQL not found in default locations.
    echo.
    echo Please create the database manually using one of these methods:
    echo.
    echo METHOD 1 - phpMyAdmin (Easiest):
    echo 1. Open http://localhost/phpmyadmin in your browser
    echo 2. Click "New" in the left sidebar
    echo 3. Database name: joke_app
    echo 4. Collation: utf8mb4_unicode_ci
    echo 5. Click "Create"
    echo.
    echo METHOD 2 - Command Line:
    echo Navigate to your XAMPP mysql\bin folder and run:
    echo mysql.exe -u root -e "CREATE DATABASE joke_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
    echo.
    pause
    exit /b 1
)

echo.
echo You can now run: php artisan migrate
echo.
pause

