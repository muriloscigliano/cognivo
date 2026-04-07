# ai-form-generator — Improvement Plan

## Current State

### CSS Audit
| Property | Status | Notes |
|---|---|---|
| Colors | PASS | All use `--cg-*` tokens |
| Spacing | PASS | Uses `--cg-spacing-*` tokens |
| Font sizes | WARN | `.section-label { font-size: 11px }`, `.checkbox-label { font-size: 13px }`, `.field-error { font-size: 11px }`, `.empty { font-size: 13px }` — raw pixel values |
| Font weights | PASS | Uses `--cg-font-weight-*` tokens |
| Border radii | PASS | Uses `--cg-border-radius-*` tokens |
| Motion | PASS | Uses `--cg-motion-*` tokens |
| Letter-spacing | WARN | `.section-label { letter-spacing: 0.05em }` — raw value |
| Focus | WARN | Global `:focus-visible` box-shadow may conflict with input focus styles |

### States Audit
| State | Implemented | Notes |
|---|---|---|
| Default | YES | Form with fields and submit |
| Empty | YES | "No form schema provided" |
| Loading | YES | Loading overlay with thinking indicator |
| Field error | YES | Red border + error message |
| Field focus | YES | Accent border on focus |
| Hover | NO | No hover state on fields |
| Active/Pressed | NO | No press state on submit button |
| Disabled | PARTIAL | Submit button disabled prop mentioned but no disabled styling on submit |
| Submitted | NO | No post-submit success state |
| Sections | YES | Group fields by section label |

### Interaction Audit
| Interaction | Status | Notes |
|---|---|---|
| Field change | YES | Fires `ai-form-change` on each field edit |
| Validation | YES | Required, min/max, pattern checks |
| Submit | YES | Validates then fires `ai-form-submit` |
| Validation event | YES | Fires `ai-form-validate` with valid/errors |
| Error clearing | YES | Errors clear on field edit |
| Default values | YES | Applied from schema on init |
| ARIA form | YES | `role="form"` with label |
| ARIA invalid | YES | `aria-invalid` on text/select fields |
| Checkbox | YES | Native checkbox with accent-color |
| Select | YES | Native select with placeholder option |

## Style Fixes Needed
1. Replace `font-size: 11px` with `var(--cg-font-size-2xs, 10px)` or `var(--cg-font-size-xs, 12px)`
2. Replace `font-size: 13px` with `var(--cg-font-size-sm, 14px)` or nearest token
3. Replace `letter-spacing: 0.05em` with `var(--cg-letter-spacing-wide, 0.05em)`
4. Add hover state on input fields (border-color change)
5. Add `:active` press scale on submit button
6. Remove/refine global `:focus-visible` to not conflict with input:focus
7. `.form-header` and `.form-footer` border uses `--cg-color-surface-container-background` — should use `--cg-color-surface-container-border`
8. `.section-label { margin-bottom: -4px }` — magic number, use negative spacing token

## Interaction Fixes Needed
1. Add textarea `aria-invalid` attribute (currently only on input/select)
2. Add `aria-describedby` linking field errors to their error messages
3. Add `id` attributes to fields for label association via `for`
4. Loading state references `<ai-thinking>` — verify this dependency is documented
5. Add submit button disabled when form is invalid or submitting
6. Consider adding success/submitted state
7. Checkbox should have `aria-invalid` when required and unchecked
8. Add `novalidate` to prevent native browser validation if using custom

## Test Spec
| # | Test Case | Type |
|---|---|---|
| 1 | Renders empty state when no schema | Unit |
| 2 | Renders loading state when `loading=true` | Unit |
| 3 | Renders form title and description | Unit |
| 4 | Renders all field types: text, email, number, select, checkbox, textarea, date | Unit |
| 5 | Required fields show asterisk | Unit |
| 6 | Default values populate from schema | Unit |
| 7 | Field change fires `ai-form-change` | Event |
| 8 | Event detail includes field name, value, all values | Event |
| 9 | Submit validates required fields | Validation |
| 10 | Submit validates number min/max | Validation |
| 11 | Submit validates pattern | Validation |
| 12 | Validation errors display under fields | Unit |
| 13 | Editing field clears its error | Interaction |
| 14 | Valid submit fires `ai-form-submit` | Event |
| 15 | Invalid submit fires `ai-form-validate` with errors | Event |
| 16 | Sections group fields with labels | Unit |
| 17 | Checkbox toggles boolean value | Interaction |
| 18 | Select renders options from schema | Unit |
| 19 | Focus ring on form fields | A11y |
| 20 | ARIA invalid on errored fields | A11y |
| 21 | Form has role and aria-label | A11y |
| 22 | Snapshot: form with sections and errors | Visual |
