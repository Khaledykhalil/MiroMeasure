# 🚀 Quick Deployment Instructions

Follow these steps to deploy MeasureMint to production:

## Option 1: Vercel Dashboard (Easiest) ⭐

1. **Go to Vercel**: https://vercel.com/signup
2. **Sign up/Login** with GitHub
3. **Import Repository**:
   - Click "Add New Project"
   - Select `Khaledykhalil/MeasureMint`
   - Click "Import"
4. **Configure**:
   - Framework: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
5. **Add Environment Variables**:
   ```
   MIRO_CLIENT_ID=3458764645376747153
   MIRO_CLIENT_SECRET=<copy from your .env file>
   MIRO_REDIRECT_URL=https://your-app.vercel.app/api/redirect
   ```
   Note: You'll update MIRO_REDIRECT_URL after deployment
6. **Click "Deploy"** 🚀

## Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Follow prompts and add environment variables when asked
```

## After Deployment

### 1. Get Your Production URL
Vercel will give you a URL like: `https://measuremint-xyz.vercel.app`

### 2. Update Environment Variables
Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Update `MIRO_REDIRECT_URL` to:
```
https://your-actual-domain.vercel.app/api/redirect
```

Click "Redeploy" after updating.

### 3. Update Miro App Settings

Go to: https://miro.com/app/settings/user-profile/apps

Update your MeasureMint app:

**App URL**:
```
https://your-domain.vercel.app/panel
```

**Redirect URI**:
```
https://your-domain.vercel.app/api/redirect
```

### 4. Test Everything

- ✅ Visit: `https://your-domain.vercel.app/privacy` (should load)
- ✅ Visit: `https://your-domain.vercel.app/terms` (should load)
- ✅ Install app in Miro and test OAuth
- ✅ Test calibration and measurement features

## 🎉 You're Done!

Your production URLs:
- App: `https://your-domain.vercel.app/panel`
- Privacy: `https://your-domain.vercel.app/privacy`
- Terms: `https://your-domain.vercel.app/terms`

Use these URLs in your Miro Marketplace submission! 🚀
