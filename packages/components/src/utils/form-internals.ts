/**
 * ElementInternals for a form-associated component, or `undefined` where the
 * environment cannot associate it with a form.
 *
 * jsdom (the default environment of Jest, Vitest and React Testing Library)
 * implements `attachInternals()` with the ARIA mixin only — no
 * `setFormValue`, `setValidity`, `form` or `validity`. Calling those threw on
 * the first update. Feature-detecting here makes every form-associated
 * component degrade to a plain element (renders, holds its value, fires its
 * events; `checkValidity()` returns `true`, nothing reaches FormData) instead
 * of crashing. Test form submission and validity in a real browser.
 */
export const formInternals = (el: HTMLElement): ElementInternals | undefined => {
  const internals = typeof el.attachInternals === 'function' ? el.attachInternals() : undefined;
  return typeof internals?.setFormValue === 'function' ? internals : undefined;
};
