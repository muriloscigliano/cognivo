# cg-follow-up — Improvement Plan

## Current State

### CSS Audit
| Property | Current | Issue |
|---|---|---|
| Host font-family | tokenized | OK |
| Header icon size | `var(--cg-spacing-16, 14px)` | Mismatch — token says 16, fallback says 14 |
| Label font-size | `var(--cg-font-size-xs, 11px)` | Fallback 11px does not match typical xs=12px |
| Button padding | tokenized | OK |
| Button border | tokenized | OK |
| Button font-size | `var(--cg-font-size-sm, 13px)` | Fallback 13px does not match typical sm=14px |
| Button hover border/color | tokenized | OK |
| Button hover background | `var(--cg-color-status-info-background-default, ...)` | Semantic mismatch — should use brand overlay, not info status |
| `.more-badge` padding | tokenized | OK |
| `.more-badge` border | `1px dashed` — OK creative choice | OK |
| Shimmer gradient | tokenized | OK |
| Card variant padding | tokenized | OK |
| Stagger animation | Dynamic via `--item-index` CSS custom prop | OK — good pattern |
| `fadeIn` animation | `var(--cg-motion-duration-fast, 250ms)` | 250ms is not "fast" — token name mismatch |

### States Audit
| State | Supported | Notes |
|---|---|---|
| Default (chips) | Yes | Pill-shaped buttons |
| Card variant | Yes | Rectangular cards |
| Button variant | Yes | Compact buttons |
| Loading | Yes | Shimmer placeholders |
| Disabled | Yes | Opacity 0.4, not-allowed |
| With icons | Yes | Per-item icon |
| Overflow (+N more) | Yes | maxVisible with expand |
| Expanded | Yes | Shows all after +N click |
| Empty | Partial | No explicit empty state — just renders nothing |
| With header | Yes | Label + sparkle icon |
| Without header | Yes | hideLabel prop |

### Interaction Audit
| Feature | Status | Notes |
|---|---|---|
| Click to select | OK | Fires `cg-follow-up-click` |
| Show all overflow | OK | Expands hidden items |
| Disabled prevention | OK | Click ignored when disabled |
| Keyboard | Partial | Native button focus but no arrow key nav |
| Stagger animation | OK | Dynamic per item |

### Accessibility Audit
| Item | Status | Notes |
|---|---|---|
| `role="group"` | OK | On chips container |
| `aria-label` on group | OK | Uses label prop |
| Button `aria-label` | OK | "Suggestion: {text}" |
| Disabled state | OK | Native `disabled` attribute |
| More button `aria-label` | OK | "Show N more suggestions" |
| Loading announcement | Missing | No `aria-busy` on loading shimmer |

## Style Fixes Needed
1. Fix header icon size mismatch: `var(--cg-spacing-16, 16px)` (not 14px fallback)
2. Fix label font-size fallback to match token: `var(--cg-font-size-xs, 12px)`
3. Fix button font-size fallback: `var(--cg-font-size-sm, 14px)`
4. Replace button hover background from info-status token to brand overlay token
5. Verify `fadeIn` duration token name vs. value (250ms is not "fast")

## Interaction Fixes Needed
1. Add `aria-busy="true"` to chips container when loading
2. Add empty state handling when items array is empty
3. Consider arrow key navigation between chips for keyboard users
4. Reset `_showAll` when items change

## Test Spec

### Unit Tests
- `it('renders chip buttons from string items')`
- `it('renders chip buttons from object items with text and icon')`
- `it('fires cg-follow-up-click with text on click')`
- `it('respects disabled prop — no click event')`
- `it('renders loading shimmer when loading')`
- `it('shows header with label by default')`
- `it('hides header when hideLabel is true')`
- `it('limits visible items via maxVisible')`
- `it('shows "+N more" badge when items exceed maxVisible')`
- `it('expands all items when "+N more" is clicked')`
- `it('applies chips variant by default')`
- `it('applies cards variant styling')`
- `it('applies buttons variant styling')`
- `it('renders icons when provided')`
- `it('applies stagger animation delay per item index')`
- `it('has correct ARIA (role=group, aria-label, button aria-label)')`

### Visual Regression
- Chips variant with 5 items
- Cards variant with icons
- Buttons variant
- Loading shimmer state
- Overflow with +N more badge
