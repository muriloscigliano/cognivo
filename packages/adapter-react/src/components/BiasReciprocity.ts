import { createWrapper } from '../create-wrapper.js';

export interface BiasReciprocityProps {
  /** The gift / value framed as an inbound favor. */
  gift?: string;
  /** Optional custom icon. */
  icon?: string;
  /** Visual prominence level. */
  prominence?: 'subtle' | 'standard' | 'hero';
  className?: string;
}

export const BiasReciprocity = createWrapper<BiasReciprocityProps>(
  'bias-reciprocity',
  ['gift', 'icon', 'prominence'],
  {}
);
