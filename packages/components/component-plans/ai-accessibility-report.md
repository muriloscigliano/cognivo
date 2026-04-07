# ai-accessibility-report — Improvement Plan

## Current State

### CSS Audit
| Property | Status | Notes |
|---|---|---|
| Colors | PASS | All use `--cg-*` tokens with severity and level semantics |
| Spacing | PASS | Uses `--cg-spacing-*` tokens |
| Font sizes | PASS | Uses `--cg-font-size-*` tokens |
| Font weights | PASS | Uses `--cg-font-weight-*` tokens |
| Border radii | PASS | Uses `--cg-border-radius-*` tokens |
| Motion | WARN | `.score-fg { transition: stroke-dashoffset 0.5s ease }` — raw values |
| Dot sizes | WARN | `.sev-dot { width: 8px; height: 8px }` — raw pixels |
| SVG dimensions | WARN | `.score-circle { width: 64px; height: 64px }` — raw pixels |
| Stroke-width | WARN | `.score-bg/.score-fg { stroke-width: 5 }` — raw value |
| Host styles | WARN | Styling applied directly to `:host` — no inner container |

### States Audit
| State | Implemented | Notes |
|---|---|---|
| Default | YES | Score circle + breakdown + issue list |
| Empty | YES | "No accessibility issues found." |
| Issue expanded | YES | Shows description and element |
| Severity: error | YES | Red icon and dot |
| Severity: warning | YES | Yellow icon and dot |
| Severity: info | YES | Blue icon and dot |
| WCAG levels | YES | A/AA/AAA badges with distinct colors |
| Hover | YES | Issue header hover background |
| Focus | YES | Focus-visible outlines |
| Active/Pressed | NO | No `:active` state |
| Disabled | NO | No disabled state |
| Loading | NO | No loading/scanning state |

### Interaction Audit
| Interaction | Status | Notes |
|---|---|---|
| Issue click | YES | Fires `ai-a11y-issue-click`, toggles expansion |
| Score circle | YES | `role="meter"` with value attributes |
| Issue list | YES | `role="list"` with `role="listitem"` |
| Keyboard | YES | Native button handling on issue headers |
| aria-expanded | YES | On issue headers |
| Inline style colors | WARN | Score text uses inline `style="color:${scoreColor}"` — not token-class based |

## Style Fixes Needed
1. Replace `.score-fg { transition: stroke-dashoffset 0.5s ease }` with motion tokens
2. Replace `.sev-dot` sizes with `var(--cg-spacing-8, 8px)`
3. Replace SVG `.score-circle` sizes with CSS custom property for configurability
4. Replace `stroke-width: 5` with a token or CSS custom property
5. Add `:active` press state on issue headers
6. Add `rounded` attribute variant support
7. Consider wrapping content in inner container instead of styling `:host`
8. Replace inline `style="color:"` on score text with CSS classes based on score range

## Interaction Fixes Needed
1. Add loading/scanning state with animation
2. Add `aria-controls` on issue headers pointing to details sections
3. Score color is computed in `_getScoreColor()` returning raw `var()` strings — acceptable but inline styles are harder to override
4. Add filter controls to filter by severity level
5. Add "Fix All" or "Export" action buttons
6. Consider adding progress toward WCAG compliance per level
7. Issue element code display should have copy button

## Test Spec
| # | Test Case | Type |
|---|---|---|
| 1 | Renders score circle with correct percentage | Unit |
| 2 | Score color is green for >=90 | Unit |
| 3 | Score color is yellow for 70-89 | Unit |
| 4 | Score color is orange for 50-69 | Unit |
| 5 | Score color is red for <50 | Unit |
| 6 | SVG stroke-dashoffset matches score | Unit |
| 7 | Breakdown shows correct error/warning/info counts | Unit |
| 8 | Empty state shown when `issues=[]` | Unit |
| 9 | All issues rendered in list | Unit |
| 10 | Issue click expands description | Interaction |
| 11 | Issue click fires `ai-a11y-issue-click` | Event |
| 12 | Event detail includes issue and index | Event |
| 13 | Re-click collapses issue | Interaction |
| 14 | WCAG level badge shows correct level | Unit |
| 15 | Severity icon matches severity | Unit |
| 16 | Element code shown when present | Unit |
| 17 | Score circle has role="meter" | A11y |
| 18 | aria-expanded on issue headers | A11y |
| 19 | Focus-visible on issue headers | A11y |
| 20 | Title rendered as h3 | Unit |
| 21 | Snapshot: report with mixed severities | Visual |
