import { createVueWrapper } from '../create-wrapper.js';

export const CgSlider = createVueWrapper(
  'cg-slider',
  {
    label: { type: String, default: '' },
    name: { type: String, default: '' },
    value: { type: Number, default: 50 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 1 },
    unit: { type: String, default: '' },
    showValue: { type: Boolean, default: true },
    showRange: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  {
    'change': 'cg-change',
  }
);
