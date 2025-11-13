/**
 * API Route: Link Subscription to Miro User ID
 * 
 * POST /api/subscription/link
 * 
 * Links a Paddle transaction to a Miro User ID in the database
 */

import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { Paddle } from '@paddle/paddle-node-sdk';

const paddle = new Paddle(process.env.PADDLE_API_KEY || '', {
  environment: process.env.PADDLE_ENVIRONMENT === 'live' ? 'live' : 'sandbox',
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { transaction_id, miro_user_id, plan } = body;

    if (!transaction_id || !miro_user_id || !plan) {
      return NextResponse.json(
        { error: 'Missing required fields: transaction_id, miro_user_id, or plan' },
        { status: 400 }
      );
    }

    // Get transaction details from Paddle
    let customerId = null;
    let subscriptionEndsAt = null;

    if (process.env.PADDLE_API_KEY) {
      try {
        const transaction = await paddle.transactions.get(transaction_id);
        
        customerId = transaction.customerId || null;

        // Calculate subscription end date based on plan
        const now = new Date();
        if (plan === 'monthly') {
          subscriptionEndsAt = new Date(now.setMonth(now.getMonth() + 1));
        } else if (plan === 'sixMonth') {
          subscriptionEndsAt = new Date(now.setMonth(now.getMonth() + 6));
        } else if (plan === 'annual') {
          subscriptionEndsAt = new Date(now.setFullYear(now.getFullYear() + 1));
        }
      } catch (paddleError) {
        console.error('Error retrieving Paddle transaction:', paddleError);
        // Continue with database update even if Paddle lookup fails
      }
    }

    // Calculate subscription end date based on plan (fallback)
    const now = new Date();
    let endsAt = new Date();

    if (plan === 'monthly') {
      endsAt.setMonth(endsAt.getMonth() + 1);
    } else if (plan === 'sixMonth') {
      endsAt.setMonth(endsAt.getMonth() + 6);
    } else if (plan === 'annual') {
      endsAt.setFullYear(endsAt.getFullYear() + 1);
    }

    // Use calculated date if Paddle didn't provide one
    if (subscriptionEndsAt) {
      endsAt = subscriptionEndsAt;
    }

    // Update or create user subscription in database
    try {
      await sql`
        INSERT INTO user_subscriptions (
          miro_user_id,
          subscription_tier,
          subscription_status,
          subscription_started_at,
          subscription_ends_at,
          stripe_customer_id,
          stripe_subscription_id
        ) VALUES (
          ${miro_user_id},
          'premium',
          'active',
          ${now.toISOString()},
          ${endsAt.toISOString()},
          ${customerId || null},
          ${transaction_id || null}
        )
        ON CONFLICT (miro_user_id)
        DO UPDATE SET
          subscription_tier = 'premium',
          subscription_status = 'active',
          subscription_started_at = ${now.toISOString()},
          subscription_ends_at = ${endsAt.toISOString()},
          stripe_customer_id = ${customerId || null},
          stripe_subscription_id = ${transaction_id || null},
          updated_at = NOW()
      `;

      return NextResponse.json({
        success: true,
        message: 'Subscription linked successfully',
        miro_user_id: miro_user_id,
        plan: plan,
        transaction_id: transaction_id,
      });

    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { 
          error: 'Database error',
          message: 'Failed to link subscription. Please contact support.',
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error linking subscription:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to link subscription',
      },
      { status: 500 }
    );
  }
}
