# AI Changelog Improvement Plan

**Component**: `ai-changelog`
**Category**: AI-Native
**File**: `src/components/ai-changelog/ai-changelog.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Hardcoded raw hex colors in `TYPE_COLORS` map (lines 29-33) -- 8 raw hex values with no token references
2. Stray CSS closing brace (line 196) causing malformed stylesheet
3. Rollback button hover uses raw `#eab308` hex on lines 182-183

---

## 1. Functional Issues
- **Line 196**: Extra closing brace `}` after `.empty-state` rule creates a malformed CSS block -- identical issue to ai-cost-dashboard.
- **Lines 29-33**: `TYPE_COLORS` object uses inline raw hex colors for background and foreground of type badges. These are applied via inline `style=` attributes (lines 245, 257), completely bypassing the design token system.
- **Line 200**: `_expandedSet` mutation via `.add()` and `.delete()` followed by `requestUpdate()` works but is not idiomatic Lit. Should create new Set for proper reactivity.
- **Line 239**: Entry ID `${entry.version}-${i}` could collide if entries with the same version exist at different indices across re-renders.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | |
| Hover | Partial | Entry card (line 99), rollback button (line 182) |
| Active/Pressed | No | No `:active` state on any element |
| Focus | Yes | Entry card and buttons have `:focus-visible` |
| Disabled | No | No disabled state for rollback or entries |
| Loading | No | No skeleton state |
| Error | No | No error state |
| Empty | Yes | Line 230 |
| Expanded | Yes | Toggle expand/collapse |

**Missing**: active, disabled, loading, error states (4 of 8+ missing).

### 2.2 Keyboard Navigation
- **Entry cards** (line 251): Have `tabindex="0"` and `@keydown` for Enter/Space -- good.
- **Expand toggle** (line 270-276): Standard `<button>` with `tabindex="0"` -- good.
- **Rollback button** (line 279-284): Standard `<button>` with `tabindex="0"` -- good.
- **No roving tabindex**: With many entries, tab-through can be tedious. Consider arrow key navigation between entries.

### 2.3 ARIA & Accessibility
- **Line 237**: `role="list"` with `aria-label="Version history"` -- good.
- **Line 244**: `role="listitem"` -- good.
- **Line 249**: `aria-label` on entry card with version, type, and date -- good.
- **Line 274**: `aria-expanded` on expand toggle -- good.
- **Line 282**: `aria-label` on rollback button -- good.
- **Missing**: No `aria-live` region for when entries are dynamically added.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggestion |
|------|-------|------------|
| 62 | `padding-left: 20px` | Use `var(--cg-spacing-20, 20px)` |
| 67 | `left: 6px` | Use `var(--cg-spacing-6, 6px)` |
| 68 | `top: 4px` | Use `var(--cg-spacing-4, 4px)` |
| 69 | `bottom: 4px` | Same |
| 70 | `width: 2px` | Use `var(--cg-size-25, 2px)` |
| 81 | `left: -20px` | Use `calc(-1 * var(--cg-spacing-20, 20px))` |
| 82 | `top: 6px` | Use `var(--cg-spacing-6, 6px)` |
| 83 | `width: 10px` | Use `var(--cg-size-125, 10px)` |
| 84 | `height: 10px` | Same |
| 119 | `font-size: 10px` | Use `var(--cg-font-size-2xs, 10px)` |
| 121 | `letter-spacing: 0.04em` | Use `var(--cg-letter-spacing-wide, 0.05em)` |
| 122 | `padding: 2px var(--cg-spacing-8, 8px)` | Use `var(--cg-spacing-2, 2px)` |
| 142 | `max-height: 40px` | Use a CSS custom property |
| 145 | `max-height: 500px` | Same |

### 3.2 Raw Colors Found
| Line | Color | Replacement |
|------|-------|------------|
| 29 | `rgba(59, 130, 246, 0.15)` / `#3b82f6` | Use `var(--cg-blue-500)` with opacity modifier |
| 30 | `rgba(223, 255, 97, 0.15)` / `#dfff61` | Use `var(--cg-brand-ai-accent)` with opacity |
| 31 | `rgba(168, 85, 247, 0.15)` / `#a855f7` | Use `var(--cg-purple-500)` with opacity |
| 32 | `rgba(34, 197, 94, 0.15)` / `#22c55e` | Use `var(--cg-green-500)` with opacity |
| 182 | `#eab308` | Use `var(--cg-color-status-warning-text-default)` |
| 183 | `#eab308` | Same |

### 3.3 Spacing Issues
- Animation duration on line 38 uses raw `200ms` instead of `var(--cg-motion-duration-fast)`.
- Transitions on lines 97, 143, 157, 179 use raw duration values.

### 3.4 Modern Design Enhancements
- Timeline line could have a gradient fade at top and bottom.
- Entry dots could pulse briefly on hover for micro-interaction feedback.
- Type badges should use CSS custom properties mapped from a token-based color system instead of inline styles.
- Consider a slide-down animation for expand/collapse instead of max-height transition.

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix stray CSS brace** (line 196) -- malformed stylesheet.
2. **Replace all raw hex in `TYPE_COLORS`** (lines 29-33) -- refactor to use CSS classes with token-based colors instead of inline styles.
3. **Replace raw `#eab308`** on lines 182-183 with `var(--cg-color-status-warning-text-default)`.

### P1 - High
4. **Add loading skeleton state** with shimmer timeline entries.
5. **Add disabled state** for rollback buttons and entry cards.
6. **Add `:active` press state** to entry cards and buttons.
7. **Replace all magic number pixel values** for timeline positioning (lines 62-84) with tokens.
8. **Replace `font-size: 10px`** (line 119) with `var(--cg-font-size-2xs)`.

### P2 - Medium
9. **Refactor TYPE_COLORS to CSS classes** -- move from inline `style=` to CSS classes with token-based custom properties.
10. **Fix Set mutation pattern** (line 200) -- create new Set for Lit reactivity.
11. **Replace transition durations** with motion tokens.
12. **Add `aria-live` region** for dynamically added entries.

### P3 - Low
13. **Add error state** for failed data fetch.
14. **Add arrow key navigation** between timeline entries.
15. **Modern design polish** -- gradient timeline, pulse dots, slide animations.
