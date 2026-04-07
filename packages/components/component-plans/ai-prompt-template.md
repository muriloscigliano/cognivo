# ai-prompt-template — Improvement Plan

## Current State

### CSS Audit
| Property | Status | Notes |
|---|---|---|
| Colors | PASS | All use `--cg-*` tokens |
| Spacing | PASS | Uses `--cg-spacing-*` tokens |
| Font sizes | PASS | Uses `--cg-font-size-*` tokens |
| Font weights | WARN | `.mode-btn.active { font-weight: 600 }` — raw value |
| Border radii | PASS | Uses `--cg-border-radius-*` tokens with rounded variants |
| Motion | WARN | `.mode-btn { transition: all 150ms ease }` — raw values |
| Min-width | WARN | `.var-name { min-width: 100px }` — fixed pixel value |

### States Audit
| State | Implemented | Notes |
|---|---|---|
| Edit mode | YES | Textarea for template editing |
| Preview mode | YES | Highlighted template with variable interpolation |
| Variables panel | YES | Input fields for each detected variable |
| Empty template | YES | "No template defined" message in preview |
| Editable | YES | Controls whether editing is allowed |
| Not editable | YES | Textarea hidden, variables disabled |
| Hover | YES | Mode button hover |
| Focus | YES | Focus-visible on mode buttons, textarea, variable inputs |
| Active/Pressed | NO | No `:active` state |
| Disabled | PARTIAL | Variable inputs disabled when `!editable` |
| Loading | NO | No loading state |

### Interaction Audit
| Interaction | Status | Notes |
|---|---|---|
| Template change | YES | Fires `ai-template-change` on textarea input |
| Variable change | YES | Fires `ai-template-variable-change` per variable |
| Mode toggle | YES | Edit/Preview toggle with radiogroup |
| Variable detection | YES | Auto-detects `{{variable}}` patterns |
| Variable highlighting | YES | Highlights variables in template display |
| Preview interpolation | YES | Replaces variables with values in preview |
| ARIA radiogroup | YES | Mode buttons have `role="radio"` and `aria-checked` |
| Region | YES | `role="region" aria-label="Prompt template editor"` |

## Style Fixes Needed
1. Replace `.mode-btn.active { font-weight: 600 }` with `var(--cg-font-weight-semibold, 600)`
2. Replace `.mode-btn { transition: all 150ms ease }` with token-based motion
3. Replace `.var-name { min-width: 100px }` with token-based value
4. Add `:active` press state on mode buttons
5. Template textarea has no `border: none` or `outline: none` — may show browser defaults
6. `.template-textarea` focus-visible uses outline — consistent, good

## Interaction Fixes Needed
1. Add loading state for AI-generated templates
2. Template change event fires on every keystroke — consider debouncing
3. Variable inputs should validate (e.g., required marker for variables used in template)
4. Add copy-to-clipboard button for the filled template
5. Mode toggle should have keyboard arrow key navigation (radiogroup pattern)
6. Tab order in radiogroup should follow WAI-ARIA radiogroup pattern (one tab stop, arrows to switch)
7. Consider adding "Test" button to preview the filled prompt

## Test Spec
| # | Test Case | Type |
|---|---|---|
| 1 | Renders in edit mode by default | Unit |
| 2 | Edit mode shows textarea | Unit |
| 3 | Preview mode shows highlighted template | Unit |
| 4 | Variables detected from `{{var}}` pattern | Unit |
| 5 | Variable inputs shown for detected variables | Unit |
| 6 | Variable highlight styling applied | Unit |
| 7 | Preview mode interpolates variable values | Unit |
| 8 | Template change fires `ai-template-change` | Event |
| 9 | Variable change fires `ai-template-variable-change` | Event |
| 10 | Mode toggle switches between edit/preview | Interaction |
| 11 | Editable=false hides textarea | Unit |
| 12 | Editable=false disables variable inputs | Unit |
| 13 | Empty template shows placeholder in preview | Unit |
| 14 | Duplicate variables show single input | Unit |
| 15 | Radio buttons have correct aria-checked | A11y |
| 16 | Region has proper aria-label | A11y |
| 17 | Variable inputs have aria-label | A11y |
| 18 | Focus-visible on all interactive elements | A11y |
| 19 | Rounded variants apply | Unit |
| 20 | Snapshot: edit mode with variables | Visual |
| 21 | Snapshot: preview mode with values | Visual |
