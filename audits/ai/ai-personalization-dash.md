## ai-personalization-dash — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 31 | `.panel` background | `--cg-color-surface-cards-background` | ✅ tier-2 | None |
| 32 | `.panel` border-width | `--cg-border-width-50` | ✅ tier-1 | None |
| 32 | `.panel` border-color | `--cg-color-surface-cards-border` | ✅ tier-2 | None |
| 33 | `.panel` border-radius | `--cg-border-radius-150` | ✅ tier-1 | None |
| 39 | `.profile` gap | `--cg-spacing-12` | ✅ | None |
| 40 | `.profile` padding | `--cg-spacing-16` `--cg-spacing-20` | ✅ | None |
| 43 | `.profile-avatar` width/height | `--cg-spacing-32` | ✅ (sizing via spacing token, acceptable) | None |
| 44 | `.profile-avatar` border-radius | `--cg-border-radius-full` | ✅ | None |
| 45 | `.profile-avatar` background | `--cg-overlay-accent-light` | ✅ valid tier-1 overlay | None |
| 46 | `.profile-avatar` color | `--cg-color-action-primary-background-default` | ⚠️ accent text on accent-tint surface; works but a dedicated text token would be cleaner | None (token is real & legible) |
| 48 | `.profile-avatar` font-size | `--cg-font-size-sm` | ✅ | None |
| 48 | `.profile-avatar` font-weight | `--cg-font-weight-semibold` | ✅ | None |
| 51 | `.profile-info` gap | `--cg-spacing-2` | ✅ | None |
| 52 | `.profile-name` font-size | `--cg-font-size-sm` | ✅ | None |
| 52 | `.profile-name` color | `--cg-color-surface-base-text` | ✅ tier-2 | None |
| 53 | `.profile-updated` font-size | `--cg-font-size-xs` | ✅ (meta label, not body) | None |
| 53 | `.profile-updated` color | `--cg-color-surface-container-outlined` | ⚠️ "outlined" is semantically a border token used as muted text; valid token, common pattern | None |
| 56 | `.section` padding | `--cg-spacing-16` `--cg-spacing-20` | ✅ | None |
| 58 | `.section-title` font-size | `--cg-font-size-xs` | ✅ (uppercase eyebrow label) | None |
| 59 | `.section-title` color | `--cg-color-surface-container-outlined` | ⚠️ same border-as-text note | None |
| 60 | `.section-title` letter-spacing | `--cg-letter-spacing-wide` | ✅ explicitly valid | None |
| 61 | `.section-title` margin-bottom | `--cg-spacing-12` | ✅ | None |
| 65 | `.pref-list` gap | `--cg-spacing-16` | ✅ | None |
| 66 | `.pref-item` gap | `--cg-spacing-4` | ✅ | None |
| 68 | `.pref-label` font-size | `--cg-font-size-sm` | ✅ | None |
| 68 | `.pref-label` color | `--cg-color-surface-base-text` | ✅ | None |
| 69 | `.pref-desc` font-size | `--cg-font-size-xs` | ⚠️ descriptive body copy below 14px (sm) | Flag — see §2 (no compliant body-text-size fix that keeps xs intent; design call) |
| 69 | `.pref-desc` color | `--cg-color-surface-container-outlined` | ⚠️ border-as-text note | None |
| 72 | `.segments` gap | `--cg-spacing-6` | ✅ | None |
| 74 | `.seg` gap | `--cg-spacing-6` | ✅ | None |
| 75 | `.seg` padding | `--cg-spacing-4` `--cg-spacing-12` | ✅ | None |
| 76 | `.seg` border-radius | `--cg-border-radius-full` | ✅ | None |
| 77 | `.seg` font-size | `--cg-font-size-xs` | ✅ (pill chip label) | None |
| 78 | `.seg` border-width | `--cg-border-width-50` | ✅ | None |
| 78 | `.seg` border-color | `--cg-color-surface-cards-border` | ✅ | None |
| 79 | `.seg` color | `--cg-color-surface-container-outlined` | ⚠️ border-as-text note | None |
| 80 | `.seg` background | `transparent` | ✅ allowed | None |
| 83 | `.seg.active` border-color | `--cg-color-action-primary-background-default` | ✅ tier-2 | None |
| 84 | `.seg.active` color | `--cg-color-action-primary-background-default` | ✅ tier-2 | None |
| 85 | `.seg.active` background | `--cg-overlay-accent-subtle` | ✅ valid tier-1 overlay | None |
| 88 | `.seg-dot` width/height | `--cg-spacing-6` | ✅ | None |
| 89 | `.seg-dot` border-radius | `--cg-border-radius-full` | ✅ | None |
| 90 | `.seg-dot` background | `currentColor` | ✅ allowed | None |
| 95 | `.footer` padding | `--cg-spacing-16` `--cg-spacing-20` | ✅ | None |
| 100 | `:host([rounded=none])` radius | `0` | ✅ allowed | None |
| 101 | `:host([rounded=sm])` radius | `--cg-border-radius-50` | ✅ | None |
| 102 | `:host([rounded=md])` radius | `--cg-border-radius-100` | ✅ | None |
| 103 | `:host([rounded=lg])` radius | `--cg-border-radius-150` | ✅ | None |

**Every token referenced in this file appears in the vocab.** No made-up tokens, no banned palette tokens, no raw hex/rgba, no comma-fallbacks, no `var(<number>)`.

### 2. Styling Audit

- **Border radius:** Consistent. Panel `--cg-border-radius-150` with a full `rounded` override matrix (none/sm/md/lg). Pills and dots use `--cg-border-radius-full`. Clean.
- **Spacing:** Entirely from the spacing scale (2/4/6/12/16/20/32). Sectional 16×20 padding is consistent across profile, section, footer. Good rhythm.
- **Font-size accessibility:** `.pref-desc` (line 69) is descriptive copy rendered at `--cg-font-size-xs` (12px), below the 14px body minimum. This is the one accessibility flag. `.profile-updated`, `.section-title`, and `.seg` at xs are acceptable as meta/eyebrow/chip labels. No compliant token swap is proposed because bumping to `--cg-font-size-sm` is a design decision (it changes the visual hierarchy), so it is flagged rather than auto-fixed.
- **Translucent vs solid borders:** Borders use `--cg-color-surface-cards-border` (solid semantic) and the active pill uses an accent border + `--cg-overlay-accent-subtle` translucent fill. Appropriate.
- **Transitions:** No transitions defined anywhere in the component. `reducedMotion` is imported and applied but there is no hover/active motion to gate. No `transition: all`. Interactive feedback for `.seg` is purely static color — no transition token used (acceptable but a missed polish opportunity).
- **Dark-theme suitability:** All colors resolve through tier-2 semantic surfaces and overlays, so dark-first theming is fully supported. No hardcoded light assumptions.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | ✅ | `.panel`, `.profile`, `.section`, `.seg`, `.seg.active` | None |
| Hover | ❌ | No hover styling on `.seg` (segments render but have no `:hover`) | Segments look interactive (pill + dot) but have no hover affordance; see §4 — they are also non-interactive (no click handler) |
| Active/Press | ⚠️ partial | `.seg.active` is a *selected* state (data-driven), not a press state | No press feedback; selection is controlled by `s.active` prop only |
| Focus-visible | ❌ | No `:focus-visible` ring in this component | Slider, button get focus from their own components; the dash's own segments are not focusable |
| Disabled | N/A | No disabled affordance needed at dash level | Slider/button manage their own disabled states |
| Loading | N/A | Static dashboard; no async fetch in component | Data is passed via props |
| Error | N/A | No error surface | Out of scope |
| Success | N/A | — | Out of scope |

Delegated states (slider drag/focus, button hover/press/focus) live inside `<cg-slider>` and `<cg-button>` and are correctly deferred to those components.

### 4. Interaction Audit

- **Keyboard:** No keyboard handlers in this component. The two interactive children — `<cg-slider>` and `<cg-button>` — are keyboard-operable on their own. **Segments (`.seg`) are not focusable, not keyboard-reachable, and have no role.** If segments are meant to be display-only badges this is fine; if they are meant to be toggled they need `role`, `tabindex`, and key handling. They currently have no click handler, so they read as display-only — acceptable, but the active styling implies selectability and may mislead.
- **ARIA:** No roles/labels on the panel or sections. The avatar initial (`?` fallback) has no `aria-label`; the profile region has no landmark/heading semantics. `.section-title` is a styled `<div>`, not a real heading — screen readers get no structure. Recommend `role="group"`/`aria-labelledby` wiring or heading elements for the two section titles.
- **CustomEvents:** Two events, both `bubbles: true, composed: true`.
  - `ai-personalization-change` — detail `{ id, value }`; value guarded against `undefined` before dispatch (lines 113–119). Correct.
  - `ai-personalization-reset` — no detail; fired on button click (lines 122–124). Correct. Both match the documented `@fires` JSDoc (lines 5–6).
- **Touch targets:** `.seg` chips are display-only so 44px is not required. The reset uses `<cg-button size="sm">` and the slider has its own thumb sizing — both delegate touch-target sizing. No dash-level violation.

### 5. Visual Design Check

Clean, modern card composition: avatar + name + "Updated" meta, uppercase eyebrow section titles with wide letter-spacing, pill-shaped segment chips with a leading dot, right-aligned reset in a footer. Radius and spacing are consistent and tokenized. Breathing room is good (16×20 section padding, 16px list gaps).

Gaps holding it back from showcase-tier: (1) **no dividers** between profile / preferences / segments / footer — the sections visually run together with no `--cg-color-surface-cards-divider` separators; (2) **no hover/transition polish** on the segment chips; (3) `.section-title` and other muted text lean on `--cg-color-surface-container-outlined` (a border token) for type color, which is functional but not the intended semantic. Typography hierarchy (name sm/semibold → meta xs → eyebrow xs-uppercase) is sensible.

One-word verdict: **adequate**

### 6. Fixes Needed

No token-level fixes needed — every CSS value resolves to a real, vocab-verified token, with no comma-fallbacks, banned palette colors, raw hex, magic px, or `transition: all`.

Flags (design/a11y, not token swaps — intentionally NOT auto-fixed):
1. **Line 69** — `.pref-desc` body copy at `--cg-font-size-xs` (12px) is below the 14px body minimum. Recommend `--cg-font-size-sm` if treated as body text (design call; left as a flag, not an applied fix).
2. **Section structure / ARIA** — section titles are `<div>`s, not headings; no `role`/`aria-labelledby`. Add heading semantics or labelled groups for screen-reader structure.
3. **Segment affordance** — `.seg.active` styling implies selectability but segments have no handler, role, focus, or hover. Either make them genuinely interactive (role + tabindex + keyboard + change event) or visually de-emphasize so they read as read-only badges.
4. **Dividers** — add `--cg-color-surface-cards-divider` separators between profile / preferences / segments / footer for clearer section boundaries.
5. **Muted-text token** — `--cg-color-surface-container-outlined` (a border token) is used as text color in four places; prefer a dedicated muted-text semantic if/when available.

### Research-backed enhancements

Sourced from a June 2026 scan of modern dashboard/settings patterns (HeroUI v3, Vercel v0/Geist, Linear, shadcn/ui). Each suggestion targets *this* component's specific gaps identified in §3–§5.

1. **Make segments a real animated segmented control with a sliding "pill" indicator.** Linear and HeroUI v3 both ship segmented switchers where the active background is a single shared element that *slides* between options (a `transform: translateX` on a pseudo-pill) rather than each chip toggling its own `background`. Replace the per-chip `--cg-overlay-accent-subtle` swap with one absolutely-positioned indicator animated via a tokened `transform` transition (e.g. `--cg-duration-*` + `--cg-easing-*`, `cubic-bezier(0.32, 0.72, 0, 1)` is the Geist/Linear standard). This fixes the §3 "no hover, no press" gap *and* the §4 affordance ambiguity in one move — but only do it if segments become genuinely interactive (role=tablist/radiogroup + roving tabindex + arrow-key nav), which is exactly the §6 flag #3 resolution. *(Source: HeroUI v3 segmented Tabs, Linear pill switcher — heroui.com.)*

2. **Add hairline section dividers + the Vercel/Geist "inset card" rhythm.** Geist dashboards separate stacked regions with 1px hairline dividers (`--cg-color-surface-cards-divider`) that run edge-to-edge while content stays inset by the section padding. This directly closes §5 gap #1 (sections "run together") and reads as more deliberate than relying on whitespace alone. Pair each divider with the uppercase eyebrow title so each section gets a clear top boundary. *(Source: Vercel Geist dashboard layouts.)*

3. **Introduce a `hover` lift + `:focus-visible` ring on interactive rows.** shadcn/ui settings rows use a subtle `background` tint on hover (token-driven, e.g. `--cg-overlay-accent-light`) plus an explicit `:focus-visible` ring — never the implicit selected styling doing double duty. Since §3 flags both missing hover and missing focus-visible, add an explicit (non-`all`) `transition: background-color, border-color, box-shadow` with tokened duration. This also satisfies the §4 keyboard-reachability concern once segments are focusable. *(Source: shadcn/ui list/menu item states — ui.shadcn.com.)*

4. **Spring-style micro-interaction on value commit.** Modern personalization UIs (HeroUI + Framer-Motion "Glass UI" patterns) give a brief confirmation pulse when a preference is saved — e.g. the slider value chip scales `1 → 1.04 → 1` or the "Updated" meta line cross-fades to "Saved · just now". This addresses the §5 note that the only feedback on change today is the dispatched event with no visible acknowledgement. Gate the whole thing behind the already-imported `reducedMotion` so it degrades to an instant text swap. *(Source: HeroUI motion primitives / Glass UI Framer Motion micro-interactions.)*

5. **Add a `loading`/`skeleton` and `empty` state for the preferences list.** §3 marks Loading and Empty as N/A "static dashboard," but 2025-era dashboards (v0, shadcn blocks) treat personalization panels as async by default — a `loading` attribute rendering shimmer rows for `.pref-item` and an `empty` slot ("No preferences yet") future-proofs the component for fetched data without a structural rewrite. Skeletons should reuse the existing row geometry so layout doesn't shift on hydration. *(Source: shadcn/ui Skeleton + v0 dashboard blocks.)*

6. **Right-size the density with a `density` attribute (comfortable / compact).** Linear and HeroUI expose a density toggle so the same panel serves a roomy first-run view and a dense power-user view by swapping the section padding/list-gap tokens (`--cg-spacing-16/20` → `--cg-spacing-8/12`). This is a high-leverage, fully token-driven enhancement that adds real flexibility (Tradeoffs: simplicity vs flexibility — justified here because settings panels are revisited often by power users). *(Source: Linear density modes, HeroUI sizing scale.)*
