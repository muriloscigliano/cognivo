## ai-model-selector — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 25 | display (`:host([hidden])`) | `none` | Yes | — |
| 29 | gap | `var(--cg-spacing-6)` | Yes | — |
| 30 | margin-bottom | `var(--cg-spacing-12)` | Yes | — |
| 31 | padding-bottom | `var(--cg-spacing-12)` | Yes | — |
| 32 | border-bottom | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-divider)` | Yes | — |
| 36 | padding | `var(--cg-spacing-4) var(--cg-spacing-12)` | Yes | — |
| 37 | border-radius | `var(--cg-border-radius-full)` | Yes | — |
| 38 | border | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | Yes | — |
| 39 | background / color | `transparent` / `var(--cg-color-surface-container-outlined)` | Yes | — |
| 40 | font-size / font-weight | `var(--cg-font-size-xs)` / `var(--cg-font-weight-medium)` | Yes (xs = caption; acceptable on a chip, not body) | — |
| 42 | transition | explicit list: border-color, color, background w/ `--cg-transition-duration-fast` + `--cg-transition-easing-default` | Yes | — |
| 44 | border-color / color (hover) | `var(--cg-color-surface-cards-hover-border)` / `var(--cg-color-surface-base-text)` | Yes | — |
| 45 | box-shadow (focus-visible) | `0 0 0 3px var(--cg-overlay-accent-strong)` | **No** | Bare `3px` magic length → `var(--cg-focus-ring-width)`; focus color should be `--cg-color-focus-ring` |
| 46 | border/color/background (active chip) | `--cg-color-action-primary-background-default` / `--cg-overlay-accent-subtle` | Yes | — |
| 51 | grid-template-columns | `repeat(auto-fill, minmax(220px, 1fr))` | **No** | `220px` is a bare magic px for the card min-width (see report flag) |
| 52 | gap | `var(--cg-spacing-12)` | Yes | — |
| 57 | padding | `var(--cg-spacing-16)` | Yes | — |
| 58 | background | `var(--cg-color-surface-cards-background)` | Yes | — |
| 59 | border | `var(--cg-border-width-50) solid var(--cg-color-surface-cards-border)` | Yes | — |
| 60 | border-radius | `var(--cg-border-radius-150)` | Yes | — |
| 62 | transition | explicit list: border-color, background, transform | Yes | — |
| 65 | border-color / background (hover) | `--cg-color-surface-cards-hover-border` / `--cg-color-surface-cards-hover-background` | Yes | — |
| 66 | transform (active) | `scale(var(--cg-interaction-press-scale))` | Yes | — |
| 67 | box-shadow (focus-visible) | `0 0 0 3px var(--cg-overlay-accent-strong)` | **No** | Bare `3px` magic length → `var(--cg-focus-ring-width)`; focus color should be `--cg-color-focus-ring` |
| 69-70 | border-color / background (selected) | `--cg-color-action-primary-background-default` / `--cg-overlay-accent-subtle` | Yes | — |
| 75 | top / right (check) | `var(--cg-spacing-8)` | Yes | — |
| 76 | width / height (check) | `var(--cg-spacing-20)` | Yes | — |
| 77 | border-radius | `var(--cg-border-radius-full)` | Yes | — |
| 78 | background | `var(--cg-color-action-primary-background-default)` | Yes | — |
| 79 | color | `var(--cg-color-action-primary-text-default)` | Yes | — |
| 82 | width / height (check svg) | `var(--cg-spacing-12)` | Yes | — |
| 86 | gap (model-header) | `var(--cg-spacing-8)` | Yes | — |
| 87 | margin-bottom | `var(--cg-spacing-8)` | Yes | — |
| 89 | font-size (model-icon) | `var(--cg-font-size-lg)` | Yes | — |
| 91 | font-size / font-weight / color (model-name) | `--cg-font-size-sm` / `--cg-font-weight-semibold` / `--cg-color-surface-base-text` | Yes (sm = 14px body min) | — |
| 92 | font-size / color (model-provider) | `--cg-font-size-xs` / `--cg-color-surface-container-outlined` | Yes (xs = caption metadata) | — |
| 94 | font-size / color / line-height / margin (model-desc) | `--cg-font-size-xs` / `--cg-color-surface-container-outlined` / `--cg-line-height-snug` / `--cg-spacing-8` | Borderline | Body description at xs (12px); consider `--cg-font-size-sm` for readability (flag) |
| 97 | gap (caps) | `var(--cg-spacing-4)` | Yes | — |
| 98 | --cg-badge-font-size override | `var(--cg-font-size-xs)` | Yes (consumer override of cg-badge tier-3) | — |
| 100 | padding / color / font-size (empty) | `--cg-spacing-48` / `--cg-color-surface-container-outlined` / `--cg-font-size-sm` | Yes | — |
| 103 | border-radius (rounded=none) | `0` | Yes (`0` is allowed) | — |
| 104 | border-radius (rounded=sm) | `var(--cg-border-radius-50)` | Yes | — |
| 105 | border-radius (rounded=md) | `var(--cg-border-radius-100)` | Yes | — |
| 106 | border-radius (rounded=lg) | `var(--cg-border-radius-150)` | Yes | — |

### 2. Styling Audit

- **Border radius:** Cards use `--cg-border-radius-150` with a clean `none/sm/md/lg` override matrix mapped to real radius tokens (`0 / 50 / 100 / 150`). Chips use `--cg-border-radius-full` (pill). All tokenized and consistent.
- **Spacing:** Entirely from the spacing scale (`4/6/8/12/16/20/48`). No raw spacing values. Good rhythm.
- **Font-size accessibility:** Primary body text (`.model-name`, `.empty`) is `--cg-font-size-sm` (14px) — compliant. Metadata (`.model-provider`) and chips use `--cg-font-size-xs` — acceptable for captions/labels. The `.model-desc` (line 94) is descriptive body copy rendered at `--cg-font-size-xs` (12px); not a hard token violation but below the 14px body comfort target — flagged for readability.
- **Translucent vs solid borders:** Borders use solid semantic card/divider tokens. Selected/active states layer a translucent `--cg-overlay-accent-subtle` fill over the accent border — appropriate dark-first treatment.
- **Transitions:** All transitions are explicit property lists (border-color, color, background, transform) with `--cg-transition-duration-fast` + easing tokens. No `transition: all`. Compliant. `reducedMotion` is imported and applied via shared styles.
- **Dark-theme suitability:** All colors resolve through tier-2 semantic surface/action tokens, so it adapts to dark automatically. Overlay-accent fills read well on dark surfaces. Suitable.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.model-card` base + `.filter-chip` base | — |
| Hover | Yes | `.model-card:hover`, `.filter-chip:hover` — border + background shift | — |
| Active/Press | Yes | `.model-card:active { transform: scale(var(--cg-interaction-press-scale)) }` | Chips have no active/press feedback (minor) |
| Focus-visible | Yes | `:focus-visible { box-shadow: 0 0 0 3px ... }` on card + chip | Bare `3px` magic px; uses `--cg-overlay-accent-strong` instead of dedicated `--cg-color-focus-ring` |
| Disabled | N/A | No disabled concept for model cards/chips in this component's API | — |
| Loading | N/A | Selection is synchronous client-side; no async fetch state | — |
| Error | N/A | No error surface in API | — |
| Success/Selected | Yes | `.model-card.selected` + `.check` indicator + `aria-selected` | Selected uses primary accent — strong affordance |

### 4. Interaction Audit

- **Keyboard:** `_handleGridKeydown` handles ArrowUp/Down/Left/Right (with wrap-around) and Enter/Space to select. `preventDefault` is called correctly. Roving focus via `_focusCard()`. Filter chips are native `<button>` so Enter/Space work for free. Solid coverage.
- **ARIA:** Grid is `role="listbox"` with `aria-label="Select a model"` and `aria-multiselectable` bound to `multi`. Cards are `role="radio"` (single) / `role="checkbox"` (multi) with `aria-selected` and `tabindex="0"`. Filter row is `role="group"` with label. Correct roles for the selection model.
  - Minor: cards use `tabindex="0"` on every card rather than roving `tabindex` (0 on active, -1 on rest), so Tab steps through all cards; arrow-key navigation is the intended path. Acceptable but a roving-tabindex pattern would be cleaner.
- **CustomEvents:** `ai-model-select` fires with `{ selected: string[], model }`, bubbles + composed — matches the `@fires` JSDoc. `ai-model-compare` fires when exactly 2 are selected in multi mode with `{ models }`. Note: `models` maps ids through `this.models.find(...)` which can yield `(AIModel | undefined)[]`; documented type is `AIModel[]`. Minor type-safety gap, not a token issue.
- **Touch targets:** Filter chips are `~24px` tall (`spacing-4` y-padding + xs text) — below the 44px touch target. Model cards are large (≥44px). Chip enlargement is a design change, noted as a flag, not a token fix.

### 5. Visual Design Check

Modern and sleek: pill filter chips, rounded `150` cards with hover lift via border/background shift and a press-scale micro-interaction, a circular accent check badge, and badge-driven capability/cost metadata. Radius is generous and consistent; breathing room from `spacing-16` card padding and `spacing-12` grid gap is good. Divider under the filter row gives clear hierarchy. Typography hierarchy (semibold name / xs provider / xs desc) is clear, though the description at 12px is a touch small for a showcase. Selected state with the accent fill + check is a strong, legible affordance. Dark-first and HeroUI/Vercel-adjacent.

One-word verdict: **strong**

### 6. Fixes Needed

1. **Line 45** — focus ring on `.filter-chip:focus-visible`. Current: `box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);` → Fixed: `box-shadow: 0 0 0 var(--cg-focus-ring-width) var(--cg-color-focus-ring);`. Why: bare `3px` is a magic length; `--cg-color-focus-ring` is the dedicated semantic focus token (consistent with the rest of the library's focus-ring pattern).
2. **Line 67** — focus ring on `.model-card:focus-visible`. Current: `box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);` → Fixed: `box-shadow: 0 0 0 var(--cg-focus-ring-width) var(--cg-color-focus-ring);`. Why: same as above — magic `3px` + non-focus semantic color.

**Flags (not token fixes):**
- **Line 51** — `minmax(220px, 1fr)` uses a bare `220px` card min-width. There is no component-level width token for this component in the vocab, so no compliant token substitution exists; recommend adding a tier-3 token (e.g. a card min-width) rather than inventing one inline.
- **Line 94** — `.model-desc` body copy at `--cg-font-size-xs` (12px); consider bumping to `--cg-font-size-sm` for readability.
- **Filter chips** — ~24px tall, below the 44px touch-target minimum; enlarge padding/height for touch (design change).
- **Line 170** — `ai-model-compare` detail `models` can contain `undefined` entries (`.find` may miss); tighten to filter undefined to match the documented `AIModel[]` type.

### Research-backed enhancements

Sourced from current (2025-era) patterns: shadcn/ui's Radix-primitive `Command`/`Combobox` model, Vercel v0's default component conventions, and the Linear/HeroUI command-palette aesthetic.

1. **Add a type-to-filter command input above the grid.** The dominant 2025 model-picker pattern (shadcn/ui `Command` + `cmdk`, and the Linear command palette) leads with a search field that fuzzy-filters by model name/provider/capability, with arrow keys flowing from the input into results. With a growing model roster, the current chip-only filter row doesn't scale; a `cg-command`/combobox input would. The existing `role="listbox"` + roving arrow-key handler is already the right substrate to wire `aria-activedescendant` from a search box. (Pattern: shadcn/ui `Command`, Linear ⌘K palette.)

2. **Group cards under sticky provider headers instead of one flat `auto-fill` grid.** shadcn/ui's `CommandGroup` and Vercel's own model picker segment options by provider (OpenAI / Anthropic / Google) with a small sticky label and divider. This converts the `.model-provider` metadata (currently buried per-card at `xs`) into a scannable spatial grouping and cuts visual search time. Pairs naturally with the filter chips already present. (Pattern: shadcn/ui `CommandGroup`, Vercel AI SDK model selector.)

3. **Replace the binary check badge with a spring-eased selected transition + animated check draw.** Current selection is a static circle with an instant check. The HeroUI/Linear feel comes from a short (~150ms) scale-in on the badge and an SVG stroke-dashoffset draw of the checkmark, gated behind the already-imported `reducedMotion`. This makes selection feel responsive without a layout shift. Reuse `--cg-transition-duration-fast` and `--cg-interaction-press-scale`; no new color tokens. (Pattern: HeroUI selection micro-interaction, Linear toggle affordance.)

4. **Tighten density with an optional compact/list variant.** Vercel and Linear both ship a condensed single-column list mode (icon + name + provider on one row, description hidden) for in-context pickers inside menus/sheets, reserving the rich card grid for full-screen selection. Adding a `density="compact"` attribute that collapses each card to a 40-44px row would fix the touch-target concern on chips and serve embedded use without forking the component. (Pattern: Vercel dashboard model dropdown, Linear list density.)

5. **Surface model status / availability as a first-class state.** Real model pickers (Vercel AI Playground, OpenAI) show per-model affordances the current API lacks: a "new"/"beta" pill, a disabled+tooltip state for models the user's plan can't access, and a subtle latency/context-window hint. The States Audit marks Disabled as `N/A`; in 2025 a model selector that can't represent an unavailable model is incomplete. Add `disabled` and `badge`/`status` fields to `AIModel` and render a dimmed, `aria-disabled` card. (Pattern: Vercel AI Playground model list, OpenAI model menu.)

6. **Show selection feedback inline for the compare flow.** `ai-model-compare` only fires when exactly 2 are selected, but nothing in the UI signals "select one more to compare" or a count. Linear/HeroUI multi-select surfaces a persistent footer/affordance with the running count and the primary action. A small sticky action bar (`N selected · Compare`) makes the 2-item rule discoverable rather than implicit. (Pattern: Linear multi-select action bar, HeroUI selection summary.)

Sources:
- [shadcn/ui](https://ui.shadcn.com/) and [Components](https://ui.shadcn.com/docs/components)
- [The Anatomy of shadcn/ui Components — Vercel Academy](https://vercel.com/academy/shadcn-ui/extending-shadcn-ui-with-custom-components)
- [Design systems — v0 Docs](https://v0.app/docs/design-systems)
- [UI Component Libraries: 5 Must-Try Picks for Next.js in 2025](https://varbintech.com/blog/ui-component-libraries-5-must-try-picks-for-next-js-in-2025)
