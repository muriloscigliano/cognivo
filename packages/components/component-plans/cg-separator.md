# cg-separator

**Tag**: `<cg-separator>`
**File**: `src/components/cg-separator/cg-separator.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: N/A (line element)
- Padding: None on the separator itself; spacing via margins
- Font sizes: Label `var(--cg-font-size-xs, 12px)` -- correct token
- Colors: Line `var(--cg-color-surface-hover-background, #3f3f46)` -- tokenized. Label `var(--cg-color-surface-tertiary-text, #71717a)` -- tokenized.
- Borders: None (uses background gradient for the line)
- Transitions: None
- Background: Gradient from transparent to `var(--cg-color-surface-hover-background)` and back -- good

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Clean implementation with tokens |
| Hover | ❌ | ❌ | N/A for a decorative separator |
| Active/Press | ❌ | ❌ | N/A |
| Focus | ❌ | ❌ | N/A |
| Disabled | ❌ | ❌ | N/A |
| Loading | ❌ | ❌ | N/A |
| Error | ❌ | ❌ | N/A |
| Success | ❌ | ❌ | N/A |

### Interaction Audit
- Keyboard: N/A (decorative element)
- ARIA: `role="separator"` with `aria-orientation` -- correct. When label is present, two separate `role="separator"` divs are rendered, which is semantically odd.
- Events: None -- correct.

## Style Fixes Needed
1. Add `gap: var(--cg-spacing-12, 12px)` already uses token -- confirmed correct
2. Label `letter-spacing: 0.05em` -- could tokenize as `var(--cg-letter-spacing-wide, 0.05em)` for consistency
3. Label `font-weight: var(--cg-font-weight-medium, 500)` -- correct
4. Line `min-width: 16px` / `min-height: 16px` hardcoded -- replace with `var(--cg-spacing-16, 16px)`
5. Consider adding `color` variants for the line (subtle, strong, accent) to match design system patterns

## Interaction Fixes Needed
1. When label is present, the outer `<cg-separator>` host should have `role="separator"` instead of each individual `.line` div. The two `.line` divs should be `aria-hidden="true"` and the host should carry the separator role.
2. Add `aria-label` support for when the separator has semantic meaning but no visible label
3. Consider `role="none"` or `role="presentation"` when the separator is purely decorative (add a `decorative` boolean prop)

## Test Spec
```typescript
describe('cg-separator', () => {
  it('renders horizontal line by default');
  it('renders vertical line with orientation="vertical"');
  it('renders label text in the middle');
  it('applies spacing variants (none, sm, md, lg)');
  it('vertical spacing uses horizontal margins');
  it('has role="separator" with correct aria-orientation');
  it('label has uppercase text-transform');
  it('gradient fades at edges');
  it('uses design tokens for all values');
});
```
