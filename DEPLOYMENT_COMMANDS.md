# Quick Deployment Commands

## Local Development

### Start Everything Locally

```bash
# Terminal 1: Laravel API
cd laravel-api
php artisan serve
# Runs on http://127.0.0.1:8000

# Terminal 2: React Frontend
cd react-ui
npm install
npm run dev
# Runs on http://127.0.0.1:5173 (or next available port)

# Terminal 3 (Optional): Node.js Engine
cd beyondchats-nodejs-engine
npm install
node index.js
```

### Local Database Setup

```bash
cd laravel-api

# Create SQLite database
touch database/database.sqlite

# Run migrations and seed
php artisan migrate --seed
```

## Vercel Deployment

### Prerequisites
- GitHub account (with code pushed)
- Vercel account (free tier available)
- Node.js installed locally

### Deploy Frontend to Vercel

```bash
# Option 1: Using Vercel CLI
npm install -g vercel
cd react-ui
vercel

# Option 2: Via GitHub
# 1. Push to GitHub
# 2. Go to vercel.com/new
# 3. Import your repo
# 4. Set root directory to: react-ui
# 5. Add environment variable: VITE_API_BASE_URL
# 6. Click Deploy
```

### Deploy Backend

**Note**: Vercel doesn't support PHP. Use one of these:

#### Railway.app (Easiest)
```bash
npm i -g @railway/cli
railway login
cd laravel-api
railway init
railway up
# Note: Get your deployed URL from Railway dashboard
```

#### Heroku
```bash
curl https://cli-assets.heroku.com/install-ubuntu.sh | sh
cd laravel-api
heroku login
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set APP_KEY="base64:HrqZdQ7i0436V+pABxcJBnncC3AiLcumqcLGkowLnJk="
git push heroku main
heroku run php artisan migrate --seed
```

### Configure Environment Variables in Vercel

1. Go to Vercel Dashboard > Your Project > Settings > Environment Variables
2. Add variable:
   ```
   VITE_API_BASE_URL = https://your-laravel-backend-url/api
   ```
   Example: `VITE_API_BASE_URL=https://my-api.railway.app/api`

3. Vercel will automatically redeploy

## Testing Deployment

```bash
# Test API endpoint
curl https://your-api.railway.app/api/articles

# Check frontend logs
# Visit https://your-app.vercel.app
# Open DevTools (F12) > Console tab
```

## Rollback/Updates

### Update Frontend
```bash
# Make changes locally
git add .
git commit -m "Update description"
git push origin main
# Vercel auto-deploys on push
```

### Update Backend
```bash
# For Railway
railway up

# For Heroku  
git push heroku main
```

## Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Railway Dashboard: https://railway.app/dashboard
- Heroku Dashboard: https://dashboard.heroku.com
- Article API Docs: http://localhost:8000/api/articles (when running locally)
