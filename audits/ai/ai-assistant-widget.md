## ai-assistant-widget — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 35 | z-index | `var(--cg-z-index-top)` | Yes | Valid misc token, naming-compliant. |
| 39/40 | bottom / right | `var(--cg-spacing-24)` | Yes | — |
| 43/44 | bottom / left | `var(--cg-spacing-24)` | Yes | — |
| 49/50 | width / height (FAB) | `var(--cg-spacing-56)` | Yes | 56px ≥ 44px touch target. |
| 51 | border-radius | `var(--cg-border-radius-full)` | Yes | — |
| 52 | background | `var(--cg-color-action-primary-background-default)` | Yes | Tier-2 semantic. |
| 53 | color | `var(--cg-color-action-primary-text-default)` | Yes | — |
| 54 | border | `none` | Yes | Legitimate. |
| 60/61 | transition | `transform/filter ... fast ... default` | Yes | Explicit props, motion tokens. |
| 62 | box-shadow | `var(--cg-elevation-3)` | Yes | Valid misc token. |
| 65 | filter | `brightness(0.9)` | Yes | Functional value, not a color. |
| 66 | transform | `scale(1.05)` | Yes | Numeric scale, fine. |
| 70 | box-shadow (focus) | `0 0 0 var(--cg-border-width-100) var(--cg-color-focus-ring)` | Yes | `0 0 0` are offset/blur, focus-ring tier-2. |
| 73 | transform | `scale(var(--cg-interaction-press-scale))` | Yes | Tokenized press scale. |
| 79 | bottom (panel) | `var(--cg-spacing-64)` | Yes | — |
| **80** | **width (panel)** | **`360px`** | **NO** | **Bare magic px. No widget/panel width token exists in vocab; must be tokenized or documented as exception.** |
| 81 | height (panel) | `var(--cg-spacing-480)` | Yes | Exists in tier-1 vocab. |
| 82 | max-width | `calc(100vw - var(--cg-spacing-32))` | Yes | Viewport calc + token. |
| 83 | max-height | `calc(100vh - var(--cg-spacing-128))` | Yes | — |
| 84 | background | `var(--cg-color-modal-container-background)` | Yes | Tier-2. |
| 85 | border | `var(--cg-border-width-50) solid var(--cg-color-modal-container-border)` | Yes | Hairline via token. |
| 86 | border-radius | `var(--cg-border-radius-200)` | Yes | — |
| 87 | box-shadow | `var(--cg-elevation-4)` | Yes | — |
| 91 | animation | `scaleIn ... default ... ease-out both` | Yes | Motion tokens. |
| 107 | padding (header) | `var(--cg-spacing-16)` | Yes | — |
| 108 | border-bottom | `var(--cg-border-width-50) solid var(--cg-color-modal-container-border)` | Yes | — |
| 113 | font-size (title) | `var(--cg-font-size-base)` | Yes | — |
| 114 | font-weight | `var(--cg-font-weight-semibold)` | Yes | — |
| 115 | color | `var(--cg-color-surface-base-text)` | Yes | — |
| 119/120 | width / height (close-btn) | `var(--cg-spacing-32)` | Tokenized but 32px < 44px | Touch target below 44px (see §4). |
| 121 | background | `transparent` | Yes | — |
| 123 | color | `var(--cg-color-surface-container-outlined)` | Borderline | Valid tier-2 token, but `-outlined` is a border/stroke token used as icon color; semantically loose, not a banned violation. |
| 125 | border-radius | `var(--cg-border-radius-50)` | Yes | — |
| 129–131 | transition | `background-color/color ... fast ... default` | Yes | Explicit. |
| 134 | color (hover) | `var(--cg-color-surface-base-text)` | Yes | — |
| 135 | background (hover) | `var(--cg-color-action-tertiary-background-hover)` | Yes | — |
| 139 | box-shadow (focus) | `0 0 0 var(--cg-border-width-100) var(--cg-color-focus-ring)` | Yes | — |
| 146 | padding (messages) | `var(--cg-spacing-16)` | Yes | — |
| 149 | gap | `var(--cg-spacing-12)` | Yes | — |
| 154 | color (welcome) | `var(--cg-color-surface-container-outlined)` | Borderline | Same as line 123. |
| 155 | font-size (welcome) | `var(--cg-font-size-sm)` | Yes | sm = 14px floor met. |
| 156 | padding | `var(--cg-spacing-20) 0` | Yes | — |
| 160 | max-width (msg) | `85%` | Yes | Percentage, legitimate. |
| 161 | padding | `var(--cg-spacing-8) var(--cg-spacing-12)` | Yes | — |
| 162 | border-radius | `var(--cg-border-radius-150)` | Yes | — |
| 163 | font-size | `var(--cg-font-size-sm)` | Yes | 14px floor met. |
| 164 | line-height | `var(--cg-line-height-normal)` | Yes | — |
| 170/171 | background / color (user msg) | `action-primary-background/text-default` | Yes | Tier-2. |
| 172 | border-bottom-right-radius | `var(--cg-border-radius-50)` | Yes | — |
| 177 | background (ai msg) | `var(--cg-color-action-tertiary-background-hover)` | Borderline | Valid tier-2, but a `-hover` action token used as a resting bubble background is semantically odd (see §2). Not banned. |
| 178 | color | `var(--cg-color-surface-base-text)` | Yes | — |
| 179 | border-bottom-left-radius | `var(--cg-border-radius-50)` | Yes | — |
| 185 | gap (input-area) | `var(--cg-spacing-8)` | Yes | — |
| 186 | padding | `var(--cg-spacing-12) var(--cg-spacing-16)` | Yes | — |
| 187 | border-top | `var(--cg-border-width-50) solid var(--cg-color-modal-container-border)` | Yes | — |
| 193 | background (input) | `var(--cg-color-input-background-default)` | Yes | — |
| 194 | border | `var(--cg-border-width-50) solid var(--cg-color-input-border-default)` | Yes | — |
| 195 | border-radius | `var(--cg-border-radius-150)` | Yes | — |
| 196 | padding | `var(--cg-spacing-8) var(--cg-spacing-12)` | Yes | — |
| 197 | color | `var(--cg-color-surface-base-text)` | Yes | — |
| 198 | font-size | `var(--cg-font-size-sm)` | Yes | 14px floor met. |
| 201 | transition | `border-color ... fast ... default` | Yes | Explicit. |
| 204 | color (placeholder) | `var(--cg-color-input-text-placeholder)` | Yes | — |
| 207 | border-color (focus) | `var(--cg-color-focus-ring)` | Yes | — |
| 211/212 | width / height (send-btn) | `var(--cg-spacing-40)` | Tokenized but 40px < 44px | Touch target below 44px (see §4). |
| 213 | border-radius | `var(--cg-border-radius-150)` | Yes | — |
| 214/215 | background / color | `action-primary-background/text-default` | Yes | — |
| 222–224 | transition | `filter/transform ... fast ... default` | Yes | Explicit. |
| 226 | filter (hover) | `brightness(0.9)` | Yes | — |
| 227 | transform (active) | `scale(var(--cg-interaction-press-scale))` | Yes | — |
| 229 | opacity (disabled) | `0.4` | Borderline | Raw opacity; acceptable convention, not a size/color violation. |
| 234 | box-shadow (focus) | `0 0 0 var(--cg-border-width-100) var(--cg-color-focus-ring)` | Yes | — |
| 238/239 | animation/transition reduced-motion | `none !important` | Yes | — |

Summary: The file is overwhelmingly token-compliant. There is **one hard violation** (line 80 `width: 360px`), and **two touch-target sizing issues** (close-btn 32px, send-btn 40px). No fallbacks, no raw hex, no rgba, no banned palette colors, no `transition: all`, no made-up token names, no sub-14px body text.

### 2. Styling Audit

- **Border radius:** Appropriate and consistent. Panel `--cg-border-radius-200`, bubbles `--cg-border-radius-150` with a single tightened corner (`-50`) for the "tail" effect — modern messaging look. FAB is `full`. Good hierarchy.
- **Spacing generosity:** Generous and on-scale. 16px header/messages padding, 12px message gap, 20px welcome padding. Comfortable, not cramped.
- **Font-size accessibility:** All body/message/input text at `--cg-font-size-sm` (14px), title at `base`. Meets the 14px floor. No sub-14px text.
- **Translucent vs solid borders:** All borders use `--cg-border-width-50` hairlines with semantic `modal-container-border` / `input-border` tokens — solid, theme-aware, correct.
- **Transitions:** Every transition enumerates explicit properties (transform, filter, color, background-color, border-color) with `--cg-transition-duration-fast` and easing tokens. No `transition: all`. Reduced-motion media query disables panel animation and FAB transitions. Excellent.
- **Dark-theme background:** Uses `--cg-color-modal-container-background` for the panel and elevation tokens for shadow — dark-first appropriate. Good layering against the FAB's primary-accent surface.
- **Semantic-token smell (non-blocking):** The AI message bubble (line 177) and the close-btn/welcome text colors (lines 123/154) reuse `action-tertiary-background-hover` and `surface-container-outlined` for resting/non-hover, non-outline purposes. They are valid tier-2 tokens so not violations, but a dedicated surface/text token would read cleaner.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | FAB, panel, bubbles, input, send-btn all have resting styles. | None. |
| Hover | Yes | `.fab:hover` (brightness+scale), `.close-btn:hover`, `.send-btn:hover` (brightness). | None. |
| Active/Press | Yes | `.fab:active` and `.send-btn:active` use `--cg-interaction-press-scale`. close-btn lacks an active style (minor). | Close-btn has no press feedback (cosmetic). |
| Focus-visible | Yes | FAB, close-btn, send-btn all have `:focus-visible` ring via `box-shadow` + `--cg-color-focus-ring`; input uses `:focus` border-color. | Input uses `:focus` not `:focus-visible` (acceptable for a text field). |
| Disabled | Yes | `.send-btn:disabled` opacity 0.4 + not-allowed; bound via `?disabled` on empty input. | Disabled is opacity-only; no token-driven disabled color, but adequate. |
| Loading | N/A | No streaming/typing indicator in this widget — it renders a static message list passed via prop. | Justified: the component is a presentational shell; loading would be a parent concern, though a typing indicator would be a nice enhancement. |
| Error | N/A | No error message rendering path. | Justified: messages are plain `{role, content}`; error surfacing is the host app's job. |
| Success | N/A | No success/confirmation state applicable to a chat shell. | Justified. |

### 4. Interaction Audit

- **Keyboard:** `Enter` (no shift) sends; `Shift+Enter` is allowed through (intended for newline, though it's an `<input>` not a `<textarea>` so newlines won't actually insert — minor inconsistency). `Escape` closes the panel, handled both on the input (`_onKeydown`) and on the panel container (line 300). FAB and buttons are native `<button>`, so `Enter`/`Space` activate them. No arrow-key navigation of message history (acceptable for this scope).
- **ARIA:** Strong. Panel has `role="dialog"`, `aria-modal="true"`, `aria-label` bound to title. Messages region is `role="log"` with `aria-live="polite"` — correct for streaming chat. FAB exposes `aria-expanded` and a state-dependent `aria-label`. Close, input, and send all have `aria-label`. No mislabeled roles. Note: `aria-modal="true"` is declared but there is no focus trap implemented — screen-reader/keyboard users can tab out of the panel; this is an a11y gap worth noting (not in the required violation set but relevant).
- **CustomEvents:** `ai-assistant-open` / `ai-assistant-close` fired on toggle and close; `ai-assistant-send` fired with `detail: { message }`. All `bubbles: true, composed: true` so they cross the shadow boundary. Detail shape matches the documented `@fires` JSDoc. Correct.
- **Touch targets:** FAB 56px (pass). Close-btn 32px and send-btn 40px are **below the 44px minimum** — real accessibility/ergonomics issues on touch devices.

### 5. Visual Design Check

Modern and sleek: floating FAB with full radius and elevation-3, a clean `radius-200` panel with elevation-4, asymmetric chat bubbles with a tightened tail corner, hairline dividers between header/messages/input. Breathing room is good (16px paddings, 12px gaps). Typography hierarchy is present (semibold base title vs sm message text) but shallow — only two levels. Dividers are correctly placed. It would broadly pass a HeroUI/Vercel-style showcase; the only things holding it back from "strong" are the undersized tap targets and the single hardcoded `360px` panel width. Verdict: **adequate**.

### 6. Fixes Needed

1. **Line 80 — hardcoded panel width.**
   - Current: `width: 360px;`
   - Fixed: `width: var(--cg-component-ai-chat-width);` (add this tier-3 token; if a width token cannot be added, document it as an explicit exception). As a vocab-present fallback, a calc on an existing spacing token, e.g. `width: var(--cg-spacing-320);` is not available — no 320 spacing token exists — so a new tier-3 token is the correct path.
   - Why: Bare magic `px` on a layout dimension violates the no-magic-numbers rule; every size must resolve from a token. No widget/panel width token exists in the vocab, so one must be introduced.

2. **Lines 119–120 — close button touch target below 44px.**
   - Current: `width: var(--cg-spacing-32);\n      height: var(--cg-spacing-32);`
   - Fixed: `width: var(--cg-spacing-40);\n      height: var(--cg-spacing-40);` paired with a transparent hit-area expansion, or raise to `--cg-spacing-48` to clear 44px outright.
   - Why: 32px interactive control fails the 44px minimum touch-target guideline; on touch devices the close affordance is hard to hit.

3. **Lines 211–212 — send button touch target below 44px.**
   - Current: `width: var(--cg-spacing-40);\n      height: var(--cg-spacing-40);`
   - Fixed: `width: var(--cg-spacing-48);\n      height: var(--cg-spacing-48);`
   - Why: 40px is under the 44px minimum touch target; bump to 48px (next on-scale value that clears the threshold).

Note (not counted as a token violation, but recommended): the AI bubble background (line 177) and the close-btn/welcome muted text (lines 123/154) reuse hover/outline tokens for resting/non-outline purposes. Consider dedicated tokens (e.g. a surface-container background for AI bubbles, surface-container-subtle/text for muted text) for cleaner semantics. Also consider a focus trap to honor the declared `aria-modal="true"`.

### Research-backed enhancements

- **Drop the "messenger" bubble framing for the assistant turn.** Full-width tool-style layout (used by Claude.ai, ChatGPT, Cursor) reads as a serious AI tool, not a chat app. Keep a subtle bubble or right-alignment only for the *user* turn, and separate the assistant turn with background shading / a left accent rather than a rounded balloon ([Setproduct](https://www.setproduct.com/blog/ai-chat-interface-ui-design)).
- **Add an explicit streaming-progress affordance — a blinking caret + token shimmer — that appears within ~800ms.** Perceived performance is killed by a blank panel for 2s, not by total latency. Surface a "thinking" skeleton/caret the instant the request fires so the widget never shows dead space while first-token latency resolves ([Setproduct](https://www.setproduct.com/blog/ai-chat-interface-ui-design)).
- **Ship first-class stream-control states: `stop`/abort, `retry`, and `regenerate`.** A streaming assistant turn needs an inline Stop button during generation and a Retry on error — these are table-stakes in modern kits (assistant-ui, Vercel AI SDK `useChat` ships abort + retry out of the box). Cognivo's state matrix likely covers loading/error but probably not *interruptible-streaming* as a distinct, controllable state ([assistant-ui](https://www.assistant-ui.com/), [prompt-kit](https://www.prompt-kit.com/chat-ui)).
- **Render assistant output as rich "AI cards," not just text.** Support inline markdown, fenced code blocks with copy-on-hover, and actionable affordances (buttons/links/suggested follow-ups) embedded directly in the response so users act without leaving the turn — the dominant 2025 pattern for engagement and progressive disclosure ([MultitaskAI](https://multitaskai.com/blog/chat-ui-design/), [prompt-kit](https://www.prompt-kit.com/chat-ui)).
- **Tighten input density with a contextual auto-growing composer.** A single-line input that grows to multiline, with an embedded send/stop affordance and slash/`@` contextual triggers, matches the Linear/Vercel-era composer. Pair Enter-to-send + Shift+Enter newline and a token/character hint to reduce cognitive load at the input edge ([patterns.dev](https://www.patterns.dev/react/ai-ui-patterns/)).
- **Add per-message micro-affordances on hover: copy, thumbs up/down feedback, and timestamp-on-hover.** Keep them hidden until row-hover to preserve density, fading in via opacity transition (enumerate `opacity`/`transform` — `transition: all` is banned per token guardrails). This delivers the sleek shadcn/Linear "quiet until needed" interaction layer ([eleken](https://www.eleken.co/blog-posts/chatbot-ui-examples)).

### Playground proposal

Current presentational example is fine, but to exercise more of the component's surface area the playground should ship with a few seeded messages plus an expanded default so reviewers see the bubble styling and asymmetric tail corners without interacting. Suggested:

<ai-assistant-widget
  title="AI Help"
  expanded
  welcomeMessage="How can I help you today?"
  .messages=${[
    { role: 'user', content: 'Can you summarize this page?' },
    { role: 'ai', content: 'Sure — here are the three key points...' },
    { role: 'user', content: 'Thanks!' }
  ]}
></ai-assistant-widget>

This showcases both user (flush-right, primary) and ai (flush-left, tertiary) bubbles, the header, and the input row in one glance. Otherwise no change needed.

---
*cleanliness: minor | fixes proposed: 3*
