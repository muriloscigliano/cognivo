import { createWrapper } from '../create-wrapper.js';

export interface CgListItem {
  label: string;
  description?: string;
  icon?: string;
  value?: string;
  actions?: Array<{ label: string; value: string }>;
}

export interface CgListProps {
  /** List item definitions. */
  items?: CgListItem[];
  /** List visual variant. */
  variant?: 'default' | 'bordered' | 'card';
  /** Whether to show dividers between items. */
  dividers?: boolean;
  /** Whether items show a hover state. */
  hoverable?: boolean;
  /** Whether items are clickable. */
  clickable?: boolean;
  /** Text shown when the list is empty. */
  emptyText?: string;
  /** Fired when a list item is clicked. */
  onListClick?: (e: CustomEvent<{ index: number; value: string }>) => void;
  /** Fired when a list item action is triggered. */
  onListAction?: (e: CustomEvent<{ index: number; action: string }>) => void;
  className?: string;
}

export const CgList = createWrapper<CgListProps>(
  'cg-list',
  ['items', 'variant', 'dividers', 'hoverable', 'clickable', 'emptyText'],
  { onListClick: 'cg-list-click', onListAction: 'cg-list-action' }
);
