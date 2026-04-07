# ai-diff-panel — Improvement Plan

## Current State

### CSS Audit
| Property | Value | Token? | Issue |
|---|---|---|---|
| `:host` animation duration | `200ms` | No | Should use motion token |
| `.side-by-side` max-height | `400px` | No | Magic number, not configurable |
| `.inline-diff` max-height | `400px` | No | Magic number, not configurable |
| `.labels` letter-spacing | `0.05em` | No | Should use `--cg-letter-spacing-wide` |
| All colors | Uses tokens | Yes | Good |
| All spacing | Uses tokens | Yes | Good |
| All border-radius | Uses tokens | Yes | Good |
| `.mode-btn` transition | `all var(--cg-motion-duration-fast)` | Partial | `all` is non-specific |

### States Audit
| State | Implemented? | Notes |
|---|---|---|
| Default (side-by-side) | Yes | Two-column diff view |
| Inline mode | Yes | Single column with +/- prefix |
| Empty | Yes | "No content to compare" |
| Hover (panel) | Yes | Border color shift |
| Hover (diff line) | No | No hover feedback on diff lines |
| Focus-visible | Yes | Double ring outline |
| Mode toggle | Yes | Active state on selected mode |
| Loading | No | No loading/skeleton state |
| Error | No | No error state |
| Line selection | No | Click fires event but no visual selected state |

### Interaction Audit
- Mode toggle between side-by-side and inline - OK
- Diff line click dispatches `ai-diff-select` - OK
- Stats bar shows addition/removal/unchanged counts - OK
- Labels for before/after columns - OK
- Diff caching to avoid recomputation - OK
- No keyboard handler on diff lines (they are clickable but no tabindex)
- Mode buttons have no ARIA roles

## Style Fixes Needed

1. **Tokenize animation duration** on `:host` to use `var(--cg-motion-duration-fast)`
2. **Make max-height configurable** — expose as CSS property or prop instead of hardcoded `400px`
3. **Tokenize letter-spacing** in `.labels` to `var(--cg-letter-spacing-wide)`
4. **Replace `all` in transition** with specific properties
5. **Add hover state on diff lines** for visual feedback
6. **Add selected state on clicked diff line** with accent background

## Interaction Fixes Needed

1. **Add `tabindex="0"` and keyboard handling** on diff lines — they dispatch click events but are not keyboard-accessible
2. **Add ARIA roles on mode toggle** — `role="radiogroup"` with `role="radio"` and `aria-checked`
3. **Add loading state** for async diff computation
4. **Add copy functionality** — button to copy diff to clipboard
5. **Add line-level hover highlight** on diff lines for discoverability
6. **Improve diff algorithm** — comment notes "not LCS"; consider upgrading for production accuracy
7. **Add `aria-label` on diff lines** describing the change type and content

## Test Spec

### Unit Tests
- [ ] renders side-by-side diff with correct left/right alignment
- [ ] renders inline diff with +/- prefixes
- [ ] computes correct stats (additions, removals, unchanged)
- [ ] handles empty before/after strings
- [ ] handles identical before/after strings (all unchanged)
- [ ] handles completely different before/after strings
- [ ] caches diff results when inputs unchanged
- [ ] mode toggle switches between side-by-side and inline
- [ ] renders column labels from `labels` prop
- [ ] shows empty state when both beforeCode and afterCode are empty

### Event Tests
- [ ] dispatches `ai-diff-select` on diff line click with type, content, lineNum
- [ ] mode toggle updates `mode` property

### Accessibility Tests
- [ ] panel has `role="group"` and `aria-label` with title
- [ ] focus-visible double ring on panel
- [ ] diff lines should be keyboard-accessible
- [ ] mode toggle should have proper ARIA radiogroup pattern

### Visual Regression Tests
- [ ] snapshot: side-by-side diff with additions and removals
- [ ] snapshot: inline diff
- [ ] snapshot: all-unchanged diff
- [ ] snapshot: empty state
