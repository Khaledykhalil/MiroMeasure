# 🔧 Miro App Settings Update Guide

**Date:** November 7, 2025  
**Purpose:** Update Miro app configuration for production deployment  
**Time Required:** 5 minutes

---

## ⚠️ **CRITICAL - Do This Before Testing**

Your Miro app currently points to development URLs. You **MUST** update these to production URLs before testing or submitting to the marketplace.

---

## 🎯 **Step-by-Step Instructions**

### **Step 1: Access Miro Developer Settings**

1. **Open Your Browser**
   - Use Chrome, Firefox, or Safari

2. **Navigate to Miro Apps Settings**
   - Go to: https://miro.com/app/settings/user-profile/apps
   - Or manually:
     - Go to https://miro.com
     - Click your profile picture (top right)
     - Select "Settings"
     - Click "Your apps" in left sidebar

3. **Find Your App**
   - Scroll to find "MeasureMint" in your app list
   - Click on it to expand/edit

---

### **Step 2: Update App URL**

1. **Locate "App URL" Field**
   - Should currently show something like:
     - `http://localhost:3000/panel` OR
     - `https://something.ngrok.io/panel` OR
     - Old URL

2. **Update to Production URL**
   - **Delete** the current URL
   - **Enter exactly:** `https://measure-mint.vercel.app/panel`
   - ⚠️ Make sure there's NO trailing slash
   - ⚠️ Double-check spelling: `measure-mint` (not `measuremint`)

3. **Verify**
   - [ ] Starts with `https://`
   - [ ] Domain is `measure-mint.vercel.app`
   - [ ] Path is `/panel`
   - [ ] No trailing slash at end
   - [ ] No typos

**Correct:** ✅ `https://measure-mint.vercel.app/panel`  
**Wrong:** ❌ `https://measure-mint.vercel.app/panel/`  
**Wrong:** ❌ `http://measure-mint.vercel.app/panel`  
**Wrong:** ❌ `https://measuremint.vercel.app/panel`

---

### **Step 3: Update Redirect URI**

1. **Locate "Redirect URI" Field**
   - Should currently show something like:
     - `http://localhost:3000/api/redirect` OR
     - `https://something.ngrok.io/api/redirect` OR
     - Old URL

2. **Update to Production URL**
   - **Delete** the current URI
   - **Enter exactly:** `https://measure-mint.vercel.app/api/redirect`
   - ⚠️ Make sure there's NO trailing slash
   - ⚠️ Double-check spelling

3. **Verify**
   - [ ] Starts with `https://`
   - [ ] Domain is `measure-mint.vercel.app`
   - [ ] Path is `/api/redirect`
   - [ ] No trailing slash at end
   - [ ] No typos

**Correct:** ✅ `https://measure-mint.vercel.app/api/redirect`  
**Wrong:** ❌ `https://measure-mint.vercel.app/api/redirect/`  
**Wrong:** ❌ `http://measure-mint.vercel.app/api/redirect`

---

### **Step 4: Save Changes**

1. **Click "Save" or "Update"**
   - Look for save button at bottom of form
   - Click to save your changes

2. **Confirm Success**
   - [ ] Success message appears
   - [ ] No error messages
   - [ ] Page reloads or confirms save

3. **Wait for Propagation**
   - **Wait 1-2 minutes** for changes to take effect
   - Miro needs time to update their systems

---

## ✅ **Verification Checklist**

After saving, double-check your settings:

### App URL Configuration
- [ ] Field shows: `https://measure-mint.vercel.app/panel`
- [ ] Exactly matches (no extra characters)
- [ ] Uses `https://` not `http://`
- [ ] No trailing slash

### Redirect URI Configuration
- [ ] Field shows: `https://measure-mint.vercel.app/api/redirect`
- [ ] Exactly matches (no extra characters)
- [ ] Uses `https://` not `http://`
- [ ] No trailing slash

### Additional Settings (if applicable)
- [ ] App name is "MeasureMint"
- [ ] Description is updated
- [ ] Icon/logo is uploaded
- [ ] All required fields are filled

---

## 🧪 **Test Your Changes**

After updating and waiting 1-2 minutes:

### Quick OAuth Test
1. **Open Miro Board**
   - Go to https://miro.com
   - Open any board or create new one

2. **Install/Open MeasureMint**
   - Click "Apps" or search for your app
   - Try to install or open it

3. **Check OAuth Flow**
   - Should redirect to Miro authorization
   - Click "Allow"
   - Should redirect to: `https://measure-mint.vercel.app/api/redirect`
   - Should then redirect to: `https://measure-mint.vercel.app/panel`
   - Panel should open successfully

### Success Indicators
✅ No "Redirect URI mismatch" error  
✅ No 404 errors  
✅ Panel opens in Miro  
✅ No console errors

### Failure Indicators
❌ "Redirect URI mismatch" error → Check your URLs again  
❌ 404 error → Check spelling and paths  
❌ Blank page → Check browser console for errors  
❌ OAuth fails → Wait another minute and try again

---

## 🚨 **Common Issues & Solutions**

### Issue 1: "Redirect URI mismatch"
**Cause:** URLs don't match exactly  
**Solution:**
- Go back to Miro settings
- Copy/paste URLs exactly as shown above
- Make sure no trailing slashes
- Save again and wait 2 minutes

### Issue 2: 404 Error After OAuth
**Cause:** Vercel deployment issue or wrong path  
**Solution:**
- Verify Vercel deployment is live
- Check https://measure-mint.vercel.app/panel loads in browser
- Check https://measure-mint.vercel.app/api/redirect in browser
- Both should load (redirect may show an error, that's okay)

### Issue 3: Changes Not Taking Effect
**Cause:** Miro cache or propagation delay  
**Solution:**
- Wait full 2 minutes
- Clear browser cache
- Try in incognito/private window
- Try different browser

### Issue 4: Can't Find "Your Apps" Section
**Cause:** Using wrong Miro account or no apps created  
**Solution:**
- Make sure you're logged into correct Miro account
- Verify you created the app in Miro developer console
- Go to: https://miro.com/app/settings/user-profile/apps

---

## 📋 **Environment Variables Cross-Check**

While you're at it, verify your Vercel environment variables match:

### In Vercel Dashboard:
1. Go to: https://vercel.com/khaledykhalil/measure-mint
2. Click "Settings" tab
3. Click "Environment Variables"
4. Verify these exist:

**MIRO_CLIENT_ID**
- Value: `3458764645376747153`
- Environment: Production, Preview, Development

**MIRO_CLIENT_SECRET**
- Value: (your secret - should be set)
- Environment: Production, Preview, Development

**MIRO_REDIRECT_URL**
- Value: `https://measure-mint.vercel.app/api/redirect`
- Environment: Production, Preview, Development

If any are missing or wrong:
- Add or update them
- Trigger new deployment (push to git)

---

## ✅ **Completion Checklist**

Before moving to next step:

- [ ] Accessed Miro app settings page
- [ ] Found MeasureMint app
- [ ] Updated App URL to production
- [ ] Updated Redirect URI to production
- [ ] Saved changes successfully
- [ ] Waited 1-2 minutes
- [ ] Tested OAuth flow (optional but recommended)
- [ ] No errors encountered
- [ ] Ready to proceed with production testing

---

## 🎯 **Expected Results**

After completing these steps:

✅ **App URL:** `https://measure-mint.vercel.app/panel`  
✅ **Redirect URI:** `https://measure-mint.vercel.app/api/redirect`  
✅ **OAuth flow works** from production  
✅ **Ready for marketplace submission**

---

## 📸 **Visual Reference**

### What You're Looking For:

```
┌─────────────────────────────────────────┐
│ MeasureMint                             │
├─────────────────────────────────────────┤
│ App URL                                 │
│ https://measure-mint.vercel.app/panel   │
│                                         │
│ Redirect URI                            │
│ https://measure-mint.vercel.app/api/redirect │
│                                         │
│            [Save Changes]               │
└─────────────────────────────────────────┘
```

---

## 🚀 **Next Steps**

After completing this guide:

1. [ ] Mark "Update Miro App Settings" as complete in TODO
2. [ ] Proceed to production testing (docs/PRODUCTION_TESTING.md)
3. [ ] Complete all tests successfully
4. [ ] Prepare for marketplace submission

---

**Time Spent:** ~5 minutes  
**Difficulty:** Easy  
**Impact:** Critical (required for production and marketplace)

**Questions?** Contact: support@measuremint.app

---

**Last Updated:** November 7, 2025  
**Status:** Ready to use
