import { createWrapper } from '../create-wrapper.js';

export interface CgPhoneInputProps {
  /** Current phone value (E.164 or national depending on mode). */
  value?: string;
  /** Selected ISO country code (reflected). */
  country?: string;
  /** Initial country before the user picks one. */
  defaultCountry?: string;
  /** Form field name. */
  name?: string;
  /** Field label. */
  label?: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Helper text below the field. */
  helper?: string;
  /** Input size. */
  size?: 'md' | 'lg';
  /** Corner rounding. */
  rounded?: 'none' | 'sm' | 'md' | 'lg';
  /** Whether the input is disabled. */
  disabled?: boolean;
  /** Whether the input is read-only. */
  readonly?: boolean;
  /** Error state. */
  error?: boolean;
  /** Success state. */
  success?: boolean;
  /** Whether the field is required. */
  required?: boolean;
  /** Loading state. */
  loading?: boolean;
  /** Show the national number only (no dial code prefix). */
  nationalMode?: boolean;
  /** ISO codes to surface at the top of the country list. */
  preferredCountries?: string[];
  /** Restrict the list to only these ISO codes. */
  onlyCountries?: string[];
  /** Remove these ISO codes from the list. */
  excludeCountries?: string[];
  /** Whether the country dropdown is open (reflected). */
  open?: boolean;
  /** Fired when the phone value changes. */
  onChange?: (e: CustomEvent<{ value: string; country: string }>) => void;
  /** Fired when the selected country changes. */
  onCountryChange?: (e: CustomEvent<{ country: string }>) => void;
  className?: string;
}

export const CgPhoneInput = createWrapper<CgPhoneInputProps>(
  'cg-phone-input',
  [
    'value',
    'country',
    'defaultCountry',
    'name',
    'label',
    'placeholder',
    'helper',
    'size',
    'rounded',
    'disabled',
    'readonly',
    'error',
    'success',
    'required',
    'loading',
    'nationalMode',
    'preferredCountries',
    'onlyCountries',
    'excludeCountries',
    'open',
  ],
  {
    onChange: 'cg-phone-input-change',
    onCountryChange: 'cg-phone-input-country-change',
  }
);
