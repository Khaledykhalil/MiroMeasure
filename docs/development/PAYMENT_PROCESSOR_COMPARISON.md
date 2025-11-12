# Payment Processor Comparison & Fee Analysis

**Goal:** Minimize payment processing fees for MeasureMint subscriptions  
**Date:** January 2025  
**Status:** Recommendation Guide

---

## 💰 Fee Comparison Overview

### Quick Summary

| Processor | Transaction Fee | Subscription Fee | Best For |
|-----------|----------------|-----------------|----------|
| **Stripe** | 2.9% + $0.30 | Included | Most developers, easy integration |
| **Square** | 2.9% + $0.30 | Included | Retail/POS focus, simple setup |
| **Shopify Payments** | 2.4-2.9% + $0.30 | Shopify plan required | Shopify stores only |
| **Paddle** | 5% + $0.50 | Included | International, tax handling |
| **Payoneer** | Varies | Limited | Cross-border payments, receiving funds |
| **PayPal** | 2.9% + $0.30 | $0 | Wide user base |
| **Lemon Squeezy** | 3.5% + $0.30 | Included | Simple, all-in-one |
| **Direct Bank** | ~$0.10-0.50 | Manual | Lowest fees, complex |

---

## 📊 Detailed Comparison

### 1. Stripe (Most Popular)

**Fees:**
- **Online payments:** 2.9% + $0.30 per transaction
- **Recurring subscriptions:** Same rate
- **International cards:** +1% additional
- **No monthly fee** (unless using Stripe Terminal)

**Pros:**
- ✅ Industry standard, trusted by users
- ✅ Excellent developer experience
- ✅ Built-in subscription management
- ✅ Handles failed payments automatically
- ✅ Great documentation and support
- ✅ PCI compliance handled
- ✅ Supports multiple payment methods

**Cons:**
- ❌ 2.9% + $0.30 can add up
- ❌ International cards cost more
- ❌ Chargeback fee: $15

**Best For:** Most SaaS businesses, especially if you want easy integration

**Cost Example (6-month plan - $49.99):**
- Fee: $1.75 (2.9% + $0.30)
- You receive: $48.24
- **Effective rate: 3.5%**

---

### 2. Paddle (Best for International)

**Fees:**
- **All transactions:** 5% + $0.50 per transaction
- **No additional fees** for international, taxes, or chargebacks
- **No monthly fee**

**Pros:**
- ✅ **Handles all taxes automatically** (VAT, sales tax)
- ✅ **Merchant of Record** - they handle compliance
- ✅ No international card fees
- ✅ Chargeback protection included
- ✅ Simple pricing (one rate)
- ✅ Great for EU/UK businesses

**Cons:**
- ❌ Higher base fee (5% vs 2.9%)
- ❌ Less flexible than Stripe
- ❌ Smaller user base recognition

**Best For:** International businesses, if you want tax handling included

**Cost Example (6-month plan - $49.99):**
- Fee: $3.00 (5% + $0.50)
- You receive: $46.99
- **Effective rate: 6.0%**

**Note:** If you're paying 2.9% + Stripe + handling taxes yourself (often 3-5% more), Paddle can actually be cheaper.

---

### 3. Square

**Fees:**
- **Online payments:** 2.9% + $0.30 per transaction
- **Subscription billing:** Same rate, no monthly fee
- **In-person (if applicable):** 2.6% + $0.15
- **No monthly fee**

**Pros:**
- ✅ Same fees as Stripe (2.9% + $0.30)
- ✅ Built-in subscription management
- ✅ Simple pricing, no hidden fees
- ✅ Good for businesses with retail presence
- ✅ Integrated ecosystem (POS, inventory, etc.)

**Cons:**
- ❌ Less developer-friendly than Stripe
- ❌ More focused on retail/POS than SaaS
- ❌ Limited API documentation compared to Stripe
- ❌ Less flexible for complex integrations
- ❌ Smaller developer community

**Best For:** Businesses with retail presence, simpler integrations, or already using Square ecosystem

**Cost Example (6-month plan - $49.99):**
- Fee: $1.75 (2.9% + $0.30)
- You receive: $48.24
- **Effective rate: 3.5%**

**Comparison to Stripe:**
- Same fees ✅
- Less developer-friendly ❌
- Less flexible ❌
- Better for retail/POS ✅
- Stripe better for SaaS ✅

---

### 4. Shopify Payments

**⚠️ Important:** Shopify Payments is **ONLY available for Shopify stores**. It cannot be used for standalone SaaS products.

**Fees:**
- **Basic Shopify Plan:** 2.9% + $0.30 per online transaction
- **Shopify Plan:** 2.6% + $0.30 per online transaction
- **Advanced Plan:** 2.4% + $0.30 per online transaction
- **Plus Shopify plan fee:** $29-299/month (depending on plan)
- **No additional transaction fees** when using Shopify Payments

**Pros:**
- ✅ Lower fees on higher plans (2.4% + $0.30)
- ✅ Seamless integration with Shopify stores
- ✅ No additional transaction fees
- ✅ Quick payouts (2-3 business days)
- ✅ Multiple payment methods

**Cons:**
- ❌ **Shopify store required** - Cannot use standalone
- ❌ **Platform lock-in** - Tied to Shopify ecosystem
- ❌ **Monthly Shopify fee** - $29-299/month
- ❌ **Not suitable for SaaS** - Designed for e-commerce
- ❌ **Complex for custom storefronts** - Requires custom app development
- ❌ **Limited availability** - Not available in all countries

**Best For:** E-commerce stores on Shopify platform only

**Cost Example (6-month plan - $49.99):**
- Transaction fee: $1.50 (2.4% + $0.30 on Advanced plan)
- Shopify plan fee: $299/month (Advanced plan)
- **Total: $1.50 + $299/month = Not viable for SaaS**

**For MeasureMint:**
- ❌ **Not applicable** - MeasureMint is not a Shopify store
- ❌ **Cannot be used** - Requires Shopify platform
- ❌ **Wrong use case** - Designed for e-commerce, not SaaS

**Recommendation:** ❌ **Not applicable** - Only for Shopify stores

---

### 5. Payoneer

**⚠️ Important:** Payoneer is **NOT a traditional payment processor**. It's primarily a cross-border payment service for receiving funds, not for processing customer payments in SaaS applications.

**What Payoneer Is:**
- ✅ Cross-border money transfer service
- ✅ Payment receiving service (for freelancers, marketplaces)
- ✅ International payment management
- ✅ Payoneer Checkout (limited payment acceptance)

**What Payoneer Is NOT:**
- ❌ Full payment processor (like Stripe/Adyen)
- ❌ Subscription billing platform
- ❌ Developer-friendly API for SaaS
- ❌ Comprehensive payment processing solution

**Fees:**
- **Payoneer Checkout:** Varies by region and payment method
- **Receiving payments:** Typically 1-3% (varies)
- **Cross-border transfers:** Fee structure varies
- **No clear subscription billing pricing**

**Pros:**
- ✅ Good for receiving international payments
- ✅ Cross-border payment solutions
- ✅ Multiple currency support
- ✅ Useful for freelancers/marketplaces

**Cons:**
- ❌ **Not a payment processor** - Limited payment acceptance
- ❌ **No subscription billing** - Not designed for recurring payments
- ❌ **Limited API** - Not developer-friendly for SaaS
- ❌ **Unclear pricing** - Not transparent for subscription use
- ❌ **Wrong use case** - Designed for receiving, not processing
- ❌ **No subscription management** - Cannot handle recurring billing

**Best For:** Freelancers, marketplaces, businesses receiving international payments

**For MeasureMint:**
- ❌ **Not suitable** - Not a payment processor
- ❌ **No subscription billing** - Cannot handle recurring payments
- ❌ **Limited API** - Not developer-friendly
- ❌ **Wrong use case** - Designed for receiving, not processing customer payments

**Recommendation:** ❌ **Not applicable** - Payoneer is not a payment processor for SaaS subscriptions

---

### 6. PayPal

**Fees:**
- **Standard:** 2.9% + $0.30 per transaction
- **PayPal Business:** Same rate
- **No monthly fee**

**Pros:**
- ✅ Widely recognized and trusted
- ✅ Many users already have accounts
- ✅ Good for one-time payments

**Cons:**
- ❌ Poor subscription management
- ❌ Higher chargeback fees
- ❌ Account freezes are common
- ❌ Less developer-friendly
- ❌ Limited customization

**Best For:** Not recommended for subscriptions

**Cost Example (6-month plan - $49.99):**
- Fee: $1.75 (2.9% + $0.30)
- You receive: $48.24
- **Effective rate: 3.5%**

---

### 7. Lemon Squeezy (All-in-One)

**Fees:**
- **All transactions:** 3.5% + $0.30 per transaction
- **No additional fees**
- **No monthly fee**

**Pros:**
- ✅ Handles taxes automatically
- ✅ Merchant of Record (like Paddle)
- ✅ Simple pricing
- ✅ Good developer experience
- ✅ Built-in subscription management

**Cons:**
- ❌ Higher fee than Stripe
- ❌ Less established than Stripe/Paddle
- ❌ Smaller user base

**Best For:** If you want simplicity and tax handling

**Cost Example (6-month plan - $49.99):**
- Fee: $2.05 (3.5% + $0.30)
- You receive: $47.94
- **Effective rate: 4.1%**

---

### 8. Direct Bank Transfer / ACH

**Fees:**
- **ACH:** $0.10 - $0.50 per transaction
- **Wire transfer:** $10-25 per transaction
- **No percentage fee**

**Pros:**
- ✅ **Lowest fees** (flat rate, no percentage)
- ✅ Direct to your bank account
- ✅ No chargeback risk

**Cons:**
- ❌ **Very complex** to implement
- ❌ Manual subscription management
- ❌ Users must enter bank details
- ❌ Lower conversion rates
- ❌ International is difficult
- ❌ No automatic retries
- ❌ Compliance requirements

**Best For:** Enterprise customers, high-value transactions

**Cost Example (6-month plan - $49.99):**
- Fee: $0.30 (estimated)
- You receive: $49.69
- **Effective rate: 0.6%** (but conversion loss likely)

---

### 9. Lago (Billing Platform - NOT a Payment Processor)

**⚠️ Important:** Lago is **NOT a payment processor**. It's a billing and metering platform that works **WITH** payment processors.

**How It Works:**
```
User → Lago (billing logic) → Stripe/Adyen (payment processing) → Your Bank
```

**Fees:**
- **Lago:** Platform fee (if premium) + hosting costs
- **Payment Processor:** Still need Stripe/Adyen fees (2.9% + $0.30 or similar)
- **Total:** Lago fee + payment processor fee = **Higher total cost**

**Pros:**
- ✅ Advanced billing features (usage-based, metering)
- ✅ Professional invoicing
- ✅ Real-time usage tracking (15,000 events/second)
- ✅ Complex pricing models
- ✅ Open source option (self-host free)

**Cons:**
- ❌ **Not a payment processor** - still need Stripe/Adyen
- ❌ More complex setup (2 systems to integrate)
- ❌ Higher total cost (pay Lago + payment processor)
- ❌ Overkill for simple fixed pricing

**Best For:** Complex pricing models, usage-based billing, advanced metering needs

**Cost Example (6-month plan - $49.99):**
- Lago fee: ~$50-200/month (platform) + hosting
- Stripe fee: $1.75 (2.9% + $0.30)
- **Total effective rate: 3.5% + Lago monthly fee**

**Recommendation:** ❌ **Not recommended** for MeasureMint's simple fixed pricing. Adds complexity and cost without significant benefit.

**See:** `docs/development/LAGO_BILLING_ANALYSIS.md` for detailed analysis.

---

## 🎯 Recommendation: **Adyen** (if you meet minimum) OR **Stripe** (for easier setup)

### Square vs Stripe vs Adyen

| Feature | Square | Stripe | Adyen |
|---------|--------|--------|-------|
| **Fees** | 2.9% + $0.30 | 2.9% + $0.30 | 1.6-2.8% + $0.12 |
| **Developer Experience** | ⚠️ Moderate | ✅ Excellent | ✅ Good |
| **SaaS Focus** | ⚠️ Limited | ✅ Excellent | ✅ Good |
| **Documentation** | ⚠️ Limited | ✅ Excellent | ✅ Good |
| **Retail/POS** | ✅ Excellent | ⚠️ Limited | ⚠️ Limited |
| **Minimum** | None | None | $120/month |
| **Best For** | Retail businesses | SaaS/Online | High volume |

**For MeasureMint (SaaS):**
- ❌ **Square:** Less suitable - focused on retail, less developer-friendly
- ❌ **Shopify Payments:** Not applicable - requires Shopify store
- ❌ **Payoneer:** Not suitable - not a payment processor, no subscription billing
- ✅ **Stripe:** Best choice - excellent for SaaS, great docs
- ✅ **Adyen:** Good if you meet minimum - lower fees at scale

---

## 🎯 Recommendation: **Stripe** (with optimization)

### Why Stripe?

1. **Best balance** of fees and features
2. **Lowest fees** among full-featured processors (2.9% + $0.30)
3. **Excellent subscription management** built-in
4. **Easy integration** with Next.js
5. **Trusted by users** (high conversion)
6. **Automatic retries** for failed payments
7. **Great documentation**

### Fee Optimization Strategies

#### 1. **Stripe Connect** (if applicable)
- Use if you have multiple products/merchants
- Can reduce fees slightly
- More complex setup

#### 2. **Stripe Billing** (Recommended)
- Built-in subscription management
- Automatic invoice generation
- Handles prorations, upgrades, downgrades
- **No additional fee** beyond transaction fees

#### 3. **Optimize for Lower Fees**
- **ACH Direct Debit** (US only): 0.8% + $0.30 (much lower!)
  - Requires bank account from customer
  - Lower conversion but much lower fees
  - Good for annual plans

#### 4. **Annual Plans Incentive**
- Encourage annual payments (one transaction vs 12)
- Save on transaction fees
- Offer bigger discount to offset your fee savings

#### 5. **Volume Discounts**
- Stripe offers discounts at high volumes:
  - $80k+/month: 2.6% + $0.30
  - $250k+/month: 2.4% + $0.30
  - $1M+/month: 2.2% + $0.30

---

## 💡 Alternative: Hybrid Approach

### Strategy: Offer Multiple Payment Methods

**Primary:** Stripe (credit cards) - 2.9% + $0.30
**Secondary:** ACH Direct Debit (US only) - 0.8% + $0.30

**Implementation:**
- Default to Stripe (higher conversion)
- Offer ACH option for annual plans
- Show savings: "Save on fees with ACH"

**Example:**
```
Annual Plan: $79.99
- Credit Card: $2.62 fee (you get $77.37)
- ACH: $0.94 fee (you get $79.05) - Save $1.68!
```

---

## 📊 Cost Analysis for Your Plans

### Monthly Plan ($9.99)
- **Stripe:** $0.59 fee (2.9% + $0.30) = **5.9% effective rate**
- **You receive:** $9.40
- **Annual cost (12 payments):** $7.08 in fees

### 6-Month Plan ($49.99) ⭐ Recommended
- **Stripe:** $1.75 fee (2.9% + $0.30) = **3.5% effective rate**
- **You receive:** $48.24
- **Annual cost (2 payments):** $3.50 in fees

### Annual Plan ($79.99)
- **Stripe:** $2.62 fee (2.9% + $0.30) = **3.3% effective rate**
- **You receive:** $77.37
- **With ACH:** $0.94 fee = **1.2% effective rate**
- **You receive:** $79.05

**Key Insight:** Longer billing cycles = lower effective fees!

---

## 🚀 Implementation Recommendation

### Phase 1: Start with Stripe
1. **Easiest integration** - best documentation
2. **Lowest fees** for full-featured processor
3. **High conversion rates** - users trust Stripe
4. **Built-in subscription management**

### Phase 2: Add ACH Option (Later)
1. **Offer ACH for annual plans** only
2. **Show fee savings** to users
3. **Lower your costs** on high-value transactions

### Phase 3: Optimize (At Scale)
1. **Negotiate volume discounts** with Stripe
2. **Consider Paddle** if international taxes become complex
3. **Add direct bank** for enterprise customers

---

## 💰 Fee Comparison Table

| Plan | Amount | Stripe Fee | You Receive | Effective % |
|------|--------|------------|-------------|-------------|
| Monthly | $9.99 | $0.59 | $9.40 | 5.9% |
| 6-Month | $49.99 | $1.75 | $48.24 | 3.5% |
| Annual (Card) | $79.99 | $2.62 | $77.37 | 3.3% |
| Annual (ACH) | $79.99 | $0.94 | $79.05 | 1.2% |

**Annual savings with ACH:** $1.68 per customer per year

---

## 🎯 Final Recommendation

### **Use Adyen** (if you meet minimum requirements) OR **Stripe** (for easier setup)

### **Adyen** - Best for Established Businesses

**Use Adyen if:**
- ✅ You have **$4,000+ monthly revenue** (to cover $120 minimum)
- ✅ You process **high transaction volumes**
- ✅ You want **lower fees** (1.6-2.8% + $0.12 vs 2.9% + $0.30)
- ✅ You need **transparent pricing**

**Fees:** ~1.6-2.8% + $0.12 (can be lower than Stripe)
**Minimum:** $120/month
**Best for:** Established businesses with volume

### **Stripe** - Best for Startups

**Use Stripe if:**
- ✅ You're **just starting** (no minimum)
- ✅ You want **simpler integration**
- ✅ You prefer **predictable pricing**
- ✅ You need **quick setup**

**Fees:** 2.9% + $0.30
**Minimum:** None
**Best for:** Startups and small businesses

---

## 💡 Updated Recommendation

### **Use Adyen** for the following reasons (if you meet minimum):

1. **Lowest fees** among full-featured processors (2.9% + $0.30)
2. **Best developer experience** - easy Next.js integration
3. **High conversion rates** - users trust Stripe
4. **Automatic subscription management** - saves time
5. **Volume discounts available** as you grow
6. **Option to add ACH later** for even lower fees

### Fee Optimization Tips:

1. ✅ **Encourage 6-month/annual plans** (lower effective fees)
2. ✅ **Offer ACH option** for annual plans (0.8% vs 2.9%)
3. ✅ **Use Stripe Billing** (no additional fees)
4. ✅ **Negotiate volume discounts** at $80k+/month
5. ✅ **Consider Paddle** only if international tax handling becomes complex

### Expected Fees:
- **6-Month Plan:** 3.5% effective rate (best value for you)
- **Annual Plan:** 3.3% with card, 1.2% with ACH
- **Monthly Plan:** 5.9% effective rate (encourage longer plans!)

---

## 📝 Next Steps

1. **Set up Stripe account** (free to create)
2. **Get API keys** (test and live)
3. **Integrate Stripe Checkout** (we already have placeholder)
4. **Test with Stripe test mode**
5. **Launch with Stripe**
6. **Monitor fees** and optimize
7. **Add ACH option** later for annual plans

---

## 🔗 Resources

- **Stripe Pricing:** https://stripe.com/pricing
- **Stripe Billing:** https://stripe.com/billing
- **Stripe ACH:** https://stripe.com/docs/ach-direct-debit
- **Paddle Pricing:** https://paddle.com/pricing
- **Lemon Squeezy:** https://www.lemonsqueezy.com/pricing

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Status:** ✅ Recommendation: Stripe with ACH option for annual plans

