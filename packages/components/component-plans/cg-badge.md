# cg-badge

**Tag**: `<cg-badge>`
**File**: `src/components/cg-badge/cg-badge.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: `4px` (sm), `6px` (md/lg) — hardcoded. Rounded overrides use hardcoded values too (`4px`, `6px`, `8px`, `9999px`) — should use tokens.
- Padding: `1px 6px` (sm), `2px 8px` (md), `3px 10px` (lg) — hardcoded, should use spacing tokens.
- Font sizes: `11px` (sm), `12px` (md), `13px` (lg) — hardcoded, should use `--cg-font-size-*` tokens.
- Colors: `rgba(255,255,255,0.1)` neutral bg, `rgba(59,130,246,0.12)` info bg, `rgba(34,197,94,0.12)` success bg, `rgba(245,158,11,0.12)` warning bg, `rgba(239,68,68,0.12)` danger bg, `rgba(223,255,97,0.1)` accent bg. Semantic tokens used for text (`--cg-color-status-*-text`), but backgrounds use raw rgba. Border colors also raw rgba.
- Borders: `1px solid transparent` — width hardcoded.
- Transitions: `all 150ms` — too generic.
- Background: See Colors above.

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ⚠️ | Raw rgba backgrounds and border colors |
| Hover | ❌ | ❌ | Missing — badges are non-interactive by default, but removable ones should have hover |
| Active/Press | ❌ | N/A | Badges are display-only |
| Focus | ❌ | ⚠️ | Remove button has `focus-visible` with `outline` — good for the button, but uses `outline` instead of `box-shadow` dual-layer |
| Disabled | ❌ | ❌ | Missing |
| Loading | ❌ | ❌ | Missing |
| Error | ❌ | N/A | Uses `variant="danger"` instead |
| Success | ❌ | N/A | Uses `variant="success"` instead |

### Interaction Audit
- Keyboard: Remove button is a native `<button>` — Enter/Space works. No custom keyboard handlers.
- ARIA: Badge span has `role="status"` when `dot` is true, `role="presentation"` otherwise. Remove button has `aria-label="Remove {label}"`. Good.
- Events: `cg-badge-remove` with `{label}` on remove button click. Bubbles and composes.

## Style Fixes Needed

1. **Lines 44-46**: Size sm padding `1px 6px` → `padding: var(--cg-spacing-1, 1px) var(--cg-spacing-6, 6px)` and `font-size: 11px` → `font-size: var(--cg-font-size-2xs, 11px)`. `border-radius: 4px` → `border-radius: var(--cg-border-radius-50, 4px)`.
2. **Lines 48-50**: Size md padding `2px 8px` → `padding: var(--cg-spacing-2, 2px) var(--cg-spacing-8, 8px)` and `font-size: 12px` → `font-size: var(--cg-font-size-xs, 12px)`. `border-radius: 6px` → `border-radius: var(--cg-border-radius-75, 6px)`.
3. **Lines 52-54**: Size lg similarly tokenize.
4. **Line 38**: `border: 1px solid transparent` → `border: var(--cg-border-width-50, 1px) solid transparent`
5. **Line 39**: `transition: all 150ms` → `transition: background-color var(--cg-motion-duration-fast, 150ms) ease, border-color var(--cg-motion-duration-fast, 150ms) ease, opacity var(--cg-motion-duration-fast, 150ms) ease`
6. **Lines 92-96**: Rounded overrides use hardcoded pixel values — should use tokens:
   - `border-radius: 4px` → `border-radius: var(--cg-border-radius-50, 4px)`
   - `border-radius: 6px` → `border-radius: var(--cg-border-radius-75, 6px)`
   - `border-radius: 8px` → `border-radius: var(--cg-border-radius-100, 8px)`
   - `border-radius: 9999px` → `border-radius: var(--cg-border-radius-full, 9999px)`
7. **Lines 61-89**: Variant backgrounds use raw rgba — should use semantic tokens like `--cg-color-status-info-background-default`, etc.
8. **Line 113**: Remove button `width: 14px; height: 14px` — should use `--cg-icon-size-xs` or component token.

## Interaction Fixes Needed

1. The remove button `focus-visible` uses `outline: 2px solid currentColor` — should switch to `box-shadow` dual-layer ring for consistency with the design system.
2. Add a `disabled` prop that dims the badge and hides the remove button.
3. Consider adding hover state for removable badges (subtle background change).
4. The `dot` indicator uses `animation: dotPulse` — this is imported from shared styles. Ensure reduced-motion media query disables it.

## Test Spec

```typescript
describe('cg-badge', () => {
  // Rendering
  it('renders with shadow DOM')
  it('renders default neutral badge')
  it('renders label text')

  // Props
  it('variant — applies neutral/info/success/warning/danger/accent colors')
  it('size — applies sm/md/lg dimensions')
  it('rounded — overrides border-radius')
  it('label — shows badge text')
  it('dot — shows pulsing dot indicator')
  it('removable — shows remove button')

  // Slots
  it('renders additional slot content after label')

  // Remove
  it('remove button fires cg-badge-remove')
  it('remove button has aria-label')

  // States
  it('dot variant has role="status"')
  it('entrance animation plays')

  // Keyboard
  it('remove button activates with Enter/Space')

  // Accessibility
  it('has role="status" when dot is true')
  it('has role="presentation" when dot is false')
  it('remove button has accessible label')
});
```
