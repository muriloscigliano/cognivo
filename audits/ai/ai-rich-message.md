## ai-rich-message — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 47 | animation duration/easing | `--cg-transition-duration-fast` / `--cg-transition-easing-default` | Yes | — |
| 52 | gap | `--cg-spacing-12` | Yes | — |
| 53 | max-width | `100%` | Yes | Percentage, legit |
| 59-60 | avatar width/height | `--cg-spacing-32` | Yes | Spacing token used as size; acceptable (no avatar-size token referenced) |
| 61 | border-radius | `50%` | Yes | Circle, legit |
| 65 | font-size | `--cg-font-size-sm` | Yes | — |
| 66 | font-weight | `--cg-font-weight-bold` | Yes | — |
| 71 | background | `--cg-color-action-primary-background-default` | Yes | — |
| 72 | color | `--cg-color-surface-base-background` | Yes | Inverse text on accent fill, valid |
| 75 | background | `--cg-color-surface-cards-border` | Yes | — |
| 76 | color | `--cg-color-surface-base-text` | Yes | — |
| 79 | background | `--cg-color-surface-container-background` | Yes | — |
| 80 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 83-85 | img w/h/object-fit | `100%` / `cover` | Yes | Legit |
| 92 | max-width | `80%` | Yes | Percentage, legit |
| 94 | max-width | `70%` | Yes | Percentage, legit |
| 97 | border-radius | `--cg-border-radius-150` | Yes | — |
| 98 | padding | `--cg-spacing-12` `--cg-spacing-16` | Yes | — |
| 99 | font-size | `--cg-font-size-sm` | Yes | 14px, meets body min |
| 100 | line-height | `1.6` | Acceptable | Prefer `--cg-line-height-relaxed` token (minor) |
| 101 | color | `--cg-color-surface-base-text` | Yes | — |
| 104-105 | bg/border | `--cg-color-surface-cards-background` / `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | — |
| 108-109 | bg/color | `--cg-color-action-primary-background-default` / `--cg-color-surface-base-background` | Yes | — |
| 110 | border-radius | `--cg-border-radius-150` ×3 + `--cg-border-radius-50` | Yes | Tail-corner asymmetry, valid |
| 113 | background | `--cg-color-surface-base-background` | Yes | — |
| **114** | **border** | **`1px dashed --cg-color-surface-cards-border`** | **No** | **Raw `1px` → `--cg-border-width-50`** |
| 115 | font-size | `--cg-font-size-sm` | Yes | — |
| 116 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 125 | margin | `--cg-spacing-8` | Yes | — |
| 128 | code background | `--cg-overlay-dark-medium` | Yes | — |
| 129 | code padding | `--cg-spacing-1` `--cg-spacing-6` | Yes | — |
| 130 | border-radius | `--cg-border-radius-50` | Yes | — |
| 131 | font-family | `--cg-font-family-mono` | Yes | — |
| 132 | font-size | `--cg-font-size-sm` | Yes | — |
| 135 | code bg (user) | `--cg-overlay-dark-subtle` | Yes | — |
| 142-143 | gap/margin | `--cg-spacing-8` | Yes | — |
| 148 | padding-top | `--cg-spacing-12` | Yes | — |
| 149 | border-top | `--cg-border-width-50` + `--cg-color-surface-cards-divider` | Yes | — |
| 152-153 | gap/margin | `--cg-spacing-6` / `--cg-spacing-8` | Yes | — |
| 156 | padding | `--cg-spacing-6` `--cg-spacing-12` | Yes | — |
| 157 | border-radius | `--cg-border-radius-100` | Yes | — |
| 158 | font-size | `--cg-font-size-xs` | Yes | Button label (not body), acceptable |
| 159 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 160-162 | bg/color/border | `--cg-color-surface-container-background` / `--cg-color-surface-base-text` / `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | — |
| 164 | transition | explicit `background-color`, `color`, `border-color` w/ duration+easing tokens | Yes | Correctly enumerated, no `transition: all` |
| 167-168 | hover bg/border | `--cg-color-surface-cards-border` / `--cg-color-surface-base-text` | Yes | — |
| **171** | **outline** | **`2px solid --cg-overlay-accent-strong`** | **Borderline** | **Raw `2px` width; prefer `--cg-border-width-100`. Color uses overlay token (ok, but `--cg-color-focus-ring` exists)** |
| 172 | outline-offset | `--cg-outline-offset-default` | Yes | Real token (verified, =2px) |
| 177 | font-size | `--cg-font-size-xs` | Yes | Timestamp meta text, acceptable |
| 178 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 179 | margin-top | `--cg-spacing-6` | Yes | — |
| **262** | **inline style color (JS)** | **`var(--cg-color-input-text-placeholder,#71717a)`** | **No** | **Comma-fallback `#71717a` is banned + raw `padding:8px`, `font-size:12px`** |
| **274** | **inline style color (JS)** | **`var(--cg-color-input-text-placeholder,#71717a)`** | **No** | **Same as line 262 (duplicate)** |

CSS block (lines 45-183) is almost entirely clean and tier-correct. The real defects live in two places: the dashed system-border raw `1px` (line 114) and the JS-rendered inline fallback `<div>` markup (lines 262/274), which carry banned comma-fallbacks, raw px padding/font-size, and a 12px font.

### 2. Styling Audit
- **Border radius:** `--cg-border-radius-150` for bubbles with an asymmetric tail corner (`--cg-border-radius-50`) on user messages — modern, chat-appropriate, sleek.
- **Spacing:** Generous and consistent (12/16 padding, 8 gaps). Good breathing room.
- **Font-size accessibility:** Body text `--cg-font-size-sm` (14px) meets the minimum. Action buttons and timestamp use `--cg-font-size-xs` — acceptable for labels/meta. The JS fallback `<div>` hardcodes `font-size:12px` (below 14px) — minor, but it is user-facing microcopy.
- **Borders:** Mostly translucent overlay/semantic tokens with `--cg-border-width-50` hairlines — correct. The system-message dashed border uses raw `1px` instead of `--cg-border-width-50` (inconsistent with the rest of the file).
- **Transitions:** Explicitly enumerated (`background-color`, `color`, `border-color`) with motion tokens. No `transition: all`. Entry animation respects `reducedMotion` import. Excellent.
- **Dark-theme background:** Surface/cards/container tokens are dark-first appropriate; accent fill for user bubble gives good contrast.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.bubble-body` per-role styling | None |
| Hover | Yes (action buttons) | `.action-btn:hover` bg + border change | Bubble itself has no hover — acceptable (static content) |
| Active/Press | No | — | Action buttons lack `:active` feedback — minor polish gap |
| Focus-visible | Partial | `.action-btn:focus-visible` outline | Host `.message` has `tabindex="0"` (line 302) but NO `:focus-visible` style — keyboard users get no visible focus ring on the article. P2 a11y gap |
| Disabled | N/A | — | No disabled concept for a message bubble or its actions. Justified N/A |
| Loading | N/A | — | This is a rendered message, not a streaming state (that lives in sibling AI components). Justified N/A |
| Error | Partial | Inline "Card unavailable" fallback for blocked/failed cards | Uses generic placeholder color, not `--cg-color-ai-error-*` or `--cg-color-status-error-*`. Not a true error state surface |
| Success | N/A | — | No success affordance applies to a message bubble. Justified N/A |

### 4. Interaction Audit
- **Keyboard:** Action buttons are native `<button>` — Enter/Space work for free. Good. The host `.message` is `tabindex="0"` and focusable but has no keydown handlers and no visible focus style — it is reachable by Tab yet does nothing and shows no ring (focus-trap-without-feedback smell).
- **ARIA:** `role="article"` + `aria-label="${role} message"` on host (good landmark). Actions wrapped in `role="group"` + `aria-label="Message actions"` (correct). Avatar `aria-hidden="true"` (correct — decorative). Each action button has `aria-label` (redundant with text content but harmless). No `aria-live` region — since this is a static rendered message that is acceptable; streaming/announcement is the parent's job.
- **CustomEvents:** `ai-message-action` fires `{ actionId }` — correct, matches JSDoc. `ai-message-card-action` fires `{ cardIndex, action, data }` — richer than the documented `{ cardIndex }` (JSDoc on line 25 is slightly understated but the detail is correct/superset). Both `bubbles: true, composed: true` — correct for shadow DOM. Card listeners are cleaned via `AbortController` on re-render and `disconnectedCallback` — solid memory hygiene.
- **Touch targets:** Action buttons are ~`6px+12px` padding around `xs` text → roughly 28-30px tall, **below the 44px minimum**. P2 touch-target gap. Card-type allowlist (lines 234-247) is good XSS hardening — not an interaction defect, noted as a strength.

### 5. Visual Design Check
Modern and sleek: yes. Radius is chat-appropriate with a tasteful asymmetric tail corner. Breathing room is good. Divider above actions (`border-top`) is present and correct. Typography hierarchy (body sm / actions xs / timestamp xs muted-italic system) reads well. Avatar + bubble layout with role-reverse for user is clean. It would largely pass a HeroUI/Vercel-style showcase, held back only by the sub-44px action buttons, the missing host focus-visible ring, and the unpolished hardcoded "Card unavailable" fallback styling.

Verdict: **strong**

### 6. Fixes Needed

1. **Line 114** — raw `1px` border width.
   - Current: `border: 1px dashed var(--cg-color-surface-cards-border);`
   - Fixed: `border: var(--cg-border-width-50) dashed var(--cg-color-surface-cards-border);`
   - Why: Raw `px` not wrapped in a token; rest of file uses `--cg-border-width-50` for hairlines. Consistency + token governance.

2. **Line 262** — banned comma-fallback + raw px + sub-14px font in JS-rendered inline style.
   - Current: `return html\`<div style="padding:8px;font-size:12px;color:var(--cg-color-input-text-placeholder,#71717a);">Card unavailable</div>\`;`
   - Fixed: Replace inline styles with a CSS class, e.g. add a `.card-fallback` rule (`padding: var(--cg-spacing-8); font-size: var(--cg-font-size-sm); color: var(--cg-color-input-text-placeholder);`) and render `html\`<div class="card-fallback">Card unavailable</div>\``.
   - Why: `var(--token, #71717a)` comma-fallback is a banned hardcoded hex; `padding:8px`/`font-size:12px` are raw magic px; 12px is below the 14px body minimum. Moving to a class removes all three.

3. **Line 274** — identical defect to #2 (duplicate fallback markup).
   - Current: `return html\`<div style="padding:8px;font-size:12px;color:var(--cg-color-input-text-placeholder,#71717a);">Card unavailable</div>\`;`
   - Fixed: `return html\`<div class="card-fallback">Card unavailable</div>\`;` (reuse the class from #2; extract a `_renderCardFallback()` helper to dedupe).
   - Why: Same banned comma-fallback, raw px, and sub-minimum font as line 262.

4. **Line 171** (minor) — raw `2px` outline width.
   - Current: `outline: 2px solid var(--cg-overlay-accent-strong);`
   - Fixed: `outline: var(--cg-border-width-100) solid var(--cg-color-focus-ring);`
   - Why: Raw `2px` should use a width token; `--cg-color-focus-ring` is the dedicated focus token (the overlay-accent works visually but the semantic focus token is the correct tier-2 choice).

5. **Line 302 / focus styling** (a11y, P2) — host is focusable with no visible focus ring.
   - Current: `.message` has `tabindex="0"` but no matching `:focus-visible` rule.
   - Fixed: Add `.message:focus-visible { outline: var(--cg-border-width-100) solid var(--cg-color-focus-ring); outline-offset: var(--cg-outline-offset-default); border-radius: var(--cg-border-radius-150); }` — or remove `tabindex="0"` if the article is not meant to be a focus stop.
   - Why: A Tab-reachable element with no visible focus indicator fails WCAG 2.4.7. Either give it a ring or drop the tabindex.

6. **Action button touch target** (a11y, P2) — buttons under 44px.
   - Current: `.action-btn { padding: var(--cg-spacing-6) var(--cg-spacing-12); ... }`
   - Fixed: add `min-height: var(--cg-spacing-40);` (or `44px`-equivalent token) and align padding so the hit area reaches ~44px.
   - Why: Interactive targets should be ≥44px for touch accessibility.

### Research-backed enhancements

- **Incremental streaming render, not full re-parse.** Vercel AI Elements' `Response`/`MessageResponse` is explicitly optimized to apply incremental markdown updates per stream chunk without re-parsing the whole string each token. `ai-rich-message` should diff-append streamed content (and tolerate unterminated markdown — open code fences, half-finished tables) so the message stays readable mid-stream instead of flickering. ([Vercel AI Elements](https://vercel.com/academy/ai-sdk/ai-elements))

- **Inline citation chips with hover-card sources.** The ChatGPT-style pattern in shadcn.io renders source citations as compact numbered superscript chips that open a source preview on hover/focus, rather than a raw URL list. Add a `[n]` affordance that maps to a `cg-popover`/hover-card showing title, favicon/domain, and snippet — keyboard-focusable for a11y. ([shadcn.io AI](https://www.shadcn.io/ai), [Vercel AI Elements](https://vercel.com/academy/ai-sdk/ai-elements))

- **Collapsible reasoning / "thinking" block.** AI Elements ships a dedicated reasoning component and the canonical ChatGPT pattern surfaces thinking blocks above the answer. Add an optional collapsed-by-default `reasoning` slot with a subtle shimmer while streaming and an auto-collapse once the final answer begins — keeps density low while exposing chain-of-thought on demand. ([Vercel AI Elements](https://vercel.com/academy/ai-sdk/ai-elements))

- **Hover-revealed message action bar.** shadcn chat kits expose per-message actions (copy, regenerate, thumbs up/down, branch) that fade in on hover/focus of the message row rather than occupying permanent space. Implement a right-aligned action cluster with `opacity` + slight `translateY` micro-transition (explicit props, not `transition: all`), always visible on keyboard focus for accessibility. ([Shadcn Chatbot Kit](https://www.shadcn.io/template/blazity-shadcn-chatbot-kit), [shadcn.io chatbot](https://www.shadcn.io/ai/chatbot))

- **First-class code-block treatment.** The Elements/shadcn pattern treats code as a distinct primitive: syntax-highlighted, with a language label and a copy-to-clipboard button that confirms with a check-state. `ai-rich-message` should render fenced code via a dedicated sub-component with a sticky header (lang + copy) and horizontal scroll, instead of inheriting plain `<pre>` styling. ([Vercel AI Elements](https://vercel.com/changelog/introducing-ai-elements), [chat-components](https://github.com/miskibin/chat-components))

- **Explicit streaming + error/empty states.** Modern kits distinguish a live caret/typing indicator during stream, a stalled/error state with inline retry, and a regenerated-response branch switcher (`< 2/3 >`). Add a `state` matrix — `streaming` (caret), `error` (inline retry chip), `regenerating`, and a `branch` control for message versions — so the component covers the full AI-message lifecycle, not just the happy path. ([Vercel AI Elements](https://vercel.com/academy/ai-sdk/ai-elements), [shadcn.io AI](https://www.shadcn.io/ai))

### Playground proposal

Show all three roles plus cards and actions to exercise the full state matrix. Suggested example:

<ai-rich-message role="assistant" text="Here are the results of my analysis.\n\nThe data shows a clear upward trend." timestamp="2:34 PM" .actions=${[{label:'Regenerate',id:'regen'},{label:'Copy',id:'copy'}]} .cards=${[{type:'ai-metric-card',data:{label:'Revenue',value:'$1.2M'}}]}></ai-rich-message>
<ai-rich-message role="user" text="Can you summarize that for me?" timestamp="2:35 PM"></ai-rich-message>
<ai-rich-message role="system" text="Conversation context was reset."></ai-rich-message>

This demonstrates accent user styling, the assistant card+actions divider, and the italic dashed system variant in one view. Defaults are otherwise fine.

---
*cleanliness: needs-work | fixes applied: 4*
