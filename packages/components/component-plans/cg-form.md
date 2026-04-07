# cg-form

**Tag**: `<cg-form>`
**File**: `src/components/cg-form/cg-form.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: `var(--cg-border-radius-150, 12px)` on error summary — good.
- Padding: `var(--cg-spacing-12, 12px)` error summary — good.
- Font sizes: `var(--cg-font-size-sm, 14px)` error text — good.
- Colors: `--cg-color-status-error-background-default`, `--cg-color-status-error-border-default`, `--cg-color-status-error-text`. Good tokens.
- Borders: `1px solid var(--cg-color-status-error-border-default)` — width hardcoded, should use `--cg-border-width-50`.
- Transitions: None on form — appropriate.
- Background: Error summary uses `--cg-color-status-error-background-default`.

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Flex column with gap |
| Hover | ❌ | N/A | Container — not applicable |
| Active/Press | ❌ | N/A | Not applicable |
| Focus | ❌ | N/A | Not applicable |
| Disabled | ❌ | ❌ | Missing — no disabled state for the form |
| Loading | ✅ | ✅ | `opacity: 0.6; pointer-events: none` |
| Error | ✅ | ✅ | Error summary with list |
| Success | ❌ | ❌ | Missing — no success state (e.g., "Form submitted" message) |

### Interaction Audit
- Keyboard: Native form Enter-to-submit works (via `@submit` handler).
- ARIA: `aria-busy` on form for loading. Error summary has `role="alert"`. Good.
- Events: `cg-submit` with `{name}` on form submit, `cg-reset` on programmatic reset. Both bubble and compose.

## Style Fixes Needed

1. **Line 40**: `border: 1px solid` → `border: var(--cg-border-width-50, 1px) solid`
2. **Line 43**: Error summary `line-height: 1.4` — should use `--cg-line-height-normal` token.
3. **Line 47**: Error list `margin: var(--cg-spacing-4)` — good.
4. Consider adding a success summary variant:
   ```css
   .success-summary {
     padding: var(--cg-spacing-12, 12px);
     background: var(--cg-color-status-success-background-default, rgba(34, 197, 94, 0.12));
     border: var(--cg-border-width-50, 1px) solid var(--cg-color-status-success-border-default, rgba(34, 197, 94, 0.25));
     border-radius: var(--cg-border-radius-150, 12px);
     color: var(--cg-color-status-success-text, #4ade80);
   }
   ```

## Interaction Fixes Needed

1. The `reset()` method (line 79-99) iterates slotted elements and calls `formResetCallback` — this is a manual workaround since Shadow DOM `<form>` doesn't see slotted custom elements. Consider also dispatching a native `reset` event for any native inputs in slots.
2. Add a `disabled` boolean prop that sets `opacity: 0.5; pointer-events: none` on the form (similar to loading but more permanent).
3. Missing native form validation integration — the form uses `novalidate` and relies on custom validation. This is intentional but should be documented.
4. The `reset()` method checks nested children (`el.querySelectorAll('*')`) for `formResetCallback` — good for wrapper elements, but could be expensive on large forms. Consider limiting depth.

## Test Spec

```typescript
describe('cg-form', () => {
  // Rendering
  it('renders with shadow DOM')
  it('renders a native form element')
  it('renders slotted content')

  // Props
  it('name — identifies the form')
  it('gap — applies sm/md/lg spacing between fields')
  it('loading — reduces opacity and disables interaction')
  it('errors — shows error summary with list')

  // Error summary
  it('shows error summary when errors array is non-empty')
  it('hides error summary when errors array is empty')
  it('error summary has role="alert"')

  // Submit
  it('prevents default form submission')
  it('fires cg-submit on form submit')
  it('does not fire cg-submit when loading')

  // Reset
  it('reset() calls formResetCallback on slotted elements')
  it('reset() fires cg-reset event')

  // States
  it('loading state reduces opacity')
  it('loading state disables pointer events')

  // Accessibility
  it('has aria-busy when loading')
  it('error summary has role="alert"')
});
```
