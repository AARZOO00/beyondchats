# ⚡ QUICK REFERENCE - Deploy in 15 Minutes

## 3-Step Deployment Process

### STEP 1: Push Code to GitHub (2 min)
```bash
git add .
git commit -m "Deploy: ready for production"
git push origin main
```

### STEP 2: Deploy Frontend to Vercel (5 min)
```
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repo
4. Set Root Directory: react-ui
5. Add Env Var: VITE_API_BASE_URL = (leave blank for now)
6. Click "Deploy"
✓ Done! You'll get a URL like: https://myapp.vercel.app
```

### STEP 3: Deploy Backend to Railway (5 min)
```
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Select your repository
5. Set root directory: laravel-api
6. Wait for deployment to complete
✓ Done! You'll get a URL like: https://myapp.railway.app
```

### STEP 4: Connect Them (2 min)
```
1. Copy your Railway URL: https://myapp.railway.app
2. Go to Vercel > Settings > Environment Variables
3. Set: VITE_API_BASE_URL = https://myapp.railway.app/api
4. Vercel auto-redeploys
✓ Your app is now live!
```

## Test It Works

```bash
# Test backend API
curl https://myapp.railway.app/api/articles

# Open frontend in browser
https://myapp.vercel.app
```

## Environment Variables Quick Reference

| Service | Variable | Value |
|---------|----------|-------|
| **Vercel** | `VITE_API_BASE_URL` | `https://myapp.railway.app/api` |
| **Railway** | `APP_KEY` | `base64:HrqZdQ7i0436V+pABxcJBnncC3AiLcumqcLGkowLnJk=` |
| **Railway** | `APP_ENV` | `production` |
| **Railway** | `APP_DEBUG` | `false` |

## Troubleshooting

| Error | Fix |
|-------|-----|
| "Articles won't load" | Check `VITE_API_BASE_URL` is correct in Vercel |
| "Can't connect to backend" | Verify Railway app is running: `railway logs -f` |
| "CORS error" | Backend URL in `VITE_API_BASE_URL` must be accessible |
| "Build failed" | Run `npm run build` locally to see errors |

## Monitor Deployment

```bash
# Watch backend logs in real-time
railway logs -f

# View Vercel deployment status
# Go to: vercel.com/dashboard > select project > Deployments
```

## File References

📄 **For detailed guides:**
- `VERCEL_DEPLOYMENT_COMPLETE.md` - Full step-by-step guide
- `DEPLOYMENT_COMMANDS.md` - All commands reference
- `ENV_VARIABLES_GUIDE.md` - Environment variables help

## Pre-Deployment Checklist

- [ ] Git repo created and code pushed
- [ ] `npm run build` succeeds locally
- [ ] Laravel migrations tested locally
- [ ] GitHub account ready
- [ ] Vercel account created (free tier)
- [ ] Railway account created (free tier)

---

**Status**: ✅ **READY TO DEPLOY**  
**Estimated Time**: 15 minutes  
**Cost**: FREE (Vercel hobby + Railway $5 credit)

**Questions?** Read the full guides in project root.
