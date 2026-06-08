## ai-workflow-builder — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 39 | animation duration | `--cg-transition-duration-fast` | Yes | — |
| 39 | animation easing | `--cg-transition-easing-default` | Yes | — |
| 43 | background | `--cg-color-surface-cards-background` | Yes | — |
| 44 | border-width | `--cg-border-width-50` | Yes | — |
| 44 | border-color | `--cg-color-surface-cards-border` | Yes | — |
| 45 | border-radius | `--cg-border-radius-150` | Yes | — |
| 45 | padding | `--cg-spacing-16` | Yes | — |
| 48 | margin-bottom | `--cg-spacing-16` | Yes | — |
| 49 | font-size | `--cg-font-size-sm` | Yes | — |
| 49 | font-weight | `--cg-font-weight-bold` | Yes | — |
| 49 | color | `--cg-color-surface-base-text` | Yes | — |
| 50 | font-size | `--cg-font-size-xs` | Yes (meta, not body) | — |
| 50 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 52 | gap | `0` | Yes (literal) | — |
| 56 | width | `--cg-spacing-2` | Yes | — |
| 56 | height | `--cg-spacing-20` | Yes | — |
| 56 | background | `--cg-color-surface-cards-border` | Yes | — |
| 57 | background (.active) | `--cg-color-action-primary-background-default` | Yes | — |
| 60 | gap | `--cg-spacing-8` | Yes | — |
| 61 | padding | `--cg-spacing-8` / `--cg-spacing-16` | Yes | — |
| 61 | border-radius | `--cg-border-radius-100` | Yes | — |
| 62 | border-width | `--cg-border-width-50` | Yes | — |
| 62 | border-color | `--cg-color-surface-cards-border` | Yes | — |
| 63 | background | `--cg-color-surface-base-background` | Yes | — |
| 64 | min-width | `--cg-spacing-96` | Yes | — |
| 64 | transition | explicit (border-color, background) + fast + default | Yes | — |
| 66 | border-color (hover) | `--cg-color-input-border-hover` | Yes | — |
| 67 | box-shadow spread | `--cg-spacing-2` | Yes | — |
| 67 | box-shadow color | `--cg-overlay-accent-strong` | Tier-1 overlay used as focus ring | Prefer `--cg-color-focus-ring` |
| 67 | outline-offset | `--cg-outline-offset-default` | Yes | — |
| 68 | transform scale (active) | `--cg-interaction-press-scale` | Yes | — |
| 69 | border-color (.active) | `--cg-color-surface-base-text` | Yes | — |
| 69 | background (.active) | `--cg-overlay-accent-subtle` | Yes | — |
| 70 | border-color (.complete) | `--cg-color-status-success-text-default` | Yes | — |
| 71 | border-color (.error) | `--cg-color-status-error-text-default` | Yes | — |
| 72 | opacity (.skipped) | `0.5` | Yes (literal opacity) | — |
| 75 | width/height | `--cg-spacing-24` | Yes | — |
| 75 | border-radius | `--cg-border-radius-100` | Yes | — |
| 77 | font-size | `--cg-font-size-xs` | Yes (icon) | — |
| 79 | bg/color (start) | `--cg-color-status-success-background/text-default` | Yes | — |
| 80 | bg (agent) | `--cg-overlay-accent-light` | Yes | — |
| 80 | color (agent) | `--cg-color-surface-base-text` | Yes | — |
| 81 | bg/color (tool) | `--cg-color-status-info-background/text-default` | Yes | — |
| 82 | bg/color (condition) | `--cg-color-status-warning-background/text-default` | Yes | — |
| 83 | bg | `--cg-color-surface-container-background` | Yes | — |
| 83 | color (end) | `--cg-color-input-text-placeholder` | Yes | — |
| 86 | font-size | `--cg-font-size-sm` | Yes | — |
| 86 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 86 | color | `--cg-color-surface-base-text` | Yes | — |
| 87 | font-size | `--cg-font-size-xs` | Yes (desc, secondary) | — |
| 87 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 87 | margin-top | `--cg-spacing-2` | Yes | — |
| 88 | font-size | `--cg-font-size-xs` | Yes (eyebrow label) | — |
| 88 | font-weight | `--cg-font-weight-bold` | Yes | — |
| 88 | letter-spacing | `--cg-letter-spacing-wider` | Yes | — |
| 88 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 90 | font-size | `--cg-font-size-xs` | Yes (status icon) | — |
| 92 | gap (branch) | `--cg-spacing-16` | Yes | — |
| 93 | width (branch-line) | `--cg-spacing-1` | Yes | — |
| 93 | background | `--cg-color-surface-cards-border` | Yes | — |
| 95 | padding (empty) | `--cg-spacing-32` | Yes | — |
| 95 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 95 | font-size | `--cg-font-size-sm` | Yes | — |
| 98 | border-radius (none) | `0` | Yes (literal) | — |
| 99 | border-radius (sm) | `--cg-border-radius-50` | Yes | — |
| 100 | border-radius (md) | `--cg-border-radius-100` | Yes | — |
| 101 | border-radius (lg) | `--cg-border-radius-150` | Yes | — |
| 102 | border-radius (full) | `--cg-border-radius-full` | Yes | — |

### 2. Styling Audit
- **Border radius:** Consistent tier-1 radius tokens (`--cg-border-radius-50/100/150/full`); `rounded` variants are fully tokenized and the `none` case uses literal `0` (acceptable).
- **Spacing:** All padding/gap/margin from the `--cg-spacing-*` scale; connectors use `--cg-spacing-1/2` for hairlines and `--cg-spacing-20` for length. No magic numbers.
- **Font-size accessibility:** Body-level text (title, step-label, empty state) uses `--cg-font-size-sm` (14px floor) — compliant. The `xs` sizes are confined to meta/eyebrow/secondary text (step-count, step-type, step-desc, icons), which is acceptable; step-desc at `xs` is borderline but is supporting copy.
- **Borders:** Translucent borders use semantic `--cg-color-surface-cards-border`; status borders use solid `--cg-color-status-*-text-default`. Consistent.
- **Transitions:** Explicit property list on `.step` (border-color, background) with motion tokens — no `transition: all`. `reducedMotion` style is imported. Good.
- **Dark-theme suitability:** All colors resolve through tier-2 semantic surfaces/status tokens; dark-first compatible.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.step` base styling, `pending` fallback class | — |
| Hover | Yes | `.step:hover` border-color shift | — |
| Active/Press | Yes | `.step:active` transform scale (press) + `.step.active` selected state | — |
| Focus-visible | Yes | `.step:focus-visible` box-shadow ring + outline-offset | Uses tier-1 overlay for ring; prefer `--cg-color-focus-ring` |
| Disabled | N/A | Steps are not individually disableable; `skipped` covers the inert case via opacity 0.5 | — |
| Loading | N/A | Component renders static DAG; loading is represented by `pending`/`active` step status, not a component-level loading state | — |
| Error | Yes | `.step.error` border-color + error status icon | — |
| Success | Yes | `.step.complete` border-color + check status icon | — |

### 4. Interaction Audit
- **Keyboard:** Roving-tabindex toolbar pattern. Arrow keys (Up/Down/Left/Right) move active step with wraparound, Home/End jump to ends, Enter/Space activate. `preventDefault()` called on all handled keys. Focus moved via `_shouldFocusActive` flag in `updated()`. Solid.
- **ARIA:** Container `role="figure"` + `aria-label`; flow `role="toolbar"` with `aria-label`, `aria-orientation="vertical"`. Each step `role="button"`, `aria-label` from step label, `aria-current="step"` when active. Decorative icons `aria-hidden="true"`. Comprehensive.
- **CustomEvents:** `ai-workflow-step-click` fires with `bubbles: true, composed: true` and detail `{ id, label, type, status }` — matches the documented `@fires` JSDoc. Correct.
- **Touch targets:** `.step` padding is `--cg-spacing-8` (vertical) — roughly 8px top/bottom around a 24px icon yields ~40px height, slightly under the 44px target. This is a sizing/design consideration (not a token violation); consider increasing vertical padding to reach 44px. Width is comfortable (`min-width: --cg-spacing-96`).

### 5. Visual Design Check
Modern and clean: tokenized vertical DAG with type-colored step icons, connecting lines that highlight on active/complete, an eyebrow type label + bold step label + secondary description hierarchy, and rounded-variant support. Good breathing room (16px container padding, 8px internal gap). Typography hierarchy is clear (bold title / semibold label / muted desc / uppercase eyebrow). Status communicated by both border color and a status icon (not color-alone). Showcase-ready for a HeroUI/Vercel-style gallery. One-word verdict: **strong**.

### 6. Fixes Needed
1. **Line 67** — focus ring color should use the semantic focus token instead of a tier-1 overlay.
   - Current: `box-shadow: 0 0 0 var(--cg-spacing-2) var(--cg-overlay-accent-strong);`
   - Fixed: `box-shadow: 0 0 0 var(--cg-spacing-2) var(--cg-color-focus-ring);`
   - Why: `--cg-overlay-accent-strong` is a tier-1 overlay primitive; a dedicated tier-2 semantic focus-ring token (`--cg-color-focus-ring`) exists and is the correct layer for focus indicators, keeping the ring color governed by the semantic layer.

Note (not a token fix): vertical padding (`--cg-spacing-8`) makes step height ~40px, under the 44px touch-target minimum — a sizing/design change to evaluate separately.

### Research-backed enhancements

The current component renders a *read-only vertical DAG* — a status timeline, not an editor. Measured against 2025-era node-canvas builders (Vercel Workflow Builder, React Flow UI editor, nobruf/shadcn-next-workflows), the highest-leverage modernizations are:

1. **Connector edges should carry state, not just steps.** In React Flow UI the *edge* is a first-class affordance: it animates a flowing dash while the upstream node is executing and turns solid/colored on completion. Right now `.branch-line` / connector is a static `--cg-color-surface-cards-border` hairline. Add an `.active`/`.complete` edge variant — an animated dashed stroke (mask + `background-position` keyframe, gated behind `prefers-reduced-motion` which is already imported) flowing from the active step toward the next pending one. This makes the "where is execution now" answer readable at a glance instead of inferring it from icons. (Source: [React Flow — Workflow Editor template](https://reactflow.dev/ui/templates/workflow-editor))

2. **Add a per-step "running" pulse distinct from `active`/`pending`.** §3 correctly notes there is no component-level loading state and that `active`/`pending` stand in for it. Vercel's builder visually separates *selected* from *executing*: a node under execution gets a subtle perimeter shimmer/pulse. Today `.active` conflates "user-selected/current" with "in-flight." Introduce a `running` status that drives a low-amplitude box-shadow pulse on the `--cg-spacing-24` status icon (reuse `--cg-color-action-primary-*`), keeping `active` purely for selection. (Source: [Vercel Workflow Builder template](https://vercel.com/templates/next.js/workflow-builder))

3. **Hover-reveal an inline node action affordance.** shadcn-next-workflows and the React Flow editor surface node controls (run-from-here, retry, inspect) on hover rather than always-on, preserving density. Add an absolutely-positioned action slot at the trailing edge of `.step` that fades in on `:hover`/`:focus-within` (opacity + `--cg-transition-duration-fast`). This adds the "do something to this step" affordance the current button-role steps lack, without inflating the resting layout. (Source: [nobruf/shadcn-next-workflows](https://github.com/nobruf/shadcn-next-workflows))

4. **Raise step density and hit area together.** §4 flags the ~40px step height as under the 44px target. shadcn/ui's design-token-first blocks treat the row as a fixed comfortable rhythm. Promote step sizing to a tier-3 token (`--cg-component-workflow-step-min-height: 44px` via the spacing scale) rather than relying on padding math — this fixes the touch-target gap *and* makes density themeable, matching shadcn's token-governed block approach. (Source: [shadcn/ui design-system tokens, Vercel design-systems blog](https://vercel.com/blog/ai-powered-prototyping-with-design-systems))

5. **Add a `disabled`/`unreachable` step treatment.** §3 marks Disabled as N/A, but real builders (all three references) render branches that can't execute given current conditions as dimmed-with-reason. The existing `skipped` opacity-0.5 pattern can be generalized into an `unreachable` state with a `cursor: not-allowed` and an `aria-disabled="true"` on the step button, so conditional branches that won't run read as intentionally inert rather than just faint. (Source: [shadcn-next-workflows node validation](https://github.com/nobruf/shadcn-next-workflows))

6. **Optional minimap / scroll-position cue for long flows.** React Flow editors ship a minimap because vertical DAGs lose their "you are here" context past ~6 nodes. A lightweight, tokenized scroll-progress rail (reuse the existing `--cg-spacing-2` connector width and `--cg-color-action-primary-background-default` active fill) pinned beside the flow gives orientation in tall workflows without adopting a full pan/zoom canvas. (Source: [React Flow Workflow Editor template](https://reactflow.dev/ui/templates/workflow-editor))
