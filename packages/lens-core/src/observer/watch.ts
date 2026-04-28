import type { SceneGraph } from '../types/scene-graph.js';
import { scan, type ScanOptions } from './scan.js';

export interface WatchHandle {
  /** Stop observing and release resources. Idempotent. */
  disconnect(): void;
  /** Force an immediate rescan, bypassing the debounce window. */
  flush(): void;
}

export interface WatchOptions extends ScanOptions {
  /**
   * Debounce window for batching DOM mutations into a single rescan.
   * Default 200ms — matches the spec's MutationObserver buffering target (Spec §7.3).
   */
  debounceMs?: number;
}

/**
 * Observe a DOM root for changes and invoke `onChange` with a fresh SceneGraph
 * each time the DOM mutates (debounced).
 *
 * Backpressure model (Spec §7.3): if a new mutation arrives while a rescan is
 * pending, we *replace* the queued rescan rather than queueing a second one.
 * No buildup under rapid mutation.
 */
export function watch(
  root: Document | Element,
  onChange: (graph: SceneGraph) => void,
  options?: WatchOptions
): WatchHandle {
  const debounceMs = options?.debounceMs ?? 200;
  const observerTarget = isDocument(root) ? root.body ?? root : root;

  const win = observerTarget.ownerDocument?.defaultView;
  if (!win || typeof win.MutationObserver === 'undefined') {
    throw new Error('lens-core: watch() requires a DOM environment with MutationObserver.');
  }

  // Cross-env setTimeout return type — browsers return number, Node returns Timeout.
  // We treat it as opaque and store via the host's own clearTimeout.
  let pending: ReturnType<typeof setTimeout> | null = null;
  let disconnected = false;

  const triggerRescan = (): void => {
    pending = null;
    if (disconnected) return;
    onChange(scan(root, options));
  };

  const schedule = (): void => {
    if (disconnected) return;
    if (pending !== null) {
      win.clearTimeout(pending);
    }
    pending = win.setTimeout(triggerRescan, debounceMs) as unknown as ReturnType<typeof setTimeout>;
  };

  const observer = new win.MutationObserver(() => {
    schedule();
  });

  observer.observe(observerTarget, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
  });

  return {
    disconnect(): void {
      if (disconnected) return;
      disconnected = true;
      observer.disconnect();
      if (pending !== null) {
        win.clearTimeout(pending);
        pending = null;
      }
    },
    flush(): void {
      if (disconnected) return;
      if (pending !== null) {
        win.clearTimeout(pending);
        pending = null;
      }
      triggerRescan();
    },
  };
}

function isDocument(x: unknown): x is Document {
  return (
    typeof x === 'object' &&
    x !== null &&
    'documentElement' in x &&
    'body' in x &&
    'defaultView' in x
  );
}
