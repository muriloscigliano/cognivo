/**
 * Shared pulse driver — one module-level requestAnimationFrame loop for every
 * pulsing component instance (cg-border-beam pulse variant, etc.).
 *
 * Subscribers receive a phase in [0, 1) derived from time since subscription
 * modulo their period. Delivery is gated to ~30fps so dozens of instances cost
 * one cheap loop, and the loop sleeps entirely (no scheduled rAF) when the
 * last subscriber leaves.
 */

export type PulseCallback = (phase: number) => void;

interface PulseSubscriber {
  periodMs: number;
  startedAt: number;
  callback: PulseCallback;
}

const FRAME_GATE_MS = 33;

const subscribers = new Set<PulseSubscriber>();
let rafHandle: number | null = null;
let lastDelivery = 0;

function tick(): void {
  rafHandle = null;
  if (subscribers.size === 0) return;

  const now = performance.now();
  if (now - lastDelivery >= FRAME_GATE_MS) {
    lastDelivery = now;
    for (const sub of subscribers) {
      const elapsed = now - sub.startedAt;
      const phase = (elapsed / sub.periodMs) % 1;
      sub.callback(phase < 0 ? phase + 1 : phase);
    }
  }

  if (subscribers.size > 0) {
    rafHandle = requestAnimationFrame(tick);
  }
}

function wake(): void {
  if (rafHandle === null && subscribers.size > 0) {
    rafHandle = requestAnimationFrame(tick);
  }
}

function sleepIfIdle(): void {
  if (subscribers.size === 0 && rafHandle !== null) {
    cancelAnimationFrame(rafHandle);
    rafHandle = null;
  }
}

/**
 * Subscribe to the shared pulse loop.
 * @param periodMs full pulse cycle length in milliseconds (> 0)
 * @param callback invoked at most ~30 times/second with the current phase [0, 1)
 * @returns unsubscribe function (idempotent)
 */
export function subscribePulse(periodMs: number, callback: PulseCallback): () => void {
  const sub: PulseSubscriber = {
    periodMs: periodMs > 0 ? periodMs : 1,
    startedAt: performance.now(),
    callback,
  };
  subscribers.add(sub);
  wake();

  return () => {
    subscribers.delete(sub);
    sleepIfIdle();
  };
}

/** Test-only escape hatch. Not part of the public API. */
export const _pulseDriverInternals = {
  subscriberCount: (): number => subscribers.size,
  reset: (): void => {
    subscribers.clear();
    if (rafHandle !== null) {
      cancelAnimationFrame(rafHandle);
      rafHandle = null;
    }
    lastDelivery = 0;
  },
};
