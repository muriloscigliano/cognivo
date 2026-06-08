## ai-streaming-text — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 33 | `animation` duration | `var(--cg-transition-duration-fast)` | Yes (tier-1) | None |
| 33 | `animation` easing | `var(--cg-transition-easing-default)` | Yes (tier-1) | None |
| 37 | `font-size` | `var(--cg-font-size-sm)` | Yes (tier-1, 14px floor met) | None |
| 38 | `color` | `var(--cg-color-surface-base-text)` | Yes (tier-2) | None |
| 39 | `line-height` | `var(--cg-line-height-relaxed)` | Yes (tier-1) | None |
| 40 | `word-wrap` | `break-word` | Yes (CSS keyword) | None |
| 44 | `color` (.empty) | `var(--cg-color-input-text-placeholder)` | Yes (tier-2) | None |
| 45 | `font-style` (.empty) | `italic` | Yes (CSS keyword) | None |
| 51 | `white-space` (.plain) | `pre-wrap` | Yes (CSS keyword) | None |

All declared values resolve to real tokens present in the vocab files. No magic px, no raw hex/rgba, no tier-1 palette colors, no comma-fallbacks, no `transition: all`. Animation keyframes (`fadeSlideIn`) and reduced-motion handling come from shared, vetted style modules (`fadeSlideInKeyframes`, `reducedMotion`).

### 2. Styling Audit
- **Border radius:** None used. The component is an inline/block text wrapper; no surface or container that would need radius. Acceptable — it inherits the rendering surface (`cg-markdown`) for content chrome.
- **Spacing:** No explicit padding/margin/gap. The component is a transparent text region by design and inherits layout spacing from its parent message bubble. Acceptable.
- **Font-size accessibility:** Body text uses `--cg-font-size-sm` (14px), exactly at the documented minimum. Pass.
- **Translucent vs solid borders:** No borders declared. N/A.
- **Transitions explicit vs all + motion tokens:** Only an `animation` shorthand (entrance) using motion tokens `--cg-transition-duration-fast` + `--cg-transition-easing-default`. No `transition: all`. Reduced-motion respected via the shared `reducedMotion` block. Pass.
- **Dark-theme suitability:** Uses semantic `--cg-color-surface-base-text` and `--cg-color-input-text-placeholder`, both theme-aware tier-2 tokens. Dark-first safe. Pass.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.container` renders content (markdown or plain) | None |
| Hover | N/A | Non-interactive text region; no pointer affordance expected | None — text display only |
| Active/Press | N/A | No interactive target | None |
| Focus-visible | N/A | No focusable element; live region is announced, not tabbed | None |
| Disabled | N/A | No interactive control to disable | None |
| Loading | Yes | `streaming` property → `aria-busy="true"`; empty placeholder "Waiting for content..." before first chunk | No visual streaming cue (caret/shimmer); see note |
| Error | No | No error state surfaced | Flag — no failure path; see note |
| Success | Partial | `complete()` flips `streaming=false`/`aria-busy="false"` and fires `ai-streaming-complete`, but no visual "complete" treatment | Acceptable for a text renderer |

Notes (design-level, not token violations):
- The component represents the AI **streaming** lifecycle state but has no visual streaming indicator (animated caret, shimmer, or `--cg-color-ai-streaming-*` accent). The dedicated AI-state family exists for exactly this (`--cg-color-ai-streaming-text`/`-background`/`-border`/`-glow`). Consider a streaming caret or subtle accent driven by those tokens when `streaming` is true. Feature/design recommendation, not a token fix (no current token is wrong).
- No error rendering path. If a stream errors there is no `--cg-color-ai-error-*` treatment. Recommend an optional error state. Design-level.

### 4. Interaction Audit
- **Keyboard:** None required — the component is a non-interactive live text region. Correct.
- **ARIA:** `role="status"`, `aria-live="polite"`, and `aria-busy` bound to `streaming`. The live region is always rendered (per the inline comment) so the first chunk is announced. Correct, good a11y pattern for streaming output; `polite` is the right politeness level for incremental AI text.
- **CustomEvents:**
  - `ai-streaming-chunk` — `{ chunk: string, total: string }`, `bubbles: true, composed: true`. Correct, crosses shadow boundary, payload sensible.
  - `ai-streaming-complete` — `{ content: string }`, `bubbles: true, composed: true`. Correct.
  - Event names match the `@fires` JSDoc. `reset()` clears content/streaming but fires no event — acceptable (no documented contract).
- **Touch targets:** N/A — no interactive controls.

### 5. Visual Design Check
- Modern/sleek? Adequate. Intentionally minimal: a typographic text region delegating rich rendering to `cg-markdown`. Entrance animation (fade-slide-in) adds polish.
- Radius / dividers? None — appropriate for an inline text renderer with no chrome.
- Breathing room? Inherited from parent; `line-height: relaxed` gives comfortable reading.
- Typography hierarchy? Single body level (sm) plus an italic muted placeholder — sufficient for scope; richer hierarchy lives in `cg-markdown`.
- HeroUI/Vercel showcase-ready? Standalone it is plain. To showcase as an "AI streaming" element it would benefit from a streaming caret / `--cg-color-ai-streaming-*` accent (see §3). Functionally and token-wise it is clean.
- One-word verdict: **strong** (token compliance + a11y); visually adequate, the streaming-state cue is the main enhancement opportunity.

### 6. Fixes Needed
No fixes needed — component is compliant. Every CSS value maps to a real token in the vocab; there are no comma-fallbacks, magic numbers, raw colors, tier-1 palette colors, or banned `transition: all`, and body font-size meets the 14px floor.

Design-level recommendations (not token fixes, not applied):
1. Add a visual streaming indicator (animated caret or subtle accent) gated on `streaming`, using the dedicated `--cg-color-ai-streaming-text` / `--cg-color-ai-streaming-glow` family, so the component visually expresses its AI lifecycle state.
2. Consider an optional error rendering path using `--cg-color-ai-error-*` for failed streams.

### Research-backed enhancements

Modern 2025-era AI chat surfaces (Vercel AI Elements built on shadcn/ui, the shadcn Chatbot Kit, and Linear's near-black + lavender-accent aesthetic) have converged on a richer "streaming text" vocabulary than a plain typographic region. Concrete, component-specific upgrades for `ai-streaming-text`:

1. **Blinking token caret at the live tail.** Vercel AI Elements and every ChatGPT-style clone render a thin blinking caret pinned to the end of the streamed text while tokens arrive, then fade it out on `complete()`. Add an `::after` pseudo-element on `.container` gated by `[aria-busy="true"]`, driven by `--cg-color-ai-streaming-text` for fill and the existing `reducedMotion` block to suppress the blink. This is the single highest-signal "it's generating" affordance and directly fills the §3 "no visual streaming cue" gap. (Source: [Vercel AI Elements](https://vercel.com/changelog/introducing-ai-elements), [shadcn.io AI](https://www.shadcn.io/ai))

2. **Skeleton shimmer for the pre-first-chunk wait, not italic placeholder text.** The shadcn Chatbot Kit and shadcn.io AI components replace "Waiting for content..." copy with 1-2 shimmering skeleton lines during the gap before the first token. Swap the `.empty` italic string for a shimmer-gradient block (the codebase already ships `fadeSlideInKeyframes`-style shared modules; add a shimmer keyframe using `--cg-color-ai-streaming-background` → `--cg-color-ai-streaming-glow`). Skeletons read as "working" rather than "stalled," lowering perceived latency. (Source: [Shadcn Chatbot Kit](https://www.shadcn.io/template/blazity-shadcn-chatbot-kit), [50+ React AI Chat Components](https://www.shadcn.io/ai))

3. **Token-fade-in micro-animation per chunk.** patterns.dev's AI UI patterns and AI Elements animate each incoming chunk with a sub-100ms opacity/translate-y fade so text "materializes" instead of hard-jumping. Wrap each `ai-streaming-chunk` append in a span carrying a short `fadeSlideIn` reusing `--cg-transition-duration-fast` + `--cg-transition-easing-default` (already imported). Keep it strictly gated behind `prefers-reduced-motion`. (Source: [patterns.dev AI UI Patterns](https://www.patterns.dev/react/ai-ui-patterns/))

4. **Hover-reveal response actions on completion.** On `ai-streaming-complete`, AI Elements surfaces a low-density action row (copy / regenerate / thumbs) that appears on hover of the finished message. Even if actions live in a parent bubble, `ai-streaming-text` should expose a `complete`-state hook/part (e.g. a `[data-complete]` attribute or a `::slotted` action slot) so the host can attach these without re-measuring. This addresses the §3 "no visual complete treatment" note with a real interaction affordance. (Source: [Vercel AI Elements](https://vercel.com/changelog/introducing-ai-elements), [Vercel Academy: AI Elements](https://vercel.com/academy/ai-sdk/ai-elements))

5. **Inline error chip with retry, using the AI-error token family.** Modern kits render a compact inline error row ("Generation interrupted · Retry") rather than dropping the stream silently. Add the optional error path flagged in §3/§6 as a small chip driven by `--cg-color-ai-error-background` / `--cg-color-ai-error-text` with a retry affordance that re-emits a custom event, keeping the failure visible and recoverable in-place. (Source: [Best AI Chat UI Kits 2026 — TheFrontKit](https://thefrontkit.com/blogs/best-ai-chat-ui-kits-2026), [patterns.dev](https://www.patterns.dev/react/ai-ui-patterns/))

6. **Linear-grade density and rhythm for the showcase view.** Linear/shadcn's house style pairs a near-black surface with a single restrained accent and tight, deliberate vertical rhythm. The current `--cg-font-size-sm` / `line-height: relaxed` body is correct; the standalone "plain" demo reads flat mainly because it lacks the streaming accent. Reserving the lavender-equivalent `--cg-color-ai-streaming-*` accent exclusively for the live caret/shimmer (and nothing else) is what makes these surfaces feel premium — restraint, not added chrome. (Source: [shadcn.io](https://www.shadcn.io/), Linear aesthetic per [TheFrontKit](https://thefrontkit.com/blogs/best-ai-chat-ui-kits-2026))
