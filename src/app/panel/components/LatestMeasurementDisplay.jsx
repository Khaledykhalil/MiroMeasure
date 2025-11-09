/**
 * Latest Measurement Display Component
 */

import { formatNumber } from '../utils/formatting';
import { getStyles } from '../constants/styles';

export default function LatestMeasurementDisplay({ latestMeasurement, darkMode }) {
  const styles = getStyles(darkMode);

  if (!latestMeasurement) return null;

  return (
    <div style={styles.panel}>
      <h2 style={styles.panelTitle}>Latest Measurement</h2>
      <div style={styles.measurementDisplay}>
        <div style={styles.measurementValue}>
          {latestMeasurement.type === 'area' ? formatNumber(latestMeasurement.area) : 
           latestMeasurement.type === 'polyline' ? formatNumber(latestMeasurement.totalLength) :
           latestMeasurement.type === 'count' ? latestMeasurement.number :
           latestMeasurement.type === 'volume' ? formatNumber(latestMeasurement.volume) :
           latestMeasurement.type === 'angle' ? formatNumber(latestMeasurement.angle, 1) :
           latestMeasurement.type === 'circle' ? formatNumber(latestMeasurement.radius) :
           latestMeasurement.type === 'cutout' ? formatNumber(latestMeasurement.netArea) :
           latestMeasurement.type === 'slope' ? latestMeasurement.riseRunRatio :
           formatNumber(latestMeasurement.distance)}
        </div>
        <div style={styles.measurementUnit}>
          {latestMeasurement.type === 'area' ? `${latestMeasurement.unit}²` :
           latestMeasurement.type === 'volume' ? `${latestMeasurement.unit}³` :
           latestMeasurement.type === 'angle' ? '°' :
           latestMeasurement.type === 'circle' ? `${latestMeasurement.unit} radius` :
           latestMeasurement.type === 'cutout' ? `${latestMeasurement.unit}² net` :
           latestMeasurement.type === 'slope' ? `(${formatNumber(latestMeasurement.slopePercentage, 1)}%)` :
           latestMeasurement.type === 'count' ? 'items' :
           latestMeasurement.unit}
        </div>
      </div>
      {latestMeasurement.type === 'cutout' && (
        <div style={{textAlign: 'center', marginTop: '8px', color: '#718096', fontSize: '12px'}}>
          <div>Gross: {formatNumber(latestMeasurement.grossArea)} {latestMeasurement.unit}²</div>
          <div>Cutouts: {formatNumber(latestMeasurement.cutoutArea)} {latestMeasurement.unit}²</div>
          <div style={{fontWeight: 'bold', color: '#10bb82'}}>Net: {formatNumber(latestMeasurement.netArea)} {latestMeasurement.unit}²</div>
        </div>
      )}
      {latestMeasurement.type === 'slope' && (
        <div style={{textAlign: 'center', marginTop: '8px', color: '#718096', fontSize: '12px'}}>
          <div>Rise: {formatNumber(latestMeasurement.rise, 2)} {latestMeasurement.unit}</div>
          <div>Run: {formatNumber(latestMeasurement.run, 2)} {latestMeasurement.unit}</div>
          <div>Angle: {formatNumber(latestMeasurement.slopeDegrees, 1)}°</div>
        </div>
      )}
      {latestMeasurement.type === 'area' && latestMeasurement.perimeter && (
        <div style={{textAlign: 'center', marginTop: '8px', color: '#718096', fontSize: '12px'}}>
          Perimeter: {formatNumber(latestMeasurement.perimeter)} {latestMeasurement.unit}
        </div>
      )}
      {latestMeasurement.type === 'volume' && (
        <div style={{textAlign: 'center', marginTop: '8px', color: '#718096', fontSize: '12px'}}>
          Base: {formatNumber(latestMeasurement.baseArea)} {latestMeasurement.unit}² × Height: {formatNumber(latestMeasurement.height)} {latestMeasurement.unit}
        </div>
      )}
      {latestMeasurement.type === 'circle' && (
        <div style={{textAlign: 'center', marginTop: '8px', color: '#718096', fontSize: '12px'}}>
          D: {formatNumber(latestMeasurement.diameter)} {latestMeasurement.unit} | C: {formatNumber(latestMeasurement.circumference)} {latestMeasurement.unit} | A: {formatNumber(latestMeasurement.area)} {latestMeasurement.unit}²
        </div>
      )}
    </div>
  );
}

