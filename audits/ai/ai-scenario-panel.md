## ai-scenario-panel — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 24 | display | `block` | Yes | — |
| 27 | background | `var(--cg-color-surface-cards-background)` | Yes | — |
| 28 | border | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | Yes | — |
| 29 | border-radius | `var(--cg-component-card-radius)` | Yes (tier 3) | — |
| 30 | overflow | `hidden` | Yes | — |
| 36 | gap | `var(--cg-spacing-8)` | Yes | — |
| 37 | padding | `var(--cg-spacing-20) var(--cg-spacing-20) var(--cg-spacing-12)` | Yes | — |
| 40 | font-size | `var(--cg-font-size-sm)` | Yes (14px min) | — |
| 41 | font-weight | `var(--cg-font-weight-semibold)` | Yes | — |
| 42 | color | `var(--cg-color-surface-base-text)` | Yes | — |
| 47 | margin | `0 var(--cg-spacing-12) var(--cg-spacing-12)` | Yes | — |
| 48 | background | `var(--cg-overlay-dark-subtle)` | Yes (tier 1 overlay, valid) | — |
| 49 | border | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | Yes | — |
| 50 | border-radius | `var(--cg-border-radius-125)` | Yes (tier 1; tier-3 card-radius more idiomatic but valid) | — |
| 57 | gap | `var(--cg-spacing-12)` | Yes | — |
| 58 | padding | `var(--cg-spacing-16) var(--cg-spacing-16)` | Yes (redundant pair, cosmetic) | — |
| 59 | border-bottom | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | Yes | — |
| 61 | transition | `background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default)` | Yes (explicit prop, motion tokens) | — |
| 64 | background (hover) | `var(--cg-color-action-secondary-background-hover)` | Yes (tier 2) | — |
| 66 | background (active) | `var(--cg-overlay-dark-subtle)` | Yes (but identical to container bg, see §2) | — |
| 70 | box-shadow (focus) | `inset 0 0 0 2px var(--cg-overlay-accent-strong)` | No — bare `2px` ring width | Replace `2px` with `var(--cg-outline-width-default)` |
| 75 | font-size | `var(--cg-font-size-sm)` | Yes | — |
| 76 | font-weight | `var(--cg-font-weight-medium)` | Yes | — |
| 77 | color | `var(--cg-color-surface-base-text)` | Yes | — |
| 80 | font-size | `var(--cg-font-size-xs)` | Caption-tier (desc text < 14px) | Acceptable for secondary caption; see §2 |
| 81 | color | `var(--cg-color-input-text-placeholder)` | Yes (tier 2) | — |
| 82 | margin-top | `var(--cg-spacing-2)` | Yes | — |
| 92 | gap | `var(--cg-spacing-16)` | Yes | — |
| 99 | font-size | `var(--cg-font-size-sm)` | Yes | — |
| 100 | font-weight | `var(--cg-font-weight-semibold)` | Yes | — |
| 101 | font-family | `var(--cg-font-family-mono)` | Yes | — |
| 102 | color | `var(--cg-color-surface-base-text)` | Yes | — |
| 105 | font-size | `var(--cg-font-size-xs)` | Caption-tier metric label | Acceptable |
| 106 | color | `var(--cg-color-input-text-placeholder)` | Yes | — |
| 111 | width | `var(--cg-spacing-8)` | Yes (spacing token as dot size) | — |
| 112 | height | `var(--cg-spacing-8)` | Yes | — |
| 113 | border-radius | `var(--cg-border-radius-full)` | Yes | — |
| 116 | background (idle dot) | `var(--cg-color-input-text-placeholder)` | Yes (neutral) | — |
| 117 | background (running dot) | `var(--cg-color-status-warning-text-default)` | Acceptable (scenario exec state, not AI lifecycle) | — |
| 118 | background (complete dot) | `var(--cg-color-status-success-text-default)` | Acceptable | — |
| 119 | background (error dot) | `var(--cg-color-status-error-text-default)` | Acceptable | — |
| 123 | padding | `var(--cg-spacing-12)` | Yes (footer never rendered, see §6) | — |
| 127 | padding | `var(--cg-spacing-32) var(--cg-spacing-20)` | Yes | — |
| 129 | color | `var(--cg-color-input-text-placeholder)` | Yes | — |
| 130 | font-size | `var(--cg-font-size-sm)` | Yes | — |

### 2. Styling Audit

- **Border radius:** Panel uses tier-3 `--cg-component-card-radius` (correct). Inner list uses tier-1 `--cg-border-radius-125`; valid token, tier-3 would be more idiomatic. Status dot uses `--cg-border-radius-full` (correct).
- **Spacing:** All from the scale. Line 58 padding pair `var(--cg-spacing-16) var(--cg-spacing-16)` is redundant (collapsible to one value) — cosmetic, not a violation.
- **Font-size accessibility:** Body/labels use `--cg-font-size-sm` (14px) — compliant. `--cg-font-size-xs` on `.scenario-desc` and metric labels are genuine captions/secondary metadata, so below 14px is acceptable, though descriptions carry meaningful content and would read better at `sm`.
- **Translucent vs solid borders:** Borders solid semantic `--cg-color-surface-cards-border` — good. List + active-row backgrounds use translucent `--cg-overlay-dark-subtle`; valid tokens.
- **Transitions:** Explicit `background-color` with duration + easing motion tokens. No `transition: all`. Honors shared `reducedMotion` import.
- **Dark-theme suitability:** Surface + overlay + semantic colors are dark-first; no raw hex/rgba. Suitable.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.scenario` base styles | — |
| Hover | Yes | `.scenario:hover` → action-secondary hover bg | — |
| Active/Press | Partial | `.scenario.active` = selected (not press); bg `--cg-overlay-dark-subtle` is **identical to the list container bg** (line 48), so selection is nearly invisible. No `:active` press feedback. | Selected state lacks contrast; consider `--cg-color-surface-cards-selected-background` |
| Focus-visible | Yes | `:focus-visible` inset box-shadow ring | Magic `2px` ring width (line 70) — see fix |
| Disabled | N/A | No per-row disabled concept in data model | — |
| Loading | Yes | `loading` prop → "Loading scenarios..." panel | Text-only, no skeleton/spinner |
| Error | Partial | Per-scenario `status: 'error'` → red dot only | No panel-level error; row error is dot-only |
| Success | Yes | Per-scenario `status: 'complete'` → green dot | — |
| Empty | Yes | No scenarios → "No scenarios available." | — |

### 4. Interaction Audit

- **Keyboard:** `Enter` and `Space` handled per row with `e.preventDefault()` then `_select`. Rows `tabindex="0"`. No arrow-key roving navigation between options (expected for `role="listbox"`) — gap, not a token issue.
- **ARIA:** Panel `role="listbox"` + `aria-label="Scenarios"`. Rows `role="option"` + `aria-selected` bound to active. Correct listbox/option pairing. Every row is `tabindex="0"` rather than the roving-tabindex single-stop pattern — minor.
- **CustomEvents:** `ai-scenario-select` fired `{ bubbles, composed, detail: { id } }` — matches `@fires` JSDoc. JSDoc also documents `ai-scenario-run` (line 6) but **no code dispatches it**; the styled `.footer` div is never rendered. Documentation/implementation mismatch.
- **Touch targets:** Rows have `padding: 16px` + content, comfortably ≥44px tall. Status dot decorative. OK.

### 5. Visual Design Check

Clean, restrained list with mono metric values and a status dot — reads as a credible scenario/analytics panel. Tier-3 card radius and consistent spacing give good breathing room; per-row bottom borders make tasteful dividers; typography hierarchy (sm label / xs desc / mono metric) is coherent. Two weaknesses against a showcase bar: (1) the selected/active row uses the same `--cg-overlay-dark-subtle` as the list container, so selection is nearly invisible — a dedicated `--cg-color-surface-cards-selected-background` would fix it; (2) the documented `ai-scenario-run` action and styled `.footer` are never rendered, so the panel is read-only despite advertising a run interaction.

Verdict: **adequate**

### 6. Fixes Needed

1. **Line 70** — focus ring magic px.
   - Current: `box-shadow: inset 0 0 0 2px var(--cg-overlay-accent-strong);`
   - Fixed: `box-shadow: inset 0 0 0 var(--cg-outline-width-default) var(--cg-overlay-accent-strong);`
   - Why: bare `2px` is a magic number for ring thickness; `--cg-outline-width-default` is the tier-1 focus-ring width token.

Non-token flags (no verified token replacement, not in fixes array):
- **Lines 48 vs 66** — selected row (`.scenario.active`) background equals the list container background, making selection nearly invisible. Recommend `--cg-color-surface-cards-selected-background` (design decision).
- **Line 6 / 122-124** — `@fires ai-scenario-run` is documented and `.footer` is styled, but no run control is rendered and the event is never dispatched. Implement the run action/footer or remove the dead JSDoc + CSS.
- **Lines 158-184** — `role="listbox"` lacks arrow-key roving navigation; all rows are `tabindex="0"` instead of single-tab-stop roving tabindex. A11y enhancement, not a token violation.

### Research-backed enhancements

Modern 2025 list/panel patterns from Linear, Vercel, and shadcn/ui informed the following concrete suggestions for `ai-scenario-panel`. Each is specific to this component's existing structure (rows with label / xs description / mono metric / status dot).

1. **Accent left-border for the selected row (fixes the invisible-selection §3 finding).** Linear's lists never tint the whole row to mark selection — they use the lavender-blue accent as a single chromatic signal, most often a 2px inset left bar plus a subtly raised surface. Replace the `--cg-overlay-dark-subtle` active background (which collides with the container bg) with `box-shadow: inset var(--cg-outline-width-default) 0 0 var(--cg-overlay-accent-strong)` on `.scenario.active`, reusing the accent token already present on the focus ring. This makes selection unambiguous at a glance without introducing a new fill color. (Source: Linear's near-black `#010102` surfaces with a single lavender-blue accent — [shadcn-linear-combobox.vercel.app](https://shadcn-linear-combobox.vercel.app/).)

2. **Animated status-dot pulse for the `running` state.** The current dot is a static color swatch; `running` and `complete` look identical except for hue. shadcn's loading-state convention is a soft pulsing/breathing indicator. Add a `scale`/`opacity` keyframe (e.g. `@keyframes pulse { 50% { opacity: .4 } }`) applied only to the `running` dot, gated behind the existing shared `reducedMotion` import so it collapses to static under `prefers-reduced-motion`. This conveys "in progress" without a separate spinner. (Source: shadcn/ui multi-select loading-state pattern — [shadcn-multi-select-component.vercel.app](https://shadcn-multi-select-component.vercel.app/).)

3. **Skeleton rows instead of "Loading scenarios…" text (fixes §3 loading gap).** Vercel/shadcn lists render dimmed shimmer placeholders matching the real row geometry rather than a centered text string, which prevents layout shift when data arrives. Render 3 placeholder `.scenario` rows with shimmer bars sized for the label and metric slots, using `--cg-overlay-dark-subtle` as the shimmer base so no new token is needed. (Source: shadcn/ui animated skeleton convention — [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components).)

4. **Row-level enter transition + hover metric reveal.** Linear/Vercel rows ease in on mount and surface secondary affordances on hover. Add a short `transform: translateY` + `opacity` enter transition on `.scenario` (explicit property list, motion-token timed, reduced-motion gated), and reveal a right-aligned chevron or "Run" affordance on `.scenario:hover` / `:focus-visible` — which also gives the documented-but-dead `ai-scenario-run` action (§4) a real surface to live on instead of the never-rendered `.footer`. (Source: shadcn template micro-interactions and Linear hover affordances — [shadcn.io](https://www.shadcn.io/).)

5. **Optimistic selection feedback.** Because `ai-scenario-select` is the panel's primary interaction, apply the `active` accent immediately on click before any consumer round-trip (the component already owns selection state locally), matching the optimistic-UI expectation set by Vercel/Linear lists where selection feels instantaneous. The current code already sets state synchronously; the enhancement is purely to ensure the visual accent (suggestion 1) lands in the same frame as the event dispatch with no transition delay on the selected-state property. (Source: Vercel/Linear instant-feedback list interaction — [shadcn-linear-combobox.vercel.app](https://shadcn-linear-combobox.vercel.app/).)

6. **Promote `.scenario-desc` from `xs` to `sm` (reinforces §2).** Vercel and Linear keep list-row descriptions at body size for scannability; xs (sub-14px) is reserved for true metadata. Since the description carries meaningful scenario context, move it to `--cg-font-size-sm` and reserve `xs` for the metric label only — a density/legibility win consistent with modern dark-first list typography. (Source: Linear/Vercel list typography hierarchy — [ui.shadcn.com](https://ui.shadcn.com/).)
