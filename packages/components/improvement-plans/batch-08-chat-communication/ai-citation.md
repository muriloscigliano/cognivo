# ai-citation Improvement Plan

**Component**: `ai-citation`
**Category**: AI-Native
**File**: `src/components/ai-citation/ai-citation.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Multiple magic numbers in sizing (lines 39-40, 46, 69, 71, 82-83, 107-109, 140, 174)
2. Raw rgba colors throughout instead of semantic tokens (lines 43, 54, 85, 219, 325-327)
3. Expanded source card has no close button and no Escape key handler; only way to close is clicking the same badge again

---

## 1. Functional Issues

- **Line 260**: When `sources` is empty, the component returns `nothing`. This is fine but means the component is invisible in the DOM -- consumers cannot style it or show a fallback. Consider an empty-state slot.
- **Line 197-202**: `_handleCiteClick` toggles `_expandedIndex` between the clicked index and `-1`. Only one card can be expanded at a time -- this may be intentional but is not documented.
- **Line 219**: The "+N more" badge has inline style `style="width: auto; padding: 0 6px;"` with raw `6px` -- should use a CSS class with token.
- **Line 229-230**: External URLs are rendered as `<a>` links without sanitization. The `source.url` value should be validated (block `javascript:`, `data:` protocols) similar to the sanitization in `ai-chat`.
- **Line 190-195**: `_getRelevanceClass` treats `0` as falsy, so a source with `relevance: 0` returns `'low'` -- correct but `relevance: undefined` also returns `'low'`. Should be explicit.
- **Line 177**: Dangling `}` brace at end of CSS block -- potential CSS parsing issue.

## 2. Interaction Issues

### 2.1 State Coverage
Current states:
- Default (badge / list item)
- Hover (badge, source title link)
- Focus-visible (badge with outline)
- Expanded (source card shown)

Missing states:
- **Active/Pressed** on cite badges -- no `:active` style
- **Selected** -- no persistent selected state when a card is expanded (badge should look "active")
- **Loading** -- no skeleton state while source details are being fetched
- **Error** -- no state for when a source URL is broken or unavailable
- **Disabled** -- no disabled variant
- **Visited** -- links in list mode have no `:visited` styling

### 2.2 Keyboard Navigation
- **Line 212**: Badges have `tabindex="0"` and `role="button"` -- good.
- **Line 215**: Enter and Space key handlers on badges -- good.
- **Missing**: No Escape key handler to close an expanded source card.
- **Missing**: No arrow key navigation between badges in inline mode.
- **Missing**: In list mode (line 244), list items are not focusable -- no `tabindex` on `.list-item`.
- **Missing**: The expanded source card has no focus management -- when card opens, focus should move to it; when it closes, focus should return to the badge.
- **Missing**: "+N more" badge (line 219) has no keyboard handler or `role="button"`.

### 2.3 ARIA & Accessibility
- **Line 212**: `role="button"` with `aria-label="Source ${i + 1}: ${s.title}"` -- good.
- **Missing**: The expanded source card (line 226) has no `role` or `aria-label`. Should be `role="dialog"` or `role="tooltip"` with appropriate labeling.
- **Missing**: `aria-expanded` on the badge when its card is shown.
- **Missing**: List mode (line 242) should use `role="list"` and `role="listitem"` for proper semantics.
- **Missing**: Relevance dots (lines 107-115, 232) have a `title` attribute but no `aria-label` -- dot alone is not accessible.
- **Missing**: No `aria-label` on the overall component for screen reader context (e.g., "Citations" or "References").

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Should Be |
|------|-------|-----------|
| 39-40 | `width: 16px; height: 16px` | `var(--cg-size-badge-sm)` |
| 45 | `font-size: 10px` | `var(--cg-font-size-2xs)` |
| 48 | `margin: 0 1px` | `var(--cg-spacing-1)` |
| 69 | `margin: 8px 0` | `var(--cg-spacing-8)` |
| 71 | `max-width: 400px` | CSS custom property |
| 82-83 | `width: 20px; height: 20px` | `var(--cg-size-badge-md)` |
| 107-108 | `width: 6px; height: 6px` | `var(--cg-size-dot)` |
| 140 | `gap: 2px` | `var(--cg-spacing-2)` |
| 174 | `letter-spacing: 0.5px` | `var(--cg-letter-spacing-wide)` |
| 219 | `padding: 0 6px` (inline) | Use CSS class with `var(--cg-spacing-6)` |

### 3.2 Raw Colors Found
| Line | Value | Should Be |
|------|-------|-----------|
| 43 | `rgba(223, 255, 97, 0.12)` | `var(--cg-color-accent-container)` |
| 54 | `rgba(223, 255, 97, 0.25)` | `var(--cg-color-accent-container-hover)` |
| 55 | `rgba(223, 255, 97, 0.3)` | Token |
| 65 | `rgba(255, 255, 255, 0.03)` | `var(--cg-color-surface-overlay-subtle)` |
| 72 | `rgba(255, 255, 255, 0.05)` | `var(--cg-color-surface-overlay-faint)` |
| 85 | `rgba(223, 255, 97, 0.12)` (repeated) | Token |

### 3.3 Spacing Issues
- Most spacing uses tokens correctly (lines 68, 79, 87, 121, 145, 165, 175).
- Source card margin (line 69) uses raw `8px 0`.
- List gap (line 140) uses raw `2px`.
- Badge margin (line 48) uses raw `0 1px`.
- Overall good token discipline in the list mode section.

### 3.4 Modern Design Enhancements
- Add a subtle scale/pop animation when expanding a source card
- Add a connecting line or arrow from badge to expanded card
- In list mode, add hover state on list items with subtle background change
- Add a "Copy citation" button on source cards
- Consider a tooltip preview on badge hover (before full expand)
- Add progress/relevance bar instead of just a dot for relevance visualization

## 4. Prioritized Fixes

### P0 - Critical
1. Sanitize `source.url` values before rendering in `<a>` tags (lines 229-230, 249) -- block `javascript:`, `data:` protocols
2. Fix dangling CSS brace at line 177

### P1 - High
3. Replace all raw rgba colors with semantic tokens (6 instances)
4. Replace all magic numbers with tokens (10 instances)
5. Add `aria-expanded` to cite badges when their source card is visible
6. Add Escape key handler to close expanded source cards
7. Add focus management: move focus to card on open, return to badge on close
8. Add `role` and `aria-label` to expanded source card

### P2 - Medium
9. Add `:active` pressed state to badges
10. Add visual "active" state to badge when its card is expanded
11. Make list items focusable with `tabindex="0"` in list mode
12. Add keyboard handler to "+N more" badge
13. Add `aria-label` to relevance dots
14. Add `role="list"` and `role="listitem"` to list mode markup
15. Replace inline style on "+N more" badge with CSS class

### P3 - Low
16. Add tooltip preview on badge hover
17. Add "Copy citation" button on source cards
18. Add relevance bar visualization
19. Add loading/error states for source cards
20. Add empty-state slot for zero sources
