---
"@cognivo/components": minor
"@cognivo/adapter-react": minor
---

`cg-select`: an accessible name that can differ from the visible label. `accessible-label` (property `accessibleLabel`) or `aria-label` on the host now names the inner combobox and its listbox — before, only the visible `label` (or the placeholder) could, and an `aria-label` on the host never reached the control. Keep the visible label's words in it (WCAG 2.5.3). React: `CgSelect` takes `accessibleLabel` (and `aria-label`).
