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
 * import { setValidationMessages } from '@cognivo/components';
 * setValidationMessages({ valueMissing: 'Campo obrigatório' });
 * ```
 */

export type ValidityKey = keyof ValidityStateFlags;
export type ValidationMessages = Partial<Record<ValidityKey, string>>;

const KEYS: ValidityKey[] = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'tooLong',
  'tooShort',
  'rangeUnderflow',
  'rangeOverflow',
  'stepMismatch',
  'badInput',
  'customError',
];

let pageMessages: ValidationMessages = {};

/** Set (merge) the page-wide validation message map, e.g. once per locale. */
export function setValidationMessages(messages: ValidationMessages): void {
  pageMessages = { ...pageMessages, ...messages };
}

/** Resolve a message: element override → page map → browser fallback. */
export function messageFor(key: ValidityKey, own: ValidationMessages | null | undefined, fallback: string): string {
  return own?.[key] ?? pageMessages[key] ?? fallback;
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
  for (const k of KEYS) {
    if (v[k]) {
      flags[k] = true;
      first ??= k;
    }
  }
  internals.setValidity(flags, messageFor(first ?? 'customError', own, control.validationMessage), control);
}

type ProbeKind = 'text' | 'checkbox' | 'radio' | 'select';
const probeCache = new Map<ProbeKind, string>();

/** The browser's localised "value missing" message for a kind of control. */
export function nativeValueMissing(kind: ProbeKind): string {
  const cached = probeCache.get(kind);
  if (cached !== undefined) return cached;
  let message = '';
  if (typeof document !== 'undefined') {
    const probe = kind === 'select' ? document.createElement('select') : document.createElement('input');
    if (probe instanceof HTMLInputElement) probe.type = kind;
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
  const message = messageFor('valueMissing', own, nativeValueMissing(kind));
  if (anchor) internals.setValidity({ valueMissing: true }, message, anchor);
  else internals.setValidity({ valueMissing: true }, message);
}
