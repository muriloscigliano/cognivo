# ai-api-key-manager — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Good coverage — spacing, colors, typography, border-radius all tokenized.
- **Magic numbers**: None found.
- **Monospace font**: Key prefix uses monospace font — correct for key display.
- **Action buttons**: Fixed 28px square buttons with icon content.

### States Audit

| State | Supported | Notes |
|---|---|---|
| Default | Yes | Key list with masked prefixes |
| Hover | Yes | Action buttons change background/color |
| Focus-visible | Yes | Action buttons and create button have focus rings |
| Active (key) | Yes | Green status badge |
| Revoked (key) | Yes | Red status badge, no revoke button |
| Disabled (create) | Yes | At-limit state disables create button with opacity |
| Empty | Yes | "No API keys created yet" message |
| Loading | **No** | No loading state |
| Error | **No** | No error handling for operations |
| Copied | Yes | Temporary "Copied!" toast next to key prefix |

### Interaction Audit
- **Create**: Fires `ai-key-create` event.
- **Copy**: Copies key prefix to clipboard, shows "Copied!" toast for 2 seconds.
- **Revoke**: Fires `ai-key-revoke` with id/name (only for active keys).
- **Delete**: Fires `ai-key-delete` with id/name.
- **ARIA**: `role="list"`, `role="listitem"`, `aria-label` on all action buttons.

## Style Fixes Needed

1. **Action button icons** — Uses HTML entities (`&#x2398;`, `&#x2718;`, `&#x1f5d1;`) which render inconsistently across platforms. Should use inline SVGs.
2. **Create button hover** — No hover style on create button.
3. **Danger button text** — `.action-btn.danger:hover` uses error tokens — good.
4. **Key item border** — Uses same token for background and border (`#27272a`) — border is invisible. Should use `--cg-color-surface-container-border` with `#3f3f46` fallback.
5. **Rounded variants** — Missing `:host([rounded])` support.
6. **Copied toast animation** — No entrance/exit animation on the toast.

## Interaction Fixes Needed

1. **Copy full key** — Currently copies only the prefix, which is useless. Should copy the full key (needs to be passed in data or retrieved from a secure source).
2. **Delete confirmation** — Deleting a key is destructive and irreversible. Should require confirmation.
3. **Revoke confirmation** — Revoking is also destructive. Should confirm.
4. **Create flow** — `ai-key-create` fires but the component has no inline form for naming the new key. Consider adding a name input.
5. **Keyboard navigation** — No arrow key navigation between key items.
6. **Toast accessibility** — "Copied!" toast should use `role="status"` or `aria-live="polite"` for screen reader announcement.
7. **Last used relative time** — `lastUsed` displays as-is. Consider formatting as relative time.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders key items from `.keys` array | Unit |
| 2 | Create button fires `ai-key-create` | Unit |
| 3 | Create button disabled when at `maxKeys` limit | Unit |
| 4 | Copy button copies prefix to clipboard | Interaction |
| 5 | "Copied!" toast appears after copy and disappears after 2s | Interaction |
| 6 | Revoke button fires `ai-key-revoke` with correct detail | Unit |
| 7 | Revoke button hidden for revoked keys | Unit |
| 8 | Delete button fires `ai-key-delete` with correct detail | Unit |
| 9 | Status badge shows correct class (active/revoked) | Unit |
| 10 | Key prefix displayed with masked suffix | Unit |
| 11 | Key metadata shows createdAt and optional lastUsed | Unit |
| 12 | Count shows current/max keys | Unit |
| 13 | Empty state shown when keys array is empty | Unit |
| 14 | Focus-visible ring on all buttons | A11y |
| 15 | `aria-label` on action buttons includes key name | A11y |
| 16 | Danger hover style on delete button | Visual |
