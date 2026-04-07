# CG Skeleton Improvement Plan

**Component**: `cg-skeleton`
**Category**: Foundation
**File**: `src/components/cg-skeleton/cg-skeleton.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Raw `rgba(255, 255, 255, 0.06)` used in shimmer gradient (line 22) instead of a semantic token
2. Magic number `height: 14px` for text-line (line 53) and default heights in `_getDefaultHeight()` (lines 83-86) not using spacing tokens
3. `!important` overrides on `.text-line:last-child` and `.text-line:nth-child(even)` (lines 61-65) are a code smell and fragile

---

## 1. Functional Issues

- **`!important` width overrides**: Lines 61-65 use `!important` to override inline `style="width: ..."` set in the template (line 98). This creates a specificity fight between CSS and inline styles. A better approach would be to use CSS custom properties or data attributes for line width variation.
- **No accessible busy state**: The `role="status"` and `aria-label="Loading content"` are present, but there is no `aria-busy="true"` to indicate active loading.
- **Default height logic uses magic strings**: `_getDefaultHeight()` (lines 81-87) returns hardcoded `'40px'`, `'80px'`, `'14px'` without referencing tokens.

## 2. Interaction Issues

### 2.1 State Coverage
- **States present**: Animated (shimmer), static (animated=false).
- **Missing**: No "loaded" transition state. When content replaces the skeleton, there is no fade-out or crossfade animation.
- The component is purely visual/presentational which is appropriate.

### 2.2 ARIA & Live Regions
- Lines 94, 110: Both render paths have `role="status"` and `aria-label="Loading content"`. This is correct.
- **Improvement**: Allow the `aria-label` to be customized via a property (e.g., `label` prop) so consumers can provide context like "Loading user profile".

### 2.3 Motion & prefers-reduced-motion
- The component imports `reducedMotion` and `shimmerKeyframes` from shared styles.
- **Verify**: Ensure the shared `reducedMotion` mixin actually targets the shimmer animation. The shimmer is applied to `.skeleton` class (line 26), so the mixin needs to cover this.
- **Recommendation**: Add explicit `@media (prefers-reduced-motion: reduce) { .skeleton { animation: none; background-size: 100% 100%; } }` to ensure the shimmer stops.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Code | Should Be |
|------|------|-----------|
| 53 | `height: 14px` | `var(--cg-spacing-14, 14px)` |
| 83 | `'40px'` (circular default) | Reference a spacing token |
| 84 | `'80px'` (rectangular default) | Reference a spacing token |
| 85 | `'14px'` (text default) | Reference a spacing token |

### 3.2 Raw Colors Found
| Line | Code | Should Be |
|------|------|-----------|
| 22 | `rgba(255, 255, 255, 0.06)` | `var(--cg-color-surface-overlay-6, rgba(255, 255, 255, 0.06))` |

### 3.3 Animation Token Usage
- Line 26: `animation: shimmer 1.8s ease-in-out infinite` -- duration should use `var(--cg-motion-duration-shimmer, 1.8s)`.

### 3.4 Modern Design Enhancements
- Add a subtle border to skeleton shapes for better definition against dark backgrounds.
- Consider supporting a "wave" shimmer variant (left-to-right reveal) in addition to the current gradient sweep.
- Add a fade-out utility class/method for smooth transition when content loads.

## 4. Prioritized Fixes

### P0 - Critical
- None

### P1 - High
- Verify `reducedMotion` mixin covers `.skeleton` animation; add explicit `@media (prefers-reduced-motion: reduce)` block if not
- Replace `rgba(255, 255, 255, 0.06)` with a semantic overlay token
- Remove `!important` overrides by using CSS custom properties or data attributes for line width variation

### P2 - Medium
- Replace magic number heights with spacing tokens (lines 53, 83-85)
- Replace shimmer animation duration with a motion token
- Add `aria-busy="true"` to the skeleton containers
- Add a customizable `label` property for the `aria-label`

### P3 - Low
- Add a fade-out transition utility for skeleton-to-content swap
- Consider adding a subtle border to skeleton shapes
- Support alternative shimmer patterns (wave)
