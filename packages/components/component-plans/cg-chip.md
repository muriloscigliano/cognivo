# cg-chip

**Tag**: `<cg-chip>`
**File**: `src/components/cg-chip/cg-chip.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: `999px` hardcoded default (pill shape). Rounded overrides use tokens (`--cg-border-radius-50/100/150/full`). Good overrides.
- Padding: `2px 8px` (sm), `4px 12px` (md) — hardcoded, should use spacing tokens.
- Font sizes: `var(--cg-font-size-xs, 12px)` sm, `var(--cg-font-size-sm, 14px)` md — good tokens.
- Colors: `--cg-color-badge-background-default`, `--cg-color-surface-secondary-text`, `--cg-color-surface-base-border` (default variant), `--cg-color-badge-background-success`, `--cg-green-400`, `--cg-color-status-success-border-default` (success), `--cg-color-badge-background-warning`, `--cg-yellow-400`, `--cg-color-status-warning-border-default` (warning), `--cg-color-badge-background-error`, `--cg-red-400`, `--cg-color-status-error-border-default` (error), `--cg-color-status-info-background-default`, `--cg-brand-ai-accent`, `--cg-color-status-info-border-default` (accent). Good token coverage on colors. Hover states use semantic tokens too.
- Borders: `1px solid transparent` — width hardcoded.
- Transitions: Explicit `transform`, `background-color`, `border-color`, `box-shadow`, `opacity` with token durations — excellent.
- Background: See Colors above.

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Per-variant styling with tokens |
| Hover | ✅ | ✅ | Background change + scale(1.02) per variant |
| Active/Press | ✅ | ✅ | `scale(var(--cg-interaction-press-scale, 0.97))` — good token |
| Focus | ✅ | ✅ | Dual-layer focus ring — excellent |
| Disabled | ✅ | ✅ | `opacity: 0.45; cursor: not-allowed; pointer-events: none` |
| Loading | ❌ | ❌ | Missing |
| Error | ❌ | N/A | Uses `variant="error"` instead |
| Success | ❌ | N/A | Uses `variant="success"` instead |

### Interaction Audit
- Keyboard: Enter/Space fire click via `@keydown`. Delete/Backspace fire remove (when removable). Good.
- ARIA: `role="button"`, `tabindex`, `aria-disabled`, `aria-label`. Remove button has `aria-label="Remove {label}"` and `tabindex="-1"`. Good.
- Events: `cg-chip-click` with `{label}` on click, `cg-chip-remove` with `{label}` on remove. Bubbles and composes.

## Style Fixes Needed

1. **Line 32**: `border: 1px solid transparent` → `border: var(--cg-border-width-50, 1px) solid transparent`
2. **Line 33**: `border-radius: 999px` → `border-radius: var(--cg-border-radius-full, 999px)` (default rounded is full)
3. **Lines 50-51**: sm padding `2px 8px` → `padding: var(--cg-spacing-2, 2px) var(--cg-spacing-8, 8px)` and `height: 24px` → `height: var(--cg-component-chip-height-sm, 24px)`
4. **Lines 54-55**: md padding `4px 12px` → `padding: var(--cg-spacing-4, 4px) var(--cg-spacing-12, 12px)` and `height: 30px` → `height: var(--cg-component-chip-height-md, 30px)`
5. **Line 149**: `.chip-icon width/height: 14px` → `width: var(--cg-icon-size-xs, 14px); height: var(--cg-icon-size-xs, 14px)`
6. **Line 150**: `.chip-icon font-size: 12px` → `font-size: var(--cg-font-size-xs, 12px)`
7. **Line 158**: `.chip-label max-width: 160px` → `max-width: var(--cg-component-chip-label-max-width, 160px)`
8. **Line 166**: Remove button `width: 16px; height: 16px` → `width: var(--cg-icon-size-sm, 16px); height: var(--cg-icon-size-sm, 16px)`
9. **Line 167**: `margin-left: 2px; margin-right: -4px` — hardcoded, should use spacing tokens.

## Interaction Fixes Needed

1. The remove button has `tabindex="-1"` — this means keyboard users must use Delete/Backspace to remove. This is documented via the `@keydown` handler. Good pattern but consider making the remove button focusable for discoverability.
2. The `icon` prop renders as text content (`${this.icon}`) — should either support slot-based icons or at least render as `innerHTML` for emoji/unicode support. Currently it works for emoji strings.
3. Consider adding a `selected` visual state (beyond the variant system) for toggle-chip patterns.

## Test Spec

```typescript
describe('cg-chip', () => {
  // Rendering
  it('renders with shadow DOM')
  it('renders default variant')
  it('renders label text')

  // Props
  it('label — shows chip text')
  it('variant — applies default/success/warning/error/accent colors')
  it('size — applies sm/md dimensions')
  it('rounded — overrides border-radius')
  it('icon — shows icon before label')
  it('removable — shows remove button')
  it('disabled — dims and prevents interaction')

  // States
  it('hover changes background and scales up slightly')
  it('active/press scales down')
  it('focus-visible shows dual-layer ring')
  it('disabled reduces opacity')

  // Keyboard
  it('Enter fires cg-chip-click')
  it('Space fires cg-chip-click')
  it('Delete fires cg-chip-remove when removable')
  it('Backspace fires cg-chip-remove when removable')

  // Events
  it('fires cg-chip-click with label')
  it('fires cg-chip-remove with label')
  it('does not fire events when disabled')

  // Accessibility
  it('has role="button"')
  it('has aria-disabled when disabled')
  it('has aria-label with label text')
  it('remove button has aria-label')
});
```
