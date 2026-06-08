## ai-onboarding — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 54 | animation duration | `var(--cg-transition-duration-fast)` | ✅ | — |
| 54 | animation easing | `var(--cg-transition-easing-default)` | ✅ | — |
| 56 | max-width | `440px` (bare) | ⚠️ | Magic px; no `--cg-component-ai-onboarding-width` token exists. Flag only (no real token to swap to). |
| 66 | gap | `var(--cg-spacing-12)` | ✅ | — |
| 75 | color | `var(--cg-color-surface-container-outlined)` | ✅ | dismiss icon idle color — semantic, fine |
| 77 | padding | `var(--cg-spacing-4)` | ✅ | — |
| 79 | border-radius | `var(--cg-border-radius-50)` | ✅ | — |
| 84-85 | transition | explicit `color`, `background` w/ duration+easing tokens | ✅ | not `all` |
| 88 | color (hover) | `var(--cg-color-surface-base-text)` | ✅ | — |
| 89 | background (hover) | `var(--cg-color-action-secondary-background-hover)` | ✅ | — |
| 91 | transform | `scale(var(--cg-interaction-press-scale))` | ✅ | tokenized press scale |
| 94 | box-shadow | `0 0 0 3px var(--cg-overlay-accent-strong)` | ⚠️ | Real token, but `--cg-color-focus-ring` is the dedicated semantic focus token; bare `3px` spread is idiomatic here. See Fixes. |
| 100 | letter-spacing | `var(--cg-letter-spacing-wide)` | ✅ | explicitly valid |
| 106 | gap | `var(--cg-spacing-6)` | ✅ | — |
| 110-111 | width/height (dot) | `var(--cg-spacing-8)` | ✅ | reusing spacing as size — acceptable |
| 112 | border-radius | `var(--cg-border-radius-full)` | ✅ | — |
| 113 | background | `var(--cg-color-surface-cards-border)` | ✅ | inactive dot |
| 117-120 | transition | explicit `background`,`transform`,`opacity` w/ tokens | ✅ | — |
| 123/129 | background (completed/active) | `var(--cg-color-action-primary-background-default)` | ✅ | — |
| 124 | opacity | `0.5` (bare) | ⚠️ | `--cg-opacity-50` exists; see Fixes |
| 127 | opacity (hover) | `0.85` (bare) | ⚠️ | No exact `0.85` opacity token (`--cg-opacity-75`/`-100` only). Flag only. |
| 130 | transform | `scale(1.3)` (bare) | ⚠️ | Magic scale factor; no token. Flag only (unitless transform, not in flagged px categories). |
| 135 | box-shadow | `0 0 0 3px var(--cg-overlay-accent-strong)` | ⚠️ | same as line 94 |
| 142 | gap | `var(--cg-spacing-6)` | ✅ | — |
| 147 | height (bar track) | `var(--cg-spacing-4)` | ✅ | — |
| 148 | background | `var(--cg-color-surface-cards-border)` | ✅ | — |
| 149/155 | border-radius | `var(--cg-border-radius-full)` | ✅ | — |
| 154 | background (fill) | `var(--cg-color-action-primary-background-default)` | ✅ | — |
| 156 | transition | `width` w/ `--cg-transition-duration-slow` + `--cg-transition-easing-ease-out` | ✅ | — |
| 163 | gap | `var(--cg-spacing-4)` | ✅ | — |
| 171-172 | width/height (node) | `var(--cg-spacing-24)` | ✅ | — |
| 175 | background | `var(--cg-color-surface-cards-border)` | ✅ | — |
| 176 | color | `var(--cg-color-surface-container-outlined)` | ✅ | — |
| 177 | font-size | `var(--cg-font-size-xs)` | ✅ | node-number label, not body text |
| 178 | font-weight | `var(--cg-font-weight-bold)` | ✅ | — |
| 183-184 | transition | explicit `background`,`color` | ✅ | — |
| 187-188 | bg/color (completed) | `--cg-color-action-primary-background-default` / `-text-default` | ✅ | — |
| 192-193 | bg/color (active) | same | ✅ | — |
| 198 | box-shadow | `0 0 0 3px var(--cg-overlay-accent-strong)` | ⚠️ | same focus-token note |
| 202 | min-width | `var(--cg-spacing-8)` | ✅ | — |
| 203 | height (line) | `var(--cg-border-width-100)` | ✅ | 1px connector line via border-width token |
| 204/208 | background | `--cg-color-surface-cards-border` / `--cg-color-action-primary-background-default` | ✅ | — |
| 205 | transition | `background` w/ tokens | ✅ | — |
| 213 | animation | `var(--cg-transition-duration-default)` + `--cg-transition-easing-ease-out` | ✅ | — |
| 216-222 | @keyframes translateX | `8px` / `-8px` | ✅ | keyframe positions exempt |
| 228/231 | margin | `var(--cg-spacing-16)` | ✅ | — |
| 251-254 | sr-only | `1px`, `-1px`, `rect(0,0,0,0)` | ✅ | a11y clip pattern, exempt |

All `var()` tokens referenced exist in the vocab. No made-up tokens, no comma-fallbacks, no tier-1 palette colors, no raw `#hex`/`rgba()`, no `transition: all`.

### 2. Styling Audit

- **Border radius**: `--cg-border-radius-full` for dots/bar/stepper nodes, `--cg-border-radius-50` for dismiss button. Card radius delegated to `<cg-card rounded=${this.rounded}>` (default `lg`). Consistent and tokenized.
- **Spacing**: Entirely on the spacing scale (`4/6/8/12/16/24`). Good rhythm.
- **Font-size accessibility**: Only typographic text runs through `<cg-text>` (`size="lg"` title, `size="sm"` description, `size="xs"` step labels). Description is `sm` (≥14px) — compliant. The `xs` usages are uppercase step labels and the stepper node numbers, not body copy — acceptable.
- **Translucent vs solid borders**: Dismiss/dot/node idle states use solid semantic surface tokens; no translucent border hacks. Focus rings use translucent accent overlay.
- **Transitions explicit vs all**: Every transition enumerates properties (color/background/transform/opacity/width) with duration + easing tokens. No `transition: all`. Motion tokens used throughout. `prefers-reduced-motion` honored for step content (line 224-226) and via imported `reducedMotion`.
- **Dark-theme suitability**: All colors come from tier-2 semantic surfaces/actions which are theme-resolved. Dark-first safe.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | ✅ | Idle dots/nodes/lines use `--cg-color-surface-cards-border`; dismiss uses outlined color | — |
| Hover | ✅ | `.dismiss-btn:hover`, `.dot.completed:hover` (opacity 0.85) | dot hover uses raw `0.85` opacity (no token); dismiss hover good |
| Active/Press | ✅ | `.dismiss-btn:active` scale via `--cg-interaction-press-scale`; `.dot.active` scale(1.3); active step = primary bg | `scale(1.3)` magic value |
| Focus-visible | ✅ | dots/nodes/dismiss all have `:focus-visible` box-shadow ring; host is focusable (`tabIndex=0`) | ring color uses `--cg-overlay-accent-strong` rather than dedicated `--cg-color-focus-ring`; bare `3px` spread |
| Disabled | ✅ | Future/non-current dots & nodes get `?disabled` + `cursor: not-allowed`; Back button `?disabled` at step 0 | proper |
| Loading | N/A | Onboarding has no async data state | — |
| Error | N/A | No validation/error surface in this component | — |
| Success | ✅ | Final step → "Done"; completed dots/nodes/lines render in primary color; stepper shows checkmark | completion is `complete` event, not an error/visual-fail path |

### 4. Interaction Audit

- **Keyboard**: Host listens for `ArrowRight` (next), `ArrowLeft` (prev), `Escape` (dismiss when dismissible), each with `preventDefault()`. Host is focusable via `tabIndex=0`. Progress dots/nodes are real `<button>`s (Enter/Space native). Good.
- **ARIA**: Card is `role="dialog"` `aria-modal="true"` with `aria-label`. Progress containers are `role="tablist"`; dots/nodes are `role="tab"` with `aria-selected` + descriptive `aria-label` ("Go to step N: title"). Bar uses `role="progressbar"` with valuenow/min/max + label. Live region `.sr-only` `aria-live="polite" aria-atomic="true"` announces step changes. Dismiss button has `aria-label`. Strong coverage.
- **CustomEvents**: `ai-onboarding-next` `{step}`, `-prev` `{step}`, `-step-change` `{from,to}`, `-complete` (no detail), `-dismiss` `{step}`. All `bubbles:true, composed:true`. Detail shapes match JSDoc `@fires`. Note: `_next()` emits `step-change` with `{from: this.active-1, to: this.active}` after incrementing — correct. `_goTo` also emits `step-change`. Consistent.
- **Touch targets**: Dots are `--cg-spacing-8` (~8px) and dismiss button padding `--cg-spacing-4` around a 14px icon (~22px) — both well under the 44px minimum. Stepper nodes are `--cg-spacing-24` (~24px). These are sizing/design changes (enlargement), noted here, not token violations.

### 5. Visual Design Check

Modern and sleek: four progress affordances (numbered/dots/bar/stepper) auto-selected by step count, directional slide animation on step change, elevated card, primary-accent progress fills, checkmark completion in the stepper. Radius is fully rounded for indicators, card radius `lg`. Breathing room via `lg` card padding and consistent spacing scale. Typography hierarchy is clean (lg bold title / sm muted description / xs bold uppercase label). No hard dividers — relies on spacing + the header/footer card slots. HeroUI/Vercel showcase-ready: yes, polished and restrained.

One-word verdict: **strong**.

### 6. Fixes Needed

The component is token-compliant — all referenced tokens are real, no comma-fallbacks, no tier-1 palette, no `transition: all`, no raw hex. The items below are refinements; only #1 swaps to a verified existing token.

1. **Lines 94, 135, 198 — focus-ring color**: `box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong)` → use the dedicated semantic focus token `var(--cg-color-focus-ring)`. Why: the design system ships `--cg-color-focus-ring` specifically for focus indicators; `--cg-overlay-accent-strong` is a generic overlay. (Token verified in vocab.)
2. **Line 124 — dot opacity**: `opacity: 0.5` → `var(--cg-opacity-50)`. Why: a matching opacity token exists; raw `0.5` is an untokenized value. (Verified.)
3. **Flags (no exact token — do NOT auto-fix):**
   - Line 56 `max-width: 440px` — magic px; no `--cg-component-ai-onboarding-width` token exists. Recommend adding a tier-3 component width token rather than inventing one inline.
   - Line 127 `opacity: 0.85` (dot hover) — no `--cg-opacity-85`; nearest are `-75`/`-100`. Pick a tokenized value or add the token.
   - Line 130 `transform: scale(1.3)` — magic scale factor for the active dot; no scale token beyond `--cg-interaction-press-scale`. Consider a tier-1 scale token or accept as an animation constant.
   - Touch targets: dots (~8px), dismiss (~22px), stepper nodes (~24px) fall below the 44px minimum. These are design/sizing changes, not token swaps — enlarge hit areas (e.g. invisible padding) in a follow-up.

### Research-backed enhancements

Modern reference patterns: [shadcn linear stepper block](https://www.shadcn.io/blocks/onboarding-stepper), [setproduct steps-UI guidance](https://www.setproduct.com/blog/steps-ui-design), [Eleken 32 stepper examples](https://www.eleken.co/blog-posts/stepper-ui-examples), [Vercel onboarding-tour](https://onboarding-tour.vercel.app/docs).

1. **Animated connector fill, not just node swap (Linear/shadcn stepper).** Today the stepper connector (`.line`, lines 202-208) flips its `background` between border-gray and primary in one transition. Modern steppers animate the fill *traveling* along the connector as a `width`/`scaleX` 0→100% sweep synced to step advance, mirroring what the progress-bar variant already does (line 156). Add a directional `transform: scaleX()` with `transform-origin: left` on a fill pseudo-element so the line "draws" toward the next node — it reads as forward momentum and reinforces the completed→active relationship. Source: [shadcn linear stepper](https://www.shadcn.io/blocks/onboarding-stepper).

2. **Spring/check-pop on step completion, gated by reduced-motion (setproduct "strong visual states").** The stepper shows a checkmark on completed nodes but no entrance motion. A short scale-bounce on the checkmark (e.g. `scale(0) → scale(1.1) → scale(1)`) at the moment a node transitions to completed gives the "done" milestone weight. The component already imports `reducedMotion`/honors `prefers-reduced-motion` (lines 224-226), so gate it there. Avoids the "instant state flip" that setproduct flags as the most common stepper weakness. Source: [setproduct steps-UI](https://www.setproduct.com/blog/steps-ui-design).

3. **Vertical-stepper layout option for text-dense steps (setproduct: horizontal=linear, vertical=context).** All four current affordances are horizontal. setproduct's explicit guidance: horizontal suits short linear flows, vertical suits steps carrying real description/context — exactly the `sm` description slot this component renders. Add a `orientation="vertical"` variant where the connector runs top-to-bottom and each node's title/description sits inline to its right. This unlocks longer onboarding copy without cramping the card width (the same `440px` flagged at line 56). Source: [setproduct steps-UI](https://www.setproduct.com/blog/steps-ui-design).

4. **Skip / "do this later" affordance — a missing state (Vercel onboarding-tour).** The footer exposes Back/Next/Done and a dismiss (X), but no first-class *skip* path. Production onboarding tours treat skip as a distinct, lower-emphasis action (tertiary/ghost button) separate from hard-dismiss, because abandoning ≠ "remind me later." Emit a dedicated `ai-onboarding-skip {step}` event alongside the existing `-dismiss`, styled with `--cg-color-action-secondary-*` so it sits visually below Next. Source: [Vercel onboarding-tour](https://onboarding-tour.vercel.app/docs).

5. **Hover-preview affordance on upcoming/clickable dots (Eleken: "show whether steps are done/active/upcoming").** Completed dots are clickable (rewind) and have a hover state, but future dots are `?disabled cursor:not-allowed` with no preview. Eleken's pattern set shows the strongest steppers surface a lightweight tooltip/label of the target step's title on dot hover/focus — the data already exists (`aria-label="Go to step N: title"`). Render that label as a visible tooltip (or a persistent caption under the active dot) so users can orient before navigating. Source: [Eleken stepper examples](https://www.eleken.co/blog-posts/stepper-ui-examples).

6. **Enlarge hit areas via invisible padding + denser default rhythm (shadcn/v0 production defaults).** Compounding the touch-target flag (dots ~8px, dismiss ~22px, nodes ~24px): the current shadcn/v0-generated steppers keep the *visual* dot small but wrap each in a ≥44px transparent `<button>` pseudo hit-area, and tighten inter-element gap so the indicator row stays compact while every target meets the 44px minimum. This resolves the a11y touch-target gap without enlarging the visual indicators or breaking the restrained density. Source: [shadcn/ui](https://ui.shadcn.com/).
