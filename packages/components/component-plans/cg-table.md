# cg-table

**Tag**: `<cg-table>`
**File**: `src/components/cg-table/cg-table.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: Wrapper `12px` hardcoded; rounded variants use tokens
- Padding: th `0 16px` hardcoded; td `0 16px` hardcoded; compact th `var(--cg-spacing-8) var(--cg-spacing-12)` -- tokenized; compact td `0 12px` -- partially hardcoded; empty `var(--cg-spacing-32, 32px)` -- tokenized
- Font sizes: Table `var(--cg-font-size-sm, 14px)`, compact `var(--cg-font-size-xs, 12px)`, th `var(--cg-font-size-2xs, 11px)` -- all tokenized
- Colors: th `var(--cg-color-surface-secondary-text, #a3a3a3)`, td `var(--cg-color-surface-base-text, #fafafa)`, sortable hover `var(--cg-brand-ai-accent)`, sort icon active `var(--cg-brand-ai-accent)`, empty `var(--cg-color-surface-tertiary-text)` -- mostly tokenized. th bg `rgba(255, 255, 255, 0.04)` raw. Row hover `rgba(255, 255, 255, 0.03)` raw. Border `rgba(255, 255, 255, 0.08)` raw. Dividers `rgba(255, 255, 255, 0.06)` raw.
- Borders: Wrapper `1px solid rgba(255, 255, 255, 0.08)` raw; header bottom `1px solid rgba(255, 255, 255, 0.06)` raw; cell bottom `1px solid rgba(255, 255, 255, 0.06)` raw
- Transitions: `all 150ms` on tbody rows -- raw. Sortable active `transform var(--cg-motion-duration-fast)` -- tokenized.
- Background: th `rgba(255, 255, 255, 0.04)` raw; striped rows `var(--cg-color-surface-table-background, #000000)` -- tokenized

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ❌ | Multiple raw rgba values |
| Hover | ✅ | ❌ | Row hover uses raw rgba; sortable header hover tokenized |
| Active/Press | ✅ | ✅ | Sortable header `scale(0.98)` |
| Focus | ✅ | ❌ | Generic `:focus-visible` with raw `rgba(223, 255, 97, 0.2)` instead of token; sortable th has proper `var(--cg-focus-ring-color)` |
| Disabled | ❌ | ❌ | No disabled state |
| Loading | ❌ | ❌ | No loading/skeleton state |
| Error | ❌ | ❌ | No error state |
| Success | ❌ | ❌ | N/A |

### Interaction Audit
- Keyboard: Sortable columns have `tabindex="0"`, Enter/Space triggers sort. Good.
- ARIA: `role="table"` on table element. `aria-sort` on sorted columns (ascending/descending). Good.
- Events: `cg-sort` (bubbles, composed) with `{ key, direction }` detail.

## Style Fixes Needed
1. Replace wrapper `border-radius: 12px` with `var(--cg-border-radius-150, 12px)`
2. Replace wrapper `1px solid rgba(255, 255, 255, 0.08)` with `1px solid var(--cg-color-surface-container-border, #27272a)`
3. Replace th/td `padding: 0 16px` with `padding: 0 var(--cg-spacing-16, 16px)`
4. Replace compact td `padding: 0 12px` with `padding: 0 var(--cg-spacing-12, 12px)`
5. Replace th `height: 40px` and td `height: 40px` with `height: var(--cg-spacing-40, 40px)`; compact td `height: 32px` with `height: var(--cg-spacing-32, 32px)`
6. Replace th `background: rgba(255, 255, 255, 0.04)` with `var(--cg-overlay-white-subtle, rgba(255, 255, 255, 0.04))`
7. Replace all `rgba(255, 255, 255, 0.06)` dividers with `var(--cg-color-divider, rgba(255, 255, 255, 0.06))`
8. Replace row hover `rgba(255, 255, 255, 0.03)` with `var(--cg-overlay-white-subtle, rgba(255, 255, 255, 0.03))`
9. Replace generic `:focus-visible` with proper double-ring pattern using tokens
10. Replace `transition: all 150ms` on tbody rows with tokenized transition
11. Sort icon `width: var(--cg-spacing-16, 14px)` -- wrong fallback, should be `16px`
12. Duplicate `tbody tr:hover` rules (lines 92 and 111) -- consolidate

## Interaction Fixes Needed
1. Add loading skeleton state (shimmer rows)
2. Add `aria-label` on the table wrapper for screen reader context
3. Consider adding row selection support (checkbox column)
4. Consider adding `cg-row-click` event for clickable rows
5. The sort icon SVGs are inline in the render method -- very complex template. Consider extracting to helper methods.

## Test Spec
```typescript
describe('cg-table', () => {
  it('renders table with columns and rows');
  it('renders empty state with emptyText');
  it('renders striped rows');
  it('renders compact variant');
  it('sortable column has tabindex and cursor');
  it('clicking sortable column fires cg-sort');
  it('toggles sort direction on repeated clicks');
  it('shows ascending sort icon');
  it('shows descending sort icon');
  it('Enter/Space triggers sort on focused column');
  it('aria-sort reflects current sort state');
  it('sticky header stays visible on scroll');
  it('applies column alignment (left, center, right)');
  it('applies column width');
  it('applies rounded variants');
  it('row hover shows background change');
  it('sortable header hover shows accent color');
  it('focus-visible shows outline on sortable columns');
  it('uses design tokens for all values');
});
```
