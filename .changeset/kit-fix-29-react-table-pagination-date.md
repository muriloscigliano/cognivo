---
"@cognivo/adapter-react": minor
---

Types and events for the new table, pagination and date-input features.

- `CgTable`: `caption`, `captionHidden`, `label`, `labelledby`, `sort` (`CgTableSort | null`), `manualSort`, and column options `rowHeader`, `slotted`, `render`, `accessor`, `compare` (typed from the element). New `onSortChange` (`cg-sort-change`, `CustomEvent<CgTableSort>`); `onSort`, `onCgSelect`, `onRowClick` details are typed. Rich cells are children with `slot="cell-{rowIndex}-{key}"`. `CgTableColumn` is now the element's own `TableColumn`; `CgTableSort` is exported.
- `CgPagination`: `mode` (`'pages' | 'cursor'`), `hasPrevious`, `hasNext`; `onPageChange` is `CustomEvent<CgPageChangeDetail>` (`{ page } | { direction }`), exported with `CgPaginationProps`.

  *Typing change:* `onPageChange` was an untyped `CustomEvent` (`detail: any`), so `e.detail.page` compiled. It is now the union `{ page } | { direction }`, and reading `e.detail.page` directly is a TypeScript error. Migration: narrow first, e.g. `if ('page' in e.detail) setPage(e.detail.page)` (and `'direction' in e.detail` for cursor mode). Runtime behaviour is unchanged: page mode still sends `{ page }`. This entry stays `minor` only because `@cognivo/adapter-react` already goes to **2.0.0** in this release (the renamed event props in `kit-fix-16` are `major`); released on its own, this typing change would also need a major.
- `CgInput`: `type="date"`, `min`, `max`.
- Type probe, react-dom runtime tests and a real-browser React test (a slotted link shows in its own cell and moves with its row; a header click reaches `onSortChange`) cover them.
