## ai-status-page — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 47 | animation duration/easing | `--cg-transition-duration-fast` / `--cg-transition-easing-default` | Yes | — |
| 59 | gap | `--cg-spacing-12` | Yes | — |
| 66 | padding | `--cg-spacing-12` `--cg-spacing-16` | Yes | — |
| 67 | border-radius | `--cg-border-radius-100` | Yes | — |
| 68 | background | `--cg-color-status-error-background-default` | Yes | — |
| 69 | border | `--cg-border-width-50` + `--cg-color-status-error-border-default` | Yes | — |
| 70 | color | `--cg-color-status-error-text-default` | Yes | — |
| 71 | font-size | `--cg-font-size-sm` | Yes | — |
| 72 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 73 | margin-bottom | `--cg-spacing-16` | Yes | — |
| 81 | gap | `--cg-spacing-12` | Yes | — |
| 82 | padding | `--cg-spacing-12` 0 | Yes | — |
| 83 | margin-bottom | `--cg-spacing-8` | Yes | — |
| 87-88 | width/height | `--cg-spacing-8` | Yes (acceptable dot sizing via spacing token) | — |
| 89 | border-radius | `--cg-border-radius-full` | Yes | — |
| 96-99 | dot backgrounds | `--cg-color-status-{success,warning,error,info}-text-default` | Yes (semantic status) | — |
| 105 | padding | `--cg-spacing-2` `--cg-spacing-8` | Yes | — |
| 106 | border-radius | `--cg-border-radius-full` | Yes | — |
| 107 | font-size | `10px` | NO | bare magic px; no sub-xs token exists, flag (see §6) |
| 108 | font-weight | `--cg-font-weight-bold` | Yes | — |
| 109 | letter-spacing | `--cg-letter-spacing-wide` | Yes | — |
| 112 | border | `--cg-border-width-50` solid currentColor | Yes | — |
| 115-118 | pill colors | `--cg-color-status-{success,warning,error,info}-text-default` | Yes | — |
| 124 | gap | `0` | Yes (0 allowed) | — |
| 128 | border-top | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | — |
| 134 | gap | `--cg-spacing-8` | Yes | — |
| 135 | min-height | `--cg-spacing-48` | Yes | — |
| 136 | padding | `--cg-spacing-12` `--cg-spacing-8` | Yes | — |
| 137 | border-radius | `--cg-border-radius-100` | Yes | — |
| 146-147 | transition | explicit `background`,`transform` + fast/default tokens | Yes (not `all`) | — |
| 150 | background (hover) | `--cg-color-action-secondary-background-hover` | Yes | — |
| 152 | transform scale | `--cg-interaction-press-scale` | Yes | — |
| 155 | box-shadow | `0 0 0 3px var(--cg-overlay-accent-strong)` | Partial | `3px` is bare magic px; color token valid (see §6) |
| 161 | gap | `--cg-spacing-12` | Yes | — |
| 166-167 | width/height | `--cg-spacing-8` | Yes | — |
| 182 | color | `--cg-color-surface-container-outlined` | Yes | — |
| 183 | font-size | `--cg-font-size-xs` | Yes (meta caption, not body) | — |
| 195 | height | `--cg-spacing-12` | Yes | — |
| 196 | padding-left | `--cg-spacing-20` | Yes | — |
| 199 | gap | `1px` | NO | bare magic px (see §6) |
| 201 | min-width | `2px` | NO | bare magic px (see §6) |
| 202 | max-width | `--cg-spacing-4` | Yes | — |
| 203 | border-radius | `--cg-border-radius-50` | Yes | — |
| 204 | background | `--cg-color-surface-cards-border` | Yes | — |
| 205 | opacity | `0.7` | Yes (opacity, not token domain) | — |
| 206-208 | transition | explicit `opacity`,`transform` + tokens | Yes | — |
| 209 | transform scaleY | `1.2` | Yes (scale factor, unitless) | — |
| 212-219 | history-day backgrounds | `--cg-color-status-{success,warning,error,info}-text-default` | Yes | — |
| 223-229 | sr-only geometry | `1px`/`-1px`/`0` | Yes (sr-only clip idiom, exempt) | — |

### 2. Styling Audit
- **Border radius**: Uses `--cg-border-radius-100`, `-50`, `-full` consistently. Card delegated to `cg-card rounded="lg"`. Good token discipline.
- **Spacing**: All spacing from the `--cg-spacing-*` scale except the four bare-px exceptions (gap 1px, min-width 2px, font-size 10px, box-shadow 3px spread).
- **Font-size accessibility**: Body/service-name text uses `cg-text size="sm"` (maps to `--cg-font-size-sm`, ≥14px) — compliant. Meta uses `--cg-font-size-xs` (caption, acceptable). The `10px` pill label is below 14px but it is an uppercase status badge, not body text — still a hardcoded-px violation regardless.
- **Translucent vs solid borders**: Dividers/borders use solid semantic tokens (`--cg-color-surface-cards-border`). Focus ring uses `--cg-overlay-accent-strong` (translucent accent overlay) — appropriate for a glow ring.
- **Transitions**: All transitions enumerate explicit properties (`background`, `transform`, `opacity`); no `transition: all`. Motion tokens used throughout. `reducedMotion` style imported.
- **Dark-theme suitability**: All colors resolve through tier-2 semantic surfaces/status; no hardcoded light values. Dark-first compliant.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.service-item` transparent button, hairline dividers | None |
| Hover | Yes | `.service-item:hover` bg + `.history-day:hover` opacity/scaleY | None |
| Active/Press | Yes | `.service-item:active` `scale(--cg-interaction-press-scale)` | None |
| Focus-visible | Yes | `.service-item:focus-visible` box-shadow ring | Raw `3px` spread (token violation); `outline:none` replaced by visible shadow ring — acceptable |
| Disabled | N/A | Status rows are informational; no disabled concept for service entries | Reasonable omission |
| Loading | N/A | Component renders provided `services`; no internal async lifecycle | Reasonable; could expose a loading prop but not required |
| Error | Yes (data-driven) | `down`/`degraded` drive error/warning dot+pill; incident banner uses status-error tokens | None |
| Success | Yes (data-driven) | `operational` → success-text color, muted history | None |

Empty state: when `services=[]` only the overall "All systems operational" row shows; no explicit empty message — minor UX gap, not a token issue.

### 4. Interaction Audit
- **Keyboard**: Service rows are native `<button>` elements — focusable and Enter/Space-activatable for free. Good.
- **ARIA**: `role="region"` + `aria-label="System status"` on card; `aria-live="polite"` + `aria-atomic` sr-only region announces overall-status changes; `role="list"`/`role="listitem"` on the service list. Note: applying `role="listitem"` to a `<button>` overrides its implicit button role — the row stays keyboard-operable via click handler, but screen readers announce "listitem" not "button". Consider putting the list role on a wrapper instead (UX flag, not a token issue). Per-row `aria-label="{name}: {status}"`; history strip has `aria-label`; decorative dots `aria-hidden`.
- **CustomEvents**: `ai-status-service-click` with `detail: { service }`, `bubbles: true, composed: true` — escapes shadow DOM correctly; detail shape matches the documented `@fires`.
- **Touch targets**: `.service-item` has `min-height: var(--cg-spacing-48)` (~48px) — meets ≥44px. The whole row is the tap target; pills/dots are not separate targets, which is fine.

### 5. Visual Design Check
Modern Vercel/Linear-inspired aesthetic: muted 90-day history strip, text-only outlined pills, single accent dot. Radius is consistent and soft. Breathing room from `--cg-spacing-12`/`-16` padding and `--cg-spacing-48` row height. Hairline dividers (`border-top` between items) instead of heavy gaps — clean. Typography hierarchy via `cg-text` size/weight (bold title, medium service name, xs tabular meta). Tabular-nums on latency/uptime is a nice polish. Genuinely showcase-ready. Verdict: **strong**.

### 6. Fixes Needed
1. **Line 107** — `font-size: 10px;` → no sub-`xs` font-size token exists in the vocab; cannot substitute a real token without inventing one. FLAG: nearest real token is `--cg-font-size-xs`, but swapping changes pill sizing (a design decision), so not auto-fixed. The `10px` itself is the violation.
2. **Line 155** — `box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);` → the `3px` ring spread is a bare magic px. No box-shadow-spread token exists (`--cg-outline-width-*` are outline-width, not drop-in spreads). FLAG; color token `--cg-overlay-accent-strong` is valid and stays.
3. **Line 199** — `gap: 1px;` (history strip) → bare magic px; no 1px spacing token (`--cg-spacing-1` ≠ 1px). FLAG; no real token substitute, do not invent.
4. **Line 201** — `min-width: 2px;` (history-day) → bare magic px; no 2px token. FLAG.

No comma-fallbacks, no `transition: all`, no raw hex/rgba, no tier-1 palette colors, no made-up tokens in the existing code. All color usage is correctly tier-2 semantic. The only real defects are four hardcoded pixel values (10px, 3px, 1px, 2px), none of which has a valid vocab token to swap in — so they are flagged rather than auto-fixed (no fabricated tokens).

**AI-state note**: This is a service-health dashboard, not an AI-lifecycle surface. Status states map to generic `status-*` semantic colors, which is correct — the `--cg-color-ai-*` family (thinking/streaming/error/etc.) does not apply here.

### Research-backed enhancements

Grounded in the 2025 shadcn/ui + Vercel/Linear/Radix conventions surveyed below. Each item is scoped to *this* component (the 90-day history strip, the service rows, the incident banner, the overall-status header).

1. **Hover tooltip on each history-day tick (shadcn/Radix Tooltip pattern).** The 90-day strip currently encodes status by color/scaleY only — a user can see "something was red ~3 weeks ago" but gets no detail. Modern status pages (Atlassian Statuspage, and the Radix-based dashboards Linear/Supabase ship) attach a Radix Tooltip to each tick showing the date + uptime % + incident summary on hover/focus. Add a `cg-tooltip` (or `role="tooltip"` + `aria-describedby`) per `.history-day`, keyed off `:hover`/`:focus-visible`, so the strip becomes inspectable rather than purely decorative. This also fixes a current a11y gap: ticks carry color meaning with no text equivalent.

2. **Animated status dot for active incidents — pulsing "ping" ring (shadcn/Tailwind `animate-ping` idiom).** Today every dot is static. The dominant 2025 convention (shadcn status badges, Vercel deploy indicators) is a live dot: a static core plus a softly expanding/fading concentric ring for any non-`operational` state, signalling "this is live, still happening." Implement as a `::after` pseudo-element on the `.status-dot` for `degraded`/`down` states with a scale+opacity keyframe gated behind the existing `reducedMotion` import (`@media (prefers-reduced-motion: reduce)` must freeze it). Reuse `--cg-color-status-{warning,error}-text-default` for the ring color so no new tokens are needed.

3. **Tabular, count-up animation on the uptime/latency meta (Linear/Vercel number-transition pattern).** The audit already notes tabular-nums is in place — extend it: when `services` data updates (e.g. live polling), animate the numeric meta with a short count transition rather than a hard text swap. Linear and Vercel dashboards use this micro-animation to make refreshes feel live without a spinner. Keep it cheap: transition only `opacity`/`transform` on the meta span (matching the existing explicit-property transition discipline), duration `--cg-transition-duration-fast`.

4. **Explicit empty + loading states (shadcn skeleton convention).** §3 flags both as gaps. The 2025 shadcn pattern is a *skeleton* placeholder for loading (shimmer rows matching `.service-item` geometry) and a quiet, centered empty message for `services=[]`, rather than collapsing to a bare header. Add a `loading` boolean prop driving 3–4 skeleton `.service-item` rows (background `--cg-color-surface-cards-border`, the same shimmer the rest of the library uses), and an empty slot ("No services monitored") so the card never renders nearly blank.

5. **Move the list role off the `<button>` (Radix accessibility convention).** Already raised in §4 as a UX flag — worth promoting to a research-backed fix: Radix's pattern (used by Linear/Supabase) keeps interactive controls as plain `button`s and applies `role="list"`/`role="listitem"` to a non-interactive wrapper. Wrap each `.service-item` button in a `<li role="listitem">` (or drop the explicit roles and use a real `<ul><li>`), so screen readers announce *both* "listitem" structure and "button" affordance instead of the button role being clobbered.

6. **Section header with collapsible incident history (Linear/Vercel disclosure pattern).** The incident banner is currently always-present-or-absent. Linear/Vercel status surfaces use a compact disclosure: a persistent header row ("All systems operational" / "1 incident") that expands to reveal past-incident detail on click, using a Radix-style `aria-expanded` toggle. This keeps the default view dense (the Vercel/Linear density goal) while making history reachable without a separate page — and it gives the existing `aria-live` region a natural anchor for announcing state transitions.

Sources: [shadcn/ui components](https://ui.shadcn.com/docs/components), [The Anatomy of shadcn/ui Components — Vercel Academy](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components), [How shadcn's New Components Redefine Modern UI Design (2025)](https://medium.com/@hashbyt/blog-shadcn-new-ui-components-2025-modern-frontend-design-d3621786855e), [Radix Primitives adoption (Vercel/Linear/Supabase) — Certificates.dev](https://certificates.dev/blog/starting-a-react-project-shadcnui-radix-and-base-ui-explained).
