---
"@cognivo/components": minor
---

`cg-otp-input` is form-associated, like the other fields. Before, a code typed into it never reached `FormData`, `required` did nothing, a form reset left the digits, a `<fieldset disabled>` did not disable it, and Enter did not submit.

- The code is submitted under `name` (reflected, so a property-set name works).
- `required` means a complete code: fewer digits than `length` is `valueMissing`, which blocks submission; `validity`, `validationMessage`, `willValidate`, `checkValidity()`, `reportValidity()` and `validation-messages` work as on `cg-input`.
- A form reset restores the `value` attribute; an ancestor `<fieldset disabled>` disables every box.
- Enter submits the owning form through the shared implicit-submission helper, and the field counts as a text field (two text fields and no submit button: Enter does not submit).
- A value set from outside shows in the boxes in the same update (was one render late).

Real-browser tests cover each point.
