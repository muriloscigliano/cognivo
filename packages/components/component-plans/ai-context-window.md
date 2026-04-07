# ai-context-window — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Excellent coverage — all spacing, colors, typography, border-radius use `--cg-*` tokens.
- **Magic numbers**: None found.
- **Monospace font**: Used for token counts — good for numeric alignment.
- **Tooltip**: CSS `::after` pseudo-element tooltip on segment hover.

### States Audit

| State | Supported | Notes |
|---|---|---|
| Default | Yes | Segmented bar with legend |
| OK | Yes | Usage < 80% — secondary text color |
| Warning | Yes | Usage 80-95% — warning color |
| Danger | Yes | Usage >= 95% — error color |
| Empty | Yes | Returns `nothing` when `total <= 0` |
| Hover | Yes | Segment tooltip on hover |
| Focus-visible | Yes | Box-shadow focus ring |
| Loading | **No** | No loading/skeleton state |
| Cache indicator | Yes | Lightning icon when cached > 0 |

### Interaction Audit
- **Segment click**: Fires `ai-context-segment-click` with label and tokens.
- **Tooltip**: CSS-only hover tooltip showing segment label and token count.
- **Legend**: Shows all segments + remaining count.
- **ARIA**: `role="figure"` with descriptive `aria-label` including token counts.

## Style Fixes Needed

1. **Segment focus-visible** — Segments are clickable but have no tabindex or focus styles. They need `tabindex="0"` and focus ring.
2. **Tooltip accessibility** — CSS `::after` tooltip is not accessible to screen readers. Should use `aria-label` or a real tooltip element.
3. **Legend dot border** — Legend dots have no border, making them hard to see against dark backgrounds when using dark colors.
4. **Rounded variants** — Missing `:host([rounded])` support.
5. **Cache row border** — Uses `--cg-color-surface-container-background` for border-top, which blends with background. Should use `--cg-color-surface-container-border`.

## Interaction Fixes Needed

1. **Segment keyboard access** — Segments lack `tabindex`, `role="button"`, and keyboard event handlers.
2. **Accessible tooltips** — Replace CSS `::after` tooltips with `aria-label` on segments or use a proper tooltip component.
3. **Overflow handling** — When too many segments create very thin slices, consider grouping small segments into "Other".
4. **Warning threshold customization** — Warning (80%) and danger (95%) thresholds are hardcoded. Expose as properties.
5. **Animate on first render** — Bar segments could animate from 0 width on first render for visual appeal.
6. **Responsive legend** — Legend wraps but has no compact/collapsed mode for very narrow containers.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders segmented bar with correct widths | Unit |
| 2 | Legend shows all segments plus remaining | Unit |
| 3 | Token counts formatted with `toLocaleString` | Unit |
| 4 | Status class changes at 80% (warning) and 95% (danger) | Unit |
| 5 | Returns `nothing` when `total <= 0` | Unit |
| 6 | Segment click fires `ai-context-segment-click` | Unit |
| 7 | Default colors cycle through palette | Unit |
| 8 | Custom segment colors override defaults | Unit |
| 9 | Cache indicator shown when `cached > 0` | Unit |
| 10 | Cache indicator hidden when `cached` is 0 | Unit |
| 11 | Tooltip shows on segment hover | Visual |
| 12 | Header shows used/total with percentage | Unit |
| 13 | Remaining tokens calculated correctly | Unit |
| 14 | ARIA label includes token usage info | A11y |
| 15 | Focus ring appears on focusable elements | A11y |
