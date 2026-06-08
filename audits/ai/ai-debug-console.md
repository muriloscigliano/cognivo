## ai-debug-console — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 34 | `:host` background | `--cg-color-code-background` | ✅ tier-2 | — |
| 35 | `:host` color | `--cg-color-code-text` | ✅ tier-2 | — |
| 36 | `:host` border | `--cg-border-width-50` solid `--cg-color-code-border` | ✅ | — |
| 37 | `:host` border-radius | `--cg-border-radius-150` | ✅ tier-1 | — |
| 39 | `:host` animation | `--cg-transition-duration-default` / `--cg-transition-easing-ease-out` | ✅ | — |
| 46 | `.toggle-bar` gap | `--cg-spacing-8` | ✅ | — |
| 47 | `.toggle-bar` padding | `--cg-spacing-8 --cg-spacing-16` | ✅ | — |
| 49 | `.toggle-bar` background | `transparent` | ✅ allowed | — |
| 54 | `.toggle-bar` font-size | `--cg-font-size-sm` | ✅ 14px min met | — |
| 55 | `.toggle-bar` font-weight | `--cg-font-weight-semibold` | ✅ | — |
| 63 | `.toggle-bar:active` transform | `scale(var(--cg-interaction-press-scale))` | ✅ real token (in dist) | — |
| 66 | `.toggle-bar:focus-visible` box-shadow | `inset 0 0 0 2px var(--cg-overlay-accent-strong)` | ⚠️ bare `2px` ring thickness; `--cg-overlay-accent-strong` valid | flag (see §6) |
| 70 | `.chevron` transition | transform `--cg-transition-duration-fast` `--cg-transition-easing-default` | ✅ explicit, not `all` | — |
| 71 | `.chevron` font-size | `--cg-font-size-xs` | ✅ decorative glyph, non-body | — |
| 72 | `.chevron` color | `--cg-color-input-text-placeholder` | ✅ tier-2 muted | — |
| 76 | `.chevron.open` transform | `rotate(90deg)` | ✅ geometry | — |
| 87–88 | `.badge` min-width/height | `--cg-spacing-20` | ✅ spacing-as-size | — |
| 89 | `.badge` padding | `0 --cg-spacing-6` | ✅ | — |
| 90 | `.badge` border-radius | `--cg-border-radius-full` | ✅ | — |
| 91 | `.badge` background | `--cg-overlay-accent-subtle` | ✅ tier-1 overlay | — |
| 92 | `.badge` color | `--cg-color-surface-base-text` | ✅ tier-2 | — |
| 93 | `.badge` font-size | `--cg-font-size-xs` | ✅ numeric badge, non-body | — |
| 99 | `.clear-btn` border | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | ✅ | — |
| 100 | `.clear-btn` border-radius | `--cg-border-radius-50` | ✅ | — |
| 101 | `.clear-btn` padding | `--cg-spacing-2 --cg-spacing-8` | ✅ | — |
| 102 | `.clear-btn` font-size | `--cg-font-size-xs` | ⚠️ interactive control <14px (see §2/§6) | flag |
| 103 | `.clear-btn` color | `--cg-color-input-text-placeholder` | ✅ | — |
| 109–110 | `.clear-btn:hover` | `--cg-color-surface-cards-hover-background` / `--cg-color-surface-base-text` | ✅ | — |
| 114 | `.clear-btn:focus-visible` outline | `2px solid var(--cg-overlay-accent-strong)` | ⚠️ bare `2px` outline width | flag |
| 115 | outline-offset | `--cg-outline-offset-default` | ✅ real token (in dist) | — |
| 119 | `.panel` border-top | `--cg-border-width-50` solid `--cg-color-code-border` | ✅ | — |
| 120 | `.panel` max-height | `var(--_ai-debug-panel-max-height, 400px)` | ⚠️ private var w/ px fallback (see §2/§6) | flag |
| 130 | `.entry` border-bottom | `--cg-border-width-50` solid `--cg-color-code-border` | ✅ | — |
| 140 | `.entry-header` gap | `--cg-spacing-8` | ✅ | — |
| 141 | `.entry-header` padding | `--cg-spacing-8 --cg-spacing-16` | ✅ | — |
| 148 | `.entry-header` font-size | `--cg-font-size-xs` | ✅ dense log row, monospace metadata | — |
| 153 | `.entry-header:hover` background | `--cg-overlay-dark-subtle` | ✅ tier-1 overlay | — |
| 157 | `.entry-header:focus-visible` outline | `2px solid var(--cg-overlay-accent-strong)` | ⚠️ bare `2px` | flag |
| 158 | outline-offset | `-2px` | ⚠️ bare negative px (inset) | flag |
| 162–163 | `.type-dot` width/height | `--cg-spacing-8` | ✅ | — |
| 164 | `.type-dot` border-radius | `50%` | ✅ percentage | — |
| 168 | `.type-request` background | `--cg-color-status-info-text-default` | ✅ tier-2 (generic log type, not AI lifecycle) | — |
| 169 | `.type-response` background | `--cg-color-status-success-text-default` | ✅ tier-2 | — |
| 170 | `.type-error` background | `--cg-color-status-error-text-default` | ✅ tier-2 | — |
| 171 | `.type-info` background | `--cg-color-input-text-placeholder` | ✅ tier-2 | — |
| 174 | `.type-label` font-weight | `--cg-font-weight-semibold` | ✅ | — |
| 176 | `.type-label` letter-spacing | `--cg-letter-spacing-wide` | ✅ real token (in dist) | — |
| 177 | `.type-label` min-width | `--cg-spacing-56` | ✅ | — |
| 180–183 | `.label-*` colors | `status-info/success/error-text-default`, `input-text-placeholder` | ✅ tier-2 | — |
| 186 | `.entry-ts` color | `--cg-color-input-text-placeholder` | ✅ | — |
| 195 | `.entry-preview` color | `--cg-color-input-text-placeholder` | ✅ | — |
| 196 | `.entry-preview` font-family | `--cg-font-family-mono` | ✅ | — |
| 200 | `.entry-duration` color | `--cg-color-input-text-placeholder` | ✅ | — |
| 205 | `.entry-content` padding | `--cg-spacing-8 --cg-spacing-16 --cg-spacing-12 --cg-spacing-24` | ✅ | — |
| 206 | `.entry-content` font-family | `--cg-font-family-mono` | ✅ | — |
| 207 | `.entry-content` font-size | `--cg-font-size-xs` | ✅ monospace code dump | — |
| 208 | `.entry-content` line-height | `1.5` | ⚠️ unitless literal; `--cg-line-height-*` exists | flag |
| 211 | `.entry-content` color | `--cg-color-code-text` | ✅ | — |
| 212 | `.entry-content` background | `--cg-color-code-background` | ✅ | — |
| 213 | `.entry-content` max-height | `var(--_ai-debug-entry-max-height, 200px)` | ⚠️ private var w/ px fallback | flag |
| 219 | `.empty` padding | `--cg-spacing-24` | ✅ | — |
| 220 | `.empty` color | `--cg-color-input-text-placeholder` | ✅ | — |
| 221 | `.empty` font-size | `--cg-font-size-xs` | ⚠️ empty-state body text <14px (see §2) | flag |
| 225–229 | `:host([rounded=*])` radius | `0` / `--cg-border-radius-50/100/150/full` | ✅ | — |

### 2. Styling Audit

- **Border radius:** Consistent tier-1 radius scale; `rounded` variants map cleanly (`none/sm/md/lg/full`). Default `lg` = `--cg-border-radius-150`. Good.
- **Spacing:** Entirely on the `--cg-spacing-*` scale (2/6/8/12/16/20/24/56). No magic spacing.
- **Font-size accessibility:** Body-ish text in `.empty` (line 221) and the `.clear-btn` interactive control (line 102) use `--cg-font-size-xs` (~12px), below the 14px body minimum. The dense log-row and JSON-dump text at `xs` is defensible for a developer console (monospace data, not prose), but the empty-state message and the Clear button are UI chrome that should read at `--cg-font-size-sm`. Flagged, not auto-fixed (design judgement; both tokens exist).
- **Translucent vs solid borders:** Borders use `--cg-color-code-border` / `--cg-color-surface-cards-border` (semantic, theme-aware). Good — no raw rgba.
- **Transitions:** Explicit property lists only (`transition: transform …` on `.chevron`). No `transition: all`. Host uses a one-shot `fadeSlideIn` animation gated by `reducedMotion`. Motion tokens (`--cg-transition-duration-*`, `--cg-transition-easing-*`) used correctly.
- **Hardcoded values:** `line-height: 1.5` (208), and four bare `2px`/`-2px` focus-ring widths/offsets (66, 114, 157, 158). The two `--_ai-debug-*-max-height` private vars carry `400px`/`200px` fallbacks. None of these are `--cg-` tokens; the px fallbacks are the only raw px in the file.
- **Dark-theme suitability:** Strong. Built on the `code-*` and `surface-*` semantic families which are dark-first; overlay-based hover/focus states adapt to theme.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | ✅ | `:host` + `.toggle-bar` resting styles | — |
| Hover | ✅ | `.toggle-bar:hover`, `.clear-btn:hover`, `.entry-header:hover` | — |
| Active/Press | ✅ (partial) | `.toggle-bar:active` scale press (line 63) | `.clear-btn` and `.entry-header` have no press feedback — minor inconsistency |
| Focus-visible | ✅ | All three interactive elements have `:focus-visible` rings | Ring thickness hardcoded `2px` (not token); toggle-bar uses inset box-shadow, others use outline — visually inconsistent |
| Disabled | N/A | No disabled affordance — debug console is always interactive; no `disabled` prop | reasonable omission |
| Loading | N/A | Component renders synchronously from `entries` prop; no async fetch | reasonable omission |
| Error | ✅ (data) | `type:'error'` entries render `.type-error`/`.label-error` in status-error color | This is per-entry data state, not a component error state — appropriate |
| Success | ✅ (data) | `type:'response'` → status-success color | same — data classification, not component state |
| Empty | ✅ | `.empty` "No debug entries." block | font-size <14px (see §2) |

### 4. Interaction Audit

- **Keyboard:** Toggle bar is `role="button"` `tabindex="0"` with a keydown handler for `Enter`/`Space` (preventDefault + toggle) — correct. `.clear-btn` and `.entry-header` are native `<button>`s, so Enter/Space work for free. Good keyboard coverage.
- **ARIA:** `aria-expanded` on toggle bar (reflects `open`) and on each entry header (reflects expand state); `aria-label="Debug console"` on the bar; `aria-label="Clear entries"` on Clear; panel is `role="log"` `aria-label="Debug entries"`. Solid, semantically appropriate (`role="log"` is correct for an append-only console).
- **Custom events:** `ai-debug-toggle` fires `{ detail: { open } }`, `bubbles+composed` — correct, escapes Shadow DOM. `ai-debug-clear` fires with no detail (clear is a verb, no payload needed) and `stopPropagation()` prevents the toggle from also firing — correct. Both match the `@fires` JSDoc.
- **Touch targets:** `.toggle-bar` padding 8/16 over `--cg-font-size-sm` text yields ~36px height — under the 44px guideline. `.clear-btn` (padding 2×8 over xs text) and `.entry-header` rows are well under 44px. These are density-appropriate for a developer tool but fall short of the mobile touch target. Design note, not a token fix.

### 5. Visual Design Check

Clean, console-authentic aesthetic built on the dedicated `code-*` token family — reads like a polished devtools panel rather than a generic card. Radius scale is coherent and configurable. Breathing room is intentionally tight (it's a dense log), which suits the use case. Dividers via `border-bottom` on entries with `:last-child` reset — tidy. Typography hierarchy is clear: semibold uppercase tracked type-labels, muted monospace previews/timestamps, JSON dump in mono. Color-coded type dots give fast scannability. The hardcoded `2px` focus rings and two focus-ring styling approaches (inset box-shadow vs outline) are the only polish gaps. Showcase-ready as a developer-tooling component.

Verdict: **strong**

### 6. Fixes Needed

No token-substitution fixes are auto-applied — every `--cg-*` token referenced in the file is real (including `--cg-interaction-press-scale`, `--cg-outline-offset-default`, and `--cg-letter-spacing-wide`, which are absent from the audit vocab subset but confirmed present in `packages/tokens/dist/index.css`). The items below are flags requiring design/token decisions, none with a verified 1:1 replacement token in the vocab files:

1. **Lines 66, 114, 157 — hardcoded `2px` focus-ring thickness** (`inset 0 0 0 2px …`, `outline: 2px solid …`). Raw px. There is no focus-ring-width token in the vocab files (`--cg-border-width-100` ≈ 2px exists in tier-1 but is a border-width, semantically wrong for an outline). Recommend a dedicated focus-ring-width token rather than reusing border-width. Flag only — no verified substitution.
2. **Line 158 — `outline-offset: -2px`** bare negative px. A `--cg-outline-offset-*` family exists (`-default` = 2px) but there is no negative/inset offset token in vocab. Flag only.
3. **Line 208 — `line-height: 1.5`** unitless literal. The `--cg-line-height-*` family exists in vocab but no specific value is documented as `1.5`; `--cg-line-height-normal`/`-relaxed` are candidates but I cannot confirm the numeric match from the vocab list alone, so no substitution proposed. Flag.
4. **Lines 120, 213 — private vars with px fallbacks** `var(--_ai-debug-panel-max-height, 400px)` / `var(--_ai-debug-entry-max-height, 200px)`. These are component-local private vars (`--_`, not design tokens) used for consumer override. There is no `--cg-component-ai-debug-console-*` token in the component vocab, so a tier-3 token cannot be referenced without inventing one. Flag: either add `--cg-component-ai-debug-console-panel-max-height` / `-entry-max-height` tier-3 tokens, or accept the private-var pattern. Do NOT invent the token in code.
5. **Lines 102, 221 — interactive/empty text at `--cg-font-size-xs` (<14px)** the Clear button label and the empty-state message. `--cg-font-size-sm` (14px) exists and would satisfy the body-text minimum. Design judgement (dense devtool context) — flag, not forced.
6. **Press-state inconsistency (lines 63 vs clear-btn/entry-header)** only `.toggle-bar` has `:active` press feedback. Consider adding the same `scale(var(--cg-interaction-press-scale))` to `.clear-btn` and `.entry-header` for consistency. Enhancement, not a violation.
7. **Touch targets <44px** toggle bar (~36px), clear button, and entry rows. Density-appropriate for a developer tool; enlarging is a design change, not a token fix.

**AI-state token note:** the `.type-*`/`.label-*` colors use generic `status-info/success/error` tokens. These classify generic debug-log entry types (request/response/error/info), not the AI lifecycle (thinking/streaming/reasoning/cached/complete/error/rate-limited), so the dedicated `--cg-color-ai-*` family is **not** the correct mapping here. No change recommended.

### Research-backed enhancements

Sourced from current 2025-era devtools/console patterns (Vercel Logs, shadcn/ui, Linear, Chrome DevTools). Concrete, scoped to *this* component — each ties to an existing flag or a clear gap in the audit above.

1. **Per-type filter chips + live text filter in the toggle/header bar** (pattern: [Vercel Logs](https://vercel.com/docs/logs), [Chrome DevTools console](https://blog.logrocket.com/debug-faster-chrome-devtools-console-features/)). The console already color-codes entries by type (`.type-request/response/error/info`) but offers no way to *narrow* them — the modern baseline for any log viewer is toggleable type filters and a debounced substring filter. Add a row of dismissible filter chips (reuse the existing `.type-dot` color swatches as the chip leading indicator) plus a slim search input. Emit an `ai-debug-filter` event mirroring the existing `ai-debug-toggle`/`ai-debug-clear` event contract. This is the single highest-leverage upgrade for a console that may render hundreds of entries.

2. **Copy-on-hover affordance per entry** (pattern: [shadcn/ui](https://ui.shadcn.com/) hover-reveal actions; Vercel Logs row actions). The JSON dump in `.entry-content` is the payload a developer actually wants — yet there's no way to extract it. Add a `Copy` icon-button that fades in on `.entry-header:hover`/`:focus-within` (opacity 0 → 1 over `--cg-transition-duration-fast`), writing the entry payload to the clipboard with a transient "Copied" swap. This also resolves the §3 press-state gap: give the copy button the same `scale(var(--cg-interaction-press-scale))` `:active` feedback the toggle-bar has.

3. **Unify and tokenize the focus ring; add a left status accent on rows** (pattern: [Linear](https://linear.app)'s left-border status accent, "dense, technical, quietly luxurious" dark surfaces). §3/§6 flag two inconsistent focus treatments (inset box-shadow vs `outline`) and four hardcoded `2px` widths. Modern systems use one focus primitive everywhere. Standardize on `:focus-visible { outline }` across all three interactive elements and introduce a `--cg-focus-ring-width` token (resolves §6 flags 1–2). Separately, replace/augment the small `.type-dot` with a 2px colored **left border** on each `.entry-header` keyed to entry type — far more scannable than a dot at log density, and the canonical Linear/Sentry row-status pattern.

4. **Sticky entry-header on scroll within the panel** (pattern: Chrome DevTools / Vercel Logs grouped output). When `.entry-content` is expanded and the `--_ai-debug-panel-max-height` (line 120) clips a tall payload, the metadata row (type, timestamp, duration) scrolls out of view. Make `.entry-header` `position: sticky; top: 0` inside the scroll container so the row context stays pinned while reading a long JSON dump. Pair with a subtle `--cg-overlay-dark-subtle` backdrop so pinned headers read above the mono content.

5. **"Live / paused" tail indicator + new-entry pulse** (pattern: Vercel Logs live-tail; Linear real-time micro-animations). `role="log"` already declares this an append-only stream, but there's no *live* affordance. Add a small pulsing dot (reuse `.type-dot` geometry) in the toggle bar signalling the stream is live, and a one-shot highlight animation on newly-appended `.entry` rows (background flash `--cg-overlay-accent-subtle` → transparent), gated by the existing `reducedMotion` check used for `fadeSlideIn`. This makes streaming AI request/response logs feel real-time rather than static.

6. **Loading/skeleton + denser empty state** (pattern: shadcn/ui skeleton + empty-state conventions). §3 marks Loading as "N/A — renders synchronously," but an AI debug console will frequently sit *waiting* for the first streamed event. Add an optional `loading` state showing 2–3 shimmer skeleton rows at `.entry-header` height. Separately, upgrade the bare "No debug entries." `.empty` block (flagged <14px at §2) to `--cg-font-size-sm` with a one-line muted hint ("Waiting for requests…") — the modern empty state explains *why* it's empty, it doesn't just state it.

Sources:
- [shadcn/ui](https://ui.shadcn.com/)
- [Vercel Logs](https://vercel.com/docs/logs)
- [Chrome DevTools console features — LogRocket](https://blog.logrocket.com/debug-faster-chrome-devtools-console-features/)
- [Anatomy of shadcn/ui Components — Vercel Academy](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components)
