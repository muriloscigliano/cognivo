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
}

export const CgTable = createWrapper<CgTableProps>(
  'cg-table',
  ['columns', 'rows', 'striped', 'compact', 'emptyText'],
  { onSort: 'cg-sort' }
);
