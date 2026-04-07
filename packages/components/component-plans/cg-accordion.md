# cg-accordion

**Tag**: `<cg-accordion>`
**File**: `src/components/cg-accordion/cg-accordion.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: Card variant `8px` hardcoded; bordered first `8px 8px 0 0` hardcoded; bordered last `0 0 8px 8px` hardcoded; trigger focus `6px` hardcoded; rounded variants use raw values (`4px`, `8px`, `12px`, `99999px`) instead of tokens
- Padding: Trigger `16px` hardcoded; default variant trigger `16px 0`; sm trigger `8px 12px` hardcoded; lg trigger `16px 20px` hardcoded; content-inner `0 16px 16px`; default content-inner `0 0 16px` -- all hardcoded
- Font sizes: Trigger `14px` hardcoded; sm trigger `14px` hardcoded (same as default, bug?); sm content `14px` hardcoded; lg trigger `16px`; lg content `16px` -- none tokenized
- Colors: Trigger `var(--cg-color-surface-primary-text)` -- good. Hover `var(--cg-brand-ai-accent)` -- good. Content `var(--cg-color-surface-secondary-text, #a3a3a3)` -- fallback should be `#a1a1aa`. Chevron `var(--cg-color-surface-tertiary-text, #666666)` -- fallback should be `#71717a`. Indicator active `var(--cg-brand-ai-accent)` -- good.
- Borders: Item `1px solid rgba(255, 255, 255, 0.08)` raw; card/bordered variants same raw value
- Transitions: Trigger `all 150ms ease` hardcoded; chevron `transform 200ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms ease` -- durations hardcoded; content `grid-template-rows 250ms cubic-bezier(0.4, 0, 0.2, 1)` -- duration hardcoded; header hover `80ms ease` hardcoded
- Background: Card margin-bottom `8px` hardcoded; indicator `3px` width and `16px` height hardcoded

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ❌ | Many hardcoded values |
| Hover | ✅ | ❌ | Accent color on trigger text, chevron. Header bg hover `rgba(255, 255, 255, 0.03)` raw |
| Active/Press | ❌ | ❌ | No press feedback on trigger |
| Focus | ✅ | ❌ | `box-shadow: 0 0 0 3px rgba(223, 255, 97, 0.25)` -- raw value |
| Disabled | ✅ | ✅ | `opacity: 0.4; cursor: not-allowed` on trigger button |
| Loading | ❌ | ❌ | No loading state |
| Error | ❌ | ❌ | No error state |
| Success | ❌ | ❌ | N/A |

### Interaction Audit
- Keyboard: ArrowDown/ArrowUp move between triggers. Home/End jump to first/last. Enter/Space toggle current item. Excellent keyboard support.
- ARIA: `aria-expanded` on trigger buttons. `aria-controls` linking to panel. `role="region"` on content with `aria-labelledby`. `id` associations correct. Good.
- Events: `cg-accordion-change` (bubbles, composed) with `{ open: string[], toggled: string }` detail.

## Style Fixes Needed
1. Replace all hardcoded `padding: 16px` with `padding: var(--cg-spacing-16, 16px)`
2. Replace `padding: 8px 12px` with `var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px)`
3. Replace `padding: 16px 20px` with `var(--cg-spacing-16, 16px) var(--cg-spacing-20, 20px)`
4. Replace trigger `font-size: 14px` with `var(--cg-font-size-sm, 14px)`
5. Replace lg trigger `font-size: 16px` with `var(--cg-font-size-base, 16px)`
6. Fix sm trigger font-size: it's `14px` same as default -- should be `var(--cg-font-size-xs, 12px)` for a meaningful size difference
7. Replace content `font-size: 14px` with `var(--cg-font-size-sm, 14px)` and lg with token
8. Replace content `line-height: 1.65` with `var(--cg-line-height-relaxed, 1.65)` or closest token
9. Replace all `rgba(255, 255, 255, 0.08)` borders with `var(--cg-color-surface-container-border, #27272a)`
10. Replace focus ring with standard double-ring pattern using tokens
11. Replace card `margin-bottom: 8px` with `margin-bottom: var(--cg-spacing-8, 8px)`
12. Replace `border-radius: 8px` in card/bordered with `var(--cg-border-radius-100, 8px)`
13. Replace trigger focus `border-radius: 6px` with `var(--cg-border-radius-75, 6px)` or `var(--cg-border-radius-100, 8px)`
14. Replace rounded variants with token values: `4px` -> `var(--cg-border-radius-50, 4px)`, etc.
15. Tokenize transition durations: `150ms` -> `var(--cg-motion-duration-normal, 150ms)`, `200ms` -> `var(--cg-motion-duration-normal, 200ms)`, `250ms` -> `var(--cg-motion-duration-slow, 250ms)`
16. Fix color fallbacks: `#a3a3a3` -> `#a1a1aa`, `#666666` -> `#71717a`
17. Disabled `opacity: 0.4` should use `var(--cg-opacity-disabled, 0.5)` for consistency
18. Indicator `width: 3px` and `height: 16px` should use spacing tokens
19. Header hover bg `rgba(255, 255, 255, 0.03)` should use overlay token

## Interaction Fixes Needed
1. Add active/press state on trigger: `.trigger:active:not(:disabled) { transform: scale(0.99); }`
2. The `.header` hover rule (line 171-172) applies to a `.header` class that doesn't exist in the template -- dead CSS. Remove it.
3. Consider adding animation for indicator bar appearance (currently instant)

## Test Spec
```typescript
describe('cg-accordion', () => {
  it('renders items with trigger text');
  it('renders content when item is open');
  it('toggles item open/closed on click');
  it('fires cg-accordion-change with open items array');
  it('single mode closes other items when opening one');
  it('multiple mode allows multiple open items');
  it('respects defaultOpen items');
  it('disabled items are not toggleable');
  it('ArrowDown moves focus to next trigger');
  it('ArrowUp moves focus to previous trigger');
  it('Home moves focus to first trigger');
  it('End moves focus to last trigger');
  it('Enter/Space toggles focused item');
  it('aria-expanded reflects open state');
  it('aria-controls links trigger to panel');
  it('content panel has role="region"');
  it('renders default variant');
  it('renders card variant with borders');
  it('renders bordered variant with connected borders');
  it('applies size variants (sm, md, lg)');
  it('applies rounded variants');
  it('chevron rotates when open');
  it('indicator bar appears when open');
  it('content animates with CSS grid trick');
  it('focus-visible shows ring on trigger');
  it('uses design tokens for all values');
});
```
