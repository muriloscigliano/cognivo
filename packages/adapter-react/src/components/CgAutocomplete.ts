import { createWrapper } from '../create-wrapper.js';
export const CgAutocomplete = createWrapper('cg-autocomplete', ['options', 'value', 'placeholder', 'label', 'disabled', 'clearable'],
  {
    onAutocompleteInput: 'cg-autocomplete-input',
    onAutocompleteSelect: 'cg-autocomplete-select',
  }
);
