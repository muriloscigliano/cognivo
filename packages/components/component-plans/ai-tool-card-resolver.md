# ai-tool-card-resolver — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: All values use `--cg-*` tokens. PASS.
- **Magic numbers**: `.fallback-json` uses `max-height: 200px` — should use token or custom property.
- **Reduced motion**: Missing explicit `@media (prefers-reduced-motion)` block (shimmer animation runs regardless).
- **Issues**:
  - Skeleton shimmer animation is well implemented with gradient.
  - Card uses `--cg-color-surface-cards-*` tokens — specific to card surfaces. PASS.

### States Audit

| State | .card | .skeleton | .fallback | .error |
|---|---|---|---|---|
| Default | PASS | N/A | N/A | N/A |
| Loading | N/A | PASS (shimmer) | N/A | N/A |
| Resolved | N/A | N/A | N/A | N/A |
| Fallback | N/A | N/A | PASS (JSON display) | N/A |
| Error | N/A | N/A | N/A | PASS (red icon+text) |
| Focus-visible | PASS (box-shadow) | N/A | N/A | N/A |
| Hover | MISSING | N/A | N/A | N/A |

### Interaction Audit
- Resolves component from registry and passes `toolData`. PASS.
- Caches resolved element by key. PASS.
- Proxies `ai-tool-card-action` events. PASS.
- Error boundary catches creation failures. PASS.
- AbortController for cleanup. PASS.
- Fallback shows raw JSON. PASS.
- Card has `role="region"` and `tabindex="0"`. PASS.
- **Issue**: No hover state on card container.
- **Issue**: Resolved component is created via `document.createElement` — won't work if custom element isn't registered yet (no lazy loading).
- **Issue**: No retry mechanism after error.
- **Issue**: `max-height: 200px` on fallback JSON may truncate important data with no indication.
- **Issue**: `@media (prefers-reduced-motion)` should disable shimmer animation.

## Style Fixes Needed

1. Replace `max-height: 200px` with token or configurable custom property.
2. Add `@media (prefers-reduced-motion)` to stop shimmer animation.
3. Add hover state on card container.
4. Add "truncated" indicator when JSON overflows.
5. Add transition for state changes (loading -> resolved).

## Interaction Fixes Needed

1. Add retry button in error state.
2. Add lazy loading support (waitForCustomElement or customElements.whenDefined).
3. Add truncation indicator on JSON overflow.
4. Add copy JSON button on fallback view.
5. Consider adding a timeout for resolution.
6. Add `aria-busy="true"` during loading state.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Shows loading skeleton when `loading=true` | render |
| 2 | Shows fallback JSON when toolName has no registry match | render |
| 3 | Shows fallback when toolName is empty | render |
| 4 | Shows error state when component creation fails | render |
| 5 | Resolves and renders registered component | interaction |
| 6 | Passes `toolData` to resolved component as `data` and `toolData` | interaction |
| 7 | Caches resolved element — same element reused on re-render | interaction |
| 8 | Proxies `ai-tool-card-action` from resolved component | interaction |
| 9 | Fires `ai-tool-card-error` when resolution fails | interaction |
| 10 | AbortController cleans up event listeners on disconnect | lifecycle |
| 11 | Card has correct `aria-label` with tool name | a11y |
| 12 | Skeleton has `role="status"` and `aria-label` | a11y |
| 13 | Focus-visible ring on card | a11y |
| 14 | Fallback JSON displays formatted tool data | render |
