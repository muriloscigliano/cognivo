import { createWrapper } from '../create-wrapper.js';
export const CgCollapsible = createWrapper('cg-collapsible', ['open', 'disabled'],
  {
    onToggle: 'cg-collapsible-toggle',
  }
);
