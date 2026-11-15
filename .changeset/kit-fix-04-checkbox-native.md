---
"@cognivo/components": patch
---

`cg-checkbox` renders a real `<input type="checkbox">` (laid over the animated box) instead of a `<label role="checkbox" tabindex="0">`. Fixes axe `nested-interactive` (serious) and `aria-allowed-role`; focus, Space-to-toggle, checked/mixed state and `required` validity are now native. The accessible name is the label only (the description is announced as the description). Behaviour change: Enter no longer toggles, matching a native checkbox.
