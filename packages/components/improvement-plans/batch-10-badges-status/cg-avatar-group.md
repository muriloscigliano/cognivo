# cg-avatar-group Improvement Plan

**Component**: `cg-avatar-group`
**Category**: Foundation
**File**: `src/components/cg-avatar-group/cg-avatar-group.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Extensive magic number dimensions for avatar sizes, margins, and status dots (lines 126-142)
2. `!important` usage on hover margin reset (lines 56-57) is fragile
3. Missing ARIA roles on individual avatars (they use `role="button"` but no `role="list"` on container)

---

## 1. Functional Issues

- **Image error fallback is DOM-manipulative** (lines 153-158): The `_onImgError` handler directly manipulates `style.display` on DOM elements. This is fragile and bypasses Lit's reactive rendering. A better approach would be to use a reactive `@state()` map tracking which avatars have failed images, and re-render with initials in the template.
- **All avatars fire the same event** (line 161): `_onAvatarClick` dispatches `cg-avatar-group-click` without any data about which avatar was clicked. The handler should include the avatar item in the event detail.
- **No keyboard handler for overflow button**: The overflow is a `<button>` (line 192) so keyboard works natively, but individual avatars use `<div>` with manual `keydown` handlers (line 181), which is less semantic than using `<button>`.
- **Stagger animation is limited to 6 children** (lines 44-49): Only the first 6 avatars get staggered animation delays. If `maxVisible` is higher, additional avatars appear without animation delay.

## 2. Interaction Issues

### 2.1 State Coverage

| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | Overlapping avatar stack |
| Hover (group) | Yes | Spreads apart on group hover (line 56) |
| Hover (avatar) | Yes | Scale up + translate (lines 59-62) |
| Focus | Yes | Focus-visible ring with double box-shadow (lines 64-70) |
| Keyboard | Yes | Enter/Space on avatars, native on overflow button |
| Image error | Yes | Falls back to initials (but via DOM manipulation) |
| Status | Yes | online/offline/busy/away dots |
| Empty | No | No visual when `avatars` array is empty |
| Loading | No | No skeleton state while avatars load |

### 2.2 ARIA & Accessibility

- **`role="group"` on container** (line 173): Correct.
- **`aria-label` on avatars** (line 178): Good, uses `a.name`.
- **`role="button"` on avatar divs** (line 177): Semantically correct but should be `<button>` elements for native keyboard/focus behavior.
- **No `role="list"` / `role="listitem"`**: If the group is a list of people, `role="list"` on the container and `role="listitem"` on each avatar would be more semantically accurate.
- **Status dots have no accessible text** (line 188): The status dot (`<span class="status ${a.status}">`) has no `aria-label` or `aria-hidden`. It should either be hidden from screen readers (if the status is conveyed via the avatar's `aria-label`) or have its own label. The avatar `aria-label` should include the status: `aria-label="${a.name}, ${a.status}"`.
- **Overflow button `aria-label` is good** (line 193): `"${overflow} more avatars"`.

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Property | Value | Suggested Token |
|------|----------|-------|-----------------|
| 42 | animation duration | `250ms` | `var(--cg-motion-duration-normal, 250ms)` |
| 42 | animation easing | `cubic-bezier(0.2, 0, 0, 1)` | `var(--cg-motion-easing-enter)` |
| 44-49 | animation-delay | `50ms` increments | Could use CSS `calc()` with custom property `--_index` |
| 56 | `!important` on margin reset | N/A | Refactor to avoid `!important` |
| 61 | translateY | `-2px` | `var(--cg-spacing-2, 2px)` with negative |
| 126 | sm avatar size | `28px` | `var(--cg-size-avatar-sm, 28px)` |
| 127 | sm margin-left | `-8px` | `var(--cg-spacing-8, 8px)` negated |
| 128 | sm overflow font-size | `0.6rem` | `var(--cg-font-size-2xs, 10px)` |
| 129 | sm initials font-size | `0.6rem` | Same |
| 130 | sm status size | `8px` | `var(--cg-size-status-dot-sm, 8px)` |
| 132 | md avatar size | `38px` | `var(--cg-size-avatar-md, 38px)` |
| 133 | md margin-left | `-10px` | `var(--cg-spacing-10, 10px)` negated |
| 136 | md status size | `10px` | `var(--cg-size-status-dot-md, 10px)` |
| 138 | lg avatar size | `48px` | `var(--cg-size-avatar-lg, 48px)` |
| 139 | lg margin-left | `-12px` | `var(--cg-spacing-12, 12px)` negated |
| 142 | lg status size | `12px` | `var(--cg-size-status-dot-lg, 12px)` |

### 3.2 Raw Colors Found

No raw hex colors found outside of token-wrapped `var()` fallbacks. All colors properly use `--cg-*` tokens. This is well done.

### 3.3 Modern Design Enhancements

- **Hover spread uses `!important`** (lines 56-57): This is needed to override the negative margins set per-size. A cleaner approach would be to use CSS custom properties: set `--_overlap: -10px` per size and `--_overlap: 0` on `.group:hover`, then `margin-left: var(--_overlap)`.
- **Avatar ring on hover**: Add a colored ring matching the status color on hover for visual feedback.
- **Tooltip on hover**: Show the avatar name in a tooltip on hover, similar to `ai-presence`.

## 4. Prioritized Fixes

### P0 - Critical
- (None)

### P1 - High
- **Refactor image error handling** (lines 153-158): Replace DOM manipulation with a reactive `@state()` approach tracking failed image indices.
- **Include avatar data in click event** (line 161): Change `_onAvatarClick` to accept the `AvatarItem` and include it in the event detail.
- **Add status to avatar `aria-label`** (line 178): Change to `aria-label="${a.name}, ${a.status || ''}"` so screen readers announce the status.

### P2 - Medium
- **Tokenize avatar dimensions** (lines 126-142): Replace all `28px`, `38px`, `48px` with avatar size tokens.
- **Tokenize status dot dimensions** (lines 130, 136, 142): Replace `8px`, `10px`, `12px` with status dot size tokens.
- **Tokenize negative margins** (lines 127, 133, 139): Use spacing tokens.
- **Remove `!important`** (lines 56-57): Refactor using CSS custom property `--_overlap`.
- **Replace `0.6rem`** (lines 128-129) with a proper font size token.
- **Use `<button>` instead of `<div>` for avatars**: Better semantics and free keyboard/focus behavior.

### P3 - Low
- **Add empty state**: Render nothing or a placeholder when `avatars` is empty.
- **Add tooltip on avatar hover**: Show name on hover for visual users.
- **Dynamic stagger animation**: Use `style="animation-delay: calc(${i} * 50ms)"` instead of hardcoded `:nth-child()` rules.
- **Add loading skeleton**: Show circular skeleton placeholders while images load.
