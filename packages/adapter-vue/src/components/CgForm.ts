import { createVueWrapper } from '../create-wrapper.js';

export const CgForm = createVueWrapper(
  'cg-form',
  {
    name: { type: String, default: '' },
    gap: { type: String, default: 'md' },
    loading: { type: Boolean, default: false },
    errors: { type: Array, default: () => [] },
  },
  {
    'submit': 'cg-submit',
    'reset': 'cg-reset',
  }
);
