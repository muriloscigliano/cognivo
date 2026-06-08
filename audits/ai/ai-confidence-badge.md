## ai-confidence-badge — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 34 | gap | `var(--cg-spacing-4)` | Yes | — |
| 36 | border | `var(--cg-border-width-50) solid transparent` | Yes | — |
| 38-40 | transition | `filter/transform` + `--cg-transition-duration-fast` / `--cg-transition-easing-default` | Yes (explicit, not `all`) | — |
| 44 | box-shadow | `0 0 0 var(--cg-border-width-100) var(--cg-color-focus-ring)` | Yes (0s allowed) | — |
| 46 | filter | `brightness(1.1)` | Yes (filter fn, not a token slot) | — |
| 47 | transform | `scale(var(--cg-interaction-press-scale))` | Yes (real tier-2 token, verified in codebase) | — |
| 50 | padding | `var(--cg-spacing-2) var(--cg-spacing-8)` | Yes | — |
| 51 | border-radius | `var(--cg-component-ai-badge-radius-sm)` | Yes (tier-3, in vocab) | — |
| 52 | font-size | `var(--cg-font-size-xs)` | Yes (icon/label scale) | — |
| 53 | font-weight | `var(--cg-font-weight-bold)` | Yes | — |
| 54 | gap | `var(--cg-spacing-2)` | Yes | — |
| 58 | padding | `var(--cg-spacing-4) var(--cg-spacing-12)` | Yes | — |
| 59 | border-radius | `var(--cg-component-ai-badge-radius-md)` | Yes | — |
| 60 | font-size | `var(--cg-font-size-xs)` | Yes | — |
| 61 | font-weight | `var(--cg-font-weight-bold)` | Yes | — |
| 65 | padding | `var(--cg-spacing-12) var(--cg-spacing-16)` | Yes | — |
| 66 | border-radius | `var(--cg-component-ai-badge-radius-lg)` | Yes | — |
| 67 | font-size | `var(--cg-font-size-sm)` | Yes (14px, lg body OK) | — |
| 70 | gap | `var(--cg-spacing-8)` | Yes | — |
| 71 | min-width | `140px` | NO — bare magic px | No exact token on scale (128/160 exist, not 140); flagged §6, not auto-fixed |
| 79 | height | `var(--cg-spacing-4)` | Yes | — |
| 80 | border-radius | `var(--cg-border-radius-full)` | Yes | — |
| 81 | background | `var(--cg-overlay-dark-subtle)` | Yes (tier-1 overlay, valid) | — |
| 86 | border-radius | `var(--cg-border-radius-full)` | Yes | — |
| 87 | transition | `width` + slow/default | Yes (explicit) | — |
| 91-93 | bg/color/border | `--cg-color-status-success-*` | Yes | — |
| 95 | background | `--cg-color-status-success-text-default` | Yes (bar fill) | — |
| 97-100 | bg/color/border | `--cg-color-status-warning-*` | Yes | — |
| 102 | background | `--cg-color-status-warning-text-default` | Yes | — |
| 104-107 | bg/color/border | `--cg-color-status-error-*` | Yes | — |
| 109 | background | `--cg-color-status-error-text-default` | Yes | — |
| 111 | letter-spacing | `0.02em` | Yes (em, not a token slot) | — |
| 113 | font-size | `var(--cg-font-size-xs)` | Yes | — |
| 114 | font-weight | `var(--cg-font-weight-semibold)` | Yes | — |
| 115 | opacity | `0.8` | Yes (opacity unitless) | — |
| 122 | gap | `var(--cg-spacing-1)` | Yes | — |
| 123 | height | `var(--cg-spacing-16)` | Yes | — |
| 124 | margin-left | `var(--cg-spacing-6)` | Yes | — |
| 127 | width | `var(--cg-spacing-2)` | Yes | — |
| 128 | border-radius | `var(--cg-border-radius-full)` | Yes | — |
| 129 | transition | `height` + slow/default | Yes (explicit) | — |
| 130,132 | opacity | `0.5` / `1` | Yes | — |
| 136 | bottom | `calc(100% + var(--cg-spacing-8))` | Yes | — |
| 137-138 | left/transform | `50%` / `translateX(-50%)` | Yes (% positioning) | — |
| 139-140 | bg/color | `--cg-color-surface-container-background` / `--cg-color-surface-base-text` | Yes | — |
| 141 | border | `var(--cg-border-width-50) solid var(--cg-color-surface-container-border)` | Yes | — |
| 142 | border-radius | `var(--cg-border-radius-100)` | Yes | — |
| 143 | padding | `var(--cg-spacing-8) var(--cg-spacing-12)` | Yes | — |
| 144 | font-size | `var(--cg-font-size-xs)` | Yes (tooltip meta text, acceptable) | — |
| 145 | line-height | `var(--cg-line-height-snug)` | Yes | — |
| 149 | transition | `opacity` + fast/default | Yes (explicit) | — |
| 150 | z-index | `var(--cg-z-index-300)` | Yes (real token, verified in codebase) | — |
| 151 | box-shadow | `var(--cg-elevation-1)` | Yes (real token, verified in codebase) | — |
| 159 | border | `var(--cg-spacing-4) solid transparent` | Borderline — spacing token used for arrow geometry; acceptable (resolves to real token) | — |
| 160 | border-top-color | `var(--cg-color-surface-container-background)` | Yes | — |
| 166 | font-weight | `var(--cg-font-weight-bold)` | Yes | — |
| 167 | margin-left | `var(--cg-spacing-4)` | Yes | — |
| 170 | margin-top | `var(--cg-spacing-4)` | Yes | — |
| 171 | font-size | `var(--cg-font-size-xs)` | Yes | — |
| 174 | max-width | `220px` | NO — bare magic px | No exact token on scale; flagged §6, not auto-fixed |
| 239 | height (inline) | `${(v/max)*16}px` (JS) | Borderline — runtime-computed geometry from data | Flagged §6; magic `16` should derive from spacing-16 but is JS-computed, not a static CSS token slot |
| 274 | gap (inline) | `var(--cg-spacing-4)` | Yes | — |

### 2. Styling Audit
- **Border radius:** Uses dedicated tier-3 tokens `--cg-component-ai-badge-radius-{sm,md,lg}` for the badge per size, and `--cg-border-radius-full` for the progress bar and sparkline bars, `--cg-border-radius-100` for the tooltip. Clean, tier-correct.
- **Spacing:** All padding/gap/margin values map to the `--cg-spacing-*` scale. Two exceptions: `min-width: 140px` (L71) and `max-width: 220px` (L174) are off-scale bare pixel values.
- **Font-size accessibility:** sm/md badges render at `--cg-font-size-xs` (below the 14px body floor). This is acceptable for a compact metric badge (numeric `92%` glyph + icon, not prose), and the lg variant uses `--cg-font-size-sm` (14px). Tooltip and level-label also use xs but are supporting meta-text. No hard violation, but the xs sm/md label is the smallest defensible size.
- **Translucent vs solid borders:** Borders use semantic status border tokens (translucent semantic layer) — appropriate for a tinted badge on dark surfaces.
- **Transitions:** All explicit (filter, transform, width, height, opacity) — no `transition: all`. Motion tokens (`--cg-transition-duration-fast/slow`, `--cg-transition-easing-default`) used throughout. `prefers-reduced-motion` handled both via shared `reducedMotion` style and an inline media query (L177-180).
- **Dark-theme suitability:** Surface-container + status semantic tokens + `--cg-overlay-dark-subtle` bar track read correctly dark-first.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.badge` base + level class (high/medium/low) | None |
| Hover | Yes | `.badge:hover { filter: brightness(1.1) }` + tooltip reveal | Brightness filter is coarse but acceptable |
| Active/Press | Yes | `.badge:active { transform: scale(--cg-interaction-press-scale) }` | None |
| Focus-visible | Yes | `.badge:focus-visible` box-shadow ring via `--cg-color-focus-ring` | None — correct focus-visible usage |
| Disabled | N/A | Badge is a read-only status indicator; no disabled concept | Reasonable |
| Loading | N/A | Score is provided synchronously; no async loading state | Reasonable |
| Error | Partial | `low` level uses `--cg-color-status-error-*` for low confidence | Semantic "low" ≠ component error; acceptable mapping for a confidence meter |
| Success | Yes (as "high") | `high` level uses `--cg-color-status-success-*` | None |

### 4. Interaction Audit
- **Keyboard:** `_handleKeyDown` handles Enter and Space, calls `preventDefault()` then click handler. `tabindex="0"` makes the badge focusable. Good.
- **ARIA:** `role="status"` with descriptive `aria-label="AI confidence: {pct}%, {level}"`. Tooltip uses `role="tooltip"`. Sparkline correctly `aria-hidden="true"` (decorative). Solid.
- **Gap:** `role="status"` is a live region for announcements, but the element is also interactive (clickable, focusable, Enter/Space). A clickable status with no `role="button"` is a semantics mismatch — screen readers won't announce it as actionable. Consider adding `role="button"` semantics or reconsidering whether it should be clickable. Flagged (design/semantics, not a token fix).
- **CustomEvent:** `ai-confidence-badge-click` dispatched with `bubbles: true, composed: true` and `detail: { score, level }`. Detail shape matches the documented `@fires` JSDoc. Correct.
- **Touch targets:** sm badge padding is `--cg-spacing-2 / --cg-spacing-8` around xs text — well under 44px tall. For an interactive (clickable, focusable) element this fails the 44px touch-target guideline. Flagged as a design/sizing enlargement (not a token violation).

### 5. Visual Design Check
Modern and sleek — tinted semantic status badge with icon, percentage, optional inline progress bar (lg) and a recency-weighted sparkline (last bar full opacity, earlier bars 50%). Radius is tokenized per size, breathing room is adequate, and the lg layout has clear hierarchy (icon + score on top row, level label right-aligned, bar + sparkline beneath). Tooltip with arrow is a nice touch. Two off-scale pixel widths (140/220) are the only blemishes. Typography hierarchy is reasonable though the sm/md variant leans on xs throughout. Showcase-ready for a HeroUI/Vercel-style gallery.

Verdict: **strong**

### 6. Fixes Needed
No token-verified auto-fixes — every `var(--cg-*)` reference resolves to a real token (including `--cg-interaction-press-scale`, `--cg-z-index-300`, `--cg-elevation-1`, confirmed present in the codebase though outside the scoped vocab files).

Flags requiring design decisions / new tokens (NOT auto-fixed because no exact existing token covers them):
1. **L71** `min-width: 140px` — off-scale bare pixel. No spacing token equals 140 (`--cg-spacing-128`=128, `--cg-spacing-160`=160 are nearest). Either snap to `--cg-spacing-160` (design change) or add a tier-3 component token (e.g. an `ai-badge` min-width token).
2. **L174** `max-width: 220px` — off-scale bare pixel on the tooltip explanation. No matching token; needs a design decision or new token rather than an invented one.
3. **L239** inline `height: ${(v / max) * 16}px` — the `16` magic number for sparkline bar height is JS-computed and conceptually mirrors `--cg-spacing-16` (which the container height on L123 already uses). Consider reading the resolved spacing value rather than hard-coding `16` in script, for consistency if the token changes.
4. **Interactive semantics** — the badge is clickable + keyboard-activated (Enter/Space) but uses `role="status"`, not `role="button"`. Screen readers won't announce it as actionable. Design/a11y decision, not a token fix.
5. **Touch target** — sm/md interactive badge height is well below 44px. Enlargement is a design change; flagged per instructions, not placed in the fixes array.

### Research-backed enhancements

Modern badge libraries (shadcn/ui Oct-2025 components, HeroUI v3, Linear/Vercel status patterns) have converged on a few affordances this component doesn't yet use. Concrete, scoped suggestions:

1. **Animate the progress/score on mount, not just on data change** — HeroUI and shadcn "spinner badge" variants (per [shadcn changelog Oct 2025](https://ui.shadcn.com/docs/changelog/2025-10-new-components)) animate fill from 0 to the target value on first paint so the number reads as *computed*, not *static*. Right now the `width` transition (L87) only fires on subsequent updates. Add a one-shot count-up on the percentage glyph + bar fill on `firstUpdated()`, gated behind `prefers-reduced-motion` (the infra already exists at L177-180). This makes a confidence score feel measured rather than asserted — directly reinforcing the trust signal the badge exists to convey.

2. **Replace the coarse `brightness(1.1)` hover with a token-driven surface/ring lift** — shadcn/HeroUI badges (per [HeroUI Badge](https://heroui.com/docs/react/components/badge)) hover via a subtle background-tint + border-brightness shift rather than a global filter, which preserves the semantic status hue (a brightness filter desaturates the success-green/warning-amber tints). Swap L46 for a hover that nudges the semantic `--cg-color-status-*-border` and adds a faint `--cg-elevation-1` lift; keeps the level color truthful on hover.

3. **Add `role="button"` + a 44px-min interactive surface when clickable, but keep `role="status"` when read-only** — Linear/Vercel status chips are dual-mode: a static badge is just a live-region label, but a *clickable* one is a real button with a hit area. Branch the template on whether a click handler is bound: interactive → `role="button"` + `min-height: var(--cg-spacing-44)` (or nearest tier-3 control token); static → keep `role="status"`. This resolves both the §4 semantics-mismatch flag and the §4 touch-target flag in one move, matching how shadcn ships link-style vs label-style badges as distinct variants.

4. **Add a "pulse" / live-update micro-animation for streaming confidence** — Vercel/Linear deployment-status dots use a soft pulsing ring (animated `box-shadow` ramp) to signal *in-flight / recalculating* state. Since this is an `ai-*` component fed by streaming inference, introduce an optional `updating` state: a 1.2s pulse on the level-colored dot using the existing `--cg-color-status-*` tokens and `--cg-transition-easing-default`. This fills the currently-N/A "loading" state (§3) with a use-case that's real for AI confidence (score being revised mid-stream).

5. **Tighten density with a compact "dot + value" inline variant** — shadcn's 6+ badge variants ([shadcnspace](https://shadcnspace.com/components/badge)) include a minimal dot+number form for dense tables/inline contexts. The current sm variant still carries icon + label + padding. Add an `inline`/`compact` density that renders just a level-colored status dot + `92%` at `--cg-font-size-xs`, dropping the sparkline and progress bar. Lets the badge live inside data rows and chat message metadata without dominating, which is where AI confidence scores most often need to appear.

6. **Snap the off-scale widths to tokens and motion-tween the sparkline** — beyond fixing L71/L174 (§6), shadcn/HeroUI sparkline-in-badge patterns stagger bar entrance (small per-bar delay) so the trend reads left-to-right. Apply a tokenized staggered `height` transition to the sparkline bars (reuse `--cg-transition-duration-fast`) instead of static render, reinforcing the recency-weighting that the opacity ramp (L130-132) already implies.

Sources:
- [shadcn/ui — Badge](https://ui.shadcn.com/docs/components/radix/badge)
- [shadcn/ui — October 2025 New Components](https://ui.shadcn.com/docs/changelog/2025-10-new-components)
- [HeroUI v3 — Badge](https://heroui.com/docs/react/components/badge)
- [shadcnspace — Badge components & variants](https://shadcnspace.com/components/badge)
