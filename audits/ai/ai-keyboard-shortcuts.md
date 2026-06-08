## ai-keyboard-shortcuts — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 36 | animation duration | `--cg-transition-duration-default` | Yes | — |
| 36 | animation easing | `--cg-transition-easing-ease-out` | Yes | — |
| 36 | animation fill | `both` | Yes | keyword |
| 41 | position | `fixed` | Yes | keyword |
| 42 | inset | `0` | Yes | zero |
| 43 | background (scrim) | `--cg-overlay-dark-strong` | No (tier-1 overlay) | → `--cg-color-modal-overlay-background` |
| 44 | backdrop-filter | `blur(2px)` | Acceptable | filter primitive, not a sizing magic px |
| 48 | z-index | `--cg-z-index-top` | Yes | real token (in tokens dist), not in vocab subset |
| 52 | background (modal) | `--cg-color-surface-base-background` | Adequate | flag: modal could use `--cg-color-surface-modal-background` |
| 53 | border | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | Adequate | flag: modal-context border could be `--cg-color-surface-modal-border` |
| 54 | border-radius | `--cg-border-radius-150` | Yes | — |
| 55 | padding | `--cg-spacing-24` | Yes | — |
| 56 | max-width | `520px` | No (bare magic px) | flag — no verified component/tier token; do not invent |
| 57 | width | `90vw` | Yes | viewport unit |
| 58 | max-height | `70vh` | Yes | viewport unit |
| 67 | margin-bottom | `--cg-spacing-16` | Yes | — |
| 71 | color (title) | `--cg-color-surface-base-text` | Yes | — |
| 72 | font-size | `--cg-font-size-lg` | Yes | — |
| 73 | font-weight | `--cg-font-weight-bold` | Yes | — |
| 79 | color (close) | `--cg-color-input-text-placeholder` | Off-semantic | flag: muted text via input-placeholder token (no clean tier-2 muted-text token in vocab) |
| 80 | font-size | `--cg-font-size-xl` | Yes | — |
| 82 | padding | `--cg-spacing-4` | Yes | — |
| 83 | border-radius | `--cg-border-radius-50` | Yes | — |
| 84 | line-height | `1` | Yes | unitless |
| 86 | color (hover) | `--cg-color-surface-base-text` | Yes | — |
| 88 | outline | `2px solid --cg-overlay-accent-strong` | No (tier-1 overlay) | → color `--cg-color-focus-ring` |
| 89 | outline-offset | `--cg-outline-offset-default` | Yes | real token (in tokens dist), not in vocab subset |
| 94 | padding | `--cg-spacing-8` `--cg-spacing-12` | Yes | — |
| 95 | border-radius | `--cg-border-radius-100` | Yes | — |
| 96 | border | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | Adequate | flag (input border could be `--cg-color-input-border-default`) |
| 97 | background | `--cg-color-surface-container-background` | Yes | — |
| 98 | color | `--cg-color-surface-base-text` | Yes | — |
| 99 | font-size | `--cg-font-size-sm` | Yes (14px min ok) | — |
| 101 | margin-bottom | `--cg-spacing-16` | Yes | — |
| 105 | placeholder color | `--cg-color-input-text-placeholder` | Yes | correct semantic here |
| 108 | outline | `2px solid --cg-overlay-accent-strong` | No (tier-1 overlay) | → color `--cg-color-focus-ring` |
| 109 | outline-offset | `--cg-outline-offset-default` | Yes | real token |
| 118 | color (category) | `--cg-color-input-text-placeholder` | Off-semantic | flag: muted-text via placeholder token |
| 119 | font-size | `--cg-font-size-xs` | Caption-tier, ok for label | label, not body text |
| 120 | font-weight | `--cg-font-weight-bold` | Yes | — |
| 123 | letter-spacing | `0.5px` | Minor | bare px on letter-spacing; not in enforced set; flag |
| 123 | padding | `--cg-spacing-8` 0 `--cg-spacing-6` | Yes | — |
| 124 | border-bottom | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | Adequate | divider could use `--cg-color-surface-modal-divider` |
| 125 | margin-bottom | `--cg-spacing-4` | Yes | — |
| 132 | padding | `--cg-spacing-8` `--cg-spacing-4` | Yes | — |
| 136 | color (desc) | `--cg-color-surface-base-text` | Yes | — |
| 137 | font-size | `--cg-font-size-sm` | Yes (14px min) | — |
| 143 | gap | `--cg-spacing-4` | Yes | — |
| 151 | min-width | `--cg-spacing-24` | Yes | sizing via spacing scale ok |
| 152 | height | `--cg-spacing-24` | Yes | — |
| 153 | padding | `0 --cg-spacing-6` | Yes | — |
| 154 | background | `--cg-color-surface-container-background` | Yes | — |
| 155 | border | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | Yes | — |
| 156 | border-bottom-width | `3px` | No (bare magic px) | flag — no verified tier token (border-width-75/100 exist but raw 3px not provably equal); do not invent |
| 157 | border-radius | `--cg-border-radius-50` | Yes | — |
| 158 | color | `--cg-color-surface-base-text` | Yes | — |
| 159 | font-size | `--cg-font-size-xs` | Ok (badge glyph) | — |
| 160 | font-weight | `--cg-font-weight-bold` | Yes | — |
| 161 | font-family | `--cg-font-family-mono` | Yes | — |
| 166 | color (plus) | `--cg-color-input-text-placeholder` | Off-semantic | flag: muted text via placeholder token |
| 167 | font-size | `--cg-font-size-xs` | Ok | — |
| 171 | color (no-results) | `--cg-color-input-text-placeholder` | Off-semantic | flag |
| 172 | font-size | `--cg-font-size-sm` | Yes | — |
| 174 | padding | `--cg-spacing-16` | Yes | — |
| 234 | SVG width/height | `12` / `viewBox` / `stroke-width="3"` | Yes | unitless SVG geometry, not violations |

### 2. Styling Audit
- **Border radius:** Consistent and tokenized — modal `--cg-border-radius-150`, input `-100`, close button & key badge `-50`. Good hierarchy.
- **Spacing:** All padding/margin/gap pulled from the `--cg-spacing-*` scale. Badge sizing reuses `--cg-spacing-24` for min-width/height — acceptable.
- **Font-size accessibility:** Body text (search input, shortcut description, no-results) is `--cg-font-size-sm` (14px) — meets the minimum. Category labels and key badges use `--cg-font-size-xs`; these are non-body label/glyph contexts, acceptable.
- **Translucent vs solid borders:** Borders use solid semantic card-border tokens — good. The `border-bottom-width: 3px` on `.key-badge` is a raw px (the keycap "3D" lip).
- **Transitions:** Only an entry `animation` with explicit duration + easing tokens; no `transition: all`. Reduced-motion handled via imported `reducedMotion` style. Compliant.
- **Dark-theme suitability:** Dark-first surface/text tokens with a dark scrim + blur backdrop. Reads well on dark. No raw hex/rgba anywhere.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | Modal, input, badges render at rest | — |
| Hover | Partial | `.close-btn:hover` lightens color | Search input & rows have no hover affordance (rows are non-interactive, acceptable) |
| Active/Press | No | — | N/A — no pressable elements beyond close button; minor |
| Focus-visible | Yes | `.close-btn` and `.search-input` get `outline` via overlay token | Uses tier-1 overlay instead of `--cg-color-focus-ring` (Fix 2/3) |
| Disabled | N/A | — | No disabled states; component has no disable-able controls |
| Loading | N/A | — | Static shortcut data, no async load |
| Error | N/A | — | No data-fetch / validation path |
| Success | N/A | — | Not applicable |

Empty/no-results state IS handled (`.no-results` "No shortcuts found") — good.

### 4. Interaction Audit
- **Keyboard:** Global `keydown` listener closes on `Escape` (only while `open`). Listener added in `connectedCallback`, removed in `disconnectedCallback` — clean. No focus trap inside the dialog and no autofocus to the search input on open — flag (modal a11y best practice).
- **ARIA:** `role="dialog"`, `aria-modal="true"`, `aria-label="Keyboard shortcuts"` on the modal. Close button has `aria-label="Close shortcuts"`. Search input has `aria-label`. List uses `role="list"` / `role="listitem"`. Strong ARIA coverage.
- **CustomEvents:** Dispatches `ai-shortcuts-close` with `{ bubbles: true, composed: true }` — escapes shadow DOM correctly. No `detail` payload (none needed for a close event). Matches the `@fires` JSDoc.
- **Touch targets:** Close button is roughly `12px` SVG + `--cg-spacing-4` padding ≈ 20px — below the 44px target. Key badges are ~24px (non-interactive, fine). Enlarging the close-button hit area is a design change, noted here, not a token fix.

### 5. Visual Design Check
Modern and clean: blurred dark scrim, rounded modal, monospace keycap badges with a bottom "lip" for a tactile 3D feel, search filter, grouped categories with uppercase labels and dividers. Typography hierarchy is clear (title `lg/bold` → category `xs/bold/uppercase` → desc `sm`). Breathing room from the spacing scale is good. The keycap badges are a genuinely nice, showcase-worthy detail. Main polish gaps: muted text leans on the input-placeholder token (semantic mismatch), focus ring uses an overlay token rather than the dedicated focus-ring token, and the close target is small. Verdict: **strong**.

### 6. Fixes Needed
1. **Line 43** — scrim uses tier-1 overlay token. Current `background: var(--cg-overlay-dark-strong);` → `background: var(--cg-color-modal-overlay-background);`. Why: modal scrims must use the tier-2 semantic overlay token, not a tier-1 `--cg-overlay-*` primitive.
2. **Line 88** — focus outline uses tier-1 overlay token. Current `outline: 2px solid var(--cg-overlay-accent-strong);` → `outline: 2px solid var(--cg-color-focus-ring);`. Why: focus rings must use the dedicated tier-2 `--cg-color-focus-ring` semantic token.
3. **Line 108** — same overlay-token focus violation on the search input. Current `outline: 2px solid var(--cg-overlay-accent-strong);` → `outline: 2px solid var(--cg-color-focus-ring);`. Why: same as Fix 2.

**Flags (no verified token swap — do NOT invent one):**
- Line 56 `max-width: 520px` and line 156 `border-bottom-width: 3px` are bare magic px; no matching tier/component token exists in the vocab, so leave as-is or add a real component token before swapping.
- Muted text (lines 79, 118, 166, 171) reuses `--cg-color-input-text-placeholder`; there is no clean tier-2 "text-secondary/muted" token in the vocab to swap to — flag for a future token rather than a wrong swap.
- Modal background/border/divider (lines 52, 53, 124) could move to `--cg-color-surface-modal-*` family for stronger semantics — optional, not a hard violation.
- A11y: no focus trap and no autofocus-to-search on open; close button touch target < 44px (design change, not a token fix).

### Research-backed enhancements

Modern (2025-era) keyboard-shortcut and command-palette surfaces (Linear, Vercel, Raycast, shadcn `cmd-k`, Mobbin's command-palette glossary) converge on a keyboard-first, low-chrome, highly-affordant dialog. Concrete upgrades for THIS component:

1. **Live result highlighting + arrow-key navigation, not just text filter.** Right now the search input only filters rows; rows are explicitly non-interactive (States Audit, Interaction Audit). Linear/Raycast and shadcn's `cmdk` make the *list itself* keyboard-driven: ArrowUp/ArrowDown move a highlighted "active" row, Enter triggers it, and the highlight uses a subtle `--cg-color-surface-container-background` fill with a left accent border. This turns the modal from a passive cheat-sheet into an executable palette and fixes the "Active/Press: No" gap noted in the States Audit. (Source: shadcn/cmdk pattern; Sam Solomon, "Designing Command Palettes," solomon.io.)

2. **Match-term highlighting inside descriptions as you type.** Per Mobbin's command-palette guidance, effective search "provides effective search functionality" by visually confirming *why* a row matched — wrap the matched substring of each shortcut description in a `<mark>`-style span tinted with the accent/focus token rather than re-coloring the whole row. Low cost, big perceived-intelligence win, and reinforces the search affordance already present. (Source: Mobbin command-palette glossary; UX Patterns for Developers, uxpatterns.dev.)

3. **Autofocus search on open + a proper focus trap (now a researched a11y requirement, not just polish).** The UX Patterns / WAI guidance for this pattern is explicit: "keep focus order logical when the pattern opens" and the surface must be fully operable keyboard-only with focus contained. The audit already flagged missing autofocus and no focus trap as a P-level a11y gap — research confirms this is table-stakes for the pattern, not optional. Add `autofocus` to the search input and a Tab/Shift-Tab trap between input and close button while `open`. (Source: uxpatterns.dev command-palette pattern; ui-patterns.com keyboard-shortcuts.)

4. **Micro-animation: scrim fade + modal scale/translate-in, springy not linear.** Currently there is a single entry `animation` with `--cg-transition-duration-default` + `ease-out`. The Linear/Vercel feel comes from a two-part motion — scrim opacity fades while the panel does a small `translateY(8px) → 0` with `scale(0.98) → 1`. Keep it token-driven (reuse the existing duration/easing tokens) and keep the `reducedMotion` guard. This is the difference between "a div appeared" and "a surface arrived." (Source: Vercel/Linear command-palette motion conventions, per solomon.io and Mobbin examples.)

5. **Density + a persistent footer hint bar.** Raycast/Linear pin a thin footer inside the dialog showing the live affordances ("↑↓ to navigate · ↵ to run · esc to close") using the same monospace keycap badges already built here (`.key-badge`). It teaches the new arrow-key/Enter interactions from #1 in-context, reuses existing badge styling (zero new tokens), and gives the otherwise-empty bottom edge purpose. Pair with slightly tighter row `padding` (drop to `--cg-spacing-6` vertical) so more shortcuts are visible without scrolling — power-user density is the point of this surface. (Source: Raycast/Linear footer-hint convention; Mobbin command-palette glossary.)

Sources:
- [Command Palette UI Design — Mobbin glossary](https://mobbin.com/glossary/command-palette)
- [Command Palette Pattern — UX Patterns for Developers](https://uxpatterns.dev/patterns/advanced/command-palette)
- [Designing Command Palettes — Sam Solomon (solomon.io)](https://solomon.io/designing-command-palettes/)
- [Keyboard Shortcuts design pattern — ui-patterns.com](https://ui-patterns.com/patterns/keyboard-shortcuts)
