# cg-toolbar — Spec

## Purpose
A grouped-action container that manages a single tab stop with **roving tabindex** across its interactive children, per the ARIA `toolbar` pattern.

## API

### Props
| Prop | Type | Default | Reflect | Notes |
|---|---|---|---|---|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | yes | Arrow-key axis + flex direction. |
| `label` | `string` | `''` | no | `aria-label` for the toolbar landmark. Required when no visible label. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | yes | Controls gap/padding via tier-3 tokens. |
| `wrap` | `boolean` | `false` | yes | Allow items to wrap to multiple lines. |

### Slots
- default — interactive children (`cg-button`, `cg-icon-button`, `cg-toggle`, `cg-separator`, etc.).

### Events
- none. (Actions dispatch their own events; the toolbar only manages focus.)

### Methods
- `focus()` — moves focus to the current roving item (or the first focusable item).

## States matrix
Applicable: **default, focus, disabled** (via child), **empty** (no items — renders empty container).
N/A: hover/active/loading/error/success (toolbar itself is not actionable).

## Roving tabindex behavior
- Exactly one child has `tabindex="0"`; all others `tabindex="-1"`.
- Focusable children = slotted elements that are not `[disabled]`, not `[aria-hidden]`, and not separators.
- Keyboard (respecting `orientation`):
  - Horizontal: `ArrowRight`/`ArrowLeft` move; Vertical: `ArrowDown`/`ArrowUp` move.
  - `Home` → first item, `End` → last item.
  - Movement wraps around (last→first, first→last).
  - Disabled items are skipped.
- On `focusin`, the focused item becomes the roving item.
- If the roving item leaves the DOM, roving resets to the first focusable item.

## Tier-3 tokens (owned)
- `--cg-component-toolbar-gap-sm|md|lg`
- `--cg-component-toolbar-padding-sm|md|lg`
- `--cg-component-toolbar-radius`

## Tier-2 tokens (consumed)
- `--cg-color-surface-cards-background`
- `--cg-color-surface-cards-border`

## A11y
- `role="toolbar"`, `aria-orientation` set from `orientation`, `aria-label` from `label`.
- Roving tabindex (single tab stop). Keyboard as above.

## Composition
- No sub-components; wraps arbitrary slotted actions.
- Pairs with `cg-separator` (rendered inert, skipped by roving).

## Out of scope
- Overflow-to-menu collapse → that's `cg-overflow-list` (Wave D).
- Managing pressed/selected state of children → children own their state.
