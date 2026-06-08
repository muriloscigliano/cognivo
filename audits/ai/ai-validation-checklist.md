## ai-validation-checklist — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 34 | animation timing | `var(--cg-transition-easing-ease-out)` + `200ms` | Yes | No — duration literal in keyframe shorthand is conventionally allowed; could use `--cg-transition-duration-default` but not a violation |
| 39 | background | `var(--cg-color-surface-cards-background)` | Yes | No |
| 40 | border width | `var(--cg-border-width-50)` | Yes | No |
| 40 | border color | `var(--cg-color-surface-cards-border)` | Yes | No |
| 41 | border-radius | `var(--cg-border-radius-200)` | Yes | No |
| 42 | padding | `var(--cg-spacing-20)` | Yes | No |
| 43 | color | `var(--cg-color-surface-base-text)` | Yes | No |
| 50 | margin-bottom | `var(--cg-spacing-16)` | Yes | No |
| 54 | font-size | `var(--cg-font-size-base)` | Yes | No |
| 55 | font-weight | `var(--cg-font-weight-semibold)` | Yes | No |
| 59 | background | `var(--cg-color-action-primary-background-default)` | Yes | No |
| 60 | color | `var(--cg-color-surface-cards-background)` | Yes (inverse text on accent) | No |
| 62 | font-size | `var(--cg-font-size-xs)` | Yes | No (UI label, not body text) |
| 63 | font-weight | `var(--cg-font-weight-bold)` | Yes | No |
| 64 | padding | `var(--cg-spacing-6) var(--cg-spacing-16)` | Yes | No |
| 65 | border-radius | `var(--cg-border-radius-full)` | Yes | No |
| 67 | transition | `filter var(--cg-transition-duration-fast) var(--cg-transition-easing-default)` | Yes (explicit prop) | No |
| 69 | filter | `brightness(0.9)` | Yes (filter fn, not color) | No |
| 72 | box-shadow | `0 0 0 3px var(--cg-overlay-accent-strong)` | Partial | Flag — bare `3px` spread (see §2/§6) |
| 76 | opacity | `0.5` | Yes | No |
| 81 | height | `var(--cg-spacing-4)` | Yes | No |
| 82 | background | `var(--cg-color-surface-cards-divider)` | Yes | No |
| 83 | border-radius | `var(--cg-border-radius-50)` | Yes | No |
| 85 | margin-bottom | `var(--cg-spacing-16)` | Yes | No |
| 89 | height | `100%` | Yes (%) | No |
| 90 | background | `var(--cg-color-action-primary-background-default)` | Yes | No |
| 91 | border-radius | `var(--cg-border-radius-50)` | Yes | No |
| 92 | transition | `width var(--cg-transition-duration-slow) var(--cg-transition-easing-default)` | Yes (explicit) | No |
| 102 | gap | `var(--cg-spacing-4)` | Yes | No |
| 108 | gap | `var(--cg-spacing-8)` | Yes | No |
| 109 | padding | `var(--cg-spacing-8) var(--cg-spacing-12)` | Yes | No |
| 110 | border-radius | `var(--cg-border-radius-100)` | Yes | No |
| 112 | transition | `background var(--cg-transition-duration-fast) var(--cg-transition-easing-default)` | Yes (explicit) | No |
| 115 | background (hover) | `var(--cg-color-surface-cards-border)` | Yes | No |
| 119 | box-shadow | `0 0 0 3px var(--cg-overlay-accent-strong)` | Partial | Flag — bare `3px` spread |
| 124-125 | width/height | `var(--cg-spacing-20)` | Yes | No |
| 129 | font-size | `var(--cg-font-size-sm)` | Yes | No |
| 130 | line-height | `1` | Yes (unitless) | No |
| 131 | margin-top | `var(--cg-spacing-1)` | Yes | No |
| 134 | color | `var(--cg-color-status-success-text-default)` | Yes | No |
| 135 | color | `var(--cg-color-status-error-text-default)` | Yes | No |
| 136 | color | `var(--cg-color-status-warning-text-default)` | Yes | No |
| 137-138 | color | `var(--cg-color-input-text-placeholder)` | Yes (muted) | No |
| 139 | color | `var(--cg-color-status-info-text-default)` | Yes | No |
| 143-144 | width/height/border | `var(--cg-spacing-12)` / `var(--cg-border-width-50)` | Yes | No |
| 145 | border-top-color | `var(--cg-color-status-info-text-default)` | Yes | No |
| 146 | border-radius | `var(--cg-border-radius-full)` | Yes | No |
| 147 | animation | `spin 0.8s linear infinite` | Yes (keyframe shorthand) | No |
| 156 | font-size | `var(--cg-font-size-sm)` | Yes (14px min) | No |
| 157 | font-weight | `var(--cg-font-weight-medium)` | Yes | No |
| 161 | font-size | `var(--cg-font-size-xs)` | Yes (secondary desc, acceptable) | No |
| 162 | color | `var(--cg-color-input-text-placeholder)` | Yes | No |
| 163 | margin-top | `var(--cg-spacing-2)` | Yes | No |
| 168 | height | `1px` | **No** | **Fix — bare magic px → `var(--cg-border-width-50)`** |
| 169 | background | `var(--cg-color-surface-cards-divider)` | Yes | No |
| 170 | margin | `var(--cg-spacing-16) 0` | Yes | No |
| 176 | gap | `var(--cg-spacing-16)` | Yes | No |
| 181 | font-size | `var(--cg-font-size-xs)` | Yes (stat label) | No |
| 184 | gap | `var(--cg-spacing-6)` | Yes | No |
| 188-189 | width/height | `var(--cg-spacing-8)` | Yes | No |
| 190 | border-radius | `var(--cg-border-radius-full)` | Yes | No |
| 192-195 | background | status / placeholder tokens | Yes | No |
| 198 | font-weight | `var(--cg-font-weight-bold)` | Yes | No |
| 199 | color | `var(--cg-color-surface-base-text)` | Yes | No |
| 203 | color | `var(--cg-color-input-text-placeholder)` | Yes | No |
| 207 | border-top-color | `var(--cg-color-status-info-text-default)` | Yes | No |

### 2. Styling Audit
- **Border radius:** Consistent tier-1 scale — `200` (container), `100` (item), `50` (progress), `full` (button/dots/spinner). Good hierarchy.
- **Spacing:** All on the token scale (`1/2/4/6/8/12/16/20`). No raw values.
- **Font-size accessibility:** Body/label text uses `--cg-font-size-sm` (14px min) — compliant. `--cg-font-size-xs` appears on the run button, check description, and summary stats; these are secondary UI labels/metadata, not primary body copy, so acceptable.
- **Translucent vs solid borders:** Borders use solid semantic tokens (`surface-cards-border`, `surface-cards-divider`). Fine.
- **Transitions:** All transitions enumerate explicit properties (`filter`, `width`, `background`) with duration + easing tokens. No `transition: all`. Motion tokens used throughout; `prefers-reduced-motion` handled via imported `reducedMotion` style + media query at line 206. Strong.
- **Dark-theme suitability:** All colors resolve through tier-2 semantic tokens that are theme-aware. Compliant.
- **Issue:** `.divider { height: 1px }` (line 168) is a raw magic pixel — should be `var(--cg-border-width-50)`. The focus-ring `box-shadow` spread `3px` (lines 72, 119) is a bare literal; no clean spread-width token exists in the vocab, so flagged not auto-fixed.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | Container + list render default styling | None |
| Hover | Yes | `.run-btn:hover` (filter brightness), `.check-item:hover` (bg) | None |
| Active/Press | No | No `:active` style on button or item | Minor — no press feedback; relies on filter/bg hover only |
| Focus-visible | Yes | `.run-btn:focus-visible` + `.check-item:focus-visible` box-shadow ring | Uses `--cg-overlay-accent-strong` not `--cg-color-focus-ring`; acceptable but `3px` literal |
| Disabled | Yes | `.run-btn:disabled` (opacity 0.5, not-allowed); button `?disabled` bound to `isRunning` | None |
| Loading | Yes | `running` status spinner + button "Running..." text when `isRunning` | None |
| Error | Yes (per-item) | `.status-icon.fail` / `.summary-dot.fail` with `status-error` token | Component-level error state N/A — item-level only |
| Success | Yes (per-item) | `.status-icon.pass` / `.summary-dot.pass` with `status-success` token | None |

### 4. Interaction Audit
- **Keyboard:** Check items are `tabindex="0"` with `@keydown` handling `Enter` and `Space` (preventDefault + click). Run button is a native `<button>` (Enter/Space free). Good.
- **ARIA:** `role="region"` + `aria-label` on container (line 257); `role="progressbar"` with `aria-valuenow/valuemin/valuemax/aria-label` (line 268); status icons carry `aria-label` (Passed/Failed/Warning/Skipped/Pending). Running spinner icon (line 246) has **no** `aria-label` — a minor a11y gap (running state announces nothing). Run button has `aria-label="Run validations"`.
- **Roles note:** `<ul role="list">` + `<li role="listitem">` are redundant explicit roles (Safari strips list semantics when `list-style:none`, so the explicit roles are a defensible workaround). Not a defect.
- **CustomEvents:** `ai-validation-run` (detail `{checks}`), `ai-validation-item-click` (detail `{id,label,status}`) — both `bubbles:true, composed:true`, correct for shadow DOM. `ai-validation-complete` is declared in JSDoc (line 14) but **never dispatched** in code — documentation/implementation mismatch (flag, not a token fix).
- **Touch targets:** Run button ≈ `font-xs` + `6/16` padding → roughly 28px tall; check items ≈ `8/12` padding + 14px text → roughly 30px tall. Both below the 44px minimum. This is a sizing/design change, noted here only (not in fixes array).

### 5. Visual Design Check
- **Modern/sleek?** Yes — pill run button, thin progress track, clean status icons, summary dots. Reads contemporary.
- **Radius:** Consistent, well-tiered.
- **Breathing room:** Adequate (`spacing-20` container padding, `spacing-16` section gaps).
- **Dividers:** Present before the summary; uses divider token (minus the 1px literal).
- **Typography hierarchy:** Title `base/semibold` → label `sm/medium` → desc/stats `xs`. Clear hierarchy.
- **Showcase-ready (HeroUI/Vercel)?** Close. The unicode glyph icons (`&#10003;` etc.) read slightly less polished than vector SVGs, and touch targets are tight. Verdict: **adequate**.

### 6. Fixes Needed
1. **Line 168** — `.divider { height: 1px; }` → `height: var(--cg-border-width-50);`. Raw magic pixel; `--cg-border-width-50` (1px) is the semantic divider/hairline token. (token-verified)

Flags (no token-verified auto-fix; describe only):
- **Lines 72, 119** — focus-ring `box-shadow: 0 0 0 3px ...` uses a bare `3px` spread. No clean spread-width token exists in the vocab; leave or standardize via a focus-ring convention. Consider switching the ring color to `--cg-color-focus-ring` for consistency with the rest of the system.
- **Line 246** — running spinner icon lacks an `aria-label` (e.g. "Running"); other status icons have one. A11y gap, not a token issue.
- **Line 14 vs code** — `ai-validation-complete` event is documented but never dispatched. Implement the dispatch (e.g. when all checks leave pending/running) or remove the JSDoc.
- **Touch targets** — run button (~28px) and check items (~30px) are below 44px. Design/sizing change.

### Research-backed enhancements

Modern 2025 checklist/validation surfaces (Linear's issue-state rows, Vercel's deploy-step lists, shadcn's `data-state`-driven items) lean on staggered reveals, a single moving accent, and per-row status transitions rather than a single bulk progress bar. Concrete upgrades for `ai-validation-checklist`:

1. **Per-item status-transition animation (Linear / shadcn `data-state` pattern).** Right now status only swaps the glyph. Animate the icon container on pending→pass/fail with a fast scale-pop (`transform: scale(0.6)→1` over `--cg-transition-duration-fast`) and cross-fade the color, so each row visibly "resolves" as validation completes. This mirrors how Linear animates issue-state dots and shadcn drives item states off `data-state`, and gives the live feedback the search results call for ("step-by-step validation helps users correct errors as they type"). Gate behind `prefers-reduced-motion` (already wired in).

2. **Staggered list reveal on run (Vercel deploy-list pattern).** When `ai-validation-run` fires, reveal/refresh rows with a small per-index delay (`transition-delay: calc(var(--index) * 40ms)`) instead of all-at-once. Vercel's build-step lists use exactly this cascade to communicate sequence and progress. Cheap to add via an `--index` custom prop on each `<li>` and a one-shot opacity/translateY entrance.

3. **Indeterminate "scanning" treatment on the progress track while running (Vercel/Linear loading idiom).** The current track is purely determinate. While `isRunning` and checks are still pending, overlay a subtle animated sheen/stripe on the filled portion so an in-flight run reads as active rather than stalled at a fixed percentage. Use existing motion tokens; remove on completion. This pairs with fix #4 below for the missing `aria-busy` semantics.

4. **Density toggle + monospace counts (Linear comfortable/compact pattern).** Linear ships a comfortable/compact density switch; checklists with 20+ rows benefit. Add a `density="compact"` attribute that drops item padding to `--cg-spacing-6`/`--cg-spacing-8` and tightens gaps, and render the summary "passed/total" counts in a tabular/monospace numeric style so digits don't reflow as the run progresses.

5. **Replace unicode glyphs with inline vector icons (shadcn / Lucide aesthetic).** §5 already flags the `&#10003;`-style unicode marks as the main thing keeping this from showcase-grade. shadcn and the broader 2025 component set standardize on Lucide-style 1.5px-stroke vector icons (check, x, alert-triangle, minus, loader). Swapping to Lit `svg` templates (per the CLAUDE.md SVG gotcha) sharpens rendering, makes stroke weight consistent across status icons, and lets the spinner share the same visual family.

6. **Add `:active` press affordance and `aria-busy` for the live region (missing-state coverage).** The 2025 state checklist (default/hover/active/focus/disabled/error) treats Active as first-class; this component has no `:active` feedback (§3). Add a quick `transform: scale(0.98)` press on `.run-btn` and `.check-item`, and set `aria-busy="true"` on the `role="region"` container while `isRunning` so assistive tech announces the in-flight state (complements the missing spinner `aria-label` flagged in §4).

Sources: [8 Essential UI Validation Methods for Flawless UX in 2025 — Uxia](https://www.uxia.app/blog/ui-validation), [8 Essential User Experience Design Patterns for 2025 — Pages Report](https://www.pages.report/blog/user-experience-design-patterns), [UI Component Library Checklist — UXPin](https://www.uxpin.com/studio/blog/ui-component-library-checklist-essential-elements/).
