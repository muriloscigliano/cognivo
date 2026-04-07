# CgOtpInput Improvement Plan

**Component**: `cg-otp-input`
**Category**: Foundation
**File**: `src/components/cg-otp-input/cg-otp-input.ts`
**Priority**: P2-Medium

---

## Executive Summary

**Overall Health**: Good
**Top 3 Issues**:
1. Stagger animation delays are hardcoded for exactly 6 cells (lines 40-45) — breaks for custom `length` values
2. No success state for valid OTP confirmation
3. No loading state for verification in progress

---

## 1. Functional Issues

- **Lines 40-45**: Animation delays are hardcoded `.box:nth-child(1)` through `.box:nth-child(6)` — if `length` is set to 4 or 8, the extra/missing delays cause incorrect animations. Should use CSS custom properties or inline styles for dynamic stagger.
- **Line 139**: `input.value.replace(/[^0-9]/g, '')` — restricts to digits only. Some OTP systems use alphanumeric codes (e.g., "A3B2C1"). Should support a `type` prop for alphanumeric.
- **Line 80**: Missing semicolon after `.box.filled` rule block — `.box.filled { ... }` is followed by an empty line with no closing of a comment or rule, but the CSS appears syntactically correct on inspection. The indentation on line 81 is suspicious (empty line in template literal).
- **No success state**: When OTP is verified, there's no green border/check feedback.
- **No loading state**: During async verification, no visual indicator.
- **No `name` property**: For form submission identification.
- **Line 82-85**: Global `:focus-visible` rule (line 82) applies to ALL focusable elements in shadow DOM, not just `.box` — overly broad selector.

---

## 2. Interaction Issues

### 2.1 State Coverage

| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | ✅ | ✅ | Border and background tokens |
| Hover | ✅ | ✅ | Line 52 — border-color on hover |
| Active | ❌ | ❌ | No pressed state visual |
| Focus | ✅ | ✅ | Lines 57-62 — dual ring + scale(1.05) |
| Disabled | ✅ | ✅ | Lines 64-66 — opacity + cursor |
| Loading | ❌ | ❌ | No loading state |
| Error | ✅ | ✅ | Lines 69-75 — red border on error |
| Success | ❌ | ❌ | No success state |

### 2.2 Keyboard Navigation
- Digit typing: Auto-advance to next box (line 144) — correct
- Backspace: Clears current and moves to previous (lines 148-159) — correct
- Arrow Left/Right: Navigate between boxes (lines 161-164) — correct
- Paste: Fills all boxes from clipboard (lines 168-179) — correct
- Tab: Works via individual input tabindex
- **Missing**: Escape key to clear all boxes
- **Missing**: Home/End to jump to first/last box

### 2.3 ARIA & Accessibility
- `role="group"` on container (line 183) — correct
- `aria-label="One-time password input"` (line 183) — correct
- Individual box `aria-label="Digit N of M"` (line 193) — excellent
- `autocomplete="one-time-code"` (line 192) — correct for OTP autofill
- **Missing**: `aria-invalid` on individual boxes in error state
- **Missing**: `aria-describedby` for error message text

### 2.4 Touch & Mobile
- Box dimensions 44x52 — meets 44px touch target requirement
- `inputmode="numeric"` (line 189) — triggers numeric keyboard on mobile
- Paste support (line 168) — good for autofill from SMS

---

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Value | Proposed Token |
|------|-------|----------------|
| 26 | `width: 44px` box | `var(--cg-component-otp-box-width, 44px)` |
| 27 | `height: 52px` box | `var(--cg-component-otp-box-height, 52px)` |
| 28 | `border: 1px solid` | `var(--cg-border-width-50, 1px)` |
| 40-45 | `animation-delay: 0/40/80/120/160/200ms` | Dynamic inline styles based on index |
| 48 | `translateY(4px) scale(0.95)` entry anim | Animation tokens |
| 62 | `transform: scale(1.05)` focus | `var(--cg-interaction-focus-scale, 1.05)` |

### 3.2 Raw Colors Found

No raw colors outside of token fallbacks — clean.

### 3.3 Typography Issues

No raw typography values — font-size, font-weight use tokens.

### 3.4 Spacing Issues

No raw spacing issues — gap uses `var(--cg-spacing-8)`.

### 3.5 Modern Design Enhancements
- Add success state with green border and check animation on all boxes
- Add a shake animation on error (common OTP UX pattern)
- Add loading state with pulsing or skeleton animation on boxes
- Add filled-dot animation when value enters a box (scale-in dot)
- Consider a dash/separator between groups (e.g., "_ _ _ - _ _ _" for 6-digit codes)
- Add auto-submit option when all digits filled (fire a verify event)

---

## 4. Prioritized Fixes

### P0 - Critical
- [ ] Fix hardcoded animation delays (lines 40-45) — use dynamic inline styles or CSS custom properties to support any `length` value
- [ ] Fix overly broad `:focus-visible` selector (line 82) — scope to `.box:focus-visible`

### P1 - High
- [ ] Add success state with green borders and check icon
- [ ] Add loading state (pulsing boxes during verification)
- [ ] Add shake animation on error state entry
- [ ] Add `aria-invalid` on individual boxes in error state
- [ ] Add `name` property for form submission

### P2 - Medium
- [ ] Tokenize box dimensions (lines 26-27)
- [ ] Tokenize border width (line 28)
- [ ] Add alphanumeric support via `type` property (digit-only vs alphanumeric)
- [ ] Add Home/End keyboard shortcuts for first/last box
- [ ] Add Escape to clear all boxes
- [ ] Add `aria-describedby` for error messages

### P3 - Low
- [ ] Add separator/dash between digit groups
- [ ] Add auto-submit option when fully filled
- [ ] Add filled-dot scale-in animation
- [ ] Implement `ElementInternals` for form participation
