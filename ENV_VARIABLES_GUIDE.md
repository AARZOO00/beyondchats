# Example Environment Variables

## Vercel Frontend Configuration

Create these as Environment Variables in Vercel Dashboard:
**Settings > Environment Variables**

```env
# Production Environment
VITE_API_BASE_URL=https://your-api-domain.com/api

# Preview Deployments (Optional)
VITE_API_BASE_URL=https://staging-api.your-domain.com/api

# Development (use .env.local locally)
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

## Railway Backend Configuration

Environment variables are set in Railway dashboard:
**Project > Variables**

```env
APP_NAME=Laravel
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-app.railway.app

# Database
DB_CONNECTION=sqlite
DB_DATABASE=/var/data/database.sqlite

# Key (use the one from your .env file)
APP_KEY=base64:HrqZdQ7i0436V+pABxcJBnncC3AiLcumqcLGkowLnJk=

# Cache & Session
CACHE_STORE=database
SESSION_DRIVER=database
QUEUE_CONNECTION=database

# Logging
LOG_CHANNEL=stack
LOG_LEVEL=debug

# Mail (optional)
MAIL_MAILER=log

# OpenRouter API (if using Node.js engine)
OPENROUTER_API_KEY=your_openrouter_api_key_here

# CORS
CORS_ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
```

## Heroku Backend Configuration

Set using Heroku CLI:
```bash
heroku config:set APP_ENV=production
heroku config:set APP_DEBUG=false
heroku config:set APP_KEY="base64:HrqZdQ7i0436V+pABxcJBnncC3AiLcumqcLGkowLnJk="
heroku config:set CORS_ALLOWED_ORIGINS="https://your-app.vercel.app"
```

## Local Development (.env.local)

Create this file in `react-ui/` for local development:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
VITE_DEBUG=true
```

## Node.js Engine Configuration

If deploying Node.js engine separately, set these variables:

```env
LARAVEL_API_BASE=https://your-api.railway.app/api
OPENROUTER_API_KEY=sk-or-xxxxxxxxxxxxx
```

## How to Set Each Variable

### Vercel
1. Go to vercel.com/dashboard
2. Select your project
3. Click Settings
4. Select Environment Variables
5. Add Name and Value
6. Select environments (Production, Preview, Development)
7. Click Save
8. Vercel automatically redeploys

### Railway
1. Go to railway.app/dashboard
2. Select your project
3. Select Variables tab
4. Add or edit variables
5. No redeploy needed (auto-restart on changes)

### Heroku
```bash
heroku login
heroku config:set KEY=value --app your-app-name
heroku config --app your-app-name  # View all variables
```

## Important Notes

⚠️ **Never commit .env files to Git** - they contain sensitive information

✓ **Always use environment variables** for:
- API keys
- Database credentials  
- Secret keys
- URLs that differ per environment

✓ **Use versioned files** for defaults:
- `.env.example` - template with no secrets
- `.env.local` - local overrides (gitignored)

## Verification Checklist

- [ ] All environment variables set in Vercel
- [ ] Backend URL accessible from Vercel app
- [ ] CORS configured correctly
- [ ] Database migrations ran on production
- [ ] Logs show no errors
- [ ] Frontend loads articles successfully

## Common Issues

**Issue**: "Failed to fetch articles"
**Check**: 
```bash
# Verify backend is accessible
curl https://your-api.railway.app/api/articles

# Check Vercel env var is set correctly
# Check browser console for exact error message
```

**Issue**: CORS error
**Check**:
- `CORS_ALLOWED_ORIGINS` includes your Vercel URL
- Laravel `config/cors.php` is configured
- No typos in environment variables

**Issue**: "APP_KEY is missing"
**Check**:
```bash
# View your local APP_KEY
grep APP_KEY laravel-api/.env

# Set in Heroku/Railway with exact value
heroku config:set APP_KEY="base64:..."
```

## Environment Variable Template

Copy this and fill in your values:

```env
# =============== VERCEL (Frontend) ===============
VITE_API_BASE_URL=https://[YOUR-BACKEND-URL]/api

# =============== RAILWAY/HEROKU (Backend) ===============
APP_NAME=ArticleRewriter
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:HrqZdQ7i0436V+pABxcJBnncC3AiLcumqcLGkowLnJk=
APP_URL=https://[YOUR-API-URL]
DB_CONNECTION=sqlite
CORS_ALLOWED_ORIGINS=https://[YOUR-VERCEL-URL].vercel.app
OPENROUTER_API_KEY=[YOUR-API-KEY-IF-USING-ENGINE]
```

---

For detailed deployment steps, see: **VERCEL_DEPLOYMENT_COMPLETE.md**
