# CgInput Improvement Plan

**Component**: `cg-input`
**Category**: Foundation
**File**: `src/components/cg-input/cg-input.ts`
**Priority**: P2-Medium

---

## Executive Summary

**Overall Health**: Good
**Top 3 Issues**:
1. Multiple magic numbers in CSS (raw px values for padding, font-size, dimensions not wrapped in tokens)
2. No loading state implemented
3. Raw rgba() colors used in box-shadow and clear button background instead of semantic tokens

---

## 1. Functional Issues

- **Line 130**: `padding: 6px 0;` for small size input — raw px, should use token. Also, the `6px` value does not align to the spacing scale.
- **Line 131**: `padding: 10px 0;` for large size input — raw px, should use token.
- **Lines 135-137**: `padding-top: 14px; padding-bottom: 2px;` — magic numbers for floating label offset, not tokenized.
- **Lines 139-140**: `padding-top: 12px; padding-bottom: 1px;` — magic numbers for sm floating label offset.
- **Lines 143-144**: `padding-top: 18px; padding-bottom: 4px;` — magic numbers for lg floating label offset.
- **Line 289**: `maxlength` defaults to `0` which is falsy — works for conditional rendering but could be confusing if a consumer explicitly sets `maxlength="0"` expecting a zero-length constraint.
- **No form association**: The component does not implement `ElementInternals` for form participation. Native form submit will not include this field's value.

---

## 2. Interaction Issues

### 2.1 State Coverage

| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | ✅ | ✅ | Border and background use tokens with fallbacks |
| Hover | ✅ | ✅ | Line 61 — border-color changes on hover |
| Active | ❌ | ❌ | No `:active` / pressed visual feedback on wrapper |
| Focus | ✅ | ✅ | Line 66 — dual ring focus style |
| Disabled | ✅ | ✅ | Line 96 — opacity-based, uses token background |
| Loading | ❌ | ❌ | No loading state whatsoever |
| Error | ✅ | ✅ | Line 74 — error border and focus ring |
| Success | ✅ | ✅ | Line 85 — success border and focus ring |

### 2.2 Keyboard Navigation
- Tab: Works via native `<input>` element
- Escape: No handler to clear or dismiss
- Enter: No handler (would be useful for form submission signal)
- Clear button has `tabindex="-1"` (line 356) — intentionally not focusable, but some users may expect to Tab to it

### 2.3 ARIA & Accessibility
- `aria-invalid` and `aria-label` are set correctly (lines 346-348)
- `aria-describedby="helper"` links to helper text (line 348) — good
- Missing `aria-required` property for required fields
- Missing `role="textbox"` (native `<input>` provides this implicitly, so acceptable)

### 2.4 Touch & Mobile
- No explicit touch target size enforcement — min-height 40px for md is adequate (meets 44px recommendation for lg only)
- Small size variant (`32px` min-height, line 49) falls below 44px touch target guideline

---

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Value | Proposed Token |
|------|-------|----------------|
| 40 | `rgba(255, 255, 255, 0.05)` in box-shadow | `var(--cg-overlay-light-subtle)` |
| 68 | `rgba(255, 255, 255, 0.05)` in box-shadow | `var(--cg-overlay-light-subtle)` |
| 130 | `6px 0` padding | `var(--cg-spacing-6, 6px) 0` or nearest spacing token |
| 131 | `10px 0` padding | `var(--cg-spacing-10, 10px) 0` or nearest spacing token |
| 135 | `14px` padding-top | `var(--cg-component-input-label-offset-md)` |
| 136 | `2px` padding-bottom | `var(--cg-spacing-2, 2px)` |
| 139 | `12px` padding-top | `var(--cg-component-input-label-offset-sm)` |
| 140 | `1px` padding-bottom | `var(--cg-spacing-1, 1px)` |
| 143 | `18px` padding-top | `var(--cg-component-input-label-offset-lg)` |
| 144 | `4px` padding-bottom | `var(--cg-spacing-4)` |
| 185 | `top: 4px` floating label | `var(--cg-spacing-4)` |
| 187 | `font-size: 10px` floating label | `var(--cg-font-size-2xs, 10px)` |
| 191 | `top: 2px` | `var(--cg-spacing-2, 2px)` |
| 192 | `font-size: 9px` | `var(--cg-font-size-3xs, 9px)` |
| 195 | `top: 6px` | `var(--cg-spacing-6, 6px)` |
| 196 | `font-size: 11px` | `var(--cg-font-size-2xs-alt, 11px)` |
| 230 | `width: 18px; height: 18px` clear button | `var(--cg-component-icon-size-sm, 18px)` |
| 233 | `rgba(255, 255, 255, 0.1)` clear bg | `var(--cg-overlay-light-subtle)` |
| 247 | `rgba(255, 255, 255, 0.15)` clear hover | `var(--cg-overlay-light-medium)` |
| 249 | `width: 10px; height: 10px` SVG icon | `var(--cg-component-icon-size-xs, 10px)` |
| 258 | `font-size: 0.7rem` count | `var(--cg-font-size-2xs, 0.7rem)` |
| 268 | `font-size: 12px` helper | `var(--cg-font-size-xs)` |
| 270 | `padding: 4px 12px 0` helper | `var(--cg-spacing-4) var(--cg-spacing-12) 0` |

### 3.2 Raw Colors Found

| Line | Value | Proposed Token |
|------|-------|----------------|
| 40 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-light-subtle)` |
| 68 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-light-subtle)` |
| 233 | `rgba(255, 255, 255, 0.1)` | `var(--cg-overlay-light-medium)` |
| 247 | `rgba(255, 255, 255, 0.15)` | `var(--cg-overlay-light-strong)` |

### 3.3 Typography Issues
- Line 258: `font-size: 0.7rem` — not a token value, use `var(--cg-font-size-2xs)`
- Line 268: `font-size: 12px` — should be `var(--cg-font-size-xs)`
- Lines 187, 192, 196: floated label font sizes are raw px

### 3.4 Spacing Issues
- Line 270: `padding: 4px 12px 0` — mixed raw px, use spacing tokens
- Lines 135-144: All floating label padding offsets are raw px

### 3.5 Modern Design Enhancements
- Add subtle glassmorphism to the wrapper: `backdrop-filter: blur(8px)` with a semi-transparent background
- Add a subtle gradient border on focus using a CSS pseudo-element
- Add a micro-interaction shake animation on error state entry
- Consider adding a loading spinner animation inside the suffix slot area
- Add a subtle inner glow on success state: `box-shadow: inset 0 0 8px var(--cg-overlay-success-subtle)`

---

## 4. Prioritized Fixes

### P0 - Critical
- [ ] Add `aria-required` support (new boolean property `required`)

### P1 - High
- [ ] Add loading state with spinner or pulsing animation
- [ ] Add active/pressed state visual feedback on wrapper
- [ ] Replace all raw `rgba()` colors with semantic overlay tokens (lines 40, 68, 233, 247)
- [ ] Replace raw px font sizes in floating label (lines 187, 192, 196) with tokens

### P2 - Medium
- [ ] Tokenize all padding magic numbers in floating label offsets (lines 135-144)
- [ ] Tokenize helper text font-size and padding (lines 268, 270)
- [ ] Tokenize character count font-size (line 258)
- [ ] Tokenize clear button dimensions (line 230) and SVG size (line 249)
- [ ] Implement `ElementInternals` for native form participation
- [ ] Add Escape key handler to clear input when clearable
- [ ] Ensure sm size meets 44px minimum touch target (add padding if needed)

### P3 - Low
- [ ] Add glassmorphism background option via CSS custom property
- [ ] Add error shake micro-animation
- [ ] Add success inner glow effect
- [ ] Add loading state with animated gradient or spinner
