import { createVueWrapper } from '../create-wrapper.js';

export const CgText = createVueWrapper(
  'cg-text',
  {
    text: { type: String, default: '' },
    size: { type: String, default: 'md' },
    weight: { type: String, default: 'normal' },
    color: { type: String, default: 'default' },
    as: { type: String, default: 'p' },
    align: { type: String, default: 'left' },
    truncate: { type: Boolean, default: false },
    inline: { type: Boolean, default: false },
    clamp: { type: Number, default: 0 },
  },
  {}
);
