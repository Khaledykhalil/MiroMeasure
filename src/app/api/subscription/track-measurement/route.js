/**
 * API Route: Track Measurement
 * 
 * POST /api/subscription/track-measurement
 * 
 * Records a measurement for usage tracking and analytics
 */

import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request) {
  try {
    const { miro_user_id, board_id, measurement_data } = await request.json();

    if (!miro_user_id) {
      return NextResponse.json(
        { error: 'miro_user_id is required' },
        { status: 400 }
      );
    }

    // Check if this is user's first measurement (start trial)
    const userResult = await sql`
      SELECT * FROM user_subscriptions 
      WHERE miro_user_id = ${miro_user_id}
      LIMIT 1
    `;

    let isFirstMeasurement = false;

    if (userResult.rows.length === 0) {
      // New user - create subscription record and start trial
      isFirstMeasurement = true;
      const trialStart = new Date();
      const trialEnd = new Date();
      trialEnd.setDate(trialEnd.getDate() + 7); // 7-day trial

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
    } else {
      // Check if this is first measurement (no measurements recorded yet)
      const measurementCount = await sql`
        SELECT COUNT(*) as count
        FROM user_measurements
        WHERE miro_user_id = ${miro_user_id}
      `;

      isFirstMeasurement = parseInt(measurementCount.rows[0]?.count || 0) === 0;
    }

    // Record the measurement
    await sql`
      INSERT INTO user_measurements (
        miro_user_id,
        board_id,
        measurement_data
      ) VALUES (
        ${miro_user_id},
        ${board_id || null},
        ${JSON.stringify(measurement_data || {})}
      )
    `;

    // Update monthly usage stats
    const now = new Date();
    const monthYear = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    await sql`
      INSERT INTO user_usage_stats (
        miro_user_id,
        month_year,
        measurement_count,
        last_measurement_at
      ) VALUES (
        ${miro_user_id},
        ${monthYear},
        1,
        ${now.toISOString()}
      )
      ON CONFLICT (miro_user_id, month_year)
      DO UPDATE SET
        measurement_count = user_usage_stats.measurement_count + 1,
        last_measurement_at = ${now.toISOString()},
        updated_at = NOW()
    `;

    return NextResponse.json({
      success: true,
      is_first_measurement: isFirstMeasurement,
      message: 'Measurement tracked successfully',
    });

  } catch (error) {
    console.error('Error tracking measurement:', error);
    return NextResponse.json(
      { error: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}

