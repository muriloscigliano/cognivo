# ai-notification-center — Improvement Plan

## Current State

### CSS Audit
| Property | Current | Issue |
|---|---|---|
| Container | Fully tokenized | OK |
| Header | Fully tokenized | OK |
| `.unread-badge` font-size | `10px` | Magic number — no matching token |
| `.unread-badge` padding | `2px 7px` | Should use spacing tokens, `7px` is off-grid |
| `.notif-title` margin-bottom | `2px` | Should use `var(--cg-spacing-2, 2px)` |
| `.dismiss-btn` padding | `2px 4px` | Should use `var(--cg-spacing-2) var(--cg-spacing-4)` |
| `.notification` transition | `background 120ms ease` | Duration should use motion token |
| `.mark-all-btn` transition | `color 150ms ease` | Duration should use motion token |
| `.dismiss-btn` transition | `color 150ms ease` | Duration should use motion token |
| `.notif-time` font-size | `10px` | Magic number |
| Group label styles | Tokenized | OK |
| Notification items | Mostly tokenized | OK |

### States Audit
| State | Supported | Notes |
|---|---|---|
| Default with notifications | Yes | Grouped list |
| Empty | Yes | "No notifications" message |
| Unread notifications | Yes | Highlighted bg + dot + accent title |
| Read notifications | Yes | Normal styling |
| Grouped by type | Yes | Type-based grouping |
| Unread badge count | Yes | Header badge |
| Mark all read | Yes | Button in header |
| Dismiss individual | Yes | X button per notification |
| Max visible limit | Yes | Slices array |
| Loading | No | Missing loading state |
| Error | No | Missing error state |

### Interaction Audit
| Feature | Status | Notes |
|---|---|---|
| Click notification | OK | Fires `ai-notification-click` |
| Keyboard Enter/Space | OK | On notification items |
| Dismiss click | OK | Fires `ai-notification-dismiss`, stops propagation |
| Mark all read | OK | Fires `ai-notification-read-all` |
| Scroll | OK | `overflow-y: auto` with max-height |

### Accessibility Audit
| Item | Status | Notes |
|---|---|---|
| Container `role="region"` | OK | With aria-label |
| Live region for count | OK | sr-only div with aria-live |
| Group `role="heading"` | OK | With aria-level="3" |
| List `role="list"` | OK | Per group |
| Items `role="listitem"` | OK | Per notification |
| Item `aria-label` | OK | Title + unread indicator |
| Dismiss `aria-label` | OK | "Dismiss notification: {title}" |
| Mark all `aria-label` | OK | "Mark all as read" |
| Focus-visible | OK | Brand accent outline |

## Style Fixes Needed
1. Tokenize `.unread-badge` font-size (use `--cg-font-size-3xs` or define one)
2. Tokenize `.unread-badge` padding to `var(--cg-spacing-2) var(--cg-spacing-8)`
3. Tokenize `.notif-title` margin-bottom to `var(--cg-spacing-2)`
4. Tokenize `.dismiss-btn` padding to `var(--cg-spacing-2) var(--cg-spacing-4)`
5. Tokenize `.notif-time` font-size
6. Tokenize all transition durations with motion tokens

## Interaction Fixes Needed
1. Add loading state (skeleton notifications)
2. Add animation on notification entry (fadeSlideIn per item)
3. Add animation on notification dismiss (slide out)
4. Notification click should also mark as read (or at least provide that option)
5. Consider adding "load more" when notifications exceed maxVisible

## Test Spec

### Unit Tests
- `it('renders notifications grouped by type')`
- `it('shows unread badge with correct count')`
- `it('highlights unread notifications with accent styling')`
- `it('shows unread dot for unread notifications')`
- `it('renders empty state when no notifications')`
- `it('fires ai-notification-click on notification click')`
- `it('fires ai-notification-click on Enter/Space key')`
- `it('fires ai-notification-dismiss on dismiss button click')`
- `it('dismiss click stops propagation (does not fire notification-click)')`
- `it('fires ai-notification-read-all on mark-all button')`
- `it('hides mark-all button when no unread notifications')`
- `it('limits rendered notifications via maxVisible')`
- `it('has correct ARIA (role=region, role=list, role=listitem, aria-live)')`
- `it('applies rounded variants')`
- `it('scrolls when content exceeds max-height')`
- `it('announces unread count in sr-only live region')`

### Visual Regression
- Notification center with mixed read/unread
- Empty state
- With many notifications (scrolling)
- Grouped by multiple types
