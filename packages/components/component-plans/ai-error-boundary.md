# ai-error-boundary — Improvement Plan

## Current State

### CSS Audit
| Property | Status | Notes |
|---|---|---|
| Colors | PASS | All use `--cg-*` tokens with error semantic tokens |
| Spacing | PASS | Uses `--cg-spacing-*` tokens |
| Font sizes | PASS | Uses `--cg-font-size-*` tokens |
| Font weights | PASS | Uses `--cg-font-weight-*` tokens |
| Border radii | PASS | Uses `--cg-border-radius-*` tokens |
| Motion | PASS | Uses `--cg-motion-*` tokens |
| Letter-spacing | WARN | `.code-badge { letter-spacing: 0.5px }` — raw pixel value |
| Focus | PASS | Focus-visible on all buttons |
| Disabled | PASS | `.btn:disabled` with opacity reduction |

### States Audit
| State | Implemented | Notes |
|---|---|---|
| Default | YES | Error card with icon, title, message, actions |
| No error | YES | Returns `nothing` when `error` is empty |
| With code | YES | Code badge shown |
| Without code | YES | Badge hidden |
| With details | YES | Expandable details section |
| Details expanded | YES | Shows details content |
| Details collapsed | YES | Only toggle link visible |
| Retryable | YES | Retry button shown |
| Not retryable | YES | Retry button hidden |
| Hover | YES | Buttons hover with brightness filter |
| Focus | YES | Focus-visible outlines |
| Active/Pressed | NO | No `:active` state |
| Disabled buttons | YES | Opacity-based disabled styling |
| Loading | NO | No loading/retrying state |

### Interaction Audit
| Interaction | Status | Notes |
|---|---|---|
| Retry click | YES | Fires `ai-error-retry` |
| Dismiss click | YES | Fires `ai-error-dismiss` |
| Details toggle | YES | Expands/collapses with aria-expanded |
| ARIA alert | YES | `role="alert" aria-live="assertive"` |
| Keyboard | YES | Native button handling |

## Style Fixes Needed
1. Replace `letter-spacing: 0.5px` with `var(--cg-letter-spacing-wide, 0.05em)` or dedicated token
2. Add `:active` press state on retry and dismiss buttons
3. Add `rounded` attribute variant support
4. Details toggle uses `text-decoration: underline` — consider button styling instead of link styling for consistency
5. `.error-card` border uses `--cg-color-status-error-border-strong, #7f1d1d` — verify this token exists

## Interaction Fixes Needed
1. Add loading/retrying state with spinner on retry button
2. Add auto-dismiss timeout option
3. Details toggle should use `<button>` with `aria-controls` pointing to details section
4. Add `id` on details section for `aria-controls` reference
5. Consider adding error categorization (network, rate limit, model, etc.)
6. Add copy error details to clipboard
7. Retry button should show retry count or cooldown

## Test Spec
| # | Test Case | Type |
|---|---|---|
| 1 | Returns nothing when error is empty | Unit |
| 2 | Renders error message | Unit |
| 3 | Code badge shown when code provided | Unit |
| 4 | Code badge hidden when no code | Unit |
| 5 | Details toggle shown when details provided | Unit |
| 6 | Details toggle hidden when no details | Unit |
| 7 | Click toggle expands details | Interaction |
| 8 | Click toggle collapses details | Interaction |
| 9 | Retry button shown when retryable=true | Unit |
| 10 | Retry button hidden when retryable=false | Unit |
| 11 | Retry click fires `ai-error-retry` | Event |
| 12 | Dismiss click fires `ai-error-dismiss` | Event |
| 13 | aria-expanded toggles on details | A11y |
| 14 | role="alert" on error card | A11y |
| 15 | aria-live="assertive" on card | A11y |
| 16 | Focus-visible on all buttons | A11y |
| 17 | Disabled button styling applies | Unit |
| 18 | Snapshot: error with code and details collapsed | Visual |
| 19 | Snapshot: error with details expanded | Visual |
