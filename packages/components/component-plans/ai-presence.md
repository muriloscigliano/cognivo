# ai-presence — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Most values use `--cg-*` tokens. Issues below.
- **Magic numbers**:
  - `.avatar-btn` uses `border: 2px solid` — acceptable.
  - `.status-dot` uses `border: 2px solid` — acceptable.
  - `.overflow-badge` uses `border: 2px solid` — acceptable.
  - `.tooltip` uses `border: 1px solid` — acceptable.
- **Reduced motion**: Missing explicit `@media (prefers-reduced-motion)` block (hover transform will still apply).
- **Issues**:
  - Uses `hostBase` instead of `hostBlock` — intentional for inline display.
  - Status dot colors use `--cg-color-status-success-text` (no `-default` suffix) — may be inconsistent with other components that use `*-text-default`.
  - Tooltip has no arrow/caret pointing to avatar.

### States Audit

| State | .avatar-btn | .overflow-badge | .tooltip |
|---|---|---|---|
| Default | PASS | PASS | Hidden (opacity 0) |
| Hover | PASS (translateY lift) | N/A | PASS (opacity 1) |
| Focus-within | PASS (translateY lift) | N/A | PASS (opacity 1) |
| Focus-visible | PASS (outline) | N/A | N/A |
| Online | N/A | N/A | Green dot |
| Away | N/A | N/A | Yellow dot |
| Offline | N/A | N/A | Grey dot |
| Loading | MISSING | MISSING | MISSING |
| Disabled | MISSING | MISSING | MISSING |

### Interaction Audit
- Avatar click fires `ai-presence-user-click` with user object. PASS.
- Tooltip shows on hover and focus-within. PASS.
- Overflow badge shows "+N" count. PASS.
- `maxVisible` controls displayed avatars. PASS.
- `role="group"` on container. PASS.
- `role="listitem"` on avatar buttons. PASS.
- `aria-label` on avatars with name and status. PASS.
- **Issue**: No keyboard navigation between avatars (arrow keys).
- **Issue**: Overflow badge has `cursor: default` — not clickable. Could show overflow user list.
- **Issue**: Tooltip uses opacity transition — may need pointer-events management.
- **Issue**: Status dot token names (`--cg-color-status-success-text` vs `*-text-default`) may not resolve.
- **Issue**: `@media (prefers-reduced-motion)` should disable hover transform.

## Style Fixes Needed

1. Verify status dot token names match token system (add `-default` suffix if needed).
2. Add `@media (prefers-reduced-motion)` to disable hover transforms.
3. Add tooltip arrow/caret for visual connection.
4. Add loading state (pulsing placeholder avatars).
5. Consider adding a `max-width` on tooltip for long names.

## Interaction Fixes Needed

1. Add keyboard arrow navigation between avatars.
2. Make overflow badge interactive — show popover with remaining users.
3. Add `aria-roledescription` for better screen reader context.
4. Add loading state (placeholder avatars).
5. Add animation for users joining/leaving (fade in/out).
6. Consider adding user status change live announcements.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders correct number of avatar buttons up to `maxVisible` | render |
| 2 | Overflow badge shows "+N" when users exceed maxVisible | render |
| 3 | Overflow badge hidden when all users fit | render |
| 4 | Avatar shows image when `avatar` URL provided | render |
| 5 | Avatar shows initials when no image provided | render |
| 6 | Status dot shows correct color per status (online/away/offline) | render |
| 7 | Tooltip shows user name on hover | interaction |
| 8 | Tooltip shows on focus-within | a11y |
| 9 | Avatar click fires `ai-presence-user-click` with user object | interaction |
| 10 | Avatars have negative margin for overlapping effect | render |
| 11 | Hover lifts avatar with translateY | interaction |
| 12 | Focus-visible ring on avatar buttons | a11y |
| 13 | `aria-label` includes user name and status | a11y |
| 14 | Container has `role="group"` with aria-label | a11y |
