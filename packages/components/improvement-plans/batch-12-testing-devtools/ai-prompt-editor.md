# ai-prompt-editor Improvement Plan

**Component**: `ai-prompt-editor`
**Category**: AI-Native
**File**: `src/components/ai-prompt-editor/ai-prompt-editor.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. Raw hex `#000` in `.action-btn.primary` color (line 130) -- must use token
2. Multiple magic number font-size values without tokens (lines 85, 87, 94, 97, 112)
3. Version list items use `<div>` with `role="option"` but lack proper keyboard support (no arrow key navigation for listbox)

---

## 1. Functional Issues

- **Non-null assertion (line 191)**: `this.versions[0]!.id` uses a non-null assertion. While guarded by `this.versions.length > 0`, this is fragile if the array is mutated externally between the check and the access.
- **No undo for edits**: Once editing begins, there's a Cancel button but no undo history. The `_editContent` is set once at `_startEdit()` (line 207) and any intermediate changes are lost on cancel.
- **No confirmation on version switch while editing**: If the user is editing and clicks a different version in the sidebar (line 247-248 calls `_selectVersion` which sets `_editing = false`), unsaved changes are silently discarded.
- **`updated()` override (line 188)**: The `changed` map uses `'versions'` string key which works but could be brittle with property renames. Also, this only selects an initial version -- if all versions are removed and re-added, the old `_selectedId` might point to a non-existent version.
- **Grid layout not responsive (line 45)**: `grid-template-columns: 220px 1fr` is fixed and doesn't collapse on narrow screens.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | |
| Hover | Yes | `.version-item:hover`, `.action-btn:hover` |
| Active | No | No `:active` press style |
| Focus | Yes | `:focus-visible` on version items, action buttons |
| Disabled | No | No disabled state for the component or individual buttons |
| Loading | No | No loading state while versions are being fetched |
| Error | No | No error display for save failures |
| Empty | Yes | "No prompt versions yet" (line 233) |
| Selected | Yes | `.selected` class on version items (line 81) |
| Editing | Yes | `_editing` state toggles textarea vs. display |

**Missing**: `:active`, disabled, loading, error states (4 missing).

### 2.2 Keyboard Navigation
- Version items have `tabindex="0"` and `@keydown` for Enter (line 248) -- good.
- **Issue**: `role="option"` elements inside a `role="listbox"` (line 242) should support Up/Down arrow key navigation per WAI-ARIA listbox pattern. Currently only Enter is handled.
- **Issue**: `Space` key is not handled for option selection.
- **Missing**: `Ctrl+S` keyboard shortcut for saving when in edit mode.
- **Missing**: `Escape` to cancel editing.
- Buttons use native `<button>` which is good. Action buttons at lines 266-274 have no `tabindex` needed.

### 2.3 ARIA & Accessibility
- Good: `role="region"` with `aria-label` (line 239).
- Good: `role="listbox"` with `aria-label` (line 242).
- Good: `role="option"` with `aria-selected` (lines 245-246).
- Good: `aria-label="Edit prompt"` on textarea (line 282).
- **Issue**: The `role="option"` elements are `<div>` not `<button>`, so they rely on `tabindex="0"` for focusability. This works but means each option is a separate tab stop rather than being navigable with arrows within the listbox.
- **Issue**: No `aria-activedescendant` pattern for the listbox, which is the preferred ARIA pattern.
- **Issue**: The active badge (line 251) has no `aria-label` so screen readers just read "Active" from text content, which is fine, but a more explicit "Currently active version" would help.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 45 | `220px` | `.editor grid-template-columns` | CSS custom property `--_sidebar-width` |
| 49 | `300px` | `.editor min-height` | `var(--cg-size-75, 300px)` |
| 85 | `12px` | `.version-id font-size` | `var(--cg-font-size-xs, 12px)` |
| 87 | `9px` | `.active-badge font-size` | `var(--cg-font-size-3xs, 9px)` |
| 88 | `1px 6px` | `.active-badge padding` | `var(--cg-spacing-1, 1px) var(--cg-spacing-6, 6px)` |
| 94 | `10px` | `.version-meta font-size` | `var(--cg-font-size-2xs, 10px)` |
| 97 | `2px` | `.version-meta margin-top` | `var(--cg-spacing-2, 2px)` |
| 112 | `13px` | `.main-title font-size` | `var(--cg-font-size-sm, 14px)` |
| 152 | `200px` | `textarea min-height` | CSS custom property |

### 3.2 Raw Colors Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 80 | `rgba(255, 255, 255, 0.03)` | `.version-item:hover` | `var(--cg-color-surface-hover-subtle)` |
| 81 | `rgba(223, 255, 97, 0.06)` | `.version-item.selected` | `var(--cg-brand-ai-accent-faint)` |
| 90 | `rgba(34, 197, 94, 0.12)` | `.active-badge background` | `var(--cg-color-status-success-bg)` |
| 130 | `#000` | `.action-btn.primary color` | `var(--cg-color-surface-container-background, #18181b)` |

### 3.3 Spacing Issues
- Most spacing uses tokens. The sidebar width (`220px`) and min-heights are hardcoded.

### 3.4 Modern Design Enhancements
- **Responsive sidebar**: Collapse to a dropdown or tabs on narrow viewports.
- **Diff view**: When switching versions, show a diff between the previous and selected version.
- **Character count**: Show character/token count in the editor footer.
- **Syntax highlighting**: Highlight system prompt keywords or markdown syntax in the editor.
- **Save confirmation toast**: Show a brief success toast after saving.

## 4. Prioritized Fixes

### P0 - Critical
(none)

### P1 - High
1. Replace `color: #000` (line 130) with `var(--cg-color-surface-container-background, #18181b)`
2. Add Up/Down arrow key navigation for `role="listbox"` with `aria-activedescendant` pattern
3. Add confirmation dialog when switching versions while editing (unsaved changes)
4. Replace `font-size: 13px` (line 112) and `font-size: 12px` (line 85) with font-size tokens

### P2 - Medium
5. Replace `font-size: 9px` (line 87) and `10px` (line 94) with tokens
6. Replace `rgba()` hover/selected colors with design tokens
7. Add `Escape` key to cancel editing
8. Add `Ctrl+S` / `Cmd+S` keyboard shortcut for save
9. Add responsive layout for narrow screens (collapse sidebar)
10. Add `:active` press states on buttons and version items
11. Replace `220px` sidebar width and `300px`/`200px` min-heights with CSS custom properties

### P3 - Low
12. Add loading skeleton state
13. Add error state for save failures
14. Add character/token count in editor footer
15. Improve `updated()` to handle version array mutations gracefully
16. Add `Space` key support for version selection
