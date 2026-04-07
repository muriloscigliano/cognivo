# ai-rag-panel — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Excellent coverage — spacing, colors, typography, border-radius, motion all tokenized.
- **Magic numbers**: `max-height: 400px` on `.documents` — should use a token or CSS custom property.
- **Document types**: Four type badges (doc/web/database/api) with semantic color coding.
- **Relevance visualization**: Score badge + thin bar with color-coded fill.
- **Rounded variants**: Supported on `.panel`.

### States Audit

| State | Supported | Notes |
|---|---|---|
| Default | Yes | Document list with relevance scores |
| Hover | Yes | Document row subtle background change |
| Focus-visible | Yes | Box-shadow focus ring |
| Expanded | Yes | Click toggles excerpt line-clamp removal |
| Filtered by type | Yes | Control buttons filter by document type |
| Empty | Yes | "No documents retrieved" message |
| Loading | **No** | No loading/skeleton state for retrieval |
| Error | **No** | No error state for failed retrieval |
| Sorted | Partial | `sortBy` prop exists but only `relevance` sort is implemented |

### Interaction Audit
- **Document click**: Toggles expanded state, fires `ai-rag-document-click`.
- **Type filter**: Buttons toggle filter by document type.
- **Keyboard**: `tabindex="0"` on documents, Enter triggers click.
- **ARIA**: `role="region"`, `role="article"` on documents.

## Style Fixes Needed

1. **Documents max-height** — `400px` is a magic number. Should be `var(--cg-spacing-400, 400px)` or a CSS custom property.
2. **Header icon dimensions** — `width: 20px; height: 20px` — should use `var(--cg-spacing-20, 20px)`.
3. **Doc excerpt `-webkit-line-clamp`** — Webkit-prefixed; may not work in all browsers. Consider a JS-based truncation fallback.
4. **Control button active state** — No `:active` press feedback.
5. **Query highlight class** — `.query-highlight` is defined but never used in the render template. Implement query term highlighting.

## Interaction Fixes Needed

1. **Query highlighting** — The CSS class `.query-highlight` exists but the render method doesn't highlight query terms in excerpts. Implement text highlighting.
2. **Sort by recency/source** — `sortBy` prop accepts 'recency' and 'source' but only 'relevance' sort is implemented. Add sorting for other options.
3. **Sort controls** — No UI for changing sort order. Consider adding sort dropdown or buttons.
4. **Loading skeleton** — Add loading state for when documents are being retrieved.
5. **Pagination** — For large result sets, add pagination or "Load more" button.
6. **URL linking** — Documents have optional `url` field but it's never rendered as a link.
7. **Space key on document** — Only Enter triggers click; Space should also work.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders document items from `.documents` array | Unit |
| 2 | Document type badges show correct class and label | Unit |
| 3 | Relevance score shown as percentage | Unit |
| 4 | Relevance badge class matches score tier (high/medium/low) | Unit |
| 5 | Relevance bar width matches score | Visual |
| 6 | Relevance bar color matches score tier | Visual |
| 7 | Click toggles document expanded state | Interaction |
| 8 | Expanded document removes line-clamp | Visual |
| 9 | Document click fires `ai-rag-document-click` with index and document | Unit |
| 10 | Type filter buttons filter documents | Unit |
| 11 | "All" filter resets to show all documents | Unit |
| 12 | Type filters hidden when only one type exists | Unit |
| 13 | Documents sorted by relevance by default | Unit |
| 14 | Empty state shown when documents is empty | Unit |
| 15 | Header shows correct document count | Unit |
| 16 | Focus-visible ring on documents | A11y |
| 17 | Enter key triggers document click | Interaction |
| 18 | Rounded variants change panel border-radius | Visual |
