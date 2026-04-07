# ai-memory-panel — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Good coverage overall, but some raw values remain.
- **Magic numbers**: `.header-title` uses `font-size: 12px` and `font-weight: 700` — should be tokens. `.tab` uses `font-size: 12px`, `font-weight: 600`, and `transition: all 150ms` — raw values. `.mem-btn` uses `width: 22px; height: 22px` — should use `var(--cg-spacing-22, 22px)`.
- **Memory types**: Four type badges (fact/preference/instruction/context) with semantic colors.
- **Tabs**: Two-tab interface (short-term/long-term) with accent underline.

### States Audit

| State | Supported | Notes |
|---|---|---|
| Default | Yes | Tabbed memory list |
| Hover | Yes | Memory row background change, button color change |
| Focus-visible | Yes | Box-shadow focus ring |
| Pinned | Yes | Subtle accent background on pinned memories |
| Active tab | Yes | Accent color text + border-bottom |
| Search | Yes | Filter input with debounced event |
| Empty | Yes | "No memories stored" / "No matching memories" |
| Loading | **No** | No loading state |
| Error | **No** | No error state |
| Disabled | **No** | No disabled state |

### Interaction Audit
- **Tab switch**: Toggles between short-term and long-term memories.
- **Pin**: Fires `ai-memory-pin` with id and new pinned state.
- **Delete**: Fires `ai-memory-delete` with id and type (short/long).
- **Search**: Debounced at 250ms, fires `ai-memory-search` with query.
- **ARIA**: `role="region"`, focus-visible on elements.

## Style Fixes Needed

1. **Raw font-size values** — `.header-title`, `.tab` use raw `12px` and `700`/`600`. Replace with `var(--cg-font-size-xs, 12px)`, `var(--cg-font-weight-bold, 700)`, `var(--cg-font-weight-semibold, 600)`.
2. **Raw transition value** — `.tab` uses `transition: all 150ms`. Replace with `var(--cg-motion-duration-fast, 150ms)`.
3. **Button dimensions** — `.mem-btn` uses raw `22px`. Replace with `var(--cg-spacing-22, 22px)`.
4. **Max-height magic number** — `.memories` uses `max-height: 350px` — should use a token or custom property.
5. **Tab hover color** — Uses `--cg-color-surface-secondary-border` for text hover color — semantically wrong (border token for text). Should use `--cg-color-surface-secondary-text` or `--cg-color-surface-base-text`.
6. **Search input placeholder** — Uses `--cg-color-surface-border-hover` for placeholder — semantically wrong.
7. **Rounded variants** — Missing `:host([rounded])` support.

## Interaction Fixes Needed

1. **Tab keyboard navigation** — Tabs should support Left/Right arrow key navigation per ARIA tabs pattern.
2. **Tab ARIA roles** — Tabs lack `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`.
3. **Pin/delete keyboard** — Buttons are focusable but lack explicit keyboard handlers (click works via native button, which is fine).
4. **Bulk delete** — No "Clear all" action for the current tab.
5. **Memory editing** — No inline edit capability for memory content.
6. **Pinned sort priority** — Pinned memories are not sorted to top. Consider sorting pinned first.
7. **Search clear button** — No clear button to reset search.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders short-term memories by default | Unit |
| 2 | Tab click switches to long-term memories | Interaction |
| 3 | Tab counts reflect array lengths | Unit |
| 4 | Memory type badges show correct class | Unit |
| 5 | Pin button fires `ai-memory-pin` with correct detail | Unit |
| 6 | Delete button fires `ai-memory-delete` with correct detail | Unit |
| 7 | Pinned memory has `.pinned` class | Unit |
| 8 | Search filters memories by content | Unit |
| 9 | Search fires debounced `ai-memory-search` event | Interaction |
| 10 | Empty state shown when no memories | Unit |
| 11 | Empty state shown when search has no results | Unit |
| 12 | Relative time formatting works (just now, Xm ago, Xh ago, date) | Unit |
| 13 | Relevance shown when available | Unit |
| 14 | Searchable prop hides search input when false | Unit |
| 15 | Focus-visible ring on interactive elements | A11y |
| 16 | Pin button icon changes for pinned state | Visual |
