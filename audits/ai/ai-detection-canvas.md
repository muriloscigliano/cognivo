## ai-detection-canvas — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 26 | border-radius (.canvas) | `--cg-border-radius-150` | Yes | — |
| 27 | border (.canvas) | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | — |
| 29 | background (.canvas) | `--cg-color-surface-base-background` | Yes | — |
| 42 | border (.bbox) | `--cg-border-width-100` + `var(--det-color, --cg-color-surface-base-text)` | Acceptable | Runtime-injected CSS var with semantic fallback. Both tokens are real. Comma-fallback here is the legitimate runtime-var pattern (analogous to the index exception), not a raw token fallback. No change. |
| 43 | border-radius (.bbox) | `--cg-border-radius-50` | Yes | — |
| 45 | transition (.bbox) | `--cg-transition-duration-fast` + `--cg-transition-easing-default` | Yes — explicit property (`background`), not `all` | — |
| 49 | background (.bbox:hover) | `var(--det-bg-hover, --cg-overlay-dark-subtle)` | Flag | `--det-bg-hover` is never set anywhere in the component, so the fallback always wins. Dead runtime var — should just use `--cg-overlay-dark-subtle` directly. Not a token-vocab violation (token is real); described in §6. |
| 53 | box-shadow (.bbox:focus-visible) | `0 0 0 3px var(--cg-overlay-accent-strong)` | Flag | Color token is real. **Bare `3px`** ring width is a magic number; no guaranteed spacing token maps cleanly to 3px, so not auto-fixed — flagged §6. Also consider `--cg-color-focus-ring` for the color (see §6). |
| 56 | border-width (.bbox.selected) | `--cg-border-width-100` | Yes | — |
| 57 | border-color (.bbox.selected) | `--cg-color-action-primary-background-default` | Yes | — |
| 58 | background (.bbox.selected) | `--cg-overlay-accent-subtle` | Yes | — |
| 64–65 | top/left (.bbox-label) | `calc(-1 * --cg-spacing-1)` | Yes | — |
| 69 | gap (.bbox-label) | `--cg-spacing-4` | Yes | — |
| 70 | padding (.bbox-label) | `--cg-spacing-2` / `--cg-spacing-8` | Yes | — |
| 71 | border-radius (.bbox-label) | `--cg-border-radius-50` (x3) + `0` | Yes | — |
| 72 | color (.bbox-label) | `--cg-color-action-primary-text-default` | Yes — readable text on colored chip bg | — |
| 73 | font-size (.bbox-label) | `--cg-font-size-xs` | Acceptable | Annotation chip overlay, not body text. xs OK for this context. |
| 74 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 77 | line-height | `--cg-line-height-snug` | Yes | — |
| 80 | opacity (.bbox-confidence) | `0.7` | Yes — unitless opacity | — |
| 81 | font-family | `--cg-font-family-mono` | Yes | — |
| 89 | transform translateY | `calc(-1 * --cg-spacing-8)` | Yes | — |
| 90 | padding (.tooltip) | `--cg-spacing-6` / `--cg-spacing-12` | Yes | — |
| 91 | border-radius (.tooltip) | `--cg-border-radius-100` | Yes | — |
| 92 | background (.tooltip) | `--cg-color-tooltip-background` | Yes | — |
| 93 | color (.tooltip) | `--cg-color-tooltip-text` | Yes | — |
| 94 | font-size (.tooltip) | `--cg-font-size-xs` | Acceptable | Transient hover tooltip overlay. xs OK. |
| 98 | line-height | `--cg-line-height-snug` | Yes | — |
| 106 | border (.tooltip::after) | `--cg-spacing-4` solid transparent | Yes — CSS triangle trick, spacing token as size | — |
| 107 | border-top-color | `--cg-color-tooltip-background` | Yes | — |
| 115 | height (.placeholder) | `--cg-spacing-96` | Yes | — |
| 116 | color (.placeholder) | `--cg-color-surface-container-outlined` | **No** | `-outlined` is a border/divider token misused as text color. Use `--cg-color-empty-state-text-secondary`. See §6 fix 1. |
| 117 | font-size (.placeholder) | `--cg-font-size-sm` | Yes — meets 14px body min | — |
| 123–124 | top/right (.count-badge) | `--cg-spacing-12` | Yes | — |
| 125 | padding (.count-badge) | `--cg-spacing-4` / `--cg-spacing-12` | Yes | — |
| 126 | border-radius (.count-badge) | `--cg-border-radius-full` | Yes | — |
| 127 | background (.count-badge) | `--cg-overlay-dark-strong` | Yes | — |
| 128 | color (.count-badge) | `--cg-overlay-dark-text` | Yes | — |
| 129 | font-size (.count-badge) | `--cg-font-size-xs` | Acceptable | Badge chip, not body text. |
| 130 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 136–139 | border-radius (rounded variants) | `0` / `-radius-50` / `-radius-100` / `-radius-150` | Yes | — |
| 142 | transition (reduced-motion) | `none` | Yes | — |

### 2. Styling Audit
- **Border radius**: Fully tokenized; `none`/`sm`/`md`/`lg` map to a coherent radius scale. Good.
- **Spacing**: All padding/gap/offset values come from the `--cg-spacing-*` scale. No magic px except the focus-ring `3px` on line 53.
- **Font-size accessibility**: Body/placeholder text uses `--cg-font-size-sm` (14px min met). `--cg-font-size-xs` appears only on overlay annotation chips (bbox label, tooltip, count badge) — acceptable for dense overlay annotations, not violations.
- **Translucent vs solid borders**: Canvas border uses solid `--cg-color-surface-cards-border`; bbox borders use the per-detection categorical color. Consistent with a dark overlay aesthetic.
- **Transitions explicit vs all**: Line 45 enumerates `background` only — compliant. Reduced-motion handled both via the imported `reducedMotion` style and an inline `@media` block (line 141–143). Good.
- **Dark-theme suitability**: Uses overlay tokens (`--cg-overlay-dark-*`) and tooltip/surface semantic tokens that adapt to theme. Strong dark-first design.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.bbox` base style, per-detection color | — |
| Hover | Yes | `.bbox:hover` background + tooltip render on `_hoveredId` | `--det-bg-hover` fallback path is a dead var (always falls back); harmless but should be simplified. |
| Active/Press | No | N/A | No distinct pressed style; click immediately selects. Acceptable for a selection overlay. |
| Focus-visible | Yes | `.bbox:focus-visible` box-shadow ring | Magic `3px` ring width; color via overlay token rather than `--cg-color-focus-ring`. |
| Disabled | Partial | `interactive=false` sets `tabindex=-1` and short-circuits select/hover | No visual disabled treatment; boxes still render at full opacity. Reasonable for a non-interactive display mode. |
| Loading | Yes | `_imgNatW > 0` gate; boxes render only after image load; placeholder before `src` | No explicit spinner during image fetch — minor. |
| Error | No | N/A | No image-load-error fallback (broken `src` shows broken img, no error state). Flag — see §6. |
| Success | N/A | — | No async success concept for a static detection overlay. |
| Selected | Yes | `.bbox.selected` border-color + accent background | Good, distinct affordance. |

### 4. Interaction Audit
- **Keyboard**: `Enter` and `Space` trigger select with `preventDefault` (line 210). Boxes are focusable via `tabindex` when interactive. No arrow-key traversal between boxes (acceptable, but could be enhanced).
- **ARIA**: Each box has `role="button"` and `aria-label="<label> <confidence>%"` (line 206). Good. The `selected` box does not expose `aria-pressed`/`aria-current` — selection is visual-only to AT. Flag — see §6.
- **CustomEvents**: `ai-detection-select` and `ai-detection-hover` both `bubbles` + `composed` with `detail: {id, label}` matching the documented `@fires` JSDoc (lines 5–6). Correct.
- **Touch targets**: Box size is data-driven (bbox %), can be smaller than 44px for small detections. This is inherent to a detection overlay (boxes must match the detected region), so not a fixable token issue — noted as a design constraint.
- **Image**: `alt="Detection source"` is generic; `draggable="false"` set. Alt could be more descriptive/consumer-supplied. Minor.

### 5. Visual Design Check
Modern and sleek: per-detection categorical colors, rounded chip labels with mono confidence figures, a floating count badge, and a tooltip with an arrow — this reads like a polished CV/annotation UI. Radius scale is coherent, breathing room in label/badge padding is good, dark-overlay tokens render well on imagery. Typography hierarchy (semibold label + mono confidence) is clean. Focus ring present. Showcase-ready for HeroUI/Vercel-style galleries. One-word verdict: **strong**.

### 6. Fixes Needed
1. **Line 116** — placeholder text color uses a border/outline token. Change `color: var(--cg-color-surface-container-outlined);` → `color: var(--cg-color-empty-state-text-secondary);` (real tier-2 token, semantically correct for empty/placeholder text). *(token-verified)*

Flags (no auto-fix — no safe token mapping or out of token-scope):
- **Line 53** — focus ring uses a bare magic `3px` width. No guaranteed spacing token equals 3px, so not auto-replaced. Also consider switching the ring color to the dedicated `--cg-color-focus-ring` token for consistency with other components.
- **Line 49** — `--det-bg-hover` is never assigned anywhere in the component; the `var(--det-bg-hover, --cg-overlay-dark-subtle)` fallback always resolves to `--cg-overlay-dark-subtle`. Simplify to `background: var(--cg-overlay-dark-subtle);` (behavior identical) to remove the dead runtime var.
- **ARIA (line 203/206)** — the selected box conveys selection only visually; add `aria-pressed="${isSelected}"` to the `role="button"` element so assistive tech reflects selection state. (Markup change, not a token fix.)
- **Error state** — no broken-image fallback; a failed `src` shows the native broken-image glyph with no error treatment. Consider an `@error` handler + error placeholder. (Design change.)

### Research-backed enhancements

Sourced from a 2025 web scan of bounding-box annotation best practices plus current Linear / Vercel / shadcn / HeroUI interaction conventions. Each item targets *this* component's actual gaps from §3–§4.

1. **Spring-physics box entrance, staggered by confidence.** Today boxes render only after `_imgNatW > 0` (§3 Loading) but pop in with no transition. Linear's signature "everything animates in" feel comes from staggered spring transforms. On first paint, animate each `.bbox` with a `transform: scale(0.96) → 1` + `opacity 0 → 1` over `--cg-transition-duration-fast`, staggered by a small per-index delay and ordered high-confidence-first, so the model's most certain detections settle first. Gate the whole thing behind the existing `@media (prefers-reduced-motion)` block (line 141). Source: Linear's interface motion language (spring-eased entrance choreography), as documented across 2025 Linear-aesthetic UI write-ups.

2. **Hover de-emphasis ("spotlight") instead of only hover-highlight.** Right now hover just lightens one box (`.bbox:hover` bg, line 49). The modern Vercel/shadcn canvas pattern is *focus by dimming the rest*: on `_hoveredId`, drop sibling boxes to ~`opacity: 0.4` while the hovered box stays at full strength and raises its `z-index`. This scales far better than per-box highlight when 20+ detections overlap — the eye is guided rather than cluttered. Reuse the unitless-opacity convention already accepted on line 80. Source: Vercel/shadcn "spotlight on hover, recede the rest" canvas/list interaction pattern.

3. **Confidence encoded visually, not just as a mono number.** §1 line 80 shows confidence as text only. 2025 bounding-box annotation guidance (Label Your Data, "Bounding Box Annotation: 2026 Best Practices") treats confidence as a first-class signal. Map confidence to **border opacity or a 2px under-label confidence meter** so low-confidence boxes read as visually tentative at a glance — exactly the kind of ambient signal a reviewer needs before they've read any chip. Keep the mono figure (good typographic detail), add the visual layer on top. Source: Label Your Data, *Bounding Box Annotation: 2026 Best Practices*.

4. **Inline error state with retry, matching the placeholder treatment.** §3 flags a missing Error state and §6 calls out no `@error` handler. The shadcn/HeroUI convention is a *contained, actionable* empty/error block, never a native broken-image glyph. Add an `@error` handler that swaps the `<img>` for a state mirroring `.placeholder` (line 115) — icon + `--cg-color-empty-state-text-secondary` copy + a `cg-button` "Retry" that re-assigns `src`. This closes the one genuinely missing state in the matrix. Source: shadcn/HeroUI empty-and-error-state component conventions.

5. **Keyboard arrow traversal across boxes (roving tabindex).** §4 notes "No arrow-key traversal between boxes." Detection canvases are inherently spatial; the 2025 accessible-canvas pattern is a **roving tabindex** where `ArrowRight/Left` (or geometric nearest-neighbor) moves focus between boxes while only one is in the tab order at a time. Pairs naturally with the `aria-pressed` fix already queued in §6 to make selection fully AT-navigable. Source: WAI-ARIA roving-tabindex composite-widget pattern, the standard behind Linear/shadcn keyboard-navigable grids.

6. **Subtle backdrop scrim + density toggle for crowded scenes.** A modern detection canvas (cf. semantic-segmentation UI research surfaced in the scan, where each component gets its own categorical color) gets noisy fast. Add (a) an optional thin `--cg-overlay-dark-subtle` scrim behind labels so chips stay legible over busy imagery, and (b) a compact-density mode that hides confidence chips below a threshold and shows them only on hover — Linear/Vercel "comfortable vs compact" density pattern applied to an image overlay. Source: 2025 semantic-segmentation / UI-component-detection color-coding research (per-component categorical color overlays) + Linear/Vercel density-toggle convention.

Sources:
- [Bounding Box Annotation: 2026 Best Practices — Label Your Data](https://labelyourdata.com/articles/data-annotation/bounding-box-annotation)
- [How to display Bounding Boxes on Images with JavaScript — Eden AI](https://www.edenai.co/post/how-to-display-bounding-boxes-on-images-with-javascript)
- [Turning Screenshots into Data: A Four-Level Taxonomy for Screenshot Understanding — Medium / Data Science Collective](https://medium.com/data-science-collective/turning-screensots-int-data-html-126bdcaa4821)
