import { createWrapper } from '../create-wrapper.js';

export interface CgBadgeGroupProps {
  /** Group label text. */
  label?: string;
  /** Gap between badges. */
  gap?: string;
  /** Maximum number of visible badges before showing overflow count. */
  max?: number;
  /** Total count for overflow display. */
  total?: number;
  className?: string;
}

export const CgBadgeGroup = createWrapper<CgBadgeGroupProps>(
  'cg-badge-group',
  ['label', 'gap', 'max', 'total'],
  {}
);
