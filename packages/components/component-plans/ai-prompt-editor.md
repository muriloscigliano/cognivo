# ai-prompt-editor — Improvement Plan

## Current State

### CSS Audit
| Property | Status | Notes |
|---|---|---|
| Colors | PASS | All use `--cg-*` tokens |
| Spacing | PASS | Uses `--cg-spacing-*` tokens |
| Font sizes | WARN | `.main-title { font-size: var(--cg-font-size-sm, 13px) }` — fallback is 13px not 14px, inconsistent |
| Font weights | WARN | `.sidebar-header { font-weight: 700 }` — raw value |
| Border radii | PASS | Uses `--cg-border-radius-*` tokens with rounded variants |
| Motion | WARN | `.version-item { transition: background 150ms }` — raw value |
| Letter-spacing | WARN | `.sidebar-header { letter-spacing: 0.05em }` — raw value |
| Grid | WARN | `.editor { grid-template-columns: 220px 1fr }` — fixed sidebar width |
| Min-height | WARN | `.editor { min-height: 300px }`, `textarea { min-height: 200px }` — magic numbers |
| Sidebar borders | WARN | Sidebar uses `--cg-color-surface-container-background` for borders — should use `--cg-color-surface-container-border` |

### States Audit
| State | Implemented | Notes |
|---|---|---|
| Default | YES | Split-pane with sidebar and content |
| Empty | YES | "No prompt versions yet" |
| Version selected | YES | Highlighted in sidebar with accent border |
| Editing | YES | Textarea replaces display area |
| View mode | YES | Read-only display |
| Active badge | YES | "Active" green badge on active version |
| Hover | YES | Version item hover background |
| Focus | YES | Focus-visible outline on version items |
| Active/Pressed | NO | No `:active` state |
| Disabled | NO | No disabled state |
| Loading | NO | No loading state |

### Interaction Audit
| Interaction | Status | Notes |
|---|---|---|
| Version select | YES | Click selects, exits edit mode |
| Edit start | YES | Edit button shown when editable and not editing |
| Save | YES | Fires `ai-prompt-save` with versionId + content |
| Activate | YES | Fires `ai-prompt-activate` with versionId |
| Cancel edit | YES | Returns to view mode |
| Keyboard | PARTIAL | Enter on version item, but no Space handler |
| ARIA listbox | YES | `role="listbox"` with `role="option"` and `aria-selected` |
| Region | YES | `role="region" aria-label="Prompt editor"` |

## Style Fixes Needed
1. Replace `.sidebar-header { font-weight: 700 }` with `var(--cg-font-weight-bold, 700)`
2. Replace `.version-item { transition: background 150ms }` with token-based motion
3. Replace `letter-spacing: 0.05em` with `var(--cg-letter-spacing-wide, 0.05em)`
4. Replace `grid-template-columns: 220px` with CSS custom property or token
5. Replace `min-height: 300px` and `min-height: 200px` with tokens or custom properties
6. Fix `.main-title` fallback from `13px` to `14px` for consistency
7. Fix sidebar border token from `container-background` to `container-border`
8. Add `:active` press state on action buttons
9. Add responsive breakpoint — sidebar should collapse on small screens

## Interaction Fixes Needed
1. Add Space key handler on version items
2. Add loading state for save/activate operations
3. Add unsaved changes warning when switching versions during edit
4. Textarea should auto-focus when entering edit mode
5. Add character count or line count in editor
6. Add diff view between versions
7. Action buttons need `font-family: inherit` (already has `font: inherit` — good)
8. Auto-select active version on init (already implemented in `updated` — good)

## Test Spec
| # | Test Case | Type |
|---|---|---|
| 1 | Renders empty state when `versions=[]` | Unit |
| 2 | Renders sidebar with version list | Unit |
| 3 | Active version auto-selected on init | Unit |
| 4 | Click version selects it | Interaction |
| 5 | Selected version highlights in sidebar | Unit |
| 6 | Active badge shown on active version | Unit |
| 7 | Content area shows selected version content | Unit |
| 8 | Edit button shown when editable | Unit |
| 9 | Edit button hidden when not editable | Unit |
| 10 | Edit mode shows textarea | Interaction |
| 11 | Cancel exits edit mode | Interaction |
| 12 | Save fires `ai-prompt-save` with content | Event |
| 13 | Activate fires `ai-prompt-activate` | Event |
| 14 | Activate button hidden for active version | Unit |
| 15 | Version timestamp formatted correctly | Unit |
| 16 | Author shown when present | Unit |
| 17 | Listbox ARIA roles correct | A11y |
| 18 | aria-selected on version items | A11y |
| 19 | Focus-visible on version items and buttons | A11y |
| 20 | Rounded variants apply | Unit |
| 21 | Snapshot: split pane with versions | Visual |
