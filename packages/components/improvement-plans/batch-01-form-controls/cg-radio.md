# CgRadio Improvement Plan

**Component**: `cg-radio`
**Category**: Foundation
**File**: `src/components/cg-radio/cg-radio.ts`
**Priority**: P2-Medium

---

## Executive Summary

**Overall Health**: Good
**Top 3 Issues**:
1. Multiple magic numbers — raw px for gap, padding, dimensions, font sizes not using tokens
2. No error or loading states
3. Missing `user-select: none` on the label element (present on checkbox but not here)

---

## 1. Functional Issues

- **Line 32**: No `user-select: none` on the label — text can be inadvertently selected during rapid clicking.
- **Lines 38-39**: Circle is `20px` with `2px` border — raw values not tokenized.
- **Line 77-78**: Dot is `10px` — raw value, should be derived from circle size token.
- **No form association**: Hidden input exists but no `ElementInternals`.
- **No error state**: Radio buttons in forms often need error indication.
- **No success state**: No valid-state visual feedback.
- **Line 139**: Both Space and Enter trigger select — WAI-ARIA radio pattern only requires Space, Enter should be reserved for form submission in some contexts.

---

## 2. Interaction Issues

### 2.1 State Coverage

| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | ✅ | ✅ | Gray border, transparent background |
| Hover | ✅ | ✅ | Line 54 — border color changes to accent |
| Active | ✅ | ✅ | Line 59 — scale(0.9) press effect |
| Focus | ✅ | ✅ | Line 64-69 — dual ring focus |
| Disabled | ✅ | ✅ | Line 33 — opacity + cursor |
| Loading | ❌ | ❌ | No loading state |
| Error | ❌ | ❌ | No error state |
| Success | ❌ | ❌ | No success state |

### 2.2 Keyboard Navigation
- Space and Enter: Both trigger select (line 139)
- Tab: Via `tabindex` on label (line 133)
- Arrow keys: Not handled here — delegated to `cg-radio-group` (correct pattern)
- WAI-ARIA note: Standard radio pattern uses Space only for selection; Enter should not select in a radiogroup context

### 2.3 ARIA & Accessibility
- `role="radio"` on label (line 134) — correct
- `aria-checked` set (line 136) — correct
- `aria-disabled` set (line 137) — correct
- **Missing**: `aria-describedby` for description text
- **Missing**: `aria-required` (typically set on the group, but can be on individual radios)

### 2.4 Touch & Mobile
- Circle is `20px` (line 38) — below 44px target. Label area extends the hit area, but the visual target is small.
- No `-webkit-tap-highlight-color: transparent` set (unlike checkbox)

---

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Value | Proposed Token |
|------|-------|----------------|
| 29 | `gap: 10px` | `var(--cg-spacing-10, 10px)` or `var(--cg-spacing-12)` |
| 30 | `padding: 4px 0` | `var(--cg-spacing-4) 0` |
| 38 | `width: 20px; height: 20px` circle | `var(--cg-component-radio-size, 20px)` |
| 40 | `margin-top: 1px` | Optical alignment token |
| 41 | `border: 2px solid` | `var(--cg-border-width-100, 2px)` |
| 78 | `width: 10px; height: 10px` dot | `var(--cg-component-radio-dot-size, 10px)` |
| 101 | `gap: 2px` text-group | `var(--cg-spacing-2)` |
| 103 | `font-size: 14px` label | `var(--cg-font-size-sm)` |
| 104 | `font-weight: 500` | `var(--cg-font-weight-medium)` |
| 109 | `font-size: 12px` description | `var(--cg-font-size-xs)` |

### 3.2 Raw Colors Found

No raw hex or rgba colors found outside of token fallbacks — this component is clean on colors.

### 3.3 Typography Issues
- Line 103: `font-size: 14px` — use `var(--cg-font-size-sm)`
- Line 104: `font-weight: 500` — use `var(--cg-font-weight-medium)`
- Line 109: `font-size: 12px` — use `var(--cg-font-size-xs)`

### 3.4 Spacing Issues
- Line 29: `gap: 10px` — not on standard scale
- Line 30: `padding: 4px 0` — raw px
- Line 40: `margin-top: 1px` — raw optical alignment
- Line 101: `gap: 2px` — raw px

### 3.5 Modern Design Enhancements
- Add subtle glow pulse on the checked dot
- Add ripple effect on click
- Add error state with red circle border
- Add size variants (sm/md/lg)
- Consider a subtle scale-up micro-animation on hover for the entire row

---

## 4. Prioritized Fixes

### P0 - Critical
- [ ] Add `aria-describedby` linking to description element
- [ ] Add `-webkit-tap-highlight-color: transparent` for consistency with checkbox

### P1 - High
- [ ] Add error state (`error` property with red border)
- [ ] Add success state styling
- [ ] Add loading state
- [ ] Add `user-select: none` on label (line 28)
- [ ] Replace raw font sizes/weights with tokens (lines 103-109)

### P2 - Medium
- [ ] Tokenize circle dimensions (line 38)
- [ ] Tokenize dot dimensions (line 78)
- [ ] Tokenize gap and padding (lines 29-30)
- [ ] Tokenize border width (line 41)
- [ ] Tokenize text-group gap (line 101)
- [ ] Add size variants (sm/md/lg)

### P3 - Low
- [ ] Add glow pulse effect on checked dot
- [ ] Add ripple animation on click
- [ ] Implement `ElementInternals` for form participation
- [ ] Remove Enter key handler (line 139) to follow WAI-ARIA radio pattern strictly
