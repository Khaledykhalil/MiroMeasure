'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MdCheckCircle, MdError, MdRefresh } from 'react-icons/md'

function SuccessContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState('loading')
  const [sessionId, setSessionId] = useState(null)
  const [miroUserId, setMiroUserId] = useState(null)
  const [plan, setPlan] = useState(null)
  const [isMock, setIsMock] = useState(false)

  useEffect(() => {
    const transactionIdParam = searchParams.get('transaction_id')
    const miroUserIdParam = searchParams.get('miro_user_id')
    const planParam = searchParams.get('plan')
    const mockParam = searchParams.get('mock')

    setSessionId(transactionIdParam)
    setMiroUserId(miroUserIdParam)
    setPlan(planParam)
    setIsMock(mockParam === 'true')

    // If mock mode, show success immediately
    if (mockParam === 'true') {
      setStatus('success')
      return
    }

    // Verify transaction with Paddle
    if (transactionIdParam) {
      verifySession(transactionIdParam, miroUserIdParam)
    } else {
      setStatus('error')
    }
  }, [searchParams])

  const verifySession = async (transactionId, miroUserId) => {
    try {
      const response = await fetch(`/api/checkout/verify?transaction_id=${transactionId}`)
      const data = await response.json()

      if (data.success) {
        // Link subscription to Miro User ID
        if (miroUserId) {
          await linkSubscription(transactionId, miroUserId, data.plan)
        }
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Error verifying transaction:', error)
      setStatus('error')
    }
  }

  const linkSubscription = async (transactionId, miroUserId, plan) => {
    try {
      const response = await fetch('/api/subscription/link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transaction_id: transactionId,
          miro_user_id: miroUserId,
          plan: plan,
        }),
      })

      if (!response.ok) {
        console.error('Failed to link subscription')
      }
    } catch (error) {
      console.error('Error linking subscription:', error)
    }
  }

  const planNames = {
    monthly: 'Monthly Plan',
    sixMonth: '6-Month Plan',
    annual: 'Annual Plan',
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
            <Link href="/panel">
              <button className="bg-[#10bb82] text-white hover:bg-[#0ea574] px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Launch App
              </button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="max-w-2xl mx-auto px-5 md:px-6 pt-20 md:pt-32 pb-16">
          {status === 'loading' && (
            <div className="text-center">
              <div className="mb-6">
                <MdRefresh className="mx-auto text-[#10bb82] animate-spin" size={64} />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Processing your payment...</h1>
              <p className="text-gray-600">Please wait while we confirm your subscription.</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <div className="mb-6">
                <MdCheckCircle className="mx-auto text-[#10bb82]" size={64} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Payment Successful! 🎉
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Your subscription to <strong>{plan ? planNames[plan] || 'Premium' : 'Premium'}</strong> is now active.
              </p>

              {isMock && (
                <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    ⚠️ <strong>Development Mode:</strong> This is a mock payment. Stripe integration is not yet configured.
                  </p>
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Next?</h2>
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <MdCheckCircle className="text-[#10bb82] flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Your subscription is active</h3>
                      <p className="text-sm text-gray-600">
                        You now have access to unlimited measurements and all premium features.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MdCheckCircle className="text-[#10bb82] flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Start measuring</h3>
                      <p className="text-sm text-gray-600">
                        Launch the app and start making unlimited measurements with all units.
                      </p>
                    </div>
                  </div>
                  {miroUserId && (
                    <div className="flex items-start gap-3">
                      <MdCheckCircle className="text-[#10bb82] flex-shrink-0 mt-1" size={24} />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Subscription linked</h3>
                        <p className="text-sm text-gray-600">
                          Your subscription is linked to Miro User ID: <code className="bg-gray-200 px-2 py-1 rounded text-xs">{miroUserId}</code>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/panel">
                  <button className="bg-[#10bb82] text-white hover:bg-[#0ea574] px-8 py-3 rounded-md text-lg font-medium transition-colors">
                    Launch MeasureMint
                  </button>
                </Link>
                <Link href="/subscribe">
                  <button className="border border-gray-300 text-gray-900 hover:border-gray-400 bg-transparent px-8 py-3 rounded-md text-lg font-medium transition-colors">
                    Manage Subscription
                  </button>
                </Link>
              </div>

              <p className="text-sm text-gray-500 mt-8">
                A confirmation email has been sent to your email address.
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <div className="mb-6">
                <MdError className="mx-auto text-red-500" size={64} />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Failed</h1>
              <p className="text-xl text-gray-700 mb-8">
                We couldn't process your payment. Please try again.
              </p>

              <div className="bg-red-50 rounded-lg p-6 border border-red-200 mb-8">
                <p className="text-sm text-red-800 mb-4">
                  If you were charged, the payment will be refunded within 5-7 business days.
                </p>
                <p className="text-sm text-red-800">
                  If you continue to experience issues, please contact support at{' '}
                  <a href="mailto:support@measuremint.app" className="underline">
                    support@measuremint.app
                  </a>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/subscribe">
                  <button className="bg-[#10bb82] text-white hover:bg-[#0ea574] px-8 py-3 rounded-md text-lg font-medium transition-colors">
                    Try Again
                  </button>
                </Link>
                <Link href="/support">
                  <button className="border border-gray-300 text-gray-900 hover:border-gray-400 bg-transparent px-8 py-3 rounded-md text-lg font-medium transition-colors">
                    Contact Support
                  </button>
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
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

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <MdRefresh className="mx-auto text-[#10bb82] animate-spin mb-4" size={48} />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}

