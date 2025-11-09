/**
 * Measurement Section Component
 */

import { TbRuler } from 'react-icons/tb';
import { MdRefresh } from 'react-icons/md';
import { getStyles } from '../constants/styles';

export default function MeasurementSection({ 
  calibration, 
  darkMode, 
  onStartMeasurement, 
  onUpdateSelected 
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
        <div style={{...styles.toolIcon, ...styles.toolIcon1, width: '28px', height: '28px'}}>
          <TbRuler size={18} />
        </div>
        <span style={{
          fontWeight: '700',
          fontSize: '15px',
          color: darkMode ? '#ffffff' : '#1a202c',
          letterSpacing: '0.3px'
        }}>
          Measurements
        </span>
      </div>
      
      <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
        <button
          onClick={() => calibration && onStartMeasurement()}
          style={{
            ...styles.toolCard,
            padding: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: calibration ? 'pointer' : 'not-allowed',
            border: darkMode ? '2px solid #3a3a3c' : '2px solid #2d3748',
            background: darkMode ? '#1c1c1e' : '#f8fafc',
            color: darkMode ? '#ffffff' : '#2d3748',
            opacity: calibration ? 1 : 0.5
          }}
          onMouseEnter={(e) => calibration && (e.currentTarget.style.borderColor = '#10bb82')}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#3a3a3c' : '#2d3748'}
          title="Measure distance between two points"
        >
          <TbRuler size={22} />
          <span style={{fontSize: '13px', fontWeight: '600'}}>Measure Distance</span>
        </button>
        
        <button
          onClick={onUpdateSelected}
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
          title="Recalculate moved measurement"
        >
          <MdRefresh size={22} />
          <span style={{fontSize: '13px', fontWeight: '600'}}>Update Measurement</span>
        </button>
      </div>
    </div>
  );
}

