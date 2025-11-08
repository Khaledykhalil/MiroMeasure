# 🚀 MeasureMint Deployment Guide

**Complete guide for deploying MeasureMint to production**

---

## 📋 Table of Contents

1. [Quick Deploy (Vercel)](#quick-deploy-vercel)
2. [Environment Variables](#environment-variables)
3. [Miro Configuration](#miro-configuration)
4. [Custom Domain Setup](#custom-domain-setup)
5. [Post-Deployment Testing](#post-deployment-testing)
6. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Deploy (Vercel)

### Option 1: Vercel Dashboard (Recommended) ⭐

1. **Sign Up/Login to Vercel**
   - Visit: https://vercel.com/signup
   - Sign in with GitHub

2. **Import Your Repository**
   - Click "Add New Project"
   - Select `Khaledykhalil/MeasureMint`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./`
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)

4. **Add Environment Variables**
   ```env
   MIRO_CLIENT_ID=your_client_id_here
   MIRO_CLIENT_SECRET=your_client_secret_here
   MIRO_REDIRECT_URL=https://your-app.vercel.app/api/redirect
   NODE_ENV=production
   ENCRYPTION_KEY=your_32_character_key_here
   RESEND_API_KEY=your_resend_key_here
   ```
   
   ⚠️ **Note:** You'll need to update `MIRO_REDIRECT_URL` after first deployment

5. **Deploy** 🚀
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete

### Option 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to your Vercel account
vercel login

# Deploy to production
vercel --prod

# Follow interactive prompts to configure
```

---

## 🔐 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MIRO_CLIENT_ID` | From Miro Developer Console | `3458764645376747153` |
| `MIRO_CLIENT_SECRET` | From Miro Developer Console | `NX3FsUJm...` |
| `MIRO_REDIRECT_URL` | OAuth redirect endpoint | `https://measuremint.app/api/redirect` |
| `NODE_ENV` | Environment mode | `production` |
| `ENCRYPTION_KEY` | 32-character encryption key | Generate securely |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `RESEND_API_KEY` | For support form emails | N/A |

### Generating Encryption Key

```bash
# Generate a secure 32-character key
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

### Setting Variables in Vercel

1. Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**
2. Add each variable with:
   - **Key:** Variable name
   - **Value:** Variable value
   - **Environments:** Check Production, Preview, Development
3. Click "Save"
4. **Redeploy** after adding variables

---

## 🎨 Miro Configuration

### Update App Manifest

Your `app-manifest.yaml` should have:

```yaml
appName: MeasureMint
sdkVersion: SDK_V2
sdkUri: https://measuremint.app/panel
boardPicker:
  allowedDomains: []
redirectUris:
  - https://measuremint.app/api/redirect
redirectUriForSdk: ''
scopes:
  - boards:read
  - boards:write
```

### Configure Miro Developer Console

1. **Go to Miro Apps**: https://miro.com/app/settings/user-profile/apps/
2. **Select your MeasureMint app** (or create new)
3. **Update Settings**:

   **App Information:**
   - **App name:** MeasureMint
   - **App description:** Professional measurement and calibration tool for architects, engineers, designers, and construction professionals.
   - **Developer name:** Your Name
   - **Developer website:** https://measuremint.app
   - **Support email:** support@measuremint.app

   **App URLs:**
   - **App URL:** `https://measuremint.app`
   - **Redirect URI for OAuth2.0:** `https://measuremint.app/api/redirect`
   - **SDK URI:** `https://measuremint.app/panel`

   **Permissions:**
   - ✅ `boards:read` - Read board content
   - ✅ `boards:write` - Modify board content

4. **Save Changes**

### Install App to Board

1. Open a Miro board
2. Click **Apps** panel (left sidebar)
3. Search for **"MeasureMint"**
4. Click **Install** or **Add to board**
5. Authorize the app

---

## 🌐 Custom Domain Setup

### Add Custom Domain to Vercel

1. **Go to**: Vercel Dashboard → Your Project → Settings → Domains
2. **Add Domain**: `measuremint.app`
3. **Configure DNS** (at your domain registrar):

   **For Vercel DNS:**
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```

   **Or A Record:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

4. **Wait for SSL** (automatic, 1-5 minutes)
5. **Update Environment Variables** with new domain:
   - Change `MIRO_REDIRECT_URL` to: `https://measuremint.app/api/redirect`
6. **Redeploy** the application

### Update Miro Settings with Custom Domain

After domain is active:
1. Go to Miro Developer Console
2. Update all URLs to use `https://measuremint.app`
3. Save changes

---

## ✅ Post-Deployment Testing

### 1. Test Public Pages

```bash
# Privacy Policy
curl -I https://measuremint.app/privacy
# Expected: 200 OK

# Terms of Service
curl -I https://measuremint.app/terms
# Expected: 200 OK

# Landing Page
curl -I https://measuremint.app
# Expected: 200 OK

# Support Form
curl -I https://measuremint.app/support
# Expected: 200 OK
```

### 2. Test in Browser

- ✅ Visit https://measuremint.app
- ✅ Check landing page loads correctly
- ✅ Click "Privacy Policy" → Should load comprehensive policy
- ✅ Click "Terms of Service" → Should load comprehensive terms
- ✅ Click "Support" → Form should be accessible
- ✅ Check responsive design on mobile

### 3. Test Miro Integration

1. **Open Miro Board**
2. **Launch MeasureMint** from Apps panel
3. **Test OAuth Flow**:
   - Should redirect to OAuth
   - Should return to app successfully
4. **Test Core Features**:
   - Upload/select an image
   - Set calibration
   - Make measurements
   - Switch units
   - Check history

### 4. Test Support Form (if RESEND_API_KEY configured)

1. Visit https://measuremint.app/support
2. Fill out and submit test inquiry
3. Check email arrives at support@measuremint.app

---

## 🐛 Troubleshooting

### Issue: OAuth Error "redirect_uri_mismatch"

**Cause:** Mismatch between `MIRO_REDIRECT_URL` and Miro Developer Console

**Solution:**
1. Check Vercel environment variables: `MIRO_REDIRECT_URL`
2. Check Miro Developer Console: Redirect URI
3. Ensure both are exactly: `https://measuremint.app/api/redirect`
4. Redeploy after fixing

### Issue: 404 on /privacy or /terms

**Cause:** Build didn't complete or files missing

**Solution:**
```bash
# Check build logs in Vercel Dashboard
# Verify files exist in repository:
ls -la src/app/privacy/page.jsx
ls -la src/app/terms/page.jsx

# Redeploy
vercel --prod
```

### Issue: Environment Variables Not Working

**Cause:** Variables not set or deployment not triggered

**Solution:**
1. Go to Vercel → Settings → Environment Variables
2. Verify all required variables are set
3. Click **"Redeploy"** in Deployments tab
4. Check build logs for confirmation

### Issue: SSL Certificate Not Provisioning

**Cause:** DNS not configured correctly

**Solution:**
1. Check DNS records at registrar
2. Verify CNAME points to `cname.vercel-dns.com`
3. Wait up to 24 hours for DNS propagation
4. Check Vercel Dashboard → Domains for status

### Issue: App Not Loading in Miro

**Cause:** SDK URI incorrect or CORS issue

**Solution:**
1. Check Miro Developer Console → SDK URI
2. Should be: `https://measuremint.app/panel`
3. Check browser console for errors
4. Verify `app-manifest.yaml` is correct
5. Reinstall app to Miro board

### Issue: Support Form Not Sending Emails

**Cause:** RESEND_API_KEY not configured

**Solution:**
1. Sign up at https://resend.com (free tier available)
2. Get API key from dashboard
3. Add `RESEND_API_KEY` to Vercel environment variables
4. Redeploy application
5. Test form again

---

## 📊 Deployment Checklist

### Pre-Deployment

- [ ] All tests passing locally
- [ ] `.env` file configured with production values
- [ ] `app-manifest.yaml` updated with production URLs
- [ ] Legal pages (privacy/terms) reviewed and accurate
- [ ] Support email configured (ImprovMX or similar)

### Vercel Setup

- [ ] Repository imported to Vercel
- [ ] Environment variables added
- [ ] Build successful
- [ ] Production URL obtained

### Domain Configuration

- [ ] Custom domain added to Vercel
- [ ] DNS records configured
- [ ] SSL certificate active
- [ ] Environment variables updated with custom domain
- [ ] Application redeployed

### Miro Configuration

- [ ] Miro Developer Console updated with production URLs
- [ ] App manifest updated
- [ ] Permissions configured correctly
- [ ] App installed to test board

### Testing

- [ ] Landing page loads
- [ ] Privacy policy accessible
- [ ] Terms of service accessible
- [ ] Support form works
- [ ] OAuth flow successful
- [ ] Measurements working in Miro
- [ ] All features tested

### Post-Deployment

- [ ] Monitor error logs in Vercel
- [ ] Check analytics (if configured)
- [ ] Test on multiple devices
- [ ] Verify email delivery
- [ ] Document any issues

---

## 🎯 Production URLs

**Production Domain:** https://measuremint.app

**Key Endpoints:**
- Landing: `https://measuremint.app`
- Panel: `https://measuremint.app/panel`
- Privacy: `https://measuremint.app/privacy`
- Terms: `https://measuremint.app/terms`
- Support: `https://measuremint.app/support`
- OAuth Redirect: `https://measuremint.app/api/redirect`
- Support API: `https://measuremint.app/api/support`

**Contact:**
- Email: support@measuremint.app
- GitHub: https://github.com/Khaledykhalil/MeasureMint

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Miro Developer Platform](https://developers.miro.com)
- [Miro SDK Documentation](https://developers.miro.com/docs/)

---

**Last Updated:** November 8, 2025  
**Version:** 2.0  
**Status:** Production Ready 🚀
