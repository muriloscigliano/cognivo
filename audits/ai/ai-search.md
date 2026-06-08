## ai-search — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 43 | position | relative | Yes | none (layout keyword) |
| 46 | position | relative | Yes | none |
| 51 | background | `--cg-color-input-background-default` | Yes | none (tier-2) |
| 52 | border | `--cg-border-width-50` solid `--cg-color-input-border-default` | Yes | none |
| 53 | border-radius | `--cg-component-input-radius` | Yes | none (tier-3) |
| 54 | padding | `0 var(--cg-spacing-12)` | Yes | none |
| 55 | height | `--cg-component-input-height-md` | Yes | none (tier-3) |
| 56-58 | transition | enumerated border-color/box-shadow w/ `--cg-transition-duration-fast` + `--cg-transition-easing-default` | Yes | none (explicit, not `all`) |
| 60 | border-color | `--cg-color-input-border-hover` | Yes | none |
| 61 | border-color / box-shadow | `--cg-color-input-border-focus`; `0 0 0 var(--cg-border-width-300) var(--cg-overlay-accent-strong)` | Yes | none (offsets 0, spread + color are tokens) |
| 64 | border-radius | `--cg-border-radius-full` | Yes | none |
| 67 | height / padding | `--cg-component-input-height-lg`; `0 var(--cg-spacing-16)` | Yes | none |
| 68 | font-size | `--cg-font-size-base` | Yes | none |
| 71 | color | `--cg-color-input-icon-default` | Yes | none |
| 73 | margin-right | `--cg-spacing-8` | Yes | none |
| 76 | width / height | `--cg-icon-size-100` | Yes | none |
| 80 | padding | `var(--cg-spacing-8) 0` | Yes | none |
| 83 | color | `--cg-color-input-text-default` | Yes | none |
| 85 | font-size | `--cg-font-size-sm` | Yes | none (14px min OK) |
| 88 | color (placeholder) | `--cg-color-input-text-placeholder` | Yes | none |
| 91 | font-size | `--cg-font-size-xs` | Yes | none (kbd shortcut, decorative) |
| 92 | padding | `var(--cg-spacing-2) var(--cg-spacing-6)` | Yes | none |
| 93 | border-radius | `--cg-border-radius-50` | Yes | none |
| 94 | background | `--cg-color-surface-cards-background` | Yes | none |
| 95 | color | `--cg-color-input-text-placeholder` | Yes | none |
| 96 | font-weight | `--cg-font-weight-semibold` | Yes | none |
| 103 | color | `--cg-color-input-text-placeholder` | Yes | none |
| 105 | padding | `--cg-spacing-4` | Yes | none |
| 106 | font-size | `--cg-font-size-sm` | Yes | none |
| 109 | transition | color w/ `--cg-transition-duration-default` + easing | Yes | none (explicit) |
| 113 | box-shadow | `0 0 0 var(--cg-border-width-300) var(--cg-overlay-accent-strong)` | Yes | none |
| 115 | color | `--cg-color-surface-base-text` | Yes | none |
| 120 | top | `calc(100% + var(--cg-spacing-6))` | Yes | none |
| 123 | background | `--cg-color-modal-container-background` | Yes | none |
| 124 | border | `--cg-border-width-50` solid `--cg-color-modal-container-border` | Yes | none |
| 125 | border-radius | `--cg-border-radius-100` | Yes | none |
| 126 | z-index | `--cg-z-index-200` | Yes | none |
| 127 | max-height | `--cg-spacing-256` | Yes | none (spacing token used as size — valid token) |
| 132 | padding | `var(--cg-spacing-8) var(--cg-spacing-12) var(--cg-spacing-4)` | Yes | none |
| 133 | font-size | `--cg-font-size-xs` | Yes | none (section label / overline) |
| 134 | font-weight | `--cg-font-weight-bold` | Yes | none |
| 135 | color | `--cg-color-input-text-placeholder` | Yes | none |
| 137 | letter-spacing | `--cg-letter-spacing-wide` | Yes | none (explicitly valid) |
| 143 | gap | `--cg-spacing-6` | Yes | none |
| 144 | padding | `var(--cg-spacing-8) var(--cg-spacing-12)` | Yes | none |
| 148 | padding | `var(--cg-spacing-4) var(--cg-spacing-8)` | Yes | none |
| 149 | border-radius | `--cg-border-radius-50` | Yes | none |
| 150 | border | `--cg-border-width-50` solid `--cg-color-surface-cards-border` | Yes | none |
| 152 | color | `--cg-color-input-text-placeholder` | Yes | none |
| 154 | font-size | `--cg-font-size-xs` | Yes | none (chip/tag label) |
| 155 | font-weight | `--cg-font-weight-semibold` | Yes | none |
| 157-160 | transition | enumerated border-color/color/background-color | Yes | none (explicit) |
| 162 | border-color / color | `--cg-color-input-border-hover` / `--cg-color-surface-base-text` | Yes | none |
| 163 | box-shadow | `--cg-border-width-300` + `--cg-overlay-accent-strong` | Yes | none |
| 164 | border-color/color/background | `--cg-color-surface-base-text` x2; `--cg-overlay-accent-subtle` | Yes | none |
| 170 | gap | `--cg-spacing-8` | Yes | none |
| 171 | padding | `var(--cg-spacing-8) var(--cg-spacing-12)` | Yes | none |
| 173 | transition | background-color explicit | Yes | none |
| 175 | background | `--cg-overlay-dark-subtle` | Yes | none |
| 176 | transform | `scale(var(--cg-interaction-press-scale))` | Yes | none |
| 177 | font-size | `--cg-font-size-base` | Yes | none (result icon glyph) |
| 180 | font-size | `--cg-font-size-sm` | Yes | none (result title, 14px min OK) |
| 181 | color | `--cg-color-surface-base-text` | Yes | none |
| 182 | font-weight | `--cg-font-weight-medium` | Yes | none |
| 188 | font-size | `--cg-font-size-xs` | Yes | none (secondary description) |
| 189 | color | `--cg-color-input-text-placeholder` | Yes | none |
| 199 | gap | `--cg-spacing-8` | Yes | none |
| 200 | padding | `var(--cg-spacing-6) var(--cg-spacing-12)` | Yes | none |
| 202 | transition | background-color explicit | Yes | none |
| 204 | background | `--cg-overlay-dark-subtle` | Yes | none |
| 205 | color / font-size | `--cg-color-input-border-hover` / `--cg-font-size-xs` | Yes | none (recent icon) |
| 206 | font-size / color | `--cg-font-size-xs` / `--cg-color-input-text-placeholder` | Yes | none (recent text — see §2 note) |
| 210 | color | `--cg-color-input-border-hover` | Yes | none |
| 212 | font-size | `--cg-font-size-xs` | Yes | none |
| 213 | opacity | `0` | Yes | none |
| 214 | transition | opacity explicit | Yes | none |
| 220 | box-shadow | `--cg-border-width-300` + `--cg-overlay-accent-strong` | Yes | none |
| 223 | height / background / margin | `--cg-border-width-50` / `--cg-color-surface-cards-border` / `var(--cg-spacing-4) 0` | Yes | none |

No invalid, broken, or made-up tokens. No comma-fallbacks. No raw hex/rgba. No tier-1 palette colors. No `transition: all`.

### 2. Styling Audit

- **Border radius**: Consistent system — input uses tier-3 `--cg-component-input-radius`; dropdown `--cg-border-radius-100`; chips/shortcut `--cg-border-radius-50`; full-rounded variant `--cg-border-radius-full`. Coherent.
- **Spacing**: Entirely from the `--cg-spacing-*` scale (2/4/6/8/12/16). No magic numbers.
- **Font-size accessibility**: Primary body/interactive text (input, result title) uses `--cg-font-size-sm` (14px) — meets the floor. `--cg-font-size-xs` is used for section labels, kbd hint, filter chips, result descriptions, and recent-search rows. These are secondary/metadata. The most arguable case is `.recent-text` (line 206) and the `.recent-item` rows, which are clickable list options rendered at xs; bumping them to `--cg-font-size-sm` would improve readability of an interactive target. Flag, not a hard violation.
- **Translucent vs solid borders**: Borders use semantic input/modal/cards border tokens (appropriately subtle). Focus ring is a token-based translucent overlay (`--cg-overlay-accent-strong`). Active filter fill uses `--cg-overlay-accent-subtle`. Dark-mode-friendly translucency throughout.
- **Transitions**: All explicit property lists (border-color, box-shadow, color, background-color, opacity) with `--cg-transition-duration-*` + `--cg-transition-easing-default`. No `transition: all`. `reducedMotion` shared style is imported (line 30), covering motion-reduction.
- **Dark-theme suitability**: Uses overlay tokens plus semantic surface/modal/input tokens that adapt to theme; no hardcoded light/dark values. Suitable.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | input-row base, dropdown closed | none |
| Hover | Yes | input-row, filter-tag, result-item, recent-item, clear-btn all have :hover | none |
| Active/Press | Yes | `.result-item:active` press scale (line 176); `.filter-tag.active` selected style | recent items lack a press/active scale (minor, optional) |
| Focus-visible | Yes | clear-btn, filter-tag, recent-delete have :focus-visible ring; input uses :focus-within ring on row | options are mouse-selected via mousedown and not in tab order; keyboard highlight uses aria-activedescendant + `.highlighted` — correct for a combobox listbox |
| Disabled | N/A | No disabled prop on the search input | acceptable for a search field; could be added |
| Loading | N/A | No async/loading indicator | AI suggestions arrive via props; component does not model a fetching state — a loading affordance would be a feature add |
| Error | N/A | No error / no-results styling | empty results simply hide the dropdown; no explicit error state |
| Success | N/A | Not applicable to a search input | n/a |

### 4. Interaction Audit

- **Keyboard**: ArrowDown/ArrowUp move `_highlightIndex` across results + suggestions with `preventDefault`; Enter selects the highlighted item; Escape closes. Cmd+K is shown as a visual hint only (no global listener wired — decorative). Solid core keyboard nav.
- **ARIA**: input has `role="combobox"`, `aria-expanded`, `aria-haspopup="listbox"`, `aria-controls`, `aria-autocomplete="list"`, `aria-activedescendant`, and `aria-label` bound to placeholder. Listbox has `role="listbox"` + label. Options use `role="option"` + `aria-selected`. Filter group uses `role="group"` + `aria-labelledby`; filter chips use `role="switch"` + `aria-checked`. Dividers use `role="separator"`. Well-formed combobox pattern.
- **ARIA note**: `aria-activedescendant` references `ai-search-opt-${index}`, matching result/suggestion option ids. Suggestion ids are computed as `idx = i + results.length` (line 396), consistent with the highlight math (line 298). Recent items carry `role="option"` but have no id and are outside the activedescendant index range — they are mouse-only and not reachable by arrow keys. Minor.
- **CustomEvents**: `ai-search-query` (detail `{query, filters}`), `ai-search-select` (detail `{result}`), `ai-search-filter` (detail `{filters}`). All `bubbles: true, composed: true`. Details match the documented JSDoc `@fires` signatures. Filters are spread from the Set to arrays. Correct.
- **Touch targets**: input-row md height is `--cg-component-input-height-md` (~40px, under 44px); filter chips and recent rows are compact. Below the 44px guideline — this is a sizing/design change, not a token violation; flagged only.

### 5. Visual Design Check

Modern and sleek: clean combobox with leading search icon, Cmd+K hint, sectioned dropdown (Filters / Results / Suggestions / Recent) with uppercase overline labels, sparkle icon on AI suggestions, hover/press feedback, and token dividers between sections. Radius system is consistent and contemporary. Breathing room is good via the spacing scale. Dividers (`role="separator"`) cleanly delineate sections. Typography hierarchy is clear: sm titles over xs descriptions/labels. Reads as HeroUI/Vercel-tier command-palette styling. Polish notes only: the xs-sized recent/suggestion rows and sub-44px touch targets. Verdict: **strong**.

### 6. Fixes Needed

No fixes needed — component is compliant. All CSS values resolve to real, verified `--cg-*` tokens (tier-3 → tier-2 → tier-1), with no comma-fallbacks, no raw hex/rgba, no tier-1 palette colors, no `transition: all`, and no broken or made-up token names. Non-blocking design flags (not token violations): bump `.recent-text` / recent-item interactive rows from `--cg-font-size-xs` to `--cg-font-size-sm` for readability; enlarge touch targets toward 44px for `input-row` (md), filter chips, and recent rows; optionally make recent items keyboard-navigable and add loading/empty/error affordances for the AI-suggestion fetch lifecycle.

### Research-backed enhancements

Sourced from current command-palette / search patterns shipped by Linear, Vercel, shadcn `cmdk`, and HeroUI v3 (June 2026 scan). Concrete, component-specific upgrades for `ai-search`:

1. **Wire the Cmd+K hint to a real global listener (it is currently decorative).** Every reference palette — Linear, Vercel, Notion, Raycast — treats Cmd/Ctrl+K as the canonical invoke shortcut, not a label. The audit notes the kbd hint at lines 91–96 is "shown as a visual hint only (no global listener wired)". Add a `keydown` handler on `document` (gated by `os`-aware modifier detection so the chip renders ⌘K on mac, Ctrl K elsewhere) that focuses the input and opens the dropdown. A dead-looking shortcut chip actively erodes trust in a power-user surface. (Source: UX Patterns for Developers — Command Palette Pattern; Mobbin command-palette glossary.)

2. **Add a result-count + grouped-section "footer hint" bar and an explicit empty state.** shadcn's `cmdk`-based `<Command />` ships a first-class `CommandEmpty` slot and Tailwind UI's command-palette block renders a persistent footer with active-key legend. This component currently just hides the dropdown when results are empty (audit §3 Error/Empty = N/A). Render a real "No results for '{query}'" row plus a thin footer strip (reuse the existing `role="separator"` divider + `--cg-font-size-xs` / `--cg-color-input-text-placeholder` already in the sheet) showing "↑↓ navigate · ↵ select · esc close". This closes the missing empty state and teaches the keyboard model inline. (Source: shadcn/ui `Command`; Tailwind Plus command-palettes.)

3. **Promote and timestamp Recent items with a "clear all" and reorder-on-use, ahead of long-tail matches.** Mobbin's "Recent Items Priority" variant — used when repeat use and speed beat exhaustive discovery — surfaces recents first and reorders by most-recent-use. The current Recent section exists but is static, mouse-only, and xs-sized. Make recent rows keyboard-navigable (extend the `aria-activedescendant` id range past suggestions, which the audit flags as out-of-range at §4), bump to `--cg-font-size-sm`, and add a single "Clear" affordance in the section overline. (Source: Mobbin command-palette glossary — Recent Items Priority variant; Sam Solomon, "Designing Command Palettes".)

4. **Mount/exit micro-animation on the dropdown panel (scale+fade+translateY), motion-reduce aware.** HeroUI v3 and the modern cmdk clones lean on a subtle ~120–160ms entrance (opacity 0→1, translateY 4–6px, scale 0.98→1) rather than an instant pop, which reads as snappy-but-intentional. The panel is positioned at `calc(100% + var(--cg-spacing-6))` (line 120) and appears with no transition. Add a token-driven `transform`/`opacity` transition using existing `--cg-transition-duration-fast` + `--cg-transition-easing-default`, gated by the already-imported `reducedMotion` style (line 30). (Source: HeroUI v3 release notes — "animations & micro-interactions"; NudaUI.)

5. **Highlight the matched substring inside each result title.** Linear/Vercel/`cmdk` palettes bold or tint the characters that match the query so the user sees *why* a row ranked. Result titles currently render plain at `--cg-font-size-sm` / `--cg-font-weight-medium` (lines 180–182). Wrap matched ranges in a `<mark>`-equivalent span tinted with `--cg-color-surface-base-text` (full strength) against the dimmed remainder — no new token needed, reuse the existing text + placeholder colors for emphasis vs. de-emphasis. (Source: Shadcn-Linear combobox demo; UX Patterns for Developers.)

6. **Add an inline loading affordance for the AI-suggestion fetch lifecycle.** The audit (§3) flags no loading state — AI suggestions "arrive via props" with no fetching feedback. Modern palettes show a slim top-edge progress shimmer or a spinner swapped into the leading search-icon slot while async results stream. Reuse the leading-icon position (line 71, `--cg-color-input-icon-default`) and swap the magnifier for a reduced-motion-aware spinner; pair with a `aria-busy` / `aria-live="polite"` region so screen readers announce "searching…". This is the AI-native differentiator the component should make legible. (Source: HeroUI Pro command-palette; Philip Davis, "Command Palette Interfaces".)

Sources:
- [Mobbin — Command Palette glossary](https://mobbin.com/glossary/command-palette)
- [UX Patterns for Developers — Command Palette Pattern](https://uxpatterns.dev/patterns/advanced/command-palette)
- [shadcn/ui — Command](https://ui.shadcn.com/docs/components/radix/command)
- [Tailwind Plus — Command Palettes](https://tailwindcss.com/plus/ui-blocks/application-ui/navigation/command-palettes)
- [HeroUI v3 release notes](https://heroui.com/en/docs/react/releases/v3-0-0)
- [Shadcn Linear Combobox demo](https://shadcn-linear-combobox.vercel.app/)
- [Sam Solomon — Designing Command Palettes](https://solomon.io/designing-command-palettes/)
- [Philip Davis — Command Palette Interfaces](https://philipcdavis.com/writing/command-palette-interfaces)
