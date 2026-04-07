# ai-result-panel — Improvement Plan

## Current State

### CSS Audit
| Property | Value | Token? | Issue |
|---|---|---|---|
| `.title` font-weight | `600` | No | Should use `var(--cg-font-weight-semibold)` |
| `.tab` font-weight | `600` | No | Should use `var(--cg-font-weight-semibold)` |
| `.sort-btn` font | Inherits | Partial | No explicit weight token |
| `.collapse-icon` transition | `transform 200ms` | No | Duration not tokenized |
| All spacing | Uses tokens | Yes | Good |
| All colors | Uses tokens | Yes | Good |
| All border-radius | Uses tokens | Yes | Good |
| `.header-btn` font-weight | `600` | No | Should use token |

### States Audit
| State | Implemented? | Notes |
|---|---|---|
| Default | Yes | Summary tab with explanation, bullets, drivers |
| Collapsed | Yes | Body hidden, chevron rotated |
| Streaming | Yes | Shows `<ai-thinking>` component |
| Tab: Summary | Yes | Explanation + bullets + drivers |
| Tab: Data | Yes | Table of raw data |
| Tab: Sources | Yes | Source list with links |
| Empty (no explanation) | Yes | "No results yet" message |
| Driver sort toggle | Yes | Ascending/descending |
| Hover (driver) | Yes | Subtle background |
| Hover (header-btn) | Yes | Color + border shift |
| Focus-visible | Yes | Double ring outline |
| Loading | No | No skeleton state (uses streaming instead) |
| Error | No | No error state |
| Disabled | No | No disabled state |

### Interaction Audit
- Collapse toggle via header click - OK
- Tab switching - OK
- Driver sort toggle - OK
- Copy button triggers clipboard API + dispatches `ai-result-copy` - OK
- Export button dispatches `ai-result-export` - OK
- Header actions stopPropagation to avoid collapse toggle - OK
- Tabs have focus-visible - OK
- Tabs use `role` — missing, should have `role="tab"` with `aria-selected`

## Style Fixes Needed

1. **Tokenize font-weight `600`** values to use `var(--cg-font-weight-semibold, 600)`
2. **Tokenize collapse-icon transition** duration to `var(--cg-motion-duration-fast)`
3. **Add `:active` press state** on tabs and header buttons

## Interaction Fixes Needed

1. **Add proper ARIA tab pattern** — tabs should use `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`
2. **Add keyboard navigation for tabs** — Arrow keys to switch tabs per WAI-ARIA tabs pattern
3. **Add error state** for failed analysis
4. **Add loading skeleton** alternative to streaming indicator
5. **Copy button should provide visual feedback** — show "Copied!" text briefly
6. **Collapsible header needs `aria-expanded`** on the header element
7. **Driver bars should have `role="meter"` or `role="progressbar"`** with aria-valuenow

## Test Spec

### Unit Tests
- [ ] renders title, explanation, bullets, and drivers
- [ ] renders confidence badge when confidence > 0
- [ ] renders tabs when data or sources present
- [ ] defaults to summary tab
- [ ] switches tabs on click
- [ ] renders driver bars with correct width percentage
- [ ] sorts drivers ascending/descending on sort button click
- [ ] positive drivers show green, negative show red
- [ ] renders source list with links and excerpts
- [ ] renders data table from data prop
- [ ] collapses body when collapsible and header clicked
- [ ] shows streaming indicator when `streaming=true`
- [ ] shows empty state when no explanation and not streaming

### Event Tests
- [ ] dispatches `ai-result-copy` on copy button click with content text
- [ ] dispatches `ai-result-export` on export button click with format
- [ ] header actions do not trigger collapse toggle

### Accessibility Tests
- [ ] panel has `role="region"` and `aria-label` with title
- [ ] tabs have proper ARIA tab roles and `aria-selected`
- [ ] collapsible header communicates expanded/collapsed state
- [ ] bullets list has `role="list"` with list items
- [ ] focus-visible double ring visible on interactive elements

### Visual Regression Tests
- [ ] snapshot: full panel with summary, bullets, drivers
- [ ] snapshot: collapsed state
- [ ] snapshot: streaming indicator
- [ ] snapshot: data tab
- [ ] snapshot: sources tab
- [ ] snapshot: empty state
