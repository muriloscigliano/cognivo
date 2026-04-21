/**
 * Lazy custom-element registration.
 *
 * Apps often ship every component up front, even when most pages only render
 * a handful. `lazy(tag, loader)` defers the network cost of a component until
 * the first time its tag appears in the DOM, using a `MutationObserver` to
 * watch for insertions. The loader is a dynamic `import()` whose module's
 * `@customElement` side effect registers the element — the observer
 * disconnects as soon as the loader starts, so there's no ongoing cost.
 *
 * This module is browser-only. It must not be imported from SSR code paths
 * without a `document`/`MutationObserver` guard.
 */

/**
 * Register a custom element on demand — when the tag first appears in the DOM.
 * Uses `MutationObserver` to detect insertions and triggers the loader promise.
 *
 * @example
 * ```ts
 * import { lazy } from '@cognivo/components/lazy';
 *
 * // Called once at app init. Component only downloads when used.
 * lazy('cg-chart', () => import('@cognivo/components/cg-chart'));
 * ```
 *
 * @param tag - The custom element tag name (e.g. `'cg-chart'`).
 * @param loader - A function that returns a promise resolving to the module.
 *                 The module's side effect (`customElements.define`) runs on
 *                 import; the resolved value itself is ignored.
 */
export function lazy(tag: string, loader: () => Promise<unknown>): void {
  // Noop if the element is already registered (e.g. statically imported).
  if (typeof customElements !== 'undefined' && customElements.get(tag)) return;

  let loading = false;
  const load = async (): Promise<void> => {
    if (loading || customElements.get(tag)) return;
    loading = true;
    try {
      await loader();
    } catch (err) {
      console.warn(`[cognivo] Failed to lazy-load ${tag}:`, err);
      loading = false;
    }
  };

  // If the tag already exists in the DOM, load immediately — don't wait for
  // an insertion that already happened before this helper was wired up.
  if (typeof document !== 'undefined' && document.querySelector(tag)) {
    void load();
    return;
  }

  // Otherwise observe for insertions. We disconnect on first match to avoid
  // keeping a live observer attached to the whole document tree.
  if (typeof MutationObserver === 'undefined' || typeof document === 'undefined') {
    return;
  }
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.tagName.toLowerCase() === tag || node.querySelector(tag)) {
          void load();
          observer.disconnect();
          return;
        }
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

/**
 * Batch-register multiple components lazily. Thin wrapper around {@link lazy}.
 *
 * @example
 * ```ts
 * lazyAll({
 *   'cg-chart': () => import('@cognivo/components/cg-chart'),
 *   'cg-calendar': () => import('@cognivo/components/cg-calendar'),
 *   'ai-workflow-builder': () => import('@cognivo/components/ai-workflow-builder'),
 * });
 * ```
 *
 * @param registry - Map of tag name to loader function.
 */
export function lazyAll(registry: Record<string, () => Promise<unknown>>): void {
  for (const [tag, loader] of Object.entries(registry)) {
    lazy(tag, loader);
  }
}
