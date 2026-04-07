# ai-file-upload — Improvement Plan

## Current State

### CSS Audit
| Property | Status | Notes |
|---|---|---|
| Colors | PASS | All use `--cg-*` tokens |
| Spacing | PASS | Uses `--cg-spacing-*` tokens |
| Font sizes | PASS | Uses `--cg-font-size-*` tokens |
| Font weights | PASS | Uses `--cg-font-weight-*` tokens |
| Border radii | PASS | Uses `--cg-border-radius-*` tokens |
| Motion | PASS | Uses `--cg-motion-*` tokens for transitions |
| Press scale | PASS | Uses `--cg-interaction-press-scale` on dropzone |
| Focus | PASS | Focus-visible on dropzone and remove buttons |
| Disabled | PASS | `:host([disabled]) .dropzone` with reduced opacity |

### States Audit
| State | Implemented | Notes |
|---|---|---|
| Default | YES | Dropzone with icon, label, hint |
| Drag over | YES | `.dragover` class with accent border and background |
| Hover | YES | Same styling as dragover |
| Focus | YES | Focus-visible outline |
| Active/Pressed | YES | Press scale |
| Disabled | YES | Opacity reduction, no pointer events |
| Files selected | YES | File list with name, meta, remove button |
| Error | YES | Error message with `role="alert"` |
| Progress | YES | Progress bar when `progress >= 0` |
| Loading | NO | No overall loading/processing state |

### Interaction Audit
| Interaction | Status | Notes |
|---|---|---|
| Drag and drop | YES | dragover/dragleave/drop handlers |
| Click to browse | YES | Triggers hidden file input |
| File input change | YES | Processes selected files |
| Size validation | YES | Checks against `maxSize` |
| Remove file | YES | Removes from list, re-fires event |
| Progress bar | YES | `role="progressbar"` with ARIA attributes |
| Keyboard | YES | Enter/Space on dropzone |
| Multiple files | YES | Controlled by `multiple` prop |
| Accept filter | YES | Passed to file input |
| File error event | YES | Fires `ai-file-error` on validation failure |
| File select event | YES | Fires `ai-file-select` with file list |

## Style Fixes Needed
1. Add `rounded` attribute variant support for dropzone border-radius
2. `.remove-btn` font-size uses `--cg-font-size-base` (16px) which is large for a close icon — consider smaller
3. Add `transition` to `.remove-btn` color change for smoother hover effect
4. Progress bar `height: 4px` could use `var(--cg-spacing-4, 4px)` for consistency
5. File item border uses `--cg-color-surface-container-border, #3f3f46` — should verify this is the intended hover-level token

## Interaction Fixes Needed
1. Accept filter validation is only on the input element — drag-and-drop doesn't validate file type. Should add type check in `_processFiles`
2. Add loading overlay state for when upload is in progress
3. File list should have animation when items are added/removed
4. Remove button should have confirmation or undo for accidental removal
5. Add `aria-describedby` on dropzone pointing to hint text for screen readers
6. Progress bar should include text label ("Uploading... 45%")
7. Consider adding file type icons based on MIME type

## Test Spec
| # | Test Case | Type |
|---|---|---|
| 1 | Renders dropzone with label and hint | Unit |
| 2 | Shows accepted types in hint when `accept` set | Unit |
| 3 | Shows max size in hint | Unit |
| 4 | Click triggers file input click | Interaction |
| 5 | Keyboard Enter triggers file input | Keyboard |
| 6 | Keyboard Space triggers file input | Keyboard |
| 7 | Dragover adds dragover class | Interaction |
| 8 | Dragleave removes dragover class | Interaction |
| 9 | File drop processes files | Interaction |
| 10 | File exceeding maxSize shows error | Validation |
| 11 | File exceeding maxSize fires `ai-file-error` | Event |
| 12 | Valid file fires `ai-file-select` | Event |
| 13 | Multiple=false limits to 1 file | Unit |
| 14 | Multiple=true allows multiple files | Unit |
| 15 | File list displays name, type, size | Unit |
| 16 | Remove button removes file from list | Interaction |
| 17 | Remove fires updated `ai-file-select` | Event |
| 18 | Disabled state prevents interaction | Unit |
| 19 | Progress bar shown when progress >= 0 | Unit |
| 20 | Progress bar has correct ARIA attributes | A11y |
| 21 | Error message has role="alert" | A11y |
| 22 | Focus-visible on dropzone | A11y |
| 23 | Snapshot: default empty dropzone | Visual |
| 24 | Snapshot: with files and progress | Visual |
