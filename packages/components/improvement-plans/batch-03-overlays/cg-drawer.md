# cg-drawer Improvement Plan

**Component**: `cg-drawer`
**Category**: Foundation
**File**: `src/components/cg-drawer/cg-drawer.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Multiple raw `rgba()` colors for glassmorphism background, box-shadow, and backdrop (lines 39, 62, 65-67, 68)
2. Magic numbers in CSS (z-index `9998`/`9999`, sizes `320px`/`480px`/`640px`, close button `32px`/`18px`)
3. No footer slot, no loading/error/success states, no top/bottom drawer positions

---

## 1. Functional Issues

1. **No return focus on close** (lines 262-266): Unlike `cg-modal`, the drawer does not save or restore the previously focused element when opening/closing. Keyboard users lose their place in the page.
   - **Fix**: Save `document.activeElement` in `_onOpen()` and call `.focus()` on it in `_onClose()`.

2. **Close animation timeout is hardcoded** (line 232): `setTimeout(() => { this._closing = false; }, 200)` should listen for `animationend` instead.
   - **Fix**: Add an `animationend` listener on the panel element.

3. **No cancelable close event** (line 326-328): `_requestClose()` directly sets `open = false`. Consumers cannot prevent closure.
   - **Fix**: Dispatch a cancelable `cg-drawer-before-close` event.

4. **Scroll lock race condition** (lines 240-241): Same issue as `cg-modal` -- multiple drawers/modals overwrite each other's `_previousOverflow`.
   - **Fix**: Use a shared scroll-lock utility with a reference counter.

5. **No footer slot** (entire template): The drawer lacks a footer area for action buttons, which is a common pattern for settings panels and forms.
   - **Fix**: Add a `<slot name="footer">` with a sticky footer area at the bottom of the panel.

6. **No top/bottom drawer positions**: Only `left` and `right` sides are supported. Bottom drawers (sheet pattern) are extremely common on mobile.
   - **Fix**: Add `side="top"` and `side="bottom"` with corresponding CSS transforms and border-radius rules.

---

## 2. Interaction Issues

### 2.1 State Coverage

| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default (closed) | ✅ | ✅ | Panel transformed off-screen |
| Default (open) | ✅ | ✅ | Slide-in with bounce easing |
| Hover | ✅ | ✅ | Close button hover state |
| Active | ✅ | ✅ | Close button press scale |
| Focus | ✅ | ✅ | Close button focus-visible ring |
| Disabled | ❌ | N/A | No disabled state concept |
| Loading | ❌ | N/A | No loading state for async content |
| Error | ❌ | N/A | No error state |
| Success | ❌ | N/A | No success state |

### 2.2 Keyboard Navigation
- **Escape**: Handled correctly (line 278), respects `closable`.
- **Tab / Shift+Tab**: Focus trap implemented in `_trapFocus()` (lines 289-318).
- **Good**: Focus trap includes both shadow and light DOM focusable elements (lines 294-296).

### 2.3 Focus Management
- **Initial focus**: Moves to first focusable element on open (lines 250-258). Falls back to the panel itself.
- **Return focus**: **NOT IMPLEMENTED**. This is a significant a11y gap.
- **Focus trap**: Properly wraps between first and last focusable elements.

### 2.4 ARIA & Accessibility
- `role="dialog"` and `aria-modal="true"` on the panel (lines 339-340).
- `aria-label` falls back to "Side panel" (line 341).
- Close button has `aria-label="Close panel"` (line 350).
- **Missing**: `aria-labelledby` referencing the title `<h2>` element.
- **Missing**: No `aria-describedby` for body content description.

### 2.5 Touch & Mobile
- Backdrop click to close works (line 320-324).
- **Missing**: No swipe-to-dismiss gesture (swipe left/right to close).
- **Missing**: No bottom-sheet mode for mobile.
- `max-width: 85vw` / `90vw` is good for preventing overflow.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Value | Suggested Token |
|------|-------|-----------------|
| 38 | `z-index: 9998` | `--cg-z-index-overlay-backdrop` |
| 57 | `z-index: 9999` | `--cg-z-index-overlay` |
| 125 | `width: 320px` | `--cg-drawer-width-sm` |
| 126 | `width: 480px` | `--cg-drawer-width-md` |
| 127 | `width: 640px` | `--cg-drawer-width-lg` |
| 125-127 | `max-width: 85vw` / `90vw` | `--cg-drawer-max-width` |
| 156 | `width: 32px; height: 32px` | `var(--cg-spacing-32, 32px)` |
| 163 | `font-size: 18px` | `var(--cg-font-size-lg, 18px)` |
| 164 | `line-height: 1` | Should use `--cg-line-height-none` |

### 3.2 Raw Colors Found

| Line | Color | Suggested Token |
|------|-------|-----------------|
| 39 | `rgba(0, 0, 0, 0.5)` | `var(--cg-color-overlay-backdrop)` |
| 62 | `rgba(24, 24, 27, 0.85)` | `var(--cg-color-surface-glass-background)` |
| 65 | `rgba(255, 255, 255, 0.05)` | `var(--cg-color-surface-glass-highlight)` |
| 66 | `rgba(0, 0, 0, 0.4)` | Elevation token |
| 67 | `rgba(0, 0, 0, 0.3)` | Elevation token |
| 68 | `rgba(255, 255, 255, 0.03)` | `var(--cg-color-surface-glass-gradient)` |

### 3.3 Typography Issues
- Close button `font-size: 18px` (line 163) is a magic number.
- `line-height: 1` on close button (line 164) should use a named token.

### 3.4 Spacing Issues
- Close button sizing `32px` should use `var(--cg-spacing-32)`.
- All other spacing uses tokens correctly.

### 3.5 Modern Design Enhancements
- Glassmorphism backdrop-filter present -- good.
- Background gradient overlay present -- good.
- **Add**: Noise texture overlay (like `cg-modal` has) for consistent visual treatment.
- **Add**: Custom scrollbar styling for the body overflow area.
- **Add**: Drag handle indicator for mobile (a small pill at the top of bottom-sheet variant).
- **Add**: Resize handle for desktop power users.

---

## 4. Prioritized Fixes

### P0 - Critical
1. **Add return focus on close** -- Without this, keyboard users lose their place on the page after interacting with the drawer. This is a WCAG 2.1 SC 2.4.3 failure.

### P1 - High
2. **Replace all raw `rgba()` colors with semantic tokens** -- 6 instances violate the design system contract.
3. **Add cancelable `cg-drawer-before-close` event** -- Essential for form drawers with unsaved changes.
4. **Add `aria-labelledby`** referencing the drawer title.
5. **Replace magic numbers with tokens** -- z-index, widths, close button sizing.

### P2 - Medium
6. **Add footer slot** with sticky positioning for action buttons.
7. **Add top/bottom drawer positions** for mobile bottom-sheet pattern.
8. **Use `animationend`** instead of hardcoded timeout for closing animation.
9. **Add loading/error/success states** with visual indicators.
10. **Add noise texture overlay** for visual consistency with `cg-modal`.
11. **Fix scroll lock** to use a shared reference counter.

### P3 - Low
12. **Add swipe-to-dismiss gesture** for mobile.
13. **Add custom scrollbar styling** for the body area.
14. **Add resize handle** for desktop users.
15. **Add drag handle pill** for bottom-sheet variant.
