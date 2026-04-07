# ai-notification-center Improvement Plan

**Component**: `ai-notification-center`
**Category**: AI-Native
**File**: `src/components/ai-notification-center/ai-notification-center.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Raw `rgba()` and non-semantic token colors throughout (`rgba(223, 255, 97, 0.04)`, `rgba(223, 255, 97, 0.06)`, `--cg-gray-*` used instead of semantic tokens)
2. Magic numbers in padding, font-size, and sizing (badge `10px`/`2px 7px`/`16px`, notif-title `margin-bottom: 2px`, notif-time `font-size: 10px`, dismiss button `2px 4px`)
3. No keyboard navigation between notifications (no ArrowUp/ArrowDown) and no live region for new notifications

---

## 1. Functional Issues

1. **No keyboard list navigation** (entire component): Notifications have `tabindex="0"` and individual Enter/Space handlers (line 273), but there is no ArrowUp/ArrowDown keyboard navigation between items. Users must Tab through every notification.
   - **Fix**: Add a roving tabindex pattern or ArrowUp/ArrowDown handler that moves focus between notification items.

2. **No `aria-live` region for new notifications** (entire component): When new notifications arrive (array is updated), screen readers are not notified.
   - **Fix**: Add an `aria-live="polite"` region that announces new notification counts.

3. **No undo for dismiss** (lines 224-231): Once dismissed, there is no way to undo. The component fires the event but provides no built-in undo mechanism.
   - **Fix**: Add optional undo toast/snackbar or emit a detail object that includes an undo callback.

4. **Notification data is not internally managed** (lines 198, 216-217): The component expects the parent to manage the notifications array. The `_handleReadAll` method (lines 233-238) fires an event but does not actually mark notifications as read internally.
   - **This is by design** (unidirectional data flow), but it means the component provides no standalone functionality. Consider adding an optional `managed` mode.

5. **`maxVisible` does not show overflow indicator** (line 207): If there are more notifications than `maxVisible`, the extras are silently hidden with no "X more" indicator.
   - **Fix**: Add a "Show N more" link at the bottom when `notifications.length > maxVisible`.

6. **No empty state differentiation**: "No notifications" is the same whether the user has never had notifications or has dismissed/read all.
   - **Fix**: Add an `emptyMessage` property or differentiate between "all caught up" vs "no notifications yet".

---

## 2. Interaction Issues

### 2.1 State Coverage

| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default (has items) | ✅ | Partial | Uses `--cg-gray-*` instead of semantic tokens |
| Default (empty) | ✅ | Partial | Same `--cg-gray-*` issue |
| Hover (notification) | ✅ | ❌ | `rgba(223, 255, 97, 0.04)` is raw (line 122) |
| Active | ❌ | N/A | No active/pressed state on notifications |
| Focus (notification) | ✅ | ✅ | Focus-visible outline uses `--cg-brand-ai-accent` |
| Disabled | ❌ | N/A | No disabled state concept |
| Loading | ❌ | N/A | No loading/skeleton state for async notification fetch |
| Error | ❌ | N/A | No error state for failed notification loading |
| Success | ❌ | N/A | No success state (e.g., all read confirmation) |

### 2.2 Keyboard Navigation
- **Tab**: Moves through notifications and dismiss buttons sequentially (via `tabindex="0"`).
- **Enter / Space**: Clicks the focused notification (line 273).
- **Missing**: ArrowUp/ArrowDown to navigate between notifications.
- **Missing**: Delete key to dismiss focused notification.
- **Missing**: Ctrl+Shift+A or similar to mark all read via keyboard.

### 2.3 Focus Management
- No focus trap needed (not a modal).
- **Issue**: After dismissing a notification, focus is lost because the focused element is removed from DOM.
  - **Fix**: Move focus to the next notification, or the previous one if last was dismissed.

### 2.4 ARIA & Accessibility
- Container has `role="region"` with `aria-label="Notification center"` (line 244).
- Group labels use `role="heading"` with `aria-level="3"` (line 264).
- Notification list uses `role="list"` / `role="listitem"` (lines 265, 268-269).
- Dismiss buttons have descriptive `aria-label` (line 285).
- **Missing**: `aria-live="polite"` for announcing new notifications.
- **Missing**: Count announcement when unread badge changes.
- **Issue**: `unread-badge` has `aria-label` (line 249) but is a `<span>`, not an interactive element, so the label may not be announced consistently.

### 2.5 Touch & Mobile
- Notifications are clickable.
- **Missing**: No swipe-to-dismiss gesture for mobile.
- **Missing**: No pull-to-refresh pattern.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Value | Suggested Token |
|------|-------|-----------------|
| 48 | `max-height: 480px` | `var(--cg-notification-center-max-height, 480px)` |
| 77 | `font-size: 10px` | `var(--cg-font-size-2xs, 10px)` or token |
| 78 | `padding: 2px 7px` | `var(--cg-spacing-2, 2px) var(--cg-spacing-8, 8px)` (7px is not on scale) |
| 80 | `min-width: 16px` | `var(--cg-spacing-16, 16px)` |
| 131 | `width: 6px; height: 6px` | `var(--cg-size-dot, 6px)` |
| 145 | `margin-bottom: 2px` | `var(--cg-spacing-2, 2px)` |
| 159 | `font-size: 10px` | `var(--cg-font-size-2xs, 10px)` |
| 170 | `padding: 2px 4px` | `var(--cg-spacing-2, 2px) var(--cg-spacing-4, 4px)` |

### 3.2 Raw Colors Found

| Line | Color | Suggested Token |
|------|-------|-----------------|
| 88 | `--cg-gray-500, #71717a` | Should use `var(--cg-color-text-tertiary)` |
| 106 | `--cg-gray-600, #52525b` | Should use `var(--cg-color-text-disabled)` or semantic |
| 122 | `rgba(223, 255, 97, 0.04)` | `var(--cg-color-accent-hover-background)` |
| 128 | `rgba(223, 255, 97, 0.06)` | `var(--cg-color-accent-subtle-background)` |
| 152 | `--cg-gray-400, #a1a1aa` | Should use `var(--cg-color-text-secondary)` |
| 160 | `--cg-gray-600, #52525b` | Should use `var(--cg-color-text-disabled)` |
| 167 | `--cg-gray-600, #52525b` | Should use `var(--cg-color-text-disabled)` |
| 183 | `--cg-gray-600, #52525b` | Should use `var(--cg-color-text-disabled)` |

**Pattern**: The component uses `--cg-gray-*` primitive tokens throughout instead of semantic color tokens. This breaks theming because primitive gray values won't adapt to theme changes.

### 3.3 Typography Issues
- Badge `font-size: 10px` (line 77) and notif-time `font-size: 10px` (line 159) should use a token like `--cg-font-size-2xs`.
- `font-weight: 600` used on multiple elements (lines 72, 78, 103, 144) should use `var(--cg-font-weight-semibold)`.
- `font-weight: 700` (lines 78, 103) should use `var(--cg-font-weight-bold)`.
- `line-height: 1.4` (line 153) should use `var(--cg-line-height-snug)`.

### 3.4 Spacing Issues
- Badge `padding: 2px 7px` -- `7px` is not on the spacing scale. Should be `8px` or use a token.
- Dismiss button `padding: 2px 4px` should use spacing tokens.
- `margin-bottom: 2px` on notif-title should use `var(--cg-spacing-2)`.

### 3.5 Modern Design Enhancements
- Container has box-shadow and gradient overlay -- good.
- Unread dot and accent color usage is thematically strong.
- **Add**: Glassmorphism backdrop-filter on the container for consistency.
- **Add**: Notification entrance animation (slide-in from right for new items).
- **Add**: Dismiss animation (slide-out + collapse height).
- **Add**: Subtle shimmer/pulse on unread dot for attention.
- **Add**: Custom scrollbar styling for the notification list.
- **Add**: Skeleton loading state for async notification fetch.

---

## 4. Prioritized Fixes

### P0 - Critical
1. **Replace all `--cg-gray-*` primitive tokens with semantic tokens** -- 6+ instances. This breaks theming entirely since primitive tokens don't respond to theme context. Use `--cg-color-text-secondary`, `--cg-color-text-tertiary`, `--cg-color-text-disabled` instead.
2. **Add `aria-live="polite"` region** for new notification announcements -- Screen reader users have no way to know when new notifications arrive.

### P1 - High
3. **Replace all raw `rgba()` colors with semantic tokens** -- 2 instances of raw accent-based rgba colors.
4. **Replace all magic numbers** -- badge sizing, font-sizes, padding values.
5. **Add ArrowUp/ArrowDown keyboard navigation** between notification items.
6. **Move focus to next notification after dismiss** -- Focus is lost when the focused notification is removed.
7. **Add active/pressed state** on notification items.

### P2 - Medium
8. **Add loading/skeleton state** for async notification fetch.
9. **Add dismiss animation** (slide-out + height collapse).
10. **Add "Show N more" overflow indicator** when `maxVisible` truncates the list.
11. **Add notification entrance animation** for newly added items.
12. **Add Delete key** to dismiss focused notification.
13. **Replace `font-weight` raw values** with `--cg-font-weight-*` tokens.
14. **Fix badge padding** `7px` to be on the spacing scale.

### P3 - Low
15. **Add swipe-to-dismiss** for mobile touch interaction.
16. **Add undo mechanism** for dismissed notifications.
17. **Add empty state differentiation** ("all caught up" vs "no notifications").
18. **Add shimmer/pulse animation** on unread dot.
19. **Add custom scrollbar styling**.
20. **Add pull-to-refresh** pattern for mobile.
