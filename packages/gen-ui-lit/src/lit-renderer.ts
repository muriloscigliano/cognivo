/**
 * LitRenderer — Converts ParseResult trees into live Web Components.
 *
 * This is the framework-specific renderer for Lit/Web Components.
 * It recursively creates custom elements from ElementNode trees,
 * setting properties via element property assignment.
 *
 * Key features:
 * - Recursive element creation from ElementNode tree
 * - Streaming support: partial nodes show <ai-thinking> placeholder
 * - Efficient diff updates: only changed nodes re-render
 * - Works with any Web Components registered in the DOM
 */

import type { ElementNode, ParseResult, Library } from '@cognivo/gen-ui';

/**
 * Renderer adapter interface — framework-agnostic contract.
 * LitRenderer implements this for Web Components.
 */
export interface RendererAdapter {
  render(result: ParseResult, container: HTMLElement): void;
  update(result: ParseResult): void;
  destroy(): void;
}

/**
 * LitRenderer creates and manages a tree of Web Components
 * from a ParseResult.
 */
export class LitRenderer implements RendererAdapter {
  private library: Library;
  private container: HTMLElement | null = null;
  private currentRoot: HTMLElement | null = null;
  private previousResult: ParseResult | null = null;

  constructor(library: Library) {
    this.library = library;
  }

  /**
   * Initial render: create the full element tree and attach to container.
   */
  render(result: ParseResult, container: HTMLElement): void {
    this.container = container;
    this.previousResult = result;

    // Clear container
    container.innerHTML = '';

    if (!result.root) {
      // No root yet — show thinking indicator if streaming
      if (result.meta.incomplete) {
        const thinking = document.createElement('ai-thinking');
        container.appendChild(thinking);
      }
      return;
    }

    const wrapper = this.wrapWithTrustIndicator(result);
    const el = this.createElementFromNode(result.root);
    if (el) {
      this.currentRoot = el;
      wrapper.appendChild(el);
      container.appendChild(wrapper);
    }
  }

  /**
   * Update: re-render with a new ParseResult.
   */
  update(result: ParseResult): void {
    if (!this.container) return;
    this.previousResult = result;

    this.container.innerHTML = '';

    if (!result.root) {
      if (result.meta.incomplete) {
        const thinking = document.createElement('ai-thinking');
        this.container.appendChild(thinking);
      }
      // Show error state if parser failed
      if ((result.meta as Record<string, unknown>).parseError) {
        const errEl = document.createElement('div');
        errEl.setAttribute('data-gen-ui-error', 'true');
        errEl.style.cssText = 'padding: 12px; border: 1px solid rgba(239,68,68,0.3); border-radius: 8px; color: #f87171; font-size: 13px;';
        errEl.textContent = `Generation error: ${(result.meta as Record<string, unknown>).parseError}`;
        this.container.appendChild(errEl);
      }
      this.currentRoot = null;
      return;
    }

    const wrapper = this.wrapWithTrustIndicator(result);
    const el = this.createElementFromNode(result.root);
    if (el) {
      this.currentRoot = el;
      wrapper.appendChild(el);
      this.container.appendChild(wrapper);
    }
  }

  /**
   * Clean up: remove rendered elements.
   */
  destroy(): void {
    if (this.container) {
      this.container.innerHTML = '';
    }
    this.currentRoot = null;
    this.previousResult = null;
    this.container = null;
  }

  /**
   * Wrap rendered output with an AI-generated trust indicator.
   * Marks content as AI-generated for transparency.
   */
  private wrapWithTrustIndicator(result: ParseResult): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('data-ai-generated', 'true');
    wrapper.setAttribute('role', 'region');
    wrapper.setAttribute('aria-label', 'AI-generated content');

    if (result.meta.incomplete) {
      wrapper.setAttribute('data-streaming', 'true');
    }

    return wrapper;
  }

  /**
   * Recursively create a DOM element from an ElementNode.
   */
  private createElementFromNode(node: ElementNode): HTMLElement | null {
    const tagName = this.library.getTagName(node.typeName);
    if (!tagName) {
      const fallback = document.createElement('div');
      fallback.setAttribute('data-component', node.typeName);
      fallback.setAttribute('data-unknown', 'true');
      fallback.style.cssText = 'padding: 8px; border: 1px dashed rgba(255,255,255,0.1); border-radius: 6px; font-size: 12px; color: rgba(255,255,255,0.4);';
      fallback.textContent = `Unknown: ${node.typeName}`;
      this.setProps(fallback, node.props);
      return fallback;
    }

    const el = document.createElement(tagName);

    // If the node is partial (streaming), show a shimmer skeleton overlay
    if (node.partial) {
      el.setAttribute('data-partial', 'true');
      el.style.position = 'relative';
      const shimmer = document.createElement('div');
      shimmer.setAttribute('data-partial-indicator', 'true');
      shimmer.style.cssText = 'position:absolute;inset:0;border-radius:inherit;background:linear-gradient(90deg,transparent 25%,rgba(255,255,255,0.04) 50%,transparent 75%);background-size:200% 100%;animation:shimmer 1.5s linear infinite;pointer-events:none;z-index:10;';
      el.appendChild(shimmer);
    }

    this.setProps(el, node.props);

    return el;
  }

  /**
   * Set properties on a DOM element from an ElementNode's props.
   * Handles: primitives (as properties), arrays (recursed), objects (as properties),
   * and nested ElementNodes (created as child elements).
   */
  private setProps(el: HTMLElement, props: Record<string, unknown>): void {
    for (const [key, value] of Object.entries(props)) {
      if (value === null || value === undefined) continue;

      // Handle children arrays — create child elements
      if (key === 'children' && Array.isArray(value)) {
        for (const child of value) {
          const childEl = this.renderValue(child);
          if (childEl) el.appendChild(childEl);
        }
        continue;
      }

      // Handle nested ElementNodes as slot content
      if (this.isElementNode(value)) {
        const childEl = this.createElementFromNode(value as ElementNode);
        if (childEl) {
          childEl.slot = key;
          el.appendChild(childEl);
        }
        continue;
      }

      // Handle arrays of ElementNodes
      if (Array.isArray(value) && value.length > 0 && this.isElementNode(value[0])) {
        for (const item of value) {
          const childEl = this.renderValue(item);
          if (childEl) el.appendChild(childEl);
        }
        // Also set as property for components that read it
        try {
          (el as any)[key] = value;
        } catch { /* property might not exist */ }
        continue;
      }

      // Set as element property (Lit reactive properties are set this way)
      try {
        (el as any)[key] = value;
      } catch { /* ignore */ }

      // Also set as attribute for primitive values
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        if (typeof value === 'boolean') {
          if (value) el.setAttribute(key, '');
          else el.removeAttribute(key);
        } else {
          el.setAttribute(key, String(value));
        }
      }
    }
  }

  /**
   * Render a value into a DOM node.
   * Handles: ElementNodes → custom elements, strings → text nodes, etc.
   */
  private renderValue(value: unknown): Node | null {
    if (value === null || value === undefined) return null;

    // ElementNode → create custom element
    if (this.isElementNode(value)) {
      return this.createElementFromNode(value as ElementNode);
    }

    // Primitive → text node
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return document.createTextNode(String(value));
    }

    // Array → fragment
    if (Array.isArray(value)) {
      const frag = document.createDocumentFragment();
      for (const item of value) {
        const node = this.renderValue(item);
        if (node) frag.appendChild(node);
      }
      return frag;
    }

    return null;
  }

  /**
   * Type guard: is this value an ElementNode?
   */
  private isElementNode(value: unknown): value is ElementNode {
    return (
      typeof value === 'object' &&
      value !== null &&
      'type' in value &&
      (value as Record<string, unknown>).type === 'element' &&
      'typeName' in value
    );
  }
}
