# AI Cost Dashboard Improvement Plan

**Component**: `ai-cost-dashboard`
**Category**: AI-Native
**File**: `src/components/ai-cost-dashboard/ai-cost-dashboard.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Raw hex `#eab308` used for warning color on lines 90 and 119 without any token fallback
2. Multiple magic numbers throughout CSS (hard-coded widths, heights, pixel values)
3. Trend chart bars lack keyboard accessibility and ARIA descriptions

---

## 1. Functional Issues
- **Line 215**: Extra closing brace `}` at the end of the CSS block creates a malformed stylesheet. The `.empty-state` rule on line 209 has a stray `}` after its own closing brace.
- **Line 269**: `Math.max(...this._modelBreakdown.map(m => m.cost), 0.01)` will throw a RangeError if `_modelBreakdown` is extremely large (stack overflow with spread on large arrays). Use `reduce` instead.
- **Line 254**: `_handleEntryClick` accepts `Record<string, unknown>` but the event detail type in the JSDoc says `{model: string, cost: number}`. Type mismatch.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | |
| Hover | Partial | Only `.model-row:hover` (opacity 0.85) and `.trend-bar:hover` |
| Active/Pressed | No | No `:active` state on model rows |
| Focus | Yes | `.model-row:focus-visible` present |
| Disabled | No | No disabled state at all |
| Loading | No | No loading/skeleton state |
| Error | No | Only empty state, no error state |
| Empty | Yes | Line 263 |

**Missing**: active, disabled, loading, error states (4 of 8 missing).

### 2.2 Keyboard Navigation
- **Model rows** (line 315): Keyboard support via `@keydown` for Enter/Space -- good.
- **Trend bars** (line 329-335): Not keyboard accessible. No `tabindex`, no `role="button"`, no keyboard handler. Users cannot navigate daily trend data with keyboard.

### 2.3 ARIA & Accessibility
- **Line 274**: `role="region"` with `aria-label` -- good.
- **Line 301**: Budget bar has `role="progressbar"` with proper aria attributes -- good.
- **Line 328**: Trend chart has `role="img"` but individual bars have no accessible values. Screen readers cannot access per-day cost data.
- **Stat cards** (lines 281-293): No ARIA landmarks or roles for the summary cards. Consider `role="group"`.
- **Color-only status indication**: Budget status communicated only through color (green/yellow/red). Needs text alternative for color-blind users.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggestion |
|------|-------|------------|
| 90 | `color: #eab308` | Use `var(--cg-color-status-warning-text-default, #eab308)` |
| 107 | `height: 8px` | Use `var(--cg-size-100, 8px)` |
| 119 | `background: #eab308` | Use `var(--cg-color-status-warning-text-default, #eab308)` |
| 148 | `width: 100px` | Use `var(--cg-size-1200, 100px)` or a token-based width |
| 157 | `height: 6px` | Use `var(--cg-size-75, 6px)` |
| 159 | `border-radius: 3px` | Use `var(--cg-border-radius-50, 4px)` |
| 165 | `border-radius: 3px` | Same as above |
| 172 | `width: 60px` | Use a token-based width |
| 194 | `gap: 3px` | Use `var(--cg-spacing-2, 2px)` or `var(--cg-spacing-4, 4px)` |
| 195 | `height: 48px` | Use `var(--cg-size-600, 48px)` |
| 200 | `border-radius: 2px 2px 0 0` | Use `var(--cg-border-radius-25, 2px)` |
| 202 | `min-height: 2px` | Use token or CSS custom property |

### 3.2 Raw Colors Found
| Line | Color | Replacement |
|------|-------|------------|
| 90 | `#eab308` | `var(--cg-color-status-warning-text-default)` |
| 119 | `#eab308` | `var(--cg-color-status-warning-background-default)` |

### 3.3 Spacing Issues
- Line 136: `padding: var(--cg-spacing-4, 4px) 0` -- mixed token and literal `0`. Consider using `var(--cg-spacing-0, 0)` for consistency.
- Transition durations on lines 117, 138, 167, 203 use raw `300ms`, `120ms`, `200ms` values instead of `var(--cg-motion-duration-*)` tokens.

### 3.4 Modern Design Enhancements
- Add subtle `backdrop-filter: blur()` to the container for glassmorphism depth.
- Trend bars could use gradient fills for a more modern data-viz look.
- Model row hover could include a subtle background color shift instead of just opacity change.
- Consider adding a subtle glow on the budget bar when near danger threshold.

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix stray CSS brace** (line 215) -- malformed stylesheet may break rendering.
2. **Replace raw `#eab308`** on lines 90 and 119 with semantic warning tokens.

### P1 - High
3. **Add keyboard accessibility to trend bars** -- add `tabindex="0"`, `role="listitem"`, and `aria-label` with date/cost to each bar.
4. **Add loading skeleton state** -- show shimmer placeholders while data loads.
5. **Add disabled state** -- for when dashboard is non-interactive.
6. **Add `:active` press state** to model rows.
7. **Replace all magic number dimensions** (lines 107, 148, 157, 172, 194, 195) with design tokens.

### P2 - Medium
8. **Add color-blind-safe indicators** -- text labels or icons alongside color-coded budget status.
9. **Replace raw transition durations** with `--cg-motion-duration-*` tokens.
10. **Use `reduce` instead of spread** on line 269 for large dataset safety.
11. **Add `role="group"` to summary cards section** with appropriate `aria-label`.

### P3 - Low
12. **Add error state** for failed data fetch scenarios.
13. **Modern design polish** -- glassmorphism, gradient trend bars, glow effects.
14. **Type the event detail** properly instead of `Record<string, unknown>`.
