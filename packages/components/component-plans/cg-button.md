# cg-button

**Tag**: `<cg-button>`
**File**: `src/components/cg-button/cg-button.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: `6px` (sm), `8px` (md), `10px` (lg) — hardcoded, not using tokens. Rounded overrides DO use tokens (`--cg-border-radius-50/100/150/full`).
- Padding: `0 12px` (sm), `0 16px` (md), `0 24px` (lg) — hardcoded, should use spacing tokens.
- Font sizes: `13px` (sm), `14px` (md), `15px` (lg) — hardcoded, should use `--cg-font-size-*` tokens.
- Colors: `--cg-brand-ai-accent` (primary bg), `--cg-color-action-primary-text-default` (primary text), `--cg-color-surface-base-text` (secondary/tertiary text), `rgba(255,255,255,0.08/0.12/0.15)` (secondary bg states), `rgba(255,255,255,0.06/0.1)` (tertiary bg states), `rgba(239,68,68,0.12/0.18)` (danger bg), `--cg-color-status-error-text`, `--cg-color-status-success-text`, `--cg-color-white`. Raw `rgba()` values used instead of tokens for secondary/tertiary backgrounds.
- Borders: `1px solid transparent` — border width should use `--cg-border-width-50` token.
- Transitions: `all 150ms` — generic, should be explicit properties. Duration should use `--cg-motion-duration-*` token.
- Background: Varies per variant (see Colors above).

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Per-variant styling present |
| Hover | ✅ | ⚠️ | Primary hover uses raw `rgba(223, 255, 97, 0.9)` — should use token or calc |
| Active/Press | ✅ | ⚠️ | `transform: scale(0.97)` hardcoded — should use `--cg-interaction-press-scale` token. Duplicated in base + each variant. |
| Focus | ✅ | ⚠️ | Uses `rgba(223, 255, 97, 0.3)` — should use `--cg-overlay-accent-*` token. No dual-layer focus ring. |
| Disabled | ✅ | ✅ | `opacity: 0.5; pointer-events: none` — clean |
| Loading | ✅ | ✅ | Spinner with proper positioning, variant-aware spinner color |
| Error | ✅ | ✅ | Via `status="error"` attribute with proper token usage |
| Success | ✅ | ✅ | Via `status="success"` attribute with proper token usage |

### Interaction Audit
- Keyboard: Relies on native `<button>` — Enter/Space work natively. No custom keyboard handling needed.
- ARIA: `aria-busy` for loading, `aria-label` optional prop. Missing `aria-disabled` (uses native `disabled` which is fine). No `role` needed (native button).
- Events: No custom events fired. The component relies on native `click` event bubbling. Should fire a custom event for consistency with the design system pattern.

## Style Fixes Needed

1. **Line 33**: `border: 1px solid transparent` → `border: var(--cg-border-width-50, 1px) solid transparent`
2. **Line 40**: `transition: all 150ms` → `transition: background-color var(--cg-motion-duration-fast, 150ms) var(--cg-motion-easing-color, ease), border-color var(--cg-motion-duration-fast, 150ms) var(--cg-motion-easing-color, ease), box-shadow var(--cg-motion-duration-fast, 150ms) ease, transform var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-default, ease)`
3. **Line 47**: `transform: scale(0.97)` → `transform: scale(var(--cg-interaction-press-scale, 0.97))`
4. **Line 52**: `box-shadow: 0 0 0 3px rgba(223, 255, 97, 0.3)` → dual-layer focus ring: `box-shadow: 0 0 0 2px var(--cg-color-surface-primary-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61)`
5. **Lines 58-73**: Hardcoded `padding`, `font-size`, `border-radius`, `height` in size variants → use spacing/font/radius tokens:
   - sm: `padding: 0 var(--cg-spacing-12, 12px); font-size: var(--cg-font-size-xs, 13px); border-radius: var(--cg-border-radius-75, 6px); height: var(--cg-component-button-height-sm, 32px);`
   - md: `padding: 0 var(--cg-spacing-16, 16px); font-size: var(--cg-font-size-sm, 14px); border-radius: var(--cg-border-radius-100, 8px); height: var(--cg-component-button-height-md, 36px);`
   - lg: `padding: 0 var(--cg-spacing-24, 24px); font-size: var(--cg-font-size-base, 15px); border-radius: var(--cg-border-radius-125, 10px); height: var(--cg-component-button-height-lg, 44px);`
6. **Line 90**: `background: rgba(223, 255, 97, 0.9)` → `background: var(--cg-brand-ai-accent-hover, rgba(223, 255, 97, 0.9))`
7. **Lines 93-94, 107-108, 121-122**: Duplicate `transform: scale(0.97)` in each variant active → use `--cg-interaction-press-scale` token
8. **Lines 99, 101, 103, 106, 113, 117-118, 120**: Raw `rgba(255,255,255,*)` values → use `--cg-overlay-light-*` tokens

## Interaction Fixes Needed

1. Consider emitting a `cg-click` CustomEvent for consistency with other `cg-*` components that all fire prefixed events.
2. Focus ring should use the dual-layer pattern (2px gap + 4px accent) used by other components in the system for visual consistency.

## Test Spec

```typescript
describe('cg-button', () => {
  // Rendering
  it('renders with shadow DOM')
  it('renders default state correctly')
  it('renders a native <button> element')

  // Props
  it('variant — applies primary/secondary/tertiary classes')
  it('size — sets sm/md/lg height and padding')
  it('rounded — overrides border-radius')
  it('type — applies danger styles')
  it('disabled — sets disabled attribute on button')
  it('loading — shows spinner and hides text')
  it('full — sets width: 100%')
  it('status — applies error/success/idle styles')
  it('label — sets button text and aria-label')

  // Slots
  it('renders default slot content')
  it('renders prefix slot')
  it('renders suffix slot')

  // States
  it('hover state changes background')
  it('focus-visible shows focus ring')
  it('active state applies press scale')
  it('disabled prevents interaction')
  it('loading shows spinner and sets aria-busy')

  // Keyboard
  it('Enter activates button')
  it('Space activates button')

  // Events
  it('fires native click event')

  // Accessibility
  it('has no explicit role (native button)')
  it('has aria-busy when loading')
  it('has aria-label when label prop set')
  it('disabled button is not focusable')
});
```
