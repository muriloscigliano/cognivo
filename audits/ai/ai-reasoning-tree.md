## ai-reasoning-tree — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 27 | `border-left` width | `--cg-border-width-100` | Yes | — |
| 27 | `border-left` color | `--cg-color-surface-cards-border` | Yes (tier-2) | — |
| 28 | `padding-left` | `--cg-spacing-20` | Yes | — |
| 33 | `border-left` | `none` | OK (keyword) | — |
| 34 | `padding-left` | `0` | OK (keyword) | — |
| 35 | `background` | `--cg-color-surface-cards-background` | Yes (tier-2) | — |
| 36 | `border` width | `--cg-border-width-50` | Yes | — |
| 36 | `border` color | `--cg-color-surface-cards-border` | Yes | — |
| 37 | `border-radius` | `--cg-component-card-radius` | Yes (tier-3) | — |
| 38 | `padding` | `--cg-spacing-12` | Yes | — |
| 41 | `padding` | `--cg-spacing-12` / `--cg-spacing-16` | Yes | — |
| 44 | `padding` | `0` / `--cg-spacing-16` / `--cg-spacing-16` | Yes | — |
| 51 | `gap` | `--cg-spacing-12` | Yes | — |
| 52 | `padding` | `--cg-spacing-8` / `0` | Yes | — |
| 54 | `background` | `none` | OK (keyword) | — |
| 55 | `border` | `none` | OK (keyword) | — |
| 56 | `font` | `inherit` | OK (keyword) | — |
| 57 | `color` | `--cg-color-surface-container-outlined` | **No** | Semantic misuse: a container *outline/border* token used as toggle **text** color. This is the AI reasoning label ("Thinking"); should use AI-lifecycle text token `--cg-color-ai-reasoning-text`. |
| 58 | `font-size` | `--cg-font-size-sm` | Yes (14px min OK) | — |
| 59 | `font-weight` | `--cg-font-weight-medium` | Yes | — |
| 60 | `width` | `100%` | OK (%) | — |
| 63 | hover `color` | `--cg-color-surface-base-text` | Yes (tier-2) | — |
| 66 | `border-radius` | `--cg-border-radius-50` | Yes | — |
| 67 | `box-shadow` ring | `0 0 0 3px var(--cg-overlay-accent-strong)` | **No** | Bare magic `3px` spread; non-standard focus mechanism. Prefer `outline` + dedicated `--cg-color-focus-ring` (see Fixes). |
| 71 | `width` | `--cg-spacing-12` | Yes (icon sized via spacing — acceptable) | — |
| 72 | `height` | `--cg-spacing-12` | Yes | — |
| 73 | `transition` | `transform` + `--cg-transition-duration-fast` + `--cg-transition-easing-default` | Yes (explicit) | — |
| 76 | `opacity` | `0.5` | OK (unitless) | — |
| 77 | `transform` | `rotate(90deg)` | OK | — |
| 80 | `font-size` | `--cg-font-size-xs` | Yes (count meta, not body) | — |
| 82 | `opacity` | `0.5` | OK | — |
| 89 | `padding` | `--cg-spacing-6` / `0` / `--cg-spacing-12` | Yes | — |
| 95 | `gap` | `--cg-spacing-12` | Yes | — |
| 96 | `padding` | `--cg-spacing-12` / `--cg-spacing-12` | Yes | — |
| 97 | `font-size` | `--cg-font-size-sm` | Yes (14px min OK) | — |
| 98 | `color` | `--cg-color-surface-base-text` | Yes (tier-2) | — |
| 99 | `line-height` | `--cg-line-height-relaxed` | Yes | — |
| 100 | `border-radius` | `--cg-border-radius-50` | Yes | — |
| 102 | `opacity` | `0.8` | OK | — |
| 104 | hover `background` | `--cg-overlay-dark-subtle` | Yes (tier-1 overlay — allowed) | — |
| 107 | `width` | `--cg-spacing-6` | Yes | — |
| 108 | `height` | `--cg-spacing-6` | Yes | — |
| 109 | `border-radius` | `--cg-border-radius-full` | Yes | — |
| 111 | `margin-top` | `--cg-spacing-6` | Yes | — |
| 113 | dot.thought `background` | `--cg-color-action-primary-background-default` | Yes (tier-2, categorical) | — |
| 114 | dot.action `background` | `--cg-color-status-info-text-default` | Yes (tier-2, categorical) | — |
| 115 | dot.observation `background` | `--cg-color-status-warning-text-default` | Yes (tier-2, categorical) | — |
| 116 | dot.conclusion `background` | `--cg-color-status-success-text-default` | Yes (tier-2, categorical) | — |
| 113-116 | dot `opacity` | `0.7` | OK | — |
| 121 | `font-size` | `--cg-font-size-xs` | Yes (confidence meta) | — |
| 122 | `font-family` | `--cg-font-family-mono` | Yes | — |
| 124 | `opacity` | `0.4` | OK | — |
| 127 | `padding-left` | `--cg-spacing-20` | Yes | — |
| 129 | highlighted `background` | `--cg-overlay-accent-subtle` | Yes (tier-1 overlay — allowed) | — |
| 132 | `transition` | `none` | OK (reduced-motion) | — |

### 2. Styling Audit

- **Border radius:** Card uses tier-3 `--cg-component-card-radius`; toggle focus and steps use `--cg-border-radius-50`; dot uses `--cg-border-radius-full`. All tokenized and consistent.
- **Spacing:** Entirely on the spacing scale (`--cg-spacing-6/8/12/16/20`). No magic spacing. Good rhythm.
- **Font-size accessibility:** Body text (`.toggle` line 58, `.step` line 97) uses `--cg-font-size-sm` (14px) — meets the 14px minimum. The `--cg-font-size-xs` usages (toggle-count line 80, confidence line 121) are metadata/labels, acceptable.
- **Translucent vs solid borders:** Borders use solid semantic `--cg-color-surface-cards-border`. Hover/highlight use translucent overlay tokens (`--cg-overlay-dark-subtle`, `--cg-overlay-accent-subtle`) — appropriate for subtle state layering.
- **Transitions:** Explicit property (`transform`) with duration + easing tokens. No `transition: all`. Reduced-motion handled both via the imported `reducedMotion` style and an inline `@media` block (line 131) — minor redundancy but harmless.
- **Dark-theme suitability:** Dark-first semantic tokens throughout; overlay-based hover states adapt to theme. Suitable.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.reasoning` / `.toggle` / `.step` base styles | — |
| Hover | Yes | `.toggle:hover` (line 63), `.step:hover` (line 104) | Step rows show hover affordance but emit no actionable behavior beyond click; acceptable. |
| Active/Press | No | — | N/A for toggle button — no pressed visual; minor polish gap, not required. |
| Focus-visible | Partial | `.toggle:focus-visible` (line 64-68) via `box-shadow` ring | Uses `outline: none` + custom 3px box-shadow instead of the dedicated `--cg-color-focus-ring` token; step rows (clickable, line 150-151) have **no** focus-visible style and are not keyboard-focusable (see Interaction). |
| Disabled | No | — | N/A — component has no disabled mode. |
| Loading | No | — | N/A — content is provided fully via `nodes`; no async loading state. (Note: this is an AI *reasoning* surface; a streaming/loading affordance could be a future enhancement but is not a token defect.) |
| Error | No | — | N/A — no error surface in this component. |
| Success | No | — | N/A — `conclusion` node type is the closest analog and is styled via dot color. |

### 4. Interaction Audit

- **Keyboard:** The toggle is a real `<button>` (line 166) — natively Enter/Space activatable and focusable. Good.
- **Step rows are `<div>` with `@click`** (line 150-151) — **not keyboard accessible**: no `tabindex`, no `role="button"`, no key handler. Keyboard users cannot fire `ai-reasoning-node-click`. This is an a11y gap (P1) — flagged in report (structural change, not a token fix).
- **ARIA:** Toggle has `aria-expanded` bound to `!collapsed` (line 166) — correct. No `aria-controls` linking the toggle to the `.steps` region, and the `.steps` container has no `role`/`region`/label. The decorative chevron SVG is not `aria-hidden`.
- **CustomEvents:** `ai-reasoning-node-click` dispatched with `bubbles: true, composed: true` and `detail: { id, type, content }` (line 151) — matches the `@fires` JSDoc. Correct and crosses shadow boundary.
- **Touch targets:** Toggle padding `--cg-spacing-8` vertical (~8px) yields a target shorter than 44px; step rows ~`--cg-spacing-12` padding. Both below the 44px touch-target minimum. This is a sizing/design enhancement (not a token violation) — noted here, not in fixes.

### 5. Visual Design Check

Clean, restrained chain-of-thought UI with two well-considered variants (Claude-style minimal left-border vs DeepSeek-style contained card). Tokenized radii, generous line-height, mono confidence readout, and categorical dot colors give good typographic hierarchy and breathing room. Highlight/hover overlays are tasteful and dark-theme native. Main drawbacks: the focus ring is a hand-rolled box-shadow rather than the system focus-ring token, the reasoning label color is a borrowed outline token instead of the AI-lifecycle text color, and clickable step rows lack keyboard/focus affordance. Visually showcase-ready; interaction layer needs polish.

One-word verdict: **strong**

### 6. Fixes Needed

1. **Line 57** — reasoning label uses a border/outline token as text color, and misses the AI-lifecycle family.
   - Current: `color: var(--cg-color-surface-container-outlined);`
   - Fixed: `color: var(--cg-color-ai-reasoning-text);`
   - Why: This label heads an AI chain-of-thought ("Thinking") display. Per the AI-state convention, reasoning lifecycle UI must use the dedicated `--cg-color-ai-reasoning-text` token. The current `surface-container-outlined` is a border/outline semantic being misused as text fill.

2. **Line 67** — focus ring uses a bare magic `3px` spread and a generic overlay instead of the dedicated focus-ring color token.
   - Current: `box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);`
   - Fixed: `box-shadow: 0 0 0 var(--cg-outline-width-thick) var(--cg-color-focus-ring);`
   - Why: Removes the magic `3px` (replaced with the tier-1 `--cg-outline-width-thick` token) and routes the focus indicator through the system's dedicated `--cg-color-focus-ring` semantic token for consistent, theme-aware focus styling.

**Additional non-token flags (described, not in fixes array):**
- Step `<div>`s (lines 150-151) are clickable but not keyboard-operable — add `role="button"`, `tabindex="0"`, and an Enter/Space key handler, plus a `:focus-visible` style. (Structural a11y, P1.)
- Toggle and step touch targets fall below 44px — enlarge for touch (design change).
- Decorative chevron SVG (line 167) should be `aria-hidden="true"`; consider `aria-controls` on the toggle and a labeled `role="region"` on `.steps`. (a11y polish.)

### Research-backed enhancements

Modern 2025-era reasoning UIs (Vercel AI Elements' Chain-of-Thought / Reasoning components, shadcn.io's `chain-of-thought`, assistant-ui) converge on a few patterns this component is missing. Concrete suggestions:

1. **Auto-open during streaming, auto-collapse on completion.** Vercel's Reasoning component "automatically opens during streaming and closes when finished" ([AI Elements – Reasoning](https://elements.ai-sdk.dev/components/reasoning)). Our component is statically `collapsed`-driven. Add a `streaming` prop that forces the tree open while tokens arrive and animates it closed once the final `conclusion` node lands — this turns the tree into live "thinking" feedback instead of a static log. Pair with an "elapsed thinking time" readout (e.g. *"Thought for 4s"*) in the toggle header, the de-facto convention popularized by reasoning-model chat UIs.

2. **Step-status affordance with an animated active row.** AI Elements' Chain-of-Thought ships per-step `status` states (pending / active / complete) with progress indicators ([AI Elements – Chain of Thought](https://elements.ai-sdk.dev/components/chain-of-thought)). Today our categorical dots only encode *type*. Add a `status` to each node: render the active step's dot as a pulsing ring (token-driven `box-shadow` keyframe, gated behind `prefers-reduced-motion`), completed steps at full opacity, and pending steps dimmed. This gives the linear-progress legibility Linear/Vercel users now expect from a stepper.

3. **Connector spine instead of detached dots.** Modern tree/stepper aesthetics (shadcn, Linear's nested issue trees) draw a continuous vertical connector line linking each node's marker, with the line segment *above the active node* highlighted to show progress. Replace the free-floating `.dot` with a `::before` spine using `--cg-color-surface-cards-border`, and tint the traversed segment with `--cg-color-action-primary-background-default`. This reads as a genuine reasoning *path*, reinforcing the "tree" promise of the name.

4. **Per-step streaming text with a caret, and a shimmer skeleton for in-flight rows.** assistant-ui and AI Elements render reasoning text token-by-token with a blinking caret on the streaming row ([assistant-ui – Chain of Thought UI](https://www.assistant-ui.com/docs/guides/chain-of-thought)). Add a `loading`/empty state: a shimmer-skeleton row (1–2 token-width bars using `--cg-overlay-dark-subtle` with a reduced-motion-safe gradient sweep) shown before a step's content resolves. Our States Audit currently marks Loading as "N/A" — that is the single biggest gap vs. 2025 peers, since reasoning surfaces are inherently asynchronous.

5. **Density toggle + "expand/collapse all" for deep trees.** Vercel/Linear default to a compact density with an explicit expansion control. For long chains add (a) a header-level "Collapse all / Expand all" affordance, and (b) a `density="compact"` variant that drops row padding to `--cg-spacing-6`/`--cg-spacing-8` and hides the per-step confidence readout behind hover — keeping long reasoning legible without a scroll marathon. This also fixes the sub-44px touch-target note by giving touch contexts a comfortable default while letting dense desktop use opt down.

6. **Hover-reveal copy / "branch from here" action on each row.** shadcn AI rows expose a quiet, hover-revealed action affordance (Linear-style: actions fade in on row hover, invisible at rest to keep density). Add a right-aligned ghost icon button per step (copy step text, or "explore this branch") that appears on `:hover`/`:focus-within` only — this monetizes the existing `ai-reasoning-node-click` event with a discoverable, non-cluttering affordance and matches the restrained Vercel/Linear interaction language.

Sources:
- [AI Elements – Chain of Thought](https://elements.ai-sdk.dev/components/chain-of-thought)
- [AI Elements – Reasoning](https://elements.ai-sdk.dev/components/reasoning)
- [shadcn.io – React AI Chain Of Thought](https://www.shadcn.io/ai/chain-of-thought)
- [assistant-ui – Chain of Thought UI](https://www.assistant-ui.com/docs/guides/chain-of-thought)
- [Vercel – Introducing AI Elements](https://vercel.com/changelog/introducing-ai-elements)
