# cg-image

**Tag**: `<cg-image>`
**File**: `src/components/cg-image/cg-image.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: `var(--cg-border-radius-150, 12px)` on host -- correct; rounded variants use tokens
- Padding: None (correct for image)
- Font sizes: Error fallback `var(--cg-font-size-xs, 12px)` -- correct
- Colors: Error icon opacity `var(--cg-opacity-disabled, 0.5)`, error text `var(--cg-color-surface-tertiary-text)`, error bg `var(--cg-color-surface-container-background)` -- all tokenized
- Borders: None
- Transitions: Image opacity `var(--cg-motion-duration-slower, 350ms) ease` -- tokenized. Fade-in animation `var(--cg-motion-duration-normal, 300ms)` -- tokenized.
- Background: Host `var(--cg-color-surface-container-background, #18181b)` -- tokenized

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Good token usage |
| Hover | ❌ | ❌ | No hover state (could be useful if clickable) |
| Active/Press | ❌ | ❌ | No press state |
| Focus | ❌ | ❌ | No focus state (not focusable) |
| Disabled | ❌ | ❌ | N/A |
| Loading | ✅ | ✅ | Skeleton shimmer animation |
| Error | ✅ | ✅ | Error fallback with icon and text |
| Success | ✅ | ✅ | Loaded state with fade-in animation |

### Interaction Audit
- Keyboard: N/A (not interactive)
- ARIA: `alt` attribute on `<img>` -- correct. No `role` needed for a standard image container.
- Events: None -- consider adding `cg-image-load` and `cg-image-error` events for parent components.

## Style Fixes Needed
1. Skeleton gradient uses token values for colors -- correct
2. Error fallback SVG uses `stroke-width="1.5"` directly -- acceptable for SVG
3. Error fallback `gap: var(--cg-spacing-8, 8px)` -- correct
4. Error icon size `var(--cg-icon-size-300, 32px)` -- correct
5. Loaded animation `@keyframes imgFadeIn` has `transform: scale(1.01)` -- subtle and acceptable
6. Prefers-reduced-motion media query disables transitions and animations -- correct implementation
7. No issues found -- this component has solid token usage

## Interaction Fixes Needed
1. Add `clickable` property with hover/focus states if the image should be expandable
2. Fire `cg-image-load` event on successful load
3. Fire `cg-image-error` event on load failure
4. Add `role="img"` on the container when `alt` is provided, for screen readers that may not see the shadow DOM img
5. When `src` is empty, render placeholder state instead of broken image

## Test Spec
```typescript
describe('cg-image', () => {
  it('renders img element with src and alt');
  it('shows skeleton while loading');
  it('hides skeleton after load');
  it('shows error fallback on load failure');
  it('applies aspect ratio variants (1:1, 3:2, 4:3, 16:9, 21:9)');
  it('applies fit variants (cover, contain, fill)');
  it('applies rounded variants (none, sm, md, lg, full)');
  it('lazy loads by default');
  it('eager loads when lazy is false');
  it('fades in after loading');
  it('respects prefers-reduced-motion');
  it('hides img when error occurs');
});
```
