## ai-cache-indicator — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 23 | display | inline-flex | ✅ | — |
| 25 | display | none | ✅ | — |
| 30 | gap | var(--cg-spacing-6) | ✅ | — |
| 31 | padding | var(--cg-spacing-4) var(--cg-spacing-12) | ✅ | — |
| 32 | background | var(--cg-color-surface-cards-background) | ✅ | — |
| 33 | border | var(--cg-border-width-50) solid var(--cg-color-surface-cards-border) | ✅ | — |
| 34 | border-radius | var(--cg-border-radius-full) | ✅ | — |
| 36 | transition | border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default) | ✅ | Explicit property, tokens valid |
| 37 | font-size | var(--cg-font-size-xs) | ⚠️ | xs is below 14px; OK for this micro-label/badge text, acceptable for a status pill |
| 38 | color | var(--cg-color-input-text-placeholder) | ✅ | Valid semantic muted-text token |
| 41 | border-color (hover) | var(--cg-color-surface-cards-border) | ⚠️ | Same as default — hover produces no visible change; prefer `--cg-color-surface-cards-hover-border` |
| 44 | outline | none | ✅ | Replaced by box-shadow ring |
| 45 | box-shadow | 0 0 0 3px var(--cg-overlay-accent-strong) | ⚠️ | Color token valid; bare `3px` spread is a magic value (no spacing-3 exists, borderline-acceptable for focus rings) |
| 49–50 | width/height (.dot) | var(--cg-spacing-8) | ✅ | Token-driven 8px dot |
| 51 | border-radius | var(--cg-border-radius-full) | ✅ | — |
| 54 | background (.dot.hit) | var(--cg-color-status-success-text-default) | ❌ | This is the AI cache-HIT state → should use `--cg-color-ai-cached-text` (dedicated AI family) |
| 55 | background (.dot.miss) | var(--cg-color-status-error-text-default) | ✅ | Miss = error, legit status token |
| 56 | background (.dot.stale) | var(--cg-color-status-warning-text-default) | ✅ | Stale = warning, legit |
| 57 | background (.dot.disabled) | var(--cg-color-input-text-placeholder) | ✅ | Muted, legit |
| 58 | background (.dot.loading) | var(--cg-color-status-info-text-default) | ✅ | Loading = info, legit |
| 61 | font-weight | var(--cg-font-weight-semibold) | ✅ | — |
| 67 | margin-top | var(--cg-spacing-8) | ✅ | — |
| 68 | background | var(--cg-color-surface-cards-background) | ✅ | — |
| 69 | border | var(--cg-border-width-50) solid var(--cg-color-surface-cards-border) | ✅ | — |
| 70 | border-radius | var(--cg-border-radius-200) | ✅ | — |
| 71 | padding | var(--cg-spacing-16) | ✅ | — |
| 72 | color | var(--cg-color-surface-base-text) | ✅ | — |
| 73 | animation | fadeSlideIn 200ms var(--cg-transition-easing-ease-out) both | ❌ | Bare `200ms` magic value → should be `var(--cg-transition-duration-default)` (or -slow) |
| 74 | min-width | 240px | ❌ | Bare magic px, not wrapped in a token / documented exception |
| 81 | padding | var(--cg-spacing-6) 0 | ✅ | — |
| 85 | font-size | var(--cg-font-size-xs) | ⚠️ | Detail label is secondary micro-text; xs acceptable here |
| 86 | color | var(--cg-color-input-text-placeholder) | ✅ | — |
| 90 | font-size | var(--cg-font-size-sm) | ✅ | sm = 14px, meets body min |
| 91 | font-weight | var(--cg-font-weight-semibold) | ✅ | — |
| 96 | height (.rate-bar-track) | var(--cg-spacing-6) | ✅ | — |
| 97 | background | var(--cg-color-surface-cards-divider) | ✅ | — |
| 98 | border-radius | var(--cg-border-radius-50) | ✅ | — |
| 100 | margin-top | var(--cg-spacing-6) | ✅ | — |
| 104 | height (.rate-bar-fill) | 100% | ✅ | Percentage, legit |
| 105 | background | var(--cg-color-action-primary-background-default) | ❌ | This bar visualizes cache HIT RATE → should use `--cg-color-ai-cached-text` to match the AI state, not generic action-primary |
| 106 | border-radius | var(--cg-border-radius-50) | ✅ | — |
| 107 | transition | width var(--cg-transition-duration-slow) var(--cg-transition-easing-default) | ✅ | Explicit property + tokens |
| 111 | height (.divider) | 1px | ⚠️ | Bare 1px hairline; prefer `--cg-border-width-50` per conventions |
| 112 | background | var(--cg-color-surface-cards-divider) | ✅ | — |
| 113 | margin | var(--cg-spacing-12) 0 | ✅ | — |
| 117 | width (.clear-btn) | 100% | ✅ | Percentage, legit |
| 118 | background | transparent | ✅ | Legit |
| 119 | border | var(--cg-border-width-50) solid var(--cg-color-surface-cards-border) | ✅ | — |
| 120 | color | var(--cg-color-input-text-placeholder) | ✅ | — |
| 121 | font-size | var(--cg-font-size-xs) | ⚠️ | Interactive button text below 14px; prefer sm for the actionable "Clear Cache" label |
| 122 | font-weight | var(--cg-font-weight-semibold) | ✅ | — |
| 123 | padding | var(--cg-spacing-8) | ✅ | — |
| 124 | border-radius | var(--cg-border-radius-100) | ✅ | — |
| 126–127 | transition | border-color / color, fast, default easing | ✅ | Explicit, tokenized |
| 130–131 | border-color/color (hover) | var(--cg-color-status-error-text-default) | ✅ | Destructive-affordance hover, legit |
| 135 | box-shadow | 0 0 0 3px var(--cg-overlay-accent-strong) | ⚠️ | Same bare `3px` spread note as line 45 |
| 139 | animation | none | ✅ | reduced-motion guard, good |
| 193 (inline) | margin-top | var(--cg-spacing-8) | ✅ | Inline style token, valid |
| 195 (inline) | color | var(--cg-color-status-success-text-default) | ⚠️ | Latency-saved value; status-success acceptable, but `--cg-color-ai-cached-text` would be more on-brand for cache context |

Summary: Most declarations are clean and token-driven. The file has 3 real defects (lines 54, 73, 74, 105) and a few borderline/quality items (hover no-op, 1px divider, focus-ring 3px, xs button text).

### 2. Styling Audit
- **Border radius**: Pill uses `--cg-border-radius-full` (appropriate for a status pill); detail card `--cg-border-radius-200` and clear button `--cg-border-radius-100` — coherent and modern.
- **Spacing**: Generous and consistent — card padding `--cg-spacing-16`, rows `--cg-spacing-6`, divider margins `--cg-spacing-12`. Good breathing room.
- **Font-size accessibility**: Body/value text uses `--cg-font-size-sm` (14px) — passes. Labels and the pill use `--cg-font-size-xs` (<14px); acceptable for micro status/label text, but the interactive `.clear-btn` (line 121) ideally should be `sm`.
- **Translucent vs solid borders**: Borders use `--cg-color-surface-cards-border` (semantic, theme-aware) — good for dark-first surfaces.
- **Transitions**: All explicit property lists (border-color, color, width) — no `transition: all`. Easing/duration tokenized EXCEPT the card entrance `animation` which hardcodes `200ms` (line 73). Reduced-motion is correctly handled both via the imported `reducedMotion` style and an inline `@media` guard.
- **Dark-theme background**: Uses `--cg-color-surface-cards-background` / `--cg-color-surface-base-text` — suitable for dark-first.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | ✅ | `.pill` base + `.dot.{status}` data states (hit/miss/stale/disabled/loading) | hit dot uses status-success instead of ai-cached |
| Hover | ⚠️ | `.pill:hover` line 40–42 | Sets `border-color` to the SAME value as default → no visible hover feedback. `.clear-btn:hover` is fine |
| Active/Press | ❌ | none | No `:active` styling on pill or clear button — minor; not blocking but a polish gap |
| Focus-visible | ✅ | `.pill:focus-visible` + `.clear-btn:focus-visible` box-shadow ring | Good; `3px` spread is a bare magic value |
| Disabled | ⚠️ | `.dot.disabled` is a DATA state (cache disabled), not an interaction-disabled control. The pill/button are never `:disabled` | Acceptable: control has no disabled mode; data-disabled is represented |
| Loading | ✅ | `.dot.loading` data state | Dot color only; no animated affordance (no pulse/spinner) for an active loading state — minor polish |
| Error | ✅ | `.dot.miss` (status-error) + `.clear-btn:hover` destructive color | Represented via data state |
| Success | ✅ | `.dot.hit` + latency-saved value colored success | Should map to `--cg-color-ai-cached-*` per AI family |

### 4. Interaction Audit
- **Keyboard**: Both triggers are native `<button>` elements (lines 171, 207) → Enter/Space activation and Tab focus come for free. No custom keyboard handling needed and none missing.
- **ARIA**: 
  - Pill: `aria-expanded` bound to `showDetails` (correct), `aria-label="Cache status: ${status}"` (good, dynamic).
  - Detail card: `role="region"` + `aria-label="Cache details"` (correct landmark).
  - Rate bar: `role="progressbar"` with `aria-valuenow/min/max` (correct, well-formed).
  - Clear button: `aria-label="Clear cache"` (correct).
  - No incorrect/contradictory ARIA found.
- **CustomEvents**:
  - `ai-cache-detail` (line 156) — `bubbles: true, composed: true`, detail `{ status, hitRate }` — matches the JSDoc `@fires` contract. Correct.
  - `ai-cache-clear` (line 163) — `bubbles: true, composed: true`, no detail — matches doc. Correct.
- **Touch targets**: The pill button height is driven by `--cg-font-size-xs` text + `--cg-spacing-4` vertical padding → well below 44px tall. The `.clear-btn` has `--cg-spacing-8` padding + xs text → also under 44px. Both interactive controls fail the 44px minimum touch target. (Noted as a design concern; the component is a compact inline indicator, but the tappable pill and clear button should still meet 44px or document the exception.)

### 5. Visual Design Check
Modern and sleek — full-radius status pill with a colored state dot, a clean expandable detail card with a hit-rate progress bar and a destructive-on-hover clear action. Radii are appropriate and consistent; spacing is generous; the divider correctly separates stats from the action. Typography hierarchy is present (semibold values vs muted xs labels). The dark-first surface tokens read well. Weak spots: the hover state on the pill is a visual no-op, the cache-hit/hit-rate colors borrow generic success/action-primary instead of the on-brand `--cg-color-ai-cached-*` family, and a hardcoded `240px` / `200ms` / `1px` break full token governance. Would it pass a HeroUI/Vercel-style showcase? Yes with minor polish. Verdict: **adequate**.

### 6. Fixes Needed
1. **Line 54** — AI semantic color for cache hit.
   - Current: `.dot.hit { background: var(--cg-color-status-success-text-default); }`
   - Fixed: `.dot.hit { background: var(--cg-color-ai-cached-text); }`
   - Why: This component represents the AI cache state; a cache HIT is the dedicated `ai-cached` state. The token family `--cg-color-ai-cached-*` exists specifically for this and keeps the indicator on-brand rather than reusing generic status-success.

2. **Line 105** — Hit-rate bar should use the AI cached color.
   - Current: `background: var(--cg-color-action-primary-background-default);`
   - Fixed: `background: var(--cg-color-ai-cached-text);`
   - Why: The fill visualizes cache hit rate. Coloring it with the generic primary-action token mis-signals it as an interactive action surface; the `ai-cached` semantic color ties it to the cache concept and to the hit dot.

3. **Line 73** — Hardcoded animation duration.
   - Current: `animation: fadeSlideIn 200ms var(--cg-transition-easing-ease-out) both;`
   - Fixed: `animation: fadeSlideIn var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out) both;`
   - Why: `200ms` is a bare magic value; motion duration must come from `--cg-transition-duration-*` for governance and global motion tuning.

4. **Line 74** — Hardcoded min-width.
   - Current: `min-width: 240px;`
   - Fixed: `min-width: var(--cg-spacing-256);`
   - Why: `240px` is a bare magic px not wrapped in a token. `--cg-spacing-256` is the nearest scale token; if an exact 240 is required, add a tier-3 component token (e.g. a `--cg-component-*` width) rather than a raw px.

5. **Line 111** — Hairline divider should use a border-width token.
   - Current: `height: 1px;`
   - Fixed: `height: var(--cg-border-width-50);`
   - Why: Per conventions, 1px hairlines should prefer `--cg-border-width-50` to stay fully token-governed.

(Additional non-blocking polish, not counted as token violations: line 41 pill hover is a no-op — use `--cg-color-surface-cards-hover-border`; lines 45/135 focus-ring `3px` spread is a bare value; line 121 interactive button text is `xs` (<14px); the pill and clear button do not meet the 44px touch-target minimum.)

### Research-backed enhancements

- **Cache-state color semantics with a single chromatic accent**: Distinguish HIT / MISS / STALE / REVALIDATING via tier-2 status colors (success for hit, neutral/muted for miss, warning for stale) rather than text alone, but keep the resting state low-saturation and reserve a single saturated accent for the active/revalidating moment — mirrors Linear's restraint of one chromatic accent (#5e6ad2) over a muted ground so the indicator reads as ambient, not alarmist ([Linear via shadcn/ui](https://ui.shadcn.com/)).

- **A "freshness" micro-animation on revalidation**: When the cache is stale-while-revalidating (SWR), show a subtle shimmer/pulse on the dot or a thin sweeping progress hairline, then a quick scale-in checkmark on settle. Framer-Motion-style motion-first transitions are now the default polish layer in shadcn/Vercel templates, so a 150–200ms ease-out enter/exit on state change reads as modern; enumerate the transition properties (opacity, transform) since `transition: all` is banned ([shadcn Badge / Framer Motion patterns](https://www.shadcn.io/ui/badge)).

- **Dot-plus-label density with optional compact mode**: Adopt the shadcn badge anatomy — a leading status dot, a tight label, and an optional metric slot (e.g. `cached · 1.2s ago` or `92% hit`). Offer a `density="compact"` variant that collapses to just the dot with the detail moving into a tooltip/popover, matching the chip/badge density conventions used for status indicators ([Shadcn Badge](https://shadcnstudio.com/docs/components/badge)).

- **Relative-age affordance with a hover popover**: Surface cache age as a live relative timestamp ("fresh", "12s ago", "expired") and expand on hover/focus into a popover showing TTL remaining, key, and source (memory/disk/edge). This turns a passive badge into an inspectable affordance — the shadcn pattern of a lightweight trigger backed by a richer disclosure surface.

- **Missing states to add**: cover the full matrix the resting badge usually omits — `bypassed` (cache intentionally skipped), `error/eviction`, `warming` (first populate), and `offline/served-from-cache` for degraded-network UX. A `served-from-cache` offline state is a 2025 PWA/edge-rendering expectation and gives the component real product value.

- **Accessibility: announce state changes, don't rely on color**: Pair each state with an icon glyph and an `aria-live="polite"` region so HIT→MISS→REVALIDATING transitions are announced to screen readers, and keep the dot legible at 1px-border densities. Color-independent state encoding is non-negotiable for WCAG and is standard in mature shadcn-derived systems.

### Playground proposal

Show the component in its hit state with details expanded so reviewers see the pill, the hit-rate progress bar, latency-saved, cache-age, and the clear action together. Suggested default: <ai-cache-indicator status="hit" hitRate="87" latencySaved="240ms" cacheAge="2m ago" showDetails></ai-cache-indicator>. Optionally add a second instance with status="miss" and one with status="loading" to demonstrate the dot state colors. Current example (collapsed pill only) under-sells the component since the richest UI lives in the detail card.

---
*cleanliness: needs-work | fixes applied: 5*
