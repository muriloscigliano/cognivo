# cg-callout

**Tag**: `<cg-callout>`
**File**: `src/components/cg-callout/cg-callout.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: `8px` hardcoded on `.callout`; rounded variants use tokens correctly
- Padding: `12px 16px` hardcoded -- should use `var(--cg-spacing-12)` and `var(--cg-spacing-16)`
- Font sizes: Title `var(--cg-font-size-sm, 14px)` -- correct; Description `var(--cg-font-size-sm, 14px)` -- correct
- Colors: Variants use `var(--cg-color-status-*)` tokens -- good. Neutral variant uses `rgba(255, 255, 255, 0.2)` for border -- raw value. Background `rgba(255, 255, 255, 0.03)` and border `rgba(255, 255, 255, 0.08)` are raw.
- Borders: `1px solid rgba(255, 255, 255, 0.08)` base + `2px solid` left accent border
- Transitions: `all 150ms ease` on `.callout`; dismiss button `opacity 100ms` -- durations not tokenized
- Background: `rgba(255, 255, 255, 0.03)` -- raw rgba

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ❌ | Raw rgba values for bg/border |
| Hover | ❌ | ❌ | No hover state on the callout itself (dismiss button has hover) |
| Active/Press | ❌ | ❌ | No active/press state |
| Focus | ✅ | ✅ | Dismiss button has focus-visible with box-shadow |
| Disabled | ❌ | ❌ | No disabled state |
| Loading | ❌ | ❌ | N/A for this component |
| Error | ✅ | ✅ | Danger variant serves as error state |
| Success | ✅ | ✅ | Success variant serves as success state |

### Interaction Audit
- Keyboard: Dismiss button is keyboard accessible via native button. No keyboard shortcut for Escape to dismiss.
- ARIA: `role="alert"` for danger/warning, `role="note"` for others. Dismiss button has `aria-label="Dismiss"`. Missing `aria-live` for dynamic callouts.
- Events: `cg-callout-dismiss` (bubbles, composed) -- correct.

## Style Fixes Needed
1. Replace `.callout` `border-radius: 8px` with `var(--cg-border-radius-100, 8px)`
2. Replace `padding: 12px 16px` with `padding: var(--cg-spacing-12, 12px) var(--cg-spacing-16, 16px)`
3. Replace `gap: 12px` with `gap: var(--cg-spacing-12, 12px)`
4. Replace `rgba(255, 255, 255, 0.03)` background with `var(--cg-overlay-white-subtle, rgba(255, 255, 255, 0.03))`
5. Replace `rgba(255, 255, 255, 0.08)` border with `var(--cg-color-surface-container-border, #27272a)`
6. Replace neutral variant `rgba(255, 255, 255, 0.2)` with a token value
7. Replace `transition: all 150ms ease` with `transition: all var(--cg-motion-duration-normal, 150ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1))`
8. Add variant-specific subtle backgrounds (e.g., info: `var(--cg-overlay-info-subtle)`, success: `var(--cg-overlay-success-subtle)`)
9. Consider adding a subtle hover state if the callout contains action slot content

## Interaction Fixes Needed
1. Add Escape key handler to dismiss when `dismissible` is true and callout has focus within
2. Add `aria-live="polite"` on the callout wrapper for dynamically inserted callouts
3. Consider adding `role="status"` option for non-urgent informational callouts
4. After dismiss animation completes, move focus to a sensible target (or dispatch event for parent to handle)

## Test Spec
```typescript
describe('cg-callout', () => {
  it('renders with default info variant');
  it('renders success variant with correct border-left color');
  it('renders warning variant with role="alert"');
  it('renders danger variant with role="alert"');
  it('renders neutral variant with role="note"');
  it('displays title when provided');
  it('displays description when provided');
  it('renders icon slot with default SVG icon');
  it('renders custom icon via slot');
  it('renders action slot');
  it('shows dismiss button when dismissible is true');
  it('hides dismiss button when dismissible is false');
  it('fires cg-callout-dismiss on dismiss click');
  it('applies dismissing animation class');
  it('sets hidden attribute after dismiss animation');
  it('dismiss button has focus-visible ring');
  it('applies rounded variants correctly');
  it('uses design tokens for all color values');
  it('respects prefers-reduced-motion');
});
```
