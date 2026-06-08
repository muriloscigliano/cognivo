## ai-consent-manager — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 25 | `.panel background` | `--cg-color-surface-cards-background` | ✓ | — |
| 26 | `.panel border` | `--cg-border-width-50` + `--cg-color-surface-cards-border` | ✓ | — |
| 27 | `.panel border-radius` | `--cg-border-radius-150` | ✓ | — |
| 28 | `.panel overflow` | `hidden` | ✓ | keyword, n/a |
| 32 | `.header gap` | `--cg-spacing-8` | ✓ | — |
| 33 | `.header padding` | `--cg-spacing-16` `--cg-spacing-20` | ✓ | — |
| 36 | `.header-icon width/height` | `--cg-spacing-20` | ⚠ | spacing token used for icon sizing; `--cg-icon-size-*` exists but `--cg-spacing-20` is a real token and value is valid — not a violation, noted in §2 |
| 37 | `.header-icon color` | `--cg-color-surface-base-text` | ✓ | — |
| 40 | `.header-title font-size` | `--cg-font-size-sm` | ✓ | — |
| 40 | `.header-title font-weight` | `--cg-font-weight-semibold` | ✓ | — |
| 41 | `.header-title color` | `--cg-color-surface-base-text` | ✓ | — |
| 45 | `.category-label font-size` | `--cg-font-size-xs` | ✓ | uppercase label, not body text — acceptable |
| 45 | `.category-label font-weight` | `--cg-font-weight-semibold` | ✓ | — |
| 46 | `.category-label color` | `--cg-color-surface-container-outlined` | ✓ | — |
| 47 | `.category-label letter-spacing` | `--cg-letter-spacing-wide` | ✗ | **NOT in vocab** — no letter-spacing family exists. Flag only; no verified replacement (see §6) |
| 48 | `.category-label padding` | `--cg-spacing-12` `--cg-spacing-20` `--cg-spacing-4` | ✓ | — |
| 51 | `.items padding` | `--cg-spacing-8` `--cg-spacing-20` | ✓ | — |
| 54 | `.item gap` | `--cg-spacing-12` | ✓ | — |
| 55 | `.item padding` | `--cg-spacing-12` `0` | ✓ | — |
| 60 | `.item-label font-size` | `--cg-font-size-sm` | ✓ | — |
| 60 | `.item-label font-weight` | `--cg-font-weight-medium` | ✓ | — |
| 61 | `.item-label color` | `--cg-color-surface-base-text` | ✓ | — |
| 62 | `.item-label gap` | `--cg-spacing-6` | ✓ | — |
| 65 | `.item-description font-size` | `--cg-font-size-xs` | ✗ | **body/description text below 14px** → `--cg-font-size-sm` (see §6) |
| 66 | `.item-description color` | `--cg-color-surface-container-outlined` | ✓ | — |
| 67 | `.item-description line-height` | `--cg-line-height-snug` | ✓ | — |
| 68 | `.item-description margin-top` | `--cg-spacing-2` | ✓ | — |
| 74 | `.item cg-switch margin-top` | `--cg-spacing-2` | ✓ | — |
| 79 | `.footer gap` | `--cg-spacing-8` | ✓ | — |
| 80 | `.footer padding` | `--cg-spacing-12` `--cg-spacing-20` `--cg-spacing-16` | ✓ | — |
| 86 | `:host([rounded=none]) radius` | `0` | ✓ | keyword, n/a |
| 87 | `:host([rounded=sm]) radius` | `--cg-border-radius-50` | ✓ | — |
| 88 | `:host([rounded=md]) radius` | `--cg-border-radius-100` | ✓ | — |
| 89 | `:host([rounded=lg]) radius` | `--cg-border-radius-150` | ✓ | — |

No comma-fallbacks, no raw hex/rgba, no tier-1 palette colors, no `transition: all`. Colors all use tier-2 semantic surface tokens.

### 2. Styling Audit

- **Border radius:** Uses `--cg-border-radius-150` default with a clean `rounded` override matrix (none/50/100/150). No dedicated tier-3 `--cg-component-ai-consent-manager-radius` token exists in the vocab, so tier-1 radius tokens are the correct fallback. Compliant.
- **Spacing:** Entirely from the spacing scale (`--cg-spacing-2/4/6/8/12/16/20`). No magic numbers. Good rhythm.
- **Font-size accessibility:** Header title and item label are `--cg-font-size-sm` (≥14px) — good. `.item-description` (line 65) is `--cg-font-size-xs`, which is below the 14px body-text floor. Consent descriptions are legally meaningful body copy and should be readable — this is a real violation. `.category-label` at xs is acceptable (uppercase eyebrow label, not body).
- **Translucent vs solid borders:** Borders use solid semantic surface tokens (`--cg-color-surface-cards-border`). Appropriate.
- **Transitions:** No CSS transitions declared in the host styles (toggle/button motion is owned by `cg-switch`/`cg-button`). `reducedMotion` is imported and applied via the shared style. No `transition: all`. Compliant.
- **Dark-theme suitability:** All colors resolve through tier-2 semantic surface tokens that adapt per theme. Dark-first compliant.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | ✓ | Panel + grouped items render from `consents[]` | — |
| Hover | N/A (host) | Hover lives on child `cg-switch` / `cg-button` | Host has no hover affordance by design; acceptable |
| Active/Press | N/A (host) | Press states owned by child buttons/switch | Acceptable |
| Focus-visible | Delegated | Focus handled by child `cg-switch` / `cg-button`; panel is a non-interactive `role="region"` | Acceptable — no focusable host element |
| Disabled | ✓ (per item) | Required items pass `?disabled` to `cg-switch` (line 142) and force-checked | Required toggles correctly locked |
| Loading | N/A | Component is synchronous consent UI, no async fetch | Acceptable |
| Error | N/A | No validation/error path | Acceptable |
| Success | Partial | `ai-consent-save` event signals save; no visual confirmation in component | Consider a saved-confirmation affordance (design note, not a token fix) |

### 4. Interaction Audit

- **Keyboard:** No custom keyboard handling in this component; all interaction is via child `cg-switch` and `cg-button`, which own their own keyboard semantics (Space/Enter). Acceptable for a composition host.
- **ARIA:** `role="region"` + `aria-label="${this.title}"` on the panel (line 155) — good landmark labeling. Category labels are plain text headings (line 163); they could optionally use `role="group"`/`aria-labelledby` to associate each category with its items, but current markup is acceptable.
- **CustomEvents:**
  - `ai-consent-change` — `{ id, checked }`, `bubbles: true, composed: true` (line 104). Correct; reads post-toggle value.
  - `ai-consent-save` — `{ consents: Record<string, boolean> }`, `bubbles: true, composed: true` (line 123). Correct. Fired by `_save`, `_acceptAll`, `_rejectAll`.
  - JSDoc `@fires` (lines 5-6) matches the actual dispatched events.
- **Touch targets:** Toggle hit area is owned by `cg-switch`; buttons are `size="sm"`. Whether sm buttons clear 44px is a child-component concern (design note, not a token violation here).

### 5. Visual Design Check

Clean, well-structured consent panel: card surface, labeled header with a shield icon, optional category grouping, per-item description, and a tertiary/secondary/primary button footer with a spacer pushing Save to the right. Radius is modern and configurable; spacing has good breathing room; typography hierarchy (semibold title → medium label → muted description) is clear. No explicit dividers between items — grouping relies on whitespace, which is acceptable but slightly flat for a long consent list. The xs description size is the one readability weak point. Overall showcase-ready.

Verdict: **strong**

### 6. Fixes Needed

1. **Line 65 — `.item-description` body text below 14px.** Current: `font-size: var(--cg-font-size-xs);` → Fixed: `font-size: var(--cg-font-size-sm);`. Consent descriptions are meaningful body copy and must meet the 14px minimum; `--cg-font-size-sm` is the verified body-text floor token.

**Flag (no verified replacement — not in fixes array):**
- **Line 47 — `letter-spacing: var(--cg-letter-spacing-wide)`.** `--cg-letter-spacing-wide` does not appear in any vocab file, and there is no letter-spacing token family in tier-1. This is a broken/nonexistent token reference. No real replacement token exists to propose, so it is flagged here rather than auto-fixed — it needs either a real letter-spacing token added to the system or removal of the declaration.

### Research-backed enhancements

Modern 2025-era consent UIs (shadcn cookie-consent blocks, the c15t consent-manager widget, Linear/Vercel settings surfaces) have converged on a few patterns this component is missing. Concrete, component-specific suggestions:

1. **Collapsible category accordion with a row-level summary, not a flat list.** The [c15t consent-manager widget](https://c15t-3rrf8abij-c15t.vercel.app/docs/frameworks/next/components/consent-manager-widget) groups consents into an accordion where each category header carries its own master toggle plus an expand chevron, and the per-item descriptions live inside the collapsed panel. For a long `consents[]` list our current always-expanded layout (§5 notes it reads "slightly flat") becomes a tall wall of text. Promote the existing `category` grouping into expandable sections: category label + count + a category-level switch in the header row, descriptions revealed on expand. This also gives the `role="group"`/`aria-labelledby` association §4 suggested a natural home.

2. **A category-level "indeterminate"/master switch that reflects mixed child state.** Following the shadcn [`shadcn-cookie-consent`](https://github.com/r2hu1/shadcn-cookie-consent) "customize" view, each category toggle should show a third visual state when some-but-not-all items in it are enabled (mixed), and toggling it cascades to its children. This collapses N taps into one and makes bulk intent (the same intent behind our existing Accept-all/Reject-all footer) available at category granularity.

3. **Animated disclosure + height transition, respecting `reducedMotion`.** Vercel/Linear settings rows animate the expand/collapse with a short height+opacity transition rather than snapping. Since CSS `transition: all` is banned and motion must defer to the already-imported `reducedMotion` guard (§2), add an explicit `transition: grid-template-rows 160ms, opacity 160ms` (or max-height) on the disclosure region only, gated behind the reduced-motion media query. This is the one place this static panel would benefit from micro-animation.

4. **Inline saved/confirmation affordance instead of fire-and-forget.** §3 flags Success as only "Partial" — `ai-consent-save` dispatches but nothing visually confirms. shadcn cookie blocks and the c15t widget show a transient "Preferences saved" state on the Save button (checkmark + label swap) before the panel dismisses. Add a short-lived `saved` host state that swaps the primary button's label/icon for ~1.5s, again behind `reducedMotion`. Closes the missing-state gap without a new dependency.

5. **Required/locked items need an explicit affordance, not just a disabled switch.** Current required items pass `?disabled` and force-checked (§3), but a greyed switch reads as "broken," not "mandatory." Modern consent UIs (c15t, shadcn GDPR variant) render required categories with an "Always on" / "Required" pill or lock glyph next to the label instead of — or alongside — a dead toggle. Add a small status pill for `required` items so the disabled state communicates intent.

6. **Density variant for embedded/settings-page use.** Linear and Vercel settings surfaces ship a compact row density distinct from the roomy first-run banner. Expose a `density="compact"` attribute that tightens `.item` vertical padding and the header padding via the spacing scale, so the same component serves both the prominent consent modal and an inline privacy-settings tab without forking markup.

**Sources:**
- [c15t Consent Manager Widget](https://c15t-3rrf8abij-c15t.vercel.app/docs/frameworks/next/components/consent-manager-widget)
- [r2hu1/shadcn-cookie-consent (GitHub)](https://github.com/r2hu1/shadcn-cookie-consent)
- [shadcn/ui cookies block](https://shadcn-cookies.vercel.app/)
- [GDPR-ready cookie consent for shadcn/ui](https://next.jqueryscript.net/shadcn-ui/cookie-consent/)
