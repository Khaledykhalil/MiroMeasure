/**
 * API Route: Verify Paddle Transaction
 * 
 * GET /api/checkout/verify
 * 
 * Verifies a Paddle transaction was completed
 */

import { NextResponse } from 'next/server';
import { Paddle } from '@paddle/paddle-node-sdk';

// Force dynamic rendering (uses request.url)
export const dynamic = 'force-dynamic';

const paddle = new Paddle(process.env.PADDLE_API_KEY || '', {
  environment: process.env.PADDLE_ENVIRONMENT === 'live' ? 'live' : 'sandbox',
});

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get('transaction_id');

    if (!transactionId) {
      return NextResponse.json(
        { error: 'Missing transaction_id' },
        { status: 400 }
      );
    }

    // If Paddle is not configured, return mock success
    if (!process.env.PADDLE_API_KEY) {
      return NextResponse.json({
        success: true,
        plan: 'sixMonth',
        message: 'Mock mode - Paddle not configured',
      });
    }

    // Retrieve transaction from Paddle
    const transaction = await paddle.transactions.get(transactionId);

    // Check if transaction was successful
    if (transaction.status !== 'completed') {
      return NextResponse.json({
        success: false,
        status: transaction.status,
        message: 'Transaction not completed',
      });
    }

    // Get plan from custom data
    const plan = transaction.customData?.plan || 'unknown';

    return NextResponse.json({
      success: true,
      transaction_id: transactionId,
      plan: plan,
      status: transaction.status,
      customer_id: transaction.customerId,
      amount: transaction.totals,
    });

  } catch (error) {
    console.error('Error verifying Paddle transaction:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to verify transaction',
      },
      { status: 500 }
    );
  }
}
