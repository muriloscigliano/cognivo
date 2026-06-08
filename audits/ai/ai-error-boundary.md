## ai-error-boundary — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 26 | animation duration | `--cg-transition-duration-default` | Yes | — |
| 26 | animation easing | `--cg-transition-easing-ease-out` | Yes | — |
| 31 | background | `--cg-color-surface-container-background` | Yes | — |
| 32 | border-width | `--cg-border-width-50` | Yes | — |
| 32 | border color | `--cg-color-status-error-border-default` | Tier OK, family wrong | Use AI-state `--cg-color-ai-error-border` (AI lifecycle error) |
| 33 | border-radius | `--cg-border-radius-150` | Yes | — |
| 34 | padding | `--cg-spacing-16` | Yes | — |
| 40 | gap | `--cg-spacing-12` | Yes | — |
| 41 | margin-bottom | `--cg-spacing-12` | Yes | — |
| 45 | font-size | `--cg-font-size-2xl` | Yes | — |
| 47 | line-height | `1` (unitless) | Yes | — (not a violation) |
| 58 | gap | `--cg-spacing-8` | Yes | — |
| 63 | title color | `--cg-color-status-error-text-default` | Tier OK, family wrong | Use `--cg-color-ai-error-text` |
| 64 | font-size | `--cg-font-size-sm` | Yes | — |
| 65 | font-weight | `--cg-font-weight-bold` | Yes | — |
| 70 | padding | `--cg-spacing-2` `--cg-spacing-8` | Yes | — |
| 71 | border-radius | `--cg-border-radius-50` | Yes | — |
| 72 | badge background | `--cg-color-status-error-background-default` | Tier OK, family wrong | Use `--cg-color-ai-error-background` |
| 73 | badge color | `--cg-color-status-error-text-default` | Tier OK, family wrong | Use `--cg-color-ai-error-text` |
| 74 | font-size | `--cg-font-size-xs` | Yes | — |
| 75 | font-weight | `--cg-font-weight-bold` | Yes | — |
| 76 | font-family | `--cg-font-family-mono` | Yes | — |
| 77 | letter-spacing | `--cg-letter-spacing-wide` | Yes (real tier-1 token) | — |
| 81 | message color | `--cg-color-surface-container-outlined` | Yes | — |
| 82 | font-size | `--cg-font-size-sm` | Yes | — |
| 83 | line-height | `--cg-line-height-relaxed` | Yes | — |
| 84 | margin-top | `--cg-spacing-6` | Yes | — |
| 90 | toggle color | `--cg-color-surface-container-outlined` | Yes | — |
| 91 | font-size | `--cg-font-size-xs` | Yes | — |
| 93 | padding | `--cg-spacing-4` `0` | Yes | — |
| 94 | margin-top | `--cg-spacing-8` | Yes | — |
| 97 | text-underline-offset | `--cg-spacing-2` | Yes | — |
| 99 | hover color | `--cg-color-surface-base-text` | Yes | — |
| 102 | box-shadow spread | `0 0 0 3px var(--cg-overlay-accent-strong)` | Color OK; `3px` is bare | Flag (no 3px spacing token; see §6) |
| 103 | border-radius | `--cg-border-radius-50` | Yes | — |
| 107 | margin-top | `--cg-spacing-8` | Yes | — |
| 108 | padding | `--cg-spacing-12` | Yes | — |
| 109 | details background | `--cg-color-code-background` | Yes | — |
| 110 | border-radius | `--cg-border-radius-100` | Yes | — |
| 111 | details color | `--cg-color-surface-container-outlined` | Yes | — |
| 112 | font-size | `--cg-font-size-xs` | Yes | — |
| 113 | font-family | `--cg-font-family-mono` | Yes | — |
| 114 | line-height | `--cg-line-height-relaxed` | Yes | — |
| 120 | padding-top | `--cg-spacing-12` | Yes | — |
| 121 | border-top width | `--cg-border-width-50` | Yes | — |
| 121 | border-top color | `--cg-color-surface-cards-border` | Yes | — |
| 123 | gap | `--cg-spacing-8` | Yes | — |
| 124 | margin-top | `--cg-spacing-16` | Yes | — |
| 128 | btn padding | `--cg-spacing-8` `--cg-spacing-16` | Yes | — |
| 129 | border-radius | `--cg-border-radius-100` | Yes | — |
| 130 | font-size | `--cg-font-size-sm` | Yes | — |
| 131 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 135 | transition | `filter --cg-transition-duration-fast --cg-transition-easing-default` | Yes (explicit) | — |
| 137 | transform scale | `--cg-interaction-press-scale` | Yes (real tier-1 token) | — |
| 140 | box-shadow spread | `0 0 0 3px var(--cg-overlay-accent-strong)` | Color OK; `3px` is bare | Flag (no 3px spacing token; see §6) |
| 143 | opacity | `0.4` | Allowed (unitless) | — |
| 148 | retry background | `--cg-color-action-primary-background-default` | Yes | — |
| 149 | retry color | `--cg-color-action-primary-text-default` | Yes | — |
| 151 | hover filter | `brightness(1.1)` | Magic number (non-token) | Flag only |
| 154 | dismiss background | `--cg-color-surface-container-background` | Yes | — |
| 155 | dismiss color | `--cg-color-surface-base-text` | Yes | — |
| 156 | dismiss border | `--cg-border-width-50` / `--cg-color-surface-cards-border` | Yes | — |
| 158 | hover filter | `brightness(1.2)` | Magic number (non-token) | Flag only |

### 2. Styling Audit
- **Border radius:** card `--cg-border-radius-150`, buttons/details `--cg-border-radius-100`, badge/focus `--cg-border-radius-50`. Consistent, modern, well-scaled.
- **Spacing:** entirely from the spacing scale (`2/4/6/8/12/16`). No magic numbers. Good rhythm.
- **Font-size accessibility:** title (`sm`), message (`sm`) meet the 14px body minimum. Badge, details, and details-toggle use `xs` — acceptable since they are metadata/code/secondary affordances, not body copy.
- **Translucent vs solid borders:** card and divider borders use solid semantic tokens; focus uses translucent `--cg-overlay-accent-strong`. Appropriate.
- **Transitions explicit vs all:** transition is explicit (`filter ...`). No `transition: all`. Motion tokens used. `:host` animation honors `reducedMotion`. Good.
- **Dark-theme suitability:** all colors come from semantic tier-2 tokens that flip with theme. Dark-first safe.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.error-card` base styles | — |
| Hover | Yes | `.details-toggle:hover`, `.retry-btn:hover`, `.dismiss-btn:hover` | Uses `filter: brightness()` magic numbers rather than `-hover` semantic tokens (e.g. `--cg-color-action-primary-background-hover` exists) |
| Active/Press | Yes | `.btn:active:not(:disabled)` scale via `--cg-interaction-press-scale` | — |
| Focus-visible | Yes | `.details-toggle:focus-visible`, `.btn:focus-visible` box-shadow ring | Ring spread is bare `3px`; `--cg-color-focus-ring` exists but `--cg-overlay-accent-strong` is acceptable |
| Disabled | Yes | `.btn:disabled` opacity + cursor | Disabled state is styled but no button is ever rendered with `disabled` attribute — currently dead style |
| Loading | N/A | — | Component renders a settled error; no async loading phase |
| Error | Yes | Entire component is the error surface; `role="alert"` `aria-live="assertive"` | Uses generic `status-error` family instead of dedicated `ai-error` family (see §6) |
| Success | N/A | — | Not a success-bearing component |

### 4. Interaction Audit
- **Keyboard:** all interactive elements are native `<button>` — Enter/Space activation and Tab order work for free. Details toggle is a real button. Good.
- **ARIA:** `role="alert"` + `aria-live="assertive"` on the card surfaces the error to AT immediately. `aria-expanded` bound to `_showDetails` on the toggle. Icon `aria-hidden="true"`. Solid.
- **Labels:** buttons have visible text labels ("Retry", "Dismiss", "Show/Hide details"). No icon-only buttons needing `aria-label`.
- **CustomEvents:** `ai-error-retry` and `ai-error-dismiss` dispatched with `{ bubbles: true, composed: true }` — escape Shadow DOM correctly. No `detail` payload is included; consider attaching `{ code }` for consumers, but not required.
- **Touch targets:** buttons are `--cg-spacing-8` (8px) vertical padding + `sm` font ≈ ~32px tall, below the 44px guideline. The details-toggle (text link, `--cg-spacing-4` padding) is also under 44px. Enlargement is a design change, noted here, not a token fix.

### 5. Visual Design Check
Modern and clean: warning triangle icon, error-tinted card, monospaced code badge, expandable details in a code surface, and a clear primary/secondary button pair with a top divider. Radius scale is tasteful, spacing breathes, typography hierarchy (bold title → relaxed message → xs mono metadata) reads well. The one substantive gap is that an AI-native error boundary leans on the generic `status-error` palette instead of the dedicated `ai-error` family, so it does not visually signal "AI failure" distinctly from a generic form error. Hover relies on `filter: brightness` rather than semantic hover tokens. Verdict: **strong**.

### 6. Fixes Needed
1. **Line 32** — `border: var(--cg-border-width-50) solid var(--cg-color-status-error-border-default);` → `border: var(--cg-border-width-50) solid var(--cg-color-ai-error-border);` — AI-lifecycle error state should use the dedicated AI-error semantic family, not generic status-error.
2. **Line 63** — `color: var(--cg-color-status-error-text-default);` → `color: var(--cg-color-ai-error-text);` — same AI-state family rule (title).
3. **Line 72** — `background: var(--cg-color-status-error-background-default);` → `background: var(--cg-color-ai-error-background);` — code badge background should use AI-error family.
4. **Line 73** — `color: var(--cg-color-status-error-text-default);` → `color: var(--cg-color-ai-error-text);` — code badge text should use AI-error family.

Flags (no verified token replacement — not auto-fixed):
- Lines 102 & 140: focus-ring `box-shadow` spread uses bare `3px`. No 3px spacing token exists (`--cg-spacing-4` = 4px), so left as-is; the color token is valid.
- Lines 151 & 158: hover uses `filter: brightness(1.1 / 1.2)` magic numbers. Prefer semantic hover tokens (`--cg-color-action-primary-background-hover` exists for the retry button); dismiss hover has no clean container-hover equivalent. Design refinement, not a hard token violation.
- Buttons (~32px tall) and the text-link details toggle fall below the 44px touch-target guideline — enlargement is a design change, not a token fix.
- CustomEvents carry no `detail` payload; consider `{ detail: { code } }` for consumers.

### Research-backed enhancements

Sourced from current (2025) error-boundary and fallback-UI patterns in the shadcn/ui, Vercel, and Linear ecosystems.

1. **Subtree-scoped fallback, not full-screen takeover.** The React/Radix pattern adopted by Vercel and Linear is that only the affected subtree renders a fallback while the rest of the app stays interactive ([bvaughn/react-error-boundary](https://github.com/bvaughn/react-error-boundary), [OneUptime](https://oneuptime.com/blog/post/2026-02-20-react-error-boundaries/view)). This component should explicitly support a `compact`/`inline` density variant (a single error-tinted row with icon + message + retry) for when it wraps a small widget, versus the current card that reads as a page-level event. Drive it via a `variant="inline|card"` attribute mapped to a tier-3 token like `--cg-component-ai-error-boundary-padding`.

2. **`reset` as a first-class affordance with state, not just a fire-and-forget event.** shadcn/ui's `FallbackComponent` pattern passes a `resetErrorBoundary()` function and the retry button should reflect its lifecycle ([bvaughn/react-error-boundary](https://github.com/bvaughn/react-error-boundary)). Right now `.btn:disabled` is dead style. Wire it up: on retry-click, set the button to a `loading` state (spinner + "Retrying…", `disabled`), so the existing disabled style finally earns its keep and users get feedback that the reset is in flight rather than re-clicking.

3. **Micro-interaction on entrance + the error icon.** The `:host` already animates in. Modern Linear/Vercel error surfaces add a brief one-shot emphasis on the status glyph (a single subtle shake or scale-pop, ~200ms, `--cg-transition-duration-default`) gated behind `prefers-reduced-motion` ([shadcn/ui anatomy, Vercel Academy](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components)). This draws the eye to the warning triangle without being noisy, and the component already honors `reducedMotion` so the guardrail is in place.

4. **Replace `filter: brightness()` hovers with semantic hover tokens + a press-state ring.** The class-variance-authority styling discipline in shadcn/ui keeps interactive states on named tokens, not ad-hoc filters ([Certificates.dev](https://certificates.dev/blog/starting-a-react-project-shadcnui-radix-and-base-ui-explained)). Swap lines 151/158 to `--cg-color-action-primary-background-hover` and a surface-container-hover equivalent. This also resolves the §1 magic-number flags, so it is both an aesthetic and a token-governance win.

5. **Copy-error-details affordance in the expandable section.** Vercel's and v0's production fallbacks pair the technical detail block with a one-click "Copy error" control so users can paste into a bug report ([Vercel v0 review, Skywork](https://skywork.ai/blog/vercel-v0-dev-review-2025-ai-ui-react-tailwind/)). Add an icon-button (with `aria-label="Copy error details"`) inside the `<details>` code surface that copies `{ code, message, stack }`; show a transient "Copied" confirmation. Pairs naturally with the §4 suggestion to attach `{ code }` to the dispatched events.

6. **Meet the 44px touch target via a tier-3 control-height token.** The current ~32px buttons and text-link toggle sit below the guideline. Modern shadcn-derived systems define a `--*-control-height` token rather than hand-tuning padding ([Vercel Academy core concepts](https://vercel.com/academy/shadcn-ui/core-concepts)). Introduce `--cg-component-ai-error-boundary-action-min-height: 44px` (or reuse a shared control-height token) on `.btn` and promote the details toggle from a text link to a properly padded button so the whole control row is comfortably tappable.

Sources:
- [The Anatomy of shadcn/ui Components — Vercel Academy](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components)
- [Core Concepts — Vercel Academy](https://vercel.com/academy/shadcn-ui/core-concepts)
- [bvaughn/react-error-boundary](https://github.com/bvaughn/react-error-boundary)
- [How to Implement React Error Boundaries for Resilient UIs — OneUptime](https://oneuptime.com/blog/post/2026-02-20-react-error-boundaries/view)
- [Starting a React Project: shadcn/ui, Radix, Base UI — Certificates.dev](https://certificates.dev/blog/starting-a-react-project-shadcnui-radix-and-base-ui-explained)
- [Vercel v0.dev Review 2025 — Skywork](https://skywork.ai/blog/vercel-v0-dev-review-2025-ai-ui-react-tailwind/)
