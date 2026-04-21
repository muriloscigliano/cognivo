import { createWrapper } from '../create-wrapper.js';

export interface BiasSocialProofProps {
  /** Number of people. */
  count?: number;
  /** Activity type. */
  type?: 'viewing' | 'purchased' | 'rated' | 'subscribed';
  /** Time window for the activity. */
  interval?: 'now' | 'today' | 'week' | 'month';
  /** Label density. */
  format?: 'compact' | 'full';
  /** Avatar image URLs (max 3 shown, stacked). */
  avatars?: string[];
  className?: string;
}

export const BiasSocialProof = createWrapper<BiasSocialProofProps>(
  'bias-social-proof',
  ['count', 'type', 'interval', 'format', 'avatars'],
  {}
);
