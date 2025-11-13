/**
 * Subscription and Usage Tracking Utilities
 * 
 * This module handles:
 * - User subscription status checking
 * - Trial period management
 * - Usage limit enforcement
 * - Measurement tracking
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Get or create user subscription record
 * @param {string} miroUserId - Miro user ID
 * @returns {Promise<Object>} User subscription status
 */
export async function getOrCreateUserSubscription(miroUserId) {
  try {
    const response = await fetch(`${API_BASE_URL}/subscription/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ miro_user_id: miroUserId }),
    });

    if (!response.ok) {
      throw new Error('Failed to get user subscription');
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting user subscription:', error);
    // Return default free tier on error
    return {
      tier: 'free',
      status: 'active',
      trial_started_at: null,
      trial_ends_at: null,
      can_measure: true,
    };
  }
}

/**
 * Check if user can make measurements based on their subscription tier
 * @param {string} miroUserId - Miro user ID
 * @returns {Promise<Object>} Usage check result
 */
export async function checkUsageLimits(miroUserId) {
  try {
    const response = await fetch(`${API_BASE_URL}/subscription/check-usage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ miro_user_id: miroUserId }),
    });

    if (!response.ok) {
      throw new Error('Failed to check usage limits');
    }

    const result = await response.json();
    return {
      allowed: result.allowed,
      reason: result.reason || null,
      remaining: result.remaining || null,
      limit: result.limit || null,
      tier: result.tier || 'free',
    };
  } catch (error) {
    console.error('Error checking usage limits:', error);
    // Allow measurement on error to avoid blocking users
    return {
      allowed: true,
      reason: 'error',
      tier: 'free',
    };
  }
}

/**
 * Track a measurement for usage counting
 * @param {string} miroUserId - Miro user ID
 * @param {string} boardId - Miro board ID (optional)
 * @param {Object} measurementData - Measurement details
 * @returns {Promise<Object>} Tracking result
 */
export async function trackMeasurement(miroUserId, boardId = null, measurementData = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}/subscription/track-measurement`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        miro_user_id: miroUserId,
        board_id: boardId,
        measurement_data: measurementData,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to track measurement');
    }

    return await response.json();
  } catch (error) {
    console.error('Error tracking measurement:', error);
    // Don't throw - tracking failures shouldn't block measurements
    return { success: false, error: error.message };
  }
}

/**
 * Start trial period for new user
 * @param {string} miroUserId - Miro user ID
 * @returns {Promise<Object>} Trial status
 */
export async function startTrial(miroUserId) {
  try {
    const response = await fetch(`${API_BASE_URL}/subscription/start-trial`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ miro_user_id: miroUserId }),
    });

    if (!response.ok) {
      throw new Error('Failed to start trial');
    }

    return await response.json();
  } catch (error) {
    console.error('Error starting trial:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get user's usage statistics
 * @param {string} miroUserId - Miro user ID
 * @returns {Promise<Object>} Usage statistics
 */
export async function getUserUsageStats(miroUserId) {
  try {
    const response = await fetch(`${API_BASE_URL}/subscription/usage-stats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ miro_user_id: miroUserId }),
    });

    if (!response.ok) {
      throw new Error('Failed to get usage stats');
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting usage stats:', error);
    return {
      current_month_count: 0,
      trial_measurements: 0,
      tier: 'free',
    };
  }
}

/**
 * Check if user is in trial period
 * @param {Object} subscription - Subscription object
 * @returns {boolean} True if in trial
 */
export function isInTrial(subscription) {
  if (!subscription.trial_started_at || !subscription.trial_ends_at) {
    return false;
  }

  const now = new Date();
  const trialEnd = new Date(subscription.trial_ends_at);
  return now < trialEnd;
}

/**
 * Check if user has premium subscription
 * @param {Object} subscription - Subscription object
 * @returns {boolean} True if premium
 */
export function isPremium(subscription) {
  return subscription.tier === 'premium' && subscription.status === 'active';
}

/**
 * Check if user can use a specific unit
 * Free tier users can only use 'ft' (feet)
 * Premium users can use all units
 * @param {Object} subscription - Subscription object
 * @param {string} unit - Unit to check ('ft', 'in', 'yd', 'mi', 'm', 'cm', 'mm', 'km')
 * @returns {boolean} True if user can use this unit
 */
export function canUseUnit(subscription, unit) {
  if (!subscription) {
    // Default to free tier if no subscription
    return unit === 'ft';
  }

  const tier = subscription.tier || 'free';
  
  // Premium users can use all units
  if (tier === 'premium' && subscription.status === 'active') {
    return true;
  }

  // Free tier and trial users can only use feet
  return unit === 'ft';
}

/**
 * Get available units for user based on subscription tier
 * @param {Object} subscription - Subscription object
 * @returns {Array<string>} Array of available unit codes
 */
export function getAvailableUnits(subscription) {
  if (!subscription) {
    return ['ft']; // Default to free tier
  }

  const tier = subscription.tier || 'free';
  
  // Premium users get all units
  if (tier === 'premium' && subscription.status === 'active') {
    return ['ft', 'in', 'yd', 'mi', 'm', 'cm', 'mm', 'km'];
  }

  // Free tier and trial users only get feet
  return ['ft'];
}

/**
 * Get days remaining in trial
 * @param {Object} subscription - Subscription object
 * @returns {number} Days remaining (0 if not in trial)
 */
export function getTrialDaysRemaining(subscription) {
  if (!isInTrial(subscription)) {
    return 0;
  }

  const now = new Date();
  const trialEnd = new Date(subscription.trial_ends_at);
  const diff = trialEnd - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

