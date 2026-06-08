## ai-diff-panel — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 31 | animation duration | `var(--cg-transition-duration-fast)` | Yes | — |
| 31 | animation easing | `var(--cg-transition-easing-ease-out)` | Yes | — |
| 35 | background | `var(--cg-color-code-background)` | Yes | — |
| 36 | border-width | `var(--cg-border-width-50)` | Yes | — |
| 36 | border color | `var(--cg-color-code-border)` | Yes | — |
| 37 | border-radius | `var(--cg-component-card-radius)` | Yes (tier-3) | — |
| 40-41 | transition (border-color, box-shadow) | duration-default / easing-default | Yes — explicit, not `all` | — |
| 44 | border-color (hover) | `var(--cg-color-code-muted)` | Yes | — |
| 52 | padding | `var(--cg-spacing-12) var(--cg-spacing-16)` | Yes | — |
| 53 | border-bottom | width-50 / `--cg-color-code-border` | Yes | — |
| 56 | font-size | `var(--cg-font-size-sm)` | Yes (14px, AA min) | — |
| 57 | font-weight | `var(--cg-font-weight-semibold)` | Yes | — |
| 58 | color | `var(--cg-color-surface-base-text)` | Yes | — |
| 62 | gap | `var(--cg-spacing-2)` | Yes | — |
| 63 | background | `var(--cg-color-code-background)` | Yes | — |
| 64 | border | width-50 / `--cg-color-code-border` | Yes | — |
| 65 | border-radius | `var(--cg-border-radius-100)` | Yes (tier-1) | — |
| 66 | padding | `var(--cg-spacing-2)` | Yes | — |
| 69 | padding | `var(--cg-spacing-4) var(--cg-spacing-12)` | Yes | — |
| 71 | border-radius | `var(--cg-border-radius-50)` | Yes | — |
| 72 | font-size | `var(--cg-font-size-xs)` | Yes — but this is an interactive button label (<14px); see §2 | — |
| 73 | font-weight | `var(--cg-font-weight-semibold)` | Yes | — |
| 76 | color | `var(--cg-color-input-text-placeholder)` | Yes | — |
| 79-80 | transition (background-color, color) | duration-fast / easing-default | Yes — explicit | — |
| 83 | background (active) | `var(--cg-color-code-border)` | Yes | — |
| 84 | color (active) | `var(--cg-color-code-text)` | Yes | — |
| 90 | gap | `var(--cg-spacing-16)` | Yes | — |
| 91 | padding | `var(--cg-spacing-8) var(--cg-spacing-16)` | Yes | — |
| 92 | border-bottom | width-50 / `--cg-color-code-border` | Yes | — |
| 93 | font-size | `var(--cg-font-size-xs)` | Yes (stats meta-text) | — |
| 96 | color (stat-add) | `var(--cg-color-status-success-text-default)` | Yes | — |
| 97 | color (stat-remove) | `var(--cg-color-status-error-text-default)` | Yes | — |
| 98 | color (stat-unchanged) | `var(--cg-color-code-muted)` | Yes | — |
| 101 | height | `var(--cg-spacing-4)` | Yes (decorative bar) | — |
| 102 | border-radius | `var(--cg-border-radius-full)` | Yes | — |
| 105 | width | `var(--cg-spacing-80)` | Yes | — |
| 107 | background (bar-add) | `var(--cg-color-status-success-text-default)` | Yes | — |
| 108 | background (bar-remove) | `var(--cg-color-status-error-text-default)` | Yes | — |
| 109 | background (bar-unchanged) | `var(--cg-color-code-border)` | Yes | — |
| 115 | gap | `0` | Yes (allowed) | — |
| 116 | border-bottom | width-50 / `--cg-color-code-border` | Yes | — |
| 119 | padding | `var(--cg-spacing-6) var(--cg-spacing-16)` | Yes | — |
| 120 | font-size | `var(--cg-font-size-xs)` | Yes (uppercase label) | — |
| 121 | font-weight | `var(--cg-font-weight-bold)` | Yes | — |
| 122 | color | `var(--cg-color-input-text-placeholder)` | Yes | — |
| 124 | letter-spacing | `var(--cg-letter-spacing-wide)` | Yes — real tier-1 token (absent only from partial vocab snippet) | — |
| 126 | border-right | width-50 / `--cg-color-code-border` | Yes | — |
| 132 | max-height | `var(--cg-spacing-256)` | Yes | — |
| 136 | font-family | `var(--cg-font-family-mono)` | Yes | — |
| 137 | font-size | `var(--cg-font-size-xs)` | Code/mono — see §2 | — |
| 138 | line-height | `var(--cg-line-height-relaxed)` | Yes | — |
| 140 | border-right | width-50 / `--cg-color-code-border` | Yes | — |
| 144 | padding | `var(--cg-spacing-1) var(--cg-spacing-12)` | Yes | — |
| 145 | min-height | `var(--cg-spacing-20)` | Yes | — |
| 148 | width | `var(--cg-spacing-32)` | Yes | — |
| 150 | color | `var(--cg-color-code-muted)` | Yes | — |
| 152 | padding-right | `var(--cg-spacing-8)` | Yes | — |
| 156 | width | `var(--cg-spacing-16)` | Yes | — |
| 159 | font-weight | `var(--cg-font-weight-bold)` | Yes | — |
| 166 | color | `var(--cg-color-code-text)` | Yes | — |
| 169 | background (add) | `var(--cg-color-status-success-background-default)` | Yes | — |
| 170-171 | color (add) | `var(--cg-color-status-success-text-default)` | Yes | — |
| 172 | background (remove) | `var(--cg-color-status-error-background-default)` | Yes | — |
| 173-174 | color (remove) | `var(--cg-color-status-error-text-default)` | Yes | — |
| 175 | color (unchanged) | `var(--cg-color-code-muted)` | Yes | — |
| 176 | background (empty) | `var(--cg-color-code-background)` | Yes | — |
| 180 | font-family | `var(--cg-font-family-mono)` | Yes | — |
| 181 | font-size | `var(--cg-font-size-xs)` | Code/mono — see §2 | — |
| 182 | line-height | `var(--cg-line-height-relaxed)` | Yes | — |
| 183 | max-height | `var(--cg-spacing-256)` | Yes | — |
| 187 | opacity (hover) | `0.85` | Unitless raw value — no `--cg-opacity-*` token exists in vocab; see §6 flag | Flag only |
| 190 | width | `var(--cg-spacing-20)` | Yes | — |
| 193 | font-weight | `var(--cg-font-weight-bold)` | Yes | — |
| 195 | color (add prefix) | `var(--cg-color-status-success-text-default)` | Yes | — |
| 196 | color (remove prefix) | `var(--cg-color-status-error-text-default)` | Yes | — |
| 200 | padding | `var(--cg-spacing-24)` | Yes | — |
| 202 | color | `var(--cg-color-input-text-placeholder)` | Yes | — |
| 203 | font-size | `var(--cg-font-size-sm)` | Yes (14px) | — |
| 207 | outline | `none` | Yes (replaced by box-shadow ring) | — |
| 208 | box-shadow ring width | `var(--cg-border-width-300)` | Yes | — |
| 208 | box-shadow ring color | `var(--cg-overlay-accent-strong)` | Valid token, but `--cg-color-focus-ring` is the semantic choice; see §4 | Flag only |

### 2. Styling Audit
- **Border radius**: Outer panel uses tier-3 `--cg-component-card-radius`; toggle and buttons use tier-1 `--cg-border-radius-100/50`; stats bar uses `--cg-border-radius-full`. Coherent and token-driven.
- **Spacing**: All padding/gap/width/height values pull from the `--cg-spacing-*` scale. No magic numbers.
- **Font-size accessibility**: Title (line 56) and empty state (line 203) use `--cg-font-size-sm` (14px) — compliant. The mode-toggle buttons (line 72), stats (93), labels (120) and the diff code body (137, 181) use `--cg-font-size-xs` (~12px). The mono diff content and the small meta labels are acceptable as dense code/metadata UI (matching VS Code / GitHub diff conventions), but the **interactive Split/Inline buttons at `xs` are borderline for legibility** — consider `--cg-font-size-sm`. Not a hard token violation.
- **Translucent vs solid borders**: All borders use solid `--cg-color-code-border`; consistent and intentional for a code surface.
- **Transitions explicit vs all**: Both transition blocks (lines 39-41, 78-80) enumerate properties (`border-color`, `box-shadow`, `background-color`, `color`). No `transition: all`. Motion tokens (`--cg-transition-duration-*`, `--cg-transition-easing-*`) are used correctly. Entry animation respects `reducedMotion` (imported on line 19).
- **Dark-theme suitability**: Built entirely on `--cg-color-code-*` (a dedicated dark code surface family) plus status success/error semantics. Dark-first and theme-safe.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.panel`, `.diff-line`, mode-toggle base styles | — |
| Hover | Yes | `.panel:hover` (border-color, line 43-45); `.diff-line:hover` opacity 0.85 (line 186-188) | Hover uses raw `opacity: 0.85` instead of a token-backed background; no `--cg-opacity-*` token exists (flag, §6) |
| Active/Press | Partial | `.mode-btn.active` reflects selected mode (line 82-85). No `:active` press feedback on diff lines | Diff lines are clickable (role=listitem, tabindex=0) but have no pressed-state styling |
| Focus-visible | Yes | Global `:focus-visible` box-shadow ring (line 206-209) | Uses `--cg-overlay-accent-strong`; `--cg-color-focus-ring` is the semantic token (§4) |
| Disabled | N/A | Component has no disabled mode — diff panel is always read/interact | — |
| Loading | N/A | Diff is computed synchronously (LCS); no async/streaming state | — |
| Error | N/A | No error surface; empty input renders "No content to compare" empty state instead | — |
| Success | N/A | "Added" lines use success-colored styling, but this is content semantics, not a component success state | — |

This is a status/comparison view, not an AI-lifecycle component. The dedicated `--cg-color-ai-*` state family (thinking/streaming/reasoning/cached/complete/error/rate-limited) does **not** apply here — add/remove correctly map to `status-success`/`status-error`. No AI-state token recommendation.

### 4. Interaction Audit
- **Keyboard**: `_handleLineKey` (line 325-330) handles `Enter` and `Space`, calls `preventDefault()`, dispatches the click handler. Each diff line is `tabindex="0"`. Good. The mode-toggle buttons are native `<button>` elements (lines 426-429) so they're keyboard-operable by default, but they have **no explicit `:focus-visible` distinction beyond the global ring** and no `aria-pressed` to convey selected state.
- **ARIA**: Panel has `role="group"` + `aria-label` (422). Each side has `role="list"` + `aria-label` (362, 376, 397); lines have `role="listitem"` + descriptive `aria-label` via `_lineAriaLabel` (332-336). Line-number/sign/empty spans are correctly `aria-hidden="true"`. Empty filler lines are `aria-hidden`. Strong screen-reader coverage. Gap: the mode-toggle `<button>`s lack `aria-pressed` to expose which mode is active.
- **CustomEvents**: `ai-diff-select` dispatched with `bubbles: true, composed: true` and a structured `detail` (`type`, `content`, `lineNum`) — matches the documented `@fires` JSDoc (line 15). Correct, escapes shadow DOM.
- **Touch targets**: Diff lines have `min-height: var(--cg-spacing-20)` (~20px), well below the 44px touch target guideline. Mode-toggle buttons (~24-28px tall) are also under 44px. These are dense data rows; enlarging is a design tradeoff, noted here, not a token fix.

### 5. Visual Design Check
- **Modern/sleek?** Yes — clean GitHub/VS Code-style diff with a segmented mode toggle, a proportional add/remove/unchanged stat bar, and uppercase tracked column labels. Polished and on-trend.
- **Radius**: Consistent (card radius outer, pill toggle, full-round stat bar).
- **Breathing room**: Header/stats/label padding is generous; diff rows are intentionally tight for density.
- **Dividers**: Clear `--cg-color-code-border` separators between header, stats, labels and panes; a vertical split divider between sides.
- **Typography hierarchy**: Semibold title (sm) → bold uppercase tracked labels (xs) → mono diff body. Clear hierarchy.
- **HeroUI/Vercel showcase-ready?** Yes — would slot into a Vercel-grade UI with minor polish (slightly larger toggle text, `aria-pressed`).
- **Verdict**: **strong**

### 6. Fixes Needed
No token-substitution fixes with a verified replacement are available. Two items are flagged (no real replacement token exists in vocab, so they are not auto-fixed):

1. **Line 187** — `.diff-line:hover { opacity: 0.85; }` uses a bare unitless opacity. No `--cg-opacity-*` token family exists in the vocab, so there is no token-safe substitute. Recommend replacing the opacity hover with a token-backed background (e.g. an overlay/hover surface) or adding an opacity token to the system. Flagged, not auto-fixed.
2. **Line 208** — focus ring color uses `var(--cg-overlay-accent-strong)`. This is a valid token, but the semantic focus token `--cg-color-focus-ring` exists and is the intended choice for focus rings. This is a semantic-preference recommendation, not a broken token; left as a flag for consistency review.

Additional non-token design notes (not violations): mode-toggle buttons lack `aria-pressed` for selected state; diff rows and toggle buttons are below the 44px touch target; interactive toggle label text at `xs` is borderline for legibility.

### Research-backed enhancements

Cross-referenced against current (2025-era) diff-viewer patterns from the shadcn/ui AI Code Diff Viewer block, Vercel v0, and the broader shadcn/Linear aesthetic. Six concrete upgrades for `ai-diff-panel`:

1. **Word-level (intra-line) highlight inside changed lines** — Today the panel highlights whole lines as add/remove (success/error backgrounds). The shadcn AI Code Diff Viewer and GitHub's modern diff both do *token-level* highlighting: within a modified line, the actual changed substring gets a stronger background tint while the unchanged remainder stays at the line tint. This is the single biggest perceived-quality jump for diff UIs. Implementation: run a second LCS/Myers pass at the character/word level on paired remove/add rows, wrap the delta in a `<mark>` styled with `--cg-color-status-success-background-strong` / `--cg-color-status-error-background-strong` (or the next tint step up). Source: shadcn/ui AI Code Diff Viewer block (shadcn.io/blocks/ai-code-diff-viewer).

2. **Per-hunk "Apply" / "Copy" affordance on row hover** — The shadcn block's defining interaction is line-level *apply actions*. Right now `.diff-line:hover` only drops opacity to 0.85 (the flagged raw value). Replace that with a token-backed hover surface (`--cg-color-code-background` → a hover overlay) AND reveal a right-aligned, absolutely-positioned mini action cluster (copy-line, and for AI-suggested diffs an "apply" button) that fades in on row hover/focus. This both fixes the §6 opacity flag and adds the marquee 2025 affordance. Source: shadcn/ui AI Code Diff Viewer (line-level apply actions).

3. **Sticky hunk headers + collapsible unchanged regions** — Long diffs in Linear/GitHub/v0 collapse runs of unchanged lines behind a "⋯ N unchanged lines" expander and keep the `@@`/section label sticky at the top of the scroll viewport. The panel already has a `max-height: var(--cg-spacing-256)` scroll region and uppercase tracked labels — make those labels `position: sticky; top: 0` with a `--cg-color-code-background` backdrop, and fold contiguous unchanged spans into an expandable divider row. Big density win on real-world diffs. Source: Vercel v0 diff-viewer + Linear changelog diff conventions.

4. **Copy-to-clipboard control in the header with success micro-feedback** — Modern shadcn/Vercel code surfaces ship a header-right copy button that swaps its icon to a check and shows a 1.2s "Copied" state on click. Add a copy-the-diff (or copy-new-version) icon button beside the Split/Inline toggle, animating the icon swap with the existing `--cg-transition-duration-fast` / `--cg-transition-easing-ease-out` motion tokens already imported. Source: shadcn/ui code-block + v0 component pattern.

5. **`aria-pressed` segmented control with a sliding active indicator** — The Split/Inline toggle is a classic segmented control. Two upgrades: (a) add `aria-pressed`/`role` so the selected mode is exposed to AT (also closes the §4 a11y gap), and (b) adopt the Linear/shadcn micro-animation where the active "pill" background slides between segments via a translated pseudo-element transition (animate `transform`, not `background` swap) using `--cg-transition-duration-fast`. Bump the label to `--cg-font-size-sm` to resolve the §2 legibility flag while you're in there. Source: Linear/shadcn segmented-control aesthetic.

6. **Streaming/diff-computing skeleton state** — §3 marks Loading as N/A because the LCS runs synchronously, but in an AI-native library the *upstream* (model still emitting the new version) is the real async case. Add an optional `loading`/`streaming` attribute that renders shimmer skeleton rows in the new-version pane (shadcn `Skeleton` pattern) and, for true streaming, append rows incrementally with a subtle fade-in per row using the imported `reducedMotion`-guarded entry animation. This fills the genuinely-missing state for an AI diff surface. Source: shadcn/ui Skeleton + Vercel v0 streaming-render pattern.

Sources: [shadcn/ui AI Code Diff Viewer Block](https://www.shadcn.io/blocks/ai-code-diff-viewer), [shadcn/ui Components](https://ui.shadcn.com/docs/components), [Vercel v0 Diff viewer](https://v0.app/chat/diff-viewer-LhVX4eRylAw), [The Anatomy of shadcn/ui Components — Vercel Academy](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components).
