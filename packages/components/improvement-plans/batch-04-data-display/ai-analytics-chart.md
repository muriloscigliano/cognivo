# ai-analytics-chart Improvement Plan

**Component**: `ai-analytics-chart`
**Category**: AI-Native
**File**: `src/components/ai-analytics-chart/ai-analytics-chart.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Non-standard token names used (`--cg-radius-lg`, `--cg-radius-md` instead of `--cg-border-radius-*` pattern)
2. CSS syntax error -- extra closing brace on line 152 before style close
3. Magic numbers in SVG rendering (margin object, font sizes) and raw rgba values

---

## 1. Functional Issues

- **Line 46**: `border-radius: var(--cg-radius-lg, 12px)` -- non-standard token name, should be `var(--cg-border-radius-150, 12px)`.
- **Line 48**: `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` -- raw rgba.
- **Line 43**: `background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent)` -- raw rgba.
- **Line 102**: `font-size: 10px` -- magic number in `.axis-label`.
- **Line 129**: `border-radius: var(--cg-radius-md, 8px)` -- non-standard token.
- **Line 137**: `margin-top: -8px` -- magic number.
- **Line 141**: `margin-bottom: 2px` -- magic number.
- **Line 149-150**: `.y-label` uses `font-size: 10px` -- magic number.
- **Line 152**: Extra closing brace `}` -- **CSS syntax error**.
- **Line 186-187**: Margin object `{ top: 10, right: 16, bottom: 28, left: 48/40 }` -- all magic numbers.
- **Line 333**: `stroke-width="2.5"` in line path -- magic number.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Mostly | Some non-standard tokens |
| Hover (point) | Yes | Yes | Circle opacity changes on hover |
| Active | No | N/A | No active state |
| Focus | Yes | Yes | Lines 155-158 on host |
| Disabled | No | N/A | No disabled state |
| Loading | No | N/A | No loading/skeleton state |
| Error | No | N/A | No error state |
| Empty | No | N/A | No empty state when series is empty |
| Tooltip | Yes | Partial | Some magic numbers |

### 2.2 Keyboard Navigation
- SVG has `tabindex="0"` and `role="img"` -- can be focused but no internal navigation.
- Individual data points have no keyboard accessibility.
- No arrow-key navigation between points or series.
- No Escape to dismiss tooltip.

### 2.3 ARIA & Accessibility
- SVG has `role="img"` and `aria-label` -- good (line 271).
- Legend has `role="list"` with `role="listitem"` items -- good.
- **Missing**: No accessible announcement for tooltip content.
- **Missing**: No summary/description of chart data for screen readers.
- **Missing**: Data points have no `role` or `aria-label` -- hover circles are interactive but not labeled.

### 2.4 Touch & Mobile
- Uses ResizeObserver for responsive width -- good.
- Tooltip uses mouse positioning -- not touch-friendly.
- Hit areas (invisible wider stroke paths) improve touch targeting -- good.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 48 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-light-subtle)` |
| 43 | `rgba(255, 255, 255, 0.03)` | `var(--cg-overlay-light-minimal)` |
| 102 | `font-size: 10px` | `var(--cg-font-size-2xs, 10px)` |
| 137 | `margin-top: -8px` | `calc(-1 * var(--cg-spacing-8))` |
| 141 | `margin-bottom: 2px` | `var(--cg-spacing-2, 2px)` |
| 149 | `font-size: 10px` | `var(--cg-font-size-2xs, 10px)` |
| 186-187 | Margin object values | Constants or config tokens |

### 3.2 Raw Colors Found
| Line | Color | Suggested Token |
|------|-------|-----------------|
| 48 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-light-subtle)` |
| 43 | `rgba(255, 255, 255, 0.03)` | `var(--cg-overlay-light-minimal)` |

All other colors properly use semantic tokens.

### 3.3 Typography Issues
- Multiple `font-size: 10px` instances should use token.
- SVG text elements use inline font-size attributes that bypass CSS tokens.

### 3.4 Spacing Issues
- Tooltip `margin-top: -8px` and `margin-bottom: 2px` -- should use tokens.

### 3.5 Modern Design Enhancements
- Add loading skeleton with chart placeholder.
- Add empty state when no series data provided.
- Add zoom/pan capability for dense data sets.
- Add annotation support (vertical lines for events).
- Add crosshair on hover.

---

## 4. Prioritized Fixes

### P0 - Critical
1. Fix CSS syntax error: remove extra `}` on line 152.
2. Fix non-standard token names: `--cg-radius-lg` -> `--cg-border-radius-150`, `--cg-radius-md` -> `--cg-border-radius-100`.

### P1 - High
3. Add empty state when `series` array is empty.
4. Add loading/skeleton state.
5. Replace raw rgba overlay values with tokens.
6. Add `aria-label` to data point circles.
7. Add touch event support for tooltips.

### P2 - Medium
8. Replace `font-size: 10px` instances with tokens.
9. Replace `margin-top: -8px` and `margin-bottom: 2px` with tokens.
10. Add `aria-live` region for tooltip announcements.
11. Add keyboard navigation for data points.

### P3 - Low
12. Add crosshair/guideline on hover.
13. Add zoom/pan for dense datasets.
14. Add annotation support.
15. Add active/pressed state on interactive elements.
