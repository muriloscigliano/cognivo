# AI Thinking Improvement Plan

**Component**: `ai-thinking`
**Category**: AI-Native
**File**: `src/components/ai-thinking/ai-thinking.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Numerous magic numbers for sizes, padding, gap, and animation values (lines 65-85, 103-111, 149, 170-171, 199)
2. Raw rgba() colors used instead of semantic tokens for borders/backgrounds (lines 54-56, 117, 190-191, 209-210)
3. No `prefers-reduced-motion` override for the four `@keyframes` animations defined within the component styles (lines 233-248)

---

## 1. Functional Issues

- **Stage cycling interval hard-coded**: Line 317 uses `2500` ms interval with no way to configure it via a property. Should be a configurable `stageInterval` property.
- **No cleanup on `delay` property change**: If `delay` changes after `connectedCallback`, the timer is not re-initialized. The `updated()` hook should handle `delay` changes.
- **Progress bar lacks label**: The progress bar (line 394) has `role="progressbar"` and `aria-valuenow` but no visible label for the percentage value, which would help sighted users too.
- **`_renderToolIcon` returns inline styles**: Line 347 uses `style="width:10px;height:10px;border:1.5px solid currentColor;border-top-color:transparent;border-radius:50%;"` -- inline styles should be extracted to CSS classes.

## 2. Interaction Issues

### 2.1 State Coverage
- **Visible states**: Default (delayed hidden), visible, canceling -- present.
- **Missing**: No explicit error state for when thinking/processing fails. Consider an `error` state that changes the visual treatment.
- **Missing**: No `completed` visual transition. When the element is removed, there is no exit animation.

### 2.2 ARIA & Live Regions
- Line 374: `role="status"` and `aria-live="polite"` are correctly applied to the container.
- **Issue**: The skeleton variant (line 352) renders no text, so screen readers get no meaningful announcement. The `aria-label` on the container covers this, but the skeleton `div` itself should have `aria-hidden="true"`.
- **Issue**: Stage changes fire events but do not explicitly update `aria-label` reactively. Since Lit re-renders on `_stageIndex` change, this works implicitly, but adding `aria-relevant="text"` would be more explicit.

### 2.3 Motion & prefers-reduced-motion
- The component imports `reducedMotion` mixin, but the four `@keyframes` defined locally (pulse, spin, shimmer, fadeIn at lines 233-248) are **not** disabled or replaced under `prefers-reduced-motion: reduce`.
- **Fix needed**: Add a `@media (prefers-reduced-motion: reduce)` block that sets `animation: none` on `.icon`, `.ring`, `.dot`, `.skeleton-line`, `.shimmer .text`, `.tool.loading .tool-icon`, and replaces with `opacity` pulse or static state.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Code | Should Be |
|------|------|-----------|
| 65 | `width: 20px; height: 20px` | `var(--cg-spacing-20, 20px)` |
| 75 | `width: 16px; height: 16px` | `var(--cg-spacing-16, 16px)` |
| 76 | `width: 28px; height: 28px` | `var(--cg-spacing-28, 28px)` |
| 79 | `width: 8px; height: 8px` | `var(--cg-spacing-8, 8px)` |
| 84 | `width: 6px; height: 6px` | `var(--cg-spacing-6, 6px)` |
| 85 | `width: 12px; height: 12px` | `var(--cg-spacing-12, 12px)` |
| 104 | `width: 4px; height: 4px` | `var(--cg-spacing-4, 4px)` |
| 115 | `width: 20px; height: 20px` (ring) | `var(--cg-spacing-20, 20px)` |
| 123 | `width: 14px; height: 14px` | `var(--cg-spacing-14, 14px)` |
| 124 | `width: 28px; height: 28px` | `var(--cg-spacing-28, 28px)` |
| 134 | `height: 12px` | `var(--cg-spacing-12, 12px)` |
| 143 | `height: 8px` | `var(--cg-spacing-8, 8px)` |
| 144 | `height: 16px` | `var(--cg-spacing-16, 16px)` |
| 149 | `height: 3px` | `var(--cg-spacing-2, 2px)` or a `--cg-spacing-3` token |
| 152 | `border-radius: 2px` | `var(--cg-border-radius-025, 2px)` |
| 157 | `border-radius: 2px` | `var(--cg-border-radius-025, 2px)` |
| 170 | `gap: 5px` | `var(--cg-spacing-4, 4px)` or `var(--cg-spacing-6, 6px)` |
| 171 | `padding: 3px` | `var(--cg-spacing-4, 4px)` |
| 174 | `font-weight: 600` | `var(--cg-font-weight-semibold, 600)` |
| 199 | `padding: 2px 10px` | `var(--cg-spacing-2, 2px) var(--cg-spacing-12, 12px)` |
| 203 | `transition: all 150ms ease` | `var(--cg-motion-duration-fast, 150ms)` |
| 206 | `font-weight: 600` | `var(--cg-font-weight-semibold, 600)` |
| 317 | `2500` (stage interval) | Configurable property, no CSS token needed |

### 3.2 Raw Colors Found
| Line | Code | Should Be |
|------|------|-----------|
| 54 | `rgba(255, 255, 255, 0.05)` | `var(--cg-color-surface-overlay-5, ...)` |
| 55 | `rgba(255, 255, 255, 0.03)` | `var(--cg-color-surface-overlay-3, ...)` |
| 117 | `rgba(223, 255, 97, 0.2)` | `color-mix(in srgb, var(--cg-brand-ai-accent) 20%, transparent)` |
| 190 | `rgba(34, 197, 94, 0.2)` | Should use a semantic border token for success |
| 191 | `rgba(239, 68, 68, 0.2)` | Should use a semantic border token for error |
| 209 | `rgba(239, 68, 68, 0.3)` | Should use a semantic token |
| 210 | `rgba(239, 68, 68, 0.08)` | Should use a semantic token |

### 3.3 Animation Token Usage
- Line 72: `animation: spin 1.2s linear infinite` -- duration should use `var(--cg-motion-duration-spinner, 1.2s)` or similar.
- Line 108: `animation: pulse 1.4s ease-in-out infinite` -- duration is a magic number.
- Line 110-111: `animation-delay: 0.2s / 0.4s` -- magic delay values.
- Line 120: `animation: spin 0.8s linear infinite` -- should use motion token.
- Line 138: `animation: shimmer 1.5s linear infinite` -- should use motion token.
- Line 158: `transition: width 300ms ease` -- should use `var(--cg-motion-duration-normal, 300ms)`.
- Line 178: `animation: fadeIn 200ms ease` -- should use `var(--cg-motion-duration-fast, 200ms)`.
- Line 229: `animation: shimmer 2s linear infinite` -- should use motion token.

### 3.4 Modern Design Enhancements
- Add a subtle `backdrop-filter: blur()` to the container when used as an overlay.
- The progress bar fill could use a gradient shimmer overlay for a more polished feel.
- Add an exit animation when `_visible` transitions from true to false (currently just disappears via `nothing`).
- Consider adding a subtle glow effect on the spinning icon using `box-shadow` with the accent color.

## 4. Prioritized Fixes

### P0 - Critical
- None

### P1 - High
- Add `@media (prefers-reduced-motion: reduce)` block to disable/replace all four local keyframe animations (spin, pulse, shimmer, fadeIn)
- Replace all raw `rgba()` color values with semantic tokens or `color-mix()` expressions
- Remove inline styles from `_renderToolIcon` loading spinner (line 347)

### P2 - Medium
- Replace all magic number widths/heights/padding with `--cg-spacing-*` tokens (20+ instances)
- Replace hard-coded `font-weight: 600` with `var(--cg-font-weight-semibold, 600)` (lines 174, 206)
- Replace all animation durations with `--cg-motion-duration-*` tokens
- Make stage interval configurable via a `stageInterval` property
- Add `border-radius` tokens for 2px values

### P3 - Low
- Add exit animation when component becomes hidden
- Add `aria-relevant="text"` to the container for stage changes
- Add a `completed` visual state
- Add subtle glow/blur enhancements for modern polish
