## ai-context-window — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 21 | `.container` background | `--cg-color-surface-cards-background` | Yes | — |
| 22 | `.container` border | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | — |
| 23 | `.container` border-radius | `--cg-border-radius-150` | Yes | — |
| 24 | `.container` padding | `--cg-spacing-24` | Yes | — |
| 29 | `.header` margin-bottom | `--cg-spacing-12` | Yes | — |
| 32 | `.title` font-size | `--cg-font-size-xs` | Borderline | Label/caption; below 14px body min but acceptable for an uppercase eyebrow label. See §2. |
| 32 | `.title` font-weight | `--cg-font-weight-semibold` | Yes | — |
| 33 | `.title` color | `--cg-color-surface-container-outlined` | Yes | — |
| 34 | `.title` letter-spacing | `--cg-letter-spacing-wide` | NOT IN VOCAB | `--cg-letter-spacing-*` family absent from all three vocab files — flag (see §6). No verified replacement, so not in fixes array. |
| 37 | `.total` font-size | `--cg-font-size-xs` | Borderline | Numeric mono counter; small but a status metric, acceptable. |
| 38 | `.total` font-family | `--cg-font-family-mono` | Yes | — |
| 39 | `.total` color | `--cg-color-surface-container-outlined` | Yes | — |
| 41 | `.total.warning` color | `--cg-color-status-warning-text-default` | Yes | — |
| 42 | `.total.danger` color | `--cg-color-status-error-text-default` | Yes | — |
| 46 | `.bar` height | `--cg-spacing-8` | Yes (spacing-as-size, ok) | — |
| 47 | `.bar` border-radius | `--cg-border-radius-full` | Yes | — |
| 48 | `.bar` background | `--cg-color-surface-cards-border` | Yes (track) | — |
| 55 | `.segment` transition | `width --cg-transition-duration-slow --cg-transition-easing-default` | Yes (explicit prop, not `all`) | — |
| 59-60 | `.segment` radius | `--cg-border-radius-full` | Yes | — |
| 61 | `.segment:hover` opacity | `0.8` | Yes (unitless) | — |
| 67 | tooltip bottom | `calc(100% + --cg-spacing-6)` | Yes | — |
| 70 | tooltip background | `--cg-color-tooltip-background` | Yes (in vocab) | — |
| 71 | tooltip color | `--cg-color-tooltip-text` | Yes (in vocab) | — |
| 72 | tooltip padding | `--cg-spacing-4` `--cg-spacing-8` | Yes | — |
| 73 | tooltip border-radius | `--cg-border-radius-100` | Yes | — |
| 74 | tooltip font-size | `--cg-font-size-xs` | Borderline | Tooltip text; small is conventional. |
| 76 | tooltip z-index | `10` | Yes (unitless) | — |
| 82 | `.legend` gap | `--cg-spacing-20` | Yes | — |
| 85 | `.legend-item` gap | `--cg-spacing-4` | Yes | — |
| 86 | `.legend-item` font-size | `--cg-font-size-xs` | Borderline | Legend caption. See §2. |
| 86 | `.legend-item` color | `--cg-color-surface-container-outlined` | Yes | — |
| 89 | `.legend-dot` w/h | `--cg-spacing-8` | Yes (spacing-as-size) | — |
| 90 | `.legend-dot` border-radius | `--cg-border-radius-full` | Yes | — |
| 93 | `.legend-tokens` font-family | `--cg-font-family-mono` | Yes | — |
| 94 | `.legend-tokens` font-weight | `--cg-font-weight-semibold` | Yes | — |
| 95 | `.legend-tokens` color | `--cg-color-surface-base-text` | Yes | — |
| 100 | `.cache-row` gap | `--cg-spacing-8` | Yes | — |
| 101 | `.cache-row` margin/padding-top | `--cg-spacing-12` | Yes | — |
| 102 | `.cache-row` border-top | `--cg-border-width-50` + `--cg-color-surface-cards-divider` | Yes | — |
| 103 | `.cache-row` font-size | `--cg-font-size-xs` | Borderline | Caption. |
| 103 | `.cache-row` color | `--cg-color-surface-container-outlined` | Yes | — |
| 106 | `.cache-icon` color | `--cg-color-action-primary-background-default` | NO — semantic mismatch | This is the cache (AI lifecycle) indicator. Use `--cg-color-ai-cached-text`. **Real fix.** |
| 107 | `.cache-icon` w/h | `--cg-spacing-12` | Yes (spacing-as-size) | — |
| 113-116 | `:host([rounded])` radius | `0`, `--cg-border-radius-50/100/150` | Yes | — |
| 124-130 | `_defaultColors[]` (TS) | action-primary + status info/warning/success/error text tokens | Yes (data palette, all in vocab) | — |

### 2. Styling Audit
- **Border radius:** Consistent token usage; `--cg-border-radius-150` default container with `rounded` variants mapping to `none/50/100/150`. Bar and dots use `--cg-border-radius-full`. Clean.
- **Spacing:** All from the `--cg-spacing-*` scale (24/16/12/8/6/4/20). No magic numbers.
- **Font-size accessibility:** Every text element uses `--cg-font-size-xs`. All of them are labels/captions/metrics (uppercase eyebrow title, mono counter, legend captions, tooltip, cache caption) rather than reading body copy, so the 14px body-min rule is not strictly violated — but the legend item labels (`.legend-item`, line 86) are the closest to "content" and would read more comfortably at `--cg-font-size-sm`. Recommend bumping legend + cache-row to `--cg-font-size-sm` for legibility (design recommendation, not a hard token violation).
- **Translucent vs solid borders:** Borders/dividers use solid semantic surface tokens (`surface-cards-border`, `surface-cards-divider`). Appropriate.
- **Transitions:** Explicit property (`transition: width ...`), not `transition: all`. Uses motion tokens for duration + easing. `reducedMotion` style is imported. Compliant. The `:host` `.segment:hover` opacity change is instant (no transition) — minor; could add `opacity` to the transition list for polish.
- **Dark-theme suitability:** Uses semantic surface/status tokens throughout, so it adapts to theme. Good.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | Container + bar + legend render from `segments`/`total`. | — |
| Hover | Yes | `.segment:hover` opacity 0.8 + tooltip via `::after`. | No transition on opacity; tooltip is CSS-only (not keyboard reachable — see §4). |
| Active/Press | No | Segments are clickable but no `:active` style. | Add pressed feedback for the clickable segment. |
| Focus-visible | No | Segments dispatch click but are `<div>` with no `tabindex`/`:focus-visible` ring. | P0 a11y gap — clickable segments are not focusable/keyboard-operable. |
| Disabled | N/A | No disabled concept for a read-out widget. | — |
| Loading | N/A | Static budget bar; no async load state. | — |
| Error | Partial | `.total.danger` at ≥95% usage (uses `status-error-text`). | This is a usage-threshold visual, not a true error state. Acceptable. |
| Success | N/A | No success concept. Warning at ≥80% (`status-warning-text`) is the analogous threshold. | — |

### 4. Interaction Audit
- **Keyboard:** None. Segments (`<div class="segment">`) handle `@click` but have no `tabindex`, no `role="button"`, and no `keydown` (Enter/Space) handler. Click-only — fails keyboard operability.
- **ARIA:** Container has `role="figure"` + descriptive `aria-label` (good summary). However the interactive segments expose no role/label/state, and the legend/tooltip text is decorative-only. The tooltip (`::after` on `:hover`) is mouse-only and invisible to AT.
- **CustomEvents:** `ai-context-segment-click` fires with `{ bubbles: true, composed: true, detail: { label, tokens } }`. Detail shape is correct and matches the `@fires` JSDoc (line 5). Good.
- **Touch targets:** The bar is `--cg-spacing-8` (~8px) tall; individual segments are far below the 44px minimum touch target and are the click affordance. Tap targets are too small (design enlargement — noted here, not a token fix).

### 5. Visual Design Check
- Modern/sleek? Yes — segmented full-radius budget bar with mono numerics and a legend reads like a polished usage meter (Vercel- analytics flavor).
- Radius? Consistent, tokenized, configurable.
- Breathing room? `--cg-spacing-24` container padding + 12/16px rhythm is comfortable.
- Dividers? Cache row uses a proper `surface-cards-divider` top border. Good separation.
- Typography hierarchy? Uppercase eyebrow title + mono counters + caption legend is coherent, though everything sits at `xs`; one size step of contrast (sm for legend) would sharpen it.
- HeroUI/Vercel showcase-ready? Close. Blockers are the a11y gaps (focus/keyboard/touch) and the cache-icon semantic-color mismatch, not the visual layer.
- One-word verdict: **strong**

### 6. Fixes Needed

1. **Line 106** — cache icon uses a generic action color for an AI lifecycle "cached" indicator.
   - Current: `color: var(--cg-color-action-primary-background-default);`
   - Fixed: `color: var(--cg-color-ai-cached-text);`
   - Why: Conventions require AI-lifecycle states to use the dedicated `ai-*` family. The cache row represents cached tokens, so `--cg-color-ai-cached-text` (verified in vocab line 35) is the correct semantic token.

2. **Line 34 (FLAG ONLY — no verified replacement)** — `letter-spacing: var(--cg-letter-spacing-wide)`. No `--cg-letter-spacing-*` token appears in any of the three vocab files. This is likely a made-up/nonexistent tier-1 token. It needs a real letter-spacing token or removal, but since no replacement exists in the supplied vocab, no automated fix is proposed.

**Non-token design recommendations (not in fixes array):**
- Make segments keyboard-operable: add `role="button"`, `tabindex="0"`, a `:focus-visible` ring (`--cg-color-focus-ring`), Enter/Space handlers, and a press (`:active`) state.
- Expose the tooltip content to assistive tech (e.g. `aria-label`/`title` on each segment) since the `::after` tooltip is mouse-only.
- Enlarge the segment touch/click target toward 44px (e.g. an invisible hit area), as the bar is only ~8px tall.
- Consider bumping legend + cache-row text from `--cg-font-size-xs` to `--cg-font-size-sm` for legibility.

### Research-backed enhancements

Benchmarked against the 2025-era reference for this exact component: the Vercel **AI SDK Elements `Context`** compound component (ai-sdk.dev/elements/components/context), plus shadcn/ui and Linear interaction conventions.

1. **Adopt the AI SDK `Context` "used / max + percentage" overflow popover, not just a bar.** The AI SDK `Context` primitive surfaces a compact trigger (a percentage + ring) that expands into a detailed breakdown of `usedTokens`, `maxTokens`, `inputTokens`, `outputTokens`, `reasoningTokens`, and **cost estimate** on click/hover. Our component already has segments and a cache row but no cost line and no detail-on-demand affordance — add a popover/disclosure that reuses the existing segment data and adds a `$cost` field, matching the de-facto AI SDK pattern. (Source: Vercel AI SDK Elements — `Context`.)

2. **Replace the linear bar with (or offer) a conic-gradient progress ring for the collapsed/compact density.** The AI SDK `Context` and most 2025 token-budget UIs (shadcn progress blocks) use a small radial ring as the at-a-glance affordance because it reads at 16–20px in a toolbar where a horizontal bar cannot. Add a `:host([variant="ring"])` rendering using `conic-gradient` driven by the usage percentage, keeping the segmented bar as the `variant="bar"` default. (Source: ai-sdk.dev `Context` + shadcn/ui progress blocks.)

3. **Add a threshold "ratchet" micro-animation when usage crosses 80% / 95%.** Right now the color flip to `status-warning`/`status-error` is instant. Linear/Vercel-style meters animate the threshold crossing — a one-shot ~200ms pulse/scale on the total counter plus an animated fill catch-up — to draw the eye exactly when the budget gets dangerous. Gate it behind the already-imported `reducedMotion` guard. (Source: Linear motion conventions; shadcn animated progress.)

4. **Animate the fill on mount and on data change with a spring-in, not just on width transition.** The current `transition: width` only animates reactive updates. 2025 shadcn/Vercel progress components animate from 0 → value on first paint (`@starting-style` or a keyframe) so the meter visibly "fills," which communicates that the number is live/streamed. This pairs naturally with the streaming token counts this AI component will receive. (Source: shadcn/ui progress; Vercel Academy custom-component patterns.)

5. **Add a `loading` (skeleton) and `empty` state.** Both are missing (§3) and both are standard in the AI SDK `Context` lifecycle: before the first model response there are no token counts. Render a shimmer track for `loading` and a muted "No context used yet" caption for `empty`, using `--cg-color-surface-cards-border` for the skeleton and `surface-container-outlined` for the empty caption. (Source: ai-sdk.dev `Context` lifecycle; shadcn skeleton.)

6. **Make the legend a horizontally-scrollable, hover-linked row at high segment counts.** Linear/shadcn dense data UIs keep legends on a single line with `overflow-x` and tie legend-item hover ↔ segment highlight (bidirectional emphasis). With many model/source segments our fixed `gap: --cg-spacing-20` legend will wrap awkwardly; add `flex-wrap` control + a `:hover` cross-highlight bridging `.legend-item` and its `.segment` via a shared `data-segment-id`. (Source: Linear data-row density patterns; shadcn chart legend.)

Sources:
- [AI SDK Elements — Context](https://ai-sdk.dev/elements/components/context)
- [shadcn/ui — Progress](https://ui.shadcn.com/docs/components/radix/progress)
- [Progress Components for shadcn UI — Shadcnblocks](https://www.shadcnblocks.com/components/progress)
- [Extending shadcn/ui with Custom Components — Vercel Academy](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components)
