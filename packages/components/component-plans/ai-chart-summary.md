# ai-chart-summary — Improvement Plan

## Current State

### CSS Audit
| Property | Value | Token? | Issue |
|---|---|---|---|
| `.summary` animation | `slideUp 300ms ease` | No | Duration and easing not tokenized; uses local keyframe |
| `.label` letter-spacing | `0.5px` | No | Should use `--cg-letter-spacing-wide` |
| `.type-badge` padding | `1px var(--cg-spacing-8)` | Partial | `1px` is not tokenized |
| `.trend` font-weight | `600` | No | Should use `--cg-font-weight-semibold` |
| `.icon-btn` transition | `all 150ms` | No | Non-specific `all`, duration not tokenized |
| `.trend` transition | `all 150ms` | No | Non-specific `all`, duration not tokenized |
| All colors | Uses tokens | Yes | Good |
| All spacing | Mostly tokenized | Yes | Good |
| Focus-visible | Double ring pattern | Yes | Good |

### States Audit
| State | Implemented? | Notes |
|---|---|---|
| Default | Yes | Full summary with trends |
| Collapsed | Yes | Text and trends hidden |
| Compact | Yes | Reduced padding, text hidden |
| Loading | Yes | Shimmer loading bars |
| Empty (no summary) | Yes | Returns `nothing` |
| Hover (trend chip) | Yes | Background + border |
| Hover (icon-btn) | Yes | Accent color shift |
| Focus-visible | Yes | On icon buttons and trend chips |
| Disabled | No | No disabled state |
| Error | No | No error state |
| Active/pressed | No | Missing :active state |

### Interaction Audit
- Collapse toggle dispatches `ai-summary-toggle` - OK
- Trend chip click dispatches `ai-summary-trend-click` - OK
- Refresh button dispatches `ai-summary-refresh` - OK
- Trend chips have `role="button"` and `tabindex="0"` - OK
- Collapse button has `aria-expanded` - OK
- Summary container has `role="complementary"` - OK
- No keyboard handler on trend chips for Enter/Space

## Style Fixes Needed

1. **Tokenize slideUp animation** — move to shared keyframes or tokenize duration/easing
2. **Tokenize letter-spacing** `0.5px` to `var(--cg-letter-spacing-wide, 0.05em)`
3. **Tokenize type-badge padding** `1px` to `var(--cg-spacing-1, 1px)`
4. **Tokenize font-weight** `600` to `var(--cg-font-weight-semibold)`
5. **Replace `all` in transitions** with specific property lists
6. **Tokenize transition durations** to `var(--cg-motion-duration-fast)`

## Interaction Fixes Needed

1. **Add keyboard handler on trend chips** — Enter/Space should trigger click
2. **Add `:active` press state** on buttons and trend chips
3. **Add error state** — for failed AI analysis
4. **Add disabled state** — for when refresh is in progress
5. **Trend chips should have `aria-label`** describing the trend (label, value, direction)

## Test Spec

### Unit Tests
- [ ] renders summary text, type badge, confidence badge, and time range
- [ ] renders trend chips with correct direction icons (up/down/neutral)
- [ ] renders loading skeleton when `loading=true`
- [ ] returns nothing when summary is empty and not loading
- [ ] collapses/expands when collapsible and toggle clicked
- [ ] compact mode hides text and reduces padding
- [ ] renders type badge for non-summary types (anomaly, forecast, comparison)
- [ ] renders refresh and collapse buttons

### Event Tests
- [ ] dispatches `ai-summary-toggle` on collapse toggle with collapsed state
- [ ] dispatches `ai-summary-trend-click` on trend chip click with label, direction, value
- [ ] dispatches `ai-summary-refresh` on refresh button click

### Accessibility Tests
- [ ] container has `role="complementary"` and `aria-label="AI chart summary"`
- [ ] collapse button has `aria-expanded` reflecting state
- [ ] trend chips have `role="button"`, `tabindex="0"`, and descriptive `aria-label`
- [ ] focus-visible double ring on all interactive elements

### Visual Regression Tests
- [ ] snapshot: full summary with trends
- [ ] snapshot: collapsed state
- [ ] snapshot: loading skeleton
- [ ] snapshot: compact mode
- [ ] snapshot: anomaly type badge
