## ai-timeline — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 34 | gap | `--cg-spacing-16` | Yes | — |
| 35 | padding | `--cg-spacing-16` | Yes | — |
| 38 | border-radius | `--cg-border-radius-100` | Yes | — |
| 39 | transition | `background --cg-transition-duration-fast --cg-transition-easing-default` | Yes | Explicit property, valid tokens |
| 40 | animation | `--cg-transition-duration-slow --cg-transition-easing-ease-out` | Yes | — |
| 41 | animation-delay | `calc(var(--step-index, 0) * 50ms)` | Yes | Positional index default allowed; 50ms is a keyframe/timing value |
| 43 | background (hover) | `--cg-overlay-dark-subtle` | Yes | Valid tier-1 overlay |
| 46 | transform | `translateX(calc(-1 * var(--cg-spacing-6)))` | Yes | — |
| 56 | width | `--cg-spacing-24` | Yes | — |
| 60-61 | width/height | `--cg-spacing-24` | Yes | — |
| 62 | border-radius | `--cg-border-radius-full` | Yes | — |
| 69-70 | svg width/height | `--cg-spacing-12` | Yes | — |
| 75 | width | `--cg-border-width-50` | Yes | — |
| 76 | background | `--cg-color-surface-base-divider` | Yes | — |
| 77 | min-height | `--cg-spacing-8` | Yes | — |
| 81 | background (complete line) | `--cg-color-status-success-text-default` | Yes | — |
| 83 | opacity | `0.25` | Yes | Unitless opacity allowed |
| 87 | background (pending dot) | `--cg-color-surface-cards-background` | Yes | — |
| 88 | border | `--cg-border-width-100 solid --cg-color-surface-cards-border` | Yes | — |
| 89 | color | `--cg-color-surface-container-outlined` | Yes | — |
| 92 | background (active dot) | `--cg-overlay-accent-strong` | Yes | — |
| 93 | border | `--cg-border-width-100 solid --cg-color-action-primary-background-default` | Yes | — |
| 94 | color | `--cg-color-action-primary-background-default` | Yes | — |
| 95 | box-shadow | `0 0 0 3px var(--cg-overlay-accent-strong)` | Partial | Spread `3px` is a raw magic px; color token valid (see §2) |
| 96 | animation | `ringPulse 2s ease-in-out infinite` | Partial | Bare `ease-in-out` instead of `--cg-transition-easing-ease-in-out`; `2s` is timing |
| 99 | background (complete dot) | `--cg-color-status-success-background-default` | Yes | — |
| 100 | border | `--cg-border-width-100 solid --cg-color-status-success-text-default` | Yes | — |
| 101 | color | `--cg-color-status-success-text-default` | Yes | — |
| 104 | animation | `--cg-transition-duration-slow --cg-transition-easing-ease-out` | Yes | — |
| 107 | background (error dot) | `--cg-color-status-error-background-default` | Yes | — |
| 108 | border | `--cg-border-width-100 solid --cg-color-status-error-text-default` | Yes | — |
| 109 | color | `--cg-color-status-error-text-default` | Yes | — |
| 113-114 | box-shadow keyframe | `0 0 0 3px` / `0 0 0 6px transparent` | Partial | Raw spread px in keyframe (low severity; keyframe geometry) |
| 126 | padding-top | `--cg-spacing-2` | Yes | — |
| 127 | padding-bottom | `--cg-spacing-12` | Yes | — |
| 134 | gap | `--cg-spacing-12` | Yes | — |
| 137 | font-size | `--cg-font-size-sm` | Yes | Body label at 14px min — compliant |
| 138 | font-weight | `--cg-font-weight-medium` | Yes | — |
| 139 | color | `--cg-color-surface-base-text` | Yes | — |
| 140 | line-height | `--cg-line-height-snug` | Yes | — |
| 143 | color (pending label) | `--cg-color-surface-container-outlined` | Yes | — |
| 147 | color (complete label) | `--cg-color-surface-container-outlined` | Yes | — |
| 150 | color (error label) | `--cg-color-status-error-text-default` | Yes | — |
| 153 | gradient stops | `--cg-color-surface-base-text` / `--cg-color-action-primary-background-default` | Yes | Gradient stops allowed |
| 158 | animation | `textSweep 1.8s --cg-transition-easing-default infinite` | Yes | — |
| 166 | font-size | `--cg-font-size-xs` | Yes | Mono metadata, not body copy (see §2) |
| 167 | color | `--cg-color-surface-container-outlined` | Yes | — |
| 168 | font-family | `--cg-font-family-mono` | Yes | — |
| 174 | height | `--cg-spacing-4` | Yes | — |
| 175 | border-radius | `--cg-border-radius-full` | Yes | — |
| 176 | background | `--cg-color-surface-cards-border` | Yes | — |
| 177 | margin-top | `--cg-spacing-8` | Yes | — |
| 183 | transition | `width --cg-transition-duration-slow --cg-transition-easing-default` | Yes | — |
| 185 | background/opacity | `--cg-color-status-success-text-default` / `0.6` | Yes | — |
| 186 | background | `--cg-color-action-primary-background-default` | Yes | — |
| 187 | background | `--cg-color-status-error-text-default` | Yes | — |
| 198 | gap | `--cg-spacing-16` | Yes | — |
| 199 | margin-top | `--cg-spacing-8` | Yes | — |
| 200 | font-size | `--cg-font-size-xs` | Yes | Mono metadata |
| 201 | font-family | `--cg-font-family-mono` | Yes | — |
| 202 | color | `--cg-color-surface-container-outlined` | Yes | — |
| 207 | gap | `--cg-spacing-4` | Yes | — |
| 209 | opacity | `0.6` | Yes | — |
| 214 | gap | `--cg-spacing-8` | Yes | — |
| 215 | margin-top | `--cg-spacing-8` | Yes | — |
| 219 | font-size | `--cg-font-size-xs` | Yes | Tag chip text |
| 220 | padding | `--cg-spacing-2 --cg-spacing-8` | Yes | — |
| 221 | border-radius | `--cg-border-radius-full` | Yes | — |
| 222 | background | `--cg-color-surface-cards-background` | Yes | — |
| 223 | color | `--cg-color-surface-container-outlined` | Yes | — |
| 224 | border | `--cg-border-width-50 solid --cg-color-surface-cards-border` | Yes | — |
| 225 | font-family | `--cg-font-family-mono` | Yes | — |
| 230 | margin-top | `--cg-spacing-12` | Yes | — |
| 231 | padding | `--cg-spacing-12 --cg-spacing-16` | Yes | — |
| 232 | background | `--cg-color-surface-base-background` | Yes | — |
| 233 | border | `--cg-border-width-50 solid --cg-color-surface-cards-border` | Yes | — |
| 234 | border-radius | `--cg-border-radius-100` | Yes | — |
| 235 | font-size | `--cg-font-size-xs` | Yes | Mono detail block |
| 236 | font-family | `--cg-font-family-mono` | Yes | — |
| 237 | color | `--cg-color-surface-container-outlined` | Yes | — |
| 238 | line-height | `--cg-line-height-relaxed` | Yes | — |
| 240 | max-height | `--cg-spacing-96` | Yes | — |
| 246 | margin-top | `--cg-spacing-8` | Yes | — |
| 249 | padding | `--cg-spacing-4 --cg-spacing-4` | Yes | — |
| 252-253 | width/height/svg | `--cg-spacing-16` / `--cg-spacing-8` | Yes | — |
| 254 | min-height | `--cg-spacing-4` | Yes | — |
| 255 | font-size | `--cg-font-size-xs` | Yes | Nested child label |
| 256 | width | `--cg-spacing-16` | Yes | — |
| 257 | padding-bottom | `--cg-spacing-2` | Yes | — |
| 260 | padding (compact) | `--cg-spacing-4 --cg-spacing-6` | Yes | — |
| 261-263 | width/height (compact) | `--cg-spacing-16` | Yes | — |
| 264 | font-size (compact) | `--cg-font-size-xs` | Yes | — |
| 273 | box-shadow (focus) | `inset 0 0 0 2px var(--cg-overlay-accent-strong)` | Partial | Raw `2px` spread + uses overlay token rather than `--cg-color-focus-ring` (see §4) |
| 278 | box-shadow (reduced motion) | `0 0 0 3px var(--cg-overlay-accent-strong)` | Partial | Raw spread px |

### 2. Styling Audit

- **Border radius:** Consistent and tokenized — `--cg-border-radius-100` for step/detail containers, `--cg-border-radius-full` for dots, duration bar/fill, and tool chips. No raw radii.
- **Spacing:** Fully tokenized on the `--cg-spacing-*` scale throughout. No magic spacing px.
- **Font-size accessibility:** The primary step label is `--cg-font-size-sm` (14px) — meets the body-text minimum. All `--cg-font-size-xs` (12px) usages are non-body: monospace metadata (duration, token counts, tool chips, detail block) and nested-child labels. These are secondary/dense affordances where xs is acceptable, but the nested child label at `--cg-font-size-xs` (line 255) is the closest to "body copy" and could be considered borderline; not flagged as a hard violation.
- **Translucent vs solid borders:** Borders use solid semantic tokens (`--cg-color-surface-cards-border`, status borders). Good. The connecting line on complete steps uses `opacity: 0.25` on a solid token rather than a translucent token — acceptable since it is a decorative connector, not a border.
- **Transitions explicit vs all:** No `transition: all`. Both transitions enumerate the property (`background`, `width`) with duration + easing tokens. Good. One animation (line 96 `ringPulse`) uses a bare `ease-in-out` keyword instead of `--cg-transition-easing-ease-in-out`.
- **Motion tokens:** Most animations use duration/easing tokens; raw timing values (`2s`, `1.8s`, `1.5s`, `50ms`) appear only as animation cycle durations/delays, which have no token equivalent and are acceptable.
- **Dark-theme suitability:** Uses semantic surface/status/action tokens and overlay tokens that resolve per-theme. Dark-first compliant. The text-sweep gradient and pulse ring use accent/action tokens that adapt to theme. Good.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.step` base + `.dot.pending` (outline circle, muted label) | None |
| Hover | Yes | `.step:hover { background: --cg-overlay-dark-subtle }` (line 43) | None |
| Active/Press | Partial | No `:active` press feedback on the clickable row. `.step.active` exists but is a *data* state (running step), not a press state | No pointer press affordance; design gap, not token violation |
| Focus-visible | Yes | `.step:focus-visible` inset box-shadow (line 271-274) | Uses `--cg-overlay-accent-strong` + raw `2px`; prefer `--cg-color-focus-ring`. `outline: none` is replaced by a visible shadow, so a11y is preserved |
| Disabled | N/A | Timeline steps are status-driven, not user-disable-able | Reasonable — no disabled concept |
| Loading | Yes | `.step.active` data state: pulsing ring (`ringPulse`), indeterminate duration fill, animated text sweep | Strong loading representation |
| Error | Yes | `.dot.error` + `.step.error .step-label` + error duration-fill (lines 106-110, 149-151, 187) | Uses status-error tokens; see §note on AI-error family |
| Success | Yes | `.dot.complete` + complete line + complete duration-fill (lines 98-105, 80-83, 185) | Uses status-success tokens |

Note on AI-state family: the timeline's `active`/`error`/`complete` map to agent execution lifecycle (running / failed / done). The convention offers a dedicated AI family (`--cg-color-ai-streaming-*`, `--cg-color-ai-error-*`, `--cg-color-ai-complete-*`). The component currently uses generic `status-success`/`status-error`/`action-primary` tokens. This is a *recommendation*, not a hard violation, because the active state is generic execution rather than a named AI lifecycle phase (thinking/streaming/reasoning). Switching error→`--cg-color-ai-error-*` and complete→`--cg-color-ai-complete-*` would better align with the AI-native family. Flagged here, not auto-fixed, to avoid changing the visual semantics without design sign-off.

### 4. Interaction Audit

- **Keyboard:** Each step has `tabindex="0"` and a `keydown` handler for Enter and Space (with `preventDefault`) that triggers expand/collapse (lines 339-341). Good. Nested child steps (lines 377-385) are *not* focusable/clickable — they are display-only, which is acceptable given they have no detail to expand.
- **ARIA roles/labels/states:** `role="list"` + `aria-label="Execution timeline"` on the container (line 335); `role="listitem"` on each step (line 337); `aria-current="step"` on the active step (line 338); decorative dots marked `aria-hidden="true"` (line 324). Solid coverage. Gap: the expandable step does not expose `aria-expanded` to convey expand/collapse state to assistive tech — a real a11y gap (not a token issue).
- **CustomEvents:** `ai-timeline-step-click` fired with `{ index, step }`, `bubbles: true, composed: true` (lines 311-314) — escapes shadow DOM correctly and detail shape matches the documented `@fires` JSDoc (line 6). Correct.
- **Touch targets:** Top-level step rows have `--cg-spacing-16` padding plus a 24px dot, yielding a tall hit area (~56px) — exceeds 44px. Compact mode (`--cg-spacing-4`/`--cg-spacing-6` padding, 16px dot) likely falls below 44px height, but enlarging it is a design change, not a token violation.

### 5. Visual Design Check

Modern and sleek. The execution timeline reads like a high-end agent trace UI: pulsing active ring, animated text-sweep on the running step label, indeterminate shimmer on the active duration bar, and a satisfying check-pop on completion. Radius is consistent (pill dots/chips, soft 100-radius containers). Breathing room is good via spacing-16 row padding and spacing-8 inter-element gaps. The connecting line + dot column is a clean vertical spine; complete-line tint at 0.25 opacity is a subtle, tasteful divider. Typography hierarchy is clear: medium 14px labels over muted mono metadata. Nested sub-steps are visually de-emphasized (smaller dots/labels, no animation). HeroUI/Vercel showcase-ready. One-word verdict: **strong**.

### 6. Fixes Needed

The component is highly compliant. All color, spacing, radius, font, and border values resolve to real, verified tokens. The remaining items are low-severity or design-level and are described rather than auto-applied:

1. **Line 96 — bare easing keyword.** Current: `animation: ringPulse 2s ease-in-out infinite;` → Fixed: `animation: ringPulse 2s var(--cg-transition-easing-ease-in-out) infinite;`. Why: motion easing should come from the motion-token scale, not a raw CSS keyword. (`--cg-transition-easing-ease-in-out` is in the tier-1 vocab.)

2. **Lines 95, 113, 114, 273, 278 — raw box-shadow spread px (`2px`/`3px`/`6px`).** No token exists for box-shadow spread radii in the vocab, so no token replacement is proposed. Flagged for awareness only; these are shadow geometry, not sizing of layout boxes.

3. **Focus ring token (line 273)** — uses `--cg-overlay-accent-strong`; the dedicated `--cg-color-focus-ring` token exists in the vocab and is the semantically correct choice for focus indication. Recommended but not auto-applied to avoid changing the established accent-ring visual without design review.

4. **AI-state color family (recommendation)** — map `complete`/`error` data states to `--cg-color-ai-complete-*` / `--cg-color-ai-error-*` for AI-native alignment. Described in §3; not a hard violation.

5. **`aria-expanded` (a11y gap, non-token)** — expandable step rows should expose `aria-expanded` reflecting `_expandedIndex`. Recommended.

The single concrete, token-verified fix is item 1 (the easing keyword).

### Research-backed enhancements

Patterns drawn from current (2025) timeline implementations: ReUI Timeline, Shadcn Timeline / Shadcn Studio blocks, Vercel AI SDK agent-UI primitives, and GitHub-style activity feeds.

1. **Collapsible nested traces instead of always-expanded children.** ReUI composes its timeline from shadcn `Collapsible` + `Spinner`, lazily revealing sub-steps under a node. This component already tracks `_expandedIndex` for the detail block, but nested child steps (lines 377-385) render statically. Wrap them in the same expand/collapse mechanism so a long agent run defaults to a dense spine and only fans out the active/selected branch — this also gives the missing `aria-expanded` (item 5) a natural home on a real disclosure control. (Source: ReUI Timeline; Shadcn Timeline.)

2. **Staggered entrance with `prefers-reduced-motion` short-circuit, driven by IntersectionObserver.** Modern shadcn/ReUI timelines use Framer-Motion "smooth entrance" where each node animates in on scroll-into-view, not on mount. The existing `calc(var(--step-index,0) * 50ms)` delay already stages nodes; gate it behind an IntersectionObserver so steps streaming in below the fold animate when revealed rather than all firing on first paint, and keep the reduced-motion branch (already present at line 278) as the no-animation fallback. (Source: Shadcn Timeline animated/interactive; ReUI entrance animations.)

3. **Live "streaming" affordance on the active node via a Spinner + relative timestamp.** Agent-trace UIs (Vercel AI SDK tool-call cards, ReUI pipeline status) pair a status indicator on the line with a live, relative timestamp ("running for 2.3s"). The active dot already pulses; add an auto-incrementing elapsed-time readout in the existing mono metadata slot (line 200) for running steps, and switch the active ring/text-sweep to the AI-native `--cg-color-ai-streaming-*` family per §3 so "thinking/streaming" reads distinctly from generic primary. (Source: Vercel AI SDK agent UI primitives; ReUI deployment-log/pipeline composition.)

4. **Per-node action affordances revealed on hover/focus.** ReUI nodes expose an "optional actions" slot beside content (copy, rerun, view payload). The step row currently only emits a click event; surface a small trailing action cluster (e.g. copy-output, expand-raw) that fades in on `:hover`/`:focus-visible` using the existing `--cg-overlay-dark-subtle` hover treatment, keeping the row calm at rest and dense on intent. (Source: ReUI Timeline content/actions anatomy; GitHub activity-feed node actions.)

5. **Density variants beyond binary compact.** Current code has default + `.compact`. Shadcn/ReUI ship multiple size variants; add a middle "comfortable" tier and ensure the compact tier's dot+row still clears the 44px touch target flagged in §4 (or restrict compact to non-interactive/read-only timelines). (Source: ReUI multiple size/color variants; Shadcn Studio timeline blocks.)

6. **Horizontal orientation option for short, milestone-style sequences.** ReUI explicitly supports vertical *or* horizontal node-on-line layouts; a roadmap/milestone use of this component (4-6 steps) reads better horizontally. Expose an `orientation` attribute reusing the same dot/connector/duration-fill tokens rotated 90deg. (Source: ReUI composable vertical/horizontal line.)

Sources: [ReUI Timeline](https://reui.io/components/timeline), [Shadcn Timeline (Shadcn Studio)](https://shadcnstudio.com/blocks/marketing-ui/timeline-component), [Animated Interactive Shadcn Timeline](https://next.jqueryscript.net/shadcn-ui/animated-interactive-timeline/), [Shadcn AI-native component library](https://www.shadcn.io/), [Vercel Academy — Anatomy of shadcn/ui](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components).
