# Complete Domain Verification Guide for Resend

## Why Verify Your Domain?

Resend's free tier only allows sending to your own email until you verify a domain. Once verified:
- ✅ Send to any email address (including support@measuremint.app)
- ✅ Better deliverability (won't go to spam)
- ✅ Professional sender address (noreply@measuremint.app instead of onboarding@resend.dev)
- ✅ Build trust with recipients

## Step-by-Step Instructions

### Step 1: Get DNS Records from Resend

You already have these! From your screenshot, you need to add:

1. **Domain Verification (TXT)**
   - Name: `resend._domainkey`
   - Value: `p=MIGfMA0GCSqGSIb3DQEB...`

2. **Enable Sending (MX)**
   - Name: `send`
   - Value: `feedback-smtp.us-east-1...`
   - Priority: 10

3. **Enable Sending (TXT - SPF)**
   - Name: `send`
   - Value: `v=spf1 include:amazons...`

4. **Enable Sending (TXT - DMARC)** - Optional
   - Name: `_dmarc` (under send)
   - Value: `v=DMARC1; p=none;`

5. **Enable Receiving (MX)** - Optional (only if you want to receive via Resend)
   - Name: `@`
   - Value: `inbound-smtp.us-east-1...`
   - Priority: 10

### Step 2: Add DNS Records to Porkbun

1. **Login to Porkbun:**
   - Go to: https://porkbun.com/account/domainsSpeedy
   - Find **measuremint.app**
   - Click **DNS** button

2. **Add Each Record:**

For each DNS record from Resend:

#### Adding TXT Record (Domain Verification):
- Click **"Add"** or **"+"**
- Type: **TXT**
- Host: `resend._domainkey`
- Answer: `p=MIGfMA0GCSqGSIb3DQEB...` (paste from Resend)
- TTL: 600 (or leave default)
- Click **Add** or **Submit**

#### Adding MX Record (Sending):
- Click **"Add"** or **"+"**
- Type: **MX**
- Host: `send`
- Answer: `feedback-smtp.us-east-1...` (paste from Resend)
- Priority: 10
- TTL: 600
- Click **Add**

#### Adding TXT Record (SPF):
- Click **"Add"**
- Type: **TXT**
- Host: `send`
- Answer: `v=spf1 include:amazons...` (paste from Resend)
- TTL: 600
- Click **Add**

#### Adding TXT Record (DMARC) - Optional:
- Click **"Add"**
- Type: **TXT**
- Host: `_dmarc.send` or `_dmarc` (Porkbun may auto-append)
- Answer: `v=DMARC1; p=none;`
- TTL: 600
- Click **Add**

### Step 3: Wait for DNS Propagation

- **Time:** 5-30 minutes (usually ~10 minutes)
- **Check Status:** Go to Resend dashboard → Domains
- **You'll see:** Green checkmarks when verified

### Step 4: Test Verification

Once you see green checkmarks in Resend:

```bash
# Test sending to support@measuremint.app
curl -X POST https://measuremint.app/api/support \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Domain Test",
    "email": "test@example.com",
    "subject": "Testing verified domain",
    "category": "technical",
    "message": "This should work now!"
  }'
```

### Step 5: Deploy Updated Code

I've already updated the code to use your verified domain. Just commit and push:

```bash
cd /Users/khaledkhalil/MeasureMint
git add src/app/api/support/route.js
git commit -m "Update: Use verified domain for email sending"
git push origin main
```

## Current Status

✅ **Code Updated** - API route now uses:
- From: `noreply@measuremint.app`
- To: `support@measuremint.app`

⏳ **Waiting for:** DNS records to be added to Porkbun

## How Email Flow Will Work (After Verification)

1. User submits form at measuremint.app/support
2. Resend sends email FROM `noreply@measuremint.app`
3. Email goes TO `support@measuremint.app`
4. ImprovMX receives email at `support@measuremint.app`
5. ImprovMX forwards to `khaledykhalil09@gmail.com`
6. ✅ You receive support request in Gmail!

## Important Notes

### About ImprovMX
- ImprovMX handles **incoming** email forwarding
- You still need ImprovMX configured: `support@measuremint.app` → `khaledykhalil09@gmail.com`
- Make sure this alias is enabled in ImprovMX dashboard

### About the "send" Subdomain
- Resend uses `send.measuremint.app` for sending
- This is separate from your main domain
- It won't affect your website or other email

### DNS Record Priority
- Don't worry about conflicts with existing MX records
- The `send` subdomain is separate from `@` (root)
- Your existing email setup won't be affected

## Troubleshooting

### DNS Records Not Verifying

**Check:**
1. Records are added correctly (no typos)
2. Host names are exact (case-sensitive)
3. No extra spaces in values
4. Wait full 30 minutes for propagation

**Verify DNS:**
```bash
# Check TXT record
dig TXT resend._domainkey.measuremint.app

# Check MX record
dig MX send.measuremint.app
```

### Still Getting "validation_error"

**Cause:** Domain not verified yet

**Solution:**
1. Check Resend dashboard for green checkmarks
2. Wait longer for DNS propagation
3. Verify DNS records are correct

### Emails Not Arriving

**After domain verification:**
1. Check Resend dashboard - status should be "Delivered"
2. Check ImprovMX is forwarding correctly
3. Check Gmail spam folder

## Quick Checklist

- [ ] Add DNS records to Porkbun
- [ ] Wait for verification (green checkmarks in Resend)
- [ ] Code is already updated (done ✅)
- [ ] Commit and push changes
- [ ] Test the form
- [ ] Verify email arrives in Gmail

## Need Help?

If you get stuck:
1. Screenshot your Porkbun DNS records
2. Screenshot your Resend verification status
3. Let me know what error you're seeing

---

**Ready to add the DNS records?** Let me know when you've added them to Porkbun and I'll help you test!

