# cg-code-block Improvement Plan

**Component**: `cg-code-block`
**Category**: Foundation
**File**: `src/components/cg-code-block/cg-code-block.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Multiple magic numbers in font-size values using `rem` units instead of tokens (`0.65rem`, `0.7rem`, `0.82rem`)
2. Magic numbers in spacing (`gap: 6px`, `padding: 4px 10px`, `gap: 4px`, `margin-top: -32px`)
3. `_unsafeHTML()` method (line 301-305) creates DOM from raw HTML strings -- potential XSS vector if code input is not trusted

---

## 1. Functional Issues

- **Line 62**: `.wrapper` `border-radius: var(--cg-border-radius-200, 24px)` -- 24px seems overly large for a code block; `border-radius-150` (12px) would be more typical. Rounded variants override this anyway.
- **Line 88**: `.dots` `gap: 6px` -- magic number, should use `var(--cg-spacing-6, 6px)`.
- **Line 89**: `.dot` `width: 10px; height: 10px` -- magic numbers.
- **Line 93-95**: Dot colors use chart tokens (`--cg-color-chart-4`, `--cg-color-chart-3`, `--cg-color-chart-2`) for red/yellow/green dots. These semantically don't match -- chart tokens aren't meant for traffic light dots. Should use status tokens or dedicated code-block tokens.
- **Line 107-108**: `.language` uses `font-size: 0.65rem` -- magic number, should use `var(--cg-font-size-2xs)` or similar.
- **Line 113**: `.language` `padding: 2px` -- magic number.
- **Line 114**: `.language` `border-radius: 4px` -- magic number, should use token.
- **Line 120**: `.actions` `gap: 4px` -- magic number.
- **Line 127-128**: `.action-btn` `padding: 4px 10px; border-radius: 4px` -- magic numbers.
- **Line 134**: `.action-btn` `font-size: 0.7rem` -- magic number.
- **Line 155**: `pre` `font-size: 0.82rem` -- magic number, should use `var(--cg-font-size-sm)` or code-specific token.
- **Line 192-193**: `.expand-bar` `padding: 6px; margin-top: -32px` -- magic numbers.
- **Line 200**: `.expand-btn` `font-size: 0.7rem` -- magic number.
- **Line 203-204**: `.expand-btn` `padding: 4px` -- magic number.
- **Lines 301-305**: `_unsafeHTML()` creates a `<template>` element and sets `innerHTML` from the `highlight()` function output. While `highlight()` escapes `<`, `>`, and `&` on line 30, the token replacement mechanism (lines 35-52) inserts `<span>` tags. If `code` input contains crafted strings that survive escaping, this could be an XSS vector. Consider using Lit's `unsafeHTML` directive from `lit/directives/unsafe-html.js` which is the canonical approach.
- **Line 149**: `.code-area.collapsed { max-height: 300px; }` -- magic number, should be configurable.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Mostly | Some magic numbers |
| Hover (copy) | Yes | Yes | Line 139 |
| Active | No | N/A | No pressed state on buttons |
| Focus | Yes | Yes | Line 141 |
| Disabled | No | N/A | No disabled state |
| Loading | No | N/A | No loading state |
| Error | No | N/A | No error state for highlighting failures |
| Empty | No | N/A | Empty code renders empty pre |
| Copied | Yes | Yes | Line 140 -- color changes |
| Collapsed | Yes | Yes | Line 149 |
| Expanded | Yes | Yes | Post-expand state |

### 2.2 Keyboard Navigation
- Copy button is native `<button>` with `aria-label` -- keyboard accessible.
- Expand button is native `<button>` -- keyboard accessible.
- `code-area` is scrollable but has no `tabindex` -- keyboard users cannot scroll.
- **Missing**: Keyboard shortcut for copy (e.g., when code block is focused).

### 2.3 ARIA & Accessibility
- Copy button has `aria-label="Copy code to clipboard"` -- good (line 269).
- Status announcement uses `role="status"` and `aria-live="polite"` -- good (line 275).
- `.sr-only` class properly hides status text -- good (lines 211-221).
- **Missing**: `<pre>` element should have `role="code"` or be wrapped in `<code>`.
- **Missing**: Language is visually displayed but not announced -- should add `aria-label` on the code region.
- **Missing**: Expand button lacks `aria-expanded` attribute.
- **Missing**: Code area should have `tabindex="0"` for keyboard scrolling.

### 2.4 Touch & Mobile
- `wrap` property allows wrapping long lines -- good.
- Buttons are adequately sized for touch.
- Horizontal scroll for code overflow -- good.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 62 | `border-radius: var(--cg-border-radius-200, 24px)` | Consider 12px default instead |
| 88 | `gap: 6px` | `var(--cg-spacing-6, 6px)` |
| 89 | `width: 10px; height: 10px` | `var(--cg-spacing-10, 10px)` |
| 107 | `font-size: 0.65rem` | `var(--cg-font-size-2xs, 10px)` |
| 113 | `padding: 2px` | `var(--cg-spacing-2, 2px)` |
| 114 | `border-radius: 4px` | `var(--cg-border-radius-50, 4px)` |
| 120 | `gap: 4px` | `var(--cg-spacing-4, 4px)` |
| 127-128 | `padding: 4px 10px; border-radius: 4px` | Spacing and border tokens |
| 134 | `font-size: 0.7rem` | Token |
| 142 | `width: 13px; height: 13px` | Token |
| 149 | `max-height: 300px` | Configurable prop |
| 155 | `font-size: 0.82rem` | `var(--cg-font-size-sm, 14px)` or code-specific token |
| 192 | `padding: 6px; margin-top: -32px` | Tokens |
| 200 | `font-size: 0.7rem` | Token |
| 204 | `padding: 4px` | `var(--cg-spacing-4, 4px)` |

### 3.2 Raw Colors Found
No raw hex colors -- all colors use code-specific tokens (`--cg-color-code-*`). Good token discipline.

### 3.3 Typography Issues
- Font sizes use `rem` units (`0.65rem`, `0.7rem`, `0.82rem`) instead of token references.
- These should map to the token scale.

### 3.4 Spacing Issues
- Numerous spacing values use raw pixels (see 3.1).

### 3.5 Modern Design Enhancements
- Add `tabindex="0"` to code area for keyboard scrolling.
- Add `aria-expanded` to expand button.
- Add diff view mode (two-column or inline).
- Add search/highlight within code.
- Consider using Lit's `unsafeHTML` directive instead of manual DOM manipulation.

---

## 4. Prioritized Fixes

### P0 - Critical
1. Review `_unsafeHTML()` for XSS safety -- consider replacing with Lit's `unsafeHTML` directive from `lit/directives/unsafe-html.js`.

### P1 - High
2. Replace all `rem`-based font sizes (`0.65rem`, `0.7rem`, `0.82rem`) with token references.
3. Add `tabindex="0"` to `.code-area` for keyboard scrolling.
4. Add `aria-expanded` attribute to expand button.
5. Add `role="code"` or wrap `<pre>` content in `<code>` element.
6. Replace dot colors from chart tokens to more semantically correct tokens.

### P2 - Medium
7. Replace `gap: 6px`, `gap: 4px`, `padding: 4px 10px`, etc. with spacing tokens.
8. Replace `.dot` `width: 10px; height: 10px` with spacing tokens.
9. Replace `.language` `padding: 2px; border-radius: 4px` with tokens.
10. Replace `.expand-bar` `padding: 6px; margin-top: -32px` with tokens.
11. Make `max-height: 300px` configurable via property.

### P3 - Low
12. Add empty state for when `code` is empty string.
13. Add diff view mode.
14. Add search/highlight within code.
15. Consider `border-radius-150` (12px) as default instead of `border-radius-200` (24px).
