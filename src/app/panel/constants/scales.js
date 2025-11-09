/**
 * Architectural drawing scales
 */

export const ARCHITECTURAL_SCALES = {
  imperial: [
    { name: '1/16" = 1\'', ratio: 192, description: 'Large scale plans' },
    { name: '3/32" = 1\'', ratio: 128, description: 'Large scale plans' },
    { name: '1/8" = 1\'', ratio: 96, description: 'Floor plans, elevations' },
    { name: '3/16" = 1\'', ratio: 64, description: 'Floor plans' },
    { name: '1/4" = 1\'', ratio: 48, description: 'Standard floor plans' },
    { name: '3/8" = 1\'', ratio: 32, description: 'Detail drawings' },
    { name: '1/2" = 1\'', ratio: 24, description: 'Large details' },
    { name: '3/4" = 1\'', ratio: 16, description: 'Large details' },
    { name: '1" = 1\'', ratio: 12, description: 'Full size details' },
    { name: '1 1/2" = 1\'', ratio: 8, description: 'Large details' },
    { name: '3" = 1\'', ratio: 4, description: 'Very large details' }
  ],
  metric: [
    { name: '1:100', ratio: 100, description: 'Floor plans' },
    { name: '1:50', ratio: 50, description: 'Standard floor plans' },
    { name: '1:20', ratio: 20, description: 'Detail drawings' },
    { name: '1:10', ratio: 10, description: 'Large details' },
    { name: '1:5', ratio: 5, description: 'Very large details' },
    { name: '1:200', ratio: 200, description: 'Site plans' }
  ]
};

