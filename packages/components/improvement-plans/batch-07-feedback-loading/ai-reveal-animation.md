# AI Reveal Animation Improvement Plan

**Component**: `ai-reveal-animation`
**Category**: AI-Native
**File**: `src/components/ai-reveal-animation/ai-reveal-animation.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Raw `rgba()` colors used for box-shadow and background-image on the wrapper (lines 37-38) -- these are decorative overlays that should use surface tokens
2. Magic number transform values (`translateY(24px)`, `scale(0.85)`, `perspective(600px)`, `rotateX(-15deg)`) in keyframes (lines 44-53, 82-94)
3. The `will-change: transform, opacity` (line 35) is always applied, even after animation completes, which wastes GPU resources

---

## 1. Functional Issues

- **`will-change` never removed**: Line 35 sets `will-change: transform, opacity` permanently on the wrapper. After the animation completes (`.done` class applied at line 72), `will-change` should be removed to release compositor layers. The `.done` class sets `animation: none` but does not reset `will-change`.
- **`_checkReducedMotion()` is called once**: Line 142-144 checks reduced motion in `connectedCallback`. If the user changes their motion preference while the component is mounted, it will not respond. Consider using a `MediaQueryList` listener.
- **No "hide" animation**: The component only supports reveal (show) animations. There is no corresponding hide/exit animation when `visible` is set back to false. The component just resets to opacity 0.
- **Decorative overlay on wrapper**: Lines 37-38 add `box-shadow` and `background-image` gradients to the wrapper, which is an animation container. These decorative styles should not be on the wrapper -- they bleed through to slotted content unexpectedly.

## 2. Interaction Issues

### 2.1 State Coverage
- **States present**: Hidden (initial), animating (visible + type), done (animation complete), reduced-motion (instant show).
- **Missing**: No "hiding" state for exit animations.
- **Missing**: No "paused" state to freeze an animation mid-way.

### 2.2 ARIA & Live Regions
- Line 173: `aria-hidden` is dynamically set based on visibility state, which is correct.
- Line 171: `role="presentation"` is appropriate for a wrapper that only controls animation.
- **Issue**: When content is revealed, screen readers may not notice the new content. Consider removing `aria-hidden="true"` immediately when `visible` becomes true (not after animation ends), so assistive tech can access content during the animation.
- Currently line 173: `aria-hidden=${!this.visible && !this._done ? 'true' : 'false'}` -- this is correct; it shows content as soon as `visible` is true.

### 2.3 Motion & prefers-reduced-motion
- **Well handled**: The component explicitly checks `prefers-reduced-motion` in `connectedCallback` (lines 147-158) and immediately marks as done, skipping the animation.
- **Issue**: The check is only done once at connect time. A user toggling the preference after mount would not see the change.
- **Issue**: The `reducedMotion` shared mixin is imported but the component also does its own check. These may conflict or be redundant. Consolidate to one approach.
- **Improvement**: Use `window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', ...)` to respond dynamically.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Code | Should Be |
|------|------|-----------|
| 44 | `translateY(24px)` | `var(--cg-spacing-24, 24px)` via CSS custom property |
| 48 | `scale(0.85)` | Acceptable as a ratio, but could be a `--cg-reveal-scale-start` token |
| 53 | `perspective(600px) rotateX(-15deg)` | Could use `--cg-reveal-perspective` and `--cg-reveal-rotate` tokens |
| 82 | `translateY(24px)` (keyframe) | Same as line 44 |
| 87 | `scale(0.85)` (keyframe) | Same as line 48 |
| 92 | `perspective(600px) rotateX(-15deg)` (keyframe) | Same as line 53 |

### 3.2 Raw Colors Found
| Line | Code | Should Be |
|------|------|-----------|
| 37 | `rgba(255, 255, 255, 0.05)` | `var(--cg-color-surface-overlay-5, ...)` or remove entirely |
| 38 | `rgba(255, 255, 255, 0.03)` | `var(--cg-color-surface-overlay-3, ...)` or remove entirely |

### 3.3 Animation Token Usage
- The component uses CSS custom properties `--_duration` and `--_delay` set via inline style (line 171), which is a clean approach for parameterized animations.
- The easing values (`ease`, `cubic-bezier(0.16, 1, 0.3, 1)`) in lines 57-67 are hardcoded. Consider using `var(--cg-motion-easing-enter)` or `var(--cg-motion-easing-spring)`.

### 3.4 Modern Design Enhancements
- Remove the decorative `box-shadow` and `background-image` from the wrapper (lines 37-38) -- these should not be on an animation utility wrapper. They should be on the actual content component.
- Add a "blur" reveal type that goes from `filter: blur(8px)` to `filter: blur(0)`.
- Support "stagger" mode for revealing multiple children with incremental delays.
- Add a "spring" easing option using the existing `cubic-bezier(0.16, 1, 0.3, 1)`.

## 4. Prioritized Fixes

### P0 - Critical
- None

### P1 - High
- Remove decorative `box-shadow` and `background-image` from `.wrapper` (lines 37-38) -- these leak into slotted content and do not belong on an animation utility
- Reset `will-change: auto` in the `.done` class to release GPU resources after animation completes
- Replace raw `rgba()` values with semantic tokens if decorative styles are kept

### P2 - Medium
- Replace hardcoded easing functions with `--cg-motion-easing-*` tokens
- Add dynamic `prefers-reduced-motion` listener instead of one-time check
- Consolidate the manual reduced-motion check with the imported `reducedMotion` mixin to avoid redundancy
- Extract transform magic numbers (24px, 0.85, 600px, -15deg) into component-level CSS custom properties

### P3 - Low
- Add exit/hide animations when `visible` transitions from true to false
- Add "blur" reveal type
- Add "stagger" mode for sequential child reveals
- Add "spring" easing option
