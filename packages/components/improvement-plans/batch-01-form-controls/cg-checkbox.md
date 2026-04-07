# CgCheckbox Improvement Plan

**Component**: `cg-checkbox`
**Category**: Foundation
**File**: `src/components/cg-checkbox/cg-checkbox.ts`
**Priority**: P2-Medium

---

## Executive Summary

**Overall Health**: Good
**Top 3 Issues**:
1. Multiple magic numbers — raw px for gap, padding, dimensions, border-radius, font sizes
2. No error or loading states
3. Missing `user-select: none` on label text (only on the outer label)

---

## 1. Functional Issues

- **Line 160**: `_toggle` uses `e.preventDefault()` — this prevents the native checkbox from updating, which is correct for the custom implementation. However, there is no form association via `ElementInternals`.
- **Line 65**: `background: rgba(223, 255, 97, 0.06)` hover state — raw rgba, should use a semantic token.
- **Line 49**: `border-radius: 6px` on box — raw px, should use `var(--cg-border-radius-50, 4px)` or a component-specific token.
- **No error state**: Checkboxes in forms often need error indication (e.g., "must accept terms").
- **No success state**: No visual feedback for valid state.
- **No name/value form submission**: The hidden input exists but without `ElementInternals`, the component won't participate in form data.

---

## 2. Interaction Issues

### 2.1 State Coverage

| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | ✅ | ✅ | Gray border with transparent background |
| Hover | ✅ | Partial | Line 63-66 — hover uses raw rgba for background |
| Active | ✅ | ✅ | Line 69-71 — scale(0.9) press effect |
| Focus | ✅ | ✅ | Line 74-79 — dual ring focus on `.box` |
| Disabled | ✅ | ✅ | Line 37-40 — opacity + cursor |
| Loading | ❌ | ❌ | No loading state |
| Error | ❌ | ❌ | No error state styling |
| Success | ❌ | ❌ | No success state styling |

### 2.2 Keyboard Navigation
- Space and Enter: Both handled (line 181) — correct
- Tab: Works via `tabindex` on label (line 176)
- No issue with keyboard — well implemented

### 2.3 ARIA & Accessibility
- `role="checkbox"` on label (line 177) — correct
- `aria-checked` with `mixed` for indeterminate (line 178) — correct
- `aria-disabled` set (line 179) — correct
- **Missing**: `aria-required` for required checkboxes
- **Missing**: `aria-describedby` for description text — the description is visual only
- **Missing**: `aria-invalid` for error state (once error state is added)

### 2.4 Touch & Mobile
- Box is `20px` (line 44-45) — below 44px touch target. The clickable area is the entire label row which is larger, but the visual target is small.
- `-webkit-tap-highlight-color: transparent` is set (line 34) — good

---

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Value | Proposed Token |
|------|-------|----------------|
| 31 | `gap: 10px` | `var(--cg-spacing-10, 10px)` or `var(--cg-spacing-12)` |
| 33 | `padding: 4px 0` | `var(--cg-spacing-4) 0` |
| 44-45 | `width: 20px; height: 20px` box | `var(--cg-component-checkbox-size, 20px)` |
| 47 | `margin-top: 1px` | `var(--cg-spacing-1, 1px)` or optical alignment token |
| 48 | `border: 2px solid` | `var(--cg-border-width-100, 2px)` |
| 49 | `border-radius: 6px` | `var(--cg-border-radius-75, 6px)` or `var(--cg-border-radius-50)` |
| 65 | `rgba(223, 255, 97, 0.06)` | `var(--cg-overlay-accent-subtle)` |
| 97 | `width: 12px; height: 12px` check icon | `var(--cg-component-checkbox-icon-size, 12px)` |
| 138 | `gap: 2px` text-group | `var(--cg-spacing-2)` |
| 140 | `font-size: 14px` label | `var(--cg-font-size-sm)` |
| 141 | `font-weight: 500` | `var(--cg-font-weight-medium)` |
| 143 | `line-height: 1.4` | `var(--cg-line-height-snug, 1.375)` |
| 146 | `font-size: 12px` description | `var(--cg-font-size-xs)` |
| 148 | `line-height: 1.4` | `var(--cg-line-height-snug)` |

### 3.2 Raw Colors Found

| Line | Value | Proposed Token |
|------|-------|----------------|
| 65 | `rgba(223, 255, 97, 0.06)` | `var(--cg-overlay-accent-subtle)` |

### 3.3 Typography Issues
- Line 140: `font-size: 14px` — should be `var(--cg-font-size-sm)`
- Line 141: `font-weight: 500` — should be `var(--cg-font-weight-medium)`
- Lines 143, 148: `line-height: 1.4` — should be `var(--cg-line-height-snug)`
- Line 146: `font-size: 12px` — should be `var(--cg-font-size-xs)`

### 3.4 Spacing Issues
- Line 31: `gap: 10px` — not on the standard spacing scale (8/12/16)
- Line 33: `padding: 4px 0` — raw px
- Line 47: `margin-top: 1px` — raw optical alignment value
- Line 138: `gap: 2px` — raw px

### 3.5 Modern Design Enhancements
- Add subtle glow effect on checked state (beyond the bounce animation)
- Add a ripple effect on click originating from the checkbox box
- Add error state with red border on the box and error message slot
- Add success state with green border/check
- Add size variants (sm, md, lg) for different contexts

---

## 4. Prioritized Fixes

### P0 - Critical
- [ ] Add error state (`error` property) with red border on box and `aria-invalid`
- [ ] Add `aria-describedby` linking to description text element

### P1 - High
- [ ] Add success state styling
- [ ] Add loading state (spinner replacing checkmark)
- [ ] Replace raw rgba hover background (line 65) with overlay token
- [ ] Replace raw `border-radius: 6px` (line 49) with token
- [ ] Replace raw font sizes/weights with tokens (lines 140-148)
- [ ] Add `aria-required` support

### P2 - Medium
- [ ] Tokenize box dimensions (lines 44-45)
- [ ] Tokenize gap and padding (lines 31, 33)
- [ ] Tokenize icon size (line 97)
- [ ] Tokenize text-group gap (line 138)
- [ ] Implement `ElementInternals` for form participation
- [ ] Add size variants (sm/md/lg)

### P3 - Low
- [ ] Add glow effect on checked state
- [ ] Add ripple/ink animation on click
- [ ] Add indeterminate -> checked transition animation
