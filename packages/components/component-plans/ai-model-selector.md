# ai-model-selector — Improvement Plan

## Current State

### CSS Audit
- **Tokens**: Good coverage — spacing, colors, typography, border-radius all use `--cg-*` tokens.
- **Magic numbers**: None found; fallbacks are reasonable.
- **Rounded variants**: Supported via `:host([rounded])` attribute.
- **Animation**: Uses `fadeSlideIn` shared keyframes with token-based easing.

### States Audit

| State | Supported | Notes |
|---|---|---|
| Default | Yes | Card with border, background from tokens |
| Hover | Yes | `.model-card:hover` changes border-color |
| Focus-visible | Yes | 2px outline with accent color + offset |
| Selected | Yes | Border-color + background change, check icon |
| Disabled | **No** | No disabled state for individual models |
| Loading | **No** | No skeleton/loading state |
| Empty | Yes | "No models available" message |
| Error | **No** | No error state |
| Multi-select | Yes | Toggles selection, fires compare at 2 |

### Interaction Audit
- **Click**: Selects/deselects model. Works correctly.
- **Keyboard**: Arrow keys navigate grid, Enter/Space selects. Roving tabindex via `_focusedIndex`.
- **Filter chips**: Click to filter by capability. "All" resets.
- **Compare trigger**: Auto-fires `ai-model-compare` when exactly 2 selected in multi mode.
- **ARIA**: `role="listbox"` on grid, `role="radio"/"checkbox"` on cards, `aria-selected`, `aria-multiselectable`.

## Style Fixes Needed

1. **Missing `:host([hidden])` rule** — Add `display: none` for hidden attribute.
2. **Filter chip focus-visible** — No `:focus-visible` style on `.filter-chip` buttons.
3. **Selected card active state** — No `:active` press feedback on model cards.
4. **Disabled model support** — Add `disabled` flag to `AIModel` interface and `.model-card.disabled` styles with reduced opacity and `pointer-events: none`.
5. **Cost badge font-weight** — Uses raw `700` fallback; should use `var(--cg-font-weight-bold, 700)`.

## Interaction Fixes Needed

1. **Disabled model handling** — Skip disabled models during arrow key navigation. Prevent selection of disabled models.
2. **Loading skeleton** — Add a `loading` property that renders placeholder cards with shimmer animation.
3. **Announce selection to screen readers** — Add `aria-live="polite"` region to announce selection changes.
4. **Filter chip keyboard** — Filter chips inside a `role="group"` lack arrow key navigation between chips.
5. **Multi-select cap** — No maximum selection limit. Consider adding `maxSelect` property.
6. **Focus trap after filter** — When filter changes reduce visible cards, `_focusedIndex` may point to a non-existent card.

## Test Spec

| # | Test Case | Type |
|---|---|---|
| 1 | Renders model cards from `.models` array | Unit |
| 2 | Single-select: clicking a card selects it and deselects previous | Unit |
| 3 | Multi-select: clicking toggles selection independently | Unit |
| 4 | Fires `ai-model-select` with correct detail on click | Unit |
| 5 | Fires `ai-model-compare` when exactly 2 selected in multi mode | Unit |
| 6 | Filter chips filter models by capability | Unit |
| 7 | "All" chip resets filter | Unit |
| 8 | Arrow keys navigate between cards | Interaction |
| 9 | Enter/Space selects focused card | Interaction |
| 10 | Empty state renders when `models` is empty | Unit |
| 11 | `selected` property pre-selects a model on render | Unit |
| 12 | Check icon appears on selected cards | Visual |
| 13 | Cost tier badge shows correct label and color class | Unit |
| 14 | Capabilities limited to 3 visible per card | Unit |
| 15 | Focus-visible outline appears on keyboard navigation | A11y |
| 16 | `aria-selected` toggles correctly | A11y |
| 17 | `rounded` attribute changes card border-radius | Visual |
| 18 | Disabled models cannot be selected (once implemented) | Unit |
| 19 | Loading state shows skeleton cards (once implemented) | Unit |
| 20 | Screen reader announces selection changes (once implemented) | A11y |
