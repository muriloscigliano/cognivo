import { createWrapper } from '../create-wrapper.js';
export const AiSidebar = /* @__PURE__ */ createWrapper('ai-sidebar', ['sections', 'collapsed', 'activeId'],
  {
    onItemClick: 'ai-sidebar-item-click',
    onCollapse: 'ai-sidebar-collapse',
  }
);
