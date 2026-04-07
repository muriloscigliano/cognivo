# cg-spinner — Improvement Plan

## Current State

### CSS Audit
| Property | Current | Issue |
|---|---|---|
| `.spinner` border-color | `rgba(255, 255, 255, 0.1)` | Raw RGBA — should use `var(--cg-color-surface-base-border)` or overlay token |
| `.spinner` animation | `spin 0.75s linear infinite` | Duration should use `var(--cg-motion-duration-spinner, 0.75s)` |
| Size dimensions (xs-xl) | `12px`, `16px`, `20px`, `32px`, `48px` | Magic numbers — should use spacing tokens |
| Size border-widths | `2px`, `3px` | Should use `var(--cg-border-width-100)` / `var(--cg-border-width-200)` |
| Reduced motion pulse | `spinnerPulse 2s` | Duration should be tokenized |

### States Audit
| State | Supported | Notes |
|---|---|---|
| Default spinning | Yes | CSS animation |
| Size xs | Yes | 12px |
| Size sm | Yes | 16px |
| Size md | Yes | 20px (default) |
| Size lg | Yes | 32px |
| Size xl | Yes | 48px |
| Color default | Yes | Secondary text |
| Color accent | Yes | Brand accent |
| Color white | Yes | Primary text |
| Reduced motion | Yes | Pulse instead of spin |
| Hidden | No | No `hidden` attribute handling |

### Interaction Audit
| Feature | Status | Notes |
|---|---|---|
| No interactive behavior | N/A | Display-only component |

### Accessibility Audit
| Item | Status | Notes |
|---|---|---|
| `role="status"` | OK | On spinner div |
| `aria-label` | OK | Configurable via `label` prop |
| `.sr-only` text | OK | Visually hidden but accessible |
| Duplicate announcement | Issue | Both `aria-label` and sr-only text — may double-announce |

## Style Fixes Needed
1. Replace `.spinner` border-color `rgba(255, 255, 255, 0.1)` with `var(--cg-color-surface-base-border, rgba(255, 255, 255, 0.1))`
2. Tokenize animation duration to `var(--cg-motion-duration-spinner, 0.75s)`
3. Tokenize size dimensions with spacing tokens (`var(--cg-spacing-12)`, `var(--cg-spacing-16)`, etc.)
4. Tokenize border-widths with border-width tokens
5. Tokenize reduced-motion pulse duration

## Interaction Fixes Needed
1. Remove either `aria-label` or the sr-only span to avoid double announcement — prefer keeping `aria-label` and making sr-only a fallback
2. Add `:host([hidden]) { display: none; }` for hidden attribute support

## Test Spec

### Unit Tests
- `it('renders spinner with default size md')`
- `it('renders spinner with default color accent')`
- `it('applies size variants (xs/sm/md/lg/xl)')`
- `it('applies color variants (default/accent/white)')`
- `it('has role=status on spinner element')`
- `it('reads configurable aria-label')`
- `it('has sr-only text for screen readers')`
- `it('spins with CSS animation')`
- `it('uses pulse animation in reduced-motion mode')`

### Visual Regression
- All size variants in a row
- All color variants
- Reduced motion state (screenshot)
