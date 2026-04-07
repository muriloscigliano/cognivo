# cg-checkbox

**Tag**: `<cg-checkbox>`
**File**: `src/components/cg-checkbox/cg-checkbox.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: `4px` on the box — hardcoded. Should use `--cg-border-radius-50` token.
- Padding: `var(--cg-spacing-4, 4px) 0` on label — good token usage.
- Font sizes: `var(--cg-font-size-sm, 14px)` label, `var(--cg-font-size-xs, 12px)` description — good.
- Colors: `rgba(255,255,255,0.2)` box border (hardcoded), `rgba(255,255,255,0.4)` hover border (hardcoded), `--cg-brand-ai-accent` checked bg/border, `--cg-color-black` tick color, `--cg-color-surface-base-text` label, `--cg-color-surface-tertiary-text` description, `--cg-color-status-error-text-default`, `--cg-color-status-success-text-default`.
- Borders: `1px solid rgba(255,255,255,0.2)` box — both width and color hardcoded.
- Transitions: `all 150ms` on box — too generic.
- Background: `transparent` default, `--cg-brand-ai-accent` checked — good.

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ⚠️ | Raw rgba border |
| Hover | ✅ | ⚠️ | Raw `rgba(255,255,255,0.4)` border |
| Active/Press | ✅ | ⚠️ | `transform: scale(0.9)` hardcoded — should use token |
| Focus | ✅ | ⚠️ | `0 0 0 3px rgba(223, 255, 97, 0.2)` — should be dual-layer ring |
| Disabled | ✅ | ✅ | `opacity: 0.5; pointer-events: none` |
| Loading | ✅ | ✅ | Spinner replaces box |
| Error | ✅ | ✅ | Red border and background on checked |
| Success | ✅ | ✅ | Green border and background on checked |

### Interaction Audit
- Keyboard: Space and Enter toggle via `@keydown` handler on label. Label has `tabindex="0"`. Works correctly.
- ARIA: `role="checkbox"`, `aria-checked` (supports "mixed" for indeterminate), `aria-disabled`, `aria-required`, `aria-invalid`, `aria-busy`. Hidden native input with `aria-hidden="true"`. Comprehensive.
- Events: `cg-change` with `{checked, value}`. Bubbles and composes.

## Style Fixes Needed

1. **Line 56**: `width: 16px; height: 16px` → `width: var(--cg-component-checkbox-size, 16px); height: var(--cg-component-checkbox-size, 16px)` for configurability
2. **Line 59**: `border: 1px solid rgba(255,255,255,0.2)` → `border: var(--cg-border-width-50, 1px) solid var(--cg-color-surface-field-border, rgba(255,255,255,0.2))`
3. **Line 60**: `border-radius: 4px` → `border-radius: var(--cg-border-radius-50, 4px)`
4. **Line 66**: `all 150ms` → explicit `border-color var(--cg-motion-duration-fast, 150ms) ease, background var(--cg-motion-duration-fast, 150ms) ease, box-shadow var(--cg-motion-duration-fast, 150ms) ease, transform var(--cg-motion-duration-fast, 150ms) ease`
5. **Line 71**: `border-color: rgba(255,255,255,0.4)` → `border-color: var(--cg-color-surface-field-border-hover, rgba(255,255,255,0.4))`
6. **Line 76**: `transform: scale(0.9)` → `transform: scale(var(--cg-interaction-press-scale-tight, 0.9))`
7. **Line 81-82**: Focus ring → dual-layer: `box-shadow: 0 0 0 2px var(--cg-color-surface-primary-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61)`

## Interaction Fixes Needed

1. The `label` element is used as the interactive element with `tabindex="0"` and `role="checkbox"`. The hidden `input[type="checkbox"]` inside has `tabindex="-1"`. This pattern is valid but consider if the native input approach (visible native input with custom styling) would be simpler for form association.
2. The `_toggle` method calls `e.preventDefault()` — this is needed to prevent the label from toggling the hidden checkbox. Correct.
3. Missing `user-select: none` on the label — should add to prevent text selection during rapid clicking.

## Test Spec

```typescript
describe('cg-checkbox', () => {
  // Rendering
  it('renders with shadow DOM')
  it('renders default unchecked state')
  it('renders checked state with tick SVG')
  it('renders indeterminate state with dash SVG')

  // Props
  it('label — shows label text')
  it('description — shows description below label')
  it('checked — toggles checked state')
  it('indeterminate — shows dash icon')
  it('disabled — prevents toggling')
  it('error — applies red border and label color')
  it('success — applies green border and label color')
  it('loading — shows spinner instead of box')

  // States
  it('hover state changes border color')
  it('focus-visible shows focus ring')
  it('active/press scales down the box')
  it('checked state shows bounce animation')
  it('disabled state reduces opacity')

  // Keyboard
  it('Space toggles checked')
  it('Enter toggles checked')

  // Events
  it('fires cg-change with checked and value')
  it('does not fire when disabled')

  // Accessibility
  it('has role="checkbox"')
  it('has aria-checked="true" when checked')
  it('has aria-checked="mixed" when indeterminate')
  it('has aria-disabled when disabled')
  it('has aria-required when required')
  it('has aria-invalid when error')
  it('form-associated: setFormValue on check change')
});
```
