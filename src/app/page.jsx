'use client'

import { useEffect, useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { MdConstruction, MdHome, MdMap, MdDesignServices, MdArchitecture, MdChair } from "react-icons/md"
import LanguageSelector from "@/components/LanguageSelector"
import { getLoomEmbedUrl } from "@/config/loom-videos"
import { detectLanguageSync, detectUserLanguage } from "@/utils/languageDetection"

export default function Home() {
  // Initialize locale with automatic detection
  const getInitialLocale = () => {
    if (typeof window === 'undefined') return 'en'
    // Use sync detection for initial render (fast)
    return detectLanguageSync()
  }

  const [locale, setLocale] = useState(getInitialLocale)
  const [translations, setTranslations] = useState(null)
  const [isDetecting, setIsDetecting] = useState(false)
  
  // Auto-detect language on mount (if not explicitly set)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlLocale = urlParams.get('lang')
    
    // If user explicitly selected language via URL, use it
    if (urlLocale) {
      setLocale(urlLocale)
      localStorage.setItem('locale', urlLocale)
      return
    }
    
    // If locale already stored, use it
    const storedLocale = localStorage.getItem('locale')
    if (storedLocale && storedLocale !== locale) {
      setLocale(storedLocale)
      return
    }
    
    // Auto-detect language (async, may use IP geolocation)
    setIsDetecting(true)
    detectUserLanguage().then((detectedLang) => {
      if (detectedLang && detectedLang !== locale) {
        setLocale(detectedLang)
        localStorage.setItem('locale', detectedLang)
        
        // Update URL without reload (optional - you can remove this if you don't want URL to change)
        const url = new URL(window.location.href)
        url.searchParams.set('lang', detectedLang)
        window.history.replaceState({}, '', url)
      }
      setIsDetecting(false)
    }).catch(() => {
      setIsDetecting(false)
    })
  }, [])

  // Load translations when locale changes
  useEffect(() => {
    // Reset translations when locale changes
    setTranslations(null)
    
    const loadTranslations = async () => {
      try {
        console.log(`Loading translations for locale: ${locale}`)
        const mod = await import(`../../messages/${locale}.json`)
        console.log(`Translations loaded for ${locale}:`, mod.default)
        setTranslations(mod.default)
      } catch (err) {
        console.error(`Failed to load translations for ${locale}:`, err)
        // Fallback to English
        try {
          const mod = await import('../../messages/en.json')
          console.log('Fallback to English translations')
          setTranslations(mod.default)
        } catch (fallbackErr) {
          console.error('Failed to load English translations')
          setTranslations({}) // Empty object as last resort
        }
      }
    }
    
    if (locale) {
      loadTranslations()
    }
  }, [locale])

  const t = (key, fallback = null) => {
    if (!translations) {
      // Return fallback or last part of key while loading
      return fallback || key.split('.').pop() || key
    }
    const keys = key.split('.')
    let value = translations
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) {
        // If key not found, return fallback or last part of key
        return fallback || keys[keys.length - 1] || key
      }
    }
    return value || fallback || key
  }

  // Check if current locale is RTL (Arabic)
  const isRTL = locale === 'ar'
  
  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'font-noto-sans-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'} lang={locale}>
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
            <Link href="/subscribe" className="text-sm text-gray-600 hover:text-gray-900">
              {t('common.pricing')}
            </Link>
            <LanguageSelector />
            <Link href="/panel">
              <button className="bg-[#10bb82] text-white hover:bg-[#0ea574] px-4 py-2 rounded-md text-sm font-medium transition-colors">
                {translations ? t('common.launchApp') : 'Launch App'}
              </button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-5 md:px-6 pt-20 md:pt-32 pb-16 md:pb-24">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-gray-900">
            {translations ? t('home.hero.title') : 'Measurements on Miro, Finally!'}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl leading-relaxed">
            {translations ? t('home.hero.subtitle') : 'Professional measurement and calibration tool for designers. Scaling and measuring drawings on Miro, for the first time ever!'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/panel">
              <button className="bg-[#10bb82] text-white hover:bg-[#0ea574] px-8 py-3 rounded-md text-lg font-medium transition-colors">
                {translations ? t('home.hero.ctaPrimary') : 'Launch App'}
              </button>
            </Link>
            <Link href="/waitlist">
              <button className="border border-gray-300 text-gray-900 hover:border-gray-400 bg-transparent px-8 py-3 rounded-md text-lg font-medium transition-colors">
                {translations ? t('home.hero.ctaSecondary') : 'Join Waitlist'}
              </button>
            </Link>
          </div>
        </section>

        {/* Demo Video Section */}
        <section className="max-w-5xl mx-auto px-5 md:px-6 pb-32">
          <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-200 shadow-lg">
            <iframe
              key={locale} // Force re-render when locale changes
              src={getLoomEmbedUrl(locale)}
              className="w-full h-full"
              allowFullScreen
              title={translations ? (t('home.video.title') || 'MeasureMint Demo') : 'MeasureMint Demo'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section className="max-w-5xl mx-auto px-5 md:px-6 pb-32">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-gray-900">
                {translations ? t('home.problem.title') : 'The Problem'}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {translations ? t('home.problem.description') : 'Measuring drawings on Miro boards is frustrating. You can\'t get accurate dimensions from blueprints, floor plans, or technical drawings without complex workarounds.'}
              </p>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-gray-900">
                {translations ? t('home.solution.title') : 'The Solution'}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {translations ? t('home.solution.description') : 'MeasureMint solves this with professional-grade measurement tools built directly into Miro. Calibrate once, measure anything.'}
              </p>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="max-w-5xl mx-auto px-5 md:px-6 pb-32">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16 text-gray-900">
            {translations ? t('home.features.title') : 'Built for professionals'}
          </h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            <div className="min-h-[120px]">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                {translations ? t('home.features.calibration.title', 'Precise Scale Calibration') : 'Precise Scale Calibration'}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {translations ? t('home.features.calibration.description', 'Set a known distance to establish accurate scale. Works with any drawing, blueprint, or technical diagram. One-time calibration per drawing.') : 'Set a known distance to establish accurate scale. Works with any drawing, blueprint, or technical diagram. One-time calibration per drawing.'}
              </p>
            </div>
            <div className="min-h-[120px]">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                {translations ? t('home.features.measurements.title', 'Professional Measurements') : 'Professional Measurements'}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {translations ? t('home.features.measurements.description', 'Measure any distance on calibrated drawings. Visual feedback with clear markers directly on the board.') : 'Measure any distance on calibrated drawings. Visual feedback with clear markers directly on the board.'}
              </p>
            </div>
            <div className="min-h-[120px]">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                {translations ? t('home.features.units.title', 'Dual Unit Systems') : 'Dual Unit Systems'}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {translations ? t('home.features.units.description', 'Full Imperial and Metric support. 8 unit types: Feet, inches, yards, miles, meters, centimeters, millimeters, kilometers.') : 'Full Imperial and Metric support. 8 unit types: Feet, inches, yards, miles, meters, centimeters, millimeters, kilometers.'}
              </p>
            </div>
            <div className="min-h-[120px]">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                {translations ? t('home.features.noSelection.title', 'No Image Selection Required') : 'No Image Selection Required'}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {translations ? t('home.features.noSelection.description', 'Measure anywhere on the board instantly. Works with any drawing, PDF, or image. Seamless integration with Miro workflow.') : 'Measure anywhere on the board instantly. Works with any drawing, PDF, or image. Seamless integration with Miro workflow.'}
              </p>
            </div>
            <div className="min-h-[120px]">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                {translations ? t('home.features.tracking.title', 'Measurement Tracking') : 'Measurement Tracking'}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {translations ? t('home.features.tracking.description', 'View the latest measurement that was calculated so you never lose track of your board.') : 'View the latest measurement that was calculated so you never lose track of your board.'}
              </p>
            </div>
            <div className="min-h-[120px]">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                {translations ? t('home.features.professionalGrade.title', 'Professional Grade') : 'Professional Grade'}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {translations ? t('home.features.professionalGrade.description', 'Built by and for architects, engineers, and design professionals.') : 'Built by and for architects, engineers, and design professionals.'}
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="max-w-5xl mx-auto px-5 md:px-6 pb-32">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16 text-gray-900">
            {translations ? t('home.useCases.title') : 'Perfect for'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <div className="mb-3 text-[#10bb82]">
                <MdConstruction size={48} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {translations ? t('home.useCases.construction.title') : 'Construction Blueprints'}
              </h3>
              <p className="text-gray-700">
                {translations ? t('home.useCases.construction.description') : 'Measure dimensions, verify specifications, check clearances'}
              </p>
            </div>
            <div>
              <div className="mb-3 text-[#10bb82]">
                <MdHome size={48} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {translations ? t('home.useCases.floorPlans.title') : 'Floor Plans'}
              </h3>
              <p className="text-gray-700">
                {translations ? t('home.useCases.floorPlans.description') : 'Space planning, room dimensions, furniture layouts'}
              </p>
            </div>
            <div>
              <div className="mb-3 text-[#10bb82]">
                <MdMap size={48} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {translations ? t('home.useCases.sitePlans.title') : 'Site Plans'}
              </h3>
              <p className="text-gray-700">
                {translations ? t('home.useCases.sitePlans.description') : 'Property measurements, lot dimensions, site analysis'}
              </p>
            </div>
            <div>
              <div className="mb-3 text-[#10bb82]">
                <MdDesignServices size={48} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {translations ? t('home.useCases.technicalDrawings.title') : 'Technical Drawings'}
              </h3>
              <p className="text-gray-700">
                {translations ? t('home.useCases.technicalDrawings.description') : 'Engineering schematics, mechanical drawings, diagrams'}
              </p>
            </div>
            <div>
              <div className="mb-3 text-[#10bb82]">
                <MdArchitecture size={48} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {translations ? t('home.useCases.architecturalDesigns.title') : 'Architectural Designs'}
              </h3>
              <p className="text-gray-700">
                {translations ? t('home.useCases.architecturalDesigns.description') : 'Elevations, sections, detail drawings'}
              </p>
            </div>
            <div>
              <div className="mb-3 text-[#10bb82]">
                <MdChair size={48} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {translations ? t('home.useCases.interiorDesign.title') : 'Interior Design'}
              </h3>
              <p className="text-gray-700">
                {translations ? t('home.useCases.interiorDesign.description') : 'Furniture placement, fixture spacing, material calculations'}
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="max-w-5xl mx-auto px-5 md:px-6 pb-32">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-gray-900">
            {translations ? t('home.howItWorks.title') : 'Get started in 60 seconds'}
          </h2>
          <div className="space-y-12 mt-12">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#10bb82] text-white flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">
                  {translations ? t('home.howItWorks.step1.title') : 'Calibrate Scale'}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {translations ? t('home.howItWorks.step1.description') : 'Click two points on a known distance (like "20 ft" on your drawing). Enter the actual distance. Choose your unit. Done! Your scale is set.'}
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#10bb82] text-white flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">
                  {translations ? t('home.howItWorks.step2.title') : 'Measure Anything'}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {translations ? t('home.howItWorks.step2.description') : 'Click "Measure Distance". Click any two points on your drawing. See instant measurements with full unit conversions.'}
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#10bb82] text-white flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">
                  {translations ? t('home.howItWorks.step3.title') : 'Switch Units Anytime'}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {translations ? t('home.howItWorks.step3.description') : 'Toggle between Imperial (🇺🇸) and Metric (🌍). When setting your calibration line or calculating a measurement, click the unit you prefer.'}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <Link href="/guide" className="text-blue-500 hover:underline text-lg">
              {translations ? t('home.howItWorks.guideLink') : 'See detailed guide →'}
            </Link>
          </div>
        </section>

        {/* Target Audience Section */}
        <section className="max-w-5xl mx-auto px-5 md:px-6 pb-32">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-gray-900">
            {translations ? t('home.targetAudience.title') : 'Built for professionals who demand precision'}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-lg text-gray-700">
            <ul className="space-y-2">
              <li>• {translations ? t('home.targetAudience.item1') : 'Architects and architectural firms'}</li>
              <li>• {translations ? t('home.targetAudience.item2') : 'Engineers (civil, mechanical, structural)'}</li>
              <li>• {translations ? t('home.targetAudience.item3') : 'Construction project managers'}</li>
              <li>• {translations ? t('home.targetAudience.item4') : 'Interior designers'}</li>
            </ul>
            <ul className="space-y-2">
              <li>• {translations ? t('home.targetAudience.item5') : 'Real estate professionals'}</li>
              <li>• {translations ? t('home.targetAudience.item6') : 'Facility managers'}</li>
              <li>• {translations ? t('home.targetAudience.item7') : 'Anyone who works with technical drawings on Miro'}</li>
            </ul>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="max-w-5xl mx-auto px-5 md:px-6 pb-32">
          <div className="bg-gray-50 rounded-lg p-12 md:p-16 text-center border border-gray-200">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-gray-900">
              {translations ? t('home.finalCta.title') : 'Ready to measure with precision?'}
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              {translations ? t('home.finalCta.subtitle') : 'Join architects and engineers who trust MeasureMint for accurate measurements on Miro.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/panel">
                <button className="bg-[#10bb82] text-white hover:bg-[#0ea574] px-8 py-3 rounded-md text-lg font-medium transition-colors">
                  {translations ? t('home.finalCta.launchApp') : 'Launch MeasureMint'}
                </button>
              </Link>
              <Link href="/help">
                <button className="border border-gray-300 text-gray-900 hover:border-gray-400 bg-transparent px-8 py-3 rounded-md text-lg font-medium transition-colors">
                  {translations ? t('home.finalCta.viewDocumentation') : 'View Documentation'}
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-5 md:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              {translations ? t('footer.copyright') : '© 2025 MeasureMint. All rights reserved.'}
            </p>
            <div className="flex items-center gap-6">
              <Link href="/support" className="text-sm text-gray-600 hover:text-gray-900">
                {translations ? t('footer.support') : 'Support'}
              </Link>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                {translations ? t('footer.privacy') : 'Privacy'}
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                {translations ? t('footer.terms') : 'Terms'}
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center md:text-left">
            <a href="mailto:support@measuremint.app" className="text-sm text-blue-500 hover:underline">
              support@measuremint.app
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
