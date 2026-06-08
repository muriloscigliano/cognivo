## ai-alert-card — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 32 | animation duration/easing | `--cg-transition-duration-fast` / `--cg-transition-easing-default` | Yes | — |
| 36 | background | `--cg-color-surface-cards-background` | Yes | — |
| 37 | border width/color | `--cg-border-width-50` / `--cg-color-surface-cards-border` | Yes | — |
| 38 | border-radius | `--cg-border-radius-200` | Yes | — |
| 39 | padding | `--cg-spacing-16` x3 / `--cg-spacing-20` | Yes | — |
| 42 | gap | `--cg-spacing-12` | Yes | — |
| 44 | border-left width | `--cg-border-width-200` | NO | `--cg-border-width-200` is NOT in the tier-1 vocab (only 0/50/75/100/300 exist). Made-up token. Use `--cg-border-width-300`. |
| 45-47 | transition | explicit `box-shadow` + `transform`, fast/default | Yes | Explicit list, not `transition: all`. Good. |
| 50 | transform | `translateY(-1px)` | Borderline | Raw `-1px` micro-nudge; acceptable hover lift, common pattern. |
| 51 | box-shadow | `--cg-elevation-2` | NO | `--cg-elevation-*` is NOT in any vocab file. Made-up/unverified token. No elevation tokens exist in the provided vocab. |
| 55 | border-left-color | `--cg-color-status-info-text-default` | Yes | — |
| 56 | border-left-color | `--cg-color-status-warning-text-default` | Yes | — |
| 57 | border-left-color | `--cg-color-status-error-border-default` | Yes | — |
| 61 | box-shadow ring | `0 0 0 2px var(--cg-color-surface-base-background)` | Borderline | Raw `2px` spread in focus ring — acceptable ring pattern. Token valid. |
| 62 | box-shadow ring | `0 0 0 3px var(--cg-overlay-accent-strong)` | Partial | Token valid, but focus ring should use `--cg-color-focus-ring` (the documented @cssprop on line 20). Overlay-accent is a doc/impl mismatch. Raw `3px` spread acceptable. |
| 65 | border-left-color | `--cg-color-status-error-text-default` | Yes | — |
| 66 | animation duration | `--cg-transition-duration-slower` | NO | `--cg-transition-duration-slower` does NOT exist (only fast/default/slow). Made-up token. Use `--cg-transition-duration-slow`. |
| 72 | transform | `translateY(-8px) scale(0.97)` | Borderline | `-8px`/`0.97` are @keyframes exit motion values — acceptable raw animation values. |
| 75 | animation | `--cg-transition-duration-default` / `--cg-transition-easing-ease-in` | Yes | — |
| 81 | font-size (icon) | `--cg-font-size-xl` | Yes | Decorative icon, fine. |
| 83 | margin-top | `--cg-spacing-2` | Yes | — |
| 85-88 | icon color | status-info/warning/error tokens | Yes | — |
| 96 | gap | `--cg-spacing-8` | Yes | — |
| 97 | margin-bottom | `--cg-spacing-6` | Yes | — |
| 100 | title font-size | `--cg-font-size-base` | Yes | — |
| 101 | font-weight | `--cg-font-weight-bold` | Yes | — |
| 102 | title color | `--cg-color-surface-base-text` | Yes | — |
| 107 | gap | `--cg-spacing-4` | Yes | — |
| 108 | padding | `--cg-spacing-2` / `--cg-spacing-8` | Yes | — |
| 109 | border-radius | `--cg-border-radius-full` | Yes | Pill deadline badge. |
| 110 | deadline font-size | `--cg-font-size-xs` | Yes | Badge/meta text, xs acceptable (not body). |
| 111 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 112 | background | `--cg-overlay-dark-subtle` | Yes | — |
| 113 | color | `--cg-color-surface-base-text` | Yes | — |
| 118 | message font-size | `--cg-font-size-sm` | Yes | 14px min body — at the floor, compliant. |
| 119 | message color | `--cg-color-input-text-placeholder` | NO | Semantic misuse: this is alert body text, not an input placeholder. Use a card-surface muted text token, e.g. `--cg-color-surface-cards-subtle`. |
| 120 | line-height | `--cg-line-height-normal` | Yes | — |
| 121-122 | padding/margin bottom | `--cg-spacing-12` | Yes | — |
| 123 | border-bottom | `--cg-border-width-50` / `--cg-color-surface-cards-divider` | Yes | Proper divider token. |
| 129-130 | dismiss position | `--cg-spacing-8` | Yes | — |
| 140-141 | keyframe border colors | status-error text/border tokens | Yes | — |
| 145 | border-radius | `0` | OK | `0` literal is allowed; `--cg-border-radius-none` exists but raw 0 is acceptable. |
| 146-149 | border-radius | `--cg-border-radius-50/100/200/full` | Yes | — |

Summary: mostly clean and well-tokenized, but **four real defects**: `--cg-border-width-200` (line 44, nonexistent), `--cg-elevation-2` (line 51, nonexistent in vocab), `--cg-transition-duration-slower` (line 66, nonexistent), and a semantic color misuse on line 119.

### 2. Styling Audit
- **Border radius**: `--cg-border-radius-200` default with a full rounded-variant set — appropriate and flexible. Good.
- **Spacing**: Generous and consistent (16/20 padding, 12 gap). The extra left padding (20) balances the 2px accent border. Breathing room is good.
- **Font-size accessibility**: Body message at `--cg-font-size-sm` (14px) — exactly at the AA floor, compliant. Deadline at xs is meta text, acceptable. Title at base — good hierarchy.
- **Translucent vs solid borders**: Card border and divider use solid semantic tokens; accent left-border uses status colors. Good. Deadline badge uses `--cg-overlay-dark-subtle` (translucent) — fits dark theme.
- **Transitions**: Explicit property list (box-shadow, transform), NOT `transition: all`. Motion tokens used throughout — except the made-up `--cg-transition-duration-slower` on line 66. Reduced-motion handled (lines 133-137).
- **Dark-theme background**: `--cg-color-surface-cards-background` is the correct dark-first surface token. Good.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.card` base with surface bg/border | None |
| Hover | Yes | `translateY(-1px)` + `--cg-elevation-2` shadow | Shadow token `--cg-elevation-2` not in vocab |
| Active/Press | No | — | N/A: card itself is not a button; press is handled by inner `cg-button`s. Acceptable. |
| Focus-visible | Yes | `:focus-visible` dual-ring box-shadow | Uses `--cg-overlay-accent-strong` instead of documented `--cg-color-focus-ring` |
| Disabled | No | — | N/A: an alert is not a disableable control. Justified. |
| Loading | No | — | N/A: alert content is static/declarative, no async state. Justified. |
| Error | Yes | `.urgent`/`.critical` urgency variants drive error border + pulse | None (correct status tokens) |
| Success | No | — | N/A: alert urgency scale is info→critical; there is no "success alert" semantic here. Justified — though `--cg-color-status-success-*` exists if a positive variant were ever wanted. |

Urgency variants (info/warning/urgent/critical) are the meaningful state matrix here and are all covered, including an animated `critical` pulse with reduced-motion fallback.

### 4. Interaction Audit
- **Keyboard**: `Escape` dismisses when `dismissible` (lines 185-190). Card is `tabindex="0"` and focusable. Action and dismiss are real `cg-button`s so Enter/Space are handled by the sub-component. No gaps for this component's scope.
- **ARIA**: `role="alert"` on the card (line 196) — correct for a priority alert (assertive live region). `aria-label="<urgency> alert: <title>"` is descriptive. Icon is `aria-hidden="true"`. Deadline has `aria-label="Deadline: ..."`. Dismiss button has `label="Dismiss alert"`. ARIA is solid. Minor: `role="alert"` is auto-announced — fine, but it also has `tabindex="0"` which makes the whole alert focusable; acceptable for keyboard Escape support.
- **CustomEvents**: `ai-alert-action` fires `{title, urgency}` (lines 170-173) and `ai-alert-dismiss` fires `{title}` (lines 178-181). Both `bubbles: true, composed: true` — correct for crossing shadow boundary. Detail payloads are sensible and match the JSDoc on lines 16-17.
- **Touch targets**: Dismiss and action use `cg-button size="sm"`; sizing is delegated to `cg-button` tokens (`--cg-component-button-height-sm`), outside this file. No raw sub-44px target defined here. Assumed compliant via sub-component.

### 5. Visual Design Check
Modern and sleek: yes. The urgency-colored left border, pill deadline badge, hover lift with elevation, animated critical pulse, and fade-slide entrance are all on-trend. Radius is appropriate with a full variant API. Breathing room is generous. A divider separates message from the action row (line 123) — good. Typography hierarchy is clear (bold base title, sm muted message, xs meta). It would pass a HeroUI/Vercel-style showcase, contingent on fixing the broken `--cg-elevation-2` hover shadow (currently the hover lift would render with no shadow, weakening the effect) and the nonexistent duration token. Verdict: **strong**.

### 6. Fixes Needed
1. **Line 51** — `box-shadow: var(--cg-elevation-2);` → no `--cg-elevation-*` token exists in the provided vocab. This breaks the hover shadow (resolves to nothing). Replace with a real elevation/shadow token from the design system, or remove the shadow if none exists. As written it is an unverified/made-up token.
2. **Line 66** — `animation: pulse-glow var(--cg-transition-duration-slower) ...` → `--cg-transition-duration-slower` does not exist. Change to `var(--cg-transition-duration-slow)`.
3. **Line 44** — `border-left: var(--cg-border-width-200) solid transparent;` → `--cg-border-width-200` is not in the tier-1 vocab (valid: 0/50/75/100/300). Change to `var(--cg-border-width-300)`.
4. **Line 119** — `.message { color: var(--cg-color-input-text-placeholder); }` → semantic misuse (input placeholder token on alert body text). Change to `var(--cg-color-surface-cards-subtle)`.
5. **Line 62 (recommended)** — focus ring uses `var(--cg-overlay-accent-strong)` while the documented @cssprop (line 20) and the dedicated `--cg-color-focus-ring` token exist. Change to `var(--cg-color-focus-ring)` for consistency with the focus-ring system and the JSDoc contract.

### Research-backed enhancements

- **Promise/streaming-aware state machine.** Sonner's killer pattern is `toast.promise()` — a single element that transitions loading → success/error inline ([Sonner](https://ui.shadcn.com/docs/components/radix/sonner)). For an AI-native card, add an explicit `pending` state with a shimmering/skeleton leading icon that resolves into the final severity icon, so the same card can represent an in-flight AI action and its outcome without remounting.

- **Severity-driven left accent + tonal surface, not a flat colored box.** The modern shadcn/Linear aesthetic uses a subtle tinted surface (~6-8% severity color) plus a 2px left border accent and a matching monochrome icon, rather than saturated fills ([shadcn Alert](https://www.shadcn.io/ui/alert)). Drive all four variants (`info`/`success`/`warning`/`destructive`) from tier-2 semantic tokens (`--cg-color-status-*`) so density stays calm in a dark-first UI.

- **Swipe-to-dismiss + graceful enter/exit motion.** Sonner ships mobile swipe-to-dismiss and stacked spring transitions ([Sonner](https://www.shadcn.io/ui/sonner)). Add a pointer/touch swipe affordance with a translate+fade exit and a height-collapse so neighbors reflow smoothly. Respect `prefers-reduced-motion` (instant opacity swap) — micro-animations here are the single biggest "sleek" upgrade.

- **Inline action slot with primary/dismiss affordances.** Modern alerts compose with Button/Badge for actionable notices ([shadcn Alert](https://ui.shadcn.com/docs/components/radix/alert)). Expose an `actions` slot (e.g. "Retry", "View details") and a top-right ghost dismiss `×` that only appears on hover/focus — keeps default density tight while remaining keyboard-reachable.

- **Auto-dismiss with severity-scaled timeout + pause-on-hover progress bar.** Best practice is shorter timeouts for success, longer/none for errors ([shadcn Toast](https://ui.shadcn.com/docs/components/radix/toast)). Add an optional thin bottom progress indicator that pauses on hover/focus and resumes on blur, so users never lose an auto-dismissing AI confirmation mid-read.

- **First-class a11y announcement + missing states.** Sonner auto-announces via live regions ([Sonner](https://shadcnstudio.com/docs/components/sonner)). Wire `role="status"` for info/success and `role="alert"` (assertive) for warning/destructive, and add the currently-likely-missing `pending`/`loading` and `empty`/`collapsed` states plus a focus-visible ring on the dismiss control.

### Playground proposal

Show all four urgency levels side by side to exercise the full state matrix, including a critical example (which triggers the pulse animation) and one with a deadline + action:

<ai-alert-card urgency="critical" title="Token budget exceeded" message="Context window is at 98% capacity." deadline="2h remaining" actionLabel="Truncate"></ai-alert-card>
<ai-alert-card urgency="urgent" title="Rate limit approaching" message="You have 50 requests left this minute." actionLabel="Slow down"></ai-alert-card>
<ai-alert-card urgency="warning" title="Stale cache" message="Cached response is 10 minutes old."></ai-alert-card>
<ai-alert-card urgency="info" title="Model updated" message="Now running claude-opus-4-8." dismissible></ai-alert-card>

---
*cleanliness: needs-work | fixes proposed: 5*
