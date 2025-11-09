/**
 * Formatting utilities for measurements
 */

export function formatNumber(num, decimals = 2) {
  return parseFloat(num.toFixed(decimals));
}

/**
 * Format measurements in feet and inches
 */
export function formatFeetInches(valueInFeet) {
  const totalInches = valueInFeet * 12;
  let feet = Math.floor(totalInches / 12);
  let inches = Math.round(totalInches % 12);
  
  // If rounding inches results in 12, convert to 1 additional foot
  if (inches === 12) {
    feet += 1;
    inches = 0;
  }
  
  if (feet === 0) {
    return `${inches}"`;
  } else if (inches === 0) {
    return `${feet}'`;
  } else {
    return `${feet}' ${inches}"`;
  }
}

/**
 * Format measurement based on unit type and format preference
 */
export function formatMeasurement(value, unit, showFeetInches = true, decimals = 2) {
  if (unit === 'ft' && showFeetInches) {
    return formatFeetInches(value);
  }
  return formatNumber(value, decimals);
}

