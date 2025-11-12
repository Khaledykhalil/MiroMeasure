# Freemium Strategy Summary

## Quick Answer to Your Questions

### 1. What metric to track?

**Recommended: Hybrid Approach**
- **7-day free trial** from first measurement
- **50 measurements** during trial period
- **10 measurements per month** after trial (free tier)
- **Units restricted to feet (ft) only** - All other units require premium
- **All measurements preserved** - Never deleted, even after trial ends

**Why this works:**
- Trial period gives users time to experience value
- Measurement count is objective and directly tied to app value
- Monthly limit creates clear upgrade incentive
- Prevents abuse while allowing real usage
- **Unit restriction adds premium value** - free users limited to feet, premium gets all 8 units
- **Measurement preservation maintains trust** - users keep their work, only new measurements are restricted

### 2. How to track user usage?

**Technical Implementation:**
1. **Database Tables**: Created 3 new tables:
   - `user_subscriptions` - Tracks subscription tier, trial dates, Stripe IDs
   - `user_measurements` - Records each measurement with timestamp
   - `user_usage_stats` - Monthly aggregated counts for free tier limits

2. **Tracking Points**:
   - **First measurement**: Automatically starts 7-day trial
   - **Each measurement**: Tracked in database with timestamp
   - **Before measurement**: Check usage limits via API
   - **Monthly reset**: Usage stats reset each month for free tier

3. **API Endpoints Created**:
   - `/api/subscription/status` - Get/create user subscription
   - `/api/subscription/check-usage` - Check if user can measure
   - `/api/subscription/track-measurement` - Record measurement
   - `/api/subscription/usage-stats` - Get usage statistics

4. **Integration**: Add tracking to `finishMeasurement()` function in `panel/page.jsx`

### 3. How to avoid Miro Marketplace 30% fee?

**Solution: Direct Subscription Model**

**Strategy:**
1. Keep app **free to install** from Miro Marketplace (compliant)
2. Process subscriptions **on your website** (measuremint.app/subscribe)
3. Link subscriptions to **Miro User ID** (not Miro account)
4. App checks subscription status via your API

**User Flow:**
```
1. User installs MeasureMint from Miro Marketplace (FREE)
2. User makes measurements, hits free tier limit
3. App shows upgrade prompt with link to measuremint.app/subscribe
4. User subscribes on your website using Stripe
5. User enters their Miro User ID to link subscription
6. Subscription synced to database
7. User continues with premium features
```

**Why this works:**
- ✅ No 30% fee to Miro (subscription processed outside marketplace)
- ✅ Compliant with Miro policies (app remains free to install)
- ✅ Full control over pricing, billing, discounts
- ✅ Direct customer relationship
- ✅ Can use any payment processor (Stripe, Paddle, etc.)

**Technical Details:**
- User subscribes on `measuremint.app/subscribe` page
- User provides their Miro User ID (shown in app)
- Payment processed via Stripe
- Subscription stored in database with `miro_user_id`
- App checks subscription status on each load/measurement

## Files Created

### Documentation
- `docs/development/FREEMIUM_STRATEGY.md` - Complete strategy document
- `docs/development/SUBSCRIPTION_IMPLEMENTATION_EXAMPLE.md` - Code examples
- `docs/development/SUBSCRIPTION_STRATEGY_SUMMARY.md` - This file

### Database
- `sql/create-subscription-tables.sql` - Database schema

### Code
- `src/utils/subscription.js` - Subscription utility functions (includes unit checking)
- `src/app/api/subscription/status/route.js` - Get subscription status
- `src/app/api/subscription/check-usage/route.js` - Check usage limits
- `src/app/api/subscription/check-unit/route.js` - Check if user can use specific unit
- `src/app/api/subscription/track-measurement/route.js` - Track measurements
- `src/app/api/subscription/start-trial/route.js` - Start trial
- `src/app/api/subscription/usage-stats/route.js` - Get usage stats

## Next Steps (When Ready to Implement)

1. **Set up database**: Run `sql/create-subscription-tables.sql`
2. **Test API endpoints**: Verify all endpoints work
3. **Integrate tracking**: Add to `panel/page.jsx` (see implementation example)
4. **Create subscription page**: Build `measuremint.app/subscribe`
5. **Set up Stripe**: Create account and integrate payment processing
6. **Test end-to-end**: Full flow from trial to subscription
7. **Launch**: Soft launch to beta users first

## Pricing Recommendations

### Individual Plans
- **Monthly**: $9.99/month
- **6-Month**: $49.99 (save 17% - $8.33/month)
- **Annual**: $79.99/year (save 33% - $6.67/month) ⭐ **Best Value**

### Team Plans
- **Monthly**: $29.99/month (up to 5 users)
- **Annual**: $239.99/year (save 33% - $4.80/user/month)

### Enterprise
- Custom pricing based on team size

**All premium plans include:**
- Unlimited measurements
- All 8 units available (Imperial & Metric)
- Export measurements
- Measurement history
- Priority support

**See `docs/development/PRICING_STRATEGY.md` for detailed pricing rationale**

## Key Benefits

1. **No Miro Marketplace Fee**: Process subscriptions directly
2. **Clear Value Proposition**: Trial + usage limits create upgrade incentive
3. **Scalable**: Database schema supports growth
4. **Compliant**: Follows Miro Marketplace guidelines
5. **Flexible**: Easy to adjust limits and pricing
6. **User Trust**: Measurements are never deleted - preserves user work and maintains trust

## Questions?

All implementation details are in:
- `docs/development/FREEMIUM_STRATEGY.md` - Full strategy
- `docs/development/PRICING_STRATEGY.md` - **Detailed pricing rationale and discount tiers**
- `docs/development/PAYMENT_PROCESSOR_COMPARISON.md` - **Payment processor comparison & fee optimization**
- `docs/development/PADDLE_SETUP.md` - **Paddle payment integration setup guide**
- `docs/development/SQUARE_ANALYSIS.md` - **Square payment processing analysis**
- `docs/development/SHOPIFY_PAYMENTS_ANALYSIS.md` - **Shopify Payments analysis (Shopify stores only)**
- `docs/development/PAYONEER_ANALYSIS.md` - **Payoneer analysis (not a payment processor)**
- `docs/development/LAGO_BILLING_ANALYSIS.md` - **Lago billing platform analysis (not a payment processor)**
- `docs/development/CONVERSION_FUNNEL_STRATEGY.md` - **6-month plan conversion funnel (Gigerenzer-based)**
- `docs/development/SUBSCRIPTION_IMPLEMENTATION_EXAMPLE.md` - Code examples
- `docs/development/TRIAL_EXPIRATION_STRATEGY.md` - **Why measurements should NOT be deleted**

