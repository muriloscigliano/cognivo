import { createVueWrapper } from '../create-wrapper.js';

export const CgTabs = createVueWrapper(
  'cg-tabs',
  {
    tabs: { type: Array, default: () => [] },
    value: { type: String, default: '' },
    variant: { type: String, default: 'underline' },
  },
  {
    'tab-change': 'cg-tab-change',
  }
);
