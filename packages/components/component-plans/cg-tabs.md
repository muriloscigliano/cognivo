# cg-tabs

**Tag**: `<cg-tabs>`
**File**: `src/components/cg-tabs/cg-tabs.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: Tab focus `4px` hardcoded; pills tab-list `8px` hardcoded; pills tab `6px` hardcoded -- none tokenized
- Padding: Tab `8px 16px` hardcoded; sm tab `6px 12px` hardcoded; lg tab `10px 20px` hardcoded; panel `var(--cg-spacing-16, 16px) 0` -- tokenized. Count badge `1px 6px` hardcoded. Pills container `4px` hardcoded.
- Font sizes: Tab `14px` hardcoded; sm `12px` hardcoded; lg `16px` hardcoded; count badge `0.65rem` hardcoded -- none tokenized
- Colors: Tab `var(--cg-color-surface-tertiary-text, #666666)` -- token correct but fallback wrong (should be `#71717a`). Active tab `var(--cg-color-surface-primary-text)`. Indicator `var(--cg-brand-ai-accent)`. Count badge bg `rgba(255, 255, 255, 0.08)` raw. Active count `rgba(223, 255, 97, 0.15)` raw. Pills bg `rgba(255, 255, 255, 0.03)` raw. Pills border `rgba(255, 255, 255, 0.08)` raw. Pills active bg `rgba(255, 255, 255, 0.08)` raw.
- Borders: Tab-list bottom `1px solid rgba(255, 255, 255, 0.08)` raw; pills `1px solid rgba(255, 255, 255, 0.08)` raw
- Transitions: Tab `all 150ms ease` -- not tokenized. Indicator `left 150ms ease, width 150ms ease` -- not tokenized.
- Background: Transparent; pills has subtle bg

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ❌ | Many hardcoded values |
| Hover | ✅ | ❌ | Color change only, raw values |
| Active/Press | ❌ | ❌ | No active/press state on tabs |
| Focus | ✅ | ❌ | `box-shadow: 0 0 0 3px rgba(223, 255, 97, 0.25)` -- raw value |
| Disabled | ✅ | ✅ | `opacity: 0.4; cursor: not-allowed` -- could use token |
| Loading | ❌ | ❌ | No loading state |
| Error | ❌ | ❌ | No error state |
| Success | ❌ | ❌ | N/A |

### Interaction Audit
- Keyboard: Arrow keys (Left/Right/Up/Down), Home, End for tab navigation. Focus management with `requestAnimationFrame`. Excellent keyboard support.
- ARIA: `role="tablist"` on container, `role="tab"` on buttons, `role="tabpanel"` on panel. `aria-selected`, `aria-controls`, `id` linkage. `tabindex` roving. Excellent ARIA implementation.
- Events: `cg-tab-change` (bubbles, composed) with `{ value, label }` detail.

## Style Fixes Needed
1. Replace tab `padding: 8px 16px` with `padding: var(--cg-spacing-8, 8px) var(--cg-spacing-16, 16px)`
2. Replace tab `font-size: 14px` with `font-size: var(--cg-font-size-sm, 14px)`
3. Replace sm tab `font-size: 12px` with `var(--cg-font-size-xs, 12px)` and padding with tokens
4. Replace lg tab `font-size: 16px` with `var(--cg-font-size-base, 16px)` and padding with tokens
5. Replace count badge `font-size: 0.65rem` with `var(--cg-font-size-2xs, 11px)`
6. Replace count badge `padding: 1px 6px` with `padding: var(--cg-spacing-1, 1px) var(--cg-spacing-6, 6px)`
7. Replace focus ring `rgba(223, 255, 97, 0.25)` with standard double-ring pattern using `var(--cg-focus-ring-color)`
8. Replace all `rgba(255, 255, 255, 0.*)` with appropriate overlay tokens
9. Replace `border-radius: 4px` with `var(--cg-border-radius-50, 4px)`, `8px` with `var(--cg-border-radius-100, 8px)`, `6px` with `var(--cg-border-radius-75, 6px)`
10. Replace transition `150ms` with `var(--cg-motion-duration-normal, 150ms)`
11. Tab color fallback `#666666` should be `#71717a` to match the token default
12. Disabled `opacity: 0.4` should use `var(--cg-opacity-disabled, 0.5)` -- note: inconsistent with other components that use 0.5
13. Pills gap `4px` should be `var(--cg-spacing-4, 4px)`

## Interaction Fixes Needed
1. Add active/press state on tabs: `.tab:active:not(.disabled) { transform: scale(0.98); }`
2. The indicator position is calculated via DOM measurement in `_updateIndicator` -- this can cause layout thrashing. Consider using CSS-only indicator via `::after` with transitions.
3. Panel slot strategy: `<slot name=${this._active}>` plus `<slot>` means the default slot always renders. This may cause content duplication if both named and default slots have content. Consider hiding inactive named slots.

## Test Spec
```typescript
describe('cg-tabs', () => {
  it('renders tab buttons from tabs array');
  it('shows active tab indicator');
  it('fires cg-tab-change on tab click');
  it('renders count badge on tabs');
  it('disabled tab is not clickable');
  it('disabled tab has reduced opacity');
  it('ArrowRight moves to next tab');
  it('ArrowLeft moves to previous tab');
  it('Home moves to first tab');
  it('End moves to last tab');
  it('skips disabled tabs in keyboard navigation');
  it('aria-selected reflects active tab');
  it('tabpanel has aria-labelledby linking to tab');
  it('renders pills variant');
  it('pills variant hides indicator');
  it('applies size variants (sm, md, lg)');
  it('indicator slides to active tab position');
  it('focus-visible shows outline on tab');
  it('panel renders slot content for active tab');
  it('uses design tokens for all values');
});
```
