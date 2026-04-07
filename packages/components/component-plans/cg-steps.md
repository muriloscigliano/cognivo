# cg-steps

**Tag**: `<cg-steps>`
**File**: `src/components/cg-steps/cg-steps.ts`
**Category**: Foundation

## Current State

### CSS Audit
- Border radius: Circle `var(--cg-border-radius-full, 99999px)` -- tokenized; indicator `2px` hardcoded
- Padding: Body `var(--cg-spacing-24, 24px)` bottom; horizontal body `var(--cg-spacing-4, 4px)` side -- tokenized
- Font sizes: Circle `0.8rem` hardcoded; compact circle `0.65rem` hardcoded; title `var(--cg-font-size-sm, 14px)` -- tokenized; compact title `var(--cg-font-size-xs, 12px)` -- tokenized; description `var(--cg-font-size-xs, 12px)` -- tokenized
- Colors: Circle border `var(--cg-color-surface-container-border)`, circle text `var(--cg-color-surface-tertiary-text)`, circle bg `var(--cg-color-surface-container-background)`. Done: `var(--cg-color-status-success-text-default)`. Active: `var(--cg-focus-ring-color)`. Error: `var(--cg-color-status-error-text)`. All `var(--cg-color-white)` for circle text in colored states. Title active `var(--cg-brand-ai-accent)`, done `var(--cg-color-status-success-text-default)`, error `var(--cg-color-status-error-text)`. Desc `var(--cg-color-surface-tertiary-text)` -- all tokenized.
- Borders: Circle `2px solid var(--cg-color-surface-container-border)` -- tokenized
- Transitions: Circle `all var(--cg-motion-duration-slow, 250ms) ease` -- tokenized. Lines `background 0.3s ease` -- `0.3s` not tokenized.
- Background: Circle bg tokenized per state

### States Audit
| State | Has it? | CSS correct? | Notes |
|-------|---------|-------------|-------|
| Default | ✅ | ✅ | Good token usage |
| Hover | ✅ | ✅ | Clickable circles change border and text color |
| Active/Press | ❌ | ❌ | No press feedback on clickable circles |
| Focus | ✅ | ✅ | `outline: 2px solid var(--cg-focus-ring-color)` with `outline-offset: 2px` |
| Disabled | ❌ | ❌ | No disabled state for individual steps |
| Loading | ❌ | ❌ | No loading state |
| Error | ✅ | ✅ | Error status with red circle and X icon |
| Success | ✅ | ✅ | Done status with green circle and check icon |

### Interaction Audit
- Keyboard: Clickable circles have `tabindex="0"`, Enter/Space triggers click. No arrow key navigation between steps.
- ARIA: `role="button"` on clickable circles. `aria-label="Step {n}: {title}"`. Missing overall `role="group"` or `role="list"` on the container.
- Events: `cg-step-click` (bubbles, composed) with `{ index, item }` detail.

## Style Fixes Needed
1. Replace circle `font-size: 0.8rem` with `var(--cg-font-size-xs, 12px)` or appropriate token
2. Replace compact circle `font-size: 0.65rem` with `var(--cg-font-size-2xs, 11px)` or smallest token
3. Replace circle `width: 32px; height: 32px` with `var(--cg-spacing-32, 32px)`
4. Replace compact circle `width: 24px; height: 24px` with `var(--cg-spacing-24, 24px)`
5. Replace circle SVG `width: 14px; height: 14px` with appropriate icon size token
6. Replace compact circle SVG `width: 11px; height: 11px` with token
7. Replace line `background 0.3s ease` with `background var(--cg-motion-duration-slow, 300ms) ease`
8. Replace v-line `min-height: 24px` with `var(--cg-spacing-24, 24px)`
9. Replace v-line `width: 2px` with `var(--cg-spacing-2, 2px)`
10. Replace h-line `height: 2px` with `var(--cg-spacing-2, 2px)`
11. Replace indicator `border-radius: 2px` with `var(--cg-border-radius-25, 2px)` or appropriate token
12. Add active/press state on clickable circles: `.circle:active { transform: scale(0.95); }`
13. Step entrance animation hardcoded delays (0/60/120/180/240/300ms) -- consider using CSS custom property `--stagger-index` with `calc()` for dynamic stagger

## Interaction Fixes Needed
1. Add `role="list"` or `role="group"` with `aria-label` on the steps container
2. Add `role="listitem"` on each step
3. Add arrow key navigation between clickable steps (up/down for vertical, left/right for horizontal)
4. Consider adding `aria-describedby` linking to description text
5. Active circle uses `pulse` animation -- this may be distracting for users with vestibular disorders; ensure `prefers-reduced-motion` disables it (currently handled by `reducedMotion` shared style import)
6. Consider adding `aria-current="step"` on the active step

## Test Spec
```typescript
describe('cg-steps', () => {
  it('renders steps with titles');
  it('renders step descriptions');
  it('renders vertical layout by default');
  it('renders horizontal layout');
  it('shows check icon for done steps');
  it('shows X icon for error steps');
  it('shows number for pending/active steps');
  it('active step has pulse animation');
  it('done connecting lines turn green');
  it('clickable steps have tabindex and role');
  it('fires cg-step-click on click');
  it('fires cg-step-click on Enter/Space');
  it('compact mode reduces circle and text size');
  it('focus-visible shows outline on clickable circles');
  it('hover changes border color on clickable circles');
  it('step entrance animation staggers');
  it('title color reflects status');
  it('uses design tokens for all values');
  it('respects prefers-reduced-motion');
});
```
