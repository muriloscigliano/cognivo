# ai-avatar — Improvement Plan

## Current State

### CSS Audit
| Property | Status | Notes |
|---|---|---|
| Colors | PASS | All use `--cg-*` tokens with status and type semantics |
| Spacing | PASS | Uses `--cg-spacing-*` tokens (implicit via size) |
| Font sizes | WARN | `:host([size="sm"]) .inner { font-size: 10px }` — raw pixel |
| Font weights | WARN | `.inner { font-weight: 600 }` — raw value |
| Border radii | PASS | Uses `50%` for circles — correct |
| Motion | WARN | Host animation `200ms` without token |
| Shimmer | PASS | Uses `shimmerKeyframes` for loading skeleton |
| Fixed sizes | WARN | All sizes use raw pixels: 28/22, 40/34, 56/48, 8/10/14 for dots |
| Status dot border | WARN | `.status-dot { border: 2px solid }` — raw value |
| Host animation | WARN | `200ms` without explicit motion token |

### States Audit
| State | Implemented | Notes |
|---|---|---|
| With image | YES | Shows image in circle |
| Image loading | YES | Skeleton shimmer animation |
| Image error | YES | Falls back to initials |
| No image | YES | Shows initials from name |
| Size sm | YES | 28px ring, 22px inner |
| Size md | YES | 40px ring, 34px inner (default) |
| Size lg | YES | 56px ring, 48px inner |
| Type user | YES | Blue ring |
| Type agent | YES | Accent/green ring |
| Type system | YES | Grey ring |
| Status online | YES | Green dot |
| Status away | YES | Yellow dot |
| Status busy | YES | Red dot |
| Status offline | YES | Grey dot |
| No status | YES | No dot rendered |
| Hover | NO | No hover state (button but no hover styling) |
| Focus | YES | Focus-visible outline |
| Active/Pressed | NO | No `:active` state |
| Disabled | NO | No disabled state |

### Interaction Audit
| Interaction | Status | Notes |
|---|---|---|
| Click | YES | Fires `ai-avatar-click` with name + type |
| Button role | YES | Uses `<button>` element with `role="img"` |
| Keyboard | YES | Native button keyboard handling |
| Alt text | YES | Image has `alt` attribute |
| Status label | YES | Status dot has `aria-label` |
| Image load/error | YES | Handles both lifecycle events |

## Style Fixes Needed
1. Replace `font-size: 10px` with `var(--cg-font-size-2xs, 10px)` for sm size
2. Replace `font-weight: 600` with `var(--cg-font-weight-semibold, 600)`
3. Replace all fixed pixel sizes with token references or CSS custom properties
4. Replace `border: 2px solid` on status-dot with token-based border width
5. Replace host animation `200ms` with `var(--cg-motion-duration-fast, 200ms)`
6. Add hover state on avatar (slight scale or brightness)
7. Add `:active` press scale
8. Status dot sizes should use `--cg-spacing-*` tokens

## Interaction Fixes Needed
1. `role="img"` on a `<button>` is semantically incorrect — a button with `role="img"` means it's treated as an image, losing button semantics. Use `role="button"` or just let the button be a button with `aria-label`
2. Add disabled state (greyed out, no click)
3. Add hover visual feedback
4. Image `alt` should fall back to empty string for decorative avatars when used inline
5. Consider adding `xl` size option
6. Status dot needs better contrast against dark backgrounds — add a slight shadow or increase border
7. Image `src` update resets load state (already implemented — good)

## Test Spec
| # | Test Case | Type |
|---|---|---|
| 1 | Renders initials when no src | Unit |
| 2 | Initials are first letter of first two words | Unit |
| 3 | Single-word name gives single initial | Unit |
| 4 | Renders image when src provided | Unit |
| 5 | Shows skeleton during image load | Unit |
| 6 | Falls back to initials on image error | Unit |
| 7 | Size sm applies correct dimensions | Unit |
| 8 | Size md applies correct dimensions | Unit |
| 9 | Size lg applies correct dimensions | Unit |
| 10 | Type user shows blue ring | Unit |
| 11 | Type agent shows accent ring | Unit |
| 12 | Type system shows grey ring | Unit |
| 13 | Status online shows green dot | Unit |
| 14 | Status away shows yellow dot | Unit |
| 15 | Status busy shows red dot | Unit |
| 16 | Status offline shows grey dot | Unit |
| 17 | No status hides dot | Unit |
| 18 | Click fires `ai-avatar-click` | Event |
| 19 | Event detail includes name and type | Event |
| 20 | Focus-visible outline on avatar | A11y |
| 21 | Image has alt attribute | A11y |
| 22 | Status dot has aria-label | A11y |
| 23 | Snapshot: each size/type combo | Visual |
