# ✅ Simple Vercel Postgres Setup

**Just copy and paste this SQL in Vercel!**

---

## 📋 Step 1: Find the Query Interface

After creating your Vercel Postgres database:

1. You should be on the database page
2. Look for one of these:
   - **"Data"** tab at the top
   - **"Browse"** tab
   - **"Query"** button
   - **"..."** menu → **"Query"** or **"Execute SQL"**
   - Or try clicking around - there's a SQL editor somewhere!

---

## 📝 Step 2: Copy This SQL

Once you find the SQL editor, **copy and paste this entire block:**

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

---

## ✅ Step 3: Run It

1. Click **"Run"** or **"Execute"** or **"Run Query"**
2. Should see: ✅ **"Success"** or **"Query executed successfully"**

---

## 🔍 Step 4: Verify

Run this to check it worked:

```sql
SELECT * FROM waitlist;
```

Should show an empty table with these columns:
- id
- name
- email  
- profession
- company
- created_at
- notified

---

## 🔐 Step 5: Add Admin API Key

1. Go to Vercel project → **Settings** → **Environment Variables**
2. Click **"Add New"**
3. **Key:** `ADMIN_API_KEY`
4. **Value:** `mm_admin_secure_2025_xyz` (or any secure password)
5. Check **all 3 environment boxes**
6. Click **"Save"**
7. **Save this key somewhere safe!**

---

## 🚀 Step 6: Redeploy

1. **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait ~2 minutes

---

## 🎉 Step 7: Test!

1. **Waitlist:** https://measuremint.app/waitlist
2. **Admin Panel:** https://measuremint.app/admin/waitlist (use your API key)

---

## ❓ Can't Find Query Interface?

Try these:

### Option 1: Look for tabs
After clicking your database, look for tabs at the top:
- Data
- Browse  
- Query
- SQL

### Option 2: Three-dot menu
Click the **"..."** button and look for:
- Run Query
- Execute SQL
- Query

### Option 3: Try the URL
Your database URL might be like:
```
https://vercel.com/your-team/measuremint/stores/postgres_xxxxx
```

Try adding `/data` or `/query` to the end.

### Option 4: Look in the left sidebar
Sometimes there's a "Query" option in the left sidebar when viewing the database.

### Option 5: Screenshot
If you still can't find it, take a screenshot of your database page and I'll help you locate it!

---

## 🎯 That's It!

Once you run that SQL, everything will work:
- ✅ Waitlist signups will be stored permanently
- ✅ Admin panel will show all signups
- ✅ CSV export will work
- ✅ Email notifications will still work

---

**Just need to run that SQL once and you're done!** 🚀

