# ai-usage-meter — Improvement Plan

## Current State

### CSS Audit
| Property | Status | Notes |
|---|---|---|
| Colors | PASS | All use `--cg-*` tokens |
| Spacing | PASS | All use `--cg-spacing-*` tokens |
| Font sizes | WARN | `.pct-label { font-size: 10px }` — raw pixel, should use `--cg-font-size-2xs` |
| Font weights | PASS | Uses `--cg-font-weight-*` tokens |
| Border radii | PASS | Uses `--cg-border-radius-*` tokens |
| Motion | WARN | `.ring-fill` transition uses raw `500ms ease` and `300ms ease` — no motion tokens |
| Letter-spacing | WARN | `.pct-label { letter-spacing: 0.5px }` — raw value, should use token |
| Transitions | WARN | `.upgrade-btn` transition uses raw duration |

### States Audit
| State | Implemented | Notes |
|---|---|---|
| Default | YES | Ring + info + optional upgrade |
| Empty/Zero | YES | Shows 0% when used=0 |
| Normal tier | YES | <80% — green accent |
| Warning tier | YES | >=80% — yellow |
| Danger tier | YES | >=95% — red |
| Hover | YES | Upgrade button hover |
| Focus | YES | Upgrade button focus-visible |
| Active/Pressed | NO | No `:active` state on upgrade button |
| Disabled | NO | No disabled state |
| Loading | NO | No skeleton/loading state |

### Interaction Audit
| Interaction | Status | Notes |
|---|---|---|
| Upgrade click | YES | Fires `ai-usage-upgrade` |
| ARIA meter role | YES | `role="meter"` with valuemin/max/now |
| SVG hidden | YES | `aria-hidden="true"` on SVG |
| Reset date | YES | Conditionally shown |

## Style Fixes Needed
1. Replace `.pct-label { font-size: 10px }` with `var(--cg-font-size-2xs, 10px)`
2. Replace `.pct-label { letter-spacing: 0.5px }` with `var(--cg-letter-spacing-wide, 0.05em)` or similar token
3. Add motion tokens to `.ring-fill` transition: use `--cg-motion-duration-slow` and `--cg-motion-easing-default`
4. Add `:active` press scale to `.upgrade-btn`
5. Add `rounded` attribute variant support
6. Add `font-family: inherit` to `.upgrade-btn` (already has it — good)
7. SVG circle dimensions (100px) are hardcoded — consider making responsive via CSS custom property

## Interaction Fixes Needed
1. Add loading/skeleton state for when data is being fetched
2. Add disabled state that prevents upgrade button interaction
3. Upgrade button should have `aria-label` describing the action ("Upgrade plan — 85% of quota used")
4. Add keyboard Enter/Space handling — button already handles this natively
5. Consider adding `aria-live="polite"` to the meter so screen readers announce tier changes

## Test Spec
| # | Test Case | Type |
|---|---|---|
| 1 | Renders 0% when used=0, limit=100 | Unit |
| 2 | Calculates correct percentage | Unit |
| 3 | Caps percentage at 100 when used > limit | Unit |
| 4 | Ring fill class is `normal` below 80% | Unit |
| 5 | Ring fill class is `warning` at 80-94% | Unit |
| 6 | Ring fill class is `danger` at 95%+ | Unit |
| 7 | Upgrade button appears at >=80% | Unit |
| 8 | Upgrade button hidden below 80% | Unit |
| 9 | Upgrade click fires `ai-usage-upgrade` | Event |
| 10 | Reset date shown when `resetDate` set | Unit |
| 11 | Reset date hidden when `resetDate` empty | Unit |
| 12 | Label and unit text displayed correctly | Unit |
| 13 | ARIA meter attributes correct | A11y |
| 14 | SVG is aria-hidden | A11y |
| 15 | Focus-visible outline on upgrade button | A11y |
| 16 | Reduced motion respected | A11y |
| 17 | Snapshot: normal tier | Visual |
| 18 | Snapshot: warning tier | Visual |
| 19 | Snapshot: danger tier with upgrade button | Visual |
