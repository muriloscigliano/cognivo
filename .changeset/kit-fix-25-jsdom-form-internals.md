---
"@cognivo/components": minor
---

Form-associated components no longer crash in jsdom (Jest / Vitest / React Testing Library). jsdom's `attachInternals()` has no `setFormValue`, `setValidity`, `form` or `validity`, so the first update threw `setFormValue is not a function`. All 20 form-associated components now get their internals from a shared feature-detecting helper (`utils/form-internals`) and degrade to plain elements there: they render, hold `value`, fire events, `checkValidity()` returns `true`, nothing reaches FormData. `cg-segmented-control` also no longer needs `ResizeObserver`. Documented in the README ("Unit tests in jsdom"); guarded by a jsdom test over every form-associated component.
