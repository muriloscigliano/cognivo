# ai-feedback — Improvement Plan

## Current State

### CSS Audit
| Property | Status | Notes |
|---|---|---|
| Colors | PASS | All use `--cg-*` tokens including overlay tokens |
| Spacing | PASS | Uses `--cg-spacing-*` tokens |
| Font sizes | PASS | Uses `--cg-font-size-*` tokens |
| Font weights | PASS | Uses `--cg-font-weight-*` tokens |
| Border radii | PASS | Uses `--cg-border-radius-*` tokens with rounded variants |
| Motion | WARN | `.thumb-btn { transition: all 150ms }`, `.emoji-btn { transition: all 150ms }` — raw values |
| Press scale | PASS | Uses `--cg-interaction-press-scale` on interactive elements |
| Focus | PASS | Focus-visible on all interactive elements |

### States Audit
| State | Implemented | Notes |
|---|---|---|
| Default | YES | Rating row with mode-specific controls |
| Thumbs mode | YES | Up/down thumb buttons |
| Stars mode | YES | 5-star rating with hover preview |
| Emoji mode | YES | 5-emoji scale with SVG faces |
| Selected rating | YES | Visual highlight on selected item |
| Negative feedback | YES | Shows tags and comment when negative |
| Comment field | YES | Optional textarea |
| Submitted | YES | Thank you confirmation with checkmark |
| Hover | YES | On all interactive elements |
| Focus | YES | Focus-visible outlines |
| Active/Pressed | YES | Press scale on buttons |
| Disabled | PARTIAL | Submit button disabled when no rating, but no full component disable |
| Loading | NO | No loading state during submission |

### Interaction Audit
| Interaction | Status | Notes |
|---|---|---|
| Thumb toggle | YES | Click toggles selection, re-click deselects |
| Star select | YES | Click sets rating, hover previews |
| Emoji select | YES | Click selects emoji |
| Tag toggle | YES | Multi-select with Set |
| Comment input | YES | Textarea with placeholder |
| Submit | YES | Fires `ai-feedback-submit` with full payload |
| Submitted state | YES | Replaces form with confirmation |
| Auto-show comment | YES | On negative feedback |
| ARIA group | YES | `role="group" aria-label="Rate this response"` |
| Tag group ARIA | YES | `role="group" aria-label="Select issues"` |

## Style Fixes Needed
1. Replace `transition: all 150ms` on thumb/emoji buttons with token-based transitions
2. Add `font-family: inherit` to textarea (already has `font: inherit` — good)
3. `.container` has rounded variants but no border/background — the rounded variants target a non-existent visual boundary
4. Stars hover state needs `will-change: color` for smoother transitions on rapid hover

## Interaction Fixes Needed
1. Add loading/submitting state with spinner before confirmation
2. Add full component disabled state (`:host([disabled])`)
3. Stars should use `role="radiogroup"` with individual `role="radio"` and `aria-checked`
4. Emoji buttons should similarly use radiogroup pattern
5. Thumbs should use `aria-pressed` toggle button pattern
6. Tag buttons should have `aria-pressed` attribute
7. Submitted confirmation should auto-focus or announce via live region (currently has `aria-live="polite"` — good)
8. Consider allowing reset after submission

## Test Spec
| # | Test Case | Type |
|---|---|---|
| 1 | Renders thumbs mode by default | Unit |
| 2 | Renders stars mode when `mode="stars"` | Unit |
| 3 | Renders emoji mode when `mode="emoji"` | Unit |
| 4 | Thumb up click selects rating=1 | Interaction |
| 5 | Thumb down click selects rating=0 | Interaction |
| 6 | Re-clicking thumb deselects (rating=null) | Interaction |
| 7 | Star click sets rating to star number | Interaction |
| 8 | Star hover previews highlight | Interaction |
| 9 | Emoji click selects corresponding index | Interaction |
| 10 | Negative rating shows tags | Unit |
| 11 | Tag toggle adds/removes from selected set | Interaction |
| 12 | Negative rating auto-shows comment field | Unit |
| 13 | Submit fires `ai-feedback-submit` with correct detail | Event |
| 14 | Submit shows confirmation message | Interaction |
| 15 | Submit button disabled when no rating | Unit |
| 16 | `showComment` prop shows textarea | Unit |
| 17 | `messageId` included in event detail | Event |
| 18 | Focus-visible on all interactive elements | A11y |
| 19 | Submitted state has aria-live polite | A11y |
| 20 | Rounded variants apply | Unit |
| 21 | Snapshot: thumbs mode with negative selected | Visual |
| 22 | Snapshot: stars mode at 3 stars | Visual |
| 23 | Snapshot: submitted state | Visual |
