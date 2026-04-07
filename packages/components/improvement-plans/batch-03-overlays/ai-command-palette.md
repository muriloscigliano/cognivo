# ai-command-palette Improvement Plan

**Component**: `ai-command-palette`
**Category**: AI-Native
**File**: `src/components/ai-command-palette/ai-command-palette.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Raw `rgba()` colors throughout (overlay backdrop, hover background, match highlight, shortcut badge -- lines 45, 123, 134, 146)
2. No focus trap -- Tab key can escape the palette overlay to the page behind it
3. Magic numbers in CSS (z-index `9998`, padding-top `15vh`, max-width `520px`, max-height `360px`)

---

## 1. Functional Issues

1. **No focus trap** (entire component): The palette is a modal dialog (`aria-modal="true"`) but has no focus trap implementation. Pressing Tab from the search input can move focus to elements behind the overlay.
   - **Fix**: Implement Tab/Shift+Tab focus trapping within the palette container.

2. **No scroll lock** (entire component): Opening the palette does not prevent background page scrolling. Users can scroll the page behind the overlay.
   - **Fix**: Set `document.body.style.overflow = 'hidden'` on open, restore on close.

3. **No return focus on close** (lines 198-203): When the palette closes, focus is not returned to the element that was focused before opening.
   - **Fix**: Save `document.activeElement` on open, restore on close.

4. **ArrowDown doesn't wrap** (line 221): `Math.min(this._activeIndex + 1, list.length - 1)` stops at the last item instead of wrapping to the first.
   - **Fix**: `this._activeIndex = (this._activeIndex + 1) % list.length`.

5. **ArrowUp doesn't wrap** (line 224): `Math.max(this._activeIndex - 1, 0)` stops at the first item instead of wrapping to the last.
   - **Fix**: `this._activeIndex = this._activeIndex <= 0 ? list.length - 1 : this._activeIndex - 1`.

6. **Active item not scrolled into view** (lines 220-226): When navigating with ArrowDown/Up, the active item may be outside the visible scroll area of `.results`.
   - **Fix**: Call `scrollIntoView({ block: 'nearest' })` on the active item after updating the index.

7. **No Cmd+K / Ctrl+K global keyboard shortcut**: The palette has no built-in global shortcut to open it. The consumer must implement this externally.
   - **Fix**: Add an optional `shortcut` property and global keydown listener.

8. **Fuzzy search is actually substring search** (line 177): `label.toLowerCase().includes(q)` is a simple substring match, not fuzzy search as the JSDoc claims.
   - **Fix**: Either rename the JSDoc to "substring search" or implement actual fuzzy matching (character-by-character with gap tolerance).

---

## 2. Interaction Issues

### 2.1 State Coverage

| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default (closed) | ✅ | ✅ | Returns `nothing` when not open |
| Default (open) | ✅ | ✅ | Fade+slide animation |
| Hover (item) | ✅ | Partial | `rgba(255, 255, 255, 0.06)` is not a token |
| Active (item) | ✅ | Partial | `data-active="true"` uses same raw color |
| Focus (item) | ✅ | ✅ | `focus-visible` outline uses `--cg-color-accent` |
| Disabled | ❌ | N/A | No disabled commands concept |
| Loading | ❌ | N/A | No loading state for async command search |
| Error | ❌ | N/A | No error state for failed command execution |
| Success | ❌ | N/A | No success feedback after command selection |

### 2.2 Keyboard Navigation
- **ArrowDown / ArrowUp**: Navigate items (lines 220-225). Does NOT wrap.
- **Enter**: Selects active item (lines 226-228).
- **Escape**: Closes palette (lines 229-231).
- **Missing**: Home/End to jump to first/last item.
- **Missing**: Tab focus trapping.
- **Missing**: Typeahead is handled by the search input, which is correct.

### 2.3 Focus Management
- **On open**: Focus moves to search input (line 194).
- **On close**: Focus is NOT returned to previous element.
- **Focus trap**: NOT IMPLEMENTED.
- **Active item**: Not scrolled into view on keyboard navigation.

### 2.4 ARIA & Accessibility
- `role="dialog"` and `aria-modal="true"` on overlay (lines 259-260).
- `aria-label="Command palette"` on overlay (line 261).
- Search input has `aria-label="Search commands"` (line 273).
- Results use `role="listbox"` (line 277).
- Items use `role="option"` with `aria-selected` (lines 288-290).
- **Issue**: `role="listbox"` with `role="option"` is semantically correct, but category labels inside the listbox are not wrapped in `role="group"` with `aria-label`.
- **Missing**: `aria-activedescendant` on the search input pointing to the active option.

### 2.5 Touch & Mobile
- Overlay click to close works (line 247).
- **Missing**: No responsive design -- `max-width: 520px` is fine, but `padding-top: 15vh` may position the palette too low on mobile.
- **Missing**: No mobile-friendly adjustments (e.g., full-width on small screens).

---

## 3. Styling Issues

### 3.1 Magic Numbers Found

| Line | Value | Suggested Token |
|------|-------|-----------------|
| 44 | `z-index: 9998` | `var(--cg-z-index-modal, 9998)` |
| 49 | `padding-top: 15vh` | `var(--cg-command-palette-offset, 15vh)` |
| 54 | `max-width: 520px` | `var(--cg-command-palette-max-width, 520px)` |
| 91 | `max-height: 360px` | `var(--cg-command-palette-results-max-height, 360px)` |
| 103 | `letter-spacing: 0.05em` | `var(--cg-letter-spacing-wide, 0.05em)` |
| 120 | `min-height: var(--cg-spacing-40, 40px)` | Already tokenized -- good |

### 3.2 Raw Colors Found

| Line | Color | Suggested Token |
|------|-------|-----------------|
| 45 | `rgba(0, 0, 0, 0.6)` | `var(--cg-color-overlay-backdrop)` |
| 123 | `rgba(255, 255, 255, 0.06)` | `var(--cg-color-surface-hover-background)` |
| 134 | `rgba(223, 255, 97, 0.25)` | `var(--cg-color-accent-translucent, rgba(223, 255, 97, 0.25))` |
| 146 | `rgba(255, 255, 255, 0.06)` | `var(--cg-color-surface-subtle-background)` |

### 3.3 Typography Issues
- Category label `font-weight: 600` (line 101) should use `var(--cg-font-weight-semibold, 600)`.
- `letter-spacing: 0.05em` (line 103) should use a token.

### 3.4 Spacing Issues
- All major spacing values use tokens correctly.
- No significant issues.

### 3.5 Modern Design Enhancements
- Fade+slide entrance animation is good.
- Background gradient overlay present.
- Glassmorphism box-shadow with inset highlight present.
- **Add**: Backdrop-filter blur on the overlay for depth behind the palette.
- **Add**: Subtle border gradient on the palette container.
- **Add**: Search input focus indicator (currently no visual change when focused).
- **Add**: Command execution feedback (brief success animation/flash).
- **Add**: Recent commands section at the top of results.

---

## 4. Prioritized Fixes

### P0 - Critical
1. **Implement focus trap** -- As a modal dialog with `aria-modal="true"`, Tab must not escape to the page. This is a WCAG 2.4.3 failure.
2. **Add scroll lock** -- Background page scrolls while the modal palette is open.
3. **Add return focus on close** -- Keyboard users lose their place.

### P1 - High
4. **Replace all raw `rgba()` colors with semantic tokens** -- 4 instances.
5. **Replace magic numbers with tokens** -- z-index, padding-top, max-width, max-height.
6. **Scroll active item into view** on keyboard navigation.
7. **Wrap ArrowDown/ArrowUp** so navigation cycles through the list.
8. **Add `aria-activedescendant`** on the search input for screen readers.

### P2 - Medium
9. **Add Home/End keyboard shortcuts** to jump to first/last result.
10. **Wrap category groups in `role="group"`** with `aria-label` for screen readers.
11. **Add loading state** with skeleton items for async command sources.
12. **Add search input focus indicator** styling.
13. **Rename "fuzzy search" to "substring search"** or implement real fuzzy matching.
14. **Add backdrop-filter blur** to overlay.

### P3 - Low
15. **Add global Cmd+K / Ctrl+K shortcut** as an opt-in feature.
16. **Add recent commands section**.
17. **Add command execution success feedback** animation.
18. **Add responsive adjustments** for mobile viewports.
19. **Add disabled commands concept** with visual styling.
