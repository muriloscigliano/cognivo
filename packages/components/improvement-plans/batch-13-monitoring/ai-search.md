# AI Search Improvement Plan

**Component**: `ai-search`
**Category**: AI-Native
**File**: `src/components/ai-search/ai-search.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Dropdown close uses `setTimeout` with 200ms delay (line 248) -- race condition prone and brittle
2. Result items and recent items lack ARIA roles and keyboard navigation within the listbox
3. Missing disabled, loading, and error states

---

## 1. Functional Issues
- **Line 248**: `setTimeout(() => { this._open = false; }, 200)` is a common but fragile pattern. If the user clicks a result and the timeout fires first, the dropdown closes before the click registers. If the timeout is too short, clicks are missed. Should use `@mousedown` with `preventDefault` (partially done on some items) or `focusout` with `relatedTarget` check.
- **Line 252**: ArrowDown/ArrowUp navigation only covers `results` and `suggestions`, but not `recentSearches` or `filters`. Users cannot arrow-key navigate to recent searches.
- **Line 259**: `this.results[this._highlightIndex]!` uses non-null assertion. If `_highlightIndex` is out of bounds due to results changing mid-navigation, this will throw.
- **No debounce on input**: Line 233-240 fires `ai-search-query` on every keystroke. Should debounce for performance.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | Collapsed state with shortcut hint |
| Hover | Partial | Filter tags, result items, recent items |
| Active/Pressed | No | No `:active` state on any element |
| Focus | Yes | Input focus-within changes border, filter tags have focus-visible |
| Disabled | No | No disabled state |
| Loading | No | No loading/searching indicator |
| Error | No | No error state for search failures |
| Empty | No | No "no results found" state |
| Open | Yes | Dropdown visibility |

**Missing**: active, disabled, loading, error, empty-results states (5 of 8+ missing).

### 2.2 Keyboard Navigation
- **Input** (lines 250-255): Arrow keys, Enter, Escape -- good base.
- **Result items**: Highlighted via `_highlightIndex` but items don't have `aria-selected` attribute.
- **Filter tags**: No keyboard navigation between filters (no arrow key support).
- **Recent searches**: Not included in arrow key navigation at all.
- **No `aria-activedescendant`** on input for screen reader tracking of highlighted item.

### 2.3 ARIA & Accessibility
- **Line 299**: `role="combobox"` with `aria-expanded` and `aria-haspopup="listbox"` -- good.
- **Line 316**: Dropdown has `role="listbox"` -- good, but `aria-live="polite"` on a listbox is unusual.
- **Line 332**: Result items have `role="option"` -- good.
- **Missing**: `aria-selected` on highlighted option, `aria-activedescendant` on input, `id` attributes on options.
- **Filter section** inside listbox: Filters with `role="group"` are not valid children of `role="listbox"`. Filters should be outside the listbox or the listbox pattern needs restructuring.
- **Recent delete button** (line 195-203): Has `opacity: 0` when not hovered -- invisible to screen readers but still in tab order. Need `aria-hidden` or different approach.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggestion |
|------|-------|------------|
| 112 | `z-index: 100` | Use `var(--cg-z-index-dropdown, 100)` |
| 113 | `max-height: 360px` | Use a component-level CSS custom property |

### 3.2 Raw Colors Found
No raw hex colors outside of token fallbacks -- good.

### 3.3 Spacing Issues
- Overall spacing is well-tokenized with `var(--cg-spacing-*)` throughout -- good.
- Transition durations on lines 55, 98, 148-149, 163, 198, 203 use raw ms values.

### 3.4 Modern Design Enhancements
- Add a subtle loading spinner or dots animation in the input when searching.
- Result items could have a subtle left-border accent on highlight.
- Consider adding a "no results" empty state with illustration.
- The keyboard shortcut badge could animate in/out when input gains/loses focus.
- Add smooth scroll-into-view for the highlighted item in a long dropdown.

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix dropdown close race condition** (line 248): Replace `setTimeout` with `focusout` + `relatedTarget` check or a more robust pattern.
2. **Fix ARIA listbox structure**: Move filters outside `role="listbox"` or restructure to a proper composite widget pattern.

### P1 - High
3. **Add `aria-activedescendant`** to input referencing highlighted option ID.
4. **Add `aria-selected`** to highlighted result option.
5. **Add "no results" empty state** when query returns no matches.
6. **Add loading state** with spinner/indicator during search.
7. **Add disabled state** for read-only or non-interactive scenarios.
8. **Include recent searches in keyboard navigation** (arrow keys).
9. **Add `:active` press state** to filter tags and result items.

### P2 - Medium
10. **Add input debounce** for `ai-search-query` event dispatch.
11. **Bounds-check `_highlightIndex`** (line 259) before accessing array.
12. **Replace `z-index: 100`** (line 112) with a z-index token.
13. **Replace transition durations** with motion tokens.
14. **Fix recent delete button visibility** -- use proper hidden/shown pattern that works with screen readers.

### P3 - Low
15. **Add error state** for search failures.
16. **Add scroll-into-view** for highlighted items in long dropdown.
17. **Modern design polish** -- loading animation, highlight accent border, shortcut badge animation.
