# cg-pagination

**Tag**: `<cg-pagination>`
**File**: `src/components/cg-pagination/cg-pagination.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: Page btn `var(--cg-border-radius-100, 8px)` -- tokenized; rounded variants use tokens
- Padding: Page btn `0 var(--cg-spacing-8, 8px)` -- tokenized
- Font sizes: Page btn `var(--cg-font-size-sm, 14px)`, sm `var(--cg-font-size-xs, 12px)`, lg `var(--cg-font-size-base, 16px)`, ellipsis `var(--cg-font-size-sm, 14px)` -- all tokenized
- Colors: Page btn `var(--cg-color-surface-secondary-text, #a1a1aa)`, border `var(--cg-color-surface-base-border, #27272a)`, hover bg `var(--cg-overlay-accent-subtle)`, hover text `var(--cg-color-surface-primary-text)`, active bg `var(--cg-brand-ai-accent)`, active text `var(--cg-color-black)`, ellipsis `var(--cg-color-text-disabled)` -- all tokenized
- Borders: `1px solid var(--cg-color-surface-base-border, #27272a)` -- tokenized; active `border-color: var(--cg-brand-ai-accent)` -- tokenized
- Transitions: Complex multi-property transition with tokens for duration and easing -- excellent
- Background: Transparent default; active `var(--cg-brand-ai-accent, #dfff61)` -- tokenized

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Excellent token usage |
| Hover | ✅ | ✅ | Subtle accent bg, color change, slight scale |
| Active/Press | ✅ | ✅ | `scale(var(--cg-interaction-press-scale, 0.97))` -- tokenized |
| Focus | ✅ | ✅ | Double-ring pattern with tokens -- excellent |
| Disabled | ✅ | ✅ | `opacity: 0.35; cursor: not-allowed` |
| Loading | ❌ | ❌ | No loading state |
| Error | ❌ | ❌ | No error state |
| Success | ❌ | ❌ | N/A |

### Interaction Audit
- Keyboard: All buttons are native `<button>` elements -- keyboard accessible. Prev/Next have `disabled` attribute at boundaries.
- ARIA: `<nav aria-label="Pagination">`, `<ul>` with `<li>` semantic structure. `aria-label="Page {n}"` on each button. `aria-current="page"` on active. `aria-label="Previous page"` / `aria-label="Next page"`. Ellipsis `aria-hidden="true"`. Excellent ARIA.
- Events: `cg-page-change` (bubbles, composed) with `{ page }` detail.

## Style Fixes Needed
1. Disabled `opacity: 0.35` -- inconsistent with other components (0.4 or 0.5). Should use `var(--cg-opacity-disabled, 0.5)`
2. Arrow icon `width: 16px; height: 16px` hardcoded -- should use `var(--cg-spacing-16, 16px)` or `var(--cg-icon-size-100, 16px)`
3. Ellipsis `letter-spacing: 2px` hardcoded -- minor, consider tokenizing
4. Responsive breakpoint `@media (max-width: 480px)` uses hardcoded `480px` -- consider making this configurable
5. Hover `border-color: var(--cg-color-surface-base-border, #3f3f46)` -- the token name is `base-border` but the fallback `#3f3f46` suggests `hover-background`. Verify the correct token.
6. Gap `var(--cg-spacing-4, 4px)` -- correct

## Interaction Fixes Needed
1. No keyboard shortcut for jumping to specific page (acceptable for pagination)
2. Consider adding `aria-live="polite"` on a visually hidden element that announces page changes for screen readers
3. The `_goToPage` method does not update `this.current` -- it only fires the event, expecting the parent to update. This is correct for controlled component pattern but should be documented.
4. Consider adding `total` display text option (e.g., "Page 5 of 20")

## Test Spec
```typescript
describe('cg-pagination', () => {
  it('renders page buttons');
  it('renders prev and next arrows');
  it('active page has accent background');
  it('fires cg-page-change on page click');
  it('prev button disabled on first page');
  it('next button disabled on last page');
  it('shows ellipsis for large page counts');
  it('respects siblings count');
  it('always shows first and last pages');
  it('aria-current="page" on active button');
  it('nav has aria-label="Pagination"');
  it('uses semantic ul/li structure');
  it('applies size variants (sm, md, lg)');
  it('applies rounded variants');
  it('hover shows accent background');
  it('active press scales button');
  it('focus-visible shows double-ring');
  it('disabled buttons have reduced opacity');
  it('responsive layout adjusts button size');
  it('uses design tokens for all values');
});
```
