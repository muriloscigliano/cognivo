# ai-version-selector — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Good coverage — spacing, colors, border-radius, font sizes all tokenized.
- **Magic numbers**: `border: 2px solid transparent` on `.version-item` — acceptable pattern. `transition: border-color 0.15s ease` uses raw value instead of token.
- **Status badges**: Three status types (active/canary/deprecated) with semantic color tokens.
- **Promote button**: Accent outline button with hover background overlay.

### States Audit

| State | Supported | Notes |
|---|---|---|
| Default | Yes | Radio-group list of versions |
| Selected | Yes | Accent border, filled radio dot |
| Hover | Yes | Border color change on hover |
| Focus-visible | Yes | 2px accent outline with offset |
| Deprecated | Yes | Warning banner with alert icon |
| Disabled | **No** | No disabled state for versions |
| Loading | **No** | No loading state |
| Error | **No** | No error handling for rollout changes |

### Interaction Audit
- **Click**: Selects version, fires `ai-version-select`.
- **Keyboard**: Enter/Space on version item triggers select. Slider click stops propagation.
- **Rollout slider**: `@input` fires `ai-version-rollout-change`.
- **Promote button**: Sets rollout to 100%, stops click propagation.
- **ARIA**: `role="radiogroup"`, `role="radio"`, `aria-selected`, `aria-label` on items.

## Style Fixes Needed

1. **Transition token** — `.version-item` uses raw `0.15s` instead of `var(--cg-motion-duration-fast, 150ms)`.
2. **Missing `:host([hidden])` rule** — Already present, good.
3. **Promote button hover** — No `:active` press feedback.
4. **Rollout slider Firefox** — No Firefox-specific slider thumb styles (`::-moz-range-thumb`).
5. **Deprecation warning icon** — Uses HTML entity `&#x26A0;` — should use inline SVG for consistency.
6. **Rounded variants** — Missing `:host([rounded])` support.
7. **`selected` property not updating** — The component does not internally manage `selected` state — it relies on the parent to update.

## Interaction Fixes Needed

1. **Arrow key navigation** — Radio groups should support Up/Down arrow key navigation between versions per ARIA pattern.
2. **Rollout slider aria** — Missing `aria-valuemin`, `aria-valuemax`, `aria-valuenow` on the range input (browser provides defaults, but explicit is better).
3. **Confirm before promote** — Promoting to 100% is a significant action; consider a confirmation step.
4. **Disabled versions** — Add `disabled` flag to `VersionEntry` for versions that cannot be selected.
5. **Rollout change debounce** — Slider fires on every `@input` — consider debouncing or only firing on `@change`.
6. **Deprecated version select warning** — Selecting a deprecated version should show an additional confirmation.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders version items from `.versions` array | Unit |
| 2 | Selected version shows filled radio dot and accent border | Unit |
| 3 | Click fires `ai-version-select` with correct id/label | Unit |
| 4 | Status badge shows correct class per status | Unit |
| 5 | Deprecation warning shown only for deprecated versions | Unit |
| 6 | Rollout slider shown for non-deprecated versions with rolloutPercent | Unit |
| 7 | Rollout slider fires `ai-version-rollout-change` | Unit |
| 8 | Promote button fires rollout change with 100% | Unit |
| 9 | Promote button hidden when rollout is already 100% | Unit |
| 10 | Enter/Space on version item selects it | Interaction |
| 11 | Slider click does not trigger version select (stopPropagation) | Interaction |
| 12 | Focus-visible ring on version items | A11y |
| 13 | Focus-visible ring on promote button | A11y |
| 14 | `role="radiogroup"` and `role="radio"` present | A11y |
| 15 | `aria-selected` toggles correctly | A11y |
