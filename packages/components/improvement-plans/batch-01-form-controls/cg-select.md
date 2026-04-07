# CgSelect Improvement Plan

**Component**: `cg-select`
**Category**: Foundation
**File**: `src/components/cg-select/cg-select.ts`
**Priority**: P1-High

---

## Executive Summary

**Overall Health**: Fair
**Top 3 Issues**:
1. No loading state — common need for async option fetching
2. Multiple magic numbers in size variants (raw px for font-size, padding, min-height)
3. Click-outside handler uses `document.addEventListener` without Shadow DOM awareness — may leak or conflict in nested components

---

## 1. Functional Issues

- **Line 191**: `_handleClickOutside` checks `this.shadowRoot?.contains(e.target as Node)` — this won't work if the click target is inside a child component's shadow DOM. Composed path should be used: `e.composedPath().includes(this)`.
- **Lines 112-116**: Size variant styles use raw px: `font-size: 12px`, `padding: 0 8px`, `min-height: 32px` (sm) and `font-size: 16px`, `padding: 0 16px`, `min-height: 48px` (lg).
- **Line 46**: `min-height: 40px` is a raw value — should use `var(--cg-component-input-height-md)`.
- **Line 103-106**: Search input has no background or color tokens applied — it inherits but could look wrong in certain contexts.
- **Line 80**: `max-height: 240px` dropdown — not tokenized.
- **No multi-select support**: Common requirement for select components.
- **Line 171**: `Space` key triggers toggle even when dropdown is open (line 171), which could conflict with searchable mode where user types spaces.

---

## 2. Interaction Issues

### 2.1 State Coverage

| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | ✅ | ✅ | Trigger has proper border/background tokens |
| Hover | ✅ | ✅ | Line 51 — border-color on hover |
| Active | ❌ | ❌ | No pressed/active visual on trigger |
| Focus | ✅ | ✅ | Line 52 — focus-visible ring |
| Disabled | ✅ | ✅ | Line 54 — opacity + cursor |
| Loading | ❌ | ❌ | No loading state for async option fetching |
| Error | ✅ | ✅ | Lines 55-60 — error border and focus ring |
| Success | ✅ | ✅ | Lines 61-66 — success border and focus ring |

### 2.2 Keyboard Navigation
- Arrow keys: Work for navigating options (lines 179-187)
- Enter/Space: Toggle and select (lines 171-177) — Space conflicts in searchable mode
- Escape: Closes dropdown (line 170)
- Home/End: Not implemented for jumping to first/last option
- Tab: Should close dropdown and move focus — not handled

### 2.3 ARIA & Accessibility
- `role="combobox"` on trigger (line 205) — correct
- `aria-expanded` set (line 206) — correct
- `aria-haspopup="listbox"` (line 207) — correct
- `role="listbox"` on dropdown (line 219) — correct
- `role="option"` on options (line 234) — correct
- **Missing**: `aria-activedescendant` to communicate highlighted option to screen readers
- **Missing**: `aria-required` support
- **Missing**: `aria-label` or `aria-labelledby` on the trigger for accessible name
- **Missing**: `id` attributes on options for `aria-activedescendant` reference

### 2.4 Touch & Mobile
- sm variant trigger is only 32px (line 112) — below 44px touch target
- Dropdown scrolling may be awkward on mobile without momentum scrolling (`-webkit-overflow-scrolling: touch`)

---

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Value | Proposed Token |
|------|-------|----------------|
| 46 | `min-height: 40px` | `var(--cg-component-input-height-md)` |
| 47 | `rgba(255, 255, 255, 0.05)` box-shadow | `var(--cg-overlay-light-subtle)` |
| 52 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-light-subtle)` |
| 52 | `0 0 0 3px` focus ring | Standardize ring width token |
| 53 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-light-subtle)` |
| 80 | `max-height: 240px` | `var(--cg-component-dropdown-max-height, 240px)` |
| 81 | `translateY(-4px) scale(0.98)` | Animation tokens |
| 96 | `transform: scale(1.01)` option hover | `var(--cg-interaction-hover-scale)` |
| 102 | `padding: 6px` search padding | `var(--cg-spacing-6)` |
| 104 | `padding: 6px` search input | `var(--cg-spacing-6)` |
| 112 | `min-height: 32px; font-size: 12px; padding: 0 8px` sm | All should be tokens |
| 113 | `font-size: 12px` sm option | `var(--cg-font-size-xs)` |
| 115 | `min-height: 48px; font-size: 16px; padding: 0 16px` lg | All should be tokens |
| 116 | `font-size: 16px` lg option | `var(--cg-font-size-base)` |

### 3.2 Raw Colors Found

| Line | Value | Proposed Token |
|------|-------|----------------|
| 47 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-light-subtle)` |
| 52 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-light-subtle)` |
| 53 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-light-subtle)` |

### 3.3 Typography Issues
- Lines 112-113: sm font sizes are raw `12px`
- Lines 115-116: lg font sizes are raw `16px`

### 3.4 Spacing Issues
- Lines 102, 104: Search area padding is raw `6px`
- Lines 112, 115: Size variant padding is raw px

### 3.5 Modern Design Enhancements
- Add glassmorphism to dropdown panel: `backdrop-filter: blur(12px)` with semi-transparent background
- Add subtle entry animation for options (staggered fade-in)
- Add a separator line between search input and options
- Add option grouping support with styled group headers
- Add scroll shadows at top/bottom of dropdown when content overflows

---

## 4. Prioritized Fixes

### P0 - Critical
- [ ] Fix `_handleClickOutside` to use `e.composedPath()` instead of `contains()` (line 191) — current implementation breaks in composed Shadow DOM trees
- [ ] Add `aria-activedescendant` for screen reader option announcement
- [ ] Add `aria-label` support on trigger element

### P1 - High
- [ ] Add loading state with spinner in trigger
- [ ] Add active/pressed state visual on trigger
- [ ] Fix Space key conflict in searchable mode (line 171)
- [ ] Add Tab key handler to close dropdown on blur
- [ ] Add Home/End keyboard shortcuts for first/last option
- [ ] Replace raw `rgba()` overlays with tokens (lines 47, 52, 53)

### P2 - Medium
- [ ] Tokenize all size variant values (lines 112-116)
- [ ] Tokenize search padding (lines 102, 104)
- [ ] Tokenize dropdown max-height (line 80)
- [ ] Tokenize trigger min-height (line 46)
- [ ] Add `aria-required` support
- [ ] Add momentum scrolling for mobile dropdown

### P3 - Low
- [ ] Add glassmorphism to dropdown
- [ ] Add staggered option entry animations
- [ ] Add option group support
- [ ] Add multi-select mode
- [ ] Add scroll shadow indicators on dropdown
