import { createWrapper } from '../create-wrapper.js';
export const AiAppSidebar = createWrapper('ai-app-sidebar', ['sections', 'collapsed', 'activeId'],
  {
    onCollapse: 'ai-app-sidebar-collapse',
    onItemClick: 'ai-app-sidebar-item-click',
  }
);
