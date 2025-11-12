'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MdCheck, MdStar, MdLock, MdTrendingUp } from 'react-icons/md'

export default function SubscribePage() {
  const [selectedPlan, setSelectedPlan] = useState('sixMonth') // Default to 6-month (status quo bias)
  const [miroUserId, setMiroUserId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const plans = {
    monthly: {
      id: 'monthly',
      name: 'Monthly',
      price: 9.99,
      period: 'month',
      billing: 'Billed monthly',
      savings: null,
      popular: false,
      description: 'Flexible monthly billing',
    },
    sixMonth: {
      id: 'sixMonth',
      name: '6-Month',
      price: 49.99,
      period: '6 months',
      monthlyEquivalent: 8.33,
      billing: 'Billed every 6 months',
      savings: 10.00,
      savingsPercent: 17,
      popular: true,
      description: 'Best value for regular users',
      recommended: true,
    },
    annual: {
      id: 'annual',
      name: 'Annual',
      price: 79.99,
      period: 'year',
      monthlyEquivalent: 6.67,
      billing: 'Billed annually',
      savings: 40.00,
      savingsPercent: 33,
      popular: false,
      description: 'Maximum savings',
    },
  }

  const features = [
    'Unlimited measurements',
    'All 8 units available (Imperial & Metric)',
    'Priority email support',
    'Cancel anytime',
  ]

  const handleSubscribe = async () => {
    if (!miroUserId) {
      alert('Please enter your Miro User ID')
      return
    }

    setIsLoading(true)

    try {
      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: selectedPlan,
          miro_user_id: miroUserId,
        }),
      })

      const data = await response.json()

      if (data.checkout_url) {
        // Redirect to Paddle checkout
        window.location.href = data.checkout_url
      } else if (data.error) {
        alert(`Error: ${data.message || data.error}`)
        setIsLoading(false)
      } else {
        // Fallback: redirect to success page (mock mode)
        window.location.href = `/subscribe/success?plan=${selectedPlan}&miro_user_id=${miroUserId}&mock=true`
      }
    } catch (error) {
      console.error('Error creating checkout:', error)
      alert('Failed to create checkout session. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.svg"
              alt="MeasureMint"
              width={40}
              height={40}
              className="transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-gray-900">MeasureMint</span>
              <span className="text-[10px] tracking-widest text-gray-500 uppercase">
                Professional Measurement Tool
              </span>
            </div>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/support" className="text-sm text-gray-600 hover:text-gray-900">
              Support
            </Link>
            <Link href="/panel">
              <button className="bg-[#10bb82] text-white hover:bg-[#0ea574] px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Launch App
              </button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-5 md:px-6 pt-20 md:pt-32 pb-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-gray-900">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Upgrade to Premium and unlock unlimited measurements, all units, and professional features.
            </p>
          </div>

          {/* Miro User ID Input */}
          <div className="max-w-md mx-auto mb-12">
            <label htmlFor="miro-user-id" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your Miro User ID
            </label>
            <div className="flex gap-2">
              <input
                id="miro-user-id"
                type="text"
                value={miroUserId}
                onChange={(e) => setMiroUserId(e.target.value)}
                placeholder="Your Miro User ID"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10bb82] focus:border-transparent"
              />
              <button
                onClick={() => {
                  // Try to get from localStorage or cookie
                  const stored = localStorage.getItem('miro_user_id')
                  if (stored) setMiroUserId(stored)
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                Auto-fill
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Find your User ID in the MeasureMint app settings
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
            {/* Monthly Plan */}
            <div
              onClick={() => setSelectedPlan('monthly')}
              className={`relative p-8 border-2 rounded-lg cursor-pointer transition-all ${
                selectedPlan === 'monthly'
                  ? 'border-black bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Monthly</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">${plans.monthly.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">{plans.monthly.billing}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <MdCheck className="text-[#10bb82] flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedPlan('monthly')
                }}
                className={`w-full py-3 rounded-md font-medium transition-colors ${
                  selectedPlan === 'monthly'
                    ? 'bg-[#10bb82] text-white hover:bg-[#0ea574]'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {selectedPlan === 'monthly' ? 'Selected' : 'Select Monthly'}
              </button>
            </div>

            {/* 6-Month Plan - RECOMMENDED (Visual Prominence) */}
            <div
              onClick={() => setSelectedPlan('sixMonth')}
              className={`relative p-8 border-2 rounded-lg cursor-pointer transition-all transform ${
                selectedPlan === 'sixMonth'
                  ? 'border-[#10bb82] bg-green-50 scale-105 shadow-lg'
                  : 'border-[#10bb82] hover:border-[#0ea574] shadow-md'
              }`}
            >
              {/* Recommended Badge - Single consolidated badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-[#10bb82] text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 shadow-md">
                  <MdStar size={16} />
                  <span>RECOMMENDED</span>
                </div>
              </div>

              <div className="mb-6 pt-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">6-Month</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">${plans.sixMonth.price}</span>
                  <span className="text-gray-600">/6 months</span>
                </div>
                <div className="mt-2">
                  <p className="text-lg font-semibold text-[#10bb82]">
                    ${plans.sixMonth.monthlyEquivalent}/month
                  </p>
                  <p className="text-sm text-gray-600">
                    Save ${plans.sixMonth.savings} ({plans.sixMonth.savingsPercent}% off)
                  </p>
                </div>
                <p className="text-sm text-gray-500 mt-2">{plans.sixMonth.billing}</p>
              </div>

              {/* Loss Aversion Framing */}
              <div className="mb-4 p-3 bg-blue-50 rounded-md border border-blue-200">
                <div className="flex items-center gap-2 text-sm text-blue-900">
                  <MdTrendingUp size={16} />
                  <span className="font-medium">Save $10 vs monthly billing</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <MdCheck className="text-[#10bb82] flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedPlan('sixMonth')
                }}
                className={`w-full py-3 rounded-md font-medium transition-colors ${
                  selectedPlan === 'sixMonth'
                    ? 'bg-[#10bb82] text-white hover:bg-[#0ea574]'
                    : 'bg-[#10bb82] text-white hover:bg-[#0ea574]'
                }`}
              >
                {selectedPlan === 'sixMonth' ? 'Selected' : 'Select 6-Month'}
              </button>
            </div>

            {/* Annual Plan */}
            <div
              onClick={() => setSelectedPlan('annual')}
              className={`relative p-8 border-2 rounded-lg cursor-pointer transition-all ${
                selectedPlan === 'annual'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Best Value Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-purple-500 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-md">
                  Best Value
                </div>
              </div>

              <div className="mb-6 pt-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Annual</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">${plans.annual.price}</span>
                  <span className="text-gray-600">/year</span>
                </div>
                <div className="mt-2">
                  <p className="text-lg font-semibold text-[#10bb82]">
                    ${plans.annual.monthlyEquivalent}/month
                  </p>
                  <p className="text-sm text-gray-600">
                    Save ${plans.annual.savings} ({plans.annual.savingsPercent}% off)
                  </p>
                </div>
                <p className="text-sm text-gray-500 mt-2">{plans.annual.billing}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <MdCheck className="text-[#10bb82] flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedPlan('annual')
                }}
                className={`w-full py-3 rounded-md font-medium transition-colors ${
                  selectedPlan === 'annual'
                    ? 'bg-[#10bb82] text-white hover:bg-[#0ea574]'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {selectedPlan === 'annual' ? 'Selected' : 'Select Annual'}
              </button>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {selectedPlan === 'sixMonth' && '⭐ You selected the 6-Month Plan'}
                {selectedPlan === 'monthly' && 'Selected: Monthly Plan'}
                {selectedPlan === 'annual' && 'Selected: Annual Plan'}
              </h2>
              <p className="text-gray-700 mb-6">
                {selectedPlan === 'sixMonth' && (
                  <>
                    Best value for regular users. Save 17% and lock in your price for 6 months.
                  </>
                )}
                {selectedPlan === 'monthly' && (
                  <>Flexible monthly billing. Cancel anytime with no commitment.</>
                )}
                {selectedPlan === 'annual' && (
                  <>Maximum savings! Get 33% off and lock in your price for a full year.</>
                )}
              </p>

              {/* Sunk Cost Effect Messaging */}
              {selectedPlan === 'sixMonth' && (
                <div className="mb-6 p-4 bg-blue-50 rounded-md border border-blue-200">
                  <p className="text-sm text-blue-900">
                    💡 <strong>Tip:</strong> You've already invested time learning MeasureMint. The 6-month plan
                    maximizes your value and eliminates monthly billing hassles.
                  </p>
                </div>
              )}

              <button
                onClick={handleSubscribe}
                disabled={!miroUserId || isLoading}
                className="bg-[#10bb82] text-white hover:bg-[#0ea574] px-8 py-4 rounded-md text-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
              >
                {isLoading 
                  ? 'Processing...' 
                  : miroUserId 
                    ? 'Continue to Checkout' 
                    : 'Enter Miro User ID to Continue'}
              </button>

              <p className="text-sm text-gray-500 mt-4">
                Secure checkout powered by Stripe. Cancel anytime.
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="mb-2">
                  <MdLock size={32} className="mx-auto text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Secure Payment</h3>
                <p className="text-sm text-gray-600">Encrypted transactions via Stripe</p>
              </div>
              <div>
                <div className="mb-2">
                  <MdCheck size={32} className="mx-auto text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Cancel Anytime</h3>
                <p className="text-sm text-gray-600">No long-term commitment required</p>
              </div>
              <div>
                <div className="mb-2">
                  <MdStar size={32} className="mx-auto text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">30-Day Guarantee</h3>
                <p className="text-sm text-gray-600">Full refund if not satisfied</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Why is the 6-month plan recommended?</h3>
                <p className="text-gray-700">
                  The 6-month plan offers the best balance of value and flexibility. You save 17% compared to
                  monthly billing, and it's perfect for regular users who want to avoid monthly payment hassles
                  without the long commitment of an annual plan.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
                <p className="text-gray-700">
                  Yes! All plans can be cancelled at any time. You'll continue to have access until the end of your
                  billing period, and we never delete your measurements.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What happens to my measurements if I cancel?</h3>
                <p className="text-gray-700">
                  Your measurements are always safe. We never delete your data, even if you cancel. You can view and
                  export all your measurements at any time.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
                <p className="text-gray-700">
                  Yes, we offer a 30-day money-back guarantee. If you're not satisfied with MeasureMint, contact us
                  within 30 days for a full refund.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-5 md:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">© 2025 MeasureMint. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/support" className="text-sm text-gray-600 hover:text-gray-900">
                Support
              </Link>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

