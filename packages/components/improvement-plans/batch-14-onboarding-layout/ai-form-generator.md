# AI Form Generator Improvement Plan

**Component**: `ai-form-generator`
**Category**: AI-Native
**File**: `src/components/ai-form-generator/ai-form-generator.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. CSS syntax error -- stray closing brace on line 141 and misplaced blank line before `:focus-visible` rule (lines 141-148)
2. Pervasive magic numbers for font sizes throughout the form styles (lines 66-67, 73-74, 108, 110, 140)
3. Missing `aria-describedby` linking form fields to their error messages

---

## 1. Functional Issues
- **Lines 141-148**: CSS has a stray `}` on line 141 after `.empty`, then a blank line, then `:focus-visible` rule starting on line 144. The stray brace closes the CSS template literal early, making `:focus-visible` and any subsequent rules not apply.
- **Line 156**: `updated()` lifecycle method checks `changed.has('schema')` to initialize defaults, but also resets `_errors` on every schema change. If schema changes slightly (e.g., adding a field), all validation errors are lost.
- **Line 167**: `changed.has('values')` triggers `this._values = { ...this.values }` -- this overwrites internal state on every external values update, potentially losing in-progress user edits.
- **Line 248**: `<select>` uses `.value=${String(val)}` but Lit's `.value` binding on select doesn't reliably set the selected option. Should use `?selected` on `<option>` elements.
- **No form `<form>` element**: The component uses `role="form"` on a `<div>` (line 301) but doesn't use an actual `<form>` element. This means native form submission, validation, and Enter-to-submit don't work.
- **Labels not linked to inputs**: `<label>` elements (lines 80-82, 247, 263, 274) don't use `for`/`id` attributes or wrapping pattern properly for non-checkbox fields. The input is a sibling, not a child.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | Form renders fields |
| Hover | No | No hover state on any field |
| Active/Pressed | No | No `:active` state |
| Focus | Yes | Border color change on focus (line 93) |
| Disabled | Partial | Submit button has `:disabled` (line 125), but no field-level disabled |
| Loading | Yes | Loading overlay (line 284-285) |
| Error | Partial | Field-level validation errors (line 95), but no form-level error state |
| Empty | Yes | "No form schema provided" (line 289) |

**Missing**: hover, active, field-level disabled states (3 of 8+ missing).

### 2.2 Keyboard Navigation
- **Form fields**: Native `<input>`, `<select>`, `<textarea>` elements -- natively keyboard accessible.
- **Submit button**: Standard `<button>` -- accessible.
- **No Enter-to-submit**: Without a `<form>` element, pressing Enter in a text field doesn't submit.
- **No field navigation hints**: Tab order follows DOM order, which is fine.

### 2.3 ARIA & Accessibility
- **Line 301**: `role="form"` with `aria-label` -- adequate but actual `<form>` would be better.
- **Line 249**: `aria-invalid` on select -- good.
- **Line 276**: `aria-invalid` on input -- good.
- **Missing `aria-describedby`**: Error messages (`.field-error` spans) are not linked to their fields via `aria-describedby`. Screen readers won't associate errors with fields.
- **Missing `id`/`for` on labels**: Labels don't programmatically associate with inputs.
- **Missing `aria-required`**: Required fields have visual `*` indicator but no `aria-required="true"`.
- **Textarea** (line 263): Missing `aria-invalid`.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggestion |
|------|-------|------------|
| 66 | `font-size: 16px` | Use `var(--cg-font-size-base, 16px)` |
| 67 | `font-size: 12px; margin-top: 4px` | Use `var(--cg-font-size-xs)` and `var(--cg-spacing-4)` |
| 73 | `font-size: 11px` | Use `var(--cg-font-size-2xs, 10px)` or define an 11px token |
| 75 | `padding-top: 8px; margin-bottom: -4px` | Use `var(--cg-spacing-8)` and avoid negative margins |
| 81 | `font-size: 12px` | Use `var(--cg-font-size-xs, 12px)` |
| 83 | `margin-left: 2px` | Use `var(--cg-spacing-2, 2px)` |
| 96 | `min-height: 80px` | Use `var(--cg-size-1000, 80px)` |
| 105 | `width: 16px; height: 16px` | Use `var(--cg-size-200, 16px)` |
| 108 | `font-size: 13px` | Use `var(--cg-font-size-sm, 14px)` |
| 110 | `font-size: 11px` | Same as line 73 |
| 130 | `padding: 40px` | Use `var(--cg-spacing-40, 40px)` |
| 135 | `font-size: 10px; padding: 2px ...` | Use `var(--cg-font-size-2xs)` and `var(--cg-spacing-2)` |
| 138 | `margin-left: 8px` | Use `var(--cg-spacing-8, 8px)` |
| 140 | `padding: 32px; font-size: 13px` | Use `var(--cg-spacing-32)` and `var(--cg-font-size-sm)` |

### 3.2 Raw Colors Found
| Line | Color | Replacement |
|------|-------|------------|
| 121 | `color: #000` | Use `var(--cg-color-surface-container-background, #18181b)` or text-on-accent token |

### 3.3 Spacing Issues
- Heavy use of shorthand without tokens (lines 67, 75, 83, 138).
- Negative margin on line 75 (`margin-bottom: -4px`) is a code smell -- rethink layout.
- Transition durations on lines 91, 122 use raw ms values.

### 3.4 Modern Design Enhancements
- Add field hover state with subtle border lightening.
- Form sections could have collapsible headers.
- Consider inline validation (validate on blur, not just on submit).
- The AI badge could have a subtle shimmer animation.
- Error fields could shake briefly on validation failure.

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix stray CSS brace** (line 141) -- `:focus-visible` rule is not applied.
2. **Add `aria-describedby`** linking each field to its error message.
3. **Add `id`/`for` attributes** to properly associate labels with inputs.
4. **Add `aria-required="true"`** to required fields.

### P1 - High
5. **Replace raw `#000`** (line 121) with a semantic token.
6. **Add `aria-invalid`** to textarea (line 263).
7. **Fix select `.value` binding** (line 248) -- use `?selected` on options instead.
8. **Use actual `<form>` element** instead of `div[role="form"]` for native behavior.
9. **Replace all magic number font sizes** (lines 66, 67, 73, 81, 108, 110) with tokens.
10. **Add field-level disabled state** via a `disabled` field property.

### P2 - Medium
11. **Fix property overwrite** (line 167) -- don't overwrite internal state on every external values change.
12. **Replace remaining magic numbers** for padding, margins, and sizes.
13. **Add hover state** to form fields.
14. **Add `:active` state** to submit button.
15. **Replace transition durations** with motion tokens.
16. **Remove negative margin** (line 75) -- rethink section label spacing.

### P3 - Low
17. **Add inline validation** (validate on blur).
18. **Add field shake animation** on validation failure.
19. **Add AI badge shimmer animation**.
20. **Consider collapsible sections** for long forms.
