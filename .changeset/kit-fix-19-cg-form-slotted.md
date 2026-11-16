---
"@cognivo/components": patch
---

`cg-form` works with its slotted controls. Its `<form>` lives in the shadow root, so slotted fields and buttons had no form owner: a slotted `cg-button type="submit"` and Enter in a slotted `cg-input` did nothing. `cg-form` now drives them: a slotted submit button (`cg-button type="submit"`, `<button>`, `<input type="submit">`) fires `cg-submit`, a reset button calls `reset()`, and Enter in a slotted single-line text field follows the same HTML implicit-submission rules as a native form (default button clicked unless disabled/loading; with no submit button, only a lone text field submits). Nothing submits while `loading`.
