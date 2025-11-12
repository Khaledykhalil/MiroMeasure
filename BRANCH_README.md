# Feature Branch: Freemium Strategy

This branch contains planning documents and implementation code for a future freemium subscription model.

## 📋 What's Included

### Strategy Documents
- **`docs/development/FREEMIUM_STRATEGY.md`** - Complete freemium strategy with recommendations
- **`docs/development/SUBSCRIPTION_STRATEGY_SUMMARY.md`** - Quick summary of answers to your questions
- **`docs/development/SUBSCRIPTION_IMPLEMENTATION_EXAMPLE.md`** - Code examples for integration

### Database Schema
- **`sql/create-subscription-tables.sql`** - SQL script to create subscription tracking tables

### Implementation Code (Ready for Testing)
- **`src/utils/subscription.js`** - Utility functions for subscription management
- **`src/app/api/subscription/status/route.js`** - Get/create user subscription
- **`src/app/api/subscription/check-usage/route.js`** - Check usage limits
- **`src/app/api/subscription/track-measurement/route.js`** - Track measurements
- **`src/app/api/subscription/start-trial/route.js`** - Start trial period
- **`src/app/api/subscription/usage-stats/route.js`** - Get usage statistics

## 🎯 Key Recommendations

### Freemium Model
- **7-day free trial** from first measurement
- **50 measurements** during trial
- **10 measurements/month** after trial (free tier)
- **Unlimited** for premium subscribers

### Avoiding Miro Marketplace 30% Fee
- Process subscriptions on your website (measuremint.app/subscribe)
- Link subscriptions to Miro User ID
- Keep app free to install from marketplace (compliant)
- Use Stripe or similar for payments

## 🚀 Status

**Current Status:** Planning/Testing Branch - Not Integrated

This code is ready for testing but **not yet integrated** into the main app. When ready to implement:

1. Review the strategy documents
2. Test the API endpoints
3. Integrate tracking into `panel/page.jsx`
4. Create subscription page on website
5. Set up Stripe integration

## 📖 Quick Start

1. Read `docs/development/SUBSCRIPTION_STRATEGY_SUMMARY.md` for quick answers
2. Review `docs/development/FREEMIUM_STRATEGY.md` for full details
3. See `docs/development/SUBSCRIPTION_IMPLEMENTATION_EXAMPLE.md` for code examples

## ⚠️ Note

This is a **planning/testing branch**. The code is functional but not yet integrated into the main application. All changes are isolated to this branch for safe testing.

