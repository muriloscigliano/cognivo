# ai-capture-flow Improvement Plan

**Component**: `ai-capture-flow`
**Category**: AI-Native
**File**: `src/components/ai-capture-flow/ai-capture-flow.ts`
**Priority**: P1-High

---

## Executive Summary
**Overall Health**: Good
**Top 3 Issues**:
1. CSS syntax error: extra closing brace on line 210 (`}`) after `.btn-secondary:hover` block -- this may cause parsing issues in some browsers
2. Raw rgba colors for step dot active box-shadow, drag-over zone, and button filters
3. No keyboard navigation between step dots; no way to navigate back to previous steps via keyboard

---

## 1. Functional Issues

- **Line 210**: Extra closing brace `}` after `.btn-secondary:hover` block creates a CSS syntax error. The block at line 209 closes `.btn-secondary:hover`, then line 210 has an orphan `}` before the closing template literal backtick on line 211. This may cause subsequent styles to be ignored in strict parsers.
- **Line 217**: `override title` property shadows `HTMLElement.title` (same issue as ai-workflow-builder). Consider renaming to `heading` or `captureTitle`.
- **Line 39**: Card border-radius uses `--cg-border-radius-200, 12px` but `12px` is typically `--cg-border-radius-150`. Check token mapping.
- **Lines 232-237**: `_onDrop` only handles the first file (`files[0]`). No multi-file support, which may be expected for batch capture.
- **Line 248**: `_triggerFileInput` uses `querySelector('#file-input')` -- fragile if multiple instances exist. Since it's within shadow DOM, this is safe, but `@query` decorator would be cleaner.
- No validation of file type against `accept` prop before dispatching event -- the file input enforces this natively for click but drag-and-drop bypasses it.

## 2. Interaction Issues

### 2.1 State Coverage
| State | Implemented | Token-Based | Notes |
|-------|-------------|-------------|-------|
| Upload (default) | Yes | Yes | Dashed border zone with tokens |
| Upload Hover | Yes | Yes | Accent border + background overlay |
| Upload Drag-over | Yes | Yes | Same as hover (line 101) |
| Upload Focus-visible | Yes | Yes | Accent outline |
| Preview | Yes | Yes | Image with border |
| Processing | Yes | Yes | Progress bar with accent fill |
| Complete | Yes | Yes | Green result icon |
| Error | Yes | Yes | Red icon and text |
| Button Primary | Yes | Yes | Accent background |
| Button Primary Hover | Yes | Partial | Uses `filter: brightness(0.9)` on line 203 -- not token-based |
| Button Secondary | Yes | Yes | Gray background with border |
| Button Secondary Hover | Yes | Yes | Darker gray background |
| Button Focus-visible | Yes | Yes | Accent outline |
| Button Disabled | No | N/A | No disabled button state |
| Button Pressed | No | N/A | No `:active` press feedback |

### 2.2 Keyboard Navigation
- Upload zone has `tabindex="0"` and Enter/Space handler (line 281) -- good
- Buttons are natively focusable -- good
- **Missing**: No keyboard way to navigate between wizard steps (back/forward)
- **Missing**: No Escape key to cancel processing or go back
- **Missing**: Step dots are not interactive -- user cannot click to go back to a previous step
- **Missing**: No `autofocus` on primary action button when step changes

### 2.3 ARIA & Accessibility
- Card has `role="region"` with `aria-label` (line 346) -- good
- Upload zone has `role="button"` and `aria-label="Upload file"` (lines 278-279) -- good
- Progress bar has `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` (line 312) -- excellent
- Steps nav has `role="navigation"` and `aria-label="Capture progress"` (line 259) -- good
- Step dots have `aria-label="${label}: ${status}"` (line 264) -- good
- **Missing**: No `aria-live="polite"` region to announce step transitions
- **Missing**: Result text is not in a live region -- screen readers won't announce completion
- **Missing**: Error state has no `role="alert"` to announce the error

## 3. Styling Issues

### 3.1 Magic Numbers Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 60-61 | `width: 24px; height: 24px` (step dot) | `var(--cg-size-step-dot, 24px)` |
| 78 | `box-shadow: 0 0 0 3px` (active dot) | `var(--cg-ring-width-sm, 3px)` |
| 109 | `font-size: 32px` (upload icon) | `var(--cg-font-size-4xl, 32px)` |
| 126 | `max-height: 240px` (preview img) | `var(--cg-capture-preview-max-height, 240px)` |
| 146 | `height: 6px` (progress bar) | `var(--cg-size-progress-bar-height, 6px)` |
| 147 | `border-radius: 3px` (progress bar) | `var(--cg-border-radius-025, 3px)` |
| 151 | `border-radius: 3px` (progress fill) | Same |
| 203 | `filter: brightness(0.9)` | `var(--cg-interaction-hover-brightness, 0.9)` or use background token |

### 3.2 Raw Colors Found
| Line | Value | Suggested Token |
|------|-------|-----------------|
| 78 | `rgba(223, 255, 97, 0.25)` (active dot shadow) | `var(--cg-overlay-accent-strong)` |
| 103 | `rgba(223, 255, 97, 0.04)` (drag-over bg) | `var(--cg-overlay-accent-ultra-subtle)` |

### 3.3 Spacing Issues
- Most spacing uses `var(--cg-spacing-*)` tokens -- clean
- No raw spacing magic numbers beyond the sizes listed above

### 3.4 Modern Design Enhancements
- Add step transition animations (slide left/right between steps)
- Add file type icon in upload zone based on `accept` prop
- Add file size limit display and validation
- Add multi-file upload support with file list
- Add `:active` press scale on buttons
- Add loading spinner overlay during processing (in addition to progress bar)
- Replace `filter: brightness()` hover with a proper token-based background color change

## 4. Prioritized Fixes

### P0 - Critical
1. Fix CSS syntax error -- remove extra `}` on line 210
2. Add `role="alert"` on error state content for screen reader announcement
3. Add `aria-live="polite"` region to announce step transitions and completion

### P1 - High
4. Replace all 8 magic number values with design tokens
5. Replace 2 raw rgba colors with overlay tokens
6. Validate dropped file types against `accept` prop (drag-and-drop bypasses input validation)
7. Rename `title` property to avoid shadowing `HTMLElement.title`
8. Add `:active` press feedback on buttons

### P2 - Medium
9. Replace `filter: brightness(0.9)` hover with a proper background token
10. Add disabled button state
11. Add keyboard shortcut to go back to previous step (Escape or Backspace)
12. Add `autofocus` to primary action when step transitions
13. Make step dots clickable for backward navigation

### P3 - Low
14. Add step transition slide animations
15. Add file size limit validation
16. Add multi-file upload support
17. Add loading spinner overlay for processing step
18. Fix `--cg-border-radius-200` vs `--cg-border-radius-150` token mismatch on line 39
