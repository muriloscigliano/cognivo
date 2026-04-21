import { createVueWrapper } from '../create-wrapper.js';

export interface BiasScarcityProps {
  type?: 'time' | 'stock' | 'popularity';
  deadline?: string;
  remaining?: number;
  threshold?: number;
  pulse?: boolean;
}

export const BiasScarcity = createVueWrapper(
  'bias-scarcity',
  {
    type: { type: String, default: 'stock' },
    deadline: { type: String, default: '' },
    remaining: { type: Number, default: 0 },
    threshold: { type: Number, default: 10 },
    pulse: { type: Boolean, default: false },
  },
  {}
);
