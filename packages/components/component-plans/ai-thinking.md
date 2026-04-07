# ai-thinking — Improvement Plan

## Current State

### CSS Audit
| Property | Current | Issue |
|---|---|---|
| `.container` background | `rgba(255, 255, 255, 0.03)` | Raw RGBA — should use overlay token |
| `.container` border | `1px solid rgba(255, 255, 255, 0.06)` | Raw RGBA — needs token |
| `.container` border-radius | `8px` | Should use `var(--cg-border-radius-100, 8px)` |
| `.container` padding | `10px 14px` | Should use spacing tokens |
| `.icon` size | `20px`, `16px`, `28px` | Should use spacing tokens |
| `.icon::after` sizes | `8px`, `6px`, `12px` | Should use spacing tokens |
| `.text` font-size | `14px` | Should use `var(--cg-font-size-sm, 14px)` |
| `.text` color | `#a3a3a3` | Raw hex — should use `var(--cg-color-surface-secondary-text)` |
| `.dot` size | `6px` | Should use `var(--cg-spacing-6, 6px)` |
| `.ring` size | `20px`, `14px`, `28px` | Should use spacing tokens |
| `.skeleton-line` height | `12px`, `8px`, `16px` | Should use spacing tokens |
| `.progress-bar` height | `3px` | Should use `var(--cg-spacing-3, 3px)` or border-width token |
| `.progress-fill` transition | `width 300ms ease` | Should use motion token |
| `.tool` padding | tokenized | OK |
| `.cancel` padding | tokenized | OK |
| Stage interval | `2500` ms hardcoded in JS | Could be a configurable prop |

### States Audit
| State | Supported | Notes |
|---|---|---|
| Dots variant | Yes | Spinning icon + bouncing dots |
| Spinner variant | Yes | Ring spinner |
| Skeleton variant | Yes | Shimmer lines |
| Size sm | Yes | Inline |
| Size md | Yes | Block |
| Size lg | Yes | Full-width, column layout |
| Shimmer text | Yes | Gradient text effect |
| Stage cycling | Yes | Automatic text cycling |
| Tool call badges | Yes | Loading/complete/error states |
| Cancel button | Yes | Optional |
| Progress bar | Yes | Determinate 0-100 |
| Display delay | Yes | Configurable ms delay |
| Hidden | Yes | Via `_visible` state |
| Reduced motion | Yes | Animations stopped |

### Interaction Audit
| Feature | Status | Notes |
|---|---|---|
| Cancel button | OK | Fires `ai-thinking-cancel` |
| Stage cycling | OK | Auto-cycles every 2.5s |
| Stage change event | OK | `ai-thinking-stage-change` |
| Display delay | OK | Prevents flash for fast ops |
| Tool icon per status | OK | Check/X/spinner |

### Accessibility Audit
| Item | Status | Notes |
|---|---|---|
| `role="status"` | OK | On container |
| `aria-live="polite"` | OK | Present |
| `aria-label` | OK | Uses display text |
| Cancel `aria-label` | OK | "Cancel" |
| Progress `role="progressbar"` | OK | With aria-valuenow/min/max |
| Icon `aria-hidden` | OK | Decorative |
| Hidden state | OK | Returns `nothing` when not visible |

## Style Fixes Needed
1. Replace `.container` background with `var(--cg-overlay-white-faint, rgba(255, 255, 255, 0.03))`
2. Replace `.container` border with `1px solid var(--cg-color-surface-elevated-border, rgba(255, 255, 255, 0.06))`
3. Tokenize `.container` border-radius and padding
4. Replace `.text` color `#a3a3a3` with `var(--cg-color-surface-secondary-text, #a3a3a3)`
5. Tokenize `.text` font-size
6. Tokenize all size-specific dimensions (icon, ring, skeleton-line)
7. Tokenize `.dot` size
8. Tokenize progress-bar height and transition duration

## Interaction Fixes Needed
1. Add configurable prop for stage cycling interval (default 2500ms)
2. Consider pausing stage cycling when tab is not visible (Page Visibility API)
3. Add `aria-busy="true"` on the host element

## Test Spec

### Unit Tests
- `it('renders dots variant by default')`
- `it('renders spinner variant')`
- `it('renders skeleton variant')`
- `it('applies size variants (sm/md/lg)')`
- `it('displays custom text')`
- `it('enables shimmer text effect')`
- `it('cycles through stages at interval')`
- `it('fires ai-thinking-stage-change on cycle')`
- `it('renders cancel button when cancelable')`
- `it('fires ai-thinking-cancel on cancel click')`
- `it('renders tool call badges with correct status')`
- `it('renders progress bar when progress >= 0')`
- `it('hides component during delay period')`
- `it('shows component after delay period')`
- `it('cleans up timers on disconnect')`
- `it('has role=status and aria-live=polite')`
- `it('has progress bar ARIA attributes')`
- `it('stops animations in reduced-motion mode')`

### Visual Regression
- Dots variant at all sizes
- Spinner variant
- Skeleton variant
- With tool call badges (mixed statuses)
- With progress bar at 50%
- With shimmer text effect
