## ai-chat — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 53 | min-height | `--cg-component-ai-chat-min-height` | Yes | — |
| 54 | max-height | `--cg-component-ai-chat-max-height` | Yes | — |
| 55 | background | `--cg-color-surface-cards-background` | Yes | — |
| 56 | border-radius | `--cg-component-ai-chat-radius` | Yes | — |
| 57 | border | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | — |
| 67 | padding | `--cg-spacing-24` | Yes | — |
| 70 | gap | `--cg-spacing-16` | Yes | — |
| 75 | max-width | `85%` | Yes (% allowed) | — |
| 76 | animation | `--cg-transition-duration-slow` + `--cg-transition-easing-default` | Yes | — |
| 82 | transform translateY | `--cg-spacing-8` (keyframe) | Yes | — |
| 88 | padding | `--cg-spacing-12` `--cg-spacing-20` | Yes | — |
| 89 | border-radius | `--cg-border-radius-200` | Yes (tier-1 ok; no tier-3 bubble radius token) | — |
| 90 | line-height | `--cg-line-height-relaxed` | Yes | — |
| 91 | font-size | `--cg-font-size-sm` | Yes (≥14px body) | — |
| 92 | border | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | — |
| 95 | background (user bubble) | `--cg-overlay-accent-subtle` | Yes (overlay tier-1, allowed) | — |
| 96 | color | `--cg-color-surface-base-text` | Yes | — |
| 97 | border-bottom-right-radius | `--cg-spacing-4` | Borderline — spacing token used as radius | Acceptable; no dedicated micro-radius token. Flag only. |
| 98 | border-color | `--cg-overlay-accent-medium` | Yes | — |
| 101 | background (ai bubble) | `--cg-color-surface-cards-background` | Yes | — |
| 102 | color | `--cg-color-surface-base-text` | Yes | — |
| 103 | border-bottom-left-radius | `--cg-spacing-4` | Borderline (see L97) | Flag only |
| 106-108 | error bubble bg/text/border | `--cg-color-status-error-*` | Yes (generic error ok here; ai-error reserved for AI-lifecycle badges) | — |
| 114 | width (cursor) | `--cg-spacing-2` | Yes | — |
| 115 | height (cursor) | `--cg-spacing-16` | Yes | — |
| 116 | background (cursor) | `--cg-color-action-primary-background-default` | Suboptimal — cursor IS the streaming-state indicator | Recommend `--cg-color-ai-streaming-background` (see Fixes) |
| 117 | margin-left | `--cg-spacing-1` | Yes | — |
| 119 | animation | `1s step-end` | Yes (keyframe timing literal) | — |
| 129 | gap | `--cg-spacing-4` | Yes | — |
| 130 | margin-top | `--cg-spacing-6` | Yes | — |
| 131 | opacity | `0` | Yes (scalar) | — |
| 132 | transition | `--cg-transition-duration-fast` + `--cg-transition-easing-default` | Yes (explicit) | — |
| 140 | gap | `--cg-spacing-4` | Yes | — |
| 141 | margin-top | `--cg-spacing-4` | Yes | — |
| 144 | font-size (version-label) | `--cg-font-size-xs` | OK (metadata caption, not body) | — |
| 145 | color (version-label) | `--cg-color-surface-container-outlined` | Yes | — |
| 151 | padding | `0` `--cg-spacing-20` `--cg-spacing-4` | Yes | — |
| 155 | margin | `0 auto` `--cg-spacing-8` | Yes | — |
| 156 | bottom/right/z-index | `--cg-spacing-80` / `--cg-spacing-20` / `10` | Yes (z-index scalar ok) | — |
| 157 | padding | `0` `--cg-spacing-20` `--cg-spacing-12` | Yes | — |
| 161 | padding | `--cg-spacing-12` `--cg-spacing-16` | Yes | — |
| 167 | gap | `--cg-spacing-8` | Yes | — |
| 168 | padding | `--cg-spacing-8` …`--cg-spacing-16` | Yes | — |
| 169 | background | `--cg-color-input-background-default` | Yes | — |
| 170 | border | `--cg-border-width-50` + `--cg-color-input-border-default` | Yes | — |
| 171 | border-radius | `--cg-border-radius-200` | Yes | — |
| 172-174 | transition | duration-fast + easing-default (border-color, box-shadow) | Yes (explicit) | — |
| 177 | border-color (focus) | `--cg-color-input-border-focus` | Yes | — |
| 178 | box-shadow | `0 0 0 3px` + `--cg-overlay-accent-strong` | **No** — bare `3px` magic ring width | Flag (no 3px spacing token; see §6) |
| 185 | color (textarea) | `--cg-color-input-text-default` | Yes | — |
| 187 | font-size | `--cg-font-size-sm` | Yes | — |
| 188 | line-height | `--cg-line-height-relaxed` | Yes | — |
| 190 | padding | `--cg-spacing-4` `0` | Yes | — |
| 191 | min-height | `--cg-spacing-24` | Yes | — |
| 192 | max-height | `--cg-component-ai-chat-textarea-max-height` | Yes | — |
| 195 | color (placeholder) | `--cg-color-input-text-placeholder` | Yes | — |
| 200-201 | width/height (icon-btn) | `--cg-spacing-32` | Yes (token); 32px < 44px target — see §4 | — |
| 202 | border-radius | `--cg-border-radius-full` | Yes | — |
| 208-211 | transition | duration-fast + easing-default (bg, opacity, border) | Yes (explicit) | — |
| 213 | transform scale | `--cg-interaction-press-scale` | Yes (real token, resolves to 0.97) | — |
| 214 | opacity (disabled) | `0.3` | Yes (scalar) | — |
| 217 | background (send) | `--cg-color-action-primary-background-default` | Yes | — |
| 218 | color (send) | `--cg-color-action-primary-text-default` | Yes | — |
| 221 | background (send hover) | `--cg-color-action-primary-background-hover` | Yes | — |
| 226 | color (mic) | `--cg-color-input-text-placeholder` | Yes | — |
| 227 | border (mic) | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | — |
| 231 | color (mic hover) | `--cg-color-surface-base-text` | Yes | — |
| 232 | border-color (mic hover) | `--cg-color-input-border-hover` | Yes | — |
| 234-236 | mic recording fg/border/bg | `--cg-color-status-error-*` | Yes (live-recording = error/destructive cue, valid) | — |
| 237 | animation | `1.5s ease-in-out` | Yes (keyframe timing) | — |
| 251 | color (empty) | `--cg-color-surface-container-outlined` | Yes | — |
| 252 | gap | `--cg-spacing-12` | Yes | — |
| 256 | font-size (empty-text) | `--cg-font-size-base` | Yes | — |
| 257 | font-weight | `--cg-font-weight-medium` | Yes | — |
| 261 | border-radius (none) | `0` | Yes | — |
| 262 | border-radius (sm) | `--cg-border-radius-100` | Yes | — |
| 263 | border-radius (md) | `--cg-border-radius-150` | Yes | — |
| 264 | border-radius (lg) | `--cg-component-ai-chat-radius` | Yes | — |

No comma-fallbacks present. No raw hex/rgba. No tier-1 palette colors (`--cg-gray/red/blue/...`). No `transition: all`. No made-up token names.

### 2. Styling Audit

- **Border radius:** Tier-3 `--cg-component-ai-chat-radius` drives the container with proper `rounded` variant overrides (none/sm/md/lg → 0/100/150/own). Bubbles use `--cg-border-radius-200` with a `--cg-spacing-4` "tail" corner (ChatGPT/Claude style). Input box uses `--cg-border-radius-200`, icon buttons `--cg-border-radius-full`. Consistent and intentional.
- **Spacing:** Entirely on the token scale (`--cg-spacing-1` through `-80`). No magic numbers in spacing.
- **Font-size accessibility:** Body copy in bubbles (L91) and textarea (L187) both `--cg-font-size-sm` (≥14px). Caption/metadata `--cg-font-size-xs` only on the version label (L144) — acceptable non-body micro-text. Empty-state uses `--cg-font-size-base`. Compliant.
- **Translucent vs solid borders:** Container/bubble borders use solid semantic `--cg-color-surface-cards-border`; user bubble border uses translucent `--cg-overlay-accent-medium` — appropriate for the tinted accent bubble.
- **Transitions:** All explicit property lists (`border-color`, `box-shadow`, `background-color`, `opacity`). No `transition: all`. Motion tokens (`--cg-transition-duration-fast/slow`, `--cg-transition-easing-default`) used throughout. `@media (prefers-reduced-motion: reduce)` disables slideIn and cursor blink — strong.
- **Dark-theme suitability:** All colors come from the semantic surface/action/input families which are theme-aware. Dark-first compliant.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.bubble`, `.input-box`, `.icon-btn` resting styles | None |
| Hover | Yes | `.msg:hover .actions` reveal; `.send-btn:hover`, `.mic-btn:hover` | None |
| Active/Press | Yes | `.icon-btn:active:not(:disabled)` → `scale(--cg-interaction-press-scale)` | Press scale only on icon buttons; cg-button children own their own press state |
| Focus-visible | Partial | `.input-box:focus-within` ring (box-shadow); `.msg:focus-within .actions` | Native `.icon-btn`s (send/mic) have **no** `:focus-visible` outline — keyboard focus invisible on these two buttons |
| Disabled | Yes | `.icon-btn:disabled` (opacity 0.3); `?disabled` bound to streaming/thinking/empty input | None |
| Loading | Yes | `_isThinking` → `<ai-thinking>`; `_isStreaming` → cursor + Stop button; inputs disabled | None |
| Error | Yes | `.bubble.error` + `isError` message path + `ai-error` event; mic error resets recording | None |
| Success | Yes | Copy → `status="success"` on cg-button + "Copied" label, 2s reset | None |

### 4. Interaction Audit

- **Keyboard:** `Enter` sends (Shift+Enter newline), guarded by `_isComposing` for IME safety (L692-697). All action/version controls are `cg-button` (focusable, Enter/Space native). Native send/mic `<button>`s are keyboard-activatable.
- **ARIA:** `role="log"` + `aria-live="polite"` + `aria-label` on messages region (L714); `role="article"` + per-message `aria-label` (L723); thinking `role="status"` (L770); empty `role="status"` (L703); mic `aria-pressed` reflects recording (L825); send/mic/textarea/version/scroll/stop all have `aria-label`s; cursor `aria-hidden`. Strong coverage.
- **CustomEvents:** `ai-message-sent`, `ai-response-received`, `ai-error`, `ai-chat-stop`, `ai-chat-copy {content}`, `ai-chat-regenerate {messageId}`, `ai-chat-rate {messageId, rating}` — all `bubbles: true, composed: true`. Details match the JSDoc contract (sent/received/error also add `timestamp`, a benign superset). Correct.
- **Touch targets:** Send/mic icon buttons are `--cg-spacing-32` (32×32px) — **below the 44px minimum**. Action-row `cg-button size="sm"` likewise small. Design enlargement (not a token violation) — recommend bumping the primary send/mic hit area toward 44px.

### 5. Visual Design Check

Modern, ChatGPT/Claude-class layout: fused input box with `focus-within` glow ring, circular send/mic icon buttons, tail-corner message bubbles, slide-in animation, streaming cursor, hover-revealed action row, follow-up chips, scroll-to-bottom affordance, and a reduced-motion path. Radius hierarchy and breathing room (24px message padding, 16px gaps) are well-judged. Dividers are intentionally absent in favor of surface contrast (appropriate for chat). Typography hierarchy is clean (sm body, xs metadata, base/medium empty headline). The only polish gaps: native send/mic buttons lack a visible keyboard focus ring, and their 32px hit area is under the touch target. Showcase-ready. **Verdict: strong.**

### 6. Fixes Needed

1. **Line 116 — streaming cursor color.** The blinking cursor is the visual marker of the AI *streaming* lifecycle state, so it should use the dedicated AI-streaming family rather than the generic primary action color.
   - Current: `background: var(--cg-color-action-primary-background-default);`
   - Fixed: `background: var(--cg-color-ai-streaming-background);`
   - Why: Per the AI-state token convention, streaming UI must use `--cg-color-ai-streaming-*` so the lifecycle reads consistently across AI components. `--cg-color-ai-streaming-background` is a verified token in the colors vocab.

**Flags (no token-verified fix — do not auto-apply):**
- **Line 178 — focus-ring uses bare `3px`.** `box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong)` contains a magic `3px`. There is no `--cg-spacing-3` (scale jumps 2 → 4) and no focus-ring-width token in the vocab, so no in-scope replacement exists. Recommend adding a focus-ring width token (or using `--cg-spacing-2`) rather than the hard-coded value.
- **Lines 97/103 — spacing token used as radius.** `--cg-spacing-4` drives the bubble tail corner. Functional and on-scale, but a dedicated micro-radius token (e.g. `--cg-border-radius-50`) would be semantically cleaner. Not a violation.
- **Send/mic buttons (lines 200-201, 819-837) — missing `:focus-visible` outline** and **32px touch target (<44px).** Accessibility/design flags, not token violations.

### Research-backed enhancements

Sourced from current (2025-era) chat patterns shipped by shadcn-chatbot-kit, Vercel's v0 / AI SDK chat templates, Chatcn, and the Linear/HeroUI interaction vocabulary.

1. **Container-query layout instead of viewport breakpoints** (shadcn-chatbot-kit, Chatcn). The kit's `ChatContainer` adapts header/messages/toolbar via *container queries* on available width, not the viewport. `ai-chat` currently fixes bubble `max-width: 85%` and a static 24px message padding regardless of how narrow the embed is. Wrap the messages region in `container-type: inline-size` and step bubble `max-width` (e.g. 92% → 85% → 75%) and padding with `@container` rules so the component reads correctly when docked in a 360px sidebar vs. a full-width page — a real differentiator for a framework-agnostic embeddable.

2. **Streaming token "shimmer"/fade-in, not just a blinking cursor** (Vercel AI SDK chat templates). Modern streaming UIs fade each arriving token/word in (opacity + 2px translateY over ~120ms) so the response reads as living text rather than a teletype caret. The current implementation is cursor-only (L114-119). Add a `.bubble.ai [data-streamed] > *` fade-in keyframe gated behind `prefers-reduced-motion` — this is the single highest-impact "feels 2025" upgrade for an AI chat.

3. **Prompt-suggestion chips in the empty state, with staggered entrance** (shadcn-chatbot-kit "prompt suggestion buttons"). The empty state (L251-257) is currently icon + headline text only. Modern chat empties offer 3-4 tappable starter prompts that fill the textarea on click. Reuse the existing follow-up chip styling, render them in the empty state, and add a staggered `animation-delay` (40ms steps) entrance — this reduces blank-canvas cognitive load (availability heuristic) and is now a baseline expectation.

4. **Hover-revealed message actions should also appear on `:focus-within` for keyboard + always-on for touch** (Linear interaction model). Actions reveal on `.msg:hover` (L131-132) and `:focus-within` is partially wired, but touch users get no hover. Add a coarse-pointer media query (`@media (hover: none) { .actions { opacity: 1 } }`) so copy/regenerate/rate are reachable on mobile, matching Linear's "affordances never hidden behind hover-only on touch" rule.

5. **Sticky, auto-hiding scroll-to-bottom with unread affordance** (shadcn-chatbot-kit auto-scrolling message area). The scroll-to-bottom button exists (L156) but is a static control. The current pattern is: auto-stick to bottom while at bottom, reveal the pill only when the user scrolls up *and* new tokens arrive, and badge it with an unread/"new message" dot. This prevents the jarring scroll-hijack during streaming while keeping the jump-to-latest affordance discoverable.

6. **Tighten the input affordance to a single fused "composer" with inline send-state morph** (HeroUI / Vercel v0 input pattern). Rather than a separate 32px circular send button (which is also the touch-target flag in §4), modern composers morph one trailing control: mic when empty → arrow-up send when text is present → square stop while streaming, all in the same slot with a cross-fade. This resolves the sub-44px hit-area issue (give the single morphing control a 40-44px target) and removes the visual ambiguity of showing send + mic + stop as separate elements.

Sources:
- [shadcn-chatbot-kit (Vercel/Blazity)](https://shadcn-chatbot-kit.vercel.app/docs/components/chat)
- [Chatcn — chat UI for shadcn](https://shadcn-collections.vercel.app/)
- [shadcn chat UI examples roundup](https://shadcnstudio.com/blog/shadcn-chat-ui-example)
- [v0 shadcn-style chat UI](https://v0.app/chat/shadcn-style-chat-ui-buQVA0rcaSG)
