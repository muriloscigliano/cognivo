# ai-detection-canvas — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: All spacing, colors, fonts, radii, motion use `--cg-*` tokens. PASS.
- **Magic numbers**: `.bbox-label` uses `font-size: 11px` — should use token. Tooltip arrow uses `border: 4px solid` — minor.
- **Reduced motion**: Missing explicit `@media (prefers-reduced-motion)` block.
- **Issues**:
  - Placeholder `height: 200px` — should use token.
  - `.bbox` hover background uses inline `--det-bg-hover` with `${color}20` hex suffix — fragile for non-hex colors.

### States Audit

| State | .bbox | .count-badge | Image |
|---|---|---|---|
| Default | PASS | PASS | PASS |
| Hover | PASS (bg highlight) | N/A | N/A |
| Selected | PASS (thicker border, accent) | N/A | N/A |
| Focus-visible | N/A — MISSING | N/A | N/A |
| Disabled/Non-interactive | tabindex="-1" | N/A | N/A |
| Loading | MISSING | MISSING | MISSING |
| Error | MISSING (broken image) | MISSING | MISSING |

### Interaction Audit
- Click selects detection, fires `ai-detection-select`. PASS.
- Hover fires `ai-detection-hover`. PASS.
- Keyboard Enter/Space on bbox. PASS.
- `interactive` flag controls tabindex. PASS.
- **Issue**: `.bbox` has no `focus-visible` style despite being focusable.
- **Issue**: Bounding box positions use percentage calculations from natural image dims — if image hasn't loaded (`_imgNatW=0`), no boxes render. No loading indicator.
- **Issue**: No image error handling.
- **Issue**: `${color}20` for hover bg — won't work with CSS variables, only raw colors.

## Style Fixes Needed

1. Add `.bbox:focus-visible` styling (outline or box-shadow).
2. Replace `font-size: 11px` in `.bbox-label` with `var(--cg-font-size-xs, 12px)` or a dedicated token.
3. Replace `height: 200px` in placeholder with token.
4. Add `@media (prefers-reduced-motion)` to disable bbox transitions.
5. Fix hover background for CSS variable colors — use `color-mix()` or overlay approach instead of hex suffix.
6. Add loading state with skeleton while image loads.

## Interaction Fixes Needed

1. Add `focus-visible` ring to `.bbox` elements.
2. Add image `onerror` handler with error state display.
3. Add loading indicator while image is loading (before `_imgNatW` is set).
4. Fix hover background calculation to work with CSS custom properties.
5. Add keyboard navigation between detection boxes (arrow keys to cycle).
6. Add `aria-live` region to announce detection count.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders placeholder when `src` is empty | render |
| 2 | Renders image with correct `src` and `alt` | render |
| 3 | Detection boxes render at correct percentage positions after image load | render |
| 4 | Count badge shows correct number of detections | render |
| 5 | Labels render when `showLabels=true` | render |
| 6 | Confidence percentages render when `showConfidence=true` | render |
| 7 | Clicking bbox fires `ai-detection-select` with correct id/label | interaction |
| 8 | Hovering bbox fires `ai-detection-hover` and shows tooltip | interaction |
| 9 | Selected bbox has `.selected` class with thicker border | render |
| 10 | Non-interactive mode sets `tabindex="-1"` on boxes | a11y |
| 11 | Keyboard Enter/Space on bbox selects it | a11y |
| 12 | Custom colors apply via `det.color` property | render |
| 13 | Default color palette cycles through detections | render |
| 14 | No boxes render before image loads (`_imgNatW=0`) | render |
