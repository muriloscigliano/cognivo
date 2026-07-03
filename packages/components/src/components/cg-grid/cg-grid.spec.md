# cg-grid — Spec

## Purpose
A CSS-grid layout primitive: declarative column count, gap, and alignment via attributes, matching the `cg-stack` token vocabulary.

## API
| Prop | Type | Default | Reflect | Notes |
|---|---|---|---|---|
| `columns` | `number` | `1` | yes | Number of equal columns (`repeat(N, minmax(0, 1fr))`). |
| `min-column` | `string` | `''` | yes | If set, uses `auto-fill, minmax(<min>, 1fr)` for responsive wrapping (overrides `columns`). |
| `gap` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | yes | Same gap scale as cg-stack. |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | yes | align-items. |
| `justify` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | yes | justify-items. |
| `full` | `boolean` | `false` | yes | width: 100%. |

## Slots
- default — grid children.

## States matrix
N/A — pure layout, no interactive states.

## Tokens
Consumes tier-1 spacing (`--cg-spacing-*`) via the gap scale. Owns no tier-3 tokens.

## A11y
No role — layout-only. Semantics come from children.

## Out of scope
- Grid-span on children (children set `grid-column` themselves) — a future `cg-grid-span` if demand appears.
