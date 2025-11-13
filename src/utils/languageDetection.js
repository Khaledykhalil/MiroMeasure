/**
 * Language Detection Utility
 * 
 * Automatically detects user's language based on:
 * 1. Browser's navigator.language (fast, client-side)
 * 2. IP-based geolocation (via API, more accurate)
 * 3. Fallback to English
 */

// Supported locales mapping
const SUPPORTED_LOCALES = {
  'en': 'en',
  'ru': 'ru',
  'pt-BR': 'pt-BR',
  'es': 'es',
  'de': 'de',
  'nl': 'nl',
  'sv': 'sv',
  'fr': 'fr',
  'it': 'it',
  'ar': 'ar',
  'ja': 'ja',
  'zh-CN': 'zh-CN',
  'zh-HK': 'zh-HK',
}

// Language code mappings (browser language -> our locale)
const LANGUAGE_MAP = {
  'en': 'en',
  'en-US': 'en',
  'en-GB': 'en',
  'ru': 'ru',
  'ru-RU': 'ru',
  'pt': 'pt-BR',
  'pt-BR': 'pt-BR',
  'pt-PT': 'pt-BR', // Portuguese -> Brazilian Portuguese
  'es': 'es',
  'es-ES': 'es',
  'es-MX': 'es',
  'es-AR': 'es',
  'de': 'de',
  'de-DE': 'de',
  'de-AT': 'de',
  'de-CH': 'de',
  'nl': 'nl',
  'nl-NL': 'nl',
  'nl-BE': 'nl',
  'sv': 'sv',
  'sv-SE': 'sv',
  'fr': 'fr',
  'fr-FR': 'fr',
  'fr-CA': 'fr',
  'it': 'it',
  'it-IT': 'it',
  'ar': 'ar',
  'ar-SA': 'ar',
  'ar-AE': 'ar',
  'ja': 'ja',
  'ja-JP': 'ja',
  'zh': 'zh-CN',
  'zh-CN': 'zh-CN',
  'zh-TW': 'zh-HK',
  'zh-HK': 'zh-HK',
}

/**
 * Detect language from browser's navigator.language
 * Fast, client-side, no API calls
 */
export function detectLanguageFromBrowser() {
  if (typeof window === 'undefined') return 'en'
  
  const browserLang = navigator.language || navigator.userLanguage
  
  // Try exact match first
  if (LANGUAGE_MAP[browserLang]) {
    return LANGUAGE_MAP[browserLang]
  }
  
  // Try language code only (e.g., 'en' from 'en-US')
  const langCode = browserLang.split('-')[0].toLowerCase()
  if (LANGUAGE_MAP[langCode]) {
    return LANGUAGE_MAP[langCode]
  }
  
  // Fallback to English
  return 'en'
}

/**
 * Detect language from IP-based geolocation
 * More accurate but requires API call
 * Uses free ipapi.co service
 */
export async function detectLanguageFromIP() {
  try {
    // Use ipapi.co for free IP geolocation
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error('IP geolocation failed')
    }
    
    const data = await response.json()
    const countryCode = data.country_code?.toLowerCase()
    
    // Map country codes to languages
    const countryToLanguage = {
      'us': 'en', 'gb': 'en', 'ca': 'en', 'au': 'en', 'nz': 'en', 'ie': 'en',
      'ru': 'ru',
      'br': 'pt-BR', 'pt': 'pt-BR',
      'es': 'es', 'mx': 'es', 'ar': 'es', 'co': 'es', 'cl': 'es', 'pe': 'es',
      'de': 'de', 'at': 'de', 'ch': 'de',
      'nl': 'nl', 'be': 'nl',
      'se': 'sv',
      'fr': 'fr', 'ca': 'fr', 'be': 'fr', 'ch': 'fr',
      'it': 'it', 'sm': 'it', 'va': 'it',
      'sa': 'ar', 'ae': 'ar', 'eg': 'ar', 'iq': 'ar', 'jo': 'ar',
      'jp': 'ja',
      'cn': 'zh-CN',
      'hk': 'zh-HK', 'tw': 'zh-HK',
    }
    
    if (countryToLanguage[countryCode]) {
      return countryToLanguage[countryCode]
    }
    
    // Fallback to browser language if country not found
    return detectLanguageFromBrowser()
  } catch (error) {
    console.warn('IP geolocation failed, using browser language:', error)
    // Fallback to browser language
    return detectLanguageFromBrowser()
  }
}

/**
 * Main language detection function
 * Tries multiple methods in order of preference
 */
export async function detectUserLanguage() {
  // Priority order:
  // 1. URL parameter (user explicitly selected)
  // 2. localStorage (user previously selected)
  // 3. IP geolocation (most accurate for first-time visitors)
  // 4. Browser language (fast fallback)
  
  if (typeof window === 'undefined') return 'en'
  
  // Check URL parameter first
  const urlParams = new URLSearchParams(window.location.search)
  const urlLang = urlParams.get('lang')
  if (urlLang && SUPPORTED_LOCALES[urlLang]) {
    return urlLang
  }
  
  // Check localStorage
  const storedLang = localStorage.getItem('locale')
  if (storedLang && SUPPORTED_LOCALES[storedLang]) {
    return storedLang
  }
  
  // Try IP geolocation (async, may take a moment)
  try {
    const ipLang = await detectLanguageFromIP()
    if (ipLang && SUPPORTED_LOCALES[ipLang]) {
      return ipLang
    }
  } catch (error) {
    console.warn('IP geolocation failed:', error)
  }
  
  // Fallback to browser language
  return detectLanguageFromBrowser()
}

/**
 * Quick synchronous language detection (for initial render)
 * Uses browser language only (fast, no API calls)
 */
export function detectLanguageSync() {
  if (typeof window === 'undefined') return 'en'
  
  // Check URL parameter
  const urlParams = new URLSearchParams(window.location.search)
  const urlLang = urlParams.get('lang')
  if (urlLang && SUPPORTED_LOCALES[urlLang]) {
    return urlLang
  }
  
  // Check localStorage
  const storedLang = localStorage.getItem('locale')
  if (storedLang && SUPPORTED_LOCALES[storedLang]) {
    return storedLang
  }
  
  // Use browser language
  return detectLanguageFromBrowser()
}

