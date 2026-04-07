# ai-keyboard-shortcuts — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Good coverage — spacing, colors, typography, border-radius all tokenized.
- **Magic numbers**: `max-width: 520px` and `max-height: 70vh` on `.modal` — should use CSS custom properties. `width: 90vw` is acceptable responsive pattern.
- **Key badges**: Styled with border-bottom 3px for keyboard key appearance — effective visual.
- **Overlay**: Fixed position fullscreen backdrop with `z-index: 9999`.

### States Audit

| State | Supported | Notes |
|---|---|---|
| Open | Yes | Controlled by `open` property |
| Closed | Yes | Returns `nothing` when not open |
| Hover | Yes | Close button hover changes color |
| Focus-visible | Yes | Close button, search input have focus rings |
| Search | Yes | Filters shortcuts by description, keys, category |
| Empty search | Yes | "No shortcuts found" message |
| Loading | **No** | N/A for this component |
| Error | **No** | N/A |

### Interaction Audit
- **Open/close**: Controlled by `open` prop. Escape key closes. Backdrop click closes.
- **Search**: Filters shortcuts by description, key names, and category.
- **Keyboard**: Escape dismisses modal. Global keydown listener.
- **ARIA**: `role="dialog"`, `aria-label`, `aria-modal="true"`, `role="list"`, `role="listitem"`.

## Style Fixes Needed

1. **Modal max-width/max-height** — Raw values `520px` and `70vh`. Consider exposing as CSS custom properties for customization.
2. **Close button size** — `font-size: var(--cg-font-size-xl, 20px)` but uses SVG icon — the font-size on the button is not relevant for SVG. Clean up.
3. **Search input focus** — Uses `outline-offset: -1px` — inconsistent with other components that use `outline-offset: 2px`.
4. **Category border** — Good use of border-bottom divider.
5. **Key badge shadow** — Consider adding `box-shadow` for a more realistic keyboard key appearance.
6. **Overlay backdrop** — `rgba(0, 0, 0, 0.6)` — should use a token like `var(--cg-overlay-backdrop)`.

## Interaction Fixes Needed

1. **Focus trap** — Modal lacks focus trap. Tab key can escape to elements behind the modal. Implement focus trapping.
2. **Initial focus** — When modal opens, focus should move to the search input automatically.
3. **Restore focus** — When modal closes, focus should return to the element that triggered it.
4. **Scroll lock** — Background page should not scroll when modal is open.
5. **Animation** — No exit animation when closing. Consider fade-out.
6. **Shortcut execution** — Consider making shortcuts clickable to execute them.
7. **OS detection** — Show Cmd vs Ctrl based on OS (mac vs windows/linux).

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Returns nothing when `open` is false | Unit |
| 2 | Renders modal when `open` is true | Unit |
| 3 | Shortcuts grouped by category | Unit |
| 4 | Key badges display key names | Unit |
| 5 | Plus separator between multi-key shortcuts | Visual |
| 6 | Search filters by description | Unit |
| 7 | Search filters by key name | Unit |
| 8 | Search filters by category | Unit |
| 9 | "No shortcuts found" shown for empty search | Unit |
| 10 | Escape key closes modal | Interaction |
| 11 | Backdrop click closes modal | Interaction |
| 12 | Close button fires `ai-shortcuts-close` | Unit |
| 13 | Search input cleared on close | Unit |
| 14 | `role="dialog"` and `aria-modal="true"` present | A11y |
| 15 | Close button has accessible label | A11y |
| 16 | Search input has accessible label | A11y |
| 17 | Global keydown listener added on connect | Unit |
| 18 | Global keydown listener removed on disconnect | Unit |
