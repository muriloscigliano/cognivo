# AI File Upload Improvement Plan

**Component**: `ai-file-upload`
**Category**: AI-Native
**File**: `src/components/ai-file-upload/ai-file-upload.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. CSS syntax error -- stray closing brace on line 135 after `.error-msg`
2. No file type validation despite `accept` prop -- only size is validated (line 185)
3. Missing loading/upload-progress, disabled, and multi-file limit states

---

## 1. Functional Issues
- **Line 135**: Stray closing brace `}` after `.error-msg` rule. This may break any styles that follow.
- **Lines 181-202**: `_processFiles` validates file **size** (line 185) but never validates file **type** against the `accept` prop. A user can drop any file type and it will be accepted regardless of the `accept` attribute. The `accept` on the hidden `<input>` (line 234) only applies to the file picker dialog, not drag-and-drop.
- **Line 195**: When `multiple` is false, `newFiles.slice(0, 1)` replaces all files. But if the single new file failed validation, `newFiles` could be empty, clearing previously valid files.
- **No max file count**: When `multiple` is true, there's no limit on how many files can be added. Should add a `maxFiles` prop.
- **Line 170**: `this.shadowRoot?.querySelector<HTMLInputElement>('input[type="file"]')?.click()` -- if shadow root or input doesn't exist, click silently fails with no feedback.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Supported | Notes |
|-------|-----------|-------|
| Default | Yes | Drop zone with label |
| Hover | Yes | Border color change (line 51) |
| Active/Pressed | No | No `:active` state on drop zone |
| Focus | Yes | `:focus-visible` on drop zone (line 55) |
| Disabled | No | No disabled state at all |
| Loading/Uploading | No | No upload progress indicator |
| Error | Partial | Error message shown (line 238), but no visual error state on drop zone |
| Drag over | Yes | `.dragover` class (line 51) |
| Empty | Yes | Default state with no files |

**Missing**: active, disabled, loading/uploading states (3 of 8+ missing).

### 2.2 Keyboard Navigation
- **Drop zone** (lines 222-223): Has `tabindex="0"`, `role="button"`, and `@keydown` for Enter/Space -- good.
- **Remove buttons** (line 248): Standard `<button>` with `aria-label` -- good.
- **No focus trap or return**: After file is added, focus stays on the drop zone. Consider moving focus to the new file item or file list.

### 2.3 ARIA & Accessibility
- **Line 218**: `role="button"` with `aria-label` on drop zone -- good.
- **Line 238**: Error message has `role="alert"` -- good for screen reader announcement.
- **Line 240**: File list has `role="list"` with `aria-label="Selected files"` -- good.
- **Line 242**: File items have `role="listitem"` -- good.
- **Line 248**: Remove buttons have `aria-label="Remove ${f.name}"` -- good.
- **Missing**: No `aria-describedby` linking drop zone to accepted file types and size limit hint.
- **Missing**: No live region announcement when files are successfully added.

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggestion |
|------|-------|------------|
| 60 | `font-size: 32px` | Use `var(--cg-font-size-3xl, 32px)` or icon size token |
| 118 | `padding: 4px` | Use `var(--cg-spacing-4, 4px)` |

### 3.2 Raw Colors Found
No raw hex colors outside of token fallbacks -- good.

### 3.3 Spacing Issues
- Transition durations on lines 45, 131 use raw ms values instead of motion tokens.
- Line 45: `transition: border-color 200ms ease, background 200ms ease` -- should use `var(--cg-motion-duration-fast)`.

### 3.4 Modern Design Enhancements
- Add an upload progress bar per file (useful for async upload scenarios).
- Drop zone could show a subtle animation (pulse or bounce) during dragover.
- File type icons could be dynamic based on file extension (different icon for PDF, CSV, image, etc.).
- Consider a preview thumbnail for image files.
- The drop zone icon could animate (scale up) when dragging over.

## 4. Prioritized Fixes

### P0 - Critical
1. **Fix stray CSS brace** (line 135).
2. **Add file type validation for drag-and-drop**: Validate dropped files against the `accept` prop, not just the file picker input.

### P1 - High
3. **Add disabled state** -- prevent drops/clicks, dim the zone, disable remove buttons.
4. **Add upload progress state** -- show progress bar or spinner per file during async upload.
5. **Add `:active` press state** on drop zone.
6. **Add `aria-describedby`** linking drop zone to hint text about accepted types and size.
7. **Add live region announcement** when files are added successfully.
8. **Fix single-file replacement** (line 195): Don't clear previous file if new file fails validation.

### P2 - Medium
9. **Add `maxFiles` property** to limit file count when `multiple` is true.
10. **Replace `font-size: 32px`** (line 60) with design token.
11. **Replace transition durations** with motion tokens.
12. **Add visual error state on drop zone** (red border) when validation fails, not just error text.

### P3 - Low
13. **Add dragover animation** -- subtle pulse or scale on the drop zone.
14. **Add dynamic file type icons** based on extension/MIME type.
15. **Add image preview thumbnails** for image files.
16. **Move focus to new file item** after successful file addition.
