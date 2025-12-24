# 🚀 Full Stack Deployment Guide

## Project Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)                      │
│                   Deploy to Vercel or Similar                   │
│                  https://yourapp.vercel.app                     │
└────────────────────────────┬────────────────────────────────────┘
                             │ API Calls
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              Backend (Laravel + SQLite)                          │
│         Deploy to Railway / Heroku / DigitalOcean               │
│             https://api.yourdomain.com/api                      │
└─────────────────────────────────────────────────────────────────┘
```

## 🎯 Deployment Steps

### Step 1: Prepare Your Code

```bash
# Ensure all code is committed to Git
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Deploy Frontend to Vercel (5 minutes)

#### Method A: GitHub Integration (Recommended)
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repo
4. Configure:
   - **Root Directory**: `react-ui`
   - **Framework Preset**: Vite
5. Add Environment Variables:
   ```
   VITE_API_BASE_URL = https://your-laravel-backend-url/api
   ```
6. Click "Deploy"

#### Method B: Vercel CLI
```bash
npm install -g vercel
cd react-ui
vercel login
vercel
# Follow prompts
```

**Result**: Your app will be live at `https://[your-project].vercel.app`

### Step 3: Deploy Backend to Railway (10 minutes)

Railway is the easiest solution for deploying Laravel without DevOps knowledge.

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Navigate to Laravel directory
cd laravel-api

# Initialize Railway project
railway init
# Select "Deploy from Git"
# Choose your GitHub repo
# Select main branch

# Configure environment variables in Railway dashboard:
# - APP_KEY: base64:HrqZdQ7i0436V+pABxcJBnncC3AiLcumqcLGkowLnJk=
# - DB_DATABASE: (Railway will auto-create SQLite)
# - OPENROUTER_API_KEY: (if using Node.js engine)

# View your app
railway open
```

**Alternative: Heroku**
```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Create app
heroku create your-app-name

# Set buildpack for Laravel
heroku buildpacks:set heroku/php

# Configure environment
heroku config:set APP_KEY="base64:HrqZdQ7i0436V+pABxcJBnncC3AiLcumqcLGkowLnJk="

# Deploy
git push heroku main

# Run migrations
heroku run php artisan migrate --seed
```

### Step 4: Connect Frontend to Backend

1. Get your deployed Laravel URL from Railway/Heroku
   - **Railway**: `railway domains` command or dashboard
   - **Heroku**: `heroku apps:info [app-name]`

2. Update Vercel environment variable:
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Update `VITE_API_BASE_URL` to your backend URL
   - Example: `https://my-laravel-api.railway.app/api`
   - Vercel automatically redeploys

3. Test the integration:
   ```bash
   # Test API directly
   curl https://your-api-url/api/articles
   
   # Check frontend at https://your-app.vercel.app
   # Open DevTools (F12) and check Network tab
   ```

## 📊 Post-Deployment Checklist

- [ ] Frontend loads without errors (`https://yourapp.vercel.app`)
- [ ] Articles display in the list
- [ ] Can click on articles to view details
- [ ] No CORS errors in console
- [ ] API response time < 500ms
- [ ] Images load correctly (if any)

## 🔧 Troubleshooting

### Issue: "Failed to fetch articles"

**Solution**: Check browser console for actual error
- CORS error? → Update Laravel CORS config
- Network error? → Verify `VITE_API_BASE_URL` in Vercel env vars
- 404 error? → Check Laravel API is running at that URL

```bash
# Test API manually
curl https://your-api.railway.app/api/articles
```

### Issue: "API endpoint not found"

Check that migrations ran:
```bash
# For Railway
railway run php artisan migrate --seed

# For Heroku
heroku run php artisan migrate --seed
```

### Issue: Slow API responses

1. Check server logs:
   ```bash
   railway logs  # Railway
   heroku logs --tail  # Heroku
   ```

2. Optimize database queries in Laravel

3. Add caching layer (Redis)

## 📈 Monitoring & Maintenance

### View Logs

**Railway**:
```bash
railway logs -f  # Follow logs in real-time
```

**Heroku**:
```bash
heroku logs --tail
```

### Update Code

```bash
# Make changes locally
git add .
git commit -m "Your message"
git push origin main
# Both Vercel and Railway auto-deploy on push
```

### Database Backup

**Railway**: Automatic daily backups included
**Heroku**: Use Heroku PostgreSQL for managed backups

## 🔐 Security Checklist

- [ ] Set `APP_DEBUG=false` in production
- [ ] Use strong `APP_KEY`
- [ ] Enable HTTPS (automatic on both platforms)
- [ ] Configure CORS properly
- [ ] Set appropriate database access controls
- [ ] Hide sensitive keys in environment variables
- [ ] Regular dependency updates: `composer update`

## 💰 Cost Estimates

| Service | Free Tier | Cost |
|---------|-----------|------|
| Vercel | 100GB bandwidth/month | ~$20-80/month |
| Railway | $5/month credit | Pay-as-you-go |
| Heroku | ❌ Discontinued | ~$50+/month |

**Total**: Start at ~$5-10/month on Railway + Vercel (hobby plan)

## 🚀 Performance Optimization

### Frontend (Vercel)
- Code splitting: ✓ Automatic with Vite
- Image optimization: Add Next.js Image component
- Caching: Browser & CDN caching automatic

### Backend (Laravel)
```bash
# Cache configuration
php artisan config:cache

# Optimize autoloader
composer install --optimize-autoloader

# Cache routes
php artisan route:cache
```

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Laravel Docs**: https://laravel.com/docs
- **CORS Issues**: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

## Next Steps

1. ✅ Deploy frontend to Vercel
2. ✅ Deploy backend to Railway
3. ✅ Connect them together
4. ⏭️  Add authentication (Laravel Sanctum)
5. ⏭️  Set up CI/CD pipeline (GitHub Actions)
6. ⏭️  Add monitoring (Sentry, DataDog)
7. ⏭️  Set up custom domain

---

**Need help?** Check the logs:
- Frontend: Vercel Dashboard → Deployments → View logs
- Backend: `railway logs` or Heroku dashboard
- Both: Browser console (F12) for client-side errors
