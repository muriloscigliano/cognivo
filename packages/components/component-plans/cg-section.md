# cg-section

**Tag**: `<cg-section>`
**File**: `src/components/cg-section/cg-section.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: `var(--cg-border-radius-150, 12px)` on bordered variant -- correct
- Padding: Header `var(--cg-spacing-16, 16px) 0`; bordered host `0 var(--cg-spacing-16, 16px)`; content-inner `0 0 var(--cg-spacing-16, 16px)` -- mostly tokenized
- Font sizes: Title `var(--cg-font-size-sm, 14px)`; description `var(--cg-font-size-xs, 12px)` -- correct
- Colors: Title `var(--cg-color-surface-base-text)`, description `var(--cg-color-surface-tertiary-text)`, icon `var(--cg-color-surface-tertiary-text)`, badge bg `var(--cg-color-surface-primary-text)`, badge text `var(--cg-color-surface-border-hover)`, chevron `var(--cg-color-surface-secondary-text)` -- all tokenized. Badge font-size `0.65rem` is a magic number.
- Borders: `1px solid var(--cg-color-surface-container-border)` -- correct token
- Transitions: Content `max-height 0.25s ease-out, opacity 0.2s ease` and `0.4s ease-in` -- raw duration values, not tokenized. Chevron `var(--cg-motion-duration-slow, 250ms) ease` -- good. Duplicate `.header` transition at bottom of styles.
- Background: None explicitly set (transparent)

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Good token usage on colors |
| Hover | ✅ | ❌ | Duplicate hover rules -- one on foldable header `.title`, one on `.header:hover` at bottom. Conflicting targets. |
| Active/Press | ❌ | ❌ | No active/press feedback on the header |
| Focus | ✅ | ✅ | `focus-visible` with `2px solid var(--cg-focus-ring-color)` -- correct |
| Disabled | ❌ | ❌ | No disabled state for non-interactive sections |
| Loading | ❌ | ❌ | No loading state |
| Error | ❌ | ❌ | No error state |
| Success | ❌ | ❌ | N/A |

### Interaction Audit
- Keyboard: Enter and Space toggle foldable sections. No arrow key navigation between sections.
- ARIA: `role="button"` with `aria-expanded` on foldable header; `role="heading"` on non-foldable. Missing `aria-controls` linking header to content panel. Missing `id` on content panel.
- Events: `cg-section-toggle` (bubbles, composed) with `{ open, title }` detail -- correct.

## Style Fixes Needed
1. Replace badge `font-size: 0.65rem` with `var(--cg-font-size-2xs, 11px)` or equivalent token
2. Replace content transition `0.25s` and `0.4s` with `var(--cg-motion-duration-slow, 250ms)` and similar tokens
3. Replace content transition `0.2s` with `var(--cg-motion-duration-normal, 200ms)`
4. Remove duplicate `.header` transition/hover rules at the bottom of the styles (lines 116-118) -- consolidate with existing rules
5. Add active/press state on foldable header: `.header:active { transform: scale(0.99); }`
6. Content open/close animation uses `max-height: 3000px` hack -- consider using CSS grid animation (`grid-template-rows: 0fr` to `1fr`) like the accordion for smoother behavior

## Interaction Fixes Needed
1. Add `aria-controls="content-{id}"` on the header button linking to the content panel
2. Add `id` and `role="region"` on the content wrapper for proper ARIA linkage
3. Add `aria-level` attribute when `role="heading"` is used on non-foldable sections
4. Consider adding an `id` or unique identifier property for proper ARIA relationships
5. When foldable header is clicked, the entire `.header:hover` rule (lines 117) applies accent color to ALL text, not just the title -- this is a bug

## Test Spec
```typescript
describe('cg-section', () => {
  it('renders title text');
  it('renders description text');
  it('renders icon slot');
  it('renders badge count when count > 0');
  it('foldable section has role="button" and aria-expanded');
  it('non-foldable section has role="heading"');
  it('clicking foldable header toggles content visibility');
  it('Enter key toggles foldable section');
  it('Space key toggles foldable section');
  it('fires cg-section-toggle with open state');
  it('open prop sets initial open state');
  it('bordered variant has border and border-radius');
  it('non-bordered variant has bottom border only');
  it('last non-bordered section has no bottom border');
  it('chevron rotates when section is open');
  it('focus-visible shows outline on header');
  it('content animates open/closed');
  it('respects prefers-reduced-motion');
});
```
