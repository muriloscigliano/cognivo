# ai-accessibility-report Improvement Plan

**Component**: `ai-accessibility-report`
**Category**: AI-Native
**File**: `src/components/ai-accessibility-report/ai-accessibility-report.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. `_getScoreColor()` (lines 242-247) returns raw hex colors (`#4ade80`, `#facc15`, `#fb923c`, `#f87171`) used in inline styles, making the component unthemable
2. Raw hex `#facc15` and `#c084fc` used without token references for warning/AAA severity (lines 120, 165, 192, 197)
3. Missing `role="meter"` or equivalent ARIA on the SVG score ring -- ironic for an accessibility report component

---

## 1. Functional Issues

- **Inline style colors bypass tokens (lines 283, 287)**: `stroke="${scoreColor}"` and `style="color:${scoreColor}"` inject raw hex from `_getScoreColor()`. These cannot be overridden by theme tokens.
- **SVG hardcoded dimensions (lines 58-59, 63-64)**: Score circle uses hardcoded `64px` width/height with no token or CSS custom property.
- **No score validation**: `this.score` accepts any number. Values outside 0-100 will produce broken SVG strokes (negative offsets or overflows).
- **No sorting/filtering**: Issues cannot be sorted by severity or filtered. For large reports, this is a UX problem.
- **`_expanded` index instability**: Like other components in this batch, the Set-based index tracking will break if the `issues` array is reordered or filtered dynamically.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | |
| Hover | Yes | `.issue-header:hover` (line 150) |
| Active | No | No `:active` press style |
| Focus | Yes | `:focus-visible` (line 155) |
| Disabled | No | No disabled state |
| Loading | No | No skeleton/loading state |
| Error | No | No error state for malformed issue data |
| Empty | Yes | `.empty` message (line 304) with `role="status"` |
| Expanded | Yes | `_expanded` set toggle per issue |

**Missing**: `:active`, disabled, loading, error states (4 missing).

### 2.2 Keyboard Navigation
- Issue headers are `<button>` elements -- good.
- **Missing**: Arrow key navigation between issues.
- **Missing**: `Escape` to collapse expanded issue.
- **Missing**: Skip navigation to jump to errors first (most critical).

### 2.3 ARIA & Accessibility
- Good: `role="meter"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label` on score circle (lines 278-279).
- Good: `role="list"` and `role="listitem"` on issue list (lines 307, 309).
- Good: `aria-expanded` on issue headers (line 312).
- Good: `role="status"` on empty state (line 305).
- **Issue**: Severity icons use HTML entities (lines 264-268) with `aria-label` which is good, but the `<span>` has no explicit `role="img"` so the `aria-label` may be ignored by some screen readers.
- **Issue**: The breakdown summary (lines 291-300) has no `role="status"` or landmark to help screen readers understand it's a summary.
- **Issue**: Color-only severity differentiation (dots and icons) with no shape/pattern fallback for colorblind users.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 58 | `64px` | `.score-circle width/height` | `var(--cg-size-16, 64px)` |
| 63 | `64px` | `.score-circle svg` | Same as above |
| 71 | `5` | `.score-bg stroke-width` | Not a CSS value but SVG attr -- consider extracting |
| 76 | `5` | `.score-fg stroke-width` | Same |
| 98 | `4px` | `.title margin-bottom` | `var(--cg-spacing-4, 4px)` |
| 114 | `8px` | `.sev-dot width/height` | `var(--cg-spacing-8, 8px)` |
| 178 | `2px` | `.level-badge padding` | `var(--cg-spacing-2, 2px)` |
| 180 | `10px` | `.level-badge font-size` | `var(--cg-font-size-2xs, 10px)` |
| 201 | `8px 12px 12px 32px` | `.issue-details padding` | Use spacing tokens |

### 3.2 Raw Colors Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 120 | `#facc15` | `.sev-warning` | `var(--cg-color-status-warning-text-default, #facc15)` |
| 165 | `#facc15` | `.sev-icon-warning` | `var(--cg-color-status-warning-text-default, #facc15)` |
| 186 | `rgba(96, 165, 250, 0.15)` | `.level-A background` | `var(--cg-color-status-info-bg)` |
| 191 | `rgba(250, 204, 21, 0.15)` | `.level-AA background` | `var(--cg-color-status-warning-bg)` |
| 192 | `#facc15` | `.level-AA color` | `var(--cg-color-status-warning-text-default)` |
| 196 | `rgba(192, 132, 252, 0.15)` | `.level-AAA background` | Token needed (`--cg-color-status-info-bg-alt`) |
| 197 | `#c084fc` | `.level-AAA color` | Token needed (`--cg-purple-400`) |
| 243-246 | `#4ade80`, `#facc15`, `#fb923c`, `#f87171` | `_getScoreColor()` | Must use CSS custom properties with tokens |

### 3.3 Spacing Issues
- Most outer spacing uses tokens. Inner `.issue-details` padding (line 201) uses hardcoded `8px 12px 12px 32px`.

### 3.4 Modern Design Enhancements
- **Animated score ring**: Use CSS animation to draw the ring from 0 to score value on mount.
- **Severity filter chips**: Add toggleable filter chips to show/hide errors, warnings, info.
- **Issue count in header**: Show total issue count badge next to the title.
- **Export button**: Allow exporting the report as JSON or text.
- **Score ring gradient**: Use a gradient stroke on the SVG circle for a more polished look.

## 4. Prioritized Fixes

### P0 - Critical
1. **Replace inline `_getScoreColor()` hex** with CSS custom properties: set `--_score-color` on the host using token-based color (e.g., `var(--cg-color-status-success-text-default)` for 90+)
2. Add `role="img"` to severity icon spans (lines 264-268) so `aria-label` is properly announced

### P1 - High
3. Replace all raw hex colors (`#facc15`, `#c084fc`, `#fb923c`) with semantic tokens
4. Replace `rgba()` level badge backgrounds (lines 186, 191, 196) with token-based colors
5. Replace hardcoded `64px` score circle size with a CSS custom property
6. Replace `font-size: 10px` (line 180) with `var(--cg-font-size-2xs, 10px)`
7. Replace `.issue-details` padding (line 201) `8px 12px 12px 32px` with spacing tokens

### P2 - Medium
8. Validate `this.score` to clamp to 0-100 range
9. Add `:active` press styles on issue headers
10. Add `role="status"` on the breakdown summary section
11. Add loading skeleton state
12. Replace `4px` margin (line 98) and `8px` dot size (line 114) with tokens
13. Add animated score ring on mount

### P3 - Low
14. Add severity filter chips
15. Add arrow key navigation between issues
16. Add shape/icon differentiation for colorblind users alongside color dots
17. Add export capability for the report data
18. Add `Escape` key to collapse expanded issues
