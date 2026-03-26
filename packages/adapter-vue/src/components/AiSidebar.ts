import { createVueWrapper } from '../create-wrapper.js';
export const AiSidebar = createVueWrapper('ai-sidebar', {
  sections: { type: [String, Array, Object, Number, Boolean] },
  collapsed: { type: [String, Array, Object, Number, Boolean] },
  activeId: { type: [String, Array, Object, Number, Boolean] },
}, {});
