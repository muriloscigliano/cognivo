## ai-progress-steps — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 35 | animation duration/easing | `var(--cg-transition-duration-fast)` / `var(--cg-transition-easing-default)` | Yes | None |
| 42 | gap | `0` | Yes | None (zero) |
| 43 | width | `100%` | Yes | None (%) |
| 54 | padding | `0` | Yes | None (zero) |
| 60 | border-color (hover) | `var(--cg-color-input-border-hover)` | Yes | None |
| 63 | transform scale | `var(--cg-interaction-press-scale)` | Yes | None |
| 66 | outline (focus) | `2px solid var(--cg-overlay-accent-strong)` | No | Bare `2px` magic + non-semantic focus color → `var(--cg-outline-width-default) solid var(--cg-color-focus-ring)` |
| 67 | outline-offset | `var(--cg-outline-offset-default)` | Yes | None |
| 68 | border-radius (focus) | `var(--cg-border-radius-50)` | Yes | None |
| 79 | height (`.line`) | `2px` | No | Bare magic px → `var(--cg-border-width-100)` |
| 80 | background (`.line`) | `var(--cg-color-surface-cards-border)` | Yes | None (divider/connector) |
| 81 | transition | `background var(--cg-transition-duration-default) var(--cg-transition-easing-default)` | Yes | None (explicit property) |
| 84 | background (`.line.done`) | `var(--cg-color-action-primary-background-default)` | Yes | None (tier-2 semantic) |
| 90-91 | width/height (`.dot`) | `var(--cg-spacing-24)` | Acceptable | Tier-1 spacing for sizing; no component token exists — not a violation |
| 92 | border-radius | `50%` | Yes | None (circle) |
| 96 | font-size (dot number) | `var(--cg-font-size-sm)` | Yes | None |
| 97 | font-weight | `var(--cg-font-weight-semibold)` | Yes | None |
| 98 | border | `var(--cg-border-width-100) solid var(--cg-color-surface-cards-border)` | Yes | None |
| 99 | background | `var(--cg-color-surface-container-background)` | Yes | None |
| 100 | color | `var(--cg-color-input-text-placeholder)` | Yes | None (muted pending state) |
| 101 | transition | `opacity var(--cg-transition-duration-default) var(--cg-transition-easing-default)` | Yes | None (explicit) |
| 105-107 | complete dot colors | `--cg-color-surface-base-text` / `--cg-color-action-primary-background-default` / `--cg-color-surface-container-background` | Acceptable | Tier-2 semantic; recommend `--cg-color-ai-complete-*` family (see §6) |
| 110-111 | active dot colors | `--cg-color-surface-base-text` (x2) | Weak | Generic color for an AI-active/processing state → recommend `--cg-color-ai-streaming-*` (see §6) |
| 112 | animation | `pulse 1.5s ease-in-out infinite` | Flag | `1.5s` and `ease-in-out` are bare literals; no exact token equivalent — flagged, not auto-fixed |
| 115-117 | error dot colors | `--cg-color-status-error-text-default` / `--cg-color-status-error-background-default` | Acceptable | Tier-2 status; recommend `--cg-color-ai-error-*` for AI pipeline error (see §6) |
| 121-123 | keyframe opacity | `1` / `0.6` | Yes | None (keyframe positions / opacity) |
| 126 | margin-top (`.info`) | `var(--cg-spacing-6)` | Yes | None |
| 131 | font-size (`.label`) | `var(--cg-font-size-xs)` | No | Body/label text below 14px → `var(--cg-font-size-sm)` |
| 132 | font-weight | `var(--cg-font-weight-medium)` | Yes | None |
| 133 | color | `var(--cg-color-input-text-placeholder)` | Yes | None (muted pending label) |
| 137,140 | active/complete label color | `var(--cg-color-surface-base-text)` | Yes | None (tier-2 semantic emphasis) |
| 143 | error label color | `var(--cg-color-status-error-text-default)` | Acceptable | See ai-error recommendation §6 |
| 147 | font-size (`.duration`) | `var(--cg-font-size-xs)` | Borderline | Tertiary metadata <14px — recommend `--cg-font-size-sm` (see §6) |
| 148 | color | `var(--cg-color-input-text-placeholder)` | Yes | None |
| 149 | margin-top | `var(--cg-spacing-2)` | Yes | None |
| 153 | compact dot width/height/font | `var(--cg-spacing-20)` / `var(--cg-font-size-xs)` | Acceptable | Spacing for sizing fine; xs on a hidden-label compact dot number is acceptable |

### 2. Styling Audit
- **Border radius:** Dots are `50%` (intentional circles); focus ring uses `--cg-border-radius-50`. Consistent and tokenized.
- **Spacing:** All gaps/margins use the `--cg-spacing-*` scale (`6`, `2`). Dot sizing uses tier-1 spacing (`24`/`20`) — acceptable given no component-tier size token exists for this component.
- **Font-size accessibility:** `.label` and `.duration` are `--cg-font-size-xs` (<14px). The label is the primary readable text and should be `--cg-font-size-sm` (14px min). Duration is tertiary metadata — recommend `sm` as well.
- **Translucent vs solid borders:** Borders use solid semantic surface/status tokens — appropriate; no translucent borders.
- **Transitions:** All transitions enumerate explicit properties (`background`, `opacity`); no `transition: all`. Motion tokens (`--cg-transition-duration-*`, `--cg-transition-easing-*`) used correctly. The pulse animation hard-codes `1.5s ease-in-out` instead of motion tokens — minor inconsistency, no exact token equivalent. `reducedMotion` shared style is imported (good).
- **Dark-theme suitability:** All colors resolve from tier-2 semantic tokens that adapt to theme; dark-first compatible.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.dot` pending: muted border + placeholder text; numbered | None |
| Hover | Yes | `.step:hover .dot` → `--cg-color-input-border-hover` | None |
| Active/Press | Yes | `.step:active` → scale(`--cg-interaction-press-scale`) | None |
| Focus-visible | Yes | `.step:focus-visible` outline | Bare `2px` + non-semantic `--cg-overlay-accent-strong`; should be `--cg-outline-width-default` + `--cg-color-focus-ring` |
| Disabled | N/A | No disabled affordance | Phases are always interactive buttons; no disabled phase concept exposed |
| Loading | Yes | `data-status="active"` pulse animation = in-progress phase | None (this is the loading state of a phase) |
| Error | Yes | `data-status="error"` → status-error colors | Works; recommend `--cg-color-ai-error-*` family for AI-pipeline semantics |
| Success | Yes | `data-status="complete"` → checkmark + action-primary fill | Works; recommend `--cg-color-ai-complete-*` family |

### 4. Interaction Audit
- **Keyboard:** Each phase is a native `<button>` with `tabindex="0"` — Enter/Space activate `@click` natively. Good. (The explicit `tabindex="0"` is redundant on a button but harmless.)
- **ARIA:** Container `role="list"` + `aria-label="Progress steps"`; each button `role="listitem"` with `aria-label="${label}: ${status}"`. Reasonable. Note: applying `role="listitem"` to a `<button>` overrides its implicit button role, so the element is announced as a list item, not a button — phases are clickable but won't be announced as actionable. Consider a `<ul>/<li>` wrapper with the button inside, or `aria-current="step"` on the active phase for richer semantics (flag, not a token issue).
- **CustomEvents:** `ai-progress-phase-click` with `detail: { label, status, index }`, `bubbles: true`, `composed: true`. Correct and crosses shadow boundary.
- **Touch targets:** Dot is 24px (`--cg-spacing-24`); button wraps dot+label so the hit area is taller but can be <44px wide in compact mode. Enlarging to ≥44px min-target is a design change (not a token violation) — noted here only.

### 5. Visual Design Check
Clean, minimal connected-dot stepper with status icons, a subtle pulse on the active phase, completed-line fill, and an optional duration caption. Circular dots, tokenized dividers, and centered captions read as modern. The xs label/duration text feels slightly cramped and sub-accessible; bumping to sm and adopting the dedicated AI-state color family (streaming/complete/error) would make it more on-brand for an AI pipeline and more showcase-ready. Breathing room and hierarchy are adequate; the focus ring fix and font bump are the main polish items.

Verdict: **adequate**

### 6. Fixes Needed
1. **Line 66** — `outline: 2px solid var(--cg-overlay-accent-strong);` → `outline: var(--cg-outline-width-default) solid var(--cg-color-focus-ring);`. Removes a bare `2px` magic value and uses the dedicated semantic focus-ring token instead of a generic accent overlay.
2. **Line 79** — `height: 2px;` → `height: var(--cg-border-width-100);`. Removes a bare magic px on the connector line; `--cg-border-width-100` is the correct real token for a hairline connector.
3. **Line 131** — `font-size: var(--cg-font-size-xs);` → `font-size: var(--cg-font-size-sm);`. The `.label` is primary readable body text and must meet the 14px minimum.
4. **Line 147 (flag)** — `.duration` uses `--cg-font-size-xs`. Recommend `--cg-font-size-sm` for the 14px minimum; it is tertiary metadata so treated as a recommendation rather than a hard fix.
5. **Lines 110-111 (recommend)** — active dot uses generic `--cg-color-surface-base-text`. For an AI processing/active phase, recommend the dedicated AI-state family: `--cg-color-ai-streaming-text` / `--cg-color-ai-streaming-border` (with `--cg-color-ai-streaming-background`). Visual-intent change — left as a recommendation.
6. **Lines 105-107 / 115-117 (recommend)** — complete and error dots use `--cg-color-action-primary-*` and `--cg-color-status-error-*`. For AI-pipeline semantics consider `--cg-color-ai-complete-*` and `--cg-color-ai-error-*`. These are valid tier-2 today, so this is an enhancement recommendation, not a violation.

### Research-backed enhancements

Sourced from current (2025-era) stepper patterns across [shadcn/Stepperize](https://www.shadcn.io/template/damianricobelli-stepperize), [reui Shadcn Stepper](https://reui.io/components/stepper), [shadcn-ui/ui Stepper discussion #6219](https://github.com/shadcn-ui/ui/discussions/6219), and [PatternFly progress stepper](https://www.patternfly.org/components/progress-stepper/design-guidelines/).

1. **Animate the connector fill, not just toggle it (Linear/Stepperize pattern).** Today the `.line.done` state is a binary background swap. Modern steppers fill the connector with a directional gradient sweep keyed off the active phase, so the "in-progress" line is partially filled toward the active dot. Replace the `.line` background with a `linear-gradient(to right, var(--cg-color-action-primary-background-default) var(--fill, 0%), var(--cg-color-surface-cards-border) var(--fill, 0%))` driven by a `--fill` custom property, and transition `background-position`/the `--fill` var (already-explicit-property compliant). This gives the AI pipeline a sense of forward momentum instead of discrete jumps.

2. **Swap the active-dot `pulse` for a spinner/ring on `data-status="active"` (reui + shadcn loading-state pattern).** Current `pulse 1.5s ease-in-out` reads as "blinking" rather than "working." Modern steppers render an indeterminate ring (rotating conic-gradient or stroked SVG circle) around the active dot for genuine "processing" affordance. This also resolves the §2 flagged bare `1.5s ease-in-out` literals by moving to a rotation keyframe that can reuse `--cg-transition-duration-*` semantics, and it more honestly signals an in-flight AI step.

3. **Add a `data-status="loading"` distinct from `active` with a Spinner glyph (reui state matrix: pending / active / loading / completed / error).** The §3 matrix collapses "active" and "loading" into one. Current AI-native steppers separate the *current* step (highlighted, awaiting) from a step that is *actively streaming/computing* (spinner). Introduce a fourth visual state so a phase can be "selected but idle" vs "running," using `--cg-color-ai-streaming-*` for the running state.

4. **Animated check-draw on completion (Stepperize/Framer Motion micro-interaction).** Instead of the checkmark appearing instantly on `data-status="complete"`, stroke-dash-animate the SVG checkmark path (`stroke-dasharray` + `stroke-dashoffset` → 0) over `--cg-transition-duration-default`. This single micro-interaction is the highest-signal "modern" cue in 2025 steppers and reinforces the completion moment for each AI phase.

5. **Add a segmented vs continuous progress-bar variant for compact/dense mode ([shadcn onboarding-stepper](https://www.shadcn.io/blocks/onboarding-stepper) two-mode pattern).** The compact mode currently still renders dots+lines. For very dense AI dashboards, a single segmented bar (one filled segment per completed phase) communicates pipeline progress in far less vertical/horizontal space. Expose a `variant="bar"` that reuses the same status data but collapses to a proportional fill — better density for embedding inside an `ai-*` card header.

6. **Surface step metadata on hover/focus as a popover (PatternFly progress-stepper guideline).** The `.duration` caption is always visible and competes for space at xs size. PatternFly's pattern moves secondary detail (timing, sub-status, error reason) into a popover revealed on hover/focus of the dot, keeping the rail clean while still exposing per-phase detail. This pairs with the §4 a11y note: a popover tied to `aria-describedby` gives screen-reader users the duration/error context without cramming it into the always-on label.
