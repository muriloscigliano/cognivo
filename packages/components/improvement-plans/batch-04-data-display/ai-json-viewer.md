# ai-json-viewer Improvement Plan

**Component**: `ai-json-viewer`
**Category**: AI-Native
**File**: `src/components/ai-json-viewer/ai-json-viewer.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Raw hex color `#60a5fa` on line 53 for `.key` -- not using a token
2. Raw hex color `#fb923c` on line 62 for `.boolean` -- not using a token
3. CSS syntax error -- extra closing brace on line 105 before rounded variants

---

## 1. Functional Issues

- **Line 39**: `background: var(--cg-color-surface, #18181b)` -- non-standard token name, should be `var(--cg-color-surface-container-background, #18181b)`.
- **Line 40**: `border: 1px solid var(--cg-color-border, #27272a)` -- non-standard token, should be `var(--cg-color-surface-container-border, #27272a)`.
- **Line 44**: `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` -- raw rgba.
- **Line 45**: `background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent)` -- raw rgba.
- **Line 53**: `.key { color: #60a5fa; }` -- raw hex, should use `var(--cg-color-status-info-text-default, #60a5fa)` or a code token.
- **Line 62**: `.boolean { color: #fb923c; }` -- raw hex, no token defined.
- **Line 77**: `.toggle` `font-size: 10px` -- magic number.
- **Line 79**: `.toggle` `border-radius: 3px` -- magic number, should use `var(--cg-border-radius-50, 4px)`.
- **Line 99**: `.line-count` `margin-left: 4px` -- magic number.
- **Line 105**: Extra closing brace `}` -- **CSS syntax error** that may break rounded variant rules.
- **Lines 154-186**: `_renderValue` method manages circular reference detection via `_seen` WeakSet, but the WeakSet is reset every render (line 231). If data changes mid-render cycle, could theoretically cause issues.
- **Line 225**: Key `@click` and `@keydown` only handle Enter key -- should also handle Space for `role="button"`.

---

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Default | Yes | Partial | Some non-standard tokens |
| Hover (key) | Yes | No | Line 56 uses `text-decoration: underline` -- OK |
| Hover (toggle) | Yes | Yes | Line 82 |
| Active | No | N/A | No pressed state |
| Focus | Yes | Yes | Line 84-87 on toggle |
| Disabled | No | N/A | No disabled state |
| Loading | No | N/A | No loading state |
| Error | No | N/A | No error state for invalid data |
| Empty | Partial | N/A | Renders null value for null data |
| Collapsed | Yes | Yes | Toggle expand/collapse per node |
| Circular ref | Yes | N/A | Shows `[Circular]` label |

### 2.2 Keyboard Navigation
- Toggle buttons have `tabindex="0"` -- keyboard accessible.
- Key labels have `tabindex="0"` and `role="button"` -- good.
- **Issue**: Key `@keydown` (line 225) only checks `e.key === 'Enter'` -- should also handle Space key for `role="button"` compliance.
- No arrow-key navigation between tree nodes.
- No "expand all" / "collapse all" keyboard shortcut.

### 2.3 ARIA & Accessibility
- Root has `role="tree"` and `aria-label` -- good (line 233).
- Toggle buttons have `aria-label` ("Expand/Collapse array/object") -- good.
- Key labels have `aria-label` with path -- good.
- **Missing**: Tree items should have `role="treeitem"` for proper tree semantics.
- **Missing**: Expanded/collapsed state should use `aria-expanded` on tree items, not just toggle buttons.

### 2.4 Touch & Mobile
- Toggle buttons are 16x16px -- too small for touch targets (recommended 44x44).
- Tree indentation may cause horizontal overflow on narrow screens.
- No touch-specific optimizations.

---

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 44 | `rgba(255, 255, 255, 0.05)` | `var(--cg-overlay-light-subtle)` |
| 45 | `rgba(255, 255, 255, 0.03)` | `var(--cg-overlay-light-minimal)` |
| 77 | `font-size: 10px` | `var(--cg-font-size-2xs, 10px)` |
| 79 | `border-radius: 3px` | `var(--cg-border-radius-50, 4px)` |
| 99 | `margin-left: 4px` | `var(--cg-spacing-4, 4px)` |

### 3.2 Raw Colors Found
| Line | Color | Suggested Token |
|------|-------|-----------------|
| 53 | `#60a5fa` | `var(--cg-color-code-function, #93c5fd)` or `var(--cg-color-status-info-text-default, #60a5fa)` |
| 62 | `#fb923c` | Need a token -- e.g., `var(--cg-color-code-boolean, #fb923c)` or `var(--cg-orange-400, #fb923c)` |

### 3.3 Typography Issues
- Toggle `font-size: 10px` -- should use token.

### 3.4 Spacing Issues
- `.line-count` `margin-left: 4px` -- should use token.
- Toggle `border-radius: 3px` -- not in standard token scale.

### 3.5 Modern Design Enhancements
- Add search/filter capability for large JSON trees.
- Add copy-to-clipboard for individual values or subtrees.
- Add path breadcrumb display.
- Increase toggle button touch target with invisible padding.
- Add syntax highlighting for string values that look like URLs, dates, or emails.

---

## 4. Prioritized Fixes

### P0 - Critical
1. Fix CSS syntax error: remove extra `}` on line 105.
2. Replace raw hex `#60a5fa` on line 53 with token.
3. Replace raw hex `#fb923c` on line 62 with token.

### P1 - High
4. Fix non-standard tokens: `--cg-color-surface` -> `--cg-color-surface-container-background`, `--cg-color-border` -> `--cg-color-surface-container-border`.
5. Add Space key handling to `@keydown` on key labels (line 225).
6. Add `role="treeitem"` and `aria-expanded` to tree nodes.
7. Replace raw rgba values with overlay tokens.

### P2 - Medium
8. Replace `font-size: 10px`, `border-radius: 3px`, `margin-left: 4px` with tokens.
9. Increase toggle button touch target size for mobile.
10. Add loading state for async data.
11. Add error state for invalid/unparseable data.

### P3 - Low
12. Add search/filter capability.
13. Add copy-to-clipboard for subtrees.
14. Add arrow-key tree navigation.
15. Add "expand all" / "collapse all" controls.
