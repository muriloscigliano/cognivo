# ai-source-graph — Improvement Plan

## Current State

### CSS Audit
| Property | Value | Token? | Issue |
|---|---|---|---|
| No `:host` animation | Missing | No | Other components use fadeSlideIn; this one does not import it |
| `.node-circle` transition | `opacity var(--cg-motion-duration-fast)` | Yes | Good |
| `.detail` animation | `fadeIn 200ms ease` | No | Local keyframe, duration not tokenized |
| `svg` display | `block; margin: 0 auto` | OK | Centered |
| SVG dimensions | Hardcoded `320x240` | No | Not responsive |
| `.node-label` font-size | `var(--cg-font-size-xs)` | Yes | Good |
| All colors | Uses tokens | Yes | Good |
| All spacing | Uses tokens | Yes | Good |
| Focus-visible | Double ring pattern | Yes | Good |

### States Audit
| State | Implemented? | Notes |
|---|---|---|
| Default | Yes | Radial graph with center node and source nodes |
| Selected node | Yes | Thicker stroke, detail panel shown |
| Hover (node) | Yes | Opacity reduction |
| Empty | Yes | "No source data" message |
| Focus-visible | Yes | Double ring outline |
| Detail panel | Yes | Expands below graph with type/title/weight/excerpt |
| Loading | No | No loading/skeleton state |
| Error | No | No error state |
| Disabled | No | No disabled state |

### Interaction Audit
- Node click dispatches `ai-source-click` and toggles detail panel - OK
- SVG nodes have `tabindex="0"` and `role="button"` - OK
- Nodes have `aria-label` with title and weight percentage - OK
- Edge line thickness based on weight - OK
- Type-specific colors for doc/web/database/api - OK
- Type icons (text abbreviations) in nodes - OK
- Container has `role="figure"` and `aria-label` - OK
- No keyboard handler on SVG circles (missing Enter/Space)
- Title label truncation at 15 characters - OK

## Style Fixes Needed

1. **Add entrance animation** — import and apply fadeSlideIn like other components
2. **Tokenize detail animation** duration
3. **Make SVG responsive** — use viewBox with percentage width instead of fixed 320x240
4. **Node radius and positions hardcoded** — `cx=160, cy=120, radius=80` should scale

## Interaction Fixes Needed

1. **Add keyboard handler on SVG circles** — Enter/Space should trigger node click
2. **Add loading state** with skeleton graph
3. **Add error state** for invalid source data
4. **Improve node accessibility** — nodes should have `aria-describedby` linking to detail panel
5. **Add hover tooltip** on nodes for quick info without click
6. **Deselect node on click outside** — clicking empty SVG area should clear selection
7. **Edge accessibility** — edges have no ARIA; consider `aria-hidden="true"` explicitly
8. **Responsive layout** — graph doesn't resize with container

## Test Spec

### Unit Tests
- [ ] renders center "AI" node
- [ ] renders source nodes positioned in a circle
- [ ] renders edge lines from center to each source
- [ ] edge line thickness scales with source weight
- [ ] node color matches source type (doc=blue, web=lightblue, database=green, api=yellow)
- [ ] node icon shows type abbreviation (DOC, WEB, DB, API)
- [ ] truncates long titles to 15 chars with ellipsis
- [ ] shows detail panel when node selected
- [ ] hides detail panel when same node clicked again (toggle)
- [ ] detail panel shows type badge, title, weight, and excerpt
- [ ] renders empty state when sources empty

### Event Tests
- [ ] dispatches `ai-source-click` on node click with id, title, type, weight
- [ ] events bubble and are composed

### Accessibility Tests
- [ ] container has `role="figure"` and `aria-label="Source attribution graph"`
- [ ] source nodes have `role="button"`, `tabindex="0"`, and descriptive `aria-label`
- [ ] focus-visible double ring on all interactive elements
- [ ] nodes should be keyboard-activatable (Enter/Space)

### Visual Regression Tests
- [ ] snapshot: graph with 3 sources of different types
- [ ] snapshot: graph with selected source showing detail panel
- [ ] snapshot: empty state
- [ ] snapshot: single source
