## ai-file-upload — Manual Review

### 1. Token Audit (every CSS value)

The component's own `static styles` block is tiny — it composes three vetted shared style helpers (`hostBlock`, `reducedMotion`, `fadeSlideInKeyframes`) and adds a 5-line host rule. All visual surface (drop zone, borders, radii, file list, states) is delegated to `<cg-file-input>`, which is audited separately.

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 29 | `display: block` | `block` (keyword) | Yes | None — not a token value |
| 30 | `animation` duration | `var(--cg-transition-duration-default)` | Yes | None — valid tier-1 token, no fallback |
| 30 | `animation` easing | `var(--cg-transition-easing-ease-out)` | Yes | None — valid tier-1 token, no fallback |
| 30 | `animation` name / fill | `fadeSlideIn` / `both` | Yes | Keyframe name from shared `fadeSlideInKeyframes`; `both` is a keyword |
| 32 | `display: none` (`:host([hidden])`) | `none` (keyword) | Yes | None |

No magic px, no raw hex/rgba, no comma-fallbacks, no tier-1 palette colors, no `transition: all`. Every `var()` reference resolves to a real token in the tier-1 vocab.

### 2. Styling Audit
- **Border radius:** None declared at this level — owned by `cg-file-input` (`--cg-component-file-input-radius`). Correct delegation; no duplication.
- **Spacing:** None declared here. Delegated. Good.
- **Font-size accessibility:** No typography declared at this level. The `label` ("Drop training data here") is rendered by `cg-file-input`; 14px-min compliance is that component's responsibility. N/A here.
- **Translucent vs solid borders:** No borders at this level.
- **Transitions explicit vs all + motion tokens:** Only an `animation` (entrance `fadeSlideIn`) using tier-1 duration + easing tokens. No `transition: all`. Motion-token compliant. Entrance animation is correctly gated by the imported `reducedMotion` helper for `prefers-reduced-motion` users.
- **Dark-theme suitability:** No hardcoded colors anywhere; fully theme-driven via the delegated component and tokenized animation. Dark-first safe.

### 3. States Audit

This is a thin re-dispatch wrapper. Visual state rendering lives entirely in `<cg-file-input>`; `ai-file-upload` only forwards the `disabled` attribute and re-namespaces events.

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | Renders `cg-file-input` with AI-flavored defaults (label, max-size 10MB) | None |
| Hover | N/A | Delegated to `cg-file-input` | Wrapper adds no hover surface — correct |
| Active/Press | N/A | Delegated to `cg-file-input` | Correct |
| Focus-visible | N/A | Delegated to `cg-file-input` (it owns the interactive drop zone / input) | Wrapper is not itself focusable — correct |
| Disabled | Yes | `disabled` reflected (line 39) and forwarded via `?disabled=${this.disabled}` (line 66) | None — correctly propagated |
| Loading | N/A | No upload/progress lifecycle here; component only emits selection/rejection events | Reasonable for a thin wrapper |
| Error | Yes | `cg-file-reject` → re-dispatched as `ai-file-error` with `{ error, files }` (lines 50-57) | None |
| Success | Yes | `cg-file-change` → re-dispatched as `ai-file-select` with `{ files }` (lines 41-48) | None |

### 4. Interaction Audit
- **Keyboard:** No keyboard handling at this level. The drop zone, file picker trigger, and keyboard activation are owned by `cg-file-input`. Correct for a wrapper — no duplicated/competing handlers.
- **ARIA roles/labels/states:** None added here. `:host([hidden])` correctly mirrors the `hidden` attribute to `display: none`. The `disabled` property reflects (line 39) so it is exposed in the DOM/CSS, but it is not surfaced as `aria-disabled` on the host — acceptable since the inner `cg-file-input` receives `?disabled` and owns the accessibility tree.
- **CustomEvents + detail correctness:**
  - `ai-file-select` — `detail: { files: File[] }`, `bubbles: true`, `composed: true`. Matches the `@fires` JSDoc (line 17). Correct.
  - `ai-file-error` — `detail: { error: string, files: File[] }`, `bubbles: true`, `composed: true`. Matches JSDoc (line 18). Correctly maps the inner `reason` field to `error`. Correct.
  - Both events are `composed` so they cross the shadow boundary — right call for a re-dispatch wrapper.
- **Touch targets ≥44px:** Owned by `cg-file-input` (drop zone min-height via `--cg-component-file-input-min-height-*`). N/A at this level.

### 5. Visual Design Check
There is no standalone visual surface to judge — this component is a semantic/event adapter over `cg-file-input`. It adds AI-context defaults (a "Drop training data here" label, a 10MB cap) and a tasteful tokenized entrance animation (`fadeSlideIn`) that is reduced-motion-aware. Radius, breathing room, dividers, and typography hierarchy are all inherited from `cg-file-input`. The wrapper itself is clean, minimal, and does not undermine the underlying component's polish. Showcase-readiness therefore tracks `cg-file-input`. As a wrapper: well-scoped, no leaks, no anti-patterns.

One-word verdict: **strong**

### 6. Fixes Needed
No fixes needed — component is compliant. Every CSS value resolves to a real tier-1 token with no comma-fallbacks, no magic numbers, no raw colors, no tier-1 palette usage, and no `transition: all`. Event detail shapes match the documented `@fires` contracts, the entrance animation respects reduced-motion, and `disabled` is correctly forwarded to the delegated `cg-file-input`.

**Non-blocking flags (design notes, not token violations):**
- The host does not expose `aria-disabled` when `disabled` is set; this is acceptable because `cg-file-input` receives `?disabled` and owns the a11y tree, but surfacing it on the host could improve assistive-tech clarity.
- No loading/progress state exists. If this wrapper is ever expected to represent an in-flight upload (vs. pure local selection), consider an AI-lifecycle treatment using the dedicated AI-state tokens (e.g. `--cg-color-ai-streaming-*`). Out of scope for the current thin-wrapper design.

### Research-backed enhancements

Patterns drawn from the current (2025–2026) shadcn/ui + react-dropzone dropzone ecosystem (shadcn-dropzone, Shadcnblocks file-upload variants, UI Layouts) — the de-facto reference for Vercel/Linear-tier upload affordances. Each maps to a concrete change in `ai-file-upload` or its delegate `cg-file-input`.

1. **Per-file progress rows with inline cancel (not a single global state).** The reference dropzones render each selected file as its own row carrying a thumbnail/icon, name, size, an indeterminate-then-determinate progress bar, and a per-row remove/cancel control (shadcn-dropzone, Shadcnblocks "file-upload-dropzone" variants). Today `ai-file-upload` only emits a terminal `ai-file-select` with `File[]`. Add an optional `ai-file-progress` event (`detail: { file, loaded, total }`) and let `cg-file-input` render a per-file progress row, tinted with `--cg-color-ai-streaming-*` so the AI-native variant reads as "ingesting training data," not just "file picked." This closes the Loading-state gap flagged in §3.

2. **Distinct drag-over "armed" state with a spring/scale micro-interaction.** Modern dropzones visibly transform the drop target the instant a drag enters the window — border goes from dashed-idle to solid-accent, background lifts, and the cloud/upload glyph nudges up (UI Layouts, shadcn.io file-upload-dropzone). The current entrance `fadeSlideIn` is mount-only; there is no drag-active feedback. Add a `:host(...)`/inner `[data-drag-active]` treatment on `cg-file-input` using an explicit `transition: border-color, background-color, transform` (never `transition: all`, per guardrails) driven by `--cg-transition-duration-fast` + `--cg-transition-easing-ease-out`, and gate the transform behind the existing `reducedMotion` helper.

3. **Toast/inline rejection feedback instead of a silent error event.** The shadcn-dropzone pattern surfaces rejected files (wrong type, over max-size) as a toast or an inline error row rather than relying solely on a JS event (shadcn-dropzone docs, Shadcnblocks). `ai-file-upload` currently re-dispatches `ai-file-error` and shows nothing. Render a dismissible inline error row inside `cg-file-input` (status color from `--cg-color-status-error-*`) listing the offending filename and reason ("exceeds 10MB", "unsupported type") so the failure is visible without a host app wiring up a listener.

4. **Grid/thumbnail preview density for image payloads.** Several current variants switch from a vertical list to a thumbnail grid when the payload is images (Shadcnblocks grid-layout variant, UI Layouts). For an AI-native uploader (training data, vision inputs) add an optional `layout="grid"` mode on `cg-file-input` that lays previews out on a token-spaced grid (`--cg-spacing-*` gaps, `--cg-component-file-input-radius` on tiles) — denser, more legible for multi-image selection than stacked rows.

5. **Explicit empty vs. populated affordance in the drop copy.** Reference dropzones pair a prominent primary affordance ("Click to upload or drag and drop") with a secondary constraints line ("PNG, JPG up to 10MB") inside the idle zone (Shadcnblocks, shadcn.io). The current `ai-file-upload` only sets a single label ("Drop training data here") and never echoes its own 10MB cap to the user. Surface the accept-types + max-size as secondary helper text inside the drop zone, sourced from the component's own config, so the constraint is discoverable before a rejection occurs (reinforces enhancement #3).

Sources: [shadcn-dropzone (GitHub)](https://github.com/diragb/shadcn-dropzone), [shadcn-dropzone docs (Vercel)](https://shadcn-dropzone.vercel.app/docs), [Shadcnblocks file-upload components](https://www.shadcnblocks.com/components/file-upload), [shadcn.io file-upload-dropzone](https://www.shadcn.io/blocks/file-upload-dropzone), [UI Layouts file-upload](https://www.ui-layouts.com/components/file-upload).
