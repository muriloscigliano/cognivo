# CgForm Improvement Plan

**Component**: `cg-form`
**Category**: Foundation
**File**: `src/components/cg-form/cg-form.ts`
**Priority**: P2-Medium

---

## Executive Summary

**Overall Health**: Good
**Top 3 Issues**:
1. `reset()` method calls native `form.reset()` but slotted children are in the light DOM — native reset won't reach Shadow DOM children
2. No success/submitted state for post-submission feedback
3. Missing raw value tokenization in error summary (line-height `1.4`, margin `2px`)

---

## 1. Functional Issues

- **Lines 79-83**: `reset()` calls `this.shadowRoot?.querySelector('form')?.reset()` — but slotted children (`<cg-input>`, `<cg-select>`, etc.) are in the light DOM, not inside the shadow form. Native `HTMLFormElement.reset()` only resets form-associated elements within the form, and custom elements without `ElementInternals` are not form-associated. This reset will not work for any Cognivo form control.
- **Line 95**: `novalidate` on form — correct to disable native validation since the design system handles its own validation UI.
- **No validation orchestration**: The form does not collect or validate child fields. It relies entirely on the consumer to manage validation and pass `errors[]`. A `validate()` method or automatic child field scanning would be valuable.
- **No success state**: After successful submission, there's no visual feedback (e.g., success border, success message area).
- **No form data collection**: No method to gather all child field values into an object (e.g., `getFormData()` or `serialize()`).
- **No keyboard submit**: The form handles native submit (line 69) but doesn't explicitly handle Enter key in child inputs — this depends on native form behavior which may not work reliably with custom elements.
- **Line 87**: Error summary renders above the form — in long forms, the error summary may be scrolled out of view. Should consider sticky positioning or scroll-to behavior.

---

## 2. Interaction Issues

### 2.1 State Coverage

| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | ✅ | ✅ | Clean flex column layout |
| Hover | N/A | N/A | Container, no hover needed |
| Active | N/A | N/A | Container, no active needed |
| Focus | N/A | N/A | Focus delegated to children |
| Disabled | ❌ | ❌ | No disabled state — loading disables but no explicit disabled |
| Loading | ✅ | Partial | Line 32-34 — opacity 0.6, pointer-events none |
| Error | ✅ | ✅ | Lines 38-52 — error summary with styled list |
| Success | ❌ | ❌ | No success/submitted state |

### 2.2 Keyboard Navigation
- Enter: Should trigger form submit via native `<form>` behavior — depends on having a submit button
- Tab: Standard form tabbing through children
- No custom keyboard handling needed for the container

### 2.3 ARIA & Accessibility
- `aria-busy` set during loading (line 96) — correct
- Error summary has `role="alert"` (line 88) — correct, announces errors to screen readers
- **Missing**: `aria-label` or `aria-labelledby` on the form element
- **Missing**: `aria-describedby` linking form to error summary
- **Missing**: Focus management — on submit error, focus should move to error summary

### 2.4 Touch & Mobile
- No touch-specific concerns — container component
- Gap sizes are adequate across variants

---

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Value | Proposed Token |
|------|-------|----------------|
| 33 | `opacity: 0.6` loading | `var(--cg-opacity-disabled, 0.6)` |
| 44 | `line-height: 1.4` error summary | `var(--cg-line-height-snug, 1.375)` |
| 52 | `margin: 2px 0` error list item | `var(--cg-spacing-2, 2px) 0` |

### 3.2 Raw Colors Found

No raw colors — all colors use semantic tokens. Clean.

### 3.3 Typography Issues
- Line 44: `line-height: 1.4` — should use `var(--cg-line-height-snug)` or `var(--cg-line-height-normal)`

### 3.4 Spacing Issues
- Line 52: `margin: 2px 0` — raw px, should use `var(--cg-spacing-2) 0`

### 3.5 Modern Design Enhancements
- Add success state with green success summary matching error summary pattern
- Add animated transition between loading/idle states (fade instead of instant opacity)
- Add form sections support with visual dividers
- Add progress indicator for multi-step forms
- Add sticky error summary for long forms
- Add a subtle loading overlay with animated gradient or shimmer

---

## 4. Prioritized Fixes

### P0 - Critical
- [ ] Fix `reset()` method — it cannot reset slotted custom elements via native form reset. Implement by querying slotted children and calling their reset/clear methods or dispatching a reset event.
- [ ] Add focus management: move focus to error summary on submit error

### P1 - High
- [ ] Add success state with success summary display
- [ ] Add `aria-label` or `aria-labelledby` on the form element
- [ ] Add `aria-describedby` linking form to error summary
- [ ] Add `validate()` method that scans child form controls
- [ ] Add `getFormData()` / `serialize()` method to collect child values

### P2 - Medium
- [ ] Tokenize loading opacity (line 33) with `var(--cg-opacity-disabled)`
- [ ] Tokenize error summary line-height (line 44)
- [ ] Tokenize error list item margin (line 52)
- [ ] Add animated loading overlay (shimmer or gradient)
- [ ] Add transition for loading state change

### P3 - Low
- [ ] Add form sections/dividers support
- [ ] Add multi-step form progress indicator
- [ ] Add sticky error summary for long forms
- [ ] Add disabled state independent of loading
