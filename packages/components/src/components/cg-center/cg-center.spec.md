# cg-center — Spec

## Purpose
A layout primitive that centers its content on both axes, with an optional intrinsic `max-width` for constraining readable content blocks.

## API
| Prop | Type | Default | Reflect | Notes |
|---|---|---|---|---|
| `inline` | `boolean` | `false` | yes | Center inline-axis only (horizontal); leave block flow. |
| `max-width` | `string` | `''` | yes | Optional max-width for the centered content wrapper. |
| `full` | `boolean` | `false` | yes | min-height: 100% (fill parent for vertical centering). |
| `gap` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'none'` | yes | Gap between stacked children (same scale as cg-stack). |

## Slots
- default — content to center.

## States matrix
N/A — pure layout.

## Tokens
Consumes tier-1 spacing via the gap scale. No tier-3 tokens.

## A11y
No role — layout-only.

## Out of scope
- Text alignment — that's a text concern, not a layout container.
