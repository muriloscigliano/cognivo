# ai-reward-signal — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Most values use `--cg-*` tokens. Issues below.
- **Magic numbers**:
  - `.score` uses `font-size: 36px; font-weight: 800` — should use tokens.
  - `.progress-track` uses `height: 6px` — should use `var(--cg-spacing-6)`.
  - `.trend` uses `border-radius: 999px` — should use `var(--cg-border-radius-full)`.
  - `.label` uses `font-weight: 600` — should use `var(--cg-font-weight-semibold)`.
- **Reduced motion**: Missing explicit `@media (prefers-reduced-motion)` block.
- **Issues**:
  - Sparkline SVG uses hardcoded `viewBox="0 0 200 40"` — acceptable for SVG.
  - Spark area fill uses token-based color. PASS.

### States Audit

| State | .container | .trend | .progress-fill |
|---|---|---|---|
| Default | PASS | PASS | PASS |
| Hover | PASS (border) | N/A | N/A |
| Focus-visible | N/A — MISSING | N/A | N/A |
| Active | MISSING | N/A | N/A |
| Up trend | N/A | PASS (green) | N/A |
| Down trend | N/A | PASS (red) | N/A |
| Stable | N/A | PASS (neutral) | N/A |
| Loading | MISSING | MISSING | MISSING |

### Interaction Audit
- Container is a `role="button"` with `tabindex="0"` and click/keyboard. PASS.
- Click fires `ai-reward-detail`. PASS.
- Keyboard Enter/Space. PASS.
- `aria-label` with score, max, and trend. PASS.
- Progress bar has `role="progressbar"` with ARIA values. PASS.
- **Issue**: Container has no `focus-visible` styling despite being focusable.
- **Issue**: Sparkline SVG is `aria-hidden="true"`. PASS for decorative.
- **Issue**: No loading state or skeleton.
- **Issue**: `score` can exceed `maxScore` — `_percent` is clamped but visual score text is not.

## Style Fixes Needed

1. Replace `font-size: 36px; font-weight: 800` with tokens (e.g., `var(--cg-font-size-3xl)`, `var(--cg-font-weight-extrabold)`).
2. Replace `height: 6px` with `var(--cg-spacing-6)`.
3. Replace `border-radius: 999px` with `var(--cg-border-radius-full)`.
4. Replace `font-weight: 600` with `var(--cg-font-weight-semibold)`.
5. Add `.container:focus-visible` styling with box-shadow ring.
6. Add `@media (prefers-reduced-motion)` to disable transitions.
7. Add loading skeleton state.

## Interaction Fixes Needed

1. Add `focus-visible` ring to container.
2. Add loading state with skeleton placeholder.
3. Clamp score display text to `maxScore`.
4. Add color coding to score value based on threshold (green/yellow/red).
5. Add tooltip with detailed breakdown on hover.
6. Consider adding animation for score counting up on initial render.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders score value and max score | render |
| 2 | Progress bar width matches score/maxScore percentage | render |
| 3 | Trend badge shows correct arrow and color for up/down/stable | render |
| 4 | Sparkline SVG renders when history has 2+ points | render |
| 5 | Sparkline hidden when history has < 2 points | render |
| 6 | Label and description text render when provided | render |
| 7 | Click on container fires `ai-reward-detail` with score and trend | interaction |
| 8 | Keyboard Enter/Space fires `ai-reward-detail` | a11y |
| 9 | Container has correct `aria-label` with score, max, trend | a11y |
| 10 | Progress bar has `role="progressbar"` with correct values | a11y |
| 11 | Percent is clamped between 0 and 100 | render |
| 12 | Container hover shows border change | render |
| 13 | Sparkline area and line paths are computed correctly | render |
