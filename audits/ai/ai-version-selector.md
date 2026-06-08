## ai-version-selector — Manual Review

### 1. Token Audit (every CSS value)

| Line | Property | Current Token | Correct? | Fix Needed |
|---|---|---|---|---|
| 37 | background | `--cg-color-surface-base-background` | Yes | — |
| 38 | color | `--cg-color-surface-base-text` | Yes | — |
| 39 | border-width | `--cg-border-width-50` | Yes | — |
| 39 | border-color | `--cg-color-surface-cards-border` | Yes | — |
| 40 | border-radius | `--cg-border-radius-150` | Yes | — |
| 41 | padding | `--cg-spacing-16` | Yes | — |
| 42 | animation duration | `--cg-transition-duration-fast` | Yes | — |
| 42 | animation easing | `--cg-transition-easing-default` | Yes | — |
| 47 | font-size | `--cg-font-size-sm` | Yes (14px min OK) | — |
| 48 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 49 | margin | `0 0 var(--cg-spacing-12) 0` | Yes | — |
| 55 | gap | `--cg-spacing-8` | Yes | — |
| 61 | gap | `--cg-spacing-8` | Yes | — |
| 62 | padding | `--cg-spacing-12` | Yes | — |
| 63 | background | `--cg-color-surface-overlay` | **NO — broken/nonexistent token** | Replace with `--cg-color-surface-cards-background` |
| 64 | border-radius | `--cg-border-radius-100` | Yes | — |
| 65 | border-width | `--cg-border-width-100` | Yes | — |
| 65 | border-color | `transparent` | Yes (allowed) | — |
| 67 | transition | `border-color ... fast ... default` | Yes (explicit property) | — |
| 71 | border-color (hover) | `--cg-color-surface-cards-border` | Yes | — |
| 75 | border-color (selected) | `--cg-color-surface-base-text` | Yes | — |
| 79 | outline | `2px solid var(--cg-overlay-accent-strong)` | **Partial — bare `2px`** | Use `--cg-outline-width-default` for width |
| 80 | outline-offset | `--cg-outline-offset-default` | Yes | — |
| 86 | gap | `--cg-spacing-8` | Yes | — |
| 90-91 | width/height (radio-dot) | `--cg-spacing-16` | Yes | — |
| 92 | border-radius | `50%` | Yes (allowed) | — |
| 93 | border-width | `--cg-border-width-100` | Yes | — |
| 93 | border-color | `--cg-color-surface-cards-border` | Yes | — |
| 101 | border-color (selected dot) | `--cg-color-surface-base-text` | Yes | — |
| 105-106 | width/height (radio-inner) | `--cg-spacing-8` | Yes | — |
| 107 | border-radius | `50%` | Yes | — |
| 108 | background | `--cg-color-action-primary-background-default` | Yes | — |
| 118 | font-size | `--cg-font-size-sm` | Yes | — |
| 119 | font-weight | `--cg-font-weight-medium` | Yes | — |
| 123 | font-size | `--cg-font-size-xs` | Yes (metadata, not body) | — |
| 124 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 129 | padding | `--cg-spacing-2` / `--cg-spacing-8` | Yes | — |
| 130 | border-radius | `--cg-border-radius-full` | Yes | — |
| 131 | font-size | `--cg-font-size-xs` | Yes (badge label) | — |
| 132 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 134 | letter-spacing | `0.05em` | Yes (em, allowed) | — |
| 139-140 | status-active bg/text | `--cg-color-status-success-*` | Yes | — |
| 143-145 | status-canary bg/text | `--cg-color-status-warning-*` | Yes | — |
| 148-150 | status-deprecated bg/text | `--cg-color-status-error-*` | Yes | — |
| 156 | gap | `--cg-spacing-6` | Yes | — |
| 157 | font-size | `--cg-font-size-xs` | Yes (warning meta) | — |
| 158 | color | `--cg-color-status-error-text-default` | Yes | — |
| 159 | padding | `--cg-spacing-4` / `--cg-spacing-8` | Yes | — |
| 160 | background | `--cg-color-status-error-background-default` | Yes | — |
| 161 | border-radius | `--cg-border-radius-50` | Yes | — |
| 167 | gap | `--cg-spacing-8` | Yes | — |
| 171 | font-size | `--cg-font-size-xs` | Yes (label) | — |
| 172 | color | `--cg-color-input-text-placeholder` | Yes | — |
| 173 | min-width | `--cg-spacing-56` | Yes | — |
| 180 | height (range track) | `--cg-spacing-4` | Yes | — |
| 181 | background | `--cg-color-surface-base-background` | Yes (acceptable; `--cg-color-slider-track-background` would be more semantic) | — |
| 182 | border-radius | `--cg-spacing-2` | Spacing used as radius (works numerically) | minor — prefer `--cg-border-radius-50` |
| 188-189 | thumb width/height | `--cg-spacing-12` | Yes | — |
| 190 | border-radius | `50%` | Yes | — |
| 191 | background (thumb) | `--cg-color-action-primary-background-default` | Yes (acceptable; `--cg-color-slider-thumb-background` more semantic) | — |
| 196 | outline | `2px solid var(--cg-overlay-accent-strong)` | **Partial — bare `2px`** | Use `--cg-outline-width-default` |
| 197 | outline-offset | `--cg-spacing-4` | Yes (spacing as offset; `--cg-outline-offset-default` more semantic) | minor |
| 198 | border-radius | `--cg-spacing-2` | minor — prefer radius token | minor |
| 202 | font-size | `--cg-font-size-xs` | Yes | — |
| 203 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 204 | color | `--cg-color-surface-base-text` | Yes | — |
| 205 | min-width | `--cg-spacing-32` | Yes | — |
| 210 | background | `transparent` | Yes | — |
| 211 | border-width | `--cg-border-width-50` | Yes | — |
| 211 | border-color | `--cg-overlay-accent-strong` | Yes (valid overlay token) | — |
| 212 | color | `--cg-color-surface-base-text` | Yes | — |
| 213 | border-radius | `--cg-border-radius-50` | Yes | — |
| 214 | padding | `--cg-spacing-3` | **NO — `--cg-spacing-3` not in vocab** | Replace with `--cg-spacing-2` (nearest real token) |
| 214 | padding (x) | `--cg-spacing-8` | Yes | — |
| 215 | font-size | `--cg-font-size-xs` | Yes (button label) | — |
| 216 | font-weight | `--cg-font-weight-semibold` | Yes | — |
| 223 | outline | `2px solid var(--cg-overlay-accent-strong)` | **Partial — bare `2px`** | Use `--cg-outline-width-default` |
| 224 | outline-offset | `--cg-outline-offset-default` | Yes | — |
| 228 | background (hover) | `--cg-overlay-accent-subtle` | Yes | — |
| 231 | transform | `scale(var(--cg-interaction-press-scale))` | Yes | — |
| 235-239 | rounded variants | `--cg-border-radius-{none/50/100/150/full}` | Yes (0 allowed for none) | — |

### 2. Styling Audit

- **Border radius**: Consistent token-driven scale (50/100/150/full) plus a `rounded` host variant API. Good. Two slider elements (lines 182, 198) reuse `--cg-spacing-2` as a radius — numerically fine but semantically should be `--cg-border-radius-50` (minor).
- **Spacing**: All from the spacing scale except `--cg-spacing-3` (line 214) which does not exist in the vocab — must be fixed. `--cg-spacing-6` is valid.
- **Font-size accessibility**: Body/label text (`.title`, `.version-label`) uses `--cg-font-size-sm` (14px) — meets the 14px floor. Remaining `--cg-font-size-xs` uses are metadata/badges/labels (dates, status pills, rollout label, button), which is acceptable for non-body chrome.
- **Translucent vs solid borders**: Borders use solid semantic surface tokens or overlay-accent tokens; no raw rgba. Good.
- **Transitions explicit vs all**: Only one transition (line 67) and it enumerates `border-color` explicitly with duration + easing tokens. No `transition: all`. Good. Note: uses legacy `--cg-transition-*` family rather than the newer `--cg-motion-*` family — both exist in vocab, so not a violation.
- **Dark-theme suitability**: Surface/text/status tokens are theme-aware; dark-first compatible.

### 3. States Audit

| State | Exists? | Implementation | Issues |
|---|---|---|---|
| Default | Yes | `.version-item` base style | — |
| Hover | Yes | `.version-item:hover` border-color; `.promote-btn:hover` bg | — |
| Active/Press | Partial | `.promote-btn:active` scale only | Item card has no active/press feedback; only the promote button does |
| Focus-visible | Yes | item, range input, promote button all have `:focus-visible` | Bare `2px` outline width (token fix); otherwise complete |
| Disabled | No | — | N/A — no disabled state in API; versions array has no disabled flag |
| Loading | No | — | N/A — host has fadeSlideIn entrance animation but no loading state; not part of this component's contract |
| Error | Yes (domain) | `.status-deprecated` + `.deprecation-warning` with `role="alert"` | Represents deprecated-version warning, not a runtime error state — acceptable |
| Success | Yes (domain) | `.status-active` success-colored badge | Domain status, not a transient success state |

### 4. Interaction Audit

- **Keyboard**: Each `role="radio"` item is `tabindex="0"` and handles Enter / Space with `preventDefault()` then select (line 281). Promote button is a native `<button>` (keyboard-activatable). Range input is native (arrow keys work). Gap: no Arrow-key roving-tabindex navigation between radios — every radio is in the tab order (tabindex="0"), which is non-standard for a radiogroup (WAI-ARIA expects roving tabindex with arrow-key movement). Functional but not ideal; describe as a flag.
- **ARIA**: `role="radiogroup"` + `aria-label` on the list (line 272). Items use `role="radio"` with `aria-selected` — note: the correct state for `role="radio"` is `aria-checked`, not `aria-selected` (`aria-selected` belongs to `option`/`tab`/`gridcell`). This is an ARIA correctness flag. `aria-label` per item combines label + status. Range input and promote button have descriptive `aria-label`s. Deprecation warning has `role="alert"`.
- **CustomEvents**: `ai-version-select` (detail `{id, label}`), `ai-version-rollout-change` (detail `{id, rolloutPercent}`) — both `bubbles: true, composed: true`, escape Shadow DOM correctly. Promote dispatches rollout-change with 100 and `stopPropagation()` to avoid triggering select; range `@click` also stops propagation. Detail shapes match the documented `@fires` JSDoc. Correct.
- **Touch targets**: Radio dot is 16px and the whole item row is the click target (padding 12 + content) so the item itself is comfortably ≥44px tall. The promote button (padding 3/8 + xs font) and the range track (4px) are below 44px — enlargement is a design change, noted here, not a token fix.

### 5. Visual Design Check

Clean, modern radio-group card with status pills, inline rollout sliders, and a promote affordance — a genuinely AI-native pattern. Radius scale is coherent and configurable via `rounded`. Breathing room is adequate (12–16px padding, 8px gaps). Selected state relies on border-color + revealed radio-inner, which reads clearly. No explicit dividers between items (relies on gap + card backgrounds) which suits a dark surface. Typography hierarchy is reasonable (semibold title, medium label, xs metadata). Showcase-ready with the broken-token and ARIA fixes. Verdict: **strong**.

### 6. Fixes Needed

1. **Line 63** — broken token. Current: `background: var(--cg-color-surface-overlay);` → Fixed: `background: var(--cg-color-surface-cards-background);` Why: `--cg-color-surface-overlay` is a confirmed nonexistent/broken token (not in the resolved vocab); the item is a selectable card, so the cards surface token is the correct tier-2 semantic.

2. **Line 214** — nonexistent spacing token. Current: `padding: var(--cg-spacing-3) var(--cg-spacing-8);` → Fixed: `padding: var(--cg-spacing-2) var(--cg-spacing-8);` Why: `--cg-spacing-3` is not in the spacing scale (vocab has 1, 2, 4, 6, 8…); `--cg-spacing-2` is the nearest real token.

3. **Line 79** — bare magic px on outline width. Current: `outline: 2px solid var(--cg-overlay-accent-strong);` → Fixed: `outline: var(--cg-outline-width-default) solid var(--cg-overlay-accent-strong);` Why: raw `2px` is a magic number; `--cg-outline-width-default` is the governed token.

4. **Line 196** — bare magic px on outline width. Current: `outline: 2px solid var(--cg-overlay-accent-strong);` → Fixed: `outline: var(--cg-outline-width-default) solid var(--cg-overlay-accent-strong);` Why: same as above.

5. **Line 223** — bare magic px on outline width. Current: `outline: 2px solid var(--cg-overlay-accent-strong);` → Fixed: `outline: var(--cg-outline-width-default) solid var(--cg-overlay-accent-strong);` Why: same as above.

**Flags (not auto-fixed):**
- ARIA: `role="radio"` items use `aria-selected` (lines 277) but the correct attribute is `aria-checked`. Recommend switching to `aria-checked` (and the `[aria-selected="true"]` CSS selectors on lines 74, 100, 112 accordingly).
- Keyboard: every radio has `tabindex="0"`; WAI-ARIA radiogroup convention is roving tabindex with Arrow-key navigation. Consider implementing for full compliance.
- Touch targets: promote button and 4px range track are below 44px (design change, not a token issue).
- Minor: lines 182/198 use `--cg-spacing-2` as border-radius and line 197 uses `--cg-spacing-4` as outline-offset; prefer `--cg-border-radius-50` / `--cg-outline-offset-default`. Lines 181/191 could use the dedicated `--cg-color-slider-track-background` / `--cg-color-slider-thumb-background` tokens for stronger semantics.

### Research-backed enhancements

1. **Roving-tabindex + arrow-key navigation with animated selection slide.** The current radiogroup puts every item in the tab order, which NN/G's dropdown guidance and the WAI-ARIA radiogroup convention both flag as friction — users expect Tab to enter the group once, then Arrow keys to move within it. Implement roving tabindex (only the selected item is `tabindex="0"`, others `-1`) and, as the selection moves, slide a single shared "selection indicator" element between rows using a `transform: translateY()` transition (token `--cg-motion-duration-fast` / `--cg-motion-easing-default`) rather than toggling per-item borders. This is the Linear/shadcn "active highlight that travels" affordance — one moving element reads as a continuous control rather than discrete checkboxes lighting up. Source: [NN/G — Dropdowns Design Guidelines](https://www.nngroup.com/articles/drop-down-menus/), [UXPin — Dropdown Interaction Patterns](https://www.uxpin.com/studio/blog/dropdown-interaction-patterns-a-complete-guide/).

2. **Type-to-filter when the version list is long.** Vercel's deployment/branch switcher and shadcn's `Command` combobox both surface an inline filter input the moment the option count grows; UXPin and Setproduct both recommend search/filter inside dropdowns with many choices. For `ai-version-selector`, conditionally render a compact filter field above the radiogroup once `versions.length` exceeds a threshold (e.g. 7), matching against label + status. This keeps the dense-deployment-history use case usable without redesigning the card. Source: [Setproduct — Dropdown UI Design (searchable)](https://www.setproduct.com/blog/dropdown-ui-design), [UXPin — Dropdown Interaction Patterns](https://www.uxpin.com/studio/blog/dropdown-interaction-patterns-a-complete-guide/).

3. **Spring-scale the radio-inner dot on selection instead of an instant reveal.** Right now the inner dot (lines 105–108) simply appears when selected. The Material selection-state guidance treats selection confirmation as a moment worth a micro-interaction. Animate the inner dot from `scale(0)` → `scale(1)` with a brief overshoot easing on the `[aria-checked="true"]` transition (explicit `transform` property, `--cg-motion-easing-spring` if available, else `--cg-transition-easing-default`). Pair it with a one-shot subtle background tint pulse on the row so a keyboard selection is perceivable without a pointer. Source: [Material Design — Selection](https://m2.material.io/design/interaction/selection.html).

4. **Promote button: confirmation-on-press to prevent accidental 100% rollouts.** Promoting to 100% is destructive-ish (it overrides the rollout slider). The promote button is also currently below the 44px touch target (noted in §4). Modernize both at once: enlarge to meet the target, and adopt the press-and-confirm pattern — first click arms the button (label swaps to "Confirm promote", border shifts to `--cg-color-status-warning-*`), second click within a short window commits, mirroring the deliberate two-step "merge/deploy" affordances in Linear and Vercel. Use the existing `--cg-interaction-press-scale` on the arm step for tactile feedback. Source: [NN/G — Dropdowns Design Guidelines](https://www.nngroup.com/articles/drop-down-menus/), [Material Design — Selection](https://m2.material.io/design/interaction/selection.html).

5. **Status pill as a live, dot-leading indicator with density variants.** The status pills (active/canary/deprecated) are static text badges. The 2025 convention (Vercel deployment status, Linear status chips) leads the pill with a small colored dot — and for `canary`/in-progress rollouts, a gently pulsing dot communicates "live, changing" state. Add a leading dot element fed by the same `--cg-color-status-*` tokens, and gate the pulse animation behind `prefers-reduced-motion`. Also expose a `density="compact"` host variant (tightens `--cg-spacing-16` → `--cg-spacing-12`, hides secondary metadata) for the long-history case, matching the compact-row direction Carbon and Setproduct recommend for option-dense dropdowns. Source: [Carbon Design System — Dropdown usage](https://carbondesignsystem.com/components/dropdown/usage/), [Setproduct — Dropdown UI Design](https://www.setproduct.com/blog/dropdown-ui-design).

6. **Animated dropdown-icon affordance if a collapsed/trigger mode is added.** If `ai-version-selector` ever gains a collapsed "current version" trigger (the typical switcher shape), adopt the standard rotating chevron micro-interaction — the chevron rotates 180° on open via a `transform: rotate()` transition — which UXPin/Setproduct call out as the expected open/closed signal. Worth specifying now so the expanded radiogroup and a future trigger share one motion language. Source: [UXPin — Dropdown Interaction Patterns](https://www.uxpin.com/studio/blog/dropdown-interaction-patterns-a-complete-guide/), [Setproduct — Dropdown UI Design](https://www.setproduct.com/blog/dropdown-ui-design).
