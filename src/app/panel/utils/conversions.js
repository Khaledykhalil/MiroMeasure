/**
 * Unit conversion utilities
 */

import { CONVERSIONS } from '../constants/conversions';

export function convertUnits(value, fromUnit, toUnit) {
  const meters = value * CONVERSIONS.toMeters[fromUnit];
  return meters / CONVERSIONS.toMeters[toUnit];
}

export function getAllConversions(value, fromUnit) {
  const conversions = {};
  for (const unit in CONVERSIONS.toMeters) {
    conversions[unit] = convertUnits(value, fromUnit, unit);
  }
  return conversions;
}

