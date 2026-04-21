import { createWrapper } from '../create-wrapper.js';

export interface BiasAnchoringProps {
  /** Struck-through anchor / reference value. */
  anchor?: string;
  /** Prominent current value. */
  current?: string;
  /** Optional savings label (e.g. "Save 50%"). */
  label?: string;
  /** Stack direction. */
  orientation?: 'horizontal' | 'vertical';
  /** Visual variant. */
  variant?: 'default' | 'subtle' | 'emphasized';
  className?: string;
}

export const BiasAnchoring = createWrapper<BiasAnchoringProps>(
  'bias-anchoring',
  ['anchor', 'current', 'label', 'orientation', 'variant'],
  {}
);
