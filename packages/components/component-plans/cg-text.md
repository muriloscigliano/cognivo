# cg-text

**Tag**: `<cg-text>`
**File**: `src/components/cg-text/cg-text.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: N/A (typography component)
- Padding: None (correct)
- Font sizes: xs `var(--cg-font-size-xs, 12px)`, sm `var(--cg-font-size-sm, 14px)`, md `var(--cg-font-size-md, 18px)`, lg `var(--cg-font-size-lg, 20px)`, xl `var(--cg-font-size-xl, 24px)`, 2xl `var(--cg-font-size-2xl, 30px)`, 3xl `var(--cg-font-size-3xl, 36px)`, 4xl `var(--cg-font-size-4xl, 48px)` -- all tokenized
- Colors: default `var(--cg-color-surface-base-text)`, muted `var(--cg-color-surface-tertiary-text)`, accent `var(--cg-brand-ai-accent)`, success `var(--cg-color-status-success-text-default)`, warning `var(--cg-color-status-warning-text)`, danger `var(--cg-color-status-error-text)` -- all tokenized
- Borders: None
- Transitions: None
- Background: None (transparent, correct)

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Excellent token usage |
| Hover | ❌ | ❌ | N/A for typography |
| Active/Press | ❌ | ❌ | N/A |
| Focus | ❌ | ❌ | N/A |
| Disabled | ❌ | ❌ | N/A |
| Loading | ❌ | ❌ | N/A |
| Error | ❌ | ❌ | N/A (danger color variant covers this) |
| Success | ❌ | ❌ | N/A (success color variant covers this) |

### Interaction Audit
- Keyboard: N/A (content element)
- ARIA: Renders semantic HTML elements (h1-h6, p, span) based on `as` prop -- excellent
- Events: None -- correct

## Style Fixes Needed
1. 4xl `letter-spacing: -0.02em` hardcoded -- should use `var(--cg-letter-spacing-tight, -0.02em)` if token exists
2. Line heights use tokens (`--cg-line-height-normal`, `--cg-line-height-snug`, `--cg-line-height-tight`) -- correct
3. Font weights use tokens -- correct
4. The `clamp` feature uses inline style manipulation (`this.style.display = '-webkit-box'`) which bypasses Shadow DOM styling. Consider moving clamp CSS to host styles: `:host([data-clamped]) { display: -webkit-box; ... }` and set the attribute instead
5. Default size is `md` (18px) which may be unexpected -- consider documenting this prominently or defaulting to `sm` (14px) for body text

## Interaction Fixes Needed
1. The `clamp` feature manipulates `this.style` directly, overriding `hostBlock` `display: block`. When `clamp > 0` and then set back to `0`, it clears display to `''` which may not restore the `block` from `hostBlock`. Fix: set `this.style.display = 'block'` in the else branch, or better yet use CSS classes.
2. Consider adding `id` prop passthrough for ARIA label associations
3. Add `lang` attribute support for multilingual content

## Test Spec
```typescript
describe('cg-text', () => {
  it('renders paragraph by default (as="p")');
  it('renders h1 through h6 elements');
  it('renders span element');
  it('renders text from text property');
  it('renders slot content when no text property');
  it('applies size variants (xs through 4xl)');
  it('applies weight variants (normal, medium, semibold, bold)');
  it('applies color variants (default, muted, accent, success, warning, danger, inherit)');
  it('applies alignment variants (left, center, right)');
  it('truncates text with ellipsis when truncate is true');
  it('clamps text to specified number of lines');
  it('restores display when clamp is set back to 0');
  it('inline prop sets display to inline');
  it('inner elements inherit font and color from host');
  it('uses design tokens for all font sizes');
  it('uses design tokens for all colors');
});
```
