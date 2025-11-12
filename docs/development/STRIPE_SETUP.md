# Stripe Checkout Setup Guide

**Status:** ✅ Implementation Complete - Needs Stripe Account Configuration

---

## 🎯 What's Been Implemented

1. ✅ **Stripe package installed** (`stripe` npm package)
2. ✅ **Checkout API route** (`/api/checkout`) - Creates Stripe checkout sessions
3. ✅ **Verification API route** (`/api/checkout/verify`) - Verifies payment completion
4. ✅ **Subscription linking API** (`/api/subscription/link`) - Links Stripe subscription to Miro User ID
5. ✅ **Success page** (`/subscribe/success`) - Shows payment confirmation
6. ✅ **Subscribe page updated** - Now redirects to Stripe Checkout

---

## 🚀 Setup Steps

### Step 1: Create Stripe Account

1. Go to https://stripe.com
2. Sign up for a free account
3. Complete account setup (business details, bank account)

### Step 2: Get API Keys

1. Go to Stripe Dashboard: https://dashboard.stripe.com
2. Click **"Developers"** → **"API keys"**
3. Copy your keys:
   - **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - **Secret key** (starts with `sk_test_` or `sk_live_`)

⚠️ **Important:** Use test keys (`pk_test_`, `sk_test_`) for development!

### Step 3: Add Environment Variables

#### For Local Development (.env.local):

```env
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Base URL (for redirects)
NEXT_PUBLIC_URL=http://localhost:3000
```

#### For Vercel Production:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `STRIPE_SECRET_KEY` = `sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (use live key!)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (use live key!)
   - `NEXT_PUBLIC_URL` = `https://measuremint.app`

### Step 4: Create Stripe Products (Optional)

You can create products in Stripe Dashboard, or the code will create them dynamically.

**To create manually:**
1. Go to Stripe Dashboard → **Products**
2. Create products for:
   - Monthly Plan ($9.99/month)
   - 6-Month Plan ($49.99/6 months)
   - Annual Plan ($79.99/year)

**Note:** The current implementation creates products dynamically, so this is optional.

### Step 5: Test the Integration

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Go to subscribe page:**
   - http://localhost:3000/subscribe

3. **Enter a test Miro User ID** (any string for testing)

4. **Click "Continue to Checkout"**

5. **Use Stripe test card:**
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., `12/34`)
   - CVC: Any 3 digits (e.g., `123`)
   - ZIP: Any 5 digits (e.g., `12345`)

6. **Complete checkout** - Should redirect to success page

---

## 🔧 How It Works

### Flow:

1. **User selects plan** on `/subscribe` page
2. **Clicks "Continue to Checkout"**
3. **API creates Stripe checkout session** (`/api/checkout`)
4. **User redirected to Stripe Checkout** (hosted by Stripe)
5. **User completes payment** on Stripe
6. **Stripe redirects to success page** (`/subscribe/success`)
7. **Success page verifies payment** (`/api/checkout/verify`)
8. **Subscription linked to Miro User ID** (`/api/subscription/link`)
9. **Database updated** with subscription details

### API Endpoints:

#### `POST /api/checkout`
Creates a Stripe checkout session.

**Request:**
```json
{
  "plan": "sixMonth",
  "miro_user_id": "user123",
  "email": "user@example.com" // optional
}
```

**Response:**
```json
{
  "session_id": "cs_test_...",
  "session_url": "https://checkout.stripe.com/...",
  "plan": "sixMonth",
  "miro_user_id": "user123"
}
```

#### `GET /api/checkout/verify?session_id=cs_test_...`
Verifies a checkout session was completed.

**Response:**
```json
{
  "success": true,
  "plan": "sixMonth",
  "subscription_id": "sub_...",
  "payment_status": "paid"
}
```

#### `POST /api/subscription/link`
Links Stripe subscription to Miro User ID in database.

**Request:**
```json
{
  "session_id": "cs_test_...",
  "miro_user_id": "user123",
  "plan": "sixMonth"
}
```

---

## 🧪 Testing

### Test Cards (Stripe Test Mode):

| Card Number | Description |
|------------|-------------|
| `4242 4242 4242 4242` | Success |
| `4000 0000 0000 0002` | Card declined |
| `4000 0000 0000 9995` | Insufficient funds |
| `4000 0025 0000 3155` | Requires authentication (3D Secure) |

### Test Scenarios:

1. **Successful Payment:**
   - Use `4242 4242 4242 4242`
   - Should redirect to success page
   - Database should be updated

2. **Failed Payment:**
   - Use `4000 0000 0000 0002`
   - Should show error
   - Database should not be updated

3. **Mock Mode (No Stripe Key):**
   - If `STRIPE_SECRET_KEY` not set
   - Will redirect to success page with `mock=true`
   - Useful for testing UI without Stripe account

---

## 🔐 Security Notes

1. **Never expose secret key** - Only use in server-side code
2. **Use test keys** for development
3. **Switch to live keys** only in production
4. **Verify webhooks** (see next section)

---

## 📡 Webhooks (Future Enhancement)

For production, you should set up Stripe webhooks to handle:
- Subscription renewals
- Payment failures
- Cancellations
- Refunds

**Webhook endpoint to create:** `/api/webhooks/stripe`

**Events to listen for:**
- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_failed`

---

## 🐛 Troubleshooting

### "Stripe not configured" error
- Check `STRIPE_SECRET_KEY` is set in environment variables
- Restart dev server after adding env vars

### "Invalid API key" error
- Verify you're using the correct key (test vs live)
- Check for typos in the key

### Redirect not working
- Check `NEXT_PUBLIC_URL` is set correctly
- For local: `http://localhost:3000`
- For production: `https://measuremint.app`

### Database errors
- Ensure subscription tables are created (run `sql/create-subscription-tables.sql`)
- Check database connection

---

## ✅ Checklist

- [ ] Stripe account created
- [ ] API keys obtained (test keys for dev)
- [ ] Environment variables set
- [ ] Test checkout with test card
- [ ] Verify success page works
- [ ] Check database is updated
- [ ] Test with different plans
- [ ] Switch to live keys for production
- [ ] Set up webhooks (optional, for production)

---

## 📚 Resources

- **Stripe Docs:** https://stripe.com/docs
- **Stripe Checkout:** https://stripe.com/docs/payments/checkout
- **Stripe Testing:** https://stripe.com/docs/testing
- **Stripe Dashboard:** https://dashboard.stripe.com

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Status:** ✅ Ready for Stripe Account Setup

