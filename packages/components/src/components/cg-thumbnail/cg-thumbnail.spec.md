# cg-thumbnail — Spec

## Purpose
A small, fixed-size preview image (gallery tile, attachment chip, avatar-adjacent) with optional selectable/clickable affordances — distinct from the general-purpose `cg-image`.

## API
| Prop | Type | Default | Reflect | Notes |
|---|---|---|---|---|
| `src` | `string` | `''` | no | Image URL. |
| `alt` | `string` | `''` | no | Alt text. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | yes | Fixed tile size. |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | yes | Corner radius. |
| `selectable` | `boolean` | `false` | yes | Renders as a toggle (checkbox-like), Enter/Space toggles. |
| `selected` | `boolean` | `false` | yes | Selected state (only meaningful with `selectable`). |
| `disabled` | `boolean` | `false` | yes | Non-interactive, dimmed. |

## Events
- `cg-thumbnail-select` `{ selected: boolean }` — fired on toggle (selectable mode only).

## States matrix
Applicable: **default, hover, focus, selected, disabled, empty** (no src → placeholder icon).
When `selectable`: hover/focus/active/selected apply. When not selectable: static image (no interactive states).

## Tokens
- selected ring → `--cg-color-action-primary-border-default`
- placeholder bg → `--cg-color-surface-inset-background`
- focus ring → focus-ring family.

## A11y
- Selectable: `role="checkbox"` + `aria-checked` + `tabindex`, keyboard toggles.
- Non-selectable: plain `<img>` with alt.

## Out of scope
- Lazy loading / skeleton / error-fallback UI → use `cg-image` for large content images.
