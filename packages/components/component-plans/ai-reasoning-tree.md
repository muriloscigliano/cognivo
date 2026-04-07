# ai-reasoning-tree — Improvement Plan

## Current State

### CSS Audit
| Property | Value | Token? | Issue |
|---|---|---|---|
| `.node-header` transition | `background var(--cg-motion-duration-fast, 100ms)` | Yes | Good |
| `.expand-icon` transition | `transform var(--cg-motion-duration-fast)` | Yes | Good |
| `.toolbar-btn` transition | `all var(--cg-motion-duration-fast)` | Partial | `all` is non-specific |
| All colors | Uses tokens | Yes | Good |
| All spacing | Uses tokens | Yes | Good |
| All border-radius | Uses tokens | Yes | Good |
| `.node::before` vertical line | `background: var(--cg-color-surface-container-background)` | Yes | Good |

### States Audit
| State | Implemented? | Notes |
|---|---|---|
| Default (expanded) | Yes | All nodes visible |
| Collapsed (per node) | Yes | Content clipped to 1 line |
| Expand all / Collapse all | Yes | Toolbar buttons |
| Highlighted path | Yes | Accent left border + faint background |
| Node types | Yes | thought/action/observation/conclusion with colors |
| Confidence levels | Yes | High (green), medium (yellow), low (red) |
| Hover (node header) | Yes | Subtle background |
| Focus-visible | Yes | Accent outline |
| Empty | Yes | "No reasoning data" message |
| Loading | No | No loading/skeleton state |
| Error | No | No error state |
| Disabled | No | No disabled state |

### Interaction Audit
- Node toggle dispatches `ai-reasoning-expand` - OK
- Node click dispatches `ai-reasoning-node-click` - OK
- Expand All / Collapse All buttons - OK
- Node headers have `tabindex="0"` and `role="treeitem"` - OK
- `aria-expanded` on nodes with children - OK
- Children container has `role="group"` - OK
- Root has `role="tree"` - OK
- Keyboard: Enter/Space on node header - OK
- Vertical connector lines between sibling nodes - OK

## Style Fixes Needed

1. **Replace `all` in toolbar-btn transition** with specific properties
2. **Add `:active` press state** on toolbar buttons and node headers
3. **Confidence badge should use consistent border-radius** — currently `var(--cg-border-radius-50)` which is OK

## Interaction Fixes Needed

1. **Add loading state** with skeleton tree
2. **Add error state** for failed reasoning data
3. **Add arrow key navigation** between sibling nodes (WAI-ARIA tree pattern)
4. **Node click and toggle are combined** — clicking always does both; consider separating node selection from expand/collapse
5. **Toolbar buttons need `aria-label`** — "Expand All" and "Collapse All" as text is OK, but consider adding descriptive aria
6. **Add `aria-level` on tree items** to communicate nesting depth
7. **Add search/filter** — ability to filter nodes by type or search content

## Test Spec

### Unit Tests
- [ ] renders tree with nested nodes
- [ ] renders correct type icon and color for thought/action/observation/conclusion
- [ ] renders confidence badge with correct color class (high/medium/low)
- [ ] collapses node on header click, clips content to 1 line
- [ ] expands collapsed node on header click
- [ ] expand all button expands all nodes
- [ ] collapse all button collapses all nodes with children
- [ ] highlighted path nodes have accent left border
- [ ] vertical connector lines between sibling nodes
- [ ] hides connector line on last child
- [ ] renders empty state when no nodes

### Event Tests
- [ ] dispatches `ai-reasoning-expand` on node toggle with id and expanded state
- [ ] dispatches `ai-reasoning-node-click` on node click with id, type, content
- [ ] keyboard Enter/Space triggers toggle and click
- [ ] events bubble and are composed

### Accessibility Tests
- [ ] root container has `role="tree"` and `aria-label="Reasoning tree"`
- [ ] node headers have `role="treeitem"` and `tabindex="0"`
- [ ] nodes with children have `aria-expanded` attribute
- [ ] children containers have `role="group"`
- [ ] focus-visible outline on node headers and toolbar buttons

### Visual Regression Tests
- [ ] snapshot: expanded tree with mixed node types
- [ ] snapshot: collapsed tree
- [ ] snapshot: highlighted path
- [ ] snapshot: tree with confidence badges
- [ ] snapshot: empty state
