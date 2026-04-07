# cg-number-input

**Tag**: `<cg-number-input>`
**File**: `src/components/cg-number-input/cg-number-input.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: `var(--cg-border-radius-150, 12px)` wrapper — good token. Rounded overrides also use tokens.
- Padding: None on wrapper (overflow: hidden with child layout), buttons use padding: 0 — appropriate.
- Font sizes: `var(--cg-font-size-xs, 12px)` sm, `var(--cg-font-size-sm, 14px)` md, `var(--cg-font-size-base, 16px)` lg — good tokens.
- Colors: `--cg-color-input-border-default`, `--cg-color-input-background-default`, `--cg-color-action-secondary-background-default`, `--cg-color-action-secondary-background-hover`, `--cg-color-surface-base-text`, `--cg-color-input-text-default`, `--cg-color-input-text-placeholder`, `--cg-brand-ai-accent`, `--cg-color-status-error-*`, `--cg-color-status-success-*`. Excellent token coverage.
- Borders: `1px solid var(--cg-color-input-border-default)` — width hardcoded, should use `--cg-border-width-50`.
- Transitions: Explicit `border-color`, `box-shadow` on wrapper, `background`, `transform` on buttons — good.
- Background: `--cg-color-input-background-default` wrapper, `--cg-color-action-secondary-background-default` buttons — good.

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Good token usage |
| Hover | ✅ | ✅ | Wrapper border + button background change |
| Active/Press | ✅ | ✅ | Buttons use `--cg-interaction-press-scale` token |
| Focus | ✅ | ✅ | Dual-layer focus ring on wrapper — excellent |
| Disabled | ✅ | ✅ | `opacity: 0.5; cursor: not-allowed` on wrapper, buttons disabled |
| Loading | ✅ | ✅ | Spinner replaces input field |
| Error | ✅ | ✅ | Error border, focus ring, label color |
| Success | ✅ | ✅ | Success border, focus ring, label color |

### Interaction Audit
- Keyboard: ArrowUp/ArrowDown increment/decrement. Direct typing with numeric parsing. Good.
- ARIA: `role="spinbutton"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label`, `aria-required`, `aria-invalid`, `aria-busy`. Buttons have `aria-label="Decrease"/"Increase"`. Excellent.
- Events: `cg-change` with `{value}`. Bubbles and composes. Long-press repeat on buttons.

## Style Fixes Needed

1. **Line 31**: `border: 1px solid var(--cg-color-input-border-default)` → `border: var(--cg-border-width-50, 1px) solid var(--cg-color-input-border-default, #3f3f46)`
2. **Line 110**: Button hover `transform: scale(var(--cg-interaction-hover-scale, 1.05))` — this is a hover scale which is unusual for stepper buttons and could cause layout shift. Consider removing or reducing to 1.02.
3. **Line 144**: `.label` spacing `margin-bottom: var(--cg-spacing-4, 4px)` — good.
4. Buttons have `focus-visible` with dual-layer ring — excellent consistency.

## Interaction Fixes Needed

1. The long-press repeat (lines 204-213) uses `setTimeout` with accelerating delay (400ms initial, `*0.8` each repeat, min 60ms). This is a nice UX pattern. Ensure `_stopRepeat` is called on `touchend` as well — it is (line 264).
2. Touch events use `preventDefault()` on `touchstart` to prevent scrolling — correct for buttons but verify it doesn't interfere with page scroll when the component is in a scrollable container.
3. The `_onInput` handler (line 216-219) parses the raw input value — if the user types something non-numeric, `parseFloat` returns `NaN` and the value is not updated. Consider showing an error state or clearing the invalid input.

## Test Spec

```typescript
describe('cg-number-input', () => {
  // Rendering
  it('renders with shadow DOM')
  it('renders decrement button, input, increment button')
  it('renders label when provided')

  // Props
  it('value — displays in input')
  it('min/max — clamps value')
  it('step — controls increment amount')
  it('label — shows label above')
  it('size — applies sm/md/lg dimensions')
  it('rounded — overrides border-radius')
  it('disabled — disables all controls')
  it('error — applies error styling')
  it('success — applies success styling')
  it('loading — shows spinner replacing input')

  // Increment/Decrement
  it('increment button increases value by step')
  it('decrement button decreases value by step')
  it('increment disabled at max')
  it('decrement disabled at min')
  it('long press repeats increment')
  it('long press accelerates over time')

  // States
  it('hover changes wrapper border')
  it('focus shows dual-layer focus ring')
  it('button hover changes background')
  it('button press scales down')

  // Keyboard
  it('ArrowUp increments value')
  it('ArrowDown decrements value')
  it('direct typing updates value')

  // Events
  it('fires cg-change with value on change')

  // Accessibility
  it('has role="spinbutton"')
  it('has aria-valuenow, aria-valuemin, aria-valuemax')
  it('has aria-label on input')
  it('buttons have aria-label')
  it('form-associated: setFormValue on value change')
});
```
