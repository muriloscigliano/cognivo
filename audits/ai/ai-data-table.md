## ai-data-table — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 44 | display | `none` | Yes | Keyword, fine. |
| 49 | background | `var(--cg-color-surface-container-background)` | Yes | Tier-2 surface, valid, no fallback. |
| 50 | border | `var(--cg-border-width-50) solid var(--cg-color-surface-table-divider)` | Yes | Tier-1 width + tier-2 color, valid. |
| 51 | border-radius | `var(--cg-component-table-radius)` | Yes | Tier-3, correct first choice. |
| 52 | padding | `var(--cg-spacing-4) 0` | Yes | Tier-1 spacing + 0, valid. |
| 55 | overflow-x | `auto` | Yes | Keyword. |
| 60 | max-height | `var(--cg-component-table-virtual-max-height)` | Yes | Tier-3, correct. |
| 62 | table-layout | `fixed` | Yes | Keyword. |
| 63 | padding/border/background | `0 / none / transparent` | Yes | Spacer reset, legitimate. |
| 66 | width | `calc(100% - var(--cg-spacing-8) * 2)` | Yes | % + tier-1 spacing, valid. |
| 67 | margin | `0 var(--cg-spacing-8)` | Yes | Tier-1 spacing. |
| 68-69 | border-collapse/spacing | `separate / 0` | Yes | Keyword + 0. |
| 70 | font-size | `var(--cg-font-size-sm)` | Yes | 14px min body satisfied. |
| 72 | font-size (compact) | `var(--cg-font-size-xs)` | Borderline | Compact table cell text below 14px; acceptable for dense-data compact mode but flag for a11y. |
| 75 | position/top/z-index | `sticky / 0 / 1` | Yes | Layout, fine. |
| 78 | padding | `var(--cg-spacing-12) var(--cg-spacing-16)` | Yes | Tier-1 spacing. |
| 79 | text-align | `left` | Yes | Keyword. |
| 80 | font-weight | `var(--cg-font-weight-medium)` | Yes | Tier-1, valid. |
| 81 | font-size | `var(--cg-font-size-xs)` | Borderline | Header label is a label, xs acceptable (not body). |
| 82 | color | `var(--cg-color-surface-container-outlined)` | Yes | Tier-2 muted, matches cg-table. |
| 83 | background | `transparent` | Yes | Keyword. |
| 84 | border-bottom | `none` | Yes | Keyword. |
| 88 | padding (compact) | `var(--cg-spacing-6) var(--cg-spacing-12)` | Yes | Tier-1 spacing. |
| 89-90 | text-align | `center / right` | Yes | Keyword. |
| 92 | cursor | `pointer` | Yes | Keyword. |
| 93 | color (hover) | `var(--cg-color-action-primary-background-default)` | Yes | Tier-2, valid. |
| 96 | box-shadow (focus) | `inset 0 0 0 var(--cg-border-width-100) var(--cg-color-action-primary-background-default)` | Yes | Tier-1 width + tier-2 color. Could use `--cg-color-focus-ring` but action-primary is acceptable. |
| 101 | margin-left | `var(--cg-spacing-4)` | Yes | Tier-1 spacing. |
| 102 | opacity | `0.4` | Yes | Raw opacity, legitimate. |
| 107 | color | `var(--cg-color-action-primary-background-default)` | Yes | Tier-2, valid. |
| 111 | background (tbody) | `var(--cg-overlay-dark-subtle)` | Yes | Tier-1 overlay, real token, dark-suitable inset. |
| 112-115 | border | `var(--cg-border-width-50) solid var(--cg-color-surface-table-divider)` | Yes | Valid. |
| 116-119 | border-radius | `var(--cg-border-radius-150)` | Yes | Tier-1 generic radius, matches cg-table inner rounding. |
| 122 | padding | `var(--cg-spacing-12) var(--cg-spacing-16)` | Yes | Tier-1 spacing. |
| 123 | color | `var(--cg-color-surface-table-text)` | Yes | Tier-2, correct. |
| 124 | border-bottom | `var(--cg-border-width-50) solid var(--cg-color-surface-table-divider)` | Yes | Valid. |
| 128 | padding (compact) | `var(--cg-spacing-6) var(--cg-spacing-12)` | Yes | Tier-1 spacing. |
| 134 | transition | `background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default)` | Yes | Explicit property, motion tokens, not `transition: all`. |
| 135 | background (hover) | `var(--cg-color-action-tertiary-background-hover)` | Borderline | Works, but a dedicated `--cg-color-surface-table-row-hover-background` exists and is more semantically precise. |
| 138-139 | background (striped) | `var(--cg-color-action-tertiary-background-hover)` | No (semantic) | Striped rows reuse the HOVER token; should use `--cg-color-surface-table-row-alt-background`. Hover and stripe become visually identical, killing hover affordance on even rows. |
| 144 | border-left (anomaly-high) | `var(--cg-border-width-300) solid var(--cg-color-status-error-text-default)` | Yes | Severity = error semantics, correct tier-2. Not an AI processing state, so AI tokens N/A. |
| 147 | border-left (anomaly-medium) | `var(--cg-color-status-warning-text-default)` | Yes | Correct severity mapping. |
| 150 | border-left (anomaly-low) | `var(--cg-color-status-info-text-default)` | Yes | Correct severity mapping. |
| 155 | margin-left | `var(--cg-spacing-6)` | Yes | Tier-1 spacing. |
| 156 | color (anomaly-icon) | `var(--cg-color-input-text-placeholder)` | Borderline | Icon color borrowed from input-placeholder family; semantically odd on a table but a real muted token. Prefer `--cg-color-surface-table-icon`. |
| 163 | bottom | `calc(100% + var(--cg-spacing-4))` | Yes | % + tier-1 spacing. |
| 165 | transform | `translateX(-50%)` | Yes | Geometry, legitimate. |
| 166 | background (tooltip) | `var(--cg-color-surface-base-background)` | Borderline | A dedicated `--cg-color-surface-tooltip-background` / `--cg-color-tooltip-background` exists; tooltip should use it. |
| 167 | border | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | Borderline | `--cg-color-surface-tooltip-border` is the precise token. |
| 168 | color (tooltip) | `var(--cg-color-surface-base-text)` | Borderline | `--cg-color-surface-tooltip-text` / `--cg-color-tooltip-text` is the precise token. |
| 169 | font-size | `var(--cg-font-size-xs)` | Borderline | Tooltip text is auxiliary; xs acceptable. |
| 170 | padding | `var(--cg-spacing-6) var(--cg-spacing-8)` | Yes | Tier-1 spacing. |
| 171 | border-radius | `var(--cg-border-radius-100)` | Borderline | `--cg-component-tooltip-radius` (tier-3) is the resolution-priority choice. |
| 175 | box-shadow | `var(--cg-elevation-2)` | Yes | Real elevation token. |
| 179 | padding (empty) | `var(--cg-spacing-24)` | Yes | Tier-1 spacing. |
| 181 | color (empty) | `var(--cg-color-input-text-placeholder)` | Borderline | `--cg-color-empty-state-text-secondary` / `--cg-color-surface-container-subtle` is more semantic. |
| 182 | font-size (empty) | `var(--cg-font-size-sm)` | Yes | 14px min satisfied. |
| 186-190 | border-radius (rounded=none) | `0` | Yes | Keyword. |
| 192 | border-radius (rounded=sm) | `var(--cg-border-radius-100)` | Yes | Tier-1 radius. |
| 193-196 | border-radius (rounded=sm cells) | `var(--cg-border-radius-50)` | Yes | Tier-1 radius. |
| 198 | border-radius (rounded=md) | `var(--cg-border-radius-150)` | Yes | Tier-1 radius. |
| 199 | border-radius (rounded=lg) | `var(--cg-component-table-radius)` | Yes | Tier-3, correct. |
| 388/394 | height (virtual spacer) | `${topPad}px` / `${bottomPad}px` (styleMap) | Yes | JS-computed runtime pixel heights from `rowHeight`, NOT design values — legitimate exception. |

No comma-fallbacks, no raw hex/rgba in CSS rules, no banned tier-1 palette colors, no `transition: all`, no invented token names. The file is fundamentally clean; findings are semantic-precision improvements plus one real striped/hover collision.

### 2. Styling Audit
- **Border radius**: Appropriate. Wrapper uses tier-3 `--cg-component-table-radius`; inner cell rounding (`--cg-border-radius-150`) mirrors cg-table. Rounded variants (none/sm/md/lg) fully tokenized.
- **Spacing generosity**: Good. 12/16 cell padding default, 6/12 compact — comfortable, token-driven. Empty state has generous `--cg-spacing-24`.
- **Font-size accessibility**: Body cells use `--cg-font-size-sm` (14px) at default — passes the 14px floor. Compact mode drops cells to `--cg-font-size-xs` (<14px); acceptable for dense compact mode but a known a11y trade-off. Header labels are `xs`, fine as labels.
- **Translucent vs solid borders**: Dividers use solid tier-2 `--cg-color-surface-table-divider` at `--cg-border-width-50` hairline — correct, prefers token over raw 1px. Anomaly accent uses bolder `--cg-border-width-300`, appropriate emphasis.
- **Transitions**: Explicit `background-color` only with `--cg-transition-duration-fast` + `--cg-transition-easing-default`. No `transition: all`. `reducedMotion` style is imported and applied.
- **Dark-theme background**: `--cg-overlay-dark-subtle` tbody inset over `--cg-color-surface-container-background` wrapper reads well dark-first. Suitable.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | Base th/td styling, tbody inset, dividers | None. |
| Hover | Yes | `tbody tr:hover td` → `--cg-color-action-tertiary-background-hover`; `th.sortable:hover` color shift | Row-hover token is identical to the striped token (line 138), so even rows show no hover delta. |
| Active/Press | No | No `:active` on sortable header or clickable cell | Missing pressed feedback on the sortable th and clickable cells; minor — keyboard/click still works, but no tactile press state. |
| Focus-visible | Yes | `th.sortable:focus-visible` inset box-shadow ring (`--cg-border-width-100` + action-primary) | Only the sortable header is focusable. Clickable cells have `cursor:pointer` + click handlers but are NOT keyboard-focusable (no tabindex/role=button), so no focus state for cell activation. |
| Disabled | N/A | Component has no disabled affordance | Justified — a data table has no disabled mode; individual non-sortable headers get `tabindex=-1` (correctly unfocusable). |
| Loading | N/A | No loading skeleton | Justified — data is provided synchronously via the `data` property; consumer controls loading. Acceptable, though a skeleton could be a future enhancement. |
| Error | Partial | Anomaly cells render error/warning/info accent borders + tooltip | This is per-cell anomaly signaling, not a table-level error state. Reasonable for the component's purpose. |
| Success/Empty | Yes (empty) | `.empty-state` for "No columns defined" and "No data available" | Good empty coverage; no explicit success state needed. |

### 4. Interaction Audit
- **Keyboard**: Sortable headers support Enter and Space (line 419) with `preventDefault` — correct. Missing: clickable cells are mouse-only; `_handleCellClick`/`_handleAnomalyClick` fire only on `@click`, with no `tabindex`, no `role="button"`, and no keydown handler, so cell/anomaly activation is not keyboard-reachable. Arrow-key grid navigation (ARIA grid pattern) is absent.
- **ARIA**: `role="table"` + `aria-label="Data table"` (406), `role="row"` (339/408), `role="columnheader"` (415), `role="cell"` (348), `aria-sort` correctly toggles ascending/descending/none (417), anomaly cells get `aria-label="Anomaly: {reason}"` (349), tooltip has `role="tooltip"` (356), decorative svg `aria-hidden` (355), virtual spacers `aria-hidden` (388/394). Roles are correct. Gap: clickable cells are interactive but carry only `role="cell"` with no `role="button"`/`tabindex`, so AT users cannot discover/activate the click action.
- **CustomEvents**: `ai-data-sort` detail `{key, direction}` (290-293) — correct, bubbles+composed. `ai-data-cell-click` detail `{row, col, value}` (297-300) — correct. `ai-data-anomaly-click` detail is the full anomaly `{row, col, severity, reason}` (303-307) — matches `@fires` JSDoc. All events bubble and are composed. Detail shapes are correct.
- **Touch targets**: Default cell/header ≈ 14px font + 12px vertical padding ≈ ~40px tap height — slightly under the 44px target for the sortable header and clickable cells. Compact mode (6px padding) is well under 44px. The interactive sortable `th` should guarantee ≥44px min-height in non-compact mode.

### 5. Visual Design Check
Modern and sleek — inset tbody on a subtle dark overlay, hairline dividers, sticky muted header, tier-3 corner radius, and a tasteful left-accent anomaly system with an elevated tooltip. Radius is appropriate and variant-driven. Breathing room is good in default density. Dividers are present and correctly tier-2. Typography hierarchy (muted medium-weight xs header vs sm body) is clean. It would broadly pass a HeroUI/Vercel-style showcase. Two things hold it back from top marks: the striped-rows-equal-hover collision (hover affordance vanishes on even rows) and tooltip/empty/anomaly-icon colors borrowed from non-table semantic families instead of the dedicated `--cg-color-surface-tooltip-*` / `--cg-color-surface-table-icon` / empty-state tokens. Verdict: **strong**.

### 6. Fixes Needed
1. **Line 138-140 — striped rows collide with hover token.** Striped even-row background reuses the hover token, so even rows have no hover delta.
   - Current: `:host([striped]) tbody tr:nth-child(even) td { background: var(--cg-color-action-tertiary-background-hover); }`
   - Fixed: `:host([striped]) tbody tr:nth-child(even) td { background: var(--cg-color-surface-table-row-alt-background); }`
   - Why: Striped and hover must be visually distinct; a dedicated row-alt token exists and preserves hover affordance.

2. **Line 135 — row hover uses generic action token instead of the table-specific hover token.**
   - Current: `tbody tr:hover td { background: var(--cg-color-action-tertiary-background-hover); }`
   - Fixed: `tbody tr:hover td { background: var(--cg-color-surface-table-row-hover-background); }`
   - Why: A semantic table-row-hover token exists; using it is more precise and (with fix #1) restores a distinct hover on striped rows.

3. **Lines 166-168 — tooltip colors use surface-base instead of the dedicated tooltip family.**
   - Current: `background: var(--cg-color-surface-base-background);` / `border: var(--cg-border-width-50) solid var(--cg-color-surface-cards-border);` / `color: var(--cg-color-surface-base-text);`
   - Fixed: `background: var(--cg-color-surface-tooltip-background);` / `border: var(--cg-border-width-50) solid var(--cg-color-surface-tooltip-border);` / `color: var(--cg-color-surface-tooltip-text);`
   - Why: A purpose-built tooltip surface family exists (resolution priority favors the most specific semantic token).

4. **Line 171 — tooltip radius uses tier-1 instead of the tier-3 tooltip token.**
   - Current: `border-radius: var(--cg-border-radius-100);`
   - Fixed: `border-radius: var(--cg-component-tooltip-radius);`
   - Why: Tier-3 component radius is the first-choice per resolution priority.

5. **Line 156 — anomaly icon color borrowed from input-placeholder family.**
   - Current: `color: var(--cg-color-input-text-placeholder);`
   - Fixed: `color: var(--cg-color-surface-table-icon);`
   - Why: Table icon has a dedicated semantic token; input-placeholder is semantically unrelated.

6. **Line 181 — empty-state color borrowed from input-placeholder family.**
   - Current: `color: var(--cg-color-input-text-placeholder);`
   - Fixed: `color: var(--cg-color-empty-state-text-secondary);`
   - Why: A dedicated empty-state text token exists and is the correct semantic source.

7. **Lines 345-353 (a11y, not a token defect) — clickable/anomaly cells are not keyboard-operable.** Cells fire `ai-data-cell-click`/`ai-data-anomaly-click` only on mouse `@click` with no `tabindex`, `role="button"`, or keydown handler. Recommend adding keyboard activation and a focus-visible state, plus ensuring interactive cells/headers meet a ≥44px target in non-compact mode. (Listed for completeness; this is a behavioral/markup fix, not a single-line CSS swap.)

### Research-backed enhancements

- **User-toggled density modes (comfortable / compact / condensed)** with row height as a tier-3 token (`--cg-component-data-table-row-height-*`). Density control is the highest-leverage affordance for data-heavy tables, letting users tame visual overload on demand ([Pencil & Paper enterprise tables](https://www.pencilandpaper.io/articles/ux-pattern-analysis-enterprise-data-tables)). Linear/Vercel ship this as a persisted preference, not a one-off setting.

- **Hover-revealed inline row actions, right-aligned and fade-masked.** Keep the row clean at rest, then surface edit / copy / delete on `:hover` and `:focus-within` via a short opacity+translateX micro-transition (enumerate properties — `transition: all` is banned). This is the dominant Linear/shadcn pattern: actions are afforded by hover so they don't add permanent column clutter ([Eleken table UX](https://www.eleken.co/blog-posts/table-design-ux)).

- **Sticky header + pinnable (frozen) first column** using `position: sticky` with a subtle bottom border/shadow that appears only once the body scrolls. Keeps column labels and the row identity key in context across vertical and horizontal scroll — essential for wide AI-generated datasets ([Justinmind data table](https://www.justinmind.com/ui-design/data-table), [Siemens datatable pattern](https://design.mindsphere.io/patterns/datatable.html)).

- **AI-streaming-aware skeleton + shimmer rows.** Since this is an `ai-*` component, render token-driven skeleton rows that match real column widths while the model streams, then cross-fade each row in as data lands (stagger ~30ms per row). This covers the loading/partial state most tables miss and reads as "live generation" rather than a spinner — the modern real-time-update expectation noted in 2025 trends.

- **First-class empty, error, and zero-results states** distinct from loading. A filtered-to-empty result needs a different affordance (a "clear filters" reset) than a genuinely empty dataset or a model/fetch error with retry. Incomplete state coverage is a blocker per the quality bar; all three deserve dedicated illustrations/copy rather than a blank grid.

- **Selection via hover-checkbox + sticky bulk-action bar.** Reveal the row checkbox on hover (occupying the leading cell), and on first selection slide in a sticky bottom action bar showing count + bulk operations. Mirrors the Linear/shadcn multi-select model and keeps bulk actions discoverable without a persistent selection column ([Pencil & Paper](https://www.pencilandpaper.io/articles/ux-pattern-analysis-enterprise-data-tables)).

### Playground proposal

Current playground likely shows a small static table. Propose a default that exercises every feature: sortable + striped enabled, mixed column types, and at least one anomaly per severity so the left-accent border colors and tooltip are visible.

<ai-data-table
  sortable
  striped
  .columns=${[
    { key: 'name', label: 'Customer' },
    { key: 'plan', label: 'Plan' },
    { key: 'mrr', label: 'MRR', type: 'number', align: 'right' },
    { key: 'churn', label: 'Churn risk', type: 'number', align: 'right' },
  ]}
  .data=${[
    { id: 1, name: 'Acme Corp', plan: 'Enterprise', mrr: 4200, churn: 4 },
    { id: 2, name: 'Globex', plan: 'Pro', mrr: 890, churn: 71 },
    { id: 3, name: 'Initech', plan: 'Pro', mrr: 910, churn: 12 },
    { id: 4, name: 'Umbrella', plan: 'Starter', mrr: 0, churn: 88 },
  ]}
  .anomalies=${[
    { row: 1, col: 'churn', severity: 'high', reason: 'Churn risk 71% — far above cohort median' },
    { row: 3, col: 'mrr', severity: 'medium', reason: 'MRR dropped to 0 this period' },
    { row: 3, col: 'churn', severity: 'low', reason: 'Slightly elevated vs last month' },
  ]}
></ai-data-table>

A compact-mode toggle and a rounded=sm|md|lg switcher would also help reviewers see density and corner variants. No change needed to the component to support this — it is purely a richer demo dataset.

---
*cleanliness: needs-work | fixes applied: 8*
