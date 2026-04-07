# ai-json-viewer — Improvement Plan

## Current State

### CSS Audit
| Property | Value | Token? | Issue |
|---|---|---|---|
| `:host` animation duration | `200ms` | No | Should use motion token |
| `.toggle` transition | `color 100ms ease` | No | Duration not tokenized |
| All colors | Uses tokens | Yes | Good token usage for syntax highlighting |
| All spacing | Uses tokens | Yes | Good |
| All border-radius | Uses tokens | Yes | Good |
| `.root` overflow-x | `auto` | OK | Needed for horizontal scroll |

### States Audit
| State | Implemented? | Notes |
|---|---|---|
| Default (expanded) | Yes | All nodes expanded |
| Collapsed (per node) | Yes | Toggle buttons |
| Max depth auto-collapse | Yes | Beyond `maxDepth` nodes collapse |
| Circular reference | Yes | Shows "[Circular]" |
| Empty object/array | Yes | Shows `{}` or `[]` |
| Hover (key) | Yes | Underline on key names |
| Hover (toggle) | Yes | Color brightens |
| Focus-visible (toggle) | Yes | Accent outline |
| Focus-visible (key) | Partial | Key has tabindex but no explicit focus style |
| Loading | No | No loading/skeleton state |
| Error | No | No error state for unparseable data |
| Null data | Partial | Renders "null" text |

### Interaction Audit
- Toggle buttons expand/collapse nodes - OK
- Key click dispatches `ai-json-path-click` with JSON path - OK
- Key Enter keydown also dispatches path click - OK
- Keys have `tabindex="0"` and `role="button"` - OK
- Toggle buttons have `tabindex="0"` and `aria-label` - OK
- Root has `role="tree"` - OK
- Circular reference detection with WeakSet, reset each render - OK
- Collapsed hint shows item/key count - OK

## Style Fixes Needed

1. **Tokenize animation duration** on `:host` to `var(--cg-motion-duration-fast)`
2. **Tokenize toggle transition** duration to `var(--cg-motion-duration-fast)`
3. **Add focus-visible style for keys** — keys have tabindex but no visible focus indicator
4. **Add copy-on-click visual feedback** for key paths

## Interaction Fixes Needed

1. **Add loading state** for async data loading
2. **Add error state** for invalid data
3. **Add copy-to-clipboard on key click** — currently only dispatches event; consider clipboard copy option
4. **Add `aria-expanded` on toggle buttons** reflecting collapsed state
5. **Add Space key handler on keys** — currently only Enter triggers path click
6. **Improve tree item ARIA** — nodes should use `role="treeitem"` with `aria-expanded`
7. **Search/filter functionality** — ability to search within JSON keys or values
8. **Add line numbers** option for large JSON documents

## Test Spec

### Unit Tests
- [ ] renders primitive values: string, number, boolean, null
- [ ] renders nested objects with correct indentation
- [ ] renders arrays with correct indentation and item count
- [ ] collapses/expands nodes on toggle click
- [ ] auto-collapses nodes beyond `maxDepth`
- [ ] starts collapsed when `expanded=false`, toggle to expand
- [ ] detects and displays circular references as "[Circular]"
- [ ] shows item count hint when collapsed (e.g., "3 keys", "5 items")
- [ ] handles empty objects and arrays
- [ ] handles deeply nested structures
- [ ] handles null data input
- [ ] handles string/number/boolean data at root level

### Event Tests
- [ ] dispatches `ai-json-path-click` on key click with correct JSON path
- [ ] dispatches path click on Enter key
- [ ] path includes array indices (e.g., `$.items[0].name`)

### Accessibility Tests
- [ ] root has `role="tree"` and `aria-label="JSON viewer"`
- [ ] toggle buttons have `tabindex="0"` and `aria-label` (Expand/Collapse)
- [ ] keys have `tabindex="0"`, `role="button"`, and `aria-label`
- [ ] focus-visible outlines on toggles and keys

### Visual Regression Tests
- [ ] snapshot: expanded object with mixed types
- [ ] snapshot: collapsed object at max depth
- [ ] snapshot: array with nested objects
- [ ] snapshot: circular reference display
