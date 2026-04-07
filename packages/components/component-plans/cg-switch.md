# cg-switch

**Tag**: `<cg-switch>`
**File**: `src/components/cg-switch/cg-switch.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: `9999px` on track (hardcoded), `50%` on thumb (hardcoded). Both appropriate for pill/circle shapes but should use `--cg-border-radius-full` token.
- Padding: None on track (appropriate — thumb is positioned absolute).
- Font sizes: `var(--cg-font-size-sm, 14px)` label — good.
- Colors: `rgba(255,255,255,0.1)` track default (hardcoded), `--cg-brand-ai-accent` checked track, `--cg-color-white` thumb, `rgba(255,255,255,0.15)` hover (hardcoded), `rgba(223,255,97,0.9)` checked hover (hardcoded), `--cg-color-status-error-*`, `--cg-color-status-success-*`.
- Borders: None on track/thumb (appropriate).
- Transitions: `all 150ms` on track (generic), `transform 250ms cubic-bezier(0.34,1.56,0.64,1)` on thumb (good spring easing).
- Background: See Colors above.

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ⚠️ | Track bg uses raw rgba |
| Hover | ✅ | ⚠️ | Raw rgba values for hover bg |
| Active/Press | ✅ | ✅ | Thumb scale(1.1) on press — good tactile feedback |
| Focus | ✅ | ⚠️ | `0 0 0 3px rgba(223, 255, 97, 0.25)` — should use dual-layer ring |
| Disabled | ✅ | ✅ | `opacity: 0.5; pointer-events: none` |
| Loading | ✅ | ✅ | Spinner replaces track |
| Error | ✅ | ✅ | Red track and label color |
| Success | ✅ | ✅ | Green track and label color |

### Interaction Audit
- Keyboard: Space and Enter toggle via `@keydown` handler. Label has `tabindex="0"`.
- ARIA: `role="switch"`, `aria-checked`, `aria-disabled`, `aria-invalid`, `aria-busy`. Hidden native checkbox. Comprehensive.
- Events: `cg-change` with `{checked}`. Bubbles and composes.

## Style Fixes Needed

1. **Line 52**: `border-radius: 9999px` → `border-radius: var(--cg-border-radius-full, 9999px)`
2. **Line 53**: `background: rgba(255,255,255,0.1)` → `background: var(--cg-color-switch-track-default, rgba(255,255,255,0.1))`
3. **Line 54**: `transition: all 150ms` → `transition: background var(--cg-motion-duration-fast, 150ms) var(--cg-motion-easing-color, ease), box-shadow var(--cg-motion-duration-fast, 150ms) ease`
4. **Line 49**: `width: 40px; height: 22px` → `width: var(--cg-component-switch-width-md, 40px); height: var(--cg-component-switch-height-md, 22px)`
5. **Line 65-66**: `width: 16px; height: 16px` → `width: var(--cg-component-switch-thumb-md, 16px); height: var(--cg-component-switch-thumb-md, 16px)`
6. **Line 67**: `border-radius: 50%` → `border-radius: var(--cg-border-radius-full, 50%)`
7. **Line 89**: `background: rgba(255,255,255,0.15)` → `background: var(--cg-color-switch-track-hover, rgba(255,255,255,0.15))`
8. **Line 92**: `background: rgba(223,255,97,0.9)` → `background: var(--cg-brand-ai-accent-hover, rgba(223,255,97,0.9))`
9. **Line 97**: Focus ring → dual-layer: `box-shadow: 0 0 0 2px var(--cg-color-surface-primary-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61)`
10. **Lines 154-161**: Size variant dimensions hardcoded → use component tokens for width/height/thumb per size.

## Interaction Fixes Needed

1. Focus ring should be the dual-layer ring pattern used by other form controls for consistency.
2. Missing `name` form value association — the `formResetCallback` and `formStateRestoreCallback` are present, and `name` prop exists, but `_internals?.setFormValue` is called in `updated`. Seems correct.
3. Missing `user-select: none` on label.

## Test Spec

```typescript
describe('cg-switch', () => {
  // Rendering
  it('renders with shadow DOM')
  it('renders default unchecked state')
  it('renders checked state with thumb translated')

  // Props
  it('label — shows label text')
  it('checked — toggles checked state')
  it('disabled — prevents toggling')
  it('error — applies red track and label')
  it('success — applies green track and label')
  it('loading — shows spinner replacing track')
  it('size — applies sm/md/lg dimensions')

  // States
  it('hover state lightens track background')
  it('focus-visible shows focus ring on track')
  it('active/press scales thumb up')
  it('disabled state reduces opacity')

  // Keyboard
  it('Space toggles the switch')
  it('Enter toggles the switch')

  // Events
  it('fires cg-change with checked boolean')
  it('does not fire when disabled')

  // Accessibility
  it('has role="switch"')
  it('has aria-checked reflecting state')
  it('has aria-disabled when disabled')
  it('has aria-invalid when error')
  it('has aria-busy when loading')
  it('form-associated: setFormValue on toggle')
});
```
