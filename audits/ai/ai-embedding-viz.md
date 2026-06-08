## ai-embedding-viz — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 40 | animation duration | `var(--cg-transition-duration-fast)` | Yes | — |
| 40 | animation easing | `var(--cg-transition-easing-ease-out)` | Yes | — |
| 45 | background | `var(--cg-color-surface-container-background)` | Yes | — |
| 46 | border width | `var(--cg-border-width-50)` | Yes | — |
| 46 | border color | `var(--cg-color-surface-cards-border)` | Yes | — |
| 47 | border-radius | `var(--cg-border-radius-150)` | Yes | — |
| 48 | padding | `var(--cg-spacing-16)` | Yes | — |
| 49 | color | `var(--cg-color-surface-base-text)` | Yes | — |
| 56 | margin-bottom | `var(--cg-spacing-12)` | Yes | — |
| 60 | font-size | `var(--cg-font-size-sm)` | Yes | — |
| 61 | font-weight | `var(--cg-font-weight-semibold)` | Yes | — |
| 65 | font-size | `var(--cg-font-size-xs)` | Yes (label/meta, not body) | — |
| 66 | color | `var(--cg-color-input-text-placeholder)` | Borderline — repurposed input token for chart meta | Prefer `--cg-color-surface-container-text` semantically, but current is a real token. Flag only. |
| 71 | background | `var(--cg-color-surface-base-background)` | Yes | — |
| 72 | border width | `var(--cg-border-width-50)` | Yes | — |
| 72 | border color | `var(--cg-color-surface-cards-border)` | Yes | — |
| 73 | border-radius | `var(--cg-border-radius-100)` | Yes | — |
| 80 | height | `var(200px)` | **NO — invalid CSS** (`var()` wrapping a bare value; not a token) | **Fix: `var(--cg-spacing-192)`** (closest real spacing; no component token exists) |
| 85 | transition | `r var(--cg-transition-duration-fast) var(--cg-transition-easing-default)` | Yes — explicit property, not `all` | — |
| 87 | `r` (hover) | `7` | SVG geometry magic value | Unitless SVG attr-as-CSS; not a token violation. Flag for design consistency. |
| 89 | outline width | `2px` (bare) | **NO — bare magic px** | **Fix: `var(--cg-border-width-100)`** |
| 89 | outline color | `var(--cg-overlay-accent-strong)` | Valid token, but focus should use focus-ring family | Prefer `var(--cg-color-focus-ring)`. Flag (current is a real token). |
| 90 | outline-offset | `var(--cg-outline-offset-default)` | **NO — token not in vocab** | No `--cg-outline-offset-*` token exists in vocab. Flag: cannot verify a replacement. |
| 94 | font-size | `var(--cg-font-size-xs)` | Yes (SVG label) | — |
| 95 | fill | `var(--cg-color-input-text-placeholder)` | Borderline repurposed token | Real token; flag only. |
| 101 | background | `var(--cg-color-surface-base-background)` | Tooltip on surface-base — works but a tooltip family exists | Prefer `var(--cg-color-surface-tooltip-background)`. Flag. |
| 102 | border width | `var(--cg-border-width-50)` | Yes | — |
| 102 | border color | `var(--cg-color-surface-cards-border)` | Yes | — |
| 104 | font-size | `var(--cg-font-size-xs)` | Yes | — |
| 105 | padding | `var(--cg-spacing-6) var(--cg-spacing-8)` | Yes | — |
| 106 | border-radius | `var(--cg-border-radius-100)` | Yes | — |
| 111 | margin-top | `calc(-1 * var(--cg-spacing-8);` | **NO — syntactically broken** (missing closing `)`) | **Fix: `calc(-1 * var(--cg-spacing-8))`** |
| 117 | gap | `var(--cg-spacing-8)` | Yes | — |
| 118 | margin-top | `var(--cg-spacing-8)` | Yes | — |
| 124 | gap | `var(--cg-spacing-4)` | Yes | — |
| 125 | font-size | `var(--cg-font-size-xs)` | Yes | — |
| 126 | color | `var(--cg-color-input-text-placeholder)` | Borderline repurposed | Flag only. |
| 130 | width | `var(--cg-spacing-8)` | Yes (legend swatch) | — |
| 131 | height | `var(--cg-spacing-8)` | Yes | — |
| 137 | color | `var(--cg-color-input-border-hover)` | **Misuse — border token used as text color** | Prefer `var(--cg-color-empty-state-text-secondary)`. Flag. |
| 138 | font-size | `var(--cg-font-size-sm)` | Yes (body min met) | — |
| 139 | padding | `var(--cg-spacing-24) 0` | Yes | — |
| 144 | fill | `var(--cg-color-input-border-hover)` | Border token used as fill | Prefer `var(--cg-color-chart-axis)`. Flag. |
| 32-34, 159 | CLUSTER_COLORS / default fill | raw `#hex` array | Data-layer categorical colors | No categorical chart-color token family in vocab (`--cg-color-chart-*` only has `axis`/`grid`). Cannot replace with verified tokens. Flag. |

### 2. Styling Audit

- **Border radius:** Consistent tier-1 radii (`-150` container, `-100` chart/tooltip). Coherent; modern.
- **Spacing:** All from the spacing scale (`6/8/12/16/24`). Clean.
- **Font-size accessibility:** Body/title uses `--cg-font-size-sm` (14px min met). Meta/labels/legend use `--cg-font-size-xs` — acceptable as they are chart annotations, point-count, and legend labels, not body copy.
- **Translucent vs solid borders:** Borders use solid `--cg-color-surface-cards-border` at `--cg-border-width-50`. Suitable for dark theme; no harsh full-opacity dividers.
- **Transitions:** Explicit (`transition: r ...`), no `transition: all`. Motion comes from `fadeSlideInKeyframes` + `reducedMotion` mixin — good reduced-motion handling.
- **Dark-theme suitability:** Surface/text tokens are theme-aware. The hardcoded `#hex` cluster palette and `#dfff61` default fill bypass theming — acceptable for categorical data encoding but worth noting they will not adapt to light theme.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | Points rendered at `r=5`, `opacity=0.8` | — |
| Hover | Yes | `.point:hover { r: 7 }` + tooltip via `@mouseenter` | Radius `7` is a magic SVG value; tooltip follows mouse correctly |
| Active/Press | No | Click dispatches event but no pressed visual | Minor — scatter points rarely need press state. Flag. |
| Focus-visible | Yes | `.point:focus-visible` outline | `2px` bare width + non-existent `--cg-outline-offset-default` token; outline color uses overlay instead of focus-ring |
| Disabled | N/A | Visualization is read-only display; no disabled concept | — |
| Loading | N/A | Data passed as prop; no async/loading state in component | — |
| Error | N/A | No fetch; rendering is synchronous | — |
| Success | N/A | Not an action component | — |
| Empty | Yes | `.empty-state` "No embedding data" | Uses border token (`--cg-color-input-border-hover`) as text color |

### 4. Interaction Audit

- **Keyboard:** Each point is `tabindex="0"` with `@keydown` handling Enter and Space (with `preventDefault`). Good. Points are individually focusable.
- **ARIA roles/labels:** `role="region"` + `aria-label` on container; `role="img"` + descriptive `aria-label` on svg; each point `role="button"` with `aria-label` including cluster; legend `role="list"`/`role="listitem"`. Strong coverage.
- **CustomEvents:** `ai-embedding-point-click` fires with `bubbles: true, composed: true`. **Detail mismatch:** JSDoc (line 17) documents `detail: {point: EmbeddingPoint}`, but the implementation (line 200) emits `{ label, x, y, cluster }` — flattened, no `point` key and drops `color`. Doc/impl inconsistency. Flag.
- **Touch targets:** Points are `r=5` (10px) / hover `r=7` (14px) — below the 44px touch-target guideline. This is a sizing/design change (data-density tradeoff), not a token violation — described here, not in fixes.

### 5. Visual Design Check

Modern and clean: token-driven surfaces, soft radii, restrained borders, fade-in entrance with reduced-motion support, and a tidy wrap-flex legend. Typography hierarchy (semibold title / xs muted meta) reads well on dark. The hardcoded categorical palette is vivid and showcase-friendly. Breathing room is good (16px container padding, 12px header gap). Two real defects (broken `var(200px)` height and the unclosed `calc(`) currently break the styling and must be fixed before it renders correctly. Dividers are implicit via card borders — adequate. HeroUI/Vercel showcase-ready once the two broken declarations are repaired.

One-word verdict: **adequate**

### 6. Fixes Needed

1. **Line 80** — `height: var(200px);` → `height: var(--cg-spacing-192);`
   Why: `var(200px)` is invalid CSS (a bare length cannot be a custom-property name); the chart SVG currently has no height. `--cg-spacing-192` is the nearest real token; no `ai-embedding-viz` component height token exists in the vocab.

2. **Line 89** — `outline: 2px solid var(--cg-overlay-accent-strong);` → `outline: var(--cg-border-width-100) solid var(--cg-overlay-accent-strong);`
   Why: `2px` is a bare magic pixel value. `--cg-border-width-100` is a verified tier-1 token. (Outline color left as the existing valid overlay token; see flags re: focus-ring family.)

3. **Line 111** — `margin-top: calc(-1 * var(--cg-spacing-8);` → `margin-top: calc(-1 * var(--cg-spacing-8));`
   Why: The `calc()` is missing its closing parenthesis — the declaration is syntactically invalid and is dropped by the parser.

**Flags (no verified token / design change — not auto-fixable):**
- Line 90: `var(--cg-outline-offset-default)` does not exist in any vocab file — this token is invalid/made-up and needs a real replacement (no `--cg-outline-offset-*` family available to verify).
- Lines 32-34 & 159: hardcoded `#hex` cluster palette — no categorical chart-color token family exists in the vocab to replace them.
- Line 200 vs JSDoc line 17: CustomEvent `detail` shape mismatch (`{label,x,y,cluster}` emitted vs `{point}` documented; `color` dropped).
- Lines 66/95/126/137/144: repurposed input/border tokens used for chart text/fill/empty-state color — semantically off but they are real tokens; prefer surface/chart/empty-state families.
- Touch targets: points (10–14px) are below 44px — data-density design tradeoff, not a token fix.

### Research-backed enhancements

One web pass on 2025-era embedding/scatter UI (Jupyter Scatter's large-scale interaction model, Adobe Spectrum's scatter-plot guidance, embComp's comparison views) surfaced concrete gaps in this component. Each suggestion below maps to a missing affordance, micro-interaction, or state — not a restyle.

1. **Lasso + brush region selection (currently single-point only).** The dominant interaction in modern embedding explorers is selecting a *cluster* by dragging a rectangle or freehand lasso, not clicking individual dots — exactly the "select a region by drawing a bounding box or lasso" pattern documented in Jupyter Scatter (arxiv 2406.14397) and Adobe Spectrum's scatter-plot page. Add a drag-to-brush layer that emits a `ai-embedding-region-select` CustomEvent with the enclosed point set. This is the single highest-value addition: scatter points at `r=5` are near-impossible to hit one at a time, and it sidesteps the 44px touch-target problem flagged in §4 by making the *region* the target.

2. **Hover-driven cluster focus + dimming (Linear/Vercel "spotlight" micro-interaction).** On point or legend-swatch hover, animate non-matching clusters to ~0.15 opacity (transition `opacity var(--cg-transition-duration-fast)`) and keep the hovered cluster at full opacity. This is the same focus-pull Linear uses on graph hovers and Vercel uses on Analytics charts — it turns a static dot field into something legible at a glance. Pairs naturally with making legend items interactive (click-to-toggle a cluster's visibility), which the current static `role="list"` legend does not do.

3. **Density abstraction at scale (hex-bin fallback).** The component renders one DOM/SVG node per point, which collapses visually and in performance past a few hundred points. Jupyter Scatter and embComp (arxiv 1911.01542) both abstract dense regions into hexagonal bins for legibility. Add a `pointCount` threshold above which the viz switches to a hex-bin heat layer (opacity encoding density) — and surface the threshold crossing so the consumer knows abstraction is active.

4. **Animated entrance and reposition transitions (shadcn/Framer-style motion).** The fade-slide entrance is good, but points "pop" into final position. Modern data-viz (shadcn chart examples, Vercel) animates points *from centroid outward* or interpolates `cx`/`cy` when data changes, so re-projections (t-SNE → UMAP swap) read as motion rather than a hard cut. Drive this off the existing `reducedMotion` mixin so it stays accessible.

5. **Missing async states — loading skeleton + error.** §3 marks Loading/Error as N/A because data arrives as a prop, but every real embedding view computes a projection (UMAP/t-SNE) that is slow and can fail. Add an opt-in `loading` attribute that renders a shimmer over the chart frame and an `error` slot/state, matching the skeleton-while-computing convention now standard in Vercel and shadcn dashboards. Without these the component can only ever show the synchronous happy path.

6. **Crosshair + coordinate readout on hover (Spectrum scatter guidance).** Adobe Spectrum's scatter-plot pattern recommends an axis crosshair and a value readout on hover rather than a bare tooltip. Add faint guide lines from the hovered point to each axis plus the projected coordinates in the tooltip — cheap to render, and it gives the otherwise-unitless embedding space a sense of position. This also fixes the §4 CustomEvent inconsistency opportunity: standardize the hover payload to include the same `{point}` shape the JSDoc already promises.

Sources:
- [Jupyter Scatter: Interactive Exploration of Large-Scale Datasets (arXiv 2406.14397)](https://arxiv.org/pdf/2406.14397)
- [Scatter plot — Adobe Spectrum design system](https://spectrum.adobe.com/page/scatter-plot/)
- [embComp: Visual Interactive Comparison of Vector Embeddings (arXiv 1911.01542)](https://arxiv.org/pdf/1911.01542)
