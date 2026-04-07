# CgNumberInput Improvement Plan

**Component**: `cg-number-input`
**Category**: Foundation
**File**: `src/components/cg-number-input/cg-number-input.ts`
**Priority**: P2-Medium

---

## Executive Summary

**Overall Health**: Good
**Top 3 Issues**:
1. No error or success states — essential for form validation
2. Touch event handlers (`@touchstart`) do not call `e.preventDefault()`, causing potential double-fire with mouse events on hybrid devices
3. Missing label-to-input connection via `aria-labelledby` or `for`/`id`

---

## 1. Functional Issues

- **Lines 161-162**: `@touchstart` handlers on buttons don't prevent default, so on touch devices both the touch and synthesized mouse events may fire, causing double increment/decrement.
- **Line 139-141**: `_onInput` parses value on every keystroke — if user types `-` to start a negative number, `parseFloat('-')` returns `NaN` and the value is silently ignored. This makes typing negative numbers awkward.
- **Line 107**: `_repeatTimer` is `number` type but initialized to `0` — when `clearTimeout(0)` is called, it clears nothing. Not a bug per se, but using `undefined` or `null` would be more semantically correct.
- **No error state**: Missing error border, icon, or message.
- **No success state**: Missing success visual feedback.
- **No loading state**: Missing loading indicator.
- **No form association**: Missing `ElementInternals`.
- **Line 94**: `.label` class uses `display: block` — label sits above the input, which is correct, but there is no `id` connection between label and input for accessibility tools.

---

## 2. Interaction Issues

### 2.1 State Coverage

| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | ✅ | ✅ | Border and background tokens |
| Hover | ✅ | ✅ | Line 35 — border-color on hover |
| Active | ✅ | ✅ | Line 61 — press scale on buttons |
| Focus | ✅ | ✅ | Lines 29-33 — dual ring focus on wrapper |
| Disabled | ✅ | ✅ | Line 37 — opacity + cursor, buttons disabled |
| Loading | ❌ | ❌ | No loading state |
| Error | ❌ | ❌ | No error state |
| Success | ❌ | ❌ | No success state |

### 2.2 Keyboard Navigation
- ArrowUp/ArrowDown: Increment/decrement (lines 145-146) — correct
- Direct typing: Works via text input (line 165)
- Tab: Focuses the input; buttons are separate tab stops
- Long-press repeat on buttons: Implemented with accelerating speed (lines 126-136) — excellent UX
- **Missing**: Page Up/Page Down for larger step jumps
- **Missing**: Home/End for min/max jumps

### 2.3 ARIA & Accessibility
- `role="spinbutton"` on input (line 166) — correct
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax` set (lines 167-169) — correct
- `aria-label` set (line 170) — correct
- Buttons have `aria-label` ("Decrease"/"Increase") — correct
- **Missing**: Label element is not connected to input via `id`/`for` or `aria-labelledby`
- **Missing**: `aria-invalid` for error state
- **Missing**: `aria-required` for required fields

### 2.4 Touch & Mobile
- **Touch event issue**: `@touchstart` without `preventDefault()` causes double-fire (lines 161, 181)
- Button sizes are adequate: 28px (sm), 36px (md), 44px (lg) — sm is below 44px target
- Long-press repeat works on touch via `@touchstart`/`@touchend`

---

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Value | Proposed Token |
|------|-------|----------------|
| 21 | `border: 1px solid` | `var(--cg-border-width-50, 1px)` |
| 69 | `width: 14px; height: 14px` button SVG | `var(--cg-component-icon-size-xs, 14px)` |
| 72 | `width: 28px; height: 28px` sm button | `var(--cg-component-number-btn-size-sm, 28px)` |
| 73 | `width: 36px; height: 36px` md button | `var(--cg-component-number-btn-size-md, 36px)` |
| 74 | `width: 44px; height: 44px` lg button | `var(--cg-component-number-btn-size-lg, 44px)` |
| 90 | `width: 40px; height: 28px` sm input | Component tokens |
| 91 | `width: 52px; height: 36px` md input | Component tokens |
| 92 | `width: 64px; height: 44px` lg input | Component tokens |

### 3.2 Raw Colors Found

No raw hex or rgba colors outside of token fallbacks. This component is clean on colors.

### 3.3 Typography Issues

All font sizes use tokens correctly.

### 3.4 Spacing Issues

No raw spacing values — margins and gaps use tokens.

### 3.5 Modern Design Enhancements
- Add subtle press ripple on increment/decrement buttons
- Add a micro-animation on value change (number rolls up/down)
- Add error state with red border and optional error message
- Add success state with green border
- Consider a "compact" variant where buttons are stacked vertically
- Add glassmorphism option for the wrapper background

---

## 4. Prioritized Fixes

### P0 - Critical
- [ ] Fix touch event double-fire: add `{ passive: false }` listener and `preventDefault()` on touchstart, or use `pointerdown`/`pointerup` instead (lines 161, 181)
- [ ] Add error state with `error` property, red border, and `aria-invalid`

### P1 - High
- [ ] Add success state styling
- [ ] Add loading state
- [ ] Connect label to input via `aria-labelledby` or `id`/`for`
- [ ] Add `aria-required` support
- [ ] Fix negative number typing: allow intermediate states (e.g., "-", "-.") without parsing

### P2 - Medium
- [ ] Tokenize button and input dimensions for size variants (lines 72-92)
- [ ] Tokenize button SVG icon size (line 69)
- [ ] Tokenize border width (line 21)
- [ ] Add Page Up/Page Down for larger step changes
- [ ] Add Home/End for jumping to min/max values
- [ ] Implement `ElementInternals` for form participation

### P3 - Low
- [ ] Add value change micro-animation (number scroll effect)
- [ ] Add press ripple on buttons
- [ ] Add compact vertical button layout variant
- [ ] Add glassmorphism wrapper option
