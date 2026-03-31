import { createVueWrapper } from '../create-wrapper.js';

export interface CgTooltipProps {
  content?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  disabled?: boolean;
}

export const CgTooltip = createVueWrapper('cg-tooltip', {
  content: { type: [String, Array, Object, Number, Boolean] },
  position: { type: [String, Array, Object, Number, Boolean] },
  delay: { type: [String, Array, Object, Number, Boolean] },
  disabled: { type: [String, Array, Object, Number, Boolean] },
}, {});
