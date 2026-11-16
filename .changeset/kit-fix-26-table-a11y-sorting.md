---
"@cognivo/components": minor
---

`cg-table`: accessible name, row headers, real sort buttons, custom and controlled sorting, rich cells.

- **Name:** `caption` (visible; `caption-hidden` hides it visually), `label`, or `labelledby` (ids of page elements, resolved across the shadow boundary and kept in sync with their text). `getByRole('table', { name })` finds it. The redundant `role="table"` is gone.
- **Headers:** column headers have `scope="col"`; a column with `rowHeader: true` renders `<th scope="row">` cells. A sortable header is now a `<button>` inside the `<th>` (it was a focusable `<th>` with no button role); the sorted header carries `aria-sort`.
- **Sorting:** per-column `accessor(cell, row)` (sort links/badges/objects by their data, not `"[object Object]"`) and `compare(a, b)`. Default order: numbers and dates by value, nodes by text, the rest locale-aware text. Sorting is stable in both directions (descending no longer reverses ties) and empty values sort last.
- **Controlled sort:** `sort` property (`{ key, direction }` or `null`) + `cg-sort-change` event (fired on every header activation with the requested sort). Add `manual-sort` for server-side / cursor data: rows render in the given order. `cg-sort` still fires, in uncontrolled mode only.
- **Rich cells:** `slotted: true` on a column gives each cell a `cell-{rowIndex}-{key}` slot (light-DOM links, badges, buttons, framework components; the row value is the fallback); `render(cell, row, rowIndex)` returns a Lit template / node / text. Tab order follows the displayed rows. In a `clickable` table, a click or Enter on a link, button or field in a row no longer also fires `cg-row-click`.

*Behaviour change:* header styles moved from `th.sortable` to `.sort-btn`; code that clicked or focused the `<th>` itself must use the button inside it.
