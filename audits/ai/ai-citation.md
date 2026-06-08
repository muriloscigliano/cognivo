## ai-citation — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 28 | width (.cite-badge) | `var(--cg-spacing-16)` | Yes | — |
| 29 | height (.cite-badge) | `var(--cg-spacing-16)` | Yes | — |
| 30 | border-radius | `var(--cg-border-radius-50)` | Yes | — |
| 31 | background | `var(--cg-overlay-accent-light)` | Yes (tier-1 overlay, allowed) | — |
| 32 | color | `var(--cg-color-surface-base-text)` | Yes | — |
| 33 | font-size | `var(--cg-font-size-xs)` | Yes (badge numeral, not body) | — |
| 34 | font-weight | `var(--cg-font-weight-bold)` | Yes | — |
| 37 | margin | `0 var(--cg-spacing-1)` | Yes | — |
| 38 | border | `var(--cg-border-width-50) solid transparent` | Yes | — |
| 40–41 | transition | `background-color/border-color` + `--cg-transition-duration-fast` + `--cg-transition-easing-default` | Yes (explicit, not `all`) | — |
| 44 | background (hover) | `var(--cg-overlay-accent-medium)` | Yes | — |
| 45 | border-color (hover) | `var(--cg-overlay-accent-strong)` | Yes | — |
| 48 | outline | `none` | Yes | — |
| 49 | box-shadow (focus) | `0 0 0 3px var(--cg-overlay-accent-strong)` | **No** | Bare magic `3px` spread; color should be `--cg-color-focus-ring` (dedicated focus token). See Fixes #1. |
| 54 | background (.source-card) | `var(--cg-color-surface-cards-background)` | Yes | — |
| 55 | border | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | Yes | — |
| 56 | border-radius | `var(--cg-border-radius-100)` | Yes | — |
| 57 | padding | `var(--cg-spacing-12)` | Yes | — |
| 58 | margin | `var(--cg-spacing-8) 0` | Yes | — |
| 59 | max-width | `400px` | **No** | Bare magic px. No `--cg-component-ai-citation-*` width token exists — cannot fix without inventing. Flag only (§6). |
| 65 | gap (.source-header) | `var(--cg-spacing-8)` | Yes | — |
| 66 | margin-bottom | `var(--cg-spacing-6)` | Yes | — |
| 69 | width (.source-number) | `var(--cg-spacing-20)` | Yes | — |
| 70 | height | `var(--cg-spacing-20)` | Yes | — |
| 71 | border-radius | `var(--cg-border-radius-50)` | Yes | — |
| 72 | background | `var(--cg-overlay-accent-light)` | Yes | — |
| 73 | color | `var(--cg-color-surface-base-text)` | Yes | — |
| 74 | font-size | `var(--cg-font-size-xs)` | Yes (numeral) | — |
| 75 | font-weight | `var(--cg-font-weight-bold)` | Yes | — |
| 82 | font-size (.source-title) | `var(--cg-font-size-sm)` | Yes (≥14px body) | — |
| 83 | font-weight | `var(--cg-font-weight-medium)` | Yes | — |
| 84 | color | `var(--cg-color-surface-base-text)` | Yes | — |
| 95 | width (.relevance-dot) | `var(--cg-spacing-6)` | Yes | — |
| 96 | height | `var(--cg-spacing-6)` | Yes | — |
| 97 | border-radius | `var(--cg-border-radius-full)` | Yes | — |
| 100 | background (.high) | `var(--cg-color-status-success-text-default)` | Yes (relevance signal, not AI lifecycle) | — |
| 101 | background (.medium) | `var(--cg-color-status-warning-text-default)` | Yes | — |
| 102 | background (.low) | `var(--cg-color-input-text-placeholder)` | Acceptable (muted), see §2 note | — |
| 105 | font-size (.source-excerpt) | `var(--cg-font-size-xs)` | Acceptable (excerpt/secondary, not primary body) | — |
| 106 | color | `var(--cg-color-input-text-placeholder)` | Misused token (placeholder for muted text), see §2 | Flag only — no clean "muted body text" token in vocab |
| 107 | line-height | `var(--cg-line-height-snug)` | Yes | — |
| 108 | margin-top | `var(--cg-spacing-6)` | Yes | — |
| 114–116 | .source-url fs/color | `--cg-font-size-xs` / `--cg-color-input-text-placeholder` | Same as excerpt | Flag only |
| 117 | margin-top | `var(--cg-spacing-4)` | Yes | — |
| 127 | gap (.list) | `var(--cg-spacing-2)` | Yes | — |
| 132 | gap (.list-item) | `var(--cg-spacing-8)` | Yes | — |
| 133 | padding | `var(--cg-spacing-8) 0` | Yes | — |
| 134 | border-bottom | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | Yes | — |
| 140 | font-size (.list-title) | `var(--cg-font-size-sm)` | Yes | — |
| 141 | font-weight | `var(--cg-font-weight-medium)` | Yes | — |
| 142/145 | color | `var(--cg-color-surface-base-text)` | Yes | — |
| 150 | font-size (.list-excerpt) | `var(--cg-font-size-xs)` | Acceptable (secondary) | — |
| 151 | color | `var(--cg-color-input-text-placeholder)` | Misused token, see §2 | Flag only |
| 152 | line-height | `var(--cg-line-height-snug)` | Yes | — |
| 153 | margin-top | `var(--cg-spacing-4)` | Yes | — |
| 157 | font-size (.sources-label) | `var(--cg-font-size-xs)` | Acceptable (label/eyebrow) | — |
| 158 | font-weight | `var(--cg-font-weight-medium)` | Yes | — |
| 159 | color | `var(--cg-color-input-text-placeholder)` | Misused token, see §2 | Flag only |
| 161 | letter-spacing | `var(--cg-letter-spacing-wide)` | **Cannot verify** — no letter-spacing tokens in any vocab file | Flag only (§6) — possibly nonexistent token, but no replacement in vocab |
| 162 | margin-bottom | `var(--cg-spacing-8)` | Yes | — |
| 254 | inline padding | `0 var(--cg-spacing-4)` (+ `width:auto`) | Yes | — |

### 2. Styling Audit

- **Border radius:** Badges use `--cg-border-radius-50`, cards `--cg-border-radius-100`, relevance dots `--cg-border-radius-full`. Consistent and tokenized.
- **Spacing:** Entirely from the spacing scale (`--cg-spacing-1…20`). Clean.
- **Font-size accessibility:** Primary titles use `--cg-font-size-sm` (≥14px) — compliant. Excerpts, URLs, the sources label and badge numerals use `--cg-font-size-xs`. These are secondary/label/numeral roles, not primary body copy, so they are acceptable; the badge numeral at xs is intentional for the superscript citation marker.
- **Translucent vs solid borders:** Card/list borders use solid `--cg-color-surface-cards-border`; badge resting border is `transparent` and hover uses `--cg-overlay-accent-strong`. Reasonable for dark theme.
- **Transitions:** Explicit property list (`background-color`, `border-color`) with `--cg-transition-duration-fast` and `--cg-transition-easing-default`. No `transition: all`. `reducedMotion` style is imported. Good.
- **Dark-theme suitability:** Uses overlay-accent + surface-cards semantic tokens, which adapt to theme. Suitable.
- **Muted-text token misuse:** `--cg-color-input-text-placeholder` is reused as generic muted body color for excerpts, URLs, and the sources label (lines 102, 106, 116, 151, 159). It renders fine but is semantically wrong — it's an input-placeholder token used outside an input. The vocab has no dedicated "muted/secondary surface text" token (`--cg-color-surface-base-text` is the only surface-base text token), so there is no clean replacement to propose. Flagged, not auto-fixed.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.cite-badge` resting style; transparent border | — |
| Hover | Yes | `.cite-badge:hover` bg + border-color change | — |
| Active/Press | No | No `:active` rule | Minor — badge toggles expansion on click; a pressed state would improve feedback |
| Focus-visible | Yes | `.cite-badge:focus-visible` box-shadow ring | Ring uses bare `3px` + overlay token instead of `--cg-color-focus-ring` (Fixes #1) |
| Disabled | N/A | Component has no disabled concept | Citations are always interactive references |
| Loading | N/A | Static data via `sources` prop; no async state | — |
| Error | N/A | No error surface | Could degrade gracefully on bad URLs (already sanitized) |
| Success | N/A | Not a form/action component | — |

Relevance is rendered as a tri-state dot (high/medium/low) — a nice data state, correctly class-driven.

### 4. Interaction Audit

- **Keyboard:** Inline badges are `tabindex="0"` with `@keydown` handling `Enter` and `Space` (with `preventDefault`). Good. The `+N` overflow badge (line 254) is NOT focusable/interactive — acceptable since it's a non-actionable counter, though it visually mimics a clickable badge (minor affordance ambiguity).
- **ARIA:** Inline badges have `role="button"` and `aria-label="Source N: {title}"`. Good. Expansion state is not announced — no `aria-expanded` on the badge despite toggling a card (line 252). Minor a11y gap (flag).
- **CustomEvents:** `ai-citation-click` fires with `{ bubbles: true, composed: true, detail: { index, source } }` — correct, escapes shadow DOM, detail is meaningful.
- **Touch targets:** Inline badge is `--cg-spacing-16` (~16px) square — well below the 44px minimum. This is a deliberate inline-superscript citation marker, so enlargement is a design tradeoff (noted, not a token fix). The `.source-number` in list mode (`--cg-spacing-20`) is decorative, not a target.

### 5. Visual Design Check

Modern and restrained: numbered superscript badges, expandable source cards with relevance dots, and a clean list mode with dividers and an uppercase "Sources (n)" eyebrow. Radius and spacing are tokenized and consistent; cards have adequate breathing room (`--cg-spacing-12` padding). Typography hierarchy is clear (title `sm` medium / excerpt+url `xs` muted). Dividers via `--cg-color-surface-cards-border` are appropriately subtle for dark theme. The two weak points are the ad-hoc focus ring (bare `3px`, non-focus-ring token) and the placeholder token reused as muted text. Showcase-ready with the focus-ring fix.

**Verdict: strong**

### 6. Fixes Needed

1. **Line 49** — Focus ring uses a bare magic `3px` spread and the wrong color token.
   - Current: `box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);`
   - Fixed: `box-shadow: 0 0 0 var(--cg-border-width-300) var(--cg-color-focus-ring);`
   - Why: `3px` is a magic px value; `--cg-border-width-300` is a verified tier-1 width token usable for the ring spread, and `--cg-color-focus-ring` is the dedicated semantic focus token (replaces the overlay-accent reuse).

**Flags (no verified replacement token — not auto-fixed):**
- **Line 59** `max-width: 400px` — bare magic px on card width. No `--cg-component-ai-citation-width` (or similar) token exists in the component vocab; inventing one is forbidden. Needs a real tier-3 token added to the token set, then referenced here.
- **Line 161** `var(--cg-letter-spacing-wide)` — no `--cg-letter-spacing-*` family appears in any of the three vocab files; this token may not exist. No replacement available in vocab, so left as a flag for token-team verification.
- **Lines 102/106/116/151/159** `--cg-color-input-text-placeholder` used as generic muted/secondary text outside any input. Semantically incorrect, but the vocab offers no dedicated muted-surface-text token, so no clean fix is proposed.
- **Line 252 / 247** Inline badge toggles a source card but exposes no `aria-expanded`. A11y enhancement, not a token fix.
- **Line 247** Inline badge touch target (`--cg-spacing-16`) is below 44px. Intentional inline-superscript design; enlargement is a design decision, not a token violation.

### Research-backed enhancements

Sourced from a scan of current (2025–2026) citation/source-card patterns: the [ShapeofAI "Citations" AI UX pattern](https://www.shapeof.ai/patterns/citations), [NN/g's Cards component definition](https://www.nngroup.com/articles/cards-component/), and 2026 card-hover guidance from [Layout Scene](https://www.layoutscene.com/card-ui-design-patterns-guide-2026/) and [designsystems.surf](https://designsystems.surf/components/cards).

1. **Hover-preview popover on the inline badge (the defining 2025 citation move).** Right now the badge only toggles an inline card on click. The ShapeofAI citations pattern — and the Perplexity/Vercel-AI/Linear lineage it documents — leads with an *on-hover* preview card (favicon + source title + excerpt) that appears without committing to a layout shift. Add a lightweight popover on `:hover`/`:focus-visible` that surfaces the same `source` data, keeping click reserved for "pin/expand." This separates "peek" from "commit" and is the single biggest gap vs. modern citation UIs (ShapeofAI Citations).

2. **Favicon / source-origin glyph in the card and list rows.** Modern source cards (Perplexity, shadcn-derived AI kits) lead each row with a 16px favicon or domain monogram, not just a numbered circle. Add an optional `faviconUrl`/origin-letter slot left of `.source-title`; it raises scannability and trust far more than the numeral alone, and gives the otherwise text-heavy list a visual anchor (NN/g Cards — "a thumbnail or visual anchor improves card scannability").

3. **Shadow-lift + subtle scale on card hover, not just border/bg.** The card (`.source-card`) currently has no interactive hover treatment; only the badge animates. 2026 card guidance is explicit that the canonical interactive-card affordance is a small elevation increase plus an optional ~1.01–1.02 `transform: scale()` to "signal interactivity." Add a tokenized `box-shadow` lift (an existing `--cg-shadow-*` / elevation token) on `.source-card:hover` and on the focused list row, with an explicit `transition` property list (never `transition: all`, per guardrails) (Layout Scene 2026; NN/g Cards).

4. **Stagger-reveal the expanded card with a height/opacity micro-animation.** Today expansion is an instant DOM swap. A 150–200ms reveal (clip/height + opacity, gated by the existing `reducedMotion` import) makes the citation feel like it "unfolds" from the badge — matching the Linear/Vercel detail-disclosure feel — and reduces the jarring layout jump the audit notes around line 252 (designsystems.surf — card disclosure motion).

5. **Add `aria-expanded` + an animated chevron/caret affordance to the toggling badge.** §4 already flags the missing `aria-expanded`; pair the a11y fix with a visible disclosure cue (a tiny rotating caret) so sighted users get the same "this expands" signal screen-reader users will now get. Modern disclosure patterns always pair the ARIA state with a visible rotation transition on the caret (ShapeofAI Citations; NN/g Cards interaction affordances).

6. **Relevance as a labeled micro-chip, not a bare dot.** The tri-state high/medium/low dot is good signal but unlabeled, so it reads as decoration. Current source-card patterns surface relevance/confidence as a small text-bearing chip ("High match" / a 0–100 score) rather than a color-only dot, which both improves accessibility (color is not the only channel) and matches how AI-citation UIs now expose retrieval confidence (ShapeofAI Citations — surfacing source confidence/ranking).
