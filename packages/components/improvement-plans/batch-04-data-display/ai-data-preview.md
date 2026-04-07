# ai-data-preview Improvement Plan

**Component**: `ai-data-preview`
**Category**: AI-Native
**File**: `src/components/ai-data-preview/ai-data-preview.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Non-standard token names (`--cg-radius-lg`, `--cg-radius-md`, `--cg-radius-sm`, `--cg-color-accent`, `--cg-color-surface-hover`) differ from codebase convention `--cg-border-radius-*`
2. CSS syntax error -- extra closing brace on line 166 before style close
3. Missing loading state and missing `@keydown` handlers on buttons

---

## 1. Functional Issues

- **Line 33**: `border-radius: var(--cg-radius-lg, 12px)` -- non-standard token, should be `var(--cg-border-radius-150, 12px)`.
- **Line 34**: `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` -- raw rgba.
- **Line 29**: `background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent)` -- raw rgba.
- **Line 62**: `padding: 2px` -- magic number.
- **Line 64**: `border-radius: var(--cg-radius-sm, 4px)` -- non-standard token.
- **Line 65**: `font-size: 10px` -- magic number.
- **Line 75**: `border-radius: var(--cg-radius-md, 8px)` -- non-standard token.
- **Line 138**: `border-radius: var(--cg-radius-md, 8px)` -- non-standard token.
- **Line 148**: `outline: 2px solid var(--cg-color-accent, #dfff61)` -- non-standard token, should be `--cg-brand-ai-accent`.
- **Line 159**: `background: var(--cg-color-surface-hover, #27272a)` -- non-standard token.
- **Line 163**: `background: var(--cg-color-accent, #dfff61)` -- non-standard token.
- **Line 164**: `color: var(--cg-color-surface-container-background, #18181b)` -- this is fine.
- **Line 166**: Extra closing brace `}` -- **CSS syntax error**.
- **Line 73**: `max-height: 320px` -- magic number.
- No loading state for when data is being fetched/parsed.
- Confirm button lacks hover state definition.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Partial | Non-standard tokens |
| Hover (cancel) | Yes | Partial | Non-standard token on line 159 |
| Hover (confirm) | No | N/A | No hover state for confirm button |
| Active | No | N/A | No pressed state on buttons |
| Focus | Yes | Partial | Non-standard accent token |
| Disabled | No | N/A | No disabled state for buttons |
| Loading | No | N/A | No loading/skeleton state |
| Error | No | N/A | No error state for parse failures |
| Empty | Partial | Yes | Table shows "No data" (line 227) |

### 2.2 Keyboard Navigation
- Buttons are native `<button>` elements with `tabindex="0"` -- keyboard accessible.
- Preview area has `tabindex="0"` for scroll focus -- good.
- No keyboard shortcut for confirm/cancel (e.g., Enter/Escape).
- Table within preview has no keyboard navigation for cells.

### 2.3 ARIA & Accessibility
- Preview area has `role="region"` and `aria-label` -- good (line 294).
- Buttons have `aria-label` -- good (lines 299-301).
- Table has `role="table"` and `aria-label` -- good (line 230).
- Table headers have `scope="col"` -- good (line 231).
- **Missing**: No `aria-live` for dynamic content updates.
- **Missing**: JSON syntax highlighting uses classes but no semantic meaning for screen readers.

### 2.4 Touch & Mobile
- Preview area has scroll with `overflow: auto` -- good.
- Buttons are adequately sized.
- No responsive layout adjustments.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 34 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-light-subtle)` |
| 29 | `rgba(255, 255, 255, 0.03)` | `var(--cg-overlay-light-minimal)` |
| 62 | `padding: 2px` | `var(--cg-spacing-2, 2px)` |
| 65 | `font-size: 10px` | `var(--cg-font-size-2xs, 10px)` |
| 73 | `max-height: 320px` | Should be a configurable prop or token |
| 121 | `rgba(255, 255, 255, 0.03)` | `var(--cg-overlay-light-minimal)` |

### 3.2 Raw Colors Found
| Line | Color | Suggested Token |
|------|-------|-----------------|
| 34 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-light-subtle)` |
| 29 | `rgba(255, 255, 255, 0.03)` | `var(--cg-overlay-light-minimal)` |
| 63 | `rgba(223, 255, 97, 0.1)` | `var(--cg-overlay-accent-subtle)` |
| 121 | `rgba(255, 255, 255, 0.03)` | `var(--cg-overlay-light-minimal)` |

### 3.3 Typography Issues
- `.format-badge` `font-size: 10px` -- should use `var(--cg-font-size-2xs)`.

### 3.4 Spacing Issues
- `.format-badge` `padding: 2px` -- should use token.

### 3.5 Modern Design Enhancements
- Add loading state with skeleton/spinner.
- Add confirm button hover and active states.
- Add disabled state for buttons during processing.
- Add syntax-highlighted line numbers for JSON view.
- Add diff view for data comparisons.

---

## 4. Prioritized Fixes

### P0 - Critical
1. Fix CSS syntax error: remove extra `}` on line 166.
2. Fix non-standard token names throughout: `--cg-radius-lg` -> `--cg-border-radius-150`, `--cg-radius-md` -> `--cg-border-radius-100`, `--cg-radius-sm` -> `--cg-border-radius-50`, `--cg-color-accent` -> `--cg-brand-ai-accent`, `--cg-color-surface-hover` -> appropriate surface token.

### P1 - High
3. Replace all raw rgba colors with overlay tokens.
4. Add hover state for confirm button (currently missing).
5. Add loading/skeleton state.
6. Add disabled state for buttons during submission.

### P2 - Medium
7. Replace `font-size: 10px` with token.
8. Replace `padding: 2px` with spacing token.
9. Make `max-height: 320px` configurable via property.
10. Add error state for parse failures.

### P3 - Low
11. Add keyboard shortcuts (Enter for confirm, Escape for cancel).
12. Add diff view for data comparisons.
13. Add line numbers for JSON view.
14. Add active/pressed states on buttons.
