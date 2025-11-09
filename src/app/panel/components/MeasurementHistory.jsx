/**
 * Measurement History Component
 */

import { TbRuler, TbNumbers, TbVectorBezier2, TbCube, TbAngle, TbCircle, TbLayersDifference, TbStairs } from 'react-icons/tb';
import { MdStraighten } from 'react-icons/md';
import { formatNumber } from '../utils/formatting';
import { getStyles } from '../constants/styles';

export default function MeasurementHistory({ measurements, darkMode }) {
  const styles = getStyles(darkMode);

  if (measurements.length <= 1) return null;

  return (
    <div style={styles.panel}>
      <h2 style={styles.panelTitle}>Measurement History ({measurements.length} total)</h2>
      {measurements.slice(-5).reverse().map((m, idx) => (
        <div key={m.id} style={styles.historyItem}>
          <span style={styles.historyLabel}>
            {m.type === 'area' ? <><MdStraighten size={14} style={{marginRight: '4px'}} /> Area</> :
             m.type === 'count' ? <><TbNumbers size={14} style={{marginRight: '4px'}} /> Count</> :
             m.type === 'polyline' ? <><TbVectorBezier2 size={14} style={{marginRight: '4px'}} /> Path</> :
             m.type === 'volume' ? <><TbCube size={14} style={{marginRight: '4px'}} /> Volume</> :
             m.type === 'angle' ? <><TbAngle size={14} style={{marginRight: '4px'}} /> Angle</> :
             m.type === 'circle' ? <><TbCircle size={14} style={{marginRight: '4px'}} /> Circle</> :
             m.type === 'cutout' ? <><TbLayersDifference size={14} style={{marginRight: '4px'}} /> Cutout</> :
             m.type === 'slope' ? <><TbStairs size={14} style={{marginRight: '4px'}} /> Slope</> :
             <><TbRuler size={14} style={{marginRight: '4px'}} /> Linear</>} #{measurements.length - idx}
          </span>
          <span style={styles.historyValue}>
            {m.type === 'area' ? `${formatNumber(m.area)} ${m.unit}²` :
             m.type === 'count' ? `#${m.number}` :
             m.type === 'polyline' ? `${formatNumber(m.totalLength)} ${m.unit}` :
             m.type === 'volume' ? `${formatNumber(m.volume)} ${m.unit}³` :
             m.type === 'angle' ? `${formatNumber(m.angle, 1)}°` :
             m.type === 'circle' ? `R:${formatNumber(m.radius)} ${m.unit}` :
             m.type === 'cutout' ? `${formatNumber(m.netArea)} ${m.unit}² net` :
             m.type === 'slope' ? `${m.riseRunRatio} (${formatNumber(m.slopePercentage, 1)}%)` :
             `${formatNumber(m.distance)} ${m.unit}`}
          </span>
        </div>
      ))}
    </div>
  );
}

