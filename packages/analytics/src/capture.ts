import { createMatcher } from './matchers.js';
import { KNOWN_EVENTS } from './known-events.js';

/**
 * One structured telemetry record for a single component interaction.
 * Intentionally flat — easy to serialize, easy to index in any backend.
 */
export interface AnalyticsEvent {
  /** ISO-8601 timestamp (UTC). */
  timestamp: string;
  /** Tag name of the component that fired (lower-case). */
  component: string;
  /** Event name (e.g. `'cg-button-click'`, `'bias-commitment-advance'`). */
  event: string;
  /** Stripped detail payload (primitives + safe shallow objects only). */
  detail: Record<string, unknown>;
  /** Page URL — pathname only by default, full href if `includeUrlQuery: true`. */
  page: string;
  /** Anonymous session id, stable for the lifetime of the page. */
  sessionId: string;
}

export interface AnalyticsConfig {
  /** Called with each captured event. Errors are swallowed and warned. */
  sink: (event: AnalyticsEvent) => void;
  /** Glob patterns (e.g. `'bias-*'`) for which component tags to track. Default: `['cg-*', 'ai-*', 'bias-*']`. */
  trackComponents?: string[];
  /** Specific event names to track. Default: all events in the Cognivo registry. */
  trackEvents?: string[];
  /** Include `location.search` + `location.hash` in `page`. Default `false` (privacy). */
  includeUrlQuery?: boolean;
  /** Sample rate in `[0, 1]`. Default `1`. */
  sampleRate?: number;
  /**
   * When true (default) the detail payload is sanitized before it reaches
   * the sink: sensitive fields (passwords, OTP codes, tokens, search text,
   * card/SSN numbers, …) are replaced with `'[redacted]'`, strings longer
   * than 40 chars are truncated, and nested objects beyond depth 2 are
   * dropped. Set to `false` ONLY if the sink is trusted (e.g. in-memory test
   * capture) — disabling it forwards raw detail, including any secrets.
   */
  anonymizeDetail?: boolean;
}

// ── module-level state ────────────────────────────────────────────────────
let captureHandler: ((e: Event) => void) | null = null;
let registeredTypes: string[] = [];
let sessionId = '';
// Runtime-extensible registry; seeded with the build-time KNOWN_EVENTS list.
const eventRegistry = new Set<string>(KNOWN_EVENTS);

/** Returns the current session id (empty string if analytics is disabled). */
export function getSessionId(): string {
  return sessionId;
}

/**
 * Add extra event names to the capture registry at runtime. Useful for
 * consumer-defined events that follow Cognivo naming conventions
 * (`cg-*` / `ai-*` / `bias-*`).
 */
export function extendEventRegistry(events: string[]): void {
  for (const e of events) eventRegistry.add(e);

  // If capture is currently active, bind listeners for the new types too.
  if (captureHandler) {
    for (const type of events) {
      if (!registeredTypes.includes(type)) {
        window.addEventListener(type, captureHandler, { capture: true });
        registeredTypes.push(type);
      }
    }
  }
}

/** Replacement value emitted in place of any sensitive payload field. */
export const REDACTED = '[redacted]';

/**
 * Field names that carry secrets regardless of which event fired. Matched
 * case-insensitively, so `password`, `newPassword`, `apiKey`,
 * `access_token`, `cardNumber`, `cvv2`, etc. are all caught. Length
 * truncation is NOT a defense — a 12-char password is under the 40-char cap
 * — so these keys are dropped to `[redacted]`.
 *
 * Care is taken NOT to over-redact benign telemetry: `token` matches only
 * as a credential (standalone, or with an auth-ish prefix), so an LLM
 * `tokens` COUNT or `tokenCount` is preserved; `auth` matches the auth
 * word/credential forms but not `author`; `pin` is word-bounded so `pinned`
 * is kept.
 */
const SENSITIVE_KEY_PATTERN = new RegExp(
  [
    'pass(word|code|phrase)?',
    'secret',
    'credential',
    'api[-_]?key',
    'private[-_]?key',
    // credential-style tokens only — not a plural "tokens" count
    '(access|auth|refresh|bearer|id|session|csrf)[-_]?token',
    '\\btoken\\b',
    'authorization',
    '\\bauth\\b',
    // auth as a credential compound: separator form (auth_key, auth-header)
    // or the common camelCase header/key fields. Deliberately avoids a
    // case-insensitive [A-Z] lookahead, which would also match "author".
    'auth[-_]',
    'auth(header|key|secret|token)',
    '\\botp\\b',
    'passcode',
    '\\bpin\\b',
    '\\bcvv\\b',
    '\\bcvc\\b',
    '\\bssn\\b',
    'card[-_]?number',
    'account[-_]?number',
  ].join('|'),
  'i'
);

/**
 * Events whose payload carries a secret under a GENERIC key (`value`,
 * `query`, …) that we can't blanket-redact by name without nuking benign
 * events. Keyed by event name → the specific payload fields to redact.
 *
 *   - OTP inputs emit the code under `value`.
 *   - Password inputs emit the password under `value`.
 *   - Search/memory inputs emit the typed query under `query`.
 *
 * Search text is user-entered free text and often PII (names, emails,
 * health terms), so it is redacted by default just like credentials.
 */
const SENSITIVE_EVENT_FIELDS: Record<string, readonly string[]> = {
  'cg-otp-change': ['value'],
  'cg-otp-complete': ['value'],
  'cg-password-change': ['value'],
  'ai-search-query': ['query'],
  'ai-search-filter': ['query'],
  'ai-memory-search': ['query'],
};

/** True when a field name looks like it carries a secret. */
function isSensitiveKey(key: string): boolean {
  return SENSITIVE_KEY_PATTERN.test(key);
}

/**
 * Strip a custom-event `detail` into a privacy-safe shallow object.
 *
 *   - `null`/`undefined`     → `{}`
 *   - sensitive field names  → `'[redacted]'` (never length-based)
 *   - strings > 40 chars     → truncated with `…`
 *   - numbers/booleans       → kept as-is
 *   - nested objects         → recursed up to `depth < 2`
 *   - functions/symbols      → dropped
 *   - arrays                 → shallowly copied of primitive members, else dropped
 *
 * Pass `eventName` so event-specific secret fields stored under generic keys
 * (an OTP code under `value`, a search string under `query`) are also
 * redacted — see {@link SENSITIVE_EVENT_FIELDS}.
 */
export function sanitizeDetail(
  detail: unknown,
  depth = 0,
  eventName?: string
): Record<string, unknown> {
  if (detail == null || typeof detail !== 'object') return {};

  const eventFields = eventName ? SENSITIVE_EVENT_FIELDS[eventName] : undefined;

  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(detail as Record<string, unknown>)) {
    if (v == null) continue;

    // Redact secrets by field name OR by event-specific generic key, before
    // any other handling — this wins over truncation, which is not a defense.
    if (isSensitiveKey(k) || eventFields?.includes(k)) {
      out[k] = REDACTED;
      continue;
    }

    if (typeof v === 'string') {
      out[k] = v.length > 40 ? `${v.slice(0, 40)}…` : v;
    } else if (typeof v === 'number' || typeof v === 'boolean') {
      out[k] = v;
    } else if (Array.isArray(v)) {
      out[k] = v
        .filter(
          (x) =>
            typeof x === 'string' ||
            typeof x === 'number' ||
            typeof x === 'boolean'
        )
        .map((x) =>
          typeof x === 'string' && x.length > 40 ? `${x.slice(0, 40)}…` : x
        );
    } else if (typeof v === 'object' && depth < 2) {
      // Nested objects inherit field-name redaction (eventFields apply only at
      // the top level, where the documented generic keys live).
      out[k] = sanitizeDetail(v, depth + 1);
    }
    // functions, symbols, bigints, and deeper objects are intentionally dropped
  }
  return out;
}

function makeSessionId(): string {
  const g = globalThis as { crypto?: { randomUUID?: () => string } };
  if (g.crypto?.randomUUID) return g.crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

/**
 * Start capturing Cognivo component events.
 *
 * Returns a disposer that removes all listeners — calling `enable` again
 * also disposes the previous capture, so only one capture is active at a
 * time.
 */
export function enable(config: AnalyticsConfig): () => void {
  // Ensure a single active capture.
  disable();

  if (typeof config.sink !== 'function') {
    throw new TypeError('[cognivo/analytics] enableAnalytics: `sink` must be a function');
  }

  // Session id is stable for the lifetime of the page, even across
  // enable/disable cycles.
  sessionId = sessionId || makeSessionId();

  const matchTag = createMatcher(
    config.trackComponents ?? ['cg-*', 'ai-*', 'bias-*']
  );
  const matchEvent = config.trackEvents
    ? createMatcher(config.trackEvents)
    : () => true;
  const sample = config.sampleRate ?? 1;
  const includeQuery = config.includeUrlQuery ?? false;
  const anonymize = config.anonymizeDetail ?? true;

  captureHandler = (e: Event) => {
    if (!e.type) return;
    // Fast-path: restrict to the Cognivo namespace.
    if (!/^(cg-|ai-|bias-)/.test(e.type)) return;
    if (!matchEvent(e.type)) return;

    // composedPath()[0] is the actual inner element; we want the custom
    // element that actually dispatched, which is typically a Cognivo tag
    // somewhere along the path. Walk the path and find the first match.
    const path = typeof e.composedPath === 'function' ? e.composedPath() : [];
    let tag = '';
    for (const node of path) {
      const el = node as Element;
      if (el && typeof el === 'object' && typeof el.tagName === 'string') {
        const candidate = el.tagName.toLowerCase();
        if (/^(cg-|ai-|bias-)/.test(candidate) && matchTag(candidate)) {
          tag = candidate;
          break;
        }
      }
    }
    if (!tag) {
      // Fall back to the event target if composedPath didn't surface a
      // matching Cognivo element (e.g. in test harnesses using simple
      // document.body dispatch).
      const target = e.target as Element | null;
      if (!target || typeof target.tagName !== 'string') return;
      const candidate = target.tagName.toLowerCase();
      if (!/^(cg-|ai-|bias-)/.test(candidate)) return;
      if (!matchTag(candidate)) return;
      tag = candidate;
    }

    if (sample < 1 && Math.random() > sample) return;

    const rawDetail = (e as CustomEvent).detail;
    const detail = anonymize
      ? sanitizeDetail(rawDetail, 0, e.type)
      : rawDetail && typeof rawDetail === 'object'
        ? (rawDetail as Record<string, unknown>)
        : {};

    const page = includeQuery
      ? typeof location !== 'undefined'
        ? location.href
        : ''
      : typeof location !== 'undefined'
        ? location.pathname
        : '';

    const event: AnalyticsEvent = {
      timestamp: new Date().toISOString(),
      component: tag,
      event: e.type,
      detail,
      page,
      sessionId,
    };

    try {
      config.sink(event);
    } catch (err) {
      console.warn('[cognivo/analytics] sink threw:', err);
    }
  };

  // We can't listen to "every event type" generically, so we iterate over
  // the curated registry and add one capture-phase listener per type.
  // This is cheap — `addEventListener` is O(1) and we share a single
  // handler reference.
  registeredTypes = [...eventRegistry];
  for (const type of registeredTypes) {
    window.addEventListener(type, captureHandler, { capture: true });
  }

  return disable;
}

/**
 * Tear down capture — removes every listener added by `enable()`.
 * Safe to call when analytics is already disabled.
 */
export function disable(): void {
  if (!captureHandler) return;
  for (const type of registeredTypes) {
    window.removeEventListener(type, captureHandler, { capture: true });
  }
  captureHandler = null;
  registeredTypes = [];
}
