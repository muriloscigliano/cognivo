# ai-capture-flow — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Good coverage — spacing, colors, typography, border-radius all tokenized.
- **Magic numbers**: `width: 24px; height: 24px` on `.step-dot` — should use `var(--cg-spacing-24, 24px)`. `height: 2px` on `.step-line` — acceptable for divider.
- **Step indicator**: Numbered dots with done/active/pending states and connecting lines.
- **Card variant tokens**: Uses `--cg-color-surface-cards-background` and `--cg-color-surface-cards-border` — different from other components that use `container` tokens.

### States Audit

| State | Supported | Notes |
|---|---|---|
| Upload | Yes | Drop zone with drag-over highlight |
| Preview | Yes | Image preview with confirm/retake buttons |
| Processing | Yes | Progress bar with percentage |
| Complete | Yes | Success icon with result text and Done button |
| Error | Yes | Error icon with retry button |
| Drag-over | Yes | Border and background highlight |
| Focus-visible | Yes | Upload zone, buttons have focus rings |
| Loading | **Partial** | Processing step is the loading state |
| Disabled | **No** | No disabled state |

### Interaction Audit
- **File selection**: Click opens file picker, drag-and-drop supported.
- **File event**: Fires `ai-capture-file` with File object.
- **Confirm**: Fires `ai-capture-confirm`.
- **Retry**: Fires `ai-capture-retry`.
- **Complete**: Fires `ai-capture-complete`.
- **Step indicator**: Visual only (not clickable).
- **ARIA**: `role="button"` on upload zone, `role="progressbar"`, `role="region"`, `role="navigation"` on steps.

## Style Fixes Needed

1. **Step dot dimensions** — Uses raw `24px`. Replace with `var(--cg-spacing-24, 24px)`.
2. **Button base reset** — Global `button` styles in shadow DOM. Should be scoped to specific classes to avoid unintended style leaks if component is subclassed.
3. **Progress fill weight** — `font-weight: 600` on `.progress-pct` should use `var(--cg-font-weight-semibold, 600)`.
4. **Error icon** — Uses HTML entity `&#10007;` — should use inline SVG for consistency.
5. **Success icon** — Uses HTML entity `&#10003;` — same issue.
6. **Upload icon** — Uses emoji `&#128206;` (paperclip) — inconsistent with SVG icons used elsewhere.
7. **Card tokens** — Uses `--cg-color-surface-cards-*` tokens while most components use `--cg-color-surface-container-*`. Should be consistent.
8. **Rounded variants** — Missing `:host([rounded])` support.

## Interaction Fixes Needed

1. **Step indicator click** — Steps should be clickable to navigate back to completed steps.
2. **Multiple file support** — Only handles single file. Consider `multiple` attribute support.
3. **File size validation** — No file size check before firing event.
4. **File type validation** — `accept` is passed to input but no visual validation message if wrong type is dropped.
5. **Preview for non-images** — Only renders `<img>` for preview. PDFs and other file types need alternative preview.
6. **Cancel processing** — No way to cancel during processing step.
7. **Keyboard drag-and-drop** — Not accessible via keyboard. The upload zone works via click+Enter, which is good.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders upload zone at step "upload" | Unit |
| 2 | File input triggers `ai-capture-file` event | Interaction |
| 3 | Drag-and-drop triggers `ai-capture-file` event | Interaction |
| 4 | Drag-over adds highlight class | Interaction |
| 5 | Drag-leave removes highlight class | Interaction |
| 6 | Preview step shows image from `previewUrl` | Unit |
| 7 | "No preview available" when previewUrl is empty | Unit |
| 8 | Confirm button fires `ai-capture-confirm` | Unit |
| 9 | Retake button fires `ai-capture-retry` | Unit |
| 10 | Processing step shows progress bar at correct width | Unit |
| 11 | Progress percentage displayed | Unit |
| 12 | Complete step shows result text | Unit |
| 13 | Done button fires `ai-capture-complete` | Unit |
| 14 | Error step shows error text and retry button | Unit |
| 15 | Step indicator shows correct active/done/pending dots | Unit |
| 16 | Step lines colored for completed steps | Visual |
| 17 | Focus-visible ring on upload zone and buttons | A11y |
| 18 | `accept` attribute passed to file input | Unit |
