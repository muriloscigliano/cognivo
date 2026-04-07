# ai-scenario-panel — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: All spacing, colors, fonts, radii, and motion use `--cg-*` tokens with fallbacks. PASS.
- **Magic numbers**: None found. PASS.
- **Reduced motion**: `@media (prefers-reduced-motion)` disables host animation. PASS.
- **Issues**:
  - `.skel-bar` uses `opacity: 0.5` — should use a token or semantic variable.
  - Skeleton has no shimmer animation — static bars feel lifeless.

### States Audit

| State | .tab | .scenario-card | .run-btn |
|---|---|---|---|
| Default | PASS | PASS | PASS |
| Hover | PASS | PASS | PASS (opacity) |
| Active/Selected | PASS | PASS | N/A |
| Focus-visible | PASS (box-shadow) | PASS (box-shadow) | PASS (box-shadow) |
| Disabled | N/A | N/A | PASS (opacity+cursor) |
| Loading | N/A | N/A | Shows "Running..." |
| Error | MISSING | MISSING | MISSING |
| Empty | Returns `nothing` — no empty state message | N/A | N/A |

### Interaction Audit
- Tab/card selection fires `ai-scenario-select`. PASS.
- Run button fires `ai-scenario-run` with `stopPropagation`. PASS.
- Keyboard: Enter/Space on cards. PASS.
- **Issue**: Tab bar in compact mode has `role="tablist"` but tab panels lack `role="tabpanel"` and `aria-controls`/`aria-labelledby` linkage.
- **Issue**: Empty state returns `nothing` — should show a helpful message.
- **Issue**: No ARIA live region to announce scenario status changes (idle -> running -> complete).

## Style Fixes Needed

1. Add shimmer animation to skeleton bars for consistency with other components.
2. Replace `opacity: 0.5` on `.skel-bar` with a token-based value.
3. Add `.scenario-card:active` pressed state (scale or background shift).
4. Add error state styling for scenarios with a `status: 'error'` variant.

## Interaction Fixes Needed

1. Add `role="tabpanel"` and `aria-controls`/`aria-labelledby` attributes to link tabs to content in compact mode.
2. Add `aria-live="polite"` region to announce status changes.
3. Add empty state rendering with guidance text instead of returning `nothing`.
4. Add error status to `Scenario` interface and render with error styling.
5. Consider adding keyboard arrow navigation between tabs in compact mode (roving tabindex pattern).

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders loading skeleton when `loading=true` | render |
| 2 | Returns nothing when `scenarios` is empty | render |
| 3 | Renders all scenario cards in default (non-compact) mode | render |
| 4 | Renders tab bar and single card in compact mode | render |
| 5 | Active scenario card has `.active` class | render |
| 6 | Clicking a card fires `ai-scenario-select` with correct `id` | interaction |
| 7 | Clicking run button fires `ai-scenario-run` and does not fire `ai-scenario-select` | interaction |
| 8 | Run button is disabled and shows "Running..." when `status='running'` | state |
| 9 | Tab click in compact mode switches active scenario | interaction |
| 10 | Keyboard Enter/Space on card triggers selection | a11y |
| 11 | Tab elements have correct `role="tab"` and `aria-selected` | a11y |
| 12 | Probability bar width matches `probability * 100`% | render |
| 13 | Outcome text renders only when `outcome` is provided | render |
| 14 | Status badge renders correct class for idle/running/complete | render |
| 15 | Focus-visible ring is visible on cards and buttons | a11y |
