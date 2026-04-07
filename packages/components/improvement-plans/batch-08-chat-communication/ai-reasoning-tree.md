# ai-reasoning-tree Improvement Plan

**Component**: `ai-reasoning-tree`
**Category**: AI-Native
**File**: `src/components/ai-reasoning-tree/ai-reasoning-tree.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Extensive raw hex colors for node types -- 12 instances of raw hex (lines 104-107, 122-124, 146-149) not using design tokens
2. Pervasive magic numbers in font sizes and spacing (lines 56, 60, 62, 70-71, 76, 79, 101, 107, 119, 133, 143, 151)
3. Tree ARIA pattern is incomplete -- uses `role="treeitem"` without proper `role="tree"` nesting and `aria-level`/`aria-setsize`/`aria-posinset`

---

## 1. Functional Issues

- **Line 165-170**: `_collapsed` is a `Set<string>` managed via `@state()`. The toggle creates a new Set each time, which is correct for Lit reactivity. However, for large trees this could be expensive.
- **Line 184-195**: `_expandAll` and `_collapseAll` work but `_collapseAll` recursively collects all node IDs -- no memoization, runs every click.
- **Line 212**: `_renderNode` returns `unknown` type -- should return `TemplateResult`.
- **Line 221**: The `@click` handler on `.node-header` both toggles the node AND fires `ai-reasoning-node-click`. These should be separate actions -- clicking to expand/collapse should not also fire a "node clicked" event, or at minimum the event should include the `expanded` state.
- **Line 163**: `highlightPath` is typed as `string[]` but lookups use `Array.includes()` (line 215), which is O(n) per node. For large trees with long highlight paths, this should be a Set.
- **Line 50-53**: Toolbar padding and font styles use a mix of tokens and magic numbers.

## 2. Interaction Issues

### 2.1 State Coverage
Current states:
- Default (expanded node)
- Collapsed
- Highlighted (path highlight)
- Hover on node header
- Focus-visible on node header

Missing states:
- **Active/Pressed** on node headers and toolbar buttons -- no `:active` style
- **Selected** -- no distinct "selected" node state (separate from highlighted path)
- **Loading** -- no state for nodes whose children are being fetched asynchronously
- **Error** -- no state for nodes that failed to resolve
- **Disabled** -- no disabled variant for read-only trees
- **Hover on toolbar buttons** -- exists but no `:active` state
- **Search match** -- no state for nodes matching a search filter

### 2.2 Keyboard Navigation
- **Line 219**: Node headers have `tabindex="0"` -- good.
- **Line 222**: Enter and Space handlers toggle and click -- good.
- **Missing**: Arrow key navigation per WAI-ARIA tree pattern:
  - Up/Down to move between visible nodes
  - Left to collapse or move to parent
  - Right to expand or move to first child
  - Home/End to jump to first/last visible node
- **Missing**: Type-ahead search (pressing a letter jumps to the next node whose label starts with that letter)
- **Missing**: Toolbar buttons (Expand All / Collapse All) have no keyboard shortcut
- **Missing**: No `*` key to expand all siblings (WAI-ARIA tree pattern)

### 2.3 ARIA & Accessibility
- **Line 252**: `role="tree"` on `.nodes` container with `aria-label="Reasoning tree"` -- good.
- **Line 219**: `role="treeitem"` on individual node headers -- good.
- **Line 220**: `aria-expanded` is set conditionally -- good.
- **Line 232**: `role="group"` on children container -- good.
- **Missing**: `aria-level` attribute on each treeitem (depth + 1).
- **Missing**: `aria-setsize` and `aria-posinset` for proper tree item positioning.
- **Missing**: `aria-label` or `aria-describedby` on confidence badges for screen readers.
- **Missing**: Type labels (thought/action/observation/conclusion) are visual-only; need to be included in the treeitem's accessible name.
- **Missing**: Toolbar buttons lack `aria-label` (though their text content is readable).

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Should Be |
|------|-------|-----------|
| 56 | `font-size: 12px` | `var(--cg-font-size-xs)` |
| 57 | `letter-spacing: 0.05em` | `var(--cg-letter-spacing-wide)` |
| 60 | `padding: 3px 10px; border-radius: 5px` | `var(--cg-spacing-2) var(--cg-spacing-10)` / `var(--cg-border-radius-50)` |
| 62 | `font-size: 10px` | `var(--cg-font-size-2xs)` |
| 70 | `padding-left: 24px` | `var(--cg-spacing-24)` |
| 76-80 | `left: 8px; top: 24px; width: 1px` | Tokens |
| 99 | `width: 20px; height: 20px` | `var(--cg-size-icon-container-sm)` |
| 101 | `font-size: 10px` | `var(--cg-font-size-2xs)` |
| 111 | `font-size: 13px` | `var(--cg-font-size-sm)` (closest) |
| 119 | `font-size: 10px; padding: 1px 6px` | Tokens |
| 127 | `font-size: 10px` | `var(--cg-font-size-2xs)` |
| 128 | `width: 12px` | `var(--cg-size-icon-xs)` |
| 133 | `padding-left: 16px` | `var(--cg-spacing-16)` |
| 143 | `font-size: 9px; letter-spacing: 0.05em` | Tokens |
| 151 | `padding: 32px; font-size: 13px` | Tokens |

### 3.2 Raw Colors Found
| Line | Value | Should Be |
|------|-------|-----------|
| 45 | `rgba(255, 255, 255, 0.05)` | `var(--cg-color-surface-overlay-faint)` |
| 46 | `rgba(255, 255, 255, 0.03)` | `var(--cg-color-surface-overlay-subtle)` |
| 94 | `rgba(255, 255, 255, 0.03)` | `var(--cg-color-surface-overlay-subtle)` |
| 104 | `rgba(139, 92, 246, 0.15); color: #a78bfa` | `var(--cg-color-purple-container)` / `var(--cg-purple-400)` |
| 105 | `rgba(59, 130, 246, 0.15); color: #60a5fa` | `var(--cg-color-blue-container)` / `var(--cg-blue-400)` |
| 106 | `rgba(245, 158, 11, 0.15); color: #fbbf24` | `var(--cg-color-amber-container)` / `var(--cg-amber-400)` |
| 107 | `rgba(34, 197, 94, 0.15); color: #4ade80` | `var(--cg-color-success-container)` / `var(--cg-green-400)` |
| 122 | `rgba(34, 197, 94, 0.12); color: #4ade80` | Tokens |
| 123 | `rgba(245, 158, 11, 0.12); color: #fbbf24` | Tokens |
| 124 | `rgba(239, 68, 68, 0.12); color: #f87171` | Tokens |
| 137 | `rgba(223, 255, 97, 0.04)` | `var(--cg-color-accent-container-subtle)` |
| 146-149 | `#a78bfa`, `#60a5fa`, `#fbbf24`, `#4ade80` | Semantic tokens |

### 3.3 Spacing Issues
- Node padding-left (line 70) uses raw `24px` instead of `var(--cg-spacing-24)`.
- Connector line positioning (lines 76-80) uses all raw pixel values.
- Children indentation (line 133) uses raw `16px`.
- Toolbar button padding (line 60) uses raw `3px 10px`.
- Confidence badge padding (line 119) uses raw `1px 6px`.

### 3.4 Modern Design Enhancements
- Add animated connecting lines that draw in when nodes expand
- Add a subtle pulsing dot for "in-progress" nodes (currently reasoning)
- Add depth-based indentation color bands
- Add node type filtering in toolbar
- Add search/filter capability
- Add minimap for deeply nested trees
- Consider horizontal layout option for wide trees

## 4. Prioritized Fixes

### P0 - Critical
1. Add `aria-level`, `aria-setsize`, and `aria-posinset` to tree items for proper ARIA tree pattern
2. Implement WAI-ARIA tree keyboard navigation (Arrow keys, Home, End)

### P1 - High
3. Replace all 12+ raw hex colors with semantic design tokens
4. Replace all 15+ magic number values with design tokens
5. Add `:active` state to node headers and toolbar buttons
6. Separate expand/collapse action from node-click event dispatch (line 221)
7. Include node type in accessible name of treeitem
8. Convert `highlightPath` from array to Set for O(1) lookups

### P2 - Medium
9. Add loading state for async child node fetching
10. Add error state for failed nodes
11. Add `font-size: 13px` token (or use `var(--cg-font-size-sm)`)
12. Add `font-size: 9px/10px` token usage
13. Return typed `TemplateResult` from `_renderNode` instead of `unknown`
14. Add search/filter toolbar control

### P3 - Low
15. Add animated connector lines on expand
16. Add in-progress node pulsing state
17. Add horizontal layout option
18. Add type-ahead search keyboard support
19. Add depth color bands
20. Memoize `_collapseAll` node ID collection
