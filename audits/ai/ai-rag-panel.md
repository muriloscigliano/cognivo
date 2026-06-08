## ai-rag-panel — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 24 | `.panel` background | `--cg-color-surface-cards-background` | ✅ | — |
| 25 | `.panel` border width | `--cg-border-width-50` | ✅ | — |
| 25 | `.panel` border color | `--cg-color-surface-cards-border` | ✅ | — |
| 26 | `.panel` border-radius | `--cg-component-card-radius` | ✅ tier 3 | — |
| 33 | `.header` padding | `--cg-spacing-16` / `--cg-spacing-20` | ✅ | — |
| 34 | `.header` border-bottom | `--cg-border-width-50` + `--cg-color-surface-cards-divider` | ✅ | — |
| 36 | `.header-left` gap | `--cg-spacing-12` | ✅ | — |
| 38 | `.header-icon` w/h | `--cg-spacing-16` | ✅ (spacing as icon size; acceptable, icon-size-100 would be cleaner) | — |
| 39 | `.header-icon` color | `--cg-color-surface-container-outlined` | ✅ | — |
| 45 | `.header-title` font-size | `--cg-font-size-xs` | ⚠️ uppercase label, ~12px (see §2) | — |
| 45 | `.header-title` font-weight | `--cg-font-weight-semibold` | ✅ | — |
| 46 | `.header-title` color | `--cg-color-surface-container-outlined` | ✅ | — |
| 47 | `.header-title` letter-spacing | `--cg-letter-spacing-wide` | ✅ (valid) | — |
| 49 | `.header-stats` font-size / color | `--cg-font-size-xs` / `--cg-color-surface-container-outlined` | ✅ | — |
| 53 | `.controls` gap | `--cg-spacing-8` | ✅ | — |
| 54 | `.controls` padding | `--cg-spacing-12` / `--cg-spacing-20` | ✅ | — |
| 55 | `.controls` border-bottom | `--cg-border-width-50` + `--cg-color-surface-cards-divider` | ✅ | — |
| 58 | `.control-btn` padding | `--cg-spacing-4` / `--cg-spacing-8` | ✅ | — |
| 58 | `.control-btn` border-radius | `--cg-border-radius-full` | ✅ | — |
| 59 | `.control-btn` border | `--cg-border-width-50` + `--cg-color-surface-cards-border` | ✅ | — |
| 60 | `.control-btn` background / color | `transparent` / `--cg-color-surface-container-outlined` | ✅ | — |
| 61 | `.control-btn` font-size / weight | `--cg-font-size-xs` / `--cg-font-weight-medium` | ✅ | — |
| 63 | `.control-btn` transition | explicit props + `--cg-transition-duration-fast` + `--cg-transition-easing-default` | ✅ explicit | — |
| 65 | `.control-btn:hover` border/color | `--cg-color-surface-cards-hover-border` / `--cg-color-surface-base-text` | ✅ | — |
| 66 | `.control-btn:active` transform | `scale(var(--cg-interaction-press-scale))` | ✅ | — |
| 67 | `.control-btn:focus-visible` box-shadow | `0 0 0 3px var(--cg-overlay-accent-strong)` | ❌ bare `3px` spread | use `--cg-focus-ring-width` |
| 68 | `.control-btn.active` | `--cg-color-action-primary-background-default` ×2 + `--cg-overlay-accent-subtle` | ✅ | — |
| 71 | `.documents` max-height | `400px` | ❌ magic px | no token (flag, do not invent) |
| 74 | `.doc` padding | `--cg-spacing-16` / `--cg-spacing-20` | ✅ | — |
| 75 | `.doc` border-bottom | `--cg-border-width-50` + `--cg-color-surface-cards-divider` | ✅ | — |
| 77 | `.doc` transition | `background` + `--cg-transition-duration-fast` + `--cg-transition-easing-default` | ✅ explicit | — |
| 79 | `.doc:hover` background | `--cg-overlay-dark-subtle` | ✅ | — |
| 83 | `.doc:focus-visible` box-shadow | `inset 0 0 0 2px var(--cg-overlay-accent-strong)` | ❌ bare `2px` | use `--cg-focus-ring-width` |
| 86 | `.doc-header` gap / margin | `--cg-spacing-12` / `--cg-spacing-4` | ✅ | — |
| 88 | `.doc-type` font-size / weight | `--cg-font-size-xs` / `--cg-font-weight-medium` | ✅ | — |
| 89 | `.doc-type` padding | `--cg-spacing-2` / `--cg-spacing-6` | ✅ | — |
| 89 | `.doc-type` border-radius | `--cg-border-radius-full` | ✅ | — |
| 90 | `.doc-type` letter-spacing | `--cg-letter-spacing-wide` | ✅ | — |
| 91 | `.doc-type` background | `--cg-overlay-accent-light` | ✅ | — |
| 92 | `.doc-type` color | `--cg-color-action-primary-background-default` | ✅ (accent tint) | — |
| 96 | `.doc-title` font-size / weight / color | `--cg-font-size-sm` / `--cg-font-weight-medium` / `--cg-color-surface-base-text` | ✅ | — |
| 101 | `.doc-relevance` font-size / weight | `--cg-font-size-xs` / `--cg-font-weight-medium` | ✅ | — |
| 102 | `.doc-relevance` font-family | `--cg-font-family-mono` | ✅ | — |
| 103 | `.doc-relevance` color | `--cg-color-surface-container-outlined` | ✅ | — |
| 107 | `.doc-source` font-size / color / margin | `--cg-font-size-xs` / `--cg-color-surface-container-outlined` / `--cg-spacing-4` | ✅ | — |
| 111 | `.doc-excerpt` font-size / color | `--cg-font-size-sm` / `--cg-color-surface-base-text` | ✅ | — |
| 111 | `.doc-excerpt` opacity | `0.8` | ❌ bare opacity (no exact token) | flag (no `--cg-opacity-80`) |
| 112 | `.doc-excerpt` line-height | `--cg-line-height-relaxed` | ✅ | — |
| 119 | `.relevance-bar` height | `--cg-spacing-2` | ✅ | — |
| 119 | `.relevance-bar` border-radius | `--cg-border-radius-full` | ✅ | — |
| 120 | `.relevance-bar` background / margin | `--cg-color-surface-cards-border` / `--cg-spacing-12` | ✅ | — |
| 123 | `.relevance-fill` border-radius | `--cg-border-radius-full` | ✅ | — |
| 124 | `.relevance-fill` background | `--cg-color-action-primary-background-default` | ✅ | — |
| 125 | `.relevance-fill` opacity | `0.6` | ❌ bare opacity | use `--cg-opacity-60` |
| 126 | `.relevance-fill` transition | `width` + `--cg-transition-duration-slow` + `--cg-transition-easing-default` | ✅ explicit | — |
| 130 | `.empty` padding | `--cg-spacing-48` / `--cg-spacing-24` | ✅ | — |
| 131 | `.empty` color / font-size | `--cg-color-surface-container-outlined` / `--cg-font-size-sm` | ✅ | — |
| 135 | `:host([rounded="none"])` radius | `0` | ✅ (allowed) | — |
| 136 | `:host([rounded="sm"])` radius | `--cg-border-radius-50` | ✅ | — |
| 137 | `:host([rounded="md"])` radius | `--cg-border-radius-100` | ✅ | — |
| 138 | `:host([rounded="lg"])` radius | `--cg-component-card-radius` | ✅ | — |

### 2. Styling Audit

- **Border radius:** Card uses tier-3 `--cg-component-card-radius`; the `rounded` variants map cleanly to tier-1 radius scale (`50/100/full`). Pills (control buttons, type badges) use `--cg-border-radius-full`. Consistent and tokenized.
- **Spacing:** All padding/gap/margin from the spacing scale (`2/4/6/8/12/16/20/24/48`). No raw px in spacing. Clean.
- **Font-size accessibility:** Body text (`.doc-title`, `.doc-excerpt`, `.empty`) correctly uses `--cg-font-size-sm` (14px) — meets the 14px floor. Metadata chips (`.header-title`, `.header-stats`, `.doc-type`, `.doc-relevance`, `.doc-source`) use `--cg-font-size-xs` (~12px). These are short labels/badges/metadata, an accepted exception, but `.doc-source` is borderline functional text worth watching.
- **Translucent vs solid borders:** Borders use solid semantic card tokens (`--cg-color-surface-cards-border/-divider`). Hover/focus accents use overlay tokens (`--cg-overlay-accent-*`, `--cg-overlay-dark-subtle`) — appropriate translucent layering for dark-first surfaces.
- **Transitions:** All transitions enumerate explicit properties (`border-color`, `color`, `background`, `width`) with duration + easing tokens. No `transition: all`. Motion tokens used. Pairs with `reducedMotion` import. Excellent.
- **Dark-theme suitability:** Surface/overlay/accent token usage is dark-first and theme-agnostic. No hardcoded light assumptions. Strong.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | ✅ | `.doc`, `.control-btn`, `.panel` base styles | — |
| Hover | ✅ | `.control-btn:hover` (border+text), `.doc:hover` (background) | — |
| Active/Press | ✅ | `.control-btn:active` scale via `--cg-interaction-press-scale`; `.control-btn.active` filter selected state | `.doc` has no press feedback (minor) |
| Focus-visible | ✅ | `.control-btn:focus-visible` ring; `.doc:focus-visible` inset ring | Magic `3px`/`2px` spread (§6); uses `--cg-overlay-accent-strong` instead of dedicated `--cg-color-focus-ring` (semantic nit) |
| Disabled | N/A | No interactive disabled affordance — panel is display-oriented; buttons/docs are always actionable | — |
| Loading | N/A | RAG results are passed in via `documents` prop; loading is the parent's responsibility | — |
| Error | N/A | No fetch lifecycle owned by this component | — |
| Success/Empty | ✅ | `.empty` renders "No documents retrieved" when `documents.length === 0` | Good empty state |

Note: This component renders retrieved-document results, not an AI lifecycle state, so the dedicated `--cg-color-ai-*` (thinking/streaming/etc.) family does **not** apply here. The action-primary accent on relevance bar and type badge is appropriate.

### 4. Interaction Audit

- **Keyboard:** `.doc` has `tabindex="0"` and a `keydown` handler activating on `Enter`/`Space` with `preventDefault()` (prevents page scroll on Space). Correct. Filter `.control-btn`s are native `<button>` elements — natively keyboard-operable.
- **ARIA:** Panel has `role="region"` + `aria-label="Retrieved documents"`. Each doc has `role="article"`. Reasonable. Gaps: filter buttons lack `aria-pressed` to expose the active/selected filter state to AT; expandable docs lack `aria-expanded` to convey the collapse/expand toggle. Relevance percentage is visual-only (no `aria-label` on `.doc-relevance`). These are accessibility enhancements, not token violations.
- **CustomEvents:** `ai-rag-document-click` fires with `{ bubbles: true, composed: true }` (crosses shadow boundary correctly) and `detail: { index, document }`. Matches the `@fires` JSDoc. Note: `index` is the index within `_filteredDocs`, and `detail.document` is also resolved from `_filteredDocs[index]` — internally consistent, though consumers should know it is the filtered/sorted index, not the original `documents` index.
- **Touch targets:** `.control-btn` (xs font + `spacing-4` vertical padding) and the `.doc-type` badge fall below the 44px minimum touch target. `.doc` rows are tall enough. Enlarging the filter pills is a design change, noted here (not in fixes).

### 5. Visual Design Check

Modern, sleek, and restrained — reads like a polished retrieval/citations panel. Full-radius filter pills, accent-tinted type badges, a mono relevance readout, and a thin accent relevance bar give it a real "sources" identity. Generous header/row padding provides breathing room; divider tokens separate header, controls, and rows cleanly. Typography hierarchy is clear (uppercase overline header → sm title → xs metadata → relaxed-leading excerpt). Line-clamped excerpts that expand on click are a nice progressive-disclosure touch. The relevance fill at `opacity 0.6` is a tasteful de-emphasis. Showcase-ready for a HeroUI/Vercel-style gallery. One-word verdict: **strong**.

### 6. Fixes Needed

1. **Line 67** — focus ring spread is a bare magic px.
   - current: `box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);`
   - fixed: `box-shadow: 0 0 0 var(--cg-focus-ring-width) var(--cg-overlay-accent-strong);`
   - why: bare `3px` violates the no-magic-px rule; `--cg-focus-ring-width` is the canonical focus-ring thickness token.

2. **Line 83** — inset focus ring spread is a bare magic px.
   - current: `box-shadow: inset 0 0 0 2px var(--cg-overlay-accent-strong);`
   - fixed: `box-shadow: inset 0 0 0 var(--cg-focus-ring-width) var(--cg-overlay-accent-strong);`
   - why: bare `2px` violates the no-magic-px rule; use the focus-ring width token for consistent ring thickness.

3. **Line 125** — relevance fill opacity is a bare numeric literal.
   - current: `opacity: 0.6;`
   - fixed: `opacity: var(--cg-opacity-60);`
   - why: `--cg-opacity-60` resolves to exactly `0.6`; tokenizes the de-emphasis instead of a magic number.

**Flags (no verified token replacement — not auto-fixed):**
- **Line 71** `max-height: 400px` — magic px. No existing height token matches; would require a new tier-3 token (e.g. a documents-list max-height) rather than inventing one inline.
- **Line 111** `opacity: 0.8` — magic numeric opacity with no exact token (nearest is `--cg-opacity-75` = 0.75, which would change the value). Either accept a slight visual shift to `--cg-opacity-75` or add an `--cg-opacity-80` token; left as a flag.
- **Lines 67/83 (semantic)** — focus ring color uses `--cg-overlay-accent-strong`; consider the dedicated `--cg-color-focus-ring` for consistency with the focus-ring system (both are valid tokens, so not counted as a violation).
- **a11y (non-token):** add `aria-pressed` to filter buttons, `aria-expanded` to expandable doc rows, and an accessible label for the relevance percentage; enlarge filter-pill touch targets toward 44px.

### Research-backed enhancements

Grounded in 2025-era retrieval/citation panel patterns from the Vercel AI SDK "tool-call card" primitives, HeroUI v3, Linear, and shadcn/ui-adjacent registries (Cult UI, shadcn.io AI components). Each suggestion targets *this* component's actual structure (`.doc` rows, `.relevance-fill`, `.controls`, the `documents`-prop contract).

1. **Numbered, jump-to-source citation anchors on each `.doc` row.** The dominant Perplexity / Vercel AI SDK pattern is inline numbered citation chips (`[1] [2]`) that link the answer text back to the retrieved source. Add a small mono `[n]` index marker in `.doc-header` (reuse `--cg-font-family-mono`, the same readout style as `.doc-relevance`) and fire a hover/focus `ai-rag-citation-highlight` event so a paired answer pane can cross-highlight. This turns the panel from a passive list into the "sources" half of a cited-answer pair, which is the defining interaction of modern RAG UIs. *(Source: Vercel AI SDK tool-call/citation card primitives; Perplexity-style source-citation pattern.)*

2. **Streaming skeleton rows instead of an absent loading state.** The audit correctly notes loading is "the parent's responsibility," but 2025 retrieval panels (shadcn.io AI components, Cult UI) ship a first-class `loading` affordance: 2-3 shimmer `.doc` placeholders with a pulsing `.relevance-bar`. Add a `loading` boolean attribute that renders skeleton rows (animated via the existing motion tokens + `reducedMotion` guard already imported). RAG retrieval is inherently latency-bound, so an owned skeleton state materially improves perceived performance versus a blank panel. *(Source: shadcn.io / Cult UI AI loading-skeleton blocks.)*

3. **Relevance score as a perceptual color ramp, not a single accent.** Currently every `.relevance-fill` is `action-primary` at `opacity 0.6`. HeroUI v3 and Linear use graded status color to encode magnitude at a glance. Map relevance buckets to semantic status tokens — e.g. high → `--cg-color-status-success-*`, mid → accent, low → `--cg-color-status-warning-*` — so a user scanning ten sources instantly sees which are strong matches. Keep the mono percentage as the exact readout; the bar color becomes the pre-attentive cue. *(Source: HeroUI v3 / Linear graded-status color usage.)*

4. **Higher-density "compact" layout variant.** Header/row padding (`spacing-16`/`spacing-20`) reads as comfortable but consumes vertical space; a RAG panel often shows 8-20 sources in a sidebar. Linear's hallmark is a density toggle. Add a `density="compact"` host attribute that drops row padding to `spacing-8`/`spacing-12`, hides the excerpt until hover/expand, and tightens `.documents max-height`. This also gives the flagged `max-height: 400px` magic value a reason to become a tier-3 token pair (comfortable vs compact). *(Source: Linear list-density pattern.)*

5. **Expand/collapse with a real disclosure affordance + animated height.** Excerpts already line-clamp and expand on click, but there is no visual signal that a row is expandable (the §4 `aria-expanded` gap mirrors a *visual* gap). Add a chevron in `.doc-header` that rotates on toggle (transition `transform` with the existing easing tokens, not `transition: all`) and animate the excerpt's `grid-template-rows: 0fr → 1fr` for a smooth reveal — the modern shadcn/Radix collapsible technique that animates height without measuring pixels. *(Source: Radix/shadcn collapsible `grid-rows` animation pattern.)*

6. **Press feedback on `.doc` rows for parity with `.control-btn`.** §3 flags that `.doc` has no press state. Modern click targets (HeroUI, Cult UI cards) give every actionable surface tactile feedback. Add `.doc:active { transform: scale(var(--cg-interaction-press-scale)); }` — the exact token already used on `.control-btn:active` — so the primary clickable element (a source row that fires `ai-rag-document-click`) confirms the tap. Zero new tokens. *(Source: HeroUI/Cult UI interactive-card press affordance.)*

Sources: [Vercel AI SDK / shadcn.io AI components](https://www.shadcn.io/), [HeroUI v3](https://heroui.com/), [Cult UI](https://www.cult-ui.com/), [shadcn/ui](https://ui.shadcn.com/), [RAG Web UI reference](https://github.com/rag-web-ui/rag-web-ui).
