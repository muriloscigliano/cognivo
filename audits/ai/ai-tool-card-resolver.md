## ai-tool-card-resolver — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 33 | animation duration | `var(--cg-transition-duration-fast)` | Yes | — |
| 33 | animation easing | `var(--cg-transition-easing-default)` | Yes | — |
| 37 | background | `var(--cg-color-surface-cards-background)` | Yes | — |
| 38 | border width | `var(--cg-border-width-50)` | Yes | — |
| 38 | border color | `var(--cg-color-surface-cards-border)` | Yes | — |
| 39 | border-radius | `var(--cg-border-radius-200)` | Yes | — |
| 41 | transition (border-color) | `var(--cg-transition-duration-fast) var(--cg-transition-easing-default)` | Yes (explicit prop, not `all`) | — |
| 44 | border-color (hover) | `var(--cg-color-input-border-hover)` | Yes | — |
| 49 | padding | `var(--cg-spacing-16)` | Yes | — |
| 52 | gap | `var(--cg-spacing-8)` | Yes | — |
| 55 | height | `var(--cg-spacing-12)` | Yes (spacing-as-size, acceptable) | — |
| 56 | border-radius | `var(--cg-border-radius-100)` | Yes | — |
| 57-62 | linear-gradient stops | `--cg-color-surface-container-background`, `--cg-color-surface-cards-border` | Yes (gradient stops valid) | — |
| 63 | background-size | `200% 100%` | Yes (%) | — |
| 64 | animation | `shimmer 1.5s linear infinite` | Yes (keyframe duration) | — |
| 66-68 | width | `60% / 90% / 75%` | Yes (%) | — |
| 72 | padding | `var(--cg-spacing-16)` | Yes | — |
| 77 | gap | `var(--cg-spacing-8)` | Yes | — |
| 78 | margin-bottom | `var(--cg-spacing-12)` | Yes | — |
| 81 | font-size | `var(--cg-font-size-sm)` | Yes | — |
| 82 | color | `var(--cg-color-surface-base-text)` | Yes | — |
| 85 | font-size | `var(--cg-font-size-sm)` | Yes | — |
| 86 | font-weight | `var(--cg-font-weight-semibold)` | Yes | — |
| 87 | color | `var(--cg-color-surface-base-text)` | Yes | — |
| 90 | font-family | `var(--cg-font-family-mono)` | Yes | — |
| 91 | font-size | `var(--cg-font-size-xs)` | Borderline (see §2) | Flag only — code display, not body text |
| 92 | line-height | `1.5` (raw) | Magic number | Flag only — `--cg-line-height-normal` exists but unitless line-height not in hard-violation list |
| 93 | color | `var(--cg-color-input-text-placeholder)` | Yes | — |
| 94 | background | `var(--cg-color-surface-base-background)` | Yes | — |
| 95 | border-radius | `var(--cg-border-radius-100)` | Yes | — |
| 96 | padding | `var(--cg-spacing-12)` | Yes | — |
| 100 | max-height | `var(300px)` | **BROKEN** — `var(<number>)` is invalid CSS | **Fix → `var(--cg-spacing-256)`** |
| 106 | padding | `var(--cg-spacing-16)` | Yes | — |
| 109 | gap | `var(--cg-spacing-8)` | Yes | — |
| 112 | color (error icon) | `var(--cg-color-status-error-text-default)` | Valid, but AI error state → see §3/§6 | Recommend `--cg-color-ai-error-text` |
| 113 | font-size | `var(--cg-font-size-base)` | Yes | — |
| 117 | font-size | `var(--cg-font-size-sm)` | Yes | — |
| 118 | color (error text) | `var(--cg-color-status-error-text-default)` | Valid, but AI error state → see §3/§6 | Recommend `--cg-color-ai-error-text` |
| 123 | padding | `0` | Yes (0 allowed) | — |
| 127-128 | animation (reduced motion) | `none` | Yes | — |
| 133 | box-shadow | `0 0 0 3px var(--cg-overlay-accent-strong)` | Token valid; `3px` is a bare magic spread | Flag only — box-shadow geometry not in hard-violation list; consider `--cg-color-focus-ring` |

### 2. Styling Audit

- **Border radius:** Card `--cg-border-radius-200`; inner skeleton/JSON `--cg-border-radius-100`. Consistent, tokenized, modern.
- **Spacing:** All from the spacing scale (`8/12/16`). Clean rhythm.
- **Font-size accessibility:** Body-equivalent text (fallback title/icon, error text) uses `--cg-font-size-sm` (14px) — meets the 14px minimum. The JSON dump at `--cg-font-size-xs` (line 91) is below 14px, but it is a monospace raw-data code block, not prose; acceptable as code display. Flagged, not blocked.
- **Translucent vs solid borders:** Borders use solid semantic surface-card / input tokens. Good for dark theme.
- **Transitions explicit vs all:** Both transitions enumerate properties (`border-color`, and the `:host` animation) with duration + easing motion tokens. No `transition: all`. Compliant.
- **Motion tokens:** `--cg-transition-duration-fast` + `--cg-transition-easing-default` used; reduced-motion guard present (lines 126-129). Good.
- **Dark-theme suitability:** All colors pull from tier-2 semantic surface/status families that resolve per theme. Suitable.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.card` region with resolved/fallback content | — |
| Hover | Yes | `.card:hover` border-color shift (line 43-45) | Subtle but present |
| Active/Press | N/A | Resolver is a container, not a pressable control | No press affordance needed |
| Focus-visible | Partial | `:focus-visible` box-shadow ring (lines 131-134); card has `tabindex="0"` | Uses `--cg-overlay-accent-strong` + magic `3px` rather than `--cg-color-focus-ring`; functional |
| Disabled | N/A | No interactive/form semantics | Not applicable |
| Loading | Yes | Shimmer skeleton, `role="status"`, `aria-label` (lines 209-217) | Good |
| Error | Yes | `.error` block, `role="alert"` (lines 237-244) | Uses generic `--cg-color-status-error-*`; this is an AI tool-resolution failure → AI-state family `--cg-color-ai-error-text` is the semantically correct token |
| Success | N/A | Resolved-component render is the success path; rendering delegated to child | Reasonable; no explicit success chrome needed |

### 4. Interaction Audit

- **Keyboard:** Card is focusable (`tabindex="0"`) so it enters tab order; no key handlers needed since it is a passive region. Resolved child components own their own interactions.
- **ARIA:** `role="region"` + dynamic `aria-label` on the card (line 250-251); `role="status"` on skeleton; `role="alert"` on error; `role="log"` on the JSON dump; decorative icons marked `aria-hidden="true"`. Strong, correct coverage.
- **CustomEvents:** `ai-tool-card-action` proxied from the resolved child with `{toolName, action, data}`; `ai-tool-card-error` with `{toolName, error}`. Both `bubbles + composed`. Listener registered with `AbortController` signal and cleaned up on `disconnectedCallback`. JSDoc `@fires` detail shape matches dispatch. Correct.
- **Touch targets:** Card itself is large; no small interactive hit-areas inside the resolver shell. N/A.

### 5. Visual Design Check

Modern and sleek: tokenized radii, shimmer skeleton, semantic surfaces, monospace JSON fallback, and a clear error treatment. Breathing room is consistent (16px padding, 8/12px gaps). Typography hierarchy is adequate (semibold title vs muted mono body). No hard dividers, relying on surface contrast — fine for a delegating container. Focus ring present. Once the two AI-state recommendations and the broken `var(300px)` are addressed it is showcase-ready. Verdict: **strong**.

### 6. Fixes Needed

1. **Line 100** — broken `var(<number>)` token.
   - Current: `max-height: var(300px);`
   - Fixed: `max-height: var(--cg-spacing-256);`
   - Why: `var(300px)` is invalid CSS (custom-property names cannot be raw numbers) and resolves to nothing, removing the scroll cap. `--cg-spacing-256` is a real tier-1 token providing a comparable bounded scroll height.

2. **Line 112** — AI error state should use the dedicated AI-state color family.
   - Current: `color: var(--cg-color-status-error-text-default);`
   - Fixed: `color: var(--cg-color-ai-error-text);`
   - Why: This error is an AI tool-resolution lifecycle failure; convention reserves the `--cg-color-ai-error-*` family for AI states over the generic status family.

3. **Line 118** — same AI error state, text color.
   - Current: `color: var(--cg-color-status-error-text-default);`
   - Fixed: `color: var(--cg-color-ai-error-text);`
   - Why: Same as above; the error message text should use the AI-error semantic token for consistency with the AI lifecycle family.

Flags (not in fixes array — design/borderline, no clean token substitution mandated):
- Line 92: raw `line-height: 1.5` could use `--cg-line-height-normal`.
- Line 133: focus ring uses a magic `3px` spread; `--cg-color-focus-ring` would be more semantic than `--cg-overlay-accent-strong`, but box-shadow geometry px is not a hard violation.
- Line 91: JSON dump at `--cg-font-size-xs` is below the 14px body minimum, acceptable as code display.

### Research-backed enhancements

Modern AI tool-card patterns (Vercel [AI Elements](https://vercel.com/changelog/introducing-ai-elements), [shadcn.io's tool-use family](https://www.shadcn.io/ai)) have converged on a few affordances this resolver is currently missing. Concrete, component-specific suggestions:

1. **Collapsible tool-call header with a status pill, not a full-height JSON dump (Vercel AI Elements `Tool` + shadcn.io `tool-use`).** AI Elements renders each tool call as a single-line collapsible row — `tool name · status pill · chevron` — with the input/output JSON tucked behind a disclosure. This resolver always shows the raw JSON inline (line 90-96, capped at the soon-to-be-fixed `max-height`). Replace the always-open mono dump with a collapsed-by-default `<details>`-style header carrying a status pill (`pending`/`running`/`resolved`/`error`) and a chevron, expanding to the JSON only on demand. This collapses the default vertical footprint dramatically and matches the dominant 2025 pattern where a chat transcript may stack dozens of tool calls.

2. **Add a `running`/`pending` lifecycle state distinct from the shimmer skeleton (shadcn.io tool-use status set).** The states audit (§3) shows only Loading (skeleton) and Error — there is no "tool invoked, awaiting result" affordance. shadcn.io's tool-use components model a 4-state machine (`input-streaming → input-available → output-available → output-error`). Introduce a `running` state with an animated status dot (use the existing `--cg-transition-easing-default` + reduced-motion guard already at lines 126-129) so a long-running tool resolution reads as active work rather than a frozen skeleton.

3. **Border-accent the status, don't just tint the icon (Linear / Vercel card convention).** The error state currently only colors the icon and text (lines 112/118). Linear and Vercel cards signal status with a 1px left accent border or a top hairline in the status hue. Add a `border-inline-start` accent on `.card` keyed to state using the AI-state family (`--cg-color-ai-error-border` for error, `--cg-color-action-primary-*` for running). This gives a scannable status edge in a stacked list without adding chrome — and reuses the existing `--cg-border-width-50` token.

4. **Promote hover affordance to a row-action cluster that appears on hover (Linear hover-reveal pattern).** The hover state is presently a near-invisible border-color shift (line 43-45). Linear's signature pattern reveals a right-aligned action cluster (copy, retry, expand) on row hover via opacity 0→1. For a tool-card, surface a "copy JSON" and "retry" affordance on `:hover`/`:focus-within` — this also gives the focusable card (`tabindex="0"`) a real reason to be in the tab order, which §4 notes is currently passive.

5. **Tighten default density and add a `dense` host attribute (shadcn/Vercel compact-list ergonomics).** At `--cg-spacing-16` padding plus `--cg-spacing-12` gaps everywhere, a single resolved tool card is generous; in a transcript of many calls this becomes a scroll tax. Modern AI-SDK transcripts default to compact rows. Add a `:host([dense])` variant dropping to `--cg-spacing-8`/`--cg-spacing-4` so consumers rendering long agent traces can opt into a tighter rhythm without forking the component.

6. **Add a copy-to-clipboard control on the JSON block with transient confirmation (shadcn.io artifact/code-block convention).** The `role="log"` JSON dump (line 90-96) is read-only with no extraction path. shadcn.io code/artifact blocks ship a hover copy button with a check-state confirmation. Add a copy button (reusing `--cg-color-action-primary-*` and the existing `--cg-transition-duration-fast`) that swaps to a check glyph for ~1.5s — this is the single most-used affordance on inspectable tool I/O.
