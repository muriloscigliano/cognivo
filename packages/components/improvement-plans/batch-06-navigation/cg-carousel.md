# cg-carousel Improvement Plan

**Component**: `cg-carousel`
**Category**: Foundation
**File**: `src/components/cg-carousel/cg-carousel.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Multiple magic numbers: nav button sizes (40px), dot sizes (8px, 24px), dot gap (6px), positioning offsets (-12px), and border-radius values
2. `!important` used on `.nav-btn:disabled` opacity (line 77) -- should be refactored
3. Missing live region announcements when slides change; screen readers are not informed of current slide

---

## 1. Functional Issues

- **Line 77**: `opacity: 0 !important` on disabled nav buttons -- the `!important` overrides the host hover rule (line 65) but is a code smell. Should restructure the CSS specificity instead.
- **Line 140-141**: Scroll index calculation `Math.round(scrollLeft / itemWidth)` assumes equal-width items. If slotted items have varying widths, this calculation will be inaccurate.
- **Line 121-126**: `firstUpdated` listens for `slotchange` but if the slot content changes dynamically after first render, `_total` updates but `_current` might point to a now-nonexistent index.
- **Line 39-43**: `::slotted(*)` sets `min-width: 80%` -- this is a magic number and forces a specific layout. Should be configurable via CSS custom property.
- No autoplay feature -- this is acceptable but common for carousels.
- No swipe gesture handling beyond native scroll snap -- native behavior is good but explicit swipe detection would give more control.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Yes | Track and wrapper styled with tokens |
| Arrow Hover | Yes | Yes | Scale transform and shadow elevation |
| Arrow Focus-visible | Yes | Yes | Accent outline ring |
| Arrow Active/Pressed | Yes | Yes | Scale with `--cg-interaction-press-scale` |
| Arrow Disabled | Yes | Partial | `opacity: 0 !important` -- needs refactor |
| Dot Default | Yes | Partial | `--cg-gray-300` -- light gray, wrong for dark theme |
| Dot Hover | Yes | Partial | `--cg-gray-400` -- also light palette |
| Dot Active | Yes | Yes | Accent color with width expansion |
| Dot Focus-visible | Yes | Yes | Accent outline ring |
| Loading | No | N/A | No skeleton state |
| Empty | No | N/A | No empty state when 0 slides |

### 2.2 Keyboard Navigation
- `ArrowLeft`/`ArrowRight` on the track-wrapper (line 157-160) -- correct
- The wrapper has `tabindex="0"` to receive focus (line 167) -- good
- **Missing**: No Home/End key support to jump to first/last slide
- **Missing**: No `aria-live` region to announce slide changes to screen readers
- **Missing**: Dot indicators have `role="tab"` and `aria-selected` (lines 185-186) but lack a `tabindex` pattern -- all dots are individually tabbable

### 2.3 ARIA & Accessibility
- Track wrapper has `role="region"`, `aria-label="Carousel"`, `aria-roledescription="carousel"` (line 167) -- excellent
- Nav buttons have `aria-label="Previous slide"` / `"Next slide"` (lines 172, 175) -- good
- Dots have `role="tablist"` container (line 181) and `role="tab"` per dot (line 185) -- good
- `aria-selected` on dots (line 186) -- correct
- `aria-label="Slide {n}"` on dots (line 188) -- good
- **Missing**: `aria-live="polite"` region to announce current slide index on change
- **Missing**: `aria-label` dynamically updated on the track wrapper to say "Slide X of Y"
- **Missing**: Slotted slide items should have `role="tabpanel"` or `role="group"` with `aria-roledescription="slide"`

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 42 | `min-width: 80%` (slotted) | `var(--cg-carousel-item-min-width, 80%)` |
| 51 | `width: 40px; height: 40px` (nav btn) | `var(--cg-size-carousel-nav, 40px)` |
| 78 | `width: 18px; height: 18px` (nav svg) | `var(--cg-size-icon-md, 18px)` |
| 80 | `left: -12px` (nav prev) | `var(--cg-carousel-nav-offset, -12px)` |
| 81 | `right: -12px` (nav next) | Same token |
| 87 | `gap: 6px` (dots) | `var(--cg-spacing-6, 6px)` |
| 90-91 | `width: 8px; height: 8px` (dot) | `var(--cg-size-carousel-dot, 8px)` |
| 103 | `width: 24px` (active dot) | `var(--cg-size-carousel-dot-active, 24px)` |
| 104 | `border-radius: 4px` (active dot) | `var(--cg-border-radius-050, 4px)` |

### 3.2 Raw Colors Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 94 | `--cg-gray-300, #d4d4d8` (dot default) | Wrong for dark theme -- should be `--cg-gray-700, #3f3f46` |
| 100 | `--cg-gray-400, #a1a1aa` (dot hover) | Should be `--cg-gray-600, #52525b` for dark theme |

### 3.3 Spacing Issues
- Dot gap uses raw `6px` (line 87) -- should be `var(--cg-spacing-6)`
- Dot margin-top uses `var(--cg-spacing-12)` -- correct
- Track gap uses `var(--cg-spacing-16)` -- correct

### 3.4 Modern Design Enhancements
- Add autoplay with pause-on-hover option
- Add slide transition animation options (fade, slide, zoom)
- Add gradient fade edges on the track to indicate more content
- Add swipe distance threshold for better touch UX
- Consider adding `items-per-view` property for multi-item carousels

## 4. Prioritized Fixes

### P0 - Critical
1. Add `aria-live="polite"` region to announce slide changes
2. Fix dot default/hover colors -- using light palette tokens (`--cg-gray-300`, `--cg-gray-400`) on dark surfaces
3. Remove `!important` from disabled nav button -- restructure CSS specificity

### P1 - High
4. Replace all 9 magic number dimension values with design tokens or CSS custom properties
5. Make slotted item `min-width` configurable via `--cg-carousel-item-min-width`
6. Add Home/End keyboard support
7. Add roving tabindex for dot indicators

### P2 - Medium
8. Add empty state for 0 slides
9. Handle varying-width slotted items in scroll calculation
10. Add `aria-roledescription="slide"` to slotted items
11. Guard `_current` against exceeding `_total` after dynamic content changes

### P3 - Low
12. Add autoplay with pause-on-hover
13. Add gradient fade edges on track boundaries
14. Add multi-item per view support
15. Add slide transition animation options
