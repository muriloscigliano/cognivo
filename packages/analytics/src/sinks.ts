import type { AnalyticsEvent } from './capture.js';

/**
 * Log each event to `console.log` in a compact form. Useful during
 * development; not intended for production.
 */
export function consoleSink(event: AnalyticsEvent): void {
  console.log(
    '[cognivo/analytics]',
    event.component,
    event.event,
    event.detail
  );
}

/**
 * Fire-and-forget POST of each event to `url`. Network failures are
 * swallowed so the sink never throws into the capture pipeline.
 */
export function fetchSink(
  url: string,
  opts?: RequestInit
): (e: AnalyticsEvent) => void {
  return (event) => {
    try {
      void fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(event),
        keepalive: true,
        ...opts,
      }).catch(() => {
        /* swallow */
      });
    } catch {
      /* environment without fetch — swallow */
    }
  };
}

/**
 * Buffer events and POST them in batches.
 *
 *   - flushes when queue reaches `batchSize` (default 20)
 *   - OR after `flushMs` since the first enqueue (default 5000)
 *   - flushes synchronously on `pagehide` / `beforeunload` via `sendBeacon`
 *     when available, otherwise `fetch({ keepalive: true })`
 */
export function batchSink(
  url: string,
  opts: { batchSize?: number; flushMs?: number } = {}
): (e: AnalyticsEvent) => void {
  const batchSize = opts.batchSize ?? 20;
  const flushMs = opts.flushMs ?? 5000;
  let queue: AnalyticsEvent[] = [];
  let timer: ReturnType<typeof setTimeout> | null = null;

  const send = (body: string): void => {
    const nav = (
      globalThis as {
        navigator?: {
          sendBeacon?: (url: string, data: Blob | string) => boolean;
        };
      }
    ).navigator;
    if (nav?.sendBeacon) {
      try {
        const blob = new Blob([body], { type: 'application/json' });
        if (nav.sendBeacon(url, blob)) return;
      } catch {
        /* fall through to fetch */
      }
    }
    try {
      void fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* swallow */
    }
  };

  const flush = (): void => {
    if (queue.length === 0) return;
    const body = JSON.stringify({ events: queue });
    queue = [];
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    send(body);
  };

  // Best-effort flush on page teardown. `addEventListener` is a no-op in
  // SSR; guard accordingly.
  if (typeof window !== 'undefined') {
    window.addEventListener('pagehide', flush, { capture: true });
    window.addEventListener('beforeunload', flush, { capture: true });
  }

  return (event) => {
    queue.push(event);
    if (queue.length >= batchSize) {
      flush();
    } else if (!timer) {
      timer = setTimeout(flush, flushMs);
    }
  };
}

/**
 * Persist events to `localStorage` under `key`. Trimmed to the most recent
 * 500 entries to stay well under the 5 MB per-origin quota.
 * Errors (quota, serialization, missing storage) are swallowed.
 */
export function localStorageSink(
  key = 'cognivo:analytics'
): (e: AnalyticsEvent) => void {
  return (event) => {
    try {
      const raw = localStorage.getItem(key);
      const existing: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];
      existing.push(event);
      if (existing.length > 500) existing.splice(0, existing.length - 500);
      localStorage.setItem(key, JSON.stringify(existing));
    } catch {
      /* swallow */
    }
  };
}
