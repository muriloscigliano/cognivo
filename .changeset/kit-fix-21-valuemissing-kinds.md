---
"@cognivo/components": patch
---

A page-wide `valueMissing` message no longer replaces the browser's type-specific one on checkboxes, radios and selects. `valueMissing` is worded for text fields ("Preencha este campo."), so `setValidationMessages(ptBRValidation)` used to tell a required `cg-checkbox` to "fill in this field". Checkbox, radio and select now read their own keys — `valueMissingCheckbox`, `valueMissingRadio`, `valueMissingSelect` — and fall back to the browser's native message; an element's own `validationMessages.valueMissing` still applies to it. `ptBRValidation` provides all three. Also fixes a required `cg-radio` throwing in real browsers (`setValidity` with an empty message: the native-message probe radio had no name, so it was never `valueMissing`).
