# ai-avatar Improvement Plan

**Component**: `ai-avatar`
**Category**: AI-Native
**File**: `src/components/ai-avatar/ai-avatar.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Extensive magic numbers for sizing -- `28px`, `22px`, `10px`, `40px`, `34px`, `56px`, `48px`, `8px`, `14px`, `3px` scattered across lines 71-98
2. Raw hex color `#eab308` for "away" status dot (line 101) -- the only status color not using a token
3. CSS syntax error: extra closing brace `}` on line 111 after `.skeleton` block, which may cause parse issues

---

## 1. Functional Issues

- **CSS syntax error** (line 111): There is a stray `}` after the `.skeleton` block that closes prematurely. The skeleton rule ends on line 110, and line 111 has an extra `}`. This could cause the entire style block after that point to be invalidated.
- **Always a button** (line 159): The avatar is always wrapped in a `<button>` with click handler, even when it is not intended to be interactive. Non-interactive avatars (e.g., in a message list) should not be buttons. Consider a `clickable` prop.
- **`role="img"` on `<button>`** (line 162): A button with `role="img"` is semantically conflicting. The `role="img"` overrides the button role, making it non-interactive for screen readers. Should use `role="img"` only on the inner content, and let the button maintain its native role.
- **Initials edge case** (lines 122-128): If `name` is empty string, `_initials` returns `""`. The `split(/\s+/)` on empty string returns `[""]`, and `w[0]` is an empty string. The result is empty, which renders nothing. The avatar would appear blank with no image and no initials.
- **Image `alt` attribute** (line 171): The `alt` is set to `this.name`, which is good. But if `name` is empty, `alt` becomes empty string, making the image decorative.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | Shows initials or image |
| Image loading | Yes | Skeleton shimmer |
| Image error | Yes | Falls back to initials |
| Online status | Yes | Green dot |
| Away status | Yes | Yellow dot (raw hex) |
| Busy status | Yes | Red dot |
| Offline status | Yes | Gray dot |
| Hover | No | No hover state on button |
| Focus | Yes | Focus-visible ring (line 42) |
| Pressed/Active | No | No active state |

### 2.2 ARIA & Accessibility
- **Issue**: `role="img"` on `<button>` (line 162) conflicts -- removes button semantics. Screen readers will announce it as an image, not a button.
- **Good**: `aria-label` set to name or "Avatar" (line 163).
- **Issue**: Status dot uses `aria-label` (line 181) but is a `<span>` with no role. Should have `role="status"` or the status should be incorporated into the parent `aria-label`.
- **Issue**: `tabindex="0"` on button (line 161) is redundant -- buttons are natively focusable.
- **Good**: Focus-visible ring is styled (lines 42-44).

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 42 | `2px` | focus outline width | `var(--cg-focus-ring-width, 2px)` |
| 43 | `3px` | focus outline-offset | `var(--cg-focus-ring-offset, 3px)` |
| 51 | `2px` | ring border width | `var(--cg-border-width-medium, 2px)` |
| 67 | `0.03` | rgba alpha in gradient | Could use overlay token |
| 68 | `0.05` | rgba alpha in box-shadow | Could use overlay token |
| 71 | `28px` / `22px` | sm ring/inner size | `var(--cg-avatar-size-sm-ring, 28px)` / `var(--cg-avatar-size-sm-inner, 22px)` |
| 72 | `10px` | sm initials font-size | `var(--cg-font-size-2xs, 10px)` |
| 74 | `40px` / `34px` | md ring/inner size | `var(--cg-avatar-size-md-ring, 40px)` / `var(--cg-avatar-size-md-inner, 34px)` |
| 77 | `56px` / `48px` | lg ring/inner size | `var(--cg-avatar-size-lg-ring, 56px)` / `var(--cg-avatar-size-lg-inner, 48px)` |
| 93 | `2px` | status dot border | `var(--cg-border-width-medium, 2px)` |
| 95 | `8px` | sm status dot size | `var(--cg-avatar-dot-sm, 8px)` |
| 97 | `10px` | md status dot size | `var(--cg-avatar-dot-md, 10px)` |
| 98 | `14px` | lg status dot size | `var(--cg-avatar-dot-lg, 14px)` |
| 66 | `600` | font-weight on .inner | `var(--cg-font-weight-semibold, 600)` |

### 3.2 Raw Colors Found
| Line | Value | Context | Status |
|------|-------|---------|--------|
| 41 | `#dfff61` | focus outline fallback | Acceptable (fallback) |
| 51 | `#27272a` | ring border fallback | Acceptable (fallback) |
| 53 | `#dfff61` | agent ring fallback | Acceptable (fallback) |
| 54 | `#3b82f6` | user ring fallback | Acceptable (fallback) |
| 55 | `#71717a` | system ring fallback | Acceptable (fallback) |
| 63 | `#27272a` | inner background fallback | Acceptable (fallback) |
| 64 | `rgba(255, 255, 255, 0.03)` | gradient overlay | Should use `var(--cg-overlay-light-subtle)` |
| 65 | `#fafafa` | text color fallback | Acceptable (fallback) |
| 67 | `rgba(255, 255, 255, 0.05)` | box-shadow inset | Should use overlay token |
| 93 | `#18181b` | status dot border fallback | Acceptable (fallback) |
| **101** | **`#eab308`** | **away status dot background** | **NOT a fallback -- raw hex, no token** |
| 102 | `#ef4444` | busy status fallback | Acceptable (fallback) |
| 103 | `#52525b` | offline status fallback | Acceptable (fallback) |

### 3.3 Typography Token Usage
- Font size: `10px` for sm initials (line 72) should be `var(--cg-font-size-2xs, 10px)`.
- `--cg-font-size-sm` and `--cg-font-size-lg` are used for md/lg -- good.
- Font weight: `600` on line 66 should use `var(--cg-font-weight-semibold, 600)`.

### 3.4 Modern Design Enhancements
- **Hover state**: Add a subtle scale or brightness change on hover for clickable avatars.
- **Active/pressed state**: Add `transform: scale(0.95)` on `:active`.
- **Animated status transitions**: Pulse animation on the status dot when status changes (e.g., "online" pulses briefly).
- **Group stacking**: Support for overlapping avatar groups (negative margin compositing).

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix CSS syntax error** (line 111): Remove the stray `}` that may invalidate subsequent styles.
2. **Fix `role="img"` on `<button>`** (line 162): Remove `role="img"` from the button. If needed, put it on the `.inner` div instead. The button should retain its native button role.

### P1 - High
3. **Tokenize raw `#eab308`** (line 101): Replace with `var(--cg-color-status-warning-text-default, #eab308)` or `var(--cg-yellow-500, #eab308)`.
4. **Add `clickable` prop**: Only render as `<button>` when interactive. Use `<div>` for non-interactive avatars.
5. **Tokenize all size magic numbers** (lines 71-98): Create avatar-specific size tokens or use component-scoped CSS custom properties.
6. **Tokenize `font-weight: 600`** (line 66): Use `var(--cg-font-weight-semibold, 600)`.
7. **Fix status dot ARIA**: Either give the status dot `role="status"` or incorporate status into the parent button's `aria-label` (e.g., "Jane Doe - online").

### P2 - Medium
8. **Remove redundant `tabindex="0"`** from button (line 161).
9. **Tokenize focus ring values** (lines 42-43): Use `--cg-focus-ring-width` and `--cg-focus-ring-offset`.
10. **Tokenize overlay colors** (lines 64, 67): Replace raw `rgba` with overlay tokens.
11. **Handle empty name gracefully**: Show a generic person icon instead of blank initials.
12. **Add hover/active states**: Scale or brightness feedback on interactive avatars.

### P3 - Low
13. **Add avatar group compositing support**: Negative margins for stacked avatar rows.
14. **Add animated status transitions**: Subtle pulse when status changes.
15. **Tokenize `10px` font-size** (line 72) for sm variant.
