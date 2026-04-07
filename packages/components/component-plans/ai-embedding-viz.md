# ai-embedding-viz — Improvement Plan

## Current State

### CSS Audit
| Property | Value | Token? | Issue |
|---|---|---|---|
| `:host` animation duration | `200ms` | No | Should use motion token |
| `.point` transition | `r 120ms ease` | No | Duration not tokenized |
| `.point:hover` r | `7` | No | SVG-specific, acceptable |
| `svg` height | `300px` | No | Hardcoded, should be configurable |
| `.legend-dot` border-radius | `50%` | OK | Standard |
| All colors | Uses tokens | Yes | Good |
| All spacing | Uses tokens | Yes | Good |
| All border-radius | Uses tokens | Yes | Good |
| Focus-visible | Accent outline | Yes | Good |

### States Audit
| State | Implemented? | Notes |
|---|---|---|
| Default | Yes | Scatter plot with colored clusters |
| Hover (point) | Yes | Radius increases, tooltip shows |
| Empty | Yes | "No embedding data" message |
| Focus-visible (point) | Yes | Accent outline |
| Labels shown | Yes | Optional via `showLabels` prop |
| Legend | Yes | Cluster color legend |
| Loading | No | No loading/skeleton state |
| Error | No | No error state |
| Disabled | No | No disabled state |
| Selected point | No | No visual selection state |
| Zoomed | No | No zoom/pan capability |

### Interaction Audit
- Point click dispatches `ai-embedding-point-click` with label, x, y, cluster - OK
- Point hover shows tooltip - OK
- Points have `tabindex="0"`, `role="button"`, `aria-label` - OK
- Keyboard: Enter/Space on points triggers click - OK
- SVG has `role="img"` and `aria-label` - OK
- Legend has `role="list"` with `role="listitem"` - OK
- Normalization scales points to fit viewBox - OK
- Cluster color assignment from palette - OK

## Style Fixes Needed

1. **Tokenize animation duration** on `:host` to `var(--cg-motion-duration-fast)`
2. **Tokenize point transition** duration
3. **Make SVG height configurable** via prop or CSS custom property instead of hardcoded `300px`
4. **Add selected point state** — accent ring or size increase for clicked point
5. **Cluster colors from tokens** — the `CLUSTER_COLORS` array uses hardcoded hex; consider exposing as CSS custom properties

## Interaction Fixes Needed

1. **Add loading state** with skeleton or shimmer
2. **Add error state** for invalid point data
3. **Add selected point visual** — highlight last-clicked point
4. **Add zoom/pan** — for large datasets, allow zoom into regions
5. **Tooltip positioning** — can overflow container; add boundary clamping
6. **Cluster color map clears every render** — `_clusterColorMap.clear()` in render causes colors to reassign on each re-render; move to `willUpdate` or use a reactive controller
7. **Large dataset performance** — no virtualization for hundreds of points; consider limiting visible points or LOD

## Test Spec

### Unit Tests
- [ ] renders scatter plot with correct number of points
- [ ] normalizes point coordinates to SVG viewBox
- [ ] assigns cluster colors from palette
- [ ] uses custom color when point has `color` property
- [ ] renders point labels when `showLabels=true`
- [ ] hides labels when `showLabels=false`
- [ ] renders cluster legend
- [ ] renders point count in header
- [ ] shows tooltip on point hover
- [ ] handles empty points array
- [ ] handles single point (centered)
- [ ] handles points with no cluster

### Event Tests
- [ ] dispatches `ai-embedding-point-click` on point click with label, x, y, cluster
- [ ] dispatches click on Enter/Space key
- [ ] events bubble and are composed

### Accessibility Tests
- [ ] container has `role="region"` and `aria-label` with title
- [ ] SVG has `role="img"` and descriptive `aria-label`
- [ ] points have `role="button"`, `tabindex="0"`, and `aria-label` with label and cluster
- [ ] legend has `role="list"` and `role="listitem"` items
- [ ] focus-visible outline on points

### Visual Regression Tests
- [ ] snapshot: scatter plot with multiple clusters
- [ ] snapshot: scatter plot with labels shown
- [ ] snapshot: single cluster (no legend)
- [ ] snapshot: empty state
