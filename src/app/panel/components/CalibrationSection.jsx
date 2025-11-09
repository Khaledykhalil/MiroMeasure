/**
 * Calibration Section Component
 */

import { MdSettings, MdEdit, MdContentCopy, MdRefresh, MdCheck } from 'react-icons/md';
import { getStyles } from '../constants/styles';

export default function CalibrationSection({ 
  calibration, 
  calibrationLineId, 
  darkMode, 
  onStartCalibration, 
  onSelectExisting, 
  onUpdateCalibration 
}) {
  const styles = getStyles(darkMode);

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px',
        paddingBottom: '8px',
        borderBottom: darkMode ? '2px solid #3a3a3c' : '2px solid #e2e8f0'
      }}>
        <div style={{...styles.toolIcon, ...styles.toolIcon2, width: '28px', height: '28px'}}>
          <MdSettings size={18} />
        </div>
        <span style={{
          fontWeight: '700',
          fontSize: '15px',
          color: darkMode ? '#ffffff' : '#1a202c',
          letterSpacing: '0.3px'
        }}>
          Calibration {calibration && <MdCheck size={16} style={{color: '#10bb82', marginLeft: '6px'}} />}
        </span>
      </div>
      
      <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
        <button
          onClick={onStartCalibration}
          style={{
            ...styles.toolCard,
            padding: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            border: darkMode ? '2px solid #3a3a3c' : '2px solid #2d3748',
            background: darkMode ? '#1c1c1e' : '#f8fafc',
            color: darkMode ? '#ffffff' : '#2d3748'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#10bb82'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#3a3a3c' : '#2d3748'}
        >
          <MdEdit size={22} />
          <span style={{fontSize: '13px', fontWeight: '600'}}>Draw Calibration Line</span>
        </button>
        
        <button
          onClick={onSelectExisting}
          style={{
            ...styles.toolCard,
            padding: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            border: darkMode ? '2px solid #3a3a3c' : '2px solid #2d3748',
            background: darkMode ? '#1c1c1e' : '#f8fafc',
            color: darkMode ? '#ffffff' : '#2d3748'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#10bb82'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#3a3a3c' : '#2d3748'}
        >
          <MdContentCopy size={22} />
          <span style={{fontSize: '13px', fontWeight: '600'}}>Reuse Existing Line</span>
        </button>
        
        <button
          onClick={() => calibrationLineId && onUpdateCalibration()}
          style={{
            ...styles.toolCard,
            padding: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: calibrationLineId ? 'pointer' : 'not-allowed',
            border: darkMode ? '2px solid #3a3a3c' : '2px solid #2d3748',
            background: darkMode ? '#1c1c1e' : '#f8fafc',
            color: darkMode ? '#ffffff' : '#2d3748',
            opacity: calibrationLineId ? 1 : 0.5
          }}
          onMouseEnter={(e) => calibrationLineId && (e.currentTarget.style.borderColor = '#10bb82')}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#3a3a3c' : '#2d3748'}
        >
          <MdRefresh size={22} />
          <span style={{fontSize: '13px', fontWeight: '600'}}>Update Calibration</span>
        </button>
      </div>
    </div>
  );
}

