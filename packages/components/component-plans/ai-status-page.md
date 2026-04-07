# ai-status-page — Improvement Plan

## Current State

### CSS Audit
| Property | Status | Notes |
|---|---|---|
| Colors | PASS | All use `--cg-color-*` tokens with status semantics |
| Spacing | PASS | Uses `--cg-spacing-*` tokens |
| Font sizes | PASS | Uses `--cg-font-size-*` tokens |
| Font weights | PASS | Uses `--cg-font-weight-*` tokens |
| Border radii | PASS | Uses `--cg-border-radius-*` tokens |
| Motion | WARN | `.latency-bar-fill` transition `300ms ease` — no motion token |
| Letter-spacing | WARN | `.overall-badge { letter-spacing: 0.03em }` — raw value |
| Fixed widths | WARN | `.latency-bar-track { width: 40px }`, `.uptime { min-width: 52px }`, `.service-status-label { min-width: 90px }` — fixed pixel values |
| Border-radius | WARN | `.latency-bar-track { border-radius: 2px }` — raw pixel |

### States Audit
| State | Implemented | Notes |
|---|---|---|
| Default | YES | Full service list with overall status |
| Empty | NO | No empty state when `services=[]` |
| Hover | YES | Service item hover background |
| Focus | YES | Service item focus-visible outline |
| Active/Pressed | NO | No `:active` state on service items |
| Disabled | NO | No disabled state |
| Loading | NO | No loading/skeleton state |
| Operational | YES | Green status dot + badge |
| Degraded | YES | Yellow status |
| Down | YES | Red status |
| Maintenance | YES | Blue status |

### Interaction Audit
| Interaction | Status | Notes |
|---|---|---|
| Service click | YES | Fires `ai-status-service-click` via button element |
| Keyboard | YES | Native button keyboard handling |
| Service list ARIA | YES | `role="list"` with `role="listitem"` children |
| Region label | YES | `role="region" aria-label="System status"` |
| Service aria-label | YES | Includes name and status |

## Style Fixes Needed
1. Replace `.latency-bar-track { width: 40px }` with token-based width
2. Replace `.latency-bar-fill { border-radius: 2px }` with `var(--cg-border-radius-25, 2px)` or similar
3. Replace `letter-spacing: 0.03em` with token
4. Add motion tokens to `.latency-bar-fill` transition
5. Add `rounded` attribute variant support
6. Replace fixed `min-width` values with token-based sizing

## Interaction Fixes Needed
1. Add empty state when `services=[]` — "No services configured"
2. Add loading skeleton state
3. Add `:active` press scale on service items
4. Add auto-refresh indicator or timestamp for last check
5. Consider `aria-live="polite"` on overall status badge for dynamic updates
6. Button `role="listitem"` is invalid — buttons inside lists should use different pattern

## Test Spec
| # | Test Case | Type |
|---|---|---|
| 1 | Renders all services in list | Unit |
| 2 | Overall status is `down` when any service down | Unit |
| 3 | Overall status is `degraded` when any degraded (no down) | Unit |
| 4 | Overall status is `maintenance` when only maintenance | Unit |
| 5 | Overall status is `operational` when all operational | Unit |
| 6 | Service click fires `ai-status-service-click` | Event |
| 7 | Event detail contains service object | Event |
| 8 | Latency bar width scales to ms/1000 | Unit |
| 9 | Latency tier is `fast` for <200ms | Unit |
| 10 | Latency tier is `mid` for 200-800ms | Unit |
| 11 | Latency tier is `slow` for >800ms | Unit |
| 12 | Uptime percentage displayed correctly | Unit |
| 13 | Status label text matches status enum | Unit |
| 14 | Focus-visible outline on service items | A11y |
| 15 | Region and list ARIA roles correct | A11y |
| 16 | Service aria-label includes name and status | A11y |
| 17 | Reduced motion respected | A11y |
| 18 | Snapshot: mixed statuses | Visual |
| 19 | Snapshot: all operational | Visual |
