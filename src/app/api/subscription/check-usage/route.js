/**
 * API Route: Check Usage Limits
 * 
 * POST /api/subscription/check-usage
 * 
 * Checks if user can make measurements based on subscription tier and usage
 */

import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// Configuration constants
const TRIAL_DURATION_DAYS = 7;
const TRIAL_MEASUREMENT_LIMIT = 50;
const FREE_TIER_MONTHLY_LIMIT = 10;

export async function POST(request) {
  try {
    const { miro_user_id } = await request.json();

    if (!miro_user_id) {
      return NextResponse.json(
        { error: 'miro_user_id is required' },
        { status: 400 }
      );
    }

    // Get user subscription
    const userResult = await sql`
      SELECT * FROM user_subscriptions 
      WHERE miro_user_id = ${miro_user_id}
      LIMIT 1
    `;

    let tier = 'free';
    let trialStartedAt = null;
    let trialEndsAt = null;

    if (userResult.rows.length > 0) {
      const user = userResult.rows[0];
      tier = user.subscription_tier;
      trialStartedAt = user.trial_started_at;
      trialEndsAt = user.trial_ends_at;

      // Check if trial expired
      if (tier === 'trial' && trialEndsAt) {
        const now = new Date();
        const trialEnd = new Date(trialEndsAt);
        if (now >= trialEnd) {
          tier = 'free';
        }
      }
    }

    // Premium users have unlimited measurements
    if (tier === 'premium') {
      return NextResponse.json({
        allowed: true,
        reason: 'premium',
        tier: 'premium',
        remaining: 'unlimited',
        limit: 'unlimited',
        available_units: ['ft', 'in', 'yd', 'mi', 'm', 'cm', 'mm', 'km'], // All units for premium
      });
    }

    // Check if in trial period
    if (tier === 'trial' && trialStartedAt && trialEndsAt) {
      const now = new Date();
      const trialStart = new Date(trialStartedAt);
      const trialEnd = new Date(trialEndsAt);

      if (now >= trialEnd) {
        // Trial expired, check free tier limits
        tier = 'free';
      } else {
        // In trial - check trial measurement limit
        const trialMeasurements = await sql`
          SELECT COUNT(*) as count
          FROM user_measurements
          WHERE miro_user_id = ${miro_user_id}
            AND created_at >= ${trialStart}
            AND created_at <= ${trialEnd}
        `;

        const count = parseInt(trialMeasurements.rows[0]?.count || 0);

        if (count >= TRIAL_MEASUREMENT_LIMIT) {
          return NextResponse.json({
            allowed: false,
            reason: 'trial_limit_reached',
            tier: 'trial',
            remaining: 0,
            limit: TRIAL_MEASUREMENT_LIMIT,
            message: `You've used all ${TRIAL_MEASUREMENT_LIMIT} measurements in your trial. Upgrade to premium for unlimited measurements.`,
          });
        }

        return NextResponse.json({
          allowed: true,
          reason: 'trial',
          tier: 'trial',
          remaining: TRIAL_MEASUREMENT_LIMIT - count,
          limit: TRIAL_MEASUREMENT_LIMIT,
          available_units: ['ft'], // Trial users also limited to feet only
        });
      }
    }

    // Free tier - check monthly limit
    const now = new Date();
    const monthYear = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    // Get or create usage stats for this month
    const usageResult = await sql`
      SELECT measurement_count
      FROM user_usage_stats
      WHERE miro_user_id = ${miro_user_id}
        AND month_year = ${monthYear}
      LIMIT 1
    `;

    const currentCount = usageResult.rows.length > 0 
      ? parseInt(usageResult.rows[0].measurement_count || 0)
      : 0;

    if (currentCount >= FREE_TIER_MONTHLY_LIMIT) {
      return NextResponse.json({
        allowed: false,
        reason: 'monthly_limit_reached',
        tier: 'free',
        remaining: 0,
        limit: FREE_TIER_MONTHLY_LIMIT,
        message: `You've reached your monthly limit of ${FREE_TIER_MONTHLY_LIMIT} measurements. Upgrade to premium for unlimited measurements.`,
      });
    }

    return NextResponse.json({
      allowed: true,
      reason: 'free_tier',
      tier: 'free',
      remaining: FREE_TIER_MONTHLY_LIMIT - currentCount,
      limit: FREE_TIER_MONTHLY_LIMIT,
      available_units: ['ft'], // Free tier limited to feet only
    });

  } catch (error) {
    console.error('Error checking usage limits:', error);
    return NextResponse.json(
      { error: 'Internal server error', allowed: true }, // Allow on error
      { status: 500 }
    );
  }
}

