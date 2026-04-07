# cg-avatar-group — Improvement Plan

## Current State

### CSS Audit
| Property | Current | Issue |
|---|---|---|
| Avatar border | `2px solid var(--cg-color-surface-base-background)` | OK — tokenized |
| Avatar background | `var(--cg-color-action-secondary-background-default)` | OK |
| Avatar transition | tokenized durations/easings | OK |
| Animation `avatarIn` | `250ms cubic-bezier(0.2, 0, 0, 1)` | Easing not from token system |
| Animation delays | Hardcoded per nth-child (max 6) | Only handles up to 6 avatars |
| Hover transform | `scale(1.1) translateY(-1px)` | `-1px` magic number |
| Focus-visible | Double-ring pattern | OK — matches system |
| Status dot colors | `var(--cg-green-500)`, `var(--cg-red-500)`, etc. | Using raw palette instead of semantic status tokens |
| Overflow badge | tokenized | OK |
| Size dimensions | `28px`, `38px`, `48px` | Could use spacing tokens |
| Size margins | `-8px`, `-10px`, `-12px` | Magic numbers — should be derived from size |
| Initials font-size | `0.6rem`, `var(--cg-font-size-xs)`, `var(--cg-font-size-sm)` | `0.6rem` is a magic number |

### States Audit
| State | Supported | Notes |
|---|---|---|
| Default (overlapping) | Yes | Negative margins |
| Expanded (hover) | Yes | Margins reset to 0 |
| Size sm | Yes | 28px |
| Size md | Yes | 38px |
| Size lg | Yes | 48px |
| With images | Yes | `<img>` tag |
| Initials fallback | Yes | First letters of name |
| Image error fallback | Yes | Falls back to initials |
| Status online | Yes | Green dot |
| Status offline | Yes | Gray dot |
| Status busy | Yes | Red dot |
| Status away | Yes | Yellow dot |
| Overflow badge | Yes | +N button |
| Loading | No | Missing loading state |

### Interaction Audit
| Feature | Status | Notes |
|---|---|---|
| Hover to expand | OK | Group mouseenter/leave |
| Avatar click | OK | Fires `cg-avatar-group-click` |
| Overflow click | OK | Fires `cg-avatar-group-overflow-click` |
| Keyboard Enter/Space | OK | On individual avatars |
| Image error handling | OK | Tracks failed images in Set |
| Focus visible | OK | Double-ring pattern |

### Accessibility Audit
| Item | Status | Notes |
|---|---|---|
| `role="group"` | OK | On container |
| `aria-label` | OK | "Avatar group" |
| Avatar `role="button"` | OK | Each avatar is a button |
| Avatar `aria-label` | OK | Uses name |
| Overflow button `aria-label` | OK | "N more avatars" |
| Status indicator | Missing | Status not announced — needs visually hidden text |

## Style Fixes Needed
1. Replace status dot colors with semantic tokens: `var(--cg-color-status-success-text)` etc.
2. Replace `avatarIn` easing with `var(--cg-motion-easing-enter)` token
3. Remove nth-child animation delay limit — use CSS custom property `--item-index`
4. Replace `-1px` hover translateY with spacing token
5. Tokenize size dimensions and negative margins
6. Replace `0.6rem` initials font-size with token

## Interaction Fixes Needed
1. Add visually hidden status text for each avatar (e.g., "online", "busy")
2. Consider adding tooltip on hover to show full name
3. Avatar click event should include the avatar data in detail
4. Add loading state (skeleton avatars)
5. Consider lazy loading for avatar images

## Test Spec

### Unit Tests
- `it('renders visible avatars up to maxVisible')`
- `it('shows overflow badge when avatars exceed maxVisible')`
- `it('renders images when src is provided')`
- `it('falls back to initials when no src')`
- `it('falls back to initials on image error')`
- `it('generates correct initials from name')`
- `it('renders status dots (online/offline/busy/away)')`
- `it('expands on group hover (resets margins)')`
- `it('collapses on group mouse leave')`
- `it('fires cg-avatar-group-click on avatar click')`
- `it('fires cg-avatar-group-overflow-click on overflow click')`
- `it('handles keyboard Enter/Space on avatar')`
- `it('applies size variants (sm/md/lg)')`
- `it('has correct ARIA (role=group, role=button, aria-label)')`
- `it('applies stagger entrance animation')`

### Visual Regression
- Avatar group with 4 visible + overflow
- Expanded state (hover)
- With status indicators
- With initials (no images)
- All size variants
