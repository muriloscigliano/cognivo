# cg-date-picker

**Tag**: `<cg-date-picker>`
**File**: `src/components/cg-date-picker/cg-date-picker.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: `var(--cg-border-radius-150, 12px)` — good. Rounded overrides use tokens.
- Padding: `var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px)` — good tokens.
- Font sizes: `var(--cg-font-size-sm, 14px)` — good.
- Colors: `--cg-color-surface-field-border`, `--cg-color-input-background-default`, `--cg-color-surface-base-text`, `--cg-focus-ring-color`, `--cg-color-status-error-text`, `--cg-overlay-accent-strong`. Good token usage.
- Borders: `var(--cg-border-width-50, 1px) solid var(--cg-color-surface-field-border, #27272a)` — excellent.
- Transitions: Explicit `border-color`, `box-shadow` with token durations — good.
- Background: `var(--cg-color-input-background-default, #18181b)`.

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Clean tokens |
| Hover | ✅ | ✅ | Uses `--cg-focus-ring-color` |
| Active/Press | ❌ | N/A | Not applicable for date input |
| Focus | ✅ | ⚠️ | `0 0 0 3px var(--cg-overlay-accent-strong)` — single layer, should be dual |
| Disabled | ✅ | ✅ | `opacity: 0.5; cursor: not-allowed` |
| Loading | ❌ | ❌ | Missing — no loading state |
| Error | ✅ | ⚠️ | Only border color change — no focus ring override for error |
| Success | ❌ | ❌ | Missing — no success state |

### Interaction Audit
- Keyboard: Native date input keyboard navigation (browser-dependent).
- ARIA: `aria-invalid` for error state. Missing `aria-label`, `aria-required`, `aria-busy`.
- Events: `cg-change` with `{value}`. Bubbles and composes.

## Style Fixes Needed

1. **Line 28**: Focus ring → dual-layer: `box-shadow: 0 0 0 2px var(--cg-color-surface-primary-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61)`
2. **Line 27**: Hover border uses `--cg-focus-ring-color` which is a focus token — consider a dedicated hover border token.
3. Add error focus ring override:
   ```css
   :host([error]) input:focus {
     border-color: var(--cg-color-status-error-text-default, #ef4444);
     box-shadow: 0 0 0 2px var(--cg-color-surface-primary-background, #09090b), 0 0 0 4px var(--cg-color-status-error-text-default, #ef4444);
   }
   ```
4. Add success state:
   ```css
   :host([success]) input { border-color: var(--cg-color-status-success-text-default, #4ade80); }
   :host([success]) input:focus {
     border-color: var(--cg-color-status-success-text-default, #4ade80);
     box-shadow: 0 0 0 2px var(--cg-color-surface-primary-background, #09090b), 0 0 0 4px var(--cg-color-status-success-text-default, #4ade80);
   }
   ```
5. Add loading state (spinner or opacity reduction).
6. Missing `min-height` token — currently uses `var(--cg-component-input-height-md, 40px)` which is good but size variants (sm/lg) are missing entirely.

## Interaction Fixes Needed

1. Add `label` prop for floating label (matches `cg-input` pattern) or at least `aria-label` binding.
2. Add `success` boolean reflected property.
3. Add `loading` boolean reflected property.
4. Add `required` boolean property with `aria-required`.
5. Add `aria-label` binding to the native input.
6. Add size variants (sm/md/lg) to match other form inputs.
7. Missing form association via `ElementInternals` — unlike other form components.
8. Consider adding a `helper` text area for error/helper messages.

## Test Spec

```typescript
describe('cg-date-picker', () => {
  // Rendering
  it('renders with shadow DOM')
  it('renders a native date input')

  // Props
  it('value — sets date value')
  it('min — sets minimum date')
  it('max — sets maximum date')
  it('disabled — disables input')
  it('error — applies error border')
  it('rounded — overrides border-radius')

  // States
  it('hover state changes border color')
  it('focus shows focus ring')
  it('disabled reduces opacity')
  it('error shows red border')

  // Events
  it('fires cg-change with value on date selection')

  // Accessibility
  it('has aria-invalid when error')
  it('native date input provides built-in a11y')
});
```
