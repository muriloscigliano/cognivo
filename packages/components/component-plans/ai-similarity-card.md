# ai-similarity-card — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: All spacing, colors, fonts, radii, motion use `--cg-*` tokens. PASS.
- **Magic numbers**: `letter-spacing: 0.05em` in `.features-title` — should use token.
- **Reduced motion**: PASS — disables host animation.
- **Issues**:
  - `.item-image` uses `aspect-ratio: 16/10` — acceptable design choice.
  - Feature bars transition well with tokens.

### States Audit

| State | .btn-accept | .btn-reject | .item-card | .score-circle |
|---|---|---|---|---|
| Default | PASS | PASS | PASS | PASS |
| Hover | PASS (opacity) | PASS (error color) | N/A | N/A |
| Active | MISSING | MISSING | MISSING | N/A |
| Focus-visible | PASS | PASS | N/A | N/A |
| Disabled | MISSING | MISSING | N/A | N/A |
| Loading | MISSING | MISSING | MISSING | MISSING |
| Error | MISSING | MISSING | MISSING | MISSING |

### Interaction Audit
- Accept fires `ai-similarity-accept`. PASS.
- Reject fires `ai-similarity-reject`. PASS.
- Both pass `score` in detail. PASS.
- **Issue**: No keyboard support on item cards — they are not interactive (display only). Acceptable.
- **Issue**: No loading state for when similarity is being computed.
- **Issue**: No threshold indicator (e.g., score above 80% = good match visual).
- **Issue**: Score circle has no `aria-label` — screen readers can't identify the match percentage easily.
- **Issue**: Feature bars have no ARIA — just visual comparison with no screen reader text.
- **Issue**: Stacked layout mode doesn't show "match" label — minor.

## Style Fixes Needed

1. Replace `letter-spacing: 0.05em` with `var(--cg-letter-spacing-wide, 0.05em)`.
2. Add active/pressed states for accept and reject buttons.
3. Add disabled states for both buttons.
4. Add loading skeleton state.
5. Add score threshold visual (color-code score circle based on match quality).
6. Add `.item-card:hover` state for visual feedback even though non-interactive.

## Interaction Fixes Needed

1. Add `aria-label` to score circle with "87% match" text.
2. Add screen reader text for feature comparison bars (e.g., "Color: Item A 90%, Item B 85%").
3. Add loading property with skeleton display.
4. Add score threshold coloring (green > 80%, yellow 50-80%, red < 50%).
5. Add confirm dialog for reject action if score is high.
6. Consider adding detail view expansion for individual features.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders item A and item B cards with labels and descriptions | render |
| 2 | Item images render when provided | render |
| 3 | Score circle displays correct percentage | render |
| 4 | "match" label shows in side-by-side mode, hidden in stacked | render |
| 5 | Feature comparison bars render at correct widths | render |
| 6 | Accept button fires `ai-similarity-accept` with score | interaction |
| 7 | Reject button fires `ai-similarity-reject` with score | interaction |
| 8 | Side-by-side layout uses 3-column grid | render |
| 9 | Stacked layout uses single column | render |
| 10 | Focus-visible rings on accept and reject buttons | a11y |
| 11 | Features section hidden when `features` array is empty | render |
| 12 | Header shows "Similarity Match" title with icon | render |
| 13 | Score bridge renders smaller in stacked mode | render |
