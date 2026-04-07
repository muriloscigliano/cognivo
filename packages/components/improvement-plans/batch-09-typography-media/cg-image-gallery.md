# cg-image-gallery Improvement Plan

**Component**: `cg-image-gallery`
**Category**: Foundation
**File**: `src/components/cg-image-gallery/cg-image-gallery.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Hard-coded `4px` border-radius on `.img-wrapper` (line 39) and `140px` min-width on grid (line 34)
2. Skeleton shimmer uses light-mode tokens (`--cg-gray-100`, `--cg-gray-200`) on dark background (line 87)
3. No keyboard navigation support -- images are `cursor: pointer` with click handlers but have no `tabindex`, `role`, or keyboard event handlers

---

## 1. Functional Issues

- **No keyboard accessibility on images** (line 130): Each `.img-wrapper` has a `@click` handler but no `tabindex="0"` or `role="button"`. Keyboard users cannot navigate or activate gallery images.
- **`rgba(0, 0, 0, 0)` in CSS** (line 47): Using `rgba(0, 0, 0, 0)` as the default state of the hover overlay is `transparent` -- cleaner to write `transparent` directly.
- **`_loadedSet` reactive pattern** (lines 104-108): Creating a new `Set` on every image load (`new Set([...this._loadedSet, idx])`) is correct for triggering reactivity but creates garbage. For galleries with many images, this could cause unnecessary re-renders.
- **No empty state**: When `images` array is empty, the component renders an empty grid div. Should show a placeholder or render nothing.
- **`1.25rem` font-size** (line 78): The overflow badge uses `rem` unit instead of a token.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Supported | Notes |
|-------|-----------|-------|
| Loading | Yes | Per-image skeleton |
| Loaded | Partial | No fade-in transition on individual images |
| Hover | Yes | Overlay and scale transform |
| Overflow | Yes | "+N more" badge |
| Empty | No | Renders empty grid |
| Focus | No | No keyboard focus support |

### 2.2 ARIA & Accessibility
- **Critical**: No `role` or `tabindex` on clickable images. All images have click handlers (line 130) but no keyboard access.
- **Issue**: No `role="group"` or `role="list"` on the grid container.
- **Issue**: The overflow badge has no `aria-label` -- screen readers would just read "+3" without context.
- **Issue**: `alt` defaults to empty string via `img.alt ?? ''` (line 135). Images without alt text are treated as decorative, but gallery images are almost always content-bearing.
- **Good**: Images use `loading="lazy"` (line 136).

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 34 | `140px` | minmax grid column size | `var(--cg-gallery-min-col, 140px)` or a spacing token |
| 39 | `4px` | img-wrapper border-radius | `var(--cg-border-radius-50, 4px)` |
| 47 | `rgba(0, 0, 0, 0)` | default overlay background | Use `transparent` keyword |
| 78 | `1.25rem` | overflow badge font-size | `var(--cg-font-size-md, 18px)` or similar |
| 61 | `1.03` | hover scale transform | Document as intentional micro-interaction |

### 3.2 Raw Colors Found
| Line | Value | Context | Status |
|------|-------|---------|--------|
| 40 | `#18181b` | fallback for surface-container-background | Acceptable (fallback) |
| 47 | `rgba(0, 0, 0, 0)` | default hover overlay | Replace with `transparent` |
| 79 | `#ffffff` | fallback for gray-white | Acceptable (fallback) |
| 87 | `#f4f4f5` / `#e4e4e7` | skeleton gradient (light grays) | **Problematic on dark bg** |

### 3.3 Typography Token Usage
- Font size: `1.25rem` on overflow badge (line 78) should be tokenized.
- Font weight: Properly uses `--cg-font-weight-bold` (line 79).

### 3.4 Modern Design Enhancements
- **Fade-in per image**: Add opacity transition on individual images when they load (like `cg-image` does).
- **Masonry layout**: Consider supporting a masonry variant for variable-height images.
- **Caption overlay on hover**: Show caption text on hover using the `caption` property from `GalleryImage`.
- **Focus ring per image**: Add `:focus-visible` styling on individual image wrappers.

## 4. Prioritized Fixes

### P0 - Critical
1. **Add keyboard accessibility**: Add `tabindex="0"`, `role="button"`, and `@keydown` handler (Enter/Space) to each `.img-wrapper` (line 130).
2. **Add `role="group"` and `aria-label`** to the grid container for screen readers.

### P1 - High
3. **Fix skeleton colors for dark mode** (line 87): Replace `--cg-gray-100`/`--cg-gray-200` with `--cg-gray-800`/`--cg-gray-700`.
4. **Tokenize `4px` border-radius** (line 39): Use `var(--cg-border-radius-50, 4px)`.
5. **Tokenize `140px` grid min column** (line 34): Use a design token or CSS custom property.
6. **Tokenize `1.25rem` font-size** (line 78): Use `var(--cg-font-size-md, 18px)` or appropriate token.
7. **Add `aria-label` to overflow badge**: E.g., `aria-label="${overflow} more images"`.

### P2 - Medium
8. **Add empty state**: Render nothing or a placeholder when `images.length === 0`.
9. **Add fade-in transition on image load**: Consistent with `cg-image` component behavior.
10. **Replace `rgba(0, 0, 0, 0)`** (line 47) with `transparent`.
11. **Add `:focus-visible` styling** for image wrappers.

### P3 - Low
12. **Optimize `_loadedSet` pattern**: Consider using a reactive array or Map instead of recreating a Set.
13. **Support `caption` from `GalleryImage`**: Show captions on hover or below images.
14. **Add masonry layout variant**.
