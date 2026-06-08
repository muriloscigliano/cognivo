## ai-command-palette — Manual Review

### 1. Token Audit (every CSS value)

This component is a **pure logic wrapper** around `<cg-command>`. It carries no visual CSS of its own — all rendering (surface, radius, spacing, typography, items) is delegated to the child `cg-command`. Its only style block is structural plumbing plus the shared, vetted `hostBlock`.

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 39 | `static styles` includes `hostBlock` | shared `base.css` (uses `--cg-font-family-primary`) | Yes | None — shared, vetted style |
| 40 | `:host { display: contents }` | keyword | Yes (N/A) | None |
| 41 | `:host([hidden]) { display: none }` | keyword | Yes (N/A) | None |

There are **no** color, radius, spacing, font-size, border, or transition declarations authored in this file. Nothing references the palette tier, no comma-fallbacks, no raw hex/rgba, no magic px, no `transition: all`, no made-up tokens. The token vocab is effectively unused here because there is no styled surface to audit.

### 2. Styling Audit

- **Border radius:** None authored. A public `rounded` property (line 44, default `'lg'`) is declared and `reflect`ed but is **never forwarded** to `cg-command` in `render()` (lines 167–176), and `cg-command` has no `rounded` concept at all. The visual radius is entirely whatever `cg-command` hard-codes (`--cg-component-command-radius`). This is a dead/misleading API surface — see Fixes.
- **Spacing:** None authored; delegated to `cg-command`.
- **Font-size accessibility (14px min):** No typography authored here; inherited from `cg-command`. No violation in this file.
- **Translucent vs solid borders:** N/A — no borders authored.
- **Transitions explicit vs all + motion tokens:** N/A — no transitions authored. No `transition: all`.
- **Dark-theme suitability:** Inherited from `cg-command`, which is token-driven and dark-first. Nothing here regresses it.

Verdict for this layer: structurally clean. The styling risk is entirely an API-honesty problem (`rounded` is a no-op), not a token problem.

### 3. States Audit

All interactive/visual states are owned by `cg-command`; this wrapper only manages `open` and the query string.

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `render()` mounts `cg-command` when `open` (line 166) | None |
| Hover | N/A | Item hover handled inside `cg-command` | Wrapper adds none — correct delegation |
| Active/Press | N/A | Selection handled via `@cg-command-select` (line 172) | None |
| Focus-visible | N/A | Input/list focus owned by `cg-command` | Wrapper adds no focusable chrome — correct |
| Disabled | N/A | No disabled concept for a palette container | Reasonable omission |
| Loading | N/A | No async fetch; commands passed in synchronously | Reasonable omission |
| Error | N/A | No error surface; `localStorage` failures are swallowed (lines 56–58, 66–68) | Silent-fail is acceptable for recents persistence |
| Success | N/A | Selection success surfaced via `ai-command-select` event | None |

Empty/no-results state: handled inside `cg-command` (the wrapper just passes a possibly-empty `_items` array). Acceptable.

### 4. Interaction Audit

- **Keyboard:** No keys handled in this file. Arrow navigation, Enter-to-select, and Escape-to-close all live in `cg-command`; this wrapper subscribes to the resulting `cg-command-select` / `cg-command-close` / `cg-command-input` events (lines 172–174). The JSDoc claims Escape closes the palette — that behavior depends on `cg-command` emitting `cg-command-close`, which the wrapper correctly handles (lines 149–157). Acceptable delegation.
- **ARIA roles/labels/states:** None authored here; combobox/listbox semantics are `cg-command`'s responsibility. The wrapper renders no extra DOM that would need ARIA. No regression.
- **CustomEvents + detail correctness:**
  - `ai-command-select` (lines 142–146): `detail: { id, label }`, `bubbles: true`, `composed: true`. Matches documented `@fires` signature (line 17). Correct.
  - `ai-command-close` (lines 153–156): no detail, `bubbles`/`composed` true. Matches line 18. Correct.
  - Inbound events are `stopPropagation()`-ed (lines 136, 150, 161) before re-emitting namespaced events — clean event hygiene.
- **Touch targets ≥44px:** Item sizing is `--cg-component-command-item-height` inside `cg-command`; not controllable here. Out of scope for this wrapper.

### 5. Visual Design Check

There is no authored visual surface in this component — it is a behavioral adapter (fuzzy search + recent-commands history via `localStorage` + category→group mapping). Sleekness, radius, breathing room, dividers, and typography hierarchy are all inherited from `cg-command`. Judged purely as a wrapper, it is well-factored: small, single-responsibility, clean event re-dispatch, defensive `localStorage` handling. The one blemish is the misleading `rounded` public prop that does nothing.

One-word verdict: **adequate** (clean wrapper; held back from "strong" only by the dead `rounded` API and full reliance on `cg-command` for all visuals).

### 6. Fixes Needed

**No token fixes needed — the component authors no CSS values and is fully token-compliant.**

Non-token flags (design/API, not part of the token fixes array):

1. **Dead `rounded` property (line 44).** `rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg'` is declared and `reflect`ed but never forwarded to `cg-command` in `render()` (lines 167–176), and `cg-command` exposes no `rounded` attribute (verified — zero matches in `cg-command.ts`). This is a misleading public API: consumers setting `rounded="sm"` get no effect. Recommendation: either remove the property, or thread a real radius override into `cg-command` (which would itself require a new tier-3 token / a `rounded` API on `cg-command`). No existing vocab token can fix this in-file, so it is flagged here rather than proposed as a code fix.

2. **JSDoc `@example` icon value (line 11).** `icon:'[box icon]'` is placeholder text rather than a real icon token/name. Cosmetic documentation nit only; not a styling or token violation.

### Research-backed enhancements

Most of these belong in `cg-command` (where the visuals live), but the wrapper is the right place to *orchestrate* them since it already owns query state, recents, and category→group mapping. Pattern sources from a focused 2025-era scan of the Linear / Vercel / shadcn-cmdk / Raycast lineage.

1. **Persistent right-aligned shortcut hints on each item.** Vercel, Figma, and Intercom render the keyboard shortcut inline on the right edge of every command row, not just in a help screen ([Mobbin – Command Palette best practices](https://mobbin.com/glossary/command-palette)). The wrapper already maps commands into `_items`; thread a `shortcut?: string` field through into the `cg-command` item model and render it as a trailing `<kbd>` cluster. This converts the palette from a search box into a passive shortcut-teaching surface, which is the dominant 2025 rationale for shipping one at all.

2. **Grouped results with sticky section headers + a leading "Recents" group.** The wrapper already does category→group mapping and persists recents to `localStorage`, but nothing pins those groups visually. Linear and the shadcn `cmdk` dialog use sticky group headers ("Suggestions", "Recent", "Commands") that stay anchored while the filtered list scrolls underneath ([shadcn/ui Command](https://ui.shadcn.com/docs/components/command)). Surface the existing recents array as an explicit first group with a sticky header rather than folding it into the flat `_items` list.

3. **Spring-eased mount/exit, not an instant toggle.** The palette currently mounts hard on `open`. Linear/Raycast use a fast scale-up-from-~0.96 + opacity fade on open and a quick reverse on close, with the backdrop fading in parallel (the "feel so damn fast" effect ([shadcn.io](https://www.shadcn.io/))). Implement as an explicit, token-driven transition on `transform` + `opacity` (never `transition: all`, per token guardrails) honoring `prefers-reduced-motion`. This is a `cg-command` change but should be gated by the wrapper's `open` lifecycle.

4. **Inline empty/no-match state with a quick action, not just an empty list.** Right now an empty `_items` array delegates to whatever `cg-command` shows. Modern palettes (Raycast, Linear) render a centered "No results for '`{query}`'" with a contextual fallback action — e.g. "Search docs for '`{query}`'" or "Create '`{query}`'" ([Mobbin](https://mobbin.com/glossary/command-palette)). The wrapper holds the live query string, so it is the correct layer to synthesize a fallback command and inject it when filtering yields zero matches.

5. **Highlight the matched substring in each result label.** The fuzzy matcher already knows which characters matched to score a row; 2025 palettes (cmdk-based, Linear) bold or accent those matched characters so users see *why* a result ranked ([Medium – Command Palette UX Patterns](https://medium.com/design-bootcamp/command-palette-ux-patterns-1-d6b6e68f30c1)). Return match index ranges from the scorer alongside the item and let `cg-command` wrap matched spans in an accent token — turning the existing-but-invisible match data into a visible affordance.

6. **Async/loading affordance for command sources.** The audit notes "no async fetch; commands passed in synchronously" as a reasonable omission, but 2025 palettes increasingly mix static actions with live-fetched results (search, navigation targets). Add an optional `loading` state and a slim top-edge progress shimmer in the input row (Vercel pattern) so the wrapper can support async command providers without a layout jump. Low priority until an async source exists, but it future-proofs the single-responsibility boundary the wrapper already enforces.

Sources: [Mobbin – Command Palette best practices](https://mobbin.com/glossary/command-palette), [shadcn/ui Command](https://ui.shadcn.com/docs/components/command), [shadcn.io](https://www.shadcn.io/), [Medium – Command Palette UX Patterns](https://medium.com/design-bootcamp/command-palette-ux-patterns-1-d6b6e68f30c1).
