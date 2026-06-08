## ai-confidence-slider — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 26 | animation duration | `--cg-transition-duration-default` | Yes | — |
| 26 | animation easing | `--cg-transition-easing-ease-out` | Yes | — |
| 30 | background | `--cg-color-surface-cards-background` | Yes | — |
| 31 | border width | `--cg-border-width-50` | Yes | — |
| 31 | border color | `--cg-color-surface-cards-border` | Yes | — |
| 32 | border-radius | `--cg-component-card-radius` | Yes | — |
| 33 | padding | `--cg-spacing-20` / `--cg-spacing-24` | Yes | — |
| 38 | margin-bottom | `--cg-spacing-8` | Yes | — |
| 41 | font-size | `--cg-font-size-xs` | Borderline | Label is uppercase micro-label; xs is below 14px but acceptable for an eyebrow label, not body text. No fix. |
| 41 | font-weight | `--cg-font-weight-bold` | Yes | — |
| 41 | color | `--cg-color-input-text-placeholder` | Questionable | Semantic mismatch: a static section label is using an input-placeholder color. Flag (no clean drop-in replacement). |
| 42 | letter-spacing | `--cg-letter-spacing-wide` | **NO — token does not exist** | No letter-spacing tokens in vocab. Remove the declaration (no real replacement token exists). |
| 45 | font-size | `--cg-font-size-xs` | Borderline | Count metadata, acceptable as micro-text. |
| 45 | color | `--cg-color-surface-base-text` | Yes | — |
| 48 | font-weight / color | `--cg-font-weight-bold` / `--cg-color-surface-base-text` | Yes | — |
| 52 | margin-bottom | `--cg-spacing-8` | Yes | — |
| 57 | height (track) | `--cg-spacing-6` | Tier mismatch | Slider has `--cg-color-slider-*` but no component height token in vocab. Spacing acceptable; flag tier-2 color gap below. |
| 58 | border-radius | `--cg-border-radius-50` | Yes | — |
| 59 | background gradient | status error/warning/success text-default | Acceptable | Gradient stops for a confidence ramp; status colors are the correct semantic family here. |
| 64–66 | thumb width/height/radius | `--cg-spacing-16` / `--cg-border-radius-full` | Yes | — |
| 67 | thumb background | `--cg-color-surface-base-text` | **NO — wrong family** | Dedicated `--cg-color-slider-thumb-background` exists. |
| 68 | thumb border width | `--cg-spacing-2` | Tier mismatch | Using a spacing token as a border-width. Should be `--cg-border-width-*` (value not confirmable, so flag, not auto-fix). |
| 68 | thumb border color | `--cg-color-surface-cards-background` | Questionable | `--cg-color-slider-thumb-border` exists and is the semantic match. |
| 72 | focus box-shadow | `0 0 0 3px var(--cg-overlay-accent-strong)` | Partial | `3px` is a bare magic px on the focus ring; color should arguably be `--cg-color-focus-ring`. Ring color token exists. |
| 76–78 | -moz thumb | same as webkit | Same issues | Mirror line 67/68 fixes. |
| 82 | -moz focus box-shadow | `0 0 0 3px` | Partial | Same as line 72. |
| 84–86 | -moz track height/radius/gradient | `--cg-spacing-6` / `--cg-border-radius-50` / status gradient | Yes/acceptable | — |
| 91 | top | `calc(-1 * var(--cg-spacing-24))` | Yes | — |
| 92 | left | `var(--thumb-pos, 50%)` | Allowed | Positional JS-index default; exempt per conventions. |
| 94 | font-size / weight | `--cg-font-size-xs` / `--cg-font-weight-bold` | Borderline/Yes | Badge micro-text. |
| 95 | padding / radius | `--cg-spacing-2` `--cg-spacing-8` / `--cg-border-radius-50` | Yes | — |
| 96–97 | badge bg/color | `--cg-color-surface-cards-background` / `--cg-color-surface-base-text` | Yes | — |
| 104 | gap / margin | `--cg-spacing-6` / `--cg-spacing-8` | Yes | — |
| 107 | padding / radius | `--cg-spacing-4` / `--cg-component-card-radius` | Yes | — |
| 108 | border | `--cg-border-width-50` / `--cg-color-surface-cards-border` | Yes | — |
| 109 | color | `--cg-color-input-text-placeholder` | Questionable | Button label using placeholder color; acceptable as muted-default but semantically loose. Flag. |
| 110 | font-size / weight | `--cg-font-size-xs` / `--cg-font-weight-semibold` | Borderline | Preset chip text. |
| 111 | transition | `opacity var(--cg-transition-duration-fast)` | Yes (explicit) | — |
| 113 | hover border/color | `--cg-color-input-border-hover` / `--cg-color-surface-base-text` | Yes | — |
| 115 | focus box-shadow | `0 0 0 3px var(--cg-overlay-accent-strong)` | Partial | Same as line 72. |
| 117 | active border/color/bg | surface-base-text / `--cg-overlay-accent-subtle` | Yes | — |
| 121 | gap / height | `--cg-spacing-1` / `--cg-spacing-32` | Yes | — |
| 122 | padding-top / border-top | `--cg-spacing-8` / `--cg-border-width-50` / surface-cards-border | Yes | — |
| 125 | radius / min-height | `--cg-spacing-2` (radius) / `--cg-spacing-2` | Acceptable | Spacing-as-radius for tiny histogram bars; tolerable. |
| 126 | transition | `opacity var(--cg-transition-duration-fast)` | Yes (explicit) | — |
| 128 | opacity | `0.2` | Allowed | Unitless opacity. |
| 161–163 | `_getBarColor` returns | status error/warning/success text-default | Acceptable | Distribution histogram ramp; status family correct. |
| 203 | bar height calc | `(v / maxVal) * 32` | Runtime | Data-driven JS geometry, not static CSS. Flag (magic `32` mirrors `--cg-spacing-32`). |
| 207 | inline height | `${Math.max(h, 2)}px` | Runtime | Data-driven inline px; not a static token slot. Flag. |

### 2. Styling Audit

- **Border radius:** Container/presets use `--cg-component-card-radius`; track/badge use `--cg-border-radius-50`; thumb `--cg-border-radius-full`. Consistent and tokenized.
- **Spacing:** All static spacing comes from the `--cg-spacing-*` scale. Clean.
- **Font-size accessibility:** Everything visible is `--cg-font-size-xs` (below the 14px / `--cg-font-size-sm` body minimum). These are all eyebrow/micro/metadata labels (uppercase label, count, badge, preset chips), not body copy, so each is individually defensible — but the component has **no** body-text tier at all. Worth a design note: the count line "Showing X of Y" is borderline body text and could move to `--cg-font-size-sm`.
- **Translucent vs solid borders:** Borders use solid semantic surface tokens; focus rings use `--cg-overlay-accent-strong` (translucent). Fine for dark theme.
- **Transitions:** All explicit (`opacity ...`). No `transition: all`. Good. Motion tokens (`--cg-transition-duration-*`) used.
- **Dark-theme suitability:** Surface-cards + base-text + overlay tokens are dark-first. Suitable.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | Track gradient, thumb, presets, badge | — |
| Hover | Partial | Preset buttons have `:hover` (border + color). Slider thumb has **no** hover state | `--cg-color-slider-thumb-hover` exists but is unused; thumb gives no hover feedback. |
| Active/Press | Partial | Preset `.active` (selected) styled; no `:active` press feedback on thumb or buttons | Minor; selected-state covered, press-state not. |
| Focus-visible | Yes | Thumb + preset buttons get `box-shadow` ring on `:focus-visible` | Ring uses `3px` magic px + overlay color instead of `--cg-color-focus-ring`. |
| Disabled | **No** | No `disabled` property, no `:disabled` styling | Slider cannot be disabled; `--cg-color-slider-*` has no disabled but input could be greyed. Design gap. |
| Loading | N/A | Static control, no async fetch of its own. | — |
| Error | N/A | A threshold slider has no invalid value within min/max. | — |
| Success | N/A | No submit/confirm semantics. | — |

### 4. Interaction Audit

- **Keyboard:** Native `<input type="range">` provides Arrow/Home/End/PageUp/PageDown out of the box. Preset `<button>`s are natively Enter/Space activatable and tab-focusable. Good.
- **ARIA:** `role="group"` + `aria-label="Confidence threshold"` on container. Input has `aria-label`, plus `aria-valuemin/valuemax/valuenow` — note these are **redundant/ineffective** on a native range input (the browser derives them from `min`/`max`/`value`); harmless but superfluous. Presets expose `aria-pressed` and a descriptive `aria-label`. Distribution is `aria-hidden="true"` (correct — decorative). Solid a11y.
- **CustomEvents:** `ai-confidence-change` fired on both `@input` and preset click, `bubbles: true, composed: true`, `detail: { value: number }`. Matches the `@fires` JSDoc. Correct.
- **Touch targets:** Thumb is `--cg-spacing-16` (16px) — well below 44px. Preset buttons are `flex:1` wide but only `--cg-spacing-4` vertical padding + xs text, so total height is well under 44px. Both fail the 44px touch-target guideline. (Design change — reported, not in fixes array.)

### 5. Visual Design Check

Clean, modern gradient slider with a floating value badge, preset chips, and a mini distribution histogram — a genuinely sleek pattern. Radius is consistent and tokenized; breathing room (20/24 padding, 8px rhythm) is good; the histogram top-border acts as a divider; typography hierarchy is thin (everything is xs) which flattens the visual hierarchy. The thumb ignoring the dedicated `--cg-color-slider-*` family and the missing thumb hover/disabled states are the main polish gaps. Showcase-ready with minor fixes. Verdict: **strong**.

### 6. Fixes Needed

1. **Line 42** — remove the nonexistent `letter-spacing: var(--cg-letter-spacing-wide);` declaration. No letter-spacing token exists in the vocab, so the variable resolves to nothing (invalid). Drop the property (or hardcode is also banned — removal is the only token-safe option).
2. **Line 67** — thumb `background: var(--cg-color-surface-base-text)` → `var(--cg-color-slider-thumb-background)`. The dedicated slider-thumb token is the correct tier-2 semantic.
3. **Line 77** — Firefox thumb `background: var(--cg-color-surface-base-text)` → `var(--cg-color-slider-thumb-background)` (mirror of #2).
4. **Line 68** — thumb `border: ... solid var(--cg-color-surface-cards-background)` → `solid var(--cg-color-slider-thumb-border)`. Use the dedicated slider-thumb-border token.
5. **Line 78** — Firefox thumb border color `--cg-color-surface-cards-background` → `--cg-color-slider-thumb-border` (mirror of #4).
6. **Lines 72, 82, 115** — focus-ring color `var(--cg-overlay-accent-strong)` → `var(--cg-color-focus-ring)` (dedicated focus-ring semantic token exists and is the correct choice for focus indicators).

Flags (not in fixes array — no verified token / design changes):
- Thumb border-width uses `--cg-spacing-2` instead of a `--cg-border-width-*` token (tier mismatch; correct value not confirmable from vocab).
- Focus-ring `3px` is a bare magic px with no spacing/width token wrapper.
- Thumb has no hover state though `--cg-color-slider-thumb-hover` exists.
- No `disabled` state on the slider.
- Touch targets (thumb 16px, preset chip height) below 44px — design enlargement.
- `--cg-color-input-text-placeholder` used as a static label/button color (lines 41, 109) — semantically loose.
- Redundant `aria-valuemin/max/now` on a native range input.

### Research-backed enhancements

Concrete modernizations for `ai-confidence-slider`, grounded in current (2025-era) slider patterns from HeroUI v3, shadcn/ui, Vercel, and Linear:

1. **Live "fill" track instead of a static full-width gradient.** HeroUI's slider renders a filled segment from the start of the track to the thumb, leaving the remainder as an inactive rail ([HeroUI Slider](https://heroui.com/docs/react/components/slider)). Right now the confidence ramp gradient spans the whole track regardless of value, so the thumb doesn't visually "earn" its position. Drive the fill width from `--thumb-pos` (the var already computed for the badge) and reserve the error→warning→success gradient for the *filled* portion only — the rail behind the thumb goes to a muted `--cg-color-slider-track-background`. This makes the confidence level read instantly without looking at the number.

2. **Snap-to-preset thumb with a spring settle, not a hard jump.** shadcn's slider compositions emphasize tactile feedback on value commit ([shadcn Slider patterns](https://www.shadcnblocks.com/components/slider)). When a preset chip is clicked, the thumb currently teleports. Add a short `transform`/`left` transition on the thumb gated behind `prefers-reduced-motion`, using `--cg-transition-duration-default` + an ease-out (or a subtle overshoot easing if a token exists) so presets feel like the thumb is being "pulled" to them. Keep raw `@input` drags transition-free so dragging stays 1:1.

3. **Thumb hover + active grow micro-interaction (the existing unused token).** Linear and HeroUI both scale/halo the handle on hover and grip ([HeroUI Slider](https://heroui.com/docs/react/components/slider)). Section 3 already flags that `--cg-color-slider-thumb-hover` is unused and there's no `:active` press feedback. Wire `::-webkit-slider-thumb:hover` to the hover token plus a tiny `transform: scale(1.12)`, and `:active` to a `scale(0.96)` press — this also fixes the dead-feeling thumb noted in the States audit. Pair with the 44px touch-target fix by using an invisible expanded hit-area rather than enlarging the visible thumb.

4. **Badge that follows the thumb and shows delta, Linear-style.** Linear's range/threshold controls surface a value bubble that tracks the handle and is suppressed until interaction. The floating badge already exists but is always-on; make it `opacity:0` at rest and fade in on `:hover`/`:focus-within`/`:active` (Vercel/Linear "quiet until engaged" pattern). Optionally append a contextual word ("Low / Balanced / Strict") derived from the value so the number gets a cognitive anchor instead of a bare percentage.

5. **Tighten the micro-typography hierarchy.** The Visual Design check notes everything is `--cg-font-size-xs`, which flattens hierarchy — a recurring shadcn/Linear critique is under-differentiated label vs. value type. Promote the live value badge to `--cg-font-size-sm` (or the next tier) and keep the eyebrow label/preset chips at xs, so the number the user is actually setting becomes the focal point. This is a one-token change with outsized clarity payoff and partially resolves the "no body-text tier" note.

6. **Distribution histogram as an interactive context layer.** Modern data-driven sliders (shadcn analytics compositions) let the underlying distribution inform the choice — e.g. highlight the histogram bars that fall *above* the current threshold in `--cg-color-status-success-*` and dim the rest, updating live as the thumb moves. The histogram is currently decorative (`aria-hidden`); making it react to the threshold turns "Showing X of Y" into a visible cause-and-effect, reinforcing the confidence decision (anchoring + feedback-loop bias engagement, consistent with Cognivo's bias-aware goals).
