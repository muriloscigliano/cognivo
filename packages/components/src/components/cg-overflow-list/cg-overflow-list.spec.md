# cg-overflow-list — Spec

## Purpose
Lays out slotted items in a row and collapses any that don't fit into a trailing "more" menu, keeping the row to a single line responsively.

## API
| Prop | Type | Default | Reflect | Notes |
|---|---|---|---|---|
| `gap` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg'` | `'sm'` | yes | Gap between items (shared scale). |
| `more-label` | `string` | `'More'` | no | Accessible label for the overflow trigger. |
| `min-visible` | `number` | `0` | yes | Always keep at least N items visible (never collapse below this). |

## Slots
- default — the items to lay out.
- `more` — optional custom overflow trigger (receives no items; use the event/property to render your own). If absent, a default `⋯` button is shown.

## Events
- `cg-overflow-change` `{ hiddenCount: number, hiddenIndices: number[] }` — fired whenever the set of collapsed items changes.

## States matrix
Applicable: **default**, **empty** (no items → nothing), **all-visible** (more button hidden), **overflowing** (more button shown).

## Behavior
- Measures on connect, on `ResizeObserver`, and on `slotchange`.
- Hides overflowing trailing items (visually, via `hidden`), reserving space for the more button.
- Respects `min-visible`.
- The default more button opens a menu listing the hidden items' text (cloned labels) — click emits `cg-overflow-select` `{ index }`.

## Tokens
- gap → tier-1 spacing.
- more button → surface-cards background/border, focus ring family.

## A11y
- Row is a neutral container (semantics from items).
- More button: `aria-haspopup="menu"`, `aria-expanded`, `aria-label` from `more-label`.
- Hidden items get `aria-hidden` + `hidden` so they leave the a11y tree.

## Out of scope
- Priority/pinning specific items (beyond leading `min-visible`).
- Vertical overflow.
