# cg-dropdown — Improvement Plan

## Current State

### CSS Audit
| Property | Current | Issue |
|---|---|---|
| `.menu` background | `var(--cg-color-surface-elevated, #111111)` | OK |
| `.menu` border | `1px solid rgba(255, 255, 255, 0.1)` | Raw RGBA — should use border token |
| `.menu` border-radius | `8px` | Magic number — should use `var(--cg-border-radius-100, 8px)` |
| `.menu` padding | `4px` | Should use `var(--cg-spacing-4, 4px)` |
| `.menu-item` gap | `8px` | Should be `var(--cg-spacing-8, 8px)` |
| `.menu-item` padding | `8px 12px` | Should use spacing tokens |
| `.menu-item` border-radius | `4px` | Should use `var(--cg-border-radius-50, 4px)` |
| `.menu-item` font-size | `14px` | Should use `var(--cg-font-size-sm, 14px)` |
| `.menu-item` line-height | `1.375` | Should use `var(--cg-line-height-snug, 1.375)` |
| `.menu-item:hover` background | `rgba(255, 255, 255, 0.05)` | Raw RGBA — needs token |
| `.menu-item:active` background | `rgba(255, 255, 255, 0.08)` | Raw RGBA — needs token |
| `.menu-item:focus-visible` box-shadow | `rgba(223, 255, 97, 0.25)` | Should use token or double-ring |
| `.menu-item.active` font-weight | `500` | Should use `var(--cg-font-weight-medium, 500)` |
| `.divider` margin | `4px 0` | Should use spacing token |
| `.divider` background | `rgba(255, 255, 255, 0.06)` | Raw RGBA — needs border token |
| Animation timings | `150ms`, `100ms` hardcoded | Should use motion tokens |
| `transition: all 150ms ease` | On menu-item | Overly broad — should target specific properties |

### States Audit
| State | Supported | Notes |
|---|---|---|
| Closed | Yes | Menu hidden with opacity 0 |
| Open | Yes | Scale+fade animation |
| Closing | Yes | Exit animation |
| Loading | Yes | Spinner with "Loading..." |
| Empty | Yes | "No items" message |
| Item hover | Yes | Background change |
| Item active (keyboard) | Yes | `.active` class |
| Item disabled | Yes | Gray, not-allowed cursor |
| Item with icon | Yes | Optional icon slot |
| Divider | Yes | Visual separator |

### Interaction Audit
| Feature | Status | Notes |
|---|---|---|
| Click to toggle | OK | On trigger element |
| Outside click to close | OK | Document click listener |
| Escape to close | OK | Restores focus to trigger |
| Arrow Down/Up | OK | Cycles through enabled items |
| Enter/Space to select | OK | Selects active item |
| Home/End | OK | Jump to first/last |
| Tab to close | OK | Closes without selecting |
| Focus trigger after close | OK | Returns focus to trigger |
| TypeAhead | Missing | No type-to-search in open menu |

### Accessibility Audit
| Item | Status | Notes |
|---|---|---|
| `aria-haspopup="menu"` | OK | On trigger |
| `aria-expanded` | OK | Reflects open state |
| `role="menu"` | OK | On menu container |
| `role="menuitem"` | OK | On each item |
| `aria-disabled` | OK | On disabled items |
| `role="separator"` | OK | On dividers |
| `aria-activedescendant` | Missing | Should be used instead of direct focus management |
| Menu `aria-label` | OK | "Dropdown menu" — could be customizable |

## Style Fixes Needed
1. Replace `.menu` border with `1px solid var(--cg-color-surface-elevated-border, rgba(255, 255, 255, 0.1))`
2. Replace `.menu` border-radius `8px` with `var(--cg-border-radius-100, 8px)`
3. Tokenize `.menu` padding to `var(--cg-spacing-4, 4px)`
4. Tokenize `.menu-item` gap, padding, border-radius, font-size, line-height
5. Replace hover/active background RGBAs with overlay tokens
6. Replace `.divider` background with border token
7. Tokenize `.divider` margin with spacing token
8. Replace `transition: all` with specific properties on `.menu-item`
9. Tokenize animation durations with motion tokens
10. Upgrade `.menu-item:focus-visible` to double-ring pattern

## Interaction Fixes Needed
1. Add type-ahead search: typing a letter jumps to matching item
2. Add `aria-activedescendant` pattern as an alternative to direct focus
3. Make `aria-label` on menu customizable via prop
4. Consider scroll into view for active item when list is long

## Test Spec

### Unit Tests
- `it('renders closed by default')`
- `it('opens on trigger click and fires cg-dropdown-open')`
- `it('closes on second trigger click and fires cg-dropdown-close')`
- `it('closes on outside click')`
- `it('closes on Escape and restores trigger focus')`
- `it('selects item on click and fires cg-dropdown-select')`
- `it('does not select disabled item')`
- `it('navigates items with ArrowDown/ArrowUp')`
- `it('wraps navigation at boundaries')`
- `it('jumps to first item with Home key')`
- `it('jumps to last item with End key')`
- `it('selects active item with Enter key')`
- `it('selects active item with Space key')`
- `it('closes on Tab key without selecting')`
- `it('opens on Enter key when closed')`
- `it('renders loading state with spinner')`
- `it('renders empty state when no items')`
- `it('renders dividers between items')`
- `it('renders icons when provided')`
- `it('applies stagger animation delay per item')`
- `it('applies position variants (bottom-start/bottom-end/top-start/top-end)')`
- `it('applies rounded variants')`
- `it('has correct ARIA attributes')`

### Visual Regression
- Dropdown open at each position
- Dropdown with disabled items
- Dropdown with dividers
- Dropdown loading state
- Dropdown empty state
