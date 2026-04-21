import { createWrapper } from '../create-wrapper.js';

export interface BiasCommitmentProps {
  /** Current step (1-indexed). Children with `data-step <= step` are revealed. */
  step?: number;
  /** Total steps in the flow. */
  total?: number;
  /** Show the built-in progress bar. */
  showProgress?: boolean;
  /** Fired when advance() moves to a later step. */
  onBiasCommitmentAdvance?: (
    e: CustomEvent<{ from: number; to: number; total: number }>
  ) => void;
  className?: string;
}

export const BiasCommitment = createWrapper<BiasCommitmentProps>(
  'bias-commitment',
  ['step', 'total', 'showProgress'],
  {
    onBiasCommitmentAdvance: 'bias-commitment-advance',
  }
);
