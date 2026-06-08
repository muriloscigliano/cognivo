## ai-feedback — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 27 | animation duration/easing | `--cg-transition-duration-default` / `--cg-transition-easing-ease-out` | Yes | None |
| 33 | gap | `--cg-spacing-8` | Yes | None |
| 38–83 | @keyframes geometry | scale/translate/opacity/stroke literals | Yes (keyframe positions exempt) | None |
| 89 | gap | `--cg-spacing-6` | Yes | None |
| 90 | padding-bottom | `--cg-spacing-8` | Yes | None |
| 91 | border-bottom | `--cg-border-width-50` solid `--cg-color-surface-cards-divider` | Yes | None |
| 94 | font-size | `--cg-font-size-xs` | Label text, below 14px | Borderline — caption label; flagged in §2 |
| 95 | color | `--cg-color-input-text-placeholder` | Yes | None |
| 96 | margin-right | `--cg-spacing-4` | Yes | None |
| 101–102 | width/height | `--cg-spacing-32` | Yes (sizing via spacing token) | None |
| 103 | border-radius | `--cg-border-radius-100` | Yes | None |
| 104 | border | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | Yes | None |
| 106 | color | `--cg-color-input-text-placeholder` | Yes | None |
| 107 | font-size | `--cg-font-size-base` | Yes | None |
| 112–116 | transition | explicit props, duration/easing tokens | Yes (explicit, not `all`) | None |
| 119 | border-color | `--cg-color-input-border-hover` | Yes | None |
| 120 | background | `--cg-overlay-dark-subtle` | Yes | None |
| 123 | active scale | `--cg-interaction-press-scale` | Yes (interaction token) | None |
| 125–127 | selected-up border/bg/color | `--cg-color-status-success-*` | Yes (positive feedback) | None |
| 128 | animation | `400ms` / `--cg-transition-easing-spring` | Yes (keyframe duration literal) | None |
| 129 | box-shadow glow | `0 0 12px var(--cg-color-status-success-background-default)` | Color token valid; `12px` is blur geometry | None (shadow blur exempt) |
| 131–137 | selected-down border/bg/color/glow | `--cg-color-status-error-*` | Yes (negative feedback) | None |
| 138 | focus-visible ring | `0 0 0 3px var(--cg-overlay-accent-strong)` + `--cg-outline-offset-default` | Color/offset valid; `3px` spread borderline | None (focus-ring spread accepted) |
| 144 | star color (empty) | `--cg-color-surface-cards-border` | Yes | None |
| 145 | font-size | `--cg-font-size-xl` | Yes | None |
| 147 | padding | `--cg-spacing-2` | Yes | None |
| 148–150 | transition | explicit, duration/easing tokens | Yes | None |
| 154 | star active color | `--cg-color-status-warning-text-default` | Yes (amber star) | None |
| 155–156 | animation/delay | `350ms` / spring / `calc(var(--star-index,0)*50ms)` | Yes (positional index default exempt) | None |
| 158–159 | active scale / focus ring | `--cg-interaction-press-scale` / accent overlay | Yes | None |
| 162 | svg fill transition | `--cg-transition-duration-fast` / easing | Yes | None |
| 163 | active svg fill | `--cg-color-status-warning-text-default` | Yes | None |
| 167–168 | width/height | `--cg-spacing-32` | Yes | None |
| 169 | border-radius | `--cg-border-radius-100` | Yes | None |
| 170 | border | `--cg-border-width-50` solid `transparent` | Yes (transparent exempt) | None |
| 172 | font-size | `--cg-font-size-xl` | Yes | None |
| 177–182 | transition / opacity | explicit, tokens / `0.5` | Yes | None |
| 184 | hover bg | `--cg-overlay-dark-subtle` | Yes | None |
| 185 | active scale | `--cg-interaction-press-scale` | Yes | None |
| 188 | selected border-color | `--cg-color-surface-base-text` | Yes | None |
| 189 | selected bg | `--cg-overlay-accent-subtle` | Yes | None |
| 192 | focus ring | accent overlay / outline offset | Yes | None |
| 195–196 | dimmed opacity | `0.3` / `0.6` | Yes (opacity literal) | None |
| 202 | gap | `--cg-spacing-6` | Yes | None |
| 203 | animation | duration/easing tokens | Yes | None |
| 206 | padding | `--cg-spacing-4` `--cg-spacing-12` | Yes | None |
| 207 | border-radius | `--cg-border-radius-100` | Yes | None |
| 208 | border | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | Yes | None |
| 210 | color | `--cg-color-input-text-placeholder` | Yes | None |
| 211 | font-size | `--cg-font-size-xs` | **No — interactive chip body text <14px** | **Yes → `--cg-font-size-sm`** |
| 212 | font-weight | `--cg-font-weight-semibold` | Yes | None |
| 214–219 | transition | explicit, tokens | Yes | None |
| 221–222 | animation/delay | `350ms` ease-out / `calc(var(--chip-index,0)*60ms)` | Yes (positional default exempt) | None |
| 225–227 | hover border/color/transform | `--cg-color-input-border-hover` / `--cg-color-surface-base-text` | Yes | None |
| 231–235 | selected border/color/bg/glow | `--cg-color-surface-base-text` / `--cg-overlay-accent-subtle` / `--cg-overlay-accent-medium` | Yes | None |
| 237 | focus ring | accent overlay / outline offset | Yes | None |
| 245 | width | `100%` | Yes (% exempt) | None |
| 246 | min-height | `--cg-spacing-64` | Yes | None |
| 247 | padding | `--cg-spacing-8` `--cg-spacing-12` | Yes | None |
| 248 | border | `--cg-border-width-50` solid `--cg-color-input-border-default` | Yes | None |
| 249 | border-radius | `--cg-border-radius-100` | Yes | None |
| 250 | background | `--cg-color-input-background-default` | Yes | None |
| 251 | color | `--cg-color-surface-base-text` | Yes | None |
| 253 | font-size | `--cg-font-size-xs` | **No — textarea body input text <14px** | **Yes → `--cg-font-size-sm`** |
| 256 | transition | explicit border-color | Yes | None |
| 259 | focus border-color | `--cg-color-input-border-focus` | Yes | None |
| 260 | focus box-shadow | `0 0 0 3px var(--cg-overlay-accent-strong)` | Color valid; spread borderline | None |
| 262 | placeholder color | `--cg-color-input-text-placeholder` | Yes | None |
| 272 | padding | `--cg-spacing-6` `--cg-spacing-16` | Yes | None |
| 273 | border-radius | `--cg-border-radius-100` | Yes | None |
| 275 | background | `--cg-color-action-primary-background-default` | Yes | None |
| 276 | color | `--cg-color-action-primary-text-default` | Yes | None |
| 278 | font-size | `--cg-font-size-xs` | **No — submit button body text <14px** | **Yes → `--cg-font-size-sm`** |
| 279 | font-weight | `--cg-font-weight-bold` | Yes | None |
| 281–284 | transition | explicit, tokens | Yes | None |
| 286 | hover background | `--cg-color-action-primary-background-hover` | Yes | None |
| 287 | active scale | `--cg-interaction-press-scale` | Yes | None |
| 288 | disabled opacity | `0.4` | Yes (opacity literal) | None |
| 289 | focus ring | accent overlay / outline offset | Yes | None |
| 297 | ripple gradient | `--cg-overlay-white-strong` / transparent | Yes (gradient stops exempt) | None |
| 303 | ripple animation | `500ms ease-out` | Yes (keyframe duration) | None |
| 311 | font-size | `--cg-font-size-sm` | Yes (≥14px) | None |
| 312 | color | `--cg-color-status-success-text-default` | Yes | None |
| 313 | font-weight | `--cg-font-weight-medium` | Yes | None |
| 316 | font-size | `--cg-font-size-base` | Yes | None |
| 320–322 | check stroke geometry/anim | `24` dash / `400ms` | Yes (unitless SVG + keyframe) | None |
| 329–333 | rounded variants radius | `0` / `--cg-border-radius-50/100/150/full` | Yes | None |
| 336–349 | reduced-motion | `animation: none` | Yes | None |

### 2. Styling Audit

- **Border radius:** Consistent `--cg-border-radius-100` for all controls, with a full `rounded` variant scale (50/100/150/full) on `.container`. Good.
- **Spacing:** All spacing from the tier-1 scale (`--cg-spacing-2/4/6/8/12/16/32/64`). No magic numbers.
- **Font-size accessibility:** Multiple interactive/body strings use `--cg-font-size-xs` (below the 14px minimum): the `.tag` chips (211), the `textarea` input (253), and the `.submit-btn` label (278). These are interactive body text and should be `--cg-font-size-sm`. The `.rating-label` (94) is a small caption label — borderline; left as-is but flagged.
- **Translucent vs solid borders:** Mix is intentional — solid semantic borders (`--cg-color-surface-cards-border`, `--cg-color-input-border-*`) on resting controls, translucent `--cg-overlay-accent-*` for focus rings and selected glows. Consistent and dark-suitable.
- **Transitions:** All explicitly enumerated (border-color, background, color, box-shadow, transform, opacity). No `transition: all`. Durations/easings from motion tokens. Reduced-motion media query disables all animations. Exemplary.
- **Dark-theme suitability:** Semantic surface/status/overlay tokens throughout; no raw hex or tier-1 palette colors. Renders correctly dark-first.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | Resting thumb/star/emoji/tag/submit styles | None |
| Hover | Yes | `:hover` on every control (border, bg, transform lift) | None |
| Active/Press | Yes | `:active` scale via `--cg-interaction-press-scale` + submit ripple | None |
| Focus-visible | Yes | `:focus-visible` accent ring on all interactive elements | None |
| Disabled | Yes | `.submit-btn:disabled` (opacity 0.4, not-allowed); button is also gated by `_rating !== null` in render | None — only submit can disable; rating controls intentionally always enabled |
| Loading | N/A | Feedback submit is synchronous/local; no async pending state | N/A by design |
| Error | N/A | No validation/error path; submit only fires when a rating exists | N/A by design |
| Success | Yes | `.submitted` confirmation view with animated check + "Thank you" (425–428) | None |

### 4. Interaction Audit

- **Keyboard:** All controls are native `<button>`/`<textarea>` elements — Enter/Space activation and Tab order come for free. No custom keydown handling needed.
- **ARIA:** `role="group"` + `aria-label` on the container ("Rate this response") and tag group ("Select issues"). Thumb/emoji buttons expose `aria-pressed`; emoji buttons have descriptive `aria-label="Rating N of 5: <label>"`; star buttons label "N star(s)". Submitted view uses `role="status"` + `aria-live="polite"`. Strong coverage.
  - Minor gap: star buttons do not expose `aria-pressed`/selected state to AT (only visual `.active`). Tags expose `aria-pressed` correctly. Flagged, not a token issue.
- **CustomEvents:** `ai-feedback-submit` is `bubbles: true, composed: true` (crosses shadow boundary). Detail carries `rating, mode, tags, comment, messageId` with `undefined` omitted for empty comment/messageId. Correct and complete.
- **Touch targets:** Thumb/emoji buttons are `--cg-spacing-32` (32px) — below the 44px recommendation. Star buttons (xl glyph + `--cg-spacing-2` padding) and tag chips are also under 44px tall. These are sizing/design changes (not token violations) — see flags below.

### 5. Visual Design Check

Modern and sleek: animated rating reactions (pop/jelly/star-cascade), chip reveal with staggered delays, a submit ripple, and an animated success checkmark draw. Consistent `--cg-border-radius-100` rounding, generous `--cg-spacing-8` column gap, and a divider under the rating row give clear hierarchy. Status-colored thumbs (green/red) and amber stars read instantly. Dark-first with semantic overlays. The only blemish is sub-14px text on the chips/textarea/submit label, which slightly undercuts the polish and a11y. Showcase-ready after the font-size bump.

Verdict: **strong**

### 6. Fixes Needed

1. **Line 211** — `.tag` `font-size: var(--cg-font-size-xs);` → `font-size: var(--cg-font-size-sm);` — interactive chip body text must be ≥14px (`--cg-font-size-sm`).
2. **Line 253** — `textarea` `font-size: var(--cg-font-size-xs);` → `font-size: var(--cg-font-size-sm);` — body input text must be ≥14px.
3. **Line 278** — `.submit-btn` `font-size: var(--cg-font-size-xs);` → `font-size: var(--cg-font-size-sm);` — primary action label must be ≥14px.

**Flags (not token violations — design/a11y, no fix applied):**
- Touch targets: thumb/emoji buttons are 32px (`--cg-spacing-32`); stars and tag chips are under 44px tall. Consider enlarging to meet the 44px minimum.
- Star buttons lack `aria-pressed`/selected state for assistive tech (only visual `.active`); tags and thumbs/emoji expose it. Consider adding.
- `.rating-label` (line 94) uses `--cg-font-size-xs` — borderline as a caption; acceptable but watch for legibility.

### Research-backed enhancements

Sourced from 2025–2026 feedback/rating patterns at Linear, Vercel/v0, and the shadcn/ui component refresh.

1. **Optimistic submit with a pending → success swap, not a synchronous flip.** The audit marks Loading "N/A by design," but the shadcn/ui 2025 release standardises a centralised Spinner/loading affordance on action buttons so submit feels acknowledged before the network resolves. Even for local feedback, render a brief pending state on `.submit-btn` (disable + inline spinner) before the `.submitted` view, so the success checkmark reads as a *response* rather than an instant cut. Source: shadcn/ui 2025 components ("Spinner & Loading patterns ... consistent loading options"), [shadcn.io](https://www.shadcn.io/).

2. **Compound feedback layer: pair the rating pop with haptics + a single accent-glow pulse.** Muzli's 2026 trend report calls out the shift from simple gestures to *compound gestures with feedback layers* where interaction is "felt before visually confirmed." On thumb/star/emoji `:active`, fire `navigator.vibrate(10)` (gated behind a capability + reduced-motion check) alongside the existing scale, and unify the green/red selected-glow into one short pulse keyframe so the haptic and visual land together. Source: [Muzli — Mobile App Design Trends 2026](https://muz.li/blog/whats-changing-in-mobile-app-design-ui-patterns-that-matter-in-2026/).

3. **Promote the textarea to a progressive-disclosure "tell us more" affordance.** Linear/Vercel keep the primary path single and tuck alternatives behind a subtle, non-second-class link rather than showing every control at once. Collapse the comment `textarea` by default and reveal it (the staggered-chip animation already in this component is the right motion) only after a rating is chosen or via a quiet "Add a comment" link — reducing the resting form to one decision and lowering cognitive load. Source: [Vercel Academy — shadcn/ui Core Concepts](https://vercel.com/academy/shadcn-ui/core-concepts) and Linear's "primary option + subtle other-methods link" pattern.

4. **Treat the rating row as a true Input Group / Button Group, not loose buttons.** shadcn/ui's 2025 Input Group & Button Group wrap grouped controls into a single composable unit with shared border, focus, and ARIA semantics. Wrap the thumb/emoji/star set in a `role="radiogroup"` with each option `role="radio"` + `aria-checked`, which simultaneously closes the audit's flagged gap (stars expose no `aria-pressed`/selected state to AT) and gives roving-tabindex arrow-key navigation across the scale — denser and more keyboard-efficient than Tab-through-every-button. Source: [shadcn.io](https://www.shadcn.io/) (Input/Button Group standardised wrappers).

5. **Density + touch-target fix via a 44px hit-area without visual bloat.** The audit flags 32px thumb/emoji and sub-44px star/chip targets. Keep the current compact glyph sizing but expand the *interactive* area with a transparent `::before` inset to 44×44px (a pattern common in shadcn icon-button variants), satisfying the WCAG 2.5.5 target minimum while preserving the tight, Linear-style visual density. Source: [shadcn/ui components](https://ui.shadcn.com/docs/components) (icon-button hit-area composition).

6. **Single chromatic accent for selected state, status color reserved for semantics.** Linear's near-black surface uses one chromatic accent (lavender-blue) as the sole highlight. This component is already disciplined (accent overlays for selection, status green/red only for thumbs-up/down meaning). Carry that further: ensure star and chip *selection* lean on `--cg-overlay-accent-*` only and never borrow status hues, so amber/green/red stay reserved for genuine sentiment — keeping the dark surface calm and the accent meaningful. Source: Linear design philosophy ("near-black product-focused design with lavender-blue as the single chromatic accent"), via [shadcn.io](https://www.shadcn.io/) roundup.
