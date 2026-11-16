---
"@cognivo/components": minor
---

`cg-checkbox` renders a real `<input type="checkbox">` (laid over the animated box) instead of a `<label role="checkbox" tabindex="0">`. Fixes axe `nested-interactive` (serious) and `aria-allowed-role`; focus, Space-to-toggle, checked/mixed state and `required` validity are now native. The accessible name is the label only (the description is announced as the description). **Behaviour change — Enter no longer toggles** `cg-checkbox`, matching a native checkbox (Space toggles). Inside a form, Enter on a checkbox does nothing (a native checkbox does not submit either).

*Migration:* if users toggled with Enter, nothing to do for keyboard users (Space works); if your code dispatched a synthetic `keydown` Enter to toggle, set `checked` or call `click()` instead. Tests or scripts that queried `label[role=checkbox]` in the shadow root must query `input[type=checkbox]`.
