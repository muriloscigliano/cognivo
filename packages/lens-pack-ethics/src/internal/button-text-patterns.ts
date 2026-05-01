/**
 * Word patterns that identify accept-action vs decline-action buttons in a
 * common decision UI (cookie banner, consent prompt, confirmation dialog).
 *
 * Patterns are case-insensitive and match the BUTTON's accessible name
 * (text content or aria-label). Two-word phrases must match exactly to
 * avoid false positives like "I do not accept" matching "accept".
 */

const ACCEPT_PATTERNS: readonly RegExp[] = [
  /^accept(\s+(all|cookies))?$/i,
  /^(i\s+)?agree(\s+to\s+all)?$/i,
  /^(yes|ok|okay|continue|got\s+it|allow|allow\s+all)$/i,
  /^(allow|enable)\s+all$/i,
  /^(sign|join|subscribe|enroll|opt\s+in)\s+up?$/i,
  /^subscribe$/i,
];

const DECLINE_PATTERNS: readonly RegExp[] = [
  /^decline(\s+all)?$/i,
  /^reject(\s+all)?$/i,
  /^(no|no\s+thanks|not\s+now|maybe\s+later|cancel|disagree)$/i,
  /^(opt\s+out|unsubscribe)$/i,
  /^(deny|refuse)(\s+all)?$/i,
  /^manage\s+(preferences|settings|cookies)$/i,
];

export type ButtonRole = 'accept' | 'decline' | 'neutral';

export function classifyButton(text: string | undefined): ButtonRole {
  if (!text) return 'neutral';
  const normalized = text.trim();
  if (ACCEPT_PATTERNS.some((p) => p.test(normalized))) return 'accept';
  if (DECLINE_PATTERNS.some((p) => p.test(normalized))) return 'decline';
  return 'neutral';
}
