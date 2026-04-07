# ai-token-tracker — Improvement Plan

## Current State

### CSS Audit
| Property | Status | Notes |
|---|---|---|
| Colors | PASS | All use `--cg-*` tokens |
| Spacing | PASS | Uses `--cg-spacing-*` tokens throughout |
| Font sizes | PASS | Uses `--cg-font-size-*` tokens |
| Font weights | PASS | Uses `--cg-font-weight-*` tokens |
| Border radii | PASS | Uses `--cg-border-radius-*` tokens |
| Motion | WARN | `.compact { transition: all 150ms }` — raw values, no motion token |
| Letter-spacing | WARN | `.detail-title { letter-spacing: 0.05em }` — raw value |
| Focus | PASS | `:focus-visible` uses double-ring box-shadow pattern |

### States Audit
| State | Implemented | Notes |
|---|---|---|
| Compact mode | YES | Inline badge with tokens, cost, latency |
| Detailed mode | YES | Card with metrics grid |
| Hover | YES | Compact border color change |
| Focus | YES | Box-shadow focus ring |
| Active/Pressed | NO | No `:active` state |
| Disabled | NO | No disabled state |
| Loading | NO | No skeleton state |
| Budget section | YES | Shows when `budget > 0` |
| Latency tiers | YES | fast/medium/slow color coding |
| Budget tiers | YES | ok/warning/danger color coding |

### Interaction Audit
| Interaction | Status | Notes |
|---|---|---|
| Compact click | YES | Fires `ai-token-click` |
| ARIA status | YES | `role="status" aria-live="polite"` on both modes |
| Keyboard | PARTIAL | Compact div is not a button — needs tabindex and keyboard handler |
| Model badge | YES | Conditionally rendered |

## Style Fixes Needed
1. Replace `.compact { transition: all 150ms }` with token-based transition
2. Replace `letter-spacing: 0.05em` with `var(--cg-letter-spacing-wide, 0.05em)`
3. Add `:active` press scale to compact mode
4. Add `rounded` attribute variant support
5. Budget border-top uses `--cg-color-surface-container-background` — should use `--cg-color-surface-container-border`

## Interaction Fixes Needed
1. Compact mode div needs `tabindex="0"` and `role="button"` for keyboard access
2. Add Enter/Space keyboard handler on compact div
3. Add loading skeleton state for both modes
4. Add disabled state
5. Consider adding `aria-label` on budget progressbar region

## Test Spec
| # | Test Case | Type |
|---|---|---|
| 1 | Renders compact mode by default | Unit |
| 2 | Renders detailed mode when `mode="detailed"` | Unit |
| 3 | Compact shows total token count | Unit |
| 4 | Compact shows formatted cost | Unit |
| 5 | Compact shows latency in ms for <1000 | Unit |
| 6 | Compact shows latency in seconds for >=1000 | Unit |
| 7 | Detailed shows input/output tokens separately | Unit |
| 8 | Latency bar class is `fast` for <1000ms | Unit |
| 9 | Latency bar class is `medium` for 1000-3000ms | Unit |
| 10 | Latency bar class is `slow` for >3000ms | Unit |
| 11 | Model badge shown when `model` is set | Unit |
| 12 | Budget section shown when `budget > 0` | Unit |
| 13 | Budget class is `ok` below 60% | Unit |
| 14 | Budget class is `warning` at 60-85% | Unit |
| 15 | Budget class is `danger` above 85% | Unit |
| 16 | Compact click fires `ai-token-click` | Event |
| 17 | Event detail contains all metrics | Event |
| 18 | ARIA status role on both modes | A11y |
| 19 | Focus-visible ring visible | A11y |
| 20 | Snapshot: compact mode | Visual |
| 21 | Snapshot: detailed mode with budget | Visual |
