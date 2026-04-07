# cg-card

**Tag**: `<cg-card>`
**File**: `src/components/cg-card/cg-card.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: `12px` hardcoded on `.card` (not using token); rounded variants use tokens correctly (`--cg-border-radius-50` through `--cg-border-radius-full`)
- Padding: Body default `24px` hardcoded; `sm` uses `--cg-spacing-12`; `md` uses `--cg-spacing-20`/`--cg-spacing-24`; `lg` uses `--cg-spacing-24`. Header horizontal padding `24px` hardcoded. Footer horizontal padding `24px` hardcoded.
- Font sizes: None declared (delegated to slotted content)
- Colors: `rgba(255, 255, 255, 0.03)` bg, `rgba(255, 255, 255, 0.08)` border, `rgba(255, 255, 255, 0.06)` internal dividers, `rgba(255, 255, 255, 0.15)` hover border, `rgba(255, 255, 255, 0.05)` hover bg, `rgba(223, 255, 97, 0.2)` focus ring -- all raw rgba, no tokens
- Borders: `1px solid rgba(255, 255, 255, 0.08)` base; outlined variant `rgba(255, 255, 255, 0.1)`; internal dividers `rgba(255, 255, 255, 0.06)`
- Transitions: `all 150ms` on `.card` -- no easing function, no token for duration
- Background: `rgba(255, 255, 255, 0.03)` default/elevated; `rgba(255, 255, 255, 0.02)` outlined; `rgba(255, 255, 255, 0.05)` filled

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ❌ | Uses raw rgba colors instead of tokens |
| Hover | ✅ | ❌ | Only on clickable variant; uses raw rgba values |
| Active/Press | ✅ | ✅ | `scale(0.98)` on clickable -- acceptable |
| Focus | ✅ | ❌ | `focus-within` uses raw `rgba(223, 255, 97, 0.2)` instead of token; duplicate `:focus-visible` rule |
| Disabled | ❌ | ❌ | No disabled state at all |
| Loading | ❌ | ❌ | No loading/skeleton state |
| Error | ❌ | ❌ | No error state |
| Success | ❌ | ❌ | No success state |

### Interaction Audit
- Keyboard: Enter and Space trigger click on clickable cards -- good. No arrow key navigation between cards.
- ARIA: `role="button"` and `tabindex="0"` on clickable cards. Non-clickable cards have no role -- acceptable. Missing `aria-disabled` for a disabled state.
- Events: `cg-card-click` (bubbles, composed) -- correct.

## Style Fixes Needed
1. Replace `.card` `border-radius: 12px` with `var(--cg-border-radius-150, 12px)` to match the `rounded="lg"` default
2. Replace all `rgba(255, 255, 255, 0.03)` with `var(--cg-overlay-white-subtle, rgba(255, 255, 255, 0.03))`
3. Replace `rgba(255, 255, 255, 0.08)` border with `var(--cg-color-surface-container-border, #27272a)` or appropriate overlay token
4. Replace `rgba(255, 255, 255, 0.06)` dividers with `var(--cg-color-divider, rgba(255, 255, 255, 0.06))`
5. Replace `rgba(255, 255, 255, 0.15)` hover border with `var(--cg-color-surface-border-hover, #52525b)`
6. Replace `rgba(223, 255, 97, 0.2)` focus ring with `var(--cg-focus-ring-color, #c8e650)` using standard double-ring pattern: `0 0 0 2px var(--cg-color-surface-base-background), 0 0 0 4px var(--cg-focus-ring-color)`
7. Replace hardcoded `24px` padding values with `var(--cg-spacing-24, 24px)`
8. Add transition easing: `transition: all var(--cg-motion-duration-normal, 150ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1))`
9. Remove duplicate `:focus-visible` rule (lines 116-119) -- consolidate into `.card:focus-visible`
10. Add disabled state: `:host([disabled]) .card { opacity: var(--cg-opacity-disabled, 0.5); pointer-events: none; }`

## Interaction Fixes Needed
1. Add `disabled` property (`@property({ type: Boolean, reflect: true }) disabled = false`)
2. When disabled, set `aria-disabled="true"` and remove `tabindex`
3. Guard `_handleClick` to bail if `this.disabled`
4. Header/footer slots render empty divs even when no content is slotted -- add slot change detection or use `<slot>` with CSS `:has()` / `:empty` to hide empty header/footer wrappers
5. Add `aria-label` or `aria-labelledby` support for non-clickable cards that act as landmark containers

## Test Spec
```typescript
describe('cg-card', () => {
  it('renders with default elevated variant');
  it('renders outlined variant with correct border');
  it('renders filled variant with correct background');
  it('applies padding variants (none, sm, md, lg)');
  it('applies rounded variants (none, sm, md, lg, full)');
  it('renders header slot content');
  it('renders default slot content');
  it('renders footer slot content');
  it('clickable card has role="button" and tabindex="0"');
  it('clickable card fires cg-card-click on click');
  it('clickable card fires cg-card-click on Enter key');
  it('clickable card fires cg-card-click on Space key');
  it('non-clickable card has no role or tabindex');
  it('disabled card has aria-disabled and no pointer events');
  it('disabled card does not fire cg-card-click');
  it('focus-visible shows focus ring on clickable card');
  it('hover state changes border color on clickable card');
  it('active state scales down on clickable card');
  it('uses design tokens for all color values');
  it('respects prefers-reduced-motion');
});
```
