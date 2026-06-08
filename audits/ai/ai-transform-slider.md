## ai-transform-slider — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 29 | animation duration | `var(--cg-transition-duration-default)` | ✅ | — |
| 29 | animation easing | `var(--cg-transition-easing-default)` | ✅ | — |
| 35 | border-radius (.container) | `var(--cg-border-radius-200)` | ✅ | — |
| 36 | border-width | `var(--cg-border-width-50)` | ✅ | — |
| 36 | border color | `var(--cg-color-surface-cards-border)` | ✅ | — |
| 37 | background | `var(--cg-color-surface-base-background)` | ✅ | — |
| 38–40 | user-select/touch-action/cursor | `none` / `ew-resize` | ✅ | keyword values, not tokens |
| 43 | cursor (vertical) | `ns-resize` | ✅ | keyword |
| 48–49 | width/height (.image-layer) | `100%` / `auto` | ✅ | intrinsic sizing |
| 56–58 | top/left/width/height (.after-layer) | `0` / `100%` | ✅ | — |
| 65 | object-fit | `cover` | ✅ | keyword |
| 73–74 | transition (left/top) | `var(--cg-transition-duration-fast)` + `var(--cg-transition-easing-default)` | ✅ | explicit properties, good |
| 76 | transition | `none` | ✅ | — |
| 81 | width (divider.horizontal) | `var(--cg-border-width-100)` | ✅ | — |
| 82 | background (divider) | `var(--cg-color-action-primary-background-default)` | ✅ | matches @cssprop |
| 87 | height (divider.vertical) | `var(--cg-border-width-100)` | ✅ | — |
| 88 | background (divider) | `var(--cg-color-action-primary-background-default)` | ✅ | — |
| 95–96 | width/height (.handle) | `var(--cg-spacing-32)` | ✅ | 32px — under 44px touch target (see §4) |
| 97 | border-radius (.handle) | `var(--cg-border-radius-full)` | ✅ | — |
| 98 | background (.handle) | `var(--cg-color-action-primary-background-default)` | ✅ | — |
| 99 | border-width | `var(--cg-border-width-100)` | ✅ | — |
| 99 | border color | `var(--cg-color-surface-base-background)` | ✅ | — |
| 103 | transform | `translate(-50%, -50%)` | ✅ | geometry |
| 104–109 | transition (transform/border-color/box-shadow/left/top) | fast + default tokens | ✅ | explicit list, good |
| 111–114 | transition (dragging) | fast + default tokens | ✅ | — |
| 117 | transform (hover) | `scale(1.1)` | ✅ | geometry |
| 118 | border-color (hover) | `var(--cg-color-surface-base-text)` | ✅ | — |
| 121 | transform (dragging) | `scale(1.15)` | ✅ | geometry |
| 122 | border-color (dragging) | `var(--cg-color-surface-base-text)` | ✅ | — |
| 123 | box-shadow (dragging) | `0 0 0 4px var(--cg-overlay-accent-light)` | ⚠️ | bare magic `4px` spread; color token is valid |
| 126 | outline (focus-visible) | `none` | ✅ | — |
| 127–129 | box-shadow (focus-visible) | `0 0 0 2px ...base-background, 0 0 0 4px var(--cg-color-focus-ring)` | ⚠️ | bare magic `2px`/`4px` ring widths; color tokens valid |
| 132–133 | width/height (.handle svg) | `var(--cg-spacing-16)` | ✅ | — |
| 134 | color (svg) | `var(--cg-color-surface-base-background)` | ✅ | inverse-on-accent, correct |
| 141 | padding (.label) | `var(--cg-spacing-4) var(--cg-spacing-12)` | ✅ | — |
| 142 | border-radius (.label) | `var(--cg-border-radius-full)` | ✅ | — |
| 143 | background (.label) | `var(--cg-overlay-dark-strong)` | ✅ | overlay scrim for legibility on imagery — valid |
| 144 | color (.label) | `var(--cg-color-surface-base-text)` | ✅ | — |
| 145 | font-size (.label) | `var(--cg-font-size-xs)` | ⚠️ | below 14px; acceptable for uppercase eyebrow label, not body text (see §2) |
| 146 | font-weight | `var(--cg-font-weight-bold)` | ✅ | — |
| 147 | text-transform | `uppercase` | ✅ | keyword |
| 148 | letter-spacing | `var(--cg-letter-spacing-wide)` | ✅ | explicitly allowed |
| 152–157 | bottom/left/right (.label) | `var(--cg-spacing-12)` | ✅ | — |
| 165 | height (.placeholder) | `var(--cg-spacing-96)` | ✅ | — |
| 166 | color (.placeholder) | `var(--cg-color-input-text-placeholder)` | ✅ | — |
| 167 | font-size (.placeholder) | `var(--cg-font-size-sm)` | ✅ | 14px min, body text OK |
| 171 | border-radius (rounded=none) | `0` | ✅ | — |
| 172 | border-radius (rounded=sm) | `var(--cg-border-radius-50)` | ✅ | — |
| 173 | border-radius (rounded=md) | `var(--cg-border-radius-100)` | ✅ | — |
| 174 | border-radius (rounded=lg) | `var(--cg-border-radius-200)` | ✅ | — |
| 177 | transition (reduced-motion) | `none !important` | ✅ | — |

No fabricated/broken token names found; no comma-fallbacks; no raw hex/rgba; no tier-1 palette colors; no `transition: all`. Color story is tier-2 throughout.

### 2. Styling Audit

- **Border radius:** Container uses `--cg-border-radius-200` with a clean rounded-variant ladder (none → 50 → 100 → 200). Handle and labels use `--cg-border-radius-full`. Consistent and token-driven.
- **Spacing:** All padding/positioning from the spacing scale (`--cg-spacing-4/12/16/32/96`). No raw spacing.
- **Font-size accessibility:** Placeholder uses `--cg-font-size-sm` (14px, compliant). Labels use `--cg-font-size-xs` (below 14px) — acceptable here because they are uppercase, bold, letter-spaced overlay eyebrow tags, not running body text. Flagged as a soft note, not a hard violation.
- **Translucent vs solid borders:** Borders use solid semantic tokens (`--cg-color-surface-cards-border`, `--cg-color-surface-base-background` ring around the handle). Label backdrop uses `--cg-overlay-dark-strong` — correct: a translucent scrim is the right choice over arbitrary photographic content for label legibility.
- **Transitions explicit vs all:** All transitions enumerate explicit properties (left, top, transform, border-color, box-shadow). No `transition: all`. Motion tokens (`--cg-transition-duration-fast`, `--cg-transition-easing-default`) used. `prefers-reduced-motion` honored both in shared `reducedMotion` style and a local media query (lines 176–178).
- **Dark-theme suitability:** Dark-first surfaces, accent divider/handle from action-primary, white inverse icon/ring — reads well on dark. Suitable.

The only styling nits are the three bare-`px` box-shadow spread/ring widths (lines 123, 127–129). The design system has no tier-1 token for focus-ring/shadow spread in px form that maps cleanly (`--cg-focus-ring-width` exists but the value here is a multi-stop layered shadow), so these are flagged rather than auto-fixed (see §6).

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | ✅ | `.handle` / `.divider` base styles | None |
| Hover | ✅ | `.handle:hover` scale 1.1 + border-color shift (line 116–119) | None |
| Active/Press | ✅ | `.container.dragging .handle` scale 1.15 + glow ring (line 120–124) | Driven by `_dragging` state, correct |
| Focus-visible | ✅ | `.handle:focus-visible` layered ring with `--cg-color-focus-ring` (line 125–130) | Magic px ring widths (cosmetic) |
| Disabled | N/A | No disabled affordance | Comparison slider has no disabled mode; acceptable |
| Loading | N/A | Static image comparison, no async load state | No spinner needed; placeholder covers missing-src |
| Error | N/A | No error pathway | Component does not fetch; N/A |
| Success | N/A | No success semantics | N/A |
| Empty | ✅ (bonus) | `.placeholder` rendered when beforeSrc/afterSrc missing (render lines 251–253) | Good empty-state coverage |

Interactive states are complete for a drag comparison control. AI-state token family is not applicable: this component renders no AI lifecycle status (thinking/streaming/error), so the dedicated `--cg-color-ai-*` tokens are correctly not used.

### 4. Interaction Audit

- **Keyboard:** `_handleKeyDown` (lines 231–248) handles ArrowLeft/ArrowRight in horizontal and ArrowUp/ArrowDown in vertical, ±2% step, with `preventDefault`. Handle is `tabindex="0"`. No Home/End/PageUp/PageDown (jump-to-extreme / larger step) — enhancement opportunity, not a defect.
- **ARIA:** `role="slider"`, `aria-label="Compare position"`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-valuenow` bound to `position` (lines 283–286). Correct slider semantics. `aria-orientation` is missing — would be a nice addition for the vertical mode (enhancement). Images carry `alt` from the before/after labels.
- **CustomEvents:** `ai-transform-change` dispatched on both pointer drag (line 225) and keyboard (line 243), `bubbles: true, composed: true`, `detail: { position }`. Detail shape matches the `@fires` JSDoc. Correct.
- **Touch targets:** Handle is `--cg-spacing-32` = 32×32px, below the 44px minimum. However the entire `.container` is the drag surface (pointerdown anywhere repositions), so the effective touch target is the full image, mitigating the small visible grip. Enlarging the visible handle is a design change (noted, not a token fix). `touch-action: none` correctly set for drag.

### 5. Visual Design Check

Modern and sleek: full-radius accent handle with a chevron grip, animated scale on hover/press, layered focus ring, and uppercase letter-spaced overlay labels on a dark scrim — this is a polished before/after pattern. Radius ladder is coherent, breathing room around labels is good, divider weight (`--cg-border-width-100`) is crisp. Typography hierarchy is minimal but appropriate (labels are the only text). Honors reduced-motion. This is showcase-ready alongside HeroUI/Vercel comparison sliders.

One-word verdict: **strong**.

### 6. Fixes Needed

No token-vocabulary violations and no fabricated tokens. The three findings below are bare magic `px` values inside layered `box-shadow` declarations. There is no design-system token whose resolved value cleanly substitutes a single ring/spread width inside a multi-stop shadow (`--cg-focus-ring-width` is a standalone outline width, not a box-shadow stop), so per the audit rules these are described here as flags rather than auto-applied fixes:

1. **Line 123** — `box-shadow: 0 0 0 4px var(--cg-overlay-accent-light);` uses a bare `4px` spread. Color token is valid; the `4px` is a magic number with no clean token equivalent. Flag for tokenization if a shadow-spread scale is added.
2. **Lines 127–129** — focus-visible `box-shadow: 0 0 0 2px ..., 0 0 0 4px var(--cg-color-focus-ring);` uses bare `2px` (offset gap) and `4px` (ring width). Color tokens valid; the px stops are magic numbers without a matching token.
3. **Line 145** (soft note, not a violation) — `.label` uses `--cg-font-size-xs` (<14px). Acceptable for an uppercase eyebrow overlay tag; left as-is.

Touch-target enlargement of the handle (32px → ≥44px) is a design change, not a token fix, and is noted in §4 only.

### Research-backed enhancements

A focused scan of 2025-era comparison-slider patterns (HeroUI v3 on React Aria, React Compare Slider, the 3KB touch/keyboard web component documented on CSS Script, and the SegmentUI/Framer "Before After Slider") surfaces six concrete upgrades specific to this component:

1. **Spring-eased handle pickup, not linear.** HeroUI v3 ships every interactive control with React Aria's spring-style "polished details" rather than a flat duration. Our handle currently animates `transform`/`left` on a single `--cg-transition-duration-fast` linear curve. On pointer pickup, switch the scale-up to an overshoot easing (a `--cg-transition-easing-spring` / back-out token) so the grip feels grabbed, and keep the divider position itself on the existing fast linear curve so the reveal stays 1:1 with the cursor. This separates "the thing I'm holding" (springy) from "the thing I'm revealing" (precise) — the same dual-curve split the React Compare Slider demo uses. (Source: HeroUI v3 Slider; React Compare Slider.)

2. **Idle "discoverability nudge" before first interaction.** The Framer/SegmentUI Before After Slider auto-animates the divider a few percent on mount to signal the component is draggable, then settles. Add an opt-in `hint` boolean that, on first paint and only when `prefers-reduced-motion` is not set, sweeps the divider from ~45%→55%→50% once. This solves the cold-start affordance problem where a static comparison reads as a single flat image. Gate it behind the existing reduced-motion guard already in the stylesheet. (Source: SegmentUI/Framer Before After Slider.)

3. **Hover-tracking divider preview (desktop density).** The React Compare Slider and the CSS Script web component both let the divider follow the cursor on hover before commit, giving a live "scrub" without clicking. Add a hover mode where pointermove (without buttons pressed) drives a ghost/preview divider at reduced opacity, snapping to the real position on pointerdown. This raises information density on desktop without adding chrome and matches the modern expectation that the whole surface is interactive, not just the 32px grip. (Source: React Compare Slider; CSS Script before-after web component.)

4. **Full keyboard range per ARIA APG, plus larger step.** The reference 3KB web component is explicitly "keyboard accessible" and the HeroUI slider follows the APG slider pattern: Home/End jump to 0%/100%, PageUp/PageDown move a coarse step (10%). Our `_handleKeyDown` only does Arrow keys at ±2%. Add Home/End and PageUp/PageDown (±10%) — this is the single highest-leverage interaction gap and aligns the component with the WAI-ARIA slider contract that HeroUI's React Aria base already satisfies. (Source: HeroUI v3 Slider on React Aria; CSS Script accessible web component.)

5. **Edge-aware label fade to avoid collision.** Modern comparison sliders hide the "before"/"after" eyebrow tags when the divider sweeps over them (Framer component, React Compare Slider portrait demos) so a label is never bisected by the divider line. Bind each `.label`'s opacity to `position`: fade the after-label out as the divider passes ~85% and the before-label as it passes ~15%, using the existing `--cg-transition-duration-fast` token. Pure-CSS via a custom property already driving the divider, so no new tokens. (Source: SegmentUI/Framer Before After Slider; React Compare Slider.)

6. **`aria-orientation` + percentage in `aria-valuetext`.** React Aria sliders (HeroUI's foundation) always emit `aria-orientation` and a human-readable `aria-valuetext` ("60% revealed") rather than a bare numeric `aria-valuenow`. §4 already flags the missing `aria-orientation`; pair it with `aria-valuetext` so screen-reader users hear "60 percent, after image" instead of "60". Zero visual/token cost, closes the assistive-tech gap to parity with the React Aria reference implementation. (Source: HeroUI v3 Slider / React Aria Components.)

Sources: [HeroUI v3 Slider](https://www.heroui.com/docs/components/slider), [React Compare Slider](https://react-compare-slider.vercel.app/), [Before-After Image Comparison Slider web component (CSS Script)](https://www.cssscript.com/before-after-image-comparison-slider-component/), [Before After Slider — Framer/SegmentUI](https://segmentui.com/uikit/before-after-slider).
