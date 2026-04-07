# AI Feature Flag Improvement Plan

**Component**: `ai-feature-flag`
**Category**: AI-Native
**File**: `src/components/ai-feature-flag/ai-feature-flag.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. CSS syntax error: orphaned `}` on line 225 between `.empty` block and rounded variants
2. Several magic numbers in toggle dimensions, padding, margin, and font sizes (lines 140, 162-163, 186, 188-189, 194, 103-104, 155)
3. Raw `rgba()` colors for toggle active state and accent backgrounds (lines 68, 197-198)

---

## 1. Functional Issues

- **Line 225**: Orphaned closing `}` brace between `.empty` and the rounded variants block. This is a CSS parse error that could cause the rounded variant rules to be misinterpreted.
- **Line 243**: The `_filtered` getter calls `f.description.toLowerCase()`, but the `FeatureFlag` interface (line 26) makes `description` required. If a flag is passed without a description, this will throw. Should use optional chaining: `(f.description || '').toLowerCase()`.
- **Line 278**: The `@keydown` handler only checks `Enter`. Should also handle `Space` for consistency with other interactive elements in the system.
- **Toggle state update**: The component dispatches `ai-flag-toggle` but does not update the flag's `enabled` state locally. The toggle will visually snap back on re-render unless the parent updates the flags array.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Notes |
|-------|------------|-------|
| Default | Yes | |
| Hover | Yes | `.flag-item:hover` (line 123) |
| Focus-visible | Yes | `.flag-item:focus-visible` (line 127), `.toggle-switch input:focus-visible` (line 207) |
| Toggled on/off | Yes | `.toggle-switch input:checked` (line 197) |
| Search active | Yes | Filter with search input |
| Empty results | Yes | `.empty` (line 219) |
| Disabled | **No** | No disabled state for individual flags or the panel |
| Loading | **No** | No loading/skeleton state |
| Error | **No** | No error state |
| Active/pressed | **No** | No `:active` on flag items |

**Missing states**: disabled, loading, error, active/pressed (4 of 8+ required).

### 2.2 Keyboard Navigation
- **Search input** is focusable with `tabindex="0"` (line 306).
- **Flag items** have `tabindex="0"` and Enter key handler (line 276-278).
- **Toggle checkboxes** are native inputs and keyboard-accessible.
- **Missing**: Space key on flag items (line 278 only checks Enter).
- **Missing**: No arrow-key navigation between flag items in the list.

### 2.3 ARIA & Accessibility
- **Line 276**: `role="listitem"` on flag items is correct with `role="list"` parent (line 313).
- **Line 287**: Toggle has `aria-label="Toggle ${flag.name}"` -- good.
- **Search input** (line 305): Has `aria-label="Search feature flags"` -- good.
- **Missing**: Live region announcement when search results change (e.g., "3 of 5 flags shown").
- **Line 309**: Empty state has `role="status"` -- good.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Property | Value | Suggested Token |
|------|----------|-------|-----------------|
| 64 | `font-size` | `10px` | `var(--cg-font-size-2xs, 10px)` |
| 103 | `margin` | `12px 0 6px 0` | `var(--cg-spacing-12) 0 var(--cg-spacing-6) 0` |
| 140 | `margin-bottom` | `2px` | `var(--cg-spacing-2, 2px)` |
| 155 | `font-size` | `10px` | `var(--cg-font-size-2xs, 10px)` |
| 162 | `width` | `36px` | Component-specific token |
| 163 | `height` | `20px` | Component-specific token |
| 186 | `width` | `14px` | `var(--cg-spacing-14, 14px)` |
| 187 | `height` | `14px` | `var(--cg-spacing-14, 14px)` |
| 189 | `top` | `2px` | `var(--cg-spacing-2, 2px)` |
| 190 | `left` | `2px` | `var(--cg-spacing-2, 2px)` |
| 203 | `transform: translateX(16px)` | `16px` | `var(--cg-spacing-16, 16px)` |
| 156 | `rgba(255, 255, 255, 0.06)` | `.flag-env` bg | See 3.2 |

### 3.2 Raw Colors Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 41 | `rgba(255, 255, 255, 0.05)` | box-shadow inset | `var(--cg-color-surface-highlight)` |
| 41 | `rgba(255, 255, 255, 0.03)` | background gradient | `var(--cg-color-surface-gradient-start)` |
| 68 | `rgba(223, 255, 97, 0.1)` | `.env-badge` bg | `var(--cg-brand-ai-accent-alpha-10)` |
| 156 | `rgba(255, 255, 255, 0.06)` | `.flag-env` bg | `var(--cg-color-surface-subtle)` |
| 197 | `rgba(223, 255, 97, 0.2)` | toggle checked bg | `var(--cg-brand-ai-accent-alpha-20)` |

### 3.3 Spacing Issues
- Toggle switch dimensions (36x20) and thumb dimensions (14x14) are not on the spacing scale. These should be component-level CSS custom properties at minimum.
- Group label margin `12px 0 6px 0` (line 103) should use token syntax.

### 3.4 Modern Design Enhancements
- Add a toggle animation (the thumb already transitions but could use a subtle bounce or scale).
- Consider adding a "Bulk enable/disable" action in the header.
- Add a visual diff indicator showing recently changed flags.
- The search could highlight matching text within flag names/descriptions.

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix CSS syntax error** -- remove orphaned `}` on line 225.

### P1 - High
2. **Add Space key support** to flag item `@keydown` handler (line 278).
3. **Replace raw `rgba()` colors** with semantic tokens.
4. **Replace all magic numbers** listed in 3.1 with design tokens.
5. **Add defensive null check** on `f.description` in search filter (line 243).

### P2 - Medium
6. **Add disabled state** for individual flags and the overall panel.
7. **Add loading/skeleton state**.
8. **Add live region** for search result count announcements.
9. **Add `:active` pressed style** on flag items.

### P3 - Low
10. **Add toggle bounce animation**.
11. **Add search text highlighting** in flag names/descriptions.
12. **Add arrow-key navigation** between flag items.
13. **Consider bulk enable/disable action**.
