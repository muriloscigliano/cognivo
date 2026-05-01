/**
 * Keyword patterns that suggest a checkbox is for an OPTIONAL opt-in
 * (newsletter, marketing communications, third-party data sharing). These
 * are the cases where pre-checking the box is deceptive — the GDPR explicitly
 * bans pre-checked consent (recital 32).
 *
 * Patterns are case-insensitive. Each tested independently against the
 * label text via .test().
 */
export const OPTIONAL_OPTIN_PATTERNS: readonly RegExp[] = [
  /\b(newsletter|news letter)\b/i,
  /\b(marketing|promotional|promotions)\b/i,
  /\b(special offers?|deals?|discounts?)\b/i,
  /\b(updates|announcements)\b/i,
  /\bemail (me|us)\b/i,
  /\bsign me up\b/i,
  /\bshare (my )?(email|info|data)\b/i,
  /\bthird[- ]?part(y|ies)\b/i,
  /\bagree to receive\b/i,
  /\bopt[- ]?in\b/i,
  /\b(receive|get) (offers?|news|updates?)\b/i,
];

/**
 * Allow-list patterns — when the label text matches any of these, we DO NOT
 * fire even if it also matches an optional-opt-in pattern. Common case:
 * "Remember me" is a usability pre-check, not a deceptive default.
 */
export const PRECHECKED_ALLOWLIST_PATTERNS: readonly RegExp[] = [
  /\bremember (me|this device)\b/i,
  /\bkeep (me )?signed in\b/i,
  /\bstay (logged|signed) in\b/i,
  /\bsave (my )?(credentials|password|email)\b/i,
  // Required terms — pre-checking a "I agree to terms" is a different bug
  // (forced consent), not what THIS rule targets. Skip and let a future rule
  // catch it.
  /\b(i )?(agree|accept) (to|the) (terms|tos|conditions|policy)\b/i,
];

export function matchesOptionalOptin(text: string): boolean {
  if (PRECHECKED_ALLOWLIST_PATTERNS.some((p) => p.test(text))) return false;
  return OPTIONAL_OPTIN_PATTERNS.some((p) => p.test(text));
}
