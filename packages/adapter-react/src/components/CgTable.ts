import type { TableColumn, TableSort } from '@cognivo/components/cg-table';
import { createWrapper } from '../create-wrapper.js';

/** Column definition (the element's own type): `rowHeader`, `slotted`, `render`, `accessor`, `compare`, … */
export type CgTableColumn = TableColumn;
/** A column sort: `{ key, direction: 'asc' | 'desc' }`. */
export type CgTableSort = TableSort;

export interface CgTableProps {
  /** Column definitions. */
  columns?: CgTableColumn[];
  /** Row data: arrays of cells, in column order. */
  rows?: unknown[][];
  /** Whether to show alternating row colors. */
  striped?: boolean;
  /** Whether to use compact row height. */
  compact?: boolean;
  /** Text shown when there are no rows. */
  emptyText?: string;
  /** Uncontrolled only: the table sorted. */
  onSort?: (e: CustomEvent<CgTableSort>) => void;
  /** A sortable header was activated; `detail` is the requested sort. With
   *  `sort` set (controlled), update `sort` (and the rows) from it. */
  onSortChange?: (e: CustomEvent<CgTableSort>) => void;
  className?: string;
  /** Fired as `cg-select`. */
  onCgSelect?: (e: CustomEvent<{ indices: number[] }>) => void;
  /** Fired as `cg-row-click`. */
  onRowClick?: (e: CustomEvent<{ index: number; row: unknown[] }>) => void;
}

export const CgTable = /* @__PURE__ */ createWrapper<CgTableProps, 'cg-table'>(
  'cg-table',
  ['columns', 'rows', 'striped', 'compact', 'emptyText'],
  {
    onSort: 'cg-sort',
    onCgSelect: 'cg-select',
    onRowClick: 'cg-row-click',
    onSortChange: 'cg-sort-change',
  }
);
