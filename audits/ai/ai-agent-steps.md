## ai-agent-steps — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 33 | display | block | ✅ | none |
| 39 | gap | var(--cg-spacing-2) | ✅ | none |
| 44-45 | display/align-items | flex / flex-start | ✅ | none |
| 46 | gap | var(--cg-spacing-12) | ✅ | none |
| 47 | padding | var(--cg-spacing-12) var(--cg-spacing-16) | ✅ | none |
| 48 | border-radius | var(--cg-border-radius-100) | ✅ | none |
| 49 | animation | var(--cg-transition-duration-slow) var(--cg-transition-easing-ease-out) | ✅ | none |
| 50 | animation-delay | calc(var(--step-index, 0) * 60ms) | ⚠️ | `--step-index` JS positional index — `0` default OK per convention. `60ms` is a raw stagger value (not a design token); borderline-acceptable for per-item stagger, no duration token fits. |
| 54 | transform | translateX(calc(-1 * var(--cg-spacing-8))) | ✅ | none |
| 60-61 | width/height | var(--cg-spacing-20) | ⚠️ | Icon sizing via spacing token; `--cg-icon-size-*` tier-1 tokens exist (e.g. `--cg-icon-size-200`). Prefer icon-size scale, but spacing is acceptable. Minor. |
| 66 | margin-top | var(--cg-spacing-1) | ✅ | none |
| 71 | color (pending icon) | var(--cg-color-surface-container-outlined) | ✅ | none |
| 74-75 | width/height | var(--cg-spacing-16) | ⚠️ | same icon-size note as line 60. Minor. |
| 76 | opacity | 0.4 | ✅ | raw opacity, legit |
| 81 | color (loading icon) | var(--cg-color-action-primary-background-default) | ⚠️ | Generic action color for an AI *loading/thinking* state. Recommend AI family: `--cg-color-ai-thinking-text` (or `--cg-color-ai-streaming-text`). |
| 84-85 | width/height | var(--cg-spacing-16) | ⚠️ | icon-size note. Minor. |
| 86 | border | var(--cg-border-width-100) solid var(--cg-color-loading-spinner-secondary) | ✅ | none |
| 87 | border-top-color | var(--cg-color-loading-spinner-primary) | ✅ | none |
| 88 | border-radius | var(--cg-border-radius-full) | ✅ | none |
| 89 | animation | spin 0.8s linear infinite | ⚠️ | raw `0.8s`; no exact token; spinner timing borderline-acceptable. |
| 94 | color (complete icon) | var(--cg-color-status-success-text-default) | ⚠️ | Functionally fine, but this is an AI *complete* state — `--cg-color-ai-complete-text` is the dedicated family token. Recommended. |
| 96-99 | width/height/animation | var(--cg-spacing-16) / slow / ease-out | ✅ | none (icon-size note as above) |
| 110 | color (error icon) | var(--cg-color-status-error-text-default) | ⚠️ | AI *error* state — recommend `--cg-color-ai-error-text`. |
| 112-114 | width/height | var(--cg-spacing-16) | ⚠️ | icon-size note. Minor. |
| 121 | padding-top | var(--cg-spacing-2) | ✅ | none |
| 125 | font-size | var(--cg-font-size-sm) | ✅ | meets 14px min for label body text |
| 126 | font-weight | var(--cg-font-weight-medium) | ✅ | none |
| 127 | line-height | var(--cg-line-height-snug) | ✅ | none |
| 132 | color (pending label) | var(--cg-color-surface-container-outlined) | ✅ | semantic; with opacity 0.5 |
| 134 | opacity | 0.5 | ✅ | legit |
| 136 | color (loading label) | var(--cg-color-surface-base-text) | ✅ | none |
| 139 | color (complete label) | var(--cg-color-surface-container-outlined) | ✅ | none |
| 142 | color (error label) | var(--cg-color-status-error-text-default) | ⚠️ | AI error state — recommend `--cg-color-ai-error-text` for consistency with icon. |
| 146 | font-size | var(--cg-font-size-xs) | ⚠️ | Detail text below `--cg-font-size-sm` (14px). xs is typically ~12px. Secondary metadata, but flagged: body/detail text under 14px is an a11y note. Borderline (caption-tier), acceptable for supplementary detail. |
| 147 | color (detail) | var(--cg-color-surface-container-outlined) | ✅ | none |
| 148-149 | line-height/margin-top | snug / spacing-2 | ✅ | none |
| 154-159 | gradient stops | surface-base-text / action-primary-background-default | ⚠️ | Shimmer mid-stop uses generic action-primary; AI streaming context — `--cg-color-ai-streaming-text` would be more semantically correct. Color-stop %s (35/50/65) are legit. |
| 160 | background-size | 300% 100% | ✅ | legit gradient sizing |
| 164 | animation | textSweep 1.8s var(--cg-transition-easing-default) | ⚠️ | raw `1.8s`; no token; shimmer timing borderline-acceptable. |
| 168-169 | background-position | 100% 50% / 0% 50% | ✅ | keyframe positions, legit |
| 179 | left (connector) | var(--cg-spacing-16) | ✅ | none |
| 180 | top | var(--cg-spacing-32) | ✅ | none |
| 181 | bottom | calc(-1 * var(--cg-spacing-2)) | ✅ | none |
| 182 | width | var(--cg-border-width-50) | ✅ | hairline via token — correct |
| 183 | background (divider) | var(--cg-color-surface-base-divider) | ✅ | none |
| 186 | background (complete connector) | var(--cg-color-status-success-text-default) | ⚠️ | AI complete state — `--cg-color-ai-complete-text` recommended for family consistency. |
| 188 | opacity | 0.3 | ✅ | legit |
| 192 | border | var(--cg-border-width-50) solid var(--cg-color-surface-cards-border) | ✅ | none |
| 193 | border-radius | var(--cg-component-card-radius) | ✅ | correct tier-3 |
| 194 | background | var(--cg-color-surface-cards-background) | ✅ | none |
| 195 | padding | var(--cg-spacing-16) | ✅ | none |
| 198 | transform | rotate(360deg) | ✅ | legit |

No banned tier-1 palette colors (`--cg-gray/red/blue/green/brand`), no raw `#hex`/`rgba()` CSS color values, no comma-fallbacks on design tokens, no `transition: all`, no made-up token names. All token names verified present in the vocab files. The file is structurally clean; the open items are AI-family semantic-color recommendations plus minor icon-size/raw-time notes.

### 2. Styling Audit
- **Border radius**: `--cg-border-radius-100` on rows and `--cg-component-card-radius` on the contained variant — appropriate, modern, consistent.
- **Spacing generosity**: padding `12 16`, gap `12`, comfortable row rhythm. Good breathing room for a dense feed.
- **Font-size accessibility**: label is `--cg-font-size-sm` (14px) — meets minimum. Detail text is `--cg-font-size-xs` (~12px), below the 14px body floor; acceptable as supplementary caption metadata but noted.
- **Translucent vs solid borders**: contained variant uses semantic `--cg-color-surface-cards-border`; connector line uses `--cg-color-surface-base-divider` with opacity tweak for the complete state — appropriate.
- **Transitions explicit vs all**: no `transition: all`; animations use explicit tokenized duration/easing (`--cg-transition-duration-slow`, `--cg-transition-easing-ease-out/default`). Raw `0.8s`/`1.8s`/`60ms` exist only on `@keyframes`-driven animations where no exact token matches — borderline-acceptable.
- **Motion tokens**: `reducedMotion` style imported and a `prefers-reduced-motion` block (lines 200-205) disables all animations and restores text fill — excellent.
- **Dark-theme background**: contained variant uses `--cg-color-surface-cards-background`; non-contained is transparent and inherits host. Dark-first suitable.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default (pending) | ✅ | `.step.pending` empty-circle icon, dimmed label (opacity 0.5) | None. |
| Hover | ❌ | No `:hover` on `.step` | Completed steps are clickable (cursor + hover affordance missing). No `cursor: pointer` and no hover feedback on interactive complete rows. |
| Active/Press | ❌ | None | No `:active` press feedback on clickable complete rows. |
| Focus-visible | ❌ | None | Rows are click-handled via `@click` on a non-focusable `div` with `role="listitem"`. No keyboard focus, no `:focus-visible` ring. P0 a11y gap for the interactive complete step. |
| Disabled | N/A | — | No disabled concept for a read-only progress feed. Justified N/A. |
| Loading | ✅ | `.step.loading` spinner + label shimmer sweep | Strong. Uses generic action-primary instead of AI-thinking/streaming family color. |
| Error | ✅ | `.step.error` X icon + error-colored label | Functional; recommend AI-error family token. |
| Success (complete) | ✅ | `.step.complete` checkmark pop + connector highlight | Functional; recommend AI-complete family token. |

### 4. Interaction Audit
- **Keyboard**: None supported. The completed-step click target is a `<div role="listitem">` with an `@click` handler (lines 243-248). It is not focusable (no `tabindex`), exposes no `role="button"`, and has no `keydown` handler for Enter/Space. Keyboard and screen-reader users cannot trigger `ai-step-click`. P0.
- **ARIA**: Container has `role="list"` + `aria-label="Agent steps"` (good). Items use `role="listitem"` (correct for the list). However, status (pending/loading/complete/error) is conveyed only via color + icon — there is no `aria-label`/visually-hidden text announcing each step's status, and no `aria-live`/`aria-busy` so screen readers are not notified as steps progress in this live feed. The clickable complete step has no `role="button"`/`aria-disabled` to distinguish it from non-interactive rows.
- **CustomEvents**: `ai-step-click` fired with `detail: { index }`, `bubbles: true`, `composed: true` (lines 216-220) — correct shape, matches the `@fires` JSDoc, and correctly guarded to only fire on `complete` status (line 215).
- **Touch targets**: Row min height ≈ icon (20px) + padding (12+12) ≈ 44px, so the row itself is roughly at the 44px floor — acceptable, but only the whole row is the implied target and there is no visible affordance that it is tappable.

### 5. Visual Design Check
Sleek and modern: staggered slide-in entrance, checkmark pop, animated shimmer sweep on the active label, and a vertical connector line that tints on completion — this reads like a polished agent activity feed. Radius and spacing are appropriate and tokenized; typography hierarchy (medium 14px label / 12px muted detail) is clear. The miss is purely interactive polish/a11y: clickable complete steps have no hover/focus/cursor affordance and no keyboard path, and the live feed lacks `aria-live`. Visually it would pass a HeroUI/Vercel showcase; the interactive completeness would not. Verdict: **strong**.

### 6. Fixes Needed
1. **Line 81** — loading icon color. Current `color: var(--cg-color-action-primary-background-default);` → `color: var(--cg-color-ai-thinking-text);`. Why: dedicated AI-state color family exists for an AI thinking/loading state; use it instead of a generic action color.
2. **Line 158** — shimmer mid-stop color. Current `var(--cg-color-action-primary-background-default) 50%,` → `var(--cg-color-ai-streaming-text) 50%,`. Why: the active-step shimmer represents streaming; use the AI-streaming family token.
3. **Line 94** — complete icon color. Current `color: var(--cg-color-status-success-text-default);` → `color: var(--cg-color-ai-complete-text);`. Why: AI-complete is the semantically correct family for an AI operation finishing.
4. **Line 186** — complete connector color. Current `background: var(--cg-color-status-success-text-default);` → `background: var(--cg-color-ai-complete-text);`. Why: consistency with the complete-state AI family token.
5. **Lines 110 & 142** — error icon and label color. Current `var(--cg-color-status-error-text-default)` → `var(--cg-color-ai-error-text)`. Why: AI-error family token for the AI error state.
6. **Interaction/a11y (lines 243-248, 214-222)** — completed steps are clickable but keyboard-inaccessible. Add `tabindex=${step.status === 'complete' ? '0' : nothing}`, `role="button"` (with an accessible label) on complete rows, a `@keydown` handler firing `_handleStepClick` on Enter/Space, plus `cursor: pointer`, `:hover`, and `:focus-visible` styles for `.step.complete`. Why: the documented `ai-step-click` event is unreachable by keyboard/AT users — P0 accessibility defect.
7. **a11y (line 241)** — add `aria-live="polite"` (and per-step status text via a visually-hidden span) so this live progress feed announces updates to screen readers. Why: status is currently conveyed by color/icon only and the live feed does not notify AT as steps change.

Notes (not fixed): raw animation timings `60ms`/`0.8s`/`1.8s` on `@keyframes`-driven animations are borderline-acceptable (no exact duration token); detail text at `--cg-font-size-xs` is below the 14px body floor but acceptable as caption metadata; icon `width/height` via `--cg-spacing-*` could use `--cg-icon-size-*` tier-1 tokens but is acceptable.

### Research-backed enhancements

- **Auto-collapsing reasoning steps with a "thinking" shimmer.** Following Vercel AI Elements' Reasoning component, render in-progress steps with a subtle animated gradient shimmer on the active step's label, then auto-collapse completed reasoning into a single-line summary ("Searched 3 sources · 1.2s") once the next step starts. This keeps density low during long agent runs while preserving the auditable trail on expand. ([Vercel AI Elements](https://vercel.com/changelog/introducing-ai-elements))

- **Typed step tokens instead of a uniform list.** Differentiate step kinds (tool-call, search, edit, reasoning, plan) with distinct leading glyphs and a tinted left accent rail, mirroring the agent-primitive "tool-call cards" pattern (Bash/Edit/Search/Plan). Each tool-call step should expose a collapsible payload row (args in, result out) so the timeline reads as a structured trace, not flat text. ([shadcn.io AI](https://www.shadcn.io/ai))

- **Animated connector line that "fills" as steps complete.** Replace static dots with a vertical rail where the segment between a completed and the active step animates a progress fill (height/opacity transition, never `transition: all`). Pending steps render at reduced opacity. This gives the Linear/Vercel sense of forward motion and makes streaming state legible at a glance.

- **Per-step status + latency affordances.** Each step needs an explicit state matrix: pending, running (spinner/pulse), success (check), error (retry affordance), and skipped. Surface a monospace latency chip per step on hover — this "observability into agent steps builds user trust" by removing the black-box feeling for tool calls and API steps. ([Fastio: UI frameworks for AI agents](https://fast.io/resources/best-ui-frameworks-ai-agents/))

- **Error and interrupt states with inline recovery.** Add a failed-step treatment (semantic error accent rail + inline "Retry this step" / "Skip" actions) and a cancelled/interrupted state for user-aborted runs. Most timeline components ship only the happy path; production agent UIs need the failure branch first-class.

- **Sticky live-status header for long runs.** When the step list scrolls beyond the viewport, pin a compact header showing the current step label + elapsed timer + overall progress (e.g. "Step 4 of 7"), echoing streaming-response chrome in AI SDK UIs so users never lose the agent's current focus during long executions. ([Vercel AI Elements / AI SDK](https://ai-sdk.dev/))

### Playground proposal

Keep the current four-step example (Searching the web / Reading 3 results / Analyzing content / Generating summary) since it demonstrates complete, loading, and pending states well. Improve it to exercise every status and the contained variant: add the `contained` attribute and include an `error` step plus a `detail` line, e.g. <ai-agent-steps contained .steps=${[{label:'Searching the web', status:'complete', detail:'12 sources found'}, {label:'Reading 3 results', status:'complete'}, {label:'Analyzing content', status:'loading'}, {label:'Cross-referencing claims', status:'error', detail:'Source unreachable'}, {label:'Generating summary', status:'pending'}]}></ai-agent-steps>. This shows the divider tint on complete, the shimmer on loading, the error icon/color, the pending dim state, optional detail text, and the card container in one view.

---
*cleanliness: needs-work | fixes proposed: 6*
