/**
 * Header component for the panel
 */

import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { getStyles } from '../constants/styles';

export default function Header({ darkMode, setDarkMode }) {
  const styles = getStyles(darkMode);

  return (
    <header style={styles.header}>
      <div style={styles.logoSection}>
        <img 
          src="/logo.svg" 
          alt="MeasureMint Logo" 
          style={{
            width: '32px',
            height: '32px',
            marginRight: '4px'
          }}
        />
        <div style={styles.brand}>
          <div style={styles.brandName}>MeasureMint</div>
          <div style={styles.brandTagline}>Professional Measurement Tool</div>
        </div>
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          padding: '8px 12px',
          border: 'none',
          borderRadius: '8px',
          background: darkMode ? '#2c2c2e' : 'white',
          color: darkMode ? '#ffffff' : '#4a5568',
          cursor: 'pointer',
          fontSize: '18px',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
        title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {darkMode ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
      </button>
    </header>
  );
}

