/**
 * API Route: Start Trial
 * 
 * POST /api/subscription/start-trial
 * 
 * Manually starts trial period for a user
 */

import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

const TRIAL_DURATION_DAYS = 7;

export async function POST(request) {
  try {
    const { miro_user_id } = await request.json();

    if (!miro_user_id) {
      return NextResponse.json(
        { error: 'miro_user_id is required' },
        { status: 400 }
      );
    }

    const trialStart = new Date();
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + TRIAL_DURATION_DAYS);

    // Check if user exists
    const userResult = await sql`
      SELECT * FROM user_subscriptions 
      WHERE miro_user_id = ${miro_user_id}
      LIMIT 1
    `;

    if (userResult.rows.length > 0) {
      // Update existing user
      await sql`
        UPDATE user_subscriptions
        SET subscription_tier = 'trial',
            subscription_status = 'active',
            trial_started_at = ${trialStart.toISOString()},
            trial_ends_at = ${trialEnd.toISOString()},
            updated_at = NOW()
        WHERE miro_user_id = ${miro_user_id}
      `;
    } else {
      // Create new user
      await sql`
        INSERT INTO user_subscriptions (
          miro_user_id,
          subscription_tier,
          subscription_status,
          trial_started_at,
          trial_ends_at
        ) VALUES (
          ${miro_user_id},
          'trial',
          'active',
          ${trialStart.toISOString()},
          ${trialEnd.toISOString()}
        )
      `;
    }

    return NextResponse.json({
      success: true,
      trial_started_at: trialStart.toISOString(),
      trial_ends_at: trialEnd.toISOString(),
      days_remaining: TRIAL_DURATION_DAYS,
      message: 'Trial started successfully',
    });

  } catch (error) {
    console.error('Error starting trial:', error);
    return NextResponse.json(
      { error: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}

