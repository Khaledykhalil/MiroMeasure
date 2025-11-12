-- Subscription and Usage Tracking Tables
-- Run this after creating your Vercel Postgres database
-- 
-- Usage:
-- 1. Make sure your Vercel Postgres database is created
-- 2. Run this SQL script in Vercel Postgres Query tab
--    OR run: node setup-subscription-database.js

-- User subscriptions and usage tracking
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id SERIAL PRIMARY KEY,
  miro_user_id VARCHAR(255) NOT NULL UNIQUE,
  subscription_tier VARCHAR(50) DEFAULT 'free', -- 'free', 'premium', 'trial'
  subscription_status VARCHAR(50) DEFAULT 'active', -- 'active', 'cancelled', 'expired'
  trial_started_at TIMESTAMP WITH TIME ZONE,
  trial_ends_at TIMESTAMP WITH TIME ZONE,
  subscription_started_at TIMESTAMP WITH TIME ZONE,
  subscription_ends_at TIMESTAMP WITH TIME ZONE,
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Track individual measurements for usage limits
CREATE TABLE IF NOT EXISTS user_measurements (
  id SERIAL PRIMARY KEY,
  miro_user_id VARCHAR(255) NOT NULL,
  board_id VARCHAR(255),
  measurement_data JSONB, -- Store measurement details (distance, unit, conversions, etc.)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Track monthly usage for free tier limits
CREATE TABLE IF NOT EXISTS user_usage_stats (
  id SERIAL PRIMARY KEY,
  miro_user_id VARCHAR(255) NOT NULL,
  month_year VARCHAR(7) NOT NULL, -- Format: '2025-01'
  measurement_count INTEGER DEFAULT 0,
  last_measurement_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(miro_user_id, month_year)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_miro_user_id ON user_subscriptions(miro_user_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_status ON user_subscriptions(subscription_status);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_tier ON user_subscriptions(subscription_tier);
CREATE INDEX IF NOT EXISTS idx_user_measurements_miro_user_id ON user_measurements(miro_user_id);
CREATE INDEX IF NOT EXISTS idx_user_measurements_created_at ON user_measurements(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_usage_stats_miro_user_id ON user_usage_stats(miro_user_id);
CREATE INDEX IF NOT EXISTS idx_user_usage_stats_month_year ON user_usage_stats(month_year);

-- Comments for documentation
COMMENT ON TABLE user_subscriptions IS 'Stores user subscription information and trial status';
COMMENT ON TABLE user_measurements IS 'Tracks individual measurements for analytics and usage limits';
COMMENT ON TABLE user_usage_stats IS 'Monthly aggregated usage statistics for free tier limits';

