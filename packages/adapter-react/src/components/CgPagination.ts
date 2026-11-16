import { createWrapper } from '../create-wrapper.js';

/** `cg-page-change` detail: `{ page }` in pages mode, `{ direction }` in cursor mode. */
export type CgPageChangeDetail = { page: number } | { direction: 'previous' | 'next' };

export interface CgPaginationProps {
  /** A page was requested. */
  onPageChange?: (e: CustomEvent<CgPageChangeDetail>) => void;
}

export const CgPagination = createWrapper<CgPaginationProps, 'cg-pagination'>('cg-pagination', ['total', 'current', 'siblings', 'showFirst', 'showLast'],
  {
    onPageChange: 'cg-page-change',
  }
);
