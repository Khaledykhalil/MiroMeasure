# Paddle Payment Setup Guide

**Status:** ✅ Implementation Complete - Needs Paddle Account Configuration

---

## 🎯 What's Been Implemented

1. ✅ **Paddle packages installed** (`@paddle/paddle-node-sdk` and `@paddle/paddle-js`)
2. ✅ **Checkout API route** (`/api/checkout`) - Creates Paddle checkout
3. ✅ **Verification API route** (`/api/checkout/verify`) - Verifies transaction completion
4. ✅ **Subscription linking API** (`/api/subscription/link`) - Links Paddle transaction to Miro User ID
5. ✅ **Success page** - Updated to work with Paddle
6. ✅ **Subscribe page updated** - Now redirects to Paddle checkout

---

## 💰 Paddle Pricing Overview

### Fee Structure

**All Transactions:**
- **5% + $0.50** per transaction
- **No additional fees** for:
  - International cards
  - Taxes (VAT, sales tax) - **Handled automatically**
  - Chargebacks - **Protection included**
  - Currency conversion

**No Monthly Fee** ✅

### Cost Comparison

| Plan | Amount | Paddle Fee | You Receive | Effective % |
|------|--------|------------|-------------|-------------|
| Monthly | $9.99 | $1.00 | $8.99 | 10.0% |
| 6-Month | $49.99 | $3.00 | $46.99 | 6.0% |
| Annual | $79.99 | $4.50 | $75.49 | 5.6% |

**Note:** While Paddle's fee is higher (5% + $0.50 vs 2.9% + $0.30), it includes:
- ✅ Automatic tax handling (VAT, sales tax)
- ✅ Merchant of Record (they handle compliance)
- ✅ Chargeback protection
- ✅ No international fees

---

## 🚀 Setup Steps

### Step 1: Create Paddle Account

1. Go to https://www.paddle.com
2. Sign up for a free account
3. Start with **Sandbox** account for testing
4. Complete business verification

### Step 2: Get API Keys

1. Go to Paddle Dashboard: https://vendors.paddle.com
2. Navigate to **Developer Tools** → **Authentication**
3. Copy your keys:
   - **API Key** (starts with `test_` or `live_`)
   - **Publishable Key** (for frontend, starts with `test_` or `live_`)

### Step 3: Create Products in Paddle

1. Go to **Catalog** → **Products**
2. Create products for each plan:
   - **Monthly Plan** - $9.99/month (recurring)
   - **6-Month Plan** - $49.99/6 months (recurring)
   - **Annual Plan** - $79.99/year (recurring)
3. Copy the **Price IDs** for each product

### Step 4: Add Environment Variables

#### For Local Development (.env.local):

```env
# Paddle Credentials
PADDLE_API_KEY=test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PADDLE_ENVIRONMENT=sandbox
NEXT_PUBLIC_PADDLE_PUBLISHABLE_KEY=test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Paddle Price IDs (from Step 3)
PADDLE_PRICE_ID_MONTHLY=pri_xxxxxxxxxxxxxxxxxxxxxxxx
PADDLE_PRICE_ID_SIXMONTH=pri_xxxxxxxxxxxxxxxxxxxxxxxx
PADDLE_PRICE_ID_ANNUAL=pri_xxxxxxxxxxxxxxxxxxxxxxxx

# Base URL
NEXT_PUBLIC_URL=http://localhost:3000
```

#### For Vercel Production:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `PADDLE_API_KEY` = Your live API key
   - `PADDLE_ENVIRONMENT` = `live`
   - `NEXT_PUBLIC_PADDLE_PUBLISHABLE_KEY` = Your live publishable key
   - `PADDLE_PRICE_ID_MONTHLY` = Your monthly price ID
   - `PADDLE_PRICE_ID_SIXMONTH` = Your 6-month price ID
   - `PADDLE_PRICE_ID_ANNUAL` = Your annual price ID
   - `NEXT_PUBLIC_URL` = `https://measuremint.app`

### Step 5: Test the Integration

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Go to subscribe page:**
   - http://localhost:3000/subscribe

3. **Enter test Miro User ID** and select plan

4. **Click "Continue to Checkout"**

5. **Use Paddle test card:**
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., `12/30`)
   - CVC: Any 3 digits (e.g., `123`)
   - Name: Any name

6. **Complete checkout** - Should redirect to success page

---

## 🔧 How It Works

### Flow:

1. **User selects plan** on `/subscribe` page
2. **Clicks "Continue to Checkout"**
3. **API creates Paddle checkout** (`/api/checkout`)
4. **User redirected to Paddle checkout** (hosted by Paddle)
5. **User completes payment** on Paddle
6. **Paddle redirects to success page** (`/subscribe/success`)
7. **Success page verifies transaction** (`/api/checkout/verify`)
8. **Subscription linked to Miro User ID** (`/api/subscription/link`)
9. **Database updated** with subscription details

### API Endpoints:

#### `POST /api/checkout`
Creates a Paddle checkout.

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
  "checkout_id": "txn_...",
  "checkout_url": "https://checkout.paddle.com/...",
  "plan": "sixMonth",
  "miro_user_id": "user123"
}
```

#### `GET /api/checkout/verify?transaction_id=txn_...`
Verifies a transaction was completed.

**Response:**
```json
{
  "success": true,
  "plan": "sixMonth",
  "status": "completed",
  "customer_id": "user123"
}
```

---

## 🧪 Testing

### Test Cards (Paddle Sandbox):

| Card Number | Description |
|------------|-------------|
| `4242 4242 4242 4242` | Success (Visa) |
| `5555 5555 5555 4444` | Success (Mastercard) |
| `4000 0000 0000 0002` | Card declined |
| `4000 0000 0000 0119` | 3D Secure required |

### Test Scenarios:

1. **Successful Payment:**
   - Use `4242 4242 4242 4242`
   - Should redirect to success page
   - Database should be updated

2. **Failed Payment:**
   - Use `4000 0000 0000 0002`
   - Should show error
   - Database should not be updated

---

## ⚠️ Important Considerations

### Higher Fees

- **5% + $0.50** vs Stripe's 2.9% + $0.30
- **But includes:**
  - Automatic tax handling (saves 3-5% in tax compliance)
  - Merchant of Record (saves compliance costs)
  - Chargeback protection (saves $15+ per chargeback)
  - No international fees

### Merchant of Record

- Paddle acts as **Merchant of Record**
- They handle:
  - Tax collection and remittance
  - Compliance and regulations
  - Chargeback management
  - Payment processing

### Tax Handling

- **Automatic VAT/sales tax** collection
- **No manual tax calculations** needed
- **Compliance handled** by Paddle
- **Saves significant time and money**

---

## 🔐 Security Notes

1. **Never expose API key** - Only use in server-side code
2. **Use sandbox keys** for development
3. **Switch to live keys** only in production
4. **Verify webhooks** (see next section)

---

## 📡 Webhooks (Future Enhancement)

For production, set up Paddle webhooks to handle:
- Transaction completions
- Subscription renewals
- Payment failures
- Refunds
- Cancellations

**Webhook endpoint to create:** `/api/webhooks/paddle`

**Events to listen for:**
- `transaction.completed`
- `subscription.created`
- `subscription.updated`
- `subscription.canceled`

---

## 🐛 Troubleshooting

### "Paddle not configured" error
- Check `PADDLE_API_KEY` is set
- Restart dev server after adding env vars

### "Invalid API key" error
- Verify you're using correct key (sandbox vs live)
- Check for typos in the key

### "Price ID not found" error
- Ensure products are created in Paddle dashboard
- Verify `PADDLE_PRICE_ID_*` environment variables are set
- Check price IDs match your Paddle products

### Database errors
- Ensure subscription tables are created
- Check database connection

---

## ✅ Checklist

- [ ] Paddle account created (sandbox)
- [ ] API keys obtained
- [ ] Products created in Paddle dashboard
- [ ] Price IDs copied
- [ ] Environment variables set
- [ ] Test checkout with test card
- [ ] Verify success page works
- [ ] Check database is updated
- [ ] Test with different plans
- [ ] Set up webhooks (optional, for production)
- [ ] Switch to live account for production

---

## 📚 Resources

- **Paddle Docs:** https://developer.paddle.com
- **Paddle Dashboard:** https://vendors.paddle.com
- **Paddle Pricing:** https://www.paddle.com/pricing
- **Paddle API Reference:** https://developer.paddle.com/api-reference

---

## 💡 Why Paddle?

### Advantages:
- ✅ **Automatic tax handling** - Saves time and money
- ✅ **Merchant of Record** - They handle compliance
- ✅ **Chargeback protection** - Included in fee
- ✅ **No international fees** - Same rate worldwide
- ✅ **Simple pricing** - One rate, no surprises

### When Paddle Makes Sense:
- ✅ Selling internationally (especially EU/UK)
- ✅ Want automatic tax handling
- ✅ Want Merchant of Record benefits
- ✅ Want to avoid compliance complexity
- ✅ Value simplicity over lowest fees

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Status:** ✅ Ready for Paddle Account Setup

