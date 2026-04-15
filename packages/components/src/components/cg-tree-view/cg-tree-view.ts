import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

export interface TreeItem {
  label: string;
  value?: string;
  icon?: string;
  children?: TreeItem[];
  expanded?: boolean;
  disabled?: boolean;
}

interface FlatNode {
  item: TreeItem;
  level: number;
  path: string;
  hasChildren: boolean;
  expanded: boolean;
  parentPath: string | null;
}

/**
 * @element cg-tree-view
 * Hierarchical tree with keyboard navigation and multi-select.
 *
 * @fires {CustomEvent<{value:string|string[]}>} cg-tree-select
 * @fires {CustomEvent<{path:string}>} cg-tree-expand
 * @fires {CustomEvent<{path:string}>} cg-tree-collapse
 */
@customElement('cg-tree-view')
export class CgTreeView extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    :host {
      display: block;
      font-family: var(--cg-font-family-primary);
      color: var(--cg-color-surface-container-text);
      font-size: var(--cg-font-size-sm);
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .node {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-spacing-8) var(--cg-spacing-8);
      margin: 0 calc(-1 * var(--cg-spacing-4));
      border-radius: var(--cg-border-radius-50);
      cursor: pointer;
      user-select: none;
      transition:
        background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
        color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
    }
    .node:hover:not(.disabled) {
      background: var(--cg-color-action-tertiary-background-hover);
    }
    .node.selected {
      background: var(--cg-color-action-tertiary-background-active);
      color: var(--cg-color-surface-base-text);
      font-weight: var(--cg-font-weight-medium);
    }
    .node.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .node:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 var(--cg-focus-ring-offset) var(--cg-color-focus-ring-offset),
        0 0 0 calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width)) var(--cg-color-focus-ring);
    }

    .toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--cg-spacing-16);
      height: var(--cg-spacing-16);
      flex-shrink: 0;
      color: var(--cg-color-surface-container-outlined);
      transition: transform var(--cg-transition-duration-default) var(--cg-transition-easing-default);
    }
    .toggle.expanded { transform: rotate(90deg); }
    .node:hover .toggle { color: var(--cg-color-surface-base-text); }
    .toggle.placeholder { visibility: hidden; }

    .label {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `];

  @property({ type: Array }) items: TreeItem[] = [];
  @property({ type: Boolean }) multiple = false;
  @property({ type: Array }) selected: string[] = [];

  @state() private _expanded = new Set<string>();
  @state() private _focusedPath: string | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    this._seedExpanded(this.items, '');
  }

  override willUpdate(changed: Map<string, unknown>): void {
    if (changed.has('items')) {
      this._expanded.clear();
      this._seedExpanded(this.items, '');
    }
  }

  private _seedExpanded(items: TreeItem[], parentPath: string): void {
    items.forEach((item, i) => {
      const path = parentPath ? `${parentPath}.${i}` : `${i}`;
      if (item.expanded) this._expanded.add(path);
      if (item.children) this._seedExpanded(item.children, path);
    });
  }

  private _flatten(): FlatNode[] {
    const out: FlatNode[] = [];
    const walk = (items: TreeItem[], level: number, parentPath: string | null) => {
      items.forEach((item, i) => {
        const path = parentPath ? `${parentPath}.${i}` : `${i}`;
        const hasChildren = !!(item.children && item.children.length);
        const expanded = this._expanded.has(path);
        out.push({ item, level, path, hasChildren, expanded, parentPath });
        if (hasChildren && expanded) walk(item.children!, level + 1, path);
      });
    };
    walk(this.items, 0, null);
    return out;
  }

  private _toggle(node: FlatNode): void {
    if (!node.hasChildren) return;
    if (this._expanded.has(node.path)) {
      this._expanded.delete(node.path);
      this.dispatchEvent(new CustomEvent('cg-tree-collapse', { bubbles: true, composed: true, detail: { path: node.path } }));
    } else {
      this._expanded.add(node.path);
      this.dispatchEvent(new CustomEvent('cg-tree-expand', { bubbles: true, composed: true, detail: { path: node.path } }));
    }
    this.requestUpdate();
  }

  private _select(node: FlatNode): void {
    if (node.item.disabled) return;
    const v = node.item.value ?? node.path;
    let next: string[];
    if (this.multiple) {
      next = this.selected.includes(v) ? this.selected.filter(x => x !== v) : [...this.selected, v];
    } else {
      next = [v];
    }
    this.selected = next;
    this.dispatchEvent(new CustomEvent('cg-tree-select', {
      bubbles: true, composed: true,
      detail: { value: this.multiple ? next : next[0] ?? '' },
    }));
  }

  private _onNodeClick(node: FlatNode): void {
    if (node.hasChildren) this._toggle(node);
    this._select(node);
    this._focusedPath = node.path;
  }

  private _onKeydown(e: KeyboardEvent, node: FlatNode): void {
    const flat = this._flatten();
    const idx = flat.findIndex(n => n.path === node.path);
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const next = flat[idx + 1];
        if (next) this._focusPath(next.path);
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const prev = flat[idx - 1];
        if (prev) this._focusPath(prev.path);
        break;
      }
      case 'ArrowRight': {
        e.preventDefault();
        if (node.hasChildren && !node.expanded) this._toggle(node);
        break;
      }
      case 'ArrowLeft': {
        e.preventDefault();
        if (node.hasChildren && node.expanded) {
          this._toggle(node);
        } else if (node.parentPath) {
          this._focusPath(node.parentPath);
        }
        break;
      }
      case 'Home':
        e.preventDefault();
        if (flat[0]) this._focusPath(flat[0].path);
        break;
      case 'End':
        e.preventDefault();
        if (flat[flat.length - 1]) this._focusPath(flat[flat.length - 1]!.path);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        this._select(node);
        break;
    }
  }

  private _focusPath(path: string): void {
    this._focusedPath = path;
    this.updateComplete.then(() => {
      const el = this.shadowRoot?.querySelector<HTMLElement>(`[data-path="${path}"]`);
      el?.focus();
    });
  }

  private _isSelected(node: FlatNode): boolean {
    const v = node.item.value ?? node.path;
    return this.selected.includes(v);
  }

  override render() {
    const flat = this._flatten();
    return html`
      <ul role="tree" aria-multiselectable=${this.multiple ? 'true' : 'false'}>
        ${flat.map(node => html`
          <li role="none">
            <div
              class="node ${this._isSelected(node) ? 'selected' : ''} ${node.item.disabled ? 'disabled' : ''}"
              role="treeitem"
              data-path=${node.path}
              tabindex=${this._focusedPath === node.path || (this._focusedPath === null && node === flat[0]) ? '0' : '-1'}
              style="padding-left: calc(var(--cg-spacing-8) + var(--cg-spacing-20) * ${node.level})"
              aria-level=${node.level + 1}
              aria-expanded=${node.hasChildren ? (node.expanded ? 'true' : 'false') : nothing}
              aria-selected=${this._isSelected(node) ? 'true' : 'false'}
              aria-disabled=${node.item.disabled ? 'true' : 'false'}
              @click=${() => this._onNodeClick(node)}
              @keydown=${(e: KeyboardEvent) => this._onKeydown(e, node)}
            >
              <span class="toggle ${node.hasChildren ? '' : 'placeholder'} ${node.expanded ? 'expanded' : ''}">
                ${node.hasChildren ? '▶' : nothing}
              </span>
              <span class="label">${node.item.label}</span>
            </div>
          </li>
        `)}
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-tree-view': CgTreeView;
  }
}
