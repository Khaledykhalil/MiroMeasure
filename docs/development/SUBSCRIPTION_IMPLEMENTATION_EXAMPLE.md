# Subscription Implementation Example

This document shows how to integrate subscription tracking into the existing measurement flow.

## Integration Points

### 1. In `src/app/panel/page.jsx`

Add subscription checking and tracking to the measurement flow:

```javascript
// Add imports at top of file
import { 
  checkUsageLimits, 
  trackMeasurement, 
  getOrCreateUserSubscription,
  getUserUsageStats 
} from '@/utils/subscription';
import initMiroAPI from '@/utils/initMiroAPI';

// In the component, add state for subscription
const [subscriptionStatus, setSubscriptionStatus] = useState(null);
const [showUpgradeModal, setShowUpgradeModal] = useState(false);
const [usageStats, setUsageStats] = useState(null);

// On component mount, check subscription status
useEffect(() => {
  async function initSubscription() {
    try {
      const { userId } = initMiroAPI();
      if (userId) {
        const status = await getOrCreateUserSubscription(userId);
        setSubscriptionStatus(status);
        
        const stats = await getUserUsageStats(userId);
        setUsageStats(stats);
      }
    } catch (error) {
      console.error('Error initializing subscription:', error);
    }
  }
  initSubscription();
}, []);

// Modify startMeasurement to check usage limits
const startMeasurement = async () => {
  try {
    const { userId } = initMiroAPI();
    
    // Check usage limits before allowing measurement
    const usageCheck = await checkUsageLimits(userId);
    
    if (!usageCheck.allowed) {
      // Show upgrade modal
      setShowUpgradeModal(true);
      return;
    }
    
    // Continue with existing measurement logic...
    // ... rest of startMeasurement code
  } catch (error) {
    console.error('Error starting measurement:', error);
  }
};

// Modify finishMeasurement to track measurement
const finishMeasurement = async () => {
  // ... existing measurement calculation code ...
  
  // After measurement is created (around line 640)
  const measurement = {
    id: Date.now(),
    lineId: updatedLine.id,
    distance: actualDistance,
    unit: calibration.unit,
    conversions: conversions,
    timestamp: new Date()
  };

  setMeasurements([...measurements, measurement]);
  
  // ADD: Track measurement in database
  try {
    const { userId } = initMiroAPI();
    const boardId = await window.miro.board.getInfo().then(info => info.id);
    
    await trackMeasurement(userId, boardId, {
      distance: actualDistance,
      unit: calibration.unit,
      conversions: conversions,
    });
    
    // Refresh usage stats
    const stats = await getUserUsageStats(userId);
    setUsageStats(stats);
  } catch (error) {
    console.error('Error tracking measurement:', error);
    // Don't block measurement on tracking error
  }
  
  // ... rest of finishMeasurement code
};

// ADD: Check unit availability before allowing unit selection
const handleUnitSelection = async (unit) => {
  try {
    const { userId } = initMiroAPI();
    
    // Check if user can use this unit
    const response = await fetch('/api/subscription/check-unit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        miro_user_id: userId, 
        unit: unit 
      }),
    });
    
    const result = await response.json();
    
    if (!result.allowed) {
      // Show upgrade modal
      setShowUpgradeModal(true);
      setUpgradeReason('unit_restriction');
      return;
    }
    
    // User can use this unit, proceed with selection
    setCalibrationUnit(unit);
  } catch (error) {
    console.error('Error checking unit:', error);
    // Default to feet on error
    if (unit !== 'ft') {
      setShowUpgradeModal(true);
      setUpgradeReason('unit_restriction');
      return;
    }
    setCalibrationUnit(unit);
  }
};
```

### 2. Add Upgrade Modal Component

Create a new component for upgrade prompts:

```javascript
// src/components/UpgradeModal.jsx
import { useState } from 'react';

export default function UpgradeModal({ 
  isOpen, 
  onClose, 
  reason, 
  remaining, 
  limit 
}) {
  if (!isOpen) return null;

  const getMessage = () => {
    if (reason === 'trial_limit_reached') {
      return `You've used all ${limit} measurements in your trial.`;
    }
    if (reason === 'monthly_limit_reached') {
      return `You've reached your monthly limit of ${limit} measurements.`;
    }
    return 'Upgrade to premium for unlimited measurements.';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md mx-4">
        <h2 className="text-2xl font-bold mb-4">Upgrade to Premium</h2>
        <p className="text-gray-700 mb-6">{getMessage()}</p>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>Unlimited measurements</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>Export measurements</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>Measurement history</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>Priority support</span>
          </div>
        </div>

        <div className="flex gap-4">
          <a
            href="https://measuremint.app/subscribe"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#10bb82] text-white px-6 py-3 rounded-md text-center font-medium hover:bg-[#0ea574] transition-colors"
          >
            Subscribe Now
          </a>
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:border-gray-400 transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 3. Add Usage Display Component

Show users their current usage:

```javascript
// src/components/UsageDisplay.jsx
export default function UsageDisplay({ usageStats, subscriptionStatus }) {
  if (!usageStats || !subscriptionStatus) return null;

  const isPremium = subscriptionStatus.tier === 'premium';
  const isTrial = subscriptionStatus.tier === 'trial';

  if (isPremium) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-green-500 font-bold">Premium</span>
          <span className="text-sm text-gray-600">Unlimited measurements</span>
        </div>
      </div>
    );
  }

  if (isTrial) {
    const daysRemaining = Math.ceil(
      (new Date(subscriptionStatus.trial_ends_at) - new Date()) / (1000 * 60 * 60 * 24)
    );
    
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-blue-600 font-bold">Trial Period</span>
            <span className="text-sm text-gray-600 ml-2">
              {daysRemaining} days remaining
            </span>
          </div>
          <div className="text-sm text-gray-600">
            {usageStats.trial_measurements || 0} / 50 measurements used
          </div>
        </div>
      </div>
    );
  }

  // Free tier
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <span className="text-yellow-700 font-bold">Free Tier</span>
        <span className="text-sm text-gray-600">
          {usageStats.current_month_count || 0} / 10 measurements this month
        </span>
      </div>
    </div>
  );
}
```

## Testing Checklist

- [ ] New user gets trial automatically on first measurement
- [ ] Trial users can make up to 50 measurements
- [ ] Trial expiration downgrades to free tier
- [ ] Free tier users limited to 10 measurements/month
- [ ] Premium users have unlimited measurements
- [ ] **Free tier users can only select feet (ft) unit**
- [ ] **Trial users can only select feet (ft) unit**
- [ ] **Premium users can select all units (ft, in, yd, mi, m, cm, mm, km)**
- [ ] **Unit selection shows upgrade prompt for non-premium users**
- [ ] Usage stats update correctly
- [ ] Upgrade modal shows at appropriate times
- [ ] Subscription linking works correctly

## Environment Variables Needed

```env
# Database
POSTGRES_URL=your_postgres_url

# API (if using separate domain)
NEXT_PUBLIC_API_URL=https://measuremint.app/api
```

## Next Steps

1. Set up database tables using `sql/create-subscription-tables.sql`
2. Test API endpoints
3. Integrate into panel page
4. Create subscription page on website
5. Set up Stripe integration
6. Test end-to-end flow

