# cg-progress-bar — Improvement Plan

## Current State

### CSS Audit
| Property | Current | Issue |
|---|---|---|
| `.track` background | `rgba(255, 255, 255, 0.1)` | Raw RGBA — should use overlay token |
| `.track` border-radius | `9999px` | Should use `var(--cg-border-radius-full, 9999px)` |
| `.fill` border-radius | `9999px` | Same — needs token |
| `.fill` transition | `width 500ms cubic-bezier(0.4, 0, 0.2, 1)` | Duration should use `var(--cg-motion-duration-slow, 500ms)` |
| Size heights | `3px`, `6px`, `10px` | Magic numbers — could be tokenized |
| Striped `background-size` | `20px 20px` | Magic number |
| Indeterminate `width: 40% !important` | Hardcoded | Could use CSS custom property |
| `.header` margin-bottom | `var(--cg-spacing-4, 4px)` | OK |
| `.label` font properties | tokenized | OK |
| `.value-text` font properties | tokenized | OK |
| `stripe-move` `background-position: 20px` | Hardcoded, matches background-size | OK (coupled) |
| Variant colors | All tokenized | OK |

### States Audit
| State | Supported | Notes |
|---|---|---|
| Default (0%) | Yes | Empty track |
| Partial fill | Yes | Width% based on value |
| Complete (100%) | Yes | Full bar |
| Indeterminate | Yes | Sliding animation |
| With label | Yes | Header with label text |
| With value display | Yes | Percentage text |
| Variant default | Yes | Accent color |
| Variant success | Yes | Green |
| Variant warning | Yes | Yellow |
| Variant danger | Yes | Red |
| Striped | Yes | Diagonal stripe overlay |
| Animated stripes | Yes | Moving stripe animation |
| Reduced motion | Yes | Pulse instead of slide for indeterminate |

### Interaction Audit
| Feature | Status | Notes |
|---|---|---|
| No interactive behavior | N/A | Display-only indicator |
| Value clamping | OK | 0-100 range enforced |

### Accessibility Audit
| Item | Status | Notes |
|---|---|---|
| `role="progressbar"` | OK | On track |
| `aria-valuenow` | OK | Set to clamped value (omitted for indeterminate) |
| `aria-valuemin` | OK | "0" |
| `aria-valuemax` | OK | "100" |
| `aria-label` | OK | Falls back to "Progress" |
| `aria-busy` | OK | Set on indeterminate |

## Style Fixes Needed
1. Replace `.track` background with `var(--cg-overlay-white-faint, rgba(255, 255, 255, 0.1))`
2. Replace `.track` and `.fill` border-radius with `var(--cg-border-radius-full, 9999px)`
3. Tokenize `.fill` transition duration to `var(--cg-motion-duration-slow, 500ms)`
4. Consider tokenizing size heights (sm: 3px, md: 6px, lg: 10px) with CSS custom props
5. Tokenize stripe `background-size` if possible

## Interaction Fixes Needed
1. No interaction issues — component is well-implemented
2. Consider adding `aria-valuetext` for custom text representation (e.g., "65% complete")

## Test Spec

### Unit Tests
- `it('renders with default variant and size')`
- `it('renders fill bar at correct width based on value')`
- `it('clamps value between 0 and 100')`
- `it('renders label when provided')`
- `it('renders value text when showValue is true')`
- `it('hides value text when indeterminate')`
- `it('applies variant colors (default/success/warning/danger)')`
- `it('applies size variants (sm/md/lg)')`
- `it('renders striped pattern when striped')`
- `it('animates stripes when animated')`
- `it('renders indeterminate sliding animation')`
- `it('uses pulse animation for indeterminate in reduced-motion')`
- `it('has correct ARIA attributes (role=progressbar, aria-valuenow, etc.)')`
- `it('omits aria-valuenow when indeterminate')`

### Visual Regression
- Progress at 0%, 25%, 50%, 75%, 100%
- All color variants
- Indeterminate state
- Striped + animated variant
- With label and value display
