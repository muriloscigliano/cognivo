# cg-image-block

**Tag**: `<cg-image-block>`
**File**: `src/components/cg-image-block/cg-image-block.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: `var(--cg-border-radius-200, 24px)` on figure -- correct token but 24px is large; rounded variants use tokens
- Padding: Caption `var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px)` -- tokenized. Error state `var(--cg-spacing-24, 24px)` -- tokenized. Retry button `var(--cg-spacing-6, 6px) var(--cg-spacing-16, 16px)` -- tokenized.
- Font sizes: Caption `var(--cg-font-size-xs, 12px)`, error `var(--cg-font-size-sm, 14px)`, retry `var(--cg-font-size-xs, 12px)` -- all tokenized
- Colors: Caption `var(--cg-color-surface-tertiary-text)`, source link `var(--cg-brand-ai-accent)`, error text `var(--cg-color-surface-primary-text, #a1a1aa)` -- note: primary-text token used for error but fallback is `#a1a1aa` which is actually secondary text color. Error icon opacity `var(--cg-opacity-disabled)`. Retry button colors all tokenized.
- Borders: None on figure; retry button `1px solid var(--cg-color-surface-hover-background, #3f3f46)` -- tokenized
- Transitions: Image opacity `var(--cg-motion-duration-slower, 350ms) ease`; clickable image `transform 0.2s ease` -- `0.2s` not tokenized. Retry button `all var(--cg-motion-duration-normal, 150ms) ease` -- tokenized.
- Background: Figure `var(--cg-color-surface-container-background)` -- tokenized

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Good token usage |
| Hover | ✅ | ✅ | Clickable variant scales image on hover |
| Active/Press | ❌ | ❌ | No press feedback on clickable variant |
| Focus | ✅ | ✅ | Double-ring focus pattern with `var(--cg-brand-ai-accent)` |
| Disabled | ❌ | ❌ | No disabled state |
| Loading | ✅ | ✅ | Skeleton shimmer |
| Error | ✅ | ✅ | Error state with retry button |
| Success | ✅ | ✅ | Loaded image with opacity transition |

### Interaction Audit
- Keyboard: Retry button is a native `<button>` -- keyboard accessible. Clickable figure has no tabindex or keyboard handler.
- ARIA: Uses `<figure>` and `<figcaption>` semantic elements -- correct. No ARIA on clickable figure. Missing `alt` on error state.
- Events: `cg-image-click` (bubbles, composed) with `{ src, alt }` detail.

## Style Fixes Needed
1. Replace clickable hover transition `0.2s` with `var(--cg-motion-duration-normal, 200ms)`
2. Fix error text color: `var(--cg-color-surface-primary-text, #a1a1aa)` -- fallback should be `#fafafa` or change token to `var(--cg-color-surface-secondary-text, #a1a1aa)`
3. Retry button `font-weight: 600` hardcoded -- should be `var(--cg-font-weight-semibold, 600)`
4. Source link `font-weight: 500` hardcoded -- should be `var(--cg-font-weight-medium, 500)`
5. Add active/press state on clickable figure: `transform: scale(0.99)`
6. Missing semicolon/empty line at end of clickable styles (line 114 has trailing whitespace)

## Interaction Fixes Needed
1. Clickable figure needs `tabindex="0"` and `role="button"` for keyboard accessibility
2. Add keyboard handler (Enter/Space) on clickable figure to fire `cg-image-click`
3. Add `aria-label` on clickable figure (e.g., "View image: {alt}")
4. Retry button should be hidden from screen readers when image is loaded
5. Source link opens in new tab -- should add `aria-label` indicating external link behavior

## Test Spec
```typescript
describe('cg-image-block', () => {
  it('renders image with src and alt');
  it('shows skeleton while loading');
  it('hides skeleton after load');
  it('shows error state with retry button');
  it('retry button re-triggers image load');
  it('renders caption text');
  it('renders source attribution link');
  it('source link opens in new tab with noopener');
  it('applies aspect ratio variants');
  it('applies rounded variants');
  it('clickable variant fires cg-image-click on click');
  it('clickable variant scales image on hover');
  it('focus-visible shows double-ring outline');
  it('retry button has focus-visible style');
  it('retry button hover changes background and border');
  it('uses design tokens for all values');
  it('respects prefers-reduced-motion');
});
```
