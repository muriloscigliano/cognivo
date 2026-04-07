# ai-permission-gate — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Excellent coverage — spacing, colors, typography, border-radius all tokenized.
- **Magic numbers**: None found.
- **Status icons**: Allowed (green check) and denied (red X) with semantic surface backgrounds.
- **Summary footer**: Dot indicators with allowed/denied counts.

### States Audit

| State | Supported | Notes |
|---|---|---|
| Default | Yes | List of permissions with status icons |
| Hover | Yes | Feature row border-color change |
| Focus-visible | Yes | Request button has accent focus ring |
| Allowed | Yes | Green check icon with success surface |
| Denied | Yes | Red X icon with error surface, "Request Access" button |
| Empty | Yes | "No permissions configured" status |
| Loading | **No** | No loading state |
| Error | **No** | No error state for access requests |
| Pending request | **No** | No "request pending" visual state |

### Interaction Audit
- **Request Access**: Fires `ai-permission-request` with feature and role.
- **Keyboard**: Request button naturally focusable.
- **ARIA**: `role="region"`, `role="list"`, `role="listitem"`, `aria-label` on request buttons.

## Style Fixes Needed

1. **Feature row focus-visible** — Feature rows lack `tabindex` and focus styles despite having a hover state.
2. **Request button active state** — No `:active` press feedback.
3. **Feature role text color** — Uses `--cg-color-surface-border-hover` (#52525b) for role text — semantically incorrect token (border color for text). Should use `--cg-color-surface-tertiary-text`.
4. **Rounded variants** — Missing `:host([rounded])` support.
5. **Summary alignment** — Summary footer items could use a `flex: 1` to distribute evenly.
6. **Transition duration** — `.feature-row` uses raw `120ms` in transition — should use `var(--cg-motion-duration-fast, 150ms)` for consistency.

## Interaction Fixes Needed

1. **Pending request state** — After clicking "Request Access", the button should change to "Pending" with a different style.
2. **Feature row interactivity** — Rows have hover but no click handler or keyboard support. Consider making rows expandable for details.
3. **Role switcher** — Allow changing `currentRole` via an inline dropdown/select.
4. **Grouped display** — Consider grouping permissions by allowed/denied like ai-feature-flag does.
5. **Bulk request** — "Request All" button for denied permissions.
6. **Filter/search** — No search capability for large permission lists.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders permission rows from `.permissions` array | Unit |
| 2 | Filters by `currentRole` when set | Unit |
| 3 | Shows all permissions when `currentRole` is empty | Unit |
| 4 | Allowed permissions show green check icon | Unit |
| 5 | Denied permissions show red X icon and "Request Access" button | Unit |
| 6 | Request button fires `ai-permission-request` with feature/role | Unit |
| 7 | Summary shows correct allowed/denied counts | Unit |
| 8 | Empty state shown when no permissions match | Unit |
| 9 | Role badge displays `currentRole` | Unit |
| 10 | Role badge hidden when `currentRole` is empty | Unit |
| 11 | Reason text shown when permission has reason | Unit |
| 12 | Focus-visible ring on request button | A11y |
| 13 | `aria-label` on request button includes feature name | A11y |
| 14 | `role="list"` and `role="listitem"` present | A11y |
| 15 | Region has `aria-label="Permission gate"` | A11y |
