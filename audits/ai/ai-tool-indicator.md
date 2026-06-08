## ai-tool-indicator — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 24 | gap (.tools) | `var(--cg-spacing-8)` | Yes | — |
| 30 | gap (.tool) | `var(--cg-spacing-12)` | Yes | — |
| 31 | padding (.tool) | `var(--cg-spacing-16) var(--cg-spacing-20)` | Yes | — |
| 32 | border-radius (.tool) | `var(--cg-border-radius-100)` | Yes | — |
| 33 | background (.tool) | `var(--cg-color-surface-cards-background)` | Yes | — |
| 34 | border (.tool) | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | Yes | — |
| 35 | font-size (.tool) | `var(--cg-font-size-xs)` | No | Body text below 14px → `--cg-font-size-sm` |
| 36 | font-weight (.tool) | `var(--cg-font-weight-medium)` | Yes | — |
| 37 | color (.tool) | `var(--cg-color-surface-container-outlined)` | Yes (valid token; semantically a muted text usage) | — |
| 39 | transition (.tool) | `border-color ... fast default, background ... fast default` | Yes — explicit props, valid duration/easing tokens | — |
| 40 | animation (.tool) | `slideIn var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out) both` | Yes | — |
| 41 | animation-delay | `calc(var(--tool-index, 0) * 60ms)` | Partial — positional index default `, 0` is allowed; `60ms` is a bare magic stagger increment | No verified token replacement (see report) |
| 44 | border-color (hover) | `var(--cg-color-surface-cards-hover-border)` | Yes | — |
| 45 | background (hover) | `var(--cg-color-surface-cards-hover-background)` | Yes | — |
| 49 | transform (keyframe) | `translateX(calc(-1 * var(--cg-spacing-8)))` | Yes — token-driven offset | — |
| 55-56 | width/height (.status-icon) | `var(--cg-spacing-16)` | Yes (spacing used as icon size; an icon-size token would be cleaner) | — |
| 65-66 | width/height (.spinner) | `var(--cg-spacing-12)` | Yes | — |
| 67 | border (.spinner) | `var(--cg-border-width-100) solid var(--cg-color-loading-spinner-secondary)` | Yes | — |
| 68 | border-top-color | `var(--cg-color-loading-spinner-primary)` | Yes | — |
| 69 | border-radius (.spinner) | `var(--cg-border-radius-full)` | Yes | — |
| 70 | animation (.spinner) | `spin 0.8s linear infinite` | Bare `0.8s`; loop timing, no matching token | No verified replacement (see report) |
| 75-76 | width/height (check/error svg) | `var(--cg-spacing-12)` | Yes | — |
| 78 | color (.check) | `var(--cg-color-status-success-text-default)` | Valid token; for AI-lifecycle "complete" state, `--cg-color-ai-complete-text` is the dedicated family | Recommend ai-* (see report) |
| 79 | color (.error-icon) | `var(--cg-color-status-error-text-default)` | Valid token; for AI-lifecycle "error" state, `--cg-color-ai-error-text` is preferred | Recommend ai-* (see report) |
| 83 | color (.complete .tool-name) | `var(--cg-color-surface-base-text)` | Yes | — |
| 84 | color (.error .tool-name) | `var(--cg-color-status-error-text-default)` | Valid; AI-error family preferred | Recommend ai-* (see report) |
| 88 | background gradient (loading shimmer) | `var(--cg-color-surface-container-outlined) ... var(--cg-color-surface-base-text) ...` | Yes — gradient stops use valid tokens | — |
| 89 | background-size | `300% 100%` | Yes — % allowed | — |
| 93 | animation (shimmer) | `textSweep 1.8s var(--cg-transition-easing-default) infinite` | Bare `1.8s`; loop timing, no matching token | No verified replacement (see report) |
| 102 | margin-top (.result) | `var(--cg-spacing-4)` | Yes | — |
| 103 | padding (.result) | `var(--cg-spacing-12) var(--cg-spacing-16)` | Yes | — |
| 104 | background (.result) | `var(--cg-color-surface-base-background)` | Yes | — |
| 105 | border-radius (.result) | `var(--cg-border-radius-100)` | Yes | — |
| 106 | border (.result) | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | Yes | — |
| 107 | font-size (.result) | `var(--cg-font-size-xs)` | No | Body/code text below 14px → `--cg-font-size-sm` |
| 108 | font-family (.result) | `var(--cg-font-family-mono)` | Yes | — |
| 109 | color (.result) | `var(--cg-color-surface-container-outlined)` | Yes | — |
| 110 | line-height (.result) | `var(--cg-line-height-relaxed)` | Yes | — |
| 112 | max-height (.result) | `200px` | No — bare magic px | No verified spacing token equals 200px; see report |
| 118 | padding (compact .tool) | `var(--cg-spacing-6) var(--cg-spacing-12)` | Yes | — |
| 123 | box-shadow (focus-visible) | `0 0 0 3px var(--cg-overlay-accent-strong)` | Mixed — `--cg-overlay-accent-strong` valid; bare `3px` ring width is magic; `--cg-color-focus-ring` is the dedicated focus token | See report |

### 2. Styling Audit

- **Border radius:** `--cg-border-radius-100` on rows and result panel — consistent and token-driven. Good.
- **Spacing:** All gap/padding/margin from the `--cg-spacing-*` scale. Clean.
- **Font-size accessibility:** Two violations. Both `.tool` (line 35) and `.result` (line 107) use `--cg-font-size-xs` (12px). Tool names are primary body text and must be ≥14px (`--cg-font-size-sm`). The result panel is monospace output but still readable body text; raise to `sm`.
- **Translucent vs solid borders:** Uses semantic `--cg-color-surface-cards-border` (solid semantic token). Appropriate.
- **Transitions explicit vs all:** Line 39 enumerates `border-color` and `background` explicitly — no `transition: all`. Compliant. Uses valid duration (`fast`) and easing (`default`) tokens.
- **Motion tokens:** slideIn entrance uses `--cg-transition-duration-default` + `--cg-transition-easing-ease-out` (good). Three looping animations use bare seconds: spinner `0.8s` (line 70), shimmer `1.8s` (line 93), and stagger increment `60ms` (line 41). These are loop/stagger timings with no matching token in the vocab, so not auto-fixable; flagged below.
- **Reduced motion:** Both the imported `reducedMotion` style and an explicit `@media (prefers-reduced-motion: reduce)` block (lines 126-130) disable spinner/entrance/shimmer and restore text fill color. Excellent coverage.
- **Dark-theme suitability:** All surface/text colors come from tier-2 semantic surface tokens that flip with theme. Dark-first safe.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.tool` base style, card surface, slideIn entrance | None |
| Hover | Yes | `.tool:hover` (lines 43-46) border + background shift | None |
| Active/Press | No | — | No `:active` press feedback; rows are clickable buttons, a subtle press state would improve affordance (design note) |
| Focus-visible | Yes | `.tool:focus-visible` box-shadow ring (lines 121-124) | Uses `--cg-overlay-accent-strong` + bare `3px`; consider `--cg-color-focus-ring` and a token-driven width |
| Disabled | N/A | No disabled concept for a read-only progress indicator | One-line: tool rows are status displays, not toggleable inputs |
| Loading | Yes | `.tool.loading` spinner + animated text shimmer (lines 64-94) | Strong; uses generic loading-spinner tokens (acceptable) but the AI-streaming family could reinforce lifecycle semantics |
| Error | Yes | `.tool.error` red icon + red tool-name (lines 79, 84) | Uses `status-error`; AI-error family preferred per AI-state convention |
| Success | Yes | `.tool.complete` check icon + base-text name (lines 78, 83) | Uses `status-success` for icon; AI-complete family preferred |

### 4. Interaction Audit

- **Keyboard:** `@keydown` handler (line 182) supports Enter and Space, calls `preventDefault()` to stop page scroll on Space. `tabindex="0"` makes each row focusable. Correct.
- **ARIA roles/labels/states:** Container has `role="status"` + `aria-label="Tool calls"` (line 176) — appropriate live-region for streaming progress. Each row has `role="button"` and a composed `aria-label` of humanized name + status (line 180). Solid. Missing: `aria-expanded` on the row when a result panel can toggle open/closed — the row toggles `.result` visibility but does not expose expanded state to AT. Recommend adding `aria-expanded` bound to `_expandedIndex === i` and ideally `aria-controls` on rows that have a result.
- **CustomEvents:** `ai-tool-click` dispatched with `bubbles: true, composed: true` and `detail: { index, tool }` (lines 160-163). Crosses shadow boundary correctly; detail shape matches the documented `@fires` JSDoc. Correct.
- **Touch targets:** Default rows have `--cg-spacing-16` vertical padding + text ≈ comfortably ≥44px. Compact mode (line 118) drops to `--cg-spacing-6` vertical padding, which likely falls below the 44px minimum target. Design note (not a token fix).

### 5. Visual Design Check

Clean, modern card-row treatment: staggered slide-in entrance, animated gradient text shimmer during loading, and crisp check/error iconography. Radius and spacing are consistent and token-driven. The animated shimmer-on-text loading affordance is a genuinely premium touch and reads as showcase-quality. Breathing room is good in default mode. Weak points are minor: 12px type undercuts the otherwise polished feel and accessibility, the focus ring leans on an overlay token rather than the dedicated focus-ring token, and there is no press state. Dividers/hierarchy are handled via surface contrast rather than rules, which suits the dense list. HeroUI/Vercel showcase-ready after the type bump.

One-word verdict: **strong**

### 6. Fixes Needed

1. **Line 35** — `.tool` font-size. Current: `font-size: var(--cg-font-size-xs);` → Fixed: `font-size: var(--cg-font-size-sm);`. Why: tool-name is primary body text; 12px (xs) violates the 14px minimum for readable body copy and accessibility.

2. **Line 107** — `.result` font-size. Current: `font-size: var(--cg-font-size-xs);` → Fixed: `font-size: var(--cg-font-size-sm);`. Why: result panel body/code text below the 14px minimum.

**Flags (no verified token replacement — described, not auto-fixed):**

- **Line 112** — `.result max-height: 200px;` is a bare magic pixel value. No `--cg-spacing-*` token resolves to 200px and no component-tier token exists for this element, so it cannot be swapped without inventing a token. Recommend adding a tier-3 token (e.g. an `ai-tool-indicator` result max-height) rather than leaving a raw px.
- **Lines 41 / 70 / 93** — bare animation timings (`60ms` stagger, `0.8s` spinner loop, `1.8s` shimmer loop). These are loop/stagger values with no matching duration token in the vocab; flagged for a future motion-token addition.
- **Line 123** — focus ring `box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);`. The `3px` ring width is a magic number and the color should use the dedicated `--cg-color-focus-ring` token rather than `--cg-overlay-accent-strong`. Color swap is safe (`--cg-color-focus-ring` is a real token) but the bare `3px` has no clean token equivalent for box-shadow spread; flagged as a focus-token alignment improvement.
- **AI-state color alignment** — this component renders the AI tool-call lifecycle (loading / complete / error). Lines 78 and 83-84 use the generic `status-success` / `status-error` families. The dedicated AI-state tokens (`--cg-color-ai-complete-text` for the complete check/name, `--cg-color-ai-error-text` for the error icon/name, and the `--cg-color-ai-streaming-*` family for the loading shimmer) better express lifecycle semantics. Recommended, not auto-applied, since current tokens are valid and this is a semantic refinement.
- **Accessibility** — add `aria-expanded` (bound to `_expandedIndex === i`) to rows that toggle a result panel so assistive tech is informed of expand/collapse state.

### Research-backed enhancements

Patterns drawn from the 2025-era AI-component ecosystem (Vercel AI Elements, shadcn.io AI components, the "tool-call render pattern"):

1. **Two-phase state, not one.** Vercel AI Elements splits a tool invocation into `state === 'call'` (LLM requested it — show "Executing…" the instant the call arrives) and `state === 'result'` (server `execute` finished). This component conflates request and execution into a single `loading` state. Add a distinct **"requested/queued"** phase (e.g. a dimmed pending row with a pulse rather than the active spinner) so a tool that is awaiting dispatch reads differently from one actively running. ([Vercel AI Elements](https://vercel.com/changelog/introducing-ai-elements), [tool-call render pattern](https://stackademic.com/blog/the-tool-call-render-pattern-turning-your-ai-from-a-chatty-bot-into-a-doer))

2. **Make the result panel a real collapsible with status-bearing header.** shadcn.io's Sandbox/tool-use family uses a *collapsible container with status indicators and tabbed navigation* for tool output. Right now the `.result` toggles open with no disclosure affordance and (per the States audit) no `aria-expanded`. Add a chevron that rotates on expand (`transform: rotate()` on the existing `--cg-transition-duration-fast`), wire `aria-expanded`/`aria-controls`, and let the row header carry the status chip so collapsed rows still communicate success/error at a glance. ([shadcn.io AI components](https://www.shadcn.io/ai))

3. **Auto-collapse completed tools, keep the active one expanded.** The prompt-kit / AI Elements convention for multi-step agent runs is to surface the *currently executing* step and quietly fold finished ones into a compact summary line. For long tool chains this component will grow unbounded; add a `dense`/auto-collapse behavior where `complete` rows shrink to the compact (`--cg-spacing-6`) padding and only the in-flight tool gets full height. ([prompt-kit Vercel AI SDK](https://www.prompt-kit.com/vercel-ai-sdk))

4. **Replace the looping linear spinner with a count-up/elapsed affordance.** Modern tool indicators (Vercel "Executing…", shadcn tool-use) increasingly pair the spinner with a live elapsed-time or step counter ("Searching… 1.2s") because indeterminate spinners hide whether a long-running tool is healthy. Add an optional monospace elapsed-time readout next to the spinner, reusing the existing `--cg-font-family-mono`. This directly mitigates the indeterminate-progress weakness and reads as premium. ([Vercel AI Elements](https://vercel.com/changelog/introducing-ai-elements))

5. **Add a per-tool retry affordance on the error state.** AI Elements explicitly calls out *retries* as production-grade requirements alongside streaming UI and tool previews. The current `error` state is terminal — red icon, dead end. Add an inline retry button on `.tool.error` that dispatches an `ai-tool-retry` CustomEvent (mirroring the existing `ai-tool-click` shape), giving the row a recovery path instead of a failure dead-end. ([Vercel AI Elements](https://vercel.com/changelog/introducing-ai-elements))

6. **Subtle press/active feedback to match the showcase tier.** The States audit already flags the missing `:active` state. The Linear/Vercel showcase idiom for clickable rows is a brief scale/translate settle on press (`transform: scale(0.99)` over `--cg-transition-duration-fast`, gated behind `prefers-reduced-motion`). Cheap to add, closes the last interaction-affordance gap noted in the visual review.

Sources:
- [Introducing AI Elements — Vercel](https://vercel.com/changelog/introducing-ai-elements)
- [The AI-Native shadcn/ui Component Library](https://www.shadcn.io/ai)
- [The 'tool-call' Render Pattern — Stackademic](https://stackademic.com/blog/the-tool-call-render-pattern-turning-your-ai-from-a-chatty-bot-into-a-doer)
- [Vercel AI SDK UI components — prompt-kit](https://www.prompt-kit.com/vercel-ai-sdk)
