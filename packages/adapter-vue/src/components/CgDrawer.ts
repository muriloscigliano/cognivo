import { createVueWrapper } from '../create-wrapper.js';

export interface CgDrawerProps {
  open?: boolean;
  side?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg';
  title?: string;
  closable?: boolean;
  persistent?: boolean;
}

export const CgDrawer = createVueWrapper('cg-drawer', {
  open: { type: [String, Array, Object, Number, Boolean] },
  side: { type: [String, Array, Object, Number, Boolean] },
  size: { type: [String, Array, Object, Number, Boolean] },
  title: { type: [String, Array, Object, Number, Boolean] },
  closable: { type: [String, Array, Object, Number, Boolean] },
  persistent: { type: [String, Array, Object, Number, Boolean] },
}, {});
