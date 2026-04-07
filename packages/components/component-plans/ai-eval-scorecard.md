# ai-eval-scorecard — Improvement Plan

## Current State

### CSS Audit
| Property | Status | Notes |
|---|---|---|
| Colors | PASS | All use `--cg-*` tokens with status semantics |
| Spacing | PASS | Uses `--cg-spacing-*` tokens |
| Font sizes | WARN | `.score-value { font-size: var(--cg-font-size-sm, 14px) }` — uses `--cg-font-size-sm` which maps to 14px but JSDoc says 13px |
| Font weights | WARN | `.score-value { font-weight: 700 }`, `.header-title { font-weight: 700 }` — raw values |
| Border radii | PASS | Uses `--cg-border-radius-*` tokens with rounded variants |
| Motion | PASS | Uses `--cg-motion-*` tokens for bar transitions |
| Letter-spacing | WARN | `.header-title { letter-spacing: 0.05em }` — raw value |
| Fixed widths | WARN | `.score-label { width: 100px }`, `.score-value { width: 40px }`, `.score-delta { width: 40px }` — fixed pixels |
| Explanation padding | WARN | `.explanation { padding-left: 112px }` — magic number (100px label + 12px gap) |

### States Audit
| State | Implemented | Notes |
|---|---|---|
| Default | YES | Card with score bars and optional grade |
| Empty | YES | "No evaluation data" message |
| Expanded metric | YES | Click to show explanation |
| Hover | YES | Score row hover background |
| Focus | YES | Focus-visible box-shadow ring |
| Active/Pressed | NO | No `:active` state |
| Disabled | NO | No disabled state |
| Loading | NO | No skeleton state |
| Grade A-F | YES | Color-coded badge per letter grade |
| Comparison deltas | YES | Green up / red down indicators |

### Interaction Audit
| Interaction | Status | Notes |
|---|---|---|
| Metric click | YES | Fires `ai-eval-metric-click`, toggles explanation |
| Keyboard | PARTIAL | `tabindex="0"` and `role="button"` but only Enter handled, Space missing |
| ARIA figure | YES | `role="figure"` with label |
| Score bars | YES | Animated width transitions |
| Inline style colors | WARN | `_getBarColor` and `_getValueColor` return inline CSS — not token-safe |

## Style Fixes Needed
1. Replace `font-weight: 700` with `var(--cg-font-weight-bold, 700)` throughout
2. Replace `letter-spacing: 0.05em` with `var(--cg-letter-spacing-wide, 0.05em)`
3. Replace fixed `.score-label { width: 100px }` with `min-width` using token
4. Replace `.explanation { padding-left: 112px }` with `calc()` referencing the same layout tokens
5. `_getBarColor` returns raw CSS strings with `var()` — acceptable but consider using CSS classes instead for better token compliance
6. Add `:active` press scale on score rows

## Interaction Fixes Needed
1. Add Space key handler alongside Enter on score rows
2. Add loading/skeleton state
3. Add `aria-expanded` on score rows to indicate explanation visibility
4. Add `aria-controls` linking score row to explanation panel
5. Grade badge class matching is brittle — `this.grade` applied directly as class, needs sanitization for grades like "B+"
6. Consider `role="button"` on score rows is semantically weak — use actual `<button>` elements
7. Add disabled state

## Test Spec
| # | Test Case | Type |
|---|---|---|
| 1 | Renders empty state when `scores=[]` | Unit |
| 2 | Renders all score rows | Unit |
| 3 | Score bar width proportional to value/max | Unit |
| 4 | Grade badge shown when `grade` set | Unit |
| 5 | Grade badge hidden when `grade` empty | Unit |
| 6 | Grade class matches first letter (A/B/C/D/F) | Unit |
| 7 | Bar color green for >=80% | Unit |
| 8 | Bar color yellow for 60-80% | Unit |
| 9 | Bar color orange for 40-60% | Unit |
| 10 | Bar color red for <40% | Unit |
| 11 | Comparison delta shown with correct sign | Unit |
| 12 | Delta up class for positive values | Unit |
| 13 | Delta down class for negative values | Unit |
| 14 | Metric click expands explanation | Interaction |
| 15 | Metric click fires `ai-eval-metric-click` | Event |
| 16 | Re-click collapses explanation | Interaction |
| 17 | Custom max value scales bar correctly | Unit |
| 18 | Focus-visible on score rows | A11y |
| 19 | Rounded variants apply | Unit |
| 20 | Snapshot: card with mixed scores and grade | Visual |
