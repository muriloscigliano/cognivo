## ai-ab-test — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 26 | `.container` background | `var(--cg-color-surface-cards-background)` | Yes | None — tier-2 card surface |
| 27 | `.container` border | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | Yes | None — tier-1 width + tier-2 color |
| 28 | `.container` border-radius | `var(--cg-border-radius-200)` | Yes | None — tier-1 radius |
| 29 | `.container` padding | `var(--cg-spacing-20)` | Yes | None |
| 30 | `.container` color | `var(--cg-color-surface-base-text)` | Yes | None — tier-2 text |
| 37 | `.header` margin-bottom | `var(--cg-spacing-16)` | Yes | None |
| 38 | `.header` padding-bottom | `var(--cg-spacing-12)` | Yes | None |
| 39 | `.header` border-bottom | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider)` | Yes | None — correct divider token |
| 42 | `.title` font-size | `var(--cg-font-size-sm)` | Yes | None — meets 14px floor (sm = 14px) |
| 43 | `.title` font-weight | `var(--cg-font-weight-bold)` | Yes | None |
| 44 | `.title` color | `var(--cg-color-surface-base-text)` | Yes | None |
| 49 | `.variants` grid-template-columns | `1fr 1fr` | Yes | None — fractional units, not a token concern |
| 50 | `.variants` gap | `var(--cg-spacing-12)` | Yes | None |
| 51 | `.variants` margin-bottom | `var(--cg-spacing-16)` | Yes | None |
| 55 | `.variant` background | `var(--cg-color-surface-container-background)` | Yes | None — tier-2 container surface (good nesting contrast vs card) |
| 56 | `.variant` border | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | Yes | None |
| 57 | `.variant` border-radius | `var(--cg-border-radius-100)` | Yes | None |
| 58 | `.variant` padding | `var(--cg-spacing-16)` | Yes | None |
| 59 | `.variant` transition | `border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default)` | Yes | None — explicit property (not `all`), tokenized duration + easing |
| 60 | `.variant` min-height | `var(--cg-spacing-80)` | Yes | None — tier-1 spacing used as sizing token |
| 63 | `.variant.winner` border-color | `var(--cg-color-action-primary-background-default)` | Yes | None — tier-2 semantic accent for winner highlight |
| 64 | `.variant.winner` background | `var(--cg-overlay-accent-subtle)` | Yes | None — tier-1 overlay token (valid for subtle accent wash) |
| 67 | `.variant cg-badge` margin-bottom | `var(--cg-spacing-8)` | Yes | None |
| 70 | `.variant-content` font-size | `var(--cg-font-size-sm)` | Yes | None — 14px floor met |
| 71 | `.variant-content` color | `var(--cg-color-surface-base-text)` | Yes | None |
| 72 | `.variant-content` line-height | `var(--cg-line-height-relaxed)` | Yes | None — good for multi-line response text |
| 73 | `.variant-content` white-space | `pre-wrap` | Yes | None — keyword |
| 74 | `.variant-content` word-break | `break-word` | Yes | None — keyword |
| 79 | `.actions` gap | `var(--cg-spacing-8)` | Yes | None |
| 82 | `.actions` padding-top | `var(--cg-spacing-12)` | Yes | None |
| 83 | `.actions` border-top | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider)` | Yes | None |
| 87 | `:host([rounded="none"]) .container` border-radius | `0` | Yes | None — `0` is allowed |
| 88 | `:host([rounded="sm"])` border-radius | `var(--cg-border-radius-50)` | Yes | None |
| 89 | `:host([rounded="md"])` border-radius | `var(--cg-border-radius-100)` | Yes | None |
| 90 | `:host([rounded="lg"])` border-radius | `var(--cg-border-radius-200)` | Yes | None |

All CSS declarations resolve to real tokens present in the vocab files. No comma-fallbacks, no magic px, no raw hex/rgba, no banned tier-1 palette colors (`--cg-gray-*` etc.), no `transition: all`, no made-up token names. **The file is clean.**

### 2. Styling Audit
- **Border radius**: Container uses `--cg-border-radius-200` with a full `rounded` override matrix (none/sm/md/lg). Variants use `--cg-border-radius-100`. Nested-card hierarchy (outer 200 > inner 100) is correct and modern. Appropriate.
- **Spacing generosity**: Padding 20 on container, 16 inside variants, 12/16 vertical rhythm in header/actions. Generous and consistent; no cramped values.
- **Font-size accessibility**: Title and content both at `--cg-font-size-sm` (14px). Meets the 14px body floor. No sub-14px text anywhere.
- **Translucent vs solid borders**: Borders use solid tier-2 `surface-cards-border` / `surface-cards-divider`. Winner state uses solid `action-primary` border plus a subtle accent overlay wash — correct translucent-on-accent usage.
- **Transitions explicit vs all**: Single transition on `.variant` is explicit (`border-color`) with tokenized duration (`fast`) and easing (`default`). `reducedMotion` mixin is imported and applied. Correct.
- **Dark-theme background suitability**: Card surface for the outer container and the dimmer `surface-container-background` for nested variants gives proper layered contrast on a dark-first theme. Suitable.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.variant` / `.container` base styles; neutral badge, secondary vote buttons | None |
| Hover | Delegated | No own hover; `cg-button`/`cg-badge` own their hover styling. Variant cards are not interactive (vote is via buttons), so no card hover needed | None — correct delegation |
| Active/Press | Delegated | Vote button press handled by `cg-button` | None |
| Focus-visible | Delegated | Focus rings live on the inner `cg-button` controls; container is a non-interactive `role="group"` | None — correct (group itself is not focusable) |
| Disabled | N/A | Component exposes no disabled mode; no disabled prop in spec | N/A — A/B comparison has no disabled concept |
| Loading | N/A | Content is passed in via `variantA`/`variantB` props; streaming/loading is the parent's responsibility | N/A — static comparison card, not a streaming surface |
| Error | N/A | No error semantics; this is not an AI-state component (no thinking/streaming/error lifecycle) | N/A — `--cg-color-ai-error` family does not apply here |
| Success / Winner | Yes | `.variant.winner` (line 62-65) sets accent border + accent overlay wash; vote buttons reflect selection via `variant=primary` + `aria-pressed=true` | None — winner highlight + pressed state both implemented |

### 4. Interaction Audit
- **Keyboard**: All actionable elements are `cg-button` (Swap, "A Wins", "Tie", "B Wins"), which are natively focusable and Enter/Space-activated. No custom keyboard handling needed; nothing missing.
- **ARIA roles/labels/states**: Container `role="group"` + `aria-label` bound to title (line 132). Each variant `role="region"` + `aria-label="Variant {label}"` (lines 141, 145). Vote row is a nested `role="group"` labelled "Vote for best variant" (line 151). Each vote button carries `aria-pressed` reflecting the current winner (lines 156, 162, 168). Swap button has `label="Swap variants"`. All correct and complete. Minor nit (not a defect): two nested `role="group"`s are valid; the inner vote group could arguably be `role="radiogroup"` with `role="radio"` buttons since votes are mutually exclusive, but `aria-pressed` toggle-button semantics are an acceptable and accessible pattern.
- **CustomEvents**: `ai-ab-vote` fires `detail: { winner }` (line 105-108) — detail is correct and typed in the JSDoc `@fires`. `ai-ab-compare` fires with no detail (line 117-119) and is documented as detail-less. Both `bubbles: true, composed: true` so they cross the shadow boundary. Note: `_compare()` is defined but never wired to any control in `render()` — dead method, not a defect but slightly dishonest API surface (the documented `ai-ab-compare` event can never fire from within the component). Worth flagging as a cleanliness item, not a token/state/a11y defect.
- **Touch targets**: Vote and swap controls are `cg-button` at `size="sm"` whose height is governed by `--cg-component-button-height-sm` inside cg-button — this component does not set a sub-44px height itself. Touch-target compliance is delegated and not violated here.

### 5. Visual Design Check
Modern and sleek: layered card-over-container surfaces, full rounded-corner matrix, accent winner wash, centered vote cluster with a top divider, and a header divider separating title from comparison. Radius is appropriate (nested 200/100). Breathing room is generous (16/20 padding, 12 gaps). Dividers are present exactly where needed (header bottom, actions top). Typography hierarchy is light (bold sm title vs sm content) — adequate but the title could lean on a slightly larger size for stronger hierarchy, though `sm` keeps it understated which suits a compact comparison card. It would pass a HeroUI/Vercel-style showcase. Verdict: **strong**.

### 6. Fixes Needed
No fixes needed — component is compliant. Every CSS value maps to a real token in the vocab files with zero comma-fallbacks, zero magic numbers, zero raw colors, and zero banned palette tokens. Transitions are explicit and tokenized, `reducedMotion` is applied, font-sizes meet the 14px floor, ARIA roles/labels/states are complete, and CustomEvents carry correct detail. This component delegates colors and interaction states to `cg-button`/`cg-badge`/`cg-icon`, so the `--cg-color-ai-*` state family does not apply (it is a static comparison card, not an AI lifecycle surface). One non-blocking cleanliness observation: the private `_compare()` method and its documented `ai-ab-compare` event are never wired to any control in `render()`, so that event can never fire — this is dead code, not a token/state/a11y defect, and does not change the clean rating.

### Research-backed enhancements

- **Confidence-tiered winner badge, not a binary "B won".** Replace any single winner flag with a graduated significance chip: gray check for 90% CI, solid green check once it crosses 95% ([Builder.io A/B pattern](https://www.builder.io/c/docs/abtesting), [VWO](https://vwo.com/ab-testing/)). Use a tier-2 semantic mapping (`--cg-color-status-success-*` at 95%, a muted `--cg-color-status-neutral-*` at 90%) so the state reads pre-significant vs. significant at a glance, with an `aria-label` spelling out the confidence level.

- **Lead with the effect statement, treat the label as secondary.** NN/G and VWO stress "Variant B increased conversion 8–15% at 95% confidence" beats "B won." Make the primary line a large delta (`+12.4%`) with the CI range rendered as smaller mono text beneath it — Linear/Vercel metric-card density. Color the delta by direction (uplift vs. regression) rather than just by variant.

- **Animated CI / uplift bar that settles, not just a number.** Add a thin horizontal confidence-interval bar per variant where the whisker/range animates in on data update (spring ease, ~250ms, respecting `prefers-reduced-motion`). This makes "still inconclusive" (interval crossing zero) visually obvious — far stronger than a raw p-value, and matches the shadcn/Vercel chart aesthetic of motion-on-mount.

- **An explicit "still running / inconclusive / underpowered" state, not just win/lose.** The research flags three+ outcomes plus the premature-stopping risk: running, reached-significance, control-won, inconclusive, underpowered ([NN/G](https://www.nngroup.com/articles/ab-testing/), [VWO](https://vwo.com/ab-testing/)). Add a progress affordance (sample size collected vs. required, planned-duration countdown) so the component actively discourages calling it early — surface a subtle warning chip if significance is hit before the planned window closes.

- **Side-by-side variant rows with sparkline trend + density toggle.** Render variants as a compact comparison table (control pinned first) with a per-variant conversion sparkline showing the metric stabilizing over time, plus a comfortable/compact density toggle (Linear-style). For 3+ variants this scales far better than stacked cards and lets users spot a variant that spiked then reverted.

- **Inline streaming-aware skeleton + "live" pulse.** Since this is an AI-native, streaming component, give each metric a shimmer skeleton while data resolves and a quiet pulsing dot on values that are updating live, so partial/streamed results never look like final verdicts. Snap to the settled state once the stream completes.

Sources: [Builder.io A/B Testing docs](https://www.builder.io/c/docs/abtesting), [NN/G — A/B Testing 101](https://www.nngroup.com/articles/ab-testing/), [VWO — What is A/B Testing](https://vwo.com/ab-testing/), [LogRocket — Understanding A/B testing](https://blog.logrocket.com/ux-design/understanding-ab-testing-ux-research/)

### Playground proposal

Current playground is fine. A representative example: <ai-ab-test title="Model Comparison" labelA="GPT-4" labelB="Claude" variantA="Paris is the capital of France. It has been the capital since 987 AD..." variantB="The capital of France is Paris, a city of roughly 2.1 million people..."></ai-ab-test> — this exercises the two-column layout, badge labels, multi-line wrapping (line-height-relaxed + pre-wrap), and the full vote/swap/winner interaction. No change required.

---
*cleanliness: clean | fixes applied: 0*
