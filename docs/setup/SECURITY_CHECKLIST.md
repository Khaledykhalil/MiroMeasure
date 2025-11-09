# Security Checklist

## ✅ What Should Be in `.env` (NEVER commit these!)

### Critical Secrets (MUST be in `.env`):
1. **`RESEND_API_KEY`** - Your Resend email service API key
2. **`POSTGRES_URL`** - Your database connection string (contains password!)
3. **`ADMIN_API_KEY`** - Secret key for admin endpoints
4. **`ADMIN_EMAIL`** - Your personal email (where notifications are sent)
5. **`MIRO_CLIENT_SECRET`** - Miro app secret (if using Miro OAuth)

### Less Critical (but still should be in `.env`):
- `MIRO_CLIENT_ID` - Miro app ID (can be public, but better in env)
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (optional)

## ✅ What's Safe to Show Publicly

### These are OK in your code:
- `support@measuremint.app` - Public support email (intended to be public)
- `measuremint.app` - Your domain name
- Public URLs and endpoints
- UI text and labels
- Component structure

## ⚠️ Security Issues Fixed

### Issue #1: Personal Email Hardcoded ✅ FIXED
**Before:** `khaledykhalil09@gmail.com` was hardcoded in:
- `src/app/api/support/route.js`
- `src/app/api/waitlist/route.js`

**After:** Now uses `process.env.ADMIN_EMAIL` with fallback to `support@measuremint.app`

**Action Required:**
1. Add `ADMIN_EMAIL=khaledykhalil09@gmail.com` to your `.env.local` file
2. Add `ADMIN_EMAIL=khaledykhalil09@gmail.com` to Vercel environment variables

## 📋 Environment Variables Checklist

Make sure these are set in:
- ✅ `.env.local` (for local development)
- ✅ Vercel Dashboard → Settings → Environment Variables (for production)

### Required Variables:
```
RESEND_API_KEY=re_...
POSTGRES_URL=postgresql://...
ADMIN_API_KEY=your_secure_random_string
ADMIN_EMAIL=your-email@example.com
```

## 🔒 Best Practices

1. **Never commit `.env` files** - ✅ Already in `.gitignore`
2. **Use `.env.example` or `.sample.env`** - ✅ Already have `.sample.env`
3. **Rotate secrets regularly** - Change API keys every 90 days
4. **Use different keys for dev/prod** - Separate Vercel environments
5. **Review code before commits** - Check for hardcoded secrets

## 🚨 What to Check Before Every Commit

- [ ] No API keys in code
- [ ] No passwords in code
- [ ] No personal emails hardcoded
- [ ] No database connection strings in code
- [ ] All secrets use `process.env.*`
- [ ] `.env` files are in `.gitignore`

## 📝 Current Status

✅ **All secrets are properly using environment variables**
✅ **No API keys or passwords hardcoded**
✅ **Personal email moved to environment variable**
✅ **`.env` files are gitignored**

## 🔍 How to Verify

Run this command to check for hardcoded secrets:
```bash
# Check for common secret patterns
grep -r "API_KEY\|SECRET\|PASSWORD\|TOKEN" src/ --exclude-dir=node_modules | grep -v "process.env"
```

If this returns nothing, you're good! ✅

