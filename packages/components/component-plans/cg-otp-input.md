# cg-otp-input

**Tag**: `<cg-otp-input>`
**File**: `src/components/cg-otp-input/cg-otp-input.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: `var(--cg-border-radius-150, 12px)` on boxes — good. Rounded overrides use tokens.
- Padding: None on boxes (text-align: center handles alignment) — appropriate.
- Font sizes: `var(--cg-font-size-lg, 20px)` — good token.
- Colors: `--cg-color-input-border-default`, `--cg-color-input-background-default`, `--cg-color-input-text-default`, `--cg-brand-ai-accent` (caret, focus border), `--cg-color-status-error-border-default`, `--cg-color-status-error-text`, `--cg-color-surface-container-border`. Good token coverage.
- Borders: `1px solid var(--cg-color-input-border-default)` — width hardcoded.
- Transitions: Explicit `border-color`, `box-shadow`, `transform` with token durations — good.
- Background: `var(--cg-color-input-background-default, #18181b)`.

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Good tokens, staggered entrance animation |
| Hover | ✅ | ✅ | Border color changes to accent |
| Active/Press | ❌ | N/A | Not applicable for individual input boxes |
| Focus | ✅ | ✅ | Dual-layer focus ring + scale(1.05) — excellent |
| Disabled | ✅ | ✅ | `opacity: 0.5; cursor: not-allowed` |
| Loading | ❌ | ❌ | Missing — should have one for async verification |
| Error | ✅ | ⚠️ | Border color change only — no focus ring override for error |
| Success | ❌ | ❌ | Missing — should indicate successful OTP entry |

### Interaction Audit
- Keyboard: Typing auto-advances to next box, Backspace goes to previous. ArrowLeft/ArrowRight navigate. Good.
- ARIA: `role="group"` with `aria-label` on container. Each box has `aria-label="Digit X of Y"`. `autocomplete="one-time-code"`. Good.
- Events: `cg-otp-change` (on each digit), `cg-otp-complete` (when all digits filled). Bubbles and composes.

## Style Fixes Needed

1. **Line 27**: `border: 1px solid` → `border: var(--cg-border-width-50, 1px) solid`
2. **Line 22**: `gap: var(--cg-spacing-8, 8px)` — good.
3. Add success state:
   ```css
   :host([success]) .box { border-color: var(--cg-color-status-success-text-default, #4ade80); }
   :host([success]) .box:focus {
     border-color: var(--cg-color-status-success-text-default, #4ade80);
     box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-color-status-success-text-default, #4ade80);
   }
   ```
4. Add loading state (spinner or shimmer animation on boxes).
5. **Line 66-68**: Error focus state — update to use dual-layer ring pattern:
   ```css
   :host([error]) .box:focus {
     border-color: var(--cg-color-status-error-text-default, #ef4444);
     box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-color-status-error-text-default, #ef4444);
   }
   ```
6. **Lines 75-78**: Duplicate `:focus-visible` selector at root level — this is redundant with the `.box:focus` styles. Remove or consolidate.

## Interaction Fixes Needed

1. Add `success` boolean reflected property for visual feedback on valid OTP.
2. Add `loading` boolean reflected property for async verification state.
3. Paste handling (line 161-172) is well-implemented — strips non-numeric chars, fills boxes, focuses correct position.
4. The `mask` mode uses bullet character — good for security. Consider if screen readers should be told the input is masked (e.g., `aria-roledescription="masked digit"`).
5. Missing form association — unlike other form components, `cg-otp-input` does not use `ElementInternals`. Should add for form integration.

## Test Spec

```typescript
describe('cg-otp-input', () => {
  // Rendering
  it('renders with shadow DOM')
  it('renders correct number of input boxes based on length')
  it('renders staggered entrance animation')

  // Props
  it('length — controls number of boxes')
  it('value — pre-fills boxes')
  it('disabled — disables all boxes')
  it('error — applies error border')
  it('mask — shows bullets instead of digits')
  it('rounded — overrides border-radius')

  // Input behavior
  it('typing advances to next box')
  it('only numeric input accepted')
  it('backspace clears current and moves to previous')
  it('paste fills all boxes')
  it('paste strips non-numeric characters')

  // States
  it('hover changes border color')
  it('focus shows dual-layer ring and scales up')
  it('filled box has distinct border')
  it('disabled reduces opacity')
  it('error shows red borders')

  // Keyboard
  it('ArrowLeft moves to previous box')
  it('ArrowRight moves to next box')
  it('Backspace on empty box moves to previous')

  // Events
  it('fires cg-otp-change on each digit entry')
  it('fires cg-otp-complete when all digits filled')

  // Accessibility
  it('container has role="group"')
  it('container has aria-label')
  it('each box has aria-label with digit position')
  it('boxes have autocomplete="one-time-code"')
});
```
