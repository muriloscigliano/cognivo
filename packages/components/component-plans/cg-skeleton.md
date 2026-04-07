# cg-skeleton — Improvement Plan

## Current State

### CSS Audit
| Property | Current | Issue |
|---|---|---|
| `.skeleton` background | `rgba(255, 255, 255, 0.06)` | Raw RGBA — should use overlay token |
| `skeletonPulse` duration | `2s` | Should use motion token |
| `.rectangular` border-radius | `6px` | Magic number — should use `var(--cg-border-radius-75, 6px)` |
| `.circular` border-radius | `50%` | OK |
| `.text-line` border-radius | `4px` | Should use `var(--cg-border-radius-50, 4px)` |
| `.text-line` height | `14px` | Magic number — should use `var(--cg-spacing-14, 14px)` |
| `.text-line + .text-line` margin-top | `8px` | Should use `var(--cg-spacing-8, 8px)` |
| Line width overrides | `60%`, `90%` with `!important` | Aggressive — should use pseudo-random pattern without `!important` |
| Reduced motion override | `!important` twice | Necessary for reduced-motion but heavy-handed |
| Shimmer keyframes | Imported but unused | `shimmerKeyframes` imported in styles array but only `skeletonPulse` is used |

### States Audit
| State | Supported | Notes |
|---|---|---|
| Rectangular | Yes | Default shape |
| Circular | Yes | 50% border-radius |
| Text (multi-line) | Yes | Variable widths |
| Animated | Yes | Pulse animation (default) |
| Static (animated=false) | Yes | No animation |
| Configurable dimensions | Yes | Width/height props |
| Multi-line text | Yes | Lines prop (1-20) |
| Reduced motion | Yes | Animation stopped |

### Interaction Audit
| Feature | Status | Notes |
|---|---|---|
| No interactive behavior | N/A | Display-only placeholder |

### Accessibility Audit
| Item | Status | Notes |
|---|---|---|
| `role="status"` | OK | Present |
| `aria-label` | OK | "Loading content" |
| `aria-busy` | Missing | Should add `aria-busy="true"` for loading state |

## Style Fixes Needed
1. Replace `.skeleton` background with `var(--cg-overlay-white-subtle, rgba(255, 255, 255, 0.06))`
2. Tokenize `skeletonPulse` duration
3. Replace `.rectangular` border-radius with `var(--cg-border-radius-75, 6px)`
4. Replace `.text-line` border-radius with `var(--cg-border-radius-50, 4px)`
5. Tokenize `.text-line` height to `var(--cg-spacing-14, 14px)`
6. Tokenize `.text-line + .text-line` margin-top to `var(--cg-spacing-8, 8px)`
7. Remove unused `shimmerKeyframes` import or switch to shimmer animation (currently using pulse)
8. Consider replacing `!important` width overrides with CSS custom properties per line

## Interaction Fixes Needed
1. Add `aria-busy="true"` to the container
2. Consider adding a shimmer variant as an alternative to pulse (the import is there, just unused)

## Test Spec

### Unit Tests
- `it('renders rectangular skeleton by default')`
- `it('renders circular skeleton when variant="circular"')`
- `it('renders text lines when variant="text"')`
- `it('renders correct number of text lines from lines prop')`
- `it('clamps lines between 1 and 20')`
- `it('applies custom width and height')`
- `it('uses default height per variant when height not specified')`
- `it('animates by default')`
- `it('disables animation when animated=false')`
- `it('has role=status on container')`
- `it('has aria-label "Loading content"')`
- `it('applies rounded variants')`
- `it('text lines have varying widths for realism')`
- `it('stops animation in reduced-motion mode')`

### Visual Regression
- Rectangular skeleton (default)
- Circular skeleton
- Text skeleton with 3 lines
- Text skeleton with 1 line
- Static (no animation) skeleton
