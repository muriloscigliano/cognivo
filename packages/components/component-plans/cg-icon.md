# cg-icon

**Tag**: `<cg-icon>`
**File**: `src/components/cg-icon/cg-icon.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: Placeholder `var(--cg-border-radius-50, 4px)` -- correct
- Padding: None (correct for icon)
- Font sizes: Used for sizing via `font-size`: xs `var(--cg-icon-size-50, 12px)`, sm `var(--cg-icon-size-100, 16px)`, md `var(--cg-icon-size-150, 20px)`, lg `var(--cg-icon-size-200, 24px)`, xl `var(--cg-icon-size-300, 32px)` -- all tokenized
- Colors: muted `var(--cg-color-surface-tertiary-text)`, accent `var(--cg-brand-ai-accent)`, success `var(--cg-green-400)`, warning `var(--cg-yellow-400)`, danger `var(--cg-red-400)`, info `var(--cg-blue-400)` -- all tokenized
- Borders: None
- Transitions: None (except spin animation on loading)
- Background: Placeholder `var(--cg-color-surface-container-background, #18181b)` -- tokenized

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Good token usage |
| Hover | ❌ | ❌ | N/A for standalone icon |
| Active/Press | ❌ | ❌ | N/A |
| Focus | ❌ | ❌ | N/A (icons are not focusable) |
| Disabled | ❌ | ❌ | N/A |
| Loading | ✅ | ✅ | Placeholder div while fetching from API |
| Error | ❌ | ❌ | Returns `nothing` on failed API fetch -- silent fail |
| Success | ❌ | ❌ | N/A |

### Interaction Audit
- Keyboard: N/A (decorative element)
- ARIA: `role="img"` with `aria-label` when label is provided; `role="presentation"` and `aria-hidden="true"` when no label. Correct pattern.
- Events: None -- correct.

## Style Fixes Needed
1. Default `font-size: var(--cg-icon-size-150, 20px)` -- correct
2. `color: currentColor` default -- correct for inheriting parent color
3. Loading spin animation uses `spinKeyframes` shared style -- good
4. No transition on color changes -- consider adding `transition: color var(--cg-motion-duration-fast, 80ms)` for smooth color variant switches
5. SVG `width: 100%; height: 100%` -- correct for scaling with font-size

## Interaction Fixes Needed
1. The `.innerHTML` binding for Solar icons (`solar.body`) and API SVGs is an XSS risk. While `sanitizeSvg` handles API responses, the bundled `SOLAR_ICONS` body is set via `.innerHTML` without sanitization. Lit's `.innerHTML` binding bypasses template sanitization. Consider using `unsafeHTML` directive explicitly or pre-sanitizing the bundled icons at build time.
2. API fetch errors are silently swallowed -- consider adding an error fallback icon (like a question mark) or a `fallback` property
3. The `_fetchFromApi` method could be debounced if `name` changes rapidly
4. Consider adding `loading="lazy"` concept where API icons only load when visible (IntersectionObserver)

## Test Spec
```typescript
describe('cg-icon', () => {
  it('renders nothing when name is empty');
  it('renders built-in stroke icon (check, x, plus, etc.)');
  it('renders bundled Solar icon by name');
  it('resolves alias to Solar icon (home -> home-2-linear)');
  it('renders with solar: prefix');
  it('applies size variants (xs, sm, md, lg, xl)');
  it('applies color variants (muted, accent, success, warning, danger, info)');
  it('defaults to currentColor');
  it('sets role="img" and aria-label when label is provided');
  it('sets role="presentation" and aria-hidden when no label');
  it('shows loading placeholder during API fetch');
  it('loading icon has spin animation');
  it('caches API responses');
  it('handles API fetch failures gracefully');
  it('sanitizes SVG from API responses');
  it('respects prefers-reduced-motion');
});
```
