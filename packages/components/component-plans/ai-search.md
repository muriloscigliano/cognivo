# ai-search — Improvement Plan

## Current State

### CSS Audit
| Property | Status | Notes |
|---|---|---|
| Colors | PASS | All use `--cg-*` tokens |
| Spacing | PASS | Uses `--cg-spacing-*` tokens |
| Font sizes | PASS | Uses `--cg-font-size-*` tokens |
| Font weights | PASS | Uses `--cg-font-weight-*` tokens |
| Border radii | PASS | Uses `--cg-border-radius-*` tokens with rounded variants |
| Motion | PASS | Uses `--cg-motion-*` tokens for transitions |
| Z-index | WARN | `.dropdown { z-index: 100 }` — raw value, should use token |
| Max-height | WARN | `.dropdown { max-height: 360px }` — magic number |
| Press scale | PASS | Uses `--cg-interaction-press-scale` on result items |
| Focus | WARN | Global `:focus-visible` override uses box-shadow — may conflict with specific focus styles |

### States Audit
| State | Implemented | Notes |
|---|---|---|
| Default | YES | Input row with search icon |
| Focused | YES | Input row border color changes on focus-within |
| Open dropdown | YES | Shows results, suggestions, filters, recents |
| Closed dropdown | YES | Hidden when `_open = false` |
| With query | YES | Shows clear button |
| Without query | YES | Shows Cmd+K shortcut hint |
| Highlighted result | YES | Via arrow key navigation |
| Active filter | YES | Accent color on active filter tags |
| Hover | YES | On results, filter tags, recent items |
| Active/Pressed | YES | Press scale on result items |
| Disabled | NO | No disabled state |
| Loading | NO | No loading indicator for search results |
| No results | NO | No explicit "no results found" message |

### Interaction Audit
| Interaction | Status | Notes |
|---|---|---|
| Type to search | YES | Fires `ai-search-query` on input |
| Arrow key navigation | YES | Up/down through results and suggestions |
| Enter to select | YES | Selects highlighted item |
| Escape to close | YES | Closes dropdown |
| Filter toggle | YES | Fires `ai-search-filter` |
| Result select | YES | Fires `ai-search-select` |
| Recent search | YES | Sets query and fires search event |
| Clear button | YES | Clears query and closes |
| Combobox ARIA | PARTIAL | Has `role="combobox"` and `aria-expanded` but no `aria-activedescendant` |

## Style Fixes Needed
1. Replace `z-index: 100` with `var(--cg-z-index-dropdown, 100)` or dedicated token
2. Replace `max-height: 360px` with a CSS custom property for configurability
3. Remove global `:focus-visible` rule that may override component-specific focus styles
4. Add `font-family: inherit` to filter tags and clear button for consistency
5. Recent delete button needs focus-visible styles

## Interaction Fixes Needed
1. Add `aria-activedescendant` to input pointing to currently highlighted result
2. Add `id` attributes to result items for activedescendant reference
3. Add loading state with spinner or skeleton for async search
4. Add "No results found" empty state message
5. Add disabled state (`:host([disabled])`)
6. Recent delete button `opacity: 0` makes it invisible but still in tab order — needs `tabindex="-1"` when hidden or use visibility
7. `_handleBlur` uses `setTimeout(200ms)` — fragile; consider `focusout` with `relatedTarget` check
8. Dropdown should have `aria-label` and result items need `aria-selected` based on highlight

## Test Spec
| # | Test Case | Type |
|---|---|---|
| 1 | Renders input with placeholder | Unit |
| 2 | Shows Cmd+K shortcut when no query | Unit |
| 3 | Shows clear button when query present | Unit |
| 4 | Typing fires `ai-search-query` | Event |
| 5 | Focus opens dropdown | Interaction |
| 6 | Escape closes dropdown | Keyboard |
| 7 | Arrow down moves highlight | Keyboard |
| 8 | Arrow up moves highlight | Keyboard |
| 9 | Enter selects highlighted result | Keyboard |
| 10 | Result click fires `ai-search-select` | Event |
| 11 | Filter toggle adds/removes from active set | Interaction |
| 12 | Active filter has accent styling | Unit |
| 13 | Filter change fires `ai-search-filter` | Event |
| 14 | Suggestions shown in dropdown | Unit |
| 15 | Recent searches shown when no query | Unit |
| 16 | Clear button resets query | Interaction |
| 17 | Combobox ARIA attributes correct | A11y |
| 18 | Dropdown has listbox role | A11y |
| 19 | Focus-visible on input row | A11y |
| 20 | Rounded variants apply correct border-radius | Unit |
| 21 | Snapshot: open with results and filters | Visual |
