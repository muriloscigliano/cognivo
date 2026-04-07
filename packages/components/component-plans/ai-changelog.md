# ai-changelog — Improvement Plan

## Current State

### CSS Audit
| Property | Status | Notes |
|---|---|---|
| Colors | PASS | All use `--cg-*` tokens including overlay tokens for type badges |
| Spacing | PASS | Uses `--cg-spacing-*` tokens |
| Font sizes | PASS | Uses `--cg-font-size-*` tokens |
| Font weights | PASS | Uses `--cg-font-weight-*` tokens |
| Border radii | PASS | Uses `--cg-border-radius-*` tokens |
| Motion | PASS | Uses `--cg-motion-*` tokens |
| Letter-spacing | WARN | `.type-badge { letter-spacing: 0.04em }` — raw value |
| Max-height | WARN | `.changes-preview { max-height: 40px }` and `.expanded { max-height: 500px }` — magic numbers |

### States Audit
| State | Implemented | Notes |
|---|---|---|
| Default | YES | Timeline with entry cards |
| Empty | YES | "No changelog entries" with role="status" |
| Hover | YES | Entry card hover border color change |
| Focus | YES | Entry card focus-visible outline |
| Active/Pressed | NO | No `:active` state |
| Expanded | YES | Toggle expand/collapse with `_expandedSet` |
| Disabled | NO | No disabled state |
| Loading | NO | No skeleton/loading state |
| Type variants | YES | model/prompt/config/data with distinct colors |

### Interaction Audit
| Interaction | Status | Notes |
|---|---|---|
| Entry click | YES | Fires `ai-changelog-entry-click` |
| Rollback click | YES | Fires `ai-changelog-rollback` with stopPropagation |
| Expand toggle | YES | With aria-expanded attribute |
| Keyboard | YES | Enter/Space on entry cards |
| Timeline ARIA | YES | `role="list"` with `role="listitem"` |
| Region label | YES | `role="region" aria-label="Changelog"` |

## Style Fixes Needed
1. Replace `letter-spacing: 0.04em` with `var(--cg-letter-spacing-wide, 0.05em)` or dedicated token
2. Replace `max-height: 40px` and `max-height: 500px` with token-based values or CSS custom properties
3. Add `:active` press scale on entry cards and rollback buttons
4. Add `rounded` attribute variant support
5. Timeline line `::before` could use a token for width instead of relying on spacing-2

## Interaction Fixes Needed
1. Add loading skeleton state
2. Add confirmation dialog or `aria-label` warning on rollback button ("Rollback to v2.1 — this may affect production")
3. Expand toggle button has redundant `tabindex="0"` (buttons are focusable by default)
4. Consider adding `aria-controls` on expand toggle pointing to the changes-preview section
5. Rollback button inside a clickable card creates nested interactive elements — restructure or ensure proper event handling

## Test Spec
| # | Test Case | Type |
|---|---|---|
| 1 | Renders empty state when `entries=[]` | Unit |
| 2 | Renders correct number of timeline entries | Unit |
| 3 | Each entry shows version, type badge, date | Unit |
| 4 | Type badge has correct CSS class per type | Unit |
| 5 | Timeline dot has correct color per type | Unit |
| 6 | Author shown when present, hidden when absent | Unit |
| 7 | Entry click fires `ai-changelog-entry-click` | Event |
| 8 | Rollback click fires `ai-changelog-rollback` | Event |
| 9 | Rollback click does not trigger entry click | Event |
| 10 | Expand toggle reveals full changes text | Interaction |
| 11 | Expand toggle sets aria-expanded to true | A11y |
| 12 | Collapse toggle hides changes text | Interaction |
| 13 | Keyboard Enter on entry card fires event | Keyboard |
| 14 | Multiple entries can be expanded simultaneously | Interaction |
| 15 | Focus-visible outline on entry cards | A11y |
| 16 | Focus-visible outline on rollback buttons | A11y |
| 17 | Timeline list has proper ARIA roles | A11y |
| 18 | Reduced motion respected | A11y |
| 19 | Snapshot: multiple entries with mixed types | Visual |
| 20 | Snapshot: expanded entry | Visual |
