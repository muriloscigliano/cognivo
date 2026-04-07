# cg-image-block Improvement Plan

**Component**: `cg-image-block`
**Category**: Foundation
**File**: `src/components/cg-image-block/cg-image-block.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Missing CSS for `.error-state` class -- the error fallback markup references `.error-state` (line 114) but no CSS rule is defined for it, making error state unstyled/broken
2. Skeleton shimmer uses light-mode gray tokens (`--cg-gray-100`, `--cg-gray-200`) on a dark background (line 55-56)
3. Magic numbers: `0.2s` transition (line 77), `font-weight: 500` (line 71), bare `1.4` line-height (line 65)

---

## 1. Functional Issues

- **Missing `.error-state` CSS** (line 114): The error fallback template uses `class="error-state"` but no `.error-state` rule exists in the styles. The error state will render unstyled -- no positioning, no centering, no background. This is a functional bug.
- **Missing `.retry-btn` styles**: The `.retry-btn:hover` rule exists (line 59) but there is no base `.retry-btn` rule defining the button's appearance (background, border, padding, font). The retry button will render with browser defaults.
- **Unclosed CSS rule**: Line 78 shows `:host([clickable]) img { transition: ... }` but there appears to be a missing closing brace or empty space before the `:focus-visible` rule on line 80. The CSS may not parse correctly.
- **No `src` change handling**: Similar to `cg-image`, when `src` changes, `_loading` and `_error` states are not reset.
- **Retry mechanism re-renders img**: The `_retry()` method (line 100) sets `_loading = true` and `_error = false` then calls `requestUpdate()`. However, the same `src` URL is used, which may be served from browser cache without triggering a new load. A cache-busting query param would make retry more reliable.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Supported | Notes |
|-------|-----------|-------|
| Loading | Yes | Skeleton placeholder |
| Loaded | Yes | Fade-in transition |
| Error | Broken | CSS missing for `.error-state` |
| Clickable | Yes | Cursor pointer, hover scale |
| Focus | Yes | Focus-visible ring (line 81-83) |

### 2.2 ARIA & Accessibility
- **Good**: Uses semantic `<figure>` and `<figcaption>` elements.
- **Good**: Has `:focus-visible` styling (lines 81-83).
- **Issue**: The `<figure>` element has no `role` attribute when clickable. When `clickable=true`, it should have `role="button"` and `tabindex="0"`.
- **Issue**: The retry button (line 117) has no `aria-label`. Its text content "Retry" is sufficient, but the surrounding error context should be linked.
- **Issue**: Source link (line 133) has `target="_blank"` with `rel="noopener"` -- good. But should also include `rel="noopener noreferrer"` for older browsers.
- **Issue**: Error SVG icon (line 115) has no `aria-hidden="true"`.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 65 | `1.4` | figcaption line-height | `var(--cg-line-height-snug, 1.4)` |
| 71 | `500` | .source font-weight | `var(--cg-font-weight-medium, 500)` |
| 77 | `0.2s` | clickable img transform transition | `var(--cg-motion-duration-fast, 200ms)` |
| 82 | `2px` | focus ring width | `var(--cg-focus-ring-width, 2px)` |
| 82 | `4px` | focus ring outer offset | `var(--cg-focus-ring-offset, 4px)` |

### 3.2 Raw Colors Found
All hex values are within `var()` fallbacks -- acceptable.

| Line | Value | Context | Status |
|------|-------|---------|--------|
| 22 | `#18181b` | fallback for surface-container-background | Acceptable |
| 55-56 | `#f4f4f5` / `#e4e4e7` | skeleton gradient (light grays on dark bg) | **Problematic** |
| 64 | `#71717a` | fallback for gray-500 | Acceptable |
| 68 | `#e5ff6b` | fallback for text-accent | Acceptable |
| 82 | `#09090b` | fallback for surface-base-background | Acceptable |
| 82 | `#dfff61` | fallback for brand-ai-accent | Acceptable |

### 3.3 Typography Token Usage
- Font size: `--cg-font-size-xs` used for figcaption (line 63) -- good.
- Font weight: `500` on `.source` (line 71) should use token.
- Line height: `1.4` on figcaption (line 65) should use token.

### 3.4 Modern Design Enhancements
- **Caption overlay**: Modern image blocks often place captions as a semi-transparent overlay on the bottom of the image. Could add a `caption-position="overlay"` variant.
- **Dark skeleton**: Fix the light-gray skeleton for dark backgrounds.
- **Source link icon**: Add a small external link icon next to source attribution.
- **Loading progress**: For large images, consider a thin progress bar instead of shimmer.

## 4. Prioritized Fixes

### P0 - Critical
1. **Add `.error-state` CSS rule** (line 114): The error fallback is completely unstyled. Add positioning, centering, background, and text color rules matching `cg-image`'s `.error-fallback` pattern.
2. **Add base `.retry-btn` CSS**: Define background, border, padding, cursor, font-size, border-radius for the retry button. Currently only `:hover` is styled (line 59).
3. **Fix potential CSS parse error**: Verify the closing brace situation around lines 77-80. The transition rule on line 77 may not be properly closed.

### P1 - High
4. **Fix skeleton colors for dark mode** (lines 55-56): Replace `--cg-gray-100`/`--cg-gray-200` with dark-appropriate tokens.
5. **Add keyboard support for clickable**: When `clickable=true`, add `tabindex="0"`, `role="button"`, and Enter/Space key handler to `<figure>`.
6. **Add `aria-hidden="true"` to error SVG** (line 115).
7. **Reset `_loading`/`_error` on `src` change**: Add `updated()` handler to reset state.

### P2 - Medium
8. **Tokenize `1.4` line-height** (line 65) to `var(--cg-line-height-snug, 1.4)`.
9. **Tokenize `500` font-weight** (line 71) to `var(--cg-font-weight-medium, 500)`.
10. **Tokenize `0.2s` transition** (line 77) to `var(--cg-motion-duration-fast, 200ms)`.
11. **Tokenize focus ring values** (line 82): Use `--cg-focus-ring-width` and `--cg-focus-ring-offset`.

### P3 - Low
12. **Add `noreferrer` to source link** `rel` attribute (line 133).
13. **Cache-busting retry**: Append timestamp query param on retry to bypass browser cache.
14. **Add caption overlay variant**: `caption-position` prop for overlay vs. below styling.
