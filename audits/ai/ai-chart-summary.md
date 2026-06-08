## ai-chart-summary — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 22 | display | `block` | Yes | Keyword — none. |
| 25 | background | `var(--cg-color-surface-cards-background)` | Yes | Tier-2 card surface. |
| 26 | border | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | Yes | Tier-1 width + tier-2 color. |
| 27 | border-radius | `var(--cg-component-card-radius)` | Yes | Tier-3 component radius — ideal. |
| 28 | padding | `var(--cg-spacing-20) var(--cg-spacing-24)` | Yes | Tier-1 spacing. |
| 33-34 | display/align | flex / center | Yes | Keywords. |
| 35 | gap | `var(--cg-spacing-8)` | Yes | Tier-1. |
| 36 | margin-bottom | `var(--cg-spacing-16)` | Yes | Tier-1. |
| 39-40 | width/height | `var(--cg-spacing-6)` | Yes | Tier-1 spacing used as dot size — acceptable. |
| 41 | background (ai-dot) | `var(--cg-color-accent-text)` | Yes | Tier-2 accent for static brand dot. See §3 note. |
| 42 | border-radius | `var(--cg-border-radius-full)` | Yes | Tier-1. |
| 46 | font-size | `var(--cg-font-size-xs)` | Yes | Eyebrow label (uppercase) — sub-14px allowed for non-body label. |
| 47 | font-weight | `var(--cg-font-weight-medium)` | Yes | Tier-1. |
| 48 | color | `var(--cg-color-input-text-placeholder)` | Weak | Real token, but borrowing input-placeholder for a card eyebrow is semantically off. Flag only — no surface-cards muted-text token exists. |
| 50 | letter-spacing | `var(--cg-letter-spacing-wide)` | Yes | Real tier-1 token (absent only from partial vocab). |
| 56 | gap | `var(--cg-spacing-8)` | Yes | Tier-1. |
| 59 | font-size | `var(--cg-font-size-xs)` | Yes | Metadata text — acceptable. |
| 60 | color | `var(--cg-color-input-text-placeholder)` | Weak | Same semantic borrow as line 48. Flag only. |
| 66-67 | width/height | `var(--cg-spacing-24)` | Yes | 24px icon-button box (touch-target note §4). |
| 68 | border | `none` | Yes | Keyword. |
| 69 | background | `transparent` | Yes | Keyword. |
| 70 | color | `var(--cg-color-input-text-placeholder)` | Weak | Semantic borrow. Flag only. |
| 71 | border-radius | `var(--cg-border-radius-50)` | Yes | Tier-1. |
| 74 | transition | `color var(--cg-transition-duration-fast) var(--cg-transition-easing-default)` | Yes | Explicit property + motion tokens. |
| 76 | color (hover) | `var(--cg-color-surface-base-text)` | Yes | Tier-2. |
| 77 | transform (active) | `scale(var(--cg-interaction-press-scale))` | Yes | Real tier-2 interaction token. |
| 78 | width/height (svg) | `12px` / `12px` | **No** | Bare magic px. Maps to `var(--cg-spacing-12)` (=12px). FIX. |
| 82 | font-size | `var(--cg-font-size-sm)` | Yes | Body text = 14px min. Good. |
| 83 | color | `var(--cg-color-surface-base-text)` | Yes | Tier-2. |
| 84 | line-height | `var(--cg-line-height-normal)` | Yes | Tier-1. |
| 85 | margin-bottom | `var(--cg-spacing-20)` | Yes | Tier-1. |
| 92 | margin-bottom | `var(--cg-spacing-16)` | Yes | Tier-1. |
| 97 | gap | `var(--cg-spacing-2)` | Yes | Tier-1. |
| 99 | padding | `0 var(--cg-spacing-20)` | Yes | Tier-1 + zero. |
| 100 | border-right | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | Yes | Tier-1 + tier-2. |
| 104 | opacity (hover) | `0.8` | Yes | Opacity multiplier — not a token candidate. |
| 108 | gap | `var(--cg-spacing-4)` | Yes | Tier-1. |
| 109 | font-size | `var(--cg-font-size-xs)` | Yes | Trend label — acceptable small text. |
| 110 | color | `var(--cg-color-input-text-placeholder)` | Weak | Semantic borrow. Flag only. |
| 111 | font-weight | `var(--cg-font-weight-medium)` | Yes | Tier-1. |
| 114 | font-size | `var(--cg-font-size-lg)` | Yes | Metric value — hierarchy. |
| 115 | font-weight | `var(--cg-font-weight-semibold)` | Yes | Tier-1. |
| 116 | letter-spacing | `var(--cg-letter-spacing-tight)` | Yes | Real tier-1 token. |
| 118 | color (up) | `var(--cg-color-status-success-text-default)` | Yes | Tier-2 status. Correct for data trend. |
| 119 | color (down) | `var(--cg-color-status-error-text-default)` | Yes | Tier-2 status. |
| 120 | color (neutral) | `var(--cg-color-surface-base-text)` | Yes | Tier-2. |
| 121 | width/height (svg) | `10px` / `10px` | **No** | Bare magic px. No token equals 10px — flag only, no safe fix. |
| 127 | gap | `var(--cg-spacing-8)` | Yes | Tier-1. |
| 128 | padding-top | `var(--cg-spacing-12)` | Yes | Tier-1. |
| 129 | border-top | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | Yes | Tier-1 + tier-2. |
| 130 | font-size | `var(--cg-font-size-xs)` | Yes | Footer metadata — acceptable. |
| 131 | color | `var(--cg-color-input-text-placeholder)` | Weak | Semantic borrow. Flag only. |
| 134 | font-weight | `var(--cg-font-weight-medium)` | Yes | Tier-1. |
| 137-138 | width/height | `var(--cg-spacing-2)` | Yes | 8px... uses spacing-2 as 2px dot — acceptable tiny separator. |
| 139 | border-radius | `var(--cg-border-radius-full)` | Yes | Tier-1. |
| 140 | background | `var(--cg-color-input-text-placeholder)` | Weak | Semantic borrow for separator dot. Flag only. |
| 153 | padding (compact) | `var(--cg-spacing-12)` | Yes | Tier-1. |
| 155 | margin-bottom (compact) | `var(--cg-spacing-8)` | Yes | Tier-1. |
| 159 | border-radius (skel) | `var(--cg-border-radius-50)` | Yes | Tier-1. |
| 160 | background (skel) | gradient w/ `--cg-color-surface-container-background` + `--cg-color-surface-container-border` | Yes | Tier-2 stops — acceptable shimmer. |
| 161 | background-size | `200% 100%` | Yes | % — allowed. |
| 162 | animation | `shimmer 1.5s linear infinite` | Yes | Bare duration in animation shorthand — acceptable (not a sizing/color value). |
| 164 | height (skel-line) | `var(--cg-spacing-12)` | Yes | Tier-1. |
| 164 | margin-bottom | `var(--cg-spacing-8)` | Yes | Tier-1. |
| 165-166 | width | `80%` / `50%` | Yes | % — allowed. |

### 2. Styling Audit
- **Border radius:** Card uses tier-3 `--cg-component-card-radius` (best practice); icon buttons and skeletons use tier-1 `--cg-border-radius-50`; dots use `--cg-border-radius-full`. Consistent and tokenized.
- **Spacing:** Entirely from the tier-1 scale (`--cg-spacing-2/4/6/8/12/16/20/24`). No magic spacing values.
- **Font-size accessibility:** Body copy (`.summary-text`) is `--cg-font-size-sm` (14px) — meets the 14px floor. All `--cg-font-size-xs` usages are labels/eyebrows/metadata, not body prose — acceptable.
- **Translucent vs solid borders:** All borders use solid tier-2 `--cg-color-surface-cards-border` with tier-1 widths. No raw rgba borders. Good.
- **Transitions:** Only one transition (`.icon-btn`), and it correctly enumerates `color` with duration + easing tokens. No `transition: all`. `reducedMotion` style module is imported and applied. Shimmer respects reduced-motion via that module.
- **Dark-theme suitability:** Surface/card semantic tokens adapt to theme; status colors are tier-2. Dark-first compatible.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | Rendered card with header, summary, trends, footer. | None. |
| Hover | Yes | `.icon-btn:hover` color shift; `.trend:hover { opacity: 0.8 }`. | Trend hover via opacity is subtle but functional. |
| Active/Press | Yes | `.icon-btn:active` press-scale via `--cg-interaction-press-scale`. | Trends (role=button) have no `:active` press feedback. |
| Focus-visible | **No** | Trends are `role="button" tabindex="0"` and icon-btns are `<button>`, but there is **no** `:focus-visible` ring anywhere. | P0 a11y gap — keyboard focus is invisible. No `--cg-color-focus-ring` usage. Flag (design fix, not a token swap on an existing line). |
| Disabled | N/A | Component has no disabled affordance; refresh/toggle are always enabled. | Acceptable for an insight card. |
| Loading | Yes | `loading` prop renders shimmer skeleton (3 lines) with header. | Good — uses shimmerKeyframes + reducedMotion. |
| Error | N/A | No error prop/state. Component is a read-only insight surface; errors handled by parent. | Acceptable, but note: this is an AI-generated artifact — an `ai-error` state could be added (see §6). |
| Success/Complete | Partial | Trend `.up` uses `--cg-color-status-success-text-default` for data direction (not an AI lifecycle state). | Correct usage — this is data semantics, not AI-state. The `.ai-dot` (line 41) marks "AI Insight"; since the card represents a completed AI generation, `--cg-color-ai-complete-text` could be considered, but `--cg-color-accent-text` for a static brand dot is acceptable. Not a violation. |

### 4. Interaction Audit
- **Keyboard:** Icon buttons are real `<button>` elements (Enter/Space native). Trends are `role="button" tabindex="0"` but have **no `@keydown` handler** — Enter/Space will NOT fire `ai-summary-trend-click`. Click-only. This is a keyboard-operability bug (the elements are focusable and announced as buttons but cannot be activated by keyboard).
- **ARIA:** Card has `role="complementary"` + `aria-label="AI chart insight"` — good landmark. Refresh button has `aria-label="Refresh"`. Collapse toggle has `aria-expanded` + dynamic `aria-label`. Trend icons are `aria-hidden`. Solid ARIA overall; only gap is the missing keyboard activation + missing focus ring.
- **CustomEvents:** Three events, all `bubbles: true, composed: true` (escape Shadow DOM correctly). `ai-summary-toggle` detail `{collapsed}`; `ai-summary-trend-click` detail = full `Trend`; `ai-summary-refresh` no detail. Details are correct and match the JSDoc `@fires`.
- **Touch targets:** Icon buttons are 24×24px (`--cg-spacing-24`) — below the 44px minimum. Trends have no min-height. Design-change recommendation (see §6), not a token violation.

### 5. Visual Design Check
- **Modern/sleek:** Yes — clean card, AI-dot eyebrow, divided trend columns, subtle footer with confidence + type tag. Reads like a Vercel/HeroUI analytics insight card.
- **Radius:** Tier-3 card radius + pill dots — cohesive.
- **Breathing room:** 20/24 padding, clear vertical rhythm via 16/20px margins. Good.
- **Dividers:** Trend columns separated by `border-right`; footer separated by `border-top`. Tasteful.
- **Typography hierarchy:** Uppercase tracked eyebrow → 14px summary → lg semibold metric values → xs metadata. Clear three-level hierarchy.
- **Showcase-ready:** Visually yes; held back from a perfect score only by the invisible focus state and keyboard-dead trends.
- **Verdict:** **strong**

### 6. Fixes Needed

1. **Line 78** — `.icon-btn svg { width: 12px; height: 12px; }` → `width: var(--cg-spacing-12); height: var(--cg-spacing-12);`. Bare magic px; `--cg-spacing-12` resolves to 12px and is a real tier-1 token.

**Flags (no safe token-verified fix — do NOT auto-apply):**
- **Line 121** — `.trend-icon svg { width: 10px; height: 10px; }` is bare magic px, but no token equals 10px (smallest icon-size token is 16px, smallest non-12 spacing step does not hit 10px). Needs a token addition or a design bump to 12px; left as a flag.
- **Focus-visible (P0 a11y):** No `:focus-visible` ring on `.icon-btn` or `.trend`. Add `outline`/`box-shadow` using `--cg-color-focus-ring` (+ `--cg-color-focus-ring-offset`). This is a new rule, not an edit to an existing line, so it is reported here rather than in the fixes array.
- **Keyboard activation:** Trends (`role="button" tabindex="0"`, lines 237-249) have no `@keydown` for Enter/Space — keyboard users cannot trigger `ai-summary-trend-click`. Add a keydown handler.
- **Touch targets:** Icon buttons are 24×24px and trends have no min-height — below the 44px guideline. Enlargement is a design change, not a token swap.
- **Semantic color borrow:** Multiple muted elements (eyebrow, time-range, trend label, footer, separator dot) use `--cg-color-input-text-placeholder` on a card surface. It renders fine but is semantically an input token. No `surface-cards` muted-text token exists in the vocab, so no swap is proposed — noted for a future token addition.

### Research-backed enhancements

Patterns drawn from current (2025-era) shadcn/ui chart blocks, Vercel/v0 analytics surfaces, and Linear/HeroUI card aesthetics.

1. **Animated count-up on metric values (`shadcn` charts + Vercel dashboards).** shadcn/ui's chart blocks and Vercel's v0-generated analytics cards animate numeric values on mount/update rather than snapping them in. Wrap each `.metric-value` in a tween that interpolates from the previous value to the new one over ~`--cg-transition-duration-slow`, gated behind the existing `reducedMotion` module. For an AI-generated insight card this also signals "freshly computed," reinforcing the AI-dot eyebrow. Free win — no layout change.

2. **Sparkline / micro-trend behind each metric column (shadcn chart-card blocks).** Modern chart-card blocks (Shadcnblocks "chart-card", shadcn area/line charts) pair a single headline metric with a tiny inline sparkline showing the trajectory, not just an up/down arrow. Add an optional 1-line SVG sparkline (~16-20px tall) under each trend value, colored by the same `--cg-color-status-success/error-text-default` already in use. This converts the card from "number + direction glyph" to a genuine at-a-glance trend surface, which is the whole point of a chart *summary*.

3. **Whole-trend-column hover lift + focus ring, not opacity dim (Linear / HeroUI cards).** Linear and HeroUI treat an interactive card region as a single affordance: on hover it gets a subtle elevation/translate and a clear `:focus-visible` ring on the *column*, not a 0.8 opacity fade (current `.trend:hover`). Replace the opacity dim with a `translateY(-1px)` + `--cg-color-surface-container-background` tint and attach the missing `:focus-visible` ring here (closes the P0 from §3/§6). Opacity-only hover reads as "disabled-ish" in dark themes and gives no keyboard-focus signal.

4. **Drag-to-reveal / expandable detail row instead of click-only trends (Vercel hover-card pattern).** The search surfaced the "hover card interactions to display contextual previews / quick actions without navigating away" pattern now standard on Vercel and shadcn dashboards. Rather than firing `ai-summary-trend-click` and leaving the host to navigate, let a trend column expand inline (`aria-expanded`, animated height) to reveal the contributing data points or the period-over-period delta. Keeps the user in-context and gives the keyboard handler (needed anyway for §4) something to toggle.

5. **Compact "AI confidence" treatment as a meter, not plain text (Linear status chips + HeroUI).** The footer confidence value is currently muted text. Linear/HeroUI render confidence/quality signals as a thin segmented bar or pill-chip with a color ramp. Render confidence as a 2px progress track (reuse `--cg-border-radius-full`, fill from a status ramp) so trust calibration is pre-attentive — directly relevant for an AI artifact where over/under-trust is the failure mode.

6. **Skeleton → content cross-fade instead of hard swap (shadcn loading convention).** The loading state already ships a shimmer skeleton, but it hard-cuts to the rendered card. Current shadcn/Vercel practice fades the skeleton out and the content in over ~150ms (`--cg-transition-duration-fast`), which hides layout settle and feels markedly more premium. Gate behind `reducedMotion`.

Sources:
- [shadcn/ui — Area Charts](https://ui.shadcn.com/charts/area)
- [shadcn/ui — Chart component](https://ui.shadcn.com/docs/components/radix/chart)
- [Shadcnblocks — Chart Card blocks](https://www.shadcnblocks.com/blocks/chart-card)
- [Vercel Academy — UI with v0](https://vercel.com/academy/ai-sdk/ui-with-v0)
- [Shadcn Studio — Card](https://shadcnstudio.com/docs/components/card)
