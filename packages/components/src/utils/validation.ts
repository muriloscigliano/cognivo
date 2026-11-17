/**
 * Validation messages for form-associated components — no hard-coded English.
 *
 * Resolution order for every message:
 *  1. the element's own `validationMessages` (property, or the
 *     `validation-messages` attribute as JSON);
 *  2. the page-wide locale map set with {@link setValidationMessages};
 *  3. the browser's own, already-localised message for the same condition
 *     (read from the component's native control, or from a detached probe).
 *
 * @example
 * ```html
 * <cg-input type="email" required
 *   validation-messages='{"valueMissing":"Informe seu e-mail","typeMismatch":"E-mail inválido"}'>
 * </cg-input>
 * ```
 * ```ts
 * // The /validation subpath is side-effect free: it registers no components.
 * // (Also exported from the package root, which registers every component.)
 * import { setValidationMessages } from '@cognivo/components/validation';
 * setValidationMessages({ valueMissing: 'Campo obrigatório' });
 * ```
 */

export type ValidityKey = keyof ValidityStateFlags;
/**
 * `valueMissing` is worded for text fields ("Fill in this field"). A checkbox,
 * radio or select has its own key, so a page-wide text-field message never
 * replaces the browser's type-specific one ("Check this box…"). An element's
 * own `valueMissing` still applies to that element, whatever its kind.
 */
export type KindValueMissingKey = 'valueMissingCheckbox' | 'valueMissingRadio' | 'valueMissingSelect';
export type ValidationMessages = Partial<Record<ValidityKey | KindValueMissingKey, string>>;


/**
 * The page-wide map lives on `globalThis` under a `Symbol.for` key, so every
 * copy of `@cognivo/components` on the page (an embed + the host app) shares
 * it: elements run the first copy's code, and a map private to the second
 * copy would never be read.
 */
const STORE = Symbol.for('cognivo.validationMessages.v1');
type Store = { messages: ValidationMessages };
const store = (): Store =>
  ((globalThis as Record<symbol, Store | undefined>)[STORE] ??= { messages: {} });

/** Set (merge) the page-wide validation message map, e.g. once per locale. */
export function setValidationMessages(messages: ValidationMessages): void {
  const s = store();
  s.messages = { ...s.messages, ...messages };
}

type ProbeKind = 'text' | 'checkbox' | 'radio' | 'select';
const KIND_KEY: Record<Exclude<ProbeKind, 'text'>, KindValueMissingKey> = {
  checkbox: 'valueMissingCheckbox',
  radio: 'valueMissingRadio',
  select: 'valueMissingSelect',
};

/**
 * Resolve a message: element override → page map → browser fallback. For
 * `valueMissing` on a checkbox/radio/select, the kind's own key is used and
 * the page-wide (text-field) `valueMissing` is skipped.
 */
export function messageFor(
  key: ValidityKey,
  own: ValidationMessages | null | undefined,
  fallback: string,
  kind: ProbeKind = 'text',
): string {
  const page = store().messages;
  if (key === 'valueMissing' && kind !== 'text') {
    const k = KIND_KEY[kind];
    return own?.[k] ?? own?.valueMissing ?? page[k] ?? fallback;
  }
  return own?.[key] ?? page[key] ?? fallback;
}

/**
 * Mirror a native control's validity (type="email"/"url" typeMismatch,
 * required, maxlength, …) onto the host's ElementInternals, anchored on that
 * control so the browser's bubble points at it.
 */
export function mirrorValidity(
  internals: ElementInternals | undefined,
  control: HTMLInputElement | HTMLTextAreaElement | null | undefined,
  own: ValidationMessages | null | undefined,
): void {
  if (!internals || !control) return;
  const v = control.validity;
  if (v.valid) {
    internals.setValidity({});
    return;
  }
  const flags: ValidityStateFlags = {};
  let first: ValidityKey | undefined;
  // ValidityState's flags, in IDL order (WebIDL attributes are enumerable); `valid` is not one.
  for (const key in v) {
    const k = key as ValidityKey;
    if (k !== ('valid' as ValidityKey) && v[k]) {
      flags[k] = true;
      first ??= k;
    }
  }
  // A textarea's type is 'textarea': only checkbox / radio inputs are their own kind.
  const kind = (control.type === 'checkbox' || control.type === 'radio' ? control.type : 'text') as ProbeKind;
  internals.setValidity(flags, messageFor(first ?? 'customError', own, control.validationMessage, kind), control);
}

const probeCache = new Map<ProbeKind, string>();

/** The browser's localised "value missing" message for a kind of control. */
export function nativeValueMissing(kind: ProbeKind): string {
  const cached = probeCache.get(kind);
  if (cached !== undefined) return cached;
  let message = '';
  if (typeof document !== 'undefined') {
    const probe = kind === 'select' ? document.createElement('select') : document.createElement('input');
    if (probe instanceof HTMLInputElement) probe.type = kind;
    // A radio without a name is in no group and is never valueMissing.
    if (kind === 'radio') probe.name = 'cg-probe';
    probe.required = true;
    message = probe.validationMessage ?? '';
  }
  probeCache.set(kind, message);
  return message;
}

/** Report `valueMissing` (or valid) for components without a native control. */
export function setValueMissing(
  internals: ElementInternals | undefined,
  missing: boolean,
  own: ValidationMessages | null | undefined,
  kind: ProbeKind,
  anchor?: HTMLElement | null,
): void {
  if (!internals) return;
  if (!missing) {
    internals.setValidity({});
    return;
  }
  const message = messageFor('valueMissing', own, nativeValueMissing(kind), kind);
  if (anchor) internals.setValidity({ valueMissing: true }, message, anchor);
  else internals.setValidity({ valueMissing: true }, message);
}

let focusing = false;

/**
 * When fields show their errors. Cognivo runs inside embeds on other sites,
 * so it never patches native prototypes: an `invalid` event alone (a
 * `checkValidity()` anywhere, or the host page's own code) changes nothing
 * visible. A field shows its message in place — and the first invalid one
 * takes focus — only during a submit attempt it can see:
 * - a click on a submit button (native or `cg-button type="submit"`), seen by
 *   one capture-phase listener on the document, marks that button's form;
 * - Enter in a field (the shared implicit-submit helper) marks its form;
 * - `reportFormValidity(form)` and a field's own `reportValidity()`.
 * The mark lasts until the current task ends (the browser validates
 * synchronously inside the submit). A field also shows its message once the
 * user has changed it and left it (touched + blur), without moving focus.
 */
/** The form of the submit attempt in this task (one at a time: a task submits one form). */
let attempt: HTMLFormElement | null | undefined;
let reporting = 0;

/** Mark a submit attempt on `form` for the rest of this task. */
export function markSubmitAttempt(form: HTMLFormElement | null | undefined): void {
  // (Marked twice in one task — Enter clicking the default button — is the same attempt.)
  attempt = form;
  focusing = false;
  setTimeout(() => { attempt = null; });
}

/**
 * Validate and show every invalid field's message in place (no browser
 * bubble), focusing the first — the replacement for calling
 * `form.reportValidity()` directly on a form with cg fields. (Also works on
 * one field, or its ElementInternals.)
 */
export function reportFormValidity(form: { reportValidity(): boolean }): boolean {
  // (A listener's exception never propagates out of reportValidity(), so the count comes back down.)
  if (!reporting++) focusing = false;
  const valid = form.reportValidity();
  reporting--;
  return valid;
}

/**
 * Install the invalid behaviour on a form-associated field (`formInternals`
 * calls this): during a submit attempt or a report, `invalid` is cancelled
 * (no bubble), `show` renders the message and the first invalid field of the
 * pass runs `focus`; after the user changed the field and left it, `show`
 * alone. Otherwise nothing happens.
 */
export function watchValidity(el: HTMLElement, internals: ElementInternals, focus: () => void, show: () => void): void {
  let touched = false;
  el.addEventListener('invalid', (e) => {
    if (!reporting && !(attempt && internals.form === attempt)) return;
    e.preventDefault();
    show();
    // The first invalid field of this attempt takes focus. (Not reset in a
    // microtask: a native submit button's validation runs a microtask
    // checkpoint after every invalid listener; each attempt resets it.)
    if (!focusing) {
      focusing = true;
      focus();
    }
  });
  const touch = () => { touched = true; };
  el.addEventListener('input', touch);
  el.addEventListener('cg-change', touch);
  // Left the field (focus not moving inside it; contains() is inclusive and false for null).
  el.addEventListener('focusout', (e) => {
    if (touched && !el.contains(e.relatedTarget as Node | null) && !internals.validity.valid) show();
  });
}
