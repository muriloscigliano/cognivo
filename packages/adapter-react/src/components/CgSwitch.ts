import { createWrapper } from '../create-wrapper.js';

export interface CgSwitchProps {
  /** Switch label text. */
  label?: string;
  /** Optional description below the label. */
  description?: string;
  /** Form field name. */
  name?: string;
  /** Whether the switch is on. */
  checked?: boolean;
  /** Whether the switch is disabled. */
  disabled?: boolean;
  /** Fired when the switch is toggled. */
  onChange?: (e: CustomEvent<{ checked: boolean }>) => void;
  className?: string;
}

export const CgSwitch = createWrapper<CgSwitchProps>(
  'cg-switch',
  ['label', 'description', 'name', 'checked', 'disabled'],
  { onChange: 'cg-change' }
);
