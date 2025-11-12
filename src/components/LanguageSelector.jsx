'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { MdLanguage, MdCheck } from 'react-icons/md'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'pt-BR', name: 'Português (BR)', flag: '🇧🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'zh-HK', name: '繁體中文', flag: '🇭🇰' },
]

export default function LanguageSelector() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [currentLocale, setCurrentLocale] = useState('en')
  const dropdownRef = useRef(null)

  // Get current locale from URL or localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const urlLocale = urlParams.get('lang')
      const storedLocale = localStorage.getItem('locale')
      const currentLocale = urlLocale || storedLocale || 'en'
      setCurrentLocale(currentLocale)
      if (urlLocale) {
        localStorage.setItem('locale', urlLocale)
      }
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleLanguageChange = (newLocale) => {
    // Store preference
    localStorage.setItem('locale', newLocale)
    setCurrentLocale(newLocale)
    
    // Update URL without full reload
    const url = new URL(window.location.href)
    url.searchParams.set('lang', newLocale)
    window.history.pushState({}, '', url)
    
    // Trigger page reload to apply new language
    window.location.reload()
  }

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0]

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <MdLanguage size={20} />
        <span className="hidden sm:inline">{currentLanguage.flag}</span>
        <span className="hidden md:inline">{currentLanguage.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 max-h-96 overflow-y-auto">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors ${
                currentLocale === language.code ? 'bg-gray-50' : ''
              }`}
            >
              <span className="text-xl">{language.flag}</span>
              <span className="flex-1 font-medium text-gray-900">
                {language.name}
              </span>
              {currentLocale === language.code && (
                <MdCheck size={18} className="text-[#10bb82]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

