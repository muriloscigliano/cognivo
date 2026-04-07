# ai-diff-panel Improvement Plan

**Component**: `ai-diff-panel`
**Category**: AI-Native
**File**: `src/components/ai-diff-panel/ai-diff-panel.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Magic numbers throughout CSS -- raw pixel values for padding, sizing, widths (lines 65-68, 121, 132-134, 139, 143, 163, 167-169)
2. Raw rgba colors for diff highlighting instead of semantic tokens (lines 41, 151-154)
3. Diff algorithm is simplistic (set-based, not LCS) -- produces suboptimal diffs for moved lines and can lose ordering context

---

## 1. Functional Issues

- **Lines 219-249**: The diff algorithm uses `Set`-based line matching rather than LCS (Longest Common Subsequence). Comment on line 219 acknowledges this: "Simple line-by-line diff (not LCS -- good enough for most cases)". However, this will produce incorrect results when the same line appears multiple times or when lines are reordered.
- **Lines 252-258**: `_stats` getter recomputes the full diff on every access. It's called in `render()`, and `_computeDiff()` is also called separately in `_renderSideBySide()` and `_renderInline()`. The diff is computed 2-3 times per render cycle. Should be memoized.
- **Line 209**: `override title` shadows `HTMLElement.title`, which has browser tooltip behavior. Consider renaming to `panelTitle` or `heading`.
- **Line 182**: Dangling `}` brace at end of CSS block before the `:focus-visible` rule -- potential CSS parsing issue.
- **Line 270-271**: `beforeLines` and `afterLines` are computed but `beforeLines` is unused in `_renderSideBySide` -- dead code.
- **Line 285**: `maxLen` is computed but never used -- dead code.
- **Line 261-265**: `_handleLineClick` fires the event but the diff line is not visually marked as selected. No persistent selection state.

## 2. Interaction Issues

### 2.1 State Coverage
Current states:
- Default (panel rendered)
- Hover (panel border change, elevation)
- Side-by-side mode
- Inline mode
- Active mode toggle button
- Empty state

Missing states:
- **Active/Pressed** on mode toggle buttons -- no `:active` style
- **Focus-visible** on mode toggle buttons -- no specific focus style (only global `:focus-visible`)
- **Selected diff line** -- clicking fires an event but has no visual selection state
- **Hover on diff lines** -- no hover highlighting
- **Loading** -- no skeleton state while diff is being computed
- **Error** -- no state for when diff computation fails
- **Large diff** -- no truncation or "show more" for very large diffs
- **Disabled** -- no disabled variant

### 2.2 Keyboard Navigation
- **Missing**: Diff lines are not focusable -- no `tabindex` on `.diff-line` elements
- **Missing**: No arrow key navigation between diff lines
- **Missing**: No keyboard shortcut to toggle between side-by-side and inline modes
- **Missing**: Mode toggle buttons have no `role="tablist"` / `role="tab"` pattern
- **Missing**: No keyboard shortcut to jump to next/previous change (e.g., `n`/`p` keys)
- **Mode toggle buttons**: Clickable but not keyboard-navigable as a group (should use arrow keys between them)

### 2.3 ARIA & Accessibility
- **Line 335**: `role="group"` with `aria-label="${this.title}"` on panel -- adequate.
- **Missing**: Mode toggle should use `role="tablist"` with `role="tab"` on buttons and `aria-selected`.
- **Missing**: Diff lines have no ARIA roles -- should use `role="row"` or at minimum be in a `role="grid"` container for the diff table.
- **Missing**: Line numbers should have `aria-hidden="true"` as they are supplementary.
- **Missing**: Diff type prefixes (+/-/space) should be announced to screen readers (currently visual only in inline mode).
- **Missing**: Stats bar values should have `aria-label` context (e.g., "3 lines added" not just "+3 added").
- **Missing**: No `aria-live` on stats when mode changes cause re-computation.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Should Be |
|------|-------|-----------|
| 65 | `gap: 2px` | `var(--cg-spacing-2)` |
| 68 | `padding: 2px` | `var(--cg-spacing-2)` |
| 121 | `max-height: 400px` | CSS custom property `--cg-diff-max-height` |
| 132 | `padding: 1px 12px` | `var(--cg-spacing-1) var(--cg-spacing-12)` |
| 133 | `min-height: 20px` | Token or CSS custom property |
| 139 | `width: 32px` | Token |
| 143 | `padding-right: 8px` | `var(--cg-spacing-8)` |
| 163 | `max-height: 400px` (repeated) | Same token as line 121 |
| 168 | `width: 20px` | Token |

### 3.2 Raw Colors Found
| Line | Value | Should Be |
|------|-------|-----------|
| 41 | `rgba(255, 255, 255, 0.05)` | `var(--cg-color-surface-overlay-faint)` |
| 42 | `rgba(255, 255, 255, 0.03)` | `var(--cg-color-surface-overlay-subtle)` |
| 151 | `rgba(34, 197, 94, 0.08)` | `var(--cg-color-success-surface)` |
| 153 | `rgba(239, 68, 68, 0.08)` | `var(--cg-color-error-surface)` |

### 3.3 Spacing Issues
- Good token usage in header (lines 55, 71, 91, 108, 177).
- Diff line padding (line 132) uses raw `1px 12px`.
- Mode toggle gap/padding (lines 65, 68) uses raw `2px`.
- Line number width (line 139: `32px`) and prefix width (line 168: `20px`) should be tokens or custom properties.
- `max-height: 400px` repeated twice (lines 121, 163) -- should be a single CSS custom property.

### 3.4 Modern Design Enhancements
- Add hover highlighting on diff lines to make them interactive
- Add word-level diff highlighting within changed lines (not just line-level)
- Add a visual change bar/minimap on the right side showing where changes are
- Add copy buttons for individual diff lines or sections
- Add syntax highlighting support for code diffs
- Add smooth scroll-to animation when clicking stats to jump to first change of that type
- Consider adding a "changes only" filter that hides unchanged lines

## 4. Prioritized Fixes

### P0 - Critical
1. Fix dangling CSS brace at line 182
2. Make diff lines keyboard-accessible with `tabindex` and arrow key navigation

### P1 - High
3. Replace all raw rgba colors with semantic tokens (4 instances)
4. Replace all magic numbers with tokens (9 instances)
5. Memoize `_computeDiff()` result -- currently recomputed 2-3 times per render
6. Add `role="tablist"` / `role="tab"` pattern to mode toggle buttons
7. Add hover state on diff lines
8. Add selected/focused state on clicked diff lines
9. Remove dead code: unused `beforeLines` (line 270), unused `maxLen` (line 285)

### P2 - Medium
10. Add `:active` state to mode toggle buttons
11. Add `aria-hidden="true"` to line numbers
12. Make `max-height` configurable via CSS custom property
13. Add keyboard shortcut for mode toggle (e.g., `m` key)
14. Add jump-to-next-change keyboard shortcut
15. Rename `title` property to `panelTitle` to avoid shadowing `HTMLElement.title`

### P3 - Low
16. Implement word-level diff highlighting within changed lines
17. Add change minimap sidebar
18. Add syntax highlighting support
19. Add "changes only" filter mode
20. Replace set-based diff with proper LCS algorithm for better accuracy
21. Add copy buttons for diff sections
