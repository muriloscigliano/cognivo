# CgAutocomplete Improvement Plan

**Component**: `cg-autocomplete`
**Category**: Foundation
**File**: `src/components/cg-autocomplete/cg-autocomplete.ts`
**Priority**: P2-Medium

---

## Executive Summary

**Overall Health**: Good
**Top 3 Issues**:
1. Dropdown close-on-blur uses `setTimeout(150)` (line 246) — fragile timing hack that can race with click events
2. Clear button uses light-mode colors (`--cg-gray-200`, `--cg-gray-300`) that won't work on dark backgrounds
3. Staggered animation delays hardcoded for only 8 options (lines 122-129) — breaks for longer lists

---

## 1. Functional Issues

- **Line 246**: `setTimeout(() => { this._open = false; }, 150)` — uses a timing hack to allow click events on options before blur closes the dropdown. This is fragile and can fail on slow devices or when browser is under load. Should use `@mousedown` with `preventDefault()` on options (already partially done on line 264) or track mouse state.
- **Lines 122-129**: Option animation delays hardcoded `.option:nth-child(1)` through `.option:nth-child(8)` — if filtered list has more than 8 items, later items get no stagger. Should use CSS custom property or inline styles.
- **Lines 74-78**: Clear button uses `--cg-gray-200` and `--cg-gray-300` for background, and `--cg-gray-500`/`--cg-gray-700` for hover colors. These are light-mode palette colors that produce a jarring white button against the dark input background. Should use `rgba(255,255,255,0.1)` pattern (overlay tokens) matching `cg-input`'s clear button.
- **Line 82-86**: Chevron indicator is always visible — should optionally be hidden when the component is in "search" mode vs "combobox" mode.
- **No error state**: Missing validation styling.
- **No success state**: Missing valid-state feedback.
- **No loading state**: Missing async loading indicator for remote search.

---

## 2. Interaction Issues

### 2.1 State Coverage

| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | ✅ | ✅ | Input wrap with token border/bg |
| Hover | ✅ | ✅ | Line 47 — border-color on hover |
| Active | ❌ | ❌ | No pressed state on input wrap |
| Focus | ✅ | ✅ | Lines 49-54 — dual ring focus |
| Disabled | ✅ | ✅ | Line 55 — opacity + cursor |
| Loading | ❌ | ❌ | Critical for async search — no spinner or skeleton |
| Error | ❌ | ❌ | No error state |
| Success | ❌ | ❌ | No success state |

### 2.2 Keyboard Navigation
- ArrowDown/Up: Navigate options (lines 198-204) — correct
- Enter: Select highlighted option (lines 205-207) — correct
- Escape: Close dropdown (lines 208-209) — correct
- Tab: Closes via blur timeout (fragile, line 246)
- **Missing**: Home/End for first/last option
- **Missing**: Page Up/Page Down for scrolling long lists

### 2.3 ARIA & Accessibility
- `role="combobox"` on input (line 239) — correct
- `aria-expanded` set (line 240) — correct
- `aria-autocomplete="list"` (line 241) — correct
- `aria-label` set (line 242) — correct
- `role="listbox"` on dropdown (line 258) — correct
- `role="option"` on options (line 261) — correct
- `aria-selected` on options (line 262) — correct
- **Missing**: `aria-activedescendant` on input to announce highlighted option
- **Missing**: `id` attributes on options for `aria-activedescendant`
- **Missing**: `aria-invalid` for error state
- **Missing**: `aria-required`
- **Missing**: `aria-busy` for loading state

### 2.4 Touch & Mobile
- Input wrap `min-height: 40px` — adequate for md
- No mobile-specific optimizations for dropdown positioning (may overflow viewport)
- Clear button 18px — small for touch (below 44px)

---

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Value | Proposed Token |
|------|-------|----------------|
| 43 | `min-height: 40px` | `var(--cg-component-input-height-md, 40px)` |
| 73 | `width: 18px; height: 18px` clear btn | `var(--cg-component-icon-size-sm, 18px)` |
| 79 | `width: 10px; height: 10px` clear SVG | `var(--cg-component-icon-size-xs, 10px)` |
| 86 | `width: 16px; height: 16px` chevron SVG | `var(--cg-component-icon-size-sm, 16px)` |
| 97 | `max-height: 240px` dropdown | `var(--cg-component-dropdown-max-height, 240px)` |
| 122-129 | `animation-delay: 0-210ms` | Dynamic inline styles |

### 3.2 Raw Colors Found

| Line | Value | Proposed Token |
|------|-------|----------------|
| 74 | `var(--cg-gray-200, #e4e4e7)` clear bg | Should be `var(--cg-overlay-light-subtle)` for dark theme |
| 78 | `var(--cg-gray-300, #d4d4d8)` clear hover | Should be `var(--cg-overlay-light-medium)` |
| 78 | `var(--cg-gray-700, #3f3f46)` clear hover color | Inconsistent with dark theme |

### 3.3 Typography Issues

No raw typography values — all use tokens.

### 3.4 Spacing Issues

No raw spacing values beyond component dimensions.

### 3.5 Modern Design Enhancements
- Add glassmorphism to dropdown: `backdrop-filter: blur(12px)` with semi-transparent background
- Add loading state with spinner inside input (replacing chevron)
- Add "searching..." skeleton rows in dropdown during async loading
- Add scroll shadows on dropdown overflow
- Add option icons support (partially exists via `opt.icon` on line 266)
- Add multi-select mode with tag/chip display
- Add grouped options with section headers

---

## 4. Prioritized Fixes

### P0 - Critical
- [ ] Fix blur timing hack (line 246) — replace `setTimeout(150)` with proper mouse state tracking or consistent `@mousedown` `preventDefault()` pattern
- [ ] Fix clear button colors for dark theme (lines 74-78) — use overlay tokens instead of gray scale tokens

### P1 - High
- [ ] Add error state with red border and `aria-invalid`
- [ ] Add loading state with spinner and `aria-busy`
- [ ] Add success state with green border
- [ ] Add `aria-activedescendant` for screen reader option announcement
- [ ] Add `id` attributes on options for ARIA linkage
- [ ] Add `aria-required` support

### P2 - Medium
- [ ] Fix hardcoded stagger delays (lines 122-129) — use dynamic approach for any list length
- [ ] Tokenize input wrap min-height (line 43)
- [ ] Tokenize clear button and chevron dimensions (lines 73, 79, 86)
- [ ] Tokenize dropdown max-height (line 97)
- [ ] Add Home/End keyboard shortcuts
- [ ] Add size variants (sm/md/lg) matching other form controls
- [ ] Add dropdown viewport collision detection

### P3 - Low
- [ ] Add glassmorphism dropdown
- [ ] Add skeleton loading rows
- [ ] Add scroll shadow indicators
- [ ] Add multi-select with tag display
- [ ] Add grouped options with section headers
