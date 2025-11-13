# Freemium Strategy & Subscription Implementation Guide

**Date:** January 2025  
**Status:** Planning Document - Ready for Implementation

---

## 📊 Executive Summary

This document outlines a comprehensive strategy for implementing a freemium model with premium subscriptions for MeasureMint, including:
- Recommended metrics for freemium/premium cutoff
- Technical implementation approach
- Strategy to avoid Miro Marketplace 30% fee
- Database schema and tracking mechanisms

---

## 🎯 Recommended Freemium Metrics

### Option 1: **Hybrid Approach (RECOMMENDED)**
**Free Tier:**
- ✅ **7-day free trial** from first measurement
- ✅ **50 measurements** total during trial period
- ✅ After trial: Limited to **10 measurements per month**
- ✅ **Units restricted to feet (ft) only** - All other units require premium
- ✅ **All measurements preserved** - Never deleted, even after trial ends

**Premium Tier:**
- ✅ Unlimited measurements
- ✅ **All units available** (Imperial: ft, in, yd, mi | Metric: m, cm, mm, km)
- ✅ Advanced features (export, history, multiple boards)
- ✅ Priority support
- ✅ Team collaboration features

**Why This Works:**
- **7-day trial** gives users enough time to experience value
- **50 measurements** during trial prevents abuse while allowing real usage
- **Monthly limit** after trial creates clear upgrade incentive
- **Measurement count** is a clear, trackable metric that directly correlates with value
- **Unit restriction** creates additional premium value - free users can only use feet, premium gets all units
- **Measurement preservation** maintains user trust - measurements are never deleted, only new ones are restricted

### Option 2: Time-Based Only
**Free Tier:**
- ✅ 7-day free trial from first measurement
- ❌ No usage limits during trial

**Premium Tier:**
- ✅ Unlimited usage after trial

**Pros:** Simple to implement  
**Cons:** Doesn't prevent abuse, less clear value proposition

### Option 3: Usage-Based Only
**Free Tier:**
- ✅ 25 measurements per month (resets monthly)
- ❌ No trial period

**Premium Tier:**
- ✅ Unlimited measurements

**Pros:** Clear usage limits  
**Cons:** No trial period may reduce conversions

---

## 🏆 Final Recommendation: **Hybrid Approach (Option 1)**

**Rationale:**
1. **Trial period** builds trust and demonstrates value
2. **Measurement count** is objective and directly tied to app value
3. **Monthly limit** after trial creates sustainable freemium model
4. **Clear upgrade path** with measurable benefits

---

## 🗄️ Database Schema for User Tracking

### New Tables Required

```sql
-- User subscriptions and usage tracking
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id SERIAL PRIMARY KEY,
  miro_user_id VARCHAR(255) NOT NULL UNIQUE,
  subscription_tier VARCHAR(50) DEFAULT 'free', -- 'free', 'premium', 'trial'
  subscription_status VARCHAR(50) DEFAULT 'active', -- 'active', 'cancelled', 'expired'
  trial_started_at TIMESTAMP WITH TIME ZONE,
  trial_ends_at TIMESTAMP WITH TIME ZONE,
  subscription_started_at TIMESTAMP WITH TIME ZONE,
  subscription_ends_at TIMESTAMP WITH TIME ZONE,
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Track individual measurements for usage limits
CREATE TABLE IF NOT EXISTS user_measurements (
  id SERIAL PRIMARY KEY,
  miro_user_id VARCHAR(255) NOT NULL,
  board_id VARCHAR(255),
  measurement_data JSONB, -- Store measurement details
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Track monthly usage for free tier limits
CREATE TABLE IF NOT EXISTS user_usage_stats (
  id SERIAL PRIMARY KEY,
  miro_user_id VARCHAR(255) NOT NULL,
  month_year VARCHAR(7) NOT NULL, -- Format: '2025-01'
  measurement_count INTEGER DEFAULT 0,
  last_measurement_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(miro_user_id, month_year)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_miro_user_id ON user_subscriptions(miro_user_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_status ON user_subscriptions(subscription_status);
CREATE INDEX IF NOT EXISTS idx_user_measurements_miro_user_id ON user_measurements(miro_user_id);
CREATE INDEX IF NOT EXISTS idx_user_measurements_created_at ON user_measurements(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_usage_stats_miro_user_id ON user_usage_stats(miro_user_id);
CREATE INDEX IF NOT EXISTS idx_user_usage_stats_month_year ON user_usage_stats(month_year);
```

---

## 🔧 Technical Implementation

### 1. User Identification

**Current State:**
- App uses Miro OAuth for authentication
- User ID available via `initMiroAPI()` → `userId`
- Stored in cookies as `miro_tokens`

**Implementation:**
```javascript
// In panel/page.jsx or utility function
import initMiroAPI from '@/utils/initMiroAPI';

async function getOrCreateUserSubscription(miroUserId) {
  // Check if user exists in database
  // If not, create new user with trial status
  // Return subscription status
}
```

### 2. Measurement Tracking

**Where to Track:**
- Location: `src/app/panel/page.jsx` → `finishMeasurement()` function (around line 542)
- Current code already creates measurement objects with timestamps

**Implementation:**
```javascript
// After measurement is created (line 640)
const measurement = {
  id: Date.now(),
  lineId: updatedLine.id,
  distance: actualDistance,
  unit: calibration.unit,
  conversions: conversions,
  timestamp: new Date()
};

// ADD: Track measurement in database
await trackMeasurement(miroUserId, measurement);
```

### 3. Usage Limit Checking

**Before Allowing Measurement:**
```javascript
// Before starting measurement (in startMeasurement or before calibration)
const canMeasure = await checkUsageLimits(miroUserId);
if (!canMeasure.allowed) {
  // Show upgrade modal
  setShowUpgradeModal(true);
  return;
}
```

### 4. Trial Period Tracking

**On First Measurement:**
```javascript
// When user makes first measurement
const userStatus = await getUserStatus(miroUserId);
if (!userStatus.trial_started_at) {
  // Start trial period
  await startTrial(miroUserId);
}
```

---

## 💳 Avoiding Miro Marketplace 30% Fee

### The Problem
Miro Marketplace charges **30% commission** on all in-app purchases and subscriptions processed through their marketplace.

### The Solution: **Direct Subscription Model**

#### Strategy Overview
1. **Keep app in Miro Marketplace** (for discovery and distribution)
2. **Process subscriptions OUTSIDE Miro** (on your own website/payment system)
3. **Link subscriptions to Miro user IDs** (not Miro account IDs)

#### Implementation Approach

**Option A: Website-Based Subscription (RECOMMENDED)**
```
User Flow:
1. User installs MeasureMint from Miro Marketplace (FREE)
2. User uses app, hits free tier limit
3. App shows upgrade prompt with link to measuremint.app/subscribe
4. User subscribes on your website (Stripe/Paddle)
5. User enters Miro User ID to link subscription
6. Subscription status synced to database
7. User continues using app with premium features
```

**Benefits:**
- ✅ No 30% fee to Miro
- ✅ Full control over pricing and billing
- ✅ Can offer annual plans, discounts, etc.
- ✅ Direct customer relationship
- ✅ Can use any payment processor (Stripe, Paddle, etc.)

**Technical Implementation:**
1. Create `/subscribe` page on measuremint.app
2. User enters their Miro User ID (shown in app)
3. Process payment via Stripe
4. Store subscription in database linked to `miro_user_id`
5. App checks subscription status via API

**Option B: License Key Model**
```
User Flow:
1. User subscribes on measuremint.app/subscribe
2. Receives license key via email
3. Enters license key in MeasureMint app
4. App validates key and activates premium
```

**Option C: Email-Based Linking**
```
User Flow:
1. User subscribes on measuremint.app/subscribe
2. User provides email during subscription
3. App requests email in Miro app
4. System matches email to subscription
5. Premium activated
```

---

## 🔐 Security Considerations

### User ID Validation
- Miro User IDs are unique and cannot be easily spoofed
- Validate user ID format before linking subscription
- Add rate limiting to prevent abuse

### Subscription Verification
- Verify subscription status on each app load
- Cache subscription status (with TTL) to reduce API calls
- Implement webhook from Stripe for real-time updates

### API Security
- Use API keys for subscription status checks
- Implement rate limiting
- Validate Miro User ID on all requests

---

## 📈 Implementation Phases

### Phase 1: Tracking Infrastructure (Week 1-2)
- [ ] Create database tables
- [ ] Implement user tracking on first measurement
- [ ] Implement measurement counting
- [ ] Create API endpoints for usage checking

### Phase 2: Free Tier Limits (Week 3)
- [ ] Implement trial period logic
- [ ] Implement monthly measurement limits
- [ ] Create upgrade prompts in UI
- [ ] Add usage dashboard for users

### Phase 3: Subscription System (Week 4-5)
- [ ] Create `/subscribe` page
- [ ] Integrate Stripe payment processing
- [ ] Implement subscription linking (Miro User ID)
- [ ] Create subscription management page

### Phase 4: Premium Features (Week 6)
- [ ] Implement premium-only features
- [ ] Add export functionality
- [ ] Add measurement history
- [ ] Add team collaboration features

### Phase 5: Testing & Launch (Week 7-8)
- [ ] End-to-end testing
- [ ] Payment flow testing
- [ ] Load testing
- [ ] Soft launch to beta users

---

## 💰 Pricing Recommendations

### Suggested Pricing Tiers

**Free Tier:**
- 7-day trial (50 measurements)
- 10 measurements/month after trial
- Basic measurement features
- **Units limited to feet (ft) only**

**Premium Individual:**
- **Monthly:** $9.99/month
- **6-Month:** $49.99 (save 17% - $8.33/month)
- **Annual:** $79.99/year (save 33% - $6.67/month)
- Unlimited measurements
- **All units available** (Imperial: ft, in, yd, mi | Metric: m, cm, mm, km)
- Export measurements
- Measurement history
- Priority support

**Premium Team:**
- **Monthly:** $29.99/month (up to 5 users - $6/user/month)
- **Annual:** $239.99/year (save 33% - $4.80/user/month)
- Everything in Individual
- Team collaboration
- Shared measurement libraries
- Admin dashboard

**Enterprise:**
- Custom pricing
- Unlimited users
- SSO integration
- Custom integrations
- Dedicated support

---

## 📊 Analytics & Metrics to Track

### Key Metrics
1. **Trial Conversion Rate**: % of trial users who convert to paid
2. **Time to Conversion**: Average days from trial start to subscription
3. **Churn Rate**: % of subscribers who cancel
4. **Monthly Recurring Revenue (MRR)**
5. **Average Revenue Per User (ARPU)**
6. **Free Tier Usage**: Measurements per free user
7. **Upgrade Triggers**: What causes users to upgrade

### Tracking Implementation
- Use Vercel Analytics (already installed)
- Add custom events for:
  - Trial started
  - Measurement limit reached
  - Upgrade prompt shown
  - Subscription completed
  - Feature usage

---

## 🚀 Next Steps

1. **Review and approve** this strategy
2. **Set up database tables** (use provided SQL)
3. **Implement tracking** in measurement flow
4. **Create subscription page** on website
5. **Set up Stripe account** and integrate
6. **Build subscription linking** system
7. **Test end-to-end** flow
8. **Launch** freemium model

---

## 📝 Notes

- **Miro Marketplace Compliance**: This approach is compliant as long as:
  - App remains free to install from marketplace
  - Subscription is optional and processed externally
  - No in-app purchases through Miro's system

- **User Experience**: Make subscription linking as seamless as possible
  - Consider auto-detecting Miro User ID
  - Provide clear instructions
  - Offer support for linking issues

- **Migration Strategy**: For existing users:
  - Grandfather existing users with extended trial
  - Or provide 30-day free premium period
  - Communicate changes clearly

---

## 🔗 Related Files

- Database setup: `setup-database.js`
- Measurement tracking: `src/app/panel/page.jsx`
- API routes: `src/app/api/`
- User utilities: `src/utils/initMiroAPI.js`

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Author:** MeasureMint Development Team

