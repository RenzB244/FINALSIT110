# MySQL Database Setup Guide

## ✅ MySQL is Already Configured

The application is **already configured to use MySQL** as the default database. No additional configuration needed!

## Current MySQL Configuration

The `config/database.php` file is set with:
- **Default Connection**: `mysql`
- **Default Host**: `127.0.0.1`
- **Default Port**: `3306`
- **Default Database**: `joke_app`
- **Default Username**: `root`
- **Charset**: `utf8mb4`
- **Collation**: `utf8mb4_unicode_ci`

## Quick Setup Steps

### 1. Install MySQL (if not already installed)

**Windows:**
- Download MySQL Installer from: https://dev.mysql.com/downloads/installer/
- Or use XAMPP/WAMP which includes MySQL

**macOS:**
```bash
brew install mysql
brew services start mysql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

### 2. Create the Database

Open MySQL command line or MySQL Workbench and run:

```sql
CREATE DATABASE joke_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Or using command line:
```bash
mysql -u root -p
CREATE DATABASE joke_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### 3. Configure .env File

Edit your `.env` file and ensure these settings:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=joke_app
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
```

**Note:** If your MySQL root user has no password, leave `DB_PASSWORD=` empty.

### 4. Test Connection

Run this command to test your MySQL connection:

```bash
php artisan migrate:status
```

If you see no errors, your MySQL connection is working!

### 5. Run Migrations

Create all database tables:

```bash
php artisan migrate
```

This will create:
- `users` table
- `jokes` table
- `cache` table
- `sessions` table
- `jobs` table
- `password_reset_tokens` table
- `migrations` table

## Verify MySQL Connection

You can verify the connection is working by checking:

```bash
php artisan tinker
>>> DB::connection()->getPdo();
```

If it returns a PDO object, MySQL is connected successfully!

## Troubleshooting

### Error: "Access denied for user"
- Check your `DB_USERNAME` and `DB_PASSWORD` in `.env`
- Verify MySQL user has proper permissions:
  ```sql
  GRANT ALL PRIVILEGES ON joke_app.* TO 'root'@'localhost';
  FLUSH PRIVILEGES;
  ```

### Error: "Unknown database 'joke_app'"
- Make sure you created the database:
  ```sql
  CREATE DATABASE joke_app;
  ```

### Error: "SQLSTATE[HY000] [2002] Connection refused"
- Check if MySQL service is running:
  - Windows: Check Services panel
  - Linux: `sudo systemctl status mysql`
  - macOS: `brew services list`
- Verify `DB_HOST` is correct (usually `127.0.0.1` or `localhost`)

### Error: "PDOException: could not find driver"
- Install PHP MySQL extension:
  - Windows: Uncomment `extension=pdo_mysql` in `php.ini`
  - Linux: `sudo apt install php-mysql`
  - macOS: Usually included with PHP

## MySQL Requirements

- **Version**: MySQL 8.0 or higher (recommended)
- **Minimum**: MySQL 5.7 (may work but not recommended)
- **Storage Engine**: InnoDB (default)
- **Character Set**: utf8mb4 (for emoji support)

## Database Schema

The application will create these tables:

1. **users** - User accounts
2. **jokes** - User jokes and imported jokes
3. **cache** - Application cache
4. **sessions** - User sessions
5. **jobs** - Queue jobs
6. **failed_jobs** - Failed queue jobs
7. **password_reset_tokens** - Password reset tokens
8. **migrations** - Migration tracking

All tables use `utf8mb4` character set for full Unicode support.

## Need Help?

If you encounter any MySQL-related issues:
1. Check MySQL error logs
2. Verify MySQL service is running
3. Check firewall settings
4. Ensure PHP MySQL extension is installed
5. Review Laravel logs: `storage/logs/laravel.log`

