## ai-capture-flow — Manual Review

A multi-step capture wizard (upload → preview → processing → complete/error) with a step
indicator, drag-and-drop upload zone, progress bar, and result/error panels.

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 32 | animation (easing) | `--cg-transition-easing-ease-out` | Yes | — |
| 36 | background | `--cg-color-surface-cards-background` | Yes | — |
| 37 | border width/color | `--cg-border-width-50` / `--cg-color-surface-cards-border` | Yes | — |
| 38 | border-radius | `--cg-border-radius-200` | Yes | — |
| 39 | padding | `--cg-spacing-16` | Yes | — |
| 44 | font-size | `--cg-font-size-base` | Yes | — |
| 45 | font-weight | `--cg-font-weight-bold` | Yes | — |
| 46 | color | `--cg-color-surface-base-text` | Yes | — |
| 47 | margin-bottom | `--cg-spacing-16` | Yes | — |
| 54 | gap | `0` | Yes | Bare 0 allowed |
| 55 | margin-bottom | `--cg-spacing-16` | Yes | — |
| 58–59 | width / height | `--cg-spacing-24` | Yes | Spacing-as-size, acceptable (no tier-3 token) |
| 60 | border-radius | `50%` | Yes | % allowed |
| 64 | font-size | `--cg-font-size-xs` | Yes | Dot numeral label, not body |
| 65 | font-weight | `--cg-font-weight-bold` | Yes | — |
| 67 | transition | `--cg-transition-duration-default` / `-easing-default` | Yes | Explicit property |
| 70–71 | background / color | `--cg-color-action-primary-background-default` / `--cg-color-surface-base-background` | Yes | — |
| 74–75 | background / color | action-primary / surface-base-background | Yes | — |
| 78–79 | background / color | `--cg-color-surface-container-background` / `--cg-color-input-text-placeholder` | Yes | — |
| 83 | height | **`2px` (bare)** | **No** | → `var(--cg-spacing-2)` (=2px) |
| 84 | background | `--cg-color-surface-container-background` | Yes | — |
| 85 | transition | duration-default / easing-default | Yes | Explicit |
| 87 | background | `--cg-color-action-primary-background-default` | Yes | — |
| 91 | border | **`2px dashed` (bare width)** | **No** | width → `var(--cg-border-width-100)` (=2px); `dashed` → `var(--cg-border-style-dashed)` |
| 92 | border-radius | `--cg-border-radius-100` | Yes | — |
| 93 | padding | `--cg-spacing-24` / `--cg-spacing-16` | Yes | — |
| 96 | transition | duration-fast / easing-default | Yes | Explicit |
| 99–100 | border-color / background | `--cg-color-surface-base-text` / `--cg-overlay-accent-subtle` | Yes | — |
| 103 | outline | **`2px solid` (bare width)** + `--cg-overlay-accent-strong` | **Partial** | width → `var(--cg-border-width-100)` |
| 104 | outline-offset | `--cg-outline-offset-default` | Yes | Real token (=2px, verified in dist) |
| 106 | font-size / margin | `--cg-font-size-3xl` / `--cg-spacing-8` | Yes | — |
| 108–110 | font-size / color / line-height | `--cg-font-size-sm` / `--cg-color-input-text-placeholder` / `1.5` | Yes | line-height unitless OK |
| 113–115 | font-size / color / margin | `--cg-font-size-xs` (12px) / placeholder / `--cg-spacing-6` | Borderline | Hint text at 12px (see §2) |
| 123 | max-height | **`var(240px)` (BROKEN)** | **No** | Invalid CSS; `var()` wrapping a bare px. No real max-height token exists — see §6 flag |
| 124–126 | border-radius / border / margin | `--cg-border-radius-100` / `--cg-border-width-50` + surface-cards-border / `--cg-spacing-16` | Yes | — |
| 133–135 | font-size / color / margin | `--cg-font-size-sm` / placeholder / `--cg-spacing-12` | Yes | — |
| 139 | height | `--cg-spacing-6` | Yes | — |
| 140 | background | `--cg-color-surface-container-background` | Yes | — |
| 141 | border-radius | `--cg-border-radius-25` | **No** | Not in tier-1 vocab (only -50/-100/-125…). See §6 flag |
| 147 | background | `--cg-color-action-primary-background-default` | Yes | — |
| 148 | border-radius | `--cg-border-radius-25` | **No** | Same as line 141 |
| 149 | transition | duration-slow / easing-default | Yes | Explicit |
| 152–154 | font-size / weight / color | `--cg-font-size-sm` / semibold / surface-base-text | Yes | — |
| 160–162 | font-size / margin / color | `--cg-font-size-2xl` / `--cg-spacing-8` / **`--cg-color-status-success-text-default`** | **No** | This is the AI **complete** state → `--cg-color-ai-complete-text` |
| 165–168 | font-size / color / line-height / margin | sm / surface-base-text / 1.5 / spacing-16 | Yes | — |
| 173 | color (error icon) | **`--cg-color-status-error-text-default`** | **No** | AI **error** state → `--cg-color-ai-error-text` |
| 174 | color (error text) | **`--cg-color-status-error-text-default`** | **No** | AI **error** state → `--cg-color-ai-error-text` |
| 179–181 | gap / margin | `--cg-spacing-8` / `--cg-spacing-16` | Yes | — |
| 184–187 | padding / radius / font / weight | spacing-8/16 / radius-100 / font-size-sm / semibold | Yes | — |
| 191 | transition | `filter … , background …` (duration-fast/easing) | Yes | Explicit, no `transition: all` |
| 194 | outline | **`2px solid` (bare width)** + `--cg-overlay-accent-strong` | **Partial** | width → `var(--cg-border-width-100)` |
| 195 | outline-offset | `--cg-outline-offset-default` | Yes | Real token |
| 198–199 | background / color | action-primary / surface-base-background | Yes | — |
| 201 | filter | `brightness(0.9)` | Yes | Filter value, not a token slot |
| 203–205 | background / color / border | surface-container / surface-base-text / border-width-50 + cards-border | Yes | — |
| 207 | background | `--cg-color-surface-cards-border` | Yes | Border token used as bg — odd but valid token |

### 2. Styling Audit

- **Border radius:** Card `200`, upload zone / preview / buttons `100`, progress bar/fill `25`
  (broken — see §6). Hierarchy is reasonable (outer container softer than inner controls).
- **Spacing:** Consistent use of the `--cg-spacing-*` scale (6/8/12/16/24). Good rhythm.
- **Font-size accessibility:** Primary body text — upload-text (108), progress-label (133),
  result-text (165) — all use `--cg-font-size-sm` (14px). PASS. The upload-hint (113) and
  step-dot numerals (64) use `xs` (12px); the hint is secondary helper text and the dot is a
  numeral badge, so both are acceptable, but the hint is borderline against the 14px body rule.
- **Translucent vs solid borders:** Card and preview borders use solid semantic
  `--cg-color-surface-cards-border`. Upload-zone hover uses translucent `--cg-overlay-accent-subtle`
  fill with a solid text-color border — works for dark-first.
- **Transitions:** All explicit property lists (opacity / background / width / filter). No
  `transition: all`. Motion durations/easings all tokenized. PASS. Reduced-motion handled via
  the shared `reducedMotion` style import.
- **Dark-theme suitability:** All colors resolve through tier-2 semantic surfaces/actions, so the
  component inherits dark-first theming correctly.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | Card + step indicator + per-step body | — |
| Hover | Yes | `.upload-zone:hover` (99), `.btn-primary:hover` filter (201), `.btn-secondary:hover` (207) | — |
| Active/Press | No | No `:active` styling on buttons or upload zone | Minor: add press feedback |
| Focus-visible | Yes | `.upload-zone:focus-visible` (102), `.btn-row button:focus-visible` (193) | Outline width is bare `2px` |
| Disabled | N/A | No disabled affordance modeled; buttons are always actionable in their step | Acceptable for a wizard |
| Loading | Yes | `processing` step: progress bar + `aria-valuenow` (305–315) | — |
| Error | Yes | `error` step with error icon/text (329–339) | Uses generic status-error, not AI-error token |
| Success | Yes | `complete` step with success check icon (317–327) | Uses generic status-success, not AI-complete token |

### 4. Interaction Audit

- **Keyboard:** Upload zone is `role="button"` `tabindex="0"` with Enter/Space handler
  (278) that calls `preventDefault()` then triggers the file input. Buttons are native
  `<button>` — fully keyboard-operable. PASS.
- **ARIA:** Region labelled by heading (343); step indicator `role="navigation"` +
  `aria-label` (256) with per-dot `aria-label="{label}: {state}"`; progress bar has
  `role="progressbar"` + valuenow/min/max (309); decorative icons `aria-hidden="true"`.
  Strong coverage.
- **CustomEvents:** `ai-capture-file` carries `{ file }` detail (233, 239); `ai-capture-confirm`,
  `ai-capture-retry`, `ai-capture-complete` dispatched with no detail (correct — no payload
  needed). All `bubbles: true, composed: true` (219) so they cross the shadow boundary. Correct.
- **Touch targets:** Buttons are `~14px font + 8/16px padding` → roughly 33–36px tall, under
  the 44px guideline. Step dots are 24px. These are sizing/design concerns, not token
  violations (see §5 / not in fixes array).

### 5. Visual Design Check

- Modern/sleek: yes — clean card, dashed dropzone, slim progress bar, minimal step dots.
- Radius: consistent except the broken progress radius token.
- Breathing room: good (16px card padding, 24px dropzone padding).
- Dividers: step-line acts as connective tissue; no heavy dividers needed.
- Typography hierarchy: title `base/bold` → body `sm` → hint/dot `xs`. Clear.
- Showcase-ready: close, but the broken `var(240px)` and `--cg-border-radius-25` tokens would
  produce visibly wrong rendering (no max-height clamp; square progress bar). Touch targets
  under 44px also hurt mobile polish.
- **Verdict: adequate.**

### 6. Fixes Needed

1. **Line 123** — `max-height: var(240px);` is invalid CSS (a bare px wrapped in `var()`),
   so the preview image is never clamped. There is no real max-height token in the vocab for
   this component, so this cannot be auto-tokenized. FLAG: replace with a real constraint such
   as `max-height: var(--cg-spacing-256);` (16rem/256px exists in tier-1 spacing) or introduce a
   proper tier-3 component token. Not placed in the fixes array because the intended 240px has
   no exact verified token.

2. **Line 83** — `height: 2px;` (bare magic px on the step-line) →
   `height: var(--cg-spacing-2);` (verified = 2px).

3. **Line 91** — `border: 2px dashed var(--cg-color-surface-cards-border);` has a bare `2px`
   width → `border: var(--cg-border-width-100) dashed var(--cg-color-surface-cards-border);`
   (verified = 2px). `dashed` may further be tokenized to `var(--cg-border-style-dashed)`.

4. **Line 103** — `outline: 2px solid var(--cg-overlay-accent-strong);` bare width →
   `outline: var(--cg-border-width-100) solid var(--cg-overlay-accent-strong);`.

5. **Line 194** — same outline fix as #4 →
   `outline: var(--cg-border-width-100) solid var(--cg-overlay-accent-strong);`.

6. **Lines 141 & 148** — `border-radius: var(--cg-border-radius-25);` references a token that
   does NOT exist (vocab only has `-50` upward). FLAG: replace with the smallest real radius
   `var(--cg-border-radius-50)`. Not auto-applied as a token-swap fix because `-25` was likely
   meant to be a pill/full bar — recommend `--cg-border-radius-full` for the progress bar, which
   is a design choice. Left as a flag.

7. **Line 162** — `.result-icon` color `--cg-color-status-success-text-default` represents the
   AI **complete** lifecycle state → `--cg-color-ai-complete-text` (verified in colors vocab).

8. **Line 173** — `.error-icon` color `--cg-color-status-error-text-default` is the AI **error**
   state → `--cg-color-ai-error-text`.

9. **Line 174** — `.error-text` color `--cg-color-status-error-text-default` → `--cg-color-ai-error-text`.

**Design flags (not token violations, not in fixes array):** add `:active` press state to
buttons/upload zone; enlarge buttons to ≥44px tall for touch targets.

### Research-backed enhancements

Sourced from 2025–2026 capture/upload and multi-step-form patterns across shadcn/ui, Vercel v0
generative UI, HeroUI v3 (the NextUI successor, built on React Aria + Tailwind v4), and the
Linear/Vercel aesthetic of dense, motion-quiet, confirmation-driven flows.

1. **Animate the step transition, not just the step dots (shadcn multi-step + Framer Motion).**
   The reference shadcn multi-step forms wrap each step body in a Framer Motion
   slide/fade so the wizard reads as one surface moving, not four panels swapping. Replace the
   instant step swap with a tokenized horizontal slide-and-fade
   (`transform: translateX` + `opacity`, using `--cg-transition-duration-default` /
   `--cg-transition-easing-ease-out`) on enter, and respect the existing `reducedMotion` import.
   This directly upgrades the "Active/Press → No" and abrupt-transition gaps noted in §3.
   Source: [Shadcn UI Multi Form](https://shadcn-ui-multi-form.vercel.app/),
   [Multi Step Form — Next.js Template](https://www.shadcn.io/template/marcosfitzsimons-multi-step-form).

2. **Make the dropzone state-reactive with a drag-over "armed" affordance (HeroUI/Vercel upload pattern).**
   Modern upload zones distinguish three visual states — idle, `dragover` (file hovering the
   window), and `drop`/validating. The current component only styles `:hover` and `:focus-visible`.
   Add a `.upload-zone--dragover` class (toggled on the native `dragenter`/`dragleave`/`dragover`
   events) that lifts the border to `--cg-color-action-primary-background-default` and fills with
   `--cg-overlay-accent-subtle`, plus a subtle scale (`transform: scale(1.01)`). This is the single
   biggest perceived-quality lift for a capture flow.
   Source: [HeroUI — NextUI's 2026 Upgrade](https://www.thesys.dev/blogs/heroui),
   [Top UI Components with v0](https://www.bitcot.com/top-10-ui-components-you-can-create-with-v0-by-vercel/).

3. **Switch the processing bar to an indeterminate shimmer when progress is unknown (Linear/Vercel motion).**
   The current `progressbar` always renders a determinate `width`. Generative/AI capture often has
   no real percentage during the "thinking" phase. When `aria-valuenow` is absent, render an
   indeterminate animated gradient sweep (a tokenized `@keyframes` translating a
   `--cg-color-action-primary-background-default` highlight across
   `--cg-color-surface-container-background`) and set `aria-valuetext="Processing"`. This matches the
   restrained, continuous-motion feedback Linear/Vercel use for in-flight work and removes the
   "fake 100%" problem. Source: [Multi-Step & Generative UI — Vercel Academy](https://vercel.com/academy/ai-sdk/multi-step-and-generative-ui).

4. **Add a confirmation/summary affordance before the destructive "retry" and the final confirm (shadcn checkout flow).**
   v0-generated multi-step checkout flows surface a compact summary line ("file.png · 2.3 MB · ready")
   above the confirm button so the user commits with context. Add a small metadata row beneath the
   preview (filename, size, type) using `--cg-font-size-xs` + `--cg-color-input-text-placeholder`.
   On the error step, give the retry button a `--cg-color-ai-error-*` accent so the recovery path is
   visually distinct from the primary path. Source:
   [Vercel v0 Review 2025](https://trickle.so/blog/vercel-v0-review),
   [Multi Step Form template](https://www.shadcn.io/template/marcosfitzsimons-multi-step-form).

5. **Tighten density and use a pill progress bar with numeric readout (Linear aesthetic).**
   Linear/Vercel pair a thin **fully-rounded** bar with a right-aligned numeric percent label rather
   than a square bar with no readout. This also resolves the §6 `--cg-border-radius-25` flag: use
   `--cg-border-radius-full` for both the track and fill, and add a `tabular-nums`
   `--cg-font-size-xs` percent label aligned to the bar's end. Result is denser and more legible at
   a glance.

6. **Give buttons and the dropzone a real press state with optimistic feedback (HeroUI React Aria).**
   HeroUI v3's React Aria foundation models `:active`/pressed as a first-class state. Add a `:active`
   rule (`transform: scale(0.98)` + `filter: brightness(0.95)`, tokenized durations) to
   `.btn-primary` / `.btn-secondary` / `.upload-zone`, and pair the confirm action with an immediate
   optimistic transition into the processing step so the UI never feels "stuck" between click and
   network. Source: [HeroUI — NextUI's 2026 Upgrade](https://www.thesys.dev/blogs/heroui).
