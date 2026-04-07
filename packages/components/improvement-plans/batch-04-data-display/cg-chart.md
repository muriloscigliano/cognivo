# cg-chart Improvement Plan

**Component**: `cg-chart`
**Category**: Foundation
**File**: `src/components/cg-chart/cg-chart.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Extensive magic numbers throughout SVG rendering (padding, font sizes, dimensions all hardcoded)
2. No keyboard accessibility -- SVG elements have no tabindex, no keydown handlers, no ARIA roles
3. Raw colors and hardcoded values scattered across CSS (lines 45, 93, 97, 112-113, 120, etc.)

---

## 1. Functional Issues

- **Line 45**: `.subtitle` uses `margin-top: -8px` -- magic number, should use negative token.
- **Line 72**: `.pie-slice:hover` has unclosed parenthesis in `drop-shadow(0 2px 4px var(--cg-overlay-dark-medium, rgba(0, 0, 0, 0.3))` -- **syntax error**, missing closing `)`.
- **Line 77-78**: `.line-dot` transition uses `r 0.12s ease` -- `r` is an SVG attribute, not animatable via CSS transitions in all browsers. Should use `transform: scale()` instead.
- **Line 93**: `.axis-label` uses `font-size: 10px` -- magic number, should use `var(--cg-font-size-2xs, 10px)`.
- **Line 97-98**: `.axis-value` uses `font-size: 9px` -- magic number.
- **Line 103**: `.bar-value` uses `font-size: 9px; font-weight: 600` -- magic numbers, should use tokens.
- **Line 112**: `.tooltip` padding `6px 10px` -- magic numbers.
- **Line 120**: `.tooltip` `margin-top: -8px` -- magic number.
- **Line 128-130**: Tooltip arrow uses `bottom: -4px`, `border: 4px solid` -- magic numbers.
- **Line 149**: `.legend-item` gap `6px` -- magic number.
- **Line 153-154**: `.legend-dot` uses `width: 10px; height: 10px; border-radius: 3px` -- magic numbers.
- **Line 172**: `.empty` `min-height: 120px` -- magic number.
- **Lines 263-265**: Bar chart padding object `{ top: 8, right: 8, bottom: 28, left: 40 }` -- all magic numbers.
- **Line 265-266**: `w = 300` viewBox width hardcoded.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Partial | Many magic numbers |
| Hover (bar) | Yes | Yes | Line 57-59 |
| Hover (pie) | Yes | Partial | CSS syntax error on line 72 |
| Hover (line dot) | Yes | No | Uses raw `r: 5` (line 81) |
| Active | No | N/A | No pressed/active state |
| Focus | No | N/A | No focus state on any chart element |
| Disabled | No | N/A | No disabled state |
| Loading | No | N/A | No loading/skeleton state |
| Error | No | N/A | No error state |
| Empty | Yes | Partial | Line 164-172 |
| Tooltip | Yes | Partial | Magic numbers in positioning |

### 2.2 Keyboard Navigation
- **Critical**: No `tabindex` on any SVG bar, slice, or dot element.
- **Critical**: No `@keydown` handlers anywhere.
- No arrow-key navigation between data points.
- No Escape key to dismiss tooltip.
- SVG is not marked with `role="img"` or `role="graphics-document"`.

### 2.3 ARIA & Accessibility
- No `role="img"` or `aria-label` on `<svg>` elements.
- No `role="button"` or `aria-label` on interactive bars/slices/dots.
- Tooltip is visual-only -- not accessible to screen readers (no `aria-live` region).
- Color-only differentiation for data series (no pattern fills or labels for colorblind users).
- No `alt` text or descriptive summary of chart data.

### 2.4 Touch & Mobile
- Tooltip positioning based on `MouseEvent` -- will not work on touch devices.
- No touch event handlers (`@touchstart`, `@touchend`).
- SVG viewBox is fixed at 300px width -- may cause issues on very small screens.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 45 | `margin-top: -8px` | `calc(-1 * var(--cg-spacing-8))` |
| 93 | `font-size: 10px` | `var(--cg-font-size-2xs, 10px)` |
| 97 | `font-size: 9px` | Token for 9px or use 10px |
| 103 | `font-size: 9px` | Same |
| 112 | `padding: 6px 10px` | `var(--cg-spacing-6) var(--cg-spacing-10)` |
| 120 | `margin-top: -8px` | `calc(-1 * var(--cg-spacing-8))` |
| 128 | `bottom: -4px; border: 4px solid` | `var(--cg-spacing-4)` |
| 149 | `gap: 6px` | `var(--cg-spacing-6, 6px)` |
| 153-154 | `width: 10px; height: 10px; border-radius: 3px` | Use tokens |
| 172 | `min-height: 120px` | Token |
| 263 | `{ top: 8, right: 8, bottom: 28, left: 40 }` | Config constants with token references |

### 3.2 Raw Colors Found
| Line | Color | Suggested Token |
|------|-------|-----------------|
| 72 | `rgba(0, 0, 0, 0.3)` in drop-shadow | Already wrapped in token fallback, but syntax error |
| All chart colors | Resolved via `_color()` method | Good -- uses PALETTE_TOKENS |

### 3.3 Typography Issues
- Multiple hardcoded font sizes in SVG text (9px, 10px, 11px, 18px) -- should map to token scale.

### 3.4 Spacing Issues
- All SVG padding/margin values are hardcoded JS numbers, not tokens.

### 3.5 Modern Design Enhancements
- Add animated entrance for line/area charts (currently only bar has grow animation).
- Add responsive viewBox that adapts to container width.
- Consider adding data point annotations.
- Add crosshair/guideline on hover for line charts.

---

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix CSS syntax error** on line 72: missing closing `)` in `drop-shadow()`.
2. Add `role="img"` and `aria-label` to all `<svg>` elements.
3. Add `tabindex="0"` and `role="button"` with `aria-label` to interactive bar/slice/dot elements.

### P1 - High
4. Add `@keydown` handler (Enter/Space) to interactive SVG elements.
5. Replace all `font-size: 9px/10px/11px` in CSS with token references.
6. Replace `padding: 6px 10px`, `margin-top: -8px`, and tooltip arrow magic numbers with tokens.
7. Add loading/skeleton state.
8. Add touch event support for tooltips on mobile.

### P2 - Medium
9. Replace `.legend-item` gap `6px` and `.legend-dot` dimensions with tokens.
10. Add `aria-live="polite"` region for tooltip content.
11. Add responsive viewBox (use ResizeObserver like ai-analytics-chart does).
12. Add active/pressed visual state on interactive elements.

### P3 - Low
13. Add arrow-key navigation between data points.
14. Add pattern fills for colorblind accessibility.
15. Add chart summary text for screen readers.
16. Add crosshair/guideline on hover for line/area charts.
