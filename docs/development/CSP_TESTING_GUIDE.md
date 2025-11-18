# CSP Testing Guide

**Last Updated:** November 17, 2025

## Quick Test Checklist

After deploying the strict CSP, test the following:

### 1. Browser Console Check
Open browser DevTools (F12) → Console tab:
- ✅ **Expected**: No CSP violation errors
- ❌ **If errors appear**: Note the blocked resource and directive

### 2. Functionality Tests

#### Core Features
- [ ] **Homepage loads** (`/`)
- [ ] **Miro SDK loads** (check Network tab for `miro.js`)
- [ ] **Panel opens** (`/panel`)
- [ ] **Guide page** (`/guide`)
- [ ] **Support form** (`/support`) - submit test
- [ ] **Waitlist form** (`/waitlist`) - submit test

#### Third-Party Services
- [ ] **Vercel Analytics** - Check Network tab for analytics requests
- [ ] **Microsoft Clarity** - Check for Clarity script loading
- [ ] **Google Fonts** - Verify fonts load correctly
- [ ] **Loom videos** - Check if embeds work (`/guide` page)

### 3. CSP Header Verification

Check response headers:
```bash
curl -I https://your-app.vercel.app | grep -i "content-security-policy"
```

Expected:
- Contains `nonce-` values
- Contains `strict-dynamic`
- No `unsafe-inline` in script-src
- No `unsafe-inline` in style-src

### 4. Common Issues & Fixes

#### Issue: Microsoft Clarity Not Working
**Symptom**: Clarity script blocked, CSP error in console

**Fix**: Add `'unsafe-eval'` back to script-src in `src/middleware.js`:
```javascript
`script-src 'self' 'nonce-${scriptNonce}' 'strict-dynamic' 'unsafe-eval' https://...`
```

#### Issue: Next.js Scripts Blocked
**Symptom**: Page doesn't load, hydration errors

**Fix**: Verify `strict-dynamic` is present in CSP header

#### Issue: Inline Styles Blocked
**Symptom**: Styles not applying, CSP error for style-src

**Fix**: Ensure inline styles use nonce attribute (Next.js handles this automatically)

### 5. Production Monitoring

Monitor CSP violations:
1. **Browser Console** (client-side)
2. **Vercel Logs** (server-side)
3. **Error Tracking** (if configured)

### 6. Test URLs

- Production: `https://measure-mint-[hash].vercel.app`
- Check CSP: Open DevTools → Network → Select any request → Headers → Response Headers → `Content-Security-Policy`

## Expected CSP Structure

```
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'nonce-[random]' 'strict-dynamic' https://miro.com ...;
  style-src 'self' 'nonce-[random]' https://fonts.googleapis.com;
  ...
```

## Success Criteria

✅ No CSP violations in browser console  
✅ All features work as expected  
✅ Third-party services load correctly  
✅ CSP header contains nonces and `strict-dynamic`  
✅ No `unsafe-inline` in script-src or style-src

