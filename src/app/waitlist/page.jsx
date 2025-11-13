'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import { detectLanguageSync } from '@/utils/languageDetection';

export default function WaitlistPage() {
  const [locale, setLocale] = useState('en')
  const [translations, setTranslations] = useState(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profession: '',
    company: '',
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message || 'Failed to join waitlist. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={styles.container}>
        <PageHeader />
        <main style={styles.main}>
          <div style={styles.successCard}>
            <div style={styles.successIcon}>✓</div>
            <h1 style={styles.successTitle}>{t('waitlist.success.title')}</h1>
            <p style={styles.successText}>
              {t('waitlist.success.text')} <strong>{formData.name}</strong>!
            </p>
            <p style={styles.successSubtext}>
              {t('waitlist.success.subtext')} <strong>{formData.email}</strong>
            </p>
            <div style={styles.nextStepsContainer}>
              <h2 style={styles.nextStepsTitle}>{t('waitlist.success.nextSteps')}</h2>
              <div style={styles.stepsGrid}>
                <div style={styles.step}>
                  <div style={styles.stepIcon}>📧</div>
                  <h3 style={styles.stepTitle}>{t('waitlist.success.confirmation.title')}</h3>
                  <p style={styles.stepText}>{t('waitlist.success.confirmation.text')}</p>
                </div>
                <div style={styles.step}>
                  <div style={styles.stepIcon}>🎉</div>
                  <h3 style={styles.stepTitle}>{t('waitlist.success.launch.title')}</h3>
                  <p style={styles.stepText}>{t('waitlist.success.launch.text')}</p>
                </div>
                <div style={styles.step}>
                  <div style={styles.stepIcon}>🌟</div>
                  <h3 style={styles.stepTitle}>{t('waitlist.success.earlyAccess.title')}</h3>
                  <p style={styles.stepText}>{t('waitlist.success.earlyAccess.text')}</p>
                </div>
              </div>
            </div>
            <Link href="/">
              <button style={styles.backButton}>{t('waitlist.success.backToHome')}</button>
            </Link>
          </div>
        </main>

        <footer style={styles.footer}>
          <div style={styles.footerContent}>
            <p style={styles.footerText}>© 2025 MeasureMint. All rights reserved.</p>
            <div style={styles.footerLinks}>
              <Link href="/support" style={styles.footerLink}>Support</Link>
              <Link href="/privacy" style={styles.footerLink}>Privacy</Link>
              <Link href="/terms" style={styles.footerLink}>Terms</Link>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <PageHeader />
      <main style={styles.main}>
        <div style={styles.heroSection}>
          <h1 style={styles.heroTitle}>{t('waitlist.title')}</h1>
          <p style={styles.heroSubtitle}>
            {t('waitlist.subtitle')}
          </p>
        </div>

        <div style={styles.formCard}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>{t('waitlist.form.name')} *</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder={t('waitlist.form.placeholders.name')}
                required
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>{t('waitlist.form.email')} *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder={t('waitlist.form.placeholders.email')}
                required
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="profession" style={styles.label}>{t('waitlist.form.profession')} *</label>
              <input
                id="profession"
                name="profession"
                type="text"
                placeholder={t('waitlist.form.placeholders.profession')}
                required
                value={formData.profession}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="company" style={styles.label}>{t('waitlist.form.company')} *</label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder={t('waitlist.form.placeholders.company')}
                required
                value={formData.company}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            {error && (
              <div style={styles.errorBox}>
                <strong>❌ Error:</strong> {error}
              </div>
            )}

            <div style={styles.submitContainer}>
              <button
                type="submit"
                style={{
                  ...styles.submitButton,
                  opacity: isSubmitting ? 0.6 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? t('waitlist.form.submitting') : t('waitlist.form.submit')}
              </button>
            </div>
          </form>

          <p style={styles.privacyNote}>
            {t('waitlist.privacyNote')}
          </p>
        </div>

        <div style={styles.nextStepsContainer}>
          <h2 style={styles.nextStepsTitle}>{t('waitlist.success.nextSteps')}</h2>
          <div style={styles.stepsGrid}>
            <div style={styles.step}>
              <div style={styles.stepIcon}>📧</div>
              <h3 style={styles.stepTitle}>{t('waitlist.success.confirmation.title')}</h3>
              <p style={styles.stepText}>{t('waitlist.success.confirmation.text')}</p>
            </div>
            <div style={styles.step}>
              <div style={styles.stepIcon}>🎉</div>
              <h3 style={styles.stepTitle}>{t('waitlist.success.launch.title')}</h3>
              <p style={styles.stepText}>{t('waitlist.success.launch.text')}</p>
            </div>
            <div style={styles.step}>
              <div style={styles.stepIcon}>🌟</div>
              <h3 style={styles.stepTitle}>{t('waitlist.success.earlyAccess.title')}</h3>
              <p style={styles.stepText}>{t('waitlist.success.earlyAccess.text')}</p>
            </div>
          </div>
        </div>
      </main>

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <p style={styles.footerText}>© 2025 MeasureMint. All rights reserved.</p>
          <div style={styles.footerLinks}>
            <Link href="/support" style={styles.footerLink}>Support</Link>
            <Link href="/privacy" style={styles.footerLink}>Privacy</Link>
            <Link href="/terms" style={styles.footerLink}>Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
  },
  logo: {
    width: '40px',
    height: '40px',
    background: '#10bb82',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize: '20px',
  },
  brandContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  brandName: {
    fontSize: '20px',
    fontWeight: '700',
    color: 'white',
    letterSpacing: '-0.5px',
  },
  brandTagline: {
    fontSize: '10px',
    color: 'rgba(255, 255, 255, 0.7)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  navLink: {
    color: 'rgba(255, 255, 255, 0.9)',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
  },
  launchButton: {
    padding: '10px 20px',
    background: '#10bb82',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  main: {
    flex: 1,
    maxWidth: '800px',
    width: '100%',
    margin: '0 auto',
    padding: '60px 20px',
  },
  heroSection: {
    textAlign: 'center',
    marginBottom: '48px',
  },
  heroTitle: {
    fontSize: '56px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '16px',
    letterSpacing: '-2px',
  },
  heroSubtitle: {
    fontSize: '20px',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: '1.6',
  },
  formCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '48px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    marginBottom: '64px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#334155',
  },
  input: {
    padding: '12px 16px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '16px',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
    outline: 'none',
  },
  submitContainer: {
    paddingTop: '16px',
  },
  submitButton: {
    width: '100%',
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  privacyNote: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#64748b',
    marginTop: '24px',
  },
  errorBox: {
    padding: '16px',
    background: '#fee2e2',
    border: '2px solid #ef4444',
    borderRadius: '8px',
    color: '#991b1b',
  },
  nextStepsContainer: {
    textAlign: 'center',
    marginTop: '64px',
  },
  nextStepsTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '32px',
  },
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '32px',
    textAlign: 'center',
  },
  step: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    padding: '32px 24px',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  stepIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  stepTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '8px',
  },
  stepText: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: '1.5',
  },
  footer: {
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '32px 24px',
    background: 'rgba(0, 0, 0, 0.2)',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  },
  footerText: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  footerLinks: {
    display: 'flex',
    gap: '24px',
  },
  footerLink: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none',
  },
  successCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '60px 48px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
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
    fontSize: '48px',
    margin: '0 auto 24px',
    fontWeight: 'bold',
  },
  successTitle: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '16px',
  },
  successText: {
    fontSize: '18px',
    color: '#64748b',
    marginBottom: '24px',
    lineHeight: '1.6',
  },
  successSubtext: {
    fontSize: '16px',
    color: '#94a3b8',
    marginBottom: '48px',
  },
  backButton: {
    padding: '12px 24px',
    background: 'white',
    color: '#667eea',
    border: '2px solid #667eea',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginTop: '32px',
  },
};

