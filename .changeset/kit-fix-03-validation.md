---
"@cognivo/components": minor
---

Native validation and translatable messages.

- `cg-input` and `cg-textarea` mirror their native control's validity, so `type="email"` / `type="url"` report `typeMismatch` and block the form (previously only `valueMissing` existed); `cg-checkbox` mirrors its native checkbox.
- No hard-coded English validation text in any component. A message comes from the element (`validation-messages` JSON attribute or `validationMessages` property), then the page-wide map (`setValidationMessages()`, exported from the package root and from the new `@cognivo/components/validation` subpath), then the browser's own localised message.
- Form fields (cg-input, cg-textarea, cg-password-input, cg-number-input, cg-phone-input, cg-checkbox, cg-select, cg-radio) expose `validity`, `validationMessage`, `willValidate`, `checkValidity()` and `reportValidity()`.
- `cg-password-input`'s programmatic `tooShort` has no browser fallback text; supply one through `validationMessages` / `setValidationMessages({ tooShort })`.
