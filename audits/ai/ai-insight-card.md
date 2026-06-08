## ai-insight-card — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 23 | `:host` display | `block` | Yes | — keyword |
| 27 | `.card` gap | `var(--cg-spacing-16)` | Yes | — |
| 28 | `.card` padding | `var(--cg-spacing-20)` | Yes | — (tier-3 `--cg-component-card-padding-md` would be preferred; spacing token acceptable) |
| 29 | `.card` background | `var(--cg-color-surface-cards-background)` | Yes | — tier-2 semantic |
| 30 | `.card` border | `var(--cg-border-width-50)` + `var(--cg-color-surface-cards-border)` | Yes | — |
| 31 | `.card` border-radius | `var(--cg-component-card-radius)` | Yes | — tier-3 |
| 34-37 | `.card` transition | explicit `border-color`/`transform`/`box-shadow` with `--cg-transition-duration-fast` + `--cg-transition-easing-default` | Yes | — explicit list, not `all` |
| 40 | `.card:hover` border-color | `var(--cg-color-surface-cards-hover-border)` | Yes | — |
| 41 | `.card:hover` transform | `translateY(-1px)` | Borderline | bare `-1px` lift; matches library `--cg-interaction-hover-lift` (-1px) but token not in vocab — leave as raw multiplier-style lift (flag, no verified token) |
| 43 | `.card:active` transform | `scale(var(--cg-interaction-press-scale))` | Yes | — real tier-1 interaction token (0.97, confirmed in dist) |
| 46 | `.card:focus-visible` box-shadow | `0 0 0 3px var(--cg-overlay-accent-strong)` | **No** | Wrong focus color family. Use `--cg-color-focus-ring` (dedicated semantic token; sibling `ai-alert-card` uses exactly this). Bare `3px` spread = flag (see §2/§6). |
| 50 | `.card.selected` border-color | `var(--cg-color-action-primary-background-default)` | Yes | — |
| 51 | `.card.selected` background | `var(--cg-overlay-accent-subtle)` | Yes | — tier-1 overlay, acceptable for accent wash |
| 57-58 | `.status-dot` top/right | `var(--cg-spacing-12)` | Yes | — |
| 59-60 | `.status-dot` width/height | `var(--cg-spacing-6)` | Yes | — |
| 61 | `.status-dot` border-radius | `var(--cg-border-radius-full)` | Yes | — |
| 63 | `.status-dot.new` background | `var(--cg-color-action-primary-background-default)` | Yes | — |
| 64 | `.status-dot.read` background | `var(--cg-color-input-text-placeholder)` | Yes | — (muted; acceptable) |
| 68-69 | `.icon-area` width/height | `var(--cg-spacing-40)` | Yes | — |
| 70 | `.icon-area` border-radius | `var(--cg-border-radius-full)` | Yes | — |
| 76 | `.icon-area svg` width/height | `var(--cg-icon-size-100)` | Yes | — (selector unused; icons render via `<cg-icon>`) |
| 77 | `.icon-area.explanation` bg/border/color | `--cg-color-status-info-*` | Yes | — semantic status, type-appropriate |
| 78 | `.icon-area.forecast` bg/border/color | `--cg-overlay-accent-light` / `--cg-overlay-accent-medium` / `--cg-color-surface-base-text` | Yes | — accent wash, acceptable |
| 79 | `.icon-area.anomaly` bg/border/color | `--cg-color-status-error-*` | Yes | — |
| 80 | `.icon-area.optimization` bg/border/color | `--cg-color-status-warning-*` | Yes | — |
| 81 | `.icon-area.classification` bg/border/color | `--cg-color-status-success-*` | Yes | — |
| 86 | `.type-label` font-size | `var(--cg-font-size-xs)` | Yes | — label/uppercase, <14px allowed for non-body label |
| 87 | `.type-label` font-weight | `var(--cg-font-weight-medium)` | Yes | — |
| 89 | `.type-label` letter-spacing | `var(--cg-letter-spacing-wide)` | Yes | — real tier-1 token (0.025em, confirmed in dist) |
| 90 | `.type-label` color | `var(--cg-color-input-text-placeholder)` | Yes | — muted label |
| 91 | `.type-label` margin-bottom | `var(--cg-spacing-4)` | Yes | — |
| 95 | `.insight-text` font-size | `var(--cg-font-size-sm)` | Yes | — body text = 14px min, compliant |
| 96 | `.insight-text` color | `var(--cg-color-surface-base-text)` | Yes | — |
| 97 | `.insight-text` line-height | `var(--cg-line-height-normal)` | Yes | — |
| 112 | `.meta` gap | `var(--cg-spacing-8)` | Yes | — |
| 113 | `.meta` margin-top | `var(--cg-spacing-12)` | Yes | — |
| 114 | `.meta` padding-top | `var(--cg-spacing-8)` | Yes | — |
| 115 | `.meta` border-top | `var(--cg-border-width-50)` + `var(--cg-color-surface-cards-border)` | Yes | — |
| 116 | `.meta` font-size | `var(--cg-font-size-xs)` | Yes | — meta caption, acceptable |
| 117 | `.meta` color | `var(--cg-color-input-text-placeholder)` | Yes | — |
| 120-121 | `.meta-dot` width/height | `var(--cg-spacing-2)` | Yes | — |
| 122 | `.meta-dot` border-radius | `var(--cg-border-radius-full)` | Yes | — |
| 123 | `.meta-dot` background | `var(--cg-color-input-text-placeholder)` | Yes | — |
| 125 | `.confidence` font-weight | `var(--cg-font-weight-medium)` | Yes | — |
| 129 | `.detail` margin-top | `var(--cg-spacing-12)` | Yes | — |
| 130 | `.detail` padding-top | `var(--cg-spacing-12)` | Yes | — |
| 131 | `.detail` border-top | `var(--cg-border-width-50)` + `var(--cg-color-surface-cards-border)` | Yes | — |
| 132 | `.detail` animation | `--cg-transition-duration-default` + `--cg-transition-easing-ease-out` | Yes | — |
| 135-136 | `@keyframes detailReveal` | `translateY(-4px)` / `translateY(0)` | Yes | — keyframe geometry, exempt |
| 139 | `.sources-label` font-size | `var(--cg-font-size-xs)` | Yes | — label |
| 140 | `.sources-label` font-weight | `var(--cg-font-weight-medium)` | Yes | — |
| 141 | `.sources-label` color | `var(--cg-color-input-text-placeholder)` | Yes | — |
| 142 | `.sources-label` margin-bottom | `var(--cg-spacing-8)` | Yes | — |
| 144 | `.sources-label` letter-spacing | `var(--cg-letter-spacing-wide)` | Yes | — real token |
| 149 | `.source` gap | `var(--cg-spacing-6)` | Yes | — |
| 150 | `.source` padding | `var(--cg-spacing-4) 0` | Yes | — |
| 151 | `.source` font-size | `var(--cg-font-size-xs)` | Yes | — |
| 152 | `.source` color | `var(--cg-color-input-text-placeholder)` | Yes | — |
| 155 | `.source a` color | `var(--cg-color-surface-base-text)` | Yes | — |
| 157 | `.source a` font-weight | `var(--cg-font-weight-medium)` | Yes | — |
| 162 | `.source a:focus-visible` box-shadow | `0 0 0 3px var(--cg-overlay-accent-strong)` | **No** | Same as line 46: use `--cg-color-focus-ring`; `3px` flag |
| 163 | `.source a:focus-visible` border-radius | `var(--cg-border-radius-50)` | Yes | — |
| 165 | `.source-dot` width/height | `var(--cg-spacing-4)` | Yes | — |
| 165 | `.source-dot` border-radius | `var(--cg-border-radius-full)` | Yes | — |
| 166 | `.source-dot.high` background | `var(--cg-color-status-success-text-default)` | Yes | — relevance = success |
| 167 | `.source-dot.medium` background | `var(--cg-color-status-warning-text-default)` | Yes | — |
| 168 | `.source-dot.low` background | `var(--cg-color-input-text-placeholder)` | Yes | — |
| 173 | `.actions` gap | `var(--cg-spacing-4)` | Yes | — |
| 175-176 | `.actions` top/right | `var(--cg-spacing-8)` | Yes | — |
| 178 | `.actions` transition | explicit `opacity` + `--cg-transition-duration-fast` + `--cg-transition-easing-default` | Yes | — |
| 185 | `.skeleton` gap | `var(--cg-spacing-16)` | Yes | — |
| 186 | `.skeleton` padding | `var(--cg-spacing-20)` | Yes | — |
| 187 | `.skeleton` background | `var(--cg-color-surface-cards-background)` | Yes | — |
| 188 | `.skeleton` border | `var(--cg-border-width-50)` + `var(--cg-color-surface-cards-border)` | Yes | — |
| 189 | `.skeleton` border-radius | `var(--cg-component-card-radius)` | Yes | — |
| 192 | `.skel-icon` width/height | `var(--cg-spacing-40)` | Yes | — |
| 193 | `.skel-icon` border-radius | `var(--cg-border-radius-50)` | Yes | — |
| 194 | `.skel-icon` gradient | `--cg-color-surface-container-background` / `--cg-color-surface-container-border` | Yes | — shimmer stops, semantic |
| 196 | `.skel-icon` animation | `shimmer 1.5s linear infinite` | Borderline | bare `1.5s` shimmer duration; no shimmer-duration token in vocab — flag only |
| 198 | `.skel-lines` gap | `var(--cg-spacing-8)` | Yes | — |
| 200 | `.skel-line` height | `var(--cg-spacing-8)` | Yes | — |
| 201 | `.skel-line` border-radius | `var(--cg-border-radius-50)` | Yes | — |
| 202 | `.skel-line` gradient | container tokens | Yes | — |
| 204 | `.skel-line` animation | `shimmer 1.5s linear infinite` | Borderline | same as 196 |
| 206-208 | `.skel-line:nth-child` width | `40%` / `90%` / `60%` | Yes | — `%`, exempt |

### 2. Styling Audit

- **Border radius:** Card and skeleton use `--cg-component-card-radius` (tier-3, correct). Dots use `--cg-border-radius-full`; focus-ring + skeleton inner use `--cg-border-radius-50`. Consistent and tokenized.
- **Spacing:** Entirely from the `--cg-spacing-*` scale. No magic spacing values. Card padding uses `--cg-spacing-20` rather than the tier-3 `--cg-component-card-padding-md` — acceptable but tier-3 would be more precise.
- **Font-size accessibility:** Body insight text is `--cg-font-size-sm` (14px) — meets the 14px minimum. All `xs` usages are uppercase labels, meta captions, and source links (non-body), which are acceptable below 14px.
- **Translucent vs solid borders:** Card/meta/detail borders use `--cg-color-surface-cards-border` (semantic, theme-aware). Good.
- **Transitions:** Explicit property lists on `.card` (border-color, transform, box-shadow) and `.actions` (opacity). No `transition: all`. Motion uses `--cg-transition-duration-*` and `--cg-transition-easing-*` tokens. `prefers-reduced-motion` block disables hover transform and detail animation — excellent.
- **Magic values flagged (no verified replacement token):** `translateY(-1px)` hover lift (line 41), `1.5s` shimmer duration (lines 196/204), and the `3px` focus-ring spread (lines 46/162). None has a confirmed vocab token, so these are flags, not auto-fixes.
- **Dark-theme suitability:** All colors are tier-2 semantic / tier-1 overlay tokens that adapt per theme. Dark-first compliant.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.card` base style; `loading`/empty short-circuit render | — |
| Hover | Yes | `.card:hover` border-color + `translateY(-1px)`; reveals `.actions` | `-1px` raw lift (flag) |
| Active/Press | Yes | `.card:active` → `scale(var(--cg-interaction-press-scale))` | — |
| Focus-visible | Yes | `.card:focus-visible` + `.source a:focus-visible` box-shadow ring | Uses `--cg-overlay-accent-strong` instead of `--cg-color-focus-ring` (fix); `:focus-within` also reveals actions |
| Disabled | N/A | No disabled concept — insight cards are always actionable/dismissable | — |
| Loading | Yes | `loading` prop renders `.skeleton` shimmer with `aria-label="Loading insight"` | — |
| Error | N/A | This card surfaces insight *types* (incl. `anomaly`/`error`-styled icon), not an AI lifecycle error state; no async failure path here | — |
| Success | N/A | No submit/async-success semantics; `classification` type uses success-styled icon for categorization, not a success state | — |

Note on AI-state family: this component models insight *categories* (explanation/forecast/anomaly/optimization/classification), not AI lifecycle phases (thinking/streaming/reasoning/cached/complete/error/rate-limited). The `--cg-color-ai-*` family does **not** apply here; the status-color mapping for type icons is appropriate.

### 4. Interaction Audit

- **Keyboard:** `_handleKeyDown` handles `Enter` and `Space` (with `preventDefault`) → `_handleClick`. Card has `tabindex="0"`. Source links are native `<a>` (natively focusable). Bookmark/dismiss are `<cg-button>` (own keyboard handling). Good coverage.
- **ARIA:** `role="article"`, `aria-label="${type} insight"`, `aria-expanded` set only when `expandable` (correctly omitted otherwise via `nothing`). Status dot, icon-area are `aria-hidden`. Skeleton has `aria-label`. Solid.
- **CustomEvents:** `ai-insight-click` (detail: type, text, confidence), `ai-insight-expand` (detail: expanded, type — JSDoc claims `text` too, minor doc drift), `ai-insight-dismiss` / `ai-insight-bookmark` (detail: type, text). All `bubbles` + `composed`. Dismiss/bookmark `stopPropagation` to avoid triggering card click. Correct.
- **Touch targets:** Card itself is large. Bookmark/Dismiss are `cg-button size="sm"` — likely <44px touch target. This is a sizing/design concern (enlargement), not a token violation — noted, not in fixes.

### 5. Visual Design Check

- **Modern/sleek?** Yes — type-colored circular icon badge, two-line clamp with expand, divider-separated meta row, hover-revealed action affordances, relevance-dotted sources, and a polished shimmer skeleton.
- **Radius:** Tokenized card radius + full-round dots. Coherent.
- **Breathing room:** `--cg-spacing-20` padding, `--cg-spacing-16` gap — generous and balanced.
- **Dividers:** Semantic `border-top` separators on meta and detail sections — clean hierarchy.
- **Typography hierarchy:** Uppercase tracked type-label → 14px insight body → xs muted meta/sources. Clear three-level hierarchy.
- **HeroUI/Vercel showcase-ready?** Yes, with the focus-ring color corrected.
- **Verdict:** strong

### 6. Fixes Needed

1. **Line 46** — `.card:focus-visible` uses the wrong focus color family.
   - Current: `box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);`
   - Fixed: `box-shadow: 0 0 0 3px var(--cg-color-focus-ring);`
   - Why: `--cg-color-focus-ring` is the dedicated tier-2 semantic focus token used across the library (e.g. `ai-alert-card`, `ai-citation`, `cg-button`). The accent overlay is not the focus semantic. (`--cg-color-focus-ring` verified in vocab.)

2. **Line 162** — `.source a:focus-visible` same issue.
   - Current: `box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);`
   - Fixed: `box-shadow: 0 0 0 3px var(--cg-color-focus-ring);`
   - Why: same as above — semantic focus token.

**Flags (no verified replacement token — not auto-fixed):**
- Bare `3px` spread in both focus rings (lines 46, 162). No focus-ring-width token in vocab; sibling components also use literal `3px`, so left as-is. (`--cg-border-width-300` is a possible tokenized equivalent but changes the value semantics; defer to token team.)
- `translateY(-1px)` hover lift (line 41) — matches the library `--cg-interaction-hover-lift` (-1px) but that token is absent from the vocab files; not migrated.
- `1.5s` shimmer durations (lines 196, 204) — no shimmer-duration token available.
- Bookmark/Dismiss `cg-button size="sm"` may fall below the 44px touch target (design/sizing concern, not a token violation).

### Research-backed enhancements

Sourced from current shadcn/ui, HeroUI v3, and Vercel/Linear-era card conventions ([shadcn Card](https://ui.shadcn.com/), [HeroUI Card](https://heroui.com/en/docs/react/components/card), [Shadcn Studio Card](https://shadcnstudio.com/docs/components/card), [Vercel Academy: shadcn anatomy](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components)).

1. **Make the hover-reveal of `.actions` keyboard- and touch-discoverable, not hover-only.** The shadcn/HeroUI clickable-card pattern explicitly warns that hover-gated affordances must "remain visually understandable" in non-hover contexts. Right now bookmark/dismiss only fade in on `:hover`/`:focus-within` — invisible to touch users and on first tab. Render `.actions` at `opacity: 0.55` at rest (cards already lift on hover, so the controls won't compete) and ramp to `1` on hover/focus, OR keep them hidden but add a persistent overflow trigger. This also lets you keep the existing `opacity` transition. (shadcn clickable-card guidance.)

2. **Add a pointer-tracked accent glow / radial spotlight on hover.** The signature Linear/Vercel-2025 card move is a cursor-following radial highlight (a `radial-gradient` driven by `--mouse-x`/`--mouse-y` CSS custom props updated on `pointermove`). On the type-colored insight card this reads as the icon-area accent "bleeding" toward the cursor. Cheap (one extra `::before` layer, GPU-composited), and it upgrades the flat `translateY(-1px)` lift into a premium interaction. Gate it behind `prefers-reduced-motion`. (Linear/Vercel hover-card metadata-overlay convention.)

3. **Replace the binary expand with a graceful height/opacity reveal + chevron rotation affordance.** The `detailReveal` keyframe currently does a `translateY(-4px)` fade but there's no visible expand affordance on the card surface — modern cards (HeroUI/shadcn collapsible) telegraph expandability with a rotating chevron that animates `transform: rotate(180deg)` synced to `aria-expanded`. Add a small chevron to the meta row when `expandable`, driving discoverability of the detail panel that today is hidden behind an unsignposted click. (HeroUI/shadcn collapsible-card pattern.)

4. **Stabilize skeleton-to-content with fixed-height shimmer rows matching final type metrics.** Current best practice ("skeleton states prevent layout shift while maintaining consistent card heights for grid readability") is undercut here because the skeleton uses generic `--cg-spacing-8` line heights that don't match the real 14px insight body line-box, so the card reflows on load. Size `.skel-line` to the resolved `--cg-font-size-sm` × `--cg-line-height-normal` and reserve the meta-row height, so the swap is jump-free in a dashboard grid. (shadcn skeleton/no-layout-shift guidance.)

5. **Add a contextual quick-preview on the confidence/relevance dots.** HeroUI promotes hover-card overlays that surface "contextual previews and metadata without navigating away." The relevance dots (`.source-dot.high/medium/low`) and the `.confidence` value are currently silent — a lightweight popover/title on hover/focus explaining the confidence basis (or source freshness) turns decorative dots into an explainable-AI affordance, which fits this component's insight-explanation purpose. (HeroUI hover-card metadata-overlay pattern.)

6. **Tighten density with a compact variant for grid/feed contexts.** shadcn/HeroUI cards increasingly ship a density prop for dashboard grids vs. standalone display. Add a `density="compact"` host attribute that drops padding to `--cg-spacing-12`, hides the type-label, and clamps insight text to one line — letting the same component serve both a focused detail view and a high-density insight feed without a second component. (shadcn dashboard-grid density convention.)
