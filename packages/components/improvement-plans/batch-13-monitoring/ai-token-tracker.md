# AI Token Tracker Improvement Plan

**Component**: `ai-token-tracker`
**Category**: AI-Native
**File**: `src/components/ai-token-tracker/ai-token-tracker.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Multiple magic numbers in CSS (pixel values for heights, padding, font sizes, border-radius)
2. Compact mode is clickable but lacks keyboard navigation (no tabindex or key handler)
3. Missing loading, disabled, and error states

---

## 1. Functional Issues
- **Line 243**: Latency bar width calculation `Math.min(this.latency / 5000, 100)` doesn't scale to percentage properly -- `this.latency / 5000` gives a 0-1 range when latency is 0-5000ms, but the `%` unit expects 0-100. Should be `Math.min((this.latency / 5000) * 100, 100)`.
- **No `HTMLElementTagNameMap` declaration**: Missing the global declaration block that other components have, preventing type inference in querySelector.
- **Line 174**: `mode` property defaults to `'compact'` but is typed as a union. No validation if an invalid string is passed via attribute.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | Both compact and detailed modes |
| Hover | Partial | Only `.compact:hover` (line 52) changes border color |
| Active/Pressed | No | No `:active` state on compact badge |
| Focus | Partial | Generic `:focus-visible` on line 162, but compact div itself is not focusable |
| Disabled | No | No disabled state |
| Loading | No | No skeleton/shimmer state |
| Error | No | No error state |
| Empty | No | Renders zeros, no dedicated empty state |

**Missing**: active, disabled, loading, error, empty states (5 of 8+ missing).

### 2.2 Keyboard Navigation
- **Compact mode** (line 207-216): The `.compact` div has `@click` handler (line 209) but no `tabindex="0"`, no `role="button"`, and no `@keydown` handler. Completely inaccessible via keyboard.
- **Detailed mode**: No interactive elements, which is fine for a display widget.

### 2.3 ARIA & Accessibility
- **Line 208**: `role="status"` with `aria-live="polite"` -- good for live updates.
- **Line 220**: Same for detailed mode.
- **Compact mode missing**: No `tabindex`, no keyboard handler despite being clickable.
- **Budget progress bar** (lines 253-257): No `role="progressbar"`, no `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggestion |
|------|-------|------------|
| 82 | `font-size: 10px` | Use `var(--cg-font-size-2xs, 10px)` |
| 83 | `padding: 2px var(--cg-spacing-8, 8px)` | Use `var(--cg-spacing-2, 2px)` |
| 99 | `gap: 2px` | Use `var(--cg-spacing-2, 2px)` |
| 102 | `font-size: 10px` | Use `var(--cg-font-size-2xs, 10px)` |
| 118 | `height: 4px` | Use `var(--cg-size-50, 4px)` |
| 119 | `border-radius: 2px` | Use `var(--cg-border-radius-25, 2px)` |
| 126 | `border-radius: 2px` | Same |
| 136 | `padding-top: 10px` | Use `var(--cg-spacing-10, 10px)` |
| 149 | `height: 6px` | Use `var(--cg-size-75, 6px)` |
| 150 | `border-radius: 3px` | Use `var(--cg-border-radius-50, 4px)` |
| 155 | `border-radius: 3px` | Same |

### 3.2 Raw Colors Found
No raw hex colors found outside of token fallbacks -- good.

### 3.3 Spacing Issues
- Transition durations on lines 48, 69, 127, 128, 156 use raw `150ms`, `300ms`, `500ms` values instead of `var(--cg-motion-duration-*)` tokens.
- Line 48: `transition: all 150ms` -- overly broad transition property. Should target specific properties.

### 3.4 Modern Design Enhancements
- Compact mode could have a subtle gradient border on hover.
- Detailed mode metrics grid could benefit from subtle dividers between metrics.
- Latency bar could show a gradient from green to red based on value.
- Consider a micro-animation when values update (countup effect).

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix latency bar width calculation** (line 243): Change `this.latency / 5000` to `(this.latency / 5000) * 100` for correct percentage.
2. **Add keyboard accessibility to compact mode**: Add `tabindex="0"`, `role="button"`, and `@keydown` handler for Enter/Space.

### P1 - High
3. **Add `role="progressbar"` with ARIA attributes** to budget bar (line 253).
4. **Replace all `font-size: 10px`** (lines 82, 102) with `var(--cg-font-size-2xs)`.
5. **Replace all magic number heights and border-radii** (lines 118-119, 149-155) with design tokens.
6. **Add loading skeleton state** for data fetch scenarios.
7. **Add disabled state** for non-interactive scenarios.

### P2 - Medium
8. **Add `HTMLElementTagNameMap` declaration** for TypeScript type inference.
9. **Replace transition durations** with `--cg-motion-duration-*` tokens.
10. **Replace `transition: all`** (line 48) with specific properties.
11. **Add `:active` press state** to compact badge.

### P3 - Low
12. **Add empty state** when all values are zero.
13. **Add error state** for invalid data.
14. **Modern design polish** -- gradient latency bar, micro-animations on value change.
