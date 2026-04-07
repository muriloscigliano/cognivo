# AI Toast Improvement Plan

**Component**: `ai-toast`
**Category**: AI-Native
**File**: `src/components/ai-toast/ai-toast.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Raw `rgba()` colors used for icon backgrounds across all five toast types (lines 95-99)
2. The slide-in/out animations (lines 74-81) use magic number `translateX(20px)` and hardcoded durations without motion tokens
3. No `prefers-reduced-motion` override for the locally defined `slideIn`, `slideOut`, and `shrink` keyframes

---

## 1. Functional Issues

- **Memory leak potential**: `_timers` Map (line 162) stores timeout references. While `disconnectedCallback` calls `clear()`, if a toast is dismissed and its timer fires after removal from the Map, there is no guard. The `_autoDismiss` method does check `_removeDismiss` which handles missing timers, so this is acceptable but worth noting.
- **No max-height/scroll for stack overflow**: `_maxQueue` is 8 (line 173), but on small viewports, 8 toasts at ~60px each (480px+) can overflow the viewport. Consider adding `max-height` with `overflow-y: auto` on the stack, or reducing `_maxQueue` dynamically.
- **Duplicate `role="alert"` and parent `aria-live`**: Line 240 has `aria-live="assertive"` on the stack container, while each toast (line 242) has `role="alert"` with its own `aria-live`. This creates duplicate announcements. The outer container should use `role="log"` or `aria-live="polite"`, and individual toasts should use `role="alert"` only for errors.
- **`position: fixed` without `display: block`**: The host uses `position: fixed` (line 40) but inherits `display` from `hostBlock`. Fixed position with block display works, but the host has no explicit `width` constraint, which could cause layout issues.

## 2. Interaction Issues

### 2.1 State Coverage
- **States present**: Visible (animated in), dismissing (animated out), auto-dismissed (timeout), user-dismissed (click).
- **Missing**: No "paused" state on hover -- toasts should pause their auto-dismiss timer when hovered.
- **Missing**: No swipe-to-dismiss for touch devices.
- **Missing**: No keyboard dismiss (Escape key).

### 2.2 ARIA & Live Regions
- **Issue (Duplicate announcements)**: The stack has `aria-live="assertive"` (line 240) AND each toast has `role="alert"` (line 242). The `role="alert"` already implies `aria-live="assertive"`. Remove `aria-live` from the parent or change it to `role="log"` with `aria-live="polite"`.
- **Issue**: Non-error toasts (info, success, warning) use `role="alert"` which is assertive. Info/success toasts should use `role="status"` with `aria-live="polite"` instead.
- Line 121: Dismiss button has proper `aria-label="Dismiss notification"` and focus-visible styles.

### 2.3 Motion & prefers-reduced-motion
- The component imports `reducedMotion` mixin.
- **Issue**: Three locally defined `@keyframes` (slideIn, slideOut, shrink at lines 74-141) are **not** covered by an explicit `prefers-reduced-motion` block.
- **Fix needed**: Add `@media (prefers-reduced-motion: reduce) { .toast { animation: none; } .toast.dismissing { animation: none; opacity: 0; } .progress { animation: none; width: 0; } }`.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Code | Should Be |
|------|------|-----------|
| 53 | `max-width: 380px` | `var(--cg-toast-max-width, 380px)` or a component-level token |
| 54 | `min-width: 280px` | `var(--cg-toast-min-width, 280px)` or a component-level token |
| 68 | `animation: slideIn 250ms ease` | Duration should use `var(--cg-motion-duration-normal, 250ms)` |
| 72 | `animation: slideOut 200ms ease forwards` | Duration should use `var(--cg-motion-duration-fast, 200ms)` |
| 75 | `transform: translateX(20px)` | `var(--cg-spacing-20, 20px)` |
| 77 | `transform: translateX(20px)` | `var(--cg-spacing-20, 20px)` |
| 92 | `font-weight: 800` | `var(--cg-font-weight-extrabold, 800)` |

### 3.2 Raw Colors Found
| Line | Code | Should Be |
|------|------|-----------|
| 95 | `rgba(59, 130, 246, 0.15)` (info) | `color-mix(in srgb, var(--cg-blue-400) 15%, transparent)` |
| 96 | `rgba(34, 197, 94, 0.15)` (success) | `color-mix(in srgb, var(--cg-green-400) 15%, transparent)` |
| 97 | `rgba(245, 158, 11, 0.15)` (warning) | `color-mix(in srgb, var(--cg-yellow-400) 15%, transparent)` |
| 98 | `rgba(239, 68, 68, 0.15)` (error) | `color-mix(in srgb, var(--cg-red-400) 15%, transparent)` |
| 99 | `rgba(223, 255, 97, 0.15)` (ai) | `color-mix(in srgb, var(--cg-brand-ai-accent) 15%, transparent)` |
| 120 | `rgba(255, 255, 255, 0.06)` (hover bg) | `var(--cg-color-surface-overlay-6, ...)` |

### 3.3 Animation Token Usage
- Line 68: `animation: slideIn 250ms ease` -- duration should use motion token.
- Line 72: `animation: slideOut 200ms ease forwards` -- duration should use motion token.
- Line 117: `transition: color var(--cg-motion-duration-fast, 150ms)` -- correctly uses motion token.
- `shrink` keyframe duration is set dynamically via inline style (`animation-duration: ${t.duration}ms`), which is fine.

### 3.4 Modern Design Enhancements
- Add a left accent border colored by type (4px solid colored strip on the left edge).
- Add hover-to-pause behavior: pause the dismiss timer on mouseenter, resume on mouseleave.
- Support stacking from bottom-up for bottom positions (currently all stack top-down).
- Add a subtle scale-down effect on older toasts as new ones arrive.
- Support action buttons within toasts (e.g., "Undo" for destructive actions).

## 4. Prioritized Fixes

### P0 - Critical
- None

### P1 - High
- Add `@media (prefers-reduced-motion: reduce)` block to disable slideIn, slideOut, and shrink animations
- Fix duplicate ARIA announcements: change stack `aria-live="assertive"` to `role="log"` with `aria-live="polite"`, and only use `role="alert"` for error type toasts
- Replace raw `rgba()` icon background colors with `color-mix()` or semantic tokens

### P2 - Medium
- Add hover-to-pause behavior for auto-dismiss timer
- Replace magic number widths, animation durations, and transform values with tokens
- Replace `font-weight: 800` with token
- Add keyboard dismiss (Escape key)
- Add `max-height` + `overflow-y: auto` on stack to handle viewport overflow

### P3 - Low
- Add left accent border for type differentiation
- Support swipe-to-dismiss on touch devices
- Support action buttons in toast content
- Add stacking animation effects
