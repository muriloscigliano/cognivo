# CgDatePicker Improvement Plan

**Component**: `cg-date-picker`
**Category**: Foundation
**File**: `src/components/cg-date-picker/cg-date-picker.ts`
**Priority**: P1-High

---

## Executive Summary

**Overall Health**: Needs Work
**Top 3 Issues**:
1. Extremely minimal implementation — no label, no helper text, no floating label, no success state, no loading state
2. No label support at all — the input has no visible label, only native date picker UI
3. Raw rgba in box-shadow values and raw px for min-height

---

## 1. Functional Issues

- **No label property**: Unlike `cg-input` and `cg-textarea`, this component has no `label` property, no floating label, and no visible label rendering. The only accessible name comes from the native `<input type="date">` implicit semantics.
- **No helper text**: No `helper` property for validation messages or instructions.
- **No success state**: No `success` property — only `error` is supported.
- **No loading state**: No visual indicator during async validation.
- **No clear/reset mechanism**: No way to programmatically or visually clear the date.
- **No size variants**: No `size` property — always renders at a single size.
- **Line 18**: `min-height: 40px` — raw px, should use input height token.
- **Line 24**: `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` — raw rgba.
- **Line 29**: `0 0 0 3px` focus ring — inconsistent with dual-ring pattern used in other components (which use `0 0 0 2px bg + 0 0 0 4px accent`).
- **Native date picker styling**: The native browser date picker icon/calendar cannot be styled in Shadow DOM, creating visual inconsistency with the design system.
- **No `label` ARIA**: `aria-invalid` is set (line 63) but no `aria-label` or `aria-labelledby`.

---

## 2. Interaction Issues

### 2.1 State Coverage

| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | ✅ | ✅ | Border and background tokens |
| Hover | ✅ | ✅ | Line 28 — border-color on hover |
| Active | ❌ | ❌ | No pressed state visual |
| Focus | ✅ | Partial | Line 29 — focus ring uses single 3px ring, not dual ring |
| Disabled | ✅ | Partial | Line 30 — opacity 0.5, raw opacity value |
| Loading | ❌ | ❌ | No loading state |
| Error | ✅ | ✅ | Line 31 — error border |
| Success | ❌ | ❌ | No success state |

### 2.2 Keyboard Navigation
- Keyboard: Delegated entirely to native `<input type="date">`
- Tab: Works natively
- Arrow keys: Work within the native date picker
- No custom keyboard enhancements needed for native input

### 2.3 ARIA & Accessibility
- `aria-invalid` set (line 63) — correct
- **Missing**: `aria-label` or visible label — critical accessibility gap
- **Missing**: `aria-describedby` for helper/error text
- **Missing**: `aria-required` for required fields
- **Missing**: Associated label element

### 2.4 Touch & Mobile
- Native `<input type="date">` has good mobile support
- `min-height: 40px` is adequate but not great for touch (44px recommended)
- No mobile-specific enhancements

---

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Value | Proposed Token |
|------|-------|----------------|
| 18 | `min-height: 40px` | `var(--cg-component-input-height-md, 40px)` |
| 24 | `rgba(255, 255, 255, 0.05)` shadow | `var(--cg-overlay-light-subtle)` |
| 25 | `rgba(255, 255, 255, 0.05)` focus shadow | `var(--cg-overlay-light-subtle)` |
| 29 | `0 0 0 3px` focus ring | Should be dual ring: `0 0 0 2px bg, 0 0 0 4px accent` |

### 3.2 Raw Colors Found

| Line | Value | Proposed Token |
|------|-------|----------------|
| 24 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-light-subtle)` |
| 25 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-light-subtle)` |

### 3.3 Typography Issues

No raw typography — font-size uses token.

### 3.4 Spacing Issues

No raw spacing beyond min-height.

### 3.5 Modern Design Enhancements
- **Add floating label**: Match `cg-input` pattern with floating label animation
- **Add helper text**: Consistent with other form controls
- **Upgrade focus ring**: Use dual-ring pattern (2px bg + 4px accent) for consistency
- **Add custom date picker**: Consider a custom calendar dropdown for full design system control instead of native
- **Add date range support**: Min/max with visual calendar
- **Add clear button**: Allow clearing the selected date
- **Style the native calendar icon**: Use `::webkit-calendar-picker-indicator` pseudo-element

---

## 4. Prioritized Fixes

### P0 - Critical
- [ ] Add `label` property with visible label rendering (floating or static)
- [ ] Add `aria-label` or `aria-labelledby` for accessibility
- [ ] Upgrade focus ring to dual-ring pattern for consistency with other form controls

### P1 - High
- [ ] Add `helper` property with helper/error message display
- [ ] Add `success` property with success border styling
- [ ] Add `loading` state
- [ ] Add `size` variants (sm/md/lg) matching other form controls
- [ ] Replace raw rgba box-shadow colors with overlay tokens (lines 24-25)
- [ ] Add `aria-required` and `aria-describedby` support
- [ ] Add error focus ring (dual-ring with error color) matching cg-input pattern

### P2 - Medium
- [ ] Tokenize min-height (line 18) with component input height token
- [ ] Add active/pressed state visual
- [ ] Add clear button to reset date
- [ ] Style `::webkit-calendar-picker-indicator` to match design system
- [ ] Add `name` property documentation and form participation

### P3 - Low
- [ ] Consider custom calendar dropdown for full design control
- [ ] Add date range selection mode
- [ ] Add date format display customization
- [ ] Add glassmorphism background option
