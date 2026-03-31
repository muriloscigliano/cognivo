import { createVueWrapper } from '../create-wrapper.js';

export interface CgModalProps {
  open?: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
  closable?: boolean;
  persistent?: boolean;
}

export const CgModal = createVueWrapper('cg-modal', {
  open: { type: [String, Array, Object, Number, Boolean] },
  title: { type: [String, Array, Object, Number, Boolean] },
  size: { type: [String, Array, Object, Number, Boolean] },
  closable: { type: [String, Array, Object, Number, Boolean] },
  persistent: { type: [String, Array, Object, Number, Boolean] },
}, {});
