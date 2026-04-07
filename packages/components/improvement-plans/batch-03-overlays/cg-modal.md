# cg-modal Improvement Plan

**Component**: `cg-modal`
**Category**: Foundation
**File**: `src/components/cg-modal/cg-modal.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Multiple raw `rgba()` colors not backed by semantic tokens (backdrop, glassmorphism background, box-shadow)
2. Several magic numbers in CSS (z-index `9998`/`9999`, `max-height: calc(100vh - 64px)`, size widths `400px`/`560px`/`720px`/`960px`, close button `32px`/`18px`)
3. Missing loading, error, and success states on the modal itself

---

## 1. Functional Issues

1. **Focus trap only queries shadow DOM** (lines 304-308): `_updateFocusableElements()` only searches `this.shadowRoot`, missing slotted light DOM focusable elements. Users putting buttons in the footer slot won't be included in the focus trap cycle.
   - **Current**: `this._focusableElements = [...root.querySelectorAll<HTMLElement>(selectors)];`
   - **Fix**: Also query `this.querySelectorAll(selectors)` for light DOM and merge both arrays, filtering hidden/inert elements.

2. **Close animation timeout is a magic number** (line 269): `setTimeout(() => { this._closing = false; }, 150)` uses a hardcoded `150ms` that could drift from the actual CSS animation duration.
   - **Fix**: Listen for `animationend` on the modal element instead of using a hardcoded timeout.

3. **No cancelable close event** (line 349): `_requestClose()` directly sets `open = false`. There is no way for consumers to prevent closure (e.g., unsaved changes confirmation).
   - **Fix**: Dispatch a cancelable `cg-modal-before-close` event and check `event.defaultPrevented` before closing.

4. **Scroll lock race condition** (lines 275-278): If two modals are open simultaneously, they overwrite each other's `_previousOverflow`. The second modal restoring overflow will set the wrong value.
   - **Fix**: Use a shared scroll-lock counter or stack approach.

5. **Footer slot empty detection fragile** (line 397): Inline `style="display:none"` on the footer is not ideal; it can flash visible before the slotchange fires.
   - **Fix**: Use a CSS class toggled by the state, or default `_hasFooter = false` and only show via CSS class.

---

## 2. Interaction Issues

### 2.1 State Coverage

| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default (closed) | ✅ | ✅ | Properly hidden via `pointer-events: none` + `opacity: 0` |
| Default (open) | ✅ | ✅ | Scale + fade animation |
| Hover | ✅ | ✅ | Close button hover uses token |
| Active | ✅ | ✅ | Close button press scale uses `--cg-interaction-press-scale` |
| Focus | ✅ | ✅ | Close button focus-visible ring uses tokens |
| Disabled | ❌ | N/A | No disabled state for the modal itself; no visual indication when `closable=false` removes the button |
| Loading | ❌ | N/A | No loading state (e.g., async confirmation pending) |
| Error | ❌ | N/A | No error state (e.g., form validation failure in modal) |
| Success | ❌ | N/A | No success state (e.g., action completed before auto-close) |

### 2.2 Keyboard Navigation
- **Escape**: Handled correctly (line 312), respects `closable` property.
- **Tab / Shift+Tab**: Focus trap implemented (lines 318-340).
- **Issue**: Focus trap only covers shadow DOM elements; slotted content is excluded (see Functional Issue #1).

### 2.3 Focus Management
- **Initial focus**: Moves to first focusable element on open (line 285). Falls back to the modal panel itself.
- **Return focus**: Restores focus to `_previousFocus` on close (lines 298-301).
- **Issue**: `_previousFocus` is not cleared if the element is removed from DOM while the modal is open, which could cause an error on `focus()`.

### 2.4 ARIA & Accessibility
- `role="dialog"` and `aria-modal="true"` are present (lines 372-373).
- `aria-label` falls back to "Dialog" when no title (line 374).
- Close button has `aria-label="Close dialog"` (line 383).
- **Missing**: `aria-describedby` pointing to the body content for screen reader context.
- **Missing**: The `<h2>` title should be referenced via `aria-labelledby` instead of duplicating the title string in `aria-label`.

### 2.5 Touch & Mobile
- Backdrop click to close works (line 343).
- **Missing**: No swipe-to-dismiss gesture for mobile.
- **Missing**: No `touch-action` CSS for preventing scroll-through on iOS.
- Size variants cap at `max-width: 100%` which is good for mobile.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Value | Suggested Token |
|------|-------|-----------------|
| 39 | `z-index: 9998` | `--cg-z-index-overlay` or `--cg-z-index-modal-backdrop` |
| 56 | `z-index: 9999` | `--cg-z-index-modal` |
| 73 | `max-height: calc(100vh - 64px)` | `calc(100vh - var(--cg-spacing-64, 64px))` |
| 87 | `transform: scale(0.95)` | `--cg-motion-scale-enter` |
| 113 | `transform: scale(0.95)` (exit keyframe) | `--cg-motion-scale-exit` |
| 138 | `width: 400px` | `--cg-modal-width-sm` |
| 139 | `width: 560px` | `--cg-modal-width-md` |
| 140 | `width: 720px` | `--cg-modal-width-lg` |
| 141 | `width: 960px` | `--cg-modal-width-xl` |
| 163 | `width: 32px; height: 32px` | `--cg-size-icon-button` or `var(--cg-spacing-32, 32px)` |
| 172 | `font-size: 18px` | Should use `var(--cg-font-size-lg, 18px)` |
| 159 | `line-height: 1.3` | Should use `var(--cg-line-height-snug, 1.375)` |
| 207 | `line-height: 1.6` | Should use `var(--cg-line-height-relaxed, 1.625)` |

### 3.2 Raw Colors Found

| Line | Color | Suggested Token |
|------|-------|-----------------|
| 40 | `rgba(0, 0, 0, 0.6)` | `var(--cg-color-overlay-backdrop, rgba(0, 0, 0, 0.6))` |
| 76 | `rgba(24, 24, 27, 0.85)` | `var(--cg-color-surface-glass-background)` |
| 80 | `rgba(255, 255, 255, 0.05)` | `var(--cg-color-surface-glass-highlight)` |
| 81 | `rgba(0, 0, 0, 0.4)` | Should use elevation token |
| 82 | `rgba(0, 0, 0, 0.3)` | Should use elevation token |
| 98 | `opacity: 0.03` | `var(--cg-opacity-noise, 0.03)` |
| 150 | `rgba(255, 255, 255, 0.06)` | Already uses token as fallback, but the `border-image` gradient has inline `rgba` |

### 3.3 Typography Issues
- Title `line-height: 1.3` (line 159) should use `--cg-line-height-snug`.
- Body `line-height: 1.6` (line 207) should use `--cg-line-height-relaxed`.
- Close button `font-size: 18px` (line 172) is a magic number.

### 3.4 Spacing Issues
- Close button sizing (`32px`) should use a spacing token.
- Modal padding uses `--cg-spacing-16` and `--cg-spacing-24` correctly.
- The `64px` in `calc(100vh - 64px)` should reference `--cg-spacing-64`.

### 3.5 Modern Design Enhancements
- Glassmorphism backdrop-filter is already present -- good.
- Noise texture overlay via SVG is already present -- good.
- **Add**: Subtle inner glow on open state for premium feel.
- **Add**: Entrance animation could use a slight `translateY` for more depth.
- **Add**: Scrollbar styling for `.modal-body` with custom thin scrollbar matching the design system.

---

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix focus trap to include slotted light DOM elements** -- Current trap excludes footer slot buttons, breaking keyboard-only navigation for the most common use case (confirm/cancel dialogs).

### P1 - High
2. **Replace all raw `rgba()` colors with semantic tokens** -- 7 instances of raw colors violate the token-first design system rule.
3. **Add cancelable `cg-modal-before-close` event** -- Essential for form modals with unsaved changes.
4. **Add `aria-labelledby` referencing the title `<h2>`** instead of duplicating the string in `aria-label`.
5. **Fix scroll lock for multiple concurrent modals** -- Use a reference counter.

### P2 - Medium
6. **Replace all magic numbers with tokens** -- z-index, widths, sizes, line-heights.
7. **Use `animationend` instead of hardcoded timeout** for closing animation.
8. **Add loading/error/success visual states** with corresponding CSS classes and token-based styling.
9. **Add `aria-describedby`** pointing to the body slot for screen readers.
10. **Guard `_previousFocus.focus()`** against removed elements.

### P3 - Low
11. **Add custom scrollbar styling** for the modal body overflow.
12. **Add swipe-to-dismiss** for mobile touch interaction.
13. **Add slight `translateY` to entrance animation** for more depth.
14. **Add `touch-action: none`** to backdrop to prevent iOS scroll-through.
