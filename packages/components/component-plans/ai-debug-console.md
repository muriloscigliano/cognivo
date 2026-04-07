# ai-debug-console — Improvement Plan

## Current State

### CSS Audit
| Property | Status | Notes |
|---|---|---|
| Colors | PASS | All use `--cg-*` tokens with type-colored dots and labels |
| Spacing | PASS | Uses `--cg-spacing-*` tokens |
| Font sizes | PASS | Uses `--cg-font-size-*` tokens |
| Font weights | PASS | Uses `--cg-font-weight-*` tokens |
| Border radii | PASS | Uses `--cg-border-radius-*` tokens with rounded variants |
| Motion | WARN | `.chevron { transition: transform 0.15s ease }` — raw values |
| Dot sizes | WARN | `.type-dot { width: 8px; height: 8px }` — raw pixels |
| Badge size | WARN | `.badge { min-width: 20px; height: 20px }` — raw pixels |
| Max-height | WARN | `.panel { max-height: 400px }`, `.entry-content { max-height: 200px }` — magic numbers |
| Host styles | WARN | Styling applied directly to `:host` — no inner container |

### States Audit
| State | Implemented | Notes |
|---|---|---|
| Open | YES | Panel visible with entries |
| Closed | YES | Only toggle bar visible |
| Empty | YES | "No debug entries." message |
| Entry types | YES | request/response/error/info with distinct colors |
| Entry expanded | YES | Shows formatted JSON content |
| Hover | YES | Toggle bar and entry headers |
| Focus | YES | Focus-visible on toggle bar, clear button, entry headers |
| Active/Pressed | NO | No `:active` state |
| Disabled | NO | No disabled state |
| Loading | NO | No loading state |

### Interaction Audit
| Interaction | Status | Notes |
|---|---|---|
| Toggle open/close | YES | Fires `ai-debug-toggle` |
| Clear entries | YES | Fires `ai-debug-clear` with stopPropagation |
| Expand entry | YES | Toggles JSON content display |
| JSON formatting | YES | Pretty-prints valid JSON |
| Max entries | YES | Slices to `maxEntries` limit |
| Keyboard toggle | YES | Enter/Space on toggle bar |
| ARIA expanded | YES | On toggle bar and entry headers |
| Log role | YES | `role="log"` on panel |

## Style Fixes Needed
1. Replace `.chevron { transition: transform 0.15s ease }` with `var(--cg-motion-duration-fast, 150ms) var(--cg-motion-easing-default)`
2. Replace `.type-dot { width: 8px; height: 8px }` with `var(--cg-spacing-8, 8px)`
3. Replace `.badge` fixed sizes with token-based values
4. Replace `.panel { max-height: 400px }` with CSS custom property for configurability
5. Replace `.entry-content { max-height: 200px }` similarly
6. Add `:active` press state on toggle bar
7. `.type-label { min-width: 56px }` — consider using token or auto-width

## Interaction Fixes Needed
1. Clear button inside toggle bar creates nested interactive elements — should be outside or use event handling carefully (already has stopPropagation — acceptable)
2. Add keyboard shortcut hint (e.g., Ctrl+` to toggle)
3. Entry content should have copy-to-clipboard button
4. Add search/filter within entries
5. Add timestamp auto-scrolling (scroll to bottom on new entries)
6. Toggle bar `role="button"` is a `<div>` — should be a `<button>` element for native keyboard handling
7. Verify `_visibleEntries` shows most recent (uses `slice(-maxEntries)` — correct)

## Test Spec
| # | Test Case | Type |
|---|---|---|
| 1 | Renders closed by default when `open=false` | Unit |
| 2 | Renders open when `open=true` | Unit |
| 3 | Toggle click opens/closes panel | Interaction |
| 4 | Toggle fires `ai-debug-toggle` with open state | Event |
| 5 | Toggle keyboard Enter works | Keyboard |
| 6 | Toggle keyboard Space works | Keyboard |
| 7 | Entry count badge shows correct number | Unit |
| 8 | Clear button fires `ai-debug-clear` | Event |
| 9 | Clear click does not toggle panel | Event |
| 10 | Entry types show correct dot/label colors | Unit |
| 11 | Entry click expands content | Interaction |
| 12 | JSON content is pretty-printed | Unit |
| 13 | Non-JSON content shown as-is | Unit |
| 14 | Max entries limits visible entries | Unit |
| 15 | Entry timestamp displayed | Unit |
| 16 | Entry duration displayed when present | Unit |
| 17 | Empty state shown when no entries | Unit |
| 18 | aria-expanded on toggle and entries | A11y |
| 19 | Panel has role="log" | A11y |
| 20 | Focus-visible on all interactive elements | A11y |
| 21 | Rounded variants apply | Unit |
| 22 | Snapshot: open with mixed entry types | Visual |
