# ai-tool-indicator — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Most values use `--cg-*` tokens. Minor issues below.
- **Magic numbers**:
  - `.spinner` uses `border: 1.5px solid` — non-standard width, should use `2px` or token.
  - `.result` uses `max-height: 120px` — should use token or custom property.
  - `@keyframes slideIn` uses `translateX(-8px)` — should use spacing token.
  - `:host([compact]) .tool` uses `padding: 3px` (`var(--cg-spacing-2, 3px)` mismatch — spacing-2 is typically 2px).
- **Reduced motion**: Missing explicit `@media (prefers-reduced-motion)` block — spinner and slideIn animate regardless.
- **Issues**:
  - Uses shared `spinKeyframes` but also defines local `slideIn` animation.
  - `.duration` class is styled but never rendered in the template.
  - `:focus-visible` is set globally — affects all focusable children, which is fine for consistency.

### States Audit

| State | .tool | .spinner | .check | .error-icon |
|---|---|---|---|---|
| Default/Loading | PASS (neutral) | PASS (spinning) | N/A | N/A |
| Complete | PASS (text color) | N/A | PASS (green) | N/A |
| Error | PASS (text color) | N/A | N/A | PASS (red) |
| Hover | PASS (border) | N/A | N/A | N/A |
| Focus-visible | PASS (box-shadow) | N/A | N/A | N/A |
| Expanded | N/A | N/A | N/A | N/A (result shows) |
| Compact | PASS (row layout, smaller) | N/A | N/A | N/A |

### Interaction Audit
- Tool row click fires `ai-tool-click` with index and tool. PASS.
- Click toggles expanded result panel. PASS.
- Keyboard Enter/Space. PASS.
- Compact mode hides results. PASS.
- Tool names are humanized via map + fallback. PASS.
- **Issue**: `_expandedIndex` is not `@state()` — uses `requestUpdate()` manually. Should use `@state()`.
- **Issue**: Empty array returns `nothing`. PASS for no-content, but no guidance.
- **Issue**: `.duration` class exists in CSS but is never used in render.
- **Issue**: `@media (prefers-reduced-motion)` should disable spinner and slideIn.
- **Issue**: `role="status"` on container — should be `role="list"` since items are status rows.

## Style Fixes Needed

1. Replace `border: 1.5px` with `2px` for consistency.
2. Replace `max-height: 120px` with token.
3. Fix `var(--cg-spacing-2, 3px)` fallback — should be `2px`.
4. Add `@media (prefers-reduced-motion)` for spinner and slideIn.
5. Remove unused `.duration` CSS class.
6. Tokenize `translateX(-8px)` in slideIn animation.

## Interaction Fixes Needed

1. Decorate `_expandedIndex` with `@state()` instead of manual `requestUpdate()`.
2. Change `role="status"` to `role="list"` with `role="listitem"` on tools.
3. Remove unused `.duration` CSS or add duration display to template.
4. Add collapse animation for result panel.
5. Add `aria-expanded` to tool rows.
6. Add keyboard navigation between tools (arrow keys).
7. Add `aria-live` for new tool additions.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Returns nothing when `tools` array is empty | render |
| 2 | Renders tool rows with humanized names | render |
| 3 | Loading tool shows spinner | render |
| 4 | Complete tool shows green checkmark | render |
| 5 | Error tool shows red X icon | render |
| 6 | Tool click fires `ai-tool-click` with index and tool | interaction |
| 7 | Click toggles result expansion | interaction |
| 8 | Result panel shows tool result text when expanded | render |
| 9 | Compact mode hides result panels | render |
| 10 | Compact mode uses row layout | render |
| 11 | Keyboard Enter/Space triggers click | a11y |
| 12 | Focus-visible ring on tool rows | a11y |
| 13 | Humanize maps known tool names correctly | unit |
| 14 | Unknown tool names get title-cased fallback | unit |
| 15 | Tool icon SVG renders for all tools | render |
