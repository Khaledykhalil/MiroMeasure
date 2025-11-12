# Adyen Payment Setup Guide

**Status:** ✅ Implementation Complete - Needs Adyen Account Configuration

---

## 🎯 What's Been Implemented

1. ✅ **Adyen package installed** (`@adyen/api-library` npm package)
2. ✅ **Checkout API route** (`/api/checkout`) - Creates Adyen payment sessions
3. ✅ **Verification API route** (`/api/checkout/verify`) - Verifies payment completion
4. ✅ **Subscription linking API** (`/api/subscription/link`) - Links Adyen payment to Miro User ID
5. ✅ **Checkout page** (`/subscribe/checkout`) - Adyen client-side checkout
6. ✅ **Adyen Checkout component** - React component for payment form
7. ✅ **Success page** - Updated to work with Adyen

---

## 💰 Adyen Pricing Overview

### Fee Structure

**Interchange-Plus-Plus Model:**
- **Fixed fee:** ~$0.12 per transaction
- **Interchange fee:** Varies by card type (typically 1.5-2.5%)
- **Scheme fee:** ~0.1-0.2%
- **Total:** Usually **1.6-2.8% + $0.12** (can be lower than Stripe for high volume)

**Important Notes:**
- ⚠️ **$120/month minimum** invoice requirement
- ✅ **Lower fees** for high transaction volumes
- ✅ **Transparent pricing** - see exact interchange fees
- ✅ **No percentage on ACH/bank transfers** (flat fee only)

### Cost Comparison

| Plan | Amount | Adyen Fee (est.) | You Receive | Effective % |
|------|--------|------------------|-------------|-------------|
| Monthly | $9.99 | ~$0.38 | $9.61 | 3.8% |
| 6-Month | $49.99 | ~$1.12 | $48.87 | 2.2% |
| Annual | $79.99 | ~$1.68 | $78.31 | 2.1% |

**Note:** Actual fees depend on card type and volume. Adyen can be cheaper than Stripe (2.9% + $0.30) for larger transactions.

---

## 🚀 Setup Steps

### Step 1: Create Adyen Account

1. Go to https://www.adyen.com
2. Sign up for a free account
3. Complete business verification
4. **Important:** Adyen requires business verification (more strict than Stripe)

### Step 2: Get API Credentials

1. Go to Adyen Customer Area: https://ca-test.adyen.com (test) or https://ca-live.adyen.com (live)
2. Navigate to **Developers** → **API credentials**
3. Create API credential or use default
4. Copy:
   - **API Key** (starts with `AQE...`)
   - **Merchant Account** (your merchant account name)
   - **Client Key** (for frontend, starts with `test_` or `live_`)

### Step 3: Add Environment Variables

#### For Local Development (.env.local):

```env
# Adyen Credentials
ADYEN_API_KEY=AQEwhm...your_api_key
ADYEN_MERCHANT_ACCOUNT=YourMerchantAccount
ADYEN_ENVIRONMENT=TEST
NEXT_PUBLIC_ADYEN_CLIENT_KEY=test_...your_client_key
NEXT_PUBLIC_ADYEN_ENVIRONMENT=test

# Base URL
NEXT_PUBLIC_URL=http://localhost:3000
```

#### For Vercel Production:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `ADYEN_API_KEY` = Your live API key
   - `ADYEN_MERCHANT_ACCOUNT` = Your live merchant account
   - `ADYEN_ENVIRONMENT` = `live`
   - `NEXT_PUBLIC_ADYEN_CLIENT_KEY` = Your live client key
   - `NEXT_PUBLIC_ADYEN_ENVIRONMENT` = `live`
   - `NEXT_PUBLIC_URL` = `https://measuremint.app`

### Step 4: Test the Integration

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Go to subscribe page:**
   - http://localhost:3000/subscribe

3. **Enter test Miro User ID** and select plan

4. **Click "Continue to Checkout"**

5. **Use Adyen test card:**
   - Card: `4111 1111 1111 1111`
   - Expiry: Any future date (e.g., `12/30`)
   - CVC: Any 3 digits (e.g., `737`)
   - Name: Any name

6. **Complete checkout** - Should redirect to success page

---

## 🔧 How It Works

### Flow:

1. **User selects plan** on `/subscribe` page
2. **Clicks "Continue to Checkout"**
3. **API creates Adyen payment session** (`/api/checkout`)
4. **User redirected to checkout page** (`/subscribe/checkout`)
5. **Adyen Checkout component** renders payment form
6. **User completes payment** on Adyen form
7. **Adyen redirects to success page** (`/subscribe/success`)
8. **Success page verifies payment** (`/api/checkout/verify`)
9. **Subscription linked to Miro User ID** (`/api/subscription/link`)
10. **Database updated** with subscription details

### API Endpoints:

#### `POST /api/checkout`
Creates an Adyen payment session.

**Request:**
```json
{
  "plan": "sixMonth",
  "miro_user_id": "user123",
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "session_id": "CS...",
  "session_data": "...",
  "client_key": "test_...",
  "plan": "sixMonth",
  "miro_user_id": "user123"
}
```

#### `GET /api/checkout/verify?session_id=CS...`
Verifies a payment session was completed.

**Response:**
```json
{
  "success": true,
  "plan": "sixMonth",
  "result_code": "Authorised",
  "amount": { "value": 4999, "currency": "USD" }
}
```

---

## 🧪 Testing

### Test Cards (Adyen Test Mode):

| Card Number | Description |
|------------|-------------|
| `4111 1111 1111 1111` | Success (Visa) |
| `5555 5555 5555 4444` | Success (Mastercard) |
| `3700 0000 0000 002` | Success (Amex) |
| `4000 0000 0000 0002` | Card declined |
| `4000 0000 0000 0119` | 3D Secure required |

### Test Scenarios:

1. **Successful Payment:**
   - Use `4111 1111 1111 1111`
   - Should redirect to success page
   - Database should be updated

2. **Failed Payment:**
   - Use `4000 0000 0000 0002`
   - Should show error
   - Database should not be updated

3. **3D Secure:**
   - Use `4000 0000 0000 0119`
   - Will require authentication
   - Complete 3DS flow

---

## ⚠️ Important Considerations

### Minimum Monthly Invoice

- **$120/month minimum** - Adyen charges minimum $120/month
- If your fees are less, you pay the difference
- **Not suitable** for very small businesses initially
- **Better for** businesses with $4,000+ monthly revenue

### Business Verification

- More strict than Stripe
- Requires business documents
- Can take 1-3 business days
- Need business registration, bank account, etc.

### Recurring Payments

- Adyen handles recurring via stored payment methods
- Requires `storePaymentMethod: true` in session
- Need to set up recurring payment API for renewals
- More complex than Stripe's built-in subscriptions

---

## 🔐 Security Notes

1. **Never expose API key** - Only use in server-side code
2. **Use test keys** for development
3. **Switch to live keys** only in production
4. **Verify webhooks** (see next section)

---

## 📡 Webhooks (Future Enhancement)

For production, set up Adyen webhooks to handle:
- Payment notifications
- Recurring payment renewals
- Payment failures
- Refunds

**Webhook endpoint to create:** `/api/webhooks/adyen`

**Events to listen for:**
- `AUTHORISATION`
- `RECURRING_CONTRACT`
- `REFUND`

---

## 🐛 Troubleshooting

### "Adyen not configured" error
- Check `ADYEN_API_KEY` and `ADYEN_MERCHANT_ACCOUNT` are set
- Restart dev server after adding env vars

### "Invalid API key" error
- Verify you're using correct key (test vs live)
- Check merchant account name is correct

### Checkout not loading
- Verify `NEXT_PUBLIC_ADYEN_CLIENT_KEY` is set
- Check Adyen SDK is loading (browser console)
- Ensure environment matches (test vs live)

### Database errors
- Ensure subscription tables are created
- Check database connection

---

## ✅ Checklist

- [ ] Adyen account created
- [ ] Business verification completed
- [ ] API credentials obtained
- [ ] Environment variables set
- [ ] Test checkout with test card
- [ ] Verify success page works
- [ ] Check database is updated
- [ ] Test with different plans
- [ ] Set up recurring payments (for renewals)
- [ ] Switch to live credentials for production
- [ ] Set up webhooks (optional, for production)

---

## 📚 Resources

- **Adyen Docs:** https://docs.adyen.com
- **Adyen Checkout:** https://docs.adyen.com/online-payments
- **Adyen Testing:** https://docs.adyen.com/development-resources/test-cards
- **Adyen Customer Area:** https://ca-test.adyen.com (test) / https://ca-live.adyen.com (live)
- **Adyen Pricing:** Contact sales for exact pricing

---

## 💡 When to Use Adyen vs Stripe

### Use Adyen if:
- ✅ You have **$4,000+ monthly revenue** (to cover $120 minimum)
- ✅ You process **high transaction volumes**
- ✅ You want **transparent interchange pricing**
- ✅ You need **international payment methods**
- ✅ You're willing to handle **more complex integration**

### Use Stripe if:
- ✅ You're **just starting** (no minimum)
- ✅ You want **simpler integration**
- ✅ You prefer **flat-rate pricing** (easier to predict)
- ✅ You need **quick setup**

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Status:** ✅ Ready for Adyen Account Setup

