# AI Model Selector Improvement Plan

**Component**: `ai-model-selector`
**Category**: AI-Native
**File**: `src/components/ai-model-selector/ai-model-selector.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Multiple magic numbers in `.check`, `.cap`, `.cost`, and `.empty` classes (lines 92-105, 122-141)
2. Raw hex colors in `.filter-chip.active` background, `.model-card.selected` background, and rgba values throughout (lines 65, 88, 136-139)
3. Missing keyboard arrow-key roving tabindex for listbox/radio group pattern (lines 229-235)

---

## 1. Functional Issues

- **Line 159-163**: `updated()` overwrites `_selectedIds` every time `selected` changes, but does not handle the case where `selected` is cleared (set to `''`). If the consumer clears `selected`, the Set is initialized with `['']`, leaving a phantom empty-string entry.
- **Line 192-198**: The comparison event fires when exactly 2 models are selected, but there is no deselection guard -- if a third model is added and then one is removed back to 2, the compare event fires again unexpectedly.
- **Missing `declare global`**: Unlike other components in this batch, `ai-model-selector` is missing the `HTMLElementTagNameMap` augmentation.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Notes |
|-------|------------|-------|
| Default | Yes | |
| Hover | Yes | `.model-card:hover` (line 84) |
| Focus-visible | Yes | `.model-card:focus-visible` (line 85) |
| Selected | Yes | `.model-card.selected` (line 86) |
| Disabled | **No** | No `disabled` prop or disabled styling on cards |
| Loading | **No** | No skeleton/loading state while models load |
| Error | **No** | Only empty state, no error display |
| Active/pressed | **No** | No `:active` style on cards |

**Missing states**: disabled, loading, error, active/pressed (4 of 8+ required).

### 2.2 Keyboard Navigation
- **Enter/Space** are handled (line 235).
- **Arrow key navigation** is missing for the listbox/radio pattern. Users should be able to navigate between cards with ArrowUp/ArrowDown/ArrowLeft/ArrowRight per WAI-ARIA listbox spec.
- Filter chips have no arrow-key roving tabindex. Each chip is independently tabbable, which is verbose for screen reader users.

### 2.3 ARIA & Accessibility
- **Line 229**: `aria-multiselectable` is set as a string attribute, but when `multi` is false, it renders `aria-multiselectable="false"` which is technically correct but should be omitted entirely when false per best practice.
- **Line 231-232**: When `multi` is true, role should be `option` inside a `listbox`, not `checkbox`. Alternatively, use `role="group"` with individual checkboxes.
- **Line 237**: The checkmark icon inside `.check` div has no `aria-hidden="true"`, and its meaning is already conveyed by `aria-selected`.
- **Filter chips** (line 220-226): Missing `aria-pressed` for toggle behavior.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Property | Value | Suggested Token |
|------|----------|-------|-----------------|
| 93 | `top` | `10px` | `var(--cg-spacing-10, 10px)` |
| 94 | `right` | `10px` | `var(--cg-spacing-10, 10px)` |
| 95 | `width` | `18px` | `var(--cg-spacing-18, 18px)` |
| 96 | `height` | `18px` | `var(--cg-spacing-18, 18px)` |
| 99 | `font-size` | `10px` | `var(--cg-font-size-2xs, 10px)` |
| 100 | `font-weight` | `800` | `var(--cg-font-weight-extrabold, 800)` |
| 122 | `font-size` | `9px` | `var(--cg-font-size-3xs, 9px)` |
| 123 | `padding` | `1px 6px` | `var(--cg-spacing-1, 1px) var(--cg-spacing-6, 6px)` |
| 124 | `border-radius` | `3px` | `var(--cg-border-radius-25, 3px)` |
| 131 | `font-size` | `10px` | `var(--cg-font-size-2xs, 10px)` |
| 133 | `padding` | `2px` | `var(--cg-spacing-2, 2px)` |
| 141 | `padding` | `32px` | `var(--cg-spacing-32, 32px)` |
| 141 | `font-size` | `13px` | `var(--cg-font-size-sm, 14px)` or dedicated token |

### 3.2 Raw Colors Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 65 | `rgba(223, 255, 97, 0.06)` | `.filter-chip.active` background | `var(--cg-brand-ai-accent-alpha-6)` |
| 82 | `rgba(255, 255, 255, 0.05)` | box-shadow inset highlight | `var(--cg-color-surface-highlight)` |
| 82 | `rgba(255, 255, 255, 0.03)` | background-image gradient | `var(--cg-color-surface-gradient-start)` |
| 88 | `rgba(223, 255, 97, 0.04)` | `.model-card.selected` background | `var(--cg-brand-ai-accent-alpha-4)` |
| 99 | `#000` | `.check` color | `var(--cg-color-surface-container-background)` |
| 136 | `rgba(34, 197, 94, 0.1)` | `.cost.free` background | `var(--cg-color-status-success-bg)` |
| 137 | `rgba(34, 197, 94, 0.1)` | `.cost.low` background | `var(--cg-color-status-success-bg)` |
| 138 | `rgba(245, 158, 11, 0.1)` | `.cost.medium` background | `var(--cg-color-status-warning-bg)` |
| 139 | `rgba(239, 68, 68, 0.1)` | `.cost.high` background | `var(--cg-color-status-error-bg)` |

### 3.3 Spacing Issues
- **Line 68**: `minmax(220px, 1fr)` -- the `220px` minimum is a magic number. Consider a CSS custom property or token for the card min-width.
- **Transition values** (`150ms`) on lines 63, 79 are not tokenized. Should use `var(--cg-motion-duration-fast, 150ms)`.

### 3.4 Modern Design Enhancements
- Add subtle `backdrop-filter` blur on hover for a glassmorphism touch.
- Consider adding a micro-animation (scale or glow) on card selection rather than just a border change.
- The capability chips (`.cap`) look cramped at `9px` font-size and `1px` padding; increase to design-system-sanctioned minimums.
- Consider a "Compare" button that appears when 2+ models are selected in multi mode, rather than auto-dispatching.

## 4. Prioritized Fixes

### P0 - Critical
1. **Add `aria-hidden="true"` to decorative check icon** (line 237) -- screen readers should not announce the SVG content.
2. **Fix role mismatch**: When `multi` is true, card role should be `option` (not `checkbox`) inside a `listbox`, or switch the container to `role="group"` and cards to `role="checkbox"`.

### P1 - High
3. **Add arrow-key roving tabindex** for the card grid -- implement keyboard navigation per WAI-ARIA listbox pattern.
4. **Add disabled state** -- support a `disabled` property on individual models and on the entire component.
5. **Replace all magic numbers** listed in 3.1 with design tokens.
6. **Replace raw hex `#000`** on line 99 and all `rgba()` literals with semantic tokens.

### P2 - Medium
7. **Add loading state** -- skeleton cards or spinner while models are being fetched.
8. **Add error state** -- error message display when model loading fails.
9. **Add `aria-pressed` to filter chips** (lines 220-226).
10. **Add `declare global` HTMLElementTagNameMap** augmentation.
11. **Tokenize transition durations** -- replace `150ms` with motion tokens.

### P3 - Low
12. **Add `:active` pressed state** on model cards for tactile feedback.
13. **Add micro-animation on selection** -- scale bump or glow ring.
14. **Guard `_selectedIds`** against empty string when `selected` prop is cleared.
15. **Consider debouncing** the comparison event dispatch to prevent rapid re-fires.
