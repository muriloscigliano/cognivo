# cg-image Improvement Plan

**Component**: `cg-image`
**Category**: Foundation
**File**: `src/components/cg-image/cg-image.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Skeleton shimmer gradient uses light-theme gray tokens (`--cg-gray-100`, `--cg-gray-200`) which will look wrong on dark backgrounds (line 57)
2. Magic numbers in animation: `300ms`, `1.01` scale transform (lines 91-94), `32px` error icon size (line 76), `0.5` opacity (line 77)
3. Empty `alt` attribute falls through silently -- should warn on missing alt for non-decorative images

---

## 1. Functional Issues

- **No `src` change reset** (lines 105-106): When `src` changes, `_loading` and `_error` states are not reset. The old image state persists until the new image triggers `load` or `error`. The component should reset these states when `src` changes via `willUpdate()` or `updated()`.
- **Image still rendered when errored** (line 139): The `<img>` element is hidden via `style="display: none"` when errored, but it is still in the DOM. Using `nothing` conditional rendering (like `cg-image-block` does) would be cleaner.
- **No retry mechanism**: Unlike `cg-image-block`, this component has no retry button on error. Consumers have no way to retry without changing `src`.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Supported | Notes |
|-------|-----------|-------|
| Loading | Yes | Skeleton shimmer placeholder |
| Loaded | Yes | Fade-in transition |
| Error | Yes | Fallback UI with icon and text |
| Lazy loading | Yes | Native `loading="lazy"` attribute |

- **Missing**: No explicit `empty` state when `src` is empty string. Currently shows skeleton indefinitely.

### 2.2 ARIA & Accessibility
- **Good**: `alt` attribute is bound to the `<img>` (line 135).
- **Issue**: When `alt` is empty string (default on line 99), the image is treated as decorative. However, most images are content-bearing. The component should encourage or enforce `alt` text for non-decorative images.
- **Issue**: Error fallback text "Image unavailable" (line 129) is hardcoded English with no i18n support.
- **Issue**: The error fallback SVG icon (lines 124-128) has no `aria-hidden="true"` attribute.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 76 | `32px` | error fallback SVG width/height | `var(--cg-icon-size-300, 32px)` |
| 77 | `0.5` | error SVG opacity | `var(--cg-opacity-disabled, 0.5)` |
| 91 | `300ms` | imgFadeIn animation duration | `var(--cg-motion-duration-normal, 300ms)` |
| 93 | `1.01` | imgFadeIn scale transform | Consider a token or remove (nearly imperceptible) |

### 3.2 Raw Colors Found
All hex values are fallbacks within `var()` expressions -- acceptable.

| Line | Value | Context | Status |
|------|-------|---------|--------|
| 22 | `#18181b` | fallback for surface-container-background | Acceptable |
| 57 | `#f4f4f5` | fallback for gray-100 (skeleton) | Acceptable, but see note |
| 57 | `#e4e4e7` | fallback for gray-200 (skeleton) | Acceptable, but see note |
| 71 | `#71717a` | fallback for gray-500 | Acceptable |
| 72 | `#18181b` | fallback for surface-container-background | Acceptable |

**Note on skeleton colors**: The skeleton gradient uses `--cg-gray-100` and `--cg-gray-200`, which are light-mode grays. On a dark background (which `--cg-color-surface-container-background: #18181b` implies), these will create a jarring white shimmer. Should use dark-appropriate skeleton tokens like `--cg-gray-800` and `--cg-gray-700`.

### 3.3 Typography Token Usage
- Only `--cg-font-size-xs` used for error text (line 80) -- properly tokenized.

### 3.4 Modern Design Enhancements
- **Dark-mode skeleton**: Replace light gray skeleton gradient with dark-appropriate colors (e.g., `--cg-gray-800` / `--cg-gray-700`).
- **Blur-up placeholder**: Instead of skeleton shimmer, support a `placeholder` prop for low-res blur-up preview images.
- **Hover zoom**: Add optional subtle hover zoom effect for interactive contexts.
- **Aspect ratio token**: Consider tokenizing common aspect ratios if they are reused across components.

## 4. Prioritized Fixes

### P0 - Critical
(None)

### P1 - High
1. **Reset `_loading`/`_error` on `src` change**: Add `updated()` or `willUpdate()` handler to reset states when `src` property changes.
2. **Fix skeleton colors for dark mode** (line 57): Replace `--cg-gray-100`/`--cg-gray-200` with `--cg-gray-800`/`--cg-gray-700` or use dedicated skeleton tokens.
3. **Add `aria-hidden="true"` to error fallback SVG** (line 124).

### P2 - Medium
4. **Tokenize `32px`** error icon size (line 76) to `var(--cg-icon-size-300, 32px)`.
5. **Tokenize `0.5` opacity** (line 77) to `var(--cg-opacity-disabled, 0.5)`.
6. **Tokenize `300ms` animation** (line 91) to `var(--cg-motion-duration-normal, 300ms)`.
7. **Handle empty `src`**: When src is empty string, show a neutral placeholder instead of infinite skeleton.
8. **Use conditional rendering for errored image**: Replace `style="display: none"` (line 139) with `nothing` template guard.

### P3 - Low
9. **Add retry mechanism**: Add a clickable retry action in the error fallback, consistent with `cg-image-block`.
10. **i18n for error text**: Make "Image unavailable" configurable via a property.
11. **Remove `scale(1.01)` from animation**: The 1% scale change is imperceptible and adds computation.
