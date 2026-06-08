## ai-prompt-template — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 31 | animation duration/easing | `--cg-transition-duration-fast` / `--cg-transition-easing-default` | Yes | — |
| 33 | display (hidden) | `none` | Yes | — |
| 36 | background | `--cg-color-surface-container-background` | Yes | — |
| 37 | border | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | — |
| 38 | border-radius | `--cg-border-radius-150` | Yes | — |
| 39 | padding | `--cg-spacing-16` | Yes | — |
| 40 | color | `--cg-color-surface-base-text` | Yes | — |
| 47 | margin-bottom | `--cg-spacing-12` | Yes | — |
| 51 | font-size | `--cg-font-size-sm` | Yes | — |
| 52 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 57 | gap | `--cg-spacing-4` | Yes | — |
| 61 | background | `transparent` | Yes | — |
| 62 | border | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | — |
| 63 | color | `--cg-color-input-text-placeholder` | Valid token; semantically a placeholder color used as a button label color | Flag (not a token violation) |
| 64 | font-size | `--cg-font-size-xs` | Valid token | xs = 12px on a control label; a11y concern (see §2) |
| 65 | padding | `--cg-spacing-4` `--cg-spacing-8` | Yes | — |
| 66 | border-radius | `--cg-border-radius-100` | Yes | — |
| 68 | transition (enumerated) | fast / easing-default | Yes (explicit, not `all`) | — |
| 70 | transform scale | `--cg-interaction-press-scale` | Yes | — |
| 72 | background | `--cg-color-action-primary-background-default` | Yes | — |
| 73 | color | `--cg-color-surface-container-background` | Valid token; used as text-on-primary (should be an on-primary token) | Flag (see §2) |
| 74 | border-color | `--cg-color-surface-base-text` | Yes | — |
| 75 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 77 | border-color / color | `--cg-color-surface-cards-border` / `--cg-color-input-text-placeholder` | Valid | — |
| 80 | box-shadow focus ring | `0 0 0 3px var(--cg-overlay-accent-strong)` | **Bare `3px`** + non-standard focus pattern | **Yes** |
| 85 | background | `--cg-color-surface-base-background` | Yes | — |
| 86 | border | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | — |
| 87 | border-radius | `--cg-border-radius-100` | Yes | — |
| 88 | padding | `--cg-spacing-16` | Yes | — |
| 89 | min-height | `80px` | **Bare magic px** | Flag (no real token; see §6) |
| 90 | font-size | `--cg-font-size-sm` | Yes | — |
| 91 | line-height | `1.7` | **Unitless magic number** | **Yes** |
| 92 | color | `--cg-color-input-text-placeholder` | Valid; placeholder color used as primary template body text | Flag (readability, §2) |
| 98 | background | `--cg-color-surface-base-background` | Yes | — |
| 99 | border | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | — |
| 100 | border-radius | `--cg-border-radius-100` | Yes | — |
| 101 | padding | `--cg-spacing-16` | Yes | — |
| 102 | min-height | `80px` | **Bare magic px** | Flag (no real token; see §6) |
| 105 | font-size | `--cg-font-size-sm` | Yes | — |
| 106 | font-family | `--cg-font-family-mono` | Yes | — |
| 107 | line-height | `1.7` | **Unitless magic number** | **Yes** |
| 108 | color | `--cg-color-input-text-placeholder` | Valid; placeholder color used as editor text | Flag (readability) |
| 112 | outline | `2px solid var(--cg-overlay-accent-strong)` | **Bare `2px`** | **Yes** |
| 113 | outline-offset | `-2px` | **Bare px** | **Yes** |
| 117 | background | `--cg-overlay-accent-subtle` | Yes | — |
| 118 | color | `--cg-color-surface-base-text` | Yes | — |
| 119 | padding | `--cg-spacing-1` `--cg-spacing-4` | Yes | — |
| 120 | border-radius | `--cg-border-radius-50` | Yes | — |
| 121 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 122 | font-family | `--cg-font-family-mono` | Yes | — |
| 123 | font-size | `--cg-font-size-xs` | Valid token | xs = 12px (a11y, §2) |
| 127 | color (resolved var value) | `--cg-color-status-success-text-default` | Valid; "success green" used to denote a filled value (semantic stretch) | Flag (§2) |
| 128 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 133 | margin-top | `--cg-spacing-12` | Yes | — |
| 137 | font-size | `--cg-font-size-xs` | Valid | xs (a11y) |
| 138 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 139 | color | `--cg-color-input-text-placeholder` | Valid (section label) | — |
| 140 | margin-bottom | `--cg-spacing-8` | Yes | — |
| 146 | gap | `--cg-spacing-8` | Yes | — |
| 147 | margin-bottom | `--cg-spacing-6` | Yes | — |
| 151 | font-size | `--cg-font-size-xs` | Valid | xs (a11y) |
| 152 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 153 | color | `--cg-color-surface-base-text` | Yes | — |
| 154 | font-family | `--cg-font-family-mono` | Yes | — |
| 155 | min-width | `--cg-spacing-96` | Valid token; spacing used as a width | Acceptable |
| 160 | background | `--cg-color-surface-base-background` | Yes | — |
| 161 | border | `--cg-border-width-50` + `--cg-color-surface-cards-border` | Yes | — |
| 163 | color | `--cg-color-surface-base-text` | Yes | — |
| 163 | font-size | `--cg-font-size-xs` | Valid | xs (a11y) |
| 164 | padding | `--cg-spacing-6` `--cg-spacing-8` | Yes | — |
| 165 | border-radius | `--cg-border-radius-100` | Yes | — |
| 169 | outline | `2px solid var(--cg-overlay-accent-strong)` | **Bare `2px`** | **Yes** |
| 171 | outline-offset | `-2px` | **Bare px** | **Yes** |
| 174 | opacity (disabled) | `0.5` | Allowed (unitless opacity) | — |
| 179 | color (empty-state) | `--cg-color-input-border-hover` | **Valid token but a border color used for TEXT** | Flag (§6) |
| 180 | font-size | `--cg-font-size-sm` | Yes | — |
| 181 | padding | `--cg-spacing-16` `0` | Yes | — |
| 185 | border-radius (none) | `0` | Yes | — |
| 186 | border-radius (sm) | `--cg-border-radius-50` | Yes | — |
| 187 | border-radius (md) | `--cg-border-radius-100` | Yes | — |
| 188 | border-radius (lg) | `--cg-border-radius-150` | Yes | — |
| 189 | border-radius (full) | `--cg-border-radius-full` | Yes | — |

### 2. Styling Audit

- **Border radius:** Consistent and tokenized. Container has a full `rounded` variant ladder (none/sm/md/lg/full → 50/100/150/full). Inner elements use 100/50. Good.
- **Spacing:** All spacing from the tier-1 scale. No magic spacing values.
- **Font-size accessibility:** The component is heavy on `--cg-font-size-xs` (12px) for the mode buttons (64), variable highlight chips (123), variables-title (137), var-name (151) and **the var-input field itself (163)**. The var-input is an editable text field — 12px input text is below the 14px (`--cg-font-size-sm`) body-text floor and is the most significant a11y readability concern here. Mono `xs` chips are borderline acceptable as inline code, but the editable input should be `--cg-font-size-sm`. (Sizing/typographic scale change — described here, not auto-fixed.)
- **Translucent vs solid borders:** Borders use solid semantic tokens (`--cg-color-surface-cards-border`); overlay tokens (`--cg-overlay-accent-*`) are used appropriately for focus glow and the highlight chip background. Fine.
- **Transitions explicit vs all:** The `.mode-btn` transition (68) correctly enumerates `border-color`, `color`, `background` — no `transition: all`. Motion tokens (`--cg-transition-duration-fast`, `--cg-transition-easing-default`) used. `:active` press scale uses `--cg-interaction-press-scale`. Good. `reducedMotion` is imported and applied via shared styles.
- **Dark-theme suitability:** All colors resolve through semantic surface/action tokens, so theme-agnostic. One concern: template body + textarea text uses `--cg-color-input-text-placeholder` (92, 108) — a deliberately muted placeholder color used as the **primary content** color. Real template content will render dimmed/low-contrast against the surface. It should use `--cg-color-surface-base-text` for actual content. Likewise `.mode-btn.active` text (73) uses `--cg-color-surface-container-background` as an on-primary label color; a dedicated `--cg-color-on-primary-default` exists and is the semantically correct token for text sitting on `--cg-color-action-primary-background-default`. The "filled value" color (127) borrows status-success green — works visually but conflates "success" with "has a value."

**Verdict:** adequate.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.container`, `.template-area`, `.var-input` base styles | — |
| Hover | Partial | `.mode-btn:hover:not(.active)` (77) | Hover sets border to the SAME `--cg-color-surface-cards-border` and color to the same placeholder — effectively a no-op; no perceptible hover feedback. Inputs/textarea have no hover state. |
| Active/Press | Yes | `.mode-btn:active` scale (70); `.mode-btn.active` selected style | Press feedback present and tokenized. |
| Focus-visible | Yes | `.mode-btn:focus-visible` box-shadow (80); `.template-textarea` / `.var-input` outline (112, 169) | Bare px values (`3px`, `2px`, `-2px`); not using `--cg-outline-width-*` / `--cg-outline-offset-*` / `--cg-color-focus-ring`. Two different focus visuals (box-shadow vs outline) for sibling controls — inconsistent. |
| Disabled | Yes | `.var-input:disabled` opacity 0.5 + not-allowed (172); inputs bound to `?disabled=${!this.editable}` | Opacity-only disabled; acceptable. Mode toggle buttons are never disabled even when `editable=false`. |
| Loading | N/A | — | Static editor; no async/loading lifecycle. |
| Error | N/A | — | No validation of template/variable values is in scope. |
| Success | Partial | `.var-value` (127) green for resolved values in preview | Repurposes success color to mean "value present," not a true success state. |

### 4. Interaction Audit

- **Keyboard:** Mode buttons are native `<button>` (focusable, Enter/Space activate) with explicit `tabindex="0"`. Textarea and inputs are native, fully keyboard-operable. However the toggle is a `role="radiogroup"` with `role="radio"` children — ARIA radio semantics require **Arrow-key** navigation and roving tabindex (one tab stop), but here both radios have `tabindex="0"` and there is no arrow-key handler. So the keyboard model (Tab between two buttons) does not match the announced radio role. Either drop the radio roles in favor of plain toggle buttons (`aria-pressed`) or implement roving-tabindex + arrow keys.
- **ARIA:** `role="region"` + `aria-label="Prompt template editor"` on container (good). `radiogroup`/`radio` with `aria-checked` reflecting `_mode` (correct values). Textarea has `aria-label="Template content"`. Each var input has a descriptive `aria-label="Value for variable {name}"`. Preview wrapper uses `role="document"` — unusual but not harmful. Solid labeling overall.
- **CustomEvents:** `ai-template-change` (detail `{template}`) and `ai-template-variable-change` (detail `{variable, value}`) both `bubbles: true, composed: true`. Detail shapes match the documented `@fires` JSDoc. Correct.
- **Touch targets:** Mode buttons are `xs` font + `4px/8px` padding → well under 44×44px. Var inputs are `6px/8px` padding + `xs` text → height ~28–30px, under 44px. These are touch-target enlargements (design change), noted here, not in fixes.

### 5. Visual Design Check

- Modern/sleek: Reasonably so — mono-font variable chips with a subtle accent-overlay background, an edit/preview segmented toggle, and a clean variables list read as a competent prompt editor.
- Radius: Tokenized, full variant ladder. Good.
- Breathing room: Container `16px` padding and `12px` section rhythm are comfortable; variable rows at `6px` gap are a touch tight.
- Dividers: None between header / editor / variables — relies purely on whitespace. A `--cg-color-surface-cards-divider` rule above `.variables-section` would sharpen the hierarchy.
- Typography hierarchy: Title `sm/semibold`, body `sm`, everything else collapses to `xs/semibold`, so the secondary tiers are visually flat (semibold everywhere reduces contrast between labels and chips). The dimmed placeholder color on primary body text undercuts the polish.
- HeroUI/Vercel showcase-ready: Close but not quite — the muted body text, no-op hover on the toggle, undersized 12px input text, and missing dividers hold it back from a flagship showcase tile.

**Verdict:** adequate.

### 6. Fixes Needed

1. **Line 91** — `.template-area` `line-height: 1.7;` → `line-height: var(--cg-line-height-relaxed);`
   Why: unitless magic number; a tier-1 line-height token exists.

2. **Line 107** — `.template-textarea` `line-height: 1.7;` → `line-height: var(--cg-line-height-relaxed);`
   Why: same magic-number violation.

3. **Line 80** — `.mode-btn:focus-visible` `box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);` → `box-shadow: 0 0 0 var(--cg-outline-width-thick) var(--cg-color-focus-ring);`
   Why: bare `3px` magic value; replace with the tier-1 outline-width token and the semantic focus-ring color so focus styling is consistent with the rest of the library.

4. **Line 112** — `.template-textarea:focus-visible` `outline: 2px solid var(--cg-overlay-accent-strong);` → `outline: var(--cg-outline-width-default) solid var(--cg-color-focus-ring);`
   Why: bare `2px` + non-semantic focus color.

5. **Line 114** — `.template-textarea:focus-visible` `outline-offset: -2px;` → `outline-offset: calc(-1 * var(--cg-outline-offset-default));`
   Why: bare px offset; use the tier-1 outline-offset token (negated for the inset offset).

6. **Line 169** — `.var-input:focus-visible` `outline: 2px solid var(--cg-overlay-accent-strong);` → `outline: var(--cg-outline-width-default) solid var(--cg-color-focus-ring);`
   Why: bare `2px` + non-semantic focus color.

7. **Line 171** — `.var-input:focus-visible` `outline-offset: -2px;` → `outline-offset: calc(-1 * var(--cg-outline-offset-default));`
   Why: bare px offset.

**Flags (no safe token-verified fix — reported, not auto-applied):**
- **Lines 89, 102** — `min-height: 80px` on `.template-area` and `.template-textarea` is a bare magic px. There is no real generic min-height token for this surface (`--cg-component-textarea-min-height` belongs to a different component); recommend adding a tier-3 token rather than borrowing one. Do not invent a token.
- **Lines 92, 108** — primary template body / textarea text uses `--cg-color-input-text-placeholder`; should be `--cg-color-surface-base-text` for actual content (placeholder color dims real content). This is a semantic recommendation, not a token-existence violation.
- **Line 73** — `.mode-btn.active` label color should be `--cg-color-on-primary-default` (text-on-primary) instead of `--cg-color-surface-container-background`.
- **Line 179** — `.empty-state` color uses `--cg-color-input-border-hover` (a border token) for text; recommend `--cg-color-input-text-placeholder` or an empty-state text token.
- **Line 163** — var-input field text is `--cg-font-size-xs` (12px); below the 14px body floor for an editable field; recommend `--cg-font-size-sm`. (Typographic/sizing change.)
- **Interaction** — radio role vs. Tab-based keyboard model mismatch (see §4); either switch to `aria-pressed` toggle buttons or add roving-tabindex + arrow keys.
- **Touch targets** — mode buttons and var inputs are under 44px (design enlargement).

### Research-backed enhancements

Modern prompt-template editors (the kind you see in shadcn-built AI playgrounds, Vercel's AI SDK demos, Linear's command surfaces, and HeroUI form patterns) have converged on a few affordances this component is missing. Each below is concrete and ties to a specific pattern source.

1. **Inline `{{variable}}` token chips inside the template text itself, not just a separate list.** The current design splits authoring (textarea) from the variables panel; modern prompt editors (the PromptCompiler pattern where filled-in variables compile into the prompt string — [ui-patterns.com Input Prompt](https://ui-patterns.com/patterns/InputPrompt), [Medium: prompt-friendly UI with React/TS](https://jia-song.medium.com/how-to-build-a-prompt-friendly-ui-with-react-typescript-e71cd3f227d3)) render each `{{var}}` as a pill-shaped, clickable chip *in-flow* with the body text. Clicking a chip focuses its value field. This reuses the existing `--cg-overlay-accent-subtle` chip styling already defined for `.var-value`, just relocated into the editing surface. It collapses the author/preview mental model into one.

2. **Live diff-style preview overlay instead of a separate read-only mode.** Rather than the binary edit/preview segmented toggle, Vercel-AI-SDK-style template editors overlay the resolved values *in place* with a subtle highlight (the "value present" green at line 127 is already the right semantic), so the author sees substitution live. Pair with a `--cg-transition-duration-fast` cross-fade on substitution so a filled variable visibly "snaps in." This removes a full mode switch and makes the no-op hover/dead toggle (flagged in §3) unnecessary.

3. **Empty-state + auto-grow on the editor surface.** The `min-height: 80px` magic px (lines 89/102) should become an auto-growing textarea that expands with content up to a max, a near-universal pattern in Linear's composer and shadcn `Textarea` auto-resize recipes. Combined with a real empty-state ("Start typing a prompt, use `{{ }}` for variables") this fixes both the magic-number flag and the flat empty experience noted in §5.

4. **Per-variable type affordances and a "copy compiled prompt" action.** shadcn/HeroUI form-builder patterns attach a lightweight type hint (text / number / enum-select) per variable rather than a uniform text input, plus a one-click "Copy resolved prompt" button with a transient checkmark confirmation. The copy action is the single most-requested affordance in prompt tooling ([0xminds AI UI prompt templates collection, 2026](https://0xminds.com/blog/guides/ai-prompt-templates-complete-collection)) and gives the editor a clear terminal action it currently lacks.

5. **Density and divider polish to hit the showcase bar.** Per §5's own verdict, add a `--cg-color-surface-cards-divider` rule above `.variables-section`, loosen variable-row gap from `--cg-spacing-6` to `--cg-spacing-8`, and apply the "one unexpected element" guidance ([Design+Code prompting-for-UI guide](https://designcode.io/prompt-ui-intro/), [Miro AI UI prompts](https://miro.com/ai/prompts/ui-design-prompts/)) — here, a monospace caret-style focus glow on the active variable chip — to lift it from "adequate" to flagship-tile quality. Bump the editable `.var-input` from `xs` (12px) to `--cg-font-size-sm`, which is also the §2 a11y fix, killing two birds.

6. **Subtle micro-animation on variable resolution.** When a variable transitions from unfilled to filled, animate the chip background from `transparent` to `--cg-overlay-accent-subtle` over `--cg-transition-duration-fast` with `--cg-transition-easing-default` (motion tokens already imported, `reducedMotion` already wired per §2). This "fill confirmation" micro-interaction is the Linear/HeroUI signature for making form completion feel responsive without a spinner.

Sources: [ui-patterns.com — Input Prompt pattern](https://ui-patterns.com/patterns/InputPrompt) · [Prompt-friendly UI with React/TypeScript](https://jia-song.medium.com/how-to-build-a-prompt-friendly-ui-with-react-typescript-e71cd3f227d3) · [0xminds — AI UI prompt templates (2026)](https://0xminds.com/blog/guides/ai-prompt-templates-complete-collection) · [Design+Code — Prompting for UI](https://designcode.io/prompt-ui-intro/) · [Miro — AI UI design prompts](https://miro.com/ai/prompts/ui-design-prompts/)
