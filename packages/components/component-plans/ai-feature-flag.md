# ai-feature-flag — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Excellent coverage — spacing, colors, typography, border-radius, motion all tokenized.
- **Magic numbers**: None found.
- **Toggle switch**: Custom CSS toggle with checked/unchecked states, smooth transition.
- **Rounded variants**: Supported on `:host`.

### States Audit

| State | Supported | Notes |
|---|---|---|
| Default | Yes | Grouped list with enabled/disabled sections |
| Hover | Yes | Flag item border-color change |
| Focus-visible | Yes | Flag item and toggle input both have focus rings |
| Toggle on/off | Yes | Toggle switch with accent color when checked |
| Search | Yes | Filter input with placeholder |
| Empty search | Yes | "No flags found" status |
| Disabled | **No** | No disabled state for individual flags |
| Loading | **No** | No loading/skeleton state |
| Error | **No** | No error state for toggle failures |

### Interaction Audit
- **Toggle**: Fires `ai-flag-toggle` with id, name, and new enabled state.
- **Row click**: Fires `ai-flag-click` with id and name. Separate from toggle.
- **Search**: Filters by name and description.
- **Keyboard**: Enter on flag row triggers click. Toggle via checkbox is natively keyboard-accessible.
- **ARIA**: `role="list"`, `role="listitem"`, `aria-label` on toggle inputs and search.

## Style Fixes Needed

1. **Search input box-sizing** — Has `box-sizing: border-box` — good.
2. **Flag item active/pressed** — No `:active` feedback on flag row click.
3. **Group label spacing** — `.group-label` margin uses `var(--cg-spacing-12)` top and `var(--cg-spacing-6)` bottom — slight asymmetry is intentional but could be more consistent.
4. **Toggle track border-radius** — Uses `var(--cg-border-radius-100, 8px)` — standard toggle switches typically use full radius. Consider `var(--cg-border-radius-full)`.
5. **Count text alignment** — `.count` is centered but looks disconnected from the list above.

## Interaction Fixes Needed

1. **Space key on flag row** — Only Enter triggers `_onClick`; Space should also work per button semantics.
2. **Toggle error handling** — When a toggle fails server-side, there's no mechanism to revert the visual state.
3. **Bulk toggle** — No "Enable All" / "Disable All" action.
4. **Flag environment filter** — Environment badge is shown but not filterable. Consider adding environment filter chips.
5. **Confirm destructive toggle** — Disabling a critical flag should optionally require confirmation.
6. **Debounce search** — Search filtering happens synchronously on every keystroke. For large flag lists, consider debouncing.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders enabled and disabled groups from `.flags` array | Unit |
| 2 | Toggle switch fires `ai-flag-toggle` with correct detail | Unit |
| 3 | Row click fires `ai-flag-click` with correct detail | Unit |
| 4 | Toggle click does not trigger row click (stopPropagation) | Interaction |
| 5 | Search filters flags by name | Unit |
| 6 | Search filters flags by description | Unit |
| 7 | Empty search result shows "No flags found" | Unit |
| 8 | Environment badge displays `flag.environment` | Unit |
| 9 | Count shows filtered/total counts | Unit |
| 10 | Group labels show correct counts | Unit |
| 11 | Environment badge on header shows `environment` prop | Unit |
| 12 | Rounded variants change host border-radius | Visual |
| 13 | Focus-visible ring on flag items | A11y |
| 14 | Focus-visible ring on toggle input | A11y |
| 15 | `aria-label` on toggle inputs includes flag name | A11y |
| 16 | Enter key on flag item triggers click | Interaction |
| 17 | Search input has accessible label | A11y |
