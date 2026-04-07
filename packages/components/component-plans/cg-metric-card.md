# cg-metric-card

**Tag**: `<cg-metric-card>`
**File**: `src/components/cg-metric-card/cg-metric-card.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: `var(--cg-border-radius-200, 16px)` on `.card` -- good token usage; rounded variants also use tokens
- Padding: `var(--cg-spacing-20, 20px)` default; sm `var(--cg-spacing-12, 12px) var(--cg-spacing-16, 14px)` -- fallback `14px` is wrong for spacing-16; lg `var(--cg-spacing-24, 24px) var(--cg-spacing-32, 28px)` -- fallback `28px` is wrong for spacing-32
- Font sizes: Title `var(--cg-font-size-2xs, 11px)`, value `var(--cg-font-size-2xl, 1.75rem)`, delta `var(--cg-font-size-xs, 12px)`, comparison `var(--cg-font-size-2xs, 11px)` -- all tokenized, good
- Colors: All use design tokens -- good. Delta up `var(--cg-green-400)`, down `var(--cg-red-400)`, neutral `var(--cg-color-surface-secondary-text)`. Sparkline uses inline computed colors with token fallbacks.
- Borders: `1px solid var(--cg-color-surface-container-border, #27272a)` -- correct token usage
- Transitions: `all var(--cg-motion-duration-normal, 150ms) ease` on card; hover uses tokenized durations -- good
- Background: Uses gradient with token `var(--cg-overlay-noise)` and `var(--cg-color-surface-container-background)` -- good

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Good token usage |
| Hover | ✅ | ✅ | Clickable cards lift with tokenized transform |
| Active/Press | ❌ | ❌ | No active/press state on clickable cards |
| Focus | ✅ | ✅ | Double-ring focus pattern with tokens |
| Disabled | ❌ | ❌ | No disabled state |
| Loading | ✅ | ✅ | Skeleton with shimmer animation |
| Error | ❌ | ❌ | No error state |
| Success | ❌ | ❌ | N/A -- trend "up" serves as positive indicator |

### Interaction Audit
- Keyboard: Enter and Space trigger click on clickable cards. No keyboard navigation between metric cards.
- ARIA: `role="figure"` with `aria-label` containing title, value, delta, trend. Loading state has `role="status"` with `aria-label="Loading metric"`. Good.
- Events: `cg-metric-click` (bubbles, composed) with detail `{ title, value, delta, trend }` -- correct.

## Style Fixes Needed
1. Fix sm padding fallback: `var(--cg-spacing-16, 14px)` should be `var(--cg-spacing-16, 16px)`
2. Fix lg padding fallback: `var(--cg-spacing-32, 28px)` should be `var(--cg-spacing-32, 32px)`
3. Fix sm value font-size `1.25rem` -- should use token `var(--cg-font-size-lg, 1.25rem)`
4. Fix lg value font-size `2.25rem` -- should use token `var(--cg-font-size-4xl, 2.25rem)` or appropriate token
5. Add active/press state: `.card.clickable:active { transform: scale(var(--cg-interaction-press-scale, 0.98)); }`
6. Add `.delta` gap fallback: `var(--cg-spacing-4, 3px)` should be `var(--cg-spacing-4, 4px)` -- wrong fallback
7. Sparkline `_getSparkColor` returns raw rgba inline styles -- consider using CSS custom properties for consistency
8. Non-clickable `tabindex="-1"` is unnecessary -- remove it to prevent unexpected focus behavior

## Interaction Fixes Needed
1. Add disabled property with `aria-disabled` and reduced opacity
2. Remove `tabindex="-1"` from non-clickable cards (should have no tabindex at all)
3. Add `aria-describedby` linking to comparison text when present
4. Consider adding `aria-roledescription="metric"` for better screen reader context
5. Sparkline bars should have tooltip or hidden text describing the data trend

## Test Spec
```typescript
describe('cg-metric-card', () => {
  it('renders title and value');
  it('renders delta with correct trend class (up/down/neutral)');
  it('renders arrow SVG for each trend direction');
  it('renders comparison text');
  it('renders icon when provided');
  it('renders sparkline bars from data array');
  it('renders loading skeleton when loading=true');
  it('applies size variants (sm, md, lg)');
  it('applies rounded variants');
  it('clickable card has cursor pointer and hover lift');
  it('clickable card fires cg-metric-click on click');
  it('clickable card fires cg-metric-click on Enter/Space');
  it('non-clickable card has no tabindex');
  it('aria-label contains title, value, delta, and trend');
  it('loading state has role="status"');
  it('focus-visible shows double-ring outline');
  it('uses design tokens for all spacing values');
  it('respects prefers-reduced-motion');
});
```
