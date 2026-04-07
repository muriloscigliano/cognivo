# ai-validation-checklist — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Most values use `--cg-*` tokens. Minor issues below.
- **Magic numbers**:
  - `.status-icon` uses `width: 20px; height: 20px; margin-top: 1px` — should use tokens.
  - `.spinner` uses `width: 14px; height: 14px; border: 2px; border-radius: 50%` — partial tokenization.
  - `.summary-dot` uses `width: 8px; height: 8px; border-radius: 50%` — should use spacing tokens.
  - `.progress-track` uses `height: 4px` — should use token.
  - `.run-btn` uses `border-radius: 999px` — should use `var(--cg-border-radius-full)`.
  - `.title` uses `font-weight: 600` — should use `var(--cg-font-weight-semibold)`.
  - `.check-label` uses `font-weight: 500` — should use `var(--cg-font-weight-medium)`.
  - `.check-desc` uses `margin-top: 2px` — should use token.
- **Reduced motion**: PASS — disables spinner.
- **Issues**:
  - Multiple raw pixel values and font-weights need tokenization.
  - `.run-btn:focus-visible` uses `outline` instead of `box-shadow` ring pattern — inconsistent with other components.

### States Audit

| State | .run-btn | .check-item | .progress-fill |
|---|---|---|---|
| Default | PASS | PASS | PASS |
| Hover | PASS (brightness) | PASS (background) | N/A |
| Active | MISSING | MISSING | N/A |
| Focus-visible | PASS (outline) | PASS (outline) | N/A |
| Disabled | PASS (opacity+cursor) | N/A | N/A |
| Loading/Running | PASS (text change) | PASS (spinner icon) | PASS (width%) |
| Error | N/A | PASS (fail icon+color) | N/A |

### Interaction Audit
- Run button fires `ai-validation-run`. PASS.
- Check items fire `ai-validation-item-click`. PASS.
- Keyboard Enter/Space on check items. PASS.
- Progress bar has `role="progressbar"` with ARIA values. PASS.
- Status icons have `aria-label`. PASS.
- **Issue**: `autoRun` property exists but is never used in the component logic.
- **Issue**: No `ai-validation-complete` event is ever dispatched despite being documented.
- **Issue**: Check items use `role="listitem"` inside `role="list"` — PASS, but items are also clickable buttons without `role="button"`.

## Style Fixes Needed

1. Replace all raw pixel values with `--cg-spacing-*` tokens (status-icon, spinner, summary-dot, progress-track).
2. Replace raw font-weights with `--cg-font-weight-*` tokens.
3. Replace `border-radius: 999px` with `var(--cg-border-radius-full)`.
4. Replace `border-radius: 50%` with `var(--cg-border-radius-full)`.
5. Standardize focus ring pattern — use box-shadow double-ring instead of outline.
6. Replace `margin-top: 2px` with `var(--cg-spacing-2)`.

## Interaction Fixes Needed

1. Implement `autoRun` logic — dispatch `ai-validation-run` on `connectedCallback` if `autoRun=true`.
2. Add logic to dispatch `ai-validation-complete` when all checks resolve (no pending/running).
3. Add `role="button"` to check items or use `<button>` elements.
4. Add re-run individual check capability.
5. Add expand/collapse for check item descriptions.
6. Add `aria-live="polite"` on progress or summary for status announcements.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders title and run button | render |
| 2 | Progress bar shows correct width based on completed checks | render |
| 3 | All check items render with correct status icons | render |
| 4 | Pass status shows green checkmark | render |
| 5 | Fail status shows red X | render |
| 6 | Warning status shows yellow warning icon | render |
| 7 | Running status shows animated spinner | render |
| 8 | Pending status shows grey dot | render |
| 9 | Run button fires `ai-validation-run` | interaction |
| 10 | Run button disabled during running state | interaction |
| 11 | Check item click fires `ai-validation-item-click` with correct detail | interaction |
| 12 | Keyboard Enter/Space on check item triggers click | a11y |
| 13 | Summary section shows pass/fail/warning counts | render |
| 14 | Description renders when check has `description` | render |
| 15 | Progress bar has correct ARIA progressbar attributes | a11y |
