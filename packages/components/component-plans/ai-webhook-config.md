# ai-webhook-config — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Good coverage — spacing, colors, typography, border-radius, motion all tokenized.
- **Magic numbers**: None found.
- **Toggle switch**: Custom CSS toggle similar to ai-feature-flag.
- **Form layout**: Flex column form with URL input and event chips.

### States Audit

| State | Supported | Notes |
|---|---|---|
| Default | Yes | Webhook list with toggle, events, actions |
| Hover | Yes | Add button hover with brightness + translateY |
| Focus-visible | Yes | Buttons, input, event chips all have focus rings |
| Active toggle | Yes | Accent toggle with dot transition |
| Form open | Yes | `_showForm` state toggles inline form |
| Empty | Yes | "No webhooks configured" message |
| Loading | **No** | No loading state |
| Error | **No** | No error state (e.g., test webhook failure) |
| Disabled | **No** | No disabled state |

### Interaction Audit
- **Add webhook**: Opens form, captures URL and selected events, fires `ai-webhook-create`.
- **Toggle**: Fires `ai-webhook-toggle` with id and new active state.
- **Delete**: Fires `ai-webhook-delete` with id.
- **Test**: Fires `ai-webhook-test` with id and url.
- **Event chips**: Toggle `aria-pressed` state for event selection.
- **ARIA**: `role="form"`, `role="group"`, `role="list"`, `aria-label` on inputs and buttons, `aria-pressed` on chips.

## Style Fixes Needed

1. **Delete button inline style** — Line 417 uses inline `style` for error coloring on delete button. Should use a CSS class like `.btn-sm.danger`.
2. **Add button transform** — `translateY(-1px)` on hover is a micro-interaction detail that uses raw pixel value. Should use `calc(-1 * var(--cg-spacing-1, 1px))`.
3. **Toggle track border-radius** — Uses `var(--cg-border-radius-100, 9px)` — 9px fallback is inconsistent with other toggles (should be 8px or use `--cg-border-radius-full`).
4. **Rounded variants** — Missing `:host([rounded])` support.
5. **Webhook item border** — Same color for background and border (`#27272a`) — border invisible.

## Interaction Fixes Needed

1. **URL validation** — No URL validation before create. The input is `type="url"` but no validation message is shown.
2. **Required events** — Creating a webhook with no events selected should show a warning.
3. **Test result feedback** — After firing `ai-webhook-test`, no visual feedback (success/failure) is shown.
4. **Delete confirmation** — Deleting a webhook should require confirmation.
5. **Form cancel keyboard** — Escape key should close the form.
6. **Event chip keyboard** — Event chips lack arrow key navigation.
7. **Webhook URL truncation** — Long URLs are truncated with `text-overflow: ellipsis` but have no tooltip/title for full URL.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders webhook items from `.webhooks` array | Unit |
| 2 | Add button toggles form visibility | Unit |
| 3 | Form captures URL and selected events | Interaction |
| 4 | Create fires `ai-webhook-create` with url and events | Unit |
| 5 | Form resets after successful create | Unit |
| 6 | Event chips toggle `aria-pressed` state | Unit |
| 7 | Toggle fires `ai-webhook-toggle` with id and new state | Unit |
| 8 | Delete fires `ai-webhook-delete` with id | Unit |
| 9 | Test fires `ai-webhook-test` with id and url | Unit |
| 10 | Empty state shown when webhooks is empty | Unit |
| 11 | Event tags displayed for each webhook | Unit |
| 12 | Last triggered timestamp shown or "Never triggered" | Unit |
| 13 | Create blocked when URL is empty | Unit |
| 14 | Focus-visible rings on all interactive elements | A11y |
| 15 | `aria-label` on toggle includes webhook URL | A11y |
| 16 | `aria-pressed` on event chips | A11y |
