'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader';
import { detectLanguageSync, detectUserLanguage } from '@/utils/languageDetection';

export default function SupportContact() {
  const [locale, setLocale] = useState('en')
  const [translations, setTranslations] = useState(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'technical',
    message: '',
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message || (translations ? t('support.form.error.default') : 'Failed to send your message. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Check if current locale is RTL (Arabic)
  const isRTL = locale === 'ar'

  if (submitted) {
    return (
      <div style={styles.container} dir={isRTL ? 'rtl' : 'ltr'} lang={locale}>
        <PageHeader />
        <div style={styles.successCard}>
          <div style={styles.successIcon}>✓</div>
          <h1 style={styles.successTitle}>{t('support.success.title')}</h1>
          <p style={styles.successText}>
            {t('support.success.text')} <strong>{formData.email}</strong> within 24 hours.
          </p>
          <p style={styles.successSubtext}>
            {t('support.success.subtext')}
          </p>
          <a href="mailto:support@measuremint.app" style={styles.emailLink}>
            support@measuremint.app
          </a>
          <button 
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                email: '',
                subject: '',
                category: 'technical',
                message: '',
              });
            }} 
            style={styles.backButton}
          >
            {t('support.success.sendAnother')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container} dir={isRTL ? 'rtl' : 'ltr'} lang={locale}>
      <PageHeader />
      <div style={styles.formCard}>
        <h1 style={styles.title}>📧 {t('support.title')}</h1>
        <p style={styles.subtitle}>
          {t('support.subtitle')}
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>{t('support.form.name')} *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder={t('support.form.placeholders.name')}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>{t('support.form.email')} *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder={t('support.form.placeholders.email')}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>{t('support.form.category')} *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              style={styles.select}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            >
              <option value="technical">{t('support.form.categories.technical')}</option>
              <option value="bug">{t('support.form.categories.bug')}</option>
              <option value="feature">{t('support.form.categories.feature')}</option>
              <option value="question">{t('support.form.categories.question')}</option>
              <option value="feedback">{t('support.form.categories.feedback')}</option>
              <option value="other">{t('support.form.categories.other')}</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>{t('support.form.subject')} *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder={t('support.form.placeholders.subject')}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>{t('support.form.message')} *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={8}
              style={styles.textarea}
              placeholder={t('support.form.placeholders.message')}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          {error && (
            <div style={styles.errorBox}>
              <strong>❌ {t('support.form.error.title')}</strong> {error}
              <p style={{marginTop: '12px', fontSize: '0.9em'}}>
                {t('support.form.error.emailDirect')}{' '}
                <a 
                  href={`mailto:support@measuremint.app?subject=${encodeURIComponent(formData.subject || t('support.title'))}&body=${encodeURIComponent(`${t('support.form.name')}: ${formData.name}\n${t('support.form.email')}: ${formData.email}\n${t('support.form.category')}: ${t(`support.form.categories.${formData.category}`)}\n\n${t('support.form.message')}:\n${formData.message}`)}`}
                  style={{color: '#3b82f6', textDecoration: 'underline'}}
                >
                  support@measuremint.app
                </a>
              </p>
            </div>
          )}

          <button 
            type="submit" 
            style={{
              ...styles.submitButton,
              opacity: isSubmitting ? 0.6 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
            }}
            disabled={isSubmitting}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            {isSubmitting ? t('support.form.sending') : t('support.form.submit') + ' →'}
          </button>
          
          <div style={{textAlign: 'center', marginTop: '16px', color: '#64748b', fontSize: '0.9em'}}>
            {t('support.form.trouble')}{' '}
            <a 
              href={`mailto:support@measuremint.app?subject=${encodeURIComponent(formData.subject || t('support.title'))}&body=${encodeURIComponent(`${t('support.form.name')}: ${formData.name}\n${t('support.form.email')}: ${formData.email}\n${t('support.form.category')}: ${t(`support.form.categories.${formData.category}`)}\n\n${t('support.form.message')}:\n${formData.message}`)}`}
              style={{color: '#3b82f6', textDecoration: 'none', borderBottom: '1px solid #3b82f6'}}
            >
              support@measuremint.app
            </a>
          </div>
        </form>

        <div style={styles.infoSection}>
          <h3 style={styles.infoTitle}>{t('support.otherWays.title')}</h3>
          
          <div style={styles.contactMethod}>
            <strong>📧 {t('support.otherWays.directEmail')}</strong>
            <a href="mailto:support@measuremint.app" style={styles.link}>
              support@measuremint.app
            </a>
          </div>

          <div style={styles.contactMethod}>
            <strong>🐛 {t('support.otherWays.bugReports')}</strong>
            <a href="https://github.com/Khaledykhalil/MeasureMint/issues" target="_blank" rel="noopener noreferrer" style={styles.link}>
              {t('support.otherWays.githubIssues')}
            </a>
          </div>

          <div style={styles.contactMethod}>
            <strong>📚 {t('support.otherWays.documentation')}</strong>
            <a href="/help" style={styles.link}>
              {t('support.otherWays.helpCenter')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px 20px 40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  formCard: {
    maxWidth: '600px',
    width: '100%',
    background: 'white',
    borderRadius: '12px',
    padding: 'clamp(24px, 5vw, 40px)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    marginTop: '20px',
  },
  successCard: {
    maxWidth: '500px',
    width: '100%',
    background: 'white',
    borderRadius: '12px',
    padding: '60px 40px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    margin: '40px auto',
  },
  title: {
    fontSize: '2.5em',
    marginBottom: '0.3em',
    color: '#1e293b',
  },
  subtitle: {
    color: '#64748b',
    marginBottom: '2em',
    lineHeight: '1.6',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5em',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5em',
  },
  label: {
    fontWeight: '600',
    color: '#334155',
    fontSize: '0.95em',
  },
  input: {
    padding: '12px 16px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '1em',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
    outline: 'none',
  },
  select: {
    padding: '12px 16px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '1em',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
    outline: 'none',
    background: 'white',
    cursor: 'pointer',
  },
  textarea: {
    padding: '12px 16px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '1em',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
    outline: 'none',
    resize: 'vertical',
  },
  submitButton: {
    padding: '14px 32px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1em',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    marginTop: '1em',
  },
  infoSection: {
    marginTop: '3em',
    paddingTop: '2em',
    borderTop: '2px solid #e2e8f0',
  },
  infoTitle: {
    fontSize: '1.2em',
    marginBottom: '1em',
    color: '#1e293b',
  },
  contactMethod: {
    marginBottom: '1em',
    padding: '12px',
    background: '#f8fafc',
    borderRadius: '6px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3em',
  },
  link: {
    color: '#3b82f6',
    textDecoration: 'none',
    borderBottom: '1px solid transparent',
    transition: 'border-color 0.2s',
  },
  successIcon: {
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3em',
    margin: '0 auto 1em',
    fontWeight: 'bold',
  },
  successTitle: {
    fontSize: '2em',
    marginBottom: '0.5em',
    color: '#1e293b',
  },
  successText: {
    color: '#64748b',
    marginBottom: '1.5em',
    lineHeight: '1.6',
  },
  emailLink: {
    fontSize: '1.3em',
    fontWeight: '600',
    color: '#3b82f6',
    textDecoration: 'none',
    display: 'inline-block',
    marginBottom: '2em',
    padding: '10px 20px',
    background: '#f1f5f9',
    borderRadius: '6px',
  },
  backButton: {
    padding: '12px 24px',
    background: 'white',
    color: '#667eea',
    border: '2px solid #667eea',
    borderRadius: '8px',
    fontSize: '1em',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  successSubtext: {
    color: '#94a3b8',
    fontSize: '0.9em',
    marginBottom: '1em',
  },
  errorBox: {
    padding: '16px',
    background: '#fee2e2',
    border: '2px solid #ef4444',
    borderRadius: '8px',
    color: '#991b1b',
    marginBottom: '1em',
  },
};
