# cg-radio

**Tag**: `<cg-radio>`
**File**: `src/components/cg-radio/cg-radio.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: `50%` on circle — correct for radio. Hardcoded but appropriate.
- Padding: `var(--cg-spacing-4, 4px) 0` on label — good token usage.
- Font sizes: `var(--cg-font-size-sm, 14px)` label, `var(--cg-font-size-xs, 12px)` description — good.
- Colors: `--cg-color-surface-border-hover` (unchecked border), `--cg-brand-ai-accent` (checked border + dot), `--cg-color-surface-base-text` (label), `--cg-color-surface-tertiary-text` (description). Good token coverage.
- Borders: `var(--cg-border-width-100, 2px) solid var(--cg-color-surface-border-hover, #52525b)` — good token usage.
- Transitions: Explicit `border-color`, `box-shadow`, `transform` with token durations — good.
- Background: `transparent` default, `--cg-brand-ai-accent` dot — good.

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Clean with tokens |
| Hover | ✅ | ✅ | Changes border to accent color |
| Active/Press | ✅ | ⚠️ | `transform: scale(0.9)` hardcoded — should use token |
| Focus | ✅ | ✅ | Dual-layer ring — excellent pattern |
| Disabled | ✅ | ✅ | `cursor: not-allowed; opacity: 0.5` |
| Loading | ❌ | ❌ | No loading state — should have one for async validation |
| Error | ❌ | ❌ | No error state — should have one for validation feedback |
| Success | ❌ | ❌ | No success state |

### Interaction Audit
- Keyboard: Space and Enter select via `@keydown` handler. Label has `tabindex="0"`. Correct.
- ARIA: `role="radio"`, `aria-checked`, `aria-disabled`, `aria-required`. Hidden native radio with `aria-hidden="true"`. Good.
- Events: `cg-change` with `{value, checked: true}`. Bubbles and composes.

## Style Fixes Needed

1. **Line 71**: `transform: scale(0.9)` → `transform: scale(var(--cg-interaction-press-scale-tight, 0.9))`
2. Add error state styles:
   ```css
   :host([error]) .circle { border-color: var(--cg-color-status-error-text-default, #ef4444); }
   :host([error]) .circle.checked { border-color: var(--cg-color-status-error-text-default, #ef4444); }
   :host([error]) .dot { background: var(--cg-color-status-error-text-default, #ef4444); }
   :host([error]) .label-text { color: var(--cg-color-status-error-text-default, #ef4444); }
   ```
3. Add success state styles:
   ```css
   :host([success]) .circle { border-color: var(--cg-color-status-success-text-default, #4ade80); }
   :host([success]) .circle.checked { border-color: var(--cg-color-status-success-text-default, #4ade80); }
   :host([success]) .dot { background: var(--cg-color-status-success-text-default, #4ade80); }
   :host([success]) .label-text { color: var(--cg-color-status-success-text-default, #4ade80); }
   ```
4. Add loading state styles (spinner replacing circle, like checkbox pattern).
5. Missing `user-select: none` on label — add to prevent text selection.

## Interaction Fixes Needed

1. Add `error` and `success` boolean reflected properties.
2. Add `loading` boolean reflected property with spinner display.
3. When used standalone (outside `cg-radio-group`), the radio cannot be unchecked — this is correct behavior per radio semantics, but there's no way to know the group context. The `_select` method correctly prevents re-selection (`if (this.checked) return`).

## Test Spec

```typescript
describe('cg-radio', () => {
  // Rendering
  it('renders with shadow DOM')
  it('renders default unchecked state')
  it('renders checked state with dot')

  // Props
  it('label — shows label text')
  it('description — shows description text')
  it('checked — shows filled dot')
  it('disabled — prevents selection')
  it('value — used in cg-change detail')

  // States
  it('hover state changes border to accent')
  it('focus-visible shows dual-layer focus ring')
  it('active/press scales down the circle')
  it('checked state shows spring-animated dot')
  it('disabled reduces opacity')

  // Keyboard
  it('Space selects the radio')
  it('Enter selects the radio')

  // Events
  it('fires cg-change with value and checked:true')
  it('does not fire when already checked')
  it('does not fire when disabled')

  // Accessibility
  it('has role="radio"')
  it('has aria-checked reflecting state')
  it('has aria-disabled when disabled')
  it('has aria-required when required')
  it('form-associated: setFormValue on check')
});
```
