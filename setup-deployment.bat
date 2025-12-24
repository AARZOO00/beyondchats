@echo off
REM Quick Deployment Setup Script for Windows
REM Run this script to prepare for Vercel deployment

echo.
echo ==========================================
echo  Article Rewriter - Deployment Setup
echo ==========================================
echo.

REM Check prerequisites
echo Checking prerequisites...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js not installed. Please install from https://nodejs.org/
    exit /b 1
)
echo ✓ Node.js found

where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Git not installed. Please install from https://git-scm.com/
    exit /b 1
)
echo ✓ Git found

where php >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: PHP not found. Backend setup may fail.
) else (
    echo ✓ PHP found
)

where composer >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Composer not found. Laravel setup may fail.
) else (
    echo ✓ Composer found
)

echo.
echo ==========================================
echo  Installing Dependencies
echo ==========================================
echo.

REM Install React dependencies
echo Installing React dependencies...
cd react-ui
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: React setup failed
    exit /b 1
)
echo ✓ React dependencies installed
cd ..

REM Install Laravel dependencies
echo.
echo Installing Laravel dependencies...
cd laravel-api
if exist vendor (
    echo ✓ Laravel dependencies already installed
) else (
    call composer install
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Laravel setup failed
        exit /b 1
    )
    echo ✓ Laravel dependencies installed
)

REM Setup database
if not exist database\database.sqlite (
    echo Creating SQLite database...
    type nul > database\database.sqlite
    echo ✓ Database created
)

REM Run migrations
echo Running migrations...
call php artisan migrate --seed --force
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Migration failed
    exit /b 1
)
echo ✓ Migrations completed
cd ..

REM Install Node.js engine dependencies
echo.
echo Installing Node.js engine dependencies...
cd beyondchats-nodejs-engine
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Node.js engine setup may have issues
) else (
    echo ✓ Node.js engine dependencies installed
)
cd ..

echo.
echo ==========================================
echo  Setup Complete! ✓
echo ==========================================
echo.
echo Next steps:
echo.
echo 1. Create GitHub repository:
echo    git remote add origin https://github.com/yourusername/repo.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 2. Deploy to Vercel:
echo    npm install -g vercel
echo    vercel login
echo    vercel --prod
echo.
echo 3. Deploy Laravel backend:
echo    - Railway: npm install -g @railway/cli
echo              railway login
echo              cd laravel-api
echo              railway init
echo              railway up
echo    - Heroku: heroku login
echo             heroku create your-app-name
echo             git push heroku main
echo.
echo 4. Update environment variables:
echo    - Vercel: Add VITE_API_BASE_URL with your backend URL
echo.
echo For detailed instructions, see:
echo - VERCEL_DEPLOYMENT_COMPLETE.md
echo - DEPLOYMENT_COMMANDS.md
echo.
pause
