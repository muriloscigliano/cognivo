# cg-color-picker

**Tag**: `<cg-color-picker>`
**File**: `src/components/cg-color-picker/cg-color-picker.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: `var(--cg-border-radius-100, 8px)` swatch, `var(--cg-border-radius-75, 6px)` inner fill, `var(--cg-border-radius-full)` preview dot, `var(--cg-border-radius-100, 8px)` hex input. Good token usage.
- Padding: `var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px)` hex input — good.
- Font sizes: `var(--cg-font-size-xs, 12px)` label, `var(--cg-font-size-sm, 14px)` hex input — good.
- Colors: `--cg-color-input-text-placeholder`, `--cg-brand-ai-accent` (selected ring), `--cg-color-surface-base-background` (ring gap), `--cg-color-surface-container-border`, `--cg-color-input-border-default`, `--cg-color-input-background-default`, `--cg-color-input-text-default`, `--cg-overlay-white-subtle`. Good token coverage.
- Borders: `var(--cg-border-width-100, 2px) solid transparent` swatch, `1px solid var(--cg-color-input-border-default)` hex input — hex input border width hardcoded.
- Transitions: `transform` and `box-shadow` with token durations on swatches — good.
- Background: None on grid, individual swatches use dynamic `style` binding.

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Clean grid with proper tokens |
| Hover | ✅ | ✅ | Scale(1.1) with token `--cg-interaction-hover-scale` |
| Active/Press | ✅ | ✅ | Scale(0.97) with token `--cg-interaction-press-scale` |
| Focus | ✅ | ✅ | Dual-layer focus ring — excellent |
| Disabled | ❌ | ❌ | Missing — no disabled state at all |
| Loading | ❌ | ❌ | Missing |
| Error | ❌ | ❌ | Missing |
| Success | ❌ | ❌ | Missing |

### Interaction Audit
- Keyboard: Arrow keys (Right/Left/Down/Up) navigate grid. Enter/Space select. Good grid navigation pattern.
- ARIA: `role="radiogroup"` on grid, `role="radio"` with `aria-checked` on swatches, `aria-label` on each swatch (the hex value). Hex input has `aria-label`. Good.
- Events: `cg-color-change` with `{color}`. Bubbles and composes.

## Style Fixes Needed

1. **Line 88**: Hex input `border: 1px solid` → `border: var(--cg-border-width-50, 1px) solid`
2. **Line 151**: Grid `style="grid-template-columns: repeat(${columns}, 28px)"` — the `28px` should reference `var(--cg-component-swatch-size)` for consistency. Alternatively, use `1fr` with a fixed grid width.
3. Add disabled state:
   ```css
   :host([disabled]) .grid { opacity: 0.5; pointer-events: none; }
   :host([disabled]) .hex-input { opacity: 0.5; cursor: not-allowed; }
   ```
4. Add error state for hex input validation:
   ```css
   :host([error]) .hex-input { border-color: var(--cg-color-status-error-text-default, #ef4444); }
   ```

## Interaction Fixes Needed

1. Add `disabled` boolean property to prevent color selection.
2. The hex input validation (line 142-144) only selects if the hex is valid — but there's no visual error feedback if the user enters an invalid hex. Consider setting an internal error state.
3. The `_focusedIndex` state tracks keyboard position, but there's no `aria-activedescendant` on the grid — it uses `focus()` directly on swatches which is fine.
4. Swatch keyboard nav wraps horizontally but not vertically (ArrowDown at last row goes to `Math.min(idx+columns, len-1)`) — consider wrapping or stopping at boundary explicitly.
5. Missing form association via `ElementInternals`.

## Test Spec

```typescript
describe('cg-color-picker', () => {
  // Rendering
  it('renders with shadow DOM')
  it('renders swatch grid with default colors')
  it('renders correct number of columns')

  // Props
  it('value — highlights selected swatch')
  it('colors — renders custom color array')
  it('columns — controls grid columns')
  it('label — shows label text')
  it('allowCustom — shows hex input and preview')

  // Selection
  it('clicking swatch selects that color')
  it('selected swatch shows accent ring')

  // Custom hex input
  it('typing valid hex selects color')
  it('invalid hex does not select')
  it('preview dot shows current color')

  // States
  it('hover scales up swatch')
  it('active/press scales down swatch')
  it('focus-visible shows dual-layer ring')

  // Keyboard
  it('ArrowRight moves to next swatch')
  it('ArrowLeft moves to previous swatch')
  it('ArrowDown moves to next row')
  it('ArrowUp moves to previous row')
  it('Enter selects focused swatch')
  it('Space selects focused swatch')

  // Events
  it('fires cg-color-change with color hex')

  // Accessibility
  it('grid has role="radiogroup"')
  it('swatches have role="radio" and aria-checked')
  it('each swatch has aria-label with hex value')
  it('hex input has aria-label')
});
```
