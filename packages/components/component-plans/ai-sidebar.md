# ai-sidebar — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Good coverage — spacing, colors, typography, border-radius, motion all tokenized.
- **Magic numbers**: `width: 240px` on `.sidebar` — raw value. Should use CSS custom property `--ai-sidebar-width`. `width: 56px` on collapsed — same issue. `width: 18px` on `.item-icon` — should use token.
- **Collapsed mode**: Width transitions, labels/badges hidden, items centered.
- **Active item**: Accent background overlay with accent text.

### States Audit

| State | Supported | Notes |
|---|---|---|
| Default (expanded) | Yes | Full sidebar with section titles, labels, badges |
| Collapsed | Yes | Icon-only mode with width transition |
| Active item | Yes | Accent background and text via `aria-current="true"` |
| Hover | Yes | Subtle highlight overlay |
| Active/pressed | Yes | Scale down on `:active` |
| Focus-visible | Yes | 2px accent outline with inset offset |
| Empty | **No** | No empty state when sections is empty |
| Loading | **No** | No loading/skeleton state |
| Disabled | **No** | No disabled items |

### Interaction Audit
- **Item click**: Fires `ai-sidebar-item-click` with id and label.
- **Collapse toggle**: Button toggles collapsed state, fires `ai-sidebar-collapse`.
- **Keyboard**: Native button keyboard support on items and collapse button.
- **ARIA**: `role="navigation"`, `role="menuitem"`, `aria-current`, `aria-label`.

## Style Fixes Needed

1. **Sidebar width magic numbers** — `240px` and `56px` are raw values. Extract to CSS custom properties: `--ai-sidebar-width: 240px` and `--ai-sidebar-collapsed-width: 56px`.
2. **Icon width** — `width: 18px` on `.item-icon` should use `var(--cg-spacing-18, 18px)`.
3. **Section title transition** — Collapsed section title has `opacity: 0; height: 0; padding: 0` but no transition for smooth hide/show.
4. **Collapse chevron** — Uses Unicode characters (`\u25B6` / `\u25C0`) — should use inline SVG for consistency.
5. **Scrollbar styling** — `.sections` has `overflow-y: auto` but no custom scrollbar styling.
6. **Rounded variants** — Missing `:host([rounded])` support (less relevant for full-height sidebar).

## Interaction Fixes Needed

1. **Tooltip on collapsed** — In collapsed mode, items show only icons with no labels. Need tooltip on hover showing the label.
2. **Keyboard collapse** — Consider keyboard shortcut (e.g., `[` or `]`) to toggle sidebar.
3. **Section collapse** — Individual sections cannot be collapsed/expanded.
4. **Item disabled state** — No way to disable individual menu items.
5. **Active item management** — Component doesn't internally update `activeId` on click — relies on parent. Consider optional internal management.
6. **Badge in collapsed mode** — Badges are hidden in collapsed mode. Consider showing a dot indicator on the icon.
7. **Resize handle** — No drag-to-resize capability.
8. **ARIA improvement** — `role="menuitem"` should be inside a `role="menu"` container, not directly under navigation.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders sections with titles and items | Unit |
| 2 | Item click fires `ai-sidebar-item-click` with id/label | Unit |
| 3 | Active item has `aria-current="true"` | Unit |
| 4 | Active item has accent styling | Visual |
| 5 | Collapse button toggles collapsed state | Interaction |
| 6 | Collapse fires `ai-sidebar-collapse` with state | Unit |
| 7 | Collapsed mode hides labels and badges | Visual |
| 8 | Collapsed mode centers items | Visual |
| 9 | Collapsed mode hides section titles | Visual |
| 10 | Width transitions between expanded and collapsed | Visual |
| 11 | Chevron direction matches collapse state | Unit |
| 12 | Badges display from item data | Unit |
| 13 | Icon displayed from item data | Unit |
| 14 | Hover highlight on items | Visual |
| 15 | Press scale on items | Visual |
| 16 | Focus-visible ring on items and collapse button | A11y |
| 17 | `role="navigation"` on sidebar | A11y |
| 18 | `aria-label` on items and collapse button | A11y |
