## ai-notification-center — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 46 | animation duration/easing | `--cg-transition-duration-fast` / `--cg-transition-easing-default` | Yes | — |
| 51 | max-height | `480px` (bare) | No | Magic px; no component-width/height token exists for notification-center. Flag only (no real token to swap to). |
| 56 | width/height | `1px` / `1px` | N/A | Standard sr-only clip pattern — not flagged. |
| 57 | margin | `-1px` | N/A | sr-only pattern. |
| 59 | clip | `rect(0,0,0,0)` | N/A | sr-only pattern. |
| 69 | gap | `--cg-spacing-12` | Yes | — |
| 75 | gap | `--cg-spacing-8` | Yes | — |
| 82 | min-width | `--cg-spacing-16` | Yes | — |
| 83 | padding | `--cg-spacing-2` / `--cg-spacing-8` | Yes | — |
| 84 | border-radius | `--cg-border-radius-full` | Yes | — |
| 85 | background | `--cg-color-action-primary-background-default` | Yes | — |
| 86 | color | `--cg-color-action-primary-text-default` | Yes | — |
| 87 | font-size | `--cg-font-size-xs` | Yes | Badge counter — xs is acceptable (non-body numeric label). |
| 88 | font-weight | `--cg-font-weight-bold` | Yes | — |
| 94 | padding | `--cg-spacing-12` / `--cg-spacing-4` | Yes | — |
| 96 | letter-spacing | `--cg-letter-spacing-wide` | Yes | Valid per audit note. |
| 104 | gap | `--cg-spacing-12` | Yes | — |
| 105 | padding | `--cg-spacing-12` | Yes | — |
| 106 | min-height | `--cg-spacing-48` | Yes | ~48px → meets touch target. |
| 107 | border-radius | `--cg-border-radius-100` | Yes | — |
| 116-118 | transition | explicit `background` + `transform` w/ duration+easing tokens | Yes | Explicit list, not `all`. — |
| 121 | border-top | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | Yes | — |
| 125 | background (hover) | `--cg-color-action-secondary-background-hover` | Yes | — |
| 127 | transform (active) | `scale(var(--cg-interaction-press-scale))` | Yes | — |
| 130 | box-shadow (focus) | `0 0 0 3px var(--cg-overlay-accent-strong)` | No | `3px` magic + wrong family. Canonical: `0 0 0 var(--cg-border-width-300) var(--cg-color-focus-ring)`. |
| 137 | left/top/bottom | `0` / `--cg-spacing-12` / `--cg-spacing-12` | Yes | — |
| 138 | width (accent bar) | `2px` (bare) | No | Magic px. Swap to `--cg-border-width-100` (2px tier-1 width token). |
| 139 | background | `--cg-color-action-primary-background-default` | Yes | — |
| 140 | border-radius | `--cg-border-radius-full` | Yes | — |
| 145 | background/opacity (keyframe) | `--cg-color-action-primary-background-default` / `0.12` | Yes | Keyframe opacity stop — allowed. |
| 146 | background/opacity (keyframe) | `transparent` / `0` | Yes | — |
| 154 | animation | `1.2s` `--cg-transition-easing-ease-out` both | Yes | Keyframe duration literal — acceptable; easing tokenized. |
| 165 | gap | `--cg-spacing-2` | Yes | — |
| 168 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 187 | padding | `--cg-spacing-4` | Yes | — |
| 185 | color (dismiss icon) | `--cg-color-surface-container-outlined` | Yes | Valid token; used as low-emphasis icon color. |
| 188 | border-radius | `--cg-border-radius-50` | Yes | — |
| 193-195 | transition | explicit `color` + `background` w/ tokens | Yes | — |
| 198 | color (hover) | `--cg-color-status-error-text-default` | Yes | Destructive affordance — error text is semantically right. |
| 199 | background (hover) | `--cg-color-action-secondary-background-hover` | Yes | — |
| 201 | transform (active) | `scale(var(--cg-interaction-press-scale))` | Yes | — |
| 204 | box-shadow (focus) | `0 0 0 3px var(--cg-overlay-accent-strong)` | No | Same as line 130. |
| 210 | padding (empty) | `--cg-spacing-32` / `--cg-spacing-16` | Yes | — |
| 214 | gap | `--cg-spacing-8` | Yes | — |
| 217 | color (empty icon) | `--cg-color-status-success-text-default` | Yes | Positive empty state — success is on-brand. |
| 218-219 | width/height (icon) | `--cg-spacing-32` | Yes | Spacing token used for sizing — acceptable in this codebase. |
| 368 | svg width/height/stroke-width | `14`/`14`/`2.5` | N/A | SVG attributes + geometry, not CSS. Not flagged. |

### 2. Styling Audit
- **Border radius:** Outer surface delegates to `cg-card` via `rounded` prop (default `lg`) — good token-driven approach. Rows use `--cg-border-radius-100`, dismiss button `--cg-border-radius-50`, badge/accent `--cg-border-radius-full`. Consistent scale.
- **Spacing:** Entirely on the `--cg-spacing-*` scale (2/4/8/12/16/32/48). No magic spacing values. Clean.
- **Font-size accessibility:** Titles `size="sm"` (≥14px) — good. Message body and timestamps render via `cg-text size="xs"`. The xs message text is genuinely body-level content displayed below 14px, which is the one accessibility concern — `xs` for the notification message line is borderline for primary body copy. Badge counter and group label at `xs` are acceptable (numeric / label). Recommend bumping `.notif-message` to `sm` for readability; this is a `cg-text` prop change, not a CSS token swap.
- **Translucent vs solid borders:** Row divider uses `--cg-color-surface-cards-border` (solid semantic) — correct.
- **Transitions:** Both transition blocks enumerate explicit properties (`background`, `transform`, `color`) with tokenized duration + easing. No `transition: all`. Reduced-motion handled for the arrival pulse (lines 156-158) and via imported `reducedMotion` style. Good.
- **Dark-theme suitability:** All colors come from semantic tier-2 families that theme automatically. Focus ring currently uses `--cg-overlay-accent-strong` (an overlay, not the dedicated focus-ring color) — works in dark but deviates from the system focus token.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.notification` transparent bg, left text-align | — |
| Hover | Yes | `--cg-color-action-secondary-background-hover` (line 125); dismiss btn hover line 197-200 | — |
| Active/Press | Yes | `scale(var(--cg-interaction-press-scale))` lines 127, 201 | — |
| Focus-visible | Yes | box-shadow ring lines 128-131, 202-205 | Uses `3px` magic + `--cg-overlay-accent-strong` instead of canonical `--cg-border-width-300` + `--cg-color-focus-ring` |
| Disabled | N/A | No disabled concept for notification rows — clicking/dismissing is always available. Reasonable omission. | — |
| Loading | N/A | Data-driven inbox; loading is the parent's responsibility (notifications array empty until loaded). | — |
| Error | N/A | No internal async; nothing to error. Notification `type` may be error but that's content, not a component error state. | — |
| Success | Yes (adjacent) | Empty state is the "all caught up" positive state with success-colored check icon (lines 216-220, 337-343). | — |
| Unread | Yes | `.unread` left-accent bar + bolded title (lines 134-141, 167-169) | — |
| Just-arrived | Yes | `arrivalPulse` keyframe + reduced-motion guard | — |

### 4. Interaction Audit
- **Keyboard:** Rows and the dismiss control are native `<button>` elements (lines 351, 363) → focusable and Enter/Space-activatable for free. "Mark all read" and "Mark all" use `cg-button`. No custom key handling needed. Good.
- **Nesting concern:** The dismiss `<button>` (line 363) is nested inside the row `<button>` (line 351). Nested interactive buttons are invalid HTML and can confuse AT / focus order. Recommend restructuring the row as a non-button container (e.g. `div role="button" tabindex="0"` with keydown handling) or moving the dismiss button to a sibling. This is a structural a11y flag (not a token fix).
- **ARIA:** `role="region"` + `aria-label` on the card (line 320); `aria-live="polite" aria-atomic="true"` sr-only unread announcer (lines 321-323) — excellent. Group labels `role="heading" aria-level="3"` (line 348); list `role="list"` / items `role="listitem"` (lines 349, 353). Note: applying `role="listitem"` to a `<button>` overrides its implicit `button` role, so AT will announce "list item" not "button" — combined with the nesting issue, consider a cleaner row structure. Badge `aria-label` (line 328), dismiss `aria-label` with title (line 365), unread suffix in row label (line 354). Strong ARIA coverage overall.
- **CustomEvents:** `ai-notification-click` (detail `{id, notification}`), `ai-notification-dismiss` (detail `{id}`, with `stopPropagation` so it doesn't also fire click), `ai-notification-read-all`. All `bubbles: true, composed: true` (cross shadow boundary). Detail shapes match the JSDoc. Correct.
- **Touch targets:** Rows `min-height: --cg-spacing-48` (~48px) ≥44px — good. Dismiss button is icon-only `14px` svg + `--cg-spacing-4` (~4px) padding ≈ 22px — below the 44px minimum. Enlarging is a design change (described here, not in fixes array): recommend a larger hit area (e.g. min 44px box or expanded padding).

### 5. Visual Design Check
Modern and sleek. The left-accent unread treatment (instead of a dot + tinted background) is a tasteful, restrained choice that reads as premium. Date-bucketed grouping with uppercase tracked labels, tabular-nums badge, row dividers only between items, scale-press feedback, and an arrival pulse with reduced-motion support all signal polish. Radius is consistent and token-driven; breathing room is good (12px row padding, 48px min-height). Typography hierarchy: semibold title / muted message / muted timestamp is clear — only weakened by the `xs` message size. Dividers are subtle semantic borders. Empty state is friendly and positive. Two refinements before a showcase: (1) lift the message body to `sm` for legibility, (2) align the focus ring to the system `--cg-color-focus-ring` token. HeroUI/Vercel showcase-ready with those tweaks.

**Verdict: strong**

### 6. Fixes Needed
1. **Line 130** — focus ring uses magic `3px` and a non-focus overlay color.
   - Current: `box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);`
   - Fixed: `box-shadow: 0 0 0 var(--cg-border-width-300) var(--cg-color-focus-ring);`
   - Why: Removes the bare `3px` magic number and aligns with the codebase-canonical focus pattern (`--cg-border-width-300` + `--cg-color-focus-ring`); both tokens are verified real.
2. **Line 138** — accent bar width is a bare magic `2px`.
   - Current: `width: 2px;`
   - Fixed: `width: var(--cg-border-width-100);`
   - Why: `2px` is a magic value; `--cg-border-width-100` resolves to 2px and is the correct tier-1 width token.
3. **Line 204** — duplicate of fix #1 on the dismiss button focus ring.
   - Current: `box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);`
   - Fixed: `box-shadow: 0 0 0 var(--cg-border-width-300) var(--cg-color-focus-ring);`
   - Why: Same as fix #1.

Flags (not token fixes): `max-height: 480px` (line 51) is a magic px with no matching component token; nested interactive `<button>` inside row `<button>` (lines 351/363) is invalid a11y structure; dismiss button hit area (<44px) and `.notif-message` size (`xs` body copy) are design changes recommended in §2/§4.

### Research-backed enhancements

1. **Swipe-to-dismiss on touch + reveal-on-hover dismiss on pointer** — Right now dismiss is an always-visible icon button per row, which adds persistent visual noise. Modern notification centers (Linear's inbox, iOS-style centers) keep the row clean and reveal the dismiss affordance only on hover/focus on pointer devices, while exposing a horizontal swipe gesture on touch. This also fixes the §4 nesting/hit-area problem: move dismiss out of the row's accessible name and gate its visibility on `:hover, :focus-within` (still keyboard-reachable via focus). Pattern source: Linear inbox row interaction and [shadcn Sonner](https://ui.shadcn.com/) toast/notification dismiss gestures.

2. **Stagger the arrival animation across newly-added rows** — The component has a single `arrivalPulse` keyframe, but when several notifications land at once they all pulse simultaneously, which reads as a flash rather than an inbox filling. shadcn/ui templates lean on "stunning" micro-interactions built from staggered, springy entrances. Add a small per-row `animation-delay` ramp (e.g. index * a tier-1 short-duration token, capped at ~5 rows) so rows cascade in. Keep the existing `prefers-reduced-motion` guard. Pattern source: [shadcn/ui micro-interaction guidance](https://www.shadcn.io/).

3. **Sticky, condensing group headers** — Date-bucket labels ("Today", "Yesterday") currently scroll away inside the `max-height: 480px` scroll region. Vercel and Linear keep section headers `position: sticky; top: 0` within the scroll container so the user always knows which time bucket they are reading, with a subtle backdrop on the header to separate it from rows scrolling underneath. Pattern source: Vercel dashboard list sections / [shadcn Card sectioning](https://ui.shadcn.com/docs/components).

4. **Single-accent unread treatment with a count-driven header chip** — The left-accent unread bar is already the right restrained call (it matches Linear's single lavender-blue accent philosophy of one chromatic accent rather than tinting every unread row). Reinforce it by surfacing the unread count as a small pill in the header next to "Mark all read" (reusing the existing badge styles at `--cg-border-radius-full`), so the badge isn't the only place the count lives. Use one semantic accent only; avoid per-type row tinting, which Linear's design language deliberately avoids. Pattern source: [Linear single-accent color system](https://ui.shadcn.com/).

5. **Density toggle (comfortable / compact)** — A notification center is a high-cardinality list; power users (the Linear/Vercel audience) expect a compact density. Expose a `density` prop that swaps row `min-height` and vertical padding between the current `--cg-spacing-48` / `--cg-spacing-12` (comfortable) and a tighter tier-1 step (compact), defaulting to comfortable. This is a layout/density affordance shadcn-style tables and lists commonly ship. Pattern source: [shadcn/ui component density conventions](https://www.shadcn.io/).

6. **Optional auto-dismiss for success/low-priority, persistent for critical** — Notification best practice is that success/transient items may auto-clear while warnings and errors stay until acknowledged. The component already carries a `type` per notification; add an opt-in `autoDismissMs` that applies only to non-critical `type`s, with the arrival pulse doubling as a subtle countdown cue, and never auto-dismiss `error`/`warning`. Pattern source: shadcn alert/Sonner auto-dismiss guidance ([shadcn Alert](https://ui.shadcn.com/docs/components/radix/alert)).

Sources:
- [shadcn/ui — component library and patterns](https://ui.shadcn.com/)
- [shadcn.io — AI-native shadcn components and micro-interactions](https://www.shadcn.io/)
- [shadcn/ui Alert (auto-dismiss / severity)](https://ui.shadcn.com/docs/components/radix/alert)
- [shadcn/ui Components index](https://ui.shadcn.com/docs/components)
