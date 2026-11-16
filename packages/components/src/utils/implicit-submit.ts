/**
 * Implicit submission (Enter in a single-line text field submits its form)
 * for form-associated components whose real `<input>` lives in a shadow root,
 * where the browser cannot do it for us.
 *
 * Follows HTML Living Standard §4.10.21.2 "Implicit submission"
 * (https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#implicit-submission):
 *
 * 1. The form's **default button** is the first submit button in tree order
 *    whose form owner is the form. Submit buttons are `<button type=submit>`
 *    (the native default), `<input type=submit|image>` and any form-associated
 *    element whose `type` is `"submit"` (`cg-button type="submit"`).
 * 2. If there is a default button: when it is disabled (its own `disabled`,
 *    an ancestor `<fieldset disabled>`, or `loading` on cg-button) nothing
 *    happens; otherwise a `click` is fired at it, so the button's own
 *    activation behaviour submits (and click listeners on it run).
 * 3. If the form has no submit button: when the form has more than one field
 *    that blocks implicit submission, nothing happens; otherwise the form is
 *    submitted from the form itself (`requestSubmit()`, so constraint
 *    validation and the `submit` event run).
 *
 * "A field that blocks implicit submission" is an `<input>` owned by the form
 * whose type is text, search, tel, url, email, password, date, month, week,
 * time, datetime-local or number — and, for Cognivo, any form-associated
 * element whose class sets `static blocksImplicitSubmission = true` (the
 * single-line text fields: cg-input, cg-password-input, cg-number-input,
 * cg-phone-input, cg-combobox, cg-tag-input).
 */

const BLOCKING_INPUT_TYPES = new Set([
  'text', 'search', 'tel', 'url', 'email', 'password',
  'date', 'month', 'week', 'time', 'datetime-local', 'number',
]);

type Control = Element & { type?: unknown; disabled?: unknown; loading?: unknown };

// Read through the prototype: a control named/id'd "elements" shadows
// form.elements (named-property access), as "submit" shadows requestSubmit.
const elementsOf = (form: HTMLFormElement): Control[] =>
  Array.from(Object.getOwnPropertyDescriptor(HTMLFormElement.prototype, 'elements')!.get!.call(form) as HTMLFormControlsCollection);

/** A submit button: `<button type=submit>`, `<input type=submit|image>`, or a custom element with `type="submit"`. */
export function isSubmitButton(el: Element): boolean {
  if (el instanceof HTMLInputElement) return el.type === 'submit' || el.type === 'image';
  return (el as Control).type === 'submit' && (el instanceof HTMLButtonElement || el.localName.includes('-'));
}

/** A field that blocks implicit submission (a single-line text field). */
export function blocksImplicitSubmission(el: Element): boolean {
  if (el instanceof HTMLInputElement) return BLOCKING_INPUT_TYPES.has(el.type);
  return (el.constructor as { blocksImplicitSubmission?: boolean }).blocksImplicitSubmission === true;
}

/** Disabled (own attribute/property or an ancestor `<fieldset disabled>`) or `loading`. */
export function isDisabled(el: Element): boolean {
  const c = el as Control;
  return el.matches(':disabled') || c.disabled === true || c.loading === true;
}

/**
 * The algorithm over a form's controls (in tree order). `submitWithoutButton`
 * submits "from the form itself" when there is no submit button.
 */
export function runImplicitSubmission(controls: Element[], submitWithoutButton: () => void): void {
  const defaultButton = controls.find(isSubmitButton);
  if (defaultButton) {
    if (!isDisabled(defaultButton)) (defaultButton as HTMLElement).click();
    return;
  }
  if (controls.filter(blocksImplicitSubmission).length > 1) return;
  submitWithoutButton();
}

/** Run implicit submission for `form` (no-op when `form` is null). */
export function implicitlySubmit(form: HTMLFormElement | null | undefined): void {
  if (!form) return;
  runImplicitSubmission(elementsOf(form), () => HTMLFormElement.prototype.requestSubmit.call(form));
}

/**
 * Keydown handler body shared by every single-line text field: on a plain
 * Enter (not during IME composition, not already handled) it prevents the
 * default and runs {@link implicitlySubmit} for the field's owning form.
 */
export function handleImplicitSubmit(e: KeyboardEvent, internals: ElementInternals | null | undefined): void {
  if (e.key !== 'Enter' || e.isComposing || e.defaultPrevented) return;
  const form = internals?.form;
  if (!form) return;
  e.preventDefault();
  implicitlySubmit(form);
}
