# ai-cache-indicator — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Most values use `--cg-*` tokens. Minor issues below.
- **Magic numbers**:
  - `.pill` uses `border-radius: 999px` — should use `var(--cg-border-radius-full)`.
  - `.dot` uses `width: 8px; height: 8px; border-radius: 50%` — should use spacing tokens.
  - `.rate-bar-track` uses `height: 6px` — should use spacing token.
  - `.progress-track` `height: 6px` — same issue.
- **Reduced motion**: Missing explicit `@media (prefers-reduced-motion)` block.
- **Issues**:
  - `:host` uses `display: inline-flex` — good for inline indicator.
  - Detail card uses inline `style` for `margin-top` — could be tokenized in CSS.

### States Audit

| State | .pill | .clear-btn | .detail-card |
|---|---|---|---|
| Default | PASS | PASS | N/A (hidden) |
| Hover | PASS (border) | PASS (error color) | N/A |
| Active | MISSING | MISSING | N/A |
| Focus-visible | PASS (outline) | PASS (outline) | N/A |
| Disabled | MISSING | MISSING | N/A |
| Hit | PASS (green dot) | N/A | N/A |
| Miss | PASS (red dot) | N/A | N/A |
| Stale | PASS (yellow dot) | N/A | N/A |
| Loading | PASS (blue dot) | N/A | N/A |

### Interaction Audit
- Pill click toggles detail card visibility. PASS.
- Clear button fires `ai-cache-clear`. PASS.
- Detail toggle fires `ai-cache-detail`. PASS.
- `aria-expanded` on pill. PASS.
- `aria-label` on pill and detail region. PASS.
- **Issue**: Detail card is not positioned absolutely — it pushes content below. For an inline indicator, it should float/overlay.
- **Issue**: No click-outside-to-close behavior for detail card.
- **Issue**: No Escape key to close detail card.
- **Issue**: Focus ring uses `outline` instead of `box-shadow` — inconsistent with design system.
- **Issue**: `hitRate` is typed as `Number` but detail card expects it as a percentage (0-100 scale).

## Style Fixes Needed

1. Replace `border-radius: 999px` with `var(--cg-border-radius-full)`.
2. Replace `width: 8px; height: 8px; border-radius: 50%` with tokens.
3. Replace `height: 6px` with `var(--cg-spacing-6)`.
4. Standardize focus ring to `box-shadow` double-ring pattern.
5. Add `@media (prefers-reduced-motion)` for detail card animation.
6. Position detail card absolutely for inline use case.
7. Remove inline `style` margin-top on detail rows — use CSS class.

## Interaction Fixes Needed

1. Add Escape key handler to close detail card.
2. Add click-outside-to-close for detail card.
3. Position detail card as overlay (absolute/popover) instead of block flow.
4. Add focus trap or return focus when detail card closes.
5. Add loading state animation on dot (pulsing blue dot).
6. Add `aria-live` on status changes.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders pill with correct status dot color (hit=green, miss=red, stale=yellow) | render |
| 2 | Status text displays capitalized status | render |
| 3 | Latency saved shows in pill only for hit status | render |
| 4 | Click toggles detail card visibility | interaction |
| 5 | Detail card shows hit rate with progress bar | render |
| 6 | Hit rate bar width matches `hitRate` percentage | render |
| 7 | Latency saved displays in detail when provided | render |
| 8 | Cache age displays in detail when provided | render |
| 9 | Clear button fires `ai-cache-clear` | interaction |
| 10 | Toggle fires `ai-cache-detail` with status and hitRate | interaction |
| 11 | `aria-expanded` reflects detail card visibility | a11y |
| 12 | Pill has correct `aria-label` with status | a11y |
| 13 | Progress bar has correct `role="progressbar"` attributes | a11y |
| 14 | Disabled status shows grey dot | render |
