import { watchValidity } from './validation.js';
import { watchSubmits } from './implicit-submit.js';

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
/** `focus` default: the first native input in the shadow root, else the host. */
export const formInternals = (el: HTMLElement, focus: () => void = () => (el.shadowRoot?.querySelector('input') ?? el).focus()): ElementInternals | undefined => {
  const internals = typeof el.attachInternals === 'function' ? el.attachInternals() : undefined;
  if (typeof internals?.setFormValue !== 'function') return undefined;
  // One invalid behaviour for every field (utils/validation watchValidity):
  // during a submit attempt the field shows its message in place — its
  // `_invalid` state, rendered under it — and the first invalid field takes
  // focus (`focus`); after the user changed it and left it, the message only.
  watchSubmits();
  watchValidity(el, internals, focus, () => { (el as HTMLElement & { _invalid?: string })._invalid = internals.validationMessage; });
  return internals;
};
