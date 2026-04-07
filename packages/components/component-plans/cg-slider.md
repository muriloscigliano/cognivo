# cg-slider

**Tag**: `<cg-slider>`
**File**: `src/components/cg-slider/cg-slider.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: `var(--cg-component-slider-track-radius, 3px)` track, `var(--cg-border-radius-full, 99999px)` thumb — good token usage.
- Padding: `var(--cg-spacing-8, 8px) 0` wrapper — good.
- Font sizes: `var(--cg-font-size-sm, 14px)` label/value, `var(--cg-font-size-xs, 12px)` range labels — good.
- Colors: `--cg-color-slider-track-background`, `--cg-color-slider-thumb-background`, `--cg-brand-ai-accent` value display, `--cg-color-surface-base-text` label, `--cg-color-surface-tertiary-text` range labels, `--cg-color-white` thumb border, `--cg-color-status-error-*`, `--cg-color-status-success-*`. Good token coverage.
- Borders: `var(--cg-component-slider-thumb-border-width, 3px) solid var(--cg-color-white)` on thumb — good.
- Transitions: `transform var(--cg-motion-duration-normal, 150ms)` on thumb — good.
- Background: See Colors above.

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Track and thumb with proper tokens |
| Hover | ✅ | ✅ | Thumb scales to 1.15 on hover |
| Active/Press | ✅ | ✅ | Thumb scales to `var(--cg-interaction-press-scale, 0.97)` — good token |
| Focus | ✅ | ⚠️ | `0 0 0 4px var(--cg-overlay-accent-strong, ...)` — single layer, should be dual-layer |
| Disabled | ✅ | ✅ | `opacity: 0.5; cursor: not-allowed` |
| Loading | ✅ | ✅ | Animated loading bar at bottom |
| Error | ✅ | ✅ | Red track, thumb, label, value display |
| Success | ✅ | ✅ | Green track, thumb, label, value display |

### Interaction Audit
- Keyboard: Native range input — arrow keys change value natively. No custom keyboard handling needed.
- ARIA: Uses native `input[type="range"]` with `aria-invalid`, `aria-busy`. Missing `aria-label` binding — relies on `name` attr only.
- Events: `cg-change` with `{value}`. Bubbles and composes.

## Style Fixes Needed

1. **Line 92**: Focus ring on thumb → dual-layer: `box-shadow: 0 0 0 2px var(--cg-color-surface-primary-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61)`
2. **Line 30**: Track height `var(--cg-spacing-6, 6px)` — consider using a component-specific token `--cg-component-slider-track-height` instead of spacing token.
3. **Line 100**: `margin-top: var(--cg-spacing-4, 4px)` range labels — good.
4. **Line 85-87**: Webkit thumb uses `--cg-spacing-20` for size — should use component token `--cg-component-slider-thumb-size` instead of spacing token.
5. Missing: The slider track does not show a "filled" portion (left of thumb). Most modern sliders show a colored fill from min to current value. Consider adding a `--cg-color-slider-track-fill` with JS-driven `background: linear-gradient()`.
6. **Lines 94-98**: Moz thumb duplicates Webkit thumb styles — ensure both use identical tokens.

## Interaction Fixes Needed

1. Add `aria-label` binding from the `label` prop to the native `<input>` — currently only visual label, no programmatic link.
2. Consider adding a tooltip/popover that shows the current value while dragging — the `showValue` header display updates but is far from the thumb.
3. The `step` prop works with native range behavior but there's no visual indication of discrete steps (tick marks). Consider adding optional tick marks.

## Test Spec

```typescript
describe('cg-slider', () => {
  // Rendering
  it('renders with shadow DOM')
  it('renders default state with track and thumb')
  it('renders value display in header')

  // Props
  it('label — shows label text')
  it('value — sets slider position')
  it('min/max — sets range boundaries')
  it('step — sets increment size')
  it('size — applies sm/md/lg track and thumb sizes')
  it('disabled — disables slider')
  it('error — applies red styling')
  it('success — applies green styling')
  it('loading — shows loading bar')
  it('showValue — toggles value display')
  it('showRange — toggles min/max labels')
  it('unit — appends unit to value display')

  // States
  it('hover scales up the thumb')
  it('active/press scales down the thumb')
  it('focus-visible shows focus ring on thumb')
  it('disabled reduces opacity')

  // Keyboard
  it('ArrowRight/ArrowUp increases value')
  it('ArrowLeft/ArrowDown decreases value')

  // Events
  it('fires cg-change with value on input')

  // Accessibility
  it('uses native range input semantics')
  it('has aria-invalid when error')
  it('has aria-busy when loading')
  it('form-associated: setFormValue on value change')
});
```
