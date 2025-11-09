'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminWaitlistPage() {
  const [waitlist, setWaitlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const fetchWaitlist = async (key) => {
    try {
      setLoading(true);
      const response = await fetch('/api/waitlist', {
        headers: {
          'Authorization': `Bearer ${key}`
        }
      });

      if (response.status === 401) {
        setError('Invalid API key');
        setAuthenticated(false);
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch waitlist');
      }

      const data = await response.json();
      setWaitlist(data.waitlist || []);
      setAuthenticated(true);
      setError(null);
      
      // Store API key in session
      sessionStorage.setItem('admin_api_key', key);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if API key is stored in session
    const storedKey = sessionStorage.getItem('admin_api_key');
    if (storedKey) {
      setApiKey(storedKey);
      fetchWaitlist(storedKey);
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    fetchWaitlist(apiKey);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_api_key');
    setAuthenticated(false);
    setApiKey('');
    setWaitlist([]);
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Profession', 'Company', 'Joined Date'];
    const rows = waitlist.map(entry => [
      entry.id,
      entry.name,
      entry.email,
      entry.profession,
      entry.company,
      new Date(entry.created_at).toLocaleString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `measuremint-waitlist-${Date.now()}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  if (!authenticated) {
    return (
      <div style={styles.container}>
        <div style={styles.loginCard}>
          <h1 style={styles.title}>Admin Login</h1>
          <p style={styles.subtitle}>Enter your admin API key to view the waitlist</p>
          
          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="password"
              placeholder="Admin API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              style={styles.input}
              required
            />
            
            {error && (
              <div style={styles.error}>{error}</div>
            )}
            
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>
          
          <Link href="/" style={styles.backLink}>← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>Waitlist Admin</h1>
          <p style={styles.pageSubtitle}>{waitlist.length} signups</p>
        </div>
        <div style={styles.headerActions}>
          <button onClick={exportToCSV} style={styles.exportButton}>
            📥 Export CSV
          </button>
          <button onClick={() => fetchWaitlist(apiKey)} style={styles.refreshButton}>
            🔄 Refresh
          </button>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div style={styles.loading}>Loading...</div>
      ) : error ? (
        <div style={styles.error}>{error}</div>
      ) : waitlist.length === 0 ? (
        <div style={styles.empty}>
          <p>No signups yet. Share your waitlist page!</p>
          <Link href="/waitlist" style={styles.link}>View Waitlist Page →</Link>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Profession</th>
                <th style={styles.th}>Company</th>
                <th style={styles.th}>Joined</th>
              </tr>
            </thead>
            <tbody>
              {waitlist.map((entry) => (
                <tr key={entry.id} style={styles.tableRow}>
                  <td style={styles.td}>{entry.id}</td>
                  <td style={styles.td}>{entry.name}</td>
                  <td style={styles.td}>
                    <a href={`mailto:${entry.email}`} style={styles.emailLink}>
                      {entry.email}
                    </a>
                  </td>
                  <td style={styles.td}>{entry.profession}</td>
                  <td style={styles.td}>{entry.company}</td>
                  <td style={styles.td}>
                    {new Date(entry.created_at).toLocaleDateString()} {new Date(entry.created_at).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px 20px',
  },
  loginCard: {
    maxWidth: '400px',
    margin: '100px auto',
    background: 'white',
    borderRadius: '16px',
    padding: '48px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '8px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '32px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    padding: '12px 16px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '16px',
    fontFamily: 'inherit',
    outline: 'none',
  },
  button: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  error: {
    padding: '12px',
    background: '#fee2e2',
    border: '1px solid #ef4444',
    borderRadius: '8px',
    color: '#991b1b',
    fontSize: '14px',
  },
  backLink: {
    display: 'block',
    textAlign: 'center',
    marginTop: '24px',
    color: '#667eea',
    textDecoration: 'none',
    fontSize: '14px',
  },
  header: {
    maxWidth: '1400px',
    margin: '0 auto 32px',
    background: 'white',
    borderRadius: '16px',
    padding: '24px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  },
  pageTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '4px',
  },
  pageSubtitle: {
    fontSize: '14px',
    color: '#64748b',
  },
  headerActions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  exportButton: {
    padding: '10px 20px',
    background: '#10bb82',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  refreshButton: {
    padding: '10px 20px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  logoutButton: {
    padding: '10px 20px',
    background: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
    color: 'white',
    fontSize: '18px',
    padding: '40px',
  },
  empty: {
    maxWidth: '600px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '16px',
    padding: '48px',
    textAlign: 'center',
  },
  link: {
    color: '#667eea',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '600',
  },
  tableContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    borderBottom: '2px solid #e2e8f0',
  },
  th: {
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  tableRow: {
    borderBottom: '1px solid #e2e8f0',
  },
  td: {
    padding: '16px',
    fontSize: '14px',
    color: '#1e293b',
  },
  emailLink: {
    color: '#667eea',
    textDecoration: 'none',
  },
};

