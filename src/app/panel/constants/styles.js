/**
 * Style definitions for the panel
 */

export const getStyles = (darkMode) => ({
  body: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    background: darkMode ? 'linear-gradient(135deg, #1c1c1e 0%, #2c2c2e 100%)' : 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
    minHeight: '100vh',
    maxHeight: '100vh',
    overflow: 'auto',
    padding: '12px'
  },
  container: {
    maxWidth: '100%',
    margin: '0 auto'
  },
  header: {
    background: darkMode ? '#2c2c2e' : 'white',
    borderRadius: '12px',
    padding: '12px 16px',
    marginBottom: '12px',
    boxShadow: darkMode ? '0 1px 3px rgba(0, 0, 0, 0.4)' : '0 1px 3px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  logo: {
    width: '24px',
    height: '24px',
    background: '#10bb82',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize: '14px'
  },
  brand: {
    display: 'flex',
    flexDirection: 'column'
  },
  brandName: {
    fontSize: '16px',
    fontWeight: '700',
    color: darkMode ? '#ffffff' : '#1a202c',
    letterSpacing: '-0.5px'
  },
  brandTagline: {
    fontSize: '10px',
    color: darkMode ? '#8e8e93' : '#718096',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  unitToggle: {
    display: 'flex',
    gap: '4px',
    background: darkMode ? '#1c1c1e' : '#f7fafc',
    padding: '3px',
    borderRadius: '8px'
  },
  unitBtn: {
    padding: '6px 12px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: darkMode ? '#aeaeb2' : '#4a5568',
    background: 'transparent'
  },
  unitBtnActive: {
    background: darkMode ? '#2c2c2e' : 'white',
    color: '#10bb82',
    boxShadow: darkMode ? '0 2px 4px rgba(0, 0, 0, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.08)'
  },
  panel: {
    background: darkMode ? '#2c2c2e' : 'white',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: darkMode ? '0 1px 3px rgba(0, 0, 0, 0.4)' : '0 1px 3px rgba(0, 0, 0, 0.05)',
    marginBottom: '12px'
  },
  panelTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: darkMode ? '#8e8e93' : '#718096',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '12px',
    paddingBottom: '8px',
    borderBottom: darkMode ? '2px solid #3a3a3c' : '2px solid #e2e8f0'
  },
  toolsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '8px'
  },
  toolCard: {
    background: darkMode ? '#1c1c1e' : '#f8fafc',
    border: darkMode ? '2px solid #3a3a3c' : '2px solid #2d3748',
    borderRadius: '8px',
    padding: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    position: 'relative',
    overflow: 'hidden',
    outline: 'none'
  },
  toolCardHover: {
    borderColor: '#10bb82',
    boxShadow: '0 4px 8px rgba(16, 187, 130, 0.15)',
    transform: 'translateY(-1px)'
  },
  toolIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontSize: '18px'
  },
  toolIcon1: {
    background: '#10bb82'
  },
  toolIcon2: {
    background: '#10bb82'
  },
  toolIcon3: {
    background: '#10bb82'
  },
  toolIcon4: {
    background: '#10bb82'
  },
  toolContent: {
    flex: 1,
    minWidth: 0
  },
  toolName: {
    fontSize: '13px',
    fontWeight: '600',
    color: darkMode ? '#ffffff' : '#1a202c',
    marginBottom: '2px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  toolDescription: {
    fontSize: '11px',
    color: darkMode ? '#8e8e93' : '#718096',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  emptyCard: {
    background: darkMode ? '#1c1c1e' : '#fafafa',
    border: darkMode ? '2px dashed #3a3a3c' : '2px dashed #cbd5e0',
    borderRadius: '12px',
    padding: '32px',
    textAlign: 'center',
    color: darkMode ? '#636366' : '#a0aec0',
    cursor: 'default'
  },
  emptyIcon: {
    fontSize: '32px',
    marginBottom: '8px'
  },
  measurementDisplay: {
    background: darkMode ? '#1c1c1e' : 'white',
    border: '2px solid #10bb82',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '16px',
    textAlign: 'center'
  },
  measurementValue: {
    fontSize: '42px',
    fontWeight: '700',
    color: '#10bb82',
    marginBottom: '8px',
    fontFamily: 'monospace'
  },
  measurementUnit: {
    fontSize: '16px',
    color: darkMode ? '#8e8e93' : '#718096',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: '600'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modalContent: {
    background: darkMode ? '#2c2c2e' : 'white',
    borderRadius: '16px',
    padding: '32px',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: darkMode ? '0 20px 60px rgba(0,0,0,0.6)' : '0 20px 60px rgba(0,0,0,0.3)'
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: darkMode ? '#ffffff' : '#1a202c',
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: darkMode ? '2px solid #3a3a3c' : '2px solid #e2e8f0'
  },
  formGroup: {
    marginBottom: '24px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '8px',
    color: darkMode ? '#aeaeb2' : '#4a5568',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: darkMode ? '2px solid #3a3a3c' : '2px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '16px',
    boxSizing: 'border-box',
    fontFamily: 'monospace',
    transition: 'border-color 0.2s ease',
    background: darkMode ? '#1c1c1e' : 'white',
    color: darkMode ? '#ffffff' : '#1a202c'
  },
  unitGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px'
  },
  unitGridBtn: {
    padding: '12px 16px',
    border: darkMode ? '2px solid #3a3a3c' : '2px solid #e2e8f0',
    borderRadius: '10px',
    background: darkMode ? '#1c1c1e' : 'white',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'center',
    color: darkMode ? '#aeaeb2' : '#4a5568'
  },
  unitGridBtnActive: {
    background: '#10bb82',
    color: 'white',
    borderColor: '#10bb82'
  },
  modalButtons: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px'
  },
  btnPrimary: {
    flex: 1,
    padding: '10px 16px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    background: '#10bb82',
    color: 'white',
    boxShadow: '0 2px 8px rgba(16, 187, 130, 0.3)'
  },
  btnSecondary: {
    flex: 1,
    padding: '10px 16px',
    border: darkMode ? '2px solid #3a3a3c' : '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    background: darkMode ? '#1c1c1e' : 'white',
    color: darkMode ? '#aeaeb2' : '#4a5568'
  },
  historyItem: {
    padding: '16px',
    background: darkMode ? '#1c1c1e' : '#f8fafc',
    border: darkMode ? '2px solid #3a3a3c' : '2px solid #e2e8f0',
    borderRadius: '10px',
    marginBottom: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  historyLabel: {
    color: darkMode ? '#8e8e93' : '#718096',
    fontSize: '14px',
    fontWeight: '500'
  },
  historyValue: {
    fontWeight: '700',
    color: '#10bb82',
    fontFamily: 'monospace',
    fontSize: '16px'
  }
});

