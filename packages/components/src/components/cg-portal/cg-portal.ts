import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * @element cg-portal
 * Teleports its slotted children into a different DOM location (default:
 * `document.body`). Useful for popovers, modals, tooltips, or anything that
 * needs to escape a clipping ancestor / stacking context.
 *
 * **Style scope caveat:** teleported children leave the consumer's scoped-CSS
 * context. They inherit only global styles + any styles applied at the new
 * location. Wrap them in your own design-token surface (`cg-card`, etc.) if
 * you need consistent chrome.
 *
 * **Shadow-root target limitation:** when `target` is a CSS selector string,
 * resolution uses `document.querySelector` — which cannot pierce shadow
 * roots. To target an element inside a shadow root, pass it directly via the
 * property: `el.target = shadowRootEl.querySelector('#mount')`.
 *
 * **Missing-target behavior:** if a string `target` doesn't match any element
 * at mount time, the component falls back to `document.body` and emits a
 * `console.warn` in development (Vite/Astro `import.meta.env.DEV`). It does
 * NOT retry. If you need late-resolving targets, render a `<cg-portal>`
 * conditionally once the target element is mounted.
 *
 * **SSR-safe:** all DOM access happens inside `connectedCallback` and
 * `updated()`. No browser globals are touched at module load or in field
 * initializers, so server rendering won't crash on it.
 *
 * @example
 * ```html
 * <!-- Default: teleports to document.body -->
 * <cg-portal>
 *   <my-modal></my-modal>
 * </cg-portal>
 *
 * <!-- Custom target by selector -->
 * <cg-portal target="#modal-root">
 *   <div>Teleported content</div>
 * </cg-portal>
 *
 * <!-- Conditionally render in place (SSR / no-portal mode) -->
 * <cg-portal disabled>
 *   <my-modal></my-modal>
 * </cg-portal>
 * ```
 *
 * @slot - Children to be moved into the target element.
 *
 * @fires {CustomEvent<{ container: HTMLElement }>} cg-portal-mount - Children
 *   have been teleported. `detail.container` is the destination element.
 * @fires {CustomEvent} cg-portal-unmount - Children have been returned to the
 *   host (target change, disabled toggle, or component disconnect).
 */
@customElement('cg-portal')
export class CgPortal extends LitElement {
  static override styles = css`
    :host { display: contents; }
  `;

  @property() target: string | HTMLElement = '';
  @property({ type: Boolean }) disabled = false;

  private _container: HTMLElement | null = null;
  private _moved: Node[] = [];
  private _observer: MutationObserver | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    // Wait a microtask so that slotted light-DOM children are parsed.
    queueMicrotask(() => this._mount());
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unmount();
  }

  override updated(changed: Map<string, unknown>): void {
    if (!changed.has('target') && !changed.has('disabled')) return;
    // Avoid the unmount/remount cycle when the resolved target hasn't
    // actually changed — same selector string, same disabled flag, etc.
    const next = this._resolveTarget();
    if (next === this._container) return;
    this._unmount();
    this._mount();
  }

  private _resolveTarget(): HTMLElement {
    if (this.disabled) return this;
    const t = this.target;
    if (t instanceof HTMLElement) return t;
    if (typeof t === 'string' && t) {
      const el = document.querySelector(t);
      if (el instanceof HTMLElement) return el;
      // Selector didn't match — fall back to document.body and warn in dev.
      // Note: querySelector can't pierce shadow roots; pass an element via the
      // property if your target lives inside one.
      if (typeof process === 'undefined' || process.env.NODE_ENV !== 'production') {
        console.warn(
          `[cg-portal] target selector "${t}" did not match any element. ` +
          `Falling back to document.body. (querySelector can't pierce shadow ` +
          `roots — pass an HTMLElement reference via the property if needed.)`
        );
      }
    }
    return document.body;
  }

  private _mount(): void {
    if (!this.isConnected) return;
    this._container = this._resolveTarget();
    if (this._container === this) return;

    this._moved = Array.from(this.childNodes);
    for (const node of this._moved) {
      this._container.appendChild(node);
    }

    // Watch for new children added to this host and forward them.
    this._observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (this._container && node.parentNode === this) {
            this._container.appendChild(node);
            this._moved.push(node);
          }
        });
      }
    });
    this._observer.observe(this, { childList: true });

    this.dispatchEvent(new CustomEvent('cg-portal-mount', {
      bubbles: true,
      composed: true,
      detail: { container: this._container },
    }));
  }

  private _unmount(): void {
    const hadContainer = this._container && this._container !== this;
    this._observer?.disconnect();
    this._observer = null;
    // Return moved children back to host so they are not lost on re-mount,
    // target change, or disable toggle.
    for (const node of this._moved) {
      if (node.parentNode) node.parentNode.removeChild(node);
      if (this.isConnected) this.appendChild(node);
    }
    this._moved = [];
    this._container = null;
    if (hadContainer) {
      this.dispatchEvent(new CustomEvent('cg-portal-unmount', {
        bubbles: true,
        composed: true,
      }));
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-portal': CgPortal;
  }
}
