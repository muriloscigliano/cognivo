import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { hostBase, reducedMotion } from '../../styles/index.js';

/**
 * @element bias-social-proof
 * Lightweight social-proof badge showing how many others are viewing,
 * purchasing, rating, or subscribing. Optional stacked avatars. Widely used
 * on Booking.com, Airbnb, product pages.
 *
 * @example
 * ```html
 * <bias-social-proof count="23" type="viewing" interval="now"></bias-social-proof>
 * <bias-social-proof count="1284" type="purchased" format="compact"
 *   .avatars=${['/a.png','/b.png']}></bias-social-proof>
 * ```
 *
 * @cssprop --cg-component-bias-social-proof-radius
 * @cssprop --cg-component-bias-social-proof-avatar-size
 */
@customElement('bias-social-proof')
export class BiasSocialProof extends LitElement {
  static biasId = 'social-proof' as const;

  static override styles = [hostBase, reducedMotion, css`
    :host { align-items: center; }

    .strip {
      display: inline-flex;
      align-items: center;
      gap: var(--cg-spacing-8);
      padding: var(--cg-component-bias-social-proof-padding) var(--cg-spacing-12);
      border-radius: var(--cg-component-bias-social-proof-radius);
      font-size: var(--cg-font-size-sm);
      font-weight: var(--cg-font-weight-medium);
      color: var(--cg-color-surface-container-text);
      background: var(--cg-color-surface-container-background);
      border: var(--cg-border-width-50) solid var(--cg-color-surface-container-border);
    }

    .icon { width: var(--cg-icon-size-100); height: var(--cg-icon-size-100); flex-shrink: 0; opacity: 0.8; }

    .avatars {
      display: inline-flex;
      align-items: center;
    }
    .avatar {
      width: var(--cg-component-bias-social-proof-avatar-size);
      height: var(--cg-component-bias-social-proof-avatar-size);
      border-radius: var(--cg-border-radius-full);
      border: var(--cg-border-width-100) solid var(--cg-color-surface-container-background);
      background: var(--cg-color-surface-base-background);
      object-fit: cover;
      margin-left: calc(-1 * var(--cg-spacing-8));
    }
    .avatar:first-child { margin-left: 0; }

    .count { font-weight: var(--cg-font-weight-semibold); color: var(--cg-color-surface-base-text); }
  `];

  @property({ type: Number }) count = 0;
  @property() type: 'viewing' | 'purchased' | 'rated' | 'subscribed' = 'viewing';
  @property() interval: 'now' | 'today' | 'week' | 'month' = 'now';
  @property() format: 'compact' | 'full' = 'full';
  @property({ type: Array }) avatars: string[] = [];

  private _verb(): string {
    switch (this.type) {
      case 'viewing': return this.count === 1 ? 'is viewing' : 'are viewing';
      case 'purchased': return 'purchased';
      case 'rated': return 'rated this';
      case 'subscribed': return 'subscribed';
    }
  }

  private _intervalSuffix(): string {
    switch (this.interval) {
      case 'now': return this.type === 'viewing' ? ' now' : '';
      case 'today': return ' today';
      case 'week': return ' this week';
      case 'month': return ' this month';
    }
  }

  private _formattedCount(): string {
    if (this.count >= 1_000_000) return `${(this.count / 1_000_000).toFixed(1)}M`;
    if (this.count >= 1_000) return `${(this.count / 1_000).toFixed(1)}K`;
    return String(this.count);
  }

  private _label(): string {
    const noun = this.count === 1 ? 'person' : 'people';
    if (this.format === 'compact') {
      return `${this._formattedCount()} ${this.type}${this._intervalSuffix()}`.trim();
    }
    return `${this._formattedCount()} ${noun} ${this._verb()}${this._intervalSuffix()}`.trim();
  }

  override render() {
    const iconSvg = this.type === 'purchased'
      ? svg`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7h18l-2 12H5L3 7z"></path><path d="M8 7V5a4 4 0 018 0v2"></path></svg>`
      : this.type === 'rated'
      ? svg`<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3 6.5 7 .8-5.2 4.7 1.5 7-6.3-3.6-6.3 3.6 1.5-7L2 9.3l7-.8z"></path></svg>`
      : svg`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;

    const hasAvatars = this.avatars && this.avatars.length > 0;

    return html`
      <span class="strip" role="status" aria-label=${this._label()}>
        ${hasAvatars
          ? html`<span class="avatars" aria-hidden="true">${this.avatars.slice(0, 3).map(src => html`<img class="avatar" src=${src} alt="" />`)}</span>`
          : iconSvg}
        <span aria-hidden="true"><span class="count">${this._formattedCount()}</span> ${this.format === 'full' ? `${this.count === 1 ? 'person' : 'people'} ${this._verb()}` : this.type}${this._intervalSuffix()}</span>
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bias-social-proof': BiasSocialProof;
  }
}
