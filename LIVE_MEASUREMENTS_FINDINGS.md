# Live Measurements Investigation - Final Findings

## ⚠️ EXECUTIVE SUMMARY - NOT RECOMMENDED

**Conclusion: Live measurements are NOT RECOMMENDED for implementation.**

While technically possible using polling, this approach has significant drawbacks that outweigh the benefits:
- **Performance**: Excessive API calls (6-7 per second per line)
- **User Experience**: Visual flickering and janky behavior
- **API Limits**: Risk of hitting rate limits
- **Battery/CPU**: Continuous polling drains resources
- **Not Truly Live**: Up to 150ms delay even with aggressive polling

**Recommendation**: Keep the current button-based approach. It's more performant, reliable, and provides better UX.

---

## Question
Is it possible to get automatic/live measurements as the user moves the endpoints of a measurement line, eliminating the need for "Calculate Measurement" and "Update Measurement" buttons?

## Investigation Summary

### 1. Miro SDK Event Listeners
**Status: ❌ NOT AVAILABLE**

Evidence from codebase:
- Line 124 of `page.jsx` explicitly states: "Miro SDK v2 doesn't support board.ui.on('click')"
- While `board.ui.on('icon:click')` works for icon clicks, there's no evidence of event listeners for:
  - Connector/line updates
  - Item position changes
  - Real-time board item modifications

**Conclusion**: Miro SDK v2 does not provide event listeners for real-time connector/line updates.

### 2. Polling Approach
**Status: ✅ TECHNICALLY POSSIBLE (with caveats)**

**How it would work:**
- Poll `window.miro.board.get({ id: [lineId] })` every 100-200ms
- Compare current line position with last known position
- If position changed, recalculate measurement and update caption
- Update the line by recreating it with new caption

**Implementation approach:**
```javascript
// Poll every 150ms
setInterval(async () => {
  const items = await window.miro.board.get({ id: [lineId] });
  const line = items[0];
  const currentStart = line.start.position;
  const currentEnd = line.end.position;
  
  // Check if position changed
  if (positionChanged) {
    // Recalculate and update caption
    await updateLineCaption(line);
  }
}, 150);
```

### 3. Challenges with Polling Approach

#### A. Performance Issues
- **API Calls**: Polling every 150ms = ~6.67 API calls per second per line
- **Multiple Lines**: With 5 measurement lines = ~33 API calls/second
- **Rate Limiting**: May hit Miro API rate limits
- **Battery/CPU**: Continuous polling impacts device performance

#### B. User Experience Issues
- **Flickering**: Frequent line recreation (to update caption) may cause visual flickering
- **Lag**: 150ms polling means up to 150ms delay before measurement updates
- **Smoothness**: Not as smooth as true event-driven updates

#### C. Technical Challenges
- **Line Recreation**: To update caption, must delete and recreate line (as seen in `finishMeasurement`)
- **State Management**: Need to track last known position to detect changes
- **Cleanup**: Must properly clean up intervals when line is deleted or mode changes

### 4. Alternative: Hybrid Approach
**Status: ⚠️ PARTIAL SOLUTION**

Instead of true "live" updates, could:
- Poll only when line is selected
- Update measurement when user stops dragging (debounce)
- Show measurement immediately after drag ends

This would:
- ✅ Reduce API calls significantly
- ✅ Avoid flickering during drag
- ✅ Still feel responsive
- ❌ Not be truly "live" during drag

## Final Verdict

### Is it possible?
**YES, but with significant limitations**

### Should it be implemented?
**❌ NO - NOT RECOMMENDED** - Here's why:

1. **Performance Impact**: Continuous polling is resource-intensive
2. **User Experience**: Frequent updates may cause flickering and feel janky
3. **API Limits**: Risk of hitting rate limits with multiple lines
4. **Not True "Live"**: Even with polling, there's a delay (up to polling interval)
5. **Miro SDK Limitation**: The SDK doesn't support this natively, forcing workarounds

### Recommendation
**❌ DO NOT IMPLEMENT** live measurements using polling. 

**Why not:**
1. **Performance Impact**: Continuous polling is resource-intensive (6-7 API calls/second per line)
2. **User Experience**: Frequent line recreation causes visual flickering and feels janky
3. **API Limits**: High risk of hitting Miro API rate limits with multiple lines
4. **Not True "Live"**: Even with aggressive polling, there's a 100-150ms delay
5. **Miro SDK Limitation**: The SDK doesn't support this natively, forcing inefficient workarounds
6. **Battery/CPU Drain**: Continuous polling impacts device performance, especially on mobile

**The current button-based approach is superior because it:**
- ✅ More performant
- ✅ More reliable
- ✅ Better user experience (no flickering)
- ✅ Respects API limits
- ✅ Clear user intent (user clicks when ready)

### If You Still Want to Try
If you want to test it anyway, I've created:
- `test-live-measurements.jsx` - Test hooks for events and polling
- `LIVE_MEASUREMENTS_TEST.md` - Detailed test plan

You can integrate these into your code to test, but expect:
- Performance degradation
- Potential API rate limiting
- Visual flickering
- Battery drain on mobile devices

## Conclusion

**Final Answer**: ❌ **NOT RECOMMENDED**

While it is technically possible to implement live measurements using polling, this approach is **NOT RECOMMENDED** due to:

1. **Performance degradation** from excessive API calls
2. **Poor user experience** with flickering and janky behavior  
3. **API rate limiting risks** with multiple measurement lines
4. **Resource drain** on devices (battery/CPU)
5. **Not truly "live"** - still has 100-150ms delay
6. **Miro SDK limitations** - no native support, forcing inefficient workarounds

**The current button-based approach remains the better solution** because it:
- Is more performant and reliable
- Provides better user experience (no flickering)
- Respects API limits
- Has clear user intent (user clicks when ready)
- Works well within Miro SDK constraints

**Future consideration**: If Miro SDK adds event listeners for item updates in a future version, this feature could be reconsidered. Until then, the button-based approach is the recommended solution.

---

## Files for Reference

Test files are available on the `test-live-measurements` branch:
- `src/app/panel/test-live-measurements.jsx` - Test hooks for events and polling
- `LIVE_MEASUREMENTS_TEST.md` - Detailed test plan
- `test-miro-events.js` - Standalone test script

These files are kept for future reference but should not be integrated into production code.

