# cg-modal — Improvement Plan

## Current State

### CSS Audit
| Property | Current | Issue |
|---|---|---|
| `.backdrop` background | `rgba(0, 0, 0, 0.5)` | Raw RGBA — should use `var(--cg-overlay-backdrop)` |
| `.modal` background | `var(--cg-color-surface-elevated, #111111)` | OK (token) |
| `.modal` border | `1px solid rgba(255, 255, 255, 0.1)` | Raw RGBA — needs `var(--cg-color-surface-elevated-border)` |
| `.modal` border-radius | `12px` | Magic number — should use `var(--cg-border-radius-150, 12px)` |
| `.modal-header` padding | `20px 24px` | Magic numbers — should use spacing tokens |
| `.modal-header` border-bottom | `rgba(255, 255, 255, 0.08)` | Raw RGBA — needs border token |
| `.modal-body` padding | `24px` | Should be `var(--cg-spacing-24, 24px)` |
| `.modal-body` font-size | `14px` | Should be `var(--cg-font-size-sm, 14px)` |
| `.modal-body` line-height | `1.6` | Should be `var(--cg-line-height-relaxed, 1.625)` |
| `.modal-footer` padding | `16px 24px` | Should use spacing tokens |
| `.modal-footer` gap | `8px` | Should be `var(--cg-spacing-8, 8px)` |
| `.modal-footer` border-top | `rgba(255, 255, 255, 0.08)` | Raw RGBA |
| `.close-btn:hover` background | `rgba(255, 255, 255, 0.05)` | Should use `var(--cg-color-surface-hover-background)` |
| `.close-btn:focus-visible` box-shadow | `rgba(223, 255, 97, 0.25)` | Should use double-ring pattern from drawer |
| Backdrop transition duration | `200ms cubic-bezier(...)` | Should use motion tokens |
| Modal animation timings | `200ms`, `250ms` hardcoded | Should use motion duration tokens |
| Sizes (sm/md/lg/xl) widths | `400px`, `560px`, `720px`, `960px` | Raw px — could be CSS custom props for override |
| `max-height` | `calc(100vh - 48px * 2)` | `48px` is a magic number |

### States Audit
| State | Supported | Notes |
|---|---|---|
| Default (closed) | Yes | `display: contents`, invisible |
| Open | Yes | Scale+fade animation |
| Closing | Yes | Exit animation via `_closing` state |
| Loading | Yes | Overlay with spinner |
| Error | Yes | Banner with alert role |
| Persistent | Yes | Backdrop click disabled |
| Non-closable | Yes | No close button, Escape disabled |
| Disabled | No | Missing — no disabled prop for the entire modal |
| Focus trapped | Yes | Tab key cycles through focusable elements |

### Interaction Audit
| Feature | Status | Notes |
|---|---|---|
| Escape to close | OK | Respects `closable` prop |
| Backdrop click close | OK | Respects `persistent` prop |
| Focus trap | Partial | Does not account for slotted light DOM focusable elements |
| Focus restore | OK | Returns focus to `_previousFocus` on close |
| Scroll lock | OK | `document.body.style.overflow = 'hidden'` |
| Footer slot check | OK | Hide footer when empty |
| Keyboard nav | Partial | Only Tab/Escape — no support for slotted content focus trap |

### Accessibility Audit
| Item | Status | Notes |
|---|---|---|
| `role="dialog"` | OK | Present on `.modal` |
| `aria-modal="true"` | OK | Present |
| `aria-label` | OK | Falls back to "Dialog" |
| Close button `aria-label` | OK | "Close dialog" |
| Error `role="alert"` | OK | Present |
| Loading `aria-busy` | OK | Present |
| `aria-labelledby` | Missing | Should reference the title h2 element by id |

## Style Fixes Needed
1. Replace `.backdrop` background with `var(--cg-overlay-backdrop, rgba(0, 0, 0, 0.5))`
2. Replace `.modal` border with `1px solid var(--cg-color-surface-elevated-border, rgba(255, 255, 255, 0.1))`
3. Replace `.modal` border-radius `12px` with `var(--cg-border-radius-150, 12px)`
4. Tokenize `.modal-header` padding to `var(--cg-spacing-20, 20px) var(--cg-spacing-24, 24px)`
5. Tokenize `.modal-header` border-bottom to use border token
6. Tokenize `.modal-body` padding, font-size, line-height
7. Tokenize `.modal-footer` padding, gap, border-top
8. Replace `.close-btn:hover` background with `var(--cg-color-surface-hover-background, rgba(255, 255, 255, 0.05))`
9. Upgrade `.close-btn:focus-visible` to double-ring pattern: `0 0 0 2px var(--cg-color-surface-base-background), 0 0 0 4px var(--cg-brand-ai-accent)`
10. Tokenize all animation durations via `var(--cg-motion-duration-*)` tokens
11. Add `var(--cg-spacing-48, 48px)` for max-height calc

## Interaction Fixes Needed
1. Focus trap should include slotted light DOM focusable elements (query `this.querySelectorAll` in addition to `this.shadowRoot.querySelectorAll`)
2. Add `aria-labelledby` pointing to an id on the title h2
3. Consider adding `aria-describedby` for error banner content
4. Modal should have `tabindex="-1"` on the container to receive programmatic focus when no focusable children exist (already present)

## Test Spec

### Unit Tests
- `it('renders closed by default with no visible backdrop or modal')`
- `it('opens when open attribute is set and fires cg-modal-open event')`
- `it('closes when open is removed and fires cg-modal-close event')`
- `it('plays closing animation before hiding')`
- `it('renders title in modal header')`
- `it('renders close button when closable is true')`
- `it('hides close button when closable is false')`
- `it('closes on Escape key when closable')`
- `it('does not close on Escape when closable is false')`
- `it('closes on backdrop click when not persistent')`
- `it('does not close on backdrop click when persistent')`
- `it('locks body scroll when opened')`
- `it('restores body scroll when closed')`
- `it('restores body scroll when disconnected while open')`
- `it('traps focus within modal (Tab cycles)')`
- `it('traps focus within modal (Shift+Tab reverse cycles)')`
- `it('restores focus to previously focused element on close')`
- `it('renders footer slot content')`
- `it('hides footer when no content is slotted')`
- `it('renders error banner with role=alert')`
- `it('renders loading overlay with spinner and aria-busy')`
- `it('applies size variants (sm/md/lg/xl)')`
- `it('applies rounded variants (none/sm/md/lg/full)')`
- `it('has correct ARIA attributes (role=dialog, aria-modal, aria-label)')`

### Visual Regression
- Open modal at each size (sm, md, lg, xl)
- Modal with error banner
- Modal with loading overlay
- Modal with footer content
- Modal with long scrollable body content
