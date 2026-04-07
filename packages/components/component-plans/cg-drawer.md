# cg-drawer — Improvement Plan

## Current State

### CSS Audit
| Property | Current | Issue |
|---|---|---|
| Panel transition | `300ms var(--cg-motion-easing-bounce)` | OK (tokenized) |
| Backdrop transition | tokenized | OK |
| Close button styles | Fully tokenized | OK — matches design system |
| Header padding | tokenized | OK |
| Body padding | tokenized | OK |
| Loading overlay | tokenized | OK |
| Error banner | tokenized | OK |
| Border | `var(--cg-color-surface-base-border)` | OK |
| Rounded variants | Fully tokenized per side | OK |

### States Audit
| State | Supported | Notes |
|---|---|---|
| Default (closed) | Yes | Panel translated off-screen |
| Open | Yes | Slide-in with bounce easing |
| Closing | Yes | Exit animation via `_closing` state |
| Loading | Yes | Overlay with spinner |
| Error | Yes | Banner with alert role |
| Persistent | Yes | Backdrop click disabled |
| Non-closable | Yes | Close button hidden, Escape disabled |
| Left side | Yes | Slides from left |
| Right side | Yes | Slides from right |
| Full width | Yes | 100vw, no radius |
| Disabled | No | Missing — no disabled prop |

### Interaction Audit
| Feature | Status | Notes |
|---|---|---|
| Escape to close | OK | Via document keydown listener |
| Backdrop click close | OK | Respects persistent |
| Focus trap | OK | Includes both shadow and light DOM focusable elements |
| Focus restore | OK | Returns focus to `_previousFocus` |
| Scroll lock | OK | Body overflow hidden |
| Cleanup on disconnect | OK | Removes listener, restores overflow |

### Accessibility Audit
| Item | Status | Notes |
|---|---|---|
| `role="dialog"` | OK | On panel |
| `aria-modal="true"` | OK | Present |
| `aria-label` | OK | Falls back to "Side panel" |
| Close button aria-label | OK | "Close panel" |
| Error `role="alert"` | OK | Present |
| Loading `aria-busy` | OK | Present |
| Footer slot | Missing | No footer slot for action buttons |
| `aria-labelledby` | Missing | Should reference drawer title by id |

## Style Fixes Needed
1. Add `aria-labelledby` pointing to an id on the drawer title h2
2. No major CSS token issues — this component is well-tokenized
3. Consider adding a footer slot (for action buttons) matching cg-modal pattern

## Interaction Fixes Needed
1. Add footer slot for action buttons (consistency with cg-modal)
2. Add `aria-labelledby` referencing the title element
3. Consider adding a `top` and `bottom` side option for vertical drawers

## Test Spec

### Unit Tests
- `it('renders closed by default with panel off-screen')`
- `it('opens when open attribute is set and fires cg-drawer-open')`
- `it('closes when open is removed and fires cg-drawer-close')`
- `it('slides from right when side="right"')`
- `it('slides from left when side="left"')`
- `it('plays closing animation before hiding')`
- `it('closes on Escape key when closable')`
- `it('does not close on Escape when closable is false')`
- `it('closes on backdrop click when not persistent')`
- `it('does not close on backdrop click when persistent')`
- `it('locks body scroll when opened')`
- `it('restores body scroll when closed')`
- `it('restores body scroll when disconnected while open')`
- `it('traps focus within drawer (includes light DOM)')`
- `it('restores focus to previous element on close')`
- `it('renders error banner with role=alert')`
- `it('renders loading overlay with aria-busy')`
- `it('applies size variants (sm/md/lg/full)')`
- `it('applies rounded variants')`
- `it('has correct ARIA attributes (role=dialog, aria-modal, aria-label)')`
- `it('removes document keydown listener on close')`
- `it('removes document keydown listener on disconnect')`

### Visual Regression
- Drawer right at each size
- Drawer left at each size
- Drawer with error banner
- Drawer with loading overlay
- Drawer full-width variant
