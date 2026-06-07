import { createVueWrapper } from '../create-wrapper.js';

export interface CgPhoneInputProps {
  value?: string;
  country?: string;
  defaultCountry?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  helper?: string;
  size?: 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg';
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean;
  success?: boolean;
  required?: boolean;
  loading?: boolean;
  nationalMode?: boolean;
  preferredCountries?: string[];
  onlyCountries?: string[];
  excludeCountries?: string[];
  open?: boolean;
}

export const CgPhoneInput = createVueWrapper(
  'cg-phone-input',
  {
    value: { type: String, default: '' },
    country: { type: String, default: 'US' },
    defaultCountry: { type: String, default: 'US' },
    name: { type: String, default: '' },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    helper: { type: String, default: '' },
    size: { type: String, default: 'md' },
    rounded: { type: String, default: 'lg' },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    success: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    nationalMode: { type: Boolean, default: false },
    preferredCountries: { type: Array, default: () => [] },
    onlyCountries: { type: Array, default: () => [] },
    excludeCountries: { type: Array, default: () => [] },
    open: { type: Boolean, default: false },
  },
  {
    'change': 'cg-phone-input-change',
    'country-change': 'cg-phone-input-country-change',
  }
);
