# ai-annotation — Improvement Plan

## Current State

### CSS Audit
| Property | Value | Token? | Issue |
|---|---|---|---|
| `:host` animation | `fadeSlideIn 200ms` | Partial | Duration should use token |
| `.toolbar-label` margin-right | `4px` | No | Should use `var(--cg-spacing-4)` |
| `.label-btn` padding | `3px var(--cg-spacing-8)` | Partial | `3px` not tokenized |
| `.label-dot` border-radius | `50%` | OK | Standard |
| `.annotated-span` padding | `1px 2px` | No | Not tokenized |
| `.annotated-span` border-radius | `3px` | No | Should use `var(--cg-border-radius-25)` |
| `.annotation-label` position | `top: -18px` | No | Magic number |
| `.annotation-label` font-size | `9px` | No | Should use `var(--cg-font-size-3xs)` |
| `.annotation-label` padding | `0 4px` | No | Should use spacing token |
| `.annotation-label` border-radius | `3px` | No | Should use token |
| `.confidence-bar` height | `2px` | No | Should use `var(--cg-spacing-2)` |
| `.confidence-bar` bottom | `-3px` | No | Magic number |
| All colors | Uses tokens | Yes | Good |
| Reduced motion | Yes | Good — explicitly handles prefers-reduced-motion |

### States Audit
| State | Implemented? | Notes |
|---|---|---|
| Default (with annotations) | Yes | Highlighted spans with labels |
| Editable mode | Yes | Selection creates new annotation |
| Hover (annotated span) | Yes | Opacity change + label revealed |
| Focus-visible | Yes | Accent outline on spans |
| Label toolbar | Yes | Label selection buttons |
| Selected label | Yes | Border highlight on selected |
| Empty content | Yes | "No content to annotate" |
| Confidence visualization | Yes | Bottom bar proportional to confidence |
| Reduced motion | Yes | Labels always visible, no transitions |
| Loading | No | No loading state |
| Error | No | No error state |
| Overlapping annotations | Yes | Handled by keeping first, discarding overlaps |

### Interaction Audit
- Span click dispatches `ai-annotation-select` - OK
- Selection + label creates new annotation dispatching `ai-annotation-add` - OK
- Remove annotation dispatches `ai-annotation-remove` - OK (but no remove UI visible in component)
- Keyboard: span has `tabindex="0"` and `role="note"` - OK
- Label buttons for selection mode - OK
- Color sanitization prevents CSS injection - OK
- Text selection via `window.getSelection()` with Shadow DOM workaround - OK
- Tree walker for character offset calculation - OK

## Style Fixes Needed

1. **Tokenize animation duration** on `:host`
2. **Tokenize toolbar-label margin** `4px` to `var(--cg-spacing-4)`
3. **Tokenize label-btn padding** `3px` to `var(--cg-spacing-3)` or nearest token
4. **Tokenize annotated-span padding** `1px 2px` to spacing tokens
5. **Tokenize annotated-span border-radius** `3px` to `var(--cg-border-radius-25)`
6. **Tokenize annotation-label font-size** `9px` to `var(--cg-font-size-3xs)`
7. **Tokenize annotation-label position** `-18px` with a calculated value
8. **Tokenize annotation-label padding** `0 4px` to `0 var(--cg-spacing-4)`
9. **Tokenize annotation-label border-radius** `3px` to token
10. **Tokenize confidence-bar height** `2px` to `var(--cg-spacing-2)`

## Interaction Fixes Needed

1. **Add loading state** for async annotation data
2. **Add error state** for annotation processing failures
3. **Add remove UI** — the `_handleRemove` method exists but no remove button is rendered
4. **Add keyboard selection support** — currently only mouse selection creates annotations
5. **Improve Shadow DOM selection** — `window.getSelection()` may not work reliably across all browsers with Shadow DOM
6. **Add annotation count per label** in toolbar stats
7. **Add `aria-label` on label buttons** describing current selection state
8. **Overlapping annotation feedback** — silently discarding overlaps; consider visual feedback

## Test Spec

### Unit Tests
- [ ] renders plain content without annotations
- [ ] renders annotated spans with correct background color and border
- [ ] renders annotation label on hover (CSS-driven)
- [ ] renders confidence bar proportional to confidence value
- [ ] sorts annotations by start position
- [ ] removes overlapping annotations (keeps first)
- [ ] clamps annotations to content bounds
- [ ] renders label toolbar with all label definitions
- [ ] renders annotation count in stats
- [ ] selected label has "selected" class
- [ ] empty content shows "No content to annotate"
- [ ] sanitizes label colors (blocks CSS injection)

### Event Tests
- [ ] dispatches `ai-annotation-select` on span click
- [ ] dispatches `ai-annotation-add` on text selection with selected label
- [ ] dispatches `ai-annotation-remove` (when remove UI is added)
- [ ] events bubble and are composed

### Accessibility Tests
- [ ] container has `role="document"` and `aria-label="Annotated text"`
- [ ] annotated spans have `role="note"`, `tabindex="0"`, and `aria-label`
- [ ] focus-visible outline on annotated spans
- [ ] reduced motion: labels always visible, no transitions
- [ ] label buttons accessible via keyboard

### Visual Regression Tests
- [ ] snapshot: text with multiple annotation types
- [ ] snapshot: editable mode with selected label
- [ ] snapshot: annotation with confidence bars
- [ ] snapshot: empty content state
- [ ] snapshot: reduced-motion mode
