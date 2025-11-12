/**
 * API Route: Check Unit Availability
 * 
 * POST /api/subscription/check-unit
 * 
 * Checks if user can use a specific unit based on subscription tier
 */

import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request) {
  try {
    const { miro_user_id, unit } = await request.json();

    if (!miro_user_id) {
      return NextResponse.json(
        { error: 'miro_user_id is required' },
        { status: 400 }
      );
    }

    if (!unit) {
      return NextResponse.json(
        { error: 'unit is required' },
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
    let status = 'active';

    if (userResult.rows.length > 0) {
      const user = userResult.rows[0];
      tier = user.subscription_tier;
      status = user.subscription_status;

      // Check if trial expired
      if (tier === 'trial' && user.trial_ends_at) {
        const now = new Date();
        const trialEnd = new Date(user.trial_ends_at);
        if (now >= trialEnd) {
          tier = 'free';
        }
      }

      // Check if premium subscription expired
      if (tier === 'premium' && user.subscription_ends_at) {
        const now = new Date();
        const subscriptionEnd = new Date(user.subscription_ends_at);
        if (now >= subscriptionEnd) {
          tier = 'free';
          status = 'expired';
        }
      }
    }

    // Premium users can use all units
    if (tier === 'premium' && status === 'active') {
      const allUnits = ['ft', 'in', 'yd', 'mi', 'm', 'cm', 'mm', 'km'];
      return NextResponse.json({
        allowed: allUnits.includes(unit),
        tier: 'premium',
        available_units: allUnits,
        message: allUnits.includes(unit) 
          ? 'Unit available' 
          : 'Invalid unit',
      });
    }

    // Free tier and trial users can only use feet
    const canUse = unit === 'ft';
    
    return NextResponse.json({
      allowed: canUse,
      tier: tier,
      available_units: ['ft'],
      message: canUse 
        ? 'Unit available' 
        : 'This unit requires a premium subscription. Free tier is limited to feet (ft) only.',
      upgrade_required: !canUse,
    });

  } catch (error) {
    console.error('Error checking unit availability:', error);
    return NextResponse.json(
      { error: 'Internal server error', allowed: false },
      { status: 500 }
    );
  }
}

