---
"@cognivo/adapter-react": minor
---

Types and events for the new table, pagination and date-input features.

- `CgTable`: `caption`, `captionHidden`, `label`, `labelledby`, `sort` (`CgTableSort | null`), `manualSort`, and column options `rowHeader`, `slotted`, `render`, `accessor`, `compare` (typed from the element). New `onSortChange` (`cg-sort-change`, `CustomEvent<CgTableSort>`); `onSort`, `onCgSelect`, `onRowClick` details are typed. Rich cells are children with `slot="cell-{rowIndex}-{key}"`. `CgTableColumn` is now the element's own `TableColumn`; `CgTableSort` is exported.
- `CgPagination`: `mode` (`'pages' | 'cursor'`), `hasPrevious`, `hasNext`; `onPageChange` is `CustomEvent<CgPageChangeDetail>` (`{ page } | { direction }`), exported with `CgPaginationProps`.
- `CgInput`: `type="date"`, `min`, `max`.
- Type probe and react-dom runtime tests cover them.
