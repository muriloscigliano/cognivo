## ai-similarity-card — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 28 | `.panel` background | `--cg-color-surface-cards-background` | Yes | — |
| 29 | `.panel` border | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | — |
| 30 | `.panel` border-radius | `--cg-border-radius-150` | Yes | — |
| 36 | `.header` padding | `--cg-spacing-16` `--cg-spacing-24` | Yes | — |
| 39 | `.header-title` font-size | `--cg-font-size-sm` (14px min OK) | Yes | — |
| 39 | `.header-title` font-weight | `--cg-font-weight-semibold` | Yes | — |
| 40 | `.header-title` color | `--cg-color-surface-base-text` | Yes | — |
| 47 | `.items` padding | `--cg-spacing-8` `--cg-spacing-24` `--cg-spacing-20` | Yes | — |
| 48 | `.items` gap | `--cg-spacing-16` | Yes | — |
| 53 | `.items.stacked` gap | `--cg-spacing-12` | Yes | — |
| 57 | `.item-card` background | `--cg-color-surface-base-background` | Yes | — |
| 58 | `.item-card` border | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | — |
| 59 | `.item-card` border-radius | `--cg-border-radius-100` | Yes | — |
| 60 | `.item-card` padding | `--cg-spacing-16` | Yes | — |
| 61 | `.item-card` gap | `--cg-spacing-8` | Yes | — |
| 62 | `.item-card` transition | explicit `border-color` + duration/easing tokens | Yes | — |
| 64 | `.item-card:hover` border-color | `--cg-color-surface-cards-hover-border` | Yes | — |
| 67 | `.item-image` width/aspect | `100%` / `16/10` (unitless ratio) | Yes | — |
| 68 | `.item-image` border-radius | `--cg-border-radius-100` | Yes | — |
| 69 | `.item-image` background | `--cg-color-surface-cards-border` | Yes (placeholder fill) | — |
| 72 | `.item-label` font-size | `--cg-font-size-sm` | Yes | — |
| 73 | `.item-label` color | `--cg-color-surface-base-text` | Yes | — |
| 76 | `.item-desc` font-size | `--cg-font-size-xs` (~12px, secondary text) | Borderline | See §2 (xs body text) |
| 77 | `.item-desc` color | `--cg-color-surface-container-outlined` | Token real; semantic misuse (see §2) | — |
| 78 | `.item-desc` line-height | `--cg-line-height-snug` | Yes | — |
| 84 | `.score-bridge` gap | `--cg-spacing-4` | Yes | — |
| 87 | `.score-circle` width/height | `--cg-spacing-48` | Yes (token; sizing via spacing) | — |
| 88 | `.score-circle` border-radius | `--cg-border-radius-full` | Yes | — |
| 89 | `.score-circle` border | `--cg-border-width-100` + `--cg-color-action-primary-background-default` | Yes | — |
| 91 | `.score-circle` background | `--cg-overlay-accent-subtle` | Yes | — |
| 94 | `.score-value` font-size | `--cg-font-size-sm` | Yes | — |
| 95 | `.score-value` font-weight | `--cg-font-weight-bold` | Yes | — |
| 95 | `.score-value` font-family | `--cg-font-family-mono` | Yes | — |
| 96 | `.score-value` color | `--cg-color-surface-base-text` | Yes | — |
| 99 | `.score-label` font-size | `--cg-font-size-xs` | Borderline (label, OK) | — |
| 100 | `.score-label` color | `--cg-color-surface-container-outlined` | Token real; semantic misuse | — |
| 103 | `.score-bridge.stacked` gap/padding | `--cg-spacing-12` / `--cg-spacing-4` `0` | Yes | — |
| 105 | `.score-circle` (stacked) w/h | `--cg-spacing-32` | Yes | — |
| 109 | `.features` padding | `--cg-spacing-16` `--cg-spacing-24` | Yes | — |
| 110 | `.features` gap | `--cg-spacing-12` | Yes | — |
| 113 | `.features-title` font-size | `--cg-font-size-xs` (uppercase eyebrow, OK) | Yes | — |
| 113 | `.features-title` font-weight | `--cg-font-weight-semibold` | Yes | — |
| 114 | `.features-title` color | `--cg-color-surface-container-outlined` | Token real; semantic misuse | — |
| 115 | `.features-title` letter-spacing | `--cg-letter-spacing-wide` | Yes (allowed) | — |
| 117 | `.feature-row` gap | `--cg-spacing-4` | Yes | — |
| 119 | `.feature-name` font-size | `--cg-font-size-xs` | Borderline (label, OK) | — |
| 119 | `.feature-name` font-weight | `--cg-font-weight-medium` | Yes | — |
| 120 | `.feature-name` color | `--cg-color-surface-base-text` | Yes | — |
| 122 | `.feature-bars` gap | `--cg-spacing-8` | Yes | — |
| 124 | `.feature-bar-wrap` height | `--cg-spacing-4` | Yes (token track height) | — |
| 125 | `.feature-bar-wrap` background | `--cg-color-surface-cards-border` | Yes (track fill) | — |
| 126 | `.feature-bar-wrap` border-radius | `--cg-border-radius-full` | Yes | — |
| 130 | `.feature-bar-a` background | `--cg-color-action-primary-background-default` | Yes | — |
| 131 | `.feature-bar-a` transition | explicit `width` + tokens | Yes | — |
| 135 | `.feature-bar-b` background | `--cg-color-surface-container-outlined` | Token real; semantic misuse (see §2) | — |
| 136 | `.feature-bar-b` transition | explicit `width` + tokens | Yes | — |
| 139 | `.feature-vs` font-size | `--cg-font-size-xs` | Borderline (mini-label, OK) | — |
| 140 | `.feature-vs` color | `--cg-color-surface-container-outlined` | Token real; semantic misuse | — |
| 141 | `.feature-vs` min-width | `--cg-spacing-20` | Yes | — |
| 146 | `.actions` padding | `--cg-spacing-16` `--cg-spacing-24` | Yes | — |
| 147 | `.actions` gap | `--cg-spacing-8` | Yes | — |
| 152 | `:host([rounded=none]) .panel` | `0` | Yes (allowed) | — |
| 153 | `:host([rounded=sm]) .panel` | `--cg-border-radius-50` | Yes | — |
| 154 | `:host([rounded=md]) .panel` | `--cg-border-radius-100` | Yes | — |
| 155 | `:host([rounded=lg]) .panel` | `--cg-border-radius-150` | Yes | — |

No made-up tokens, no comma-fallbacks, no raw hex/rgba, no banned tier-1 palette colors, no `transition: all`.

### 2. Styling Audit

- **Border radius:** Consistent and tokenized. Panel `150`, item-cards/images `100`, bars `full`. The `rounded` variants map cleanly (`none/sm/md/lg`). Good.
- **Spacing:** Entirely on the `--cg-spacing-*` scale. Header/features/actions all use `16/24` padding; gaps `4/8/12/16`. No magic numbers. Circle sizing uses `--cg-spacing-48`/`--cg-spacing-32` (acceptable — sizing via spacing scale, no dedicated tier-3 token exists for this component).
- **Font-size accessibility:** `.item-desc` (line 76) is the only true body/paragraph text and it uses `--cg-font-size-xs` (~12px), below the 14px body-text minimum. This is the one a11y concern: descriptions are real readable prose, not a label. The other `xs` uses (`.score-label`, `.features-title` eyebrow, `.feature-name`, `.feature-vs`) are short labels/eyebrows and are acceptable. There is no real token-swap to "fix" without a design decision (xs → sm changes layout), so this is flagged, not auto-fixed.
- **Translucent vs solid borders:** Borders use semantic `surface-cards-border` / `surface-cards-hover-border` (theme-aware translucent). Correct for dark-first.
- **Transitions:** All explicit property lists (`border-color`, `width`) with duration + easing tokens. No `transition: all`. `reducedMotion` style is imported and applied. Excellent.
- **Dark-theme suitability:** Semantic surface/action tokens throughout; `--cg-overlay-accent-subtle` for the score-circle fill is theme-aware. Good dark-first behavior.

**Semantic note (not a token violation):** `--cg-color-surface-container-outlined` is used as a *text/foreground* color in five places (`.item-desc`, `.score-label`, `.features-title`, `.feature-vs`) and as a *bar fill* (`.feature-bar-b`). "outlined" is a border/outline-intent token; the semantically correct muted-text token is `--cg-color-surface-base-text` (primary) or a dedicated muted text token. The vocab does not expose a `surface-*-text-muted` / secondary-text token, so there is no verified 1:1 replacement — leaving as a flag rather than a fix. The `.feature-bar-b` "comparison" fill arguably wants a distinct chart/secondary color (e.g. `--cg-color-chart-2-background`) so A vs B reads as two series, not active-vs-disabled.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.panel` + item-cards render base styling | — |
| Hover | Partial | `.item-card:hover` border-color change | Only item-cards hover; score-circle/bars have none (acceptable, non-interactive) |
| Active/Press | N/A | — | Accept/Reject are delegated to `cg-button` children, which own press state |
| Focus-visible | N/A (delegated) | Card itself is not focusable; focus lives on `cg-button` actions | Card has no keyboard-focusable region of its own (see §4) |
| Disabled | No | — | No disabled state for the card or its actions; acceptable for a display card |
| Loading | No | — | No skeleton/loading state despite being an AI-native card that may stream comparison data |
| Error | No | — | No AI error affordance; if score/features fail to load there is no `ai-error-*` state |
| Success | No (implicit) | "Accept Match" emits event; no visual confirmed/accepted state | Once accepted there is no visual lock-in / selected state |

### 4. Interaction Audit

- **Keyboard:** Accept/Reject are `cg-button` elements, so they are natively tab-focusable and Enter/Space-activatable (delegated). The card exposes no other interactive affordances. No custom keyboard handlers needed.
- **ARIA roles/labels/states:** None on the host. The card has no `role` (e.g. `group`/`region`) and no accessible name tying the two compared items together. The score "85%" + "match" is visual-only; a screen reader gets "85% match" but the comparison semantics (item A vs item B) are not announced as a group. The `.item-image` has `alt=${item.label}` (good). Recommend a wrapping `role="group"` with `aria-label="Similarity comparison"` and the score exposed via `aria-label` on the score bridge.
- **CustomEvents:** `ai-similarity-accept` and `ai-similarity-reject` both fire with `{ bubbles: true, composed: true, detail: { score: this.score } }`. Matches the documented `@fires` JSDoc (lines 5-6). Detail shape correct.
- **Touch targets ≥44px:** Action buttons are `size="sm"` `cg-button`s — sm buttons are typically below 44px height. This is a design/sizing concern (enlarge to `md` or ensure sm ≥44px), flagged here, not a token fix.

### 5. Visual Design Check

Modern and clean: a tokenized panel with a circular similarity score "bridge" between two item cards, mono-font percentage, uppercase eyebrow for the feature section, and dual comparison bars. The radius system is coherent and the spacing rhythm is consistent. Two refinements would push it to showcase quality: (1) the A/B feature bars currently read as primary-vs-muted (active/disabled) rather than two equal series — using two distinct chart colors would make the comparison legible at a glance; (2) `surface-container-outlined` as muted text is slightly off-purpose and the description text at `xs` is a touch small for prose. No dividers between sections (header → items → features → actions) — relies on padding alone, which is acceptable but a subtle `surface-base-divider` between the features and actions blocks would sharpen hierarchy. Strong dark-first behavior overall.

**Verdict:** adequate

### 6. Fixes Needed

No token-level fixes needed — every CSS value resolves to a real token in the vocab, with no comma-fallbacks, raw hex, banned tier-1 palette colors, or `transition: all`.

Non-token flags (require design/a11y decisions, not 1:1 token swaps; no verified replacement token exists so none are auto-applied):
1. **`.item-desc` font-size (line 76):** `--cg-font-size-xs` for real description prose is below the 14px body minimum. Consider `--cg-font-size-sm`, but this is a layout/design change.
2. **`--cg-color-surface-container-outlined` used as text** (lines 77, 100, 114, 140) and as bar fill (line 135): "outlined" is a border-intent token used for foreground. No `surface-*-text-secondary`/muted token exists in the vocab to swap to — flagged, not fixed.
3. **`.feature-bar-b` color (line 135):** Comparison "B" series uses a muted token, reading as active-vs-disabled rather than two series; a distinct chart color (e.g. `--cg-color-chart-2-background`) would communicate comparison better. Design decision.
4. **Missing card-level ARIA:** add `role="group"` + accessible name and expose the score to assistive tech.
5. **Missing loading/error states:** AI-native card has no streaming/skeleton or `ai-error-*` state.
6. **Touch targets:** `size="sm"` action buttons likely <44px; enlarge (design change).

### Research-backed enhancements

Drawn from current (2025-2026) card patterns at Linear, Vercel, and shadcn/ui — specifically the "Agentic UI" streaming/approval-card direction and the "buttery" subtle-feedback school of micro-interaction.

1. **Selected / accepted lock-in state with a single accent ring.** The states audit flags that "Accept Match" emits an event but leaves no visual confirmation. Adopt Linear's single-chromatic-accent pattern: on accept, set a `:host([selected])` state that swaps the panel border to `--cg-color-action-primary-background-default` (a 1px hairline accent ring) plus the existing `--cg-overlay-accent-subtle` fill, and replace the two action buttons with a single "Accepted" confirmation row. This closes the missing Success/selected state without introducing new color noise. (Source: Linear's sparing single-accent ring for selected cards — Magic UI, *A Guide to Modern Cards UI Design*.)

2. **Streaming/skeleton state for the score and bars (Agentic UI approval card).** This is an `ai-*` card whose score and feature deltas may arrive over a stream, yet there is no loading affordance. Add a `:host([loading])` skeleton: render the `.score-circle` as a pulsing ring and the `.feature-bar-wrap` tracks at 0 width, then animate `width` to the real value on data arrival (the explicit `width` transition already wired on `.feature-bar-a/b` makes this nearly free). Gate the pulse behind the existing `reducedMotion` import. (Source: 2026 "Agentic UI" pattern of streaming-text + approval cards — *Best Shadcn UI Block Libraries 2026*, cssauthor.)

3. **Animate the score on reveal — count-up + ring sweep.** Modern score/match cards animate the headline number rather than snapping it in. Animate `.score-value` with a count-up to the final percentage and sweep the `.score-circle` border as a conic-gradient progress arc (0 → score%) using a CSS custom property transition, not `transition: all`. This makes the single most important datum (the match %) the focal micro-interaction. Strictly motion-gated. (Source: "buttery" subtle-feedback micro-interactions on key data — Magic UI / *10 Card UI Design Examples That Actually Work in 2026*, bricxlabs.)

4. **Two-series feature bars with distinct chart colors (fixes the active-vs-disabled misread).** Reinforcing §2/§5: the A/B comparison bars read as primary-vs-muted. Per modern comparison-card practice, give each series its own hue — `.feature-bar-a` keeps `--cg-color-action-primary-background-default`, `.feature-bar-b` moves to `--cg-color-chart-2-background` — and add tiny A/B legend dots in `.features-title`. Two equal series, legible at a glance. (Source: comparison-card legibility best practice — stan.vision, *UI Card Design: Examples, Best Practices & Common Patterns*.)

5. **Whole-card hover lift, not just the inner item border.** Currently only `.item-card:hover` shifts its border-color. The dominant 2025 pattern treats the card as a single interactive surface with a subtle elevation lift on hover to signal it is actionable/approvable. Add a `.panel:hover` micro-lift via `box-shadow` (using a tokenized elevation shadow) plus a 1px border-color warm-up — explicit `box-shadow, border-color` transition with duration/easing tokens, never `transition: all`, motion-gated. (Source: shadow-lift hover to signal interactivity — Figr.design, *Card UI Design Pattern*; Digital Thrive, *UI Card Design*.)

6. **Hairline divider before the actions row for hierarchy.** Picking up the §5 note: the header → items → features → actions sections rely on padding alone. Vercel/shadcn cards use a single hairline rule to separate the action/footer zone from content. Add a top border on `.actions` using `--cg-border-width-50` + `--cg-color-surface-cards-border` (the same hairline already used elsewhere, so zero new tokens) to sharpen the approve/reject footer as a distinct decision zone. (Source: shadcn card footer-separator convention — *Shadcn Card*, shadcnstudio; ui.shadcn.com Card docs.)

Sources:
- [A Guide to Modern Cards UI Design — Magic UI](https://magicui.design/blog/cards-ui-design)
- [Best Shadcn UI Block Libraries 2026 — cssauthor](https://cssauthor.com/best-shadcn-ui-block-libraries/)
- [10 Card UI Design Examples That Actually Work in 2026 — bricxlabs](https://bricxlabs.com/blogs/card-ui-design-examples)
- [UI Card Design: Examples, Best Practices & Common Patterns — stan.vision](https://www.stan.vision/journal/ui-card-design-examples-best-practices-and-common-patterns)
- [Card UI Design Pattern: When and How to Use Cards — Figr.design](https://figr.design/blog/card-ui-design-pattern)
- [UI Card Design: Best Practices & Patterns — Digital Thrive](https://digitalthriveai.com/en-us/resources/web-design/ui-card-design/)
- [Shadcn Card — shadcnstudio](https://shadcnstudio.com/docs/components/card)
- [Card — shadcn/ui](https://ui.shadcn.com/)
