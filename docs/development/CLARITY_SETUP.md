# 🔥 Microsoft Clarity Setup Guide

**Last Updated:** November 2025

## Quick Start

Microsoft Clarity is already integrated into your app! Just follow these steps to activate it.

---

## 📋 Step 1: Create Clarity Account

1. Go to [clarity.microsoft.com](https://clarity.microsoft.com)
2. Click **"Get Started"** or **"Sign In"**
3. Sign in with your Microsoft account (or create one)
4. Click **"Add New Project"**

---

## 📋 Step 2: Create Project

1. **Project Name:** `MeasureMint` (or your preferred name)
2. **Website URL:** Your Vercel deployment URL (e.g., `https://measure-mint.vercel.app`)
3. **Industry:** Select "Software" or "Technology"
4. Click **"Create Project"**

---

## 📋 Step 3: Get Your Project ID

1. After creating the project, you'll see a page with setup instructions
2. Find your **Project ID** (looks like: `abcd1234efgh5678`)
3. Copy this ID - you'll need it in the next step

---

## 📋 Step 4: Add Environment Variable

### Local Development

Add to your `.env.local` file:

```bash
NEXT_PUBLIC_CLARITY_ID=your_project_id_here
```

### Vercel Production

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project: **measure-mint**
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Key:** `NEXT_PUBLIC_CLARITY_ID`
   - **Value:** Your Clarity Project ID
   - **Environment:** Production, Preview, Development (select all)
5. Click **"Save"**
6. **Redeploy** your app (or wait for next deployment)

---

## 📋 Step 5: Verify Setup

1. Deploy your app (or wait for automatic deployment)
2. Visit your site in a browser
3. Open browser DevTools → Console
4. Type: `window.clarity` and press Enter
5. If you see an object, Clarity is working! ✅

---

## 📊 Viewing Your Data

### Wait for Data
- Clarity needs **24-48 hours** to collect enough data
- You need at least **100 page views** to see meaningful heatmaps
- Session recordings appear immediately (but may be limited on free tier)

### Access Dashboard
1. Go to [clarity.microsoft.com](https://clarity.microsoft.com)
2. Sign in with your Microsoft account
3. Select your **MeasureMint** project
4. View:
   - **Heatmaps** - Click, scroll, and move heatmaps
   - **Recordings** - Session replays
   - **Insights** - Dead clicks, rage clicks, and more

---

## 🎯 What You'll See

### Heatmaps
- **Click Heatmaps** - Where users click (red = most clicks)
- **Scroll Heatmaps** - How far users scroll (blue = most viewing time)
- **Move Heatmaps** - Mouse movement patterns

### Session Recordings
- **Video Replays** - Watch actual user sessions
- **Filtering** - Filter by device, country, page, etc.
- **Search** - Search for specific user actions

### Insights
- **Dead Clicks** - Clicks that don't work
- **Rage Clicks** - Frustrated users (multiple rapid clicks)
- **JavaScript Errors** - Errors on your pages
- **Performance** - Slow pages and issues

---

## 🔒 Privacy & Compliance

### GDPR Compliance
- Clarity is GDPR compliant
- Data is anonymized
- No personal information collected
- IP addresses may be collected (check Clarity's privacy policy)

### Cookie Consent
- Clarity uses cookies for tracking
- Consider adding cookie consent banner in EU
- Update Privacy Policy to mention Clarity

### Update Privacy Policy
Add to your Privacy Policy:

```markdown
## Analytics and Tracking

We use Microsoft Clarity to analyze how users interact with our website. 
Clarity uses cookies and other tracking technologies to collect information 
about your use of our website, including:
- Click patterns
- Scroll depth
- Mouse movements
- Session recordings

This information helps us improve our website and user experience. 
For more information about Clarity, see [Microsoft Clarity Privacy Policy](https://clarity.microsoft.com/terms).
```

---

## 🔧 Troubleshooting

### No Data Appearing
- **Wait 24-48 hours** - Data needs time to accumulate
- **Check environment variable** - Verify `NEXT_PUBLIC_CLARITY_ID` is set
- **Check browser console** - Look for Clarity script loading
- **Check ad blockers** - Some ad blockers may block Clarity

### Script Not Loading
- Verify Project ID is correct
- Check environment variable is set in Vercel
- Check browser console for errors
- Verify script is in `layout.jsx`

### Data Not Showing in Dashboard
- Wait 24-48 hours for data
- Ensure you have at least 100 page views
- Check that Clarity script is loading on your site
- Verify Project ID matches your Clarity project

---

## 📚 Resources

- [Microsoft Clarity Docs](https://docs.microsoft.com/en-us/clarity/)
- [Clarity Dashboard](https://clarity.microsoft.com)
- [Clarity Privacy Policy](https://clarity.microsoft.com/terms)
- [Heatmap Tracking Guide](./HEATMAP_TRACKING.md)

---

## ✅ Checklist

- [ ] Created Clarity account
- [ ] Created Clarity project
- [ ] Copied Project ID
- [ ] Added `NEXT_PUBLIC_CLARITY_ID` to `.env.local`
- [ ] Added `NEXT_PUBLIC_CLARITY_ID` to Vercel environment variables
- [ ] Redeployed app
- [ ] Verified script is loading (browser console)
- [ ] Updated Privacy Policy (if required)
- [ ] Waited 24-48 hours for data
- [ ] Viewed heatmaps in Clarity dashboard

---

## 🎉 Next Steps

1. **Monitor Heatmaps** - Check weekly to see user behavior
2. **Watch Recordings** - Review session recordings monthly
3. **Identify Issues** - Look for dead clicks and rage clicks
4. **Make Improvements** - Use data to improve UX
5. **Track Conversions** - See how users navigate to subscribe

---

**Status:** ✅ Code integrated, ready for Project ID  
**Next Step:** Add Project ID to environment variables  
**Dashboard:** [clarity.microsoft.com](https://clarity.microsoft.com)

