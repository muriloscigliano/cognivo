---
"@cognivo/components": patch
---

`cg-modal` focus and visibility.

- Closed (and not animating out), the dialog container is `inert` and `visibility: hidden`: the dialog and every slotted field leave the tab order and the accessibility tree.
- The shared focus trap (also used by popover, alert-dialog, command, context-menu) now sees slotted custom-element fields — it used `offsetParent`, which reads `null` across a fixed shadow container — and focuses INTO a non-focusable host (a slotted `cg-input`/`cg-button`) instead of calling a no-op `host.focus()`. Tab and Shift+Tab cycle through close button, body fields and footer.
- Focus returns to the deep element that opened the dialog (the opener `cg-button`'s inner button), not its non-focusable host.
