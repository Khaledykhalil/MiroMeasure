/**
 * Unit Selector Component
 * Reusable component for selecting units (Imperial or Metric)
 */

import { CONVERSIONS } from '../constants/conversions';
import { getStyles } from '../constants/styles';

export default function UnitSelector({ 
  selectedUnit, 
  onUnitSelect, 
  darkMode,
  title = "Select Unit"
}) {
  const styles = getStyles(darkMode);
  const imperialUnits = CONVERSIONS.imperial;
  const metricUnits = CONVERSIONS.metric;

  return (
    <div style={styles.formGroup}>
      <label style={styles.label}>{title}:</label>
      <div style={styles.unitGrid}>
        {/* Imperial Units */}
        {imperialUnits.map(unit => (
          <button
            key={unit.abbr}
            onClick={() => onUnitSelect(unit.abbr)}
            style={{
              ...styles.unitGridBtn,
              ...(selectedUnit === unit.abbr ? styles.unitGridBtnActive : {})
            }}
          >
            {unit.name}
          </button>
        ))}
        
        {/* Metric Units */}
        {metricUnits.map(unit => (
          <button
            key={unit.abbr}
            onClick={() => onUnitSelect(unit.abbr)}
            style={{
              ...styles.unitGridBtn,
              ...(selectedUnit === unit.abbr ? styles.unitGridBtnActive : {})
            }}
          >
            {unit.name}
          </button>
        ))}
      </div>
    </div>
  );
}

