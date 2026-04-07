# ai-cost-dashboard — Improvement Plan

## Current State

### CSS Audit
| Property | Status | Notes |
|---|---|---|
| Colors | PASS | All use `--cg-color-*` / `--cg-brand-*` tokens |
| Spacing | PASS | All use `--cg-spacing-*` tokens |
| Font sizes | PASS | All use `--cg-font-size-*` tokens |
| Font weights | PASS | All use `--cg-font-weight-*` tokens |
| Border radii | PASS | All use `--cg-border-radius-*` tokens |
| Motion | PASS | Uses `--cg-motion-*` tokens, `reducedMotion` imported |
| Transitions | WARN | `.model-row:hover` transition uses `ease` — should use motion token easing |
| Magic numbers | WARN | `.model-name { width: 100px }` and `.model-cost { width: 60px }` are fixed pixel widths |

### States Audit
| State | Implemented | Notes |
|---|---|---|
| Default | YES | Full render with entries |
| Empty | YES | "No cost data available" message |
| Hover | YES | Model rows `.model-row:hover`, trend bars `.trend-bar:hover` |
| Focus | YES | `.model-row:focus-visible` with accent outline |
| Active/Pressed | NO | No `:active` state on model rows |
| Disabled | NO | No disabled state supported |
| Loading | NO | No loading/skeleton state |
| Error | NO | No error state for invalid entries |

### Interaction Audit
| Interaction | Status | Notes |
|---|---|---|
| Click model row | YES | Fires `ai-cost-entry-click` with model + cost |
| Keyboard Enter/Space | YES | On model rows |
| Budget progressbar | YES | Has `role="progressbar"` with aria-value attributes |
| Region label | YES | `role="region" aria-label="AI cost dashboard"` |
| Trend chart | PARTIAL | `role="img"` with label, but individual bars only have `title` — no keyboard access |

## Style Fixes Needed
1. Replace `.model-name { width: 100px }` with `min-width` token or `--cg-spacing-*` equivalent
2. Replace `.model-cost { width: 60px }` with token-based sizing
3. Add `--cg-motion-easing-*` token to `.model-row` transition instead of raw `ease`
4. Add `:active` press scale on `.model-row` using `--cg-interaction-press-scale`
5. Add `rounded` attribute variant support for border-radius customization
6. Add `font-family: inherit` to ensure consistency

## Interaction Fixes Needed
1. Add loading skeleton state with `shimmerKeyframes`
2. Add disabled host state (`:host([disabled])`) that greys out and prevents interaction
3. Add keyboard navigation for trend bars (arrow keys to navigate, show tooltip)
4. Trend bar tooltips should be accessible — use `aria-label` instead of only `title`
5. Add `aria-roledescription` to trend chart for better screen reader context

## Test Spec
| # | Test Case | Type |
|---|---|---|
| 1 | Renders empty state when `entries=[]` | Unit |
| 2 | Displays correct total cost from entries | Unit |
| 3 | Displays correct total token count | Unit |
| 4 | Shows correct number of models in summary card | Unit |
| 5 | Budget bar renders when `budget > 0` | Unit |
| 6 | Budget bar hidden when `budget = 0` | Unit |
| 7 | Budget fill gets `warn` class at >70% | Unit |
| 8 | Budget fill gets `danger` class at >90% | Unit |
| 9 | Model breakdown sorted by cost descending | Unit |
| 10 | Model row click fires `ai-cost-entry-click` | Event |
| 11 | Model row Enter key fires event | Keyboard |
| 12 | Model row Space key fires event | Keyboard |
| 13 | Trend chart renders when >1 daily entry | Unit |
| 14 | Trend chart hidden when <=1 daily entry | Unit |
| 15 | Period text shown when `period` set | Unit |
| 16 | Focus-visible outline appears on model rows | A11y |
| 17 | Budget bar has correct ARIA progressbar attributes | A11y |
| 18 | Region has proper aria-label | A11y |
| 19 | Reduced motion disables animation | A11y |
| 20 | Snapshot: default with 3 models, budget, trend | Visual |
