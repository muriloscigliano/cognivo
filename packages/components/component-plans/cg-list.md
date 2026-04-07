# cg-list

**Tag**: `<cg-list>`
**File**: `src/components/cg-list/cg-list.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: Item `var(--cg-border-radius-100, 8px)` -- tokenized; rounded variants use tokens; number indicator `var(--cg-border-radius-full)` -- tokenized
- Padding: Item `var(--cg-spacing-12, 12px) var(--cg-spacing-16, 16px)` -- tokenized; empty `var(--cg-spacing-24, 24px)` -- tokenized
- Font sizes: Title `var(--cg-font-size-sm, 14px)`, subtitle `var(--cg-font-size-xs, 12px)`, meta `var(--cg-font-size-xs, 12px)`, action `var(--cg-font-size-xs, 12px)`, empty `var(--cg-font-size-sm, 14px)` -- all tokenized
- Colors: All use design tokens -- excellent. Title `var(--cg-color-surface-base-text)`, subtitle `var(--cg-color-surface-tertiary-text)`, action `var(--cg-brand-ai-accent)`, hover bg `var(--cg-overlay-accent-subtle)`, active bg `var(--cg-overlay-accent-light)`
- Borders: Dividers `1px solid var(--cg-color-surface-container-border)` -- tokenized
- Transitions: Item bg `var(--cg-motion-duration-fast, 80ms)` with complex transition shorthand including transform -- tokenized. Action btn `var(--cg-motion-duration-fast, 80ms)` -- tokenized. Stagger animation `200ms ease-out`.
- Background: Transparent by default; hover uses overlay tokens

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Excellent token usage throughout |
| Hover | ✅ | ✅ | Accent subtle bg + `translateX(2px)` shift |
| Active/Press | ✅ | ✅ | `var(--cg-overlay-accent-light)` on clickable items |
| Focus | ✅ | ✅ | `2px solid var(--cg-focus-ring-color)` on clickable items |
| Disabled | ❌ | ❌ | No disabled state for individual items |
| Loading | ❌ | ❌ | No loading/skeleton state |
| Error | ❌ | ❌ | No error state |
| Success | ❌ | ❌ | N/A |

### Interaction Audit
- Keyboard: Clickable items have `tabindex="0"`, Enter/Space triggers click. Action buttons are native buttons -- keyboard accessible. Good.
- ARIA: Clickable items have `role="button"`. Action button stops propagation. Missing `role="list"` on the container and `role="listitem"` on items.
- Events: `cg-list-click` (bubbles, composed) with `{ item, index }`; `cg-list-action` (bubbles, composed) with `{ item, index, action }`.

## Style Fixes Needed
1. Duplicate hover rule: `.item:hover` on line 176 overlaps with `:host([clickable]) .item:hover` and `:host([hoverable]) .item:hover` -- consolidate
2. Avatar `width: var(--cg-spacing-40, 40px)` and `height: var(--cg-spacing-40, 40px)` -- correct
3. Number indicator bg `var(--cg-focus-ring-color, #c8e650)` with white text -- this is the focus ring color being used as a decorative element, which is semantically wrong. Should use `var(--cg-brand-ai-accent, #dfff61)` or a dedicated number badge token.
4. Stagger animation `200ms ease-out` -- consider tokenizing as `var(--cg-motion-duration-normal, 200ms)`
5. Action button hover adds `text-decoration: underline` -- acceptable
6. Consider adding loading skeleton rows

## Interaction Fixes Needed
1. Add `role="list"` on the container element (currently renders flat divs)
2. Add `role="listitem"` on each `.item` div
3. Consider adding arrow key navigation (up/down) between list items when clickable
4. Add `disabled` support per item in the `ListItem` interface
5. Missing `aria-label` on the list container -- add label prop or use heading association

## Test Spec
```typescript
describe('cg-list', () => {
  it('renders items with title');
  it('renders items with subtitle');
  it('renders bullet variant');
  it('renders number variant with sequential numbers');
  it('renders image variant with avatar');
  it('renders plain variant without indicators');
  it('shows empty text when no items');
  it('applies dividers between items');
  it('clickable items have role="button" and tabindex');
  it('fires cg-list-click on clickable item click');
  it('fires cg-list-click on Enter/Space');
  it('fires cg-list-action on action button click');
  it('action button click does not trigger item click');
  it('renders meta text');
  it('renders chevron on clickable items');
  it('hoverable items show accent background on hover');
  it('items animate in with stagger');
  it('focus-visible shows outline');
  it('applies rounded variants');
  it('uses design tokens for all values');
});
```
