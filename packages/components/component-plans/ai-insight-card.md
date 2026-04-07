# ai-insight-card — Improvement Plan

## Current State

### CSS Audit
| Property | Value | Token? | Issue |
|---|---|---|---|
| `.card` padding | `20px` | No | Raw magic number |
| `.card` background | `rgba(255, 255, 255, 0.03)` | No | Raw rgba, should use overlay token |
| `.card` border | `rgba(255, 255, 255, 0.08)` | No | Raw rgba, should use border token |
| `.card` border-radius | `12px` | No | Should use `--cg-border-radius-200` |
| `.card` transition | `all 150ms` | Partial | Duration not tokenized, `all` is non-specific |
| `.card:hover` border-color | `rgba(255, 255, 255, 0.15)` | No | Raw rgba |
| `.card:focus-visible` box-shadow | `rgba(223, 255, 97, 0.25)` | No | Should use focus ring token |
| `.meta` border-top | `rgba(255, 255, 255, 0.06)` | No | Raw rgba divider |
| `.detail` border-top | `rgba(255, 255, 255, 0.06)` | No | Raw rgba divider |
| `.skeleton` padding | `20px` | No | Raw magic number |
| `.skeleton` background | `rgba(255, 255, 255, 0.03)` | No | Raw rgba |
| `.skeleton` border | `rgba(255, 255, 255, 0.08)` | No | Raw rgba |
| `.skeleton` border-radius | `12px` | No | Should use border-radius token |
| Rounded variants | Raw `4px`, `8px`, `12px`, `99999px` | Partial | Some variants use raw values instead of tokens |

### States Audit
| State | Implemented? | Notes |
|---|---|---|
| Default | Yes | |
| Hover | Yes | Border color change + translateY |
| Focus-visible | Yes | Box-shadow ring |
| Active/pressed | No | Missing :active state |
| Disabled | No | No disabled property or styles |
| Loading | Yes | Skeleton state |
| Selected | Yes | Accent border + subtle bg |
| Expanded | Yes | Line clamp removed |
| Empty (no text) | Yes | Returns `nothing` |
| Error | No | No error state |

### Interaction Audit
- Click dispatches `ai-insight-click` - OK
- Expand toggle dispatches `ai-insight-expand` - OK
- Dismiss button dispatches `ai-insight-dismiss` - OK
- Bookmark button dispatches `ai-insight-bookmark` - OK
- Keyboard: Enter/Space triggers click - OK
- Actions bar only visible on hover (opacity: 0 -> 1) - keyboard-only users cannot discover actions without hovering
- `.card` uses `tabindex="0"` and `role="article"` - OK
- Source links open in new tab with `rel="noopener"` - OK

## Style Fixes Needed

1. **Replace raw padding** `20px` with `var(--cg-spacing-20, 20px)` on `.card` and `.skeleton`
2. **Replace raw rgba backgrounds** on `.card` and `.skeleton` with `var(--cg-overlay-white-faint)` or appropriate overlay token
3. **Replace raw rgba borders** on `.card` and `.skeleton` with `var(--cg-color-surface-container-border)` or similar
4. **Replace raw border-radius** `12px` on `.card` and `.skeleton` with `var(--cg-border-radius-200, 12px)`
5. **Tokenize transition duration** from `150ms` to `var(--cg-motion-duration-fast, 150ms)` and avoid `all`
6. **Tokenize hover border-color** `rgba(255, 255, 255, 0.15)` to `var(--cg-color-surface-border-hover)` 
7. **Replace raw focus ring** with `var(--cg-focus-ring-brand)` or a shared focus token
8. **Replace raw divider color** `rgba(255, 255, 255, 0.06)` with `var(--cg-color-surface-container-border)` in `.meta` and `.detail`
9. **Tokenize rounded variants** to use `var(--cg-border-radius-*)` tokens consistently

## Interaction Fixes Needed

1. **Add `:active` press state** — slight scale or background shift on card press
2. **Add `disabled` property** with `aria-disabled`, pointer-events: none, and opacity reduction
3. **Make actions keyboard-accessible** — actions container should be visible on focus-within, not just hover
4. **Add `aria-live` for status changes** — when status transitions to "new" or "dismissed", announce it
5. **Add error state** — visual treatment for when insight data fails to load

## Test Spec

### Unit Tests
- [ ] renders with default props (type=explanation, empty text returns nothing)
- [ ] renders skeleton when `loading=true`
- [ ] renders type-specific icon for each of: explanation, forecast, anomaly, optimization, classification
- [ ] shows status dot for `status="new"` and `status="read"`, hides for `status="dismissed"`
- [ ] truncates text to 2 lines when not expanded, shows full text when expanded
- [ ] shows sources section only when expanded AND sources array is non-empty
- [ ] source relevance dots map correctly: >=0.7 high, >=0.4 medium, <0.4 low

### Event Tests
- [ ] dispatches `ai-insight-click` on card click with correct detail payload
- [ ] dispatches `ai-insight-expand` when expandable and clicked, toggling expanded state
- [ ] dispatches `ai-insight-dismiss` on dismiss button click, event does not bubble to card click
- [ ] dispatches `ai-insight-bookmark` on bookmark button click, event does not bubble
- [ ] Enter and Space keys on card trigger click handler

### Accessibility Tests
- [ ] card has `role="article"` and `tabindex="0"`
- [ ] card has `aria-label` containing the insight type
- [ ] action buttons have `aria-label` attributes ("Bookmark", "Dismiss")
- [ ] skeleton has `aria-label="Loading insight"`
- [ ] focus ring is visible on card and action buttons via `:focus-visible`
- [ ] actions container is reachable via keyboard (focus-within visibility)

### Visual Regression Tests
- [ ] snapshot: default explanation card
- [ ] snapshot: anomaly card with status="new"
- [ ] snapshot: expanded card with sources
- [ ] snapshot: loading skeleton
- [ ] snapshot: selected state
