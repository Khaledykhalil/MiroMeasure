# Live Measurements Test - Findings

## Objective
Determine if it's possible to get automatic/live measurements as the user moves the endpoints of a measurement line, eliminating the need for "Calculate Measurement" and "Update Measurement" buttons.

## Research Findings

### 1. Miro SDK Event Listeners
Based on the codebase analysis:
- The codebase comment on line 124 of `page.jsx` states: "Miro SDK v2 doesn't support board.ui.on('click')"
- However, `SDKInit.jsx` shows that `miro.board.ui.on('icon:click', ...)` does work for icon clicks
- No evidence of event listeners for connector/item updates in the current codebase

### 2. Available Miro SDK Methods
From the codebase, the following methods are used:
- `window.miro.board.createConnector()` - Creates connectors/lines
- `window.miro.board.get({ id: [...] })` - Gets items by ID
- `window.miro.board.getSelection()` - Gets selected items
- `window.miro.board.remove()` - Removes items
- `window.miro.board.viewport.get()` - Gets viewport info

### 3. Potential Approaches

#### Approach A: Event Listeners (Ideal)
If Miro SDK supports event listeners for connector updates:
- Listen to `connector:update` or `items:update` events
- Automatically recalculate and update caption when line endpoints change
- **Status**: Need to test if these events exist

#### Approach B: Polling (Fallback)
If event listeners don't exist:
- Poll the line position every 100-200ms using `board.get({ id: [lineId] })`
- Compare current position with last known position
- Update caption if position changed
- **Status**: Technically possible but has performance implications

#### Approach C: Selection-based Updates
- Listen to `selection:update` events
- When a measurement line is selected, start polling
- Update when selection changes
- **Status**: Partial solution - only updates when line is selected

## Test Implementation Plan

1. Test if `board.on()` or `board.ui.on()` supports connector/item update events
2. If events don't exist, implement polling approach
3. Measure performance impact of polling
4. Test if frequent caption updates cause flickering or performance issues

## Known Limitations

1. **Miro SDK v2 Limitations**: The SDK may not support real-time event listeners for item updates
2. **Performance**: Polling every 100ms could impact performance, especially with multiple measurement lines
3. **API Rate Limits**: Frequent polling might hit Miro API rate limits
4. **User Experience**: Frequent updates might cause visual flickering

## Conclusion

**Status**: Testing required to determine feasibility

The approach is likely possible using polling, but:
- May have performance implications
- May not be as smooth as true event-driven updates
- Requires careful implementation to avoid API rate limits

Next steps: Implement test version to verify feasibility.

