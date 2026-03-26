import { createVueWrapper } from '../create-wrapper.js';

export const CgFollowUp = createVueWrapper(
  'cg-follow-up',
  {
    items: { type: Array, default: () => [] },
    label: { type: String, default: 'Suggested' },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    hideLabel: { type: Boolean, default: false },
  },
  {
    'follow-up-click': 'cg-follow-up-click',
  }
);
