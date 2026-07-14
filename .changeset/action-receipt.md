---
"@cognivo/core": minor
"@cognivo/components": minor
---

Add the Agent Interaction Contract receipt (Plan 03): `ActionReceipt` +
`toReceipt()` in core capture what an executed action touched and its SPECIFIC
compensating affordance (not a global undo — compensation reverses effect, it
does not erase history). New `<ai-action-receipt>` component renders it with
text status labels (WCAG 1.4.1, never color alone) and a keyboard-focusable
compensation button. Additive and non-breaking.
