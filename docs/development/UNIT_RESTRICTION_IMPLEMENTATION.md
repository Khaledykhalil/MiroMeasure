# Unit Restriction Implementation Guide

## Overview

Free tier and trial users are restricted to **feet (ft) only**. Premium users have access to all 8 units (ft, in, yd, mi, m, cm, mm, km).

## Implementation Details

### 1. API Endpoints

#### Check Unit Availability
**Endpoint:** `POST /api/subscription/check-unit`

**Request:**
```json
{
  "miro_user_id": "user123",
  "unit": "in"
}
```

**Response (Free/Trial User):**
```json
{
  "allowed": false,
  "tier": "free",
  "available_units": ["ft"],
  "message": "This unit requires a premium subscription. Free tier is limited to feet (ft) only.",
  "upgrade_required": true
}
```

**Response (Premium User):**
```json
{
  "allowed": true,
  "tier": "premium",
  "available_units": ["ft", "in", "yd", "mi", "m", "cm", "mm", "km"],
  "message": "Unit available"
}
```

### 2. Utility Functions

#### `canUseUnit(subscription, unit)`
Checks if a user can use a specific unit.

```javascript
import { canUseUnit } from '@/utils/subscription';

const subscription = await getOrCreateUserSubscription(userId);
const canUseInches = canUseUnit(subscription, 'in'); // false for free tier
const canUseFeet = canUseUnit(subscription, 'ft'); // true for all tiers
```

#### `getAvailableUnits(subscription)`
Returns array of available units for the user.

```javascript
import { getAvailableUnits } from '@/utils/subscription';

const subscription = await getOrCreateUserSubscription(userId);
const availableUnits = getAvailableUnits(subscription);
// Free tier: ['ft']
// Premium: ['ft', 'in', 'yd', 'mi', 'm', 'cm', 'mm', 'km']
```

### 3. UI Integration

#### Unit Selection Modal

In `src/app/panel/page.jsx`, update the unit selection buttons (around line 3414-3486):

```javascript
// Add state for subscription
const [subscriptionStatus, setSubscriptionStatus] = useState(null);

// On component mount, get subscription status
useEffect(() => {
  async function loadSubscription() {
    const { userId } = initMiroAPI();
    if (userId) {
      const status = await getOrCreateUserSubscription(userId);
      setSubscriptionStatus(status);
    }
  }
  loadSubscription();
}, []);

// Update unit button click handlers
const handleUnitClick = async (unit) => {
  const { userId } = initMiroAPI();
  
  // Check if user can use this unit
  const canUse = canUseUnit(subscriptionStatus, unit);
  
  if (!canUse) {
    // Show upgrade modal
    setShowUpgradeModal(true);
    setUpgradeReason('unit_restriction');
    return;
  }
  
  // Allow unit selection
  setCalibrationUnit(unit);
};

// In the unit grid, update buttons:
<div style={styles.unitGrid}>
  {['ft', 'in', 'yd', 'mi', 'm', 'cm', 'mm', 'km'].map(unit => {
    const isAvailable = canUseUnit(subscriptionStatus, unit);
    const isSelected = calibrationUnit === unit;
    
    return (
      <button
        key={unit}
        onClick={() => handleUnitClick(unit)}
        disabled={!isAvailable}
        style={{
          ...styles.unitGridBtn,
          ...(isSelected ? styles.unitGridBtnActive : {}),
          ...(!isAvailable ? { opacity: 0.5, cursor: 'not-allowed' } : {}),
        }}
        title={!isAvailable ? 'Premium feature - Upgrade to unlock' : ''}
      >
        {unit === 'ft' ? 'Feet' : 
         unit === 'in' ? 'Inches' :
         unit === 'yd' ? 'Yards' :
         unit === 'mi' ? 'Miles' :
         unit === 'm' ? 'Meters' :
         unit === 'cm' ? 'Centimeters' :
         unit === 'mm' ? 'Millimeters' :
         unit === 'km' ? 'Kilometers' : unit}
        {!isAvailable && <span style={{fontSize: '10px', marginLeft: '4px'}}>🔒</span>}
      </button>
    );
  })}
</div>
```

### 4. Upgrade Modal for Unit Restriction

Update the upgrade modal to handle unit restrictions:

```javascript
// In UpgradeModal component
const getMessage = () => {
  if (reason === 'unit_restriction') {
    return 'This unit requires a premium subscription. Free tier is limited to feet (ft) only.';
  }
  if (reason === 'trial_limit_reached') {
    return `You've used all ${limit} measurements in your trial.`;
  }
  if (reason === 'monthly_limit_reached') {
    return `You've reached your monthly limit of ${limit} measurements.`;
  }
  return 'Upgrade to premium for unlimited measurements and all units.';
};

// Add to feature list:
<div className="flex items-center gap-2">
  <span className="text-green-500">✓</span>
  <span>All 8 units (Imperial & Metric)</span>
</div>
```

### 5. Validation on Calibration

Add validation when user tries to calibrate with a restricted unit:

```javascript
const handleCalibrationSubmit = async () => {
  // Check unit availability before allowing calibration
  const { userId } = initMiroAPI();
  const canUse = canUseUnit(subscriptionStatus, calibrationUnit);
  
  if (!canUse) {
    await showAlert(
      'This unit requires a premium subscription. Free tier is limited to feet (ft) only.',
      'Unit Restricted'
    );
    // Reset to feet
    setCalibrationUnit('ft');
    return;
  }
  
  // Proceed with calibration...
};
```

## Testing Checklist

- [ ] Free tier users can only select feet (ft)
- [ ] Free tier users see locked icons on other units
- [ ] Free tier users see upgrade prompt when clicking restricted units
- [ ] Trial users can only select feet (ft)
- [ ] Premium users can select all 8 units
- [ ] Unit restriction persists across sessions
- [ ] Upgrade modal shows correct message for unit restrictions
- [ ] Calibration validation prevents using restricted units

## User Experience

### Free/Trial Users
- See all 8 unit buttons
- Feet (ft) button is enabled and highlighted
- Other 7 units are grayed out with lock icon
- Clicking restricted unit shows upgrade modal
- Clear messaging: "Free tier limited to feet (ft) only"

### Premium Users
- All 8 unit buttons fully enabled
- No restrictions or lock icons
- Full access to all units

## Benefits

1. **Clear Value Proposition**: Users immediately see what they're missing
2. **Upgrade Incentive**: Visual indication of premium features
3. **Non-Intrusive**: Doesn't block core functionality (feet still works)
4. **Professional**: Common freemium pattern users understand

