# cg-tooltip — Improvement Plan

## Current State

### CSS Audit
| Property | Current | Issue |
|---|---|---|
| Tooltip background | `var(--cg-color-surface-container-background, #27272a)` | OK |
| Tooltip border | `1px solid var(--cg-color-surface-hover-background, #3f3f46)` | OK |
| Tooltip padding | `var(--cg-spacing-6) var(--cg-spacing-10)` | OK |
| Arrow background | `var(--cg-color-surface-overlay-background, #27272a)` | Mismatch — tooltip uses `container-background`, arrow uses `overlay-background` |
| Arrow size | `var(--cg-spacing-8, 8px)` | OK |
| Negative offsets | `var(--cg-spacing-4-neg, -4px)` | OK |
| Animation duration | `var(--cg-motion-duration-slow, 150ms)` | OK |
| Error variant colors | tokenized | OK |
| Success variant colors | tokenized | OK |
| Max-width | `var(--cg-tooltip-max-width, 280px)` | OK — customizable |
| Rounded variants | tokenized | OK |

### States Audit
| State | Supported | Notes |
|---|---|---|
| Hidden | Yes | Opacity 0, scale 0.92 |
| Visible | Yes | Opacity 1, scale 1 |
| Closing | Yes | Exit animation |
| Disabled | Yes | `disabled` prop prevents showing |
| Viewport-adjusted | Yes | Position flips when off-screen |
| Error variant | Yes | Red styling |
| Success variant | Yes | Green styling |

### Interaction Audit
| Feature | Status | Notes |
|---|---|---|
| Mouse hover show | OK | `mouseenter` on trigger-wrap |
| Mouse leave hide | OK | `mouseleave` on trigger-wrap |
| Focus show | OK | `focusin` on trigger-wrap |
| Focus out hide | OK | `focusout` on trigger-wrap |
| Escape to hide | OK | Document keydown listener |
| Delay | OK | Configurable via `delay` prop |
| Viewport detection | OK | Adjusts position after layout |
| Touch support | Missing | No `touchstart`/`longpress` handling |

### Accessibility Audit
| Item | Status | Notes |
|---|---|---|
| `role="tooltip"` | OK | Present |
| `aria-describedby` | OK | On trigger-wrap, points to tooltip id |
| `aria-hidden` | OK | Toggle with visibility |
| Escape dismissal | OK | Present |
| Keyboard access | Partial | Shows on focusin but no explicit keyboard trigger |

## Style Fixes Needed
1. Arrow background token should match tooltip background token: change `--cg-color-surface-overlay-background` to `--cg-color-surface-container-background`
2. Arrow border is missing — arrow pokes through without matching border, creating a visual seam

## Interaction Fixes Needed
1. Add touch device support — longpress to show, tap elsewhere to dismiss
2. Arrow border should match tooltip border for visual consistency
3. Consider adding `interactive` prop for tooltips that contain links or buttons (pointer-events: auto)
4. Rich content slot should set `white-space: normal` on the tooltip itself when slot has content

## Test Spec

### Unit Tests
- `it('renders tooltip hidden by default')`
- `it('shows tooltip on mouse hover after delay')`
- `it('hides tooltip on mouse leave')`
- `it('shows tooltip on focus')`
- `it('hides tooltip on blur')`
- `it('dismisses tooltip on Escape key')`
- `it('respects disabled prop — does not show when disabled')`
- `it('renders string content from content prop')`
- `it('renders rich content from named slot')`
- `it('adjusts position when tooltip would overflow viewport')`
- `it('positions correctly for top/bottom/left/right')`
- `it('applies error variant styling')`
- `it('applies success variant styling')`
- `it('respects configurable delay')`
- `it('has correct ARIA attributes (role=tooltip, aria-describedby)')`
- `it('cleans up timers on disconnect')`
- `it('removes escape keydown listener on disconnect')`
- `it('applies rounded variants')`

### Visual Regression
- Tooltip in each position (top/bottom/left/right)
- Tooltip error variant
- Tooltip success variant
- Tooltip with rich slot content
