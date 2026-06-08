## ai-usage-meter — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 39 | animation duration | `--cg-transition-duration-fast` | ✅ | — |
| 39 | animation easing | `--cg-transition-easing-default` | ✅ | — |
| 41 | display | `inline-block` | ✅ | — |
| 42 | display | `none` | ✅ | — |
| 49 | gap | `--cg-spacing-12` | ✅ | — |
| 50 | min-width | `--cg-spacing-192` | ✅ | — |
| 55-56 | width / height | `--cg-spacing-96` | ✅ | — (tier-1 spacing; no tier-3 meter token for this ring's wrapper — see §6 flag) |
| 59 | transform | `rotate(-90deg)` | ✅ | unitless geometry |
| 60-61 | width / height | `100%` | ✅ | — |
| 62 | overflow | `visible` | ✅ | — |
| 65 | fill | `none` | ✅ | — |
| 66 | stroke | `--cg-color-surface-cards-border` | ✅ | — (tier-2 track color) |
| 68, 72 | stroke-width | `8` | ✅ | unitless SVG geometry — not a violation |
| 69, 70 | fill / linecap | `none` / `round` | ✅ | — |
| 73-75 | transition | `stroke-dashoffset --cg-transition-duration-slow --cg-transition-easing-ease-out, stroke --cg-transition-duration-slow --cg-transition-easing-default` | ✅ | explicit property list, valid tokens |
| 77 | stroke (normal) | `--cg-color-action-primary-background-default` | ✅ | tier-2 |
| 78 | stroke (warning) | `--cg-color-status-warning-text-default` | ✅ | tier-2 |
| 79 | stroke (danger) | `--cg-color-status-error-text-default` | ⚠️ valid token | semantic flag — meter "danger" = approaching rate limit; dedicated `--cg-color-ai-rate-limited-*` family exists (see §6) |
| 83 | filter / opacity | `drop-shadow(0 0 0 transparent)` / `1` | ✅ | keyframe values |
| 84 | drop-shadow blur | `--cg-spacing-8` | ✅ | valid |
| 84 | drop-shadow color | `--cg-color-status-error-text-default` | ⚠️ valid token | matches danger stroke; same rate-limited flag |
| 84 | opacity | `0.85` | ✅ | keyframe value |
| 87 | animation | `usage-pulse 2s --cg-transition-easing-ease-out infinite` | ✅ | `2s` is a keyframe/animation duration literal; easing token valid |
| 97 | gap | `--cg-spacing-2` | ✅ | — |
| 105 | gap | `--cg-spacing-4` | ✅ | — |
| 108 | width / display | `100%` / flex | ✅ | — |
| 113 | gap | `--cg-spacing-8` | ✅ | — |
| 114 | min-width | `0` | ✅ | — |
| 118-119 | width / height (compact) | `--cg-spacing-24` | ✅ | — |
| 122 | stroke-width (compact) | `3` | ✅ | unitless SVG geometry |
| 129-130 | width / height (lg) | `--cg-spacing-128` | ✅ | — |
| 133 | stroke-width (lg) | `6` | ✅ | unitless SVG geometry |
| 134 | min-width / gap (lg) | `--cg-spacing-256` / `--cg-spacing-16` | ✅ | — |
| 139 | width / height (sr-only) | `1px` | ✅ | a11y clip pattern, conventional |
| 140-142 | padding / margin / clip | `0` / `-1px` / `rect(0,0,0,0)` | ✅ | a11y clip pattern |
| 145 | border | `0` | ✅ | — |
| 300 | letter-spacing (inline) | `--cg-letter-spacing-wide` | ✅ | explicitly allowed |

No made-up tokens. No comma-fallbacks. No raw hex/rgba. No tier-1 palette colors. No `transition: all`. No bare magic px on sized properties (the only `px` are SVG stroke-width geometry and the standard 1px sr-only clip).

### 2. Styling Audit
- **Border radius:** Not set directly. The default variant delegates to `cg-card` defaults (variant=elevated, padding=md, rounded=lg → `--cg-component-card-radius` + `--cg-elevation-1`). Correct delegation, no hardcoded radius.
- **Spacing:** All gaps/min-widths come from the `--cg-spacing-*` scale (2/4/8/12/16/192/256). Consistent and on-scale.
- **Font-size accessibility:** Typography is delegated to `cg-text` via `size` attributes (`2xl`/`xl`/`sm`/`xs`). The body label uses `sm` (≥14px). The secondary "used / limit" and reset lines use `xs`, which is below the 14px body minimum — these are caption/secondary metadata, an acceptable use of `xs`, but worth noting if treated as primary body copy.
- **Translucent vs solid borders:** Ring track uses `--cg-color-surface-cards-border` (semantic), consistent with the card surface. Good.
- **Transitions explicit vs all + motion tokens:** Ring transition enumerates `stroke-dashoffset` and `stroke` explicitly (no `transition: all`). Uses `--cg-transition-*` tokens. The mount animation uses `--cg-transition-duration-fast`. The pulse keyframe uses a raw `2s` literal for animation duration — acceptable for a keyframe-driven decorative pulse, though a `--cg-motion-duration-*` / `--cg-transition-duration-*` token would be tidier (no exact 2s token exists, so not flagged as a violation).
- **Dark-theme suitability:** All colors are tier-2 semantic surface/status/action tokens that flip with theme. Dark-first compatible.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | ✅ | Ring at `normal` tier, action-primary stroke | — |
| Hover | N/A | Meter is a read-only progressbar, not hoverable; the only interactive child is the delegated `cg-button` CTA which owns its own hover | — |
| Active/Press | N/A | Same as hover — press lives on the `cg-button` CTA | — |
| Focus-visible | ⚠️ partial | The host/meter has no focusable affordance; focus lives on the `cg-button` CTA (its own focus ring). The `role="progressbar"` container is not focusable, which is acceptable for a status indicator | No host-level focus needed |
| Disabled | N/A | No disabled concept for a usage readout | — |
| Loading | ⚠️ partial | Count-up animation on mount approximates an entering/loading state; no explicit skeleton/loading prop | Acceptable for this component type |
| Error | ✅ (as danger tier) | `≥90%` → danger tier: error-colored stroke + pulse + aria-live "above 90% — approaching limit" | Color semantics flagged in §6 |
| Success | ⚠️ N/A | No explicit "success/under quota" treatment beyond the `normal` tier (action-primary). Reasonable — low usage is the neutral baseline | — |

States are appropriate for a non-interactive meter. Threshold tiers (normal/warning/danger) substitute for traditional interaction states.

### 4. Interaction Audit
- **Keyboard:** No custom key handlers on the meter (correct — it is a status readout). The CTA button is keyboard-operable via the delegated `cg-button`.
- **ARIA:** Strong. `role="progressbar"` with `aria-label`, `aria-valuemin=0`, `aria-valuemax=limit`, `aria-valuenow=used`, and a descriptive `aria-valuetext` ("X of Y unit, N percent"). The ring SVG is correctly `aria-hidden="true"`. A polite `aria-live` sr-only region announces threshold crossings.
- **CustomEvents:**
  - `ai-usage-upgrade` — fired on CTA click via `_emit`, `{ bubbles: true, composed: true }`. ✅
  - `ai-usage-threshold` — fired on tier change with `detail: { tier }`, `{ bubbles: true, composed: true }`. ✅ Matches the documented `@fires` signature.
  - Note: `_maybeAnnounceThreshold` only fires when `_lastTier` is already set (no event on the very first render), which avoids a spurious mount-time announcement — intentional and correct.
- **Touch targets:** The only touch target is the CTA `cg-button` (size="sm"), which owns its own min-height token. The meter itself is non-interactive. No ≥44px concern at this layer.

### 5. Visual Design Check
Modern and sleek: an animated SVG ring with eased count-up, threshold color stepping, a subtle danger pulse, and a contextual upgrade CTA that only appears at ≥80%. Radius/elevation are delegated to the card system (consistent surface). Breathing room is good (spacing-12/16 gaps, centered column). Typography hierarchy is clear: large bold percentage in-ring, semibold label, muted xs metadata. The compact 24px chip variant is a thoughtful nav-bar/IDE affordance, and the lg hero ring suits billing pages. Dividers are not needed given the card surface. Showcase-ready for HeroUI/Vercel-tier galleries. One-word verdict: **strong**.

### 6. Fixes Needed
No token-violation fixes needed — every CSS value resolves to a real token in the vocab, there are no comma-fallbacks, no raw hex/rgba, no tier-1 palette colors, no `transition: all`, and no magic px on sized properties.

Flags (judgment calls, not hard violations — intentionally NOT applied):
1. **Danger-tier color semantics (lines 79, 84).** The danger tier represents "above 90% — approaching limit," i.e. an impending rate-limit state. The design system ships a dedicated AI-state family `--cg-color-ai-rate-limited-text` / `-glow` / `-background` / `-border` for exactly this lifecycle. Consider swapping the danger stroke from `--cg-color-status-error-text-default` → `--cg-color-ai-rate-limited-text` (and the pulse `drop-shadow` color → `--cg-color-ai-rate-limited-glow`) to align with the AI rate-limit semantics rather than generic error red. Both current tokens are valid, so this is a semantic refinement, not a broken-token fix.
2. **Ring sizing on tier-1 spacing (lines 55-56, 118-119, 129-130).** Ring dimensions use `--cg-spacing-96/24/128`. There is a `--cg-component-meter-circular-size-sm/md/lg` tier-3 family that would be the more correct tier-3 source for a circular meter's diameter. Not applied here because the existing values are valid tier-1 spacing and remapping to the tier-3 sizes is a design-dimension decision (the spacing values may not equal the meter-circular sizes); recommend the component owner confirm the intended diameters before swapping.
3. **Pulse duration literal (line 87).** `2s` is a raw animation-duration literal in the `@keyframes`-driven pulse. No `--cg-*` token equals 2s, so it is left as-is (allowed for keyframe timing), but a dedicated slow-motion duration token would be cleaner if one is added.

### Research-backed enhancements

Concrete modernizations for `ai-usage-meter`, grounded in 2025-era usage/quota patterns from Billing SDK, shadcn/ui, and Vercel v0's own credit UI:

1. **Add a segmented "tick" track behind the ring (Billing SDK usage-meter pattern).** The Billing SDK usage meter renders discrete progress segments rather than a single continuous fill so users can read consumption at a glance without parsing the percentage. Overlay 4–10 faint tick marks (dasharray on a second background circle, colored `--cg-color-surface-cards-border`) so the ring doubles as a quantized gauge. This adds glance-value with zero new state, and the tick count can scale with the `lg` hero variant.

2. **Show a delta / burn-rate caption, not just a static total (Vercel v0 credit-quota pattern).** Vercel's credit UI pairs the absolute count with consumption velocity (credits-per-period and a projected exhaustion). Add an optional `trend` slot under the `used / limit` line — e.g. "+412 today · resets in 6d" — using the existing `xs` muted metadata typography. This is the single highest-leverage addition: it converts a passive readout into a forecasting affordance and naturally reinforces the upgrade CTA at the warning tier.

3. **Animate the threshold color transition through the ring stroke, not an abrupt swap.** Currently the stroke jumps `normal → warning → danger` at the breakpoints. shadcn/ui progress + class-variance-authority variants favor a tweened color handoff. Since the ring already transitions `stroke` over `--cg-transition-duration-slow`, also interpolate an intermediate amber at ~80% rather than a hard step at 90%, so the danger entrance reads as an escalation rather than a flash. Pair this with the existing pulse so motion onset is gradual.

4. **Introduce an explicit `loading` skeleton state (shadcn/ui composition pattern).** Today the mount count-up doubles as the loading affordance, but when `used`/`limit` are still resolving there is no honest pending state. Add a `loading` prop that renders the ring track at rest with a shimmer on the numeric label (a low-opacity sweep keyframe), matching the shadcn/ui convention of pairing every data component with a dedicated skeleton. This removes the ambiguity between "0% used" and "data not yet loaded."

5. **Make the compact 24px chip variant tappable into the full meter (density/disclosure pattern).** The compact chip is currently a pure read-only indicator. Modern dashboard meters (Billing SDK, Vercel) treat the compact form as a progressive-disclosure trigger that expands or routes to billing. Give the chip variant an optional interactive mode: `role="button"`, focus-visible ring (delegated to a `cg-button`-style affordance), and an `ai-usage-expand` CustomEvent — keeping the default non-interactive `progressbar` semantics intact when the mode is off.

6. **Tier-3 color alignment for the danger state (carry-over from §6 flag, reinforced by research).** Quota UIs in the surveyed set use a distinct "limit-reached" color identity rather than reusing generic error red, so the limit state is not confused with a form/validation error. This supports the §6 recommendation to swap the danger stroke to the dedicated `--cg-color-ai-rate-limited-text` / `-glow` family — it is both a semantic fix and a recognized pattern for differentiating "at capacity" from "something broke."

Sources: [Billing SDK — Usage Meter](https://billingsdk.com/docs/components/usage-meter/usage-meter-linear), [shadcn/ui](https://ui.shadcn.com/), [The Anatomy of shadcn/ui Components — Vercel Academy](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components), [shadcn Progress](https://www.shadcn.io/ui/progress), [Vercel v0 Review 2025](https://skywork.ai/blog/vercel-v0-review-2025-ai-ui-code-generation-nextjs/).
