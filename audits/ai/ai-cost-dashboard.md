## ai-cost-dashboard — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 32 | animation duration/easing | `--cg-transition-duration-fast` / `--cg-transition-easing-default` | Yes | — |
| 37 | background | `--cg-color-surface-cards-background` | Yes | — |
| 38 | border | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | Yes | — |
| 39 | border-radius | `--cg-border-radius-200` | Yes | — |
| 40 | padding | `--cg-spacing-20` | Yes | — |
| 41 | color | `--cg-color-surface-base-text` | Yes | — |
| 48-49 | padding-bottom / margin-bottom | `--cg-spacing-16` | Yes | — |
| 50 | border-bottom | `--cg-border-width-50` solid `--cg-color-surface-cards-divider` | Yes | — |
| 54 | font-size | `--cg-font-size-base` | Yes | — |
| 55 | font-weight | `--cg-font-weight-bold` | Yes | — |
| 59 | font-size | `--cg-font-size-xs` | Yes | ~12px label/meta text — acceptable for non-body metadata (period label) |
| 60 | color | `--cg-color-input-text-placeholder` | Yes (real) | Semantically a placeholder token used for muted meta text; acceptable across suite |
| 67 | gap | `--cg-spacing-8` | Yes | — |
| 68 | margin-bottom | `--cg-spacing-16` | Yes | — |
| 72 | background | `--cg-color-surface-base-background` | Yes | — |
| 73 | border | `--cg-border-width-50` solid `--cg-color-surface-cards-divider` | Yes | — |
| 74 | border-radius | `--cg-border-radius-100` | Yes | — |
| 75 | padding | `--cg-spacing-12` | Yes | — |
| 79 | font-size | `--cg-font-size-xs` | Yes | Stat label, ~12px — acceptable for label |
| 80 | color | `--cg-color-input-text-placeholder` | Yes | Muted label — acceptable |
| 81 | margin-bottom | `--cg-spacing-4` | Yes | — |
| 85 | font-size | `--cg-font-size-lg` | Yes | — |
| 86 | font-weight | `--cg-font-weight-bold` | Yes | — |
| 87 | color | `--cg-color-surface-base-text` | Yes | — |
| 90 | color (warn) | `--cg-color-status-warning-text-default` | Yes | — |
| 91 | color (danger) | `--cg-color-status-error-text-default` | Yes | — |
| 95 | margin-bottom | `--cg-spacing-16` | Yes | — |
| 101 | font-size | `--cg-font-size-xs` | Yes | Budget meta, acceptable |
| 102 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 103 | margin-bottom | `--cg-spacing-6` | Yes | — |
| 107 | height | `--cg-spacing-8` | Yes | Spacing token reused as bar height — acceptable pattern |
| 108 | background | `--cg-color-surface-cards-divider` | Yes | Track uses divider as empty-track fill — acceptable |
| 109 | border-radius | `--cg-border-radius-100` | Yes | — |
| 114 | height | `100%` | Yes | Percentage — not a violation |
| 115 | border-radius | `--cg-border-radius-100` | Yes | — |
| 116 | background | `--cg-color-action-primary-background-default` | Yes | — |
| 117 | transition | width `--cg-transition-duration-slow` `--cg-transition-easing-default` | Yes | Explicit property — good |
| 119 | background (warn) | `--cg-color-status-warning-text-default` | Yes | — |
| 120 | background (danger) | `--cg-color-status-error-text-default` | Yes | — |
| 124 | font-size | `--cg-font-size-xs` | Yes | Section header label — acceptable |
| 125 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 126 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 127-128 | margin-bottom / padding-top | `--cg-spacing-12` / `--cg-spacing-16` | Yes | — |
| 129 | border-top | `--cg-border-width-50` solid `--cg-color-surface-cards-divider` | Yes | — |
| 131 | letter-spacing | `--cg-letter-spacing-wide` | Yes | Real tier-1 token (absent only from partial vocab; confirmed used across suite) |
| 137 | gap | `--cg-spacing-8` | Yes | — |
| 139 | padding | `--cg-spacing-8` 0 | Yes | — |
| 140 | border-bottom | `--cg-border-width-50` solid `--cg-color-surface-cards-divider` | Yes | — |
| 141 | transition | opacity `--cg-transition-duration-fast` `--cg-transition-easing-default` | Yes | Explicit — good |
| 145 | transform (active) | `scale(var(--cg-interaction-press-scale))` | Yes | Real tier-2 interaction token (0.97) |
| 148 | box-shadow (focus) | `0 0 0 3px var(--cg-overlay-accent-strong)` | Partial | `--cg-overlay-accent-strong` is real; `3px` is a bare spread radius. Matches established suite convention (identical to ai-changelog). See §2/§4 note; not auto-fixed |
| 152 | font-size | `--cg-font-size-xs` | Yes | Model name, ~12px — acceptable for dense table-like row |
| 153 | color | `--cg-color-surface-base-text` | Yes | — |
| 154 | min-width | `--cg-spacing-96` | Yes | Spacing token as min-width — acceptable |
| 163 | height | `--cg-spacing-6` | Yes | Bar height — acceptable |
| 164 | background | `--cg-color-surface-cards-divider` | Yes | — |
| 165 | border-radius | `--cg-border-radius-100` | Yes | — |
| 170 | height | `100%` | Yes | — |
| 171 | border-radius | `--cg-border-radius-100` | Yes | — |
| 172 | background | `--cg-color-action-primary-background-default` | Yes | — |
| 173 | transition | width `--cg-transition-duration-slow` `--cg-transition-easing-default` | Yes | — |
| 177 | font-size | `--cg-font-size-xs` | Yes | Cost figure — acceptable |
| 178 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 179 | min-width | `--cg-spacing-56` | Yes | — |
| 186-187 | margin-top / padding-top | `--cg-spacing-16` | Yes | — |
| 188 | border-top | `--cg-border-width-50` solid `--cg-color-surface-cards-divider` | Yes | — |
| 192 | font-size | `--cg-font-size-xs` | Yes | Trend header label — acceptable |
| 193 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 194 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 195 | margin-bottom | `--cg-spacing-12` | Yes | — |
| 197 | letter-spacing | `--cg-letter-spacing-wide` | Yes | Real token |
| 203 | gap | `--cg-spacing-3` | Yes | — |
| 204 | height | `--cg-spacing-48` | Yes | Chart height via spacing — acceptable |
| 209 | background | `--cg-color-action-primary-background-default` | Yes | — |
| 210 | border-radius | `--cg-border-radius-50` `--cg-border-radius-50` 0 0 | Yes | — |
| 211 | min-height | `--cg-spacing-2` | Yes | — |
| 212 | transition | height `--cg-transition-duration-default` `--cg-transition-easing-default` | Yes | — |
| 213/216 | opacity | `0.7` / `1` | Yes | Unitless opacity — not a violation |
| 221 | color (empty-state) | `--cg-color-input-border-hover` | **No** | A border-hover color used for empty-state TEXT. Use `--cg-color-empty-state-text-secondary` |
| 222 | font-size | `--cg-font-size-sm` | Yes | 14px body min — correct for the only true body-copy text |
| 223 | padding | `--cg-spacing-24` 0 | Yes | — |

### 2. Styling Audit

- **Border radius:** Consistent and tier-1 driven — container `--cg-border-radius-200`, inner cards/tracks `--cg-border-radius-100`, trend bars `--cg-border-radius-50` (top-only, correct for column charts). No magic radii.
- **Spacing:** Entirely from the `--cg-spacing-*` scale. Spacing tokens are reused for bar heights/min-widths (e.g. `--cg-spacing-8` as track height, `--cg-spacing-96` as min-width) — acceptable in this system since there is no dedicated tier-3 family for this component.
- **Font-size accessibility:** The only genuine body copy ("No cost data available", line 222) correctly uses `--cg-font-size-sm` (14px). All `--cg-font-size-xs` usages are labels, metadata, dense row figures, and section headers — acceptable, not violations.
- **Translucent vs solid borders:** All borders use solid semantic surface tokens (`--cg-color-surface-cards-border` / `-divider`). Good for dark theme.
- **Transitions:** All three transitions enumerate the exact property (`width`, `opacity`, `height`) with tokenized duration + easing. No `transition: all`. Motion tokens used throughout.
- **Dark-theme suitability:** Strong. Surface, text, status, and action colors all resolve through tier-2 semantics, so the component inherits theme correctly. The one exception is line 221 (border token for text), which will read oddly in the empty state.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.container` + summary/budget/breakdown/trend render | — |
| Hover | Yes | `.model-row:hover { opacity: 0.85 }` (144); `.trend-bar:hover { opacity: 1 }` (215) | Opacity-only hover on rows is subtle; acceptable for a data list |
| Active/Press | Yes | `.model-row:active { transform: scale(--cg-interaction-press-scale) }` (145) | Trend bars have no active feedback (they are non-interactive — acceptable) |
| Focus-visible | Yes | `.model-row:focus-visible` outline:none + box-shadow ring (146-149) | Ring uses `--cg-overlay-accent-strong` not the dedicated `--cg-color-focus-ring`; matches suite convention |
| Disabled | N/A | Dashboard is read-only; rows are buttons but no disabled concept | — |
| Loading | N/A | No async/streaming state in this component — data is passed via `entries` prop | — |
| Error | Partial | No component-level error UI; cost over budget surfaces as `.warn`/`.danger` color on stat-value + budget fill | This is a status indication, not an error state; acceptable |
| Success | N/A | No success lifecycle | — |
| Empty | Yes | `render()` early-returns `.empty-state` "No cost data available" (272-274) | Color token is wrong (line 221) — see §6 |

Note: Despite being an `ai-*` component, this is an aggregate cost visualizer, not a live AI-lifecycle surface. The AI-state token family (`--cg-color-ai-thinking-*` etc.) does not apply here — there is no thinking/streaming/cached/complete/error lifecycle being rendered. No AI-state token recommendation is warranted.

### 4. Interaction Audit

- **Keyboard:** Model rows are `role="button"` `tabindex="0"` with a `keydown` handler for `Enter` and `Space`, calling `preventDefault()` then dispatching (324). Correct and complete for the interactive element.
- **ARIA:** `role="region"` + `aria-label="AI cost dashboard"` on container (283); budget track `role="progressbar"` with `aria-valuenow`/`min`/`max` + label (310); trend chart `role="img"` + `aria-label` (337); each model row has `aria-label` with model + cost (322). Solid coverage.
- **CustomEvents:** `ai-cost-entry-click` dispatched with `{ model, cost }` detail, `bubbles: true`, `composed: true` (263-269) — crosses shadow boundary correctly. Detail matches the documented `@fires` JSDoc.
- **Touch targets:** `.model-row` padding is `--cg-spacing-8` 0 (≈8px vertical) plus line-height; the row is likely below the 44px target. This is a sizing/design concern, not a token violation — flagged here, not in fixes.

### 5. Visual Design Check

- **Modern/sleek?** Yes — clean card with summary stat trio, tokenized budget bar, per-model horizontal bars, and a mini column trend chart. A coherent, dashboard-grade composition.
- **Radius:** Consistent nested radius scale (200 → 100 → 50). Good.
- **Breathing room:** Generous and rhythmic (`--cg-spacing-16` section gaps, `--cg-spacing-12` card padding).
- **Dividers:** Uses `--cg-color-surface-cards-divider` for header, section, and row separation — restrained and correct.
- **Typography hierarchy:** Clear — bold base title, bold lg stat values, xs muted labels and uppercase section headers with wide tracking. Reads well.
- **HeroUI/Vercel showcase-ready?** Yes, with one polish note: the empty-state text color (line 221) should be a proper empty-state/muted text token, and touch targets on rows could be enlarged.
- **One-word verdict:** strong

### 6. Fixes Needed

1. **Line 221** — `.empty-state { color: var(--cg-color-input-border-hover); }` uses an input *border* color for empty-state *text*. Change to `color: var(--cg-color-empty-state-text-secondary);` (a real tier-2 token from the colors vocab, purpose-built for empty-state copy). Why: borders and text are distinct semantic roles; a border token is not guaranteed to meet text-contrast requirements and is semantically incorrect.

Flags (not auto-fixed):
- **Line 148 focus ring** — `box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong)`. The dedicated `--cg-color-focus-ring` token exists and would be more semantically correct, but the `--cg-overlay-accent-strong` pattern is the established convention across the AI suite (identical to ai-changelog/ai-app-sidebar). The bare `3px` is a box-shadow spread radius (not width/height/padding/radius/font-size), so per audit conventions it is borderline. Left as a consistency flag for a suite-wide focus-ring standardization, not a per-component fix.
- **Touch targets** — model rows (~8px vertical padding) likely fall below the 44px minimum. This is a sizing/design enlargement, not a token violation; raise row padding or set a min-height if interactive cost rows need to meet touch guidance.

### Research-backed enhancements

Sourced from a focused scan of 2025/2026 cost-and-usage dashboard patterns across Vercel v0, shadcn/ui, HeroUI v3, and Linear-style analytics surfaces. Each item is concrete and specific to *this* component.

1. **Animated count-up on stat values + budget fill (Vercel v0 KPI-card pattern).** v0/shadcn KPI cards animate their headline numbers and trend deltas on mount rather than snapping in (per the v0 "KPI cards with trend indicators" pattern, [bitcot](https://www.bitcot.com/top-10-ui-components-you-can-create-with-v0-by-vercel/)). The component already tweens the budget-bar `width` (line 117) and per-model bars (line 173) but the three headline `.stat-value` figures appear instantly. Add a tokenized count-up (respecting `prefers-reduced-motion`) using `--cg-transition-duration-slow` so the spend/budget/projected numbers and the budget fill animate in sync — the eye reads "this number is live," which is the whole point of a cost surface.

2. **Signed, color-coded trend delta on the mini chart (Linear/Vercel trend-indicator pattern).** Modern dashboards pair every trend with a delta chip (green for down-spend, red for over-spend) rather than bare bars ([colorlib SaaS dashboards 2026](https://colorlib.com/wp/saas-admin-dashboard-templates/)). The trend section (lines 192-216) currently renders only columns. Add a `+12.4% vs. last period` delta using the existing `--cg-color-status-error-text-default` / a success-text token, reusing the `.warn`/`.danger` semantic pattern already present at lines 90-91. This turns the chart from decorative into decision-grade.

3. **Per-bar hover tooltip / value-on-hover for the trend columns (HeroUI + Recharts interaction norm).** HeroUI v3 and the shadcn/Recharts stack treat hover-to-reveal-value as table stakes for any chart ([heroui.com](https://heroui.com/), [shadcn/ui](https://ui.shadcn.com/)). Today the trend bars only change `opacity` on hover (line 215) and expose no value. Add a tokenized tooltip (or an `aria`-described inline value) surfacing the per-day cost on hover/focus — and make the bars focusable so keyboard users get parity, closing the gap noted in §4.

4. **Skeleton/shimmer loading state (shadcn `Skeleton` convention).** §3 marks Loading as N/A because data arrives via the `entries` prop, but the dominant 2025 stack (Next.js + shadcn `Skeleton`) renders shimmer placeholders for KPI cards and bars while upstream usage data resolves ([shadcndesign UI kits 2025](https://www.shadcndesign.com/blog/best-ui-kits-in-2025)). For an `ai-*` cost surface whose data is frequently fetched async by the host app, add an optional `loading` boolean that renders three stat skeletons + bar skeletons using `--cg-color-surface-cards-divider` as the base, avoiding layout shift when real numbers land.

5. **Denser, scannable model-breakdown rows with right-aligned monospace figures (Linear data-density pattern).** Linear-style analytics rows align numeric values to a tabular/monospace column so costs scan vertically. The model rows (lines 137-179) put cost figures in an `xs` proportional font. Apply `font-variant-numeric: tabular-nums` and right-align the `.cost` column so digits line up across rows — a zero-token-cost density win, and it also addresses the sub-44px touch-target flag in §4 if paired with a `min-height` bump.

6. **Period/timeframe segmented control affordance (Vercel admin-dashboard date-picker pattern).** 2026 admin templates ship a date-range or 7d/30d/90d segmented control on every cost view ([Vercel admin templates](https://vercel.com/templates/admin-dashboard)). The header currently shows a static period *label* (lines 59-60) with no way to change scope. Expose an optional slotted/segmented timeframe control that re-emits a `period-change` CustomEvent (mirroring the existing `ai-cost-entry-click` dispatch convention at lines 263-269), letting the host re-query without the component owning data.

Sources:
- [Top 10 UI Components with v0 by Vercel](https://www.bitcot.com/top-10-ui-components-you-can-create-with-v0-by-vercel/)
- [27 Best SaaS Admin Dashboard Templates 2026 — Colorlib](https://colorlib.com/wp/saas-admin-dashboard-templates/)
- [HeroUI v3](https://heroui.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vercel Admin Dashboard Templates](https://vercel.com/templates/admin-dashboard)
- [Best UI Kits in 2025 — shadcndesign](https://www.shadcndesign.com/blog/best-ui-kits-in-2025)
