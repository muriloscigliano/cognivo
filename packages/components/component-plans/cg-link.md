# cg-link

**Tag**: `<cg-link>`
**File**: `src/components/cg-link/cg-link.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: `var(--cg-border-radius-50, 4px)` on focus ring — good.
- Padding: None on anchor (appropriate for inline element).
- Font sizes: `var(--cg-font-size-xs, 12px)` sm, `var(--cg-font-size-sm, 14px)` md, `var(--cg-font-size-base, 16px)` lg — good tokens.
- Colors: `--cg-color-surface-base-text` (default), `--cg-brand-ai-accent` (accent, hover for default/underline), `--cg-color-input-text-placeholder` (muted), `--cg-color-surface-primary-background` (focus ring gap). Good tokens.
- Borders: None (underline via `::after` pseudo-element). Underline variant uses `text-decoration: underline`.
- Transitions: `color var(--cg-motion-duration-fast, 150ms) ease`, `width/left var(--cg-motion-duration-slow, 200ms)` on underline, `transform/opacity var(--cg-motion-duration-fast, 80ms)` on active. Good token usage.
- Background: `currentColor` on `::after` underline.

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Per-variant color |
| Hover | ✅ | ✅ | Color change + underline grows from center |
| Active/Press | ✅ | ✅ | `opacity: 0.8; transform: scale(0.97)` with tokens |
| Focus | ✅ | ✅ | Dual-layer focus ring — excellent |
| Disabled | ✅ | ✅ | `opacity: 0.5; pointer-events: none; cursor: not-allowed` |
| Loading | ❌ | ❌ | Missing — not typical for links but could be useful |
| Error | ❌ | ❌ | Missing |
| Success | ❌ | ❌ | Missing |

### Interaction Audit
- Keyboard: Uses native `<a>` element — Enter activates (native behavior). Tab focuses. No custom keyboard needed.
- ARIA: `aria-disabled`, `tabindex` set to -1 when disabled. External links have `rel="noopener noreferrer"` and `target="_blank"`. Missing `aria-label` prop binding.
- Events: `cg-link-click` on click. Bubbles and composes.

## Style Fixes Needed

1. **Line 72**: `text-underline-offset: var(--cg-spacing-2, 3px)` — the fallback `3px` doesn't match the token name `--cg-spacing-2` (which is typically 2px). Should be `var(--cg-spacing-2, 2px)` or use `3px` with a different token.
2. **Line 79-80**: Active press uses `var(--cg-interaction-press-opacity, 0.8)` and `var(--cg-interaction-press-scale, 0.97)` — good tokens.
3. The `::after` underline is `1px` height — should use `var(--cg-border-width-50, 1px)` token.
4. Consider adding `text-decoration-skip-ink: auto` to the underline variant for better text aesthetics.

## Interaction Fixes Needed

1. Add `aria-label` prop binding to the anchor for accessible labeling of icon-only links.
2. The `_onClick` handler prevents default when disabled — correct. But `tabindex=-1` when disabled means the link can't be reached by keyboard but could still be reached by click (if `pointer-events: none` is overridden). The CSS `pointer-events: none` handles this.
3. Consider adding a `loading` state with a small spinner for links that trigger async operations (e.g., download links).

## Test Spec

```typescript
describe('cg-link', () => {
  // Rendering
  it('renders with shadow DOM')
  it('renders a native <a> element')
  it('renders slotted content')

  // Props
  it('href — sets anchor href')
  it('variant — applies default/accent/muted/underline styles')
  it('external — adds target="_blank" and rel="noopener noreferrer"')
  it('external — shows external icon')
  it('disabled — prevents navigation')
  it('size — applies sm/md/lg font sizes')

  // Underline animation
  it('hover grows underline from center (default variant)')
  it('underline variant always shows underline')
  it('muted variant has no underline initially')

  // States
  it('hover changes color to accent')
  it('active/press scales down with reduced opacity')
  it('focus-visible shows dual-layer ring')
  it('disabled reduces opacity and prevents click')

  // Keyboard
  it('Enter navigates (native anchor behavior)')

  // Events
  it('fires cg-link-click on click')
  it('does not fire when disabled')

  // Accessibility
  it('has aria-disabled when disabled')
  it('disabled link has tabindex="-1"')
  it('external link has rel="noopener noreferrer"')
});
```
