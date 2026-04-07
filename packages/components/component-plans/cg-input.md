# cg-input

**Tag**: `<cg-input>`
**File**: `src/components/cg-input/cg-input.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: `8px` hardcoded on wrapper (md default). Size variants use `6px` (sm), `10px` (lg) — all hardcoded. Rounded overrides correctly use tokens.
- Padding: `0 12px` (md wrapper) hardcoded. sm: `0 var(--cg-spacing-8)`, lg: `0 var(--cg-spacing-16)` — inconsistent: md is hardcoded while sm/lg use tokens.
- Font sizes: `var(--cg-font-size-sm, 14px)` for input, `var(--cg-font-size-xs, 12px)` for sm, `var(--cg-font-size-base, 16px)` for lg — good token usage on input.
- Colors: `rgba(255, 255, 255, 0.04)` (background), `rgba(255, 255, 255, 0.1)` (border), `rgba(255, 255, 255, 0.2)` (hover border), `--cg-brand-ai-accent` (focus), `--cg-color-status-error-text-default`, `--cg-color-status-success-text-default`, `--cg-color-input-text-default`, `--cg-color-input-text-placeholder`, `--cg-color-surface-tertiary-text`. Multiple raw `rgba()` values for wrapper border/background.
- Borders: `1px solid rgba(255, 255, 255, 0.1)` — should use `var(--cg-border-width-50, 1px)` and token for border color.
- Transitions: `all 150ms` on wrapper — too generic, should be explicit properties with token durations.
- Background: `rgba(255, 255, 255, 0.04)` — should use `--cg-color-input-background-default` or `--cg-overlay-light-subtle` token.

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ⚠️ | Raw rgba border/background instead of tokens |
| Hover | ✅ | ⚠️ | Raw `rgba(255,255,255,0.2)` — should be token |
| Active/Press | ❌ | N/A | Not applicable for text inputs (correct omission) |
| Focus | ✅ | ⚠️ | Uses `0 0 0 3px rgba(223, 255, 97, 0.15)` — should be dual-layer ring for consistency |
| Disabled | ✅ | ✅ | `opacity: 0.5; pointer-events: none` |
| Loading | ✅ | ✅ | Spinner with reduced opacity |
| Error | ✅ | ✅ | Border color change, focus ring color override, label color change |
| Success | ✅ | ✅ | Border color change, focus ring color override, label color change |

### Interaction Audit
- Keyboard: Native input keyboard — Tab focuses, typing works. No custom keyboard handlers needed beyond native.
- ARIA: `aria-invalid`, `aria-busy`, `aria-required`, `aria-label`, `aria-describedby` — comprehensive. Form-associated with `ElementInternals`.
- Events: `cg-input` (on input change), `cg-clear` (on clear button click). Both bubble and compose.

## Style Fixes Needed

1. **Line 47**: `border: 1px solid rgba(255, 255, 255, 0.1)` → `border: var(--cg-border-width-50, 1px) solid var(--cg-color-surface-field-border, rgba(255, 255, 255, 0.1))`
2. **Line 48**: `border-radius: 8px` → `border-radius: var(--cg-border-radius-100, 8px)`
3. **Line 49**: `background: rgba(255, 255, 255, 0.04)` → `background: var(--cg-color-input-background-default, rgba(255, 255, 255, 0.04))`
4. **Line 50**: `transition: all 150ms` → `transition: border-color var(--cg-motion-duration-normal, 150ms) ease, box-shadow var(--cg-motion-duration-fast, 150ms) ease`
5. **Line 51**: `height: 36px` → `height: var(--cg-component-input-height-md, 36px)`
6. **Line 56**: sm variant `border-radius: 6px` → `border-radius: var(--cg-border-radius-75, 6px)`
7. **Line 57**: lg variant `border-radius: 10px` → `border-radius: var(--cg-border-radius-125, 10px)`
8. **Line 46**: `padding: 0 12px` → `padding: 0 var(--cg-spacing-12, 12px)`
9. **Line 68**: `border-color: rgba(255, 255, 255, 0.2)` → `border-color: var(--cg-color-surface-field-border-hover, rgba(255, 255, 255, 0.2))`
10. **Line 95**: Focus ring `0 0 0 3px rgba(223, 255, 97, 0.15)` → dual-layer: `0 0 0 2px var(--cg-color-surface-primary-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61)`

## Interaction Fixes Needed

1. The floating label is rendered inside the shadow root with `aria-label` on the input. This means screen readers get the label via `aria-label` but the visible floating label has no `id` linked via `aria-labelledby`. Consider adding `id="label"` to the floating label span and using `aria-labelledby="label"` on the input (instead of `aria-label`).
2. Clear button has `tabindex="-1"` — acceptable but consider making it focusable for keyboard-only users who want to clear without selecting all + delete.

## Test Spec

```typescript
describe('cg-input', () => {
  // Rendering
  it('renders with shadow DOM')
  it('renders default state correctly')
  it('renders a native input element')

  // Props
  it('label — shows floating label')
  it('value — sets input value')
  it('placeholder — sets placeholder text')
  it('type — sets input type (email, password, etc.)')
  it('size — applies sm/md/lg dimensions')
  it('rounded — overrides border-radius')
  it('disabled — disables input')
  it('readonly — makes input readonly with dashed border')
  it('error — applies error border and label color')
  it('success — applies success border and label color')
  it('loading — shows spinner and disables input')
  it('required — sets aria-required')
  it('clearable — shows clear button when value present')
  it('maxlength — shows character count')

  // Floating label
  it('label floats up when input is focused')
  it('label stays floated when input has value')
  it('label returns when input is empty and blurred')

  // Slots
  it('renders prefix slot')
  it('renders suffix slot')

  // States
  it('hover state changes border color')
  it('focus state shows accent border and glow')
  it('disabled state reduces opacity')
  it('loading shows spinner')

  // Keyboard
  it('Tab focuses the input')
  it('typing updates value and fires cg-input')

  // Events
  it('fires cg-input with value on input')
  it('fires cg-clear when clear button clicked')

  // Accessibility
  it('has aria-invalid when error')
  it('has aria-busy when loading')
  it('has aria-required when required')
  it('has aria-describedby linked to helper text')
  it('form-associated: setFormValue on value change')
  it('form-associated: setValidity when required and empty')
});
```
