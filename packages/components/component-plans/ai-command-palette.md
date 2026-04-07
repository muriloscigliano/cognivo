# ai-command-palette — Improvement Plan

## Current State

### CSS Audit
| Property | Current | Issue |
|---|---|---|
| `.overlay` background | `rgba(0, 0, 0, 0.6)` | Raw RGBA — should use `var(--cg-overlay-backdrop)` |
| `.palette` background | `#111` | Raw hex — should use `var(--cg-color-surface-elevated, #111111)` |
| `.palette` border | `1px solid rgba(255, 255, 255, 0.1)` | Raw RGBA — needs token |
| `.palette` border-radius | `12px` | Should use `var(--cg-border-radius-150, 12px)` |
| `.search-wrap` border-bottom | `1px solid rgba(255, 255, 255, 0.08)` | Raw RGBA |
| `.search-icon` color | `#666` | Raw hex — should use token |
| `.search-input` color | `#fafafa` | Raw hex |
| `.search-input` font-size | `14px` | Should use token |
| `.category-label` color | `#666` | Raw hex |
| `.category-label` border-top | `rgba(255, 255, 255, 0.06)` | Raw RGBA |
| `.cmd` color | `#a3a3a3` | Raw hex |
| `.cmd` font-size | `14px` | Should use token |
| `.cmd` padding | `10px 12px` | Should use spacing tokens |
| `.cmd:hover` background | `rgba(255, 255, 255, 0.05)` | Raw RGBA |
| `.cmd:hover` color | `#fafafa` | Raw hex |
| `.cmd:active` scale | `0.97` | Should use `var(--cg-interaction-press-scale)` |
| `.cmd:focus-visible` box-shadow | `rgba(223, 255, 97, 0.25)` | Should use token-based ring |
| `.cmd-label mark` | tokenized | OK |
| `.cmd-shortcut` | tokenized | OK |
| Animation durations | `200ms`, `150ms`, `100ms` hardcoded | Should use motion tokens |
| `.palette` max-width | `520px` | Could be a CSS custom property |

### States Audit
| State | Supported | Notes |
|---|---|---|
| Closed | Yes | Returns nothing |
| Open | Yes | Overlay + palette |
| Search results | Yes | Filtered list |
| Empty results | Yes | "No commands found" |
| Category grouping | Yes | Grouped by category |
| Active item (keyboard) | Yes | Highlighted with data-active |
| Match highlighting | Yes | `<mark>` tags on matches |
| With shortcuts | Yes | Shortcut badges |
| With icons | Yes | Optional icon per command |
| Loading | No | Missing loading state |
| Error | No | Missing error state |

### Interaction Audit
| Feature | Status | Notes |
|---|---|---|
| Cmd+K to open | External | Not built-in — consumer must wire |
| Search/filter | OK | Case-insensitive substring match |
| ArrowDown/Up | OK | Cycles through results |
| Enter to select | OK | Selects active item |
| Escape to close | OK | Fires ai-command-close |
| Overlay click to close | OK | Only on overlay element |
| Focus management | OK | Auto-focuses search input |
| Scroll lock | OK | Body overflow hidden |
| Focus restore | OK | Returns to previous focus |
| Fuzzy search | Missing | Only substring match — no fuzzy/scoring |

### Accessibility Audit
| Item | Status | Notes |
|---|---|---|
| `role="dialog"` | OK | On overlay |
| `aria-modal="true"` | OK | Present |
| `aria-label` | OK | "Command palette" |
| Search input `aria-label` | OK | "Search commands" |
| Results `role="listbox"` | OK | Present |
| Items `role="option"` | OK | Present |
| `aria-selected` | OK | On active item |
| Focus trap | Missing | Tab key can escape to overlay/outside |
| `aria-activedescendant` | Missing | Should be on input, pointing to active option |

## Style Fixes Needed
1. Replace overlay background with `var(--cg-overlay-backdrop, rgba(0, 0, 0, 0.6))`
2. Replace palette background `#111` with `var(--cg-color-surface-elevated, #111111)`
3. Replace palette border with token
4. Tokenize palette border-radius
5. Replace all raw hex colors (#666, #fafafa, #a3a3a3) with semantic tokens
6. Replace all raw RGBA values with overlay/border tokens
7. Tokenize `.cmd` padding with spacing tokens
8. Replace `.cmd:active` scale with `var(--cg-interaction-press-scale)`
9. Upgrade `.cmd:focus-visible` to double-ring pattern
10. Tokenize all animation durations

## Interaction Fixes Needed
1. Add focus trap — Tab should cycle within palette
2. Add `aria-activedescendant` on input pointing to active option id
3. Add fuzzy search scoring (not just substring)
4. Add loading state for async command loading
5. Consider built-in Cmd+K / Ctrl+K keyboard shortcut listener
6. Scroll active item into view when navigating with arrow keys

## Test Spec

### Unit Tests
- `it('renders nothing when closed')`
- `it('renders palette when open')`
- `it('focuses search input on open')`
- `it('restores focus on close')`
- `it('locks body scroll on open')`
- `it('restores body scroll on close')`
- `it('filters commands by search query')`
- `it('shows empty state when no commands match')`
- `it('groups commands by category')`
- `it('highlights matching text with <mark>')`
- `it('navigates items with ArrowDown/ArrowUp')`
- `it('wraps navigation at boundaries')`
- `it('selects active item on Enter')`
- `it('fires ai-command-select with command data')`
- `it('closes on Escape and fires ai-command-close')`
- `it('closes on overlay click')`
- `it('does not close on palette click')`
- `it('renders shortcut badges when provided')`
- `it('renders icons when provided')`
- `it('applies rounded variants')`
- `it('has correct ARIA (role=dialog, aria-modal, role=listbox, role=option)')`
- `it('restores body overflow on disconnect while open')`

### Visual Regression
- Command palette open with categories
- Search with highlighted matches
- Empty search results
- With shortcut badges
