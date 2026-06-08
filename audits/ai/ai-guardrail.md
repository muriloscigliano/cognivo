## ai-guardrail — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 23 | `.panel` background | `--cg-color-surface-cards-background` | ✅ | — |
| 24 | `.panel` border | `--cg-border-width-50` + `--cg-color-surface-cards-border` | ✅ | — |
| 25 | `.panel` border-radius | `--cg-component-card-radius` | ✅ (tier-3) | — |
| 31 | `.status-bar` gap | `--cg-spacing-12` | ✅ | — |
| 32 | `.status-bar` padding | `--cg-spacing-16` `--cg-spacing-20` | ✅ | — |
| 33 | `.status-bar` font-size / weight | `--cg-font-size-sm` / `--cg-font-weight-semibold` | ✅ (14px min OK) | — |
| 35 | `.status-bar svg` width/height | `--cg-spacing-16` | ✅ (spacing used for icon dims; acceptable) | — |
| 37-39 | `.status-bar.safe` bg/color/border | `--cg-color-status-success-*` | ✅ | — |
| 41-44 | `.status-bar.flagged` bg/color/border | `--cg-color-status-warning-*` | ✅ | — |
| 46-49 | `.status-bar.blocked` bg/color/border | `--cg-color-status-error-*` | ✅ | — |
| 54 | `.severity` font-size / weight | `--cg-font-size-xs` / `--cg-font-weight-semibold` | ✅ (xs = label/badge, allowed) | — |
| 55 | `.severity` padding / radius | `--cg-spacing-2` `--cg-spacing-8` / `--cg-border-radius-full` | ✅ | — |
| 56 | `.severity` letter-spacing | `--cg-letter-spacing-wide` | ✅ (exists in token dist) | — |
| 58-61 | `.severity.*` bg/color | `--cg-color-status-{success/warning/error}-*` | ✅ | — |
| 64 | `.checks` padding | `--cg-spacing-16` `--cg-spacing-20` | ✅ | — |
| 66-69 | `.checks-label` font/color/spacing | `--cg-font-size-xs`, `--cg-color-surface-container-outlined`, `--cg-letter-spacing-wide`, `--cg-spacing-12` | ⚠️ color is a `container` token on a `cards` panel (minor) | flag only |
| 73-75 | `.check` gap/padding/border | `--cg-spacing-12`, `--cg-spacing-6`, `--cg-border-width-50` + `--cg-color-surface-cards-divider` | ✅ | — |
| 79-80 | `.check-icon` margin / svg dims | `--cg-spacing-2`, `--cg-spacing-12` | ✅ | — |
| 81-82 | `.check-icon.pass/.fail` color | `--cg-color-status-success-text-default` / `--cg-color-status-error-text-default` | ✅ | — |
| 85 | `.check-policy` font/color | `--cg-font-size-sm`, `--cg-color-surface-base-text`, `--cg-font-weight-medium` | ✅ | — |
| 86 | `.check-reason` font/color | `--cg-font-size-xs`, `--cg-color-surface-container-outlined` | ✅ (secondary text) | — |
| 90-91 | `.blocked-section` padding/border | `--cg-spacing-16/20`, `--cg-border-width-50` + `--cg-color-surface-cards-divider` | ✅ | — |
| 94-97 | `.blocked-label` font/color/spacing | `--cg-font-size-xs`, `--cg-color-status-error-text-default`, `--cg-letter-spacing-wide`, `--cg-spacing-12` | ✅ | — |
| 100 | `.blocked-content` padding / radius | `--cg-spacing-12` `--cg-spacing-16` / `--cg-border-radius-100` | ✅ | — |
| 101-102 | `.blocked-content` bg/border | `--cg-color-status-error-background/border-default` | ✅ | — |
| 103 | `.blocked-content` font/color | `--cg-font-size-sm`, `--cg-color-surface-base-text` | ✅ | — |
| 104 | `.blocked-content` font-family | `--cg-font-family-mono` | ✅ | — |
| 105 | `.blocked-content` line-height | `--cg-line-height-relaxed` | ✅ | — |
| 106 | `.blocked-content` filter | `blur(4px)` | ❌ magic px | no blur-radius token in vocab → flag only |
| 107 | `.blocked-content` transition | `filter` + `--cg-transition-duration-default` + `--cg-transition-easing-default` | ✅ (explicit, not `all`) | — |
| 112-113 | `.blocked-hint` font/color/margin | `--cg-font-size-xs`, `--cg-color-surface-container-outlined`, `--cg-spacing-6` | ✅ | — |
| 118-120 | `.actions` padding/border/gap | `--cg-spacing-16/20`, `--cg-border-width-50` + `--cg-color-surface-cards-divider`, `--cg-spacing-12` | ✅ | — |
| 123 | `.override-warning` font/color | `--cg-font-size-xs`, `--cg-color-surface-container-outlined` | ✅ | — |
| 127 | `.btn` padding / radius | `--cg-spacing-6` `--cg-spacing-12` / `--cg-border-radius-100` | ✅ | — |
| 128-129 | `.btn` border/bg/color | `--cg-border-width-50` + `--cg-color-surface-cards-border`, `transparent`, `--cg-color-surface-container-outlined` | ✅ (transparent allowed) | — |
| 130 | `.btn` font-size / weight | `--cg-font-size-xs` / `--cg-font-weight-medium` | ✅ (control label, xs allowed) | — |
| 132 | `.btn` transition | enumerated `border-color`/`color`/`background` + fast duration + easing | ✅ (explicit) | — |
| 134 | `.btn:hover` | `--cg-color-surface-cards-hover-border` / `--cg-color-surface-base-text` | ✅ | — |
| 135 | `.btn:active` transform | `scale(var(--cg-interaction-press-scale))` | ✅ (exists in token dist) | — |
| 136 | `.btn:focus-visible` box-shadow | `0 0 0 3px var(--cg-overlay-accent-strong)` | ❌ magic `3px` spread + non-semantic focus color | swap color → `--cg-color-focus-ring`; `3px` spread has no token (flag) |
| 143 | `.btn.danger:hover` | bg `--cg-color-status-error-text-default`, color `--cg-overlay-dark-text` | ✅ (inverts error text as fill — acceptable, both real tokens) | — |
| 146 | `:host([rounded="none"]) .panel` radius | `0` | ✅ (0 allowed) | — |
| 147 | `:host([rounded="sm"])` radius | `--cg-border-radius-50` | ✅ | — |
| 148 | `:host([rounded="md"])` radius | `--cg-border-radius-100` | ✅ | — |
| 149 | `:host([rounded="lg"])` radius | `--cg-component-card-radius` | ✅ | — |

### 2. Styling Audit

- **Border radius:** Driven by tier-3 `--cg-component-card-radius` for the panel with a clean `none/sm/md/lg` override ladder using tier-1 `--cg-border-radius-*`. Inner elements (`.severity` full pill, `.blocked-content`, `.btn` at `radius-100`) are consistent. Good.
- **Spacing:** Entirely on the token scale (`--cg-spacing-2/6/8/12/16/20`). No magic spacing. Consistent 16/20 vertical/horizontal section padding rhythm.
- **Font-size accessibility:** Body/primary text uses `--cg-font-size-sm` (14px ✅) — status text, check policy, blocked content. `--cg-font-size-xs` is used only for labels, badges (`.severity`), hints, button controls, and secondary reasons — all legitimately small-text roles, not body copy. No body text below 14px.
- **Translucent vs solid borders:** All borders use solid semantic `--cg-color-*-border` / `--cg-color-surface-cards-divider` tokens. No raw rgba borders. Focus ring (line 136) uses the translucent `--cg-overlay-accent-strong` rather than the semantic `--cg-color-focus-ring` — see Fixes.
- **Transitions explicit vs all:** No `transition: all`. Line 107 (filter) and line 132 (enumerated border-color/color/background) are explicit with proper duration + easing motion tokens. `reducedMotion` style mixin is imported and applied via `static styles`. Good.
- **Dark-theme suitability:** Uses surface-cards + status semantic families which are theme-aware; danger-hover inverts error-text to fill with `--cg-overlay-dark-text` foreground, which reads on both themes. Suitable.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | ✅ | `.panel` + `.status-bar.safe/.flagged/.blocked` driven by `status` prop | None |
| Hover | ✅ | `.btn:hover` (line 134), `.btn.danger:hover` (line 143), `.blocked-content` has `cursor:pointer` reveal | Blocked-content reveal target has no hover affordance beyond cursor |
| Active/Press | ✅ | `.btn:active` scale via `--cg-interaction-press-scale` (line 135) | None |
| Focus-visible | ⚠️ | `.btn:focus-visible` box-shadow ring (line 136) | Uses overlay token + magic `3px`; blocked-content reveal region is a `<div>` and is NOT focusable/keyboard-operable (see Interaction) |
| Disabled | N/A | No disabled affordance defined for buttons | Buttons are always actionable; acceptable for this component's model |
| Loading | N/A | Guardrail is a result display, not async-trigger UI | No loading state needed |
| Error | ✅ | `status="blocked"` / `severity.critical` / `.check-icon.fail` express error semantics | None |
| Success | ✅ | `status="safe"` / `severity.low` / `.check-icon.pass` | None |

### 4. Interaction Audit

- **Keyboard:** "Report Issue" and "Override" are real `<button>`s — natively focusable and Enter/Space activatable. ✅ However the **blocked-content reveal** (lines 206-207) is a `<div>` with a `@click` handler — **not keyboard-operable, no `tabindex`, no `role="button"`, no `aria-pressed`/`aria-expanded`**. Keyboard and screen-reader users cannot reveal/hide. P1 a11y gap (described here, not a token fix).
- **ARIA:** Panel has `role="alert"`, `aria-live="polite"`, and `aria-label="Safety filter: ${status}"` (line 181) — appropriate for a safety announcement. SVG icons are decorative (inherit `currentColor`) but lack `aria-hidden="true"`; status meaning is duplicated in adjacent text, so acceptable but `aria-hidden` would be cleaner. The reveal `<div>` lacks any ARIA state.
- **CustomEvents:** Three events, all `bubbles: true, composed: true` (cross-shadow-DOM correct):
  - `ai-guardrail-reveal` → `detail: { revealed }` ✅
  - `ai-guardrail-report` → `detail: { status, checks }` ✅
  - `ai-guardrail-override` → `detail: { status, severity }` ✅
  All match the JSDoc `@fires` declarations. Detail payloads are sensible.
- **Touch targets:** `.btn` is `--cg-spacing-6` (≈6px) vertical + `--cg-spacing-12` horizontal padding around `--cg-font-size-xs` text → roughly ~24-28px tall, **below the 44px minimum**. The blocked-content tap region is large enough. Button enlargement is a design change (noted here, not in fixes array).

### 5. Visual Design Check

Modern and sleek — a vertically stacked card with a colored status header, divider-separated policy-check rows, a blurred-content reveal pattern (a genuinely nice safety affordance), and a footer action bar. Radius is tokenized and consistent. Breathing room is good (16/20 section padding). Dividers use the proper `surface-cards-divider`. Typography hierarchy is clear: semibold status text → uppercase tracked micro-labels → mono blocked content → xs secondary reasons. The blur-to-reveal interaction is showcase-worthy. Two blemishes hold it back from flawless: the focus ring uses a non-semantic overlay token with a magic spread, and the reveal control is a non-semantic `<div>`. Visually it is HeroUI/Vercel-tier.

**Verdict: strong**

### 6. Fixes Needed

1. **Line 136** — focus ring uses a non-semantic overlay color. Change `box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);` → `box-shadow: 0 0 0 3px var(--cg-color-focus-ring);`. Why: focus indication must use the dedicated semantic `--cg-color-focus-ring` token (verified in colors vocab), not a generic accent overlay. (The `3px` spread is a magic px but no focus-ring-width token exists in the vocab, so it is left as-is and flagged.)

**Flags (no token-verified fix available — described, not auto-fixed):**
- **Line 106** — `filter: blur(4px)` uses a magic `4px` radius; no blur-radius token exists in the vocab. Recommend adding a tier-1/tier-3 blur token or documenting the exception.
- **Line 136** — `3px` focus-ring spread is a bare magic px with no matching width token.
- **Lines 206-207 (a11y, P1)** — the blocked-content reveal `<div>` is not keyboard-operable: add `tabindex="0"`, `role="button"`, `aria-pressed=${this._revealed}`, and a keydown handler for Enter/Space.
- **Line 127/130 (design)** — `.btn` touch target is ~24-28px tall, below the 44px minimum; enlarge padding/min-height (design change, not a token violation).
- **Line 67** — `.checks-label` uses `--cg-color-surface-container-outlined` (a `container` family token) inside a `cards` surface; minor cross-family inconsistency, both tokens valid.

### Research-backed enhancements

Concrete modernizations aligned with 2025-era patterns (shadcn/ui, Vercel, Linear, HeroUI). Each is specific to this guardrail component.

1. **Make the reveal a first-class disclosure with a spring-eased, layout-aware transition, not just a blur swap.** Today the blocked-content reveal toggles a `filter: blur(4px)` with a linear `--cg-transition-duration-default`. The Linear/Stripe micro-interaction vocabulary (see UI Motion's catalog of 30+ patterns) reveals "protected" content by combining a blur fade with a subtle vertical lift (`translateY` 2-4px settling to 0) and spring-physics easing — content *arrives* rather than blinks in. Tokenize a `--cg-component-guardrail-reveal-blur` to replace the magic `4px`, and layer the existing blur transition with an opacity + transform on the content so the reveal reads as a deliberate unmasking. (Source: [UI Motion micro-interactions library](https://uimotion.fyi/).)

2. **Adopt shadcn/ui's "lock affordance" for the reveal trigger — an inline lock/unlock icon that morphs on toggle.** The bare blurred `<div>` with `cursor:pointer` gives no semantic cue that it is unlockable. shadcn/ui's pattern for gated/sensitive content pairs the masked region with a centered lock glyph + a "Click to reveal" label that crossfades to an unlock glyph on activation. This simultaneously fixes the P1 a11y gap (Interaction §4): promote it to `role="button"`, `tabindex="0"`, `aria-pressed=${this._revealed}`, with the icon swap driven by the same state. The affordance and the accessibility fix are the same change. (Source: [shadcn/ui components](https://ui.shadcn.com/docs/components).)

3. **Add a left status accent rail to the panel — the Linear/Vercel "semantic edge" pattern.** Linear and Vercel alert/callout surfaces signal severity with a 2-3px colored left border (or inset box-shadow rail) keyed to status, letting the eye triage state pre-attentively without reading the header. Drive a `box-shadow: inset 3px 0 0 0 var(--cg-color-status-{safe|warning|error}-border-default)` on `.panel` from the `status` prop. It reinforces the existing colored status-bar at near-zero layout cost and matches the modern callout idiom. (Source: [Vercel Academy core concepts](https://vercel.com/academy/shadcn-ui/core-concepts).)

4. **Animate the per-check rows with a staggered enter, and add a count/summary chip in the status bar.** HeroUI and Linear list patterns reveal grouped items with a short staggered fade-up (~20-30ms cascade) so the check list reads as it populates — valuable for the streaming/generative context this library targets. Pair this with a `"3/4 passed"` summary chip in `.status-bar` (reusing the `.severity` pill styling) so the headline carries a scannable pass-ratio before the user expands the rows. Gate the stagger behind the already-imported `reducedMotion` mixin. (Source: [UI Motion micro-interactions library](https://uimotion.fyi/).)

5. **Enlarge the footer buttons to a 2025 touch-compliant density and give `.btn.danger` an intent-tiered visual weight.** The `.btn` target is ~24-28px tall (Interaction §4), below the 44px minimum; shadcn/ui and HeroUI default control heights land at ~36-40px with a `min-height` floor. Add `--cg-component-guardrail-action-min-height` and bump padding. Additionally, the destructive "Override" action should read as the heavier-consequence button via a tinted-destructive resting state (subtle `--cg-color-status-error-background-*` fill at rest, solid on hover) rather than sharing the neutral resting style with "Report Issue" — the shadcn destructive-button hierarchy. (Source: [shadcn/ui](https://ui.shadcn.com/).)

6. **Introduce a compact `density="compact"` variant for inline/streaming usage.** Generative-UI trees often render guardrails inline within a chat or result stream where the full 16/20 padded card is too heavy. The Linear/Vercel density pattern exposes a single attribute that collapses section padding to the next-lower spacing step (`--cg-spacing-8`/`12`), hides the `.override-warning` helper text, and shrinks the status bar — same tokens, tighter rhythm — so the component scales from a standalone safety card down to an inline annotation. (Source: [React UI libraries in 2025 comparison](https://makersden.io/blog/react-ui-libs-2025-comparing-shadcn-radix-mantine-mui-chakra).)
