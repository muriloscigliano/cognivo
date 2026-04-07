# cg-breadcrumbs

**Tag**: `<cg-breadcrumbs>`
**File**: `src/components/cg-breadcrumbs/cg-breadcrumbs.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: Crumb link `var(--cg-border-radius-050, 4px)` -- tokenized; ellipsis `var(--cg-border-radius-050, 4px)` -- tokenized
- Padding: Crumb link `var(--cg-spacing-4, 4px)` -- tokenized; separator `0 var(--cg-spacing-8, 8px)` -- tokenized; size variants all tokenized
- Font sizes: Crumb `var(--cg-font-size-sm, 14px)`, separator `var(--cg-font-size-xs, 12px)`, sm `var(--cg-font-size-xs, 12px)`, lg `var(--cg-font-size-base, 16px)` -- all tokenized
- Colors: Link `var(--cg-color-surface-secondary-text, #a1a1aa)`, current `var(--cg-color-surface-primary-text, #fafafa)`, separator `var(--cg-color-surface-tertiary-text, #71717a)`, ellipsis `var(--cg-color-text-disabled, #52525b)` -- all tokenized. Hover bg `var(--cg-overlay-accent-subtle)` -- tokenized.
- Borders: None
- Transitions: None explicitly on links -- missing transition for hover color change
- Background: Transparent

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Excellent token usage |
| Hover | ✅ | ✅ | Color change + subtle bg -- good |
| Active/Press | ✅ | ✅ | `scale(var(--cg-interaction-press-scale, 0.97))` -- tokenized |
| Focus | ✅ | ✅ | Double-ring pattern with tokens -- excellent |
| Disabled | ❌ | ❌ | N/A (current item is non-interactive) |
| Loading | ❌ | ❌ | No loading state |
| Error | ❌ | ❌ | No error state |
| Success | ❌ | ❌ | N/A |

### Interaction Audit
- Keyboard: Links and buttons are natively focusable. Ellipsis expand button is a `<button>`. Click events fire with `e.preventDefault()` on links for SPA routing.
- ARIA: `<nav aria-label="Breadcrumb">` -- correct. `<ol>` with `<li>` -- correct semantic structure. `aria-current="page"` on last item -- correct. Ellipsis `aria-label="Show all breadcrumb items"` -- good.
- Events: `cg-breadcrumb-click` (bubbles, composed) with `{ label, href, index }` detail.

## Style Fixes Needed
1. Add `transition: color var(--cg-motion-duration-fast, 80ms), background var(--cg-motion-duration-fast, 80ms)` on `.crumb-link` for smooth hover
2. `max-width: 200px` on crumb link -- hardcoded. Consider making this configurable or using a token.
3. Responsive `max-width: 120px` -- also hardcoded
4. Ellipsis `letter-spacing: 2px` hardcoded -- consider tokenizing
5. Current item `font-weight: var(--cg-font-weight-semibold, 600)` -- correct
6. sm separator `font-size: 10px` hardcoded -- should use `var(--cg-font-size-3xs, 10px)` or smallest available token

## Interaction Fixes Needed
1. Missing keyboard navigation between breadcrumb items (not strictly required but nice for a11y)
2. When `_expanded` is set to true, there's no way to collapse again -- this is expected behavior
3. The responsive auto-collapse uses CSS media queries with `display: none` -- this works but the auto-collapse ellipsis is always in DOM. Consider using ResizeObserver for more granular control.
4. Crumb link with `href` uses `<a>` tag but `e.preventDefault()` -- this breaks native link behavior (middle-click, cmd-click). Consider not preventing default and letting the parent handle routing via the event.

## Test Spec
```typescript
describe('cg-breadcrumbs', () => {
  it('renders breadcrumb items');
  it('last item has aria-current="page"');
  it('last item is non-interactive');
  it('links render as <a> elements');
  it('non-link items render as buttons');
  it('fires cg-breadcrumb-click on link click');
  it('renders custom separator');
  it('collapses items when maxVisible is set');
  it('shows ellipsis for collapsed items');
  it('expanding ellipsis shows all items');
  it('renders item icons');
  it('applies size variants (sm, md, lg)');
  it('nav has aria-label="Breadcrumb"');
  it('uses semantic ol/li structure');
  it('hover shows background on link');
  it('active press scales link');
  it('focus-visible shows double-ring');
  it('responsive collapse hides middle items on small screens');
  it('uses design tokens for all values');
});
```
