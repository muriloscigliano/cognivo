# cg-textarea

**Tag**: `<cg-textarea>`
**File**: `src/components/cg-textarea/cg-textarea.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: `var(--cg-border-radius-150, 12px)` — good token usage. Rounded overrides use tokens too.
- Padding: `var(--cg-spacing-12, 12px)` — good token usage. Size variants also use tokens.
- Font sizes: `var(--cg-font-size-sm, 14px)` — good. Size variants use `--cg-font-size-xs` (sm), `--cg-font-size-base` (lg).
- Colors: `--cg-color-surface-field-border`, `--cg-color-input-background-default`, `--cg-color-surface-base-text`, `--cg-brand-ai-accent`, `--cg-color-status-error-text`, `--cg-color-status-success-text-default`, `--cg-color-surface-tertiary-text`, `--cg-color-input-text-placeholder`. Good token coverage.
- Borders: `var(--cg-border-width-50, 1px) solid var(--cg-color-surface-field-border, #27272a)` — good.
- Transitions: Explicit `border-color`, `box-shadow`, `height` transitions with token durations — good.
- Background: `var(--cg-color-input-background-default, #18181b)` — good.

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Clean default styling with tokens |
| Hover | ✅ | ✅ | Uses `--cg-focus-ring-color` token |
| Active/Press | ✅ | ⚠️ | Uses `scale(0.99)` which is unusual for textarea — may cause text jitter during typing |
| Focus | ✅ | ✅ | Dual-layer focus ring: `0 0 0 2px bg, 0 0 0 4px accent` — excellent |
| Disabled | ✅ | ✅ | `opacity: 0.5; cursor: not-allowed` |
| Loading | ✅ | ✅ | Overlay with spinner centered |
| Error | ✅ | ✅ | Border + focus ring override |
| Success | ✅ | ✅ | Border + focus ring override |

### Interaction Audit
- Keyboard: Native textarea keyboard. Tab to focus, typing works, resize handle works.
- ARIA: `aria-invalid`, `aria-busy`, `aria-required`, `aria-label`, `aria-describedby`. Form-associated with `ElementInternals`.
- Events: `cg-input` with `{value}` detail. Bubbles and composes.

## Style Fixes Needed

1. **Line 71-73**: `:active` transform `scale(0.99)` on textarea — remove this. Text inputs should not scale on press. It causes visual jitter during normal interaction (clicking into the textarea to type).
2. **Line 69**: Hover uses `--cg-focus-ring-color` which is a focus token being reused for hover — consider using a dedicated hover border color token like `--cg-color-surface-field-border-hover`.
3. **Line 207**: Size variant `sm` overrides `padding` and `min-height` on same line — ensure the `label` padding overrides (lines 107-114) also account for sm/lg sizes consistently. Currently they do, but the ordering could cause specificity issues since generic size styles come after label padding styles.

## Interaction Fixes Needed

1. The `:active` press scale (line 71-73) should be removed for textarea — pressing/clicking into a text area is a positioning action, not a button press.
2. The `autoresize` feature modifies `style.height` directly in `_handleInput` — this works but should also trigger on initial render if `value` is set programmatically. Consider adding resize logic to `firstUpdated`.
3. Readonly textarea uses `background: var(--cg-color-surface-field-disable-background)` — same as disabled. Consider a distinct background or visual indicator (e.g., dashed border like `cg-input` does).

## Test Spec

```typescript
describe('cg-textarea', () => {
  // Rendering
  it('renders with shadow DOM')
  it('renders default state correctly')
  it('renders a native textarea element')

  // Props
  it('label — shows floating label')
  it('value — sets textarea value')
  it('placeholder — sets placeholder text')
  it('rows — sets textarea rows')
  it('size — applies sm/md/lg dimensions')
  it('rounded — overrides border-radius')
  it('disabled — disables textarea')
  it('readonly — makes textarea readonly')
  it('error — applies error border')
  it('success — applies success border')
  it('loading — shows overlay spinner')
  it('autoresize — disables manual resize and grows with content')
  it('maxlength — shows character count')
  it('helper — shows helper text below')

  // Floating label
  it('label floats up when focused')
  it('label stays floated when has value')
  it('label returns when empty and blurred')

  // States
  it('hover state changes border color')
  it('focus-visible shows dual-layer focus ring')
  it('disabled state reduces opacity')
  it('loading shows overlay with spinner')

  // Keyboard
  it('Tab focuses the textarea')

  // Events
  it('fires cg-input with value on input')

  // Accessibility
  it('has aria-invalid when error')
  it('has aria-busy when loading')
  it('has aria-required when required')
  it('has aria-describedby linked to helper text')
  it('form-associated: setFormValue on value change')
});
```
