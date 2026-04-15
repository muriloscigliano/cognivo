import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * @element cg-portal
 * Renders slotted children into a different DOM location (default: document.body).
 *
 * @example
 * ```html
 * <cg-portal target="#modal-root">
 *   <div>Teleported content</div>
 * </cg-portal>
 * ```
 *
 * @slot - Children to be moved into the target element.
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
    if (changed.has('target') || changed.has('disabled')) {
      this._unmount();
      this._mount();
    }
  }

  private _resolveTarget(): HTMLElement {
    if (this.disabled) return this;
    const t = this.target;
    if (t instanceof HTMLElement) return t;
    if (typeof t === 'string' && t) {
      const el = document.querySelector(t);
      if (el instanceof HTMLElement) return el;
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
  }

  private _unmount(): void {
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
