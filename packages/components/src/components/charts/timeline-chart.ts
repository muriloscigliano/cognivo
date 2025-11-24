import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface TimelineEvent {
  date: string;
  label: string;
  value?: number;
}

@customElement('timeline-chart')
export class TimelineChart extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
        width: 100%;
        height: 200px;
        background: ${tokens.color.grayWhite};
        border-radius: ${tokens.radius.md};
        padding: ${tokens.spacing.md};
      }
      svg { width: 100%; height: 100%; }
      .timeline-line { stroke: ${tokens.color.primaryMain}; stroke-width: 2; }
      .event-dot { fill: ${tokens.color.primaryMain}; cursor: pointer; transition: r ${tokens.transition.default}; }
      .event-dot:hover { r: 8; }
      .label { font-family: ${tokens.fontFamily.primary}; font-size: ${tokens.fontSize.xs}; fill: ${tokens.color.gray900}; }
    `,
  ];

  @property({ type: Array }) events: TimelineEvent[] = [];

  override render() {
    if (!this.events || this.events.length === 0) {
      return html`<div style="display:flex;align-items:center;justify-content:center;height:100%;color:${tokens.color.gray500}">No events</div>`;
    }

    const width = 500;
    const height = 150;
    const y = height / 2;
    const padding = { left: 40, right: 40 };
    const stepX = (width - padding.left - padding.right) / (this.events.length - 1 || 1);

    return svg`
      <svg viewBox="0 0 ${width} ${height}">
        <line class="timeline-line" x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" />
        ${this.events.map((event, i) => {
          const x = padding.left + i * stepX;
          return svg`
            <circle class="event-dot" cx="${x}" cy="${y}" r="6" />
            <text class="label" x="${x}" y="${y - 20}" text-anchor="middle">${event.label}</text>
            <text class="label" x="${x}" y="${y + 30}" text-anchor="middle">${event.date}</text>
          `;
        })}
      </svg>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { 'timeline-chart': TimelineChart; } }
