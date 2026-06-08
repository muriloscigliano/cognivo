## ai-json-viewer — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 30 | font-family | `var(--cg-font-family-mono)` | Yes | — |
| 31 | font-size | `var(--cg-font-size-sm)` | Yes | — (sm = 14px floor) |
| 32 | line-height | `1.6` | Flag | Unitless line-height; `--cg-line-height-relaxed` exists but raw 1.6 is tolerated. Minor. |
| 33 | color | `var(--cg-color-surface-base-text)` | Yes | — |
| 34 | animation duration/easing | `var(--cg-transition-duration-fast)` / `var(--cg-transition-easing-ease-out)` | Yes | — both in tier1 vocab |
| 39 | background | `var(--cg-color-surface-cards-background)` | Yes | — |
| 40 | border | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | Yes | — |
| 41 | border-radius | `var(--cg-border-radius-100)` | Yes | — |
| 42 | padding | `var(--cg-spacing-12) var(--cg-spacing-16)` | Yes | — |
| 51 | color (.key) | `var(--cg-color-status-info-text-default)` | Yes | — info-blue for keys is acceptable |
| 58 | outline (focus) | `2px solid var(--cg-overlay-accent-strong)` | Partial | `2px` is a bare magic number; `--cg-overlay-accent-strong` is valid but should be `--cg-color-focus-ring`. See fixes. |
| 59 | outline-offset | `1px` | Flag | Bare 1px; no tier-1 offset token exists (`--cg-color-focus-ring-offset` is a color, not a length). Leave as-is. |
| 60 | border-radius | `var(--cg-border-radius-25)` | NO | `--cg-border-radius-25` does NOT exist in tier1 vocab. Smallest is `--cg-border-radius-50`. Broken token. |
| 63 | color (.string) | `var(--cg-color-status-success-text-default)` | Yes | — |
| 64 | color (.number) | `var(--cg-color-surface-base-text)` | Flag | Number uses plain body text; `@cssprop` doc promises an accent. `--cg-color-accent-text` exists and would differentiate numbers. See report. |
| 65 | color (.boolean) | `var(--cg-color-status-success-text-default)` | Flag | Boolean shares success-green with string — poor syntax differentiation. `--cg-color-status-warning-text-default` would distinguish. Design flag. |
| 66 | color (.null) | `var(--cg-color-input-text-placeholder)` | Yes | — muted is appropriate |
| 72/73 | width/height (.toggle) | `var(--cg-spacing-16)` | Yes | — (sizing via spacing token; small but valid token) |
| 76 | color (.toggle) | `var(--cg-color-input-text-placeholder)` | Yes | — |
| 78 | padding | `0` | Yes | — 0 allowed |
| 79 | font-size | `var(--cg-font-size-xs)` | Yes | — decorative glyph, not body text |
| 81 | border-radius | `var(--cg-border-radius-25)` | NO | Same broken `--cg-border-radius-25`. Fix to `--cg-border-radius-50`. |
| 82 | transition | `color var(--cg-transition-duration-fast) var(--cg-transition-easing-default)` | Yes | — explicit property, not `all` |
| 85 | color (.toggle:hover) | `var(--cg-color-surface-base-text)` | Yes | — |
| 88 | outline (focus) | `2px solid var(--cg-overlay-accent-strong)` | Partial | Same as line 58 — bare 2px + should use `--cg-color-focus-ring`. |
| 89 | outline-offset | `1px` | Flag | Same as line 59. |
| 93 | color (.collapsed-hint) | `var(--cg-color-input-text-placeholder)` | Yes | — |
| 95 | font-size | `var(--cg-font-size-xs)` | Yes | — metadata hint, decorative |
| 100 | color (.line-count) | `var(--cg-color-input-text-placeholder)` | Yes | — |
| 101 | font-size | `var(--cg-font-size-xs)` | Yes | — comment metadata |
| 102 | margin-left | `var(--cg-spacing-4)` | Yes | — |
| 106 | color (.bracket) | `var(--cg-color-input-text-placeholder)` | Yes | — |
| 110 | border-radius (rounded none) | `0` | Yes | — |
| 111 | border-radius (rounded sm) | `var(--cg-border-radius-50)` | Yes | — |
| 112 | border-radius (rounded md) | `var(--cg-border-radius-100)` | Yes | — |
| 113 | border-radius (rounded lg) | `var(--cg-border-radius-150)` | Yes | — |
| 114 | border-radius (rounded full) | `var(--cg-border-radius-full)` | Yes | — |

### 2. Styling Audit

- **Border radius:** Root uses `--cg-border-radius-100` plus a full `rounded` variant set (none/sm/md/lg/full) all mapped to real tier-1 tokens. Good. BUT the two focus-ring `border-radius: var(--cg-border-radius-25)` (lines 60, 81) reference a non-existent token — radius scale starts at `-50`. These render as `initial`/0 at runtime, silently breaking the rounded focus corners.
- **Spacing:** All spacing from the tier-1 scale (`-4`, `-12`, `-16`). Toggle sizing reuses `--cg-spacing-16` for width/height — acceptable but a dedicated component sizing token would be cleaner (none exists; do not invent).
- **Font-size accessibility:** Body text is `--cg-font-size-sm` (14px), meeting the floor. The `xs` sizes are confined to decorative glyphs, item-count hints, and `//` comments — not primary body copy, so acceptable.
- **Translucent vs solid borders:** Border uses `--cg-color-surface-cards-border` (solid semantic) — good for dark theme.
- **Transitions explicit vs all + motion tokens:** `.toggle` transition enumerates `color` only (no `transition: all`). Entrance animation uses motion duration/easing tokens and is gated by the imported `reducedMotion` style. Compliant.
- **Dark-theme suitability:** All colors come from semantic surface/status/placeholder families that flip with theme. Strong.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.key`, `.toggle`, brackets render with base/muted colors | — |
| Hover | Yes | `.key:hover` underline; `.toggle:hover` brightens to base text | — |
| Active/Press | No | No `:active` styling on toggle or key | Minor — press feedback absent; design flag, not token violation |
| Focus-visible | Yes | `.key:focus-visible` and `.toggle:focus-visible` outline | Uses `--cg-overlay-accent-strong` not `--cg-color-focus-ring`; radius token broken (`-25`) |
| Disabled | N/A | Viewer is read-only display; no disabled concept | — |
| Loading | N/A | Static data render; no async/loading lifecycle | — |
| Error | Partial | `[Circular]` rendered via `.null` muted style | No dedicated error color; circular refs read as "null-ish". Could use `--cg-color-status-error-text-default`. Design flag |
| Success | N/A | Not an AI-lifecycle/status component | — |

Note: this component does NOT surface AI lifecycle states (thinking/streaming/complete/etc.), so the dedicated `--cg-color-ai-*` family is not applicable here.

### 4. Interaction Audit

- **Keyboard keys:** `.key` handles `Enter` via `@keydown` (line 227). Missing `Space` activation for a `role="button"` element — buttons should fire on Space too. The `.toggle` elements are native `<button>` so they get Enter/Space for free, but they carry a redundant `tabindex="0"` (native buttons are already focusable).
- **ARIA roles/labels/states:** Root has `role="tree"` + `aria-label="JSON viewer"`. Good. However child rows are plain `<div class="line">` with no `role="treeitem"` / `role="group"` and no `aria-expanded` on the toggle buttons — the tree role is not fulfilled. Toggle buttons have descriptive `aria-label` ("Expand/Collapse array/object") but no `aria-expanded` state. Keys use `role="button"` with `aria-label="Copy path: …"` though the event is named `ai-json-path-click` (label says "Copy", behavior emits a path — mild mismatch).
- **CustomEvents + detail:** `ai-json-path-click` dispatched with `{ detail: { path }, bubbles: true, composed: true }` — correct shape, matches the `@fires` JSDoc.
- **Touch targets ≥44px:** `.toggle` is `--cg-spacing-16` square (~16px) — well under 44px. This is a sizing/design change (enlargement), not a token violation; flagged here only.

### 5. Visual Design Check

Monospace tree with syntax-colored keys (info-blue), strings/booleans (success-green), muted nulls/brackets, item-count comments, and a clean card surface with rounded variants. Reads like a polished devtools JSON inspector. Weaknesses: number values share plain body text (no accent despite the documented `--cg-color-accent` cssprop), boolean shares the exact green of strings (reduced token-level differentiation), no `:active` press feedback, and the broken `-25` radius means focus corners are subtly square. Breathing room and dividers are adequate; typography hierarchy relies on color rather than weight, which suits a code view. Showcase-ready with the radius fix and a number-accent tweak.

One-word verdict: **adequate**

### 6. Fixes Needed

1. **Line 60** — broken radius token on `.key:focus-visible`.
   Current: `border-radius: var(--cg-border-radius-25);`
   Fixed: `border-radius: var(--cg-border-radius-50);`
   Why: `--cg-border-radius-25` does not exist in the tier-1 vocab (scale starts at `-50`); it resolves to nothing, silently dropping the rounded focus corner.

2. **Line 81** — broken radius token on `.toggle`.
   Current: `border-radius: var(--cg-border-radius-25);`
   Fixed: `border-radius: var(--cg-border-radius-50);`
   Why: Same non-existent token; smallest real radius is `--cg-border-radius-50`.

3. **Line 58** — focus outline should use the dedicated focus-ring color.
   Current: `outline: 2px solid var(--cg-overlay-accent-strong);`
   Fixed: `outline: var(--cg-border-width-100) solid var(--cg-color-focus-ring);`
   Why: `--cg-color-focus-ring` is the semantic token for focus indicators; the bare `2px` is a magic number — `--cg-border-width-100` is the tier-1 2px equivalent.

4. **Line 88** — same focus-ring fix on `.toggle:focus-visible`.
   Current: `outline: 2px solid var(--cg-overlay-accent-strong);`
   Fixed: `outline: var(--cg-border-width-100) solid var(--cg-color-focus-ring);`
   Why: Consistency + replaces magic `2px` with `--cg-border-width-100` and the semantic `--cg-color-focus-ring`.

Additional flags (no token-verified fix applied; design/a11y, not token-swap):
- `.number` (line 64) uses plain body text despite the documented accent cssprop — consider `--cg-color-accent-text` to differentiate numbers.
- `.boolean` (line 65) shares the exact success-green of `.string`; consider `--cg-color-status-warning-text-default` for syntax distinction.
- `[Circular]` (line 162) uses the `.null` muted style; consider `--cg-color-status-error-text-default` to signal it as an anomaly.
- Toggle touch target is ~16px (`--cg-spacing-16`), below the 44px target — enlargement is a design change, out of scope for token fixes.
- Missing `aria-expanded` on toggle buttons and `role="treeitem"`/`role="group"` on rows; `.key` keydown handles Enter but not Space.
- Redundant `tabindex="0"` on native `<button>` toggles.

### Research-backed enhancements

One focused search of 2025-era JSON-viewer patterns (shadcn/ui JSON Tree Viewer, Vercel `json-render`, and the Linear/Vercel themed shadcn registries). Concrete modernizations for THIS component:

1. **Per-node "copy as JSON" affordance, not just path-copy.** The shadcn JSON Tree Viewer pattern lets you copy any node *including its children* as formatted JSON to clipboard, while our `.key` only emits a path string. Add a row-level copy button that appears on hover (revealed via `opacity` transition on `.line:hover`, gated by `reducedMotion`) and emits the serialized subtree. This also resolves the existing label/behavior mismatch (the `aria-label` says "Copy path" but the event only emits a path). Source: shadcn/ui JSON Tree Viewer.

2. **Long-string truncation with inline expand.** The same pattern truncates long string values and offers an expand control. Our viewer renders strings at full length, which breaks the monospace tree layout on real API payloads. Truncate `.string` past ~80 chars with a muted "…(+N chars)" toggle reusing the existing `.collapsed-hint` style — no new tokens needed. Source: shadcn/ui JSON Tree Viewer.

3. **Hover-reveal "guide rails" for tree depth (Linear/Vercel devtools density).** Modern inspectors (Vercel dashboard, Linear) draw a faint vertical indent guide per nesting level that brightens on row hover, making deep structures scannable without extra vertical space. Add a `1px` left border per `.group` using `--cg-color-surface-cards-border` at rest, swapping to `--cg-color-surface-base-text` opacity on ancestor hover. Pure density win, fully token-driven. Source: Linear/Vercel shadcn theme registries (marvkr/better-design).

4. **`:active` press feedback + larger toggle hit area.** Current audit already flags the missing `:active` state and the ~16px toggle (below the 44px target). The 2025 shadcn convention is a visible press transform plus a hit area padded out beyond the visual glyph. Keep the 16px glyph but add invisible padding so the clickable region reaches the recommended target, and add an `:active` color/transform on `.toggle`. Source: shadcn/ui component conventions (accessible API + interaction states).

5. **Streaming-aware skeleton / incremental-render state.** Vercel's `json-render` is built for *generative* UI where JSON arrives progressively. As an `ai-*` component, ai-json-viewer should expose a `streaming` state — render already-parsed nodes immediately and show a shimmer placeholder row at the current parse frontier instead of waiting for the full payload. This finally justifies the dormant `--cg-color-ai-*` family the audit noted as "not applicable." Source: Vercel `json-render` (vercel-labs/json-render).

6. **Type-distinct syntax palette (numbers + booleans).** Reinforces audit flags #1/#2: 2025 viewers give every primitive type its own hue (string/number/boolean/null all distinct), whereas our `.number` borrows body text and `.boolean` shares string-green. Apply `--cg-color-accent-text` to numbers and `--cg-color-status-warning-text-default` to booleans for the standard four-way type differentiation. Source: shadcn/ui JSON Tree Viewer syntax-highlighting spec.

Sources:
- [JSON Tree Viewer (shadcn/ui)](https://next.jqueryscript.net/shadcn-ui/json-tree-viewer/)
- [vercel-labs/json-render](https://github.com/vercel-labs/json-render)
- [marvkr/better-design — Linear/Vercel shadcn themes](https://github.com/marvkr/better-design)
- [Extending shadcn/ui with custom components](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components)
