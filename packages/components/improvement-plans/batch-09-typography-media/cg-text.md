# cg-text Improvement Plan

**Component**: `cg-text`
**Category**: Foundation
**File**: `src/components/cg-text/cg-text.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Bare line-height values (`1.4`, `1.45`, `1.35`, `1.3`, `1.2`) without tokens on lines 26-33
2. Raw font-weight `400` on line 37 instead of a token
3. Letter-spacing magic number `-0.02em` on line 33

---

## 1. Functional Issues

- **Line clamping via inline style manipulation** (lines 82-94): The `updated()` method directly sets `this.style.*` properties. This works but bypasses the shadow DOM styling model and could conflict with consumer inline styles. A CSS-only approach using a CSS custom property or attribute selector would be cleaner.
- **`text` prop vs slot fallback** (line 98): When both `text` prop and slot content are provided, `text` always wins. This is reasonable but undocumented behavior -- consumers may be confused.
- **No `nothing` import used**: `nothing` is imported on line 1 but never used in the template.

## 2. Interaction Issues

### 2.1 State Coverage
- Component is purely presentational (no interactive states needed), so this is N/A.
- However, `:host([inline])` (line 23) overrides display to `inline`, but there is no handling for when `clamp > 0` and `inline = true` simultaneously. Line clamping requires `-webkit-box` display, which would conflict with `inline`.

### 2.2 ARIA & Accessibility
- Semantic elements (h1-h6, p, span) are correctly used based on `as` prop -- good.
- **Missing**: No `role` attribute on `span` variant. If used for meaningful text, `span` has no implicit ARIA role, which is fine, but consumers should be aware.
- **Missing**: The `clamp` feature hides content visually but provides no programmatic way to access the full text (e.g., `title` attribute or `aria-label`).

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 26 | `1.4` | line-height for size="xs" | `var(--cg-line-height-snug, 1.4)` |
| 26 | `12px` | fallback for font-size xs | Already tokenized (fallback only) |
| 27 | `1.45` | line-height for size="sm" | `var(--cg-line-height-snug, 1.4)` or new token |
| 31 | `1.35` | line-height for size="2xl" | `var(--cg-line-height-tight, 1.3)` |
| 32 | `1.3` | line-height for size="3xl" | `var(--cg-line-height-tight, 1.3)` |
| 33 | `-0.02em` | letter-spacing for size="4xl" | `var(--cg-letter-spacing-tight, -0.02em)` |
| 37 | `400` | font-weight for weight="normal" | `var(--cg-font-weight-normal, 400)` |

### 3.2 Raw Colors Found
All color fallbacks use raw hex, but they are wrapped in `var()` with token names as primary values. This is acceptable as fallback-only usage. No standalone raw hex found.

| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 19 | `#fafafa` | fallback for color-surface-base-text | Acceptable (fallback) |
| 43 | `#71717a` | fallback for gray-500 | Acceptable (fallback) |
| 44 | `#e5ff6b` | fallback for text-accent | Acceptable (fallback) |
| 45 | `#4ade80` | fallback for status-success | Acceptable (fallback) |
| 46 | `#f59e0b` | fallback for text-warning | Acceptable (fallback) |
| 47 | `#ef4444` | fallback for text-danger | Acceptable (fallback) |

### 3.3 Typography Token Usage
- Font sizes: Properly tokenized with `--cg-font-size-*` tokens.
- Font weights: Mostly tokenized except `400` on line 37.
- Line heights: Only `--cg-line-height-normal` and `--cg-line-height-tight` are used as tokens; the rest are bare numbers.
- Letter spacing: Only one instance, uses magic number.

### 3.4 Modern Design Enhancements
- **Font smoothing**: Consider adding `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` to `:host` for crisper text rendering on dark backgrounds.
- **Text rendering**: Could add `text-rendering: optimizeLegibility` for heading sizes (xl+).
- **Gradient text**: A modern enhancement would be a `gradient` color variant using `background-clip: text` for accent headings.

## 4. Prioritized Fixes

### P0 - Critical
(None)

### P1 - High
1. **Tokenize all line-height values** (lines 26-32): Replace bare `1.4`, `1.45`, `1.35`, `1.3` with `--cg-line-height-*` tokens.
2. **Tokenize font-weight normal** (line 37): Replace `400` with `var(--cg-font-weight-normal, 400)`.
3. **Tokenize letter-spacing** (line 33): Replace `-0.02em` with `var(--cg-letter-spacing-tight, -0.02em)`.

### P2 - Medium
4. **Conflict guard for `clamp` + `inline`**: Add logic to ignore `clamp` when `inline` is true, or document the limitation.
5. **Add `title` attribute when clamping**: When `clamp > 0`, set `title` on the inner element to the full text for accessibility.
6. **Refactor clamp to CSS-only**: Use `:host([clamp])` with a CSS custom property `--_clamp` instead of imperative `style` manipulation.

### P3 - Low
7. **Add font-smoothing** to `:host` for better dark-mode rendering.
8. **Remove unused `nothing` import** if not needed (line 1).
9. **Add `text-wrap: balance`** for heading sizes (2xl+) for modern browsers.
