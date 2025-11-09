/**
 * Custom Modal component (replaces browser alerts/confirms)
 */

import { getStyles } from '../constants/styles';

export default function CustomModal({ customModal, darkMode }) {
  const styles = getStyles(darkMode);

  if (!customModal.show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000
    }}>
      <div style={{
        background: darkMode ? '#2c2c2e' : 'white',
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '500px',
        width: '90%',
        boxShadow: darkMode ? '0 10px 40px rgba(0, 0, 0, 0.6)' : '0 10px 40px rgba(0, 0, 0, 0.2)'
      }}>
        <h3 style={{
          margin: '0 0 16px 0',
          fontSize: '18px',
          fontWeight: '600',
          color: darkMode ? '#ffffff' : '#1a202c'
        }}>
          {customModal.title}
        </h3>
        <p style={{
          margin: '0 0 24px 0',
          fontSize: '14px',
          color: darkMode ? '#aeaeb2' : '#4a5568',
          whiteSpace: 'pre-line',
          lineHeight: '1.6'
        }}>
          {customModal.message}
        </p>
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end'
        }}>
          {customModal.type === 'confirm' && (
            <button
              onClick={customModal.onCancel}
              style={{
                ...styles.btnSecondary,
                padding: '10px 20px'
              }}
            >
              Cancel
            </button>
          )}
          <button
            onClick={customModal.onConfirm}
            style={{
              ...styles.btnPrimary,
              padding: '10px 20px'
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

