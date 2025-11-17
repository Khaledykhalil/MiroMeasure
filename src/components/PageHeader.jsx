'use client'

import { useEffect, useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import LanguageSelector from "@/components/LanguageSelector"
import { detectLanguageSync } from "@/utils/languageDetection"

/**
 * Shared header component for all pages
 * Includes logo, navigation, and language selector
 */
export default function PageHeader() {
  const [locale, setLocale] = useState('en')
  const [translations, setTranslations] = useState(null)

  // Initialize locale
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const urlLocale = urlParams.get('lang')
      const storedLocale = localStorage.getItem('locale')
      const currentLocale = urlLocale || storedLocale || detectLanguageSync()
      setLocale(currentLocale)
    }
  }, [])

  // Load translations
  useEffect(() => {
    if (!locale) return
    
    const loadTranslations = async () => {
      try {
        const mod = await import(`../../messages/${locale}.json`)
        setTranslations(mod.default)
      } catch (err) {
        try {
          const mod = await import('../../messages/en.json')
          setTranslations(mod.default)
        } catch {
          setTranslations({})
        }
      }
    }
    
    loadTranslations()
  }, [locale])

  const t = (key, fallback = null) => {
    if (!translations) {
      return fallback || key.split('.').pop() || key
    }
    const keys = key.split('.')
    let value = translations
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) {
        return fallback || keys[keys.length - 1] || key
      }
    }
    return value || fallback || key
  }

  // Check if current locale is RTL (Arabic)
  const isRTL = locale === 'ar'

  return (
    <header className={`border-b border-gray-200 bg-white ${isRTL ? 'font-noto-sans-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'} lang={locale}>
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
            <span className="text-xl font-bold tracking-tight text-gray-900">
              {translations ? t('common.appName') : 'MeasureMint'}
            </span>
            <span className="text-[10px] tracking-widest text-gray-500 uppercase">
              {translations ? t('common.tagline') : 'Professional Measurement Tool'}
            </span>
          </div>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/support" className="text-sm text-gray-600 hover:text-gray-900">
            {translations ? t('common.support') : 'Support'}
          </Link>
          <LanguageSelector />
          <Link href="/waitlist">
            <button className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              {translations ? t('home.hero.ctaSecondary') : 'Join Waitlist'}
            </button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

