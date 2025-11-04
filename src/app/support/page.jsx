'use client';

import { useState } from 'react';

export default function SupportContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'technical',
    message: '',
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`[${formData.category.toUpperCase()}] ${formData.subject}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Category: ${formData.category}\n\n` +
      `Message:\n${formData.message}\n\n` +
      `---\n` +
      `Sent from MeasureMint Support Form`
    );
    
    window.location.href = `mailto:support@measuremint.app?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div style={styles.container}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}>✓</div>
          <h1 style={styles.successTitle}>Email Client Opened!</h1>
          <p style={styles.successText}>
            Your default email client should open with your message pre-filled.
            If it didn't open automatically, please email us directly at:
          </p>
          <a href="mailto:support@measuremint.app" style={styles.emailLink}>
            support@measuremint.app
          </a>
          <button 
            onClick={() => setSubmitted(false)} 
            style={styles.backButton}
          >
            ← Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h1 style={styles.title}>📧 Contact Support</h1>
        <p style={styles.subtitle}>
          Need help? We're here for you! Fill out the form below and we'll get back to you within 24 hours.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Your full name"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="your.email@example.com"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="technical">Technical Issue</option>
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
              <option value="question">General Question</option>
              <option value="feedback">Feedback</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Subject *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Brief description of your issue"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={8}
              style={styles.textarea}
              placeholder="Please provide as much detail as possible. Include:
• What you were trying to do
• What happened instead
• Browser and Miro plan type
• Any error messages
• Steps to reproduce (if applicable)"
            />
          </div>

          <button type="submit" style={styles.submitButton}>
            Send Message →
          </button>
        </form>

        <div style={styles.infoSection}>
          <h3 style={styles.infoTitle}>Other Ways to Reach Us</h3>
          
          <div style={styles.contactMethod}>
            <strong>📧 Direct Email:</strong>
            <a href="mailto:support@measuremint.app" style={styles.link}>
              support@measuremint.app
            </a>
          </div>

          <div style={styles.contactMethod}>
            <strong>🐛 Bug Reports:</strong>
            <a href="https://github.com/Khaledykhalil/MeasureMint/issues" target="_blank" rel="noopener noreferrer" style={styles.link}>
              GitHub Issues
            </a>
          </div>

          <div style={styles.contactMethod}>
            <strong>📚 Documentation:</strong>
            <a href="/help" style={styles.link}>
              Help Center
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
    padding: '40px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formCard: {
    maxWidth: '600px',
    width: '100%',
    background: 'white',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
  successCard: {
    maxWidth: '500px',
    width: '100%',
    background: 'white',
    borderRadius: '12px',
    padding: '60px 40px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
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
};
