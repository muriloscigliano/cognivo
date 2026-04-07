# AI Batch Progress Improvement Plan

**Component**: `ai-batch-progress`
**Category**: AI-Native
**File**: `src/components/ai-batch-progress/ai-batch-progress.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. **CSS syntax error**: Line 197 has a stray closing brace `}` that appears to be a broken `prefers-reduced-motion` rule, likely truncating the pulse-dot override
2. Multiple raw `rgba()` colors and raw hex `#eab308` used without semantic tokens (lines 63-77, 189)
3. Numerous magic numbers for padding, gap, font-weight, and spacing (lines 59, 89, 99, 119, 165, 174)

---

## 1. Functional Issues

- **CSS syntax error at line 197**: The `.pulse-dot { animation: none; }` rule at line 197 appears orphaned -- it seems like it was intended to be inside a `@media (prefers-reduced-motion: reduce)` block, but the block opener is missing. The stray `}` at line 198 closes the entire `css` template literal's rule block incorrectly.
- **`title` property shadows HTMLElement.title**: Line 203 uses `override title` which shadows the native `title` attribute. This means the native tooltip behavior is replaced. Consider renaming to `heading` or `jobTitle`.
- **No ETA calculation**: The ETA section (lines 279-283) just shows pending count, not an actual time estimate. Consider calculating based on completion rate.
- **Actions always shown**: The `.actions` div (line 286) renders even when `status === 'complete'` and only shows text. Consider hiding actions entirely when complete, or showing a "View Results" button.

## 2. Interaction Issues

### 2.1 State Coverage
- **States present**: Running (with pulse dot + pause/cancel), paused (resume/cancel), failed (retry), complete (text message).
- **Missing**: No "queued" or "pending start" state.
- **Missing**: No visual transition between states -- status changes are instant.

### 2.2 ARIA & Live Regions
- Line 235: `role="region"` with `aria-label` is correct.
- Lines 268-275: Progress bar has `role="progressbar"` with proper ARIA attributes.
- **Issue**: Status changes (running -> paused -> complete) are not announced to screen readers. Add `aria-live="polite"` on the status badge or use a visually hidden live region.
- **Issue**: The stat values (completed, failed, pending) update silently. Consider an `aria-live` region for critical changes.

### 2.3 Motion & prefers-reduced-motion
- The component imports `reducedMotion` and `pulseKeyframes` mixins.
- **Issue**: The broken CSS at line 197 was likely meant to disable the pulse-dot animation under reduced motion, but it is malformed.
- **Fix needed**: Properly wrap line 197 in `@media (prefers-reduced-motion: reduce) { .pulse-dot { animation: none; } }`.
- The `fadeSlideIn` entry animation should be covered by the shared mixin.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Code | Should Be |
|------|------|-----------|
| 57 | `font-weight: 700` | `var(--cg-font-weight-bold, 700)` |
| 59 | `padding: 3px var(--cg-spacing-8)` | `var(--cg-spacing-4, 4px) var(--cg-spacing-8, 8px)` |
| 89 | `gap: 2px` | `var(--cg-spacing-2, 2px)` |
| 99 | `font-weight: 700` | `var(--cg-font-weight-bold, 700)` |
| 119 | `font-weight: 700` | `var(--cg-font-weight-bold, 700)` |
| 146 | `width: 8px; height: 8px` | `var(--cg-spacing-8, 8px)` |
| 152 | `margin-right: 6px` | `var(--cg-spacing-6, 6px)` |
| 165 | `padding-top: 14px` | `var(--cg-spacing-16, 16px)` |
| 174 | `font-weight: 600` | `var(--cg-font-weight-semibold, 600)` |
| 324 | `font-size:12px` (inline style) | Should use CSS class with token |

### 3.2 Raw Colors Found
| Line | Code | Should Be |
|------|------|-----------|
| 63 | `rgba(59, 130, 246, 0.15)` | `color-mix(in srgb, var(--cg-color-status-info-text-default) 15%, transparent)` |
| 67 | `rgba(34, 197, 94, 0.15)` | `color-mix(in srgb, var(--cg-color-status-success-text-default) 15%, transparent)` |
| 71 | `rgba(239, 68, 68, 0.15)` | `color-mix(in srgb, var(--cg-color-status-error-text-default) 15%, transparent)` |
| 75 | `rgba(234, 179, 8, 0.15)` | Needs semantic token for warning bg |
| 76 | `color: #eab308` | `var(--cg-color-status-warning-text-default, #eab308)` |
| 189 | `border-color: #eab308; color: #eab308` | `var(--cg-color-status-warning-text-default, #eab308)` |

### 3.3 Animation Token Usage
- Line 28: `animation: fadeSlideIn 200ms` -- duration should use `var(--cg-motion-duration-fast, 200ms)`.
- Line 134: `transition: width 300ms ease` -- should use `var(--cg-motion-duration-normal, 300ms)`.
- Line 140: `transition: width 300ms ease` -- should use `var(--cg-motion-duration-normal, 300ms)`.
- Line 151: `animation: pulse 1.5s infinite` -- duration should use a token.
- Line 178: `transition: all 150ms ease` -- should use `var(--cg-motion-duration-fast, 150ms)`.

### 3.4 Modern Design Enhancements
- Add a segmented progress bar with subtle dividers between success/fail/pending sections.
- Add smooth count-up animations for the stat values when they change.
- The complete state could show a checkmark icon with a celebratory animation.
- Add a hover tooltip on the progress bar showing exact counts.
- Inline style on line 324 should be moved to a CSS class.

## 4. Prioritized Fixes

### P0 - Critical
- **Fix CSS syntax error**: Properly wrap the orphaned `.pulse-dot { animation: none; }` at line 197 in a `@media (prefers-reduced-motion: reduce)` block, and remove the stray `}` at line 198

### P1 - High
- Replace all raw hex `#eab308` with `var(--cg-color-status-warning-text-default, #eab308)` (lines 76, 189)
- Replace all raw `rgba()` colors with semantic tokens or `color-mix()` (lines 63-75)
- Add `aria-live="polite"` on the status badge for screen reader announcements
- Move inline style (line 324) to a proper CSS class

### P2 - Medium
- Replace all magic numbers (font-weight, padding, gap, margin) with design tokens (~10 instances)
- Replace animation/transition durations with motion tokens
- Consider renaming `title` property to avoid shadowing `HTMLElement.title`
- Add state transition animations between running/paused/complete/failed

### P3 - Low
- Add "queued" state
- Add count-up animations for stat values
- Add completion celebration animation
- Calculate and display actual ETA based on rate
