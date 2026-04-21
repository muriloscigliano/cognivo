import { createVueWrapper } from '../create-wrapper.js';

export interface BiasCommitmentProps {
  step?: number;
  total?: number;
  showProgress?: boolean;
}

export const BiasCommitment = createVueWrapper(
  'bias-commitment',
  {
    step: { type: Number, default: 1 },
    total: { type: Number, default: 1 },
    showProgress: { type: Boolean, default: false },
  },
  {
    'bias-commitment-advance': 'bias-commitment-advance',
  }
);
