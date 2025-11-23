import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface Segment {
  id: string;
  label: string;
  icon?: string;
}

@customElement('segment-switcher')
export class SegmentSwitcher extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        background: ${tokens.color.gray100};
        border-radius: ${tokens.radius.md};
        padding: ${tokens.spacing.xs};
      }

      .segment {
        padding: ${tokens.spacing.xs} ${tokens.spacing.md};
        background: transparent;
        border: none;
        border-radius: ${tokens.radius.sm};
        color: ${tokens.color.gray700};
        font-size: ${tokens.fontSize.sm};
        font-weight: ${tokens.fontWeight.medium};
        cursor: pointer;
        transition: all ${tokens.transition.default};
        display: flex;
        align-items: center;
        gap: ${tokens.spacing.xs};
      }

      .segment:hover {
        background: rgba(255, 255, 255, 0.5);
      }

      .segment.active {
        background: ${tokens.color.grayWhite};
        color: ${tokens.color.primaryMain};
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
    `,
  ];

  @property({ type: Array }) segments: Segment[] = [];
  @property({ type: String }) activeSegment = '';

  private _handleSegmentClick(segment: Segment) {
    this.activeSegment = segment.id;
    this.dispatchEvent(new CustomEvent('segment-change', { detail: { segmentId: segment.id } }));
  }

  override render() {
    return html`
      ${this.segments.map(
        (seg) => html`
          <button class="segment ${seg.id === this.activeSegment ? 'active' : ''}" @click="${() => this._handleSegmentClick(seg)}">
            ${seg.icon ? html`<span>${seg.icon}</span>` : ''}
            ${seg.label}
          </button>
        `
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'segment-switcher': SegmentSwitcher;
  }
}
