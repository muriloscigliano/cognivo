# AI Memory Panel Improvement Plan

**Component**: `ai-memory-panel`
**Category**: AI-Native
**File**: `src/components/ai-memory-panel/ai-memory-panel.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Raw hex colors in memory type badges (lines 109-111) -- `#60a5fa`, `#a78bfa`, `#fbbf24` not wrapped in tokens
2. CSS structure issue: orphaned `}` on line 138 and misplaced bare `:focus-visible` rule on lines 141-144
3. Memory action buttons are only visible on hover (`opacity: 0` on line 124), making them completely inaccessible to keyboard and touch users

---

## 1. Functional Issues

- **Lines 138-144**: Orphaned `}` on line 138 after `.empty` block, followed by a bare `:focus-visible` rule outside proper scope. This is structurally broken CSS.
- **Lines 123-125**: `.memory-actions` has `opacity: 0` by default and only becomes visible on `:hover`. This means keyboard-focused users and touch users can never access the pin/delete buttons. The buttons are effectively invisible unless using a mouse.
- **Line 151**: `_searchTimer` is stored as an instance property but is never cleared on `disconnectedCallback`. If the component unmounts during a debounce window, the timer will fire on a disconnected element.
- **Line 81**: `.search-row` uses inline values `padding: 8px 16px` instead of token syntax.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Notes |
|-------|------------|-------|
| Default | Yes | |
| Hover | Yes | `.memory:hover` (line 101) |
| Focus-visible | Broken | Misplaced `:focus-visible` on line 141 |
| Active tab | Yes | `.tab.active` (line 74) |
| Pinned memory | Yes | `.memory.pinned` (line 103) |
| Search active | Yes | Filter with search input |
| Empty | Yes | `.empty` (line 137) |
| Disabled | **No** | No disabled state |
| Loading | **No** | No loading/skeleton state |
| Error | **No** | No error state |
| Active/pressed | **No** | No `:active` on tabs or buttons |

**Missing states**: proper focus-visible, disabled, loading, error, active/pressed (5 of 8+ required).

### 2.2 Keyboard Navigation
- **Tab buttons** are standard `<button>` elements and keyboard-accessible.
- **Search input** is natively focusable.
- **Pin/Delete buttons**: These are `<button>` elements but have `opacity: 0` until parent `.memory:hover`. Keyboard users who Tab to these buttons will find invisible controls. This is a critical accessibility failure.
- **Missing**: Arrow-key navigation between memories.
- **Missing**: Keyboard shortcut for tab switching (e.g., ArrowLeft/Right on tab bar).

### 2.3 ARIA & Accessibility
- **Line 189**: `role="region"` with `aria-label="Agent memory"` -- good.
- **Tab buttons** (lines 195-203): Missing `role="tablist"` on `.tabs` container, `role="tab"` on buttons, and `aria-selected` attribute. The current implementation uses plain buttons without proper tab ARIA pattern.
- **Missing**: `role="tabpanel"` on the content area below tabs.
- **Pin/Delete buttons** (lines 231-233): Have `aria-label` -- good, but they are invisible to most users.
- **Search input** (line 207): Missing `aria-label`. Only has a placeholder text.
- **Missing**: `aria-live="polite"` on the memories list or a count indicator for announcing result changes.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Property | Value | Suggested Token |
|------|----------|-------|-----------------|
| 76 | `font-size` | `10px` | `var(--cg-font-size-2xs, 10px)` |
| 76 | `padding` | `0 5px` | `0 var(--cg-spacing-5, 5px)` |
| 77 | `margin-left` | `4px` | `var(--cg-spacing-4, 4px)` |
| 81 | `padding` | `8px 16px` | `var(--cg-spacing-8, 8px) var(--cg-spacing-16, 16px)` |
| 93 | `max-height` | `350px` | Component-specific token |
| 106 | `font-size` | `9px` | `var(--cg-font-size-3xs, 9px)` |
| 106 | `padding` | `2px` | `var(--cg-spacing-2, 2px)` |
| 106 | `border-radius` | `3px` | `var(--cg-border-radius-25, 3px)` |
| 107 | `margin-top` | `2px` | `var(--cg-spacing-2, 2px)` |
| 116 | `font-size` | `13px` | `var(--cg-font-size-sm, 13px)` |
| 119 | `font-size` | `10px` | `var(--cg-font-size-2xs, 10px)` |
| 119 | `margin-top` | `3px` | `var(--cg-spacing-3, 3px)` |
| 123 | `gap` | `2px` | `var(--cg-spacing-2, 2px)` |
| 128 | `width/height` | `22px` | Component-specific token |
| 132 | `font-size` | `10px` | `var(--cg-font-size-2xs, 10px)` |
| 137 | `padding` | `32px` | `var(--cg-spacing-32, 32px)` |
| 137 | `font-size` | `13px` | `var(--cg-font-size-sm, 13px)` |

### 3.2 Raw Colors Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 44 | `rgba(255, 255, 255, 0.05)` | box-shadow inset | `var(--cg-color-surface-highlight)` |
| 45 | `rgba(255, 255, 255, 0.03)` | background gradient | `var(--cg-color-surface-gradient-start)` |
| 101 | `rgba(255, 255, 255, 0.02)` | `.memory:hover` bg | `var(--cg-color-surface-hover-subtle)` |
| 103 | `rgba(223, 255, 97, 0.03)` | `.memory.pinned` bg | `var(--cg-brand-ai-accent-alpha-3)` |
| 109 | `rgba(59, 130, 246, 0.12)` | `.memory-type.fact` bg | `var(--cg-blue-alpha-12)` |
| 109 | `#60a5fa` | `.memory-type.fact` color | `var(--cg-blue-400, #60a5fa)` |
| 110 | `rgba(139, 92, 246, 0.12)` | `.memory-type.preference` bg | `var(--cg-purple-alpha-12)` |
| 110 | `#a78bfa` | `.memory-type.preference` color | `var(--cg-purple-400, #a78bfa)` |
| 111 | `rgba(245, 158, 11, 0.12)` | `.memory-type.instruction` bg | `var(--cg-color-status-warning-bg)` |
| 111 | `#fbbf24` | `.memory-type.instruction` color | `var(--cg-yellow-400, #fbbf24)` |
| 112 | `rgba(34, 197, 94, 0.12)` | `.memory-type.context` bg | `var(--cg-color-status-success-bg)` |

### 3.3 Spacing Issues
- Search row padding `8px 16px` (line 81) is not using token syntax.
- Memory actions `gap: 2px` (line 123) should use token.
- Tab count badge `padding: 0 5px` (line 76) uses non-standard spacing.

### 3.4 Modern Design Enhancements
- Add a "Clear all" action for short-term memories.
- Add memory creation timestamps with relative formatting ("2 hours ago" is implemented in `_formatTime` -- good).
- Add drag-to-reorder for pinned memories.
- Consider a visual relevance indicator (mini bar or dot) next to each memory.
- Add a "Promote to long-term" action for short-term memories.

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix memory action visibility** -- remove `opacity: 0` on `.memory-actions` (line 124) and use a persistent visible state, or add `:focus-within` to make actions visible when any child button is focused.
2. **Fix CSS structure** -- remove orphaned `}` on line 138 and properly scope `:focus-visible` on lines 141-144.

### P1 - High
3. **Add proper ARIA tab pattern** -- add `role="tablist"`, `role="tab"`, `aria-selected`, `role="tabpanel"`.
4. **Replace all raw hex colors** (`#60a5fa`, `#a78bfa`, `#fbbf24`) with token references.
5. **Replace all `rgba()` literals** with semantic tokens.
6. **Replace all magic numbers** listed in 3.1 with design tokens.
7. **Add `aria-label`** to search input.

### P2 - Medium
8. **Clear search debounce timer** in `disconnectedCallback`.
9. **Add loading/skeleton state**.
10. **Add disabled state**.
11. **Tokenize search row padding** (line 81).
12. **Add `aria-live="polite"`** for announcing memory list changes.
13. **Add `:active` pressed style** on tabs and action buttons.

### P3 - Low
14. **Add arrow-key navigation** for tabs (left/right) and memories (up/down).
15. **Add "Promote to long-term"** action for short-term memories.
16. **Make `max-height: 350px`** responsive or configurable.
17. **Add Escape key** to clear search.
