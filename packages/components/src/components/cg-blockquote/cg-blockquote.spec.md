# cg-blockquote — Spec

## Purpose
A styled quotation primitive rendering a semantic `<blockquote>` with an accent border and optional citation.

## API
| Prop | Type | Default | Reflect | Notes |
|---|---|---|---|---|
| `cite` | `string` | `''` | no | Source URL (maps to `<blockquote cite>`). |
| `variant` | `'default' \| 'accent' \| 'muted'` | `'default'` | yes | Border/background emphasis. |

## Slots
- default — quote content.
- `footer` — attribution / source (rendered in `<footer>`).

## States matrix
N/A — static content.

## Tokens
- accent border → `--cg-color-action-primary-border-default`
- muted bg → `--cg-color-surface-inset-background`
- text → inherits.

## A11y
Semantic `<blockquote>` + `<footer>` for attribution.

## Out of scope
- Pull-quote typographic treatment (large decorative quotes) — separate concern.
