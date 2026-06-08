## ai-annotation — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 41 | animation duration/easing | `var(--cg-transition-duration-fast) var(--cg-transition-easing-ease-out)` | Yes | None — real tier-1 tokens, no fallback |
| 45 | background | `var(--cg-color-surface-cards-background)` | Yes | None |
| 46 | border | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | Yes | None |
| 47 | border-radius | `var(--cg-component-card-radius)` | Yes | None — correct tier-3 first choice |
| 48 | overflow | `hidden` | Yes | Keyword, fine |
| 55 | gap | `var(--cg-spacing-8)` | Yes | None |
| 56 | padding | `var(--cg-spacing-12) var(--cg-spacing-20)` | Yes | None |
| 57 | border-bottom | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | Yes | None |
| 63 | gap | `var(--cg-spacing-4)` | Yes | None |
| 64 | padding | `var(--cg-spacing-4) var(--cg-spacing-12)` | Yes | None |
| 65 | border-radius | `var(--cg-border-radius-full)` | Yes | None |
| 66 | border | `var(--cg-border-width-50) solid transparent` | Yes | `transparent` is allowed |
| 67 | background | `none` | Yes | Keyword |
| 69 | font-size | `var(--cg-font-size-xs)` | Yes | OK on toolbar control text (not body copy) |
| 70 | font-weight | `var(--cg-font-weight-medium)` | Yes | None |
| 72-74 | transition | explicit `border-color`, `background-color` w/ duration+easing tokens | Yes | Explicit list, not `all` — compliant |
| 76 | background (hover) | `var(--cg-overlay-dark-subtle)` | Yes | Real tier-1 overlay token |
| 77 | border-color/background (selected) | `currentColor` / `var(--cg-overlay-dark-subtle)` | Yes | None |
| 79-80 | width/height (dot) | `var(--cg-spacing-8)` | Yes | Acceptable use of spacing scale for a square dot |
| 81 | border-radius | `var(--cg-border-radius-full)` | Yes | None |
| 86 | font-size | `var(--cg-font-size-xs)` | Yes | Meta/stat text, acceptable |
| 87 | color | `var(--cg-color-input-text-placeholder)` | Yes | Real tier-2 token, appropriate for muted stat |
| 88 | font-family | `var(--cg-font-family-mono)` | Yes | None |
| 93 | padding | `var(--cg-spacing-20) var(--cg-spacing-24)` | Yes | None — generous |
| 94 | font-size | `var(--cg-font-size-sm)` | Yes | Body copy at 14px min — compliant |
| 95 | line-height | `var(--cg-line-height-relaxed)` | Yes | None |
| 96 | color | `var(--cg-color-surface-base-text)` | Yes | None |
| 103 | border-bottom | `var(--cg-border-width-100) solid` | Yes | Color comes from inline `border-color` (label color) |
| 104 | transition | explicit `opacity` w/ tokens | Yes | Explicit — compliant |
| 106 | opacity (hover) | `0.7` | Yes | Raw opacity scalar, acceptable |
| 109 | box-shadow (focus ring) | `0 0 0 3px var(--cg-overlay-accent-strong)` | Borderline | Bare `3px` ring width is a magic number; color token is real. Prefer a token but no ring-width token exists — minor |
| 115 | font-size | `var(--cg-font-size-xs)` | Yes | Tag chip, acceptable |
| 116 | font-weight | `var(--cg-font-weight-medium)` | Yes | None |
| 117 | padding | `var(--cg-spacing-1) var(--cg-spacing-6)` | Yes | None |
| 118 | border-radius | `var(--cg-border-radius-full)` | Yes | None |
| 119 | margin-left | `var(--cg-spacing-2)` | Yes | None |
| 121 | line-height | `1` | Yes | Unitless line-height, acceptable |
| 126 | padding | `var(--cg-spacing-24)` | Yes | None |
| 128 | color | `var(--cg-color-input-text-placeholder)` | Yes | None |
| 129 | font-size | `var(--cg-font-size-sm)` | Yes | None |
| 285 | inline `border-color: ${color}` | sanitized label color (JS data / user prop) | Yes | NOT a violation — runtime label color, sanitized |
| 286 | inline `background: ${color}` | sanitized label color (JS data) | Yes | NOT a violation — runtime data |
| 286 | inline `color: #000` | raw hex literal | **NO** | **VIOLATION** — hardcoded `#000` rendered as a real CSS color value for tag text. Use `var(--cg-overlay-dark-text)` |
| 297, 299 | inline `color`/`background: ${l.color}` | label data color | Yes | NOT a violation — runtime label data |

Largely clean. One real CSS violation (line 286 `#000`) plus one borderline magic ring width (line 109). The hex values in the `labels` default array (154-159), `_sanitizeColor`/`_getLabelColor` fallbacks (230, 234), and the `@cssprop` doc (19) are JS data / documentation and are explicitly NOT violations per conventions.

### 2. Styling Audit
- **Border radius:** Container uses tier-3 `--cg-component-card-radius`; pills/dots/tags use `--cg-border-radius-full`. Appropriate and consistent.
- **Spacing generosity:** Content padding `20/24`, toolbar `12/20` — generous and breathable. Good.
- **Font-size accessibility:** Body content is `--cg-font-size-sm` (14px) — meets the 14px minimum. Toolbar buttons, stats, and tag chips are `--cg-font-size-xs`; these are non-body control/meta labels, which is acceptable.
- **Translucent vs solid borders:** Borders use `--cg-color-surface-cards-border` (semantic) and `--cg-border-width-50` hairline — correct. Annotated-span underline uses `--cg-border-width-100` with a runtime label color, which is intentional emphasis.
- **Transitions:** All transitions are explicit property lists (`border-color`, `background-color`, `opacity`) with duration + easing tokens. No `transition: all`. Reduced-motion media query disables entrance animation and transitions. Excellent.
- **Dark-theme background:** `--cg-color-surface-cards-background` over base — suitable for dark-first.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.container`, `.annotated-span` with label-colored underline | None |
| Hover | Yes | `.label-btn:hover` overlay bg (76); `.annotated-span:hover` opacity 0.7 (106) | None |
| Active/Press | Partial | `.label-btn.selected` (77) reflects toggle state; active annotation shows inline tag (282-286) | No `:active` press feedback on label buttons; relies on selected/toggle state. Minor |
| Focus-visible | Partial | `.annotated-span:focus-visible` box-shadow ring (107-110) | Label `<button>`s (296) have NO custom focus-visible style — rely on UA default inside Shadow DOM. Should add an explicit focus ring for the toolbar buttons |
| Disabled | N/A | — | No disabled concept for annotations/labels; not applicable |
| Loading | N/A | — | Annotation is a display/edit layer over static content; no async load state. Justified N/A |
| Error | N/A | — | No validation/error surface; selection failures silently no-op. Acceptable N/A |
| Success | N/A | — | No success state; add fires an event. N/A |

### 4. Interaction Audit
- **Keyboard:** Annotated spans have `tabindex="0"` and `role="note"` but only a `@click` handler — they are focusable yet NOT operable by keyboard (no `keydown` for Enter/Space to trigger `_handleAnnotationClick`). This is a real keyboard-accessibility gap. Label toolbar buttons are native `<button>` so Enter/Space work there.
- **ARIA:** Container `role="document"` + `aria-label` (292); spans `role="note"` with descriptive `aria-label="${label}: ${text}"` (283-284). `role="note"` on a clickable element is semantically questionable — a clickable annotation behaves like a button/toggle, so `role="button"` with `aria-pressed` would communicate the toggle (active tag) state better. The active/expanded tag state is not exposed to AT.
- **CustomEvents:** `ai-annotation-select` (169), `ai-annotation-remove` (177), `ai-annotation-add` (217) all `bubbles: true, composed: true` with correct `detail` shapes matching the JSDoc `@fires`. Note: `_handleRemove` is defined (175-181) and fires `ai-annotation-remove`, but it is never wired to any element in the template — the remove event is effectively dead code / unreachable from the UI.
- **Touch targets:** Label buttons are `~24-28px` tall (`--cg-spacing-4` padding + xs text) — below the 44px minimum touch target. Annotated spans are inline text, exempt. Toolbar buttons should grow to a 44px hit area.

### 5. Visual Design Check
Clean, modern, and well-tokenized: card container with hairline borders, pill-shaped colored label toolbar, mono stat counter, label-colored underlines, and an inline confidence-percentage chip on click. Radius and spacing are appropriate and breathing room is good. The colored-underline + on-click chip pattern reads like a polished annotation UX (Notion/Linear-grade). It would largely pass a HeroUI/Vercel-style showcase, held back only by the hardcoded `#000` chip text, missing keyboard activation on spans, and small touch targets. Verdict: **adequate** (one token fix + a11y polish away from strong).

### 6. Fixes Needed
1. **Line 286 — hardcoded `#000` color.** Current: `style="background: ${color}; color: #000;"` → Fixed: `style="background: ${color}; color: var(--cg-overlay-dark-text);"`. Why: `#000` is a raw hex used as an actual rendered CSS color value, which violates the no-raw-hex / tier-2 rule. `--cg-overlay-dark-text` is the real tier-1 token designed for dark text on a light/colored overlay surface and keeps contrast governed by the token system.

The remaining items below are real quality issues but fall outside the strict token-audit "fix" scope (a11y/markup, not token substitutions); listed for completeness:
2. Annotated spans are focusable (`tabindex="0"`) with a click handler but no `@keydown` for Enter/Space — add keyboard activation so the toggle is operable without a mouse.
3. `role="note"` on a clickable toggle is semantically wrong — prefer `role="button"` with `aria-pressed`/`aria-expanded` to expose the active-tag state to assistive tech.
4. Toolbar label buttons fall below the 44px touch-target minimum — increase the hit area.
5. `_handleRemove` (and its `ai-annotation-remove` event) is never wired into the template, so the documented remove interaction is unreachable — wire it up or remove the dead code.

### Research-backed enhancements

- **Anchored glassmorphic popover instead of a static inline box.** Render the annotation body as a floating card that anchors to its highlighted text range with a small connector/caret, using a disciplined `backdrop-filter: blur()` translucent surface (the 2026 "surgical glassmorphism" pattern for contextual overlays that float above primary content). This separates the annotation layer from document flow and reads far more modern than an inline bordered note.

- **Highlight-range hover affordance with a quiet trigger.** On hover over annotated text, fade in a subtle underline/highlight (animated `background-size` sweep or opacity, ~120ms) plus a small inline marker; the full annotation only expands on click/focus. This "subtle marker → expand on intent" progressive-disclosure model is the Linear/Vercel inline-comment pattern — keeps reading density high and avoids cluttering the text.

- **Add the missing AI-native states: streaming, confidence, and citation.** As an `ai-*` component it should expose a `streaming` state (shimmer/typing skeleton while the annotation generates), a confidence indicator (e.g. a tier-2 status dot/bar mapping low→high to semantic warning→success colors), and a `source`/citation chip linking back to the grounding text. These are core to the patterns.dev AI-UI playbook and differentiate this from a generic comment widget.

- **Spring-based enter/exit micro-animation, not `transition: all`.** Animate the popover with a short transform+opacity spring (translateY ~4-6px → 0, scale 0.98 → 1, ~150-200ms ease-out), enumerating only `transform, opacity` per the project's banned-token rule. This subtle "settle" motion is the shadcn/Radix popover signature and makes the surface feel anchored rather than abruptly toggled.

- **Keyboard + focus-trap navigation across multiple annotations.** Make annotation markers focusable (`tabindex`), navigable with arrow keys / `Tab`, dismissible with `Esc`, and trap focus inside the open popover — Radix-primitive behavior adopted by Vercel/Linear/Supabase. This is a P0 a11y gap for any overlay component and currently the easiest thing to miss.

- **Density/layout tightening with a header meta-row.** Give the popover a compact header row (author/AI avatar or icon, timestamp, action affordances like resolve/dismiss/copy revealed on hover) above the body, using tier-1 spacing scale for a tight rhythm. The hover-revealed action cluster keeps the resting state clean while matching modern inline-comment density.

Sources: [patterns.dev AI UI Patterns](https://www.patterns.dev/react/ai-ui-patterns/), [Muzli — UI patterns that matter in 2026 (surgical glassmorphism)](https://muz.li/blog/whats-changing-in-mobile-app-design-ui-patterns-that-matter-in-2026/), [Radix Primitives / shadcn adoption (Vercel, Linear, Supabase)](https://certificates.dev/blog/starting-a-react-project-shadcnui-radix-and-base-ui-explained), [GitHub Blog — Design system annotations, part 2](https://github.blog/engineering/user-experience/design-system-annotations-part-2-advanced-methods-of-annotating-components/)

### Playground proposal

Current playground (content + Person/Organization annotations + editable) is fine and demonstrates the core highlight/toolbar/selection flow. Suggested richer default to also show the confidence chip and multi-label coloring: content="Claude is made by Anthropic in San Francisco, launched in 2023." with annotations=[{start:0,end:6,label:'Person',confidence:0.95},{start:18,end:27,label:'Organization',confidence:0.88},{start:31,end:44,label:'Location',confidence:0.72},{start:54,end:58,label:'Date',confidence:0.99}] and editable, so reviewers see varied label colors, the on-click confidence-percentage tag, and the live annotation counter. No registry edit — proposal only.

---
*cleanliness: needs-work | fixes proposed: 1*
