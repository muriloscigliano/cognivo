# ai-collaborative-editor Improvement Plan

**Component**: `ai-collaborative-editor`
**Category**: AI-Native
**File**: `src/components/ai-collaborative-editor/ai-collaborative-editor.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Fair
**Top 3 Issues**:
1. Hard-coded magic numbers for cursor position calculation (lines 198-199: `charWidth = 8.4`, `lineHeight = 22.4`, `padding = 12`) make cursor overlay unreliable across font sizes
2. Multiple raw pixel values and missing design tokens in CSS (lines 100-103, 107-109, 112-113, 140-141)
3. No undo/redo support, no keyboard shortcuts, and dangling CSS brace at line 151

---

## 1. Functional Issues

- **Lines 198-199**: `charWidth = 8.4` and `lineHeight = 22.4` are hard-coded magic numbers for cursor position math. These will be wrong for any non-default font size, zoom level, or font family. Should use `canvas.measureText()` or a hidden measurement element.
- **Line 200**: `padding = 12` duplicates the CSS padding value -- if CSS changes, this breaks silently.
- **Line 151**: Dangling closing brace `}` after `.textarea:hover` rule -- there's a stray `}` that closes a non-existent block. This is a CSS syntax error that may cause downstream rules to be ignored.
- **Line 148-150**: `textarea:hover` sets `border-color` but the textarea has `border: none` (line 57), so this hover style has zero visual effect.
- **Line 177**: Content is two-way bound via property but also mutated directly on line 177 (`this.content = target.value`), which can cause loops if a parent is also setting `content`.
- **Line 163-166**: `updated()` only checks `changed.has('content')` for count updates, but if content is set programmatically without going through `_onInput`, the cursor events won't fire.
- **No max-length or validation**: No constraint on content length, which could cause performance issues with large documents.
- **No read-only mode**: `editable=false` disables the textarea but provides no visual distinction beyond opacity.

## 2. Interaction Issues

### 2.1 State Coverage
Current states:
- Default (editable)
- Disabled (not editable)
- Focus (focus-visible ring)
- Placeholder (empty content)

Missing states:
- **Active/Pressed** -- no distinct active state
- **Hover** -- hover style exists but is non-functional (border on borderless element)
- **Error** -- no validation error state
- **Read-only** -- semantically different from disabled; should use `readonly` attribute
- **Loading** -- no state for when content is being synced
- **Saving** -- no indicator for save-in-progress
- **Conflict** -- no visual state for collaborative edit conflicts
- **Dirty/Unsaved** -- no indicator that content has changed since last save

### 2.2 Keyboard Navigation
- **No keyboard shortcuts**: Missing Ctrl+Z/Y (undo/redo), Ctrl+S (save trigger), Ctrl+A (select all in context)
- **No Tab trap handling**: Textarea captures Tab key for indentation by default in browsers; no explicit handling
- **Cursor overlay**: Keyboard users cannot navigate to or interact with other users' cursor labels
- **No Escape key handling**: No way to blur the editor via keyboard

### 2.3 ARIA & Accessibility
- **Line 223**: `role="group"` with `aria-label` is adequate for the editor wrapper.
- **Line 228**: Textarea has `aria-label="Editor content"` -- good.
- **Missing**: Presence dots (line 253) have `title` but no `aria-label` and are not announced to screen readers.
- **Missing**: Character/word count in footer should have `aria-live="polite"` so screen readers announce changes.
- **Missing**: Cursor overlay labels are `aria-hidden` implicitly (no ARIA) but should at least have a summary announcement when users join/leave.
- **Missing**: No `aria-describedby` linking the textarea to the word/char count.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Should Be |
|------|-------|-----------|
| 47 | `min-height: 120px` | `var(--cg-size-editor-min-height)` |
| 53 | `min-height: 120px` (repeated) | Same token |
| 62 | `line-height: 1.6` | `var(--cg-line-height-relaxed)` |
| 100 | `width: 2px` | `var(--cg-size-cursor-width)` |
| 101 | `height: 18px` | `var(--cg-size-cursor-height)` |
| 102 | `border-radius: 1px` | `var(--cg-border-radius-25)` |
| 107 | `font-size: 10px` | `var(--cg-font-size-2xs)` |
| 109 | `padding: 1px 4px` | `var(--cg-spacing-1) var(--cg-spacing-4)` |
| 112 | `margin-top: 2px` | `var(--cg-spacing-2)` |
| 137 | `width: 6px; height: 6px` | `var(--cg-size-dot)` |
| 141 | `transform: scale(1.3)` | Token or CSS custom property |
| 198 | `charWidth = 8.4` | Measured dynamically |
| 199 | `lineHeight = 22.4` | Measured dynamically |
| 200 | `padding = 12` | Read from CSS or use token |

### 3.2 Raw Colors Found
| Line | Value | Should Be |
|------|-------|-----------|
| 35 | `rgba(255, 255, 255, 0.03)` | `var(--cg-color-surface-overlay-subtle)` |
| 40 | `rgba(255, 255, 255, 0.05)` | `var(--cg-color-surface-overlay-faint)` |

Note: The component uses cursor colors from the `EditorCursor.color` prop passed via inline styles, which is acceptable for dynamic user colors.

### 3.3 Spacing Issues
- Footer padding uses tokens (line 120: `var(--cg-spacing-6)` and `var(--cg-spacing-12)`) -- good.
- Textarea padding uses tokens (line 59) -- good.
- Cursor label padding (line 109: `1px 4px`) does not use tokens.
- Presence dot size (line 137-138: `6px`) does not use a token.

### 3.4 Modern Design Enhancements
- Add a subtle glow or pulse animation on remote cursor labels when they move
- Add a "typing..." indicator next to remote cursor labels when the other user is actively typing
- Add line numbers gutter for code-editing use cases
- Add a subtle diff highlight when content changes from remote edits
- Consider adding a minimap for long documents
- The footer could benefit from a save status indicator

## 4. Prioritized Fixes

### P0 - Critical
1. Fix the dangling CSS brace at line 151 -- potential CSS parsing error
2. Fix the non-functional `textarea:hover` border-color (line 148-150) -- textarea has `border: none`
3. Replace hard-coded `charWidth`/`lineHeight`/`padding` (lines 198-200) with dynamic measurement to fix cursor overlay accuracy

### P1 - High
4. Replace all magic number sizes with design tokens (14 instances)
5. Replace raw rgba colors with semantic tokens (2 instances)
6. Add `aria-live="polite"` to the char/word count footer
7. Add missing interactive states: hover (functional), active, error, loading
8. Add `aria-describedby` linking textarea to stats
9. Distinguish read-only from disabled visually and semantically

### P2 - Medium
10. Add keyboard shortcuts (Ctrl+S for save event, etc.)
11. Add `font-size: 10px` instances to use `var(--cg-font-size-2xs)` token
12. Add conflict/dirty state visual indicators
13. Handle Tab key behavior explicitly (indent vs. focus trap)
14. Add line-height token usage (`1.6` -> `var(--cg-line-height-relaxed)`)

### P3 - Low
15. Add remote cursor animation/typing indicator
16. Add line numbers gutter option
17. Add max-length property with visual indicator
18. Add minimap for long documents
19. Add save/sync status indicator in footer
