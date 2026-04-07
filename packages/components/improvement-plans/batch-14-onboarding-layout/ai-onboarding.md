# AI Onboarding Improvement Plan

**Component**: `ai-onboarding`
**Category**: AI-Native
**File**: `src/components/ai-onboarding/ai-onboarding.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Multiple magic numbers in CSS for spacing and margins (lines 91-98)
2. No step transition animation -- content swaps instantly without visual feedback
3. Missing loading, error, and completed states

---

## 1. Functional Issues
- **Line 182**: `this.active++` mutates the `@property` from inside the component. Parent may expect to control `active` externally. This creates a conflict if the parent also binds to `active`.
- **Line 192**: Same issue with `this.active--`.
- **Line 202**: `const step = this.steps[this.active]` -- no bounds check. If `active` is out of range (e.g., set externally to a negative or too-large value), returns `undefined` and renders `nothing`, but no error feedback.
- **No completed state**: After clicking "Done" on the last step, the component simply fires an event. There's no visual confirmation or completion state.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | First step shown |
| Hover | Partial | Only next button via `filter: brightness(1.1)` (line 162) |
| Active/Pressed | No | No `:active` state on any button |
| Focus | Yes | All buttons have `:focus-visible` |
| Disabled | Partial | Back button disabled on first step (line 227), visual style (line 144) |
| Loading | No | No loading/skeleton state |
| Error | No | No error state |
| Complete | No | No completion confirmation state |

**Missing**: active, loading, error, completed states (4 of 8+ missing).

### 2.2 Keyboard Navigation
- **Nav buttons** (lines 226-235): Standard `<button>` elements with `aria-label` -- natively accessible, good.
- **Dismiss button** (line 212): Standard `<button>` with `aria-label` -- good.
- **Progress dots** (lines 218-222): `aria-hidden="true"` -- correctly hidden since decorative.
- **No Escape key handling**: Dialog should close/dismiss on Escape key press.
- **No focus management**: When stepping forward/back, focus should move to the title or a logical anchor point.

### 2.3 ARIA & Accessibility
- **Line 208**: `role="dialog"` with `aria-label` including step count -- good.
- **Missing**: `role="dialog"` should have `aria-modal="true"` if it overlays content, or should not use dialog role if it's inline.
- **Missing**: Step navigation should announce step changes to screen readers via `aria-live` region.
- **Missing**: The title `<h3>` should have an `id` and be referenced by `aria-labelledby` on the dialog.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggestion |
|------|-------|------------|
| 51 | `max-width: 420px` | Use a component-level CSS custom property |
| 68 | `letter-spacing: 0.5px` | Use `var(--cg-letter-spacing-wide, 0.05em)` |
| 76 | `padding: 4px` | Use `var(--cg-spacing-4, 4px)` |
| 91 | `margin: 0 0 8px` | Use `var(--cg-spacing-8, 8px)` for margin-bottom |
| 98 | `margin: 0 0 20px` | Use `var(--cg-spacing-20, 20px)` for margin-bottom |
| 109 | `width: 8px; height: 8px` | Use `var(--cg-size-100, 8px)` |

### 3.2 Raw Colors Found
No raw hex colors outside of token fallbacks -- good.

### 3.3 Spacing Issues
- Lines 91, 98: Margins use shorthand `0 0 Xpx` instead of tokenized margin-bottom.
- Transition durations on lines 113, 141, 162 use raw ms values.

### 3.4 Modern Design Enhancements
- Step transitions should animate (slide or fade between steps).
- Progress dots could have a connecting line that fills as user progresses.
- Consider a confetti or checkmark animation on completion.
- The card could have a subtle border gradient for the AI-native feel.
- Dots could animate position with spring physics on step change.

## 4. Prioritized Fixes

### P0 - Critical
None -- component is functional and reasonably accessible.

### P1 - High
1. **Fix property mutation**: Use internal `@state` for step tracking, keep `active` prop as initial value or use a controlled pattern.
2. **Add step transition animation**: Slide or crossfade between steps.
3. **Add Escape key handling**: Dismiss onboarding on Escape press.
4. **Add focus management**: Move focus to title when step changes.
5. **Add `aria-live` region** for step change announcements.
6. **Add completion state** -- show a "You're all set!" confirmation before dismissing.

### P2 - Medium
7. **Replace all magic number margins** (lines 91, 98) with tokenized spacing.
8. **Replace `max-width: 420px`** (line 51) with a CSS custom property.
9. **Replace `letter-spacing: 0.5px`** (line 68) with `var(--cg-letter-spacing-wide)`.
10. **Add `:active` press state** to nav buttons.
11. **Add bounds checking** for `active` property.
12. **Reconsider `role="dialog"`** -- use `role="region"` if not a modal overlay.

### P3 - Low
13. **Add loading skeleton state** for dynamic step content.
14. **Add error state** for failed step content loading.
15. **Modern design polish** -- dot connectors, completion animation, gradient border.
