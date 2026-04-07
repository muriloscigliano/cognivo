# AI Keyboard Shortcuts Improvement Plan

**Component**: `ai-keyboard-shortcuts`
**Category**: AI-Native
**File**: `src/components/ai-keyboard-shortcuts/ai-keyboard-shortcuts.ts`
**Priority**: P2-Medium

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. CSS syntax error: orphaned `}` on line 178 after `.no-results`
2. Missing focus trap -- when the modal opens, focus is not trapped inside it, allowing Tab to escape to elements behind the overlay
3. Several magic numbers in key badge dimensions, shortcut row padding, close button padding (lines 85, 134, 153-155)

---

## 1. Functional Issues

- **Line 178**: Orphaned closing `}` after `.no-results` block. This is a CSS parse error.
- **No focus trap**: When the modal opens (line 227), focus is not moved into the modal and is not trapped. Per WAI-ARIA dialog pattern, focus should move to the first focusable element (search input) on open, and Tab should cycle within the modal.
- **No focus restore**: When the modal closes (line 201-204), focus is not restored to the element that opened it.
- **Line 233**: Backdrop click closes the modal, but clicking inside the modal also propagates. The `e.target === e.currentTarget` check (line 233) handles this correctly.
- **Line 181**: `open` is reflected to an attribute, which is good for external CSS styling.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Notes |
|-------|------------|-------|
| Open | Yes | Controlled by `open` prop |
| Closed | Yes | Returns `nothing` when not open (line 228) |
| Search active | Yes | Filters shortcuts |
| No results | Yes | `.no-results` (line 249) |
| Hover | Yes | `.close-btn:hover` (line 88) |
| Focus-visible | Yes | `.close-btn:focus-visible` (line 89), `.search-input:focus` (line 109) |
| Disabled | **No** | No disabled state |
| Loading | **No** | No loading state |
| Error | **No** | No error state |
| Active/pressed | **No** | No `:active` on close button |

**Missing states**: disabled, loading, error, active/pressed (4 of 8+ required).

### 2.2 Keyboard Navigation
- **Escape key** closes the modal (lines 185-189) -- good.
- **Close button** is a standard `<button>` with keyboard access -- good.
- **Search input** is natively focusable -- good.
- **Missing**: Focus trap within the modal.
- **Missing**: Initial focus management on open (focus should move to search input).
- **Missing**: Focus restoration on close.
- **Missing**: Arrow-key navigation between shortcut rows.

### 2.3 ARIA & Accessibility
- **Line 234**: `role="dialog"` with `aria-label="Keyboard shortcuts"` and `aria-modal="true"` -- excellent.
- **Line 237**: Close button has `aria-label="Close shortcuts"` -- good.
- **Line 245**: Search input has `aria-label="Search shortcuts"` -- good.
- **Line 247**: `role="list"` on shortcuts container -- good.
- **Line 253**: `role="listitem"` on shortcut rows -- good.
- **Missing**: `aria-live="polite"` on the results area to announce filtered results count.
- **Note**: `aria-modal="true"` is declared but without a focus trap, assistive technology may still navigate outside the modal.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Property | Value | Suggested Token |
|------|----------|-------|-----------------|
| 47 | `z-index` | `9999` | `var(--cg-z-index-modal, 9999)` |
| 48 | `backdrop-filter` | `blur(4px)` | `var(--cg-blur-md, 4px)` |
| 57 | `max-width` | `520px` | Component-specific token |
| 58 | `width` | `90vw` | OK (responsive value) |
| 59 | `max-height` | `70vh` | OK (responsive value) |
| 85 | `padding` | `4px` | `var(--cg-spacing-4, 4px)` |
| 134 | `padding` | `8px 4px` | `var(--cg-spacing-8) var(--cg-spacing-4)` |
| 153 | `min-width` | `24px` | `var(--cg-spacing-24, 24px)` |
| 154 | `height` | `24px` | `var(--cg-spacing-24, 24px)` |
| 155 | `padding` | `0 6px` | `0 var(--cg-spacing-6, 6px)` |
| 158 | `border-bottom-width` | `3px` | `var(--cg-border-width-thick, 3px)` |
| 43 | `rgba(0, 0, 0, 0.6)` | overlay background | See 3.2 |

### 3.2 Raw Colors Found
| Line | Value | Context | Suggested Token |
|------|-------|---------|-----------------|
| 43 | `rgba(0, 0, 0, 0.6)` | `.overlay` background | `var(--cg-color-overlay-backdrop)` |
| 61 | `rgba(255, 255, 255, 0.05)` | box-shadow inset | `var(--cg-color-surface-highlight)` |
| 62 | `rgba(255, 255, 255, 0.03)` | background gradient | `var(--cg-color-surface-gradient-start)` |

### 3.3 Spacing Issues
- Key badge dimensions (24x24) could benefit from a component-level token.
- The `border-bottom-width: 3px` on `.key-badge` (line 158) creates a 3D keyboard key effect -- intentional but should be tokenized.
- Overlay `z-index: 9999` should use a z-index token to coordinate with other overlays.

### 3.4 Modern Design Enhancements
- Add a subtle entrance/exit animation for the modal (scale + fade).
- Key badges could have a subtle shadow to enhance the physical keyboard key look.
- Consider grouping with collapsible category sections.
- Add a "Reset to defaults" or "Customize" button for interactive shortcut management.
- The search could highlight matching characters within descriptions and key names.

## 4. Prioritized Fixes

### P0 - Critical
1. **Add focus trap** -- when the modal opens, trap Tab/Shift+Tab within the modal. Use a focus trap utility or manual implementation.
2. **Add initial focus management** -- move focus to search input when modal opens.
3. **Add focus restoration** -- return focus to the triggering element when modal closes.

### P1 - High
4. **Fix CSS syntax error** -- remove orphaned `}` on line 178.
5. **Replace `rgba(0, 0, 0, 0.6)`** on line 43 with `var(--cg-color-overlay-backdrop)`.
6. **Replace all magic numbers** listed in 3.1 with design tokens.
7. **Tokenize `z-index: 9999`** with a z-index token.

### P2 - Medium
8. **Add `aria-live="polite"`** to announce filtered results count.
9. **Add entrance/exit animation** for the modal.
10. **Add `:active` pressed style** on close button.
11. **Replace `rgba()` inset values** with surface tokens.

### P3 - Low
12. **Add arrow-key navigation** between shortcut rows.
13. **Add search term highlighting** in descriptions.
14. **Add collapsible category sections**.
15. **Tokenize `max-width: 520px`** with a component-level token.
16. **Add key badge shadow** for enhanced 3D key effect.
