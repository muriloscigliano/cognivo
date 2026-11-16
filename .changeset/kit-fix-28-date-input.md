---
"@cognivo/components": minor
---

`cg-input type="date"`, with new `min` / `max` properties. It renders the browser's date control (picker, keyboard entry, localised format), is form-associated (ISO `YYYY-MM-DD` in FormData), and validates `min`/`max` natively: `rangeUnderflow` / `rangeOverflow` block the form, with messages from the element, the page-wide map (`setValidationMessages({ rangeUnderflow, rangeOverflow })`) or the browser. The floating label stays up for dates (the control always shows its format). `min`/`max` also apply to `type="number"`. README: a two-field date range pattern, and `color-scheme: dark` for the dark theme. Three-component form bundle: 13,043 B gzip (limit 13,312).
