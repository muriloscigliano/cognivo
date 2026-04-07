# cg-metric-card Improvement Plan

**Component**: `cg-metric-card`
**Category**: Foundation
**File**: `src/components/cg-metric-card/cg-metric-card.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Extensive magic numbers throughout -- 30+ raw pixel/em values not using design tokens (padding, margins, font-sizes, border-radius)
2. Raw `rgba()` colors in delta badges (lines 107, 111, 115) and sparkline bars (lines 207-209)
3. Non-interactive card still gets `tabindex="-1"` (line 235), causing unexpected focus behavior

---

## 1. Functional Issues

- **Sparkline recomputes on every render**: Lines 262-268 -- `Math.max(...this.sparkline)` and `.map()` run inside the template literal on every render cycle. Should memoize or use a getter.
- **`tabindex="-1"` on non-clickable cards**: Line 235 -- when `clickable` is false, `tabindex="-1"` is set. This means the card is programmatically focusable but not in tab order, which is confusing for a non-interactive element. Should be removed entirely for non-clickable.
- **No error state**: No way to show the metric in an error/unavailable state (e.g., API failed).
- **Value pulse animation class `pulse`**: Referenced in CSS (line 77) but never applied in the template. Dead feature.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Partial | Background gradient uses raw `rgba()` |
| Hover | Yes (clickable) | Partial | `border-color` uses `--cg-gray-600`, box-shadow uses `--cg-elevation-2` |
| Active/Pressed | **No** | N/A | Missing press state for clickable cards |
| Focus | Yes | Yes | Uses `--cg-brand-ai-accent` focus ring |
| Disabled | **No** | N/A | Missing entirely |
| Loading | Yes | Partial | Skeleton uses gray tokens but magic number dimensions |
| Error | **No** | N/A | Missing entirely |
| Selected | **No** | N/A | Missing selected state |

### 2.2 Keyboard Navigation
- `_handleKeyDown` on lines 198-203 correctly handles Enter and Space. Good.
- Missing active/pressed visual feedback on keydown.

### 2.3 ARIA & Accessibility
- Uses `role="figure"` with `aria-label` (lines 233-234). Appropriate.
- Loading state uses `role="status"` with `aria-label="Loading metric"`. Good.
- Sparkline has `aria-hidden="true"`. Good.
- Delta trend badge has `aria-label`. Good.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|----------------|
| 22 | `rgba(255, 255, 255, 0.02)` | `--cg-color-surface-overlay-faint` |
| 23 | `border: 1px solid` | `--cg-border-width-50` |
| 24 | `border-radius: 12px` | `--cg-border-radius-150` |
| 25 | `padding: 18px 20px` | `--cg-spacing-20` or nearest tokens |
| 26 | `min-width: 140px` | Extract to `--cg-metric-card-min-width` |
| 27 | `rgba(255, 255, 255, 0.05)` | `--cg-color-surface-overlay-subtle` |
| 28 | `transition: all 150ms ease` | `--cg-motion-duration-normal`, `--cg-motion-easing-default` |
| 29 | `padding: 12px 14px; min-width: 110px` | Use spacing tokens |
| 30 | `padding: 24px 28px; min-width: 180px` | Use spacing tokens |
| 48 | `margin-bottom: 6px` | `--cg-spacing-6` |
| 53 | `gap: 6px` | `--cg-spacing-6` |
| 56 | `font-size: 14px` | `--cg-font-size-sm` |
| 61 | `font-size: 11px` | `--cg-font-size-2xs` or nearest token |
| 62 | `font-weight: 700` | `--cg-font-weight-bold` |
| 64 | `letter-spacing: 0.06em` | `--cg-letter-spacing-wide` |
| 66 | `font-size: 13px` | `--cg-font-size-xs` |
| 71 | `font-size: 1.75rem` | `--cg-font-size-2xl` or `--cg-font-size-3xl` |
| 74 | `letter-spacing: -0.02em` | `--cg-letter-spacing-tight` |
| 85 | `font-size: 1.25rem` | `--cg-font-size-lg` |
| 86 | `font-size: 2.25rem` | `--cg-font-size-4xl` |
| 98 | `gap: 3px` | `--cg-spacing-4` (nearest) |
| 99 | `font-size: 12px` | `--cg-font-size-xs` |
| 101 | `padding: 2px 8px` | `--cg-spacing-2`, `--cg-spacing-8` |
| 102 | `border-radius: 99999px` | `--cg-border-radius-full` |
| 116 | `font-size: 10px` | Need `--cg-font-size-2xs` token or use smallest available |
| 119 | `font-size: 11px` | `--cg-font-size-2xs` |
| 126 | `gap: 2px` | `--cg-spacing-2` |
| 127 | `height: 24px` | `--cg-spacing-24` |
| 128 | `margin-top: 10px` | `--cg-spacing-8` or `--cg-spacing-12` (nearest) |
| 132 | `border-radius: 2px` | `--cg-border-radius-25` or smallest token |
| 133 | `min-width: 3px` | Token or remove |
| 141 | `border-radius: 6px` | `--cg-border-radius-75` or nearest |
| 145-147 | `width/height: 10px, 22px, 14px` | Use spacing tokens |

### 3.2 Raw Colors Found
| Line | Color | Suggested Token |
|------|-------|----------------|
| 22 | `rgba(255, 255, 255, 0.02)` | `--cg-color-surface-overlay-faint` |
| 27 | `rgba(255, 255, 255, 0.05)` | `--cg-color-surface-overlay-subtle` |
| 107 | `rgba(34, 197, 94, 0.1)` | `--cg-color-status-success-bg` |
| 111 | `rgba(239, 68, 68, 0.1)` | `--cg-color-status-error-bg` |
| 115 | `rgba(161, 161, 170, 0.1)` | `--cg-color-surface-overlay-muted` |
| 207 | `rgba(34, 197, 94, 0.3)` | `--cg-color-status-success-bg-strong` |
| 208 | `rgba(239, 68, 68, 0.3)` | `--cg-color-status-error-bg-strong` |
| 209 | `rgba(161, 161, 170, 0.2)` | `--cg-color-surface-overlay-muted` |

### 3.3 Typography Issues
- Multiple font-size values use raw pixels instead of tokens (lines 56, 61, 66, 71, 85, 86, 99, 116, 119).
- Font-weight `700` used directly instead of `--cg-font-weight-bold`.
- Letter-spacing raw `0.06em` and `-0.02em` not using tokens.

### 3.4 Spacing Issues
- Nearly all spacing values are hardcoded pixels rather than `--cg-spacing-*` tokens.
- Inconsistent size variants: `sm` uses `12px 14px`, `md` uses `18px 20px`, `lg` uses `24px 28px` -- non-standard spacing scale.

### 3.5 Modern Design Enhancements
- Add animated number transition when value changes (count-up effect).
- Add goal/target indicator line on sparkline.
- Add mini trend arrow animation on mount.

---

## 4. Prioritized Fixes

### P0 - Critical
1. **Remove `tabindex="-1"` from non-clickable cards** (line 235) -- use `nothing` instead.
2. **Add active/pressed state** for clickable variant.

### P1 - High
3. **Tokenize all spacing values** -- replace 30+ magic number padding/margin/gap values with `--cg-spacing-*` tokens.
4. **Tokenize all font-size values** -- replace raw pixel/rem values with `--cg-font-size-*` tokens.
5. **Tokenize all raw `rgba()` colors** in delta badges and sparkline with semantic tokens.
6. **Replace hardcoded `border-radius: 12px`** on line 24 with `--cg-border-radius-150`.

### P2 - Medium
7. **Add error state** visual treatment (e.g., `error` property with red border/icon).
8. **Add `disabled` state** with reduced opacity and no interaction.
9. **Memoize sparkline calculation** -- move `Math.max` computation out of template.
10. **Wire up or remove `.pulse` animation** (lines 77-84) -- currently dead CSS.

### P3 - Low
11. **Tokenize letter-spacing** values with `--cg-letter-spacing-*`.
12. **Tokenize transition duration/easing** on line 28.
13. **Add number animation** for value transitions.
