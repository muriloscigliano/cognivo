# ai-toast — Improvement Plan

## Current State

### CSS Audit
| Property | Current | Issue |
|---|---|---|
| `.toast` padding | `12px 16px` | Should use `var(--cg-spacing-12) var(--cg-spacing-16)` |
| `.toast` border-radius | `8px` | Should use `var(--cg-border-radius-100, 8px)` |
| `.toast` background | `#111` | Raw hex — should use `var(--cg-color-surface-elevated, #111111)` |
| `.toast` border | `1px solid rgba(255, 255, 255, 0.1)` | Raw RGBA — needs token |
| `.message` font-size | `14px` | Should use `var(--cg-font-size-sm, 14px)` |
| `.message` color | `#fafafa` | Raw hex — needs token |
| `.message` line-height | `1.5` | Should use `var(--cg-line-height-normal, 1.5)` |
| `.dismiss:hover` color | `#fafafa` | Raw hex |
| `.dismiss:hover` background | `rgba(255, 255, 255, 0.05)` | Raw RGBA |
| SlideIn/Out `translateX(20px)` | Hardcoded | Should use spacing token |
| Animation durations | `250ms`, `200ms` hardcoded | Should use motion tokens |
| Icon backgrounds | Tokenized with status tokens | OK |
| Progress bar background | Status color tokens | OK |
| Stack gap/dimensions | tokenized | OK |

### States Audit
| State | Supported | Notes |
|---|---|---|
| Info type | Yes | Blue icon |
| Success type | Yes | Green icon |
| Warning type | Yes | Yellow icon |
| Error type | Yes | Red icon |
| AI type | Yes | Brand accent icon |
| Entering | Yes | slideIn animation |
| Dismissing | Yes | slideOut animation |
| Auto-dismiss | Yes | Timer-based |
| Manual dismiss | Yes | X button |
| Progress bar | Yes | Shrinking countdown |
| No duration (persistent) | Yes | duration=0 |
| Queue cap | Yes | Max 8 toasts |
| Empty | Yes | Returns nothing |

### Interaction Audit
| Feature | Status | Notes |
|---|---|---|
| `show()` imperative API | OK | Returns toast ID |
| `dismiss()` API | OK | By ID |
| `clear()` API | OK | Removes all |
| Auto-dismiss timer | OK | Configurable duration |
| Queue management | OK | Oldest dismissed when at cap |
| Dismiss event | OK | `ai-toast-dismiss` with reason |
| Position variants | OK | 4 corner positions |

### Accessibility Audit
| Item | Status | Notes |
|---|---|---|
| `role="region"` | OK | On stack |
| `aria-label` | OK | "Notifications" |
| `aria-live="assertive"` | OK | For urgent notifications |
| Dismiss `aria-label` | OK | "Dismiss notification" |
| Focus-visible on dismiss | OK | Brand accent outline |
| Toast type announcement | Missing | Type not announced to SR |
| Pause on hover | Missing | Timer continues even when hovered |

## Style Fixes Needed
1. Replace `.toast` background `#111` with `var(--cg-color-surface-elevated, #111111)`
2. Replace `.toast` border with token
3. Tokenize `.toast` padding and border-radius
4. Replace `.message` color/font-size/line-height with tokens
5. Replace `.dismiss:hover` raw values with tokens
6. Tokenize slideIn/Out translate distance
7. Tokenize animation durations with motion tokens

## Interaction Fixes Needed
1. Add pause-on-hover: stop auto-dismiss timer when mouse is over toast
2. Add type prefix to screen reader announcement (e.g., "Error: Something failed")
3. Consider `aria-live="polite"` for non-error types (assertive is aggressive)
4. Add swipe-to-dismiss for touch devices
5. Add `role="alert"` for error toasts specifically

## Test Spec

### Unit Tests
- `it('renders nothing when no toasts')`
- `it('shows toast via show() and returns ID')`
- `it('renders correct icon per type (info/success/warning/error/ai)')`
- `it('auto-dismisses after duration')`
- `it('does not auto-dismiss when duration is 0')`
- `it('dismisses specific toast via dismiss(id)')`
- `it('clears all toasts via clear()')`
- `it('fires ai-toast-dismiss with reason on auto-dismiss')`
- `it('fires ai-toast-dismiss with reason on manual dismiss')`
- `it('plays slideIn animation on enter')`
- `it('plays slideOut animation on dismiss')`
- `it('renders progress bar when duration > 0')`
- `it('limits queue to max 8 toasts')`
- `it('dismisses oldest when queue is full')`
- `it('applies position variants (top-right/top-left/bottom-right/bottom-left)')`
- `it('applies rounded variants')`
- `it('has correct ARIA (role=region, aria-live, dismiss aria-label)')`
- `it('cleans up all timers on disconnect')`

### Visual Regression
- Toast stack with all 5 types
- Top-left position
- Bottom-right position
- Dismissing animation
