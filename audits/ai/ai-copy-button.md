## ai-copy-button — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 24 | animation duration | `200ms` (literal) + `--cg-transition-easing-ease-out` | OK / OK | Easing is tokenized; the `200ms` is a `@keyframes`-driven duration literal. Prefer `--cg-transition-duration-default` but not a hard violation. |
| 26 | display | `none` | OK | none |
| 31 | gap | `--cg-spacing-6` | OK (tier 1) | none |
| 32 | font-family | `inherit` | OK | none |
| 33 | font-weight | `--cg-font-weight-medium` | OK | none |
| 36 | border-radius | `--cg-border-radius-100` | OK (tier 1) | none — no tier-3 component radius exists for this component |
| 37 | transition | explicit props + `--cg-transition-duration-default/-fast` + `--cg-transition-easing-default` | OK | Explicit property list, not `all`. Compliant. |
| 41 | transform (active) | `scale(var(--cg-interaction-press-scale))` | Token NOT in vocab | `--cg-interaction-press-scale` is not in any vocab file. See Fixes. |
| 44 | outline | `2px solid var(--cg-overlay-accent-strong)` | OK | `2px` bare on outline width; `--cg-overlay-accent-strong` is real (tier 1). Minor: outline width literal. |
| 45 | outline-offset | `--cg-outline-offset-default` | Token NOT in vocab | `--cg-outline-offset-default` not in any vocab file. See Fixes. |
| 50 | padding | `--cg-spacing-6 --cg-spacing-12` | OK | none |
| 51 | font-size | `--cg-font-size-sm` | OK (14px min body) | none |
| 52 | background | `--cg-overlay-dark-subtle` | OK (tier 1 overlay) | none |
| 53 | color | `--cg-color-input-text-placeholder` | Real token, semantic mismatch | Resting button text reusing input-placeholder color. Flagged in §2; real token so no fabricated swap. |
| 54 | border | `--cg-border-width-50 solid --cg-color-surface-cards-border` | OK | none |
| 57 | background (hover) | `--cg-overlay-dark-strong` | OK | none |
| 58 | color (hover) | `--cg-color-surface-base-text` | OK | none |
| 63 | padding | `--cg-spacing-4 --cg-spacing-8` | OK | none |
| 64 | font-size | `--cg-font-size-xs` | Below 14px body min | Minimal variant body label below `--cg-font-size-sm`. Flagged §2. |
| 65 | background | `none` | OK | none |
| 66 | color | `--cg-color-input-text-placeholder` | semantic mismatch | same as line 53 |
| 69 | color (hover) | `--cg-color-surface-base-text` | OK | none |
| 74 | padding | `--cg-spacing-4` | OK | none |
| 75 | font-size | `--cg-font-size-sm` | OK | none |
| 77 | color | `--cg-color-input-text-placeholder` | semantic mismatch | same as line 53 |
| 78 | line-height | `1` | OK (unitless) | none |
| 81 | color (hover) | `--cg-color-surface-base-text` | OK | none |
| 89 | color (copied) | `--cg-color-status-success-text-default` | OK | Generic success is appropriate for copy feedback (not an AI lifecycle state). |
| 94 | color (error) | `--cg-color-status-error-text-default` | OK | Generic error is appropriate for copy feedback (not an AI lifecycle state). |
| 95 | animation | `--cg-transition-duration-slow` + `--cg-transition-easing-default` | OK | none |
| 99-102 | translateX | `-3px / 3px / -2px / 2px` | OK | `@keyframes` shake positions — not violations. |
| 112 | opacity | `0.5` | OK (unitless) | none |
| 113 | cursor | `--cg-cursor-not-allowed` | Token NOT in vocab | `--cg-cursor-not-allowed` not in any vocab file. See Fixes. |
| 119 | font-size | `inherit` | OK | none |
| 120 | line-height | `1` | OK | none |

### 2. Styling Audit
- **Border radius:** `--cg-border-radius-100` (tier 1). No tier-3 `--cg-component-ai-copy-button-radius` token exists in vocab, so tier-1 is the correct fallback. Acceptable.
- **Spacing:** All padding/gap from the spacing scale (`--cg-spacing-4/6/8/12`). Clean.
- **Font-size accessibility:** Default and icon-only variants use `--cg-font-size-sm` (14px) — compliant. **Minimal variant (line 64) uses `--cg-font-size-xs`** which is below the 14px body-text minimum. The minimal variant still renders a visible text label, so this is an a11y concern. Recommend `--cg-font-size-sm`.
- **Translucent vs solid borders:** Default variant border uses `--cg-color-surface-cards-border` (semantic) — good. Focus outline uses `--cg-overlay-accent-strong` (translucent accent overlay) — acceptable for a ring.
- **Transitions explicit vs all:** Transition (line 37) enumerates `background`, `color`, `transform` with tokenized durations/easings. No `transition: all`. Motion tokens used throughout. Reduced-motion handled at lines 104-108. Compliant.
- **Dark-theme suitability:** Uses dark overlays + semantic surface/text tokens; dark-first appropriate.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | per-variant base styles (50, 62, 73); text via `--cg-color-input-text-placeholder` | Resting text token is semantically a placeholder color — low contrast intent. |
| Hover | Yes | lines 56-59, 68-70, 80-82; brighten bg/text | none |
| Active/Press | Yes | line 40-42, `scale(var(--cg-interaction-press-scale))` | Token not in vocab (see Fixes). |
| Focus-visible | Yes | lines 43-46, 2px outline + offset | `--cg-outline-offset-default` not in vocab; outline width is a `2px` literal. |
| Disabled | Yes | lines 111-115 + `:host([disabled])` reflect + `aria-disabled` | Uses `--cg-cursor-not-allowed` (not in vocab). |
| Loading | N/A | No async-pending visual | Copy is near-instant; loading state not warranted. |
| Error | Yes | lines 93-96, shake + `--cg-color-status-error-text-default`, auto-reset via timer | Reduced-motion respected. |
| Success | Yes | lines 87-90 (`data-copied`), `--cg-color-status-success-text-default`, "Copied!" label + check icon, auto-reset | Good. |

### 4. Interaction Audit
- **Keyboard:** Native `<button>` element — Enter/Space activate by default. No custom keydown needed. Good.
- **ARIA:** `aria-label` bound to `_displayLabel` (line 200) so screen readers get "Copy" / "Copied!" / "Failed". `aria-disabled` reflected (line 201). `?disabled` also set on the native button (line 197). Solid.
- **CustomEvents:** `ai-copy-success` with `detail: { value }`, `ai-copy-error` with `detail: { error }`; both `bubbles: true, composed: true` (crosses shadow boundary). Matches the `@fires` JSDoc. Correct.
- **Live-region announcement:** The label swap to "Copied!" is conveyed via `aria-label` change but there is no `aria-live`/`role="status"`; some SR/AT may not announce the dynamic label change on a button that retains focus. Minor enhancement, not a token issue.
- **Touch targets:** icon-only variant is `--cg-spacing-4` padding around a single glyph — well under 44px. Minimal variant likewise small. This is a sizing/design change (not a token violation) — recommend enforcing a 44px min touch target on compact variants.

### 5. Visual Design Check
Clean, restrained, dark-first. Three variants (default chip, minimal text, icon-only) give good flexibility. Radius (`--cg-border-radius-100`) is modern. Animated check/cross confirmation + subtle press-scale + error shake are tasteful micro-interactions. Weaknesses: resting text uses a placeholder-intent color (reads as muted/disabled), the minimal variant text dips below 14px, and compact variants miss the 44px touch target. Typography hierarchy is single-line so N/A. Showcase-readiness: close, but the broken/undefined tokens and the placeholder-color resting state hold it back. **Verdict: adequate.**

### 6. Fixes Needed
1. **Line 41 — undefined token.** `transform: scale(var(--cg-interaction-press-scale));` references `--cg-interaction-press-scale`, which does not appear in any vocab file. No verified replacement token exists for a press-scale value, so this is flagged, not auto-fixed. Confirm the token exists in the live token build or replace with a tier-1 value/real token.
2. **Line 45 — undefined token.** `outline-offset: var(--cg-outline-offset-default);` references `--cg-outline-offset-default`, not in any vocab file. No verified replacement exists; flagged. (Likely intended to be a small spacing value — confirm a real offset token before substituting.)
3. **Line 64 — body text below 14px.** Minimal variant uses `--cg-font-size-xs`. Replace with `--cg-font-size-sm` to meet the 14px body-text minimum. (Verified token.)
4. **Line 113 — undefined token.** `cursor: var(--cg-cursor-not-allowed);` references `--cg-cursor-not-allowed`, not in any vocab file. No verified cursor token exists; flagged. Consider the literal `not-allowed` keyword (cursor keywords are not token-governed) or confirm a real token.
5. **Lines 53/66/77 — semantic mismatch (flag, no token swap).** Resting button text uses `--cg-color-input-text-placeholder`, which is placeholder-intent. A more correct resting color would be a muted surface-text token; no exact "muted body text" token is confirmed in vocab, so flagged rather than swapped to avoid inventing.

Only fix #3 has a vocabulary-verified replacement. Fixes #1, #2, #4, #5 are flags (no real replacement token confirmed).

### Research-backed enhancements

Modern 2025-era copy-button patterns (Animate UI, shadcn/ui InputGroup, Vercel/Linear command-surfaces) converge on a few affordances this component doesn't yet have. Concrete, specific upgrades:

1. **Cross-fade the icon, not just the label.** Animate UI's Copy Button animates the glyph itself — the clipboard icon scale-rotates out while the check scale-rotates in (springy, ~150ms), rather than a hard swap. This component swaps `_displayLabel`/icon discretely. Add a Lit-driven two-layer icon stack (copy + check absolutely positioned) cross-fading on `data-copied` with `--cg-transition-duration-fast` + a scale from `0.6→1`. Source: [Animate UI — Copy Button](https://animate-ui.com/docs/components/buttons/copy).

2. **Pair the icon-only variant with a tooltip that doubles as the success channel.** shadcn's 2025 guidance puts copy actions inside tooltips so the icon-only target gets a hover/focus label ("Copy") that flips to "Copied!" on success — solving the §4 live-region gap AND the §2 missing-label problem for icon-only at once. Wire a `role="status"` tooltip whose text is the existing `_displayLabel`, anchored to the button. Source: [shadcn/ui — Copy Button / InputGroup pattern](https://www.shadcn.io/patterns/input-group-buttons-1).

3. **Add an `inset`/input-group composition mode for embedding in fields.** The dominant 2025 layout is a copy button docked at the trailing edge of a read-only input or code block (shadcn InputGroup, Vercel API-key fields). Add a `variant="inset"` that drops the border-radius on the leading side, removes the standalone border, and inherits the host field's height — so it reads as part of the field rather than a floating chip. Source: [shadcn/ui — InputGroup buttons](https://www.shadcn.io/patterns/input-group-buttons-1).

4. **Lift the resting state to "ghost" density instead of placeholder-colored text.** Linear/Vercel ghost buttons sit at near-zero chrome at rest (transparent bg, muted-but-readable foreground) and only gain a subtle surface on hover. Combined with §2/Fix #5, switch the resting `--cg-color-input-text-placeholder` to a muted *body*-intent token and let hover introduce `--cg-overlay-dark-subtle` — closer to the modern low-chrome resting affordance than today's placeholder-gray label. Source: Linear/Vercel ghost-button density convention (shadcn `variant="ghost"`), [shadcn/ui components](https://www.shadcn.io/ui).

5. **Support copying richer payloads (text + markdown/HTML).** The newer shadcn copy-button accepts text, HTML, and referenced-element content with automatic markdown conversion. For an AI-native library this is high-value: add an optional `format="markdown"` prop so copying an assistant message preserves code fences/links instead of flattening to plain text, emitting the chosen format in the existing `ai-copy-success` detail. Source: [shadcn-copy-button (text/HTML/markdown)](https://github.com/iloveitaly/shadcn-copy-button).

6. **Give success a brief 2-step settle, then a longer auto-reset.** Current reset is a single timer. Modern implementations hold the "Copied!" confirmed state ~1.5–2s (long enough to read) before reverse-animating back, and debounce rapid re-clicks so the success animation isn't retriggered mid-flight. Extend the existing timer to a confirmed-hold + reverse-transition pair and guard against re-entry while `data-copied` is set. Source: [Animate UI — Copy Button](https://animate-ui.com/docs/components/buttons/copy) (held confirmation + reset).

Sources: [Animate UI — Copy Button](https://animate-ui.com/docs/components/buttons/copy), [shadcn/ui — InputGroup copy pattern](https://www.shadcn.io/patterns/input-group-buttons-1), [shadcn-copy-button](https://github.com/iloveitaly/shadcn-copy-button), [shadcn/ui components](https://www.shadcn.io/ui).
