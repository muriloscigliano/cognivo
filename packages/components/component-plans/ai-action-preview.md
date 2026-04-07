# ai-action-preview — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: All values use `--cg-*` tokens. PASS.
- **Magic numbers**: None significant — all values properly tokenized.
- **Reduced motion**: Missing explicit `@media (prefers-reduced-motion)` for `pulse-border` animation on critical cards.
- **Issues**:
  - `button` rule is globally scoped within shadow DOM — affects all buttons. Acceptable in Shadow DOM context.
  - `.severity` badge uses `padding: 3px` via `var(--cg-spacing-2, 3px)` — spacing-2 is typically 2px, mismatch.
  - `.card.critical` pulse-border animation runs indefinitely — should respect reduced motion.

### States Audit

| State | .btn-confirm | .btn-cancel | .card | .severity |
|---|---|---|---|---|
| Default | PASS | PASS | PASS | PASS |
| Hover | PASS (brightness/bg) | PASS (background) | N/A | N/A |
| Active | MISSING | MISSING | N/A | N/A |
| Focus-visible | PASS (outline) | N/A — MISSING | PASS (focusable) | N/A |
| Critical | PASS (red bg) | N/A | PASS (red border + pulse) | PASS (red) |
| High | N/A | N/A | N/A | PASS (orange) |
| Medium | N/A | N/A | N/A | PASS (yellow) |
| Low | N/A | N/A | N/A | PASS (green) |
| Countdown active | N/A | N/A | N/A | PASS (countdown display) |

### Interaction Audit
- Confirm fires `ai-action-confirm` with action and details. PASS.
- Cancel fires `ai-action-cancel` with action. PASS.
- Countdown auto-confirms when reaching 0. PASS.
- Double-fire guard on confirm (`_confirmed` flag). PASS.
- Timer cleanup on disconnect. PASS.
- `role="alertdialog"` on card. PASS.
- `aria-label` on card and buttons. PASS.
- `aria-live="polite"` on countdown. PASS.
- **Issue**: `.btn-cancel` has no `focus-visible` styling.
- **Issue**: `_confirmed` flag is never reset — if component is reused, confirm won't fire again.
- **Issue**: Countdown auto-confirm with no way to pause or cancel countdown.
- **Issue**: No keyboard focus management — alertdialog should trap focus.
- **Issue**: Severity icon uses text characters — may not be accessible.

## Style Fixes Needed

1. Add `@media (prefers-reduced-motion)` to disable `pulse-border` animation.
2. Fix `var(--cg-spacing-2, 3px)` fallback to `2px`.
3. Add `.btn-cancel:focus-visible` styling.
4. Add active/pressed states for both buttons.
5. Add progress bar for countdown (visual timer).

## Interaction Fixes Needed

1. Reset `_confirmed` flag when properties change (new action scenario).
2. Add focus trap for alertdialog pattern.
3. Add Escape key handler to cancel.
4. Add countdown pause on hover/focus (user is reading).
5. Add progress indicator for countdown (shrinking bar or circular timer).
6. Add `aria-describedby` linking description to card.
7. Ensure severity icons are properly hidden from screen readers (already `aria-hidden`). PASS.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders heading and severity badge | render |
| 2 | Severity badge shows correct color per level (low/medium/high/critical) | render |
| 3 | Critical severity adds pulse-border animation and red border | render |
| 4 | Details key-value pairs render correctly | render |
| 5 | Description text renders when provided | render |
| 6 | Confirm button fires `ai-action-confirm` with action and details | interaction |
| 7 | Cancel button fires `ai-action-cancel` with action | interaction |
| 8 | Confirm button is red for critical severity | render |
| 9 | Countdown displays and decrements every second | interaction |
| 10 | Countdown reaching 0 auto-fires confirm | interaction |
| 11 | Double-click on confirm only fires once | interaction |
| 12 | Timer clears on disconnect | lifecycle |
| 13 | Card has `role="alertdialog"` with `aria-label` | a11y |
| 14 | Countdown has `aria-live="polite"` | a11y |
| 15 | Focus-visible ring on confirm and cancel buttons | a11y |
| 16 | Severity icon is properly rendered per level | render |
