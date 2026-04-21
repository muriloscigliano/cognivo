import { createVueWrapper } from '../create-wrapper.js';

export interface BiasAnchoringProps {
  anchor?: string;
  current?: string;
  label?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'subtle' | 'emphasized';
}

export const BiasAnchoring = createVueWrapper(
  'bias-anchoring',
  {
    anchor: { type: String, default: '' },
    current: { type: String, default: '' },
    label: { type: String, default: '' },
    orientation: { type: String, default: 'horizontal' },
    variant: { type: String, default: 'default' },
  },
  {}
);
