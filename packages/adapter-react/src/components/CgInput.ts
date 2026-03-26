import { createWrapper } from '../create-wrapper.js';

export interface CgInputProps {
  /** Current input value. */
  value?: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Form field name. */
  name?: string;
  /** Input type. */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  /** Input size. */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the input is disabled. */
  disabled?: boolean;
  /** Whether the input is read-only. */
  readonly?: boolean;
  /** Error message or boolean. */
  error?: string | boolean;
  /** Success message or boolean. */
  success?: string | boolean;
  /** Whether to show a clear button. */
  clearable?: boolean;
  /** Maximum character length. */
  maxlength?: number;
  /** Fired on input change. */
  onInput?: (e: CustomEvent<{ value: string }>) => void;
  /** Fired when the input is cleared. */
  onClear?: (e: CustomEvent) => void;
  className?: string;
}

export const CgInput = createWrapper<CgInputProps>(
  'cg-input',
  ['value', 'placeholder', 'name', 'type', 'size', 'disabled', 'readonly', 'error', 'success', 'clearable', 'maxlength'],
  { onInput: 'cg-input', onClear: 'cg-clear' }
);
