# ai-tool-indicator Improvement Plan

**Component**: `ai-tool-indicator`
**Category**: AI-Native
**File**: `src/components/ai-tool-indicator/ai-tool-indicator.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Raw `rgba()` colors in spinner border and glass effects (lines 80, 54-55)
2. `_expandedIndex` is not a reactive property, causing stale renders without `requestUpdate()` workaround (line 141)
3. Magic number dimensions for icons, spinner, duration font-size (lines 69, 78-79, 85-86, 105)

---

## 1. Functional Issues

- **`_expandedIndex` is a plain class field, not `@state()`** (line 141): The component manually calls `this.requestUpdate()` in `_handleClick()` (line 165) to force re-render. This should be declared as `@state() private _expandedIndex = -1` so Lit automatically re-renders when it changes.
- **No transition/animation on expand/collapse**: When a tool result is expanded, it just appears. A slide-down animation would improve UX.
- **`slideIn` keyframe is locally defined** (lines 61-64): The component imports `spinKeyframes` from shared styles but defines its own `slideIn` animation inline. This should be extracted to the shared animation module for consistency.
- **No maximum tools limit**: If dozens of tools are passed, the UI could become very long with no scrolling or virtualization.

## 2. Interaction Issues

### 2.1 State Coverage

| State | Supported | Notes |
|-------|-----------|-------|
| Loading | Yes | Spinner icon per tool |
| Complete | Yes | Check icon, text color change |
| Error | Yes | X icon, red text |
| Expanded | Yes | Shows result panel |
| Compact | Yes | Horizontal layout, no results |
| Empty | Yes | Returns `nothing` when tools array is empty |
| Hover | Yes | Border color change (line 58) |
| Focus | Yes | Focus-visible ring (lines 129-131) |
| Keyboard | Yes | Enter/Space to toggle expansion (line 196) |
| Disabled | No | No disabled state |

- **Good state coverage overall**: Loading/complete/error per-tool is well handled.
- **Missing aria-expanded**: The tool rows act as disclosure buttons but don't announce their expanded/collapsed state.

### 2.2 ARIA & Accessibility

- **`role="status"` on container** (line 192): Appropriate for a live-updating tool status region.
- **`role="button"` on tool rows** (line 195): Correct since they are clickable.
- **Missing `aria-expanded`**: Tool rows that toggle expanded results should have `aria-expanded="${this._expandedIndex === i}"`.
- **Missing `aria-label` on individual tools**: Each tool row should have `aria-label="${this._humanize(t.name)} - ${t.status}"` for screen reader context.
- **Focus ring uses `:focus-visible` at root level** (line 129): The selector `:focus-visible` without a class prefix may not apply correctly inside Shadow DOM. Should be `.tool:focus-visible`.
- **Spinner has no accessible status**: The spinning animation is purely visual. The `role="status"` on the container covers this, but individual spinners could use `aria-label="Loading"`.

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Property | Value | Suggested Token |
|------|----------|-------|-----------------|
| 69 | .status-icon width/height | `16px` | `var(--cg-size-icon-sm, 16px)` |
| 78 | .spinner width/height | `12px` | `var(--cg-size-icon-xs, 12px)` |
| 80 | .spinner border-width | `1.5px` | `var(--cg-border-width-medium, 1.5px)` |
| 85 | .check font-size | `14px` | `var(--cg-font-size-sm, 14px)` |
| 86 | .error-icon font-size | `14px` | `var(--cg-font-size-sm, 14px)` |
| 93 | .tool-icon width/height | `14px` | `var(--cg-size-icon-xs, 14px)` |
| 105 | .duration font-size | `10px` | `var(--cg-font-size-2xs, 10px)` |
| 120 | .result max-height | `120px` | Component-specific token or `var(--cg-size-result-max-height)` |
| 126 | compact padding | `3px` | `var(--cg-spacing-4, 4px)` |

### 3.2 Raw Colors Found

| Line | Context | Value | Suggested Token |
|------|---------|-------|-----------------|
| 54 | .tool box-shadow | `rgba(255, 255, 255, 0.05)` | `var(--cg-color-surface-glass-highlight)` |
| 55 | .tool background-image | `rgba(255, 255, 255, 0.03)` | `var(--cg-color-surface-glass-gradient-start)` |
| 80 | .spinner border-color | `rgba(223, 255, 97, 0.2)` | `var(--cg-color-ai-accent-subtle, rgba(223, 255, 97, 0.2))` |

### 3.3 Modern Design Enhancements

- **Glass effect is applied** (lines 54-55): Good, but uses raw colors. Should use glass surface tokens.
- **Tool rows could have a subtle left-colored border**: Like a status bar on the left edge indicating loading (pulsing accent), complete (green), or error (red).
- **Result panel could have syntax highlighting**: If the result contains code, a monospace font is used but no highlighting.
- **Expand/collapse animation**: Add `max-height` transition or slide animation for the result panel.

## 4. Prioritized Fixes

### P0 - Critical
- (None)

### P1 - High
- **Convert `_expandedIndex` to `@state()`** (line 141): Replace `private _expandedIndex: number = -1` with `@state() private _expandedIndex = -1` and remove the manual `this.requestUpdate()` call on line 165.
- **Add `aria-expanded` to tool rows** (line 194): Add `aria-expanded="${this._expandedIndex === i}"` on each tool div.
- **Fix focus-visible selector** (line 129): Change `:focus-visible` to `.tool:focus-visible` for proper Shadow DOM scoping.

### P2 - Medium
- **Tokenize all icon dimensions** (lines 69, 78, 85-86, 93): Replace magic pixel values with icon size tokens.
- **Replace raw rgba in spinner** (line 80): Use an AI accent subtle token.
- **Replace glass effect raw colors** (lines 54-55): Use surface glass tokens.
- **Add `aria-label` to tool rows**: Include tool name and status.
- **Add expand/collapse transition**: Animate the `.result` panel appearance.

### P3 - Low
- **Extract `slideIn` keyframe** (lines 61-64) to shared styles module.
- **Tokenize `.duration` font-size** (line 105): `10px` -> `var(--cg-font-size-2xs)`.
- **Add status color bar on left edge** of tool rows for visual scanning.
- **Add max tools limit or scroll**: Prevent very long lists.
