/**
 * Unit conversion constants
 */

export const CONVERSIONS = {
  toMeters: {
    'm': 1,
    'cm': 0.01,
    'mm': 0.001,
    'km': 1000,
    'ft': 0.3048,
    'in': 0.0254,
    'yd': 0.9144,
    'mi': 1609.34
  },
  imperial: [
    { name: 'Feet', abbr: 'ft', full: 'feet' },
    { name: 'Inches', abbr: 'in', full: 'inches' },
    { name: 'Yards', abbr: 'yd', full: 'yards' },
    { name: 'Miles', abbr: 'mi', full: 'miles' }
  ],
  metric: [
    { name: 'Meters', abbr: 'm', full: 'meters' },
    { name: 'Centimeters', abbr: 'cm', full: 'centimeters' },
    { name: 'Millimeters', abbr: 'mm', full: 'millimeters' },
    { name: 'Kilometers', abbr: 'km', full: 'kilometers' }
  ]
};

