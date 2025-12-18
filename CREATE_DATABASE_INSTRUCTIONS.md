# How to Create the Database

Since you have XAMPP running, here are **3 easy ways** to create the database:

## Method 1: Using phpMyAdmin (EASIEST) ⭐

1. Open your web browser
2. Go to: **http://localhost/phpmyadmin**
3. Click **"New"** in the left sidebar
4. Enter database name: **`joke_app`**
5. Select collation: **`utf8mb4_unicode_ci`**
6. Click **"Create"** button

✅ Done! Database is created.

---

## Method 2: Run the Batch File

1. Double-click **`create_database.bat`** in this folder
2. It will automatically create the database

---

## Method 3: Command Line

1. Open Command Prompt or PowerShell
2. Navigate to your XAMPP mysql\bin folder:
   ```cmd
   cd C:\xampp\mysql\bin
   ```
3. Run this command:
   ```cmd
   mysql.exe -u root -e "CREATE DATABASE IF NOT EXISTS joke_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
   ```

If you have a MySQL password, use:
```cmd
mysql.exe -u root -p -e "CREATE DATABASE IF NOT EXISTS joke_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

---

## After Creating the Database

1. Make sure your `.env` file has:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=joke_app
   DB_USERNAME=root
   DB_PASSWORD=
   ```

2. Run migrations:
   ```bash
   php artisan migrate
   ```

This will create all the necessary tables!

---

## Verify Database Created

You can verify the database was created by:
- Opening phpMyAdmin and checking if `joke_app` appears in the left sidebar
- Or running: `php artisan migrate:status`

