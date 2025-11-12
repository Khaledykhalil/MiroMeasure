/**
 * TEST FILE: Live Measurements Implementation
 * 
 * This file tests if we can implement live/automatic measurements
 * that update as the user moves line endpoints.
 * 
 * Testing two approaches:
 * 1. Event listeners (if available in Miro SDK)
 * 2. Polling (fallback approach)
 */

import { useEffect, useRef } from 'react';

/**
 * Hook to test if Miro SDK supports event listeners for connector updates
 */
export function useMiroEventListeners(lineId, onUpdate) {
  useEffect(() => {
    if (!window.miro || !lineId) {
      return;
    }

    const handlers = [];
    const eventsToTest = [
      'selection:update',
      'items:update',
      'items:create',
      'connector:update',
      'connector:create',
      'item:update',
      'board:update',
    ];

    // Try to register event listeners
    eventsToTest.forEach(eventName => {
      try {
        // Try board.on
        if (window.miro.board && typeof window.miro.board.on === 'function') {
          const handler = (data) => {
            console.log(`[TEST] Event "${eventName}" fired:`, data);
            if (data && (data.items || data.item)) {
              const items = data.items || [data.item];
              const ourLine = items.find(item => item.id === lineId);
              if (ourLine) {
                onUpdate(ourLine);
              }
            }
          };
          window.miro.board.on(eventName, handler);
          handlers.push({ event: eventName, handler, source: 'board' });
          console.log(`[TEST] Registered board.on('${eventName}')`);
        }
        
        // Try board.ui.on
        if (window.miro.board?.ui && typeof window.miro.board.ui.on === 'function') {
          const handler = (data) => {
            console.log(`[TEST] UI Event "${eventName}" fired:`, data);
            if (data && (data.items || data.item)) {
              const items = data.items || [data.item];
              const ourLine = items.find(item => item.id === lineId);
              if (ourLine) {
                onUpdate(ourLine);
              }
            }
          };
          window.miro.board.ui.on(eventName, handler);
          handlers.push({ event: eventName, handler, source: 'board.ui' });
          console.log(`[TEST] Registered board.ui.on('${eventName}')`);
        }
      } catch (error) {
        console.log(`[TEST] Could not register ${eventName}:`, error.message);
      }
    });

    // Cleanup
    return () => {
      handlers.forEach(({ event, handler, source }) => {
        try {
          if (source === 'board' && window.miro.board?.off) {
            window.miro.board.off(event, handler);
          } else if (source === 'board.ui' && window.miro.board?.ui?.off) {
            window.miro.board.ui.off(event, handler);
          }
        } catch (error) {
          console.error(`[TEST] Error removing listener for ${event}:`, error);
        }
      });
    };
  }, [lineId, onUpdate]);
}

/**
 * Hook to poll for line position changes (fallback approach)
 */
export function useMiroPolling(lineId, onUpdate, interval = 150) {
  const intervalRef = useRef(null);
  const lastPositionRef = useRef(null);

  useEffect(() => {
    if (!window.miro || !lineId) {
      return;
    }

    console.log(`[TEST] Starting polling for line ${lineId} every ${interval}ms`);

    intervalRef.current = setInterval(async () => {
      try {
        const items = await window.miro.board.get({ id: [lineId] });
        if (items.length === 0) {
          console.log(`[TEST] Line ${lineId} not found, stopping polling`);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return;
        }

        const line = items[0];
        const currentStart = line.start?.position;
        const currentEnd = line.end?.position;

        if (!currentStart || !currentEnd) {
          return;
        }

        // Check if position changed
        const lastPos = lastPositionRef.current;
        const positionChanged = !lastPos ||
          currentStart.x !== lastPos.start.x ||
          currentStart.y !== lastPos.start.y ||
          currentEnd.x !== lastPos.end.x ||
          currentEnd.y !== lastPos.end.y;

        if (positionChanged) {
          console.log(`[TEST] Line position changed via polling:`, {
            start: currentStart,
            end: currentEnd
          });
          
          lastPositionRef.current = {
            start: { ...currentStart },
            end: { ...currentEnd }
          };
          
          onUpdate(line);
        }
      } catch (error) {
        console.error('[TEST] Error polling line:', error);
      }
    }, interval);

    // Initialize last position
    window.miro.board.get({ id: [lineId] }).then(items => {
      if (items.length > 0) {
        const line = items[0];
        if (line.start?.position && line.end?.position) {
          lastPositionRef.current = {
            start: { ...line.start.position },
            end: { ...line.end.position }
          };
        }
      }
    });

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [lineId, onUpdate, interval]);
}

/**
 * Combined hook that tries events first, falls back to polling
 */
export function useLiveMeasurementUpdates(lineId, onUpdate, options = {}) {
  const { 
    useEvents = true, 
    usePolling = true, 
    pollingInterval = 150 
  } = options;

  // Always call hooks (React rules) but pass null lineId to disable if needed
  useMiroEventListeners(useEvents ? lineId : null, onUpdate);
  useMiroPolling(usePolling ? lineId : null, onUpdate, pollingInterval);
}

