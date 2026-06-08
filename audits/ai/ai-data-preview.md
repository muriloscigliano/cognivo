## ai-data-preview — Manual Review

A structured-data preview card (JSON syntax highlighting, CSV/table formatting) with confirm/cancel actions. Dark-first, animated entrance, scrollable preview area. Overall well-tokenized, with two real defects (one a hard functional bug) and one made-up token.

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 28 | `:host` background | `--cg-color-surface-base-background` | Yes | None |
| 29 | `:host` color | `--cg-color-surface-base-text` | Yes | None |
| 30 | `:host` border | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | None |
| 31 | `:host` border-radius | `--cg-border-radius-150` | Yes | None |
| 32 | `:host` padding | `--cg-spacing-16` | Yes | None |
| 33 | animation | `--cg-transition-duration-fast` / `--cg-transition-easing-ease-out` | Yes | None (motion tokens, explicit) |
| 41 | header padding-bottom | `--cg-spacing-12` | Yes | None |
| 42 | header border-bottom | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | None |
| 43 | header margin-bottom | `--cg-spacing-12` | Yes | None |
| 47 | title font-size | `--cg-font-size-sm` | Yes | None (14px, at min for body) |
| 48 | title font-weight | `--cg-font-weight-semibold` | Yes | None |
| 49 | title margin | `0` | Yes | None |
| 54 | meta gap | `--cg-spacing-12` | Yes | None |
| 55 | meta font-size | `--cg-font-size-xs` | Yes | Metadata label, acceptable below body min |
| 56 | meta color | `--cg-color-input-text-placeholder` | Yes | None (muted meta) |
| 60 | format-badge padding | `--cg-spacing-2` / `--cg-spacing-8` | Yes | None |
| 61 | format-badge background | `--cg-overlay-accent-subtle` | Yes | Real tier-1 overlay token |
| 62 | format-badge border-radius | `--cg-border-radius-50` | Yes | None |
| 63 | format-badge font-size | `--cg-font-size-xs` | Yes | Badge label, acceptable |
| 64 | format-badge color | `--cg-color-surface-base-text` | Yes | None |
| 66 | format-badge font-weight | `--cg-font-weight-semibold` | Yes | None |
| 70 | preview-area max-height | `var(300px)` | **NO** | **Broken: `var()` wrapping a raw px — does not resolve. Use `--cg-component-table-virtual-max-height`** |
| 72 | preview-area background | `--cg-color-surface-overlay` | **NO** | **Made-up token (does not exist; only `-overlay-scrim-dark/light`). Use `--cg-color-surface-cards-background`** |
| 73 | preview-area border-radius | `--cg-border-radius-100` | Yes | None |
| 74 | preview-area padding | `--cg-spacing-12` | Yes | None |
| 75 | preview-area margin-bottom | `--cg-spacing-12` | Yes | None |
| 80 | pre font-family | `--cg-font-family-mono` | Yes | None |
| 81 | pre font-size | `--cg-font-size-xs` | Yes | Code/data block, mono acceptable |
| 82 | pre line-height | `--cg-line-height-relaxed` | Yes | None |
| 87 | json-key color | `--cg-color-code-keyword` | Yes | None |
| 88 | json-string color | `--cg-color-code-string` | Yes | None |
| 89 | json-number color | `--cg-color-code-number` | Yes | None |
| 90 | json-bool color | `--cg-color-status-success-text-default` | Yes | Acceptable (boolean semantic, not an AI-lifecycle state) |
| 91 | json-null color | `--cg-color-input-text-placeholder` | Yes | Muted, acceptable |
| 96 | table font-size | `--cg-font-size-xs` | Yes | Tabular data, acceptable |
| 101 | th padding | `--cg-spacing-6` / `--cg-spacing-8` | Yes | None |
| 102 | th border-bottom | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | None |
| 103 | th color | `--cg-color-input-text-placeholder` | Yes | None (column header muted) |
| 104 | th font-weight | `--cg-font-weight-semibold` | Yes | None |
| 107 | th sticky background | `--cg-color-surface-overlay` | **NO** | **Same made-up token. Use `--cg-color-surface-cards-background`** |
| 111 | td padding | `--cg-spacing-4` / `--cg-spacing-8` | Yes | None |
| 112 | td border-bottom | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | None |
| 113 | td color | `--cg-color-surface-base-text` | Yes | None |
| 114 | td font-family | `--cg-font-family-mono` | Yes | None |
| 118 | tr:hover td background | `--cg-overlay-dark-subtle` | Yes | Real tier-1 overlay |
| 122 | truncated-msg font-size | `--cg-font-size-xs` | Yes | Helper note, acceptable |
| 123 | truncated-msg color | `--cg-color-input-text-placeholder` | Yes | None |
| 125 | truncated-msg padding | `--cg-spacing-8` | Yes | None |
| 131 | actions gap | `--cg-spacing-8` | Yes | None |
| 137 | btn border-radius | `--cg-border-radius-100` | Yes | None |
| 138 | btn padding | `--cg-spacing-8` / `--cg-spacing-16` | Yes | None |
| 139 | btn font-size | `--cg-font-size-sm` | Yes | None (14px, meets body min) |
| 140 | btn font-weight | `--cg-font-weight-semibold` | Yes | None |
| 146 | btn focus outline | `2px solid --cg-overlay-accent-strong` | Partial | Bare `2px` width is acceptable (outline, not box geometry); color is a real overlay. Could use `--cg-color-focus-ring` for consistency — flag only |
| 147 | btn focus outline-offset | `--cg-outline-offset-default` | Yes | Real token (=2px, verified in dist, outside scoped vocab) |
| 152 | btn-cancel border | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | None |
| 153 | btn-cancel color | `--cg-color-input-text-placeholder` | Yes | None |
| 157 | btn-cancel:hover background | `--cg-color-surface-cards-border` | Yes | Acceptable (subtle fill on hover) |
| 161 | btn-confirm background | `--cg-color-action-primary-background-default` | Yes | None |
| 162 | btn-confirm color | `--cg-color-surface-container-background` | Yes | None (dark text on accent) |
| 165 | btn-confirm:hover filter | `brightness(1.1)` | Yes | Acceptable filter multiplier |
| 169 | btn:active transform | `scale(--cg-interaction-press-scale)` | Yes | Real token (=0.97, verified in dist, outside scoped vocab) |

### 2. Styling Audit
- **Border radius:** Consistent and well-graded — host `--cg-border-radius-150`, preview area & buttons `--cg-border-radius-100`, badge `--cg-border-radius-50`. Clean visual hierarchy.
- **Spacing:** All from the token scale (`2/4/6/8/12/16`). No magic numbers in padding/margin/gap.
- **Font-size accessibility:** Title and buttons use `--cg-font-size-sm` (14px), meeting the body minimum. The preview `pre`, table cells, badge, meta, and truncation note use `--cg-font-size-xs` — acceptable here because these are tabular/code/metadata contexts (mono data dump, column labels, byte-size meta), not running body copy.
- **Translucent vs solid borders:** Borders use solid semantic `--cg-color-surface-cards-border`; hover/badge fills use translucent overlay tokens (`--cg-overlay-*`). Appropriate layering.
- **Transitions:** No `transition: all`. Only an entrance `animation` (line 33) with explicit duration + easing tokens, plus an `:active` transform. `reducedMotion` is imported and applied. Compliant.
- **Dark-theme suitability:** Dark-first surface stack (base host → overlay preview area → accent badge). HOWEVER the preview-area/sticky-header background token `--cg-color-surface-overlay` does not exist, so those surfaces currently fall back to transparent — breaking the intended elevation/contrast on dark. Functional bug (see Fix 2).

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | Host card + header + preview area + actions | None |
| Hover | Yes | `tr:hover td` (line 117), `.btn-cancel:hover` (156), `.btn-confirm:hover` filter (164) | None |
| Active/Press | Yes | `.btn:active` scale via `--cg-interaction-press-scale` (168) | Applies to both buttons — good tactile feedback |
| Focus-visible | Yes | `.btn:focus-visible` outline (145); preview-area `tabindex="0"` is focusable but has no visible focus ring | Scrollable region (298) gets keyboard focus but no `:focus-visible` style — sighted keyboard users lose track of focus |
| Disabled | N/A | Buttons never enter a disabled state; no loading/pending gating of confirm/cancel | Acceptable for current scope; if a "submitting" state is added, confirm should disable |
| Loading | N/A | Component renders already-resolved data; no async fetch | Acceptable |
| Error | Partial | JSON parse failure falls back to `String(this.data)` in a `<pre>` (225-227) | No visible error styling/affordance — silent fallback. Minor |
| Success | N/A | No post-confirm success state; emits event and defers to host | Acceptable (host owns outcome) |

### 4. Interaction Audit
- **Keyboard:** Both buttons are native `<button>` (Enter/Space free). Preview area is `tabindex="0"` + `role="region"`, so it is keyboard-scrollable. No custom key handling needed.
- **ARIA:** `role="region"` + `aria-label="Data preview"` on the scroll area (298); `role="table"` + `aria-label="Data table"` (234); `scope="col"` on headers (235); `aria-label` on both buttons (303, 305). Solid. The format badge and row/size meta are decorative text — fine. Minor: the `role="table"`/`scope` markup is mostly redundant on a native `<table>` but harmless.
- **CustomEvents:** `ai-data-confirm` with `detail: { data, format }` (272-275) and `ai-data-cancel` with no detail (279-281). Both `bubbles: true, composed: true` — correct for crossing Shadow DOM. Confirm detail shape matches the documented `@fires` signature.
- **Touch targets:** Buttons are `--cg-spacing-8` (8px) vertical padding around `--cg-font-size-sm` text ≈ 30-32px tall — **below the 44px minimum**. Design enlargement recommendation, not a token fix (see report note).

### 5. Visual Design Check
Modern and sleek — fade-slide entrance, a tasteful accent format badge, real JSON syntax coloring via the `--cg-color-code-*` family, sticky table headers, and a clear primary/secondary button pair. Radius scale is well-graded; breathing room from the 12/16 spacing rhythm is good; the header divider and table cell borders give clean structure; typography hierarchy (semibold 14px title → muted xs meta → mono data) reads well. Two issues hold it back from flawless: the `var(300px)` max-height does not resolve (so the preview area will not actually cap its height and the scroll behavior breaks), and the made-up overlay background leaves the data surface transparent on dark. Once those resolve it is genuinely HeroUI/Vercel showcase-ready.

Verdict: **strong**

### 6. Fixes Needed

1. **Line 70** — `max-height: var(300px);` → `max-height: var(--cg-component-table-virtual-max-height);`
   Why: `var(300px)` is malformed — `var()` requires a custom-property name, not a raw length, so the declaration is invalid and dropped. The preview area then never caps its height and the `overflow: auto` scroll affordance is lost. `--cg-component-table-virtual-max-height` is the semantically correct tier-3 max-height token for a scrollable tabular preview.

2. **Line 72** — `background: var(--cg-color-surface-overlay);` → `background: var(--cg-color-surface-cards-background);`
   Why: `--cg-color-surface-overlay` is not a defined token (only `--cg-color-surface-overlay-scrim-dark/light` exist). It does not resolve, so the preview area renders with no background and loses its elevation/contrast against the host on dark theme.

3. **Line 107** — `background: var(--cg-color-surface-overlay);` → `background: var(--cg-color-surface-cards-background);`
   Why: Same non-existent token on the sticky `<th>` background. Without a solid fill the sticky header becomes transparent and content scrolls visibly behind it, breaking the sticky-header readability. Must match the preview-area surface (Fix 2) so the header occludes scrolled rows.

**Non-token flags (not in fixes array):**
- Scrollable preview region (`tabindex="0"`, line 298) has no `:focus-visible` style — add a focus ring (e.g. `outline: var(--cg-border-width-100) solid var(--cg-color-focus-ring); outline-offset: var(--cg-outline-offset-default);`) so keyboard users can see the focused scroll container.
- Buttons are ~30-32px tall, below the 44px touch-target minimum — design enlargement, not a token violation.
- JSON parse-failure path (225-227) is a silent text fallback with no error affordance — consider a visible error state if malformed data is expected.
- Focus outline (line 146) uses a bare `2px` width and `--cg-overlay-accent-strong`; consider `--cg-color-focus-ring` for cross-component consistency. Bare `2px` on `outline` is tolerated (not box geometry), so not listed as a hard fix.

### Research-backed enhancements

1. **Row virtualization for large payloads, not just CSS truncation.** The component currently caps height and shows a "truncated" note, but still renders every DOM row up to that cap. Both shadcn's data-table and Linear/Notion-class tables run on TanStack Table + a virtualizer (react-virtuoso) so only visible rows are in the DOM — this is what lets them scroll thousands of rows at 60fps. For a data *preview* (which is exactly the case that receives unbounded model output), add windowed rendering so the preview stays smooth on a 5k-row CSV instead of jank-truncating at row N. ([shadcn virtualized data table](https://github.com/shadcn-ui/ui/discussions/3048))

2. **Fix the sticky-header stacking, not just its background.** Fix 3 makes the sticky `<th>` opaque, but the openstatus / shadcn write-ups flag the real trap: a parent `overflow: auto` wrapper *kills* `position: sticky`, and the header bottom-border disappears in Safari while showing in Chrome. Move the scroll container so the table — not an ancestor div — owns the overflow, and replace the `<th>` `border-bottom` with a `box-shadow: inset 0 -1px 0 var(--cg-color-surface-cards-border)` so the divider survives during scroll cross-browser. ([openstatus data-table redesign](https://www.openstatus.dev/blog/data-table-redesign), [shadcn sticky header](https://medium.com/@shuhan.chan08/shadcn-ui-sticky-table-header-implementation-74b313d5c02e))

3. **Copy affordance on hover — the defining micro-interaction of modern data previews.** Vercel/Datadog/Axiom-inspired tables surface a per-cell (and whole-payload) copy button that fades in on `tr:hover` / region hover. The component already has a `tr:hover` rule and the raw `data`+`format` in hand — add a "Copy JSON / Copy as CSV" ghost button in the header and a per-row copy-on-hover icon, with a 150ms opacity transition (reuse `--cg-transition-duration-fast`) and a transient "Copied" check. This is the single highest-value addition for a preview surface. ([openstatus / Vercel-inspired redesign](https://www.openstatus.dev/blog/data-table-redesign))

4. **Density toggle + tabular numerals.** Linear/Datadog-style data UIs ship a compact/comfortable density switch and right-align + tabular-figure numeric columns. The table is already mono-font, but add `font-variant-numeric: tabular-nums` to `td` so digit columns align in a scannable grid, and expose a density control that swaps the `td` padding between `--cg-spacing-4/--cg-spacing-8` (compact) and `--cg-spacing-8/--cg-spacing-12` (comfortable). ([openstatus data-table redesign](https://www.openstatus.dev/blog/data-table-redesign))

5. **A real skeleton/loading and empty state.** The audit notes the component "renders already-resolved data," but in a streaming gen-UI library the preview is the natural landing spot for a still-arriving payload. Modern shadcn/Vercel tables render shimmer skeleton rows during fetch and a centered empty-state illustration + hint when zero rows. Add (a) a `loading` boolean that paints 3–5 skeleton `<tr>`s using `--cg-overlay-dark-subtle`, and (b) an explicit empty state instead of an empty `<pre>`. This also gives the silent JSON-parse fallback (lines 225–227) a real visible error surface. ([shadcn data-table](https://ui.shadcn.com/docs/components/radix/data-table))

6. **Format-aware preview toolbar with row/column counts as live affordances.** Today the row/size meta is decorative text. Promote it to an interactive toolbar (the pattern shadcn/openstatus converged on): clickable format badge to switch JSON ⇄ table view, a live "1,204 rows × 8 cols" counter, and an inline filter input — the same header-bar density Datadog/Axiom use. Even shipping just the JSON⇄table toggle turns the badge from a label into the primary navigation affordance of the card. ([openstatus data-table redesign](https://www.openstatus.dev/blog/data-table-redesign))

**Sources:** [shadcn virtualized data table](https://github.com/shadcn-ui/ui/discussions/3048), [shadcn Data Table docs](https://ui.shadcn.com/docs/components/radix/data-table), [shadcn sticky header](https://medium.com/@shuhan.chan08/shadcn-ui-sticky-table-header-implementation-74b313d5c02e), [openstatus: the React data-table I always wanted](https://www.openstatus.dev/blog/data-table-redesign)
