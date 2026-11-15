import { createWrapper } from '../create-wrapper.js';

export interface CgTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface CgTableProps {
  /** Column definitions. */
  columns?: CgTableColumn[];
  /** Row data. */
  rows?: Record<string, unknown>[];
  /** Whether to show alternating row colors. */
  striped?: boolean;
  /** Whether to use compact row height. */
  compact?: boolean;
  /** Text shown when there are no rows. */
  emptyText?: string;
  /** Fired when a column header sort is triggered. */
  onSort?: (e: CustomEvent<{ key: string; direction: 'asc' | 'desc' }>) => void;
  className?: string;
  /** Fired as `cg-select`. */
  onSelect?: (e: CustomEvent) => void;
  /** Fired as `cg-row-click`. */
  onRowClick?: (e: CustomEvent) => void;
}

export const CgTable = createWrapper<CgTableProps, 'cg-table'>(
  'cg-table',
  ['columns', 'rows', 'striped', 'compact', 'emptyText'],
  {
    onSort: 'cg-sort',
    onSelect: 'cg-select',
    onRowClick: 'cg-row-click',
  }
);
