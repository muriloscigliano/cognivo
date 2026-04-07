# ai-badge — Improvement Plan

## Current State

### CSS Audit
| Property | Status | Notes |
|---|---|---|
| Colors | PASS | All use `--cg-*` tokens with overlay and status semantics |
| Spacing | PASS | Uses `--cg-spacing-*` tokens |
| Font sizes | PASS | Uses `--cg-font-size-*` tokens |
| Font weights | PASS | Uses `--cg-font-weight-*` tokens |
| Border radii | PASS | Uses `--cg-border-radius-*` tokens |
| Motion | PASS | Uses `--cg-motion-*` tokens for transitions |
| Sparkline gap | WARN | `.sparkline { gap: 1px }` — raw pixel |
| Sparkline bar width | WARN | `.spark-bar { width: var(--cg-spacing-2, 2px) }` — PASS |
| Spark bar radius | WARN | `.spark-bar { border-radius: 1px }` — raw pixel |
| Tooltip arrow | WARN | `.tooltip::after { border: 5px solid transparent }` — raw pixel |
| Size sm spacing | WARN | `:host([size="sm"]) .badge { padding: var(--cg-spacing-2, 1px) }` — fallback 1px mismatches token |

### States Audit
| State | Implemented | Notes |
|---|---|---|
| Size sm | YES | Small inline badge |
| Size md | YES | Default pill badge |
| Size lg | YES | Card with bar and sparkline |
| High confidence | YES | Green color scheme |
| Medium confidence | YES | Yellow color scheme |
| Low confidence | YES | Red color scheme |
| With sparkline | YES | History bars when `history.length >= 2` |
| With tooltip | YES | Shows on hover/focus with explanation |
| Hover | YES | Brightness filter |
| Focus | YES | Focus-visible outline |
| Active/Pressed | NO | No `:active` state |
| Disabled | NO | No disabled state |
| Loading | NO | No loading state |

### Interaction Audit
| Interaction | Status | Notes |
|---|---|---|
| Click | YES | Fires `ai-badge-click` with score + level |
| Keyboard | YES | Enter/Space handler |
| ARIA status | YES | `role="status"` with descriptive label |
| Tooltip | YES | Shows on hover/focus, `role="tooltip"` |
| Sparkline | YES | `aria-hidden="true"` — decorative |
| Thresholds | YES | Configurable `highThreshold` and `lowThreshold` |

## Style Fixes Needed
1. Replace `.sparkline { gap: 1px }` with token (smallest available) or CSS custom property
2. Replace `.spark-bar { border-radius: 1px }` with `var(--cg-border-radius-25, 2px)` or smallest token
3. Replace `.tooltip::after { border: 5px }` with token-based arrow size
4. Fix `:host([size="sm"]) .badge { padding: var(--cg-spacing-2, 1px) }` — fallback should be `2px` to match token
5. Fix `:host([size="sm"]) .badge { gap: var(--cg-spacing-2, 3px) }` — fallback `3px` mismatches token name
6. Add `:active` press state
7. Tooltip positioning may overflow viewport — add overflow detection

## Interaction Fixes Needed
1. Add disabled state (greyed out, no click/tooltip)
2. Tooltip should use `id` and `aria-describedby` instead of nested element
3. Tooltip visibility controlled by CSS hover/focus — should also work with `aria-describedby` for screen readers
4. `_showTooltip` state property exists but is unused — tooltip is CSS-only; remove unused state or implement JS tooltip
5. Sparkline colors use inline styles from `_getSparkColor()` — acceptable but harder to override
6. Consider adding transition animation on score change
7. Add `aria-valuemin="0" aria-valuemax="1" aria-valuenow` for score as a meter alternative

## Test Spec
| # | Test Case | Type |
|---|---|---|
| 1 | Renders md size by default | Unit |
| 2 | Size sm renders small badge | Unit |
| 3 | Size lg renders card with bar | Unit |
| 4 | Score >= highThreshold shows high level | Unit |
| 5 | Score >= lowThreshold shows medium level | Unit |
| 6 | Score < lowThreshold shows low level | Unit |
| 7 | Custom thresholds change level boundaries | Unit |
| 8 | High level has green color scheme | Unit |
| 9 | Medium level has yellow color scheme | Unit |
| 10 | Low level has red color scheme | Unit |
| 11 | Percentage displayed when showPercentage=true | Unit |
| 12 | Level name displayed when showPercentage=false | Unit |
| 13 | Sparkline renders when history >= 2 items | Unit |
| 14 | Sparkline hidden when history < 2 | Unit |
| 15 | Sparkline shows last 12 items | Unit |
| 16 | Tooltip shows on hover | Interaction |
| 17 | Tooltip shows explanation when provided | Unit |
| 18 | Click fires `ai-badge-click` | Event |
| 19 | Event detail includes score and level | Event |
| 20 | Keyboard Enter fires click | Keyboard |
| 21 | Keyboard Space fires click | Keyboard |
| 22 | Focus-visible outline | A11y |
| 23 | role="status" with aria-label | A11y |
| 24 | Tooltip has role="tooltip" | A11y |
| 25 | Snapshot: each size at each level | Visual |
