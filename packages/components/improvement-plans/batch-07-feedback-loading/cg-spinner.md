# CG Spinner Improvement Plan

**Component**: `cg-spinner`
**Category**: Foundation
**File**: `src/components/cg-spinner/cg-spinner.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. All size dimensions use magic number pixels instead of spacing tokens (lines 33-56)
2. No `prefers-reduced-motion` override for the local spin animation -- the imported `spinKeyframes` and `reducedMotion` mixins should handle it, but there is no visible reduced-motion fallback (e.g., pulse) in the component styles
3. The default size variant has no explicit CSS rule -- if `size="md"` is default but the attribute is not reflected initially, the spinner renders with no width/height

---

## 1. Functional Issues

- **No default size CSS without attribute**: The component defaults `size` to `'md'` but all size styles are keyed on `:host([size="..."])` selectors (lines 32-56). If the `size` property is reflected (it is, via `reflect: true`), this works. However, if the attribute reflection fails or is removed, no size would apply. Consider adding a bare `.spinner` default size.
- **No error handling for invalid size/color**: If a consumer passes an unsupported `size` or `color` value, the spinner renders with no dimensions and no top-border color.

## 2. Interaction Issues

### 2.1 State Coverage
- **States present**: Loading (spinning).
- **Missing**: No "paused" or "determinate" state. This is acceptable for a simple spinner but could be noted.
- The spinner only has one visual state -- spinning. This is correct for its purpose.

### 2.2 ARIA & Live Regions
- Line 88-93: Correctly uses `role="status"` and `aria-label` on the spinner div.
- Line 93: SR-only text provides the label as hidden text. This is well done.
- **Minor**: Consider adding `aria-busy="true"` to indicate active loading.

### 2.3 Motion & prefers-reduced-motion
- The component imports both `reducedMotion` and `spinKeyframes` from shared styles. The `reducedMotion` mixin should apply a `@media (prefers-reduced-motion: reduce)` rule.
- **Verify**: Ensure the shared `reducedMotion` mixin actually targets the `.spinner` class or all animated elements. If it only targets `:host`, the `.spinner` animation may persist.
- **Recommendation**: Add an explicit reduced-motion block: `@media (prefers-reduced-motion: reduce) { .spinner { animation: none; opacity: 0.7; } }` or replace with a gentle pulse.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Code | Should Be |
|------|------|-----------|
| 33 | `width: 14px; height: 14px` (xs) | `var(--cg-spacing-14, 14px)` |
| 34 | `border-width: 2px` | `var(--cg-border-width-thick, 2px)` |
| 38 | `width: 20px; height: 20px` (sm) | `var(--cg-spacing-20, 20px)` |
| 39 | `border-width: 2px` | `var(--cg-border-width-thick, 2px)` |
| 43 | `width: 28px; height: 28px` (md) | `var(--cg-spacing-28, 28px)` |
| 44 | `border-width: 3px` | `var(--cg-border-width-heavy, 3px)` |
| 48 | `width: 40px; height: 40px` (lg) | `var(--cg-spacing-40, 40px)` |
| 49 | `border-width: 3px` | `var(--cg-border-width-heavy, 3px)` |
| 53 | `width: 56px; height: 56px` (xl) | `var(--cg-spacing-56, 56px)` |
| 54 | `border-width: 4px` | `var(--cg-border-width-xheavy, 4px)` |

### 3.2 Raw Colors Found
- No raw hex or rgba colors in the component styles -- all colors use semantic tokens with fallbacks. This is well done.

### 3.3 Animation Token Usage
- Line 29: `animation: spin 0.8s linear infinite` -- duration should use `var(--cg-motion-duration-spinner, 0.8s)`.

### 3.4 Modern Design Enhancements
- Consider adding a gradient to the spinner ring rather than a simple `border-top-color` for a more polished look.
- Add a subtle `box-shadow` glow matching the `border-top-color` for the accent variant.
- Support a "track" color variant where the non-active portion is slightly visible (already done via `border-color` on the base, which is good).

## 4. Prioritized Fixes

### P0 - Critical
- None

### P1 - High
- Verify that the `reducedMotion` shared mixin actually disables the `.spinner` animation. If not, add an explicit `@media (prefers-reduced-motion: reduce)` block.

### P2 - Medium
- Replace all magic number width/height/border-width values with `--cg-spacing-*` and `--cg-border-width-*` tokens (10 instances)
- Replace animation duration `0.8s` with a motion duration token
- Add a bare `.spinner` fallback size matching `md` in case attribute reflection fails

### P3 - Low
- Add `aria-busy="true"` for explicit loading semantics
- Add gradient or glow effect for accent variant
- Consider exposing CSS custom properties for consumer override of size/color
