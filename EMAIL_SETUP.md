# Email Setup Instructions for MeasureMint Support Form

The support form now sends emails directly using Resend API. Follow these steps to set it up:

## Step 1: Create Resend Account (FREE)

1. Go to https://resend.com/signup
2. Sign up with your email (GitHub login works too)
3. Verify your email address
4. Free plan includes: **3,000 emails/month** (more than enough!)

## Step 2: Get Your API Key

1. Log into Resend dashboard: https://resend.com/api-keys
2. Click **"Create API Key"**
3. Name it: `MeasureMint Production`
4. Permissions: **Sending access** (default)
5. Click **Create**
6. **COPY THE KEY IMMEDIATELY** (you won't see it again!)
   - It looks like: `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## Step 3: Add to Vercel Environment Variables

### Option A: Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Select your **MeasureMint** project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (paste your key)
   - **Environment:** Select all (Production, Preview, Development)
5. Click **Save**
6. **Redeploy** your site (Vercel → Deployments → latest → "Redeploy")

### Option B: Via Local .env (For testing)

1. In your MeasureMint folder, edit `.env` file
2. Add this line:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
3. Save the file
4. Restart your dev server: `npm run dev`

## Step 4: Set Up Your Domain (Optional but Recommended)

By default, emails send from `onboarding@resend.dev`. To send from your own domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter: `measuremint.app`
4. Resend will give you DNS records to add
5. Go to Porkbun → measuremint.app → DNS settings
6. Add the DNS records Resend provides (usually MX, TXT, and CNAME)
7. Wait for verification (~5-30 minutes)
8. Once verified, update the API route:
   - Change `from: 'MeasureMint Support <onboarding@resend.dev>'`
   - To: `from: 'MeasureMint Support <support@measuremint.app>'`

## Step 5: Test the Form

1. Visit: https://measuremint.app/support
2. Fill out the form completely
3. Click **Send Message**
4. Check your personal email (the one you want support emails sent to)
5. You should receive the formatted support request!

## Troubleshooting

### Form says "Failed to send message"
- Check that RESEND_API_KEY is set in Vercel
- Redeploy after adding environment variable
- Check Vercel logs for errors

### Not receiving emails
- Check your spam/junk folder
- Verify API key is correct in Vercel
- Check Resend dashboard → Logs for delivery status

### Emails from onboarding@resend.dev go to spam
- This is normal for the test domain
- Set up your custom domain (Step 4) to fix this
- Or use Porkbun email forwarding as backup

## Support

If you have issues:
- Resend Docs: https://resend.com/docs
- Resend Support: https://resend.com/support
- Check this project's logs in Vercel

---

**Current Status:**
- ✅ Form installed and ready
- ⏳ Needs RESEND_API_KEY in Vercel
- 📧 Emails will be sent to: support@measuremint.app (configure forwarding!)
