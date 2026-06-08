## ai-permission-gate — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 42 | animation duration | `var(--cg-transition-duration-fast)` | ✅ | — |
| 42 | animation easing | `var(--cg-transition-easing-default)` | ✅ | — |
| 43 | display | `block` | ✅ | — (keyword) |
| 45 | display ([hidden]) | `none` | ✅ | — (keyword) |
| 47 | cg-card display | `block` | ✅ | — (keyword) |
| 50–52 | header-row flex | `flex` / `center` / `space-between` | ✅ | — (keywords) |
| 53 | header-row gap | `var(--cg-spacing-12)` | ✅ | — |
| 54 | header-row width | `100%` | ✅ | — (% allowed) |
| 58–60 | feature-list flex | `flex` / `column` / `gap: 0` | ✅ | — (0 allowed) |
| 64–66 | feature-row flex/gap | `center` / `var(--cg-spacing-12)` | ✅ | — |
| 67 | feature-row padding | `var(--cg-spacing-12) var(--cg-spacing-8)` | ✅ | — |
| 68 | feature-row min-height | `var(--cg-spacing-48)` | ✅ | — (48px ≈ valid touch height) |
| 71 | feature-row border-top | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | ✅ | — (translucent semantic divider) |
| 75–76 | status-icon w/h | `var(--cg-spacing-20)` | ✅ | — |
| 77 | status-icon radius | `var(--cg-border-radius-full)` | ✅ | — |
| 78–81 | status-icon flex | `inline-flex` / `center` / `0` | ✅ | — (keywords) |
| 83 | status-icon svg w/h | `var(--cg-spacing-12)` | ✅ | — |
| 85 | status-icon.allowed bg | `var(--cg-color-status-success-background-default)` | ✅ | — |
| 86 | status-icon.allowed color | `var(--cg-color-status-success-text-default)` | ✅ | — |
| 89 | status-icon.denied bg | `var(--cg-color-status-error-background-default)` | ✅ | — |
| 90 | status-icon.denied color | `var(--cg-color-status-error-text-default)` | ✅ | — |
| 94–95 | feature-info flex | `1` / `min-width: 0` | ✅ | — |
| 98 | feature-info gap | `var(--cg-spacing-2)` | ✅ | — |
| 102 | summary margin-top | `var(--cg-spacing-12)` | ✅ | — |
| 103 | summary padding-top | `var(--cg-spacing-12)` | ✅ | — |
| 104 | summary border-top | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | ✅ | — |
| 106 | summary gap | `var(--cg-spacing-16)` | ✅ | — |
| 111 | summary-item gap | `var(--cg-spacing-6)` | ✅ | — |
| 114–115 | dot w/h | `var(--cg-spacing-8)` | ✅ | — |
| 116 | dot radius | `var(--cg-border-radius-full)` | ✅ | — |
| 119 | dot-green bg | `var(--cg-color-status-success-text-default)` | ✅ | — |
| 120 | dot-red bg | `var(--cg-color-status-error-text-default)` | ✅ | — |
| 124 | empty padding | `var(--cg-spacing-24) 0` | ✅ | — (0 allowed) |

All CSS values resolve to real tokens. No magic px, no raw hex/rgba, no tier-1 palette colors, no comma-fallbacks.

### 2. Styling Audit

- **Border radius:** Radius is fully delegated to `cg-card` via the `rounded=${this.rounded}` prop (default `lg`), and to `--cg-border-radius-full` on the status icons/dots. Consistent and token-driven.
- **Spacing:** All from the `--cg-spacing-*` scale (2/6/8/12/16/20/24/48). No magic numbers. Good rhythm.
- **Font-size accessibility:** No CSS font-size declarations — typography is delegated to `cg-text`. However the template uses `size="xs"` on three text nodes (lines 184, 185, 202, 206: "Role:", reason, "N allowed/denied"). `xs` typically maps below the 14px body-text floor. The role label and the allowed/denied summary counts are meaningful body content, not decorative captions, so they risk falling under the 14px minimum. This is a delegated-token concern (cg-text owns the scale) — flagged, not a direct token fix here.
- **Translucent vs solid borders:** Dividers use `--cg-color-surface-cards-border` (semantic, theme-adaptive). Correct.
- **Transitions explicit vs all + motion tokens:** No `transition` property at all; only an entry `animation: fadeSlideIn` using `--cg-transition-duration-fast` + `--cg-transition-easing-default`, guarded by the shared `reducedMotion` style. No `transition: all`. Compliant. Minor note: the file mixes `--cg-transition-*` (used here) with the newer `--cg-motion-*` family that also exists in the vocab; both are valid, but `--cg-motion-*` is the more modern naming.
- **Dark-theme suitability:** All colors are tier-2 semantic (status + surface-cards families), which adapt per theme. Dark-first safe.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | ✅ | Renders allowed/denied rows with icons + summary footer | None |
| Hover | N/A (host) | Delegated to `cg-button` (Request Access) and `cg-card`; host has no hover affordance | Acceptable — host is a static panel |
| Active/Press | N/A (host) | Delegated to `cg-button` | Acceptable |
| Focus-visible | Partial | Only on the interactive `cg-button`; the card/region itself is not focusable | OK — region is not interactive |
| Disabled | N/A | No disabled concept for the gate itself | Acceptable — reason text conveys denial |
| Loading | ❌ | No loading/skeleton state | An RBAC panel often awaits async permission resolution; no loading affordance. Minor gap (design note). |
| Error | ❌ (host) | No fetch/error state for the panel | Per-row denial is shown, but a global "failed to load permissions" state is absent. Design note. |
| Success | ✅ | Allowed rows render success icon + count | None |
| Empty | ✅ | `perms.length === 0` → "No permissions configured" | Good — empty state covered |

### 4. Interaction Audit

- **Keyboard:** No custom keydown handling on the host. The only interactive element is `cg-button` (Request Access), which is natively focusable/Enter/Space-activatable. Acceptable for this composition.
- **ARIA:** Strong. `cg-card` gets `role="region"` + `aria-label="Permission gate"`. The list gets `role="list"` + `aria-label="Feature permissions list"`; each row `role="listitem"`. Status icons are `aria-hidden="true"` (correct — meaning is in adjacent text). Summary dots are `aria-hidden="true"`. The Request Access button has a descriptive `aria-label="Request access to ${feature}"`. No `aria-live` on the summary counts, but they are not dynamic announcements, so acceptable.
- **CustomEvents:** `ai-permission-request` fired on Request Access click with `detail: { feature, role }`, `bubbles: true, composed: true`. Detail shape matches the documented `@fires` JSDoc. Correct.
- **Touch targets ≥44px:** `feature-row` has `min-height: var(--cg-spacing-48)` (~48px) — meets the 44px target for the row. The Request Access button is `cg-button size="sm"`, whose height is owned by `--cg-component-button-height-sm`; small buttons can fall below 44px. The status icons (20px) and summary dots (8px) are decorative (`aria-hidden`), so not interactive targets. Note: the `size="sm"` button touch target is a delegated sizing concern.

### 5. Visual Design Check

Clean, modern composition built entirely on cg-* primitives. Tier-2 semantic status colors for allowed/denied give clear affordance; the circular success/error icon chips plus the green/red summary dots read well on a dark surface. Breathing room is good (12px row padding, 48px min row height, 16px summary gap). The row dividers use a translucent semantic border — subtle and correct. Typography hierarchy is delegated to cg-text (semibold feature title, muted role/reason). One reservation: the `xs` text on role/reason/summary risks dipping under the 14px readability floor, and italic-via-inline-`style` on the reason (line 185) bypasses a typography token (`--cg-text-style-italic` exists). Otherwise showcase-ready.

Verdict: **strong**

### 6. Fixes Needed

No token-level fixes needed — every CSS value resolves to a real token, with no magic numbers, raw colors, tier-1 palette colors, comma-fallbacks, or `transition: all`.

Design/delegation notes (not token-vocab fixes, no auto-fix applied):
1. Line 185 — `style="font-style:italic;"` inline-styles the reason text instead of using a typography token. `--cg-text-style-italic` exists in the vocab, but it is a `font-style`-value token, and `cg-text` does not expose a slot for raw CSS here; consider an `italic` attribute on `cg-text` rather than inline style. No safe one-to-one token swap.
2. Lines 184/185/202/206 — `size="xs"` on the role label, reason, and allowed/denied counts risks body text below the 14px minimum. Consider promoting these to `size="sm"`. This is a `cg-text` prop change, not a CSS token in this file.
3. Request Access `cg-button size="sm"` (line 189) may yield a touch target under 44px. Enlargement is a design change, not a token violation.
4. No loading / global-error state for async permission resolution (design gap, optional).

### Research-backed enhancements

Concrete modernization suggestions grounded in current (2025–26) access-control UI patterns from shadcn/ui, Radix, Linear, and Vercel:

1. **Staggered row reveal instead of a single panel fade.** The component currently fades the whole card in once (`fadeSlideIn`). Linear and the shadcn/ui list/table blocks animate list items with a small per-item delay (`animation-delay` stepped by index, ~30–50ms) so permissions cascade in. Add `style="animation-delay: calc(var(--cg-spacing-2) * 0)"`-style staggering (or a `--row-index` custom prop) on each `feature-row`, gated by the existing `reducedMotion` guard. This reads as "permissions resolving" rather than "a box appeared" and reinforces the gate's evaluative mental model. (Pattern: shadcn/ui table + Linear list item entrance.)

2. **Skeleton-shimmer loading rows for async RBAC resolution.** The States Audit flagged the missing loading state. The 2025 shadcn/ui norm is a `Skeleton` primitive — muted rounded blocks with a subtle shimmer — rendered in the exact shape of the resolved row (icon chip circle + two text lines). Render N skeleton `feature-row`s while permissions resolve, using `--cg-color-surface-cards-border`-derived neutral fills and a token-driven shimmer keyframe. This prevents the layout shift that a spinner-then-list causes. (Pattern: shadcn/ui `Skeleton`.)

3. **Denied rows as the dominant visual, allowed rows as quiet confirmation.** Current treatment gives allowed and denied symmetric weight (matching success/error chips). Linear and Vercel access UIs invert this: granted access is acknowledged minimally (a thin checkmark, muted text) while *blocked* access gets the saturated accent and the only call-to-action. Consider de-emphasizing `.allowed` rows (lower-contrast icon, no chip background) and reserving the filled status chip + Request Access button for `.denied` rows. This lowers cognitive load — the user scans straight to what they *cannot* do and how to fix it. (Pattern: Linear permission/member rows, Vercel project access.)

4. **Inline request affordance with optimistic pending state on the row.** Rather than a standalone `size="sm"` button per denied feature (which also triggers the <44px touch-target note), adopt the Radix/shadcn inline-action pattern: a full-height, right-aligned "Request" affordance that, on click, optimistically swaps the row's status chip to a "Pending" state (clock glyph + `--cg-color-status-warning-*`) before the `ai-permission-request` event resolves. This gives immediate feedback and solves the touch-target gap by making the whole trailing region the hit area. (Pattern: shadcn/ui inline row actions + optimistic UI.)

5. **Grouping + sticky summary for density at scale.** For a gate with many permissions, the flat list won't scale. shadcn/ui data-list blocks group by category with a small muted section header, and Vercel pins the allowed/denied summary. Add optional grouping (e.g. by resource/scope) with `role="group"` + `aria-label` headers, and make the summary footer `position: sticky` so the N-allowed / N-denied tally stays visible while scrolling a long list. (Pattern: shadcn/ui grouped data list + Vercel sticky summary bar.)

6. **Focus-visible ring + hover lift on interactive rows (if rows become actionable).** If enhancement #4 lands, the row becomes interactive and must adopt the modern shadcn/Radix focus treatment: a `:focus-visible` ring using `--cg-color-action-primary-*` (not browser default), plus a subtle hover background shift (`--cg-color-surface-cards-border`-tier translucent fill) — explicit-property transition only, never `transition: all`. This keeps the component keyboard-navigable as a list and matches the tactile row feedback users now expect. (Pattern: Radix focus management + shadcn/ui interactive list item.)

Sources: [shadcn/ui](https://ui.shadcn.com/), [Why shadcn/ui is Different — Vercel Academy](https://vercel.com/academy/shadcn-ui/why-shadcn-ui-is-different), [The Anatomy of shadcn/ui Components — Vercel Academy](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components), [shadcn/ui Components](https://ui.shadcn.com/docs/components).
