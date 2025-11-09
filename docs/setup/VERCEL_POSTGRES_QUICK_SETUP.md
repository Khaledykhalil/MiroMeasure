# 🚀 Vercel Postgres Quick Setup

**For MeasureMint Waitlist Feature**

---

## ⚡ Super Quick Setup (2 Methods)

### Method 1: Using Setup Script (EASIEST) ⭐

1. **Create Database in Vercel:**
   - Go to: https://vercel.com/dashboard
   - Click **MeasureMint** project
   - Click **Storage** tab
   - Click **Create Database**
   - Choose **Postgres**
   - Name: `measuremint-waitlist`
   - Region: Choose closest to you
   - Click **Create**
   - Wait ~30 seconds

2. **Pull Environment Variables:**
   ```bash
   vercel env pull .env.local
   ```
   This downloads all your database connection strings.

3. **Run Setup Script:**
   ```bash
   node setup-database.js
   ```
   This automatically creates the waitlist table!

4. **Add Admin API Key:**
   - In Vercel: **Settings** → **Environment Variables**
   - Add: `ADMIN_API_KEY` = `your_secure_password_here`
   - Check all 3 environment boxes
   - Save it somewhere safe!

5. **Redeploy:**
   - **Deployments** → **...** → **Redeploy**

6. **Test:**
   - https://measuremint.app/waitlist
   - https://measuremint.app/admin/waitlist

---

### Method 2: Manual SQL (If Script Doesn't Work)

1. **Create Database** (same as Method 1, step 1)

2. **Find Query Interface:**
   - After creating database, you'll be on the database page
   - Look for tabs: **"Data"** or **"Browse"** or **"Query"**
   - Or look for a **"Run Query"** button
   - Or click the **"..."** menu and look for query option

3. **Run This SQL:**
   ```sql
   CREATE TABLE IF NOT EXISTS waitlist (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL UNIQUE,
     profession VARCHAR(255) NOT NULL,
     company VARCHAR(255) NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
     notified BOOLEAN DEFAULT FALSE
   );

   CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
   CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);
   ```

4. **Verify:**
   ```sql
   SELECT * FROM waitlist;
   ```
   Should show empty table with columns.

5. **Add Admin API Key** (same as Method 1, step 4)

6. **Redeploy** (same as Method 1, step 5)

7. **Test** (same as Method 1, step 6)

---

## 🔍 Can't Find Query Tab in Vercel?

The Vercel UI changes frequently. Here's where to look:

### After Creating Database:

**Option A: Tabs at the top**
- Look for: **Data** | **Browse** | **Query** | **SQL**

**Option B: Three-dot menu**
- Click **"..."** button
- Look for: **Run Query** | **Execute SQL** | **Query**

**Option C: Direct URL**
- Your database URL should be something like:
  ```
  https://vercel.com/your-team/measuremint/stores/postgres_xxxxx
  ```
- Try adding `/data` to the end:
  ```
  https://vercel.com/your-team/measuremint/stores/postgres_xxxxx/data
  ```

**Option D: Use the Setup Script**
- Just use Method 1 above - it's easier! 😊

---

## 📋 Checklist

- [ ] Created Vercel Postgres database
- [ ] Ran `vercel env pull .env.local` (Method 1) OR found Query tab (Method 2)
- [ ] Created waitlist table (via script or SQL)
- [ ] Verified table exists (`SELECT * FROM waitlist`)
- [ ] Added ADMIN_API_KEY to Vercel environment variables
- [ ] Redeployed application
- [ ] Tested waitlist signup at /waitlist
- [ ] Tested admin panel at /admin/waitlist

---

## ✅ Verification Commands

After setup, verify everything works:

```bash
# Check table exists
node -e "require('@vercel/postgres').sql\`SELECT * FROM waitlist\`.then(r => console.log('✅ Table exists!', r.rows))"

# Check environment variables
node -e "console.log('POSTGRES_URL:', process.env.POSTGRES_URL ? '✅ Set' : '❌ Missing')"
```

---

## 🚨 Troubleshooting

### "Can't find Query tab"
→ Use Method 1 (setup script) instead!

### "POSTGRES_URL not found"
→ Run: `vercel env pull .env.local`

### "Table already exists"
→ That's fine! It means it's already set up.

### "Admin panel unauthorized"
→ Make sure you added ADMIN_API_KEY and redeployed

### "vercel command not found"
→ Install: `npm i -g vercel`

---

## 🎯 What You Get

After setup:
- ✅ Permanent database storage for waitlist
- ✅ Admin panel to view signups
- ✅ CSV export capability
- ✅ Email notifications (already working)
- ✅ Duplicate prevention
- ✅ Free tier (256 MB storage)

---

## 📞 Still Stuck?

If you can't find the Query tab:
1. Use the **setup script** (Method 1) - it's easier!
2. Or send me a screenshot of your database page and I'll help you find it

---

**Recommended: Use Method 1 (Setup Script) - it's the easiest!** 🚀

