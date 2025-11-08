# 🚀 MeasureMint Production Deployment Guide

This guide will walk you through deploying MeasureMint to Vercel for production use.

## 📋 Prerequisites

- Vercel account (free tier works)
- GitHub repository connected to Vercel
- Miro app credentials (Client ID and Secret)

## 🎯 Step-by-Step Deployment

### Step 1: Install Vercel CLI (Optional)

```bash
npm i -g vercel
```

### Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository: `Khaledykhalil/MeasureMint`
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Click **"Deploy"**

#### Option B: Deploy via CLI

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow the prompts:
# - Set up and deploy? Yes
# - Link to existing project? No (first time)
# - Project name: measuremint
# - Directory: ./
```

### Step 3: Configure Environment Variables

In Vercel Dashboard:

1. Go to your project → **Settings** → **Environment Variables**
2. Add the following variables:

```
MIRO_CLIENT_ID=3458764645376747153
MIRO_CLIENT_SECRET=<your-secret-from-.env>
MIRO_REDIRECT_URL=https://your-domain.vercel.app/api/redirect
```

**Important**: 
- Use your actual Vercel domain (e.g., `measuremint.vercel.app`)
- Copy the exact Client Secret from your `.env` file
- Save variables for **Production** environment

### Step 4: Get Your Production URL

After deployment, Vercel will provide a URL like:
- `https://measuremint.vercel.app` (or your custom domain)

Your app URLs will be:
- **App URL**: `https://measuremint.vercel.app/panel`
- **Redirect URI**: `https://measuremint.vercel.app/api/redirect`
- **Privacy Policy**: `https://measuremint.vercel.app/privacy`
- **Terms of Service**: `https://measuremint.vercel.app/terms`

### Step 5: Update Miro App Settings

1. Go to [Miro Developer Portal](https://miro.com/app/settings/user-profile/apps)
2. Select your MeasureMint app
3. Update the following:

**App URL**:
```
https://measuremint.vercel.app/panel
```

**Redirect URI for OAuth2.0**:
```
https://measuremint.vercel.app/api/redirect
```

4. Click **"Save"** or **"Update"**

### Step 6: Update app-manifest.yaml

Update your local `app-manifest.yaml` for future development:

```yaml
appName: MeasureMint
sdkVersion: SDK_V2
sdkUri: https://measuremint.vercel.app/panel
redirectUris:
  - https://measuremint.vercel.app/api/redirect
scopes:
  - boards:read
  - boards:write
```

Commit and push this change:

```bash
git add app-manifest.yaml
git commit -m "Update app-manifest.yaml with production URLs"
git push origin main
```

### Step 7: Redeploy (to apply manifest changes)

Vercel will automatically redeploy when you push to main. If not:

```bash
# Via CLI
vercel --prod

# Or trigger redeploy in Vercel Dashboard
# Go to Deployments → Click "Redeploy" on latest
```

### Step 8: Test Production Deployment

1. **Install the app in Miro**:
   - Go to a Miro board
   - Click Apps panel (puzzle icon)
   - Search for your app or install via direct link
   - Click "Install" and authorize

2. **Test OAuth flow**:
   - Should redirect to production URL
   - Should successfully authenticate
   - Should return to Miro board

3. **Test core features**:
   - Open the app panel
   - Set calibration (both axes)
   - Create measurements
   - Verify calculations are correct
   - Check unit conversions

4. **Test public pages**:
   - Visit: `https://measuremint.vercel.app/privacy`
   - Visit: `https://measuremint.vercel.app/terms`
   - Both should load properly

## 🔧 Troubleshooting

### Environment Variables Not Loading

**Symptom**: OAuth fails, app can't connect to Miro

**Solution**:
1. Check environment variables in Vercel Dashboard
2. Ensure they're set for "Production" environment
3. Redeploy after adding/updating variables

### Redirect URI Mismatch

**Symptom**: OAuth error "redirect_uri_mismatch"

**Solution**:
1. Check exact URL in Miro developer portal
2. Must match exactly: `https://measuremint.vercel.app/api/redirect`
3. No trailing slashes
4. HTTPS required (Vercel provides this automatically)

### App Not Loading in Miro

**Symptom**: Blank panel or error in Miro

**Solution**:
1. Check browser console for errors
2. Verify App URL in Miro settings
3. Check Vercel deployment logs: `vercel logs`
4. Ensure build completed successfully

### 404 on Privacy/Terms Pages

**Symptom**: `/privacy` or `/terms` returns 404

**Solution**:
1. Ensure files exist: `privacy-policy.html`, `terms-of-service.html`
2. Check `src/app/privacy/page.jsx` and `src/app/terms/page.jsx` exist
3. Redeploy the application

## 📊 Monitoring Your App

### Vercel Analytics

Free on Vercel:
- Page views
- User metrics
- Performance data

Access: Vercel Dashboard → Your Project → Analytics

### Miro App Analytics

Check in Miro Developer Portal:
- Installation count
- Active users
- Error rates

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to `main`:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Vercel automatically deploys!
```

View deployment status:
- Vercel Dashboard → Deployments
- GitHub integration shows deployment status in PRs

## 🌐 Custom Domain (Optional)

To use your own domain (e.g., `measuremint.app`):

1. **In Vercel Dashboard**:
   - Go to Project Settings → Domains
   - Add your domain: `measuremint.app`

2. **In your DNS provider**:
   - Add CNAME record: `measuremint.app` → `cname.vercel-dns.com`
   - Or A record pointing to Vercel's IPs

3. **Update Miro settings**:
   - Change App URL to: `https://measuremint.app/panel`
   - Change Redirect URI to: `https://measuremint.app/api/redirect`

4. **Update environment variable**:
   - `MIRO_REDIRECT_URL=https://measuremint.app/api/redirect`

5. **Redeploy**

## ✅ Deployment Checklist

Before marking deployment complete:

- [ ] App deployed to Vercel
- [ ] Environment variables configured
- [ ] Production URL obtained
- [ ] Miro app settings updated (App URL + Redirect URI)
- [ ] app-manifest.yaml updated
- [ ] OAuth flow tested
- [ ] Core features tested in production
- [ ] Privacy policy accessible (`/privacy`)
- [ ] Terms of service accessible (`/terms`)
- [ ] No console errors in production
- [ ] Build successful in Vercel

## 🆘 Getting Help

**Vercel Support**:
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support

**Miro Developer Support**:
- Docs: https://developers.miro.com/
- Community: https://community.miro.com/developer-platform-and-apis-57
- Discord: https://bit.ly/miro-developers

## 🎉 Next Steps After Deployment

1. ✅ Complete deployment (you are here)
2. 📸 Create marketplace screenshots
3. 📝 Update marketplace listing
4. 🚀 Submit to Miro Marketplace
5. 📢 Announce to users!

---

**Deployment Date**: {{ DATE }}
**Production URL**: {{ URL }}
**Status**: ✅ Production Ready
