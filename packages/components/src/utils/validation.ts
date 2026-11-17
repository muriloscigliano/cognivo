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
 * `checkValidity()` only asks: it fires `invalid` like `reportValidity()`
 * does, but must not show errors or move focus. The browser gives the two
 * the same event, so the checkValidity methods of forms, fieldsets and
 * ElementInternals (which every field's own `checkValidity()` calls) are
 * wrapped once to count the quiet calls in progress. A second copy of the
 * library on the page wraps the wrapper: both counts go up, so each copy's
 * fields stay quiet. (A listener's exception never propagates out of
 * checkValidity(), so a count always comes back down.)
 */
let quiet = 0;
let wrapped = false;

export function quietCheckValidity(): void {
  if (wrapped) return;
  wrapped = true;
  // Looked up by name: server rendering (@lit-labs/ssr) has form internals but no HTMLFormElement.
  for (const name of ['HTMLFormElement', 'HTMLFieldSetElement', 'ElementInternals']) {
    const proto = (globalThis as unknown as Record<string, { prototype: { checkValidity?(): boolean } } | undefined>)[name]?.prototype;
    const check = proto?.checkValidity;
    if (check) proto.checkValidity = function (this: unknown) {
      quiet++;
      const valid = check.call(this);
      quiet--;
      return valid;
    };
  }
}

/**
 * Field error state without the browser's bubble, for every form-associated
 * component (installed by `formInternals`). On a reported `invalid` — a
 * submit attempt or `reportValidity()` — the event is cancelled (no bubble:
 * the field shows its message under itself; its own listener sees
 * `defaultPrevented`) and the first invalid field of the pass (a form's
 * invalid events fire synchronously, in tree order) runs `focus`. On a
 * `checkValidity()` nothing happens: returns `false`.
 */
export function showInvalid(e: Event, focus: () => void): boolean {
  if (quiet) return false;
  e.preventDefault();
  if (!focusing) {
    focusing = true;
    queueMicrotask(() => (focusing = false));
    focus();
  }
  return true;
}
