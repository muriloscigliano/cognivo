# ai-ab-test — Improvement Plan

## Current State

### CSS Audit
| Property | Status | Notes |
|---|---|---|
| Colors | PASS | All use `--cg-*` tokens |
| Spacing | PASS | Uses `--cg-spacing-*` tokens |
| Font sizes | WARN | `.vote-btn { font-size: 12px }`, `.compare-btn { font-size: 12px }` — raw pixels |
| Font weights | WARN | `.title { font-weight: 600 }`, `.variant-label { font-weight: 700 }`, `.vote-btn { font-weight: 600 }`, `.compare-btn { font-weight: 700 }` — raw values |
| Border radii | PASS | Uses `--cg-border-radius-*` tokens |
| Motion | WARN | Host animation `200ms` without token, transitions use raw `150ms ease` and `200ms ease` |
| Letter-spacing | WARN | `.variant-label { letter-spacing: 0.05em }` — raw value |
| Min-height | WARN | `.variant { min-height: 80px }` — magic number |

### States Audit
| State | Implemented | Notes |
|---|---|---|
| Default | YES | Side-by-side variants with vote buttons |
| Winner selected | YES | Border highlight on winning variant |
| Swapped | YES | Variants swap positions |
| Hover | YES | Vote/swap buttons hover styling |
| Focus | YES | Focus-visible outlines on all buttons |
| Active/Pressed | NO | No `:active` press state on buttons |
| Disabled | NO | No disabled state |
| Loading | NO | No loading/skeleton state |
| Tie | YES | Tie option in vote buttons |
| Empty variants | NO | No empty state when no content provided |

### Interaction Audit
| Interaction | Status | Notes |
|---|---|---|
| Vote A/B/Tie | YES | Fires `ai-ab-vote` with winner |
| Swap | YES | Swaps variant positions, resets winner |
| Compare | YES | Fires `ai-ab-compare` |
| Keyboard | YES | Native button handling |
| ARIA group | YES | `role="group"` on container and vote actions |
| ARIA pressed | YES | `aria-pressed` on vote buttons |

## Style Fixes Needed
1. Replace `font-size: 12px` with `var(--cg-font-size-xs, 12px)` on vote/compare buttons
2. Replace `font-weight: 600` with `var(--cg-font-weight-semibold, 600)` throughout
3. Replace `font-weight: 700` with `var(--cg-font-weight-bold, 700)` throughout
4. Replace host animation `200ms` with `var(--cg-motion-duration-fast, 200ms)`
5. Replace transition `150ms ease` with token-based motion
6. Replace `letter-spacing: 0.05em` with `var(--cg-letter-spacing-wide, 0.05em)`
7. Replace `min-height: 80px` with token or CSS custom property
8. Add `:active` press state on buttons
9. Add `rounded` attribute variant support
10. Add `font-family: inherit` to vote and compare buttons

## Interaction Fixes Needed
1. Add loading state for when variants are being generated
2. Add disabled state preventing interaction
3. Add empty state when `variantA` or `variantB` is empty
4. Vote buttons should use `role="radiogroup"` pattern for the A/B/Tie choice
5. Swap button should have more descriptive aria-label ("Swap variant positions")
6. Consider adding diff view mode when Compare is clicked
7. `title` property overrides HTMLElement.title — may cause issues; consider renaming to `heading`

## Test Spec
| # | Test Case | Type |
|---|---|---|
| 1 | Renders both variants side by side | Unit |
| 2 | Labels display correctly | Unit |
| 3 | Title displays in header | Unit |
| 4 | Vote A fires `ai-ab-vote` with winner='a' | Event |
| 5 | Vote B fires `ai-ab-vote` with winner='b' | Event |
| 6 | Vote Tie fires `ai-ab-vote` with winner='tie' | Event |
| 7 | Selected vote button gets `selected` class | Unit |
| 8 | Winning variant gets highlighted border | Unit |
| 9 | Swap reverses variant positions | Interaction |
| 10 | Swap resets winner to null | Interaction |
| 11 | Compare fires `ai-ab-compare` | Event |
| 12 | Winner highlight follows swap correctly | Interaction |
| 13 | aria-pressed updates on vote buttons | A11y |
| 14 | Focus-visible on all buttons | A11y |
| 15 | Group roles on container and actions | A11y |
| 16 | Reduced motion respected | A11y |
| 17 | Snapshot: default no vote | Visual |
| 18 | Snapshot: A wins selected | Visual |
| 19 | Snapshot: swapped view | Visual |
