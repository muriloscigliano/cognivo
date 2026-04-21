import { createVueWrapper } from '../create-wrapper.js';

export interface BiasSocialProofProps {
  count?: number;
  type?: 'viewing' | 'purchased' | 'rated' | 'subscribed';
  interval?: 'now' | 'today' | 'week' | 'month';
  format?: 'compact' | 'full';
  avatars?: string[];
}

export const BiasSocialProof = createVueWrapper(
  'bias-social-proof',
  {
    count: { type: Number, default: 0 },
    type: { type: String, default: 'viewing' },
    interval: { type: String, default: 'now' },
    format: { type: String, default: 'full' },
    avatars: { type: Array, default: () => [] },
  },
  {}
);
