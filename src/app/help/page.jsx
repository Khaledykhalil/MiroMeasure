'use client'

import { useEffect, useState } from 'react'
import PageHeader from '@/components/PageHeader'
import { detectLanguageSync } from '@/utils/languageDetection'

export default function HelpCenter() {
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
        const mod = await import(`../../../messages/${locale}.json`)
        setTranslations(mod.default)
      } catch (err) {
        try {
          const mod = await import('../../../messages/en.json')
          setTranslations(mod.default)
        } catch {
          setTranslations({})
        }
      }
    }
    
    loadTranslations()
  }, [locale])

  const t = (key) => {
    if (!translations) {
      const keys = key.split('.')
      return keys[keys.length - 1] || key
    }
    const keys = key.split('.')
    let value = translations
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }
  // Render help center directly in JSX for better Next.js compatibility
  const htmlContent = `
    <h1>📚 ${t('help.title')}</h1>
    <p>${t('help.welcome')}</p>
    
    <h2>🚀 ${t('help.quickStart.title')}</h2>
    <ol>
      <li><strong>${t('help.quickStart.step1')}</strong></li>
      <li><strong>${t('help.quickStart.step2')}</strong></li>
      <li><strong>${t('help.quickStart.step3')}</strong></li>
      <li><strong>${t('help.quickStart.step4')}</strong></li>
    </ol>
    
    <h2>📖 ${t('help.documentation.title')}</h2>
    <p>${t('help.documentation.text')} <a href="https://github.com/Khaledykhalil/MeasureMint/blob/main/docs/USER_GUIDE.md" target="_blank">${t('help.resources.userGuide')}</a></p>
    
    <h2>❓ ${t('help.faq.title')}</h2>
    
    <h3>${t('help.faq.general.title')}</h3>
    <p><strong>Q: ${t('help.faq.general.q1')}</strong><br/>
    A: ${t('help.faq.general.a1')}</p>
    
    <p><strong>Q: ${t('help.faq.general.q2')}</strong><br/>
    A: ${t('help.faq.general.a2')}</p>
    
    <p><strong>Q: ${t('help.faq.general.q3')}</strong><br/>
    A: ${t('help.faq.general.a3')}</p>
    
    <h3>${t('help.faq.calibration.title')}</h3>
    <p><strong>Q: ${t('help.faq.calibration.q1')}</strong><br/>
    A: ${t('help.faq.calibration.a1')}</p>
    
    <p><strong>Q: ${t('help.faq.calibration.q2')}</strong><br/>
    A: ${t('help.faq.calibration.a2')}</p>
    
    <h3>${t('help.faq.measurement.title')}</h3>
    <p><strong>Q: ${t('help.faq.measurement.q1')}</strong><br/>
    A: ${t('help.faq.measurement.a1')}</p>
    
    <p><strong>Q: ${t('help.faq.measurement.q2')}</strong><br/>
    A: ${t('help.faq.measurement.a2')}</p>
    
    <h2>🔧 ${t('help.troubleshooting.title')}</h2>
    
    <h3>${t('help.troubleshooting.calibration.title')}</h3>
    <p><strong>${t('help.troubleshooting.calibration.problem')}</strong></p>
    <ul>
      <li>${t('help.troubleshooting.calibration.solutions.0')}</li>
      <li>${t('help.troubleshooting.calibration.solutions.1')}</li>
      <li>${t('help.troubleshooting.calibration.solutions.2')}</li>
      <li>${t('help.troubleshooting.calibration.solutions.3')}</li>
    </ul>
    
    <h3>${t('help.troubleshooting.measurement.title')}</h3>
    <p><strong>${t('help.troubleshooting.measurement.problem')}</strong></p>
    <ul>
      <li>${t('help.troubleshooting.measurement.solutions.0')}</li>
      <li>${t('help.troubleshooting.measurement.solutions.1')}</li>
      <li>${t('help.troubleshooting.measurement.solutions.2')}</li>
      <li>${t('help.troubleshooting.measurement.solutions.3')}</li>
    </ul>
    
    <h2>📧 ${t('help.contact.title')}</h2>
    <p>${t('help.contact.text')}</p>
    
    <div style="background: #f1f5f9; border-radius: 8px; padding: 1.5em; margin: 1.5em 0;">
      <h3 style="margin-top: 0;">📧 ${t('help.contact.email')}</h3>
      <p><strong>${t('help.contact.emailAddress')}:</strong> <a href="mailto:support@measuremint.app">support@measuremint.app</a></p>
      <p><strong>${t('help.contact.responseTime')}</strong></p>
      <p><strong>${t('help.contact.bestFor')}</strong></p>
    </div>
    
    <div style="background: #f1f5f9; border-radius: 8px; padding: 1.5em; margin: 1.5em 0;">
      <h3 style="margin-top: 0;">🐛 ${t('help.contact.bugReports')}</h3>
      <p><strong>${t('help.contact.githubIssues')}:</strong> <a href="https://github.com/Khaledykhalil/MeasureMint/issues" target="_blank">GitHub Issues</a></p>
      <p>${t('help.contact.include')}</p>
    </div>
    
    <h2>🌍 ${t('help.units.title')}</h2>
    <ul>
      <li><strong>${t('help.units.imperial.ft')}</strong></li>
      <li><strong>${t('help.units.imperial.in')}</strong></li>
      <li><strong>${t('help.units.metric.m')}</strong></li>
      <li><strong>${t('help.units.metric.cm')}</strong></li>
      <li><strong>${t('help.units.metric.mm')}</strong></li>
      <li><strong>${t('help.units.imperial.yd')}</strong></li>
      <li><strong>${t('help.units.imperial.mi')}</strong></li>
      <li><strong>${t('help.units.metric.km')}</strong></li>
    </ul>
    
    <h2>📚 ${t('help.resources.title')}</h2>
    <ul>
      <li><a href="https://github.com/Khaledykhalil/MeasureMint/blob/main/docs/USER_GUIDE.md" target="_blank">${t('help.resources.userGuide')}</a></li>
      <li><a href="https://github.com/Khaledykhalil/MeasureMint/blob/main/docs/TECHNICAL.md" target="_blank">${t('help.resources.technical')}</a></li>
      <li><a href="https://github.com/Khaledykhalil/MeasureMint" target="_blank">${t('help.resources.github')}</a></li>
    </ul>
    
    <hr style="margin: 3em 0; border: none; border-top: 2px solid #e2e8f0;">
    
    <p style="text-align: center; color: #64748b;">
      <strong>Last Updated:</strong> November 3, 2025 &nbsp;|&nbsp; 
      <strong>Version:</strong> 2.0.0 &nbsp;|&nbsp; 
      <strong>Support:</strong> <a href="mailto:support@measuremint.app">support@measuremint.app</a>
    </p>
  `;
  
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          body {
            margin: 0;
            padding: 0;
            background: #f8fafc;
          }
          
          .help-center-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 40px 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.7;
            color: #1e293b;
            background: white;
            min-height: 100vh;
          }
          
          .help-center-container h1 {
            font-size: 3em;
            margin-bottom: 0.3em;
            color: #0f172a;
            border-bottom: 3px solid #3b82f6;
            padding-bottom: 0.3em;
          }
          
          .help-center-container h2 {
            font-size: 2em;
            margin-top: 2em;
            margin-bottom: 0.7em;
            color: #1e293b;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 0.3em;
          }
          
          .help-center-container h3 {
            font-size: 1.5em;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
            color: #334155;
          }
          
          .help-center-container h4 {
            font-size: 1.2em;
            margin-top: 1.2em;
            margin-bottom: 0.5em;
            color: #475569;
            font-weight: 600;
          }
          
          .help-center-container p {
            margin-bottom: 1.2em;
            color: #475569;
          }
          
          .help-center-container ul, .help-center-container ol {
            margin-bottom: 1.2em;
            padding-left: 2em;
          }
          
          .help-center-container li {
            margin-bottom: 0.6em;
            color: #475569;
          }
          
          .help-center-container a {
            color: #3b82f6;
            text-decoration: none;
            border-bottom: 1px solid transparent;
            transition: border-color 0.2s;
          }
          
          .help-center-container a:hover {
            border-bottom-color: #3b82f6;
          }
          
          .help-center-container code {
            background: #f1f5f9;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-size: 0.9em;
            color: #e11d48;
            font-family: 'Monaco', 'Courier New', monospace;
          }
          
          .help-center-container pre {
            background: #0f172a;
            color: #e2e8f0;
            padding: 1.5em;
            border-radius: 8px;
            overflow-x: auto;
            margin-bottom: 1.5em;
          }
          
          .help-center-container pre code {
            background: transparent;
            color: #e2e8f0;
            padding: 0;
          }
          
          .help-center-container blockquote {
            border-left: 4px solid #3b82f6;
            padding-left: 1.5em;
            margin-left: 0;
            color: #64748b;
            font-style: italic;
          }
          
          .help-center-container hr {
            border: none;
            border-top: 2px solid #e2e8f0;
            margin: 3em 0;
          }
          
          .help-center-container table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 1.5em;
          }
          
          .help-center-container th,
          .help-center-container td {
            border: 1px solid #e2e8f0;
            padding: 0.75em;
            text-align: left;
          }
          
          .help-center-container th {
            background: #f1f5f9;
            font-weight: 600;
            color: #1e293b;
          }
          
          .help-center-container strong {
            color: #0f172a;
            font-weight: 600;
          }
          
          /* Emoji styling */
          .help-center-container h2:has(+ hr),
          .help-center-container h1:first-child {
            display: flex;
            align-items: center;
            gap: 0.3em;
          }
          
          /* Back to top button */
          .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #3b82f6;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            transition: transform 0.2s, box-shadow 0.2s;
          }
          
          .back-to-top:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
          }
          
          /* Search box placeholder */
          .search-box {
            background: #f1f5f9;
            border: 2px solid #cbd5e1;
            border-radius: 8px;
            padding: 1em;
            margin-bottom: 2em;
            display: flex;
            align-items: center;
            gap: 0.5em;
          }
          
          .search-box::before {
            content: "🔍";
            font-size: 1.2em;
          }
          
          @media (max-width: 768px) {
            .help-center-container {
              padding: 20px 15px;
            }
            
            .help-center-container h1 {
              font-size: 2em;
            }
            
            .help-center-container h2 {
              font-size: 1.5em;
            }
            
            .help-center-container h3 {
              font-size: 1.3em;
            }
            
            .back-to-top {
              bottom: 20px;
              right: 20px;
              width: 40px;
              height: 40px;
            }
          }
        `
      }} />
      <PageHeader />
      <div className="help-center-container">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        <a href="#" className="back-to-top" title="Back to top">↑</a>
      </div>
    </>
  );
}
