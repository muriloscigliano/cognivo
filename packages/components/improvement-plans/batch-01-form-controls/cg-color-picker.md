# CgColorPicker Improvement Plan

**Component**: `cg-color-picker`
**Category**: Foundation
**File**: `src/components/cg-color-picker/cg-color-picker.ts`
**Priority**: P2-Medium

---

## Executive Summary

**Overall Health**: Good
**Top 3 Issues**:
1. Inline `style` attribute with raw background color on swatches (line 162) and preview (line 168) — could enable CSS injection if color values are not sanitized
2. Grid template columns use raw `28px` (line 151) — should use token
3. No error, loading, or disabled states

---

## 1. Functional Issues

- **Line 151**: `style="grid-template-columns: repeat(${this.columns}, 28px)"` — inline style with raw `28px`, should use a CSS custom property or token.
- **Line 162**: `style="background:${c}"` — renders user-provided color strings directly into style attribute. If colors come from untrusted sources, this could allow CSS injection. Should sanitize or use CSS custom properties.
- **Line 168**: `style="background:${this.value || 'var(--cg-color-surface-container-background, #18181b)'}"` — mixing inline style with token fallback is inconsistent.
- **Lines 6-10**: `DEFAULT_COLORS` array contains raw hex colors — these are data values (color options), not styling, so they are acceptable. However, the component could offer named palette presets using design tokens.
- **Line 143**: Hex validation regex `/^#([0-9a-fA-F]{3}){1,2}$/` — does not support 8-character hex with alpha (e.g., `#ff000080`). Should extend to support `{1,2,4}` groups.
- **No disabled state**: No way to disable the picker.
- **No error state**: No validation feedback.
- **No loading state**: No async loading indicator.

---

## 2. Interaction Issues

### 2.1 State Coverage

| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | ✅ | ✅ | Grid layout with token gaps |
| Hover | ✅ | ✅ | Line 48 — scale(1.1) on hover |
| Active | ✅ | ✅ | Line 49 — press scale token |
| Focus | ✅ | ✅ | Lines 65-70 — dual ring focus |
| Disabled | ❌ | ❌ | No disabled state |
| Loading | ❌ | ❌ | No loading state |
| Error | ❌ | ❌ | No error state |
| Success | ❌ | ❌ | No success state |

### 2.2 Keyboard Navigation
- Arrow keys: Grid navigation implemented (lines 120-137) — left/right/up/down with column awareness
- Enter/Space: Select color (lines 128-131)
- Tab: Via swatch tabindex (line 159) — first or selected swatch is tabbable
- **Missing**: Home/End for first/last swatch
- **Missing**: Escape to close or deselect
- Hex input field: Standard text input keyboard support

### 2.3 ARIA & Accessibility
- `role="radiogroup"` on grid (line 152) — correct
- `aria-label` on grid (line 153) — correct
- `role="radio"` on swatches (line 156) — correct
- `aria-checked` on swatches (line 157) — correct
- `aria-label` on swatches uses hex value (line 158) — not ideal for screen readers; should use color name if available
- `aria-label="Custom hex color"` on input (line 173) — correct
- **Missing**: `aria-invalid` on hex input for invalid color format
- **Missing**: `aria-describedby` for helper text or format hint

### 2.4 Touch & Mobile
- Swatch size `28px` (lines 38-39) — below 44px touch target. Should add padding or increase size on touch devices.
- Grid gap `4px` (line 34) — tight for finger targeting
- Hex input: Standard touch keyboard support

---

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Value | Proposed Token |
|------|-------|----------------|
| 38-39 | `width: 28px; height: 28px` swatch | `var(--cg-component-color-swatch-size, 28px)` |
| 54 | `border-radius: 6px` fill | `var(--cg-border-radius-75, 6px)` |
| 55 | `border: 1px solid rgba(255, 255, 255, 0.1)` fill border | `var(--cg-border-width-50, 1px) solid var(--cg-overlay-light-subtle)` |
| 151 | `28px` in grid-template-columns | `var(--cg-component-color-swatch-size, 28px)` |

### 3.2 Raw Colors Found

| Line | Value | Proposed Token |
|------|-------|----------------|
| 55 | `rgba(255, 255, 255, 0.1)` | `var(--cg-overlay-light-subtle)` |

### 3.3 Typography Issues

No raw typography values — all use tokens.

### 3.4 Spacing Issues

No raw spacing — all gaps and margins use tokens.

### 3.5 Modern Design Enhancements
- Add a color spectrum/wheel picker for fine-grained selection (not just swatches)
- Add HSL/RGB input modes alongside hex
- Add opacity/alpha slider
- Add color name display (resolve hex to CSS named color when possible)
- Add "recently used" colors section
- Add glassmorphism panel with backdrop-filter for the custom input area
- Increase swatch size or add padding for better touch targets

---

## 4. Prioritized Fixes

### P0 - Critical
- [ ] Sanitize color values before rendering in inline `style` attributes (lines 162, 168) — validate hex format
- [ ] Add `disabled` property with proper disabled styling and ARIA

### P1 - High
- [ ] Add error state (invalid color input, validation feedback)
- [ ] Add loading state
- [ ] Replace raw swatch border rgba (line 55) with overlay token
- [ ] Tokenize swatch dimensions (lines 38-39) and grid column width (line 151)
- [ ] Increase touch target size for swatches (minimum 44px or add padding)
- [ ] Improve swatch `aria-label` — use color names instead of raw hex when possible

### P2 - Medium
- [ ] Tokenize fill border-radius (line 54)
- [ ] Extend hex validation to support 8-character alpha hex (line 143)
- [ ] Add Home/End keyboard shortcuts for first/last swatch
- [ ] Add `aria-invalid` on hex input for invalid format
- [ ] Add `aria-describedby` with format hint (e.g., "Enter hex color like #ff0000")
- [ ] Add success state for valid custom color input

### P3 - Low
- [ ] Add color spectrum/wheel picker
- [ ] Add HSL/RGB input modes
- [ ] Add opacity/alpha slider
- [ ] Add recently used colors section
- [ ] Add named color display
