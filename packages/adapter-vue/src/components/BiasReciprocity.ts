import { createVueWrapper } from '../create-wrapper.js';

export interface BiasReciprocityProps {
  gift?: string;
  icon?: string;
  prominence?: 'subtle' | 'standard' | 'hero';
}

export const BiasReciprocity = createVueWrapper(
  'bias-reciprocity',
  {
    gift: { type: String, default: '' },
    icon: { type: String, default: '' },
    prominence: { type: String, default: 'standard' },
  },
  {}
);
