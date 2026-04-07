# ai-data-lineage — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Most values use `--cg-*` tokens. Issues below.
- **Magic numbers**:
  - `.node` uses `min-width: 100px` — should use token.
  - `.node-icon` uses `width: 28px; height: 28px` — should use token.
  - `.node-status` uses `width: 6px; height: 6px; top: 6px; right: 6px` — should use tokens.
  - `.edge-line` uses `width: 32px; height: 2px` — should use tokens.
  - Arrow border uses `border-left: 6px`, `border-top: 4px`, `right: -4px; top: -3px` — raw values.
  - `.type-badge` uses `font-size: 10px; letter-spacing: 0.05em` — should use tokens.
  - `.node-label` uses `font-weight: 600` — should use token.
- **Reduced motion**: Missing explicit `@media (prefers-reduced-motion)` block.
- **Issues**:
  - Node icons use emoji characters — may render inconsistently cross-platform. Consider SVG icons.
  - Node status dot has `position: absolute` but parent `.node` is not `position: relative` — status dot is on `.node-container` instead. Works but fragile.

### States Audit

| State | .node | .edge-line | .node-status |
|---|---|---|---|
| Default | PASS | PASS | N/A |
| Hover | PASS (border) | N/A | N/A |
| Highlighted | PASS (accent border, bg) | PASS (accent color) | N/A |
| Focus-visible | PASS (outline) | N/A | N/A |
| Active | MISSING | N/A | PASS (blue dot) |
| Complete | N/A | N/A | PASS (green dot) |
| Error | N/A | N/A | PASS (red dot) |
| Loading | MISSING | MISSING | MISSING |

### Interaction Audit
- Node click fires `ai-lineage-node-click`. PASS.
- `highlightPath` traces backward from target node. PASS.
- Topological ordering attempts. PASS.
- Horizontal and vertical direction support. PASS.
- Nodes are buttons with `tabindex="0"`. PASS.
- **Issue**: Nodes use `<button>` element — good. But no keyboard navigation between nodes (arrow keys).
- **Issue**: Edges between non-adjacent nodes in the ordered list are not rendered (only sequential edges).
- **Issue**: No zoom or pan for large lineage graphs.
- **Issue**: `role="img"` on container is wrong — this is interactive, should be `role="group"` or `role="tree"`.
- **Issue**: Focus ring uses `outline` instead of `box-shadow` — inconsistent.

## Style Fixes Needed

1. Replace all raw pixel values with `--cg-spacing-*` tokens.
2. Replace `font-weight: 600` with `var(--cg-font-weight-semibold)`.
3. Replace `font-size: 10px` with `var(--cg-font-size-2xs)`.
4. Replace `letter-spacing: 0.05em` with `var(--cg-letter-spacing-wide)`.
5. Standardize focus ring to `box-shadow` double-ring pattern.
6. Add `@media (prefers-reduced-motion)` to disable transition.
7. Replace emoji icons with SVG for cross-platform consistency.

## Interaction Fixes Needed

1. Change `role="img"` to `role="group"` — content is interactive.
2. Add keyboard arrow navigation between nodes.
3. Handle non-sequential edges (branching/merging flows).
4. Add loading state for graph computation.
5. Add zoom/pan controls for large graphs.
6. Add tooltip on node hover with full label and metadata.
7. Add `aria-live` for highlight path changes.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders nodes in topological order | render |
| 2 | Edge connectors render between connected nodes | render |
| 3 | Horizontal layout flows left-to-right | render |
| 4 | Vertical layout flows top-to-bottom | render |
| 5 | Node icons match type (source/transform/model/output) | render |
| 6 | Node status dots show correct colors | render |
| 7 | Node click fires `ai-lineage-node-click` with id/label/type | interaction |
| 8 | `highlightPath` highlights upstream nodes and edges | render |
| 9 | Non-highlighted nodes and edges use default styling | render |
| 10 | Type badges render with correct text | render |
| 11 | Focus-visible ring on node buttons | a11y |
| 12 | Keyboard Enter on node fires click event | a11y |
| 13 | Unconnected nodes still render in the flow | render |
| 14 | Arrow indicators show correct direction per layout | render |
