## ai-agent-card — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 41 | animation duration/easing | `--cg-transition-duration-fast` / `--cg-transition-easing-ease-out` | Yes | None — valid tier-1 motion tokens, no fallback |
| 46 | `.card` background | `--cg-color-surface-cards-background` | Yes | None — correct tier-2 surface |
| 47 | `.card` border | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | None — hairline via token, semantic color |
| 48 | `.card` border-radius | `--cg-border-radius-200` | Yes | None — tier-1 radius (acceptable; no tier-3 ai-agent-card radius token exists in vocab) |
| 49 | `.card` padding | `--cg-spacing-20` | Yes | None |
| 52-54 | `.card` transition | enumerated `border-color` + `box-shadow` with `--cg-transition-duration-fast` / `--cg-transition-easing-default` | Yes | None — explicit property list, not `transition: all` |
| 57 | `.card:hover` border-color | `--cg-color-surface-cards-hover-border` | Yes | None |
| 62 | `.card.active` border-left | `--cg-border-width-300` + `--cg-color-action-primary-background-default` | Tier OK, semantic mismatch | Generic action color used for an AI "thinking/acting" active state — see §6 note. Not a banned palette token, so not a hard violation. |
| 65 | `.card.error-state` border-left | `--cg-border-width-300` + `--cg-color-status-error-text-default` | Yes | None — status-error is the right family; ai-error also valid |
| 68 | `.card.done-state` border-left | `--cg-border-width-300` + `--cg-color-status-success-text-default` | Yes | None |
| 73-74 | `@keyframes shimmerSlide` transforms | `translateX(-100%)` / `translateX(200%)` | Yes | None — keyframe percentages are legitimate raw values |
| 80 | `.card.active::before` height | `--cg-spacing-2` | Yes | None — 2px shimmer bar via spacing token |
| 81 | shimmer gradient | `linear-gradient(90deg, transparent, --cg-color-action-primary-background-default, transparent)` | Tier OK, semantic mismatch | Same as line 62 — generic action color for AI active state; gradient stops `transparent` are fine |
| 82 | shimmer animation | `2s --cg-transition-easing-default infinite` | Acceptable | Raw `2s` duration is not a token; prefer `--cg-transition-duration-slow`. Minor — animation-specific durations are commonly raw across the suite |
| 85 | error shimmer gradient | `--cg-color-status-error-text-default` | Yes | None |
| 93 | `.header` gap | `--cg-spacing-12` | Yes | None |
| 94 | `.header` margin-bottom | `--cg-spacing-16` | Yes | None |
| 97 | `.identity` flex/min-width | `flex: 1; min-width: 0` | Yes | None — layout primitives, no token needed |
| 99 | `.name` font-size | `--cg-font-size-base` | Yes | None — ≥14px |
| 100 | `.name` font-weight | `--cg-font-weight-bold` | Yes | None |
| 101 | `.name` color | `--cg-color-surface-base-text` | Yes | None |
| 102 | `.name` line-height | `--cg-line-height-tight` | Yes | None |
| 105 | `.role` font-size | `--cg-font-size-xs` | Yes | None — label/metadata text, not body copy; uppercase eyebrow, acceptable below 14px |
| 106 | `.role` font-weight | `--cg-font-weight-semibold` | Yes | None |
| 107 | `.role` color | `--cg-color-input-text-placeholder` | Borderline | Using an input-family placeholder token for a card eyebrow is semantically off; a `surface-cards` muted/subtle text token would be cleaner. Not a banned token. Minor |
| 109 | `.role` letter-spacing | `--cg-letter-spacing-wide` | Yes | None — real token (widely used across suite; absent only from the partial vocab snippet) |
| 110 | `.role` margin-top | `--cg-spacing-4` | Yes | None |
| 118 | `.actions` gap | `--cg-spacing-4` | Yes | None |
| 120-121 | `.actions` top/right | `--cg-spacing-12` | Yes | None |
| 128 | `.body` gap | `--cg-spacing-12` | Yes | None |
| 129 | `.body` padding-top | `--cg-spacing-12` | Yes | None |
| 130 | `.body` border-top | `--cg-border-width-50` + `--cg-color-surface-cards-divider` | Yes | None — divider token is correct here |
| 134 | `.task` font-size | `--cg-font-size-sm` | Yes | None — 14px, meets body minimum exactly |
| 135 | `.task` color | `--cg-color-surface-base-text` | Yes | None |
| 136 | `.task` line-height | `--cg-line-height-relaxed` | Yes | None |
| 147 | `.handoff` gap | `--cg-spacing-6` | Yes | None |
| 149 | `.handoff` font-size | `--cg-font-size-xs` | Yes | None — chip/metadata label, acceptable |
| 150 | `.handoff` color | `--cg-color-input-text-placeholder` | Borderline | Same input-family concern as line 107. Minor |
| 153 | `.handoff-step` padding | `--cg-spacing-4` / `--cg-spacing-8` | Yes | None |
| 154 | `.handoff-step` border-radius | `--cg-border-radius-50` | Yes | None |
| 155 | `.handoff-step` background | `--cg-color-surface-container-background` | Yes | None |
| 157 | `.handoff-step` font-weight | `--cg-font-weight-medium` | Yes | None |
| 160 | `.handoff-step.current` background | `--cg-overlay-accent-subtle` | Yes | None — tier-1 overlay token, valid for subtle accent wash (consistent with ai-thinking/ai-ab-test audits) |
| 161 | `.handoff-step.current` color | `--cg-color-surface-base-text` | Yes | None |
| 162 | `.handoff-step.current` font-weight | `--cg-font-weight-bold` | Yes | None |
| 165 | `.handoff-step.past` opacity | `0.6` | Yes | None — bare opacity is legitimate |
| 168 | `.handoff-arrow` color | `--cg-color-surface-cards-border` | Yes | None |
| 176 | `.caps` gap | `--cg-spacing-6` | Yes | None |
| 186-190 | rounded variants | `0` / `--cg-border-radius-50/100/200/full` | Yes | None — `border-radius: 0` is a legitimate raw value for `rounded="none"` |

No `var(--token, fallback)` comma-fallbacks anywhere. No raw hex/rgba CSS colors. No banned tier-1 palette (`--cg-gray/red/blue/green/brand-*`) used as CSS color values. No `transition: all`. No made-up token names. File is overwhelmingly clean; the only soft spots are semantic-family choices (action-primary vs ai-thinking for the active accent; input-placeholder for card eyebrow text) and two raw animation values (`2s`).

### 2. Styling Audit
- **Border radius:** `--cg-border-radius-200` default with a full `rounded` variant ladder (none → sm → md → lg → full). Appropriate for a status card — not over-rounded.
- **Spacing generosity:** Padding `--cg-spacing-20`, 12–16px internal rhythm, body separated by a top divider with `--cg-spacing-12` padding. Generous and consistent.
- **Font-size accessibility:** Body `.task` = `--cg-font-size-sm` (14px) — meets the body minimum exactly. `.name` = base. `.role` and `.handoff` use `xs` but as eyebrow/metadata labels, which is acceptable, not body copy.
- **Translucent vs solid borders:** Borders use solid semantic surface tokens (`surface-cards-border`, `surface-cards-divider`). The `.current` handoff chip uses `--cg-overlay-accent-subtle` as a translucent wash — correct usage.
- **Transitions:** Explicit property list (`border-color`, `box-shadow`) — no `transition: all`. Motion tokens used. The shimmer `@keyframes` honors `prefers-reduced-motion` (lines 181-183). The only nit: the shimmer's `2s` duration is a raw value, not a token.
- **Dark-theme suitability:** `surface-cards-background` + `surface-cards-border` are the dark-first card primitives; left-accent borders and the shimmer read well on a dark surface. Suitable.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default (idle) | Yes | `status="idle"` → neutral badge, no accent border, no shimmer | None |
| Hover | Yes | `.card:hover` brightens border to `surface-cards-hover-border` | Subtle; card itself is not interactive (role=article), so hover is decorative only — acceptable |
| Active/Press | N/A (partial) | No press state on the card (non-clickable). "Active" instead means thinking/acting → left accent + shimmer + badge dot | Card is not a button; press state N/A. The status-active treatment is present and good |
| Focus-visible | N/A on card; delegated | Card is non-interactive; the only focusable elements are the nested `cg-button` pause/cancel, which own their own focus-visible styling | Acceptable — focus lives on the real controls |
| Disabled | N/A | No disabled concept for a status display card | Justified — a card reflecting live agent state has no disabled mode |
| Loading | Yes (semantic) | `status="thinking"`/`"acting"` render shimmer + pulsing badge dot (`?dot=${showDot}`) — this IS the loading representation | None |
| Error | Yes | `status="error"` → `.error-state` red left-accent + red shimmer + danger badge | None |
| Success | Yes | `status="done"` → `.done-state` green left-accent + success badge | None |

All meaningful states for a status card are covered. Disabled/press/standalone-focus are correctly N/A because the card is a non-interactive `article` whose actions delegate to child buttons.

### 4. Interaction Audit
- **Keyboard:** No card-level key handling, which is correct — the card is `role="article"`, not a widget. The actionable controls are `cg-button` (Pause/Cancel) which are real buttons and inherit Enter/Space activation and focus from `cg-button`. No keyboard gaps for the card's own responsibilities.
- **ARIA:** `role="article"` with a descriptive `aria-label` combining name + status + task (line 229-230) — good. The handoff chain has `aria-label="Handoff: A → B → C"` (line 258) and the literal `→` arrows are `aria-hidden="true"` (line 260) so they aren't read as "right arrow" — correct. Capabilities row has `aria-label="Capabilities: ..."` (line 267). Pause/Cancel buttons carry `label="Pause agent"` / `label="Cancel agent"` (lines 234, 237) for accessible names. No wrong/conflicting roles.
- **Live region:** Minor gap — the status changes (idle→thinking→done) are conveyed only via the `aria-label` on a static `article`, which screen readers will not re-announce on update. A `role="status"`/`aria-live="polite"` region around the badge/status would improve announcement of live agent transitions. Enhancement, not a defect.
- **CustomEvents:** `ai-agent-pause` and `ai-agent-cancel` both dispatched with `{ bubbles: true, composed: true, detail: { name: this.name } }` (lines 203, 208). `composed: true` correctly crosses the shadow boundary; `detail.name` matches the documented `@fires` JSDoc (lines 20-21). `stopPropagation()` on the button click prevents bubbling to any card-level handler — sensible. Detail is correct.
- **Touch targets:** Pause/Cancel use `cg-button size="sm"`. The card does not hardcode a sub-44px size; the actual hit area is owned by `cg-button`'s `--cg-component-button-height-sm` token. Worth a spot-check that `button-height-sm` ≥ 44px (or has adequate tap padding), but this component does not itself introduce an undersized target.

### 5. Visual Design Check
Modern and sleek: dark-first card, left-accent state coding, animated shimmer top-bar for active agents, pulsing badge dot, pill-style handoff chain with current/past de-emphasis (opacity 0.6), and a chip row for capabilities. Radius is appropriate and configurable. Breathing room is good (`spacing-20` padding, 12-16px rhythm). A real divider separates header from body (`border-top` with `surface-cards-divider`). Typography hierarchy is clear: bold base name → uppercase wide-tracked eyebrow role → relaxed sm task text → xs metadata. This would pass a HeroUI/Vercel-style showcase. Verdict: **strong**.

### 6. Fixes Needed
No hard violations — there is nothing that fails the banned-token, fallback, magic-number, or a11y gates. The following are optional refinements, not required fixes:

1. **(Optional, semantic) Lines 62 & 81 — AI-state color family.** The active (thinking/acting) left-accent and shimmer use `--cg-color-action-primary-background-default`. Because `status="thinking"` is a first-class AI cognitive state, the dedicated `--cg-color-ai-thinking-border` / `--cg-color-ai-thinking-glow` family would be more semantically precise. It is NOT a hard violation: `action-primary` is a valid tier-2 semantic token (not banned palette), and the "active" class deliberately covers both `thinking` and `acting`, so a single AI token would not perfectly map both. Left as-is is defensible; switching to the ai-thinking family is the cleaner intent.
2. **(Optional, semantic) Lines 107 & 150 — muted text token.** `.role` and `.handoff` use `--cg-color-input-text-placeholder` for muted text on a card surface. A `surface-cards`-family subtle/muted text token would be more on-surface. Cosmetic; the rendered color is fine.
3. **(Optional, motion) Line 82 — raw `2s` shimmer duration.** Prefer `--cg-transition-duration-slow` over the hardcoded `2s`. Minor; long animation loops are commonly raw across the suite.

Everything load-bearing (colors, spacing, radius, transitions, ARIA, events) is token-governed and compliant. The component is in good shape; the items above are polish, not corrections.

### Research-backed enhancements

- **Live agent status pill with semantic states.** Mirror Vercel AI Elements' `status` model (`idle` / `submitted` / `streaming` / `error`) as a dedicated status pill in the card header — a small dot + label that shifts color via tier-2 semantic tokens (`--cg-color-status-success`, `--cg-color-status-warning`). When `streaming`, animate the dot with a soft pulse so users feel the agent is actively "thinking" without a blocking spinner. ([Vercel AI Elements](https://vercel.com/changelog/introducing-ai-elements))

- **Inline tool-call affordance.** AI Elements / shadcn agent primitives now expose tool-use as first-class cards (Bash, Edit, Search, Plan). Add a collapsible "current action" row to the agent card that surfaces what the agent is doing right now (e.g. "Searching repo…") with a tool icon, so the card communicates capability and progress, not just identity. ([shadcn.io AI components](https://www.shadcn.io/ai))

- **Streaming-aware skeleton instead of spinner.** Replace any all-or-nothing loading state with a shimmer skeleton on the description/metric region that resolves token-by-token as content streams in — the dominant 2025 pattern for AI surfaces. Drives perceived performance and avoids layout shift. Gate it on the same `streaming` status flag. ([shadcn.io AI components](https://www.shadcn.io/ai))

- **Tighten density and adopt a quiet-card aesthetic.** Move to a 1px hairline border with low-contrast surface (Linear/shadcn style) rather than heavy shadows; on hover, raise elevation subtly and reveal a quick-action row (Run, Configure, Stop) that is visually hidden until intent. This keeps a grid of agent cards calm at rest and progressively discloses controls. ([shadcn.io](https://www.shadcn.io/))

- **Explicit error and stopped states.** The component likely covers default/hover but not the agent-specific failure surface. Add an `error` state (red-tinted left accent + retry affordance) and a `stopped`/`paused` state, since agent runs fail or get cancelled mid-stream — these are now standard in agent UIs and map to the AI SDK status enum. ([Vercel AI Elements](https://vercel.com/changelog/introducing-ai-elements))

- **Micro-interaction on completion.** When an agent finishes a run, briefly flash the status pill to success and let it settle to idle (short, explicit-property transition — never `transition: all`). This closure cue is a low-cost trust signal that the work actually completed. ([shadcn.io AI components](https://www.shadcn.io/ai))

### Playground proposal

Current example is representative. A richer default that exercises the active/shimmer state, handoff chain, and capability chips: <ai-agent-card name="Researcher" role="Data Analyst" status="thinking" task="Querying vector store for Q4 revenue data across all regional ledgers..." .capabilities=${['search','summarize','code']} .handoffChain=${['Planner','Researcher','Coder']}></ai-agent-card>. This shows the pulsing badge dot, the shimmer top-bar, the absolutely-positioned pause/cancel actions, the current/past handoff steps, and the chip row in one shot. No change strictly required.

---
*cleanliness: minor | fixes proposed: 0*
