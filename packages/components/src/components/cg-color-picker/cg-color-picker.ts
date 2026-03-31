import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { hostBlock, reducedMotion } from '../../styles/index.js';

// color-data-values (these are data, not CSS styling)
const DEFAULT_COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#14b8a6', '#06b6d4',
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#78716c',
  '#ffffff', '#fafafa', '#a1a1aa', '#71717a', '#52525b', '#3f3f46', '#27272a', '#18181b',
];

/**
 * <cg-color-picker> — Color swatch grid picker with optional hex input.
 *
 * Features:
 * - Grid of color swatches with ring indicator on selected
 * - Optional hex text input for custom colors
 * - Keyboard navigation (arrow keys through grid)
 * - Preview dot, presets for common palettes
 * - Dual focus ring, full ARIA radiogroup pattern
 */
@customElement('cg-color-picker')
export class CgColorPicker extends LitElement {
  static override styles = [hostBlock, reducedMotion, css`
    .label {
      display: block;
      font-size: var(--cg-font-size-xs, 12px);
      color: var(--cg-color-input-text-placeholder, #71717a);
      margin-bottom: var(--cg-spacing-8, 8px);
    }

    .grid {
      display: grid;
      gap: var(--cg-spacing-4, 4px);
    }

    .swatch {
      width: 28px;
      height: 28px;
      border-radius: var(--cg-border-radius-100, 8px);
      border: 2px solid transparent;
      cursor: pointer;
      padding: 0;
      background: none;
      position: relative;
      transition: transform var(--cg-motion-duration-slow, 250ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1)), box-shadow 200ms ease;
    }
    .swatch:hover { transform: scale(1.1); z-index: 1; }
    .swatch:active { transform: scale(var(--cg-interaction-press-scale, 0.97)); }

    .swatch .fill {
      width: 100%;
      height: 100%;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .swatch.selected {
      border-color: var(--cg-brand-ai-accent, #dfff61);
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background, #09090b),
        0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }

    .swatch:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background, #09090b),
        0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }

    .custom-row {
      display: flex;
      align-items: center;
      gap: var(--cg-spacing-8, 8px);
      margin-top: var(--cg-spacing-12, 12px);
    }

    .preview {
      width: 28px;
      height: 28px;
      border-radius: var(--cg-border-radius-full, 99999px);
      border: 2px solid var(--cg-color-surface-container-border, #27272a);
      flex-shrink: 0;
    }

    .hex-input {
      flex: 1;
      border: 1px solid var(--cg-color-input-border-default, #3f3f46);
      border-radius: var(--cg-border-radius-100, 8px);
      background: var(--cg-color-input-background-default, #18181b);
      color: var(--cg-color-input-text-default, #f4f4f5);
      font-family: var(--cg-font-family-mono, 'JetBrains Mono', monospace);
      font-size: var(--cg-font-size-sm, 14px);
      padding: var(--cg-spacing-8, 8px) var(--cg-spacing-12, 12px);
      outline: none;
      transition: border-color 200ms ease-out, box-shadow 200ms ease-out;
    }
    .hex-input:focus {
      border-color: var(--cg-brand-ai-accent, #dfff61);
      box-shadow:
        0 0 0 2px var(--cg-color-surface-base-background, #09090b),
        0 0 0 4px var(--cg-brand-ai-accent, #dfff61);
    }
  `];

  @property() value = '';
  @property({ type: Array }) colors: string[] = DEFAULT_COLORS;
  @property({ type: Number }) columns = 8;
  @property() label = '';
  @property({ type: Boolean }) allowCustom = false;

  @state() private _focusedIndex = -1;

  private _select(color: string) {
    this.value = color;
    this.dispatchEvent(new CustomEvent('cg-color-change', { detail: { color }, bubbles: true, composed: true }));
  }

  private _onGridKeyDown(e: KeyboardEvent) {
    const len = this.colors.length;
    let idx = this._focusedIndex;

    if (e.key === 'ArrowRight') { idx = (idx + 1) % len; }
    else if (e.key === 'ArrowLeft') { idx = (idx - 1 + len) % len; }
    else if (e.key === 'ArrowDown') { idx = Math.min(idx + this.columns, len - 1); }
    else if (e.key === 'ArrowUp') { idx = Math.max(idx - this.columns, 0); }
    else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (idx >= 0) this._select(this.colors[idx]);
      return;
    } else { return; }

    e.preventDefault();
    this._focusedIndex = idx;
    const swatches = this.shadowRoot?.querySelectorAll<HTMLButtonElement>('.swatch');
    swatches?.[idx]?.focus();
  }

  private _onCustomInput(e: Event) {
    let val = (e.target as HTMLInputElement).value.trim();
    if (val && !val.startsWith('#')) val = '#' + val;
    if (/^#([0-9a-fA-F]{3}){1,2}$/.test(val)) {
      this._select(val);
    }
  }

  override render() {
    return html`
      ${this.label ? html`<span class="label">${this.label}</span>` : nothing}
      <div class="grid" style="grid-template-columns: repeat(${this.columns}, 28px)"
        role="radiogroup" aria-label=${this.label || 'Color picker'}
        @keydown=${this._onGridKeyDown}>
        ${this.colors.map((c, i) => html`
          <button class="swatch ${this.value === c ? 'selected' : ''}"
            role="radio"
            aria-checked=${this.value === c}
            aria-label=${c}
            tabindex=${i === 0 || this.value === c ? 0 : -1}
            @click=${() => this._select(c)}
            @focus=${() => { this._focusedIndex = i; }}>
            <div class="fill" style="background:${c}"></div>
          </button>
        `)}
      </div>
      ${this.allowCustom ? html`
        <div class="custom-row">
          <div class="preview" style="background:${this.value || 'var(--cg-color-surface-container-background, #18181b)'}"></div>
          <input class="hex-input"
            type="text"
            placeholder="hex"
            .value=${this.value}
            aria-label="Custom hex color"
            @input=${this._onCustomInput} />
        </div>
      ` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cg-color-picker': CgColorPicker;
  }
}
