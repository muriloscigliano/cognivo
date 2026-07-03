# cg-lightbox — Spec

## Purpose
A fullscreen image viewer overlay with prev/next navigation, keyboard control, focus trap, and scroll lock. Pairs with `cg-image-gallery`.

## API
| Prop | Type | Default | Reflect | Notes |
|---|---|---|---|---|
| `open` | `boolean` | `false` | yes | Controls visibility. |
| `images` | `{ src, alt?, caption? }[]` | `[]` | no | Image set. |
| `index` | `number` | `0` | yes | Current image index (clamped to range). |
| `closable` | `boolean` | `true` | no | Show close button + allow Escape/backdrop close. |

## Events
- `cg-lightbox-open`
- `cg-lightbox-close`
- `cg-lightbox-change` `{ index: number }` — on navigation.

## States matrix
Applicable: **default (open), empty (no images), focus** (controls). Overlay pattern.

## Behavior
- Keyboard: `Escape` closes (if closable), `ArrowLeft`/`ArrowRight` navigate, wrapping.
- Backdrop click closes (if closable).
- Body scroll locked while open; restored on close/disconnect.
- Focus trapped within the viewer; focus returned on close.
- Prev/next hidden when only one image.

## Tokens
- overlay → `--cg-color-modal-overlay-background`
- controls surface → `--cg-color-surface-cards-background` / border.
- focus ring family for buttons.
- z-index → `--cg-z-index-500`.

## A11y
- `role="dialog"` `aria-modal="true"` with `aria-label`.
- Prev/next/close buttons have `aria-label`s.
- Caption announced via the image alt + visible caption.

## Composition
- Reuses `FocusTrap` util (same as cg-modal). No new overlay machinery.

## Out of scope
- Pinch-zoom / pan gestures.
- Thumbnails strip (gallery owns that).
