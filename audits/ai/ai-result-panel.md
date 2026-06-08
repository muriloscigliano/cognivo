## ai-result-panel — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 18 | display | block | ✅ | — |
| 21 | background | `--cg-color-surface-cards-background` | ✅ | — |
| 22 | border | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | ✅ | — |
| 23 | border-radius | `--cg-component-card-radius` | ✅ tier-3 | — |
| 24 | overflow | hidden | ✅ | — |
| 32 | padding | `--cg-spacing-16` `--cg-spacing-20` | ✅ | — |
| 33 | cursor | pointer | ✅ | — |
| 35 | gap | `--cg-spacing-8` | ✅ | — |
| 37 | font-size | `--cg-font-size-sm` | ✅ (14px min OK) | — |
| 38 | font-weight | `--cg-font-weight-semibold` | ✅ | — |
| 39 | color | `--cg-color-surface-base-text` | ✅ | — |
| 42 | font-size | `--cg-font-size-xs` | ✅ (metadata/label) | — |
| 43 | color | `--cg-color-input-text-placeholder` | ✅ | — |
| 44 | font-weight | `--cg-font-weight-medium` | ✅ | — |
| 47 | color | `--cg-color-input-text-placeholder` | ✅ | — |
| 48 | transition | transform `--cg-transition-duration-fast` `--cg-transition-easing-default` | ✅ explicit | — |
| 50 | width/height | `--cg-spacing-12` | ✅ (icon sizing via spacing token) | — |
| 51 | transform | rotate(-90deg) | ✅ (geometry) | — |
| 53 | gap | `--cg-spacing-4` | ✅ | — |
| 56 | border | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | ✅ | — |
| 57 | color | `--cg-color-input-text-placeholder` | ✅ | — |
| 58 | border-radius | `--cg-border-radius-50` | ✅ | — |
| 59 | padding | `--cg-spacing-4` `--cg-spacing-8` | ✅ | — |
| 60 | font-size | `--cg-font-size-xs` | ✅ (button chip label) | — |
| 61 | font-weight | `--cg-font-weight-medium` | ✅ | — |
| 64-66 | transition | color/border-color w/ duration+easing tokens | ✅ explicit | — |
| 68 | color / border-color | `--cg-color-surface-base-text` / `--cg-color-input-border-hover` | ✅ | — |
| 69 | transform | scale(`--cg-interaction-press-scale`) | ✅ | — |
| 70 | box-shadow | `0 0 0 3px var(--cg-overlay-accent-strong)` | ⚠️ color tokenized; bare `3px` ring width is literal | See §2 / flag (no ring-width token in vocab) |
| 73 | padding | `0` `--cg-spacing-20` `--cg-spacing-20` | ✅ | — |
| 79 | margin-bottom | `--cg-spacing-16` | ✅ | — |
| 80 | border-bottom | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | ✅ | — |
| 83 | padding | `--cg-spacing-8` `--cg-spacing-16` | ✅ | — |
| 84 | font-size | `--cg-font-size-xs` | ✅ (tab label) | — |
| 85 | font-weight | `--cg-font-weight-medium` | ✅ | — |
| 86 | color | `--cg-color-input-text-placeholder` | ✅ | — |
| 89 | border-bottom | `--cg-border-width-100` solid transparent | ✅ | — |
| 92 | transition | color w/ tokens | ✅ explicit | — |
| 94 | color | `--cg-color-surface-base-text` | ✅ | — |
| 96 | color | `--cg-color-surface-base-text` | ✅ | — |
| 97 | border-bottom-color | `--cg-color-action-primary-background-default` | ✅ | — |
| 99 | box-shadow | `0 0 0 3px var(--cg-overlay-accent-strong)` | ⚠️ same as line 70 | See §2 |
| 103 | font-size | `--cg-font-size-sm` | ✅ body 14px | — |
| 104 | color | `--cg-color-surface-base-text` | ✅ | — |
| 105 | line-height | `--cg-line-height-normal` | ✅ | — |
| 106-108 | margin/padding/border | spacing-16 + border-width-50 + cards-border | ✅ | — |
| 113-120 | list reset / margin / padding / gap | spacing-16, spacing-8, border-width-50, cards-border | ✅ | — |
| 126 | font-size | `--cg-font-size-sm` | ✅ body | — |
| 127 | color | `--cg-color-surface-base-text` | ✅ | — |
| 128 | line-height | `--cg-line-height-normal` | ✅ | — |
| 131-132 | width/height | `--cg-spacing-4` | ✅ (dot via spacing) | — |
| 133 | border-radius | `--cg-border-radius-full` | ✅ | — |
| 134 | background | `--cg-color-action-primary-background-default` | ✅ | — |
| 136 | margin-top | `--cg-spacing-8` | ✅ | — |
| 144 | margin-bottom | `--cg-spacing-12` | ✅ | — |
| 147 | font-size | `--cg-font-size-xs` | ✅ (uppercase label) | — |
| 148 | font-weight | `--cg-font-weight-medium` | ✅ | — |
| 149 | color | `--cg-color-input-text-placeholder` | ✅ | — |
| 151 | letter-spacing | `--cg-letter-spacing-wide` | ✅ (valid) | — |
| 156 | color | `--cg-color-input-text-placeholder` | ✅ | — |
| 157 | font-size | `--cg-font-size-xs` | ✅ | — |
| 162 | gap | `--cg-spacing-4` | ✅ | — |
| 164 | color | `--cg-color-surface-base-text` | ✅ | — |
| 165 | width/height | `--cg-spacing-12` | ✅ | — |
| 170 | gap | `--cg-spacing-8` | ✅ | — |
| 173 | padding | `--cg-spacing-12` | ✅ | — |
| 174 | border-radius | `--cg-border-radius-50` | ✅ | — |
| 175 | background | `--cg-overlay-dark-subtle` | ✅ (valid overlay) | — |
| 176 | border | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | ✅ | — |
| 181 | margin-bottom | `--cg-spacing-8` | ✅ | — |
| 184 | font-size | `--cg-font-size-xs` | ✅ | — |
| 185 | color | `--cg-color-input-text-placeholder` | ✅ | — |
| 186 | font-weight | `--cg-font-weight-medium` | ✅ | — |
| 189 | font-size | `--cg-font-size-xs` | ✅ | — |
| 190 | font-weight | `--cg-font-weight-semibold` | ✅ | — |
| 192 | color | `--cg-color-status-success-text-default` | ✅ semantic | — |
| 193 | color | `--cg-color-status-error-text-default` | ✅ semantic | — |
| 196 | height | `--cg-spacing-4` | ✅ | — |
| 197 | border-radius | `--cg-border-radius-full` | ✅ | — |
| 198 | background | `--cg-color-surface-container-background` | ✅ | — |
| 202 | height | 100% | ✅ | — |
| 203 | border-radius | `--cg-border-radius-full` | ✅ | — |
| 204 | transition | width `--cg-transition-duration-slow` `--cg-transition-easing-default` | ✅ explicit | — |
| 206 | background | `--cg-color-status-success-text-default` | ✅ | — |
| 207 | background | `--cg-color-status-error-text-default` | ✅ | — |
| 211 | padding | `--cg-spacing-12` 0 | ✅ | — |
| 212 | border-bottom | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | ✅ | — |
| 216 | font-size | `--cg-font-size-sm` | ✅ body | — |
| 217 | font-weight | `--cg-font-weight-medium` | ✅ | — |
| 218 | color | `--cg-color-surface-base-text` | ✅ | — |
| 219 | text-decoration | none | ✅ | — |
| 223 | font-size | `--cg-font-size-xs` | ✅ (excerpt; borderline — see §2) | — |
| 224 | color | `--cg-color-input-text-placeholder` | ✅ | — |
| 225 | margin-top | `--cg-spacing-4` | ✅ | — |
| 226 | line-height | `--cg-line-height-normal` | ✅ | — |
| 231 | width | 100% | ✅ | — |
| 233 | font-size | `--cg-font-size-xs` | ✅ (table cells; borderline) | — |
| 237 | padding | `--cg-spacing-8` | ✅ | — |
| 238 | color | `--cg-color-input-text-placeholder` | ✅ | — |
| 239 | font-weight | `--cg-font-weight-medium` | ✅ | — |
| 240 | border-bottom | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | ✅ | — |
| 243 | padding | `--cg-spacing-8` | ✅ | — |
| 244 | color | `--cg-color-surface-base-text` | ✅ | — |
| 245 | border-bottom | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | ✅ | — |
| 249 | padding | `--cg-spacing-12` 0 | ✅ | — |
| 253 | padding | `--cg-spacing-24` | ✅ | — |
| 254 | color | `--cg-color-input-text-placeholder` | ✅ | — |
| 255 | font-size | `--cg-font-size-sm` | ✅ | — |

All referenced tokens verified present in `_token-vocab-ALL.txt`. No made-up tokens, comma-fallbacks, tier-1 palette colors, or raw hex/rgba.

### 2. Styling Audit

- **Border radius:** Panel uses tier-3 `--cg-component-card-radius` (correct first choice). Buttons, drivers, source rows use `--cg-border-radius-50`; bars/dots use `--cg-border-radius-full`. Consistent and tokenized.
- **Spacing:** Entirely from the `--cg-spacing-*` scale (4/8/12/16/20/24). Clean rhythm, generous header/body padding.
- **Font-size accessibility:** Body content — explanation (l.103), bullets (l.126), source titles (l.216) — all use `--cg-font-size-sm` (14px), meeting the minimum. `--cg-font-size-xs` is used for metadata: confidence chip, tab labels, header-button labels, uppercase driver label, driver name/value, source excerpt, data-table cells. The **source excerpt** (l.223) and **data-table cells** (l.233) are arguably reading content rather than pure metadata and sit below 14px — flag for consideration (bump to `--cg-font-size-sm`), defensible as dense secondary content. Not a hard violation.
- **Translucent vs solid borders:** Borders are solid semantic `--cg-color-surface-cards-border`. Driver cards layer `--cg-overlay-dark-subtle` over a card border for nested emphasis — appropriate.
- **Transitions:** All transitions enumerate explicit properties (transform / color / border-color / width) with duration + easing tokens. No `transition: all`. `reducedMotion` shared style imported. Compliant.
- **Focus ring:** Both `:focus-visible` rules (l.70, l.99) use `box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong)`. Color is tokenized; the `3px` ring width is a literal. No box-shadow ring-width token exists in the vocab (`--cg-outline-width-*` are outline-width tokens, not shadow spreads), and the rest of the library follows this same pattern. Flagged as a minor inconsistency; NOT proposing a swap since no verified equivalent exists. A fully-tokenized alternative would be `outline: var(--cg-outline-width-thick) solid var(--cg-color-focus-ring)` — a design decision.
- **Dark-theme suitability:** Surface/cards/overlay tokens are dark-first; status colors semantic. Suitable.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | ✅ | `.panel`, tabs, buttons resting state | — |
| Hover | ✅ | `.header-btn:hover` (l.68), `.tab:hover` (l.94), `.sort-btn:hover` (l.164), `.source-title:hover` underline (l.221) | — |
| Active/Press | ✅ | `.header-btn:active` scale via `--cg-interaction-press-scale` (l.69); tab `.active` selection (l.95) | `.sort-btn` has no press feedback (minor) |
| Focus-visible | ✅ partial | `.header-btn:focus-visible` (l.70), `.tab:focus-visible` (l.99) | `.sort-btn`, `.source-title` link, and collapsible header `role=button` have NO focus ring — keyboard focus invisible. Flag (see §4). |
| Disabled | N/A | Read-only output panel; buttons always actionable. Reasonable omission. | — |
| Loading | ✅ | `streaming` prop renders `<ai-thinking>` indicator (l.374) | Delegated to child — appropriate |
| Error | N/A | Panel renders results, not request errors; no error prop. Out of current scope. | — |
| Success | ✅ implicit | Populated explanation/bullets/drivers is the success render; empty render "No results yet." (l.349) | — |

### 4. Interaction Audit

- **Keyboard:** Collapsible header handles Enter + Space with `preventDefault` (l.361) — good. But the header `role=button` (l.357) has **no `:focus-visible` style**, so keyboard focus on the primary collapse control is invisible. `.sort-btn` and source `<a>` links also lack focus rings. Tabs and header buttons do have focus styles.
- **Tab semantics:** Summary/Data/Sources are plain `<button>`s in a `.tabs` row without `role="tablist"`/`role="tab"`/`aria-selected`/`tabpanel`. Functional via native button focus/click, but not announced as a tab interface to AT. Enhancement, not a token issue.
- **ARIA:** `role="region"` + `aria-label` on panel (l.355). `aria-expanded` reflects collapsed state when collapsible and is correctly omitted (`nothing`) otherwise (l.359). `tabindex` toggles 0/-1 with collapsibility. Collapse icon `aria-hidden="true"`. Bullets `role="list"`. Solid baseline.
- **CustomEvents:** `ai-result-export` fires `{ format, title, explanation, bullets, drivers }` — JSDoc (l.5) documents only `{format: string}`, so the detail is richer than documented (harmless; doc understated). `ai-result-copy` fires `{ content }` matching JSDoc. Both `bubbles: true, composed: true` (correct for shadow DOM). `header-actions` stops click propagation so action buttons don't toggle collapse (l.367) — correct.
- **Touch targets:** Header buttons (4/8 padding + xs font) and tabs are below the 44px minimum. Sizing/design enlargement consideration, not a token violation — excluded from fixes.
- **Clipboard:** `navigator.clipboard?.writeText` optional-chained (l.285) — safe.

### 5. Visual Design Check

Modern and sleek: clean card with tier-3 radius, tabbed Summary/Data/Sources, impact-driver bars with semantic success/error color and an animated slow-width fill, confidence chip, copy/export affordances, and a streaming state delegated to `ai-thinking`. Dividers between explanation/bullets/drivers and between source rows give clear hierarchy. Typography hierarchy is sensible (semibold title → sm body → xs metadata), though it leans heavily on xs. Breathing room is good. The driver bars and sort toggle are a genuinely nice analytical touch. Main polish gaps: missing focus rings on several interactive elements and tabs not wired as a true ARIA tablist. HeroUI/Vercel showcase-ready once focus rings are added.

Verdict: **strong**

### 6. Fixes Needed

No token-level fixes needed — every CSS value resolves to a real token in the vocabulary, with no comma-fallbacks, tier-1 palette colors, raw hex/rgba, magic px on sized properties, or `transition: all`.

Non-token flags (design/a11y, addressed in report; excluded from the fixes array):
1. **Missing focus-visible rings** on the collapsible `.header` (`role=button`), `.sort-btn`, and `.source-title` links — keyboard focus is invisible. Add a focus-visible treatment consistent with the existing `.header-btn`/`.tab` rules.
2. **Tabs lack ARIA tablist semantics** (`role="tablist"`/`tab`/`aria-selected` + `tabpanel`). Enhancement for AT.
3. **Touch targets** on header buttons and tabs below 44px — sizing enlargement (design decision).
4. **xs font-size on excerpt and data-table cells** is borderline reading content below 14px — consider `--cg-font-size-sm`.
5. **Focus ring uses literal `3px`** shadow spread (color tokenized); consistent with the rest of the library, no verified token equivalent, left as-is.

### Research-backed enhancements

Concrete modernization moves for this specific panel, drawn from 2025-era shadcn/ui, Linear, and Vercel patterns. Each maps to an existing weakness flagged above.

1. **Grid-rows collapse animation instead of instant toggle.** The collapsible header currently shows/hides content abruptly (only the chevron `rotate(-90deg)` is animated). The shadcn/ui collapsible guidance is explicit: animate `grid-template-rows: 0fr → 1fr` (or `max-height`/`opacity`), *never* `height: auto`, so the body content slides open smoothly without layout jank. Wrap the panel body in a `display: grid` wrapper transitioning `grid-template-rows` with the existing `--cg-transition-duration-fast` + easing tokens — token-clean and GPU-friendly. ([shadcn/ui Collapsible](https://ui.shadcn.com/docs/components/radix/collapsible))

2. **Skeleton/shimmer for the streaming state, not just a spinner.** Today `streaming` delegates to `<ai-thinking>`. The dominant 2025 dashboard pattern (shadcn Skeleton composed with Tabs) is content-shaped skeletons — ghost lines sized to the explanation paragraph, bullet rows, and driver bars — so the layout doesn't reflow when real content lands and perceived latency drops. Render skeleton placeholders matching the eventual Summary layout while `streaming`, fading to content. ([Shadcnblocks collapsible/skeleton patterns](https://www.shadcnblocks.com/components/collapsible))

3. **Promote the tab row to a true segmented control with an animated active indicator.** The Summary/Data/Sources tabs use a static `border-bottom-color` swap. Linear/Vercel-style tab groups slide a single underline (or pill) between tabs using a `transform: translateX()` on a shared indicator element, which reads as one continuous control rather than three independent buttons — and pairs naturally with fixing the missing `role="tablist"`/`aria-selected` semantics flagged in §4. ([shadcn/ui Tabs](https://ui.shadcn.com/docs/components/radix/tabs))

4. **Wire reduced-motion to the new motion explicitly.** All three additions above are motion; the shadcn accessibility note stresses gating decorative animation behind `motion-reduce`. The panel already imports `reducedMotion` — extend it so the grid-rows slide, skeleton shimmer, and tab-indicator translate collapse to instant state changes under `prefers-reduced-motion: reduce`. ([shadcn/ui Collapsible — reduced motion](https://ui.shadcn.com/docs/components/radix/collapsible))

5. **Density toggle for the Data tab.** The data-table cells already sit at borderline-small `--cg-font-size-xs` (§2). Rather than just bumping size, follow the Linear table pattern: offer a compact/comfortable density control that switches row padding between `--cg-spacing-4` and `--cg-spacing-8` and cell font between `xs` and `sm`. Lets the panel stay information-dense by default while remaining readable on demand — resolves the readability flag without sacrificing scan-ability.

6. **Hover-reveal row affordances on source rows.** Source rows are static links. The modern enterprise-dashboard convention surfaces secondary actions (copy link, open-in-new) only on row `:hover`/`:focus-within`, keeping the resting state clean. Fade in a small action cluster per `.source` row on hover using the existing `--cg-color-input-text-placeholder` → `--cg-color-surface-base-text` transition already used by `.header-btn` — and ensure it also appears on `:focus-within` so it stays keyboard-reachable. ([1000+ shadcn components — row patterns](https://shadcnstudio.com/components))

Sources: [shadcn/ui Collapsible](https://ui.shadcn.com/docs/components/radix/collapsible), [shadcn/ui Tabs](https://ui.shadcn.com/docs/components/radix/tabs), [Shadcnblocks Collapsible](https://www.shadcnblocks.com/components/collapsible), [shadcnstudio Components](https://shadcnstudio.com/components).
