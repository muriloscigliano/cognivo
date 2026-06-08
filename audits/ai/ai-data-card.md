## ai-data-card — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 51 | animation duration | `--cg-transition-duration-fast` | Yes | — |
| 51 | animation easing | `--cg-transition-easing-default` | Yes | — |
| 55 | background | `--cg-color-surface-cards-background` | Yes | — |
| 56 | border width | `--cg-border-width-50` | Yes | — |
| 56 | border color | `--cg-color-surface-cards-border` | Yes | — |
| 57 | border-radius | `--cg-component-card-radius` | Yes (tier 3) | — |
| 59 | font-family | `--cg-font-family-primary` | Yes | — |
| 66 | gap | `--cg-spacing-12` | Yes | — |
| 67 | padding | `--cg-spacing-20 / -20 / -16` | Yes | — |
| 74 | font-size | `--cg-font-size-sm` | Yes (≥14px) | — |
| 75 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 76 | color | `--cg-color-surface-base-text` | Yes | — |
| 82 | font-size | `--cg-font-size-xs` | Yes (subtitle, not body) | — |
| 83 | color | `--cg-color-input-text-placeholder` | Acceptable (muted secondary) | — |
| 84 | margin-top | `--cg-spacing-2` | Yes | — |
| 89 | margin | `--cg-spacing-12` | Yes | — |
| 90 | background | `--cg-overlay-dark-subtle` | Yes (tier 1 overlay, allowed) | — |
| 91 | border | `--cg-border-width-50` / `--cg-color-surface-cards-border` | Yes | — |
| 92 | border-radius | `--cg-border-radius-100` | Yes | — |
| 99 | padding | `--cg-spacing-12 / -16` | Yes | — |
| 100 | border-bottom | `--cg-border-width-50` / `--cg-color-surface-cards-border` | Yes | — |
| 110 | box-shadow spread | `2px` (bare) + `--cg-overlay-accent-strong` | Bare px flag (color OK) | Flag — no clean token for box-shadow spread |
| 114 | font-size | `--cg-font-size-sm` | Yes | — |
| 115 | color | `--cg-color-input-text-placeholder` | Acceptable (row label muted) | — |
| 117 | min-width | `100px` (bare) | No | Flag — no matching min-width token |
| 119/121 | font-size / color | `--cg-font-size-sm` / `--cg-color-surface-base-text` | Yes | — |
| 129 | gap | `--cg-spacing-6` | Yes | — |
| 134/135 | color / weight | `--cg-color-surface-base-text` / `--cg-font-weight-semibold` | Yes | — |
| 138 | color | `--cg-color-surface-base-text` | Yes | — |
| 141 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 144 | color | `--cg-color-surface-base-text` | Yes | — |
| 147 | color | `--cg-color-surface-base-text` | Yes | — |
| 150 | transition | `color --cg-transition-duration-fast --cg-transition-easing-default` | Yes (explicit, not `all`) | — |
| 164/165 | gap / padding | `--cg-spacing-8` / `--cg-spacing-16 / -12` | Yes | — |
| 173 | padding (compact) | `--cg-spacing-8 / -12` | Yes | — |
| 174 | width/height/font (compact icon) | `--cg-spacing-24` / `--cg-font-size-xs` | Yes | — |
| 175 | font-size (compact title) | `--cg-font-size-xs` | Acceptable (compact mode) | — |
| 176 | margin | `--cg-spacing-4` | Yes | — |
| 177 | padding | `--cg-spacing-8 / -12` | Yes | — |
| 178 | min-width | `80px` (bare) | No | Flag — no matching min-width token |
| 179 | font-size (compact value) | `--cg-font-size-xs` | Acceptable (compact) | — |
| 180 | padding | `--cg-spacing-8 / -12` | Yes | — |
| 184 | border-color (highlighted) | `--cg-color-surface-base-text` | Yes | — |
| 189 | border-radius (skel) | `--cg-border-radius-100` | Yes | — |
| 190 | gradient stops | `--cg-color-surface-container-background/-border` | Yes (gradient color stops) | — |
| 192 | animation | `shimmer 1.5s linear infinite` | `1.5s` literal duration | Flag — no duration token = 1.5s |
| 194 | gap/padding/border | `--cg-spacing-8 / -12 / -16`, `--cg-border-width-50`, `--cg-color-surface-container-background` | Yes | — |
| 195 | width/height/radius | `--cg-spacing-32` / `--cg-border-radius-100` | Yes | — |
| 196 | gap | `--cg-spacing-6` | Yes | — |
| 197 | height | `--cg-spacing-12`; width `60%` | Yes | — |
| 198 | height | `--cg-spacing-8`; width `35%` | Yes | — |
| 199 | padding/border | `--cg-spacing-12 / -16`, `--cg-border-width-50`, `--cg-color-surface-container-background` | Yes | — |
| 201/202 | height | `--cg-spacing-8`; width `%` | Yes | — |
| 206 | padding (empty) | `--cg-spacing-24` | Yes | — |
| 208 | color (empty) | `--cg-color-input-text-placeholder` | Acceptable | — |
| 209 | font-size (empty) | `--cg-font-size-xs` | Borderline — empty-state text below 14px | Flag (see §2) |
| 305 | inline percent color | `--cg-color-status-success-text-default` / `--cg-color-status-error-text-default` / `--cg-color-input-text-placeholder` | Yes (tier 2 status) | — |

No comma-fallbacks, no raw hex/rgba, no tier-1 palette colors, no `transition: all`, no made-up tokens in CSS rules.

### 2. Styling Audit

- **Border radius:** Card uses tier-3 `--cg-component-card-radius`; inner rows and skeleton use `--cg-border-radius-100`. Consistent and correct.
- **Spacing:** All from the spacing scale except two bare `min-width` values (100px line 117, 80px line 178) which have no matching token.
- **Font-size accessibility:** Header title and row label/value use `--cg-font-size-sm` (≥14px) — good for body text. Subtitle, compact-mode text, and empty-state use `--cg-font-size-xs` (likely 12px). Compact mode and subtitle are secondary so acceptable, but the **empty-state message (line 209)** is the primary content of that view and should be `--cg-font-size-sm`.
- **Translucent vs solid borders:** Borders use solid semantic `--cg-color-surface-cards-border`; inset rows panel uses translucent `--cg-overlay-dark-subtle` background — appropriate layering.
- **Transitions:** Only one transition (line 150) and it is an explicit property (`color`), not `all`. Uses motion tokens. Good. Skeleton shimmer uses a literal `1.5s` duration instead of a token.
- **Dark-theme suitability:** All surfaces, text, and borders draw from semantic surface/card tokens that are dark-first. Suitable.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.card` base + rows + footer | None |
| Hover | Partial | `.val-link:hover` underline only; `@media reduced-motion` references a `:host(:hover) .card { transform }` that is never defined outside the media query | Dead media rule (line 168-170): cancels a hover transform that does not exist anywhere. No real card-level hover affordance even though rows are `cursor: pointer`. |
| Active/Press | No | — | N/A for static card; rows are clickable but have no `:active` feedback |
| Focus-visible | Yes | `.row.clickable:focus-visible` inset box-shadow ring (line 108-111) | Uses `--cg-overlay-accent-strong` + bare `2px`; functional. Footer buttons inherit cg-button focus. |
| Disabled | Yes (actions) | `?disabled=${action.disabled}` passed to cg-button; `_handleAction` early-returns | Row-level disabled N/A |
| Loading | Yes | `.skeleton` with shimmer, `role="status"` `aria-label="Loading data"` (line 322-339) | Good. Literal `1.5s` duration. |
| Error | N/A | — | Field-level `type:'status'`/`badge` with `status:'error'` renders a danger badge; no card-level error state by design |
| Success | N/A | — | Same — surfaced via per-field status badge and copy "Copied!" success status |

### 4. Interaction Audit

- **Keyboard:** Clickable rows (copyable or url) get `tabindex="0"` and handle Enter/Space with `preventDefault` (line 370). Non-interactive rows get `tabindex="-1"`. Footer buttons and copy button are real `cg-button`s (focusable). Good.
- **ARIA:** Card has `role="region"` + `aria-label` (title or "Data card"). Loading has `role="status"` + label. Rows container `role="list"`, rows `role="listitem"` with `aria-label="${label}: ${value}"`. Solid coverage. Minor: clickable rows convey actionability only via cursor/tabindex — no `role="button"`, so SR users hear a list item, not a button; consider `aria-label` hint or role on truly actionable rows.
- **CustomEvents:** `ai-data-card-action` (detail `{actionId, actionLabel}`) and `ai-data-card-row-click` (detail `{label, value, type}`) — both `bubbles: true, composed: true`. Detail shapes match documented `@fires`. Correct.
- **Touch targets:** Compact rows at `--cg-spacing-8` vertical padding plus xs font yield rows well under 44px tall; copy button is `size="sm"`. These are design-level sizing concerns (touch ergonomics), not token violations.
- **Security:** `_sanitizeUrl` strips `javascript:`/`data:`/`vbscript:`; links use `rel="noopener noreferrer"`. Good.

### 5. Visual Design Check

Modern and clean: tier-3 card radius, inset translucent rows panel with dividers, right-aligned values, semibold currency/percent emphasis, polished shimmer skeleton and empty state. Typography hierarchy (title semibold sm, muted subtitle/labels) is clear. Breathing room is generous in default mode. Weak points: dead hover media rule referencing a non-existent transform, no card/row press feedback, and the empty-state text dips below the 14px body floor. Footer stacks actions full-width vertically which reads well on narrow cards. Showcase-ready with minor polish. Verdict: **strong**.

### 6. Fixes Needed

Token-verified, replacement confirmed in vocab:

1. **Line 209** — empty-state body text below 14px floor.
   - Current: `font-size: var(--cg-font-size-xs);`
   - Fixed: `font-size: var(--cg-font-size-sm);`
   - Why: The empty-state message is the primary content of that view; body text must be ≥14px (`--cg-font-size-sm`).

Flags (no token-verified fix — described, not auto-fixed):

- **Lines 117 & 178** — `min-width: 100px` / `min-width: 80px` are bare magic px on width. No spacing/sizing token maps cleanly to these label-column widths; needs a design decision (introduce a tier-3 token or switch to a `%`/`ch` based layout). Not auto-fixed to avoid inventing a token.
- **Line 192** — shimmer `animation: shimmer 1.5s linear infinite` uses a literal `1.5s` and `linear`. `linear` could become `var(--cg-transition-easing-linear)`, but animation-duration has no 1.5s token in vocab; left as a flag rather than a partial fix.
- **Line 110** — focus ring `box-shadow: inset 0 0 0 2px` uses a bare `2px` spread. `--cg-border-width-100` is the conventional 2px ring width but is a border-width token, not strictly a box-shadow spread token; flagged rather than forced.
- **Lines 168-170** — dead `@media (prefers-reduced-motion: reduce)` rule cancels a `:host(:hover) .card { transform }` that is never defined. Harmless but should be removed (cleanup, not a token fix).
- **Line 22 `@cssprop`** documents `--cg-brand-ai-accent` (a banned tier-1 brand token) as the accent, but it is JSDoc only and not used in any CSS rule — documentation, not a violation.

### Research-backed enhancements

Modern 2025-era data-card patterns (shadcn/ui composition model, HeroUI/Vercel defaults, Linear's restraint). Each suggestion is specific to *this* component:

1. **Replace the dead hover media rule with a real, subtle card-lift on hover.** shadcn's Card and HeroUI both lean on a 1px border-color shift plus a faint shadow on hover rather than a `translateY`. For this card, drop the orphaned `:host(:hover) .card { transform }` (lines 168-170) and instead transition `border-color` from `--cg-color-surface-cards-border` toward the accent on `:host(:hover)`, with an explicit property list (no `transform`, so reduced-motion stays a no-op). This gives the card an affordance it currently lacks while staying flatter and calmer in the Linear/Vercel idiom. (Source: shadcn/ui Card composition + HeroUI hover defaults — [ui.shadcn.com](https://ui.shadcn.com/docs/components), [vercel.com/academy](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components).)

2. **Add per-row press + hover feedback for the clickable (copy/url) rows.** Rows are `cursor: pointer` yet give no `:hover`/`:active` response. Linear's row interactions use a momentary background tint (`--cg-overlay-dark-subtle` deepening) on hover and an instant settle on `:active` — no motion, just a fill change keyed off `--cg-transition-duration-fast`. This closes the §3 "Active/Press: No" gap and makes the existing `cursor: pointer` honest. (Source: Linear list-row interaction model.)

3. **Promote clickable rows to a button affordance for both SR and sighted users.** Per §4, SR users hear a plain list item. The shadcn/Radix pattern is to give genuinely actionable rows `role="button"` (keeping the list semantics on the container) and a trailing 16px affordance glyph — a copy icon on `type:'copyable'`, an external-link arrow on `type:'url'` — that fades in on hover/`:focus-visible`. This is the dominant 2025 data-row convention (HeroUI, Vercel dashboards) and resolves the actionability ambiguity without cluttering the resting state. (Source: shadcn/ui + HeroUI actionable-row patterns — [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components).)

4. **Tighten compact mode toward a true "dense" tier and fix touch ergonomics.** §4 flags compact rows well under the 44px touch floor. Modern dense-data UIs (Linear's compact view, Vercel's table density toggle) keep dense rows for pointer contexts but expand hit-area via an invisible padded target so the *visible* row stays tight while the *touch* target reaches ~44px. Pair this with `--cg-font-size-sm` for the empty-state (already in §6) so density never sacrifices legibility of primary content. (Source: Linear/Vercel density-toggle pattern.)

5. **Animate value changes, not just initial load.** The card has a polished load skeleton but treats value updates as instantaneous. The 2025 data-card convention (Vercel analytics cards, HeroUI stat cards) is a brief crossfade or count-up on the numeric/status values when the bound data changes — gated behind `prefers-reduced-motion` and reusing `--cg-transition-duration-fast`/`--cg-transition-easing-default`. For a card whose values render `--cg-color-status-success/error-text` deltas (line 305), a tint-flash on change communicates "this is live data" far better than a static repaint. (Source: Vercel/HeroUI live-stat-card micro-interaction pattern — [vercel.com/academy](https://vercel.com/academy/shadcn-ui/core-concepts).)

6. **Add an explicit error/empty distinction at the card level using semantic status surfaces.** Today error is per-field only (§3 marks card-level Error "N/A by design"). The shadcn pattern is a lightweight card-level state slot: a thin status bar or muted banner driven by `--cg-color-status-error-*` for "failed to load" vs. the existing neutral empty state. This separates "no data" from "load failed" — two distinct mental models the current single empty state conflates. (Source: shadcn/ui Card + Alert composition — [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components).)

Sources: [shadcn/ui components](https://ui.shadcn.com/docs/components), [Vercel Academy — extending shadcn/ui](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components), [Vercel Academy — core concepts](https://vercel.com/academy/shadcn-ui/core-concepts).
