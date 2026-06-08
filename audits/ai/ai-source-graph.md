## ai-source-graph — Manual Review

Source attribution panel: numbered source list with type badges, weight bars, and expandable excerpts. Reviewed line-by-line against the authoritative token vocab.

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 38 | animation duration | `var(--cg-transition-duration-fast)` | Yes | — |
| 38 | animation easing | `var(--cg-transition-easing-ease-out)` | Yes | — |
| 42 | background | `var(--cg-color-surface-cards-background)` | Yes | — |
| 43 | border width | `var(--cg-border-width-50)` | Yes | — |
| 43 | border color | `var(--cg-color-surface-cards-border)` | Yes | — |
| 44 | border-radius | `var(--cg-border-radius-150)` | Yes | — |
| 52 | gap | `var(--cg-spacing-8)` | Yes | — |
| 53 | padding | `var(--cg-spacing-12) var(--cg-spacing-16)` | Yes | — |
| 54 | border-bottom | `var(--cg-border-width-50) … var(--cg-color-surface-cards-divider)` | Yes | — |
| 57 | font-size | `var(--cg-font-size-sm)` | Yes (14px body min OK) | — |
| 58 | font-weight | `var(--cg-font-weight-bold)` | Yes | — |
| 59 | color | `var(--cg-color-surface-base-text)` | Yes | — |
| 63 | font-size | `var(--cg-font-size-xs)` | Yes (count meta, not body) | — |
| 64 | color | `var(--cg-color-input-text-placeholder)` | Acceptable (muted) | — |
| 76 | gap | `var(--cg-spacing-12)` | Yes | — |
| 77 | padding | `var(--cg-spacing-12) var(--cg-spacing-16)` | Yes | — |
| 78 | border-bottom | `var(--cg-border-width-50) … var(--cg-color-surface-cards-divider)` | Yes | — |
| 80-81 | transition | `background var(--cg-transition-duration-fast) var(--cg-transition-easing-default)` | Yes (explicit, not `all`) | — |
| 84 | hover background | `var(--cg-overlay-dark-subtle)` | Yes (tier-1 overlay wash, valid) | — |
| 87 | focus box-shadow | `inset 0 0 0 2px var(--cg-color-focus-ring)` | Color OK; `2px` is a bare magic px | Flagged (see §6) |
| 92-93 | width/height | `var(--cg-spacing-24)` | Yes | — |
| 94 | border-radius | `var(--cg-border-radius-full)` | Yes | — |
| 95 | background | `var(--cg-color-surface-container-background)` | Yes | — |
| 96 | border | `var(--cg-border-width-50) … var(--cg-color-surface-cards-border)` | Yes | — |
| 101 | font-size | `var(--cg-font-size-xs)` | Yes (footnote numeral) | — |
| 102 | font-weight | `var(--cg-font-weight-bold)` | Yes | — |
| 103 | color | `var(--cg-color-surface-base-text)` | Yes | — |
| 104 | font-family | `var(--cg-font-family-mono)` | Yes | — |
| 112 | gap | `var(--cg-spacing-8)` | Yes | — |
| 115 | font-size | `var(--cg-font-size-sm)` | Yes (title, 14px) | — |
| 116 | font-weight | `var(--cg-font-weight-semibold)` | Yes | — |
| 117 | color | `var(--cg-color-surface-base-text)` | Yes | — |
| 118 | line-height | `var(--cg-line-height-tight)` | Yes | — |
| 131 | gap | `var(--cg-spacing-6)` | Yes | — |
| 135 | width | `var(--cg-spacing-48)` | Yes | — |
| 136 | height | `var(--cg-spacing-4)` | Yes | — |
| 137 | background (track) | `var(--cg-color-surface-cards-border)` | Yes | — |
| 138 | border-radius | `var(--cg-border-radius-full)` | Yes | — |
| 143 | border-radius | `var(--cg-border-radius-full)` | Yes | — |
| 144 | fill background | `var(--cg-color-action-primary-background-default)` | Acceptable (semantic accent for weight) | — |
| 145 | transition | `width var(--cg-transition-duration-default) var(--cg-transition-easing-default)` | Yes (explicit) | — |
| 148 | font-size | `var(--cg-font-size-xs)` | Yes (numeric label) | — |
| 149 | font-family | `var(--cg-font-family-mono)` | Yes | — |
| 150 | color | `var(--cg-color-input-text-placeholder)` | Acceptable (muted) | — |
| 151 | min-width | `var(--cg-spacing-32)` | Yes | — |
| 157 | font-size | `var(--cg-font-size-xs)` | Borderline (excerpt is body copy → ideally `sm`) | Flagged (see §6) |
| 158 | color | `var(--cg-color-input-text-placeholder)` | Acceptable (muted) | — |
| 159 | line-height | `var(--cg-line-height-normal)` | Yes | — |
| 160 | margin-top | `var(--cg-spacing-4)` | Yes | — |
| 173 | padding | `var(--cg-spacing-32)` | Yes | — |
| 174 | color | `var(--cg-color-input-text-placeholder)` | Acceptable (muted) | — |
| 175 | font-size | `var(--cg-font-size-sm)` | Yes | — |
| 179 | border-radius | `0` | Yes (none variant) | — |
| 180 | border-radius | `var(--cg-border-radius-50)` | Yes | — |
| 181 | border-radius | `var(--cg-border-radius-100)` | Yes | — |
| 182 | border-radius | `var(--cg-border-radius-150)` | Yes | — |
| 230 | inline style width | `${Math.round(s.weight*100)}%` | Yes (runtime %, allowed) | — |

### 2. Styling Audit

- **Border radius:** Panel uses `--cg-border-radius-150` with a clean `rounded` variant ladder (none/50/100/150). Footnote and weight bar use `--cg-border-radius-full`. Consistent, token-driven.
- **Spacing:** Entirely on the spacing scale (4/6/8/12/16/24/32/48). No magic spacing values.
- **Font-size accessibility:** Header title (line 57), source title (line 115), and empty state (line 175) all use `--cg-font-size-sm` (14px) — compliant. The **excerpt body copy** (line 157) uses `--cg-font-size-xs` (~12px). Excerpts are readable prose, so this is below the 14px body-text minimum and should be `--cg-font-size-sm`. Footnote numeral, count, and weight % label at `xs` are fine (they are numeric/meta labels, not body copy).
- **Translucent vs solid borders:** Card borders use solid semantic surface tokens. Hover uses `--cg-overlay-dark-subtle` (translucent wash) — appropriate and valid.
- **Transitions:** Both transitions (lines 80-81, 145) enumerate explicit properties (`background`, `width`). No `transition: all`. Motion uses duration + easing tokens. Honors `reducedMotion` via shared style import. Compliant.
- **Dark-theme suitability:** All colors flow through tier-2 semantic surface/action tokens, so theme-adaptive. Strong.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.source` row, sorted by weight desc | — |
| Hover | Yes | `.source:hover` background wash (line 84) | — |
| Active/Press | No | No `:active` style | Minor: no press feedback on a clickable row; acceptable but a subtle active state would polish |
| Focus-visible | Yes | `.source:focus-visible` inset box-shadow ring (lines 85-88) | Ring spread is hard-coded `2px` (see §6) |
| Disabled | N/A | Sources are read-only attribution items; no disabled concept | — |
| Loading | N/A | Component renders provided `sources`; no async/streaming state of its own | — |
| Error | N/A | No error surface; data is passed in | — |
| Success | N/A | Not applicable to an attribution list | — |
| Empty | Yes (bonus) | `.empty` "No sources" panel (lines 171-176, 199-200) | Good — empty state handled |
| Expanded | Yes (bonus) | `.source.expanded .excerpt` un-clamps to full text (lines 166-169) | Good |

No AI lifecycle state (thinking/streaming/cached/etc.) is surfaced by this component, so the dedicated `--cg-color-ai-*` family does not apply here.

### 4. Interaction Audit

- **Keyboard:** Each `.source` row is `tabindex="0"` and handles `Enter` / `Space` with `preventDefault()` to toggle expansion (line 218). Good. The inner anchor (line 223) is natively focusable and `stopPropagation`s its click so it doesn't also toggle the row — correct.
- **ARIA:** Panel is `role="list"` with `aria-label="Source attribution"` (line 206); rows are `role="listitem"` (line 216). Reasonable semantics. Gap: expandable rows do not expose `aria-expanded`, so screen-reader users get no state cue that activating the row expands an excerpt. Recommend adding `aria-expanded` reflecting `isExpanded` on rows that have an excerpt.
- **CustomEvents:** `ai-source-click` dispatched with `bubbles: true, composed: true` and a `detail` of `{ id, title, type, weight }` (lines 192-195) — matches the `@fires` JSDoc (line 17). Correct and composed for Shadow DOM.
- **Touch targets:** Rows have `padding: 12px 16px` plus content height, comfortably ≥44px tall — good. The footnote chip is 24px but is not an independent target (whole row is the target). The weight bar is decorative. No sub-44px interactive target issue.

### 5. Visual Design Check

Modern and sleek: numbered footnote chips, monospace weight labels, a thin weight-fill bar, type badges, and Perplexity-style excerpt expansion read as a polished citation panel. Radius is tokenized with a variant ladder. Breathing room is good (12/16 padding, clear row dividers via `--cg-color-surface-cards-divider`). Typography hierarchy is clear (bold header, semibold titles, mono numerics, muted meta). Dark-first via semantic tokens. Only refinements: excerpt font-size should hit the 14px body minimum, and an optional `:active` press state would add tactile polish. **Verdict: strong.**

### 6. Fixes Needed

1. **Line 157 — excerpt body copy below 14px minimum.** Current: `font-size: var(--cg-font-size-xs);` → Fixed: `font-size: var(--cg-font-size-sm);`. Excerpts are readable prose (body copy), which must meet the 14px (`--cg-font-size-sm`) accessibility floor; `xs` (~12px) is too small for running text.

**Flag (not auto-fixed — no clean token replacement):**
- **Line 87 — hard-coded `2px` focus-ring spread.** `box-shadow: inset 0 0 0 2px var(--cg-color-focus-ring);` uses a bare magic px for the ring thickness. Tier-1 offers `--cg-outline-width-default` / `--cg-outline-width-thick`, but those are outline-width tokens whose resolved values were not confirmed to equal the intended 2px ring, so no substitution is proposed here. Recommend converting the ring to an `outline` using an outline-width token, or confirming the token value before swapping the `2px` spread.
- **Lines 216-218 — missing `aria-expanded`.** Expandable rows toggle an excerpt but never expose `aria-expanded`, so the expand/collapse state is invisible to assistive tech. Add `aria-expanded=${isExpanded}` on rows that have an excerpt. (Markup/a11y change, not a token fix.)

### Research-backed enhancements

One focused scan of 2025-era citation/source UI (Perplexity, Vercel AI SDK "AI Elements", shadcn/ui, ShapeofAI patterns) surfaced these concrete upgrades for THIS component. Each maps to our token system and the gaps already flagged above.

1. **Favicon / origin glyph on each row for at-a-glance scanning.** Vercel's `InlineCitation` and the shadcn/ui inline-citation primitive both lead with the source domain + favicon so users judge relevance before reading; ShapeofAI's citation guidance explicitly calls out "titles, site names, and favicons help users quickly judge relevance." Today our rows lead with a numeric footnote chip (line 92-104) and a type badge — useful, but no origin signal. Add a small (`--cg-spacing-16` box) favicon/origin glyph slot left of the title, falling back to the existing type badge when no favicon resolves. Keeps the numbered chip as the citation anchor but adds the fastest scanning cue.

2. **Hover preview popover instead of (or layered on) click-to-expand.** Perplexity and AI Elements both surface the full source detail on *hover* of the citation pill, reserving click for navigation — "hover for a short preview or click through to the full source" (ShapeofAI). Our excerpt is gated behind a click-toggle only (lines 216-218), which hides the single most useful content (the quote) until interaction. Add a hover/focus-triggered preview of the excerpt + URL using our existing `--cg-color-surface-cards-background` / `--cg-border-radius-150` / `--cg-overlay-dark-subtle` tokens, with a `--cg-transition-duration-fast` fade. Click still pins/expands inline for keyboard and touch (which have no hover) — so this layers on top of, not replaces, the current affordance.

3. **Carousel/stepper when one claim has multiple sources.** Both the shadcn/ui and Vercel AI Elements inline-citation components ship prev/next carousel navigation with a live "2 / 5" index when a single claim is backed by multiple sources. Our component renders a flat weight-sorted list with no notion of grouping by claim. If the data model supports `claimId` grouping, render grouped sources as a compact stepper inside one row (mono index label reusing `--cg-font-family-mono`, `--cg-font-size-xs`) rather than N sibling rows — reduces vertical density on multi-source answers.

4. **Animated weight-bar fill on mount / data change (Linear/Vercel motion idiom).** The weight bar already transitions `width` (line 145) but only reacts to runtime changes; modern dashboards (Linear, Vercel analytics) animate bars *from zero on first paint* to communicate "freshly computed." Stagger each row's fill by a small per-index delay using the existing `--cg-transition-duration-default` + `--cg-transition-easing-ease-out`, gated behind the `reducedMotion` guard already imported. Pure polish, zero new tokens.

5. **Subtle `:active` press state for tactile feedback.** Flagged as missing in §3. shadcn/Vercel rows use a momentary translucent darken on press. Add `.source:active { background: var(--cg-overlay-dark-strong); }` (or reuse the hover wash one step stronger) so pointer/touch users get a press confirmation distinct from hover. Resolves the §3 "Active/Press: No" row with a token-only change.

6. **Density toggle (comfortable / compact).** Linear and Vercel surfaces increasingly expose a list-density switch. With long source lists the current `--cg-spacing-12 --cg-spacing-16` padding gets tall. Add a `density` prop that swaps row padding to `--cg-spacing-6 --cg-spacing-12` and clamps the excerpt preview, so dense citation panels (10+ sources) stay scannable without scrolling. Tier-3 component padding tokens would be the clean home for the two density values.

Sources: [shadcn/ui Inline Citation](https://www.shadcn.io/ai/inline-citation), [Inline Citation — AI Elements (Vercel AI SDK)](https://elements.ai-sdk.dev/components/inline-citation), [Citations — ShapeofAI.com](https://www.shapeof.ai/patterns/citations), [Perplexity Platform Guide: Citation-Forward Answers](https://www.unusual.ai/blog/perplexity-platform-guide-design-for-citation-forward-answers), [shadcn/ui](https://ui.shadcn.com/).
