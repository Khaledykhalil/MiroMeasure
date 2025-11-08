# 🧪 Production Testing Checklist

**Date:** November 7, 2025  
**Environment:** https://measure-mint.vercel.app  
**Purpose:** End-to-end validation before marketplace submission

---

## ✅ **Pre-Testing Setup**

### 1. Verify Deployment Status
- [ ] Go to https://vercel.com/dashboard
- [ ] Check project: **measure-mint**
- [ ] Verify latest deployment is "Ready"
- [ ] Check deployment time (should be recent)
- [ ] No build errors or warnings

### 2. Verify Environment Variables
- [ ] MIRO_CLIENT_ID is set (3458764645376747153)
- [ ] MIRO_CLIENT_SECRET is set
- [ ] MIRO_REDIRECT_URL is set (https://measure-mint.vercel.app/api/redirect)

### 3. Verify Miro App Settings Updated
⚠️ **CRITICAL - Do this first!**
- [ ] Go to https://miro.com/app/settings/user-profile/apps
- [ ] Find "MeasureMint" app
- [ ] Update **App URL:** `https://measure-mint.vercel.app/panel`
- [ ] Update **Redirect URI:** `https://measure-mint.vercel.app/api/redirect`
- [ ] Click **Save Changes**
- [ ] Wait 1-2 minutes for changes to propagate

---

## 🌐 **Public Pages Testing**

Test all public-facing pages are accessible and render correctly:

### Privacy Policy
- [ ] Navigate to: https://measure-mint.vercel.app/privacy
- [ ] Page loads without errors
- [ ] Content displays correctly
- [ ] "MeasureMint Privacy Policy" header visible
- [ ] All sections render properly
- [ ] Contact email visible: support@measuremint.app

### Terms of Service
- [ ] Navigate to: https://measure-mint.vercel.app/terms
- [ ] Page loads without errors
- [ ] Content displays correctly
- [ ] "Terms of Service" header visible
- [ ] All terms are readable

### Help Center
- [ ] Navigate to: https://measure-mint.vercel.app/help
- [ ] Page loads without errors
- [ ] Table of contents visible
- [ ] All help sections render
- [ ] FAQ section accessible
- [ ] Troubleshooting guide visible

### Support Page
- [ ] Navigate to: https://measure-mint.vercel.app/support
- [ ] Page loads without errors
- [ ] Contact form visible
- [ ] Email link works: support@measuremint.app
- [ ] Beautiful gradient UI displays

---

## 🔐 **OAuth Flow Testing**

### Initial Installation
1. **Open Miro Board**
   - [ ] Go to https://miro.com
   - [ ] Open or create a test board
   - [ ] Name it: "MeasureMint_TEST_BOARD"

2. **Install App**
   - [ ] Click "Apps" or "..." in toolbar
   - [ ] Search for "MeasureMint" (if published) OR
   - [ ] Use your developer install link
   - [ ] Click to install/open

3. **OAuth Authorization**
   - [ ] Redirected to Miro authorization page
   - [ ] App name "MeasureMint" visible
   - [ ] Permissions list displayed
   - [ ] Click "Allow" or "Authorize"
   - [ ] Should redirect to: `https://measure-mint.vercel.app/api/redirect`
   - [ ] Should redirect again to: `https://measure-mint.vercel.app/panel`
   - [ ] Panel opens successfully in Miro

### OAuth Success Indicators
- [ ] No 404 errors during redirect
- [ ] No "Redirect URI mismatch" errors
- [ ] No console errors in browser DevTools
- [ ] Panel loads with MeasureMint branding visible
- [ ] "PROFESSIONAL MEASUREMENT TOOL" subtitle shows

---

## 🎯 **Core Functionality Testing**

### Panel Interface
- [ ] Panel opens on the right side of Miro board
- [ ] MeasureMint logo (green 'm') visible
- [ ] Dark mode toggle works
- [ ] All buttons are clickable
- [ ] UI is responsive and clean

### Calibration Flow - Draw New Line

**Test 1: Feet Calibration**
1. **Start Calibration**
   - [ ] Click "Draw Calibration Line"
   - [ ] Instruction overlay appears
   - [ ] Can draw line on board

2. **Enter Distance**
   - [ ] Calibration modal opens
   - [ ] Select "Feet" unit
   - [ ] Enter feet: `20`
   - [ ] Enter inches: `6`
   - [ ] Total shows: "20' 6""
   - [ ] Click "Set Calibration"

3. **Verify Result**
   - [ ] Success message appears
   - [ ] Calibration line turns green
   - [ ] Line caption shows: "Calibration: 20.5 ft" (or 20' 6")
   - [ ] Checkmark appears next to "Calibration" in panel

**Test 2: Metric Calibration**
1. **Start New Calibration**
   - [ ] Click "Update Calibration" OR "Draw Calibration Line"
   - [ ] Draw new line on board

2. **Enter Distance**
   - [ ] Select "Meters" unit
   - [ ] Enter meters: `10`
   - [ ] Enter centimeters: `50`
   - [ ] Total shows: "10.50 m"
   - [ ] Click "Set Calibration"

3. **Verify Result**
   - [ ] Calibration updated successfully
   - [ ] New calibration distance shown on line

### Calibration Flow - Reuse Existing Line
1. **Create Test Line**
   - [ ] Draw a connector on Miro board manually
   - [ ] Make it about 20-30 pixels long

2. **Reuse for Calibration**
   - [ ] Click "Reuse Existing Line"
   - [ ] Click on the line you created
   - [ ] Calibration modal opens
   - [ ] Enter known distance
   - [ ] Set calibration

3. **Verify Result**
   - [ ] Line updates with calibration info
   - [ ] Calibration saved successfully

### Measurement Testing

**Test 1: Simple Measurement**
1. **Start Measurement**
   - [ ] Ensure calibration is set
   - [ ] Click "Measure Distance"
   - [ ] Instructions appear

2. **Take Measurement**
   - [ ] Click first point on board
   - [ ] Click second point on board
   - [ ] Measurement line appears
   - [ ] Distance calculated and shown

3. **Verify Result**
   - [ ] Measurement line visible (blue/purple)
   - [ ] Distance caption shows correct value
   - [ ] Units match calibration unit

**Test 2: Multiple Measurements**
1. **Take 3 Measurements**
   - [ ] Measure distance 1
   - [ ] Measure distance 2
   - [ ] Measure distance 3
   - [ ] All measurements persist on board

2. **Verify Results**
   - [ ] All measurement lines visible
   - [ ] All captions show distances
   - [ ] No overlapping issues

**Test 3: Update Measurement**
1. **Select Measurement**
   - [ ] Click "Update Measurement"
   - [ ] Select an existing measurement line
   - [ ] Can adjust endpoints

2. **Verify Update**
   - [ ] Distance recalculates
   - [ ] Caption updates
   - [ ] Changes save

### Unit Conversion Testing
1. **Change Units**
   - [ ] Switch from "Imperial" to "Metric" (or vice versa)
   - [ ] All measurements update automatically
   - [ ] Calibration line updates
   - [ ] New unit system active

2. **Verify Conversions**
   - [ ] Values are mathematically correct
   - [ ] No rounding errors visible
   - [ ] All labels update

### Settings & Features
- [ ] Dark mode toggle works smoothly
- [ ] Unit system selector works
- [ ] All buttons have hover effects
- [ ] No UI glitches or overlaps
- [ ] Responsive to window resizing

---

## 🐛 **Error Handling Testing**

### Invalid Calibration
1. **Test Empty Values**
   - [ ] Try to set calibration with no distance
   - [ ] Should show error or prevent submission

2. **Test Zero Values**
   - [ ] Try entering 0 for calibration
   - [ ] Should show error message

3. **Test Invalid Format**
   - [ ] Try entering letters in number fields
   - [ ] Should be prevented or show error

### Measurement Without Calibration
- [ ] Try "Measure Distance" before calibration
- [ ] Should show message to calibrate first
- [ ] No crash or undefined errors

### Network Issues
1. **Test Offline**
   - [ ] Disconnect internet
   - [ ] Try to use app
   - [ ] Should show appropriate error message

2. **Test Slow Connection**
   - [ ] Throttle network in DevTools
   - [ ] App should still function
   - [ ] Loading states visible if any

---

## 📊 **Analytics & Performance**

### Vercel Analytics
- [ ] Go to Vercel dashboard → Analytics
- [ ] Check if page views are being tracked
- [ ] Verify /panel route shows traffic
- [ ] Check visitor data (may take 30-60 seconds)

### Speed Insights
- [ ] Go to Vercel dashboard → Speed Insights
- [ ] Wait for data to populate (requires several visits)
- [ ] Check Core Web Vitals scores
- [ ] Verify performance metrics

### Browser Console
- [ ] Open DevTools (F12)
- [ ] Check Console tab
- [ ] No critical errors visible
- [ ] No failed network requests
- [ ] No 404s or 500s

---

## 🌍 **Cross-Browser Testing** (Optional but Recommended)

### Chrome/Edge
- [ ] OAuth flow works
- [ ] Panel loads correctly
- [ ] All features functional

### Safari (Mac)
- [ ] OAuth flow works
- [ ] Panel loads correctly
- [ ] All features functional

### Firefox
- [ ] OAuth flow works
- [ ] Panel loads correctly
- [ ] All features functional

---

## 📱 **Mobile/Tablet Testing** (If Applicable)

### iPad/Tablet
- [ ] Miro board accessible
- [ ] Panel interface responsive
- [ ] Touch interactions work

### Mobile
- [ ] Basic functionality works
- [ ] UI adjusts appropriately

---

## ✅ **Final Verification Checklist**

### Technical
- [ ] No 404 errors anywhere
- [ ] No console errors
- [ ] All API calls successful
- [ ] OAuth flow completes successfully
- [ ] All public pages load correctly

### Functionality
- [ ] Calibration works (feet/inches)
- [ ] Calibration works (meters/centimeters)
- [ ] Measurements calculate correctly
- [ ] Unit conversions are accurate
- [ ] Dark mode works
- [ ] All UI elements functional

### Content
- [ ] Privacy policy accessible
- [ ] Terms of service accessible
- [ ] Help documentation accessible
- [ ] Support contact works
- [ ] All links work correctly

### Performance
- [ ] App loads quickly (< 3 seconds)
- [ ] No lag or stuttering
- [ ] Smooth interactions
- [ ] Analytics tracking works

---

## 🚨 **Issues Found**

Document any issues during testing:

### Issue 1:
- **Description:** 
- **Severity:** Critical / High / Medium / Low
- **Steps to Reproduce:**
- **Expected Behavior:**
- **Actual Behavior:**
- **Status:** Fixed / In Progress / To Do

### Issue 2:
- **Description:** 
- **Severity:**
- **Steps to Reproduce:**
- **Status:**

---

## ✅ **Sign-Off**

Once all tests pass:

- [ ] All critical tests passed
- [ ] All high-priority tests passed
- [ ] No blocking issues found
- [ ] Analytics confirmed working
- [ ] Ready for marketplace submission

**Tested By:** ___________________  
**Date:** November 7, 2025  
**Status:** ☐ PASSED  ☐ FAILED (needs fixes)

---

## 📋 **Next Steps After Testing**

If all tests pass:
1. [ ] Mark "Test Production Deployment" as complete in TODO
2. [ ] Prepare final marketplace submission
3. [ ] Submit to Miro Marketplace
4. [ ] 🎉 Launch!

If issues found:
1. [ ] Document all issues above
2. [ ] Prioritize fixes (critical first)
3. [ ] Fix issues
4. [ ] Re-test
5. [ ] Repeat until all tests pass

---

**Production Testing Checklist Complete!**
