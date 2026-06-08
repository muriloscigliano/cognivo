## ai-labeling-board — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 41 | animation duration/easing | `--cg-transition-duration-default` / `--cg-transition-easing-default` | Yes | — |
| 45 | background | `--cg-color-surface-cards-background` | Yes | — |
| 46 | border | `--cg-border-width-50` / `--cg-color-surface-cards-border` | Yes | — |
| 47 | border-radius | `--cg-component-card-radius` | Yes (tier 3) | — |
| 54 | gap | `--cg-spacing-8` | Yes | — |
| 55 | padding | `--cg-spacing-20` / `--cg-spacing-12` | Yes | — |
| 58 | font-size | `--cg-font-size-sm` | Yes (14px min OK) | — |
| 59 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 60 | color | `--cg-color-surface-base-text` | Yes | — |
| 64 | font-size | `--cg-font-size-xs` | Yes (meta/count, OK) | — |
| 65 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 72 | gap | `--cg-spacing-6` | Yes | — |
| 73 | padding | `--cg-spacing-12` / `--cg-spacing-20` | Yes | — |
| 74 | border-bottom | `--cg-border-width-50` / `--cg-color-surface-cards-border` | Yes | — |
| 79–80 | gap/padding | `--cg-spacing-6` / `--cg-spacing-4` / `--cg-spacing-12` | Yes | — |
| 81 | border-radius | `--cg-border-radius-full` | Yes | — |
| 82 | border | `--cg-border-width-50` / `--cg-color-surface-cards-border` | Yes | — |
| 83 | background | `--cg-color-surface-base-background` | Yes | — |
| 84 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 85–86 | font-size/weight | `--cg-font-size-xs` / `--cg-font-weight-semibold` | Yes | — |
| 88–89 | transition | explicit props + fast/default tokens | Yes | — |
| 92 | border-color (hover) | `--cg-color-input-border-hover` | Yes | — |
| 95–96 | border-color/color (active) | `var(--_label-color, var(--cg-color-surface-base-text))` | Flag | Comma-fallback w/ runtime hook (see §2) |
| 100 | box-shadow (focus) | `0 0 0 3px var(--cg-overlay-accent-strong)` | No | bare `3px` magic + generic overlay; color → `--cg-color-focus-ring` |
| 103–104 | width/height (dot) | `--cg-spacing-6` | Yes | — |
| 105 | border-radius | `--cg-border-radius-full` | Yes | — |
| 113 | padding | `--cg-spacing-4` / `--cg-spacing-12` | Yes | — |
| 114 | border-radius | `--cg-border-radius-full` | Yes | — |
| 115 | border (dashed) | `--cg-border-width-50` / `--cg-color-surface-cards-border` | Yes | — |
| 117 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 118 | font-size | `--cg-font-size-xs` | Yes | — |
| 120–121 | transition | explicit + tokens | Yes | — |
| 124–125 | hover border/color | `--cg-color-input-border-hover` / placeholder | Yes (no-op color change) | — |
| 132 | margin | `--cg-spacing-12` | Yes | — |
| 133 | background (inset) | `--cg-overlay-dark-subtle` | Yes (tier-1 overlay, allowed) | — |
| 134 | border | `--cg-border-width-50` / `--cg-color-surface-cards-border` | Yes | — |
| 135 | border-radius | `--cg-border-radius-125` | Yes | — |
| 141–142 | gap/padding | `--cg-spacing-12` / `--cg-spacing-16` | Yes | — |
| 143 | border-bottom | `--cg-border-width-50` / `--cg-color-surface-cards-border` | Yes | — |
| 144 | transition | explicit bg-color + tokens | Yes | — |
| 151 | background (hover) | `--cg-color-action-secondary-background-hover` | Yes | — |
| 155 | box-shadow (focus) | `0 0 0 3px var(--cg-overlay-accent-strong)` | No | bare `3px` + generic overlay → `--cg-color-focus-ring` |
| 161 | opacity | `0.5` | Yes (unitless) | — |
| 165 | font-size | `--cg-font-size-sm` | Yes | — |
| 166 | color | `var(--cg-color-surface-base-text))` | **No — broken extra `)`** | Remove stray paren |
| 167 | line-height | `--cg-line-height-normal` | Yes | — |
| 170 | font-size | `--cg-font-size-xs` | Yes (meta, OK) | — |
| 171 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 172 | margin-top | `--cg-spacing-2` | Yes | — |
| 179–180 | gap/padding | `--cg-spacing-4` / `--cg-spacing-2` / `--cg-spacing-8` | Yes | — |
| 181 | border-radius | `--cg-border-radius-full` | Yes | — |
| 182–183 | font-size/weight | `--cg-font-size-xs` / semibold | Yes | — |
| 188 | background (unlabeled pill) | `--cg-overlay-dark-subtle` | Yes | — |
| 189 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 190 | border (dashed) | `--cg-border-width-50` / `--cg-color-surface-cards-border` | Yes | — |
| 192 | opacity (hover) | `0.8` | Yes (unitless) | — |
| 194–195 | width/height | `--cg-spacing-6` | Yes | — |
| 196 | border-radius | `--cg-border-radius-full` | Yes | — |
| 201 | background (select) | `--cg-color-surface-cards-border` | Flag | border token used as background (see §2) |
| 202 | border | `--cg-border-width-50` / `--cg-color-surface-cards-border` | Yes | — |
| 203 | border-radius | `--cg-border-radius-50` | Yes | — |
| 204 | color | `var(--cg-color-surface-base-text))` | **No — broken extra `)`** | Remove stray paren |
| 205 | font-size | `--cg-font-size-xs` | Yes | — |
| 206 | padding | `--cg-spacing-4` / `--cg-spacing-8` | Yes | — |
| 212 | box-shadow (focus) | `0 0 0 3px var(--cg-overlay-accent-strong)` | No | bare `3px` + generic overlay → `--cg-color-focus-ring` |
| 219 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 221 | padding | `--cg-spacing-2` | Yes | — |
| 224 | border-radius | `--cg-border-radius-full` | Yes | — |
| 225 | transition | explicit color + tokens | Yes | — |
| 228 | color (hover) | `--cg-color-status-error-text-default` | Yes | — |
| 232 | box-shadow (focus) | `0 0 0 3px var(--cg-overlay-accent-strong)` | No | bare `3px` + generic overlay → `--cg-color-focus-ring` |
| 235–236 | svg width/height | `--cg-spacing-12` | Yes | — |
| 241 | padding | `--cg-spacing-12` / `--cg-spacing-20` | Yes | — |
| 244 | gap | `--cg-spacing-12` | Yes | — |
| 249 | gap | `--cg-spacing-6` | Yes | — |
| 250 | font-size | `--cg-font-size-xs` | Yes | — |
| 251 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 255–256 | width/height/radius | `--cg-spacing-6` / `--cg-border-radius-full` | Yes | — |
| 259 | font-weight | `--cg-font-weight-bold` | Yes | — |
| 260 | color | `var(--cg-color-surface-base-text))` | **No — broken extra `)`** | Remove stray paren |

Inline style hooks in `render()` (lines 358, 360, 387, 390, 408, 414) bind per-label `l.color` data values via `style=`. These are runtime data, not authored CSS — not token violations. The hex array on line 321 (`_createLabel`) is seed data for new labels, not CSS.

### 2. Styling Audit
- **Border radius:** Panel uses tier-3 `--cg-component-card-radius`; inset list uses `--cg-border-radius-125`; pills/dots use `--cg-border-radius-full`; select uses `--cg-border-radius-50`. All tokenized and consistent. Good.
- **Spacing:** Entirely on the `--cg-spacing-*` scale. No magic px in layout. Good.
- **Font-size accessibility:** Body item content (line 165) is `--cg-font-size-sm` (14px) — compliant. Header title (58) also `sm`. All `--cg-font-size-xs` usages are metadata, counts, pills, stats, and the select control — acceptable secondary text, not body copy.
- **Translucent vs solid borders:** Borders use `--cg-color-surface-cards-border` (semantic) — fine.
- **Transitions:** All transitions enumerate explicit properties (`border-color`, `color`, `background-color`) with duration/easing tokens. No `transition: all`. Good.
- **Focus ring:** Four focus-visible rules (100, 155, 212, 232) use `box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong)`. The `3px` spread is a bare magic px, and `--cg-overlay-accent-strong` is a generic overlay rather than the dedicated `--cg-color-focus-ring` semantic token. Recommend swapping the color to `--cg-color-focus-ring`. The `3px` spread has no clean tier-1 spread token; left as-is but flagged (no fabricated token).
- **Comma-fallback (lines 95–96):** `var(--_label-color, var(--cg-color-surface-base-text))` is a comma-fallback. `--_label-color` is a per-instance runtime hook injected via inline `style="--_label-color: ${l.color}"` (line 358), analogous to the allowed runtime-index pattern — the fallback guards against an unset label color. Acceptable as a runtime style hook; not added to fixes.
- **`.label-select` background (line 201):** Uses `--cg-color-surface-cards-border` as the *background* of the dropdown. This is a real token but a border token used as a fill is semantically wrong and will read as a hairline-grey block. Recommend `--cg-color-surface-base-background` or `--cg-color-input-background-default`. Flagged (semantic, not invented) — see §6 item 4.
- **Dark-theme suitability:** Dark-first surfaces, overlay-based inset, semantic placeholder text — suitable.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.item-row`, `.palette-btn`, pills, select | — |
| Hover | Yes | `.item-row:hover`, `.palette-btn:hover`, `.add-label-btn:hover`, `.item-label-pill:hover`, `.remove-btn:hover` | `.add-label-btn:hover` sets `color` to the same placeholder token (no visible change) — minor |
| Active/Press | Partial | `.palette-btn.active` (selected-label state) | No pointer `:active` press feedback on rows/buttons; "active" here is selection, not press |
| Focus-visible | Yes | palette-btn, item-row, label-select, remove-btn | `3px` magic spread + generic overlay color (see §2) |
| Disabled | N/A | Component exposes no disabled item/label state in the API | No `disabled` property — acceptable for this widget |
| Loading | N/A | Static data-labeling surface, no async fetch in component | — |
| Error | N/A | No validation/error surface; remove-btn hover borrows error color only as an affordance | — |
| Success | Partial | Stats bar + `labeledCount/totalCount` convey completion; no explicit "all labeled" success affordance | Could highlight 100% labeled, but not required |

The label pills carry `role="button"`, `tabindex="0"`, and Enter/Space handling, so the assign/cycle control is keyboard-operable and has a focus ring inherited via `:focus-visible` on the pill? — Note: pills (`.item-label-pill`) do **not** define their own `:focus-visible` box-shadow, so the focusable pills lack a visible focus ring. See §4.

### 4. Interaction Audit
- **Keyboard:** Item rows (click mode) handle Enter/Space via `_handleKeyDown` (lines 329–334). Pills handle Enter/Space inline (389, 396) to cycle labels. The native `<select>` (list mode) is keyboard-operable by default. Good coverage.
- **Focus ring gap:** `.item-label-pill` and `.item-label-pill.unlabeled` are focusable (`tabindex="0"`) but have **no `:focus-visible` style**, so keyboard focus on the assign/cycle pill is invisible. Add a focus-visible ring to `.item-label-pill`.
- **ARIA:** Rows toggle `role="button"` (click mode) vs `role="listitem"` (list mode), but the `.items` container is never given `role="list"`, so `listitem` children are orphaned. Pills get `role="button"`. No `aria-pressed` on the active palette button (`.palette-btn.active`) — selection state isn't exposed to AT. Header count is plain text (no `aria-live`), so label-progress changes aren't announced.
- **CustomEvents:** `ai-label-assign` → `{itemId, labelId}`, `ai-label-remove` → `{itemId}`, `ai-label-create` → `{name, color}`. All `bubbles:true, composed:true`. Detail shapes match the JSDoc `@fires` contract. Correct.
- **Touch targets:** Pills (`padding: 2px 8px` + xs font) and `.remove-btn` (`padding: 2px`, 12px icon) compute well under 44×44px. Palette buttons (`4px 12px`) are also small. These are sizing/design issues, not token violations — flagged here, excluded from fixes.

### 5. Visual Design Check
Modern and clean: tier-3 card radius, inset overlay list with rounded corners, full-radius pills with `color-mix` tinted backgrounds derived from each label's color, dotted/dashed affordances for "add" and "unlabeled," and a compact stats footer. Typography hierarchy is sensible (semibold sm title, xs metadata, bold stat counts). Dividers via hairline card-border between rows read well on dark surfaces. Two blemishes hold it back from showcase-ready: (1) three broken `--cg-color-surface-base-text))` declarations mean item content, the select control, and stat counts currently render with **no color applied** (invalid CSS dropped), and (2) focusable pills lack a focus ring. Once those are fixed it is HeroUI/Vercel-tier. Verdict: **adequate**.

### 6. Fixes Needed
1. **Lines 166, 204, 260** — broken declaration `color: var(--cg-color-surface-base-text));` has a stray closing paren, making the whole declaration invalid (text color silently drops). Fix to `color: var(--cg-color-surface-base-text);` (3 occurrences).
2. **Lines 100, 155, 212, 232** — focus ring uses generic `--cg-overlay-accent-strong`; swap to the dedicated semantic `--cg-color-focus-ring` for the box-shadow color. (The `3px` spread has no clean token in the vocab and is left in place — flagged, not fabricated.)
3. **`.item-label-pill` (around line 176/187)** — focusable pills (`tabindex="0"`) have no `:focus-visible` style. Add a focus-visible box-shadow ring matching the other controls (design fix; needs a new rule, not a token swap).
4. **Line 201** — `.label-select` background uses a border token (`--cg-color-surface-cards-border`) as a fill. Recommend `--cg-color-surface-base-background` (or `--cg-color-input-background-default`) for correct surface semantics. (Flagged; semantic correction.)
5. **ARIA (render, ~line 370)** — add `role="list"` to the `.items` container so `role="listitem"` rows are valid; add `aria-pressed` to active palette buttons; consider `aria-live="polite"` on `.header-count`. (Accessibility, non-token.)

Only items 1 and 2 are token-verified CSS-value fixes; the rest are structural/semantic flags described above.

### Research-backed enhancements

Modern 2025-era reference patterns surveyed: [HeroUI v3 Chip](https://heroui.com/en/docs/react/components/chip) (React-Aria-backed selectable/closable chips), [shadcn/ui](https://ui.shadcn.com/docs/components) (composition-over-inheritance, `cva` variant chips for tags/filters), and [Vercel Academy's shadcn anatomy](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components). Concrete upgrades for `ai-labeling-board`:

1. **Closable chips with an in-pill remove affordance, not a separate column** — Following the [HeroUI Chip `onClose` pattern](https://heroui.com/en/docs/react/components/chip), fold the `.remove-btn` into the label pill itself as a trailing `×` that appears on hover/focus-within (the current design has a detached remove button and an over-small 2px-padded target). This raises the hit area, reduces horizontal scan distance, and matches the dominant 2025 chip idiom. Pair it with a `transform: scale` press state on the pill's `:active` (the §3 audit flags no press feedback anywhere) so assignment feels tactile.

2. **Selectable palette via `aria-pressed` + a `cva`-style "selected" variant ring** — The active palette button currently shows selection only by border color and exposes nothing to AT (§4). Adopt the [shadcn variant pattern](https://ui.shadcn.com/docs) of an explicit `selected` variant: filled tint background using the existing `color-mix` label tint plus a `box-shadow` selection ring (reusing `--cg-color-focus-ring`), and add `aria-pressed`. This is the modern "segmented selectable chip" look (HeroUI/Linear) where the chosen item is unambiguously filled rather than merely outlined.

3. **Keyboard-driven label cycling with a visible focus ring and a subtle dot "pop"** — Pills are already `tabindex="0"` and cycle on Enter/Space but have no `:focus-visible` ring (§4 gap). Beyond fixing that, add a 120ms `transform: scale(1)→(1.15)` micro-animation on the color dot when the label changes (gated behind the existing duration/easing tokens and `prefers-reduced-motion`). Linear/Vercel-class UIs use these sub-150ms state-change "pops" to confirm a mutation without a toast — appropriate here since cycling is a high-frequency action.

4. **Density toggle (comfortable / compact rows)** — Annotation/labeling boards are throughput tools; shadcn data-surfaces increasingly ship a density control. Expose a `density` property that swaps row padding between `--cg-spacing-12/--cg-spacing-16` (current) and a tighter `--cg-spacing-6/--cg-spacing-8` tier, letting power users fit ~40% more rows. Pure tier-1 spacing swap, no new tokens.

5. **An explicit "all labeled" success state and `aria-live` progress** — §3 marks success as only *partial* (a passive count). Borrowing the completion-affordance pattern common in modern board UIs, when `labeledCount === totalCount` tint the stats footer with `--cg-color-status-success-*` and announce progress via `aria-live="polite"` on `.header-count` (also closes the §4 ARIA gap). This gives the board a satisfying terminal state instead of a silent counter.

6. **Empty / first-run state for the items list** — The states audit found no empty state. When `items` is empty, render a centered dashed-border placeholder card (reuse the existing `.add-label-btn` dashed-affordance language) with a one-line prompt — the standard shadcn/HeroUI empty-state convention — so the board never renders as a bare panel on first load.

Sources: [HeroUI Chip](https://heroui.com/en/docs/react/components/chip), [shadcn/ui components](https://ui.shadcn.com/docs/components), [Vercel Academy — extending shadcn](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components).
