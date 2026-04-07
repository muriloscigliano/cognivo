# ai-test-runner — Improvement Plan

## Current State

### CSS Audit
| Property | Status | Notes |
|---|---|---|
| Colors | PASS | All use `--cg-*` tokens |
| Spacing | PASS | Uses `--cg-spacing-*` tokens |
| Font sizes | PASS | Uses `--cg-font-size-*` tokens |
| Font weights | PASS | Uses `--cg-font-weight-*` tokens |
| Border radii | PASS | Uses `--cg-border-radius-*` tokens |
| Motion | WARN | `.progress-pass/.progress-fail { transition: width 0.3s ease }` — raw values |
| Dot sizes | WARN | `.dot { width: 8px; height: 8px }` — raw pixels, should use `var(--cg-spacing-8, 8px)` |
| Border-radius | WARN | `.dot { border-radius: 50% }`, `.progress-bar { border-radius: 2px }` — raw px |
| Spinner | WARN | `.spinner { animation: spin 0.6s }` — raw duration |
| Host styles | WARN | `:host` applies background/border directly — no inner container wrapper |

### States Audit
| State | Implemented | Notes |
|---|---|---|
| Default | YES | Header, summary, progress bar, test list |
| Empty | NO | No empty state when `tests=[]` |
| Pass | YES | Green checkmark icon |
| Fail | YES | Red X icon |
| Running | YES | Yellow spinner |
| Pending | YES | Grey circle |
| Expanded | YES | Shows expected/actual details |
| Hover | YES | Test header hover background |
| Focus | YES | Focus-visible outlines |
| Active/Pressed | NO | No `:active` state on buttons |
| Disabled | NO | No disabled state |
| Loading | NO | No overall loading state |

### Interaction Audit
| Interaction | Status | Notes |
|---|---|---|
| Run All | YES | Fires `ai-test-run` with test names |
| Toggle details | YES | Click expands expected/actual |
| Test click event | YES | Fires `ai-test-click` with index and test |
| Summary bar | YES | Role="status" with counts |
| Progress bar | YES | Stacked pass/fail widths |
| Test list ARIA | YES | `role="list"` with `role="listitem"` |
| Keyboard | YES | Native button handling |
| aria-expanded | YES | On test headers |

## Style Fixes Needed
1. Replace `.progress-pass/.progress-fail { transition: width 0.3s ease }` with `var(--cg-motion-duration-slow, 300ms) var(--cg-motion-easing-default)`
2. Replace `.dot { width: 8px; height: 8px }` with `var(--cg-spacing-8, 8px)`
3. Replace `.progress-bar { border-radius: 2px }` with `var(--cg-border-radius-25, 2px)`
4. Replace `.spinner { animation: spin 0.6s }` with token-based duration
5. Wrap content in inner container instead of styling `:host` directly — better for rounded variant support
6. Add `rounded` attribute variant support
7. Add `:active` press scale on Run All button
8. Add `font-family: inherit` or ensure Run All button inherits

## Interaction Fixes Needed
1. Add empty state when `tests=[]` — "No tests defined"
2. Add overall loading/running state when all tests are being executed
3. Progress bar should have `role="progressbar"` with value attributes
4. Run All button should be disabled when tests are running
5. Consider adding individual re-run button per test
6. Test score percentage needs `aria-label` or description
7. Spinner should include `aria-label="Running"` (already has it — good)

## Test Spec
| # | Test Case | Type |
|---|---|---|
| 1 | Renders title in header | Unit |
| 2 | Summary shows correct pass/fail/running/pending counts | Unit |
| 3 | Progress bar widths match pass/fail percentages | Unit |
| 4 | Pass test shows checkmark icon | Unit |
| 5 | Fail test shows X icon | Unit |
| 6 | Running test shows spinner | Unit |
| 7 | Pending test shows circle icon | Unit |
| 8 | Test duration displayed | Unit |
| 9 | Test score displayed | Unit |
| 10 | Click test header expands details | Interaction |
| 11 | Expanded test shows expected/actual | Unit |
| 12 | Click expanded test collapses | Interaction |
| 13 | Run All fires `ai-test-run` | Event |
| 14 | Event detail includes test names | Event |
| 15 | Test click fires `ai-test-click` | Event |
| 16 | aria-expanded toggles correctly | A11y |
| 17 | Focus-visible on test headers and Run All | A11y |
| 18 | Summary has role="status" | A11y |
| 19 | Test list has proper ARIA roles | A11y |
| 20 | Snapshot: mixed pass/fail/running | Visual |
