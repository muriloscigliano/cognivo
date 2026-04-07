# cg-autocomplete

**Tag**: `<cg-autocomplete>`
**File**: `src/components/cg-autocomplete/cg-autocomplete.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: `var(--cg-border-radius-150, 12px)` input wrap and dropdown, `var(--cg-border-radius-100, 8px)` options, `var(--cg-border-radius-full)` clear button. Good token usage. Rounded overrides use tokens.
- Padding: `0 var(--cg-spacing-12, 12px)` input wrap, `var(--cg-spacing-8, 8px) 0` inner input, `var(--cg-spacing-4, 4px)` dropdown, `var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px)` options. Good tokens.
- Font sizes: `var(--cg-font-size-sm, 14px)` — good.
- Colors: `--cg-color-input-border-default`, `--cg-color-input-background-default`, `--cg-color-input-text-default`, `--cg-color-input-text-placeholder`, `--cg-brand-ai-accent` (focus border, match highlight), `--cg-color-surface-base-background` (focus ring gap), `--cg-color-surface-container-background`, `--cg-color-surface-container-border`, `--cg-color-surface-base-text`, `--cg-color-action-secondary-background-hover`, `--cg-color-surface-secondary-background/text` (clear button). Good token coverage.
- Borders: `1px solid var(--cg-color-input-border-default)` — width hardcoded.
- Transitions: Explicit `border-color`, `box-shadow` on input wrap — good.
- Background: See colors above.

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Good tokens |
| Hover | ✅ | ✅ | Border color change with accent token |
| Active/Press | ❌ | N/A | Not applicable for text input |
| Focus | ✅ | ✅ | Dual-layer focus ring — excellent |
| Disabled | ✅ | ✅ | `opacity: 0.5; cursor: not-allowed` |
| Loading | ❌ | ❌ | Missing — should have loading for async option fetching |
| Error | ❌ | ❌ | Missing — no error state |
| Success | ❌ | ❌ | Missing |

### Interaction Audit
- Keyboard: ArrowDown/ArrowUp navigate options, Enter selects, Escape closes. Good combobox pattern.
- ARIA: `role="combobox"`, `aria-expanded`, `aria-autocomplete="list"`, `aria-label`. Dropdown has `role="listbox"`, options have `role="option"`, `aria-selected`. Good. Missing `aria-activedescendant`.
- Events: `cg-autocomplete-input` (on typing), `cg-autocomplete-select` (on selection). Bubbles and composes.

## Style Fixes Needed

1. **Line 40**: `border: 1px solid` → `border: var(--cg-border-width-50, 1px) solid`
2. **Line 43**: `min-height: var(--cg-component-input-height-md, 40px)` — good.
3. **Lines 73-74**: Clear button uses `--cg-color-surface-secondary-background` and `--cg-color-surface-secondary-text` — these are light-theme tokens that will look wrong on dark backgrounds. Should use `--cg-overlay-light-subtle` and `--cg-color-surface-secondary-text` for dark theme compatibility.
4. **Lines 78**: Clear hover uses `--cg-color-surface-tertiary-background` and `--cg-color-surface-tertiary-text` — same issue.
5. Add error state:
   ```css
   :host([error]) .input-wrap { border-color: var(--cg-color-status-error-text-default, #ef4444); }
   :host([error]) .input-wrap.focused {
     border-color: var(--cg-color-status-error-text-default, #ef4444);
     box-shadow: 0 0 0 2px var(--cg-color-surface-base-background, #09090b), 0 0 0 4px var(--cg-color-status-error-text-default, #ef4444);
   }
   ```
6. Add loading state with spinner in the input wrap.
7. **Lines 75-78**: `:focus-visible` global selector (lines 147-149) is overly broad — applies to ALL focusable elements inside the component. Should be scoped to specific elements.

## Interaction Fixes Needed

1. Add `error`, `loading` boolean reflected properties.
2. Add `aria-activedescendant` on the input pointing to the active option by `id`.
3. The blur handler (line 245) sets `_open = false` immediately — this can cause the dropdown to close before a click on an option registers. The `@mousedown=${(e: Event) => e.preventDefault()}` on options (line 263) prevents this, which is correct.
4. Missing form association via `ElementInternals`.
5. Add size variants (sm/md/lg) to match other form inputs.
6. Option animation delays (lines 121-128) are hardcoded up to 8 options — if there are more, they don't get stagger. Consider using CSS custom property `style="--i: ${index}"` with `animation-delay: calc(var(--i) * 30ms)`.

## Test Spec

```typescript
describe('cg-autocomplete', () => {
  // Rendering
  it('renders with shadow DOM')
  it('renders input with chevron')
  it('renders dropdown when focused')

  // Props
  it('options — renders option list')
  it('value — pre-selects matching option')
  it('placeholder — shows in input')
  it('label — shows label above')
  it('disabled — prevents interaction')
  it('clearable — shows clear button when has query')
  it('rounded — overrides border-radius')

  // Filtering
  it('typing filters options by label')
  it('shows empty message when no results')
  it('highlights matching text in options')

  // Selection
  it('clicking option selects it')
  it('selected option fills input with label')

  // Clear
  it('clear button resets value and query')
  it('clear button refocuses input')

  // States
  it('hover changes input border')
  it('focus shows dual-layer ring')
  it('disabled reduces opacity')
  it('dropdown animates in on open')

  // Keyboard
  it('ArrowDown opens dropdown and moves to first option')
  it('ArrowUp moves to previous option')
  it('Enter selects active option')
  it('Escape closes dropdown')

  // Events
  it('fires cg-autocomplete-input on typing')
  it('fires cg-autocomplete-select on selection')

  // Accessibility
  it('has role="combobox"')
  it('has aria-expanded reflecting open state')
  it('has aria-autocomplete="list"')
  it('dropdown has role="listbox"')
  it('options have role="option" and aria-selected')
});
```
