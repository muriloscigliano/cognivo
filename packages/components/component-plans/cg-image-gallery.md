# cg-image-gallery

**Tag**: `<cg-image-gallery>`
**File**: `src/components/cg-image-gallery/cg-image-gallery.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: Grid `var(--cg-border-radius-200, 24px)` -- correct; img-wrapper `4px` hardcoded; rounded variants use tokens
- Padding: None (grid layout, correct)
- Font sizes: Overflow badge `1.25rem` hardcoded -- should use token
- Colors: Overlay `var(--cg-overlay-dark-subtle)` on hover, overflow `var(--cg-overlay-dark-strong, rgba(0, 0, 0, 0.6))`, badge text `var(--cg-color-white, #ffffff)` -- mostly tokenized
- Borders: None
- Transitions: Hover overlay `var(--cg-motion-duration-normal, 150ms) ease`; image scale `var(--cg-motion-duration-slow, 250ms) ease` -- tokenized
- Background: img-wrapper `var(--cg-color-surface-container-background, #18181b)` -- tokenized

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Good token usage |
| Hover | ✅ | ✅ | Dark overlay and image scale -- good |
| Active/Press | ❌ | ❌ | No press feedback |
| Focus | ✅ | ✅ | `focus-visible` with `2px solid var(--cg-brand-ai-accent)` |
| Disabled | ❌ | ❌ | N/A |
| Loading | ✅ | ✅ | Per-image skeleton shimmer |
| Error | ❌ | ❌ | No per-image error state |
| Success | ❌ | ❌ | N/A |

### Interaction Audit
- Keyboard: Each image wrapper has `tabindex="0"`, `role="button"`, and `aria-label`. Enter/Space triggers click. Good.
- ARIA: `aria-label="View image {n}"` with optional alt text appended. Good.
- Events: `cg-gallery-click` (bubbles, composed) with `{ index, image }` detail.

## Style Fixes Needed
1. Replace img-wrapper `border-radius: 4px` with `var(--cg-border-radius-50, 4px)`
2. Replace overflow badge `font-size: 1.25rem` with `var(--cg-font-size-lg, 1.25rem)` or appropriate token
3. Replace overflow badge `font-weight: var(--cg-font-weight-bold, 700)` -- already tokenized, good
4. Add active/press state on image wrapper: `.img-wrapper:active img { transform: scale(0.98); }`
5. Focus outline `outline-offset: -2px` places outline inside -- consider `outline-offset: 2px` for better visibility
6. Grid gap `var(--cg-spacing-8, 8px)` -- correct
7. Consider adding an error fallback per image (broken image icon)

## Interaction Fixes Needed
1. Add per-image error handling -- currently if an image fails to load, the skeleton stays forever
2. Add image `@error` handler to show fallback per image
3. Consider adding arrow key navigation between images (left/right to move focus)
4. The `_loadedSet` state tracking uses Set spread on every load -- consider a Map or simple object for performance
5. Overflow badge has `pointer-events: none` but the underlying image is still clickable -- this is correct behavior

## Test Spec
```typescript
describe('cg-image-gallery', () => {
  it('renders grid with correct layout for 1 image');
  it('renders grid with correct layout for 2 images');
  it('renders grid with correct layout for 3 images (asymmetric)');
  it('renders grid with correct layout for 4 images');
  it('renders grid with auto-fill for 5+ images');
  it('shows overflow badge with count');
  it('limits visible images to maxVisible');
  it('each image has tabindex, role, and aria-label');
  it('fires cg-gallery-click with index and image data');
  it('Enter key triggers click on focused image');
  it('Space key triggers click on focused image');
  it('shows skeleton while image loads');
  it('hides skeleton after image loads');
  it('hover shows dark overlay');
  it('hover scales image');
  it('focus-visible shows accent outline');
  it('applies rounded variants');
  it('uses design tokens for all values');
});
```
