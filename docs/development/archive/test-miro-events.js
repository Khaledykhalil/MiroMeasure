/**
 * Test file to check Miro SDK event listeners for real-time updates
 * This will help determine if live measurements are possible
 */

// Test what events are available in Miro SDK v2
async function testMiroEvents() {
  if (!window.miro) {
    console.error('Miro SDK not available');
    return;
  }

  console.log('Testing Miro SDK events...');
  console.log('Available board methods:', Object.keys(window.miro.board));
  console.log('Available board.ui methods:', Object.keys(window.miro.board.ui || {}));

  // Test various event listeners that might work
  const eventsToTest = [
    'selection:update',
    'items:update',
    'items:create',
    'items:delete',
    'connector:update',
    'connector:create',
    'board:update',
    'item:update',
    'item:create',
    'item:delete',
  ];

  const eventHandlers = {};

  eventsToTest.forEach(eventName => {
    try {
      const handler = (data) => {
        console.log(`✅ Event "${eventName}" fired:`, data);
      };
      
      // Try to register the event
      if (window.miro.board.on) {
        window.miro.board.on(eventName, handler);
        eventHandlers[eventName] = handler;
        console.log(`✓ Registered listener for: ${eventName}`);
      } else if (window.miro.board.ui && window.miro.board.ui.on) {
        window.miro.board.ui.on(eventName, handler);
        eventHandlers[eventName] = handler;
        console.log(`✓ Registered listener for: ${eventName}`);
      } else {
        console.log(`✗ Could not register listener for: ${eventName} (no .on method found)`);
      }
    } catch (error) {
      console.log(`✗ Error registering listener for ${eventName}:`, error.message);
    }
  });

  // Also check if we can poll for changes
  console.log('\n--- Testing polling approach ---');
  let lastLineId = null;
  let lastStartPos = null;
  let lastEndPos = null;

  const pollForChanges = setInterval(async () => {
    if (!lastLineId) return;
    
    try {
      const items = await window.miro.board.get({ id: [lastLineId] });
      if (items.length > 0) {
        const line = items[0];
        const currentStart = line.start?.position;
        const currentEnd = line.end?.position;
        
        if (currentStart && currentEnd) {
          const startChanged = !lastStartPos || 
            currentStart.x !== lastStartPos.x || 
            currentStart.y !== lastStartPos.y;
          const endChanged = !lastEndPos || 
            currentEnd.x !== lastEndPos.x || 
            currentEnd.y !== lastEndPos.y;
          
          if (startChanged || endChanged) {
            console.log('🔄 Line position changed via polling:', {
              start: currentStart,
              end: currentEnd,
              startChanged,
              endChanged
            });
            lastStartPos = { ...currentStart };
            lastEndPos = { ...currentEnd };
          }
        }
      }
    } catch (error) {
      console.error('Error polling:', error);
    }
  }, 100); // Poll every 100ms

  // Cleanup function
  window.testMiroEventsCleanup = () => {
    clearInterval(pollForChanges);
    Object.entries(eventHandlers).forEach(([eventName, handler]) => {
      try {
        if (window.miro.board.off) {
          window.miro.board.off(eventName, handler);
        } else if (window.miro.board.ui && window.miro.board.ui.off) {
          window.miro.board.ui.off(eventName, handler);
        }
      } catch (error) {
        console.error(`Error removing listener for ${eventName}:`, error);
      }
    });
  };

  return {
    pollForChanges,
    setLineToWatch: (lineId) => {
      lastLineId = lineId;
      window.miro.board.get({ id: [lineId] }).then(items => {
        if (items.length > 0) {
          const line = items[0];
          lastStartPos = line.start?.position ? { ...line.start.position } : null;
          lastEndPos = line.end?.position ? { ...line.end.position } : null;
          console.log('Watching line:', lineId, { lastStartPos, lastEndPos });
        }
      });
    },
    cleanup: window.testMiroEventsCleanup
  };
}

// Export for use in React component
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testMiroEvents };
}

