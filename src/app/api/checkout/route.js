/**
 * API Route: Paddle Checkout
 * 
 * POST /api/checkout
 * 
 * Creates Paddle checkout for subscription
 */

import { NextResponse } from 'next/server';
import { Paddle } from '@paddle/paddle-node-sdk';

// Force dynamic rendering (uses request.url in GET handler)
export const dynamic = 'force-dynamic';

// Initialize Paddle client
const paddle = new Paddle(process.env.PADDLE_API_KEY || '', {
  environment: process.env.PADDLE_ENVIRONMENT === 'live' ? 'live' : 'sandbox',
});

// Plan configuration
const planPrices = {
  monthly: {
    name: 'Monthly Plan',
    amount: 999, // $9.99 in cents
    interval: 'month',
  },
  sixMonth: {
    name: '6-Month Plan',
    amount: 4999, // $49.99 in cents
    interval: 'month',
    intervalCount: 6,
  },
  annual: {
    name: 'Annual Plan',
    amount: 7999, // $79.99 in cents
    interval: 'year',
  },
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { plan, miro_user_id, email } = body;

    // Validate inputs
    if (!plan || !miro_user_id) {
      return NextResponse.json(
        { error: 'Missing plan or miro_user_id' },
        { status: 400 }
      );
    }

    const selectedPlan = planPrices[plan];

    if (!selectedPlan) {
      return NextResponse.json(
        { error: 'Invalid plan. Must be: monthly, sixMonth, or annual' },
        { status: 400 }
      );
    }

    // Check if Paddle is configured
    if (!process.env.PADDLE_API_KEY) {
      return NextResponse.json(
        { 
          error: 'Paddle not configured',
          message: 'Please set PADDLE_API_KEY environment variable',
          // For development, return mock session URL
          checkout_url: `/subscribe/success?plan=${plan}&miro_user_id=${miro_user_id}&mock=true`,
        },
        { status: 500 }
      );
    }

    // Get base URL
    const baseUrl = process.env.NEXT_PUBLIC_URL || 
                   process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                   'http://localhost:3000';

    // Get price ID for the selected plan
    const priceIdEnvKey = plan === 'monthly' 
      ? 'PADDLE_PRICE_ID_MONTHLY'
      : plan === 'sixMonth'
      ? 'PADDLE_PRICE_ID_SIXMONTH'
      : 'PADDLE_PRICE_ID_ANNUAL';
    
    const priceId = process.env[priceIdEnvKey];

    if (!priceId) {
      return NextResponse.json(
        { 
          error: 'Price ID not configured',
          message: `Please set ${priceIdEnvKey} environment variable`,
        },
        { status: 500 }
      );
    }

    // Create Paddle checkout
    // Note: Products must be created in Paddle dashboard first
    const checkoutResponse = await paddle.transactions.create({
      items: [
        {
          priceId: priceId,
          quantity: 1,
        },
      ],
      customerId: miro_user_id, // Use Miro User ID as customer ID
      customerEmail: email || undefined,
      customData: {
        miro_user_id: miro_user_id,
        plan: plan,
      },
      returnUrl: `${baseUrl}/subscribe/success?transaction_id={transaction_id}&miro_user_id=${miro_user_id}&plan=${plan}`,
    });

    return NextResponse.json({
      checkout_id: checkoutResponse.id,
      checkout_url: checkoutResponse.checkoutUrl,
      plan: plan,
      miro_user_id: miro_user_id,
    });

  } catch (error) {
    console.error('Error creating Paddle checkout:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to create checkout',
      },
      { status: 500 }
    );
  }
}

// Also support GET for backward compatibility
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const plan = searchParams.get('plan');
    const miroUserId = searchParams.get('miro_user_id');
    const email = searchParams.get('email');

    if (!plan || !miroUserId) {
      return NextResponse.json(
        { error: 'Missing plan or miro_user_id' },
        { status: 400 }
      );
    }

    // Redirect to POST handler
    const response = await POST(
      new Request(request.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, miro_user_id: miroUserId, email }),
      })
    );

    return response;
  } catch (error) {
    console.error('Error in GET checkout:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
