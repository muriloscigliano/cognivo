# cg-app-shell — Spec

## Purpose
A top-level application scaffold that composes header, sidebar, content, and footer regions into a single governed layout with landmark roles and a responsive collapsible sidebar.

## API
| Prop | Type | Default | Reflect | Notes |
|---|---|---|---|---|
| `sidebar-position` | `'start' \| 'end'` | `'start'` | yes | Which side the sidebar sits on. |
| `sidebar-width` | `string` | `'260px'` | yes | Sidebar track width. |
| `sidebar-collapsed` | `boolean` | `false` | yes | Collapse the sidebar to zero width. |
| `header-height` | `string` | `'56px'` | yes | Header track height. |
| `sticky-header` | `boolean` | `true` | yes | Header stays fixed while content scrolls. |

## Slots
- `header` — top bar (renders as `<header>` banner landmark).
- `sidebar` — navigation rail (renders as `<aside>` complementary landmark).
- default — main content (renders as `<main>`).
- `footer` — bottom bar (renders as `<footer>` contentinfo landmark).

## Events
- `cg-app-shell-toggle` `{ collapsed: boolean }` — fired when the sidebar collapse state changes via `toggleSidebar()`.

## Methods
- `toggleSidebar()` — flips `sidebar-collapsed`.

## States matrix
Applicable: **default**, **sidebar-collapsed**. Layout-only; no hover/focus on the shell itself.

## Behavior
- CSS grid: `[header] header header / [body] sidebar main`.
- Below a mobile breakpoint (≤768px) the sidebar overlays instead of taking a column (off-canvas), driven by `sidebar-collapsed`.
- Content region scrolls independently; header optionally sticky.

## Tokens
- surfaces → `--cg-color-surface-base-background`, sidebar → `--cg-color-surface-sidebar-*`.
- border/divider → `--cg-color-surface-base-divider`.
- No new tier-3 tokens (dimensions are author-controlled via props → CSS vars).

## A11y
- Landmark roles from semantic elements (`header`/`aside`/`main`/`footer`).
- `aside` gets `aria-hidden` when fully collapsed.

## Composition
- Holds `cg-navbar` (header slot), `cg-sidebar` (sidebar slot), any content. Does not reimplement them.

## Out of scope
- Nav item rendering (that's `cg-sidebar`/`cg-navbar`).
- Multi-panel / split layouts (that's `cg-resizable`).
