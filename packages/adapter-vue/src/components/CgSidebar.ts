import { createVueWrapper } from '../create-wrapper.js';

export interface CgSidebarProps {
  collapsed?: boolean;
  collapsible?: boolean;
  side?: 'left' | 'right';
  sticky?: boolean;
  width?: string;
}

export const CgSidebar = createVueWrapper(
  'cg-sidebar',
  {
    collapsed: { type: Boolean, default: false },
    collapsible: { type: Boolean, default: false },
    side: { type: String, default: 'left' },
    sticky: { type: Boolean, default: false },
    width: { type: String, default: '' },
  },
  {
    'toggle': 'cg-sidebar-toggle',
  }
);
