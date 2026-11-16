---
"@cognivo/components": minor
---

`cg-table`: accessible name, row headers, real sort buttons, custom and controlled sorting, rich cells.

- **Name:** `caption` (visible; `caption-hidden` hides it visually), `label`, or `labelledby` (ids of page elements, resolved across the shadow boundary and kept in sync: their text, a target mounted after the table or replaced by a new node with the same id). As in ARIA, `labelledby` wins over `label`, and hidden descendants of the referenced element (`hidden`, `aria-hidden`, `display: none`, `visibility: hidden`) are left out of the name. `getByRole('table', { name })` finds it. The redundant `role="table"` is gone.
- **Headers:** column headers have `scope="col"`; a column with `rowHeader: true` renders `<th scope="row">` cells. A sortable header is now a `<button>` inside the `<th>` (it was a focusable `<th>` with no button role); the sorted header carries `aria-sort`.
- **Sorting:** per-column `accessor(cell, row)` (sort links/badges/objects by their data, not `"[object Object]"`) and `compare(a, b)`. Default order: numbers, numeric strings (`'9'` before `'10'`) and dates by value, ahead of text; nodes by their text; text compared in the page language (`<html lang>`) with digit runs as numbers (`'item 9'` before `'item 10'`). Mixed columns have a total order (numbers first, then text), so the result does not depend on the input order. Sorting is stable in both directions (descending no longer reverses ties) and empty values sort last.
- **Controlled sort:** `sort` property or JSON attribute (`{ key, direction }` or `null`; removing the attribute, or setting the property to `undefined`, hands sorting back to the table) + `cg-sort-change` event (fired on every header activation with the requested sort). Add `manual-sort` for server-side / cursor data: rows render in the given order. `cg-sort` still fires, in uncontrolled mode only.
- **Rich cells:** `slotted: true` on a column gives each cell a `cell-{rowIndex}-{key}` slot (light-DOM links, badges, buttons, framework components; the row value is the fallback); `render(cell, row, rowIndex)` returns a Lit template / node / text. Tab order follows the displayed rows. In a `clickable` table, a click or Enter on a link, button or field in a row no longer also fires `cg-row-click`.

*Behaviour change:* header styles moved from `th.sortable` to `.sort-btn`; code that clicked or focused the `<th>` itself must use the button inside it.
