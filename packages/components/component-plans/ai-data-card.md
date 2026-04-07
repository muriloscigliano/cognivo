# ai-data-card — Improvement Plan

## Current State

### CSS Audit
| Property | Value | Token? | Issue |
|---|---|---|---|
| `.card` background | `rgba(255, 255, 255, 0.03)` | No | Raw rgba |
| `.card` border | `rgba(255, 255, 255, 0.08)` | No | Raw rgba |
| `.card` border-radius | `12px` | No | Should use `--cg-border-radius-200` |
| `.card` transition | `all 150ms` | No | Non-specific `all`, duration not tokenized |
| `.card:hover` border-color | `rgba(255, 255, 255, 0.15)` | No | Raw rgba |
| `.header` border-bottom | `rgba(255, 255, 255, 0.06)` | No | Raw rgba divider |
| `.row` border-bottom | `rgba(255, 255, 255, 0.06)` | No | Raw rgba divider |
| `.row:hover` background | `rgba(255, 255, 255, 0.02)` | No | Raw rgba |
| `.row.clickable:focus-visible` | `rgba(223, 255, 97, 0.25)` | No | Raw rgba focus ring |
| `.footer` border-top | `rgba(255, 255, 255, 0.06)` | No | Raw rgba divider |
| `.action-btn:hover` border-color | `rgba(255, 255, 255, 0.15)` | No | Raw rgba |
| `.action-btn:hover` background | `rgba(255, 255, 255, 0.03)` | No | Raw rgba |
| `.action-btn:focus-visible` | `rgba(223, 255, 97, 0.25)` | No | Raw rgba focus ring |
| Rounded variants | Raw `4px`, `8px`, `12px`, `99999px` | No | Should use tokens |

### States Audit
| State | Implemented? | Notes |
|---|---|---|
| Default | Yes | |
| Hover (card) | Yes | Border shift + translateY |
| Hover (row) | Yes | Subtle background |
| Focus-visible (row) | Yes | Inset box-shadow |
| Highlighted | Yes | Accent border |
| Loading | Yes | Skeleton with shimmer |
| Empty | Yes | "No data to display" message |
| Compact | Yes | Reduced padding/sizes |
| Active/pressed | No | Missing :active state |
| Disabled (action) | Yes | opacity + cursor: not-allowed |
| Error | No | No error state for failed data load |

### Interaction Audit
- Action button dispatches `ai-data-card-action` - OK
- Row click dispatches `ai-data-card-row-click` - OK
- Copy button with clipboard API + fallback - OK
- Copy feedback with timer (2s) and visual state - OK
- Keyboard: Enter/Space on rows - OK
- URL sanitization for link-type values - OK
- disconnectedCallback clears copy timer - OK

## Style Fixes Needed

1. **Replace all raw rgba backgrounds** with overlay tokens (`--cg-overlay-white-faint`, etc.)
2. **Replace all raw rgba borders** with `var(--cg-color-surface-container-border)`
3. **Replace card border-radius** with `var(--cg-border-radius-200, 12px)`
4. **Tokenize transition** from `all 150ms` to specific properties with tokenized duration
5. **Replace raw hover border-color** with `var(--cg-color-surface-border-hover)`
6. **Replace raw focus ring** with shared focus token
7. **Replace raw divider colors** in header/row/footer borders
8. **Tokenize rounded variants** with `var(--cg-border-radius-*)` tokens

## Interaction Fixes Needed

1. **Add `:active` press state** on card and action buttons
2. **Add error state** for failed data loading
3. **Add copy event dispatch** — fire a custom event when copy succeeds for parent tracking
4. **Improve copy fallback** — `document.execCommand('copy')` is deprecated; consider a more robust approach
5. **Add `aria-live` to copy feedback** so screen readers announce "Copied"

## Test Spec

### Unit Tests
- [ ] renders header with title, subtitle, icon, and status badge
- [ ] renders data rows with correct value formatting for each type: text, currency, number, percent, date, status, badge, link
- [ ] percent type shows green for positive, red for negative values
- [ ] status type renders colored dot alongside value
- [ ] link type renders anchor with sanitized URL
- [ ] renders footer action buttons with correct variants (primary, secondary, danger)
- [ ] renders skeleton loading state with correct number of rows
- [ ] renders empty state when no fields and no title
- [ ] compact mode reduces padding and font sizes
- [ ] highlighted state adds accent border

### Event Tests
- [ ] dispatches `ai-data-card-action` on action button click with actionId and actionLabel
- [ ] dispatches `ai-data-card-row-click` on row click with label, value, type
- [ ] disabled action button does not dispatch event
- [ ] copy button copies field value to clipboard and shows "Copied" state

### Accessibility Tests
- [ ] card has `role="region"` and `aria-label` with title
- [ ] rows container has `role="list"`, each row has `role="listitem"`
- [ ] rows have `aria-label` with "label: value" text
- [ ] clickable rows have `tabindex="0"`, non-clickable have `tabindex="-1"`
- [ ] copy button has `aria-label` including field label
- [ ] action buttons have `aria-label` matching label text
- [ ] loading skeleton has `role="status"` and `aria-label="Loading data"`

### Visual Regression Tests
- [ ] snapshot: data card with mixed field types
- [ ] snapshot: compact mode
- [ ] snapshot: highlighted state
- [ ] snapshot: loading skeleton
- [ ] snapshot: empty state
