# cg-timestamp — Spec

## Purpose
Renders a point in time as relative ("2h ago") or absolute text inside a semantic `<time>` element, auto-refreshing relative values.

## API
| Prop | Type | Default | Reflect | Notes |
|---|---|---|---|---|
| `datetime` | `string` | `''` | yes | ISO 8601 string or epoch ms. Parsed to a Date. |
| `format` | `'relative' \| 'datetime' \| 'date' \| 'time'` | `'relative'` | yes | Display mode. |
| `live` | `boolean` | `false` | yes | Auto-refresh relative value on an interval. |

## States matrix
Applicable: **default**, **empty** (invalid/missing datetime → renders em dash). Non-interactive.

## Behavior
- Relative buckets: `just now` (<60s), `Nm ago`, `Nh ago`, `Nd ago`, then falls back to a short absolute date.
- Future times: `in Nm`, `in Nh`, etc.
- `live`: refreshes every 60s while connected; cleared on disconnect.
- The `<time datetime>` attribute always carries the ISO value for machine readability; the tooltip (`title`) carries the full absolute time.

## Tokens
Inherits typography from context; no owned tokens. Muted color via `--cg-color-surface-base-icon` is optional (default inherits).

## A11y
- Semantic `<time datetime="…">`.
- Relative text is human-readable; `title` gives the precise time.

## Out of scope
- i18n / locale formatting beyond `Intl.DateTimeFormat` defaults.
- Countdown timers.
