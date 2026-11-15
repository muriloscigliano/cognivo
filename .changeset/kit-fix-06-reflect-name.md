---
"@cognivo/components": patch
---

Form-associated fields reflect `name` to the attribute (cg-input, cg-textarea, cg-password-input, cg-number-input, cg-phone-input, cg-checkbox, cg-select, cg-combobox, cg-slider, cg-rating, cg-calendar, cg-tag-input, cg-file-input). FormData keys a form-associated element by its `name` attribute, so a `name` set as a property (React 19, Vue, plain JS) used to drop the field from the submitted data. Values keep flowing through `ElementInternals.setFormValue` (the `value` attribute stays the reset default).
