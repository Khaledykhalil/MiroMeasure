/**
 * API Route: Get or Create User Subscription
 * 
 * GET /api/subscription/status
 * POST /api/subscription/status
 * 
 * Returns user's subscription status and creates record if doesn't exist
 */

import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request) {
  try {
    const { miro_user_id } = await request.json();

    if (!miro_user_id) {
      return NextResponse.json(
        { error: 'miro_user_id is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await sql`
      SELECT * FROM user_subscriptions 
      WHERE miro_user_id = ${miro_user_id}
      LIMIT 1
    `;

    if (existingUser.rows.length > 0) {
      const user = existingUser.rows[0];
      
      // Check if trial has expired
      let tier = user.subscription_tier;
      let status = user.subscription_status;
      
      if (tier === 'trial' && user.trial_ends_at) {
        const now = new Date();
        const trialEnd = new Date(user.trial_ends_at);
        
        if (now >= trialEnd) {
          // Trial expired, downgrade to free
          tier = 'free';
          await sql`
            UPDATE user_subscriptions
            SET subscription_tier = 'free',
                subscription_status = 'active',
                updated_at = NOW()
            WHERE miro_user_id = ${miro_user_id}
          `;
        }
      }

      // Check if premium subscription has expired
      if (tier === 'premium' && user.subscription_ends_at) {
        const now = new Date();
        const subscriptionEnd = new Date(user.subscription_ends_at);
        
        if (now >= subscriptionEnd) {
          // Subscription expired
          tier = 'free';
          status = 'expired';
          await sql`
            UPDATE user_subscriptions
            SET subscription_tier = 'free',
                subscription_status = 'expired',
                updated_at = NOW()
            WHERE miro_user_id = ${miro_user_id}
          `;
        }
      }

      // Determine available units based on tier
      const availableUnits = tier === 'premium' && status === 'active'
        ? ['ft', 'in', 'yd', 'mi', 'm', 'cm', 'mm', 'km']
        : ['ft']; // Free tier and trial limited to feet only

      return NextResponse.json({
        tier: tier,
        status: status,
        trial_started_at: user.trial_started_at,
        trial_ends_at: user.trial_ends_at,
        subscription_started_at: user.subscription_started_at,
        subscription_ends_at: user.subscription_ends_at,
        can_measure: tier === 'premium' || tier === 'trial',
        available_units: availableUnits,
      });
    }

    // User doesn't exist - will be created on first measurement
    return NextResponse.json({
      tier: 'free',
      status: 'active',
      trial_started_at: null,
      trial_ends_at: null,
      can_measure: true,
      is_new_user: true,
      available_units: ['ft'], // New users start with feet only
    });

  } catch (error) {
    console.error('Error getting subscription status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  return POST(request);
}

