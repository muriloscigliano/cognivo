/**
 * @cognivo/analytics
 *
 * Opt-in, zero-dependency telemetry for Cognivo components. Call
 * `enableAnalytics({ sink })` once at startup and every Cognivo custom
 * event that bubbles to `window` gets captured, sanitized, and routed
 * to your sink.
 *
 * Nothing is captured — and no listeners are attached — until
 * `enableAnalytics()` is called. `disableAnalytics()` tears everything
 * down cleanly.
 *
 *     import { enableAnalytics, consoleSink } from '@cognivo/analytics';
 *
 *     const dispose = enableAnalytics({
 *       sink: consoleSink,
 *       trackComponents: ['cg-button', 'bias-*'],
 *     });
 *
 *     // later…
 *     dispose();
 */
export type { AnalyticsEvent, AnalyticsConfig } from './capture.js';
export {
  enable as enableAnalytics,
  disable as disableAnalytics,
  extendEventRegistry,
  getSessionId,
  sanitizeDetail,
  REDACTED,
} from './capture.js';
export { KNOWN_EVENTS } from './known-events.js';
export { createMatcher } from './matchers.js';
export { consoleSink, fetchSink, batchSink, localStorageSink } from './sinks.js';
