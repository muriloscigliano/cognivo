# cg-select

**Tag**: `<cg-select>`
**File**: `src/components/cg-select/cg-select.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: `8px` hardcoded on trigger (md). `12px` on dropdown. `6px` on options. Size variants hardcoded (`6px` sm, `10px` lg). Rounded overrides use tokens correctly.
- Padding: `0 12px` trigger (hardcoded), `4px` dropdown (hardcoded), `8px 12px` option (hardcoded). Should use spacing tokens.
- Font sizes: `14px` trigger (hardcoded), `13px` sm, `15px` lg. Should use `--cg-font-size-*` tokens.
- Colors: `rgba(255,255,255,0.04)` bg, `rgba(255,255,255,0.1)` border, `rgba(255,255,255,0.2)` hover border, `rgba(255,255,255,0.05)` option hover/selected, `--cg-brand-ai-accent` focus/selected text, `--cg-color-surface-base-text`, `--cg-color-surface-tertiary-text`, `--cg-color-surface-elevated`. Multiple raw rgba values.
- Borders: `1px solid rgba(255,255,255,0.1)` — hardcoded.
- Transitions: `all 150ms` on trigger — too generic. Dropdown has proper transform transition.
- Background: `rgba(255,255,255,0.04)` trigger, `var(--cg-color-surface-elevated, #111111)` dropdown.

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ⚠️ | Raw rgba for border/background |
| Hover | ✅ | ⚠️ | Raw rgba border |
| Active/Press | ✅ | ⚠️ | `transform: scale(0.97)` hardcoded — should use token |
| Focus | ✅ | ⚠️ | `0 0 0 3px rgba(223, 255, 97, 0.15)` — should be dual-layer ring |
| Disabled | ✅ | ✅ | `opacity: 0.5; pointer-events: none` |
| Loading | ✅ | ✅ | Spinner replaces chevron, pointer-events none |
| Error | ✅ | ✅ | Error border and focus ring override |
| Success | ✅ | ✅ | Success border and focus ring override |

### Interaction Audit
- Keyboard: ArrowDown/ArrowUp navigate options, Enter/Space select, Escape closes. Comprehensive.
- ARIA: `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`, `aria-required`, `aria-busy`. Options have `role="option"`, `aria-selected`. Good coverage. Missing `aria-activedescendant` for highlighted option.
- Events: `cg-change` with `{value, label}`. Bubbles and composes.

## Style Fixes Needed

1. **Line 50**: `padding: 0 12px` → `padding: 0 var(--cg-spacing-12, 12px)`
2. **Line 51**: `border: 1px solid rgba(255,255,255,0.1)` → `border: var(--cg-border-width-50, 1px) solid var(--cg-color-surface-field-border, rgba(255,255,255,0.1))`
3. **Line 52**: `border-radius: 8px` → `border-radius: var(--cg-border-radius-100, 8px)`
4. **Line 54**: `font-size: 14px` → `font-size: var(--cg-font-size-sm, 14px)`
5. **Line 56**: `height: 36px` → `height: var(--cg-component-input-height-md, 36px)`
6. **Line 57**: `transition: all 150ms` → explicit property transitions with token durations
7. **Line 62**: `transform: scale(0.97)` → `transform: scale(var(--cg-interaction-press-scale, 0.97))`
8. **Line 64**: Focus ring → dual-layer: `0 0 0 2px var(--cg-color-surface-primary-background, #09090b), 0 0 0 4px var(--cg-brand-ai-accent, #dfff61)`
9. **Line 102**: `margin-top: 4px` → `margin-top: var(--cg-spacing-4, 4px)`
10. **Line 102**: `padding: 4px` → `padding: var(--cg-spacing-4, 4px)`
11. **Line 105**: `border-radius: 12px` → already covered by rounded overrides, but default should use token
12. **Line 116**: `padding: 8px 12px` → `padding: var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px)`
13. **Line 116**: `border-radius: 6px` → `border-radius: var(--cg-border-radius-75, 6px)`
14. **Line 117**: `font-size: 14px` → `font-size: var(--cg-font-size-sm, 14px)`
15. **Lines 138-142**: Size variant hardcoded values → use tokens for height, font-size, padding, border-radius

## Interaction Fixes Needed

1. Add `aria-activedescendant` pointing to the currently highlighted option for screen reader support during keyboard navigation.
2. Add `id` attributes to each option (`role="option"`) so `aria-activedescendant` can reference them.
3. The search input inside the dropdown (line 130-131) has no background/color tokens — uses inherited browser defaults. Should explicitly set `background` and `color` with tokens.
4. Click-outside handler uses `document.addEventListener('click')` — should use `{ capture: true }` or consider using a more robust approach like a backdrop element.

## Test Spec

```typescript
describe('cg-select', () => {
  // Rendering
  it('renders with shadow DOM')
  it('renders default state with placeholder')
  it('renders selected option label')

  // Props
  it('options — renders option list')
  it('value — pre-selects matching option')
  it('placeholder — shows when no selection')
  it('size — applies sm/md/lg dimensions')
  it('rounded — overrides border-radius')
  it('disabled — prevents opening')
  it('error — applies error border')
  it('success — applies success border')
  it('loading — shows spinner, disables interaction')
  it('searchable — shows search input in dropdown')

  // Dropdown
  it('opens on click')
  it('closes on Escape')
  it('closes on click outside')
  it('selects option on click')

  // Search
  it('filters options by search query')
  it('shows empty message when no results')

  // States
  it('hover state changes border color')
  it('focus-visible shows focus ring')
  it('open state shows accent border')
  it('disabled prevents interaction')

  // Keyboard
  it('Enter/Space opens dropdown')
  it('ArrowDown navigates to next option')
  it('ArrowUp navigates to previous option')
  it('Enter selects highlighted option')
  it('Escape closes dropdown')

  // Events
  it('fires cg-change with value and label on selection')

  // Accessibility
  it('has role="combobox"')
  it('has aria-expanded reflecting open state')
  it('has aria-haspopup="listbox"')
  it('options have role="option" and aria-selected')
  it('form-associated: setFormValue on value change')
});
```
