# CgRadioGroup Improvement Plan

**Component**: `cg-radio-group`
**Category**: Foundation
**File**: `src/components/cg-radio-group/cg-radio-group.ts`
**Priority**: P2-Medium

---

## Executive Summary

**Overall Health**: Good
**Top 3 Issues**:
1. No error or loading states for the group as a whole
2. No label/legend rendering — the `label` prop is only used for `aria-label` but not visually displayed
3. Relies on `tagName === 'CG-RADIO'` string comparison (line 66) which is fragile

---

## 1. Functional Issues

- **Line 66**: `el.tagName === 'CG-RADIO'` — string comparison is fragile. If the element is extended or aliased, this breaks. Should use `instanceof` check or a marker property.
- **Line 89**: `radio.tabIndex = radio === focusTarget ? 0 : -1` — directly mutates child component's `tabIndex`. This works but is imperative and could conflict if the child manages its own tabindex.
- **Line 52**: `label` property is used only for `aria-label` (line 186) — no visual label/legend is rendered. A form radio group should display its label visually for sighted users.
- **Lines 69-76**: `_syncRadios()` runs in `updated()` (line 176) which could cause infinite update loops if child property changes trigger parent re-renders. Should use `requestAnimationFrame` or `updateComplete` to batch.
- **No error state**: Radio groups in forms need error indication (e.g., "Please select an option").
- **No required state**: No `required` property for form validation.

---

## 2. Interaction Issues

### 2.1 State Coverage

| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | ✅ | ✅ | Simple flex layout with gap tokens |
| Hover | N/A | N/A | Group itself has no hover — delegated to children |
| Active | N/A | N/A | Delegated to children |
| Focus | ✅ | ✅ | Focus management via roving tabindex (lines 81-90) |
| Disabled | ✅ | ✅ | Propagates to children (line 74) |
| Loading | ❌ | ❌ | No loading state |
| Error | ❌ | ❌ | No error state for the group |
| Success | ❌ | ❌ | No success state |

### 2.2 Keyboard Navigation
- Arrow keys (Up/Down/Left/Right): Fully implemented with wrap-around (lines 119-156) — excellent
- Home/End: Implemented (lines 143-147) — excellent
- Tab: Roving tabindex pattern correctly implemented
- This is one of the best keyboard implementations in the batch

### 2.3 ARIA & Accessibility
- `role="radiogroup"` on container (line 184) — correct
- `aria-label` from label prop (line 186) — correct
- **Missing**: Visual label rendering (fieldset/legend pattern or visible label)
- **Missing**: `aria-required` for required groups
- **Missing**: `aria-invalid` for error state
- **Missing**: Error message display and `aria-describedby` linking

### 2.4 Touch & Mobile
- Group layout is clean — no touch-specific issues
- Horizontal orientation may need scroll on narrow screens if many options

---

## 3. Styling Issues

### 3.1 Magic Numbers Found

This component has very minimal styling — only two token-based gap values. No magic numbers found in CSS.

### 3.2 Raw Colors Found

None — this component has clean CSS with only token references.

### 3.3 Typography Issues

None — no typography styling in this component (delegated to children).

### 3.4 Spacing Issues

None — gap values use tokens correctly (lines 35-36, 40-41).

### 3.5 Modern Design Enhancements
- Add a visible label/legend with proper typography tokens
- Add error state with error message below the group, styled consistently with other form components
- Add a subtle animated border or background highlight when the group has focus within
- Add helper text slot for instructional text below the group
- Consider card-style radio options with borders and selection highlighting

---

## 4. Prioritized Fixes

### P0 - Critical
- [ ] Add visual label rendering (currently only `aria-label`, no visible text)
- [ ] Add error state with error message display and `aria-invalid`

### P1 - High
- [ ] Add `required` property with `aria-required`
- [ ] Add helper text support with `aria-describedby`
- [ ] Add loading state (overlay or skeleton)
- [ ] Replace `tagName === 'CG-RADIO'` (line 66) with `instanceof` or marker check

### P2 - Medium
- [ ] Add success state styling
- [ ] Add `aria-describedby` for error/helper messages
- [ ] Guard against infinite update loops in `_syncRadios()` by batching with `requestAnimationFrame`
- [ ] Add horizontal scroll handling for many options in horizontal mode

### P3 - Low
- [ ] Add focus-within highlight on the group container
- [ ] Add card-style radio option layout variant
- [ ] Add separator option for visual grouping
