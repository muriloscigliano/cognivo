# cg-carousel

**Tag**: `<cg-carousel>`
**File**: `src/components/cg-carousel/cg-carousel.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: Track wrapper `var(--cg-border-radius-150, 12px)` -- tokenized; nav btn `var(--cg-border-radius-full, 99999px)` -- tokenized; active dot `var(--cg-border-radius-50, 4px)` -- tokenized; dot `var(--cg-border-radius-full)` -- tokenized
- Padding: None on track; nav btn `padding: 0`; slotted items `min-width: 80%` -- hardcoded percentage
- Font sizes: None (no text content)
- Colors: Nav btn border `var(--cg-color-surface-container-border)`, nav btn bg `var(--cg-color-surface-container-background)`, nav btn SVG `var(--cg-color-surface-border-hover, #52525b)`. Dot `var(--cg-color-surface-secondary-border, #d4d4d8)`, dot hover `var(--cg-color-surface-secondary-text, #a1a1aa)`, active dot `var(--cg-focus-ring-color, #c8e650)` -- all tokenized.
- Borders: Nav btn `1px solid var(--cg-color-surface-container-border)` -- tokenized
- Transitions: Nav btn `all var(--cg-motion-duration-normal, 150ms) ease` -- tokenized; dot `all var(--cg-motion-duration-slow, 250ms) ease` -- tokenized
- Background: Track wrapper transparent; nav btn `var(--cg-color-surface-container-background)` -- tokenized

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Good token usage |
| Hover | ✅ | ✅ | Nav buttons scale up; dots change color; arrows appear on host hover |
| Active/Press | ✅ | ✅ | Nav btn `scale(var(--cg-interaction-press-scale, 0.97))` -- tokenized |
| Focus | ✅ | ✅ | Nav btn `outline: 2px solid var(--cg-focus-ring-color)` with offset; dot same |
| Disabled | ✅ | ✅ | Nav btn at boundary `opacity: 0 !important; cursor: default` |
| Loading | ❌ | ❌ | No loading state |
| Error | ❌ | ❌ | No error state |
| Success | ❌ | ❌ | N/A |

### Interaction Audit
- Keyboard: ArrowLeft/ArrowRight for navigation on the track wrapper (which has `tabindex="0"`). Good.
- ARIA: `role="region"`, `aria-label="Carousel"`, `aria-roledescription="carousel"`, `aria-live="polite"` on wrapper. Dots have `role="tablist"`, `role="tab"`, `aria-selected`. Nav buttons have `aria-label`. Excellent ARIA.
- Events: None explicitly fired -- carousel only tracks internal state. Consider adding `cg-carousel-change` event.

## Style Fixes Needed
1. Nav btn SVG `width: 18px; height: 18px` hardcoded -- should use `var(--cg-icon-size-100, 16px)` or `var(--cg-icon-size-150, 20px)` (closest tokens)
2. Nav btn `width: 40px; height: 40px` hardcoded -- should use `var(--cg-spacing-40, 40px)`
3. Nav prev `left: -12px` and nav next `right: -12px` hardcoded -- should use `calc(-1 * var(--cg-spacing-12, 12px))`
4. Dot `width: 8px; height: 8px` hardcoded -- should use `var(--cg-spacing-8, 8px)`
5. Active dot `width: 24px` hardcoded -- should use `var(--cg-spacing-24, 24px)`
6. Dots gap `var(--cg-spacing-6, 6px)` -- tokenized, correct
7. Dots margin `var(--cg-spacing-12, 12px)` -- tokenized, correct
8. Track gap `var(--cg-spacing-16, 16px)` -- tokenized, correct
9. Slotted items `min-width: 80%` -- hardcoded, consider making configurable via CSS custom property
10. Disabled nav btn uses `opacity: 0 !important` -- the `!important` is needed but not ideal; consider restructuring selectors
11. Nav btn hover has `background: var(--cg-color-surface-container-background)` -- same as default, no visible hover change. Should add a lighter bg on hover.

## Interaction Fixes Needed
1. Add `cg-carousel-change` event when the current slide changes, with `{ index, total }` detail
2. The scroll position tracking uses `scrollWidth / _total` for item width calculation -- this doesn't account for gap spacing. Fix: calculate based on individual item offsets.
3. Consider adding auto-play with pause-on-hover option
4. Touch/swipe is handled by native `scroll-snap` -- good
5. Consider adding `aria-label` on individual slides via `::slotted([aria-label])` or requiring it on slotted content
6. Dot indicators use `role="tab"` but there's no corresponding `role="tabpanel"` on the slides -- inconsistent. Consider using `role="radio"` instead or adding proper tab panel linkage.
7. `_handleScroll` doesn't use `requestAnimationFrame` throttling -- could cause performance issues on rapid scrolling

## Test Spec
```typescript
describe('cg-carousel', () => {
  it('renders slotted content in scrollable track');
  it('shows navigation arrows when multiple slides');
  it('hides arrows when single slide');
  it('prev button disabled at first slide');
  it('next button disabled at last slide');
  it('clicking next scrolls to next slide');
  it('clicking prev scrolls to previous slide');
  it('shows dot indicators');
  it('active dot is wider');
  it('clicking dot navigates to slide');
  it('ArrowLeft moves to previous slide');
  it('ArrowRight moves to next slide');
  it('scroll updates current index');
  it('nav arrows appear on hover');
  it('nav arrow focus-visible shows outline');
  it('dot focus-visible shows outline');
  it('aria-roledescription="carousel" is set');
  it('aria-live="polite" for screen readers');
  it('dot aria-selected reflects current');
  it('showDots=false hides dots');
  it('showArrows=false hides arrows');
  it('respects prefers-reduced-motion');
  it('uses design tokens for all values');
});
```
