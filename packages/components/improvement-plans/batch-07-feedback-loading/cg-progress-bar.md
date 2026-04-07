# CG Progress Bar Improvement Plan

**Component**: `cg-progress-bar`
**Category**: Foundation
**File**: `src/components/cg-progress-bar/cg-progress-bar.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. **CSS syntax errors**: Stray closing braces at lines 117 and 129 break the stylesheet -- rules after these lines may not apply correctly
2. Multiple raw `rgba()` colors used instead of semantic tokens (lines 53, 73, 101-109)
3. `border-radius: 999px` magic number used twice (lines 50, 64) instead of a border-radius token

---

## 1. Functional Issues

- **CSS parse error**: Line 117 has a stray `}` that closes the wrong block. The `:host([animated]) .fill::after` rule at line 114 is followed by an extra `}` at line 117. This means the `@keyframes stripe-move` (line 119) and everything after may be parsed incorrectly depending on browser CSS error recovery. Similarly, line 129 has another stray `}` after `:host([indeterminate]) .fill`.
- **`!important` on indeterminate width**: Line 126 uses `width: 40% !important` which cannot be overridden by consumers. Consider using a CSS custom property instead.
- **No value change announcement**: When `value` changes, the progress bar updates visually but screen readers may not be notified of the change. Consider adding `aria-live="polite"` on the track or dispatching a value change event.

## 2. Interaction Issues

### 2.1 State Coverage
- **States present**: Determinate, indeterminate, striped, animated stripes, four color variants.
- **Missing**: No "complete" visual state (e.g., flash/glow at 100%).
- **Missing**: No "error" state where progress stalls or fails.

### 2.2 ARIA & Live Regions
- Lines 168-176: `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label`, `aria-busy` are all properly set. This is well done.
- **Issue**: `aria-valuenow` is conditionally set to `nothing` for indeterminate (line 171), which is correct per WAI-ARIA spec.
- **Improvement**: Consider adding `aria-valuetext` for more descriptive announcements (e.g., "65% complete").

### 2.3 Motion & prefers-reduced-motion
- The component imports `reducedMotion` mixin.
- **Issue**: Three locally defined `@keyframes` (fillShimmer, stripe-move, indeterminate-slide at lines 76-135) and `indeterminate-pulse` (line 137) are **not** covered by an explicit `prefers-reduced-motion` block.
- **Fix needed**: Add `@media (prefers-reduced-motion: reduce)` to disable fillShimmer, stripe-move animation and replace indeterminate-slide with the indeterminate-pulse (which already exists but is never used).

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Code | Should Be |
|------|------|-----------|
| 50 | `border-radius: 999px` | `var(--cg-border-radius-full, 99999px)` |
| 53 | `box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15)` | Use elevation/shadow token |
| 57 | `height: 4px` (sm) | `var(--cg-spacing-4, 4px)` |
| 58 | `height: 8px` (md) | `var(--cg-spacing-8, 8px)` |
| 59 | `height: 12px` (lg) | `var(--cg-spacing-12, 12px)` |
| 64 | `border-radius: 999px` | `var(--cg-border-radius-full, 99999px)` |
| 110 | `background-size: 20px 20px` | `var(--cg-spacing-20, 20px)` |
| 121 | `background-position: 20px 0` | `var(--cg-spacing-20, 20px) 0` |
| 126 | `width: 40% !important` | Use CSS custom property |

### 3.2 Raw Colors Found
| Line | Code | Should Be |
|------|------|-----------|
| 53 | `rgba(0, 0, 0, 0.15)` | `var(--cg-color-shadow-inset, ...)` |
| 73 | `rgba(255, 255, 255, 0.2)` | `var(--cg-color-surface-overlay-20, ...)` |
| 101-109 | Multiple `rgba(255, 255, 255, 0.15)` | `var(--cg-color-surface-overlay-15, ...)` |

### 3.3 Animation Token Usage
- Line 65: `transition: width var(--cg-motion-duration-slow, 500ms)` -- correctly uses motion token.
- Line 74: `animation: fillShimmer 2s ease-in-out infinite` -- duration should use a token.
- Line 115: `animation: stripe-move 1s linear infinite` -- duration should use a token.
- Line 127: `animation: indeterminate-slide 1.5s cubic-bezier(...)` -- duration should use a token.

### 3.4 Modern Design Enhancements
- Add a subtle gradient overlay to the fill for depth.
- At 100%, add a brief celebratory shimmer or glow animation.
- The indeterminate animation could use a smoother, more modern easing curve.
- Consider adding rounded end caps to the fill with a subtle shadow for 3D depth.

## 4. Prioritized Fixes

### P0 - Critical
- **Fix CSS syntax errors**: Remove stray `}` at lines 117 and 129 that break the stylesheet parsing

### P1 - High
- Add `@media (prefers-reduced-motion: reduce)` block to disable fillShimmer, stripe-move, and replace indeterminate-slide with indeterminate-pulse
- Replace all raw `rgba()` colors with semantic tokens
- Replace `border-radius: 999px` with `var(--cg-border-radius-full, 99999px)`

### P2 - Medium
- Replace magic number heights and background-sizes with spacing tokens
- Replace `width: 40% !important` with a CSS custom property approach
- Replace hard-coded animation durations with motion tokens
- Add `aria-valuetext` for more descriptive progress announcements
- Wire up the unused `indeterminate-pulse` keyframe as the reduced-motion fallback

### P3 - Low
- Add 100% completion celebration animation
- Add `aria-live="polite"` for value change announcements
- Modern polish with gradient overlay and rounded end cap shadows
