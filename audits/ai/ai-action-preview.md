## ai-action-preview — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 31 | animation duration/easing | var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out) | Yes | Clean — motion tokens used. |
| 35 | background | var(--cg-color-surface-cards-background) | Yes | Clean — tier-2 surface. |
| 36 | border | var(--cg-border-width-50) solid var(--cg-color-surface-cards-border) | Yes | Clean. |
| 37 | border-radius | var(--cg-border-radius-200) | Yes | Clean — no tier-3 alert-dialog radius mandated here; tier-1 acceptable. |
| 38 | padding | var(--cg-spacing-16) | Yes | Clean. |
| 43 | border-color (critical) | var(--cg-color-status-error-text-default) | Yes | Tier-2 status color, fine. |
| 44 | animation | pulse-border **2s** **ease-in-out** infinite | No | Bare `2s` duration and raw `ease-in-out` easing — should use motion tokens (no 2s token exists; nearest is `--cg-transition-duration-slow` + `--cg-transition-easing-ease-in-out`). |
| 51 | gap | var(--cg-spacing-8) | Yes | Clean. |
| 52 | margin-bottom | var(--cg-spacing-16) | Yes | Clean. |
| 55 | font-size | var(--cg-font-size-base) | Yes | Clean. |
| 56 | font-weight | var(--cg-font-weight-bold) | Yes | Clean. |
| 57 | color | var(--cg-color-surface-base-text) | Yes | Clean. |
| 65 | gap | var(--cg-spacing-4) | Yes | Clean. |
| 66 | padding | var(--cg-spacing-2) var(--cg-spacing-8) | Yes | Clean. |
| 67 | border-radius | var(--cg-border-radius-full) | Yes | Clean — pill badge. |
| 68 | font-size | var(--cg-font-size-xs) | Yes | Badge label, non-body — xs acceptable. |
| 69 | font-weight | var(--cg-font-weight-bold) | Yes | Clean. |
| 71 | letter-spacing | var(--cg-letter-spacing-wide) | Maybe | Token name not present in supplied tier-1 vocab; tracking-style tokens not listed. Likely valid in full vocab but unverifiable here — flagged as uncertain. |
| 74-75 | severity.low bg/text | status-success-background/text-default | Yes | Clean. |
| 78-79 | severity.medium bg/text | status-warning-background/text-default | Yes | Clean. |
| 82 | severity.high background | var(--cg-color-status-error-background-default) | Yes | Tier-2 status. |
| 83 | severity.high **color** | var(--cg-color-chart-5) | **No** | Chart-palette data color used as severity TEXT color — semantically wrong and low-contrast risk on error bg. Should be `--cg-color-status-error-text-default` (matching .critical) or `--cg-color-status-warning-text-default`. |
| 86-87 | severity.critical bg/text | status-error-background/text-default | Yes | Clean. |
| 92 | description font-size | var(--cg-font-size-sm) | Yes | Body text at sm (14px) — meets a11y minimum. |
| 93 | description color | var(--cg-color-input-text-placeholder) | Weak | Re-purposing input-placeholder token for muted body copy is a semantic mismatch; placeholder tokens are often below body-text contrast. Prefer `--cg-color-surface-cards-text` or a muted surface text token. Borderline, not a hard violation. |
| 94 | line-height | 1.5 | Borderline | Raw numeric line-height; a `--cg-line-height-normal`/`-relaxed` token exists and is preferred. |
| 95 | margin-bottom | var(--cg-spacing-16) | Yes | Clean. |
| 102 | gap | var(--cg-spacing-8) | Yes | Clean. |
| 103 | margin-bottom | var(--cg-spacing-16) | Yes | Clean. |
| 104 | padding | var(--cg-spacing-12) | Yes | Clean. |
| 105 | background | var(--cg-color-surface-base-background) | Yes | Inset panel on card — acceptable tier-2. |
| 106 | border-radius | var(--cg-border-radius-100) | Yes | Clean. |
| 112 | font-size | var(--cg-font-size-sm) | Yes | Clean. |
| 115 | detail-key color | var(--cg-color-input-text-placeholder) | Weak | Same placeholder-as-muted-label mismatch as line 93. |
| 116 | font-weight | var(--cg-font-weight-medium) | Yes | Clean. |
| 119 | detail-value color | var(--cg-color-surface-base-text) | Yes | Clean. |
| 120 | font-weight | var(--cg-font-weight-semibold) | Yes | Clean. |
| 126 | countdown font-size | var(--cg-font-size-xs) | Yes | Helper microcopy — xs acceptable. |
| 127 | countdown color | var(--cg-color-input-text-placeholder) | Weak | Same placeholder mismatch. |
| 128 | margin-bottom | var(--cg-spacing-12) | Yes | Clean. |
| 131 | font-weight | var(--cg-font-weight-bold) | Yes | Clean. |
| 132 | color | var(--cg-color-surface-base-text) | Yes | Clean. |
| 137 | padding-top | var(--cg-spacing-12) | Yes | Clean. |
| 138 | border-top | var(--cg-border-width-50) solid var(--cg-color-surface-cards-border) | Yes | Divider present — good. |
| 140 | gap | var(--cg-spacing-8) | Yes | Clean. |
| 144 | button padding | var(--cg-spacing-8) var(--cg-spacing-16) | Yes | Clean (touch-target note below). |
| 145 | border-radius | var(--cg-border-radius-100) | Yes | Clean. |
| 146 | font-size | var(--cg-font-size-sm) | Yes | Clean. |
| 147 | font-weight | var(--cg-font-weight-semibold) | Yes | Clean. |
| 149-152 | transition | explicit background/color/filter/transform with duration-fast + easing-default | Yes | Excellent — enumerated, no `transition: all`. |
| 157 | box-shadow focus | 0 0 0 **3px** var(--cg-overlay-accent-strong) | No | Bare `3px` magic spread; and a dedicated `--cg-color-focus-ring` token exists and is the correct semantic for focus rings rather than `--cg-overlay-accent-strong`. |
| 160 | transform | scale(0.97) | Yes | Unitless scale factor — legitimate. |
| 163-165 | btn-cancel | surface-container-background / surface-base-text / surface-cards-border | Yes | Clean. |
| 167 | btn-cancel:hover bg | var(--cg-color-surface-cards-border) | Weak | Using a *border* token as a hover *background* fill is a semantic mismatch; prefer `--cg-color-surface-cards-hover-background`. Functional but off-tier-intent. |
| 169-170 | btn-confirm | action-primary-background-default / surface-base-background (text) | Yes | Clean. |
| 172 | btn-confirm:hover | filter: brightness(0.9) | Borderline | Works, but a hover token (`--cg-color-action-primary-background-hover`) exists and is preferred over a magic brightness filter. |
| 174-175 | btn-confirm.critical | status-error-text-default (bg) / surface-base-text | Yes | Acceptable; critical confirm uses error color. |
| 183-184 | keyframe border-color | status-error-text-default / status-error-border-default | Yes | Clean. |

**Summary:** Mostly compliant and well-structured. Real defects: line 83 (chart color as severity text), line 157 (magic `3px` + wrong focus token), line 44 (raw `2s`/`ease-in-out` motion). Several "weak" placeholder-token reuses and magic `brightness`/`1.5` are recommended improvements but not hard violations.

### 2. Styling Audit
- **Border radius:** `--cg-border-radius-200` card with `-100` inner panels/buttons and `-full` pill badge — sensible nested-radius hierarchy.
- **Spacing:** Generous and consistent (16 outer padding, 12 inner, 8 gaps). Good breathing room.
- **Font-size accessibility:** Body copy (description, detail rows) at `--cg-font-size-sm` (14px) meets the 14px minimum. Badge/countdown at `xs` are non-body labels — acceptable.
- **Borders:** Solid `--cg-border-width-50` hairlines via tokens; divider on actions present. Good.
- **Transitions:** Button transitions are fully enumerated (no `transition: all`) and use motion tokens — exemplary. The pulse-border keyframe animation (line 44) bypasses motion tokens with raw `2s ease-in-out`.
- **Dark-theme background:** `surface-cards-background` over `surface-base-background` inset — correct dark-first layering.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.card` base + severity classes | None. |
| Hover | Yes | `.btn-cancel:hover` (line 167), `.btn-confirm:hover` (line 172) | Cancel hover uses a border token as bg fill; confirm uses magic brightness filter instead of hover token. |
| Active/Press | Yes | `button:active { transform: scale(0.97) }` (159) | Good tactile feedback. |
| Focus-visible | Yes | `button:focus-visible` box-shadow ring (155-158) | Uses `--cg-overlay-accent-strong` + magic `3px`; should use `--cg-color-focus-ring`. Card itself has `tabindex=0` but no visible focus style for the card container. |
| Disabled | No | — | Buttons have no `:disabled` styling. During the auto-confirm countdown the confirm action stays live; no disabled affordance. Recommended given the dangerous-action nature. |
| Loading | N/A | — | Component is a synchronous confirmation card; no async fetch state. Justified N/A. |
| Error | Partial | Severity `high`/`critical` express danger visually | Not an async error state; severity classes cover the "dangerous" framing. Acceptable. |
| Success | N/A | — | Confirmation fires an event; success is the parent's concern. Justified N/A. |

### 4. Interaction Audit
- **Keyboard:** Both actions are native `<button>` elements — Enter/Space work for free. Cancel via Escape is NOT wired (no keydown handler); for an `alertdialog` with a destructive action, Escape-to-cancel is an expected affordance and is missing. No focus trap, though `alertdialog` semantics imply modal focus management.
- **ARIA:** `role="alertdialog"` with `aria-label` on the card (good). Severity badge has `aria-label="Severity: {severity}"` and the glyph is `aria-hidden` (correct). Details list uses `role="list"`/`role="listitem"` with a label (good). Countdown uses `aria-live="polite"` (good). The card has `tabindex="0"` but the dialog is not programmatically focused on open, so screen-reader announcement of the alertdialog may not fire reliably.
- **CustomEvents:** `ai-action-confirm` fires `{ action, details }`; `ai-action-cancel` fires `{ action }`. Both `bubbles: true, composed: true` — correct for Shadow DOM crossing. Double-fire guard (`_confirmed`) on confirm is solid. Note: cancel has no guard but is idempotent enough.
- **Touch targets:** Buttons are `padding: 8px 16px` + `font-size: sm` (~14px) → roughly 14 + 16 = ~30px tall. This is BELOW the 44px minimum touch target. No explicit `min-height`. This is a real a11y/mobile defect on a destructive-action control.

### 5. Visual Design Check
Modern and sleek — nested radii, pill severity badge, pulsing critical border, countdown microcopy, and a divided action row read as a polished confirmation card. Breathing room is generous, typography hierarchy (bold title / muted description / semibold values) is clear, and the divider above actions is present. The chart-5 severity-high text color is an inconsistency a sharp reviewer would catch, and the sub-44px buttons would fail a mobile audit. Overall it would largely pass a HeroUI/Vercel-style showcase with minor polish.

Verdict: **adequate**

### 6. Fixes Needed
1. **Line 83** — current: `color: var(--cg-color-chart-5);` → fixed: `color: var(--cg-color-status-error-text-default);` — Why: a chart-data palette color is being used as severity-high text. It is semantically wrong (chart tokens are not status tokens) and risks failing contrast on the error background. Align with the `.critical` text color.
2. **Line 157** — current: `box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);` → fixed: `box-shadow: 0 0 0 var(--cg-border-width-300) var(--cg-color-focus-ring);` — Why: removes the bare magic `3px` and uses the dedicated `--cg-color-focus-ring` semantic token instead of a generic overlay accent. (If a 3px-exact width token is unavailable, keep `2px` via `--cg-border-width-100`, but the magic px must be tokenized.)
3. **Line 44** — current: `animation: pulse-border 2s ease-in-out infinite;` → fixed: `animation: pulse-border var(--cg-transition-duration-slow) var(--cg-transition-easing-ease-in-out) infinite;` — Why: raw `2s` duration and `ease-in-out` keyword bypass the motion-token system. (Confirm `--cg-transition-duration-slow` resolves to the intended ~2s; otherwise a dedicated long-loop duration token should be added.)
4. **Line 144 (buttons)** — current: `padding: var(--cg-spacing-8) var(--cg-spacing-16);` → fixed: add `min-height: var(--cg-component-button-height-md);` to the `button` rule — Why: buttons currently compute to ~30px tall, below the 44px minimum touch target for a destructive-action control. Use the tier-3 button-height token to guarantee a compliant target.

Recommended (not hard violations): use `--cg-color-surface-cards-hover-background` instead of a border token for `.btn-cancel:hover` (167); use `--cg-color-action-primary-background-hover` instead of `filter: brightness(0.9)` (172); replace `line-height: 1.5` with `var(--cg-line-height-normal)` (94); replace `--cg-color-input-text-placeholder` muted-text reuse (93, 115, 127) with a surface muted-text token; and wire Escape-to-cancel + autofocus the dialog on open for stronger `alertdialog` semantics.

### Research-backed enhancements

- **Make the preview the confirmation, not a "Are you sure?" gate.** Render the actual payload (drafted email with recipient/subject/body, the SQL to run, the files to delete) inline rather than a generic prompt. The preview itself IS the consent surface ([Smashing Magazine — Designing Agentic AI](https://www.smashingmagazine.com/2026/02/designing-agentic-ai-practical-ux-patterns/)). Add a `payload` slot/diff region styled like a shadcn-style bordered card with `--cg-color-surface-raised` and monospace for code-type actions.

- **Add risk-proportional friction via a `risk` prop (low | medium | high).** Low-risk auto-resolves with a subtle toast-style receipt, medium shows the compact preview, high requires an explicit destructive-styled confirm. This "Autonomy Dial / progressive authorization" pattern means the component shouldn't render the same heavy modal for every action ([Mantlr — AI Agent UX Patterns](https://mantlr.com/blog/designing-for-ai-agents-ux-patterns-2026)). Drive the confirm button color from `--cg-color-action-danger-*` only when `risk="high"`.

- **Three explicit paths, not binary approve/cancel.** Offer "Proceed", "Edit", and "Handle it myself" (override) as the action row, matching the Intent Preview control pattern that builds trust by letting the user modify instead of rubber-stamp ([Smashing Magazine](https://www.smashingmagazine.com/2026/02/designing-agentic-ai-practical-ux-patterns/)). The Edit path should make the preview fields contenteditable/editable inline so the user feels like a collaborator.

- **Add an editable/inline-edit state to the state matrix.** Currently likely missing: `previewing → editing → confirmed/rejected/executing → executed/failed`. The `editing` state turns the static preview into form inputs; `executing` shows a Linear-style determinate or shimmer progress on the confirm button itself rather than a separate spinner.

- **Emit an action receipt on completion.** After execution, collapse the preview into a compact receipt row showing what changed, where, and a **rollback/undo** affordance ([Smashing Magazine — action receipts](https://www.smashingmagazine.com/2026/02/designing-agentic-ai-practical-ux-patterns/)). Use a Vercel-style success chevron + one-line summary with a ghost "Undo" button that stays available for a grace window.

- **Micro-interaction polish on resolve.** On Proceed, animate the preview card's height collapse + cross-fade to the receipt (respect `prefers-reduced-motion`), with explicit `transition` property lists (height, opacity) per the token guardrails — never `transition: all`. A subtle 1px border-color shift from neutral to `--cg-color-status-success-border` reinforces the committed action without a disruptive modal flash (Linear/HeroUI confirmation aesthetic).

### Playground proposal

Recommend a playground example that exercises the critical path and countdown, since those are the component's differentiators: <ai-action-preview heading="Delete production dataset" description="This permanently removes all rows. This action cannot be undone." severity="critical" action="delete-dataset" confirmLabel="Delete forever" cancelLabel="Keep data" countdown="8" .details=${{Dataset: 'prod-v2', Rows: '14,200', Owner: 'data-platform'}}></ai-action-preview>. Add a second muted example with severity="medium" and no countdown to show the non-destructive variant. Current default (low severity, no countdown) under-sells the component; default it to severity="high" with details populated so reviewers see the badge, divider, and key-value list.

---
*cleanliness: needs-work | fixes proposed: 4*
