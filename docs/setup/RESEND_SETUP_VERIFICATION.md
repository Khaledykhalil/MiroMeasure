# Resend API Setup Verification

## ✅ Steps Completed
- [x] Signed up for Resend
- [x] Added RESEND_API_KEY to Vercel

## Next Steps to Verify

### 1. Verify Environment Variable in Vercel

1. Go to: https://vercel.com/dashboard
2. Select your **MeasureMint** project
3. Go to **Settings** → **Environment Variables**
4. Confirm you see:
   - Name: `RESEND_API_KEY`
   - Value: `re_...` (hidden)
   - Environments: ✓ Production, ✓ Preview, ✓ Development

### 2. Redeploy the Application

**IMPORTANT:** Environment variables only take effect after redeployment!

1. Go to **Deployments** tab in Vercel
2. Find the latest deployment
3. Click the **"..."** menu (three dots)
4. Click **"Redeploy"**
5. Wait for deployment to complete (~2-3 minutes)
6. Look for ✓ "Deployment Ready"

### 3. Test the Form

1. Visit: https://measuremint.app/support
2. Fill out the form completely:
   - Name: Your name
   - Email: Your email (where you want replies)
   - Category: Technical Issue
   - Subject: Test submission
   - Message: This is a test of the support form
3. Click **"Send Message →"**
4. You should see: **"Message Sent Successfully!"**

### 4. Check Your Email

1. Check the email that ImprovMX forwards to (your Gmail)
2. Look in **Inbox** first
3. If not there, check **Spam/Junk** folder
4. Email should arrive within 1-2 minutes
5. Subject line: `[TECHNICAL] Test submission`
6. From: `MeasureMint Support <onboarding@resend.dev>`

### 5. Verify in Resend Dashboard

1. Go to: https://resend.com/emails
2. You should see your test email listed
3. Status should be: **"Delivered"**
4. If it shows "Bounced" or "Failed", click for details

## Troubleshooting

### Issue: Form still shows "Email service not configured"

**Cause:** Environment variable not loaded yet

**Solution:**
1. Verify RESEND_API_KEY is in Vercel
2. **Redeploy** the application (step 2 above)
3. Clear browser cache
4. Try again

### Issue: Form submits but no success message

**Cause:** API error

**Solution:**
1. Open browser console (F12)
2. Look for error messages
3. Check Vercel logs:
   - Go to: Deployments → Latest → Functions
   - Look for `/api/support` errors

### Issue: Success message but no email received

**Cause:** Email delivery issue

**Solution:**
1. Check spam/junk folder
2. Verify Resend dashboard shows "Delivered"
3. Check ImprovMX dashboard: https://app.improvmx.com
4. Verify forwarding is active: support@measuremint.app → your Gmail
5. Wait 5-10 minutes (sometimes delayed)

### Issue: Email goes to spam

**Cause:** Sending from `onboarding@resend.dev` (test domain)

**Solution (Optional):**
1. Verify your domain in Resend
2. Go to: https://resend.com/domains
3. Add domain: `measuremint.app`
4. Add DNS records to Porkbun
5. Update API route to use: `from: 'MeasureMint Support <noreply@measuremint.app>'`

## Expected Email Format

You should receive an email that looks like this:

```
From: MeasureMint Support <onboarding@resend.dev>
To: support@measuremint.app
Subject: [TECHNICAL] Test submission

New Support Request

From: Your Name
Email: your.email@example.com
Category: technical
Subject: Test submission

Message:
This is a test of the support form

💡 Reply directly to this email to respond to Your Name
```

## Verification Checklist

- [ ] RESEND_API_KEY added to Vercel
- [ ] Application redeployed
- [ ] Form loads without errors
- [ ] Form submits successfully
- [ ] Success message appears
- [ ] Email received in inbox/spam
- [ ] Email contains correct information
- [ ] Reply-to works (goes to user's email)

## Quick Test Command

If you want to test the API directly, you can use this curl command:

```bash
curl -X POST https://measuremint.app/api/support \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "API Test",
    "category": "technical",
    "message": "Testing the API directly"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Support request sent successfully",
  "id": "..."
}
```

## Status Check

Current status of your setup:

- ✅ Resend account created
- ✅ RESEND_API_KEY obtained
- ✅ Environment variable added to Vercel
- ⏳ **NEXT: Redeploy application**
- ⏳ **THEN: Test the form**

---

**Need Help?**

If you're still having issues after following these steps, check:
1. Vercel deployment logs
2. Resend email logs
3. Browser console errors

Let me know what error messages you see!

