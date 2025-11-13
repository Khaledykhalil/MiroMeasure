/**
 * API Route: Get Usage Statistics
 * 
 * POST /api/subscription/usage-stats
 * 
 * Returns user's usage statistics including measurement counts
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

    // Get subscription info
    const userResult = await sql`
      SELECT * FROM user_subscriptions 
      WHERE miro_user_id = ${miro_user_id}
      LIMIT 1
    `;

    const tier = userResult.rows.length > 0 
      ? userResult.rows[0].subscription_tier 
      : 'free';

    // Get current month usage
    const now = new Date();
    const monthYear = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    const usageResult = await sql`
      SELECT measurement_count, last_measurement_at
      FROM user_usage_stats
      WHERE miro_user_id = ${miro_user_id}
        AND month_year = ${monthYear}
      LIMIT 1
    `;

    const currentMonthCount = usageResult.rows.length > 0
      ? parseInt(usageResult.rows[0].measurement_count || 0)
      : 0;

    // Get trial measurements if in trial
    let trialMeasurements = 0;
    if (userResult.rows.length > 0 && userResult.rows[0].trial_started_at && userResult.rows[0].trial_ends_at) {
      const trialStart = new Date(userResult.rows[0].trial_started_at);
      const trialEnd = new Date(userResult.rows[0].trial_ends_at);
      
      const trialResult = await sql`
        SELECT COUNT(*) as count
        FROM user_measurements
        WHERE miro_user_id = ${miro_user_id}
          AND created_at >= ${trialStart.toISOString()}
          AND created_at <= ${trialEnd.toISOString()}
      `;

      trialMeasurements = parseInt(trialResult.rows[0]?.count || 0);
    }

    // Get total measurements
    const totalResult = await sql`
      SELECT COUNT(*) as count
      FROM user_measurements
      WHERE miro_user_id = ${miro_user_id}
    `;

    const totalMeasurements = parseInt(totalResult.rows[0]?.count || 0);

    return NextResponse.json({
      tier: tier,
      current_month_count: currentMonthCount,
      trial_measurements: trialMeasurements,
      total_measurements: totalMeasurements,
      month_year: monthYear,
    });

  } catch (error) {
    console.error('Error getting usage stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

