# cg-status-dot — Spec

## Purpose
A small colored dot indicating status/presence, with an optional pulse animation and an accessible label.

## API
| Prop | Type | Default | Reflect | Notes |
|---|---|---|---|---|
| `status` | `'online' \| 'away' \| 'busy' \| 'offline' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'neutral'` | `'neutral'` | yes | Maps to a tier-2 semantic color. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | yes | Dot diameter. |
| `pulse` | `boolean` | `false` | yes | Animated pulse ring (disabled under prefers-reduced-motion). |
| `label` | `string` | `''` | no | Accessible label. If empty, dot is `aria-hidden` (purely decorative alongside visible text). |

## States matrix
Applicable: **default**. `pulse` is a decorative modifier. No hover/focus (non-interactive).

## Tokens
- online/success → `--cg-color-status-success-text-default`
- away/warning → `--cg-color-status-warning-text-default`
- busy/error → `--cg-color-status-error-text-default`
- info → `--cg-color-status-info-text-default`
- offline/neutral → `--cg-color-surface-base-icon`

Sizes via tier-1 spacing. No tier-3 tokens (trivial primitive).

## A11y
- With `label`: `role="status"` + `aria-label`.
- Without `label`: `aria-hidden="true"` (assumes adjacent visible text conveys meaning).

## Out of scope
- Text label rendering — pair with `cg-text`. This is the dot only.
