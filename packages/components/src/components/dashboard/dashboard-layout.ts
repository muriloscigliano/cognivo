import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

/**
 * Dashboard Layout Configuration
 */
export interface DashboardConfig {
  columns?: 1 | 2 | 3 | 4;
  gap?: string;
  draggable?: boolean;
  resizable?: boolean;
  responsive?: boolean;
}

/**
 * Dashboard Layout - Main dashboard grid layout with responsive columns
 *
 * Features:
 * - Responsive column layouts (1/2/3/4 columns)
 * - Drag and drop support for widgets
 * - Breakpoint-based responsive behavior
 * - Customizable gap spacing
 */
@customElement('dashboard-layout')
export class DashboardLayout extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: grid;
        gap: var(--dashboard-gap, ${tokens.spacing.lg});
        width: 100%;
        padding: ${tokens.spacing.lg};
        background: ${tokens.color.gray50};
        min-height: 100%;
      }

      /* Column configurations */
      :host([columns='1']) {
        grid-template-columns: 1fr;
      }

      :host([columns='2']) {
        grid-template-columns: repeat(2, 1fr);
      }

      :host([columns='3']) {
        grid-template-columns: repeat(3, 1fr);
      }

      :host([columns='4']) {
        grid-template-columns: repeat(4, 1fr);
      }

      /* Responsive breakpoints */
      @media (max-width: 1400px) {
        :host([columns='4'][responsive]) {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      @media (max-width: 1024px) {
        :host([columns='3'][responsive]),
        :host([columns='4'][responsive]) {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 768px) {
        :host([responsive]) {
          grid-template-columns: 1fr;
          padding: ${tokens.spacing.md};
          gap: ${tokens.spacing.md};
        }
      }

      /* Draggable support */
      :host([draggable]) ::slotted(*) {
        cursor: move;
        transition: transform ${tokens.transition.base};
      }

      :host([draggable]) ::slotted(*:hover) {
        transform: scale(1.01);
      }

      :host([draggable]) ::slotted(.dragging) {
        opacity: 0.5;
        cursor: grabbing;
      }

      /* Empty state */
      .empty-state {
        grid-column: 1 / -1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: ${tokens.spacing.xxl};
        color: ${tokens.color.gray500};
        text-align: center;
      }

      .empty-icon {
        font-size: 3rem;
        margin-bottom: ${tokens.spacing.md};
        opacity: 0.5;
      }

      .empty-text {
        font-size: ${tokens.font.size.lg};
        font-weight: ${tokens.font.weight.medium};
        margin-bottom: ${tokens.spacing.xs};
      }

      .empty-hint {
        font-size: ${tokens.font.size.sm};
        color: ${tokens.color.gray400};
      }
    `
  ];

  @property({ type: Number, reflect: true })
  columns: 1 | 2 | 3 | 4 = 3;

  @property({ type: String })
  gap = '';

  @property({ type: Boolean, reflect: true })
  draggable = false;

  @property({ type: Boolean, reflect: true })
  resizable = false;

  @property({ type: Boolean, reflect: true })
  responsive = true;

  @property({ type: String })
  emptyText = 'No widgets added';

  @property({ type: String })
  emptyHint = 'Add widgets to your dashboard to get started';

  @state()
  private _hasContent = false;

  override connectedCallback() {
    super.connectedCallback();
    if (this.gap) {
      this.style.setProperty('--dashboard-gap', this.gap);
    }
    this._checkContent();
  }

  override firstUpdated() {
    if (this.draggable) {
      this._initDragDrop();
    }
  }

  private _checkContent() {
    const slot = this.shadowRoot?.querySelector('slot');
    const hasNodes = slot?.assignedNodes({ flatten: true }).some(
      node => node.nodeType === Node.ELEMENT_NODE
    );
    this._hasContent = hasNodes || false;
  }

  private _initDragDrop() {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return;

    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      target.classList.add('dragging');
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move';
      }
    };

    const handleDragEnd = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      target.classList.remove('dragging');
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move';
      }
    };

    slot.addEventListener('slotchange', () => {
      const elements = slot.assignedElements();
      elements.forEach(el => {
        el.setAttribute('draggable', 'true');
        el.addEventListener('dragstart', handleDragStart as EventListener);
        el.addEventListener('dragend', handleDragEnd as EventListener);
        el.addEventListener('dragover', handleDragOver as EventListener);
      });
    });
  }

  private _handleSlotChange() {
    this._checkContent();
  }

  override render() {
    return html`
      <slot @slotchange=${this._handleSlotChange}></slot>
      ${!this._hasContent ? html`
        <div class="empty-state">
          <div class="empty-icon">📊</div>
          <div class="empty-text">${this.emptyText}</div>
          <div class="empty-hint">${this.emptyHint}</div>
        </div>
      ` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dashboard-layout': DashboardLayout;
  }
}
