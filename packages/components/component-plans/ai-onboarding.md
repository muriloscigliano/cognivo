# ai-onboarding — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Excellent coverage — spacing, colors, typography, border-radius, motion all tokenized.
- **Magic numbers**: None found.
- **Progress dots**: Three states (active/completed/pending) with scale animation on active.
- **Navigation buttons**: Primary (accent) and secondary (container) button styles.
- **Rounded variants**: Supported on `.card`.

### States Audit

| State | Supported | Notes |
|---|---|---|
| Default | Yes | Card with step title, description, dots, buttons |
| Active step | Yes | Current dot scaled, accent color |
| Completed dot | Yes | Accent color at 50% opacity |
| First step | Yes | Back button disabled |
| Last step | Yes | "Done" label instead of "Next" |
| Dismissible | Yes | Close button shown when `dismissible` is true |
| Hover | **Partial** | Next button has hover (brightness), dismiss has hover. Back button has no hover. |
| Focus-visible | Yes | All buttons have accent focus rings |
| Empty | Yes | Returns `nothing` when no step at active index |
| Loading | **No** | No loading state |
| Disabled | Yes | Back button disabled at first step |

### Interaction Audit
- **Next**: Increments active, fires `ai-onboarding-next`. On last step, fires `ai-onboarding-complete`.
- **Back**: Decrements active, fires `ai-onboarding-prev`.
- **Dismiss**: Fires `ai-onboarding-dismiss` with current step.
- **Keyboard**: Native button keyboard support.
- **ARIA**: `role="dialog"`, `aria-label` with step count.

## Style Fixes Needed

1. **Back button hover** — `.prev-btn` has no `:hover` style. Add `background: var(--cg-color-surface-hover-background)` or similar.
2. **Disabled button cursor** — `.nav-btn:disabled` has `cursor: default` — should be `cursor: not-allowed` for clearer affordance.
3. **Dot transition** — Uses `var(--cg-motion-duration-normal, 200ms)` — correct.
4. **Max-width** — `.card` has `max-width: 420px` — raw value. Consider making configurable via CSS custom property.
5. **Step label letter-spacing** — `0.5px` raw value should use `var(--cg-letter-spacing-wide, 0.5px)`.

## Interaction Fixes Needed

1. **Dot navigation** — Progress dots are visual only. Consider making them clickable to jump to specific steps.
2. **Swipe gesture** — On touch devices, swipe left/right to navigate steps.
3. **Arrow key navigation** — Left/Right arrow keys could navigate between steps.
4. **Auto-advance** — Consider optional auto-advance timer for slideshow mode.
5. **Step target** — `OnboardingStep` has a `target` field but it's never used. Implement spotlight/highlight on target element.
6. **Persistence** — No mechanism to remember dismissed state across sessions.
7. **Animation between steps** — Step content changes instantly. Consider slide/fade transition between steps.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders current step title and description | Unit |
| 2 | Step label shows "Step X of Y" | Unit |
| 3 | Next button advances to next step | Interaction |
| 4 | Next fires `ai-onboarding-next` with step index | Unit |
| 5 | Back button returns to previous step | Interaction |
| 6 | Back fires `ai-onboarding-prev` with step index | Unit |
| 7 | Back disabled at first step | Unit |
| 8 | Last step shows "Done" button text | Unit |
| 9 | Done fires `ai-onboarding-complete` | Unit |
| 10 | Dismiss button fires `ai-onboarding-dismiss` | Unit |
| 11 | Dismiss button hidden when `dismissible` is false | Unit |
| 12 | Progress dots show correct active/completed/pending states | Unit |
| 13 | Active dot has scale transform | Visual |
| 14 | Returns nothing when active index out of range | Unit |
| 15 | Focus-visible ring on all buttons | A11y |
| 16 | `role="dialog"` with step count label | A11y |
| 17 | Rounded variants change card border-radius | Visual |
