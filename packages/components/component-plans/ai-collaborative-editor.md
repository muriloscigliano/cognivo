# ai-collaborative-editor — Improvement Plan

## Current State

### CSS Audit
| Property | Value | Token? | Issue |
|---|---|---|---|
| `:host` animation duration | `200ms` | No | Should use motion token |
| `textarea` min-height | `120px` | No | Magic number, should be configurable |
| `.editor-wrap` min-height | `120px` | No | Magic number, matches textarea |
| `.presence-dot` border-radius | `50%` | OK | Standard |
| `.presence-dot` transition | `transform var(--cg-motion-duration-fast)` | Yes | Good |
| `textarea:hover` border-color | Token | Yes | Good |
| All colors | Uses tokens | Yes | Good |
| All spacing | Uses tokens | Yes | Good |
| All border-radius | Uses tokens | Yes | Good |

### States Audit
| State | Implemented? | Notes |
|---|---|---|
| Default (editable) | Yes | Textarea with placeholder |
| Disabled | Yes | `opacity: 0.5; cursor: not-allowed` |
| Focus-visible | Partial | `textarea:focus-visible` has border-radius but no visible indicator |
| Cursor overlay | Yes | Colored cursor markers for remote users |
| Presence dots | Yes | Colored dots in footer |
| Word/char count | Yes | Footer statistics |
| Loading | No | No loading state |
| Error | No | No error state |
| Read-only | Partial | Disabled serves as read-only but style is muted |

### Interaction Audit
- Input dispatches `ai-editor-change` with content - OK
- Cursor move dispatches `ai-editor-cursor-move` with position and selection - OK
- Textarea has `aria-label="Editor content"` - OK
- `tabindex="0"` on textarea - OK
- Cursor position calculation based on character width estimate - Fragile
- Presence dots in footer with user tooltips - OK
- `@query('textarea')` for direct DOM access - OK

## Style Fixes Needed

1. **Tokenize animation duration** on `:host`
2. **Make min-height configurable** — expose via prop or CSS custom property
3. **Add visible focus-visible indicator** on textarea — currently just border-radius, needs outline or box-shadow
4. **Add error state styles** — red border for validation errors
5. **Presence dot hover** — scale transform is nice but needs accessible alternative

## Interaction Fixes Needed

1. **Improve cursor position calculation** — `charWidth = 8.4` and `lineHeight = 22.4` are magic numbers that depend on specific fonts; should compute dynamically
2. **Add loading state** for initial content fetch
3. **Add error state** with error message display
4. **Add read-only mode** distinct from disabled (same content appearance but non-editable)
5. **Add `aria-live` on stats** — word/char counts should announce on change for screen readers (or use `role="status"`)
6. **Presence count accessibility** — "X online" text is in visual DOM but needs proper ARIA
7. **Add undo/redo support** or at least document that native textarea undo works
8. **Content sync** — component uses `.value` binding but doesn't debounce input events for performance
9. **Handle paste events** — large pastes could cause performance issues

## Test Spec

### Unit Tests
- [ ] renders textarea with initial content
- [ ] renders placeholder when content is empty
- [ ] updates word and character counts on input
- [ ] handles zero words (empty content) correctly
- [ ] renders cursor markers at correct positions for each remote user
- [ ] renders presence dots for each cursor in footer
- [ ] shows "X online" count matching cursor count
- [ ] disables textarea when `editable=false`
- [ ] cursor label shows user name with user's color

### Event Tests
- [ ] dispatches `ai-editor-change` on input with content string
- [ ] dispatches `ai-editor-cursor-move` on click and keyup with position and selection
- [ ] events bubble and are composed

### Accessibility Tests
- [ ] textarea has `aria-label="Editor content"`
- [ ] editor wrap has `role="group"` and `aria-label="Collaborative text editor"`
- [ ] cursors overlay has `aria-hidden="true"`
- [ ] presence section has `aria-label` with user count
- [ ] focus-visible indicator visible on textarea

### Visual Regression Tests
- [ ] snapshot: editor with content and cursor markers
- [ ] snapshot: disabled editor
- [ ] snapshot: editor with multiple remote cursors
- [ ] snapshot: empty editor with placeholder
