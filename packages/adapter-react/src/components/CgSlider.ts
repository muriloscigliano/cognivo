import { createWrapper } from '../create-wrapper.js';

export interface CgSliderProps {
  /** Slider label text. */
  label?: string;
  /** Form field name. */
  name?: string;
  /** Current slider value. */
  value?: number;
  /** Minimum value. */
  min?: number;
  /** Maximum value. */
  max?: number;
  /** Step increment. */
  step?: number;
  /** Unit label displayed next to the value (e.g. '%', 'px'). */
  unit?: string;
  /** Whether to display the current value. */
  showValue?: boolean;
  /** Whether to display the min/max range labels. */
  showRange?: boolean;
  /** Whether the slider is disabled. */
  disabled?: boolean;
  /** Fired when the slider value changes. */
  onChange?: (e: CustomEvent<{ value: number }>) => void;
  className?: string;
}

export const CgSlider = createWrapper<CgSliderProps>(
  'cg-slider',
  ['label', 'name', 'value', 'min', 'max', 'step', 'unit', 'showValue', 'showRange', 'disabled'],
  { onChange: 'cg-change' }
);
