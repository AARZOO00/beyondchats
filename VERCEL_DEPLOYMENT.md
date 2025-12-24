# Vercel Deployment Guide

## Overview
This project has three components:
- **Frontend (React)**: Deploy to Vercel ✓
- **Backend (Laravel)**: Requires separate hosting (Railway, Heroku, DigitalOcean, etc.)
- **Node.js Engine**: Can be integrated as Vercel Functions or deployed separately

## Step 1: Deploy React Frontend to Vercel

### Option A: Using Vercel CLI

```bash
# Install Vercel CLI if not already installed
npm install -g vercel

# Navigate to react-ui directory
cd react-ui

# Deploy to Vercel
vercel
```

### Option B: Using GitHub Integration

1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Select `react-ui` as the root directory
5. Add environment variables:
   - `VITE_API_BASE_URL`: Your deployed Laravel API URL (e.g., `https://your-api.example.com/api`)
6. Click Deploy

## Step 2: Deploy Laravel API

Since Laravel requires PHP, you cannot deploy directly to Vercel. Use one of these alternatives:

### Option A: Railway.app (Recommended)
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Initialize project in laravel-api directory
cd laravel-api
railway init

# Deploy
railway up
```

### Option B: Heroku (With buildpack)
```bash
# Install Heroku CLI
# Then in laravel-api directory:
heroku create your-app-name
git push heroku main
heroku run php artisan migrate --seed
```

### Option C: DigitalOcean App Platform
1. Create a DigitalOcean account
2. Go to App Platform
3. Connect your GitHub repo
4. Select `laravel-api` as the root path
5. Set environment variables
6. Deploy

## Step 3: Update Frontend API URL

Once your Laravel API is deployed, update the environment variable in Vercel:

1. Go to your Vercel project dashboard
2. Settings > Environment Variables
3. Add/Update `VITE_API_BASE_URL` with your deployed Laravel URL
4. Vercel will automatically redeploy with the new variable

Example: `VITE_API_BASE_URL=https://your-api.railway.app/api`

## Step 4: Test Integration

After deployment, verify:
1. Frontend loads at `https://your-app.vercel.app`
2. Articles load from the backend API
3. No CORS errors in the browser console

## Node.js Engine Integration

The Node.js engine can be run as:
1. **Vercel Serverless Function** (requires refactoring into API routes)
2. **Separate Cron Job** on a service like EasyCron or AWS Lambda
3. **Background Job** on the Laravel side using queues

For now, focus on getting the React + Laravel deployed.

## Environment Variables Reference

### Vercel (React Frontend)
```
VITE_API_BASE_URL=https://your-laravel-api.example.com/api
```

### Railway/Heroku (Laravel Backend)
```
APP_URL=https://your-app.railway.app
DB_DATABASE=your-sqlite-database.sqlite
OPENROUTER_API_KEY=your_api_key
```

## Troubleshooting

### CORS Errors
Add these headers in your Laravel `.env`:
```
CORS_ALLOWED_ORIGINS=https://your-app.vercel.app
```

Update `config/cors.php` if needed.

### Articles Not Loading
1. Check that the Laravel API is running and accessible
2. Verify the `VITE_API_BASE_URL` is correct
3. Check browser DevTools > Network tab for actual requests

### Database Errors on Deploy
Make sure to run:
```bash
php artisan migrate --seed
```

On your hosting platform after initial deployment.

## Deployment Checklist

- [ ] React frontend deployed to Vercel
- [ ] Laravel API deployed to Railway/Heroku/DigitalOcean
- [ ] Environment variables configured in Vercel
- [ ] CORS enabled in Laravel
- [ ] Database migrations run on production
- [ ] Test articles visible in deployed frontend
- [ ] No console errors in browser

## Contact & Support

For issues with:
- **Vercel**: https://vercel.com/docs
- **Railway**: https://docs.railway.app
- **Laravel**: https://laravel.com/docs
