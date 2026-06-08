## ai-data-lineage — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 37 | `.container` background | `--cg-color-surface-cards-background` | Yes | — |
| 38 | `.container` border-width | `--cg-border-width-50` | Yes | — |
| 38 | `.container` border-color | `--cg-color-surface-cards-border` | Yes | — |
| 39 | `.container` border-radius | `--cg-border-radius-200` | Yes | — |
| 40 | `.container` padding | `--cg-spacing-20` | Yes | — |
| 41 | `.container` overflow-x | `auto` | Yes (keyword) | — |
| 47 | `.flow` min-width | `min-content` | Yes (keyword) | — |
| 63 | `.node` gap | `--cg-spacing-4` | Yes | — |
| 64 | `.node` padding | `--cg-spacing-12 --cg-spacing-16` | Yes | — |
| 65 | `.node` background | `--cg-color-surface-container-background` | Yes | — |
| 66 | `.node` border | `--cg-border-width-50` / `--cg-color-surface-cards-border` | Yes | — |
| 67 | `.node` border-radius | `--cg-border-radius-100` | Yes | — |
| 70 | `.node` color | `--cg-color-surface-base-text` | Yes | — |
| 71 | `.node` min-width | `--cg-spacing-80` | Yes | — |
| 75-76 | `.node` transition | `--cg-transition-duration-fast` / `--cg-transition-easing-default` | Yes (explicit props, not `all`) | — |
| 79 | `.node:hover` border-color | `--cg-color-input-border-hover` | Yes | — |
| 83-85 | `.node:focus-visible` box-shadow | `0 0 0 2px` / `0 0 0 4px` + `--cg-color-surface-base-background` / `--cg-color-focus-ring` | Yes — established dual focus-ring idiom (matches `focusRingDual`); tokens are real | — (consider importing `focusRingDual`) |
| 88 | `.node.on-path` border-color | `--cg-color-surface-base-text` | Yes | — |
| 89 | `.node.on-path` background | `--cg-overlay-dark-subtle` | Yes (tier-1 overlay, valid) | — |
| 93 | `.node-label` font-size | `--cg-font-size-xs` | **No** | Primary node text below 14px → `--cg-font-size-sm` |
| 94 | `.node-label` font-weight | `--cg-font-weight-semibold` | Yes | — |
| 98 | `.node-type` font-size | `--cg-font-size-xs` | Borderline | Secondary metadata; acceptable but see flag |
| 99 | `.node-type` color | `--cg-color-input-text-placeholder` | Yes (semantic muted) | — |
| 104-105 | `.status-dot` width/height | `--cg-spacing-6` | Yes | — |
| 106 | `.status-dot` border-radius | `--cg-border-radius-full` | Yes | — |
| 108-109 | `.status-dot` top/right | `--cg-spacing-6` | Yes | — |
| 111 | `.status-dot.active` background | `--cg-color-surface-base-text` | Weak | AI lifecycle state shown with generic text color — see flag (AI-state family) |
| 112 | `.status-dot.complete` background | `--cg-color-input-text-placeholder` | Weak | "complete" status → `--cg-color-ai-complete-text` |
| 113 | `.status-dot.error` background | `--cg-color-status-error-text-default` | Acceptable | Could use `--cg-color-ai-error-text` for AI-family consistency — see flag |
| 118 | `.arrow` color | `--cg-color-surface-cards-border` | Yes | — |
| 120 | `.arrow` padding | `0 --cg-spacing-2` | Yes | — |
| 122 | `.arrow.on-path` color | `--cg-color-surface-base-text` | Yes | — |
| 123 | `.flow.vertical .arrow` padding | `--cg-spacing-2 0` | Yes | — |
| 127 | `.empty` padding | `--cg-spacing-32` | Yes | — |
| 128 | `.empty` color | `--cg-color-input-text-placeholder` | Yes | — |
| 129 | `.empty` font-size | `--cg-font-size-sm` | Yes (≥14px) | — |
| 132 | `:host([rounded=none])` border-radius | `0` | Yes (keyword 0) | — |
| 133 | `:host([rounded=sm])` border-radius | `--cg-border-radius-50` | Yes | — |
| 134 | `:host([rounded=md])` border-radius | `--cg-border-radius-100` | Yes | — |
| 135 | `:host([rounded=lg])` border-radius | `--cg-border-radius-200` | Yes | — |
| 200-201 | SVG arrow geometry | `width/height/viewBox/stroke-width` unitless | Yes (SVG geometry, exempt) | — |

### 2. Styling Audit

- **Border radius:** Fully tokenized; tier-1 `--cg-border-radius-*` used with a clean `rounded` variant ladder (none/sm/md/lg). Consistent and correct. No tier-3 component radius token exists for this component (none in vocab), so tier-1 is the right fallback.
- **Spacing:** Every padding/gap/margin/offset comes from the `--cg-spacing-*` scale. No magic numbers.
- **Font-size accessibility:** `.node-label` (line 93) is the primary, load-bearing node text rendered at `--cg-font-size-xs` (<14px) — below the 14px body-text floor. Should be `--cg-font-size-sm`. `.node-type` (line 98) is secondary metadata at xs; defensible but worth bumping for parity. `.empty` correctly uses `sm`.
- **Translucent vs solid borders:** Borders use solid semantic surface-card tokens; the `on-path` highlight uses a translucent `--cg-overlay-dark-subtle` fill for emphasis — appropriate, dark-first-friendly.
- **Transitions:** Explicit property list (`border-color`, `background`) with tokenized duration + easing. No `transition: all`. Compliant. Honors reduced-motion via the imported `reducedMotion` style.
- **Dark-theme suitability:** Monochrome surface/text tokens + overlay highlight read well dark-first. Status dot for `active`/`complete` is monochrome (intentional minimal aesthetic) but loses semantic color signal — see States/Fixes.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.node` base surface + border | None |
| Hover | Yes | `.node:hover` border-color `--cg-color-input-border-hover` | None |
| Active/Press | No | — | No `:active` press affordance. Minimal aesthetic; low severity. The data `status='active'` dot is unrelated to press state |
| Focus-visible | Yes | `.node:focus-visible` dual ring (lines 81-86) | Correct, real tokens; could reuse shared `focusRingDual` |
| Disabled | N/A | — | Nodes are always interactive; no disabled concept in the data model |
| Loading | N/A | — | Component renders static provenance; no async loading state |
| Error | Yes (data) | `.status-dot.error` uses `--cg-color-status-error-text-default` | Works; AI-family `--cg-color-ai-error-text` would be more on-brand |
| Success | Yes (data) | `.status-dot.complete` uses `--cg-color-input-text-placeholder` | "complete" is an AI lifecycle success state but rendered as muted grey — recommend `--cg-color-ai-complete-text` |
| Empty | Yes | `.empty` "No lineage data" block | Good — `role=group` present, sm font, muted color |

### 4. Interaction Audit

- **Keyboard:** Nodes are native `<button>` elements (line 214) → focusable, Enter/Space activate `@click`. Tab order follows topological render order. Good. No arrow-key roving between nodes, but native button tabbing is acceptable for a flow diagram.
- **ARIA:** Container has `role="group"` + `aria-label="Data lineage"` (line 204). Each node button has `aria-label="${label} (${type})"` (line 216) exposing label + type. Status dot is decorative-only and not announced — the status is not surfaced to AT (minor gap; could add `aria-label` reflecting status). Arrows are decorative SVG with no role — correct.
- **CustomEvents:** `ai-lineage-node-click` dispatched with `detail: { id, label, type }`, `bubbles: true, composed: true` (lines 163-166). Matches the `@fires` JSDoc. Detail shape correct and complete.
- **Touch targets:** Node buttons are padded (`--cg-spacing-12`/`--cg-spacing-16`) with `min-width: --cg-spacing-80`; height is content-driven (~2 lines + padding) so likely ≥44px in practice but not guaranteed by a min-height token. Enlargement is a design change, not a token fix — flagged here, not in fixes.

### 5. Visual Design Check

Clean, restrained monochrome provenance flow — strong editorial minimalism that fits a dark-first AI surface. Radius is tokenized and variant-driven; breathing room from spacing tokens is adequate; the overlay highlight for the active upstream path is an elegant touch. Typography hierarchy is the weak point: label and type are the same `xs` size, and `xs` is below the body-text floor, so the primary node label reads small and the label/type distinction leans entirely on weight + color. The status dot being monochrome for active/complete trades semantic clarity for aesthetic uniformity. Bumping the label to `sm` and giving AI states their semantic colors would make it genuinely showcase-ready. Verdict: **adequate**.

### 6. Fixes Needed

1. **Line 93** — `.node-label` font-size. Current: `font-size: var(--cg-font-size-xs);` → Fixed: `font-size: var(--cg-font-size-sm);`. Why: the node label is the primary, load-bearing readable text of each node; `xs` is below the 14px (`--cg-font-size-sm`) body-text accessibility floor.

2. **Line 112** — `.status-dot.complete` background. Current: `.status-dot.complete { background: var(--cg-color-input-text-placeholder); }` → Fixed: `.status-dot.complete { background: var(--cg-color-ai-complete-text); }`. Why: "complete" is an AI-lifecycle success state and should use the dedicated AI-state semantic token rather than a generic input-placeholder grey, restoring the success signal.

**Flags (not auto-applied — design/judgment calls):**

- **Line 111** — `.status-dot.active` uses `--cg-color-surface-base-text`. "active" maps to an in-progress AI lifecycle state; consider `--cg-color-ai-streaming-text` or `--cg-color-ai-thinking-text` for semantic color. Left out of the fixes array because the intended mapping (streaming vs thinking) is ambiguous and the current monochrome choice may be deliberate.
- **Line 113** — `.status-dot.error` uses `--cg-color-status-error-text-default`. Valid, but `--cg-color-ai-error-text` would align with the AI-state family for consistency with the `complete` fix above.
- **Line 98** — `.node-type` at `--cg-font-size-xs`. Secondary metadata; acceptable, but bumping to `sm` would improve legibility and pair with the label fix.
- **Lines 83-86** — focus ring is hand-rolled; the identical `focusRingDual` shared style already exists in `styles/focus.css.ts`. Refactor opportunity (reuse), not a token violation; tokens used are all valid.
- **Touch target** — node buttons have no `min-height` guaranteeing ≥44px. Consider a min-height; this is a sizing/design change, not a token violation.

### Research-backed enhancements

Modern node-flow/lineage UIs (React Flow UI — built on shadcn/ui; Dagster's asset graph; Vercel Geist) have converged on a few patterns this component is missing. Concrete, component-specific suggestions:

1. **Path-trace hover, not just `.on-path` static class.** React Flow UI's "node tracing" pattern dims the entire graph except the hovered node's upstream/downstream chain on hover/focus, restoring full opacity on blur. This component already computes `on-path` but only paints it statically. Add a hover/focus-driven trace: on `.node:hover`/`:focus-visible`, set non-path nodes + arrows to a reduced-opacity token (e.g. `--cg-opacity-disabled` / an overlay) and keep the active chain at full opacity. This turns the existing path logic into an interaction affordance with near-zero new structure. (Pattern source: React Flow UI / reactflow.dev node-tracing + Dagster asset-graph "show upstream/downstream".)

2. **Animated directional edges.** Linear, Vercel Geist, and React Flow all signal flow direction with a subtle animated dash or gradient travelling along the edge rather than a static line. Replace the static SVG arrow stroke with a `stroke-dasharray` + `stroke-dashoffset` keyframe animation (tokenized duration `--cg-transition-duration-*`) on `.arrow.on-path` only, gated behind the already-imported `reducedMotion` guard. Communicates data-flow direction at a glance without adding nodes. (Pattern source: React Flow animated edges; Vercel Geist motion language.)

3. **Status as a pill/badge with text, not a 6px monochrome dot.** Dagster and shadcn-based lineage UIs render asset status as a small colored badge with a label (Active / Complete / Error), not a bare dot — which fixes both the a11y gap (status currently not announced) and the monochrome-loses-signal problem flagged in §2/§3. Pair this directly with the `--cg-color-ai-complete-text` / `--cg-color-ai-error-text` fixes already in §6 so the badge carries semantic color + accessible text. (Pattern source: Dagster asset status badges; shadcn/ui Badge.)

4. **Density / "fit to view" + overflow affordance.** The container is `overflow-x: auto` with no signal that content extends beyond the viewport. Modern graph canvases (React Flow's viewport controls, Linear's horizontal scrollers) add an edge fade-mask (`mask-image` linear-gradient on the scroll container) so users perceive there's more lineage off-screen, plus an optional compact density mode (`:host([density=compact])` reducing `.node` padding from `--cg-spacing-12/16` to `--cg-spacing-8/12`) for long chains. Both are pure CSS/token additions, no new markup. (Pattern source: React Flow viewport/minimap controls; Linear horizontal scroll fade.)

5. **Selected/expanded node state with inline metadata.** Currently a node click only fires `ai-lineage-node-click` and styles nothing. Dagster's drill-down pattern marks the clicked node as selected (persistent ring distinct from `:focus-visible`) and reveals inline metadata (type, status, timestamp). Add a `.node[aria-pressed="true"]` / `.node.selected` visual state reusing the dual focus-ring tokens at a lower intensity, and optionally an expandable metadata row. This gives the click a visible result and fills the missing "active/press" state from §3. (Pattern source: Dagster node drill-down; React Flow controlled selection.)

Sources: [React Flow UI](https://reactflow.dev/ui), [React Flow examples (animated edges, tracing)](https://reactflow.dev/examples), [Dagster — Data Lineage in 2025](https://dagster.io/learn/data-lineage), [Vercel Geist design system](https://vercel.com/geist/introduction), [shadcn/ui charts & components](https://ui.shadcn.com/charts/area).
