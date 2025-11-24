import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base.js';
import { tokens } from '../../styles/tokens.js';

export interface GroupOption {
  id: string;
  label: string;
  options: Array<{ value: string; label: string }>;
}

@customElement('group-selector')
export class GroupSelector extends LitElement {
  static override styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .select {
        width: 100%;
        padding: ${tokens.spacing.sm} ${tokens.spacing.md};
        border: 1px solid ${tokens.color.gray100};
        border-radius: ${tokens.radius.sm};
        font-family: ${tokens.fontFamily.primary};
        font-size: ${tokens.fontSize.md};
        background: ${tokens.color.grayWhite};
      }

      optgroup {
        font-weight: ${tokens.fontWeight.semibold};
        color: ${tokens.color.gray900};
      }

      option {
        padding: ${tokens.spacing.xs};
      }
    `,
  ];

  @property({ type: Array }) groups: GroupOption[] = [];
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = 'Select an option';

  private _handleChange(e: Event) {
    this.value = (e.target as HTMLSelectElement).value;
    this.dispatchEvent(new CustomEvent('select-change', { detail: { value: this.value } }));
  }

  override render() {
    return html`
      <select class="select" .value="${this.value}" @change="${this._handleChange}">
        ${this.placeholder ? html`<option value="">${this.placeholder}</option>` : ''}
        ${this.groups.map(
          (group) => html`
            <optgroup label="${group.label}">
              ${group.options.map((opt) => html`<option value="${opt.value}">${opt.label}</option>`)}
            </optgroup>
          `
        )}
      </select>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'group-selector': GroupSelector;
  }
}
