# ai-presence Improvement Plan

**Component**: `ai-presence`
**Category**: AI-Native
**File**: `src/components/ai-presence/ai-presence.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Raw hex colors on status dots: `#22c55e` and `#eab308` without any token wrapping (lines 106-107)
2. Inconsistent token naming: uses `--cg-color-bg-primary`, `--cg-color-bg-secondary`, `--cg-color-text-primary`, `--cg-color-border-primary` which do not follow the project's `--cg-color-surface-*` convention
3. Multiple magic number dimensions (36px avatar, 10px status dot, -8px overlap)

---

## 1. Functional Issues

- **No image error fallback**: If an avatar URL returns 404, the `<img>` will show a broken image icon. Unlike `cg-avatar-group`, there is no `@error` handler on the image element (line 181). Need to add an error handler that falls back to initials.
- **`role="listitem"` on button inside group** (line 177): The `<button>` has `role="listitem"` but the parent `<div class="avatar-stack">` does not have `role="list"`. Either add `role="list"` to the stack, or remove `role="listitem"` from buttons.
- **Glass effect on container is decorative but untokenized** (lines 45-46): The container has `box-shadow` and `background-image` for glass effect but no actual background color, so these effects may be invisible.
- **Missing `busy` status**: The interface only supports `'online' | 'away' | 'offline'` (line 31) but common presence systems also include `'busy'`/`'dnd'`. The CSS only handles three statuses (lines 106-108).

## 2. Interaction Issues

### 2.1 State Coverage

| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | Avatar stack with status dots |
| Hover (avatar) | Yes | Lift via translateY(-2px) (line 63) |
| Focus | Yes | Focus-visible ring on button (lines 84-87) |
| Tooltip | Yes | Shows name on hover/focus (lines 143-146) |
| Overflow | Yes | "+N" overflow badge (lines 188-189) |
| Click | Yes | Fires user click event |
| Empty | No | No handling when `users` is empty |
| Loading | No | No skeleton state |
| Image Error | No | Broken image shown, no fallback |
| Hidden | Yes | `:host([hidden])` support (line 40) |

### 2.2 ARIA & Accessibility

- **`role="group"` with `aria-label="Online users"`** (line 170): Good, but the label is hardcoded. Not all users may be online. Consider `"Users presence"` or make it dynamic based on user statuses.
- **Mismatched list semantics** (line 177): `role="listitem"` on buttons without a `role="list"` parent. Fix by adding `role="list"` to `.avatar-stack`.
- **Overflow badge uses `aria-label`** (line 189): Good. But `<span>` is not focusable. If overflow is interactive, it should be a `<button>`. If not, the `cursor: default` suggests it's informational, which is fine but the `aria-label` on a non-focusable span may not be announced.
- **Status dots have no accessible text** (line 183): The status is conveyed in the button's `aria-label` via `"${user.name} -- ${user.status}"`, which is good. The dots themselves should be `aria-hidden="true"`.
- **Tooltip is not linked via `aria-describedby`**: The tooltip `<span>` (line 185) exists but is not referenced by the button. Since the name is already in `aria-label`, this is acceptable.

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Property | Value | Suggested Token |
|------|----------|-------|-----------------|
| 56 | .avatar-wrapper margin-left | `-8px` | `var(--cg-spacing-8, 8px)` negated |
| 58 | transition duration | `200ms` | `var(--cg-motion-duration-fast, 200ms)` |
| 71-72 | .avatar-btn width/height | `36px` | `var(--cg-size-avatar-md, 36px)` |
| 100-101 | .status-dot width/height | `10px` | `var(--cg-size-status-dot-md, 10px)` |
| 114-115 | .overflow-badge width/height | `36px` | Same avatar size token |
| 122 | overflow margin-left | `-8px` | Same overlap token |
| 128 | tooltip bottom offset | `6px` | `var(--cg-spacing-6, 6px)` |
| 140 | z-index | `20` | `var(--cg-z-index-tooltip, 20)` |

### 3.2 Raw Colors Found

| Line | Context | Value | Suggested Token |
|------|---------|-------|-----------------|
| 106 | status online | `#22c55e` | `var(--cg-green-500, #22c55e)` or `var(--cg-color-status-success-text-default)` |
| 107 | status away | `#eab308` | `var(--cg-yellow-500, #eab308)` or `var(--cg-color-status-warning-text-default)` |
| 45 | container box-shadow | `rgba(255, 255, 255, 0.05)` | `var(--cg-color-surface-glass-highlight)` |
| 46 | container gradient | `rgba(255, 255, 255, 0.03)` | `var(--cg-color-surface-glass-gradient-start)` |

### 3.3 Inconsistent Token Names

The component uses a different token naming convention than the rest of the system:

| Line | Used Token | Expected Token |
|------|-----------|----------------|
| 74 | `--cg-color-bg-primary` | `--cg-color-surface-base-background` |
| 75 | `--cg-color-bg-secondary` | `--cg-color-surface-container-background` or `--cg-color-action-secondary-background-default` |
| 76 | `--cg-color-text-primary` | `--cg-color-surface-base-text` |
| 103 | `--cg-color-bg-primary` | Same as line 74 |
| 117 | `--cg-color-border-primary` | `--cg-color-surface-container-border` |
| 119 | `--cg-color-text-primary` | Same as line 76 |
| 131 | `--cg-color-bg-secondary` | Same as line 75 |
| 132 | `--cg-color-text-primary` | Same as line 76 |
| 141 | `--cg-color-border-primary` | Same as line 117 |

This is a significant consistency issue -- 9 token references use a non-standard naming convention.

### 3.4 Modern Design Enhancements

- **Glass effect tokens**: The container glass effects (lines 45-46) are good but should use tokenized colors.
- **Status dot pulse animation**: Online status dots could pulse gently like `cg-badge`'s dot.
- **Avatar ring glow on hover**: Add a subtle colored glow matching the user's status color.
- **Entrance animation for new users**: When a user comes online, animate their avatar sliding in.

## 4. Prioritized Fixes

### P0 - Critical
- **Wrap raw hex status dot colors in tokens** (lines 106-107): `#22c55e` and `#eab308` are raw hex with no token wrapping at all. Must use `var(--cg-green-500, #22c55e)` and `var(--cg-yellow-500, #eab308)` minimum, or semantic status tokens.

### P1 - High
- **Fix 9 inconsistent token names** (lines 74-76, 103, 117, 119, 131-132, 141): Replace `--cg-color-bg-primary`, `--cg-color-bg-secondary`, `--cg-color-text-primary`, `--cg-color-border-primary` with the project-standard `--cg-color-surface-*` equivalents.
- **Add image error fallback** (line 181): Add `@error` handler on `<img>` to show initials when image fails to load.
- **Fix list semantics** (line 177): Either add `role="list"` to `.avatar-stack` and keep `role="listitem"`, or remove `role="listitem"` from buttons.
- **Add `aria-hidden="true"` to status dots** (line 183).

### P2 - Medium
- **Tokenize avatar dimensions** (lines 71-72, 114-115): `36px` -> `var(--cg-size-avatar-md)`.
- **Tokenize status dot dimensions** (lines 100-101): `10px` -> `var(--cg-size-status-dot-md)`.
- **Tokenize overlap margins** (lines 56, 122): `-8px` -> negative spacing token.
- **Tokenize glass effect colors** (lines 45-46): Use surface glass tokens.
- **Add empty state handling**: When `users` is empty, render nothing or a placeholder.

### P3 - Low
- **Add `busy`/`dnd` status**: Extend the `PresenceUser` interface and add CSS for the status.
- **Add online pulse animation**: Gentle pulse on the online status dot.
- **Make overflow badge focusable**: Convert to `<button>` if interaction is intended.
- **Dynamic `aria-label` on group**: Reflect actual status counts (e.g., "3 online, 1 away").
