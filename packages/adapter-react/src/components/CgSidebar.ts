import { createWrapper } from '../create-wrapper.js';

export interface CgSidebarProps {
  /** Whether the sidebar is collapsed to icon-only mode. */
  collapsed?: boolean;
  /** Whether the sidebar shows a collapse toggle button. */
  collapsible?: boolean;
  /** Which side the sidebar attaches to. */
  side?: 'left' | 'right';
  /** Whether the sidebar is sticky-positioned. */
  sticky?: boolean;
  /** Custom width CSS value. */
  width?: string;
  /** Toggle handler. */
  onCgSidebarToggle?: (e: CustomEvent<{ collapsed: boolean }>) => void;
  className?: string;
}

export const CgSidebar = createWrapper<CgSidebarProps>(
  'cg-sidebar',
  ['collapsed', 'collapsible', 'side', 'sticky', 'width'],
  { onCgSidebarToggle: 'cg-sidebar-toggle' }
);
