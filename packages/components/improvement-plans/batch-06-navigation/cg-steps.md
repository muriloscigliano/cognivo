# cg-steps Improvement Plan

**Component**: `cg-steps`
**Category**: Foundation
**File**: `src/components/cg-steps/cg-steps.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Extensive magic numbers: hard-coded animation delays (lines 34-49), circle dimensions, margins, line-heights
2. Horizontal line color `--cg-gray-200` (light palette) looks wrong on dark backgrounds -- should use `--cg-gray-700` or similar
3. No ARIA step group semantics; missing `role="list"` on container and `role="listitem"` on steps

---

## 1. Functional Issues

- **Lines 87, 157**: Horizontal and vertical connecting lines use `--cg-gray-200, #e4e4e7` which is a light gray -- appears almost invisible on the dark `#18181b` surface. Should use `--cg-gray-700, #3f3f46` or `--cg-color-surface-container-border`.
- **Line 105**: Circle border uses `--cg-gray-300, #d4d4d8` -- same issue, this is a light palette color on a dark surface.
- **Line 108**: `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.08)` -- raw rgba value, should use token.
- **Line 227**: `_getStatus` defaults first item to `'active'` and rest to `'pending'` if no status provided. This implicit behavior may surprise consumers expecting all items to start as `'pending'`.
- Hard-coded animation delays support only up to 6 steps (lines 34-49). If more steps are added, they get no entrance animation.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Done | Yes | Yes | Green background and border |
| Active | Yes | Yes | Accent color with pulse animation and box-shadow ring |
| Pending | Yes | Partial | Border uses light gray token `--cg-gray-300` -- wrong for dark theme |
| Error | Yes | Yes | Danger red background and border |
| Hover (clickable) | Yes | Yes | Border accent on hover |
| Focus-visible (clickable) | Yes | Yes | Outline ring (line 149) |
| Disabled | No | N/A | No disabled step state |
| Loading/Processing | No | N/A | No loading spinner within a step circle |

### 2.2 Keyboard Navigation
- Clickable circles get `tabindex="0"` and `role="button"` (line 217)
- Enter/Space key handlers present (line 221)
- **Missing**: No arrow key navigation between step circles when clickable
- **Missing**: When not clickable, steps have no keyboard interaction at all -- this is acceptable but the component should still be navigable as a list

### 2.3 ARIA & Accessibility
- Individual circles have `aria-label="Step {n}: {title}"` (line 219) -- good
- **Missing**: No `role="list"` on the steps container (`.steps-vertical` / `.steps-horizontal`)
- **Missing**: No `role="listitem"` on individual step wrappers
- **Missing**: No `aria-current="step"` on the active step
- **Missing**: The step status (done/active/pending/error) is not communicated to screen readers beyond the circle's visual state

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 34-49 | `animation-delay: 0ms/60ms/120ms/...` | Use CSS `calc()` with `--cg-motion-stagger-delay` or `animation-delay: calc(var(--_index) * 60ms)` via inline style |
| 51-53 | `translateY(6px)` | `var(--cg-motion-distance-sm, 6px)` |
| 81 | `margin-bottom: 8px` | `var(--cg-spacing-8, 8px)` -- already has fallback but raw |
| 97-98 | `width: 32px; height: 32px` | `var(--cg-size-step-circle, 32px)` |
| 103 | `font-size: 0.8rem` | `var(--cg-font-size-xs, 12px)` |
| 114 | `width: 24px; height: 24px` (compact) | `var(--cg-size-step-circle-compact, 24px)` |
| 114 | `font-size: 0.65rem` (compact) | `var(--cg-font-size-2xs, 10px)` |
| 125 | `box-shadow: 0 0 0 4px` | `var(--cg-ring-width-md, 4px)` |
| 133 | `width: 14px; height: 14px` (svg) | `var(--cg-size-icon-xs, 14px)` |
| 134 | `width: 11px; height: 11px` (compact svg) | `var(--cg-size-icon-2xs, 11px)` |
| 155 | `min-height: 24px` (v-line) | `var(--cg-spacing-24, 24px)` |
| 170 | `padding: 0 4px` (h body) | `var(--cg-spacing-4, 4px)` |
| 179 | `line-height: 1.3` | `var(--cg-line-height-tight, 1.3)` |
| 189 | `margin-top: 2px` | `var(--cg-spacing-2, 2px)` |
| 190 | `line-height: 1.4` | `var(--cg-line-height-snug, 1.4)` |

### 3.2 Raw Colors Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 87 | `--cg-gray-200, #e4e4e7` (h-line) | Should be `--cg-gray-700, #3f3f46` for dark theme |
| 105 | `--cg-gray-300, #d4d4d8` (circle border) | Should be `--cg-gray-600, #52525b` for dark theme |
| 108 | `rgba(255, 255, 255, 0.08)` | `var(--cg-overlay-white-subtle)` |
| 119 | `--cg-gray-white, #ffffff` | OK as semantic token |
| 125 | `rgba(223, 255, 97, 0.25)` | `var(--cg-overlay-accent-strong)` |
| 157 | `--cg-gray-200, #e4e4e7` (v-line) | Same fix as h-line |

### 3.3 Spacing Issues
- Horizontal step body has `padding: 0 4px` (line 170) -- raw value, should be token
- Vertical body has `padding-bottom: var(--cg-spacing-24)` -- good
- No consistent gap system between circles and text content

### 3.4 Modern Design Enhancements
- Replace hard-coded `:nth-child` animation delays with CSS custom property `--_index` set via inline style for unlimited step support
- Add subtle gradient on completed connecting lines (green fade)
- Add a "warning" status in addition to error
- Consider adding step labels below horizontal circles with truncation

## 4. Prioritized Fixes

### P0 - Critical
1. Fix light-palette gray tokens (`--cg-gray-200`, `--cg-gray-300`) to dark-appropriate equivalents for connecting lines and circle borders
2. Add `role="list"` on container and `role="listitem"` on step wrappers
3. Add `aria-current="step"` on the active step

### P1 - High
4. Replace all 15+ magic number values with design tokens
5. Replace raw rgba values with overlay tokens
6. Replace hard-coded `:nth-child` animation delays with dynamic `--_index` approach
7. Add arrow key navigation between clickable steps

### P2 - Medium
8. Add disabled step state
9. Communicate step status to screen readers (e.g., `aria-label` including status)
10. Support more than 6 steps for entrance animation

### P3 - Low
11. Add "warning" status type
12. Add gradient on completed connecting lines
13. Add step description tooltip on horizontal compact mode
