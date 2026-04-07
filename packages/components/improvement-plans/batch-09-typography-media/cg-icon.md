# cg-icon Improvement Plan

**Component**: `cg-icon`
**Category**: Foundation
**File**: `src/components/cg-icon/cg-icon.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Hard-coded pixel sizes (`12px`, `16px`, `20px`, `24px`, `32px`) without icon-size tokens on lines 121-125
2. Magic number `4px` border-radius on placeholder (line 147) and `.innerHTML` usage for SVG injection (XSS risk on API-fetched content, line 258)
3. No error state or fallback when icon name is invalid and API fetch fails silently

---

## 1. Functional Issues

- **`.innerHTML` for SVG injection** (lines 250, 258): Using `.innerHTML` to inject SVG content from the Iconify API is a potential XSS vector. If the API response is compromised, arbitrary HTML could be injected. Consider sanitizing the SVG or using `DOMParser` to validate the response contains only SVG elements.
- **Silent API failure** (lines 216-218): When an icon name is not found in built-in, bundled, or API sources, the component renders `nothing`. There is no feedback to the developer that the icon failed to load. Consider a console warning in dev mode.
- **Path splitting logic** (line 237): `builtinPath.split(' M')` is fragile -- SVG paths with lowercase `m` (relative moveto) would not be split correctly. Currently all built-in paths use uppercase `M`, but this is a latent bug if paths are added later.
- **`_getSolar()` called twice per render** (lines 171, 245): In the `updated()` method and again in `render()`. Could cache the result.
- **No reactive reset of API state on name change**: Lines 168-169 reset `_apiSvg` and `_loading`, but if a previous fetch is in-flight, the result from the old fetch could arrive and set `_apiSvg` for the wrong icon name.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | Renders icon |
| Loading | Yes | Shows placeholder div (line 263) |
| Error/Missing | Partial | Renders nothing -- no visual feedback |
| Spin animation | Yes | For `name="loading"` (lines 139-141) |

- **Missing**: No error fallback visual. When an icon fails to load, the component becomes invisible.

### 2.2 ARIA & Accessibility
- **Good**: Supports `label` prop that toggles between `role="img"` and `role="presentation"` (lines 226-228).
- **Good**: Uses `aria-hidden="true"` for decorative icons and `aria-label` for meaningful ones.
- **Issue**: The `aria-hidden` attribute is set as a string `"true"/"false"` on the SVG, but `aria-hidden="false"` is not the same as omitting `aria-hidden`. It should be omitted entirely when the icon has a label, or use `nothing`.
- **Issue**: Loading placeholder (line 263) has `aria-hidden="true"` but no accessible loading indicator.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 121 | `12px` | font-size for size="xs" | `var(--cg-icon-size-50, 12px)` |
| 122 | `16px` | font-size for size="sm" | `var(--cg-icon-size-100, 16px)` |
| 123 | `20px` | font-size for size="md" | `var(--cg-icon-size-150, 20px)` |
| 124 | `24px` | font-size for size="lg" | `var(--cg-icon-size-200, 24px)` |
| 125 | `32px` | font-size for size="xl" | `var(--cg-icon-size-300, 32px)` |
| 147 | `4px` | border-radius on .placeholder | `var(--cg-border-radius-50, 4px)` |

### 3.2 Raw Colors Found
| Line | Value | Context | Status |
|------|-------|---------|--------|
| 127 | `#71717a` | fallback for gray-500 | Acceptable (fallback) |
| 128 | `#dfff61` | fallback for brand-ai-accent | Acceptable (fallback) |
| 129 | `#4ade80` | fallback for green-400 | Acceptable (fallback) |
| 130 | `#fbbf24` | fallback for yellow-400 | Acceptable (fallback) |
| 131 | `#f87171` | fallback for red-400 | Acceptable (fallback) |
| 132 | `#60a5fa` | fallback for blue-400 | Acceptable (fallback) |
| 148 | `#27272a` | fallback for gray-800 | Acceptable (fallback) |

### 3.3 Typography Token Usage
N/A -- icon component uses font-size for sizing but does not render text.

### 3.4 Modern Design Enhancements
- **Transition on icon swap**: Add a subtle opacity transition when the icon changes, so swaps feel smooth rather than instantaneous.
- **Error placeholder**: Show a subtle "?" or broken icon when the name resolves to nothing, rather than rendering empty space.
- **Color transition**: Add `transition: color` to `:host` so color changes animate smoothly.

## 4. Prioritized Fixes

### P0 - Critical
1. **Sanitize API-fetched SVG** (line 258): The `.innerHTML` injection of external API content is a security risk. Use `DOMParser` to parse the response and validate it contains only `<svg>` elements before injecting.

### P1 - High
2. **Tokenize all icon size values** (lines 121-125): Replace hard-coded `12px`, `16px`, `20px`, `24px`, `32px` with `--cg-icon-size-*` tokens.
3. **Tokenize placeholder border-radius** (line 147): Replace `4px` with `var(--cg-border-radius-50, 4px)`.
4. **Fix `aria-hidden` handling** (line 228): Use `nothing` instead of `"false"` when icon has a label. `aria-hidden="false"` on SVG child is not equivalent to removing it.
5. **Guard against stale API responses**: Store the requested name when starting a fetch and verify it still matches `this.name` before applying the result.

### P2 - Medium
6. **Add error/missing fallback visual**: Show a placeholder icon (e.g., a question mark or broken image icon) when the icon name is not found.
7. **Cache `_getSolar()` result**: Avoid calling it twice per update cycle (once in `updated()`, once in `render()`).
8. **Add opacity transition** on `:host` for smooth icon swaps.

### P3 - Low
9. **Add dev-mode console warning** when an icon name is not found in any source.
10. **Document path splitting limitation**: The `split(' M')` approach on line 237 only handles uppercase `M`.
