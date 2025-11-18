/**
 * MeasureMint - Professional Measurement Tool for Miro
 * 
 * Copyright (c) 2025 Khaled Khalil. All Rights Reserved.
 * 
 * PROPRIETARY SOFTWARE - COMMERCIAL USE PROHIBITED
 * 
 * This source code is proprietary and confidential. Unauthorized copying,
 * distribution, modification, or use of this code, in part or in whole,
 * is strictly prohibited without explicit written permission.
 * 
 * For commercial licensing inquiries: support@measuremint.app
 * 
 * See LICENSE file for complete terms and conditions.
 */

'use client';

import { useState, useEffect } from 'react';
import { 
  MdImage, 
  MdSettings, 
  MdRefresh, 
  MdEdit,
  MdSave,
  MdContentCopy,
  MdCheck,
  MdStraighten,
  MdBuild,
  MdSwapHoriz,
  MdFormatListBulleted
} from 'react-icons/md';
import { 
  TbRuler,
  TbLayoutGridAdd,
  TbNumbers,
  TbVectorBezier2,
  TbCube,
  TbAngle,
  TbCircle,
  TbLayersDifference,
  TbStairs
} from 'react-icons/tb';

// Import constants
import { CONVERSIONS } from './constants/conversions';
import { ARCHITECTURAL_SCALES } from './constants/scales';
import { getStyles } from './constants/styles';

// Import utilities
import { convertUnits, getAllConversions } from './utils/conversions';
import { formatNumber, formatFeetInches, formatMeasurement } from './utils/formatting';

// Import components
import Header from './components/Header';
import CustomModal from './components/CustomModal';
import CalibrationSection from './components/CalibrationSection';
import MeasurementSection from './components/MeasurementSection';
import LatestMeasurementDisplay from './components/LatestMeasurementDisplay';
import MeasurementHistory from './components/MeasurementHistory';
import UnitSelector from './components/UnitSelector';

// Import hooks
import { useCustomModal } from './hooks/useCustomModal';

export default function PanelPage() {
  const [mode, setMode] = useState('none');
  const [calibration, setCalibration] = useState(null);
  const [calibrationLineId, setCalibrationLineId] = useState(null); // Track calibration line ID
  const [calibrationOrientation, setCalibrationOrientation] = useState(null); // Track if calibration was horizontal or vertical
  const [axisCorrection, setAxisCorrection] = useState(1.5); // Y-axis correction factor (adjustable)
  const [measurements, setMeasurements] = useState([]);
  const [measurementLines, setMeasurementLines] = useState([]); // Track measurement line IDs
  const [selectedImage, setSelectedImage] = useState(null);
  const [unitSystem, setUnitSystem] = useState('imperial');
  const [clickCount, setClickCount] = useState(0);
  const [firstPoint, setFirstPoint] = useState(null);
  const [showCalibrationModal, setShowCalibrationModal] = useState(false);
  const [showUnitsModal, setShowUnitsModal] = useState(false);
  const [tempCalibrationDistance, setTempCalibrationDistance] = useState(null);
  const [calibrationUnit, setCalibrationUnit] = useState('ft');
  const [calibrationValue, setCalibrationValue] = useState('');
  const [calibrationFeet, setCalibrationFeet] = useState('');
  const [calibrationInches, setCalibrationInches] = useState('');
  const [calibrationMeters, setCalibrationMeters] = useState('');
  const [calibrationCentimeters, setCalibrationCentimeters] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [calibrationLine, setCalibrationLine] = useState(null);
  const [isFirstMeasurement, setIsFirstMeasurement] = useState(true);
  const showFeetInches = true; // Always show feet-inches format for feet measurements
  
  // Volume measurement states (kept for backward compatibility with existing code)
  const [showVolumeModal, setShowVolumeModal] = useState(false);
  const [volumeBaseArea, setVolumeBaseArea] = useState(null);
  const [volumeHeight, setVolumeHeight] = useState('');
  const [showScalePresetsModal, setShowScalePresetsModal] = useState(false);
  const [showScaleRegionsModal, setShowScaleRegionsModal] = useState(false);

  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // Unit selection for measurement updates
  const [showMeasurementUnitModal, setShowMeasurementUnitModal] = useState(false);
  const [pendingMeasurementUpdate, setPendingMeasurementUpdate] = useState(null);
  const [selectedMeasurementUnit, setSelectedMeasurementUnit] = useState('ft');

  // Custom modal hook
  const { customModal, showAlert, showConfirm } = useCustomModal();

  // Generate styles based on dark mode
  const styles = getStyles(darkMode);

  // Add escape key listener to exit measurement mode
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && mode === 'measure') {
        // Remove the current measurement line if it exists
        if (calibrationLine) {
          window.miro.board.remove(calibrationLine).catch(console.error);
          setCalibrationLine(null);
        }
        setMode('none');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, calibrationLine]);

  // Note: Miro SDK v2 doesn't support board.ui.on('click')
  // Instead, we use helper functions that prompt users to click and select positions
  // See the helper functions below for each measurement mode

  const selectImage = async () => {
    try {
      const selection = await window.miro.board.getSelection();
      if (selection.length === 0) {
        return;
      }
      
      const image = selection.find(item => item.type === 'image');
      if (!image) {
        return;
      }
      
      setSelectedImage(image);
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  const startCalibration = async () => {
    console.log('startCalibration called');
    
    // Check if Miro API is available
    if (!window.miro) {
      console.error('Miro API not ready');
      return;
    }

    console.log('Miro API available, mode:', mode);

    // If we're in measurement mode, clean up the current measurement line
    if (mode === 'measure' && calibrationLine) {
      try {
        await window.miro.board.remove(calibrationLine);
      } catch (error) {
        console.error('Error removing measurement line:', error);
      }
    }

    setMode('calibrate');
    setClickCount(0);
    setFirstPoint(null);
    setCalibrationLine(null);
    setIsFirstMeasurement(true); // Reset for new calibration
    
    console.log('Creating calibration line...');
    
    try {
      // Create a draggable line for the user to position
      const viewport = await window.miro.board.viewport.get();
      console.log('Viewport:', viewport);
      
      const centerX = viewport.x + viewport.width / 2;
      const centerY = viewport.y + viewport.height / 2;
      
      // Position line to the right side of viewport to be more visible
      const offsetX = viewport.width * 0.25; // 25% to the right

      // Create line with draggable endpoints (no dots needed)
      const line = await window.miro.board.createConnector({
        start: {
          position: {
            x: centerX + offsetX - 200,
            y: centerY
          }
        },
        end: {
          position: {
            x: centerX + offsetX + 200,
            y: centerY
          }
        },
        shape: 'straight',
        style: {
          strokeColor: '#f5576c',
          strokeWidth: 2,
          startStrokeCap: 'none',
          endStrokeCap: 'none'
        },
        captions: [{
          content: 'Calibration Line - Drag endpoints to known distance',
          position: 0.5,
          textAlignVertical: 'middle'
        }]
      });

      console.log('Calibration line created:', line.id);
      setCalibrationLine(line);
      // Calibration line created - user can now drag endpoints
    } catch (error) {
      console.error('Error starting calibration:', error);
      setMode('none');
    }
  };

  const finishCalibration = async () => {
    if (!calibrationLine) {
      return;
    }

    try {
      // Get fresh reference to the line to get its current endpoints
      const items = await window.miro.board.get({ id: [calibrationLine.id] });
      
      if (items.length !== 1) {
        throw new Error('Could not find calibration line');
      }

      const line = items[0];
      const start = line.start.position;
      const end = line.end.position;

      const dx = Math.abs(end.x - start.x);
      const dy = Math.abs(end.y - start.y);
      
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Determine if calibration is primarily horizontal or vertical
      const orientation = dx > dy ? 'horizontal' : 'vertical';
      
      console.log('Calibration Line Debug:', {
        start: start,
        end: end,
        dx: dx,
        dy: dy,
        distance: distance,
        orientation: orientation
      });

      setCalibrationOrientation(orientation);
      // Store the raw pixel values
      setTempCalibrationDistance({ distance, dx, dy, orientation });
      setShowCalibrationModal(true);
    } catch (error) {
      console.error('Error finishing calibration:', error);
    }
  };

  // NEW: Select and reuse an existing calibration line
  const selectExistingCalibration = async () => {
    try {
      // Get user selection
      const selection = await window.miro.board.getSelection();
      
      if (selection.length === 0) {
        console.log('No items selected - please select a calibration line');
        return;
      }
      
      // Find a connector in the selection
      const connector = selection.find(item => item.type === 'connector');
      
      if (!connector) {
        console.log('Selected item is not a connector');
        return;
      }
      
      // Check if it has a calibration caption
      const caption = connector.captions?.[0]?.content || '';
      
      if (!caption.includes('Calibration:')) {
        console.log('Selected line is not a calibration line');
        return;
      }
      
      // Parse the calibration values from the caption
      // Format: "Calibration: 10' 6" (1/4" = 1'-0")" or "Calibration: 10.5 ft"
      const calibrationMatch = caption.match(/Calibration:\s*([0-9.'"\s]+)\s*([a-z]+)?/i);
      
      if (!calibrationMatch) {
        console.log('Could not parse calibration values from caption');
        return;
      }
      
      let calibrationText = calibrationMatch[1].trim();
      let unit = calibrationMatch[2] || 'ft';
      
      // Parse feet-inches format if present
      const actualDistance = parseFeetInches(calibrationText) || parseFloat(calibrationText);
      
      if (!actualDistance || actualDistance <= 0) {
        console.log('Could not parse calibration distance value');
        return;
      }
      
      // Calculate pixel distance from the connector's endpoints
      const start = connector.start.position;
      const end = connector.end.position;
      
      const dx = Math.abs(end.x - start.x);
      const dy = Math.abs(end.y - start.y);
      
      const pixelDistance = Math.sqrt(
        Math.pow(end.x - start.x, 2) + 
        Math.pow(end.y - start.y, 2)
      );
      
      // Determine orientation
      const orientation = dx > dy ? 'horizontal' : 'vertical';
      
      // Calculate pixels per unit for both axes
      let pixelsPerUnitX, pixelsPerUnitY;
      
      if (orientation === 'horizontal') {
        pixelsPerUnitX = dx / actualDistance;
        pixelsPerUnitY = dx / actualDistance; // Assume same until vertical calibration
      } else {
        pixelsPerUnitY = dy / actualDistance;
        pixelsPerUnitX = dy / actualDistance; // Assume same until horizontal calibration
      }
      
      // Create new calibration object
      const newCalibration = {
        pixelsPerUnit: pixelDistance / actualDistance,
        pixelsPerUnitX: pixelsPerUnitX,
        pixelsPerUnitY: pixelsPerUnitY,
        pixelDistance: pixelDistance,
        actualDistance: actualDistance,
        unit: unit,
        orientation: orientation,
        timestamp: new Date().toISOString()
      };
      
      setCalibration(newCalibration);
      setCalibrationLineId(connector.id);
      
      console.log('Calibration loaded successfully:', actualDistance, unit);
      
      // Automatically start measurement mode
      setMode('measure');
      await startMeasurement();
      
    } catch (error) {
      console.error('Error selecting existing calibration:', error);
    }
  };

  // Apply a scale preset - simplified one-click workflow
  const applyScalePreset = async (scale) => {
    try {
      // Close the presets modal
      setShowScalePresetsModal(false);
      
      // Determine unit based on scale type
      const isMetric = scale.name.includes(':');
      const presetUnit = isMetric ? 'm' : 'ft';
      
      // For scale presets, we need the user to draw a reference line
      // that represents 1 unit on the drawing
      const proceed = await showConfirm(
        `Scale: ${scale.name}\n${scale.description}\n\n` +
        `Draw a line that represents 1 ${presetUnit === 'ft' ? 'foot' : 'meter'} on your drawing.\n\n` +
        `For example, if using 1/4" = 1', draw a line on a dimension that shows as 1 foot.`,
        'Draw Reference Line'
      );
      
      if (!proceed) return;
      
      // Wait for user to draw a line
      await showAlert(
        'Draw a connector line on your board, then select it and click OK.',
        'Draw Line'
      );
      
      const selection = await window.miro.board.getSelection();
      
      if (!selection || selection.length === 0) {
        await showAlert('No line selected. Please try again.', 'Error');
        return;
      }
      
      const connector = selection.find(item => item.type === 'connector');
      
      if (!connector) {
        await showAlert('Please select a connector line.', 'Error');
        return;
      }
      
      // Get the line's pixel length
      const start = connector.start.position || connector.start;
      const end = connector.end.position || connector.end;
      
      const dx = Math.abs(end.x - start.x);
      const dy = Math.abs(end.y - start.y);
      const pixelDistance = Math.sqrt(
        Math.pow(end.x - start.x, 2) + 
        Math.pow(end.y - start.y, 2)
      );
      
      // Determine orientation
      const orientation = dx > dy ? 'horizontal' : 'vertical';
      
      // The line represents 1 unit at the given scale
      // So actual distance = 1 unit
      const actualDistance = 1;
      
      // Calculate pixels per unit
      const pixelsPerUnitX = orientation === 'horizontal' ? dx / actualDistance : dx / actualDistance;
      const pixelsPerUnitY = orientation === 'vertical' ? dy / actualDistance : dy / actualDistance;
      
      // Create calibration
      const newCalibration = {
        pixelsPerUnit: pixelDistance / actualDistance,
        pixelsPerUnitX: pixelsPerUnitX,
        pixelsPerUnitY: pixelsPerUnitY,
        pixelDistance: pixelDistance,
        actualDistance: actualDistance,
        unit: presetUnit,
        orientation: orientation,
        ratio: scale.ratio,
        scaleName: scale.name,
        timestamp: new Date().toISOString()
      };
      
      setCalibration(newCalibration);
      setCalibrationUnit(presetUnit);
      
      // Convert the line to a green calibration line
      const calibrationLine = await window.miro.board.createConnector({
        start: {
          position: start
        },
        end: {
          position: end
        },
        shape: 'straight',
        style: {
          strokeColor: '#10bb82',
          strokeWidth: 2,
          startStrokeCap: 'none',
          endStrokeCap: 'none'
        },
        captions: [{
          content: `Calibration: ${actualDistance} ${presetUnit} (${scale.name})`,
          position: 0.5
        }]
      });
      
      // Remove the original line
      await window.miro.board.remove(connector);
      
      // Store calibration line ID
      setCalibrationLineId(calibrationLine.id);
      
      console.log('Scale preset applied:', scale.name, actualDistance, presetUnit);
      
      // Automatically start measurement mode
      setMode('measure');
      await startMeasurement();
      
    } catch (error) {
      console.error('Error applying scale preset:', error);
      await showAlert('Error applying preset: ' + error.message, 'Error');
    }
  };

  const startMeasurement = async () => {
    if (!calibration) {
      console.log('Please set up calibration first before measuring');
      return;
    }

    setMode('measure');
    setClickCount(0);
    setFirstPoint(null);
    
    try {
      // Create a draggable line for measurement
      const viewport = await window.miro.board.viewport.get();
      const centerX = viewport.x + viewport.width / 2;
      const centerY = viewport.y + viewport.height / 2;
      
      // Position line to the right side of viewport to be more visible
      const offsetX = viewport.width * 0.25; // 25% to the right

      // Create line with draggable endpoints (no dots needed)
      const line = await window.miro.board.createConnector({
        start: {
          position: {
            x: centerX + offsetX - 200,
            y: centerY
          }
        },
        end: {
          position: {
            x: centerX + offsetX + 200,
            y: centerY
          }
        },
        shape: 'straight',
        style: {
          strokeColor: '#4facfe',
          strokeWidth: 2,
          startStrokeCap: 'none',
          endStrokeCap: 'none'
        },
        captions: [{
          content: 'Measurement Line - Drag endpoints to measure',
          position: 0.5,
          textAlignVertical: 'middle'
        }]
      });

      setCalibrationLine(line);
    } catch (error) {
      console.error('Error starting measurement:', error);
    }
  };

  const finishMeasurement = async () => {
    if (!calibrationLine) {
      console.log('No measurement line found');
      return;
    }

    try {
      // Get fresh reference to the line to get its current endpoints
      const items = await window.miro.board.get({ id: [calibrationLine.id] });
      
      if (items.length !== 1) {
        throw new Error('Could not find measurement line');
      }

      const line = items[0];
      const start = line.start.position;
      const end = line.end.position;

      const dx = Math.abs(end.x - start.x);
      const dy = Math.abs(end.y - start.y);
      
      // Determine measurement orientation
      const measurementOrientation = dx > dy ? 'horizontal' : 'vertical';
      
      // Calculate distance using appropriate axis scaling
      let actualDistance;
      
      if (calibration.pixelsPerUnitX && calibration.pixelsPerUnitY) {
        // Use dual-axis calibration
        if (measurementOrientation === 'horizontal') {
          actualDistance = dx / calibration.pixelsPerUnitX;
        } else {
          actualDistance = dy / calibration.pixelsPerUnitY;
        }
      } else {
        // Fallback to old method for backward compatibility
        const pixelDistance = Math.sqrt(
          Math.pow(end.x - start.x, 2) + 
          Math.pow(end.y - start.y, 2)
        );
        actualDistance = pixelDistance / calibration.pixelsPerUnit;
      }
      
      console.log('Measurement Debug:', {
        start: start,
        end: end,
        dx: dx,
        dy: dy,
        measurementOrientation: measurementOrientation,
        calibrationOrientation: calibration.orientation,
        pixelsPerUnitX: calibration.pixelsPerUnitX,
        pixelsPerUnitY: calibration.pixelsPerUnitY,
        actualDistance: actualDistance
      });

      // Calculate the actual measurement
      const conversions = getAllConversions(actualDistance, calibration.unit);

      // Format the measurement for display
      const primaryUnit = calibration.unit;
      const formattedValue = formatMeasurement(actualDistance, primaryUnit, showFeetInches);
      const measurementText = primaryUnit === 'ft' && showFeetInches ? formattedValue : `${formattedValue} ${primaryUnit}`;

      // Update the line's caption with the measurement by recreating it
      const updatedLine = await window.miro.board.createConnector({
        start: {
          ...line.start
        },
        end: {
          ...line.end
        },
        shape: 'straight',
        style: {
          strokeColor: '#4facfe',
          strokeWidth: 2,
          startStrokeCap: 'none',
          endStrokeCap: 'none'
        },
        captions: [{
          content: measurementText,
          position: 0.5,
          textAlignVertical: 'middle'
        }]
      });

      // Remove the old line
      await window.miro.board.remove(calibrationLine);

      // Store the measurement with line ID
      const measurement = {
        id: Date.now(),
        lineId: updatedLine.id,
        distance: actualDistance,
        unit: calibration.unit,
        conversions: conversions,
        timestamp: new Date()
      };

      setMeasurements([...measurements, measurement]);
      setMeasurementLines([...measurementLines, updatedLine.id]);

      // Mark that the first measurement has been completed
      setIsFirstMeasurement(false);

      // Reset calibrationLine and immediately start a new measurement
      setCalibrationLine(null);
      
      // Automatically start a new measurement line
      await startMeasurement();
    } catch (error) {
      console.error('Error finishing measurement:', error);
      console.error('Error:', error);
    }
  };

  const updateSelectedMeasurement = async () => {
    try {
      // Get the current selection from the board
      const selection = await window.miro.board.getSelection();
      
      if (selection.length === 0) {
        console.log('No measurement line selected');
        return;
      }

      const selectedItem = selection[0];
      
      // Check if the selected item is a connector
      if (selectedItem.type !== 'connector') {
        console.log('Selected item is not a connector');
        return;
      }

      // Check if it's one of our measurement lines
      if (!measurementLines.includes(selectedItem.id)) {
        console.log('Selected line is not a measurement line');
        return;
      }

      // Find the existing measurement to get its current unit
      const existingMeasurement = measurements.find(m => m.lineId === selectedItem.id);
      const currentUnit = existingMeasurement?.unit || calibration?.unit || 'ft';
      
      // Store the selected item for later processing
      setPendingMeasurementUpdate(selectedItem);
      setSelectedMeasurementUnit(currentUnit);
      setShowMeasurementUnitModal(true);
      
    } catch (error) {
      console.error('Error updating measurement:', error);
    }
  };

  const applyMeasurementUpdate = async () => {
    if (!pendingMeasurementUpdate) return;

    try {
      const selectedItem = pendingMeasurementUpdate;
      const line = selectedItem;
      const start = line.start.position;
      const end = line.end.position;

      const dx = Math.abs(end.x - start.x);
      const dy = Math.abs(end.y - start.y);
      
      // Determine measurement orientation
      const measurementOrientation = dx > dy ? 'horizontal' : 'vertical';
      
      // Calculate distance using appropriate axis scaling
      let actualDistance;
      
      if (calibration.pixelsPerUnitX && calibration.pixelsPerUnitY) {
        // Use dual-axis calibration
        if (measurementOrientation === 'horizontal') {
          actualDistance = dx / calibration.pixelsPerUnitX;
        } else {
          actualDistance = dy / calibration.pixelsPerUnitY;
        }
      } else {
        // Fallback to old method for backward compatibility
        const pixelDistance = Math.sqrt(
          Math.pow(end.x - start.x, 2) + 
          Math.pow(end.y - start.y, 2)
        );
        actualDistance = pixelDistance / calibration.pixelsPerUnit;
      }

      // Convert the distance to the selected unit
      const distanceInSelectedUnit = convertUnits(actualDistance, calibration.unit, selectedMeasurementUnit);

      // Calculate the actual measurement
      const conversions = getAllConversions(distanceInSelectedUnit, selectedMeasurementUnit);

      // Format the measurement for display
      const formattedValue = formatMeasurement(distanceInSelectedUnit, selectedMeasurementUnit, showFeetInches);
      const measurementText = selectedMeasurementUnit === 'ft' && showFeetInches ? formattedValue : `${formattedValue} ${selectedMeasurementUnit}`;

      // Create updated line with new measurement
      const updatedLine = await window.miro.board.createConnector({
        start: {
          ...line.start
        },
        end: {
          ...line.end
        },
        shape: 'straight',
        style: {
          strokeColor: '#4facfe',
          strokeWidth: 2,
          startStrokeCap: 'none',
          endStrokeCap: 'none'
        },
        captions: [{
          content: measurementText,
          position: 0.5,
          textAlignVertical: 'middle'
        }]
      });

      // Remove the old line
      await window.miro.board.remove(selectedItem);

      // Update the measurement in our records
      const updatedMeasurements = measurements.map(m => {
        if (m.lineId === selectedItem.id) {
          return {
            ...m,
            lineId: updatedLine.id,
            distance: distanceInSelectedUnit,
            unit: selectedMeasurementUnit,
            conversions: conversions,
            timestamp: new Date()
          };
        }
        return m;
      });

      setMeasurements(updatedMeasurements);
      
      // Update line IDs
      const updatedLineIds = measurementLines.map(id => 
        id === selectedItem.id ? updatedLine.id : id
      );
      setMeasurementLines(updatedLineIds);

      // Close modal and reset
      setShowMeasurementUnitModal(false);
      setPendingMeasurementUpdate(null);

      console.log('Measurement updated successfully');
    } catch (error) {
      console.error('Error updating measurement:', error);
      setShowMeasurementUnitModal(false);
      setPendingMeasurementUpdate(null);
    }
  };

  const updateCalibration = async () => {
    try {
      if (!calibrationLineId) {
        console.log('No calibration line found - please calibrate first');
        return;
      }

      // Get the current selection from the board
      const selection = await window.miro.board.getSelection();
      
      if (selection.length === 0) {
        console.log('No calibration line selected');
        return;
      }

      const selectedItem = selection[0];
      
      // Check if the selected item is the calibration line
      if (selectedItem.id !== calibrationLineId) {
        console.log('Please select the green calibration line to update it');
        return;
      }

      const line = selectedItem;
      const start = line.start.position;
      const end = line.end.position;

      const pixelDistance = Math.sqrt(
        Math.pow(end.x - start.x, 2) + 
        Math.pow(end.y - start.y, 2)
      );

      // Set the new pixel distance and show modal to re-enter the actual distance
      setTempCalibrationDistance(pixelDistance);
      setShowCalibrationModal(true);
      
      console.log('Update calibration distance for repositioned line');
    } catch (error) {
      console.error('Error updating calibration:', error);
    }
  };

  const handleBoardClick = async (x, y) => {
    // This function is no longer used with the new drag-and-drop approach
  };

  // Area Measurement Functions
  const startAreaMeasurement = async () => {
    if (!calibration) {
      await showAlert('Please set up calibration first.', 'MeasureMint');
      return;
    }

    try {
      const proceed = await showConfirm(
        'Select a shape (rectangle, triangle, polygon, etc.) on the board, then click OK to calculate its area.',
        'MeasureMint - Area Measurement'
      );
      
      if (!proceed) return;
      
      const selection = await miro.board.getSelection();
      
      if (!selection || selection.length === 0) {
        await showAlert('No shape selected. Please select a shape and try again.', 'Error');
        return;
      }
      
      const shape = selection[0];
      
      // Check if it's a supported shape type
      if (shape.type !== 'shape') {
        await showAlert('Please select a shape (rectangle, triangle, polygon, etc.).', 'Error');
        return;
      }
      
      // Calculate area based on shape dimensions
      await calculateShapeArea(shape);
      
    } catch (error) {
      console.error('Error measuring area:', error);
      await showAlert('Error measuring area: ' + error.message, 'Error');
    }
  };

  const calculateShapeArea = async (shape) => {
    try {
      // Get shape dimensions in pixels
      const widthPixels = shape.width;
      const heightPixels = shape.height;
      
      // Convert to actual units using dual-axis calibration
      let actualWidth, actualHeight;
      
      if (calibration.pixelsPerUnitX && calibration.pixelsPerUnitY) {
        actualWidth = widthPixels / calibration.pixelsPerUnitX;
        actualHeight = heightPixels / calibration.pixelsPerUnitY;
      } else {
        actualWidth = widthPixels / calibration.pixelsPerUnit;
        actualHeight = heightPixels / calibration.pixelsPerUnit;
      }
      
      // Calculate area based on shape type
      let actualArea;
      let shapeType = shape.shape || 'rectangle';
      
      if (shapeType === 'circle') {
        // For circles, use average of width and height as diameter
        const avgDiameter = (actualWidth + actualHeight) / 2;
        const radius = avgDiameter / 2;
        actualArea = Math.PI * radius * radius;
      } else if (shapeType === 'triangle' || shapeType === 'right_triangle') {
        // Triangle area = 1/2 * base * height
        actualArea = (actualWidth * actualHeight) / 2;
      } else {
        // Rectangle, square, or other polygons - use width * height as approximation
        actualArea = actualWidth * actualHeight;
      }
      
      // Calculate perimeter (approximation)
      let actualPerimeter;
      if (shapeType === 'circle') {
        const avgDiameter = (actualWidth + actualHeight) / 2;
        actualPerimeter = Math.PI * avgDiameter;
      } else {
        actualPerimeter = 2 * (actualWidth + actualHeight);
      }
      
      // Format the measurements
      const formattedArea = formatMeasurement(actualArea, calibration.unit, showFeetInches);
      const formattedPerimeter = formatMeasurement(actualPerimeter, calibration.unit, showFeetInches);
      const areaDisplay = calibration.unit === 'ft' && showFeetInches ? `${formattedArea} sq` : `${formattedArea} ${calibration.unit}²`;
      const perimDisplay = calibration.unit === 'ft' && showFeetInches ? formattedPerimeter : `${formattedPerimeter} ${calibration.unit}`;
      
      // Create or update text label
      const areaText = await miro.board.createText({
        content: `Area: ${areaDisplay}\nPerimeter: ${perimDisplay}`,
        x: shape.x,
        y: shape.y + shape.height / 2 + 100,
        width: 250,
        style: {
          color: '#00b8d4',
          fontSize: 16,
          textAlign: 'center',
          fillColor: darkMode ? '#1c1c1e' : '#ffffff'
        }
      });
      
      // Store the measurement with shape ID for updates
      const newMeasurement = {
        id: areaText.id,
        shapeId: shape.id,
        type: 'area',
        area: actualArea,
        perimeter: actualPerimeter,
        width: actualWidth,
        height: actualHeight,
        unit: calibration.unit,
        shapeType: shapeType,
        textId: areaText.id
      };
      
      setMeasurements([...measurements, newMeasurement]);
      
      await showAlert(
        `Area calculated successfully!\n\nArea: ${areaDisplay}\nPerimeter: ${perimDisplay}`,
        'Area Measurement'
      );
      
    } catch (error) {
      console.error('Error calculating shape area:', error);
      await showAlert('Error calculating area: ' + error.message, 'Error');
    }
  };

  const updateAreaMeasurement = async () => {
    if (!calibration) {
      await showAlert('Please set up calibration first.', 'MeasureMint');
      return;
    }

    try {
      const selection = await miro.board.getSelection();
      
      if (!selection || selection.length === 0) {
        await showAlert('Please select the area measurement text or the shape to update.', 'Error');
        return;
      }
      
      // Find if selected item is a measurement or a shape
      const selectedItem = selection[0];
      let measurement = measurements.find(m => m.type === 'area' && (m.textId === selectedItem.id || m.shapeId === selectedItem.id));
      
      if (!measurement) {
        await showAlert('No area measurement found for this selection. Please select a measured shape or its label.', 'Error');
        return;
      }
      
      // Get the original shape
      const shape = await miro.board.getById(measurement.shapeId);
      
      if (!shape) {
        await showAlert('Original shape not found. It may have been deleted.', 'Error');
        return;
      }
      
      // Delete old text
      try {
        const oldText = await miro.board.getById(measurement.textId);
        if (oldText) {
          await miro.board.remove(oldText);
        }
      } catch (e) {
        console.log('Old text already deleted');
      }
      
      // Recalculate with current calibration
      await calculateShapeArea(shape);
      
      // Remove old measurement from state
      setMeasurements(measurements.filter(m => m.id !== measurement.id));
      
    } catch (error) {
      console.error('Error updating area:', error);
      await showAlert('Error updating area: ' + error.message, 'Error');
    }
  };
  
  const promptForAreaPoint = async () => {
    try {
      // Ask user to select a location on the board by creating a temporary shape
      const shape = await window.miro.board.createShape({
        shape: 'circle',
        width: 20,
        height: 20,
        style: {
          fillColor: '#00b8d4',
          borderWidth: 0
        }
      });
      
      // Get the shape's position
      const x = shape.x;
      const y = shape.y;
      
      // Add this point to our area
      await addAreaPoint(x, y);
      
      // Delete the temporary shape
      await window.miro.board.remove(shape);
      
      // Zoom to show the new point
      await window.miro.board.viewport.zoomTo(shape);
      
    } catch (error) {
      console.error('Error adding area point:', error);
    }
  };

  const addAreaPoint = async (x, y) => {
    const newPoint = { x, y };
    const updatedPoints = [...areaPoints, newPoint];
    setAreaPoints(updatedPoints);

    // Draw line from previous point to new point
    if (areaPoints.length > 0) {
      const prevPoint = areaPoints[areaPoints.length - 1];
      
      try {
        const line = await window.miro.board.createConnector({
          start: { 
            position: prevPoint
          },
          end: { 
            position: newPoint
          },
          shape: 'straight',
          style: {
            strokeColor: '#00b8d4', // Cyan for area
            strokeWidth: 4,
            startStrokeCap: 'none',
            endStrokeCap: 'none'
          }
        });
        
        setTempAreaLines([...tempAreaLines, line.id]);
      } catch (error) {
        console.error('Error drawing area line:', error);
      }
    }
  };

  const finishAreaMeasurement = async () => {
    if (areaPoints.length < 3) {
      alert('Please select at least 3 points to create an area');
      return;
    }

    try {
      // Close the polygon by connecting last point to first
      const line = await window.miro.board.createConnector({
        start: { 
          position: areaPoints[areaPoints.length - 1]
        },
        end: { 
          position: areaPoints[0]
        },
        shape: 'straight',
        style: {
          strokeColor: '#00b8d4',
          strokeWidth: 4,
          startStrokeCap: 'none',
          endStrokeCap: 'none'
        }
      });

      const allLines = [...tempAreaLines, line.id];

      // Calculate area using shoelace formula
      let area = 0;
      for (let i = 0; i < areaPoints.length; i++) {
        const j = (i + 1) % areaPoints.length;
        area += areaPoints[i].x * areaPoints[j].y;
        area -= areaPoints[j].x * areaPoints[i].y;
      }
      area = Math.abs(area / 2);

      // Calculate perimeter
      let perimeter = 0;
      for (let i = 0; i < areaPoints.length; i++) {
        const j = (i + 1) % areaPoints.length;
        const dx = areaPoints[j].x - areaPoints[i].x;
        const dy = areaPoints[j].y - areaPoints[i].y;
        perimeter += Math.sqrt(dx * dx + dy * dy);
      }

      // Convert to actual units
      const actualArea = area / (calibration.pixelsPerUnit * calibration.pixelsPerUnit);
      const actualPerimeter = perimeter / calibration.pixelsPerUnit;

      // Create label showing area
      const centerX = areaPoints.reduce((sum, p) => sum + p.x, 0) / areaPoints.length;
      const centerY = areaPoints.reduce((sum, p) => sum + p.y, 0) / areaPoints.length;

      const formattedArea = formatMeasurement(actualArea, calibration.unit, showFeetInches);
      const formattedPerimeter = formatMeasurement(actualPerimeter, calibration.unit, showFeetInches);
      const areaDisplay = calibration.unit === 'ft' && showFeetInches ? `${formattedArea} sq` : `${formattedArea} ${calibration.unit}²`;
      const perimDisplay = calibration.unit === 'ft' && showFeetInches ? formattedPerimeter : `${formattedPerimeter} ${calibration.unit}`;
      
      const areaText = await window.miro.board.createText({
        content: `Area: ${areaDisplay}\nPerimeter: ${perimDisplay}`,
        x: centerX,
        y: centerY,
        width: 200,
        style: {
          color: '#00b8d4',
          fontSize: 14,
          textAlign: 'center'
        }
      });

      // Store the area measurement
      const areaMeasurement = {
        id: Date.now(),
        type: 'area',
        area: actualArea,
        perimeter: actualPerimeter,
        unit: calibration.unit,
        points: areaPoints,
        lineIds: allLines,
        textId: areaText.id,
        timestamp: new Date()
      };

      setAreaShapes([...areaShapes, areaMeasurement]);
      setMeasurements([...measurements, areaMeasurement]);

      // Reset for next area
      setAreaPoints([]);
      setTempAreaLines([]);
      setMode('none');
    } catch (error) {
      console.error('Error finishing area measurement:', error);
      alert('Error: ' + error.message);
    }
  };

  const cancelAreaMeasurement = async () => {
    // Remove temporary lines
    if (tempAreaLines.length > 0) {
      try {
        for (const lineId of tempAreaLines) {
          await window.miro.board.remove({ id: lineId });
        }
      } catch (error) {
        console.error('Error removing temp lines:', error);
      }
    }
    
    setAreaPoints([]);
    setTempAreaLines([]);
    setMode('none');
  };

  // Parse feet and inches notation (e.g., 12' 6" or 12'6" or 12' or 6")
  const parseFeetInches = (input) => {
    if (!input || typeof input !== 'string') return null;
    
    const trimmed = input.trim();
    
    // Pattern to match feet and inches: 12' 6" or 12'6" or 12' or 6"
    const feetInchesPattern = /^(\d+(?:\.\d+)?)'?\s*(\d+(?:\.\d+)?)?"?$|^(\d+(?:\.\d+)?)'$/;
    const inchesOnlyPattern = /^(\d+(?:\.\d+)?)"$/;
    
    // Check for feet and inches (e.g., 12' 6" or 12'6")
    const feetInchesMatch = trimmed.match(/(\d+(?:\.\d+)?)'(?:\s*(\d+(?:\.\d+)?)?")?/);
    if (feetInchesMatch) {
      const feet = parseFloat(feetInchesMatch[1] || 0);
      const inches = parseFloat(feetInchesMatch[2] || 0);
      return feet + (inches / 12); // Return total in feet
    }
    
    // Check for inches only (e.g., 6")
    const inchesMatch = trimmed.match(/^(\d+(?:\.\d+)?)"$/);
    if (inchesMatch) {
      const inches = parseFloat(inchesMatch[1]);
      return inches / 12; // Convert to feet
    }
    
    // If no special notation, try parsing as regular number
    const num = parseFloat(trimmed);
    return isNaN(num) ? null : num;
  };

  const handleCalibrationComplete = async () => {
    // Parse the input value to handle feet/inches notation
    const parsedValue = parseFeetInches(calibrationValue);
    
    if (parsedValue === null || parsedValue <= 0) {
      console.log('Please enter a valid distance');
      return;
    }
    
    // Convert parsed value to the selected calibration unit
    let actualDistance = parsedValue;
    
    // If input contained feet/inches notation, convert to selected unit
    if (calibrationValue.includes("'") || calibrationValue.includes('"')) {
      // parsedValue is in feet, convert to calibration unit
      actualDistance = convertUnits(parsedValue, 'ft', calibrationUnit);
    }

    try {
      // Check if this is part of a scale preset application
      const scalePreset = tempCalibrationDistance?.ratio ? tempCalibrationDistance : null;
      
      // Extract calibration data
      const calData = typeof tempCalibrationDistance === 'object' && tempCalibrationDistance.distance 
        ? tempCalibrationDistance 
        : { distance: tempCalibrationDistance, dx: tempCalibrationDistance, dy: tempCalibrationDistance, orientation: calibrationOrientation };
      
      // Calculate pixels per unit for both X and Y axes
      let pixelsPerUnitX, pixelsPerUnitY;
      
      if (calData.orientation === 'horizontal') {
        // Horizontal calibration: dx represents the actual distance
        pixelsPerUnitX = calData.dx / actualDistance;
        // For vertical, apply the axis correction factor
        // If vertical measurements appear larger than they should,
        // we need MORE pixels per unit (multiply by correction factor)
        pixelsPerUnitY = (calData.dx / actualDistance) * axisCorrection;
      } else if (calData.orientation === 'vertical') {
        // Vertical calibration: dy represents the actual distance
        pixelsPerUnitY = calData.dy / actualDistance;
        // For horizontal, apply inverse correction
        pixelsPerUnitX = (calData.dy / actualDistance) / axisCorrection;
      } else {
        // Fallback for old calibrations or diagonal lines
        pixelsPerUnitX = calData.distance / actualDistance;
        pixelsPerUnitY = (calData.distance / actualDistance) * axisCorrection;
      }
      
      console.log('Calibration Complete:', {
        orientation: calData.orientation,
        actualDistance: actualDistance,
        pixelsPerUnitX: pixelsPerUnitX,
        pixelsPerUnitY: pixelsPerUnitY,
        axisCorrection: axisCorrection
      });
      
      // Set calibration with dual-axis support
      const newCalibration = {
        pixelsPerUnit: calData.distance / actualDistance, // Keep for backward compatibility
        pixelsPerUnitX: pixelsPerUnitX, // Horizontal scaling
        pixelsPerUnitY: pixelsPerUnitY, // Vertical scaling
        pixelDistance: calData.distance,
        actualDistance: actualDistance,
        unit: calibrationUnit,
        orientation: calData.orientation,
        ...(scalePreset && {
          ratio: scalePreset.ratio,
          scaleName: scalePreset.name
        }),
        timestamp: new Date().toISOString()
      };
      
      setCalibration(newCalibration);

      // Update the calibration line caption to show the calibration distance
      if (calibrationLine) {
        // Get the current line to preserve its position
        const items = await window.miro.board.get({ id: [calibrationLine.id] });
        if (items.length === 1) {
          const line = items[0];
          
          // Create a new line with updated caption and green color
          const updatedLine = await window.miro.board.createConnector({
            start: {
              ...line.start
            },
            end: {
              ...line.end
            },
            shape: 'straight',
            style: {
              strokeColor: '#10bb82',
              strokeWidth: 2,
              startStrokeCap: 'none',
              endStrokeCap: 'none'
            },
            captions: [{
              content: `Calibration: ${formatMeasurement(actualDistance, calibrationUnit, true)}${scalePreset ? ` (${scalePreset.name})` : ''}`,
              position: 0.5
            }]
          });

          // Remove the old red line
          await window.miro.board.remove(calibrationLine);
          
          // Store the calibration line ID
          setCalibrationLineId(updatedLine.id);
        }
      } else if (calibrationLineId) {
        // We're updating an existing green calibration line
        const items = await window.miro.board.get({ id: [calibrationLineId] });
        if (items.length === 1) {
          const line = items[0];
          
          // Create a new line with updated caption
          const updatedLine = await window.miro.board.createConnector({
            start: {
              ...line.start
            },
            end: {
              ...line.end
            },
            shape: 'straight',
            style: {
              strokeColor: '#10bb82',
              strokeWidth: 2,
              startStrokeCap: 'none',
              endStrokeCap: 'none'
            },
            captions: [{
              content: `Calibration: ${formatMeasurement(actualDistance, calibrationUnit, true)}${scalePreset ? ` (${scalePreset.name})` : ''}`,
              position: 0.5
            }]
          });

          // Remove the old line
          await window.miro.board.remove({ id: calibrationLineId });
          
          // Store the new calibration line ID
          setCalibrationLineId(updatedLine.id);
        }
      }

      setShowCalibrationModal(false);
      setCalibrationValue('');
      setCalibrationFeet('');
      setCalibrationInches('');
      setCalibrationMeters('');
      setCalibrationCentimeters('');
      setCalibrationLine(null);
      setTempCalibrationDistance(null); // Clear the temp preset data
      
      // Calibration complete - log for debugging
      if (scalePreset) {
        console.log('Scale preset applied:', scalePreset.name, actualDistance, calibrationUnit);
      }
      
      // Automatically start measurement mode
      setMode('measure');
      await startMeasurement();
    } catch (error) {
      console.error('Error updating calibration line:', error);
      setMode('none');
      setShowCalibrationModal(false);
      setCalibrationValue('');
      setCalibrationFeet('');
      setCalibrationInches('');
      setCalibrationMeters('');
      setCalibrationCentimeters('');
      setCalibrationLine(null);
      setTempCalibrationDistance(null);
    }
  };

  const handleMeasurementComplete = (pixelDistance) => {
    if (!calibration) return;

    const actualDistance = pixelDistance / calibration.pixelsPerUnit;
    const conversions = getAllConversions(actualDistance, calibration.unit);

    const measurement = {
      id: Date.now(),
      type: 'linear',
      distance: actualDistance,
      unit: calibration.unit,
      conversions: conversions,
      timestamp: new Date()
    };

    setMeasurements([...measurements, measurement]);
    setMode('none');
  };

  // Export Measurements to CSV
  const exportMeasurementsToCSV = () => {
    if (measurements.length === 0) {
      alert('No measurements to export');
      return;
    }

    // Create CSV content
    const headers = ['#', 'Type', 'Value', 'Unit', 'Additional Info', 'Timestamp'];
    const rows = measurements.map((m, idx) => {
      let value, unit, additionalInfo;
      
      switch (m.type) {
        case 'area':
          value = formatMeasurement(m.area, m.unit, showFeetInches);
          unit = m.unit === 'ft' ? 'sq ft' : `${m.unit}²`;
          additionalInfo = m.unit === 'ft' ? `Perimeter: ${formatMeasurement(m.perimeter, m.unit, showFeetInches)}` : `Perimeter: ${formatMeasurement(m.perimeter, m.unit, showFeetInches)} ${m.unit}`;
          break;
        case 'polyline':
          value = formatMeasurement(m.totalLength, m.unit, showFeetInches);
          unit = m.unit === 'ft' ? '' : m.unit;
          additionalInfo = `${m.points.length} segments`;
          break;
        case 'count':
          value = m.number;
          unit = 'item';
          additionalInfo = '';
          break;
        case 'volume':
          value = formatNumber(m.volume, 2);
          unit = `${m.unit}³`;
          additionalInfo = `Base: ${formatNumber(m.baseArea, 2)} ${m.unit}², Height: ${formatNumber(m.height, 2)} ${m.unit}`;
          break;
        case 'angle':
          value = formatNumber(m.angle, 1);
          unit = 'degrees';
          additionalInfo = '';
          break;
        case 'circle':
          value = formatMeasurement(m.radius, m.unit, showFeetInches);
          unit = m.unit === 'ft' ? '(radius)' : `${m.unit} (radius)`;
          const formattedD = formatMeasurement(m.diameter, m.unit, showFeetInches);
          const formattedC = formatMeasurement(m.circumference, m.unit, showFeetInches);
          const formattedA = formatMeasurement(m.area, m.unit, showFeetInches);
          additionalInfo = m.unit === 'ft' ? `D: ${formattedD}, C: ${formattedC}, A: ${formattedA} sq` : `D: ${formattedD}, C: ${formattedC}, A: ${formattedA} ${m.unit}²`;
          break;
        case 'cutout':
          value = formatMeasurement(m.netArea, m.unit, showFeetInches);
          unit = m.unit === 'ft' ? 'sq ft (net)' : `${m.unit}² (net)`;
          const formattedGross = formatMeasurement(m.grossArea, m.unit, showFeetInches);
          const formattedCutout = formatMeasurement(m.cutoutArea, m.unit, showFeetInches);
          const formattedNet = formatMeasurement(m.netArea, m.unit, showFeetInches);
          const sqUnit = m.unit === 'ft' ? 'sq' : `${m.unit}²`;
          additionalInfo = `Gross: ${formattedGross} ${sqUnit}, Cutouts: ${formattedCutout} ${sqUnit}, Net: ${formattedNet} ${sqUnit}`;
          break;
        case 'slope':
          value = m.riseRunRatio;
          unit = 'ratio';
          const formattedRise = formatMeasurement(m.rise, m.unit, showFeetInches);
          const formattedRun = formatMeasurement(m.run, m.unit, showFeetInches);
          additionalInfo = m.unit === 'ft' ? `${formatNumber(m.slopePercentage, 1)}% / ${formatNumber(m.slopeDegrees, 1)}°, Rise: ${formattedRise}, Run: ${formattedRun}` : `${formatNumber(m.slopePercentage, 1)}% / ${formatNumber(m.slopeDegrees, 1)}°, Rise: ${formattedRise} ${m.unit}, Run: ${formattedRun} ${m.unit}`;
          break;
        case 'volume':
          value = formatMeasurement(m.volume, m.unit, showFeetInches);
          unit = m.unit === 'ft' ? 'cu ft' : `${m.unit}³`;
          const formattedBase = formatMeasurement(m.baseArea, m.unit, showFeetInches);
          const formattedHeight = formatMeasurement(m.height, m.unit, showFeetInches);
          additionalInfo = m.unit === 'ft' ? `Base: ${formattedBase} sq, Height: ${formattedHeight}` : `Base: ${formattedBase} ${m.unit}², Height: ${formattedHeight} ${m.unit}`;
          break;
        default: // linear
          value = formatMeasurement(m.distance, m.unit, showFeetInches);
          unit = m.unit === 'ft' ? '' : m.unit;
          additionalInfo = '';
      }
      
      return [
        idx + 1,
        m.type || 'linear',
        value,
        unit,
        additionalInfo,
        m.timestamp ? new Date(m.timestamp).toLocaleString() : ''
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `measuremint-measurements-${Date.now()}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  // Count Tool Functions
  const startCountTool = () => {
    if (!calibration) {
      return;
    }
    setMode('count');
  };

  const addCountMarker = async () => {
    try {
      const viewport = await window.miro.board.viewport.get();
      const centerX = viewport.x + viewport.width / 2;
      const centerY = viewport.y + viewport.height / 2;
      const offsetX = viewport.width * 0.25;

      const newCount = countTotal + 1;
      
      // Create a sticky note as a marker
      const marker = await window.miro.board.createStickyNote({
        content: `${newCount}`,
        x: centerX + offsetX,
        y: centerY,
        style: {
          fillColor: 'light_yellow',
          textAlign: 'center',
          textAlignVertical: 'middle'
        },
        width: 100
      });

      const countItem = {
        id: Date.now(),
        type: 'count',
        number: newCount,
        markerId: marker.id,
        timestamp: new Date()
      };

      setCountItems([...countItems, countItem]);
      setCountTotal(newCount);
      setMeasurements([...measurements, { ...countItem, description: `Count #${newCount}` }]);
    } catch (error) {
      console.error('Error adding count marker:', error);
    }
  };

  const resetCount = () => {
    setCountTotal(0);
    setCountItems([]);
    setMode('none');
  };

  const clearAllMeasurements = async () => {
    const proceed = await showConfirm(
      'Are you sure you want to clear all measurements?',
      'Clear All Measurements'
    );
    
    if (proceed) {
      setMeasurements([]);
      setMode('none');
    }
  };

  // Polyline Measurement Functions
  const startPolylineMeasurement = async () => {
    if (!calibration) {
      await showAlert('Please set up calibration first.', 'MeasureMint');
      return;
    }
    
    try {
      const proceed = await showConfirm(
        'Draw multiple connected lines on the board to represent your path.\n\n' +
        'Then select ALL the lines and click OK.',
        'MeasureMint - Polyline Path'
      );
      
      if (!proceed) return;
      
      const selection = await miro.board.getSelection();
      
      if (!selection || selection.length === 0) {
        await showAlert('No lines selected. Please select the path lines and try again.', 'Error');
        return;
      }
      
      // Filter only connectors
      const lines = selection.filter(item => item.type === 'connector');
      
      if (lines.length === 0) {
        await showAlert('Please select connector lines (not shapes or text).', 'Error');
        return;
      }
      
      // Calculate total length
      let totalPixels = 0;
      const segments = [];
      
      for (const line of lines) {
        // Handle both direct coordinates and position objects
        const startX = line.start.x ?? line.start.position?.x ?? 0;
        const startY = line.start.y ?? line.start.position?.y ?? 0;
        const endX = line.end.x ?? line.end.position?.x ?? 0;
        const endY = line.end.y ?? line.end.position?.y ?? 0;
        
        const dx = endX - startX;
        const dy = endY - startY;
        const segmentPixels = Math.sqrt(dx * dx + dy * dy);
        totalPixels += segmentPixels;
        const segmentLength = segmentPixels / calibration.pixelsPerUnit;
        segments.push(segmentLength);
      }
      
      const totalLength = totalPixels / calibration.pixelsPerUnit;
      
      // Create label at the last line's endpoint
      const lastLine = lines[lines.length - 1];
      const labelX = lastLine.end.x ?? lastLine.end.position?.x ?? 0;
      const labelY = (lastLine.end.y ?? lastLine.end.position?.y ?? 0) + 50;
      
      const formattedLength = formatMeasurement(totalLength, calibration.unit);
      const lengthDisplay = calibration.unit === 'ft' ? formattedLength : `${formattedLength} ${calibration.unit}`;
      
      const lengthText = await miro.board.createText({
        content: `Path Length: ${lengthDisplay}\\n${lines.length} segments`,
        x: labelX,
        y: labelY,
        width: 200,
        style: {
          color: '#ff6b6b',
          fontSize: 14,
          textAlign: 'center'
        }
      });
      
      // Store the measurement
      const polylineMeasurement = {
        id: Date.now(),
        type: 'polyline',
        totalLength,
        segments,
        unit: calibration.unit,
        lineIds: lines.map(l => l.id),
        textId: lengthText.id,
        timestamp: new Date()
      };
      
      setMeasurements([...measurements, polylineMeasurement]);
      await showAlert(`Path measured: ${lengthDisplay}\\n${lines.length} segments`, 'Success');
      
    } catch (error) {
      console.error('Error measuring polyline:', error);
      await showAlert('Error measuring path: ' + error.message, 'Error');
    }
  };

  // Volume Measurement Functions
  const startVolumeMeasurement = () => {
    if (!calibration) {
      return;
    }
    // Reuse area measurement for base
    setMode('volume');
    setAreaPoints([]);
    setTempAreaLines([]);
  };

  const finishVolumeBase = async () => {
    if (areaPoints.length < 3) {
      alert('Please select at least 3 points for the base area');
      return;
    }

    try {
      // Calculate base area
      let area = 0;
      for (let i = 0; i < areaPoints.length; i++) {
        const j = (i + 1) % areaPoints.length;
        area += areaPoints[i].x * areaPoints[j].y;
        area -= areaPoints[j].x * areaPoints[i].y;
      }
      area = Math.abs(area / 2);
      const actualArea = area / (calibration.pixelsPerUnit * calibration.pixelsPerUnit);

      setVolumeBaseArea({ area: actualArea, points: areaPoints, lineIds: tempAreaLines });
      setShowVolumeModal(true);
    } catch (error) {
      console.error('Error calculating volume base:', error);
    }
  };

  const completeVolumeCalculation = async () => {
    const height = parseFloat(volumeHeight);
    if (!height || height <= 0) {
      alert('Please enter a valid height');
      return;
    }

    try {
      const volume = volumeBaseArea.area * height;

      // Close the polygon
      const line = await window.miro.board.createConnector({
        start: { position: areaPoints[areaPoints.length - 1] },
        end: { position: areaPoints[0] },
        shape: 'straight',
        style: {
          strokeColor: '#9c27b0', // Purple for volume
          strokeWidth: 4
        }
      });

      const allLines = [...tempAreaLines, line.id];

      // Add label
      const centerX = areaPoints.reduce((sum, p) => sum + p.x, 0) / areaPoints.length;
      const centerY = areaPoints.reduce((sum, p) => sum + p.y, 0) / areaPoints.length;

      const volumeText = await window.miro.board.createText({
        content: `Volume: ${formatNumber(volume, 2)} ${calibration.unit}³\nBase: ${formatNumber(volumeBaseArea.area, 2)} ${calibration.unit}²\nHeight: ${formatNumber(height, 2)} ${calibration.unit}`,
        x: centerX,
        y: centerY,
        width: 250,
        style: {
          color: '#9c27b0',
          fontSize: 14,
          textAlign: 'center'
        }
      });

      const volumeMeasurement = {
        id: Date.now(),
        type: 'volume',
        volume,
        baseArea: volumeBaseArea.area,
        height,
        unit: calibration.unit,
        points: areaPoints,
        lineIds: allLines,
        textId: volumeText.id,
        timestamp: new Date()
      };

      setMeasurements([...measurements, volumeMeasurement]);
      setAreaPoints([]);
      setTempAreaLines([]);
      setVolumeBaseArea(null);
      setVolumeHeight('');
      setShowVolumeModal(false);
      setMode('none');
    } catch (error) {
      console.error('Error completing volume calculation:', error);
    }
  };

  // Angle Measurement Functions
  const startAngleMeasurement = async () => {
    if (!calibration) {
      await showAlert('Please set up calibration first.', 'MeasureMint');
      return;
    }
    
    try {
      const proceed = await showConfirm(
        'Draw two lines that meet at a vertex (angle point).\n\n' +
        'Then select BOTH lines and click OK.\n\n' +
        'The angle will be calculated at their intersection.',
        'MeasureMint - Angle Measurement'
      );
      
      if (!proceed) return;
      
      const selection = await miro.board.getSelection();
      
      if (!selection || selection.length !== 2) {
        await showAlert('Please select exactly 2 connector lines.', 'Error');
        return;
      }
      
      const lines = selection.filter(item => item.type === 'connector');
      
      if (lines.length !== 2) {
        await showAlert('Please select exactly 2 connector lines (not shapes or text).', 'Error');
        return;
      }
      
      const [line1, line2] = lines;
      
      // Helper to get coordinates
      const getCoords = (point) => ({
        x: point.x ?? point.position?.x ?? 0,
        y: point.y ?? point.position?.y ?? 0
      });
      
      const line1Start = getCoords(line1.start);
      const line1End = getCoords(line1.end);
      const line2Start = getCoords(line2.start);
      const line2End = getCoords(line2.end);
      
      // Find common vertex (shared point)
      let vertex, p1, p2;
      
      if (Math.abs(line1End.x - line2Start.x) < 5 && Math.abs(line1End.y - line2Start.y) < 5) {
        // line1.end connects to line2.start
        vertex = line1End;
        p1 = line1Start;
        p2 = line2End;
      } else if (Math.abs(line1End.x - line2End.x) < 5 && Math.abs(line1End.y - line2End.y) < 5) {
        // line1.end connects to line2.end
        vertex = line1End;
        p1 = line1Start;
        p2 = line2Start;
      } else if (Math.abs(line1Start.x - line2Start.x) < 5 && Math.abs(line1Start.y - line2Start.y) < 5) {
        // line1.start connects to line2.start
        vertex = line1Start;
        p1 = line1End;
        p2 = line2End;
      } else if (Math.abs(line1Start.x - line2End.x) < 5 && Math.abs(line1Start.y - line2End.y) < 5) {
        // line1.start connects to line2.end
        vertex = line1Start;
        p1 = line1End;
        p2 = line2Start;
      } else {
        await showAlert('The two lines must share a common endpoint (vertex).', 'Error');
        return;
      }
      
      // Calculate angle using vectors
      const v1 = { x: p1.x - vertex.x, y: p1.y - vertex.y };
      const v2 = { x: p2.x - vertex.x, y: p2.y - vertex.y };
      
      const dot = v1.x * v2.x + v1.y * v2.y;
      const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
      const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
      const angleRad = Math.acos(dot / (mag1 * mag2));
      const angleDeg = angleRad * (180 / Math.PI);
      
      // Create label at vertex
      const angleText = await miro.board.createText({
        content: `${formatNumber(angleDeg, 1)}°`,
        x: vertex.x,
        y: vertex.y + 50,
        width: 100,
        style: {
          color: '#ff9800',
          fontSize: 18,
          textAlign: 'center',
          fontWeight: 'bold'
        }
      });
      
      const angleMeasurement = {
        id: Date.now(),
        type: 'angle',
        angle: angleDeg,
        lineIds: lines.map(l => l.id),
        textId: angleText.id,
        unit: calibration.unit,
        timestamp: new Date()
      };
      
      setMeasurements([...measurements, angleMeasurement]);
      await showAlert(`Angle measured: ${formatNumber(angleDeg, 1)}°`, 'Success');
      
    } catch (error) {
      console.error('Error measuring angle:', error);
      await showAlert('Error measuring angle: ' + error.message, 'Error');
    }
  };

  // Circle Measurement Functions
  const startCircleMeasurement = async () => {
    if (!calibration) {
      await showAlert('Please set up calibration first.', 'MeasureMint');
      return;
    }
    
    try {
      const proceed = await showConfirm(
        'Draw a circle shape on the board.\n\n' +
        'Then select the circle and click OK.\n\n' +
        'The radius, diameter, circumference, and area will be calculated.',
        'MeasureMint - Circle Measurement'
      );
      
      if (!proceed) return;
      
      const selection = await miro.board.getSelection();
      
      if (!selection || selection.length === 0) {
        await showAlert('No shape selected. Please select a circle and try again.', 'Error');
        return;
      }
      
      const circle = selection[0];
      
      if (circle.type !== 'shape' || (circle.shape !== 'circle' && circle.shape !== 'oval')) {
        await showAlert('Please select a circle or oval shape.', 'Error');
        return;
      }
      
      // Get circle dimensions
      // Use the smaller of width/height as the true diameter to avoid distortion
      const widthPixels = circle.width;
      const heightPixels = circle.height;
      
      console.log('Circle Debug:', {
        widthPixels,
        heightPixels,
        pixelsPerUnitX: calibration.pixelsPerUnitX,
        pixelsPerUnitY: calibration.pixelsPerUnitY,
        pixelsPerUnit: calibration.pixelsPerUnit
      });
      
      // Calculate radius using appropriate axis scaling
      let radius;
      if (calibration.pixelsPerUnitX && calibration.pixelsPerUnitY) {
        // Use axis-specific scaling
        const radiusX = (widthPixels / 2) / calibration.pixelsPerUnitX;
        const radiusY = (heightPixels / 2) / calibration.pixelsPerUnitY;
        console.log('Circle Calculation:', {
          radiusX,
          radiusY,
          averageRadius: (radiusX + radiusY) / 2
        });
        // Use average for true circles, or smaller value to avoid over-estimation
        radius = (radiusX + radiusY) / 2;
      } else {
        // Fallback to old method
        const radiusPixels = (widthPixels + heightPixels) / 4;
        radius = radiusPixels / calibration.pixelsPerUnit;
        console.log('Circle Fallback:', { radiusPixels, pixelsPerUnit: calibration.pixelsPerUnit, radius });
      }
      
      const diameter = radius * 2;
      const circumference = 2 * Math.PI * radius;
      const area = Math.PI * radius * radius;
      
      // Format measurements
      const formattedRadius = formatMeasurement(radius, calibration.unit);
      const formattedDiameter = formatMeasurement(diameter, calibration.unit);
      const formattedCircumference = formatMeasurement(circumference, calibration.unit);
      const formattedArea = formatMeasurement(area, calibration.unit);
      
      const unitLabel = calibration.unit === 'ft' ? '' : ` ${calibration.unit}`;
      const sqUnitLabel = calibration.unit === 'ft' ? ' sq ft' : ` ${calibration.unit}²`;
      
      // Create label below circle
      const textOffsetY = Math.max(widthPixels, heightPixels) / 2 + 60;
      const circleText = await miro.board.createText({
        content: `Radius: ${formattedRadius}${unitLabel}\\nDiameter: ${formattedDiameter}${unitLabel}\\nCircumference: ${formattedCircumference}${unitLabel}\\nArea: ${formattedArea}${sqUnitLabel}`,
        x: circle.x,
        y: circle.y + textOffsetY,
        width: 250,
        style: {
          color: '#e91e63',
          fontSize: 12,
          textAlign: 'center'
        }
      });
      
      const circleMeasurement = {
        id: Date.now(),
        type: 'circle',
        radius,
        diameter,
        circumference,
        area,
        unit: calibration.unit,
        shapeId: circle.id,
        textId: circleText.id,
        timestamp: new Date()
      };
      
      setMeasurements([...measurements, circleMeasurement]);
      await showAlert(
        `Circle measured:\\nRadius: ${formattedRadius}${unitLabel}\\nArea: ${formattedArea}${sqUnitLabel}`,
        'Success'
      );
      
    } catch (error) {
      console.error('Error measuring circle:', error);
      await showAlert('Error measuring circle: ' + error.message, 'Error');
    }
  };

  // Cutout/Subtract Areas Functions
  const startCutoutArea = () => {
    setMode('cutout');
    setCutoutMode('main');
    setCutoutMainPoints([]);
    setCutoutMainLines([]);
    setCutoutPolygons([]);
    setCurrentCutoutPoints([]);
    setCurrentCutoutLines([]);
  };

  const addCutoutPoint = async (x, y) => {
    const newPoint = { x, y };

    if (cutoutMode === 'main') {
      // Adding points to main polygon
      const updatedPoints = [...cutoutMainPoints, newPoint];
      setCutoutMainPoints(updatedPoints);

      // Draw line from previous point
      if (cutoutMainPoints.length > 0) {
        try {
          const prevPoint = cutoutMainPoints[cutoutMainPoints.length - 1];
          const line = await window.miro.board.createConnector({
            start: { 
              position: prevPoint
            },
            end: { 
              position: newPoint
            },
            shape: 'straight',
            style: {
              strokeColor: '#00b8d4', // Cyan for main area
              strokeWidth: 4,
              startStrokeCap: 'none',
              endStrokeCap: 'none'
            }
          });
          
          setCutoutMainLines([...cutoutMainLines, line.id]);
        } catch (error) {
          console.error('Error drawing main area line:', error);
        }
      }
    } else if (cutoutMode === 'cutout') {
      // Adding points to cutout polygon
      const updatedPoints = [...currentCutoutPoints, newPoint];
      setCurrentCutoutPoints(updatedPoints);

      // Draw line from previous point
      if (currentCutoutPoints.length > 0) {
        try {
          const prevPoint = currentCutoutPoints[currentCutoutPoints.length - 1];
          const line = await window.miro.board.createConnector({
            start: { 
              position: prevPoint
            },
            end: { 
              position: newPoint
            },
            shape: 'straight',
            style: {
              strokeColor: '#ff6b6b', // Red for cutouts
              strokeWidth: 4,
              startStrokeCap: 'none',
              endStrokeCap: 'none'
            }
          });
          
          setCurrentCutoutLines([...currentCutoutLines, line.id]);
        } catch (error) {
          console.error('Error drawing cutout line:', error);
        }
      }
    }
  };

  const finishMainArea = async () => {
    if (cutoutMainPoints.length < 3) {
      alert('Please select at least 3 points for the main area');
      return;
    }

    try {
      // Close the main polygon
      const line = await window.miro.board.createConnector({
        start: { 
          position: cutoutMainPoints[cutoutMainPoints.length - 1]
        },
        end: { 
          position: cutoutMainPoints[0]
        },
        shape: 'straight',
        style: {
          strokeColor: '#00b8d4',
          strokeWidth: 4,
          startStrokeCap: 'none',
          endStrokeCap: 'none'
        }
      });

      setCutoutMainLines([...cutoutMainLines, line.id]);
      setCutoutMode('cutout');
      alert('Main area complete! Now click points to define cutout areas, or finish to complete.');
    } catch (error) {
      console.error('Error closing main area:', error);
    }
  };

  const finishCutout = async () => {
    if (currentCutoutPoints.length < 3) {
      alert('Please select at least 3 points for the cutout area');
      return;
    }

    try {
      // Close the cutout polygon
      const line = await window.miro.board.createConnector({
        start: { 
          position: currentCutoutPoints[currentCutoutPoints.length - 1]
        },
        end: { 
          position: currentCutoutPoints[0]
        },
        shape: 'straight',
        style: {
          strokeColor: '#ff6b6b',
          strokeWidth: 4,
          startStrokeCap: 'none',
          endStrokeCap: 'none'
        }
      });

      const allCutoutLines = [...currentCutoutLines, line.id];
      
      // Save this cutout polygon
      setCutoutPolygons([...cutoutPolygons, {
        points: currentCutoutPoints,
        lines: allCutoutLines
      }]);

      // Reset for next cutout
      setCurrentCutoutPoints([]);
      setCurrentCutoutLines([]);
      
      alert('Cutout complete! Add another cutout or finish the measurement.');
    } catch (error) {
      console.error('Error finishing cutout:', error);
    }
  };

  const finishCutoutMeasurement = async () => {
    if (cutoutMainPoints.length < 3) {
      alert('Please complete the main area first');
      return;
    }

    try {
      // Calculate main area using shoelace formula
      let grossArea = 0;
      for (let i = 0; i < cutoutMainPoints.length; i++) {
        const j = (i + 1) % cutoutMainPoints.length;
        grossArea += cutoutMainPoints[i].x * cutoutMainPoints[j].y;
        grossArea -= cutoutMainPoints[j].x * cutoutMainPoints[i].y;
      }
      grossArea = Math.abs(grossArea / 2);

      // Calculate cutout areas
      let totalCutoutArea = 0;
      for (const cutout of cutoutPolygons) {
        let cutoutArea = 0;
        for (let i = 0; i < cutout.points.length; i++) {
          const j = (i + 1) % cutout.points.length;
          cutoutArea += cutout.points[i].x * cutout.points[j].y;
          cutoutArea -= cutout.points[j].x * cutout.points[i].y;
        }
        totalCutoutArea += Math.abs(cutoutArea / 2);
      }

      // Calculate net area
      const netArea = grossArea - totalCutoutArea;

      // Convert to real-world units
      const pixelsPerUnit = calibration.pixelDistance / calibration.actualDistance;
      const grossAreaReal = grossArea / (pixelsPerUnit * pixelsPerUnit);
      const cutoutAreaReal = totalCutoutArea / (pixelsPerUnit * pixelsPerUnit);
      const netAreaReal = netArea / (pixelsPerUnit * pixelsPerUnit);

      // Get all conversions
      const grossConversions = getAllConversions(grossAreaReal, calibration.unit);
      const cutoutConversions = getAllConversions(cutoutAreaReal, calibration.unit);
      const netConversions = getAllConversions(netAreaReal, calibration.unit);

      // Collect all line IDs
      const allLines = [...cutoutMainLines];
      cutoutPolygons.forEach(cutout => {
        allLines.push(...cutout.lines);
      });

      // Store the cutout measurement
      const cutoutMeasurement = {
        id: Date.now(),
        type: 'cutout',
        grossArea: grossAreaReal,
        cutoutArea: cutoutAreaReal,
        netArea: netAreaReal,
        unit: calibration.unit,
        grossConversions,
        cutoutConversions,
        netConversions,
        mainPoints: cutoutMainPoints,
        cutoutPolygons: cutoutPolygons,
        lineIds: allLines,
        timestamp: new Date().toISOString()
      };

      setMeasurements([...measurements, cutoutMeasurement]);
      
      // Reset state
      setCutoutMainPoints([]);
      setCutoutMainLines([]);
      setCutoutPolygons([]);
      setCurrentCutoutPoints([]);
      setCurrentCutoutLines([]);
      setCutoutMode('main');
      setMode('none');
    } catch (error) {
      console.error('Error finishing cutout measurement:', error);
      alert('Error calculating cutout area. Please try again.');
    }
  };

  const cancelCutoutMeasurement = async () => {
    try {
      // Remove all main area lines
      for (const lineId of cutoutMainLines) {
        await window.miro.board.remove({ id: lineId });
      }

      // Remove all cutout lines
      for (const cutout of cutoutPolygons) {
        for (const lineId of cutout.lines) {
          await window.miro.board.remove({ id: lineId });
        }
      }

      // Remove current cutout lines
      for (const lineId of currentCutoutLines) {
        await window.miro.board.remove({ id: lineId });
      }
    } catch (error) {
      console.error('Error cleaning up cutout lines:', error);
    }

    setCutoutMainPoints([]);
    setCutoutMainLines([]);
    setCutoutPolygons([]);
    setCurrentCutoutPoints([]);
    setCurrentCutoutLines([]);
    setCutoutMode('main');
    setMode('none');
  };

  // Slope/Pitch Measurement Functions
  const startSlopeMeasurement = async () => {
    if (!calibration) {
      await showAlert('Please set up calibration first.', 'MeasureMint');
      return;
    }
    
    try {
      const proceed = await showConfirm(
        'Draw a line representing the slope.\n\n' +
        'Then select the line and click OK.\n\n' +
        'The slope will be calculated in multiple formats:\n' +
        '• Rise:Run ratio\n' +
        '• Percentage\n' +
        '• Degrees',
        'MeasureMint - Slope Measurement'
      );
      
      if (!proceed) return;
      
      const selection = await miro.board.getSelection();
      
      if (!selection || selection.length === 0) {
        await showAlert('No line selected. Please select a connector line and try again.', 'Error');
        return;
      }
      
      const line = selection[0];
      
      if (line.type !== 'connector') {
        await showAlert('Please select a connector line (not a shape or text).', 'Error');
        return;
      }
      
      // Calculate slope - handle both coordinate formats
      const getCoords = (point) => ({
        x: point.x ?? point.position?.x ?? 0,
        y: point.y ?? point.position?.y ?? 0
      });
      
      const p1 = getCoords(line.start);
      const p2 = getCoords(line.end);
      
      // Calculate rise and run in pixels
      const runPixels = Math.abs(p2.x - p1.x);
      const risePixels = Math.abs(p2.y - p1.y);
      
      // Convert to real-world units
      const run = runPixels / calibration.pixelsPerUnit;
      const rise = risePixels / calibration.pixelsPerUnit;
      
      // Calculate slope formats
      const slopeRatio = run > 0 ? rise / run : 0;
      const slopePercentage = slopeRatio * 100;
      const slopeDegrees = Math.atan(slopeRatio) * (180 / Math.PI);
      
      // Format as Rise:Run (simplified ratio)
      let riseRunRatio = '0:0';
      if (run > 0) {
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
        const divisor = gcd(Math.round(rise * 100), Math.round(run * 100));
        const riseInt = Math.round(rise * 100) / divisor;
        const runInt = Math.round(run * 100) / divisor;
        riseRunRatio = `${formatNumber(riseInt, 2)}:${formatNumber(runInt, 2)}`;
      }
      
      // Format measurements
      const formattedRise = formatMeasurement(rise, calibration.unit);
      const formattedRun = formatMeasurement(run, calibration.unit);
      const unitLabel = calibration.unit === 'ft' ? '' : ` ${calibration.unit}`;
      
      // Update line with caption - properly handle start/end format
      const updatedLine = await miro.board.createConnector({
        start: { 
          position: p1
        },
        end: { 
          position: p2
        },
        shape: 'straight',
        style: {
          strokeColor: '#9c27b0',
          strokeWidth: 2,
          startStrokeCap: 'none',
          endStrokeCap: 'none'
        },
        captions: [{
          content: `Slope: ${riseRunRatio} (${formatNumber(slopePercentage, 1)}%, ${formatNumber(slopeDegrees, 1)}°)`,
          position: 0.5,
          textAlignVertical: 'middle'
        }]
      });
      
      // Remove old line
      await miro.board.remove(line);
      
      // Store the slope measurement
      const slopeMeasurement = {
        id: Date.now(),
        type: 'slope',
        rise,
        run,
        riseRunRatio,
        slopePercentage,
        slopeDegrees,
        unit: calibration.unit,
        lineId: updatedLine.id,
        timestamp: new Date()
      };
      
      setMeasurements([...measurements, slopeMeasurement]);
      await showAlert(
        `Slope measured:\\n` +
        `Ratio: ${riseRunRatio}\\n` +
        `Percentage: ${formatNumber(slopePercentage, 1)}%\\n` +
        `Degrees: ${formatNumber(slopeDegrees, 1)}°\\n` +
        `Rise: ${formattedRise}${unitLabel}\\n` +
        `Run: ${formattedRun}${unitLabel}`,
        'Success'
      );
      
    } catch (error) {
      console.error('Error measuring slope:', error);
      await showAlert('Error measuring slope: ' + error.message, 'Error');
    }
  };

  // Multiple Scale Regions Functions
  const startScaleRegion = () => {
    setMode('scaleRegion');
    setCurrentRegionPoints([]);
    setCurrentRegionLines([]);
  };

  const addRegionPoint = async (x, y) => {
    const newPoint = { x, y };
    const updatedPoints = [...currentRegionPoints, newPoint];
    setCurrentRegionPoints(updatedPoints);

    // Draw line from previous point
    if (currentRegionPoints.length > 0) {
      try {
        const prevPoint = currentRegionPoints[currentRegionPoints.length - 1];
        const line = await window.miro.board.createConnector({
          start: { 
            position: prevPoint
          },
          end: { 
            position: newPoint
          },
          shape: 'straight',
          style: {
            strokeColor: '#ffa500', // Orange for scale regions
            strokeWidth: 3,
            strokeStyle: 'dashed',
            startStrokeCap: 'none',
            endStrokeCap: 'none'
          }
        });
        
        setCurrentRegionLines([...currentRegionLines, line.id]);
      } catch (error) {
        console.error('Error drawing region line:', error);
      }
    }
  };

  const finishScaleRegion = async () => {
    if (currentRegionPoints.length < 3) {
      alert('Please define at least 3 points for the scale region');
      return;
    }

    try {
      // Close the polygon
      const closingLine = await window.miro.board.createConnector({
        start: { 
          position: currentRegionPoints[currentRegionPoints.length - 1]
        },
        end: { 
          position: currentRegionPoints[0]
        },
        shape: 'straight',
        style: {
          strokeColor: '#ffa500',
          strokeWidth: 3,
          strokeStyle: 'dashed',
          startStrokeCap: 'none',
          endStrokeCap: 'none'
        }
      });

      const allLines = [...currentRegionLines, closingLine.id];

      // Calculate bounds
      const xs = currentRegionPoints.map(p => p.x);
      const ys = currentRegionPoints.map(p => p.y);
      const bounds = {
        minX: Math.min(...xs),
        maxX: Math.max(...xs),
        minY: Math.min(...ys),
        maxY: Math.max(...ys)
      };

      // Create a semi-transparent shape to visualize the region
      const shape = await window.miro.board.createShape({
        x: (bounds.minX + bounds.maxX) / 2,
        y: (bounds.minY + bounds.maxY) / 2,
        width: bounds.maxX - bounds.minX,
        height: bounds.maxY - bounds.minY,
        shape: 'rectangle',
        style: {
          fillColor: '#ffa500',
          fillOpacity: 0.1,
          borderColor: '#ffa500',
          borderWidth: 2,
          borderStyle: 'dashed'
        }
      });

      // Prompt for region name and calibration
      const regionName = prompt('Enter a name for this scale region (e.g., "Detail View", "Floor Plan"):', `Region ${scaleRegions.length + 1}`);
      if (!regionName) {
        // User cancelled, clean up
        await window.miro.board.remove(shape);
        for (const lineId of allLines) {
          await window.miro.board.remove({ id: lineId });
        }
        setCurrentRegionPoints([]);
        setCurrentRegionLines([]);
        setMode('none');
        return;
      }

      // Store temporary region data and show calibration setup
      setTempRegionCalibration({
        regionId: Date.now(),
        name: regionName,
        points: currentRegionPoints,
        bounds,
        lines: allLines,
        shapeId: shape.id
      });

      // Trigger calibration for this region
      alert(`Now calibrate the scale for "${regionName}". Draw a calibration line in this region.`);
      startCalibration(); // Use existing calibration flow
      
    } catch (error) {
      console.error('Error finishing scale region:', error);
      alert('Error creating scale region. Please try again.');
    }
  };

  const completeRegionCalibration = async (regionCalibration) => {
    if (!tempRegionCalibration) return;

    try {
      // Create label for the region showing the scale
      const label = await window.miro.board.createStickyNote({
        x: (tempRegionCalibration.bounds.minX + tempRegionCalibration.bounds.maxX) / 2,
        y: tempRegionCalibration.bounds.minY - 100,
        content: `${tempRegionCalibration.name}\nScale: 1:${regionCalibration.ratio || 'Custom'}`,
        style: {
          fillColor: '#ffa500',
          textAlign: 'center'
        },
        width: 200
      });

      // Save the region with its calibration
      const newRegion = {
        ...tempRegionCalibration,
        calibration: regionCalibration,
        labelId: label.id,
        createdAt: new Date().toISOString()
      };

      setScaleRegions([...scaleRegions, newRegion]);
      setTempRegionCalibration(null);
      setCurrentRegionPoints([]);
      setCurrentRegionLines([]);
      setMode('none');
      
      alert(`Scale region "${newRegion.name}" created successfully!`);
    } catch (error) {
      console.error('Error completing region calibration:', error);
      alert('Error saving scale region. Please try again.');
    }
  };

  const deleteScaleRegion = async (regionId) => {
    const region = scaleRegions.find(r => r.regionId === regionId);
    if (!region) return;

    try {
      // Remove visual elements
      await window.miro.board.remove(region.shapeId);
      await window.miro.board.remove(region.labelId);
      for (const lineId of region.lines) {
        await window.miro.board.remove({ id: lineId });
      }

      // Remove from state
      setScaleRegions(scaleRegions.filter(r => r.regionId !== regionId));
      
      if (activeScaleRegion?.regionId === regionId) {
        setActiveScaleRegion(null);
      }
    } catch (error) {
      console.error('Error deleting scale region:', error);
    }
  };

  const selectScaleRegion = (regionId) => {
    const region = scaleRegions.find(r => r.regionId === regionId);
    setActiveScaleRegion(region);
  };

  // NEW: Detect scale regions from Miro groups and frames
  const detectGroupBasedScaleRegions = async () => {
    try {
      alert(
        'Detecting scale regions from groups and frames...\n\n' +
        'How it works:\n' +
        '1. Each GROUP with a calibration line = separate scale region\n' +
        '2. Each FRAME with contents = separate scale region\n' +
        '3. Measurements inside a group/frame use that region\'s calibration\n\n' +
        'Select a group or frame that contains a calibration line to set it up!'
      );

      // Get user selection
      const selection = await window.miro.board.getSelection();
      
      if (selection.length === 0) {
        alert('Please select a group or frame that contains items with a calibration line.');
        return;
      }

      // Check if selection is a frame
      const frame = selection.find(item => item.type === 'frame');
      
      if (frame) {
        // User selected a frame - set up scale region for this frame
        await setupFrameAsScaleRegion(frame);
        return;
      }

      // If not a frame, check if items are grouped
      // Get all items and check if they belong to the same parent group
      const firstItem = selection[0];
      
      // Check if item has a parent (is part of a group)
      if (firstItem.parentId) {
        await setupGroupAsScaleRegion(firstItem.parentId, selection);
      } else {
        alert(
          'The selected items are not grouped.\n\n' +
          'To use automatic scale regions:\n' +
          '1. Group your calibration line with the drawing area\n' +
          '2. Or place items inside a Frame\n' +
          '3. Then measurements inside will use that region\'s calibration'
        );
      }
    } catch (error) {
      console.error('Error detecting group-based scale regions:', error);
      alert('Error: ' + error.message);
    }
  };

  const setupFrameAsScaleRegion = async (frame) => {
    try {
      // Look for a calibration line inside the frame
      const frameChildren = await window.miro.board.get({ 
        type: 'connector',
        // Filter items within frame bounds
      });

      const calibrationLine = frameChildren.find(item => {
        const caption = item.captions?.[0]?.content || '';
        return caption.includes('Calibration:') &&
               item.x >= frame.x - frame.width / 2 &&
               item.x <= frame.x + frame.width / 2 &&
               item.y >= frame.y - frame.height / 2 &&
               item.y <= frame.y + frame.height / 2;
      });

      if (!calibrationLine) {
        alert(
          'No calibration line found in this frame.\n\n' +
          'Please add a calibration line inside the frame first.'
        );
        return;
      }

      // Parse calibration from the line
      const calibrationData = await parseCalibrationFromLine(calibrationLine);
      
      if (!calibrationData) {
        alert('Could not parse calibration data from the line.');
        return;
      }

      // Create scale region for this frame
      const newRegion = {
        regionId: frame.id,
        name: frame.title || `Frame ${scaleRegions.length + 1}`,
        type: 'frame',
        frameId: frame.id,
        calibration: calibrationData,
        bounds: {
          x: frame.x,
          y: frame.y,
          width: frame.width,
          height: frame.height
        },
        timestamp: new Date().toISOString()
      };

      setScaleRegions([...scaleRegions, newRegion]);
      setActiveScaleRegion(newRegion);

      alert(
        `✓ Frame scale region created!\n\n` +
        `Name: ${newRegion.name}\n` +
        `Calibration: ${formatMeasurement(calibrationData.actualDistance, calibrationData.unit, true)}\n\n` +
        `All measurements inside this frame will use this calibration automatically!`
      );
    } catch (error) {
      console.error('Error setting up frame as scale region:', error);
      alert('Error: ' + error.message);
    }
  };

  const setupGroupAsScaleRegion = async (groupId, items) => {
    try {
      // Find calibration line in the group
      const calibrationLine = items.find(item => {
        if (item.type !== 'connector') return false;
        const caption = item.captions?.[0]?.content || '';
        return caption.includes('Calibration:');
      });

      if (!calibrationLine) {
        alert(
          'No calibration line found in this group.\n\n' +
          'Please group your calibration line with the items you want to measure.'
        );
        return;
      }

      // Parse calibration from the line
      const calibrationData = await parseCalibrationFromLine(calibrationLine);
      
      if (!calibrationData) {
        alert('Could not parse calibration data from the line.');
        return;
      }

      // Calculate bounds of the group
      const bounds = calculateGroupBounds(items);

      // Create scale region for this group
      const newRegion = {
        regionId: groupId,
        name: `Group ${scaleRegions.length + 1}`,
        type: 'group',
        groupId: groupId,
        calibration: calibrationData,
        bounds: bounds,
        timestamp: new Date().toISOString()
      };

      setScaleRegions([...scaleRegions, newRegion]);
      setActiveScaleRegion(newRegion);

      alert(
        `✓ Group scale region created!\n\n` +
        `Calibration: ${formatMeasurement(calibrationData.actualDistance, calibrationData.unit, true)}\n\n` +
        `Measurements near this group will use this calibration automatically!`
      );
    } catch (error) {
      console.error('Error setting up group as scale region:', error);
      alert('Error: ' + error.message);
    }
  };

  const parseCalibrationFromLine = async (line) => {
    try {
      const caption = line.captions?.[0]?.content || '';
      const calibrationMatch = caption.match(/Calibration:\s*([0-9.'"\s]+)\s*([a-z]+)?/i);
      
      if (!calibrationMatch) return null;
      
      let calibrationText = calibrationMatch[1].trim();
      let unit = calibrationMatch[2] || 'ft';
      
      const actualDistance = parseFeetInches(calibrationText) || parseFloat(calibrationText);
      
      if (!actualDistance || actualDistance <= 0) return null;
      
      // Calculate pixel distance
      const start = line.start.position;
      const end = line.end.position;
      const pixelDistance = Math.sqrt(
        Math.pow(end.x - start.x, 2) + 
        Math.pow(end.y - start.y, 2)
      );
      
      return {
        pixelsPerUnit: pixelDistance / actualDistance,
        pixelDistance: pixelDistance,
        actualDistance: actualDistance,
        unit: unit
      };
    } catch (error) {
      console.error('Error parsing calibration from line:', error);
      return null;
    }
  };

  const calculateGroupBounds = (items) => {
    if (items.length === 0) return null;
    
    let minX = Infinity, minY = Infinity;
    let maxX = -Infinity, maxY = -Infinity;
    
    items.forEach(item => {
      const halfWidth = (item.width || 0) / 2;
      const halfHeight = (item.height || 0) / 2;
      
      minX = Math.min(minX, item.x - halfWidth);
      maxX = Math.max(maxX, item.x + halfWidth);
      minY = Math.min(minY, item.y - halfHeight);
      maxY = Math.max(maxY, item.y + halfHeight);
    });
    
    return {
      x: (minX + maxX) / 2,
      y: (minY + maxY) / 2,
      width: maxX - minX,
      height: maxY - minY
    };
  };

  const getCalibrationForPoint = (x, y) => {
    // Check if point is inside any scale region (group or frame)
    for (const region of scaleRegions) {
      if (region.type === 'frame' || region.type === 'group') {
        // Check if point is within bounds
        const halfWidth = region.bounds.width / 2;
        const halfHeight = region.bounds.height / 2;
        
        if (x >= region.bounds.x - halfWidth &&
            x <= region.bounds.x + halfWidth &&
            y >= region.bounds.y - halfHeight &&
            y <= region.bounds.y + halfHeight) {
          return region.calibration;
        }
      } else if (region.points) {
        // Legacy polygon-based regions
        if (isPointInPolygon({ x, y }, region.points)) {
          return region.calibration;
        }
      }
    }
    // Fall back to global calibration
    return calibration;
  };

  const isPointInPolygon = (point, polygon) => {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x, yi = polygon[i].y;
      const xj = polygon[j].x, yj = polygon[j].y;
      
      const intersect = ((yi > point.y) !== (yj > point.y))
        && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  };

  const cancelScaleRegion = async () => {
    try {
      // Clean up lines
      for (const lineId of currentRegionLines) {
        await window.miro.board.remove({ id: lineId });
      }
    } catch (error) {
      console.error('Error cleaning up region lines:', error);
    }

    setCurrentRegionPoints([]);
    setCurrentRegionLines([]);
    setMode('none');
  };

  const latestMeasurement = measurements.length > 0 ? measurements[measurements.length - 1] : null;

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        {/* Header */}
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Set Calibration Distance Button - shown when in calibrate mode */}
        {mode === 'calibrate' && calibrationLine && (
          <div style={{
            background: darkMode ? '#2c2c2e' : 'white',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: darkMode ? '0 1px 3px rgba(0, 0, 0, 0.4)' : '0 1px 3px rgba(0, 0, 0, 0.05)',
            marginBottom: '12px'
          }}>
            <button
              onClick={finishCalibration}
              style={{
                ...styles.btnPrimary,
                padding: '12px 20px',
                fontSize: '14px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <MdCheck size={18} /> Set Calibration Distance
            </button>
            <p style={{marginTop: '8px', color: darkMode ? '#8e8e93' : '#718096', fontSize: '11px', textAlign: 'center'}}>
              Drag the line endpoints to match a known distance on your image.<br/>
              One calibration works for both horizontal and vertical measurements!
            </p>
          </div>
        )}

        {/* Calculate Measurement Button - shown when in measure mode */}
        {mode === 'measure' && calibrationLine && (
          <div style={{
            background: darkMode ? '#2c2c2e' : 'white',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: darkMode ? '0 1px 3px rgba(0, 0, 0, 0.4)' : '0 1px 3px rgba(0, 0, 0, 0.05)',
            marginBottom: '12px'
          }}>
            <button
              onClick={finishMeasurement}
              style={{
                ...styles.btnPrimary,
                padding: '12px 20px',
                fontSize: '14px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <MdStraighten size={18} /> Calculate Measurement
            </button>
            <p style={{marginTop: '8px', color: darkMode ? '#8e8e93' : '#718096', fontSize: '11px', textAlign: 'center'}}>
              Drag the line endpoints to the points you want to measure
            </p>
          </div>
        )}

        {/* Main Panel */}
        <main style={styles.panel}>
          <h2 style={styles.panelTitle}>Measurement Tools</h2>
          
          {/* Stacked Tool Sections with Title Separators */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            
            {/* CALIBRATION SECTION */}
            <CalibrationSection
              calibration={calibration}
              calibrationLineId={calibrationLineId}
              darkMode={darkMode}
              onStartCalibration={startCalibration}
              onSelectExisting={selectExistingCalibration}
              onUpdateCalibration={updateCalibration}
            />

            {/* MEASUREMENTS SECTION */}
            <MeasurementSection
              calibration={calibration}
              darkMode={darkMode}
              onStartMeasurement={startMeasurement}
              onUpdateSelected={updateSelectedMeasurement}
            />

            {/* UTILITIES SECTION - Hidden until features are complete */}
            {false && (
            <div style={{
              background: darkMode ? '#1c1c1e' : 'white',
              borderRadius: '12px',
              padding: '12px',
              boxShadow: darkMode ? '0 1px 3px rgba(0, 0, 0, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.05)',
              border: darkMode ? '2px solid #3a3a3c' : '2px solid #e2e8f0'
            }}>
              <div 
                onClick={() => setExpandedSection(expandedSection === 'utilities' ? null : 'utilities')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  padding: '4px',
                  marginBottom: '12px'
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <div style={{...styles.toolIcon, ...styles.toolIcon4, width: '32px', height: '32px'}}>
                    <MdBuild size={20} />
                  </div>
                  <div style={{fontWeight: '600', fontSize: '14px', color: darkMode ? '#ffffff' : '#1a202c'}}>
                    Utilities
                  </div>
                </div>
                <div style={{fontSize: '18px', color: darkMode ? '#8e8e93' : '#718096'}}>
                  {expandedSection === 'utilities' ? '▼' : '▶'}
                </div>
              </div>
              
              {expandedSection === 'utilities' && (
                <div style={{marginTop: '12px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px'}}>
                  <button
                    onClick={detectGroupBasedScaleRegions}
                    style={{
                      ...styles.toolCard,
                      padding: '12px 8px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      border: darkMode ? '2px solid #3a3a3c' : '2px solid #2d3748',
                      background: darkMode ? '#1c1c1e' : '#f8fafc',
                      color: darkMode ? '#ffffff' : '#2d3748'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#10bb82'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#3a3a3c' : '#2d3748'}
                    title="Use Miro groups or frames as scale regions"
                  >
                    <TbLayoutGridAdd size={20} />
                    <span style={{fontSize: '12px', fontWeight: '600', textAlign: 'center'}}>
                      Regions {scaleRegions.length > 0 && `(${scaleRegions.length})`}
                    </span>
                  </button>

                  <button
                    onClick={() => calibration && startCountTool()}
                    style={{
                      ...styles.toolCard,
                      padding: '12px 8px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: calibration ? 'pointer' : 'not-allowed',
                      border: darkMode ? '2px solid #3a3a3c' : '2px solid #2d3748',
                      background: darkMode ? '#1c1c1e' : '#f8fafc',
                      color: darkMode ? '#ffffff' : '#2d3748',
                      opacity: calibration ? 1 : 0.5
                    }}
                    onMouseEnter={(e) => calibration && (e.currentTarget.style.borderColor = '#10bb82')}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#3a3a3c' : '#2d3748'}
                    title="Count items on board"
                  >
                    <TbNumbers size={20} />
                    <span style={{fontSize: '12px', fontWeight: '600', textAlign: 'center'}}>
                      Count {mode === 'count' && `(${countTotal})`}
                    </span>
                  </button>
                  
                  <button
                    onClick={() => {
                      if (latestMeasurement) {
                        setShowUnitsModal(true);
                      } else {
                        alert('No measurements yet. Take a measurement first!');
                      }
                    }}
                    style={{
                      ...styles.toolCard,
                      padding: '12px 8px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      border: darkMode ? '2px solid #3a3a3c' : '2px solid #2d3748',
                      background: darkMode ? '#1c1c1e' : '#f8fafc',
                      color: darkMode ? '#ffffff' : '#2d3748'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#10bb82'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#3a3a3c' : '#2d3748'}
                    title="View all unit conversions"
                  >
                    <MdFormatListBulleted size={20} />
                    <span style={{fontSize: '12px', fontWeight: '600', textAlign: 'center'}}>Units</span>
                  </button>
                  
                  <button
                    onClick={() => measurements.length > 0 && exportMeasurementsToCSV()}
                    style={{
                      ...styles.toolCard,
                      padding: '12px 8px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: measurements.length > 0 ? 'pointer' : 'not-allowed',
                      border: darkMode ? '2px solid #3a3a3c' : '2px solid #2d3748',
                      background: darkMode ? '#1c1c1e' : '#f8fafc',
                      color: darkMode ? '#ffffff' : '#2d3748',
                      opacity: measurements.length > 0 ? 1 : 0.5
                    }}
                    onMouseEnter={(e) => measurements.length > 0 && (e.currentTarget.style.borderColor = '#10bb82')}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#3a3a3c' : '#2d3748'}
                    title="Export measurements to CSV"
                  >
                    <MdSave size={20} />
                    <span style={{fontSize: '12px', fontWeight: '600', textAlign: 'center'}}>
                      Export {measurements.length > 0 && `(${measurements.length})`}
                    </span>
                  </button>
                </div>
              )}
            </div>
            )}
          </div>

          {/* Area Measurement Mode Buttons */}
          {mode === 'area' && (
            <div style={{marginTop: '12px', textAlign: 'center'}}>
              <button
                onClick={promptForAreaPoint}
                style={{
                  ...styles.btnPrimary,
                  padding: '10px 16px',
                  fontSize: '13px',
                  marginBottom: '8px',
                  width: '100%'
                }}
              >
                + Add Point ({areaPoints.length} added)
              </button>
              <div style={{display: 'flex', gap: '8px'}}>
                <button
                  onClick={finishAreaMeasurement}
                  style={{
                    ...styles.btnPrimary,
                    padding: '10px 16px',
                    fontSize: '13px',
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <MdCheck size={16} /> Finish Area
                </button>
                <button
                  onClick={cancelAreaMeasurement}
                  style={{
                    ...styles.btnSecondary,
                    padding: '10px 16px',
                    fontSize: '13px',
                    flex: 1
                  }}
                >
                  Cancel
                </button>
              </div>
              <p style={{marginTop: '8px', color: '#718096', fontSize: '11px'}}>
                Click on the board to add points. Need at least 3 points.
              </p>
            </div>
          )}

          {/* Count Mode Buttons */}
          {mode === 'count' && (
            <div style={{marginTop: '12px', textAlign: 'center'}}>
              <div style={{display: 'flex', gap: '8px'}}>
                <button
                  onClick={addCountMarker}
                  style={{
                    ...styles.btnPrimary,
                    padding: '10px 16px',
                    fontSize: '13px',
                    flex: 1
                  }}
                >
                  ➕ Add Marker ({countTotal})
                </button>
                <button
                  onClick={resetCount}
                  style={{
                    ...styles.btnSecondary,
                    padding: '10px 16px',
                    fontSize: '13px',
                    flex: 1
                  }}
                >
                  Reset
                </button>
              </div>
              <p style={{marginTop: '8px', color: '#718096', fontSize: '11px'}}>
                Click "Add Marker" to place numbered markers on the board
              </p>
            </div>
          )}

          {/* Volume Measurement Mode Buttons */}
          {mode === 'volume' && !showVolumeModal && (
            <div style={{marginTop: '12px', textAlign: 'center'}}>
              <div style={{display: 'flex', gap: '8px'}}>
                <button
                  onClick={finishVolumeBase}
                  style={{
                    ...styles.btnPrimary,
                    padding: '10px 16px',
                    fontSize: '13px',
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <MdCheck size={16} /> Define Base ({areaPoints.length} points)
                </button>
                <button
                  onClick={cancelAreaMeasurement}
                  style={{
                    ...styles.btnSecondary,
                    padding: '10px 16px',
                    fontSize: '13px',
                    flex: 1
                  }}
                >
                  Cancel
                </button>
              </div>
              <p style={{marginTop: '8px', color: '#718096', fontSize: '11px'}}>
                Click points to define base area, then enter height
              </p>
            </div>
          )}

          {/* Cutout/Subtract Areas Mode Buttons */}
          {mode === 'cutout' && (
            <div style={{marginTop: '12px', textAlign: 'center'}}>
              {cutoutMode === 'main' ? (
                <>
                  <div style={{display: 'flex', gap: '8px'}}>
                    <button
                      onClick={finishMainArea}
                      style={{
                        ...styles.btnPrimary,
                        padding: '10px 16px',
                        fontSize: '13px',
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <MdCheck size={16} /> Complete Main ({cutoutMainPoints.length} pts)
                    </button>
                    <button
                      onClick={cancelCutoutMeasurement}
                      style={{
                        ...styles.btnSecondary,
                        padding: '10px 16px',
                        fontSize: '13px',
                        flex: 1
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                  <p style={{marginTop: '8px', color: '#718096', fontSize: '11px'}}>
                    Click points to define main area (need 3+ points)
                  </p>
                </>
              ) : (
                <>
                  <div style={{display: 'flex', gap: '8px', marginBottom: '8px'}}>
                    <button
                      onClick={finishCutout}
                      style={{
                        ...styles.btnPrimary,
                        padding: '10px 16px',
                        fontSize: '13px',
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <MdCheck size={16} /> Complete Cutout ({currentCutoutPoints.length} pts)
                    </button>
                    <button
                      onClick={finishCutoutMeasurement}
                      style={{
                        ...styles.btnSuccess,
                        padding: '10px 16px',
                        fontSize: '13px',
                        flex: 1,
                        background: '#10bb82',
                        color: 'white'
                      }}
                    >
                      Finish ({cutoutPolygons.length} cutouts)
                    </button>
                  </div>
                  <button
                    onClick={cancelCutoutMeasurement}
                    style={{
                      ...styles.btnSecondary,
                      padding: '10px 16px',
                      fontSize: '13px',
                      width: '100%'
                    }}
                  >
                    Cancel
                  </button>
                  <p style={{marginTop: '8px', color: '#718096', fontSize: '11px'}}>
                    Click points for cutout areas. Finish when done.
                  </p>
                </>
              )}
            </div>
          )}

          {/* Scale Region Definition Mode Buttons */}
          {mode === 'scaleRegion' && (
            <div style={{marginTop: '12px', textAlign: 'center'}}>
              <div style={{display: 'flex', gap: '8px'}}>
                <button
                  onClick={finishScaleRegion}
                  style={{
                    ...styles.btnPrimary,
                    padding: '10px 16px',
                    fontSize: '13px',
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <MdCheck size={16} /> Complete Region ({currentRegionPoints.length} pts)
                </button>
                <button
                  onClick={cancelScaleRegion}
                  style={{
                    ...styles.btnSecondary,
                    padding: '10px 16px',
                    fontSize: '13px',
                    flex: 1
                  }}
                >
                  Cancel
                </button>
              </div>
              <p style={{marginTop: '8px', color: '#718096', fontSize: '11px'}}>
                Click points to define the scale region boundary (need 3+ points)
              </p>
            </div>
          )}
        </main>

        {/* Latest Measurement Display */}
        <LatestMeasurementDisplay latestMeasurement={latestMeasurement} darkMode={darkMode} />

        {/* Measurement History */}
        <MeasurementHistory measurements={measurements} darkMode={darkMode} />
      </div>

      {/* Volume Height Modal */}
      {showVolumeModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Volume Calculation</h3>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Base Area: {formatNumber(volumeBaseArea?.area, 2)} {calibration.unit}²</label>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Enter Height ({calibration.unit}):</label>
              <input
                type="number"
                value={volumeHeight}
                onChange={(e) => setVolumeHeight(e.target.value)}
                placeholder="0.00"
                step="0.01"
                style={styles.input}
                autoFocus
              />
            </div>

            <div style={styles.modalButtons}>
              <button onClick={completeVolumeCalculation} style={styles.btnPrimary}>
                Calculate Volume
              </button>
              <button
                onClick={() => {
                  setShowVolumeModal(false);
                  setVolumeHeight('');
                  setVolumeBaseArea(null);
                  cancelAreaMeasurement();
                }}
                style={styles.btnSecondary}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Calibration Modal */}
      {showCalibrationModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Calibration Setup</h3>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>SELECT UNIT:</label>
              <div style={styles.unitGrid}>
                <button
                  onClick={() => setCalibrationUnit('ft')}
                  style={{
                    ...styles.unitGridBtn,
                    ...(calibrationUnit === 'ft' ? styles.unitGridBtnActive : {})
                  }}
                >
                  Feet
                </button>
                <button
                  onClick={() => setCalibrationUnit('in')}
                  style={{
                    ...styles.unitGridBtn,
                    ...(calibrationUnit === 'in' ? styles.unitGridBtnActive : {})
                  }}
                >
                  Inches
                </button>
                <button
                  onClick={() => setCalibrationUnit('yd')}
                  style={{
                    ...styles.unitGridBtn,
                    ...(calibrationUnit === 'yd' ? styles.unitGridBtnActive : {})
                  }}
                >
                  Yards
                </button>
                <button
                  onClick={() => setCalibrationUnit('mi')}
                  style={{
                    ...styles.unitGridBtn,
                    ...(calibrationUnit === 'mi' ? styles.unitGridBtnActive : {})
                  }}
                >
                  Miles
                </button>
                <button
                  onClick={() => setCalibrationUnit('m')}
                  style={{
                    ...styles.unitGridBtn,
                    ...(calibrationUnit === 'm' ? styles.unitGridBtnActive : {})
                  }}
                >
                  Meters
                </button>
                <button
                  onClick={() => setCalibrationUnit('cm')}
                  style={{
                    ...styles.unitGridBtn,
                    ...(calibrationUnit === 'cm' ? styles.unitGridBtnActive : {})
                  }}
                >
                  Centimeters
                </button>
                <button
                  onClick={() => setCalibrationUnit('mm')}
                  style={{
                    ...styles.unitGridBtn,
                    ...(calibrationUnit === 'mm' ? styles.unitGridBtnActive : {})
                  }}
                >
                  Millimeters
                </button>
                <button
                  onClick={() => setCalibrationUnit('km')}
                  style={{
                    ...styles.unitGridBtn,
                    ...(calibrationUnit === 'km' ? styles.unitGridBtnActive : {})
                  }}
                >
                  Kilometers
                </button>
              </div>
            </div>

            {/* Imperial units - separate inputs for feet and inches */}
            {(calibrationUnit === 'ft' || calibrationUnit === 'in') && (
              <div style={styles.formGroup}>
                <label style={styles.label}>ENTER DISTANCE (FT):</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <input
                      type="number"
                      value={calibrationFeet}
                      onChange={(e) => {
                        setCalibrationFeet(e.target.value);
                        // Calculate total and update calibrationValue
                        const feet = parseFloat(e.target.value) || 0;
                        const inches = parseFloat(calibrationInches) || 0;
                        const totalFeet = feet + (inches / 12);
                        if (calibrationUnit === 'ft') {
                          setCalibrationValue(totalFeet.toString());
                        }
                      }}
                      placeholder="Feet"
                      style={{...styles.input, textAlign: 'center'}}
                      autoFocus
                      step="any"
                      min="0"
                    />
                    <div style={{ 
                      textAlign: 'center', 
                      fontSize: '11px', 
                      color: darkMode ? '#8e8e93' : '#718096',
                      marginTop: '4px',
                      fontWeight: '600'
                    }}>
                      FEET
                    </div>
                  </div>
                  <div style={{ 
                    fontSize: '20px', 
                    fontWeight: '700',
                    color: darkMode ? '#aeaeb2' : '#4a5568',
                    padding: '0 4px'
                  }}>
                    +
                  </div>
                  <div style={{ flex: 1 }}>
                    <input
                      type="number"
                      value={calibrationInches}
                      onChange={(e) => {
                        setCalibrationInches(e.target.value);
                        // Calculate total and update calibrationValue
                        const feet = parseFloat(calibrationFeet) || 0;
                        const inches = parseFloat(e.target.value) || 0;
                        const totalFeet = feet + (inches / 12);
                        if (calibrationUnit === 'ft') {
                          setCalibrationValue(totalFeet.toString());
                        } else if (calibrationUnit === 'in') {
                          setCalibrationValue((feet * 12 + inches).toString());
                        }
                      }}
                      placeholder="Inches"
                      style={{...styles.input, textAlign: 'center'}}
                      step="any"
                      min="0"
                      max="11.99"
                    />
                    <div style={{ 
                      textAlign: 'center', 
                      fontSize: '11px', 
                      color: darkMode ? '#8e8e93' : '#718096',
                      marginTop: '4px',
                      fontWeight: '600'
                    }}>
                      INCHES
                    </div>
                  </div>
                </div>
                {(calibrationFeet || calibrationInches) && (
                  <div style={{
                    marginTop: '8px',
                    padding: '8px 12px',
                    background: darkMode ? '#1c1c1e' : '#f7fafc',
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: darkMode ? '#8e8e93' : '#718096',
                    textAlign: 'center'
                  }}>
                    Total: {formatFeetInches(parseFloat(calibrationValue) || 0)}
                  </div>
                )}
              </div>
            )}

            {/* Metric units - separate inputs for meters and centimeters */}
            {(calibrationUnit === 'm' || calibrationUnit === 'cm') && (
              <div style={styles.formGroup}>
                <label style={styles.label}>ENTER DISTANCE (METRIC):</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <input
                      type="number"
                      value={calibrationMeters}
                      onChange={(e) => {
                        setCalibrationMeters(e.target.value);
                        // Calculate total and update calibrationValue
                        const meters = parseFloat(e.target.value) || 0;
                        const cm = parseFloat(calibrationCentimeters) || 0;
                        const totalMeters = meters + (cm / 100);
                        if (calibrationUnit === 'm') {
                          setCalibrationValue(totalMeters.toString());
                        } else if (calibrationUnit === 'cm') {
                          setCalibrationValue((meters * 100 + cm).toString());
                        }
                      }}
                      placeholder="Meters"
                      style={{...styles.input, textAlign: 'center'}}
                      autoFocus
                      step="any"
                      min="0"
                    />
                    <div style={{ 
                      textAlign: 'center', 
                      fontSize: '11px', 
                      color: darkMode ? '#8e8e93' : '#718096',
                      marginTop: '4px',
                      fontWeight: '600'
                    }}>
                      METERS
                    </div>
                  </div>
                  <div style={{ 
                    fontSize: '20px', 
                    fontWeight: '700',
                    color: darkMode ? '#aeaeb2' : '#4a5568',
                    padding: '0 4px'
                  }}>
                    +
                  </div>
                  <div style={{ flex: 1 }}>
                    <input
                      type="number"
                      value={calibrationCentimeters}
                      onChange={(e) => {
                        setCalibrationCentimeters(e.target.value);
                        // Calculate total and update calibrationValue
                        const meters = parseFloat(calibrationMeters) || 0;
                        const cm = parseFloat(e.target.value) || 0;
                        const totalMeters = meters + (cm / 100);
                        if (calibrationUnit === 'm') {
                          setCalibrationValue(totalMeters.toString());
                        } else if (calibrationUnit === 'cm') {
                          setCalibrationValue((meters * 100 + cm).toString());
                        }
                      }}
                      placeholder="Centimeters"
                      style={{...styles.input, textAlign: 'center'}}
                      step="any"
                      min="0"
                      max="99.99"
                    />
                    <div style={{ 
                      textAlign: 'center', 
                      fontSize: '11px', 
                      color: darkMode ? '#8e8e93' : '#718096',
                      marginTop: '4px',
                      fontWeight: '600'
                    }}>
                      CENTIMETERS
                    </div>
                  </div>
                </div>
                {(calibrationMeters || calibrationCentimeters) && (
                  <div style={{
                    marginTop: '8px',
                    padding: '8px 12px',
                    background: darkMode ? '#1c1c1e' : '#f7fafc',
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: darkMode ? '#8e8e93' : '#718096',
                    textAlign: 'center'
                  }}>
                    Total: {formatNumber(parseFloat(calibrationValue) || 0, 2)} {calibrationUnit}
                  </div>
                )}
              </div>
            )}

            {/* Other units - single input */}
            {!['ft', 'in', 'm', 'cm'].includes(calibrationUnit) && (
              <div style={styles.formGroup}>
                <label style={styles.label}>ENTER DISTANCE ({calibrationUnit.toUpperCase()}):</label>
                <input
                  type="number"
                  value={calibrationValue}
                  onChange={(e) => setCalibrationValue(e.target.value)}
                  placeholder={`e.g., 12.5 ${calibrationUnit}`}
                  style={styles.input}
                  autoFocus
                  step="any"
                  min="0"
                />
              </div>
            )}

            <div style={styles.modalButtons}>
              <button onClick={handleCalibrationComplete} style={styles.btnPrimary}>
                Set Calibration
              </button>
              <button
                onClick={() => {
                  setShowCalibrationModal(false);
                  setCalibrationValue('');
                  setCalibrationFeet('');
                  setCalibrationInches('');
                  setCalibrationMeters('');
                  setCalibrationCentimeters('');
                  setMode('none');
                }}
                style={styles.btnSecondary}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Units Modal */}
      {/* Measurement Unit Selection Modal */}
      {showMeasurementUnitModal && (
        <div style={styles.modal} onClick={() => {
          setShowMeasurementUnitModal(false);
          setPendingMeasurementUpdate(null);
        }}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Select Unit for Measurement</h3>
            <UnitSelector
              selectedUnit={selectedMeasurementUnit}
              onUnitSelect={setSelectedMeasurementUnit}
              darkMode={darkMode}
              title="Choose Unit"
            />
            <div style={styles.modalButtons}>
              <button onClick={applyMeasurementUpdate} style={styles.btnPrimary}>
                Update Measurement
              </button>
              <button
                onClick={() => {
                  setShowMeasurementUnitModal(false);
                  setPendingMeasurementUpdate(null);
                }}
                style={styles.btnSecondary}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showUnitsModal && latestMeasurement && (
        <div style={styles.modal} onClick={() => setShowUnitsModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>All Unit Conversions</h3>
            <div style={styles.formGroup}>
              <label style={styles.label}>Imperial Units:</label>
              {CONVERSIONS.imperial.map((u) => (
                <div key={u.abbr} style={styles.historyItem}>
                  <span style={styles.historyLabel}>{u.name}</span>
                  <span style={styles.historyValue}>
                    {formatNumber(latestMeasurement.conversions[u.abbr])} {u.abbr}
                  </span>
                </div>
              ))}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Metric Units:</label>
              {CONVERSIONS.metric.map((u) => (
                <div key={u.abbr} style={styles.historyItem}>
                  <span style={styles.historyLabel}>{u.name}</span>
                  <span style={styles.historyValue}>
                    {formatNumber(latestMeasurement.conversions[u.abbr])} {u.abbr}
                  </span>
                </div>
              ))}
            </div>
            <button onClick={() => setShowUnitsModal(false)} style={styles.btnPrimary}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Scale Presets Modal */}
      {showScalePresetsModal && (
        <div style={styles.modal} onClick={() => setShowScalePresetsModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Scale Presets</h3>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Imperial Scales:</label>
              <div style={{maxHeight: '200px', overflowY: 'auto', marginBottom: '16px'}}>
                {ARCHITECTURAL_SCALES.imperial.map((scale, idx) => (
                  <div 
                    key={idx}
                    onClick={() => applyScalePreset(scale)}
                    style={{
                      padding: '12px',
                      margin: '4px 0',
                      background: '#f8fafc',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#10bb82'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                  >
                    <div style={{fontWeight: '600', color: '#1a202c', fontSize: '14px'}}>
                      {scale.name}
                    </div>
                    <div style={{fontSize: '11px', color: '#718096', marginTop: '4px'}}>
                      {scale.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Metric Scales:</label>
              <div style={{maxHeight: '200px', overflowY: 'auto'}}>
                {ARCHITECTURAL_SCALES.metric.map((scale, idx) => (
                  <div 
                    key={idx}
                    onClick={() => applyScalePreset(scale)}
                    style={{
                      padding: '12px',
                      margin: '4px 0',
                      background: '#f8fafc',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#10bb82'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                  >
                    <div style={{fontWeight: '600', color: '#1a202c', fontSize: '14px'}}>
                      {scale.name}
                    </div>
                    <div style={{fontSize: '11px', color: '#718096', marginTop: '4px'}}>
                      {scale.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setShowScalePresetsModal(false)} 
              style={{...styles.btnSecondary, width: '100%', marginTop: '12px'}}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Scale Regions Management Modal */}
      {showScaleRegionsModal && (
        <div style={styles.modal}>
          <div style={{...styles.modalContent, maxWidth: '600px', maxHeight: '80vh', overflow: 'auto'}}>
            <h3 style={styles.modalTitle}>Scale Regions Management</h3>
            
            <p style={{fontSize: '13px', color: '#718096', marginBottom: '16px'}}>
              Define different scales for different areas of your drawing. Useful for mixed-scale drawings with detail callouts.
            </p>

            {/* Active Region Indicator */}
            {activeScaleRegion && (
              <div style={{
                background: '#10bb82',
                color: 'white',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '13px'
              }}>
                <strong>Active Region:</strong> {activeScaleRegion.name}
                <div style={{fontSize: '11px', marginTop: '4px', opacity: 0.9}}>
                  Scale: 1:{activeScaleRegion.calibration.ratio || 'Custom'}
                </div>
              </div>
            )}

            {/* Existing Regions List */}
            {scaleRegions.length > 0 ? (
              <div style={{marginBottom: '20px'}}>
                <h4 style={{fontSize: '14px', color: '#1a202c', marginBottom: '12px', fontWeight: '600'}}>
                  Existing Regions ({scaleRegions.length})
                </h4>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  {scaleRegions.map((region) => (
                    <div
                      key={region.regionId}
                      style={{
                        padding: '12px',
                        border: `2px solid ${activeScaleRegion?.regionId === region.regionId ? '#10bb82' : (darkMode ? '#3a3a3c' : '#e2e8f0')}`,
                        borderRadius: '8px',
                        background: activeScaleRegion?.regionId === region.regionId ? (darkMode ? '#0d3d2d' : '#f0fdf4') : (darkMode ? '#1c1c1e' : 'white'),
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                        <div style={{flex: 1}} onClick={() => selectScaleRegion(region.regionId)}>
                          <div style={{fontWeight: '600', color: darkMode ? '#ffffff' : '#1a202c', fontSize: '14px'}}>
                            {region.name}
                          </div>
                          <div style={{fontSize: '12px', color: '#718096', marginTop: '4px'}}>
                            Scale: 1:{region.calibration.ratio || 'Custom'} • 
                            {region.calibration.actualDistance} {region.calibration.unit} calibration
                          </div>
                          <div style={{fontSize: '11px', color: '#a0aec0', marginTop: '2px'}}>
                            {region.points.length} boundary points
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Delete region "${region.name}"?`)) {
                              deleteScaleRegion(region.regionId);
                            }
                          }}
                          style={{
                            background: '#fee2e2',
                            color: '#dc2626',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            fontWeight: '500'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{
                padding: '20px',
                background: '#f7fafc',
                borderRadius: '8px',
                textAlign: 'center',
                color: '#718096',
                fontSize: '13px',
                marginBottom: '20px'
              }}>
                No scale regions defined yet. Create one to get started!
              </div>
            )}

            {/* Action Buttons */}
            <div style={{display: 'flex', gap: '8px'}}>
              <button 
                onClick={() => {
                  setShowScaleRegionsModal(false);
                  startScaleRegion();
                }} 
                style={{...styles.btnPrimary, flex: 1}}
              >
                ➕ Create New Region
              </button>
              {activeScaleRegion && (
                <button 
                  onClick={() => {
                    setActiveScaleRegion(null);
                    alert('Switched to global calibration mode');
                  }} 
                  style={{...styles.btnSecondary, flex: 1}}
                >
                  Use Global Scale
                </button>
              )}
              <button 
                onClick={() => setShowScaleRegionsModal(false)} 
                style={{...styles.btnSecondary, flex: activeScaleRegion ? 0 : 1, minWidth: '80px'}}
              >
                Close
              </button>
            </div>

            <div style={{
              marginTop: '16px',
              padding: '12px',
              background: '#eff6ff',
              borderRadius: '8px',
              fontSize: '11px',
              color: '#1e40af',
              borderLeft: '3px solid #3b82f6'
            }}>
              <strong>💡 How to use:</strong>
              <ol style={{margin: '8px 0 0 0', paddingLeft: '20px'}}>
                <li>Click "Create New Region" and draw the boundary</li>
                <li>Calibrate the scale for that specific region</li>
                <li>Select a region to make it active for measurements</li>
                <li>Measurements will automatically use the region's scale</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Custom Modal */}
      <CustomModal customModal={customModal} darkMode={darkMode} />
    </div>
  );
}

